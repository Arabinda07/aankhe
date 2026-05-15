/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { lazy, Suspense, useEffect, useLayoutEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation, useNavigationType } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Switchboard } from './components/Switchboard';
import type { ModeId, OnboardingContext } from './lib/schemaTypes';
import { SiteHeader } from './components/SiteHeader';
import { MobileNav } from './components/MobileNav';
import { FOOTER_INTERSECTION_ROOT_MARGIN, FOOTER_SCROLL_LOAD_THRESHOLD_PX } from './lib/performancePolicy';
import { HOME_PATH, HOW_IT_WORKS_PATH, manualModePath } from './lib/routes';
import { loadManualBuilder, preloadManualBuilder } from './lib/manualRoutePreload';

const ManualBuilder = lazy(() =>
  loadManualBuilder().then((module) => ({
    default: module.ManualBuilder,
  }))
);

const PrivacyPage = lazy(() =>
  import("./components/InfoPages").then((module) => ({
    default: module.PrivacyPage,
  }))
);

const HowItWorksPage = lazy(() =>
  import("./components/InfoPages").then((module) => ({
    default: module.HowItWorksPage,
  }))
);

const SiteFooter = lazy(() =>
  import("./components/SiteFooter").then((module) => ({
    default: module.SiteFooter,
  }))
);

function useAppVisualReadySignal() {
  useLayoutEffect(() => {
    if (document.documentElement.dataset.appVisualReady === "true") return;

    let firstFrame = 0;
    let secondFrame = 0;

    firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(() => {
        const root = document.getElementById("root");
        const shell = document.getElementById("initial-shell");

        document.documentElement.dataset.appVisualReady = "true";
        root?.removeAttribute("aria-hidden");
        root?.removeAttribute("inert");
        shell?.setAttribute("aria-hidden", "true");
        window.dispatchEvent(new CustomEvent("parichay:app-ready"));
      });
    });

    return () => {
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
    };
  }, []);
}

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const navigationType = useNavigationType();
  const prefersReducedMotion = useReducedMotion();

  useAppVisualReadySignal();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname !== HOME_PATH) return;

    let cancelIdlePreload: (() => void) | null = null;
    let cancelled = false;

    const scheduleIdlePreload = () => {
      if (cancelled) return;

      if ("requestIdleCallback" in window) {
        const handle = window.requestIdleCallback(() => preloadManualBuilder(), { timeout: 1200 });
        cancelIdlePreload = () => window.cancelIdleCallback(handle);
        return;
      }

      const handle = globalThis.setTimeout(() => preloadManualBuilder(), 500);
      cancelIdlePreload = () => globalThis.clearTimeout(handle);
    };

    if (document.documentElement.dataset.appVisualReady === "true") {
      scheduleIdlePreload();
    } else {
      window.addEventListener("parichay:app-ready", scheduleIdlePreload, { once: true });
    }

    return () => {
      cancelled = true;
      window.removeEventListener("parichay:app-ready", scheduleIdlePreload);
      cancelIdlePreload?.();
    };
  }, [location.pathname]);

  const handleStart = (mode: ModeId, onboarding?: OnboardingContext) => {
    preloadManualBuilder();
    navigate(manualModePath(mode), {
      state: {
        mode,
        onboarding,
      },
    });
  };

  return (
    <div className="min-h-[100dvh] flex flex-col font-sans selection:bg-parichay-accent-soft selection:text-parichay-text">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:border focus:border-parichay-border focus:bg-parichay-surface focus:px-4 focus:py-3 focus:text-parichay-text focus:shadow-sm focus:outline-none focus:ring-2 focus:ring-parichay-focus"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main-content" className="flex-1 flex flex-col items-center w-full pb-mobile-nav sm:pb-0">
        <div className="w-full">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={location.pathname}
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: navigationType === "POP" ? -20 : 20 }}
              animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
              exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: navigationType === "POP" ? 20 : -20 }}
              transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.22, ease: [0.32, 0.72, 0, 1] }}
            >
          <Routes location={location}>
            <Route
              path="/"
              element={
                <div className="bg-parichay-bg">
                  <Switchboard
                    onStart={handleStart}
                    onLearnMore={() => navigate(HOW_IT_WORKS_PATH)}
                    onManualIntentPreload={preloadManualBuilder}
                  />
                </div>
              }
            />
            <Route
              path="/privacy"
              element={
                <Suspense fallback={<RouteFallback label="Preparing your page" />}>
                  <PrivacyPage />
                </Suspense>
              }
            />
            <Route
              path="/how-it-works"
              element={
                <Suspense fallback={<RouteFallback label="Preparing your page" />}>
                  <HowItWorksPage />
                </Suspense>
              }
            />
            <Route
              path="/manual/:mode"
              element={
                <Suspense fallback={<RouteFallback label="Preparing your manual" />}>
                  <ManualBuilder
                    onBack={() => navigate("/")}
                  />
                </Suspense>
              }
            />
          </Routes>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
      <MobileNav onStart={handleStart} />
      <DeferredFooter pathname={location.pathname} />
    </div>
  );
}

function DeferredFooter({ pathname }: { pathname: string }) {
  const [shouldLoadFooter, setShouldLoadFooter] = useState(false);

  useEffect(() => {
    if (shouldLoadFooter) return;

    if (pathname !== HOME_PATH) {
      setShouldLoadFooter(true);
      return;
    }

    const sentinel = document.getElementById("footer-sentinel");
    if (!sentinel || !("IntersectionObserver" in window)) {
      const loadFooterAfterScroll = () => {
        if (window.scrollY > FOOTER_SCROLL_LOAD_THRESHOLD_PX) {
          setShouldLoadFooter(true);
        }
      };

      window.addEventListener("scroll", loadFooterAfterScroll, { passive: true });
      return () => window.removeEventListener("scroll", loadFooterAfterScroll);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoadFooter(true);
          observer.disconnect();
        }
      },
      { rootMargin: FOOTER_INTERSECTION_ROOT_MARGIN }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [pathname, shouldLoadFooter]);

  if (!shouldLoadFooter) {
    return <div id="footer-sentinel" className="h-px w-full" aria-hidden="true" />;
  }

  return (
    <Suspense fallback={null}>
      <SiteFooter />
    </Suspense>
  );
}

function RouteFallback({ label }: { label: string }) {
  return (
    <div className="min-h-[calc(100dvh-8rem)] bg-parichay-bg px-6 py-16 text-center">
      <p className="type-caption text-parichay-muted">{label}</p>
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </ErrorBoundary>
  );
}
