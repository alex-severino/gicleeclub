import Link from "next/link";
import { Logo } from "@/components/Logo";
import { studio } from "@/lib/site";
import { Newsletter } from "./Newsletter";

export function Footer() {
  return (
    <footer className="footer" data-ink="home">
      <div className="footer__cols">
        <div>
          <h2>Sign up</h2>
          <p>Subscribe to get special offers!</p>
          <Newsletter />
        </div>
        <div>
          <h2>Postal Address</h2>
          <p>
            {studio.street}
            <br />
            {studio.city}
          </p>
        </div>
        <div>
          <h2>Contact</h2>
          <p>
            <a href={`mailto:${studio.email}`}>{studio.email}</a>
          </p>
          <p>
            <a href={studio.instagram} target="_blank" rel="noreferrer">
              Instagram
            </a>
          </p>
        </div>
        <div>
          <h2>Legal Info</h2>
          <p>
            <Link href="/terms-and-conditions">Terms and Conditions</Link>
            <br />
            <Link href="/privacy-policy">Privacy Policy</Link>
            <br />
            Chamber of Commerce
            <br />
            (KVK) {studio.kvk}
          </p>
        </div>
      </div>
      <Link className="footer__mark" href="/" aria-label="Giclée Club, home">
        <Logo className="" />
      </Link>
      <div className="footer__base">
        <span>© 2026 Giclée Club</span>
        <span>Hand-printed in Amsterdam</span>
      </div>
    </footer>
  );
}
