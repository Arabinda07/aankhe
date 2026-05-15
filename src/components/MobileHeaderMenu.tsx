import { BookOpenText } from "@phosphor-icons/react/dist/csr/BookOpenText";
import { Briefcase } from "@phosphor-icons/react/dist/csr/Briefcase";
import { ChatCenteredText } from "@phosphor-icons/react/dist/csr/ChatCenteredText";
import { DownloadSimple } from "@phosphor-icons/react/dist/csr/DownloadSimple";
import { House } from "@phosphor-icons/react/dist/csr/House";
import { Info } from "@phosphor-icons/react/dist/csr/Info";
import { Plus } from "@phosphor-icons/react/dist/csr/Plus";
import { ShieldCheck } from "@phosphor-icons/react/dist/csr/ShieldCheck";
import { UsersThree } from "@phosphor-icons/react/dist/csr/UsersThree";
import type React from "react";
import { lazy, Suspense, useState } from "react";
import { Link } from "react-router-dom";
import { HOME_PATH, HOW_IT_WORKS_PATH, PRIVACY_PATH } from "../lib/routes";
import { PROTOCOL_MANIFEST } from "../lib/protocolManifest";
import type { ModeId } from "../lib/schemaTypes";
import { BottomSheet } from "./primitives/BottomSheet";

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

interface MobileHeaderMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onStart: (mode: ModeId) => void;
}

const MANUAL_MODES: Array<{
  id: ModeId;
  label: string;
  icon: React.ReactNode;
}> = [
  { id: "me", label: "Me", icon: <BookOpenText size={20} weight="light" /> },
  { id: "work", label: "Work", icon: <Briefcase size={20} weight="light" /> },
  { id: "talk", label: "Talk", icon: <ChatCenteredText size={20} weight="light" /> },
  { id: "us", label: "Sync", icon: <UsersThree size={20} weight="light" /> },
];

export function MobileHeaderMenu({ open, onOpenChange, onStart }: MobileHeaderMenuProps) {
  const [isManualSheetOpen, setIsManualSheetOpen] = useState(false);
  const [isInstallSheetOpen, setIsInstallSheetOpen] = useState(false);
  const [shouldLoadManualSheet, setShouldLoadManualSheet] = useState(false);
  const [shouldLoadInstallSheet, setShouldLoadInstallSheet] = useState(false);

  const closeMenu = () => onOpenChange(false);

  const openManualSheet = () => {
    closeMenu();
    setShouldLoadManualSheet(true);
    setIsManualSheetOpen(true);
  };

  const openInstallSheet = () => {
    closeMenu();
    setShouldLoadInstallSheet(true);
    setIsInstallSheetOpen(true);
  };

  const startMode = (mode: ModeId) => {
    setIsManualSheetOpen(false);
    closeMenu();
    onStart(mode);
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
            <MenuLink to={HOW_IT_WORKS_PATH} label="FAQ" icon={<Info size={20} weight="light" />} onClick={closeMenu} />
            <MenuLink to={PRIVACY_PATH} label="Privacy" icon={<ShieldCheck size={20} weight="light" />} onClick={closeMenu} />
          </nav>

          <div className="space-y-3">
            <button
              type="button"
              onClick={openManualSheet}
              className="type-ui-label inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-parichay-accent px-4 text-parichay-on-accent transition-colors hover:bg-parichay-accent-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-parichay-focus focus-visible:ring-offset-2"
            >
              <Plus size={18} weight="bold" aria-hidden="true" />
              Start a manual
            </button>

            <div className="grid gap-2" aria-label="Manual shortcuts">
              {MANUAL_MODES.map(({ id, icon, label }) => {
                const mode = PROTOCOL_MANIFEST[id];

                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => startMode(id)}
                    className="group grid min-h-14 w-full grid-cols-[1fr_auto] items-center gap-4 rounded-md border border-parichay-border bg-parichay-paper px-4 py-3 text-left transition-colors hover:border-parichay-border-strong hover:bg-parichay-paper-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-parichay-focus focus-visible:ring-offset-2"
                  >
                    <span className="min-w-0">
                      <span className="type-reading-heading block text-parichay-heading">{label}</span>
                      <span className="type-caption block truncate text-parichay-muted">{mode.description}</span>
                    </span>
                    <span className="text-parichay-accent" aria-hidden="true">{icon}</span>
                  </button>
                );
              })}
            </div>
          </div>

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

      {shouldLoadManualSheet && (
        <Suspense fallback={null}>
          <ManualModeSheet
            open={isManualSheetOpen}
            onOpenChange={setIsManualSheetOpen}
            onStart={startMode}
          />
        </Suspense>
      )}
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
