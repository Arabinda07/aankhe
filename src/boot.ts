import { shouldBootReactImmediately } from "./lib/routes";


let preloadPromise: Promise<typeof import("./main")> | null = null;
let appBoot: Promise<unknown> | null = null;

function preloadApp() {
  if (!preloadPromise) {
    preloadPromise = import("./main");
  }
  return preloadPromise;
}

function bootApp() {
  if (!appBoot) {
    document.documentElement.dataset.reactBoot = "loading";
    appBoot = preloadApp().then((module) => {
      document.documentElement.dataset.reactBoot = "ready";
      module.mountApp();
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
  // Preload React in the background without evaluating its mount function.
  // This downloads the bundle so it's ready when the user interacts,
  // but doesn't trigger the heavy Style & Layout calculation of replacing the DOM.
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(() => preloadApp(), { timeout: 2000 });
  } else {
    setTimeout(() => preloadApp(), 1000);
  }

  const startLink = document.querySelector<HTMLElement>('[data-boot-intent="start"]');

  startLink?.addEventListener(
    "click",
    (event) => {
      event.preventDefault();
      void bootApp().then(scrollToSetup);
    },
    { once: true }
  );
}

if (shouldBootReactImmediately(window.location)) {
  void bootApp();
} else {
  bindHomeBoot();
}
