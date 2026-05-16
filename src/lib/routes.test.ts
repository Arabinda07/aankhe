import assert from "node:assert/strict";
import test from "node:test";
import {
  MANUAL_PATHS,
  manualModePath,
} from "./routes";

test("manual mode paths stay centralized", () => {
  assert.equal(manualModePath("work"), MANUAL_PATHS.work);
});
