import { useCallback, useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

type InstallPromptStatus = "native-ready" | "ios" | "installed" | "fallback";

function isIOSDevice() {
  if (typeof navigator === "undefined") return false;
  const userAgent = navigator.userAgent.toLowerCase();
  return /iphone|ipad|ipod/.test(userAgent) || (userAgent.includes("macintosh") && navigator.maxTouchPoints > 1);
}

function isStandaloneDisplay() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(display-mode: standalone)").matches || Boolean((navigator as Navigator & { standalone?: boolean }).standalone);
}

function getDismissedState() {
  if (typeof localStorage === "undefined") return false;
  return localStorage.getItem("parichay-install-dismissed") === "true";
}

export function useInstallPrompt() {
  const [event, setEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [isDismissed, setIsDismissed] = useState(getDismissedState);
  const [isStandalone, setIsStandalone] = useState(isStandaloneDisplay);
  const isIOS = isIOSDevice();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const displayMode = window.matchMedia("(display-mode: standalone)");
    const updateStandalone = () => setIsStandalone(isStandaloneDisplay());

    const handleBeforeInstallPrompt = (installEvent: Event) => {
      installEvent.preventDefault();
      setEvent(installEvent as BeforeInstallPromptEvent);
    };

    updateStandalone();
    displayMode.addEventListener("change", updateStandalone);
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    return () => {
      displayMode.removeEventListener("change", updateStandalone);
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
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

  const status: InstallPromptStatus = isStandalone
    ? "installed"
    : event && !isIOS
      ? "native-ready"
      : isIOS
        ? "ios"
        : "fallback";

  return {
    canPrompt: status === "native-ready",
    dismiss,
    isDismissed,
    isIOS,
    isReady: status === "native-ready" && !isDismissed,
    isStandalone,
    prompt,
    status,
  };
}
