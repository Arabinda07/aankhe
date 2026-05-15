let appBoot: Promise<unknown> | null = null;

function hasSharedState() {
  return window.location.hash.startsWith("#s=") || window.location.hash.includes("s=");
}

function shouldBootImmediately() {
  const { pathname } = window.location;

  return (
    pathname.startsWith("/manual/") ||
    pathname === "/privacy" ||
    pathname === "/how-it-works" ||
    hasSharedState()
  );
}

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

  const cleanup = () => {
    document.removeEventListener("keydown", bootFromIntent);
    document.removeEventListener("focusin", bootFromIntent);
    document.removeEventListener("pointerdown", bootFromIntent);
  };

  const bootFromIntent = (event: Event) => {
    const target = event.target instanceof Element ? event.target : null;

    if (target?.closest('a[href]:not([href^="#"])')) {
      return;
    }

    cleanup();
    void bootApp();
  };

  document.addEventListener("keydown", bootFromIntent, { once: true });
  document.addEventListener("focusin", bootFromIntent, { once: true });
  document.addEventListener("pointerdown", bootFromIntent, { once: true, passive: true });
}

if (shouldBootImmediately()) {
  void bootApp();
} else {
  bindHomeBoot();
}
