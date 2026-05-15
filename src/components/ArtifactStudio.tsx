/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useRef, useState, useMemo } from "react";
import type { ManualWorkspace } from "../hooks/useManualState";
import { ManualPreview } from "./ManualPreview";
import { useArtifactExport } from "../hooks/useArtifactExport";
import type { ManualViewMode } from "../lib/visibilityPolicy";
import {
  createArtifactStudioPolicy,
  getViewModeForArtifactFormat,
  toggleExcludedSection,
} from "../lib/artifactStudioPolicy";
import { ExportControls } from "./artifact/ExportControls";
import { ShareControls } from "./artifact/ShareControls";
import { VisibilityControls } from "./artifact/VisibilityControls";
import { AnswerReview } from "./artifact/AnswerReview";
import { MobileExportBar } from "./artifact/MobileExportBar";

interface ArtifactStudioProps {
  manual: ManualWorkspace;
}

export function ArtifactStudio({ manual: workspace }: ArtifactStudioProps) {
  const artifactRef = useRef<HTMLDivElement>(null);
  const [viewMode, setViewMode] = useState<ManualViewMode>("included");
  const [excludedSections, setExcludedSections] = useState<string[]>([]);

  const policy = useMemo(
    () => createArtifactStudioPolicy(workspace, { viewMode, excludedSections }),
    [excludedSections, viewMode, workspace]
  );

  const {
    isExporting,
    copied,
    copyError,
    exportAsImage,
    printManual,
    copyLink
  } = useArtifactExport(artifactRef, workspace.mode, policy.sharedUrl, viewMode);

  const toggleSection = (sectionId: string) => {
    setExcludedSections((prev) => toggleExcludedSection(prev, sectionId));
  };

  const copyIncludedLink = () => {
    if (workspace.storageMode !== "url") {
      workspace.setStorageMode("url");
    }
    copyLink();
  };

  return (
    <div className="space-y-12 pb-24">
      <div aria-live="polite" className="sr-only">
        {copied ? "Link copied to clipboard" : ""}
        {copyError ? "Could not copy the link" : ""}
        {isExporting ? "Exporting image..." : ""}
      </div>
      <div className="space-y-4 text-center md:text-left">
        <h2 className="type-display text-parichay-heading">Artifact Studio</h2>
        <p className="type-lead text-parichay-muted">Shape your manual into a finished document for saving, printing, or sharing.</p>
      </div>

      <div className="grid lg:grid-cols-[1fr_400px] gap-12 items-start">
        {/* Preview Container */}
        <div className="space-y-8">
          <div className="overflow-hidden rounded-lg bg-parichay-surface-preview p-3 md:p-6">
            <div ref={artifactRef} className="mx-auto w-full max-w-3xl origin-top overflow-hidden rounded-md border border-parichay-paper-border bg-parichay-paper max-sm:max-h-[55dvh] max-sm:overflow-y-auto">
              <ManualPreview manual={policy.manual} mode={workspace.mode} className="border-none shadow-none max-h-none" />
            </div>
          </div>
          <MobileExportBar
            copied={copied}
            isExporting={isExporting}
            onCopyLink={copyIncludedLink}
            onExportImage={exportAsImage}
          />
          
          <ExportControls
            isExporting={isExporting}
            viewMode={viewMode}
            onExportImage={exportAsImage}
            onPrint={printManual}
          />
        </div>

        {/* Sharing Side */}
        <div className="space-y-8 lg:sticky lg:top-28">
          <VisibilityControls
            config={workspace.config}
            policy={policy}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            onSectionToggle={toggleSection}
            onFormatChange={(format) => {
              workspace.updateArtifactFormat(format);
              setViewMode((currentViewMode) => getViewModeForArtifactFormat(format, currentViewMode));
            }}
            onToneChange={workspace.updateTone}
          />
          <ShareControls
            storageMode={workspace.storageMode}
            sharedUrl={policy.sharedUrl}
            copied={copied}
            onCopyLink={copyIncludedLink}
            onCreateLink={() => workspace.setStorageMode("url")}
          />
        </div>
      </div>
      <AnswerReview workspace={workspace} />
    </div>
  );
}
