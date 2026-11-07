import { studio } from "./site";

/** Opens the visitor's mail app with everything already filled in. */
export function sendMail(subject: string, body: string) {
  window.location.href = `mailto:${studio.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
