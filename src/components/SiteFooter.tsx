import { Link } from "react-router-dom";
import type React from "react";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ankahe-footer-border bg-ankahe-footer">
      <div className="mx-auto flex max-w-7xl flex-row flex-wrap items-center justify-center gap-x-8 gap-y-2 px-6 py-6 sm:py-8 lg:justify-between">
        <nav
          aria-label="Footer"
          className="type-footer-nav flex flex-row flex-wrap items-center justify-center gap-x-6 gap-y-2 text-ankahe-footer-text"
        >
          <FooterLink to="/">Home</FooterLink>
          <FooterLink to="/how-it-works">FAQ</FooterLink>
          <FooterLink to="/privacy">Privacy</FooterLink>
          <FooterLink to="/manual/me">Me</FooterLink>
          <FooterLink to="/manual/work">Work</FooterLink>
        </nav>

        <p className="type-footer-nav text-center text-ankahe-footer-text-strong lg:text-right">
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
      className="inline-flex min-h-11 items-center justify-center px-1 sm:px-2 transition-colors duration-200 ease-[var(--ease-out-expo)] hover:text-ankahe-footer-text-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ankahe-footer-focus focus-visible:ring-offset-2 focus-visible:ring-offset-ankahe-footer"
    >
      {children}
    </Link>
  );
}
