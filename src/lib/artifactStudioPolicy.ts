/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { ArtifactFormat, TonePreference } from "./schemaTypes";
import type { ManualViewMode } from "./visibilityPolicy";
import type { ManualWorkspace } from "./manualWorkspace";

export interface ArtifactFormatOption {
  id: ArtifactFormat;
  label: string;
  description: string;
}

export interface ArtifactToneOption {
  id: TonePreference;
  label: string;
}

export interface ArtifactStudioSettings {
  viewMode: ManualViewMode;
  excludedSections: string[];
}

export interface ArtifactStudioPolicy {
  manual: ReturnType<ManualWorkspace["composeManual"]>;
  sharedUrl: string;
  previewDescription: string;
  showSafeToSendNote: boolean;
  formatOptions: readonly ArtifactFormatOption[];
  toneOptions: readonly ArtifactToneOption[];
  isSectionExcluded: (sectionId: string) => boolean;
}

export const ARTIFACT_FORMAT_OPTIONS: readonly ArtifactFormatOption[] = [
  { id: "full", label: "Full manual", description: "A complete version with all included sections." },
  { id: "onePage", label: "One-page version", description: "A shorter manual for quick reading." },
  { id: "note", label: "Conversation note", description: "A compact note for one hard conversation." },
  { id: "conversation", label: "Conversation brief", description: "A focused brief for opening a specific talk." },
  { id: "work", label: "Work version", description: "A focused version for professional context." },
  { id: "private", label: "Private copy", description: "A local copy for yourself." },
];

export const ARTIFACT_TONE_OPTIONS: readonly ArtifactToneOption[] = [
  { id: "default", label: "Default" },
  { id: "softer", label: "Softer" },
  { id: "direct", label: "More direct" },
  { id: "warmer", label: "Warmer" },
  { id: "professional", label: "Professional" },
  { id: "shorter", label: "Shorter" },
];

export function createArtifactStudioPolicy(
  workspace: ManualWorkspace,
  settings: ArtifactStudioSettings
): ArtifactStudioPolicy {
  return {
    manual: workspace.composeManual(settings),
    sharedUrl: workspace.getShareUrl(),
    previewDescription: getArtifactPreviewDescription(settings.viewMode),
    showSafeToSendNote: settings.viewMode === "included",
    formatOptions: ARTIFACT_FORMAT_OPTIONS,
    toneOptions: ARTIFACT_TONE_OPTIONS,
    isSectionExcluded: (sectionId) => settings.excludedSections.includes(sectionId),
  };
}

export function toggleExcludedSection(excludedSections: string[], sectionId: string): string[] {
  return excludedSections.includes(sectionId)
    ? excludedSections.filter((id) => id !== sectionId)
    : [...excludedSections, sectionId];
}

export function getViewModeForArtifactFormat(
  format: ArtifactFormat,
  currentViewMode: ManualViewMode
): ManualViewMode {
  return format === "private" ? "private" : currentViewMode;
}

export function getArtifactPreviewDescription(viewMode: ManualViewMode): string {
  if (viewMode === "included") {
    return "Reviewing included answers. Private and omitted answers are removed.";
  }

  return "Previewing your local private copy. Image and PDF exports include this view.";
}
