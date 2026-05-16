import { DownloadSimple } from "@phosphor-icons/react/dist/csr/DownloadSimple";
import { House } from "@phosphor-icons/react/dist/csr/House";
import { Info } from "@phosphor-icons/react/dist/csr/Info";
import { Plus } from "@phosphor-icons/react/dist/csr/Plus";
import type React from "react";
import { lazy, Suspense, useState } from "react";
import { NavLink } from "react-router-dom";
import { useIsMobile } from "../hooks/useIsMobile";
import { HOME_PATH, HOW_IT_WORKS_PATH } from "../lib/routes";
import type { ModeId } from "../lib/schemaTypes";
import { cn } from "../lib/utils";

const ManualModeSheet = lazy(() =>
  import("./ManualModeSheet").then((module) => ({
    default: module.ManualModeSheet,
  }))
);

const InstallSheet = lazy(() =>
  import("./InstallSheet").then((module) => ({
    default: module.InstallSheet,
  }))
);

interface MobileNavProps {
  onStart: (mode: ModeId) => void;
}

export function MobileNav({ onStart }: MobileNavProps) {
  const isMobile = useIsMobile();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isInstallOpen, setIsInstallOpen] = useState(false);
  const [shouldLoadManualSheet, setShouldLoadManualSheet] = useState(false);
  const [shouldLoadInstallSheet, setShouldLoadInstallSheet] = useState(false);

  if (!isMobile) return null;

  return (
    <>
      <nav
        aria-label="Primary"
        className="mobile-nav-shell fixed inset-x-0 bottom-[calc(1rem+var(--safe-area-bottom))] z-[60] mx-auto flex h-16 max-w-[22rem] items-center justify-center gap-1 rounded-xl border border-parichay-border bg-parichay-surface px-2 shadow-sm"
      >
        <MobileNavItem to={HOME_PATH} label="Home" icon={House} end />
        <MobileNavItem to={HOW_IT_WORKS_PATH} label="How it works" icon={Info} />
        <MobileNavButton
          label="Install"
          icon={DownloadSimple}
          onClick={() => {
            setShouldLoadInstallSheet(true);
            setIsInstallOpen(true);
          }}
        />
        <button
          type="button"
          onClick={() => {
            setShouldLoadManualSheet(true);
            setIsSheetOpen(true);
          }}
          aria-label="Create intro"
          className="ml-1 inline-flex min-h-12 min-w-12 items-center justify-center rounded-lg bg-parichay-accent text-parichay-on-accent shadow-sm transition-colors hover:bg-parichay-accent-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-parichay-focus focus-visible:ring-offset-2"
        >
          <Plus size={22} weight="bold" />
        </button>
      </nav>
      {shouldLoadManualSheet && (
        <Suspense fallback={null}>
          <ManualModeSheet
            open={isSheetOpen}
            onOpenChange={setIsSheetOpen}
            onStart={onStart}
          />
        </Suspense>
      )}
      {shouldLoadInstallSheet && (
        <Suspense fallback={null}>
          <InstallSheet
            open={isInstallOpen}
            onOpenChange={setIsInstallOpen}
          />
        </Suspense>
      )}
    </>
  );
}

function MobileNavItem({
  to,
  label,
  icon: Icon,
  end,
}: {
  to: string;
  label: string;
  icon: React.ComponentType<{ size?: number; weight?: "light" | "fill" }>;
  end?: boolean;
}) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) => cn(
        "type-caption flex min-h-12 min-w-16 flex-col items-center justify-center gap-0.5 rounded-md text-parichay-muted transition-colors hover:bg-parichay-control-hover hover:text-parichay-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-parichay-focus focus-visible:ring-offset-2",
        isActive && "text-parichay-accent"
      )}
    >
      {({ isActive }) => {
        return (
          <>
            <Icon size={20} weight={isActive ? "fill" : "light"} />
            <span>{label}</span>
          </>
        );
      }}
    </NavLink>
  );
}

function MobileNavButton({
  label,
  icon: Icon,
  onClick,
}: {
  label: string;
  icon: React.ComponentType<{ size?: number; weight?: "light" | "fill" }>;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="type-caption flex min-h-12 min-w-16 flex-col items-center justify-center gap-0.5 rounded-md text-parichay-muted transition-colors hover:bg-parichay-control-hover hover:text-parichay-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-parichay-focus focus-visible:ring-offset-2"
    >
      <Icon size={20} weight="light" />
      <span>{label}</span>
    </button>
  );
}
