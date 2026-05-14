/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { lazy, Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Switchboard } from './components/Switchboard';
import type { ModeId, OnboardingContext, StorageMode } from './lib/schemaTypes';
import { SiteHeader } from './components/SiteHeader';
import { SiteFooter } from './components/SiteFooter';

const ManualBuilder = lazy(() =>
  import("./components/ManualBuilder").then((module) => ({
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

function AppContent() {
  const [storageMode, setStorageMode] = useState<StorageMode>("memory");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.pathname]);

  const handleStart = (mode: ModeId, onboarding?: OnboardingContext) => {
    navigate(`/manual/${mode}`, {
      state: {
        mode,
        onboarding,
        storageMode,
      },
    });
  };

  return (
    <div className="min-h-[100dvh] flex flex-col font-sans selection:bg-ankahe-accent-soft selection:text-ankahe-text">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:border focus:border-ankahe-border focus:bg-ankahe-surface focus:px-4 focus:py-3 focus:text-ankahe-text focus:shadow-sm focus:outline-none focus:ring-2 focus:ring-ankahe-focus"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main-content" className="flex-1 flex flex-col items-center w-full">
        <div className="w-full">
          <Routes>
            <Route
              path="/"
              element={
                <div className="bg-ankahe-bg">
                  <Switchboard
                    storageMode={storageMode}
                    onStorageModeChange={setStorageMode}
                    onStart={handleStart}
                    onLearnMore={() => navigate("/how-it-works")}
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
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

function RouteFallback({ label }: { label: string }) {
  return (
    <div className="min-h-[calc(100dvh-8rem)] bg-ankahe-bg px-6 py-16 text-center">
      <p className="type-caption text-ankahe-muted">{label}</p>
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
