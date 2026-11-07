"use client";

import { useState } from "react";
import { sendMail } from "@/lib/mail";
import { studio } from "@/lib/site";

/** Writes the message into the visitor's mail app, addressed to the studio. */
export function ContactBlock({ title = "Feel free to contact us" }: { title?: string }) {
  const [sent, setSent] = useState(false);
  return (
    <section className="contact" id="contact">
      <h2 className="h-lg">{title}</h2>
      <form
        className="contact__form"
        onSubmit={(event) => {
          event.preventDefault();
          const form = new FormData(event.currentTarget);
          sendMail(
            `Message from ${form.get("name")}`,
            `${form.get("message")}\n\n${form.get("name")}\n${form.get("email")}`,
          );
          setSent(true);
        }}
      >
        <label className="field">
          <span>Name</span>
          <input name="name" required autoComplete="name" />
        </label>
        <label className="field">
          <span>Email</span>
          <input name="email" type="email" required autoComplete="email" />
        </label>
        <label className="field full">
          <span>Message</span>
          <textarea name="message" required />
        </label>
        <button className="btn full" type="submit">
          Send
        </button>
        <p className="label full" style={{ textAlign: "center" }} aria-live="polite">
          {sent
            ? `Your mail app should now be open with your message. If not, write to ${studio.email}.`
            : "This opens your mail app with your message filled in."}
        </p>
      </form>
    </section>
  );
}
