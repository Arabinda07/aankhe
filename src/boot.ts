import { shouldBootReactImmediately } from "./lib/routes";

const IDLE_BOOT_DELAY_MS = 3000;

const BOOT_EVENTS = [
  "keydown",
  "focusin",
  "pointerdown",
  "mousemove",
  "wheel",
  "touchstart",
  "scroll",
] as const;

let appBoot: Promise<unknown> | null = null;

function bootApp() {
  if (!appBoot) {
    document.documentElement.dataset.reactBoot = "loading";
    appBoot = import("./main").then((module) => {
      document.documentElement.dataset.reactBoot = "ready";
      return module;
    });
  }

  return appBoot;
}

function scrollToSetup() {
  window.requestAnimationFrame(() => {
    document.getElementById("onboarding")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
}

function bindHomeBoot() {
  const startLink = document.querySelector<HTMLElement>('[data-boot-intent="start"]');

  startLink?.addEventListener(
    "click",
    (event) => {
      event.preventDefault();
      void bootApp().then(scrollToSetup);
    },
    { once: true }
  );

  let fallbackTimeout: ReturnType<typeof setTimeout>;

  const cleanup = () => {
    clearTimeout(fallbackTimeout);
    for (const event of BOOT_EVENTS) {
      document.removeEventListener(event, bootFromIntent);
    }
  };

  const bootFromIntent = (event?: Event) => {
    if (event) {
      const target = event.target instanceof Element ? event.target : null;

      if (event.type === "pointerdown" && target?.closest('a[href]:not([href^="#"])')) {
        return;
      }
    }

    cleanup();
    void bootApp();
  };

  for (const event of BOOT_EVENTS) {
    document.addEventListener(event, bootFromIntent, { once: true, passive: true });
  }

  fallbackTimeout = setTimeout(() => bootFromIntent(), IDLE_BOOT_DELAY_MS);
}

if (shouldBootReactImmediately(window.location)) {
  void bootApp();
} else {
  bindHomeBoot();
}
