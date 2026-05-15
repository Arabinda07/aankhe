import assert from "node:assert/strict";
import test from "node:test";
import {
  HOW_IT_WORKS_PATH,
  MANUAL_PATHS,
  PRIVACY_PATH,
  hasSharedStateHash,
  manualModePath,
  shouldBootReactImmediately,
} from "./routes";

test("shared state hashes require immediate React boot", () => {
  assert.equal(hasSharedStateHash("#s=abc"), true);
  assert.equal(hasSharedStateHash("#mode=me&s=abc"), true);
  assert.equal(hasSharedStateHash("#private"), false);
});

test("static home waits for interaction unless it has shared state", () => {
  assert.equal(shouldBootReactImmediately({ pathname: "/", hash: "" }), false);
  assert.equal(shouldBootReactImmediately({ pathname: "/", hash: "#s=abc" }), true);
});

test("app routes boot React immediately", () => {
  assert.equal(shouldBootReactImmediately({ pathname: PRIVACY_PATH, hash: "" }), true);
  assert.equal(shouldBootReactImmediately({ pathname: HOW_IT_WORKS_PATH, hash: "" }), true);
  assert.equal(shouldBootReactImmediately({ pathname: MANUAL_PATHS.me, hash: "" }), true);
});

test("manual mode paths stay centralized", () => {
  assert.equal(manualModePath("work"), MANUAL_PATHS.work);
});
