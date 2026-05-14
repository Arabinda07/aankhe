/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { lazy, Suspense, useEffect, useLayoutEffect, useMemo, useState } from 'react';
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
  const composed = useMemo(() => manual?.composeManual(), [manual]);
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
      <div className="sticky top-6 z-40 px-4 flex justify-center pointer-events-none">
        <nav aria-label="Manual builder" className="pointer-events-auto flex items-center justify-between gap-6 rounded-full border border-ankahe-border/50 bg-ankahe-bg/80 px-4 sm:px-6 h-14 backdrop-blur-2xl shadow-sm">
          <button
            onClick={onBack}
            className="type-ui-label min-h-11 flex items-center justify-center gap-2 px-2 text-ankahe-muted hover:text-ankahe-text transition-colors"
            aria-label="Back to Hub"
          >
            <CaretLeft size={20} weight="light" />
            <span className="hidden md:inline">Back to Hub</span>
          </button>

          <div aria-hidden="true" className="w-px h-4 bg-ankahe-border/50" />

          <div>
            {view === "build" && hasManualContent && (
              <button
                type="button"
                onClick={() => setView("artifact")}
                className="type-ui-label min-h-11 inline-flex items-center gap-2 px-2 text-ankahe-muted transition-colors hover:text-ankahe-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ankahe-focus focus-visible:ring-offset-2"
              >
                <Sparkle size={18} weight="light" />
                <span className="hidden sm:inline">Preview manual</span>
              </button>
            )}
            {view === "artifact" && (
              <button
                type="button"
                onClick={() => setView("build")}
                className="type-ui-label min-h-11 inline-flex items-center gap-2 px-2 text-ankahe-muted transition-colors hover:text-ankahe-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ankahe-focus focus-visible:ring-offset-2"
              >
                <FileText size={18} weight="light" />
                <span className="hidden sm:inline">Back to answers</span>
              </button>
            )}
          </div>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 lg:py-32">
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
                  <div className="rounded-[2rem] border border-ankahe-border bg-ankahe-surface-preview p-2 shadow-sm">
                    <div className="overflow-hidden rounded-[calc(2rem-0.5rem)] border border-ankahe-paper-border bg-ankahe-paper-muted shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
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
