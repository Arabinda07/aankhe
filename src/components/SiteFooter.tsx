import { Link } from "react-router-dom";
import type React from "react";
import { AnkaheMark } from "./AnkaheMark";

export function SiteFooter() {
  return (
    <footer className="border-t border-ankahe-border/50 bg-ankahe-surface">
      <div className="mx-auto max-w-7xl px-6 py-10 md:py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm space-y-4">
            <AnkaheMark tileClassName="h-9 w-9 rounded-md" wordmarkClassName="text-[1.55rem]" />
            <p className="type-caption text-ankahe-muted">
              Nothing is stored. You choose what leaves the page.
            </p>
          </div>

          <nav aria-label="Footer" className="type-ui-label flex flex-wrap gap-x-6 gap-y-2 text-ankahe-muted md:justify-end">
            <FooterLink to="/">Home</FooterLink>
            <FooterLink to="/how-it-works">How it works</FooterLink>
            <FooterLink to="/privacy">Privacy</FooterLink>
            <FooterLink to="/manual/me">Me</FooterLink>
            <FooterLink to="/manual/work">Work</FooterLink>
          </nav>
        </div>

        <div className="type-meta mt-10 border-t border-ankahe-border/50 pt-6 text-ankahe-muted">
          Copyright {new Date().getFullYear()} Ankahe
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="inline-flex min-h-11 items-center transition-colors hover:text-ankahe-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ankahe-accent focus-visible:ring-offset-2"
    >
      {children}
    </Link>
  );
}
