import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { AnkaheMark } from "./AnkaheMark";

const ThemeSwitcher = lazy(() =>
  import("./ThemeSwitcher").then((module) => ({
    default: module.ThemeSwitcher,
  }))
);

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-ankahe-border bg-ankahe-surface shadow-sm">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link 
          to="/" 
          className="min-h-11 inline-flex items-center pr-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ankahe-focus focus-visible:ring-offset-2"
          aria-label="Ankahe home"
        >
          <AnkaheMark wordmarkClassName="hidden sm:inline" />
        </Link>
        <div className="flex items-center gap-2 sm:gap-4">
          <nav className="type-ui-label flex items-center gap-2 sm:gap-3 text-ankahe-muted">
            <Link
              to="/how-it-works"
              className="hidden sm:inline-flex min-h-11 items-center justify-center px-2 transition-colors hover:text-ankahe-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ankahe-focus focus-visible:ring-offset-2"
            >
              FAQ
            </Link>
            <Link
              to="/privacy"
              className="hidden sm:inline-flex min-h-11 items-center justify-center px-2 transition-colors hover:text-ankahe-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ankahe-focus focus-visible:ring-offset-2"
            >
              Privacy
            </Link>
            <div className="hidden sm:block w-px h-4 bg-ankahe-border mx-1" aria-hidden="true" />
            <Link
              to="/manual/me"
              className="min-h-11 min-w-11 inline-flex items-center justify-center px-1 hover:text-ankahe-text transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ankahe-focus focus-visible:ring-offset-2"
            >
              Me
            </Link>
            <Link
              to="/manual/work"
              className="min-h-11 min-w-11 inline-flex items-center justify-center px-1 hover:text-ankahe-text transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ankahe-focus focus-visible:ring-offset-2"
            >
              Work
            </Link>
            <Link
              to="/manual/talk"
              className="hidden md:inline-flex min-h-11 min-w-11 items-center justify-center px-1 hover:text-ankahe-text transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ankahe-focus focus-visible:ring-offset-2"
            >
              Talk
            </Link>
            <Link
              to="/manual/us"
              className="hidden md:inline-flex min-h-11 min-w-11 items-center justify-center px-1 hover:text-ankahe-text transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ankahe-focus focus-visible:ring-offset-2"
            >
              Sync
            </Link>
          </nav>
          <div className="w-px h-4 bg-ankahe-border/50 mx-1" aria-hidden="true" />
          <Suspense fallback={<ThemeSwitcherFallback />}>
            <ThemeSwitcher />
          </Suspense>
        </div>
      </div>
    </header>
  );
}

function ThemeSwitcherFallback() {
  return (
    <span
      aria-hidden="true"
      className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border border-ankahe-border bg-ankahe-control"
    />
  );
}
