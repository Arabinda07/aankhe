/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

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
  const { manual } = policy;

  return (
    <div className="bg-parichay-surface p-8 space-y-8 rounded-lg border border-parichay-border shadow-sm">
      <div>
        <h3 className="type-panel-title text-parichay-heading mb-4">Public preview</h3>
        <Tabs.Root value={viewMode} onValueChange={(value) => onViewModeChange(value as ManualViewMode)}>
          <Tabs.List className="flex bg-parichay-control-selected p-1 rounded-sm w-fit border border-parichay-border" aria-label="Public preview mode">
          <Tabs.Trigger
            value="included"
            className={cn(
              "type-ui-label min-h-11 px-4 py-1.5 rounded-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-parichay-focus focus-visible:ring-offset-2",
              viewMode === "included" ? "bg-parichay-control text-parichay-text shadow-sm" : "text-parichay-muted hover:bg-parichay-control-hover hover:text-parichay-text"
            )}
          >
            What they see
          </Tabs.Trigger>
          <Tabs.Trigger
            value="private"
            className={cn(
              "type-ui-label min-h-11 px-4 py-1.5 rounded-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-parichay-focus focus-visible:ring-offset-2",
              viewMode === "private" ? "bg-parichay-control text-parichay-text shadow-sm" : "text-parichay-muted hover:bg-parichay-control-hover hover:text-parichay-text"
            )}
          >
            What I see
          </Tabs.Trigger>
          </Tabs.List>
        </Tabs.Root>
        <p className="type-caption text-parichay-muted mt-3">
          {policy.previewDescription}
        </p>
      </div>

      <div className="space-y-4 border-t border-parichay-border pt-6">
        <h4 className="type-panel-title text-parichay-heading">Share format</h4>
        <RadioGroup.Root
          value={manual.artifactFormat}
          onValueChange={(value) => onFormatChange(value as ArtifactFormat)}
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
      </div>

      <div className="space-y-4 border-t border-parichay-border pt-6">
        <h4 className="type-panel-title text-parichay-heading">Tone</h4>
        <RadioGroup.Root
          value={manual.tone}
          onValueChange={(value) => onToneChange(value as TonePreference)}
          aria-label="Manual tone"
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

      <div className="space-y-4">
        <h4 className="type-panel-title text-parichay-heading">Sections</h4>
        <div className="flex flex-wrap gap-2">
          {config.sections.map((section) => {
            const isExcluded = policy.isSectionExcluded(section.id);
            return (
              <button
                key={section.id}
                onClick={() => onSectionToggle(section.id)}
                aria-pressed={!isExcluded}
                className={cn(
                  "type-caption min-h-11 px-3 py-1.5 rounded-sm border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-parichay-focus focus-visible:ring-offset-2",
                  isExcluded
                    ? "bg-parichay-control-selected border-parichay-border text-parichay-muted"
                    : "border-parichay-accent bg-parichay-accent-soft text-parichay-accent-dark"
                )}
              >
                {section.title}
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-4 border-t border-parichay-border pt-6">
        <h3 className="type-panel-title text-parichay-heading">Visibility note</h3>
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
          Share links and QR codes use included answers only.
        </p>
        {policy.showSafeToSendNote && (
          <p className="type-ui-label rounded-sm border border-parichay-sandal/25 bg-parichay-sandal-soft px-3 py-2 text-parichay-sandal">
            This version is safe to send.
          </p>
        )}
      </div>
    </div>
  );
}
