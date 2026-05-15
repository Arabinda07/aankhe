import { X } from "@phosphor-icons/react/dist/csr/X";
import { useInstallPrompt } from "../hooks/useInstallPrompt";
import { ParichayMark } from "./ParichayMark";

interface InstallBannerProps {
  answeredCount: number;
}

export function InstallBanner({ answeredCount }: InstallBannerProps) {
  const { dismiss, isReady, prompt } = useInstallPrompt();

  if (!isReady || answeredCount < 2) return null;

  return (
    <aside className="sticky z-50 mx-auto mb-4 flex w-[min(calc(100%-2rem),28rem)] items-center gap-3 rounded-md border border-parichay-border bg-parichay-surface p-3 text-parichay-text shadow-sm bottom-[var(--mobile-nav-total)]">
      <ParichayMark wordmarkClassName="sr-only" className="shrink-0" />
      <p className="type-caption min-w-0 flex-1">Save this to your home screen</p>
      <button
        type="button"
        onClick={prompt}
        className="type-ui-label min-h-11 rounded-md bg-parichay-accent px-4 text-parichay-on-accent transition-colors hover:bg-parichay-accent-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-parichay-focus focus-visible:ring-offset-2"
      >
        Add
      </button>
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss install prompt"
        className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md text-parichay-muted transition-colors hover:bg-parichay-control-hover hover:text-parichay-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-parichay-focus focus-visible:ring-offset-2"
      >
        <X size={16} weight="light" />
      </button>
    </aside>
  );
}
