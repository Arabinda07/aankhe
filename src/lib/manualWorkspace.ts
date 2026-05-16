/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type {
  ArtifactFormat,
  ComposedManual,
  ManualState,
  ModeConfig,
  ModeId,
  OnboardingContext,
  Question,
  StorageMode,
  TonePreference,
  Visibility,
} from "./schemaTypes";
import { getModeConfigForDepth } from "./protocolManifest";
import { composeManual as buildComposedManual, type ManualComposeOptions } from "./manualComposer";
import { generateSharedUrl } from "./stateCompression";
import { createVisibilityPolicy, type VisibilityCounts } from "./visibilityPolicy";

export type ManualAnswer = ManualState["answers"][string];

export interface ManualWorkspace {
  mode: ModeId;
  storageMode: StorageMode;
  config: ModeConfig;
  visibilityCounts: VisibilityCounts;
  getAnswer: (questionId: string) => ManualAnswer | undefined;
  getAnswerNote: (questionId: string) => string;
  getVisibility: (question: Question) => Visibility;
  composeManual: (options?: ManualComposeOptions) => ComposedManual;
  getShareUrl: () => string;
  activate: () => void;
  updateAnswer: (questionId: string, value: ManualAnswer) => void;
  clearAnswer: (questionId: string) => void;
  updateAnswerNote: (questionId: string, note: string) => void;
  updateVisibility: (questionId: string, visibility: Visibility) => void;
  updateArtifactFormat: (format: ArtifactFormat) => void;
  updateTone: (tone: TonePreference) => void;
  setStorageMode: (storageMode: StorageMode) => void;
}

export interface ManualWorkspaceActions {
  activate: (mode: ModeId) => void;
  updateAnswer: (questionId: string, value: ManualAnswer) => void;
  clearAnswer: (questionId: string) => void;
  updateAnswerNote: (questionId: string, note: string) => void;
  updateVisibility: (questionId: string, visibility: Visibility) => void;
  updateArtifactFormat: (format: ArtifactFormat) => void;
  updateTone: (tone: TonePreference) => void;
  setStorageMode: (storageMode: StorageMode) => void;
}

export function createDefaultManualState(
  mode: ModeId = "me",
  storageMode: StorageMode = "memory",
  onboarding?: OnboardingContext
): ManualState {
  return {
    mode,
    answers: {},
    answerNotes: {},
    visibilityByQuestion: {},
    storageMode,
    onboarding,
    artifactFormat: defaultArtifactFormat(onboarding),
    tone: "default",
    updatedAt: new Date().toISOString(),
  };
}

export function isSupportedManualMode(mode: string | undefined): mode is ModeId {
  return mode === "me" || mode === "work" || mode === "talk" || mode === "us";
}

export function createManualWorkspace(
  state: ManualState,
  routeMode: string | undefined,
  actions: ManualWorkspaceActions
): ManualWorkspace | null {
  if (!isSupportedManualMode(routeMode)) return null;

  const workingState =
    state.mode === routeMode
      ? state
      : createDefaultManualState(routeMode, state.storageMode);
  const config = getModeConfigForDepth(routeMode, workingState.onboarding?.depth || "manual");
  const visibilityPolicy = createVisibilityPolicy(workingState);

  return {
    mode: workingState.mode,
    storageMode: workingState.storageMode,
    config,
    visibilityCounts: visibilityPolicy.getCounts(),
    getAnswer: (questionId) => workingState.answers[questionId],
    getAnswerNote: (questionId) => workingState.answerNotes?.[questionId] || "",
    getVisibility: visibilityPolicy.visibilityFor,
    composeManual: (options) => buildComposedManual(workingState, options),
    getShareUrl: () => generateSharedUrl(workingState),
    activate: () => {
      if (state.mode !== routeMode) {
        actions.activate(routeMode);
      }
    },
    updateAnswer: actions.updateAnswer,
    clearAnswer: actions.clearAnswer,
    updateAnswerNote: actions.updateAnswerNote,
    updateVisibility: actions.updateVisibility,
    updateArtifactFormat: actions.updateArtifactFormat,
    updateTone: actions.updateTone,
    setStorageMode: actions.setStorageMode,
  };
}

export function defaultArtifactFormat(onboarding?: OnboardingContext): ArtifactFormat {
  if (!onboarding) return "full";
  if (onboarding.depth === "note") return "summary";
  if (onboarding.recipient.includes("work") || onboarding.recipient.includes("manager") || onboarding.recipient.includes("teammate")) {
    return "full";
  }

  return "full";
}
