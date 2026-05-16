import { WifiHigh } from "@phosphor-icons/react/dist/csr/WifiHigh";
import { WifiSlash } from "@phosphor-icons/react/dist/csr/WifiSlash";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { cn } from "../lib/utils";

export function ConnectionStatus() {
  const prefersReducedMotion = useReducedMotion();
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== "undefined" ? navigator.onLine : true
  );
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const handleOnline = () => {
      setIsOnline(true);
      setIsVisible(true);
      clearTimeout(timer);
      timer = setTimeout(() => setIsVisible(false), 5000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setIsVisible(true);
      clearTimeout(timer);
      timer = setTimeout(() => setIsVisible(false), 5000);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const transition = prefersReducedMotion ? { duration: 0 } : { duration: 0.4, ease: [0.16, 1, 0.3, 1] };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={transition}
          className="fixed left-0 right-0 top-16 z-[100] flex justify-center p-4 sm:top-4"
        >
          <div
            role="status"
            aria-live="polite"
            className={cn(
              "flex items-center gap-3 rounded-md border px-4 py-3 shadow-sm",
              isOnline
                ? "border-parichay-border bg-parichay-surface text-parichay-text"
                : "border-parichay-accent bg-parichay-accent-soft text-parichay-accent-text"
            )}
          >
            {isOnline ? (
              <WifiHigh size={20} weight="light" className="text-parichay-accent" />
            ) : (
              <WifiSlash size={20} weight="light" className="text-parichay-accent" />
            )}
            <p className="type-caption font-medium">
              {isOnline
                ? "You’re back online. Sharing is available again."
                : "You’re offline. You can keep editing, but sharing needs a connection."}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
