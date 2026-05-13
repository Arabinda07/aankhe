import { Link } from "react-router-dom";
import { AnkaheMark } from "./AnkaheMark";
import { ThemeSwitcher } from "./ThemeSwitcher";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-ankahe-border/70 bg-ankahe-bg/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-3">
        <Link 
          to="/" 
          className="min-h-11 inline-flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ankahe-focus focus-visible:ring-offset-2"
          aria-label="Ankahe home"
        >
          <AnkaheMark wordmarkClassName="hidden sm:inline" />
        </Link>
        <div className="flex items-center gap-2 sm:gap-4">
          <nav className="type-ui-label flex items-center gap-2 sm:gap-5 text-ankahe-muted">
            <Link
              to="/how-it-works"
              className="hidden sm:inline-flex min-h-11 items-center justify-center px-1 transition-colors hover:text-ankahe-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ankahe-focus focus-visible:ring-offset-2"
            >
              How it works
            </Link>
            <Link
              to="/privacy"
              className="hidden sm:inline-flex min-h-11 items-center justify-center px-1 transition-colors hover:text-ankahe-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ankahe-focus focus-visible:ring-offset-2"
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
          </nav>
          <div className="w-px h-4 bg-ankahe-border/50 mx-1" aria-hidden="true" />
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
}
