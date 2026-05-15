import { BookOpenText } from "@phosphor-icons/react/dist/csr/BookOpenText";
import { House } from "@phosphor-icons/react/dist/csr/House";
import { Info } from "@phosphor-icons/react/dist/csr/Info";
import { Plus } from "@phosphor-icons/react/dist/csr/Plus";
import type React from "react";
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useIsMobile } from "../hooks/useIsMobile";
import { HOME_PATH, HOW_IT_WORKS_PATH, MANUAL_PATH_PREFIX, MANUAL_PATHS } from "../lib/routes";
import type { ModeId } from "../lib/schemaTypes";
import { cn } from "../lib/utils";
import { ManualModeSheet } from "./ManualModeSheet";

interface MobileNavProps {
  onStart: (mode: ModeId) => void;
}

export function MobileNav({ onStart }: MobileNavProps) {
  const isMobile = useIsMobile();
  const location = useLocation();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  if (!isMobile) return null;

  const manualPath = location.pathname.startsWith(MANUAL_PATH_PREFIX)
    ? location.pathname
    : MANUAL_PATHS.me;

  return (
    <>
      <nav
        aria-label="Primary"
        className="mobile-nav-shell fixed inset-x-0 bottom-[calc(1rem+var(--safe-area-bottom))] z-[60] mx-auto flex h-16 max-w-[22rem] items-center justify-center gap-1 rounded-[2rem] border border-parichay-border bg-parichay-surface px-2 shadow-sm"
      >
        <MobileNavItem to={HOME_PATH} label="Home" icon={House} pathname={location.pathname} end />
        <MobileNavItem to={manualPath} label="Manual" icon={BookOpenText} pathname={location.pathname} manual />
        <MobileNavItem to={HOW_IT_WORKS_PATH} label="FAQ" icon={Info} pathname={location.pathname} />
        <button
          type="button"
          onClick={() => setIsSheetOpen(true)}
          aria-label="Start a manual"
          className="ml-1 inline-flex min-h-12 min-w-12 items-center justify-center rounded-full bg-parichay-accent text-parichay-on-accent shadow-sm transition-colors hover:bg-parichay-accent-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-parichay-focus focus-visible:ring-offset-2"
        >
          <Plus size={22} weight="bold" />
        </button>
      </nav>
      <ManualModeSheet
        open={isSheetOpen}
        onOpenChange={setIsSheetOpen}
        onStart={onStart}
      />
    </>
  );
}

function MobileNavItem({
  to,
  label,
  icon: Icon,
  pathname,
  end,
  manual,
}: {
  to: string;
  label: string;
  icon: React.ComponentType<{ size?: number; weight?: "light" | "fill" }>;
  pathname: string;
  end?: boolean;
  manual?: boolean;
}) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) => cn(
        "type-caption flex min-h-12 min-w-16 flex-col items-center justify-center gap-0.5 rounded-full text-parichay-muted transition-colors hover:bg-parichay-control-hover hover:text-parichay-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-parichay-focus focus-visible:ring-offset-2",
        (isActive || (manual && pathname.startsWith(MANUAL_PATH_PREFIX))) && "text-parichay-accent"
      )}
    >
      {({ isActive }) => {
        const active = isActive || (manual && pathname.startsWith(MANUAL_PATH_PREFIX));
        return (
          <>
            <Icon size={20} weight={active ? "fill" : "light"} />
            <span>{label}</span>
          </>
        );
      }}
    </NavLink>
  );
}
