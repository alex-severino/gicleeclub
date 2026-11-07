"use client";

import { sendMail } from "@/lib/mail";

export function Newsletter() {
  return (
    <form
      className="newsletter"
      onSubmit={(event) => {
        event.preventDefault();
        const email = new FormData(event.currentTarget).get("email");
        sendMail("Sign me up", `Please add ${email} to the Giclée Club list.`);
      }}
    >
      <input
        type="email"
        name="email"
        required
        placeholder="Enter your email"
        aria-label="Your email address"
        autoComplete="email"
      />
      <button type="submit" aria-label="Subscribe">
        <svg width="22" height="16" viewBox="0 0 22 16" fill="none" aria-hidden="true">
          <path d="M1 1h20v14H1zM1 1l10 8 10-8" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </button>
    </form>
  );
}
