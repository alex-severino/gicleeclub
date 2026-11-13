import Link from "next/link";
import { Logo } from "@/components/Logo";
import { studio } from "@/lib/site";
import { HomeLink } from "./HomeLink";
import { Newsletter } from "./Newsletter";

export function Footer() {
  return (
    <footer className="footer" data-ink="home">
      <div className="footer__cols">
        <div className="footer__studio">
          <h2>From the studio</h2>
          <p>Notes on print, process and the details that matter.</p>
          <Newsletter />
        </div>
        <div className="footer__contact">
          <h2>Contact</h2>
          <a href={`mailto:${studio.email}`}>{studio.email}</a>
        </div>
        <div className="footer__info">
          <h2>Information</h2>
          <div className="footer__links">
            <Link href="/terms-and-conditions">Terms and Conditions</Link>
            <Link href="/privacy-policy">Privacy Policy</Link>
          </div>
        </div>
      </div>
      <HomeLink className="footer__mark">
        <Logo className="" />
      </HomeLink>
      <p className="footer__base">© 2026 {studio.name}</p>
    </footer>
  );
}
