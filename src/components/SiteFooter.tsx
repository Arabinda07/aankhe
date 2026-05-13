import { Link } from "react-router-dom";
import type React from "react";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ankahe-footer-border bg-ankahe-footer">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-12 md:min-h-36 md:flex-row md:items-center md:justify-between md:py-0">
        <nav
          aria-label="Footer"
          className="type-footer-nav flex flex-col items-start gap-y-1 sm:flex-row sm:items-center sm:flex-wrap sm:gap-x-9 sm:gap-y-3 text-ankahe-footer-text"
        >
          <FooterLink to="/">Home</FooterLink>
          <FooterLink to="/how-it-works">How it works</FooterLink>
          <FooterLink to="/privacy">Privacy</FooterLink>
          <FooterLink to="/manual/me">Me</FooterLink>
          <FooterLink to="/manual/work">Work</FooterLink>
        </nav>

        <p className="type-footer-nav text-ankahe-footer-text-strong md:text-right">
          © {year}{" "}
          <a
            href="https://arabinda07.github.io/"
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex min-h-11 items-center transition-colors duration-200 ease-[var(--ease-out-expo)] hover:text-ankahe-footer-text-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ankahe-footer-focus focus-visible:ring-offset-2 focus-visible:ring-offset-ankahe-footer"
          >
            ARABINDA
          </a>
        </p>
      </div>
    </footer>
  );
}

function FooterLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="inline-flex min-h-11 items-center justify-start sm:justify-center px-1 sm:px-2 transition-colors duration-200 ease-[var(--ease-out-expo)] hover:text-ankahe-footer-text-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ankahe-footer-focus focus-visible:ring-offset-2 focus-visible:ring-offset-ankahe-footer"
    >
      {children}
    </Link>
  );
}
