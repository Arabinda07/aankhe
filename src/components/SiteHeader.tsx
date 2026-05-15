import { lazy, Suspense, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { HOW_IT_WORKS_PATH, MANUAL_PATHS, PRIVACY_PATH } from "../lib/routes";
import { cn } from "../lib/utils";
import { ParichayMark } from "./ParichayMark";

const ThemeSwitcher = lazy(() =>
  import("./ThemeSwitcher").then((module) => ({
    default: module.ThemeSwitcher,
  }))
);

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-parichay-border bg-parichay-surface shadow-sm">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-2 px-4 sm:gap-4 sm:px-6">
        <Link 
          to="/" 
          className="min-h-11 shrink-0 inline-flex items-center pr-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-parichay-focus focus-visible:ring-offset-2"
          aria-label="Parichay home"
        >
          <ParichayMark wordmarkClassName="hidden sm:inline" />
        </Link>
        <div className="flex min-w-0 flex-1 items-center justify-end gap-2 sm:gap-4">
          <nav className="type-ui-label scrollbar-none flex min-w-0 items-center gap-2 overflow-x-auto text-parichay-muted sm:gap-3" aria-label="Site">
            <NavLink
              to={HOW_IT_WORKS_PATH}
              className={infoNavClassName}
            >
              FAQ
            </NavLink>
            <NavLink
              to={PRIVACY_PATH}
              className={infoNavClassName}
            >
              Privacy
            </NavLink>
            <div className="hidden sm:block w-px h-4 bg-parichay-border mx-1" aria-hidden="true" />
            <Link
              to={MANUAL_PATHS.me}
              className="hidden min-h-11 min-w-11 shrink-0 items-center justify-center px-1 transition-colors hover:text-parichay-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-parichay-focus focus-visible:ring-offset-2 sm:inline-flex"
            >
              Me
            </Link>
            <Link
              to={MANUAL_PATHS.work}
              className="hidden min-h-11 min-w-11 shrink-0 items-center justify-center px-1 transition-colors hover:text-parichay-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-parichay-focus focus-visible:ring-offset-2 sm:inline-flex"
            >
              Work
            </Link>
            <Link
              to={MANUAL_PATHS.talk}
              className="hidden min-h-11 min-w-11 shrink-0 items-center justify-center px-1 transition-colors hover:text-parichay-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-parichay-focus focus-visible:ring-offset-2 sm:inline-flex"
            >
              Talk
            </Link>
            <Link
              to={MANUAL_PATHS.us}
              className="hidden min-h-11 min-w-11 shrink-0 items-center justify-center px-1 transition-colors hover:text-parichay-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-parichay-focus focus-visible:ring-offset-2 sm:inline-flex"
            >
              Sync
            </Link>
          </nav>
          <div className="shrink-0 w-px h-4 bg-parichay-border/50 mx-1" aria-hidden="true" />
          <DeferredThemeSwitcher />
        </div>
      </div>
    </header>
  );
}

function DeferredThemeSwitcher() {
  const [shouldLoad, setShouldLoad] = useState(false);

  if (!shouldLoad) {
    return <ThemeSwitcherFallback onLoad={() => setShouldLoad(true)} />;
  }

  return (
    <Suspense fallback={<ThemeSwitcherFallback onLoad={() => setShouldLoad(true)} />}>
      <ThemeSwitcher />
    </Suspense>
  );
}

function ThemeSwitcherFallback({ onLoad }: { onLoad: () => void }) {
  return (
    <button
      type="button"
      aria-label="Load theme controls"
      onClick={onLoad}
      onFocus={onLoad}
      onPointerEnter={onLoad}
      className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-md border border-parichay-border bg-parichay-control text-parichay-muted transition-colors hover:bg-parichay-control-hover hover:text-parichay-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-parichay-focus focus-visible:ring-offset-2"
    >
      <span aria-hidden="true" className="block h-4 w-4 rounded-full border border-current" />
    </button>
  );
}

function infoNavClassName({ isActive }: { isActive: boolean }) {
  return cn(
    "min-h-11 shrink-0 inline-flex items-center justify-center px-2 transition-colors hover:text-parichay-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-parichay-focus focus-visible:ring-offset-2",
    isActive ? "text-parichay-text underline decoration-parichay-accent/45 underline-offset-8" : "text-parichay-muted"
  );
}
