/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Question, Visibility } from "./schemaTypes";

export type AnswerComponent =
  | "radioCards"
  | "nativeSelect"
  | "multiSelectCards"
  | "pairedChoice"
  | "labeledScale"
  | "rankedChoice"
  | "shortText"
  | "textarea"
  | "segmentedTriState";

export interface SensitiveSkipAction {
  visibility: Visibility;
  shouldClearAnswer: boolean;
}

const DROPDOWN_OPTION_THRESHOLD = 8;

export function shouldUseDropdownForQuestion(question: Question): boolean {
  if (question.type !== "select") {
    return false;
  }

  if (question.defaultVisibility === "private") {
    return false;
  }

  return question.answerIntent === "administrative" && (question.options?.length ?? 0) > DROPDOWN_OPTION_THRESHOLD;
}

export function getAnswerComponentForQuestion(question: Question): AnswerComponent {
  if (question.type === "select") {
    return shouldUseDropdownForQuestion(question) ? "nativeSelect" : "radioCards";
  }

  const componentByType: Record<Exclude<Question["type"], "select">, AnswerComponent> = {
    multiSelect: "multiSelectCards",
    pairedChoice: "pairedChoice",
    scale: "labeledScale",
    rank: "rankedChoice",
    text: "shortText",
    textarea: "textarea",
    yesNoMaybe: "segmentedTriState",
  };

  return componentByType[question.type];
}

export function getSensitiveSkipAction(reason: "notReady" | "doesNotFit"): SensitiveSkipAction {
  return {
    visibility: reason === "notReady" ? "private" : "hide",
    shouldClearAnswer: true,
  };
}

export function answerValueIsPresent(value: unknown): boolean {
  if (value === undefined || value === null) {
    return false;
  }

  if (typeof value === "string") {
    return value.trim().length > 0;
  }

  if (Array.isArray(value)) {
    return value.length > 0;
  }

  return true;
}
