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
import * as Tabs from "@radix-ui/react-tabs";
import { cn } from '../lib/utils';
import { CaretLeft, FileText, Sparkle } from '@phosphor-icons/react';

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

          <Tabs.Root
            value={view}
            onValueChange={(nextView) => setView(nextView as "build" | "artifact")}
            className="justify-self-center"
          >
            <Tabs.List className="flex bg-ankahe-control-selected p-1 rounded-sm border border-ankahe-border" aria-label="Manual view selector">
            <Tabs.Trigger
              value="build"
              className={cn(
                "type-ui-label min-h-11 flex items-center gap-2 px-4 py-1.5 rounded-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ankahe-focus focus-visible:ring-offset-2",
                view === 'build' ? "bg-ankahe-control text-ankahe-text shadow-sm" : "text-ankahe-muted hover:bg-ankahe-control-hover hover:text-ankahe-text"
              )}
            >
              <FileText size={18} weight="light" />
              Draft
            </Tabs.Trigger>
            <Tabs.Trigger
              value="artifact"
              className={cn(
                "type-ui-label min-h-11 flex items-center gap-2 px-4 py-1.5 rounded-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ankahe-focus focus-visible:ring-offset-2",
                view === 'artifact' ? "bg-ankahe-control text-ankahe-text shadow-sm" : "text-ankahe-muted hover:bg-ankahe-control-hover hover:text-ankahe-text"
              )}
            >
              <Sparkle size={18} weight="light" />
              Artifact
            </Tabs.Trigger>
            </Tabs.List>
          </Tabs.Root>

          <div aria-hidden="true" className="hidden md:block" />
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-12 md:py-24">
        <AnimatePresence mode="wait">
          {view === "build" ? (
            <motion.div
              key="build"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid lg:grid-cols-[1fr_450px] gap-12"
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
              <div className="hidden lg:block space-y-8 sticky top-28">
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
