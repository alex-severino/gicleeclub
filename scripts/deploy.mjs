import { execFile, spawn } from "node:child_process";
import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { setTimeout as delay } from "node:timers/promises";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const execute = promisify(execFile);

// The project is looked up by name, so this keeps working from the moment it is
// imported into Vercel. The custom domain takes over once its DNS reaches Vercel.
export const PROJECT = {
  name: "gicleeclub",
  team: "team_dqNNxoCGVQ7vXBIVDF620yrb",
  branch: "main",
  remote: "origin",
  domain: "www.gicleeclub.com",
};
const MARKER = "gicleeclubVerifiedCommit";
const activeStates = new Set(["INITIALIZING", "QUEUED", "BUILDING"]);
const state = (deployment) => deployment.readyState ?? deployment.state;
const commitSha = (deployment) => deployment.meta?.githubCommitSha ?? deployment.meta?.gitCommitSha;
const commitRef = (deployment) => deployment.meta?.githubCommitRef ?? deployment.meta?.gitCommitRef;

export function releaseMetadata(sha, message, link) {
  return {
    [MARKER]: sha,
    gitCommitSha: sha,
    gitCommitRef: PROJECT.branch,
    gitCommitMessage: message,
    ...(link?.type === "github" ? {
      githubCommitSha: sha,
      githubCommitRef: PROJECT.branch,
      githubCommitMessage: message,
      githubCommitOrg: link.org,
      githubCommitRepo: link.repo,
    } : {}),
  };
}

export function matchingGitBuilds(deployments, sha) {
  return deployments.filter((deployment) =>
    deployment.source === "git" &&
    deployment.target === "production" &&
    commitRef(deployment) === PROJECT.branch &&
    commitSha(deployment) === sha &&
    activeStates.has(state(deployment)),
  );
}

export function activeDirectReleases(deployments, sha) {
  return deployments.filter((deployment) =>
    deployment.source !== "git" &&
    deployment.target === "production" &&
    deployment.meta?.[MARKER] === sha &&
    activeStates.has(state(deployment)),
  );
}

// Git builds clone the pushed commit; CLI uploads can include uncommitted files
// under the same SHA, so they only count with the verified-commit marker.
export function isLiveCommit(deployment, sha) {
  return Boolean(deployment) && state(deployment) === "READY" && commitSha(deployment) === sha &&
    (deployment.source === "git" || deployment.meta?.[MARKER] === sha);
}

// Until DNS is connected, verify on the project's vercel.app production address.
export function pickServingDomain(customReachesVercel, aliases, custom = PROJECT.domain) {
  if (customReachesVercel) return custom;
  return aliases.find((alias) => alias.endsWith(".vercel.app"));
}

// Git-ignored files that exist locally must also be kept out of the upload.
export function uncoveredLocalFiles(paths, rules) {
  const covered = (path) => rules.some((rule) => {
    if (rule.startsWith("/")) return path === rule.slice(1) || (rule.endsWith("/") && path.startsWith(rule.slice(1)));
    if (rule.endsWith("/")) return path.startsWith(rule) || path.includes(`/${rule}`);
    if (rule.startsWith("*")) return path.endsWith(rule.slice(1));
    if (rule.endsWith("*")) return path.split("/").some((part) => part.startsWith(rule.slice(0, -1)));
    return path === rule || path.endsWith(`/${rule}`);
  });
  return paths.filter((path) => !covered(path));
}

async function output(command, args) {
  const result = await execute(command, args, { cwd: root, maxBuffer: 8 * 1024 ** 2 });
  return result.stdout.trim();
}

async function interactive(command, args) {
  await new Promise((resolve, reject) => {
    const child = spawn(command, args, { cwd: root, stdio: "inherit" });
    child.on("error", reject);
    child.on("exit", (code, signal) => {
      if (code === 0) resolve();
      else reject(new Error(`${command} failed (${signal ?? code}).`));
    });
  });
}

