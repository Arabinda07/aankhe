import { Link } from "react-router-dom";
import { AnkaheMark } from "./AnkaheMark";
import { ThemeSwitcher } from "./ThemeSwitcher";

export function SiteHeader() {
  return (
    <div className="sticky top-6 z-50 px-4 flex justify-center pointer-events-none">
      <header className="pointer-events-auto flex items-center justify-between gap-4 rounded-full border border-ankahe-border/50 bg-ankahe-bg/80 px-4 sm:px-6 h-14 backdrop-blur-2xl shadow-sm">
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
          <ThemeSwitcher />
        </div>
      </header>
    </div>
  );
}
