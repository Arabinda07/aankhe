import { PROTOCOL_MANIFEST } from "./protocolManifest";
import type { ManualState, Question, Visibility } from "./schemaTypes";

export type ManualViewMode = "included" | "private";

export function getAnswerVisibility(state: ManualState, question: Question): Visibility {
  return state.visibilityByQuestion[question.id] || question.defaultVisibility;
}

export function canAnswerAppearInManual(visibility: Visibility, viewMode: ManualViewMode): boolean {
  if (visibility === "hide") return false;
  if (visibility === "private") return viewMode === "private";
  return true;
}

export function createShareSafeState(state: ManualState): ManualState {
  const config = PROTOCOL_MANIFEST[state.mode];
  const answers: ManualState["answers"] = {};
  const visibilityByQuestion: ManualState["visibilityByQuestion"] = {};

  for (const question of config.questions) {
    if (!(question.id in state.answers)) continue;
    if (getAnswerVisibility(state, question) !== "share") continue;

    answers[question.id] = state.answers[question.id];
    visibilityByQuestion[question.id] = "share";
  }

  return {
    ...state,
    answers,
    visibilityByQuestion,
  };
}

export function getVisibilityCounts(state: ManualState) {
  const config = PROTOCOL_MANIFEST[state.mode];
  let answeredCount = 0;
  let shareableCount = 0;
  let privateCount = 0;

  for (const question of config.questions) {
    if (!(question.id in state.answers)) continue;

    answeredCount += 1;
    const visibility = getAnswerVisibility(state, question);
    if (visibility === "share") shareableCount += 1;
    if (visibility === "private") privateCount += 1;
  }

  return {
    answeredCount,
    shareableCount,
    privateCount,
    hasPrivateItems: privateCount > 0,
  };
}
