import { Link } from "react-router-dom";
import type React from "react";
import { cn } from "../lib/utils";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-parichay-footer-border bg-parichay-footer pb-[calc(var(--mobile-nav-total)+1rem)] sm:pb-0">
      <div className="mx-auto flex max-w-7xl flex-row flex-wrap items-center justify-center gap-x-8 gap-y-2 px-6 py-6 sm:py-8 lg:justify-between">
        <nav
          aria-label="Footer"
          className="type-footer-nav flex flex-row flex-wrap items-center justify-center gap-x-6 gap-y-2 text-parichay-footer-text"
        >
          <FooterLink to="/" className="hidden sm:inline-flex">Home</FooterLink>
          <FooterLink to="/how-it-works" className="hidden sm:inline-flex">How it works</FooterLink>
          <FooterLink to="/privacy" className="hidden sm:inline-flex">Privacy</FooterLink>
          <FooterLink to="/#onboarding" className="hidden sm:inline-flex">Create intro</FooterLink>
        </nav>

        <p className="type-footer-nav text-center text-parichay-footer-text-strong lg:text-right">
          © {year}{" "}
          <a
            href="https://arabinda07.github.io/"
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex min-h-11 items-center transition-colors duration-200 ease-[var(--ease-out-expo)] hover:text-parichay-footer-text-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-parichay-footer-focus focus-visible:ring-offset-2 focus-visible:ring-offset-parichay-footer"
          >
            ARABINDA
          </a>
        </p>
      </div>
    </footer>
  );
}

function FooterLink({
  to,
  children,
  className,
}: {
  to: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      to={to}
      className={cn(
        "inline-flex min-h-11 items-center justify-center px-1 transition-colors duration-200 ease-[var(--ease-out-expo)] hover:text-parichay-footer-text-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-parichay-footer-focus focus-visible:ring-offset-2 focus-visible:ring-offset-parichay-footer sm:px-2",
        className
      )}
    >
      {children}
    </Link>
  );
}
