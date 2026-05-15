import { shouldBootReactImmediately } from "./lib/routes";

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

function afterAppReady(callback: () => void) {
  if (document.documentElement.dataset.appVisualReady === "true") {
    callback();
    return;
  }

  window.addEventListener("parichay:app-ready", callback, { once: true });
}

function bindHomeBoot() {
  const startLink = document.querySelector<HTMLElement>('[data-boot-intent="start"]');

  startLink?.addEventListener(
    "click",
    (event) => {
      event.preventDefault();
      void bootApp().then(() => afterAppReady(scrollToSetup));
    },
    { once: true }
  );

  window.requestAnimationFrame(() => {
    window.setTimeout(() => {
      void bootApp();
    }, 0);
  });
}

if (shouldBootReactImmediately(window.location)) {
  void bootApp();
} else {
  bindHomeBoot();
}
