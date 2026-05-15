import { BookOpenText } from "@phosphor-icons/react/dist/csr/BookOpenText";
import { Briefcase } from "@phosphor-icons/react/dist/csr/Briefcase";
import { ChatCenteredText } from "@phosphor-icons/react/dist/csr/ChatCenteredText";
import { UsersThree } from "@phosphor-icons/react/dist/csr/UsersThree";
import type React from "react";
import { PROTOCOL_MANIFEST } from "../lib/protocolManifest";
import type { ModeId } from "../lib/schemaTypes";
import { cn } from "../lib/utils";
import { BottomSheet } from "./primitives/BottomSheet";

interface ManualModeSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onStart: (mode: ModeId) => void;
}

const MODES: Array<{ id: ModeId; icon: React.ReactNode }> = [
  { id: "me", icon: <BookOpenText size={22} weight="light" /> },
  { id: "work", icon: <Briefcase size={22} weight="light" /> },
  { id: "talk", icon: <ChatCenteredText size={22} weight="light" /> },
  { id: "us", icon: <UsersThree size={22} weight="light" /> },
];

export function ManualModeSheet({ open, onOpenChange, onStart }: ManualModeSheetProps) {
  return (
    <BottomSheet
      open={open}
      onOpenChange={onOpenChange}
      title="Start a manual"
      description="Choose the kind of manual you want to write."
    >
      <div className="space-y-3">
        {MODES.map(({ id, icon }) => {
          const mode = PROTOCOL_MANIFEST[id];

          return (
            <button
              key={id}
              type="button"
              onClick={() => {
                onOpenChange(false);
                onStart(id);
              }}
              className={cn(
                "group grid min-h-14 w-full grid-cols-[3px_1fr_auto] items-center gap-4 rounded-md border border-parichay-border bg-parichay-paper px-0 py-0 text-left transition-colors",
                "hover:border-parichay-border-strong hover:bg-parichay-paper-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-parichay-focus focus-visible:ring-offset-2"
              )}
            >
              <span className="h-full rounded-l-md bg-transparent transition-colors group-hover:bg-parichay-accent" aria-hidden="true" />
              <span className="min-w-0 py-3">
                <span className="type-reading-heading block text-parichay-heading">{mode.label}</span>
                <span className="type-caption block truncate text-parichay-muted">{mode.description}</span>
              </span>
              <span className="pr-4 text-parichay-accent" aria-hidden="true">{icon}</span>
            </button>
          );
        })}
      </div>
    </BottomSheet>
  );
}
