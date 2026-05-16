/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { type ReactNode, useState } from "react";
import type { ArtifactFormat, ModeConfig, TonePreference } from "../../lib/schemaTypes";
import type { ManualViewMode } from "../../lib/visibilityPolicy";
import type { ArtifactStudioPolicy } from "../../lib/artifactStudioPolicy";
import * as RadioGroup from "@radix-ui/react-radio-group";
import * as Tabs from "@radix-ui/react-tabs";
import { cn } from "../../lib/utils";

interface VisibilityControlsProps {
  config: ModeConfig;
  policy: ArtifactStudioPolicy;
  viewMode: ManualViewMode;
  onViewModeChange: (viewMode: ManualViewMode) => void;
  onSectionToggle: (sectionId: string) => void;
  onFormatChange: (format: ArtifactFormat) => void;
  onToneChange: (tone: TonePreference) => void;
}

export function VisibilityControls({
  config,
  policy,
  viewMode,
  onViewModeChange,
  onSectionToggle,
  onFormatChange,
  onToneChange,
}: VisibilityControlsProps) {
  return (
    <div className="space-y-6">
      <VisibilitySummary policy={policy} />
      <SectionPicker config={config} policy={policy} onSectionToggle={onSectionToggle} />
      <ShareFormatPicker policy={policy} onFormatChange={onFormatChange} onViewModeChange={onViewModeChange} viewMode={viewMode} />
      <ToneOptionsDisclosure policy={policy} onToneChange={onToneChange} />
    </div>
  );
}

export function PreviewModeToggle({
  policy,
  viewMode,
  onViewModeChange,
}: {
  policy: ArtifactStudioPolicy;
  viewMode: ManualViewMode;
  onViewModeChange: (viewMode: ManualViewMode) => void;
}) {
  return (
    <div className="rounded-lg border border-parichay-border bg-parichay-surface p-5 md:p-6">
      <h3 className="type-panel-title mb-4 text-parichay-heading">Preview mode</h3>
      <Tabs.Root value={viewMode} onValueChange={(value) => onViewModeChange(value as ManualViewMode)}>
        <Tabs.List className="flex w-fit rounded-sm border border-parichay-border bg-parichay-control-selected p-1" aria-label="Preview mode">
          <PreviewModeTab value="included" viewMode={viewMode}>What they see</PreviewModeTab>
          <PreviewModeTab value="private" viewMode={viewMode}>What I see</PreviewModeTab>
        </Tabs.List>
      </Tabs.Root>
      <p className="type-caption mt-3 text-parichay-muted">
        {policy.previewDescription}
      </p>
    </div>
  );
}

function PreviewModeTab({
  value,
  viewMode,
  children,
}: {
  value: ManualViewMode;
  viewMode: ManualViewMode;
  children: ReactNode;
}) {
  return (
    <Tabs.Trigger
      value={value}
      className={cn(
        "type-ui-label min-h-11 rounded-sm px-4 py-1.5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-parichay-focus focus-visible:ring-offset-2",
        viewMode === value ? "bg-parichay-control text-parichay-text shadow-sm" : "text-parichay-muted hover:bg-parichay-control-hover hover:text-parichay-text"
      )}
    >
      {children}
    </Tabs.Trigger>
  );
}

export function ShareFormatPicker({
  policy,
  viewMode,
  onFormatChange,
  onViewModeChange,
}: {
  policy: ArtifactStudioPolicy;
  viewMode: ManualViewMode;
  onFormatChange: (format: ArtifactFormat) => void;
  onViewModeChange: (viewMode: ManualViewMode) => void;
}) {
  const { manual } = policy;

  return (
    <section className="space-y-4 rounded-lg border border-parichay-border bg-parichay-surface p-5 md:p-6">
      <h3 className="type-panel-title text-parichay-heading">Share format</h3>
      <RadioGroup.Root
        value={manual.artifactFormat}
        onValueChange={(value) => {
          const format = value as ArtifactFormat;
          onFormatChange(format);
          onViewModeChange(getViewModeForFormat(format, viewMode));
        }}
        aria-label="Share format"
        className="grid gap-2"
      >
        {policy.formatOptions.map((format) => (
          <RadioGroup.Item
            key={format.id}
            value={format.id}
            className={cn(
              "type-caption min-h-11 rounded-sm border px-3 py-2 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-parichay-focus focus-visible:ring-offset-2",
              manual.artifactFormat === format.id
                ? "border-parichay-accent bg-parichay-accent-soft text-parichay-accent-dark"
                : "border-parichay-border bg-parichay-control text-parichay-text hover:bg-parichay-control-hover"
            )}
          >
            <span className="block font-semibold">{format.label}</span>
            <span className="block text-parichay-muted">{format.description}</span>
          </RadioGroup.Item>
        ))}
      </RadioGroup.Root>
    </section>
  );
}

