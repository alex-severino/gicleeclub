<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Site rules

- Giclée Club is a trading name of Art Britannia Ltd. Company details live in `src/lib/site.ts`.
- There are no orders or payments on the site. Every order action leads to `/contact-us` through `contactHref()`. Orders pass through an AI file approval first.
- Prices are in pounds in `src/lib/pricing.ts` and are shown through `<Money />`, so the currency selector works everywhere. Other currencies are a guide only.
- The contact form sends through Brevo (`BREVO_SMTP_LOGIN`, `BREVO_SMTP_PASSWORD`, `EMAIL_FROM`, `EMAIL_REPLY_TO`). `EMAIL_FROM` must be a Brevo-authenticated address. `gicleeclub.com` is not authenticated with Brevo and has a strict DMARC policy.
- The logo is pure black. Keep the page ground plain white, with no paper textures.
- The brand comes from a classical print test page and from the logo itself: see the Digitangels case study at `digitangels.com/projects/giclee-club-branding`.

## Releases

Production is the Vercel project `gicleeclub` in team `alex-severino-projects`, deployed from `main` of `github.com/alex-severino/gicleeclub`, and served at `www.gicleeclub.com` (`gicleeclub.com` redirects there).

- A bare "push" means commit on `main`, push to GitHub, and deploy to Vercel. After committing on `main`, run `npm run ship`. It pushes that exact commit, replaces pending Git builds of the same commit with a cached direct Vercel deployment, and verifies the live address. Bare Git pushes still deploy automatically, more slowly.
- `npm run deploy:check` is read-only. `npm run test:deploy` tests the safeguards.
- `.vercelignore` keeps local-only files out of the upload, and the script refuses to deploy if a Git-ignored local file isn't covered there.
- Respect "commit only" and "do not deploy". Ordinary editing is not permission to release.
- Keep media in Git at original quality. Add no storage service or lossy compression without approval.
