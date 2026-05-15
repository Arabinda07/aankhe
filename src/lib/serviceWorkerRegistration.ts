let registrationScheduled = false;

export function scheduleServiceWorkerRegistration() {
  const env = (import.meta as unknown as { env?: { PROD?: boolean } }).env;

  if (registrationScheduled || !env?.PROD || !("serviceWorker" in navigator)) return;
  registrationScheduled = true;

  afterAppReady(() => {
    afterWindowLoad(() => {
      scheduleIdleTask(() => {
        void navigator.serviceWorker.register("/sw.js", { scope: "/" });
      });
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

function afterWindowLoad(callback: () => void) {
  if (document.readyState === "complete") {
    callback();
    return;
  }

  window.addEventListener("load", callback, { once: true });
}

function scheduleIdleTask(callback: () => void) {
  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(callback, { timeout: 2000 });
    return;
  }

  globalThis.setTimeout(callback, 1200);
}
