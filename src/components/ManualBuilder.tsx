/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { lazy, Suspense, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { useParams, Navigate, useLocation } from 'react-router-dom';
import { useManualState } from '../hooks/useManualState';
import type { ModeId, OnboardingContext, StorageMode } from '../lib/schemaTypes';
import { useQuestionController } from '../hooks/useQuestionController';
import { QuestionStep } from './QuestionStep';
import { ManualPreview } from './ManualPreview';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { BookOpenText } from '@phosphor-icons/react/dist/csr/BookOpenText';
import { CaretLeft } from '@phosphor-icons/react/dist/csr/CaretLeft';
import { FileText } from '@phosphor-icons/react/dist/csr/FileText';
import { answerValueIsPresent } from '../lib/answerUiPolicy';
import { SoftButton } from './SoftButton';

const ArtifactStudio = lazy(() =>
  import("./ArtifactStudio").then((module) => ({
    default: module.ArtifactStudio,
  }))
);

export interface ManualRouteState {
  mode?: ModeId;
  onboarding?: OnboardingContext;
  storageMode?: StorageMode;
}

interface ManualBuilderProps {
  onBack: () => void;
}

export function ManualBuilder({
  onBack,
}: ManualBuilderProps) {
  const { mode } = useParams<{ mode: ModeId }>();
  const location = useLocation();
  const routeState = location.state as ManualRouteState | null;
  const {
    isInitialized,
    hashError,
    clearHashError,
    getManualForRoute,
  } = useManualState({
    initialMode: mode,
    initialOnboarding: routeState?.onboarding,
    initialStorageMode: routeState?.storageMode,
  });
  const [view, setView] = useState<"build" | "artifact">("build");
  const prefersReducedMotion = useReducedMotion();
  const manual = getManualForRoute(mode);
  const manualMode = manual?.mode;
  const composed = useMemo(() => manual?.composeManual(), [manual]);
  const hasManualContent = manual?.config.questions.some((question) => (
    answerValueIsPresent(manual.getAnswer(question.id)) ||
    manual.getAnswerNote(question.id).trim().length > 0
  )) ?? false;

  const controller = manual ? useQuestionController(manual.config, manual, () => setView("artifact")) : null;

  useEffect(() => {
    manual?.activate();
  }, [manualMode]);

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [view]);

  if (!isInitialized) {
    return <ManualRouteFallback label="Preparing manual" />;
  }

  if (!manual || !composed) {
    return <Navigate to="/" />;
  }

  const viewMotion = prefersReducedMotion
    ? {
        initial: { opacity: 1 },
        animate: { opacity: 1 },
        exit: { opacity: 1 },
        transition: { duration: 0 },
      }
    : {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -10 },
      };
  const questionMotion = prefersReducedMotion
    ? {
        initial: { opacity: 1 },
        animate: { opacity: 1 },
        exit: { opacity: 1 },
        transition: { duration: 0 },
      }
    : {
        initial: { opacity: 0, x: 20 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -20 },
        transition: { duration: 0.3 },
      };
  const progressTransition = prefersReducedMotion
    ? { duration: 0 }
    : { type: "spring", bounce: 0, duration: 0.5 };

  return (
    <div className="w-full font-sans transition-colors duration-700 bg-parichay-bg text-parichay-text relative">
      {/* Builder Toolbar */}
      <div className="sticky top-14 z-40 w-full border-b border-parichay-border bg-parichay-bg/95 backdrop-blur-sm">
        <nav aria-label="Manual builder" className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
          <button
            onClick={onBack}
            className="type-ui-label flex items-center gap-2 text-parichay-muted hover:text-parichay-text transition-colors"
            aria-label="Back to Hub"
          >
            <CaretLeft size={20} weight="light" />
            <span className="hidden sm:inline">Back to Hub</span>
          </button>

          <div className="flex items-center">
            {view === "build" && hasManualContent && (
              <button
                type="button"
                onClick={() => setView("artifact")}
                className="type-ui-label flex items-center gap-2 text-parichay-muted hover:text-parichay-text transition-colors"
              >
                <BookOpenText size={18} weight="light" />
                <span className="hidden sm:inline">Preview manual</span>
              </button>
            )}
            {view === "artifact" && (
              <button
                type="button"
                onClick={() => setView("build")}
                className="type-ui-label flex items-center gap-2 text-parichay-muted hover:text-parichay-text transition-colors"
              >
                <FileText size={18} weight="light" />
                <span className="hidden sm:inline">Back to answers</span>
              </button>
            )}
          </div>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 lg:py-32">
        {hashError && (
          <div className="mb-10 flex items-start gap-4 rounded-lg border border-parichay-danger/25 bg-parichay-danger-soft p-4 text-parichay-text shadow-sm">
            <div className="flex-1 space-y-1">
              <h4 className="type-panel-title text-parichay-heading">
                Link could not be restored
              </h4>
              <p className="type-caption">
                The manual link appears to be corrupted or incomplete. You can start fresh or try another link.
              </p>
            </div>
            <SoftButton
              size="sm"
              variant="secondary"
              onClick={clearHashError}
              className="bg-parichay-surface text-parichay-text border-parichay-border"
            >
              Dismiss
            </SoftButton>
          </div>
        )}
        <AnimatePresence mode="wait">
          {view === "build" ? (
            <motion.div
              key="build"
              {...viewMotion}
              className="grid gap-12 xl:grid-cols-[minmax(0,1fr)_450px]"
            >
              {/* Form Side */}
              <div className="space-y-12">
                {controller && (
                  <div className="space-y-8 md:space-y-10">
                    <div className="space-y-3 md:space-y-4">
                      <div className="type-meta flex items-center justify-between text-parichay-muted">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded bg-parichay-surface-soft text-parichay-text">
                            Section {controller.sectionIndex + 1}
                          </span>
                          <span>{controller.section?.title}</span>
                        </div>
                        <span>{controller.currentStepIndex + 1} / {controller.totalSteps}</span>
                      </div>
                      
                      <div className="h-1.5 w-full overflow-hidden rounded-[3px] bg-parichay-surface-soft">
                        <motion.div 
                          className="h-full w-full bg-parichay-accent origin-left"
                          initial={{ scaleX: prefersReducedMotion ? controller.progress / 100 : 0 }}
                          animate={{ scaleX: controller.progress / 100 }}
                          transition={progressTransition}
                        />
                      </div>
                    </div>

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={controller.currentQuestion.id}
                        {...questionMotion}
                      >
                        <QuestionStep {...controller.getStepProps()} />
                      </motion.div>
                    </AnimatePresence>
                  </div>
                )}
              </div>

              {/* Preview Side (Desktop only) */}
              <div className="hidden space-y-8 xl:sticky xl:top-36 xl:block">
                <div className="space-y-4">
                  <h3 className="type-meta text-parichay-heading px-1">
                    Live Manual Preview
                  </h3>
                  <div className="rounded-lg bg-parichay-surface-preview p-2">
                    <div className="overflow-hidden rounded-md border border-parichay-paper-border bg-parichay-paper-muted shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
                      <ManualPreview
                        manual={composed}
                        mode={manual.mode}
                        className="h-[600px] border-none shadow-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="artifact"
              {...viewMotion}
            >
              <Suspense fallback={<ArtifactFallback />}>
                <ArtifactStudio
                  manual={manual}
                />
              </Suspense>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}

function ManualRouteFallback({ label }: { label: string }) {
  return (
    <div className="min-h-[calc(100dvh-8rem)] bg-parichay-bg px-6 py-16 text-center">
      <p className="type-meta text-parichay-muted">{label}</p>
    </div>
  );
}

function ArtifactFallback() {
  return (
    <div className="min-h-80 rounded-lg border border-parichay-border bg-parichay-surface p-8">
      <p className="type-meta text-parichay-muted">Preparing Artifact Studio</p>
    </div>
  );
}
