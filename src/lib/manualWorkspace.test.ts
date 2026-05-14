import assert from "node:assert/strict";
import test from "node:test";
import {
  createDefaultManualState,
  createManualWorkspace,
  defaultArtifactFormat,
  isSupportedManualMode,
  type ManualWorkspaceActions,
} from "./manualWorkspace.ts";
import type { ManualState, ModeId } from "./schemaTypes.ts";

function createNoopActions(onActivate: (mode: ModeId) => void = () => {}): ManualWorkspaceActions {
  return {
    activate: onActivate,
    updateAnswer: () => {},
    clearAnswer: () => {},
    updateAnswerNote: () => {},
    updateVisibility: () => {},
    updateArtifactFormat: () => {},
    updateTone: () => {},
    setStorageMode: () => {},
  };
}

test("manual workspace rejects unsupported route modes", () => {
  const state = createDefaultManualState("me");

  assert.equal(createManualWorkspace(state, "missing", createNoopActions()), null);
  assert.equal(isSupportedManualMode("work"), true);
  assert.equal(isSupportedManualMode("missing"), false);
});

test("manual workspace uses a route-local default before activation", () => {
  const state: ManualState = {
    ...createDefaultManualState("me"),
    answers: { M_M_10: "write_first" },
    visibilityByQuestion: { M_M_10: "share" },
  };
  let activatedMode: ModeId | undefined;

  const workspace = createManualWorkspace(state, "work", createNoopActions((mode) => {
    activatedMode = mode;
  }));

  assert.ok(workspace);
  assert.equal(workspace.mode, "work");
  assert.equal(workspace.storageMode, "memory");
  assert.equal(workspace.getAnswer("M_M_10"), undefined);

  workspace.activate();

  assert.equal(activatedMode, "work");
});

test("manual workspace exposes answer notes and visibility through one interface", () => {
  const state: ManualState = {
    ...createDefaultManualState("me"),
    answers: { M_M_10: "write_first" },
    answerNotes: { M_M_10: "They can see this note." },
    visibilityByQuestion: { M_M_10: "share" },
  };

  const workspace = createManualWorkspace(state, "me", createNoopActions());
  const question = workspace?.config.questions.find((item) => item.id === "M_M_10");

  assert.ok(workspace);
  assert.ok(question);
  assert.equal(workspace.getAnswer("M_M_10"), "write_first");
  assert.equal(workspace.getAnswerNote("M_M_10"), "They can see this note.");
  assert.equal(workspace.getVisibility(question), "share");
  assert.equal(workspace.visibilityCounts.shareableCount, 1);
});

test("manual workspace chooses default artifact formats from onboarding context", () => {
  assert.equal(defaultArtifactFormat(), "full");
  assert.equal(defaultArtifactFormat({ recipient: "a friend", misunderstanding: "", depth: "note" }), "note");
  assert.equal(defaultArtifactFormat({ recipient: "my manager", misunderstanding: "", depth: "manual" }), "work");
});
