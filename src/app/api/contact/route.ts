import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { studio } from "@/lib/site";

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

function getTransporter() {
  return nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.BREVO_SMTP_LOGIN!,
      pass: process.env.BREVO_SMTP_PASSWORD!,
    },
  });
}

function looksLikeGibberish(str: string): boolean {
  if (!str || str.length < 4) return false;
  const letters = str.replace(/[^a-zA-Z]/g, "");
  if (letters.length === 0) return false;
  const upperRatio = (str.match(/[A-Z]/g) ?? []).length / letters.length;
  return upperRatio > 0.6;
}

const DISPOSABLE_DOMAINS = [
  "mailinator.com",
  "guerrillamail.com",
  "trashmail.com",
  "tempmail.com",
  "throwam.com",
  "yopmail.com",
  "sharklasers.com",
  "maildrop.cc",
];

function isDisposableEmail(email: string): boolean {
  const domain = email.split("@")[1]?.toLowerCase() ?? "";
  return DISPOSABLE_DOMAINS.some((d) => domain === d || domain.endsWith("." + d));
}

export async function POST(request: NextRequest) {
  const from = process.env.EMAIL_FROM;
  if (!process.env.BREVO_SMTP_LOGIN || !process.env.BREVO_SMTP_PASSWORD || !from) {
    return NextResponse.json({ error: "Email service not configured" }, { status: 503 });
  }

  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Bad request" }, { status: 400 });
  const { name, email, subject, message, _hp, _t } = body;

  // Bots get a quiet success so they do not retry.
  if (_hp && String(_hp).trim().length > 0) return NextResponse.json({ ok: true });
  if (typeof _t === "number" && _t < 800) return NextResponse.json({ ok: true });

  if (![name, email, message].every((field) => typeof field === "string" && field.trim())) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || message.length > 10000) {
    return NextResponse.json({ error: "Invalid fields" }, { status: 400 });
  }

  if (looksLikeGibberish(name) || isDisposableEmail(email)) {
    return NextResponse.json({ ok: true });
  }

  try {
    await getTransporter().sendMail({
      // The sender is a Brevo-authenticated address. Replies go straight to the visitor.
      from: `Giclée Club website <${from}>`,
      to: process.env.EMAIL_REPLY_TO ?? studio.email,
      replyTo: email,
      subject: typeof subject === "string" && subject ? subject : `New message from ${name}`,
      html: `
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <hr />
        <p>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>
      `,
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[contact] Brevo SMTP error:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
