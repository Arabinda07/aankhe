/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { ModeId, ManualState, Visibility, StorageMode } from '../lib/schemaTypes';
import { PROTOCOL_MANIFEST } from '../lib/protocolManifest';
import { composeManual } from '../lib/manualComposer';
import { FormRenderer } from './FormRenderer';
import { ArtifactStudio } from './ArtifactStudio';
import { ManualPreview } from './ManualPreview';
import { PrivacyMeter } from './PrivacyMeter';
import { AnimatePresence, motion } from 'motion/react';
import { cn } from '../lib/utils';
import { ChevronLeft, Sparkles, FileText } from 'lucide-react';

interface ManualBuilderProps {
  state: ManualState;
  updateAnswer: (id: string, val: any) => void;
  updateVisibility: (id: string, vis: Visibility) => void;
  setStorageMode: (mode: StorageMode) => void;
  onBack: () => void;
}

export function ManualBuilder({
  state,
  updateAnswer,
  updateVisibility,
  setStorageMode,
  onBack,
}: ManualBuilderProps) {
  const { mode } = useParams<{ mode: ModeId }>();
  const config = PROTOCOL_MANIFEST[mode || "me"];
  const [view, setView] = useState<"build" | "artifact">("build");
  const composed = useMemo(() => composeManual(state), [state]);

  if (!mode || (mode !== "me" && mode !== "work")) {
    return <Navigate to="/" />;
  }

  return (
    <div className="w-full font-sans transition-colors duration-700 bg-ankahe-bg text-ankahe-text relative">
      {/* Top Nav */}
      <nav aria-label="Manual builder" className="sticky top-16 z-40 bg-ankahe-bg/80 backdrop-blur-md border-b border-ankahe-border/50">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <button
            onClick={onBack}
            className="type-ui-label min-h-11 min-w-11 flex items-center justify-center gap-2 text-ankahe-muted hover:text-ankahe-text transition-colors"
            aria-label="Back to Hub"
          >
            <ChevronLeft size={18} />
            <span className="hidden md:inline">Back to Hub</span>
          </button>

          <div className="flex bg-ankahe-border/30 p-1 rounded-sm" aria-label="Manual view selector">
            <button
              onClick={() => setView('build')}
              className={cn(
                "type-ui-label min-h-11 flex items-center gap-2 px-4 py-1.5 rounded-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ankahe-accent focus-visible:ring-offset-2",
                view === 'build' ? "bg-ankahe-surface text-ankahe-text shadow-sm" : "text-ankahe-muted hover:text-ankahe-text"
              )}
            >
              <FileText size={14} />
              Draft
            </button>
            <button
              onClick={() => setView('artifact')}
              className={cn(
                "type-ui-label min-h-11 flex items-center gap-2 px-4 py-1.5 rounded-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ankahe-accent focus-visible:ring-offset-2",
                view === 'artifact' ? "bg-ankahe-surface text-ankahe-text shadow-sm" : "text-ankahe-muted hover:text-ankahe-text"
              )}
            >
              <Sparkles size={14} />
              Artifact
            </button>
          </div>

          <div className="hidden md:block">
            <PrivacyMeter state={state} compact />
          </div>
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
                  config={config}
                  state={state}
                  updateAnswer={updateAnswer}
                  updateVisibility={updateVisibility}
                  onFinish={() => setView("artifact")}
                />
              </div>

              {/* Preview Side (Desktop only) */}
              <div className="hidden lg:block space-y-8 sticky top-28">
                <div className="space-y-4">
                  <h3 className="type-meta text-ankahe-muted px-1">
                    Live Manual Preview
                  </h3>
                  <div className="p-1.5 rounded-[2rem] bg-ankahe-surface-soft/50 ring-1 ring-ankahe-border/50">
                    <div className="bg-ankahe-bg rounded-[calc(2rem-0.375rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] overflow-hidden">
                      <ManualPreview
                        manual={composed}
                        mode={state.mode}
                        className="h-[600px] border-none shadow-none"
                      />
                    </div>
                  </div>
                </div>
                <PrivacyMeter state={state} />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="artifact"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <ArtifactStudio 
                state={state}
                url={window.location.href} 
                storageMode={state.storageMode} 
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
