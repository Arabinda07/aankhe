import assert from "node:assert/strict";
import test from "node:test";
import { shouldShowHashRestoreError } from "../hooks/useManualState.ts";
import { createDefaultManualState } from "./manualWorkspace.ts";

test("manual state flags corrupted saved-link hashes without restored state", () => {
  assert.equal(shouldShowHashRestoreError("#s=not-valid-state", null), true);
  assert.equal(shouldShowHashRestoreError("#s=", null), true);
  assert.equal(shouldShowHashRestoreError("", null), false);
  assert.equal(shouldShowHashRestoreError("#section", null), false);
  assert.equal(shouldShowHashRestoreError("#s=valid-state", createDefaultManualState("me", "url")), false);
});
