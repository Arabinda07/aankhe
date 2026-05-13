import { Link } from "react-router-dom";
import { AnkaheMark } from "./AnkaheMark";

export function SiteFooter() {
  return (
    <footer className="border-t border-ankahe-border/50 bg-ankahe-surface">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <AnkaheMark tileClassName="h-9 w-9 rounded-md" wordmarkClassName="text-[1.55rem]" />
            <p className="type-caption text-ankahe-muted max-w-xs">
              A private place to write what usually goes unsaid. Built for
              clarity, empathy, and better understanding.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h4 className="type-meta text-ankahe-accent-dark">
              Manuals
            </h4>
            <nav aria-label="Manuals" className="type-ui-label flex flex-col gap-2 text-ankahe-muted">
              <Link
                to="/manual/me"
                className="min-h-11 inline-flex items-center hover:text-ankahe-text transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ankahe-accent focus-visible:ring-offset-2"
              >
                Me Manual
              </Link>
              <Link
                to="/manual/work"
                className="min-h-11 inline-flex items-center hover:text-ankahe-text transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ankahe-accent focus-visible:ring-offset-2"
              >
                Work Manual
              </Link>
              <span aria-disabled="true" className="min-h-11 inline-flex items-center text-ankahe-muted/50">
                Talk Manual (Coming Soon)
              </span>
              <span aria-disabled="true" className="min-h-11 inline-flex items-center text-ankahe-muted/50">
                Us Manual (Coming Soon)
              </span>
            </nav>
          </div>

          {/* Privacy Promise */}
          <div className="space-y-4">
            <h4 className="type-meta text-ankahe-accent-dark">
              Our Promise
            </h4>
            <p className="type-caption text-ankahe-muted">
              No accounts. No databases. Your data lives only in your browser
              memory or specifically crafted URLs. When you close the tab, it's
              gone for good.
            </p>
          </div>
        </div>

        <div className="type-meta mt-16 pt-8 border-t border-ankahe-border/50 flex flex-col md:flex-row justify-between items-center gap-4 text-ankahe-muted">
          <span>Copyright {new Date().getFullYear()} Ankahe</span>
          <span>v1.0 MVP</span>
        </div>
      </div>
    </footer>
  );
}