async function reachesVercel(domain) {
  try {
    const response = await fetch(`https://${domain}/`, {
      method: "HEAD",
      redirect: "manual",
      signal: AbortSignal.timeout(8000),
    });
    return response.headers.get("server") === "Vercel";
  } catch {
    return false;
  }
}

async function main() {
  const started = Date.now();
  const flags = new Set(process.argv.slice(2));
  for (const flag of flags) {
    if (!["--ship", "--check"].includes(flag)) throw new Error(`Unsupported option: ${flag}`);
  }

  if (await output("git", ["branch", "--show-current"]) !== PROJECT.branch) {
    throw new Error(`Production releases must use ${PROJECT.branch}.`);
  }
  const dirty = Boolean(await output("git", ["status", "--porcelain"]));
  if (dirty && !flags.has("--check")) throw new Error("Commit the working changes before releasing.");
  const sha = await output("git", ["rev-parse", "HEAD"]);

  const rules = (await readFile(resolve(root, ".vercelignore"), "utf8"))
    .split("\n").map((line) => line.trim()).filter((line) => line && !line.startsWith("#"));
  const localOnly = (await output("git", ["ls-files", "--others", "--ignored", "--exclude-standard", "--directory"]))
    .split("\n").filter(Boolean);
  const uncovered = uncoveredLocalFiles(localOnly, rules);
  if (uncovered.length) {
    throw new Error(`Local-only files would be uploaded; add them to .vercelignore:\n  ${uncovered.join("\n  ")}`);
  }

  const api = async (endpoint, method) => JSON.parse(await output("vercel", [
    "api", endpoint, "--scope", PROJECT.team, ...(method ? ["--method", method] : []),
  ]));
  const [project, customReachesVercel] = await Promise.all([
    api(`/v9/projects/${PROJECT.name}`).catch(() => {
      throw new Error(`Vercel project "${PROJECT.name}" not found. Import the repository at vercel.com/new first.`);
    }),
    reachesVercel(PROJECT.domain),
  ]);
  const projectId = project.id;
  const aliases = project.targets?.production?.alias ?? [];
  const domain = pickServingDomain(customReachesVercel, aliases) ?? `${PROJECT.name}.vercel.app`;
  if (domain !== PROJECT.domain) console.log(`${PROJECT.domain} does not reach Vercel yet; verifying on ${domain}.`);

  const recent = async () => (await api(
    `/v6/deployments?projectId=${projectId}&target=production&limit=20`,
  )).deployments;
  // Resolve the serving domain: the project's latest production target may still be building.
  // A project with no production deployment yet has nothing live to check.
  const serving = async () => {
    const live = await api(`/v13/deployments/${domain}`).catch(() => null);
    if (live && live.projectId !== projectId) throw new Error(`${domain} belongs to a different project.`);
    return live;
  };
  const remoteSha = async () =>
    (await output("git", ["ls-remote", PROJECT.remote, `refs/heads/${PROJECT.branch}`])).split(/\s/)[0];

  let [live, deployments, remote] = await Promise.all([serving(), recent(), remoteSha()]);

  if (flags.has("--check")) {
    console.log(`Commit:  ${sha}${dirty ? " (working tree has uncommitted changes)" : ""}`);
    console.log(`Remote:  ${remote === sha ? "matches" : "differs (push needed)"}`);
    console.log(live
      ? `Live:    ${live.url} (${state(live)}, ${live.source}, ${commitSha(live)?.slice(0, 7) ?? "no commit"})`
      : "Live:    nothing deployed yet");
    console.log(`Pending Git builds for this commit: ${matchingGitBuilds(deployments, sha).length}`);
    console.log(isLiveCommit(live, sha) ? "Already live; no rebuild needed." : "A direct deployment is needed.");
    return;
  }

  const pushed = flags.has("--ship") && remote !== sha;
  if (pushed) {
    const pushStarted = Date.now();
    await interactive("git", ["push", "-u", PROJECT.remote, PROJECT.branch]);
    [remote, deployments] = await Promise.all([remoteSha(), recent()]);
    console.log(`Git push: ${((Date.now() - pushStarted) / 1000).toFixed(1)}s`);
  }
  if (remote !== sha) {
    throw new Error(`${PROJECT.remote}/${PROJECT.branch} is not at ${sha.slice(0, 7)}; push it before deploying.`);
  }

  async function cancelDuplicates(candidates) {
    const jobs = matchingGitBuilds(candidates ?? await recent(), sha);
    for (const job of jobs) {
      try {
        await api(`/v12/deployments/${job.uid}/cancel`, "PATCH");
        console.log(`Cancelled duplicate Git build: ${job.url}`);
      } catch (error) {
        // The job may have completed between listing and cancellation.
        const current = await api(`/v13/deployments/${job.uid}`);
        if (activeStates.has(state(current))) throw error;
      }
    }
    return jobs.length;
  }

  const cancelled = await cancelDuplicates(deployments);

  let buildSeconds;
  let verificationStarted = Date.now();
  if (isLiveCommit(live, sha)) {
    console.log(`Commit ${sha.slice(0, 7)} is already live at https://${domain}; skipped rebuilding.`);
  } else {
    if (activeDirectReleases(deployments, sha).length) {
      throw new Error(`A direct release of ${sha.slice(0, 7)} is already running; let it finish.`);
    }
    if (await output("git", ["rev-parse", "HEAD"]) !== sha || await output("git", ["status", "--porcelain"])) {
      throw new Error("Working tree changed during release; commit changes and release again.");
    }
    const message = await output("git", ["log", "-1", "--format=%s"]);
    const metadata = releaseMetadata(sha, message, project.link);
    // Watch for a delayed Git webhook while the direct deployment uploads and
    // builds, rather than holding up the deployment to wait for that webhook.
    const watchGitBuild = async () => {
      if (!pushed || cancelled) return;
      const deadline = Date.now() + 10000;
      while (Date.now() < deadline) {
        await delay(500);
        if (await cancelDuplicates()) return;
      }
    };
    const results = await Promise.allSettled([
      interactive("vercel", [
        "deploy", "--prod", "--yes", "--project", projectId, "--scope", PROJECT.team,
        ...Object.entries(metadata).flatMap(([key, value]) => ["--meta", `${key}=${value}`]),
      ]),
      watchGitBuild(),
    ]);
    for (const result of results) if (result.status === "rejected") throw result.reason;
    verificationStarted = Date.now();
    for (let attempt = 0; attempt < 30 && !isLiveCommit(live, sha); attempt++) {
      if (attempt) await delay(2000);
      live = await serving();
    }
    if (!isLiveCommit(live, sha)) {
      throw new Error(`${domain} is not serving ${sha.slice(0, 7)} (${live?.url ?? "nothing live"}, ${live ? state(live) : "no deployment"}).`);
    }
    if (live.buildingAt && live.ready) buildSeconds = (live.ready - live.buildingAt) / 1000;
  }
  // Also catch a delayed webhook after the direct deployment has completed.
  const [, response] = await Promise.all([
    cancelDuplicates(),
    fetch(`https://${domain}/`, { cache: "no-store", signal: AbortSignal.timeout(15000) }),
  ]);
  if (!response.ok) throw new Error(`https://${domain}/ returned HTTP ${response.status}.`);
  const remaining = matchingGitBuilds(await recent(), sha).length;
  if (remaining) throw new Error(`${remaining} duplicate Git build(s) still pending for ${sha.slice(0, 7)}.`);

  console.log(`Live: https://${domain} serves ${sha.slice(0, 7)} (${live.url}, READY, HTTP ${response.status}).`);
  if (buildSeconds !== undefined) console.log(`Vercel build: ${buildSeconds.toFixed(1)}s`);
  console.log(`Verification: ${((Date.now() - verificationStarted) / 1000).toFixed(1)}s`);
  console.log(`End-to-end release: ${((Date.now() - started) / 1000).toFixed(1)}s`);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    console.error(error.stderr?.trim() || error.message);
    process.exitCode = 1;
  });
}
