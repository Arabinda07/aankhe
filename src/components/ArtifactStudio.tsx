/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { type ReactNode, type RefObject, useRef, useState, useMemo } from "react";
import type { ManualWorkspace } from "../hooks/useManualState";
import { ManualPreview } from "./ManualPreview";
import { useArtifactExport } from "../hooks/useArtifactExport";
import type { ManualViewMode } from "../lib/visibilityPolicy";
import {
  createArtifactStudioPolicy,
  toggleExcludedSection,
} from "../lib/artifactStudioPolicy";
import { ExportControls } from "./artifact/ExportControls";
import { ShareControls } from "./artifact/ShareControls";
import { PreviewModeToggle, VisibilityControls } from "./artifact/VisibilityControls";
import { AnswerReview } from "./artifact/AnswerReview";
import { MobileExportBar } from "./artifact/MobileExportBar";
import { cn } from "../lib/utils";

interface ArtifactStudioProps {
  manual: ManualWorkspace;
}

type ArtifactTab = "preview" | "review" | "send";
const defaultArtifactTab: ArtifactTab = "preview";

export function ArtifactStudio({ manual: workspace }: ArtifactStudioProps) {
  const artifactRef = useRef<HTMLDivElement>(null);
  const [viewMode, setViewMode] = useState<ManualViewMode>("included");
  const [excludedSections, setExcludedSections] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<ArtifactTab>(defaultArtifactTab);
  const [hasVisitedReview, setHasVisitedReview] = useState(false);
  const [isAnswerReviewOpen, setIsAnswerReviewOpen] = useState(false);

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

  const moveToTab = (tab: ArtifactTab) => {
    if (tab === "send" && !hasVisitedReview) return;
    if (tab === "review") setHasVisitedReview(true);
    setActiveTab(tab);
  };

  return (
    <div className="space-y-12 pb-24">
      <div aria-live="polite" className="sr-only">
        {copied ? "Link copied to clipboard" : ""}
        {copyError ? "Could not copy the link" : ""}
        {isExporting ? "Exporting image..." : ""}
      </div>
      <div className="space-y-4 text-center md:text-left">
        <h2 className="type-display text-parichay-heading">Your intro is ready</h2>
        <p className="type-lead text-parichay-muted">Review what people will see before you send it.</p>
      </div>

      <div className="flex flex-wrap gap-2 rounded-sm border border-parichay-border bg-parichay-control-selected p-1" role="tablist" aria-label="Intro review steps">
        <ArtifactTabButton active={activeTab === "preview"} onClick={() => moveToTab("preview")}>
          Preview
        </ArtifactTabButton>
        <ArtifactTabButton active={activeTab === "review"} onClick={() => moveToTab("review")}>
          Review sharing
        </ArtifactTabButton>
        <ArtifactTabButton active={activeTab === "send"} onClick={() => moveToTab("send")} disabled={!hasVisitedReview}>
          Send / Export
        </ArtifactTabButton>
      </div>

      {activeTab === "preview" && (
        <div className="grid gap-8 lg:grid-cols-[1fr_320px] lg:items-start">
          <PreviewFrame artifactRef={artifactRef} policy={policy} mode={workspace.mode} />
          <div className="space-y-4 lg:sticky lg:top-28">
            <PreviewModeToggle
              policy={policy}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
            />
            <button
              type="button"
              onClick={() => moveToTab("review")}
              className="type-ui-label inline-flex min-h-12 w-full items-center justify-center rounded-md bg-parichay-accent px-4 text-parichay-on-accent transition-colors hover:bg-parichay-accent-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-parichay-focus focus-visible:ring-offset-2"
            >
              Review sharing
            </button>
          </div>
        </div>
      )}

      {activeTab === "review" && (
        <div className="mx-auto max-w-4xl space-y-8">
          <VisibilityControls
            config={workspace.config}
            policy={policy}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            onSectionToggle={toggleSection}
            onFormatChange={workspace.updateArtifactFormat}
            onToneChange={workspace.updateTone}
          />
          <section className="rounded-lg border border-parichay-border bg-parichay-surface p-5 md:p-6">
            <button
              type="button"
              onClick={() => setIsAnswerReviewOpen((current) => !current)}
              aria-expanded={isAnswerReviewOpen}
              className="type-ui-label flex min-h-11 w-full items-center justify-between gap-4 text-left text-parichay-heading transition-colors hover:text-parichay-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-parichay-focus focus-visible:ring-offset-2"
            >
              Review individual answers
              <span className="text-parichay-muted">{isAnswerReviewOpen ? "Close" : "Open"}</span>
            </button>
            {isAnswerReviewOpen && (
              <div className="mt-5">
                <AnswerReview workspace={workspace} />
              </div>
            )}
          </section>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => moveToTab("send")}
              className="type-ui-label inline-flex min-h-12 items-center justify-center rounded-md bg-parichay-accent px-5 text-parichay-on-accent transition-colors hover:bg-parichay-accent-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-parichay-focus focus-visible:ring-offset-2"
            >
              Continue to Send / Export
            </button>
          </div>
        </div>
      )}

      {activeTab === "send" && (
        <div className="grid gap-10 lg:grid-cols-[1fr_400px] lg:items-start">
          <PreviewFrame artifactRef={artifactRef} policy={policy} mode={workspace.mode} />
          <div className="space-y-8 lg:sticky lg:top-28">
            <ExportControls
              isExporting={isExporting}
              viewMode={viewMode}
              onExportImage={exportAsImage}
              onPrint={printManual}
            />
            <ShareControls
              storageMode={workspace.storageMode}
              sharedUrl={policy.sharedUrl}
              copied={copied}
              onCopyLink={copyIncludedLink}
              onCreateLink={() => workspace.setStorageMode("url")}
            />
            <MobileExportBar
              copied={copied}
              isExporting={isExporting}
              onCopyLink={copyIncludedLink}
              onExportImage={exportAsImage}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function ArtifactTabButton({
  active,
  disabled,
  onClick,
  children,
}: {
  active: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "type-ui-label min-h-11 rounded-sm px-4 py-1.5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-parichay-focus focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        active ? "bg-parichay-control text-parichay-text shadow-sm" : "text-parichay-muted hover:bg-parichay-control-hover hover:text-parichay-text"
      )}
    >
      {children}
    </button>
  );
}

function PreviewFrame({
  artifactRef,
  policy,
  mode,
}: {
  artifactRef: RefObject<HTMLDivElement | null>;
  policy: ReturnType<typeof createArtifactStudioPolicy>;
  mode: ManualWorkspace["mode"];
}) {
  return (
    <div className="overflow-hidden rounded-lg bg-parichay-surface-preview p-3 md:p-6">
      <div ref={artifactRef} className="mx-auto w-full max-w-3xl origin-top overflow-hidden rounded-md border border-parichay-paper-border bg-parichay-paper max-sm:max-h-[55dvh] max-sm:overflow-y-auto">
        <ManualPreview manual={policy.manual} mode={mode} className="max-h-none border-none shadow-none" />
      </div>
    </div>
  );
}
