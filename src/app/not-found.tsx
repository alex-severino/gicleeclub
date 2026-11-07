import { Action } from "@/components/blocks/Action";
import { Sheet } from "@/components/blocks/Text";

export default function NotFound() {
  return (
    <Sheet ink="home">
      <section className="not-found">
        <p className="eyebrow">404</p>
        <h1 className="h-xl">Page not found</h1>
        <p style={{ marginTop: "1rem" }}>The page you were looking for does not exist.</p>
        <Action href="/" label="Back to the studio" />
      </section>
    </Sheet>
  );
}
