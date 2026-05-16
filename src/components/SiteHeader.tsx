import { lazy, Suspense, useRef, useState } from "react";
import { List } from "@phosphor-icons/react/dist/csr/List";
import { Link, NavLink } from "react-router-dom";
import { HOW_IT_WORKS_PATH, PRIVACY_PATH } from "../lib/routes";
import { cn } from "../lib/utils";
import { ParichayMark } from "./ParichayMark";
import { useInstallPrompt } from "../hooks/useInstallPrompt";

const MobileHeaderMenu = lazy(() =>
  import("./MobileHeaderMenu").then((module) => ({
    default: module.MobileHeaderMenu,
  }))
);

const ThemeSwitcher = lazy(() =>
  import("./ThemeSwitcher").then((module) => ({
    default: module.ThemeSwitcher,
  }))
);

export function SiteHeader() {
  const { isStandalone } = useInstallPrompt();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [shouldLoadMobileMenu, setShouldLoadMobileMenu] = useState(false);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);

  const prepareMobileMenu = () => setShouldLoadMobileMenu(true);
  const openMobileMenu = () => {
    setShouldLoadMobileMenu(true);
    setIsMobileMenuOpen(true);
  };
  const handleMobileMenuOpenChange = (open: boolean) => {
    setIsMobileMenuOpen(open);

    if (!open) {
      window.requestAnimationFrame(() => {
        if (!document.documentElement.hasAttribute("data-sheet-open")) {
          mobileMenuButtonRef.current?.focus();
        }
      });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-parichay-border bg-parichay-surface shadow-sm">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-2 px-3 sm:gap-4 sm:px-6">
        <Link 
          to="/" 
          className="min-h-11 shrink-0 inline-flex items-center pr-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-parichay-focus focus-visible:ring-offset-2"
          aria-label="Parichay home"
        >
          <ParichayMark wordmarkClassName="hidden sm:inline" />
        </Link>
        <div className="flex min-w-0 flex-1 items-center justify-end gap-2 sm:gap-4">
          <nav className="type-ui-label hidden min-w-0 items-center gap-2 overflow-x-auto text-parichay-muted sm:flex sm:gap-3" aria-label="Site">
            {!isStandalone && (
              <>
                <NavLink
                  to={HOW_IT_WORKS_PATH}
                  className={infoNavClassName}
                >
                  How it works
                </NavLink>
                <NavLink
                  to={PRIVACY_PATH}
                  className={infoNavClassName}
                >
                  Privacy
                </NavLink>
              </>
            )}
            <Link
              to="/#onboarding"
              className={cn(
                "inline-flex min-h-11 shrink-0 items-center justify-center rounded-sm px-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-parichay-focus focus-visible:ring-offset-2",
                isStandalone ? "bg-parichay-accent text-parichay-on-accent hover:bg-parichay-accent-dark" : "text-parichay-text hover:bg-parichay-control-hover"
              )}
            >
              Create intro
            </Link>
          </nav>
          <div className="hidden h-4 w-px shrink-0 bg-parichay-border/50 sm:block" aria-hidden="true" />
          <DeferredThemeSwitcher />
          <button
            ref={mobileMenuButtonRef}
            type="button"
            aria-label="Open menu"
            aria-controls="mobile-header-menu"
            aria-expanded={isMobileMenuOpen}
            onClick={openMobileMenu}
            onFocus={prepareMobileMenu}
            onPointerEnter={prepareMobileMenu}
            className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-md border border-parichay-border bg-parichay-control text-parichay-muted transition-colors hover:bg-parichay-control-hover hover:text-parichay-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-parichay-focus focus-visible:ring-offset-2 sm:hidden"
          >
            <List size={24} weight="bold" aria-hidden="true" />
          </button>
        </div>
      </div>
      {shouldLoadMobileMenu && (
        <Suspense fallback={null}>
          <MobileHeaderMenu
            open={isMobileMenuOpen}
            onOpenChange={handleMobileMenuOpenChange}
          />
        </Suspense>
      )}
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
      className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-md text-parichay-muted transition-colors hover:bg-parichay-control-hover hover:text-parichay-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-parichay-focus focus-visible:ring-offset-2"
    >
      <span aria-hidden="true" className="block h-4 w-4 rounded-sm border border-current" />
    </button>
  );
}

function infoNavClassName({ isActive }: { isActive: boolean }) {
  return cn(
    "min-h-11 shrink-0 inline-flex items-center justify-center px-2 transition-colors hover:text-parichay-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-parichay-focus focus-visible:ring-offset-2",
    isActive ? "font-extrabold text-parichay-text" : "text-parichay-muted"
  );
}
