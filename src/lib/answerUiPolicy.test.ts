import assert from "node:assert/strict";
import test from "node:test";
import {
  answerValueIsPresent,
  getAnswerComponentForQuestion,
  getSensitiveSkipAction,
  shouldUseDropdownForQuestion,
} from "./answerUiPolicy.ts";
import type { Question } from "./schemaTypes.ts";

function makeQuestion(overrides: Partial<Question> = {}): Question {
  return {
    id: "Q_01",
    mode: "me",
    sectionId: "section",
    label: "How do you prefer to answer?",
    type: "select",
    defaultVisibility: "share",
    ...overrides,
  };
}

test("short reflective single-select questions use radio cards instead of dropdowns", () => {
  const question = makeQuestion({
    type: "select",
    options: ["Write first", "Talk live", "Pause", "Ask a clearer question"],
  });

  assert.equal(shouldUseDropdownForQuestion(question), false);
  assert.equal(getAnswerComponentForQuestion(question), "radioCards");
});

test("long neutral single-select questions may use native dropdowns", () => {
  const question = makeQuestion({
    type: "select",
    answerIntent: "administrative",
    options: [
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
      "Ten",
      "Eleven",
    ],
  });

  assert.equal(shouldUseDropdownForQuestion(question), true);
  assert.equal(getAnswerComponentForQuestion(question), "nativeSelect");
});

test("sensitive questions stay inline even when they have many options", () => {
  const question = makeQuestion({
    type: "select",
    defaultVisibility: "private",
    options: ["One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"],
  });

  assert.equal(shouldUseDropdownForQuestion(question), false);
  assert.equal(getAnswerComponentForQuestion(question), "radioCards");
});

test("answer types map to the recommended component vocabulary", () => {
  assert.equal(getAnswerComponentForQuestion(makeQuestion({ type: "multiSelect" })), "multiSelectCards");
  assert.equal(getAnswerComponentForQuestion(makeQuestion({ type: "pairedChoice" })), "pairedChoice");
  assert.equal(getAnswerComponentForQuestion(makeQuestion({ type: "scale" })), "labeledScale");
  assert.equal(getAnswerComponentForQuestion(makeQuestion({ type: "rank" })), "rankedChoice");
  assert.equal(getAnswerComponentForQuestion(makeQuestion({ type: "text" })), "shortText");
  assert.equal(getAnswerComponentForQuestion(makeQuestion({ type: "textarea" })), "textarea");
  assert.equal(getAnswerComponentForQuestion(makeQuestion({ type: "yesNoMaybe" })), "segmentedTriState");
});

test("sensitive skip actions preserve privacy semantics without storing answer text", () => {
  assert.deepEqual(getSensitiveSkipAction("notReady"), {
    visibility: "private",
    shouldClearAnswer: true,
  });
  assert.deepEqual(getSensitiveSkipAction("doesNotFit"), {
    visibility: "hide",
    shouldClearAnswer: true,
  });
});

test("answer presence treats empty arrays and blank strings as unanswered", () => {
  assert.equal(answerValueIsPresent(undefined), false);
  assert.equal(answerValueIsPresent(""), false);
  assert.equal(answerValueIsPresent("   "), false);
  assert.equal(answerValueIsPresent([]), false);
  assert.equal(answerValueIsPresent(["quiet company"]), true);
  assert.equal(answerValueIsPresent(0), true);
});
