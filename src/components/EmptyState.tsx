import { MagnifyingGlass } from "@phosphor-icons/react/dist/csr/MagnifyingGlass";
import { Notebook } from "@phosphor-icons/react/dist/csr/Notebook";
import { useEffect, useState } from "react";
import { SoftButton } from "./SoftButton";

interface EmptyStateProps {
  variant: "first-run" | "no-results";
  onAction?: () => void;
  actionLabel?: string;
}

const FIRST_RUN_KEY = "parichay-first-run-dismissed";

export function EmptyState({ variant, onAction, actionLabel }: EmptyStateProps) {
  const [showHint, setShowHint] = useState(() => (
    variant === "first-run" &&
    typeof localStorage !== "undefined" &&
    localStorage.getItem(FIRST_RUN_KEY) !== "true"
  ));

  useEffect(() => {
    if (variant !== "first-run" || !showHint) return;

    const dismiss = () => {
      localStorage.setItem(FIRST_RUN_KEY, "true");
      setShowHint(false);
    };

    window.addEventListener("pointerdown", dismiss, { once: true });
    return () => window.removeEventListener("pointerdown", dismiss);
  }, [showHint, variant]);

  if (variant === "no-results") {
    return (
      <div className="flex min-h-64 flex-col items-center justify-center gap-4 text-center">
        <MagnifyingGlass size={48} weight="light" className="text-parichay-sandal" />
        <div className="space-y-2">
          <h3 className="type-reading-heading text-parichay-heading">No answers found</h3>
          <p className="type-caption text-parichay-muted">Try a different word, or check for typos.</p>
        </div>
        {onAction && (
          <SoftButton variant="secondary" onClick={onAction}>
            {actionLabel || "Clear search"}
          </SoftButton>
        )}
      </div>
    );
  }

  return (
    <div className="flex min-h-72 flex-col items-center justify-center gap-5 text-center">
      <div className="relative">
        <span className="absolute inset-0 rounded-full border border-parichay-accent/40 motion-safe:animate-ping" aria-hidden="true" />
        <Notebook size={64} weight="light" className="relative text-parichay-accent" />
      </div>
      <div className="space-y-2">
        <h3 className="type-reading-heading text-parichay-heading">Your intro is blank</h3>
        <p className="type-caption text-parichay-muted">Tap + to start answering questions.</p>
      </div>
      {showHint && (
        <p className="type-caption max-w-xs rounded-sm border border-parichay-border bg-parichay-sandal-soft px-3 py-2 text-parichay-text">
          The start action opens a fresh intro whenever you need a different angle.
        </p>
      )}
    </div>
  );
}
