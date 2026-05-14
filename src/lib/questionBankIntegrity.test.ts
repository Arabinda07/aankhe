import assert from "node:assert/strict";
import test from "node:test";
import {
  getModeConfigForDepth,
  getOptionLabel,
  getOptionManualMeaning,
  getOptionValue,
  PROTOCOL_MANIFEST,
} from "./protocolManifest.ts";
import type { ManualDepth, ModeId, Question } from "./schemaTypes.ts";

const modes: ModeId[] = ["me", "work", "talk", "us"];

test("manual depth controls the active question count for every mode", () => {
  const expectedCounts: Record<ManualDepth, number> = {
    note: 5,
    manual: 12,
    deep: 36,
  };

  for (const mode of modes) {
    for (const depth of Object.keys(expectedCounts) as ManualDepth[]) {
      const config = getModeConfigForDepth(mode, depth);

      assert.equal(
        config.questions.length,
        expectedCounts[depth],
        `${mode} ${depth} should expose ${expectedCounts[depth]} questions`
      );
    }
  }
});

test("every full manifest contains 12 mvp questions and 24 deep questions", () => {
  for (const mode of modes) {
    const questions = PROTOCOL_MANIFEST[mode].questions;

    assert.equal(questions.filter((question) => question.depth === "mvp").length, 12, `${mode} mvp count`);
    assert.equal(questions.filter((question) => question.depth === "deep").length, 24, `${mode} deep count`);
  }
});

test("question ids are unique and section references are valid", () => {
  const seen = new Set<string>();

  for (const mode of modes) {
    const config = PROTOCOL_MANIFEST[mode];
    const sectionIds = new Set(config.sections.map((section) => section.id));

    for (const question of config.questions) {
      assert.equal(seen.has(question.id), false, `${question.id} should be unique`);
      assert.equal(sectionIds.has(question.sectionId), true, `${question.id} should reference a valid section`);
      seen.add(question.id);
    }
  }
});

test("structured options expose stable values, labels, and optional manual meanings", () => {
  const question = findQuestion("W_M_02");
  assert.ok(question.options?.length, "expected W_M_02 to have options");
  const firstOption = question.options[0];

  assert.equal(getOptionValue(firstOption), "direct_private");
  assert.match(getOptionLabel(firstOption), /directly/i);
  assert.match(getOptionManualMeaning(firstOption), /direct/i);
});

test("question bank avoids rejected or risky claim language", () => {
  const bannedPatterns = [
    /\bmbti\b/i,
    /\bmyers[- ]briggs\b/i,
    /\blove language/i,
    /\bdiagnos/i,
    /\btherapy\b/i,
    /\btrauma response\b/i,
    /\bfawning\b/i,
    /\bdopamine\b/i,
    /\blearning styles?\b/i,
    /\battachment (style|type)\b/i,
    /\bpersonality (type|trait)\b/i,
    /\bwhy do you\b/i,
  ];

  for (const mode of modes) {
    for (const question of PROTOCOL_MANIFEST[mode].questions) {
      const searchableText = [
        question.label,
        question.helperText,
        question.dimension,
        question.manualTemplate,
        ...(question.options || []).map((option) => `${getOptionLabel(option)} ${getOptionManualMeaning(option)}`),
      ].join(" ");

      for (const pattern of bannedPatterns) {
        assert.equal(pattern.test(searchableText), false, `${question.id} contains risky wording matching ${pattern}`);
      }
    }
  }
});

function findQuestion(questionId: string): Question {
  for (const mode of modes) {
    const question = PROTOCOL_MANIFEST[mode].questions.find((item) => item.id === questionId);
    if (question) return question;
  }

  throw new Error(`Question ${questionId} was not found`);
}
