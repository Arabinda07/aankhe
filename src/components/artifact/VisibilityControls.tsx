/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { ArtifactFormat, ComposedManual, ModeConfig, TonePreference } from "../../lib/schemaTypes";
import type { ManualViewMode } from "../../lib/visibilityPolicy";
import { cn } from "../../lib/utils";

interface VisibilityControlsProps {
  config: ModeConfig;
  manual: ComposedManual;
  viewMode: ManualViewMode;
  excludedSections: string[];
  onViewModeChange: (viewMode: ManualViewMode) => void;
  onSectionToggle: (sectionId: string) => void;
  onFormatChange: (format: ArtifactFormat) => void;
  onToneChange: (tone: TonePreference) => void;
}

export function VisibilityControls({
  config,
  manual,
  viewMode,
  excludedSections,
  onViewModeChange,
  onSectionToggle,
  onFormatChange,
  onToneChange,
}: VisibilityControlsProps) {
  return (
    <div className="bg-ankahe-surface p-8 space-y-8 rounded-lg border border-ankahe-border shadow-sm">
      <div>
        <h3 className="type-panel-title text-ankahe-text mb-4">Public preview</h3>
        <div className="flex bg-ankahe-control-selected p-1 rounded-sm w-fit border border-ankahe-border">
          <button
            onClick={() => onViewModeChange("included")}
            aria-pressed={viewMode === "included"}
            className={cn(
              "type-ui-label min-h-11 px-4 py-1.5 rounded-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ankahe-focus focus-visible:ring-offset-2",
              viewMode === "included" ? "bg-ankahe-control text-ankahe-text shadow-sm" : "text-ankahe-muted hover:bg-ankahe-control-hover hover:text-ankahe-text"
            )}
          >
            What they see
          </button>
          <button
            onClick={() => onViewModeChange("private")}
            aria-pressed={viewMode === "private"}
            className={cn(
              "type-ui-label min-h-11 px-4 py-1.5 rounded-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ankahe-focus focus-visible:ring-offset-2",
              viewMode === "private" ? "bg-ankahe-control text-ankahe-text shadow-sm" : "text-ankahe-muted hover:bg-ankahe-control-hover hover:text-ankahe-text"
            )}
          >
            What I see
          </button>
        </div>
        <p className="type-caption text-ankahe-muted mt-3">
          {viewMode === "included"
            ? "Reviewing included answers. Private and omitted answers are removed."
            : "Previewing your local private copy. Image and PDF exports include this view."}
        </p>
      </div>

      <div className="space-y-4 border-t border-ankahe-border pt-6">
        <h4 className="type-panel-title text-ankahe-text">Share format</h4>
        <div className="grid gap-2">
          {FORMAT_OPTIONS.map((format) => (
            <button
              key={format.id}
              onClick={() => onFormatChange(format.id)}
              aria-pressed={manual.artifactFormat === format.id}
              className={cn(
                "type-caption min-h-11 rounded-sm border px-3 py-2 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ankahe-focus focus-visible:ring-offset-2",
                manual.artifactFormat === format.id
                  ? "border-ankahe-accent bg-ankahe-accent-soft text-ankahe-accent-dark"
                  : "border-ankahe-border bg-ankahe-control text-ankahe-text hover:bg-ankahe-control-hover"
              )}
            >
              <span className="block font-semibold">{format.label}</span>
              <span className="block text-ankahe-muted">{format.description}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4 border-t border-ankahe-border pt-6">
        <h4 className="type-panel-title text-ankahe-text">Tone</h4>
        <div className="flex flex-wrap gap-2">
          {TONE_OPTIONS.map((tone) => (
            <button
              key={tone.id}
              onClick={() => onToneChange(tone.id)}
              aria-pressed={manual.tone === tone.id}
              className={cn(
                "type-caption min-h-11 rounded-sm border px-3 py-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ankahe-focus focus-visible:ring-offset-2",
                manual.tone === tone.id
                  ? "border-ankahe-accent bg-ankahe-accent-soft text-ankahe-accent-dark"
                  : "border-ankahe-border bg-ankahe-control text-ankahe-text hover:bg-ankahe-control-hover"
              )}
            >
              {tone.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="type-panel-title text-ankahe-text">Sections</h4>
        <div className="flex flex-wrap gap-2">
          {config.sections.map((section) => {
            const isExcluded = excludedSections.includes(section.id);
            return (
              <button
                key={section.id}
                onClick={() => onSectionToggle(section.id)}
                aria-pressed={!isExcluded}
                className={cn(
                  "type-caption min-h-11 px-3 py-1.5 rounded-sm border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ankahe-focus focus-visible:ring-offset-2",
                  isExcluded
                    ? "bg-ankahe-control-selected border-ankahe-border text-ankahe-muted"
                    : "bg-ankahe-accent/10 border-ankahe-accent text-ankahe-accent-dark"
                )}
              >
                {section.title}
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-4 border-t border-ankahe-border pt-6">
        <h3 className="type-panel-title text-ankahe-text">Visibility note</h3>
        <div className="space-y-3">
          <div className="type-caption flex items-center justify-between">
            <span className="text-ankahe-muted">Included answers</span>
            <span className="text-ankahe-text">{manual.shareableCount}</span>
          </div>
          <div className="type-caption flex items-center justify-between">
            <span className="text-ankahe-muted">Private answers</span>
            <span className="text-ankahe-accent-dark">{manual.privateCount}</span>
          </div>
          <div className="type-caption flex items-center justify-between">
            <span className="text-ankahe-muted">Omitted answers</span>
            <span className="text-ankahe-text">{manual.hiddenCount}</span>
          </div>
        </div>
        <p className="type-caption text-ankahe-muted">
          Share links and QR codes use included answers only.
        </p>
        {viewMode === "included" && (
          <p className="type-ui-label rounded-sm border border-ankahe-accent/25 bg-ankahe-accent-soft px-3 py-2 text-ankahe-accent-dark">
            This version is safe to send.
          </p>
        )}
      </div>
    </div>
  );
}

const FORMAT_OPTIONS: Array<{ id: ArtifactFormat; label: string; description: string }> = [
  { id: "full", label: "Full manual", description: "A complete version with all included sections." },
  { id: "onePage", label: "One-page version", description: "A shorter manual for quick reading." },
  { id: "note", label: "Conversation note", description: "A compact note for one hard conversation." },
  { id: "conversation", label: "Conversation brief", description: "A focused brief for opening a specific talk." },
  { id: "work", label: "Work version", description: "A focused version for professional context." },
  { id: "private", label: "Private copy", description: "A local copy for yourself." },
];

const TONE_OPTIONS: Array<{ id: TonePreference; label: string }> = [
  { id: "default", label: "Default" },
  { id: "softer", label: "Softer" },
  { id: "direct", label: "More direct" },
  { id: "warmer", label: "Warmer" },
  { id: "professional", label: "Professional" },
  { id: "shorter", label: "Shorter" },
];
