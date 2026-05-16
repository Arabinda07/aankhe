import { DeviceMobile } from "@phosphor-icons/react/dist/csr/DeviceMobile";
import { DotsThreeOutline } from "@phosphor-icons/react/dist/csr/DotsThreeOutline";
import { DownloadSimple } from "@phosphor-icons/react/dist/csr/DownloadSimple";
import { Share } from "@phosphor-icons/react/dist/csr/Share";
import type React from "react";
import { useInstallPrompt } from "../hooks/useInstallPrompt";
import { BrandIllustration } from "./BrandIllustration";
import { BottomSheet } from "./primitives/BottomSheet";

interface InstallSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function InstallSheet({ open, onOpenChange }: InstallSheetProps) {
  const { canPrompt, isStandalone, prompt, status } = useInstallPrompt();

  const handleInstall = async () => {
    await prompt();
    onOpenChange(false);
  };

  return (
    <BottomSheet
      open={open}
      onOpenChange={onOpenChange}
      title="Install Parichay"
      description="Keep Parichay one tap away."
    >
      <div className="space-y-4">
        <BrandIllustration name="install-prompt" className="mx-auto h-32 w-auto" />
        {isStandalone ? (
          <InstallMessage
            icon={<DeviceMobile size={24} weight="light" />}
            title="Already on your home screen"
            body="Parichay is running in installed-app mode on this device."
          />
        ) : canPrompt ? (
          <>
            <InstallMessage
              icon={<DownloadSimple size={24} weight="light" />}
              title="Ready to install"
              body="Your browser can add Parichay to your home screen now."
            />
            <button
              type="button"
              onClick={handleInstall}
              className="type-ui-label inline-flex min-h-11 w-full items-center justify-center rounded-md bg-parichay-accent px-4 text-parichay-on-accent transition-colors hover:bg-parichay-accent-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-parichay-focus focus-visible:ring-offset-2"
            >
              Install app
            </button>
          </>
        ) : status === "ios" ? (
          <div className="space-y-3">
            <InstallMessage
              icon={<Share size={24} weight="light" />}
              title="Use the iOS share sheet"
              body="Open Share in Safari, then choose Add to Home Screen."
            />
            <InstallStep label="1" text="Tap the Share button in Safari." />
            <InstallStep label="2" text="Choose Add to Home Screen." />
            <InstallStep label="3" text="Confirm the name Parichay." />
          </div>
        ) : (
          <div className="space-y-3">
            <InstallMessage
              icon={<DotsThreeOutline size={24} weight="light" />}
              title="Use your browser menu"
              body="Open the browser menu and choose Install app or Add to home screen."
            />
            <InstallStep label="1" text="Use Chrome, Edge, or another PWA-capable browser." />
            <InstallStep label="2" text="Open the browser menu." />
            <InstallStep label="3" text="Choose Install app or Add to home screen when it appears." />
          </div>
        )}
      </div>
    </BottomSheet>
  );
}

function InstallMessage({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="flex gap-3 rounded-md border border-parichay-border bg-parichay-surface-soft p-4 text-left">
      <div className="mt-0.5 text-parichay-accent" aria-hidden="true">
        {icon}
      </div>
      <div className="space-y-1">
        <h3 className="type-panel-title text-parichay-heading">{title}</h3>
        <p className="type-caption text-parichay-muted">{body}</p>
      </div>
    </div>
  );
}

function InstallStep({ label, text }: { label: string; text: string }) {
  return (
    <div className="flex items-center gap-3 rounded-md border border-parichay-border bg-parichay-surface p-3">
      <span className="type-meta flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-parichay-sandal text-parichay-text">
        {label}
      </span>
      <p className="type-caption text-parichay-muted">{text}</p>
    </div>
  );
}
