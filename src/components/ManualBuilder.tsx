/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { lazy, Suspense, useEffect, useLayoutEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { ManualWorkspace } from '../hooks/useManualState';
import type { ModeId } from '../lib/schemaTypes';
import { FormRenderer } from './FormRenderer';
import { ManualPreview } from './ManualPreview';
import { AnimatePresence, motion } from 'motion/react';
import { CaretLeft, FileText, Sparkle } from '@phosphor-icons/react';
import { answerValueIsPresent } from '../lib/answerUiPolicy';

const ArtifactStudio = lazy(() =>
  import("./ArtifactStudio").then((module) => ({
    default: module.ArtifactStudio,
  }))
);

interface ManualBuilderProps {
  getManualForRoute: (routeMode: string | undefined) => ManualWorkspace | null;
  onBack: () => void;
}

export function ManualBuilder({
  getManualForRoute,
  onBack,
}: ManualBuilderProps) {
  const { mode } = useParams<{ mode: ModeId }>();
  const [view, setView] = useState<"build" | "artifact">("build");
  const manual = getManualForRoute(mode);
  const manualMode = manual?.mode;
  const composed = manual?.composeManual();
  const hasManualContent = manual?.config.questions.some((question) => (
    answerValueIsPresent(manual.getAnswer(question.id)) ||
    manual.getAnswerNote(question.id).trim().length > 0
  )) ?? false;

  useEffect(() => {
    manual?.activate();
  }, [manualMode]);

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [view]);

  if (!manual || !composed) {
    return <Navigate to="/" />;
  }

  return (
    <div className="w-full font-sans transition-colors duration-700 bg-ankahe-bg text-ankahe-text relative">
      {/* Top Nav */}
      <nav aria-label="Manual builder" className="sticky top-16 z-40 bg-ankahe-bg/80 backdrop-blur-md border-b border-ankahe-border/50">
        <div className="max-w-7xl mx-auto px-6 h-14 grid grid-cols-[1fr_auto_1fr] items-center">
          <button
            onClick={onBack}
            className="type-ui-label min-h-11 min-w-11 flex items-center justify-center justify-self-start gap-2 text-ankahe-muted hover:text-ankahe-text transition-colors"
            aria-label="Back to Hub"
          >
            <CaretLeft size={20} weight="light" />
            <span className="hidden md:inline">Back to Hub</span>
          </button>

          <div aria-hidden="true" />

          <div className="justify-self-end">
            {view === "build" && hasManualContent && (
              <button
                type="button"
                onClick={() => setView("artifact")}
                className="type-ui-label min-h-11 inline-flex items-center gap-2 text-ankahe-muted transition-colors hover:text-ankahe-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ankahe-focus focus-visible:ring-offset-2"
              >
                <Sparkle size={18} weight="light" />
                <span className="hidden sm:inline">Preview manual</span>
              </button>
            )}
            {view === "artifact" && (
              <button
                type="button"
                onClick={() => setView("build")}
                className="type-ui-label min-h-11 inline-flex items-center gap-2 text-ankahe-muted transition-colors hover:text-ankahe-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ankahe-focus focus-visible:ring-offset-2"
              >
                <FileText size={18} weight="light" />
                <span className="hidden sm:inline">Back to answers</span>
              </button>
            )}
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8 md:py-12 lg:py-16">
        <AnimatePresence mode="wait">
          {view === "build" ? (
            <motion.div
              key="build"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid gap-12 xl:grid-cols-[minmax(0,1fr)_450px]"
            >
              {/* Form Side */}
              <div className="space-y-12">
                <FormRenderer
                  config={manual.config}
                  getAnswer={manual.getAnswer}
                  getAnswerNote={manual.getAnswerNote}
                  getVisibility={manual.getVisibility}
                  updateAnswer={manual.updateAnswer}
                  clearAnswer={manual.clearAnswer}
                  updateAnswerNote={manual.updateAnswerNote}
                  updateVisibility={manual.updateVisibility}
                  recognitionSummaries={composed.recognitionSummaries}
                  onFinish={() => setView("artifact")}
                />
              </div>

              {/* Preview Side (Desktop only) */}
              <div className="hidden space-y-8 xl:sticky xl:top-28 xl:block">
                <div className="space-y-4">
                  <h3 className="type-meta text-ankahe-muted px-1">
                    Live Manual Preview
                  </h3>
                  <div className="rounded-xl border border-ankahe-border bg-ankahe-surface-preview p-1.5">
                    <div className="overflow-hidden rounded-lg border border-ankahe-paper-border bg-ankahe-paper-muted">
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
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
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

function ArtifactFallback() {
  return (
    <div className="min-h-80 rounded-lg border border-ankahe-border bg-ankahe-surface p-8">
      <p className="type-meta text-ankahe-muted">Preparing Artifact Studio</p>
    </div>
  );
}