export function SectionPicker({
  config,
  policy,
  onSectionToggle,
}: {
  config: ModeConfig;
  policy: ArtifactStudioPolicy;
  onSectionToggle: (sectionId: string) => void;
}) {
  return (
    <section className="space-y-4 rounded-lg border border-parichay-border bg-parichay-surface p-5 md:p-6">
      <h3 className="type-panel-title text-parichay-heading">Sections</h3>
      <div className="flex flex-wrap gap-2">
        {config.sections.map((section) => {
          const isExcluded = policy.isSectionExcluded(section.id);
          return (
            <button
              key={section.id}
              type="button"
              onClick={() => onSectionToggle(section.id)}
              aria-pressed={!isExcluded}
              className={cn(
                "type-caption min-h-11 rounded-sm border px-3 py-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-parichay-focus focus-visible:ring-offset-2",
                isExcluded
                  ? "border-parichay-border bg-parichay-control-selected text-parichay-muted"
                  : "border-parichay-accent bg-parichay-accent-soft text-parichay-accent-dark"
              )}
            >
              {section.title}
            </button>
          );
        })}
      </div>
    </section>
  );
}

export function VisibilitySummary({ policy }: { policy: ArtifactStudioPolicy }) {
  const { manual } = policy;

  return (
    <section className="space-y-4 rounded-lg border border-parichay-border bg-parichay-surface p-5 md:p-6">
      <h3 className="type-panel-title text-parichay-heading">Sharing summary</h3>
      <div className="space-y-3">
        <div className="type-caption flex items-center justify-between">
          <span className="text-parichay-muted">Included answers</span>
          <span className="text-parichay-text">{manual.shareableCount}</span>
        </div>
        <div className="type-caption flex items-center justify-between">
          <span className="text-parichay-muted">Private answers</span>
          <span className="text-parichay-private">{manual.privateCount}</span>
        </div>
        <div className="type-caption flex items-center justify-between">
          <span className="text-parichay-muted">Omitted answers</span>
          <span className="text-parichay-text">{manual.hiddenCount}</span>
        </div>
      </div>
      <p className="type-caption text-parichay-muted">
        Included answers can be shared. Private answers stay here. Omitted answers are left out.
      </p>
      {policy.showSafeToSendNote && (
        <p className="type-ui-label rounded-sm border border-parichay-sandal/25 bg-parichay-sandal-soft px-3 py-2 text-parichay-sandal">
          This version is ready to send.
        </p>
      )}
    </section>
  );
}

export function ToneOptionsDisclosure({
  policy,
  onToneChange,
}: {
  policy: ArtifactStudioPolicy;
  onToneChange: (tone: TonePreference) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { manual } = policy;

  return (
    <section className="rounded-lg border border-parichay-border bg-parichay-surface p-5 md:p-6">
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        aria-expanded={isOpen}
        className="type-ui-label flex min-h-11 w-full items-center justify-between gap-4 text-left text-parichay-heading transition-colors hover:text-parichay-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-parichay-focus focus-visible:ring-offset-2"
      >
        More options
        <span className="text-parichay-muted">{isOpen ? "Close" : "Open"}</span>
      </button>
      {isOpen && (
        <div className="mt-5 space-y-4 border-t border-parichay-border pt-5">
          <h3 className="type-panel-title text-parichay-heading">Intro tone</h3>
          <RadioGroup.Root
            value={manual.tone}
            onValueChange={(value) => onToneChange(value as TonePreference)}
            aria-label="Intro tone"
            className="flex flex-wrap gap-2"
          >
            {policy.toneOptions.map((tone) => (
              <RadioGroup.Item
                key={tone.id}
                value={tone.id}
                className={cn(
                  "type-caption min-h-11 rounded-sm border px-3 py-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-parichay-focus focus-visible:ring-offset-2",
                  manual.tone === tone.id
                    ? "border-parichay-accent bg-parichay-accent-soft text-parichay-accent-dark"
                    : "border-parichay-border bg-parichay-control text-parichay-text hover:bg-parichay-control-hover"
                )}
              >
                {tone.label}
              </RadioGroup.Item>
            ))}
          </RadioGroup.Root>
        </div>
      )}
    </section>
  );
}

function getViewModeForFormat(format: ArtifactFormat, currentViewMode: ManualViewMode): ManualViewMode {
  return format === "private" ? "private" : currentViewMode;
}
