/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useRef, useState, useMemo } from "react";
import { ManualWorkspace } from "../hooks/useManualState";
import { ManualPreview } from "./ManualPreview";
import { useArtifactExport } from "../hooks/useArtifactExport";
import type { ManualViewMode } from "../lib/visibilityPolicy";
import { ExportControls } from "./artifact/ExportControls";
import { ShareControls } from "./artifact/ShareControls";
import { VisibilityControls } from "./artifact/VisibilityControls";
import { AnswerReview } from "./artifact/AnswerReview";

interface ArtifactStudioProps {
  manual: ManualWorkspace;
}

export function ArtifactStudio({ manual: workspace }: ArtifactStudioProps) {
  const artifactRef = useRef<HTMLDivElement>(null);
  const [viewMode, setViewMode] = useState<ManualViewMode>("included");
  const [excludedSections, setExcludedSections] = useState<string[]>([]);

  const manual = useMemo(
    () => workspace.composeManual({ viewMode, excludedSections }),
    [excludedSections, viewMode, workspace]
  );
  const secureSharedUrl = useMemo(() => workspace.getShareUrl(), [workspace]);

  const {
    isExporting,
    copied,
    copyError,
    exportAsImage,
    printManual,
    copyLink
  } = useArtifactExport(artifactRef, workspace.mode, secureSharedUrl, viewMode);

  const toggleSection = (sectionId: string) => {
    setExcludedSections(prev => 
      prev.includes(sectionId) ? prev.filter(id => id !== sectionId) : [...prev, sectionId]
    );
  };

  return (
    <div className="space-y-12 pb-24">
      <div aria-live="polite" className="sr-only">
        {copied ? "Link copied to clipboard" : ""}
        {copyError ? "Could not copy the link" : ""}
        {isExporting ? "Exporting image..." : ""}
      </div>
      <div className="space-y-4 text-center md:text-left">
        <h2 className="type-display text-ankahe-heading">Artifact Studio</h2>
        <p className="type-lead text-ankahe-muted">Shape your manual into a finished document for saving, printing, or sharing.</p>
      </div>

      <div className="grid lg:grid-cols-[1fr_400px] gap-12 items-start">
        {/* Preview Container */}
        <div className="space-y-8">
          <div className="overflow-hidden rounded-lg bg-ankahe-surface-preview p-3 md:p-6">
            <div ref={artifactRef} className="mx-auto w-full max-w-3xl origin-top overflow-hidden rounded-md border border-ankahe-paper-border bg-ankahe-paper">
              <ManualPreview manual={manual} mode={workspace.mode} className="border-none shadow-none max-h-none" />
            </div>
          </div>
          
          <ExportControls
            isExporting={isExporting}
            viewMode={viewMode}
            onExportImage={exportAsImage}
            onPrint={printManual}
          />
          <AnswerReview workspace={workspace} />
        </div>

        {/* Sharing Side */}
        <div className="space-y-8 lg:sticky lg:top-28">
          <VisibilityControls
            config={workspace.config}
            manual={manual}
            viewMode={viewMode}
            excludedSections={excludedSections}
            onViewModeChange={setViewMode}
            onSectionToggle={toggleSection}
            onFormatChange={(format) => {
              workspace.updateArtifactFormat(format);
              if (format === "private") setViewMode("private");
            }}
            onToneChange={workspace.updateTone}
          />
          <ShareControls
            storageMode={workspace.storageMode}
            sharedUrl={secureSharedUrl}
            copied={copied}
            onCopyLink={copyLink}
          />
        </div>
      </div>
    </div>
  );
}
