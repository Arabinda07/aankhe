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
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { BookOpenText } from '@phosphor-icons/react/dist/csr/BookOpenText';
import { CaretLeft } from '@phosphor-icons/react/dist/csr/CaretLeft';
import { FileText } from '@phosphor-icons/react/dist/csr/FileText';
import { answerValueIsPresent } from '../lib/answerUiPolicy';
import { SoftButton } from './SoftButton';
import { useIsMobile } from '../hooks/useIsMobile';
import { useSwipeBack } from '../hooks/useSwipeBack';

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
  const isMobile = useIsMobile();
  const manual = getManualForRoute(mode);
  const manualMode = manual?.mode;
  const composed = useMemo(() => manual?.composeManual(), [manual]);
  const hasManualContent = manual?.config.questions.some((question) => (
    answerValueIsPresent(manual.getAnswer(question.id)) ||
    manual.getAnswerNote(question.id).trim().length > 0
  )) ?? false;

  const controller = manual ? useQuestionController(manual.config, manual, () => setView("artifact")) : null;
  const swipeBackHandlers = useSwipeBack({
    enabled: isMobile && !prefersReducedMotion,
    onBack,
  });

  useEffect(() => {
    manual?.activate();
  }, [manualMode]);

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [view]);

  if (!isInitialized) {
    return <ManualRouteFallback label="Preparing your intro" />;
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
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -8 },
        transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
      };
  const questionMotion = prefersReducedMotion
    ? {
        initial: { opacity: 1 },
        animate: { opacity: 1 },
        exit: { opacity: 1 },
        transition: { duration: 0 },
      }
    : {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -8 },
        transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
      };
  const progressTransition = prefersReducedMotion
    ? { duration: 0 }
    : { type: "spring", bounce: 0, duration: 0.5 };

  return (
    <div
      className="w-full font-sans transition-colors duration-700 bg-parichay-bg text-parichay-text relative"
      {...swipeBackHandlers}
    >
      {/* Builder Toolbar */}
      <div className="sticky top-14 z-40 w-full bg-parichay-bg/95 backdrop-blur-sm">
        <nav aria-label="Intro builder" className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
          <button
            onClick={onBack}
            className="type-ui-label inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-md px-2 text-parichay-muted transition-colors hover:bg-parichay-control-hover hover:text-parichay-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-parichay-focus focus-visible:ring-offset-2 sm:min-w-0 sm:justify-start"
            aria-label="Exit intro"
          >
            <CaretLeft size={20} weight="light" />
            <span className="hidden sm:inline">Exit intro</span>
          </button>

          {view === "build" && controller && (
            <span className="type-meta absolute left-1/2 -translate-x-1/2 text-parichay-muted sm:hidden">
              {controller.currentStepIndex + 1} / {controller.totalSteps}
            </span>
          )}

          <div className="flex items-center">
            {view === "build" && hasManualContent && (
              <button
                type="button"
                onClick={() => setView("artifact")}
                className="type-ui-label inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-md px-2 text-parichay-muted transition-colors hover:bg-parichay-control-hover hover:text-parichay-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-parichay-focus focus-visible:ring-offset-2 sm:min-w-0 sm:justify-start"
              >
                <BookOpenText size={18} weight="light" />
                <span className="sm:hidden">Preview</span>
                <span className="hidden sm:inline">Preview intro</span>
              </button>
            )}
            {view === "artifact" && (
              <button
                type="button"
                onClick={() => setView("build")}
                className="type-ui-label inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-md px-2 text-parichay-muted transition-colors hover:bg-parichay-control-hover hover:text-parichay-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-parichay-focus focus-visible:ring-offset-2 sm:min-w-0 sm:justify-start"
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
                The intro link appears to be corrupted or incomplete. You can start fresh or try another link.
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
              className="mx-auto max-w-4xl"
            >
              <div className="space-y-12 max-sm:mb-[calc(var(--mobile-nav-total)+1rem)]">
                {controller && (
                  <div className="space-y-8 md:space-y-10">
                    <div className="space-y-3 md:space-y-4">
                      <div className="type-meta flex items-center justify-between text-parichay-muted">
                        <div className="flex items-center gap-3">
                          <span className="text-parichay-text">
                            Section {controller.sectionIndex + 1}
                          </span>
                          <span aria-hidden="true" className="text-parichay-border/50">/</span>
                          <span>{controller.section?.title}</span>
                        </div>
                        <span>{controller.currentStepIndex + 1} / {controller.totalSteps}</span>
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
      <p className="type-meta text-parichay-muted">Preparing your intro</p>
    </div>
  );
}
