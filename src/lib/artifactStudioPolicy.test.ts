import assert from "node:assert/strict";
import test from "node:test";
import {
  ARTIFACT_FORMAT_OPTIONS,
  ARTIFACT_TONE_OPTIONS,
  createArtifactStudioPolicy,
  getArtifactPreviewDescription,
  getViewModeForArtifactFormat,
  toggleExcludedSection,
} from "./artifactStudioPolicy.ts";
import { createDefaultManualState, createManualWorkspace, type ManualWorkspaceActions } from "./manualWorkspace.ts";
import type { ComposedManual, ManualState } from "./schemaTypes.ts";

const noopActions: ManualWorkspaceActions = {
  activate: () => {},
  updateAnswer: () => {},
  clearAnswer: () => {},
  updateAnswerNote: () => {},
  updateVisibility: () => {},
  updateArtifactFormat: () => {},
  updateTone: () => {},
  setStorageMode: () => {},
};

function installWindowStub() {
  globalThis.window = {
    location: {
      origin: "https://ankahe.test",
      pathname: "/manual/me",
      hash: "",
    },
    history: {
      replaceState: () => {},
    },
  } as unknown as Window & typeof globalThis;
}

test("artifact studio policy composes the selected preview and share URL", () => {
  installWindowStub();
  const state: ManualState = {
    ...createDefaultManualState("me", "url"),
    answers: { M_M_10: "write_first" },
    visibilityByQuestion: { M_M_10: "share" },
  };
  const workspace = createManualWorkspace(state, "me", noopActions);

  assert.ok(workspace);

  const policy = createArtifactStudioPolicy(workspace, {
    viewMode: "included",
    excludedSections: [],
  });

  assert.equal((policy.manual as ComposedManual).mode, "me");
  assert.match(policy.sharedUrl, /^https:\/\/ankahe\.test\/manual\/me#s=/);
  assert.equal(policy.previewDescription, getArtifactPreviewDescription("included"));
  assert.equal(policy.showSafeToSendNote, true);
  assert.equal(policy.isSectionExcluded("communication"), false);
});

test("artifact studio policy keeps option vocabularies out of the controls", () => {
  assert.deepEqual(ARTIFACT_FORMAT_OPTIONS.map((option) => option.id), [
    "full",
    "onePage",
    "note",
    "conversation",
    "work",
    "private",
  ]);
  assert.deepEqual(ARTIFACT_TONE_OPTIONS.map((option) => option.id), [
    "default",
    "softer",
    "direct",
    "warmer",
    "professional",
    "shorter",
  ]);
});

test("artifact studio policy owns section toggles and private-format view mode", () => {
  assert.deepEqual(toggleExcludedSection([], "needs"), ["needs"]);
  assert.deepEqual(toggleExcludedSection(["needs", "pace"], "needs"), ["pace"]);
  assert.equal(getViewModeForArtifactFormat("private", "included"), "private");
  assert.equal(getViewModeForArtifactFormat("full", "included"), "included");
  assert.equal(getArtifactPreviewDescription("private"), "Previewing your local private copy. Image and PDF exports include this view.");
});
