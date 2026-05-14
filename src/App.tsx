/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Switchboard } from './components/Switchboard';
import { ManualState, ModeId, OnboardingContext } from './lib/schemaTypes';
import { useManualState } from './hooks/useManualState';
import { SiteHeader } from './components/SiteHeader';
import { SiteFooter } from './components/SiteFooter';
import { SoftButton } from './components/SoftButton';

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
  const {
    storageMode,
    isInitialized,
    hashError,
    clearHashError,
    setMode,
    resetState,
    setStorageMode,
    getManualForRoute,
  } = useManualState();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.pathname]);

  const handleStart = (mode: ModeId, onboarding?: OnboardingContext) => {
    setMode(mode, onboarding);
    navigate(`/manual/${mode}`);
  };

  const handleTrySample = (sample: ManualState) => {
    resetState(sample);
    navigate(`/manual/${sample.mode}`);
  };

  if (!isInitialized) return null;

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
                  {hashError && (
                    <div className="max-w-4xl mx-auto px-6 pt-6">
                      <div className="flex items-start gap-4 rounded-lg border border-ankahe-danger/25 bg-ankahe-danger-soft p-4 text-ankahe-text shadow-sm">
                        <div className="flex-1 space-y-1">
                          <h4 className="type-panel-title text-ankahe-danger">
                            Link could not be restored
                          </h4>
                          <p className="type-caption">
                            The manual link appears to be corrupted or
                            incomplete. You can start fresh or try another link.
                          </p>
                        </div>
                        <SoftButton
                          size="sm"
                          variant="secondary"
                          onClick={clearHashError}
                          className="bg-ankahe-surface text-ankahe-text border-ankahe-border"
                        >
                          Dismiss
                        </SoftButton>
                      </div>
                    </div>
                  )}
                  <Switchboard
                    storageMode={storageMode}
                    onStorageModeChange={setStorageMode}
                    onStart={handleStart}
                    onTrySample={handleTrySample}
                    onLearnMore={() => navigate("/how-it-works")}
                  />
                </div>
              }
            />
            <Route
              path="/privacy"
              element={
                <Suspense fallback={<RouteFallback label="Preparing privacy note" />}>
                  <PrivacyPage />
                </Suspense>
              }
            />
            <Route
              path="/how-it-works"
              element={
                <Suspense fallback={<RouteFallback label="Preparing FAQ" />}>
                  <HowItWorksPage />
                </Suspense>
              }
            />
            <Route
              path="/manual/:mode"
              element={
                <Suspense fallback={<RouteFallback label="Preparing manual" />}>
                  <ManualBuilder
                    getManualForRoute={getManualForRoute}
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
      <p className="type-meta text-ankahe-muted">{label}</p>
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
