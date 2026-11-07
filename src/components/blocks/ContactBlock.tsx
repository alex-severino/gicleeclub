"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { sendEnquiry } from "@/lib/enquiry";
import { studio } from "@/lib/site";

type Status = "idle" | "sending" | "sent" | "failed";

/** Every order starts here. */
export function ContactBlock({ title = "Feel free to contact us" }: { title?: string }) {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const opened = useRef(0);

  // Links from prices and product pages arrive saying what they are about.
  useEffect(() => {
    opened.current = Date.now();
    const about = new URLSearchParams(window.location.search).get("about");
    if (!about) return;
    const frame = requestAnimationFrame(() => setMessage(`I would like to order: ${about}.\n\n`));
    return () => cancelAnimationFrame(frame);
  }, []);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.currentTarget;
    const form = new FormData(target);
    setStatus("sending");
    const delivered = await sendEnquiry({
      name: String(form.get("name")),
      email: String(form.get("email")),
      message,
      _hp: String(form.get("website") ?? ""),
      _t: Date.now() - opened.current,
    });
    setStatus(delivered ? "sent" : "failed");
    if (delivered) {
      target.reset();
      setMessage("");
    }
  };

  return (
    <section className="contact" id="contact">
      <h2 className="h-lg">{title}</h2>
      <form className="contact__form" onSubmit={submit}>
        {/* Hidden from people; bots fill it in. */}
        <label className="contact__trap" aria-hidden="true">
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
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
          <textarea
            name="message"
            required
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />
        </label>
        <button className="btn full" type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending" : "Send"}
        </button>
        <p className="contact__status full" role="status">
          {status === "sent" && "Thank you. Your message is on its way to us, and we will reply soon."}
          {status === "failed" && (
            <>
              Sorry, that did not go through. Please write to us at{" "}
              <a href={`mailto:${studio.email}`}>{studio.email}</a>.
            </>
          )}
        </p>
      </form>
    </section>
  );
}
