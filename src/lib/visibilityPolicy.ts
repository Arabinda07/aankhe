import { getModeConfigForDepth } from "./protocolManifest";
import type { ManualState, Question, Visibility } from "./schemaTypes";

export type ManualViewMode = "included" | "private";

export interface VisibilityCounts {
  answeredCount: number;
  shareableCount: number;
  privateCount: number;
  hiddenCount: number;
  hasPrivateItems: boolean;
}

export interface VisibilityPolicy {
  visibilityFor: (question: Question) => Visibility;
  canAppearInManual: (question: Question, viewMode: ManualViewMode) => boolean;
  createShareSafeState: () => ManualState;
  getCounts: () => VisibilityCounts;
}

function resolveVisibility(state: ManualState, question: Question): Visibility {
  return state.visibilityByQuestion[question.id] || question.defaultVisibility;
}

function canVisibilityAppearInManual(visibility: Visibility, viewMode: ManualViewMode): boolean {
  if (visibility === "hide") return false;
  if (visibility === "private") return viewMode === "private";
  return true;
}

export function createVisibilityPolicy(state: ManualState): VisibilityPolicy {
  const config = getModeConfigForDepth(state.mode, state.onboarding?.depth || "manual");

  const visibilityFor = (question: Question) => resolveVisibility(state, question);

  return {
    visibilityFor,
    canAppearInManual: (question, viewMode) =>
      canVisibilityAppearInManual(visibilityFor(question), viewMode),
    createShareSafeState: () => {
      const answers: ManualState["answers"] = {};
      const answerNotes: ManualState["answerNotes"] = {};
      const visibilityByQuestion: ManualState["visibilityByQuestion"] = {};

      for (const question of config.questions) {
        if (!(question.id in state.answers)) continue;
        if (visibilityFor(question) !== "share") continue;

        answers[question.id] = state.answers[question.id];
        visibilityByQuestion[question.id] = "share";
        if (state.answerNotes?.[question.id]) {
          answerNotes[question.id] = state.answerNotes[question.id];
        }
      }

      return {
        ...state,
        answers,
        answerNotes,
        visibilityByQuestion,
      };
    },
    getCounts: () => {
      let answeredCount = 0;
      let shareableCount = 0;
      let privateCount = 0;
      let hiddenCount = 0;

      for (const question of config.questions) {
        if (!(question.id in state.answers)) continue;

        answeredCount += 1;
        const visibility = visibilityFor(question);
        if (visibility === "share") shareableCount += 1;
        if (visibility === "private") privateCount += 1;
        if (visibility === "hide") hiddenCount += 1;
      }

      return {
        answeredCount,
        shareableCount,
        privateCount,
        hiddenCount,
        hasPrivateItems: privateCount > 0,
      };
    },
  };
}

export function getAnswerVisibility(state: ManualState, question: Question): Visibility {
  return createVisibilityPolicy(state).visibilityFor(question);
}

export function canAnswerAppearInManual(visibility: Visibility, viewMode: ManualViewMode): boolean {
  return canVisibilityAppearInManual(visibility, viewMode);
}

export function createShareSafeState(state: ManualState): ManualState {
  return createVisibilityPolicy(state).createShareSafeState();
}

export function getVisibilityCounts(state: ManualState): VisibilityCounts {
  return createVisibilityPolicy(state).getCounts();
}
