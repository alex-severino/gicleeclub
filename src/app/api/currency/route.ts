import { currencyForCountry } from "@/lib/currency";

/** Vercel supplies the country derived from the visitor's IP. Never cache across visitors. */
export async function GET(request: Request) {
  const code = currencyForCountry(request.headers.get("x-vercel-ip-country"));
  return Response.json({ code }, { headers: { "Cache-Control": "private, no-store" } });
}
