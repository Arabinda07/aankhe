/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Switchboard } from './components/Switchboard';
import { ModeId } from './lib/schemaTypes';
import { useManualState } from './hooks/useManualState';
import { SiteHeader } from './components/SiteHeader';
import { SiteFooter } from './components/SiteFooter';
import { SoftButton } from './components/SoftButton';
import { HowItWorksPage, PrivacyPage } from './components/InfoPages';

const ManualBuilder = lazy(() =>
  import("./components/ManualBuilder").then((module) => ({
    default: module.ManualBuilder,
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

  const handleStart = (mode: ModeId) => {
    setMode(mode);
    navigate(`/manual/${mode}`);
  };

  const handleTrySample = (sample: any) => {
    resetState(sample);
    navigate(`/manual/${sample.mode}`);
  };

  if (!isInitialized) return null;

  return (
    <div className="min-h-[100dvh] flex flex-col font-sans selection:bg-ankahe-accent-soft selection:text-ankahe-text">
      <SiteHeader />
      <main className="flex-1 flex flex-col items-center w-full">
        <div className="w-full">
          <Routes>
            <Route
              path="/"
              element={
                <div className="bg-ankahe-bg">
                  {hashError && (
                    <div className="max-w-4xl mx-auto px-6 pt-6">
                      <div className="bg-ankahe-surface-soft border border-ankahe-border text-ankahe-text p-4 rounded-lg flex items-start gap-4 shadow-sm">
                        <div className="flex-1 space-y-1">
                          <h4 className="type-panel-title text-ankahe-accent-dark">
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
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
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

import { ErrorBoundary } from "./components/ErrorBoundary";

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </ErrorBoundary>
  );
}
