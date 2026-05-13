import { Link } from "react-router-dom";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 bg-ankahe-bg/90 backdrop-blur-md border-b border-ankahe-border/50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link 
          to="/" 
          className="min-h-11 inline-flex items-center font-display text-2xl sm:text-3xl font-bold leading-none text-ankahe-accent-dark hover:text-ankahe-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ankahe-accent focus-visible:ring-offset-2"
        >
          Ankahe
        </Link>
        <nav className="type-ui-label flex gap-4 sm:gap-8 text-ankahe-muted">
          <Link
            to="/manual/me"
            className="min-h-11 min-w-11 inline-flex items-center justify-center px-1 hover:text-ankahe-text transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ankahe-accent focus-visible:ring-offset-2"
          >
            Me
          </Link>
          <Link
            to="/manual/work"
            className="min-h-11 min-w-11 inline-flex items-center justify-center px-1 hover:text-ankahe-text transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ankahe-accent focus-visible:ring-offset-2"
          >
            Work
          </Link>
          <span
            aria-disabled="true"
            className="hidden min-h-11 min-w-11 items-center justify-center px-1 opacity-50 sm:inline-flex"
            title="Coming soon"
          >
            Talk
          </span>
          <span
            aria-disabled="true"
            className="hidden min-h-11 min-w-11 items-center justify-center px-1 opacity-50 sm:inline-flex"
            title="Coming soon"
          >
            Us
          </span>
        </nav>
      </div>
    </header>
  );
}
