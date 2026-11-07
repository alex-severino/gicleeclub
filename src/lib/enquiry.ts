type Enquiry = { name: string; email: string; message: string; subject?: string; _hp?: string; _t?: number };

/** Sends a message to the studio. True only when the server has handed it to the mail service. */
export async function sendEnquiry(enquiry: Enquiry) {
  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(enquiry),
    });
    return response.ok;
  } catch {
    return false;
  }
}
