/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { ComposedManual, ModeConfig } from "../../lib/schemaTypes";
import type { ManualViewMode } from "../../lib/visibilityPolicy";
import { cn } from "../../lib/utils";

interface VisibilityControlsProps {
  config: ModeConfig;
  manual: ComposedManual;
  viewMode: ManualViewMode;
  excludedSections: string[];
  onViewModeChange: (viewMode: ManualViewMode) => void;
  onSectionToggle: (sectionId: string) => void;
}

export function VisibilityControls({
  config,
  manual,
  viewMode,
  excludedSections,
  onViewModeChange,
  onSectionToggle,
}: VisibilityControlsProps) {
  return (
    <div className="bg-ankahe-surface p-8 space-y-8 rounded-lg border border-ankahe-border shadow-sm">
      <div>
        <h3 className="type-panel-title text-ankahe-text mb-4">Manual view</h3>
        <div className="flex bg-ankahe-control-selected p-1 rounded-sm w-fit border border-ankahe-border">
          <button
            onClick={() => onViewModeChange("included")}
            aria-pressed={viewMode === "included"}
            className={cn(
              "type-ui-label min-h-11 px-4 py-1.5 rounded-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ankahe-focus focus-visible:ring-offset-2",
              viewMode === "included" ? "bg-ankahe-control text-ankahe-text shadow-sm" : "text-ankahe-muted hover:bg-ankahe-control-hover hover:text-ankahe-text"
            )}
          >
            Included only
          </button>
          <button
            onClick={() => onViewModeChange("private")}
            aria-pressed={viewMode === "private"}
            className={cn(
              "type-ui-label min-h-11 px-4 py-1.5 rounded-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ankahe-focus focus-visible:ring-offset-2",
              viewMode === "private" ? "bg-ankahe-control text-ankahe-text shadow-sm" : "text-ankahe-muted hover:bg-ankahe-control-hover hover:text-ankahe-text"
            )}
          >
            Full private copy
          </button>
        </div>
        <p className="type-caption text-ankahe-muted mt-3">
          {viewMode === "included"
            ? "Previewing included answers. Private answers stay out."
            : "Previewing your local private copy. Image and PDF exports include this view."}
        </p>
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
        </div>
        <p className="type-caption text-ankahe-muted">
          Share links and QR codes use included answers only.
        </p>
      </div>
    </div>
  );
}
