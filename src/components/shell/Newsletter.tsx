"use client";

import { useState } from "react";
import { sendEnquiry } from "@/lib/enquiry";

export function Newsletter() {
  const [status, setStatus] = useState<"idle" | "sent" | "failed">("idle");

  return (
    <>
      <form
        className="newsletter"
        onSubmit={async (event) => {
          event.preventDefault();
          const target = event.currentTarget;
          const email = String(new FormData(target).get("email"));
          const delivered = await sendEnquiry({
            name: "Newsletter sign-up",
            email,
            subject: "Newsletter sign-up",
            message: `Please add ${email} to the Giclée Club list.`,
          });
          setStatus(delivered ? "sent" : "failed");
          if (delivered) target.reset();
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
      <p className="label" role="status" style={{ marginTop: "0.5rem", minHeight: "1.2em" }}>
        {status === "sent" && "Thank you, you are on the list."}
        {status === "failed" && "Sorry, that did not go through. Please try again later."}
      </p>
    </>
  );
}
