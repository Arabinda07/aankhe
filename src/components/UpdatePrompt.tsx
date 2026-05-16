import { useEffect } from "react";
import { DownloadSimple } from "@phosphor-icons/react/dist/csr/DownloadSimple";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
// @ts-expect-error - virtual module provided by vite-plugin-pwa
import { useRegisterSW } from "virtual:pwa-register/react";

export function UpdatePrompt() {
  const prefersReducedMotion = useReducedMotion();
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered() {
      // Registration handled
    },
    onRegisterError(error: unknown) {
      console.error("SW registration error", error);
    },
  });

  const close = () => {
    setNeedRefresh(false);
  };

  useEffect(() => {
    if (needRefresh) {
      const timer = setTimeout(() => setNeedRefresh(false), 10000);
      return () => clearTimeout(timer);
    }
  }, [needRefresh, setNeedRefresh]);

  const transition = prefersReducedMotion ? { duration: 0 } : { duration: 0.4, ease: [0.16, 1, 0.3, 1] };

  return (
    <AnimatePresence>
      {needRefresh && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={transition}
          className="fixed bottom-24 left-4 right-4 z-[100] mx-auto max-w-sm rounded-lg border border-parichay-border bg-parichay-surface p-4 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.1)] sm:bottom-6 sm:left-auto sm:right-6"
        >
          <div className="flex gap-3">
            <div className="mt-1 shrink-0 text-parichay-accent">
              <DownloadSimple size={24} weight="light" />
            </div>
            <div className="space-y-3">
              <div>
                <p className="type-ui-label text-parichay-heading">Update available</p>
                <p className="type-caption text-parichay-muted">
                  A fresh version of Parichay is ready. Refresh when you’re done.
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => updateServiceWorker(true)}
                  className="type-ui-label flex min-h-11 items-center justify-center rounded-md bg-parichay-accent px-4 text-parichay-on-accent transition-colors hover:bg-parichay-accent-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-parichay-focus focus-visible:ring-offset-2"
                >
                  Refresh
                </button>
                <button
                  type="button"
                  onClick={close}
                  className="type-ui-label flex min-h-11 items-center justify-center rounded-md border border-parichay-border bg-parichay-surface-soft px-4 text-parichay-text transition-colors hover:bg-parichay-control-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-parichay-focus focus-visible:ring-offset-2"
                >
                  Later
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
