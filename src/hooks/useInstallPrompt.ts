import { useCallback, useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

function isIOS() {
  if (typeof navigator === "undefined") return false;
  return /iphone|ipad|ipod/i.test(navigator.userAgent);
}

export function useInstallPrompt() {
  const [event, setEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [isDismissed, setIsDismissed] = useState(() => (
    typeof localStorage !== "undefined" && localStorage.getItem("parichay-install-dismissed") === "true"
  ));

  useEffect(() => {
    if (isIOS() || typeof window === "undefined") return;

    const handleBeforeInstallPrompt = (installEvent: Event) => {
      installEvent.preventDefault();
      setEvent(installEvent as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    return () => window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
  }, []);

  const dismiss = useCallback(() => {
    localStorage.setItem("parichay-install-dismissed", "true");
    setIsDismissed(true);
  }, []);

  const prompt = useCallback(async () => {
    if (!event) return;

    await event.prompt();
    const choice = await event.userChoice;
    if (choice.outcome === "accepted") {
      dismiss();
    }
    setEvent(null);
  }, [dismiss, event]);

  return {
    dismiss,
    isIOS: isIOS(),
    isReady: Boolean(event) && !isDismissed && !isIOS(),
    prompt,
  };
}
