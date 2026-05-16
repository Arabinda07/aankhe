import { DownloadSimple } from "@phosphor-icons/react/dist/csr/DownloadSimple";
import { House } from "@phosphor-icons/react/dist/csr/House";
import { Info } from "@phosphor-icons/react/dist/csr/Info";
import { Plus } from "@phosphor-icons/react/dist/csr/Plus";
import { ShieldCheck } from "@phosphor-icons/react/dist/csr/ShieldCheck";
import type React from "react";
import { lazy, Suspense, useState } from "react";
import { Link } from "react-router-dom";
import { HOME_PATH, HOW_IT_WORKS_PATH, PRIVACY_PATH } from "../lib/routes";
import { BottomSheet } from "./primitives/BottomSheet";

const InstallSheet = lazy(() =>
  import("./InstallSheet").then((module) => ({
    default: module.InstallSheet,
  }))
);

interface MobileHeaderMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MobileHeaderMenu({ open, onOpenChange }: MobileHeaderMenuProps) {
  const [isInstallSheetOpen, setIsInstallSheetOpen] = useState(false);
  const [shouldLoadInstallSheet, setShouldLoadInstallSheet] = useState(false);

  const closeMenu = () => onOpenChange(false);

  const openInstallSheet = () => {
    closeMenu();
    setShouldLoadInstallSheet(true);
    setIsInstallSheetOpen(true);
  };

  return (
    <>
      <BottomSheet
        contentId="mobile-header-menu"
        open={open}
        onOpenChange={onOpenChange}
        title="Menu"
        description="Navigation and app actions."
      >
        <div className="space-y-7">
          <nav aria-label="Mobile site navigation" className="grid gap-2">
            <MenuLink to={HOME_PATH} label="Home" icon={<House size={20} weight="light" />} onClick={closeMenu} />
            <MenuLink to={HOW_IT_WORKS_PATH} label="How it works" icon={<Info size={20} weight="light" />} onClick={closeMenu} />
            <MenuLink to={PRIVACY_PATH} label="Privacy" icon={<ShieldCheck size={20} weight="light" />} onClick={closeMenu} />
            <MenuLink to="/#onboarding" label="Create intro" icon={<Plus size={20} weight="light" />} onClick={closeMenu} />
          </nav>

          <button
            type="button"
            onClick={openInstallSheet}
            className="type-ui-label inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md border border-parichay-border bg-parichay-surface-soft px-4 text-parichay-text transition-colors hover:bg-parichay-control-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-parichay-focus focus-visible:ring-offset-2"
          >
            <DownloadSimple size={18} weight="light" aria-hidden="true" />
            Install Parichay
          </button>
        </div>
      </BottomSheet>

      {shouldLoadInstallSheet && (
        <Suspense fallback={null}>
          <InstallSheet
            open={isInstallSheetOpen}
            onOpenChange={setIsInstallSheetOpen}
          />
        </Suspense>
      )}
    </>
  );
}

function MenuLink({
  to,
  label,
  icon,
  onClick,
}: {
  to: string;
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="type-ui-label inline-flex min-h-12 items-center gap-3 rounded-md border border-parichay-border bg-parichay-surface-soft px-4 text-parichay-text transition-colors hover:bg-parichay-control-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-parichay-focus focus-visible:ring-offset-2"
    >
      <span className="text-parichay-accent" aria-hidden="true">{icon}</span>
      {label}
    </Link>
  );
}
