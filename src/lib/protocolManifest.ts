/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Protocol Manifest — public interface for the question bank.
 *
 * This module re-exports the assembled PROTOCOL_MANIFEST and provides
 * accessor functions for question options and mode configuration.
 *
 * Question data lives in `questionBank/<mode>Mode.ts` files for locality.
 * Shared option arrays live in `questionBank/sharedOptions.ts`.
 */

import { ManualDepth, ModeConfig, ModeId, Question, QuestionOption } from "./schemaTypes";
import { ME_MODE } from "./questionBank/meMode";
import { WORK_MODE } from "./questionBank/workMode";
import { TALK_MODE } from "./questionBank/talkMode";
import { US_MODE } from "./questionBank/usMode";

// ── Option accessors ───────────────────────────────────────────────

export function getOptionValue(item: string | QuestionOption): string {
  return typeof item === "string" ? item : item.value;
}

export function getOptionLabel(item: string | QuestionOption): string {
  return typeof item === "string" ? item : item.label;
}

export function getOptionManualMeaning(item: string | QuestionOption): string {
  if (typeof item === "string") return item;
  return item.manualMeaning || item.label;
}

export function findQuestionOption(question: Question, value: string): string | QuestionOption | undefined {
  return question.options?.find((item) => getOptionValue(item) === value || getOptionLabel(item) === value);
}

// ── Mode configuration ─────────────────────────────────────────────

export function getModeConfigForDepth(mode: ModeId, depth: ManualDepth = "manual"): ModeConfig {
  const config = PROTOCOL_MANIFEST[mode];
  const questions = selectQuestionsForDepth(config.questions, depth);
  const activeSectionIds = new Set(questions.map((question) => question.sectionId));

  return {
    ...config,
    sections: config.sections.filter((section) => activeSectionIds.has(section.id)),
    questions,
  };
}

function selectQuestionsForDepth(questions: Question[], depth: ManualDepth): Question[] {
  if (depth === "deep") return questions;

  const mvpQuestions = questions.filter((question) => question.depth === "mvp");
  if (depth === "manual") return mvpQuestions;

  return [...mvpQuestions]
    .sort((a, b) => (a.priority ?? Number.POSITIVE_INFINITY) - (b.priority ?? Number.POSITIVE_INFINITY))
    .slice(0, 5);
}

// ── Assembled manifest ─────────────────────────────────────────────

export const PROTOCOL_MANIFEST: Record<ModeId, ModeConfig> = {
  me: ME_MODE,
  work: WORK_MODE,
  talk: TALK_MODE,
  us: US_MODE,
};
