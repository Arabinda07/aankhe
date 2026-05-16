/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { lazy, Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Switchboard } from './components/Switchboard';
import type { ModeId, OnboardingContext } from './lib/schemaTypes';
import { SiteHeader } from './components/SiteHeader';
import { FOOTER_INTERSECTION_ROOT_MARGIN, FOOTER_SCROLL_LOAD_THRESHOLD_PX } from './lib/performancePolicy';
import { HOME_PATH, HOW_IT_WORKS_PATH, manualModePath } from './lib/routes';
import { scheduleServiceWorkerRegistration } from './lib/serviceWorkerRegistration';
import { ConnectionStatus } from './components/ConnectionStatus';
import { UpdatePrompt } from './components/UpdatePrompt';

const ManualBuilder = lazy(() =>
  import("./lib/manualRoutePreload").then((module) => module.loadManualBuilder()).then((module) => ({
    default: module.ManualBuilder,
  }))
);

function preloadManualBuilderOnIntent() {
  void import("./lib/manualRoutePreload").then((module) => module.preloadManualBuilder());
}

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
  useEffect(() => {
    if (document.documentElement.dataset.appVisualReady === "true") return;

    let firstFrame = 0;
    let secondFrame = 0;

    firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(() => {
        document.documentElement.dataset.appVisualReady = "true";
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

  useAppVisualReadySignal();

  useEffect(() => {
    scheduleServiceWorkerRegistration();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.pathname]);

  useEffect(() => {
    if (location.hash !== "#onboarding") return;

    preloadManualBuilderOnIntent();
    window.requestAnimationFrame(() => {
      document.getElementById("onboarding")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [location.hash, location.pathname]);

  const handleStart = (mode: ModeId, onboarding?: OnboardingContext) => {
    preloadManualBuilderOnIntent();
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
      <ConnectionStatus />
      <UpdatePrompt />
      <main id="main-content" className="flex-1 flex flex-col items-center w-full">
        <div className="w-full">
          <Routes>
            <Route
              path="/"
              element={
                <div className="bg-parichay-bg">
                  <Switchboard
                    onStart={handleStart}
                    onLearnMore={() => navigate(HOW_IT_WORKS_PATH)}
                    onManualIntentPreload={preloadManualBuilderOnIntent}
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
                <Suspense fallback={<RouteFallback label="Preparing your intro" />}>
                  <ManualBuilder
                    onBack={() => navigate("/")}
                  />
                </Suspense>
              }
            />
          </Routes>
        </div>
      </main>
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
