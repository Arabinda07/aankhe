import * as Dialog from "@radix-ui/react-dialog";
import { X } from "@phosphor-icons/react/dist/csr/X";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type React from "react";
import { useEffect } from "react";
import { cn } from "../../lib/utils";
import "./BottomSheet.css";

interface BottomSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  contentId?: string;
}

export function BottomSheet({
  open,
  onOpenChange,
  title,
  description,
  children,
  className,
  contentId,
}: BottomSheetProps) {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    document.documentElement.toggleAttribute("data-sheet-open", open);
    return () => document.documentElement.removeAttribute("data-sheet-open");
  }, [open]);

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                className="fixed inset-0 z-[70] bg-parichay-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
              />
            </Dialog.Overlay>
            <Dialog.Content
              asChild
            >
              <motion.div
                id={contentId}
                className={cn(
                  "fixed inset-x-0 bottom-0 z-[80] mx-auto max-h-[88dvh] w-full max-w-xl overflow-y-auto rounded-t-lg border border-parichay-border bg-parichay-surface p-5 pb-[calc(1.25rem+var(--safe-area-bottom))] text-parichay-text shadow-sm focus:outline-none",
                  className
                )}
                initial={{ y: prefersReducedMotion ? 0 : "100%" }}
                animate={{ y: 0 }}
                exit={{ y: prefersReducedMotion ? 0 : "100%" }}
                transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                drag={prefersReducedMotion ? false : "y"}
                dragDirectionLock
                dragConstraints={{ top: 0, bottom: 0 }}
                dragElastic={{ top: 0, bottom: 0.38 }}
                onDragEnd={(_, info) => {
                  if (info.offset.y > 60 || info.velocity.y > 500) {
                    onOpenChange(false);
                  }
                }}
              >
                <Dialog.Close asChild>
                  <button
                    type="button"
                    aria-label="Close"
                    className="absolute right-4 top-4 inline-flex min-h-11 min-w-11 items-center justify-center rounded-md text-parichay-muted transition-colors hover:bg-parichay-control-hover hover:text-parichay-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-parichay-focus focus-visible:ring-offset-2"
                  >
                    <X size={18} weight="bold" aria-hidden="true" />
                  </button>
                </Dialog.Close>
                <div className="mx-auto mb-5 h-1 w-12 rounded-full bg-parichay-border-strong" aria-hidden="true" />
                <div className="mb-6 space-y-2 text-center">
                  <Dialog.Title className="type-reading-heading text-parichay-heading">
                    {title}
                  </Dialog.Title>
                  {description && (
                    <Dialog.Description className="type-caption text-parichay-muted">
                      {description}
                    </Dialog.Description>
                  )}
                </div>
                {children}
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
