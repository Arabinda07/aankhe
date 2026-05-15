import assert from "node:assert/strict";
import { test } from "node:test";
import { createPreloadOnce } from "./preloadOnce";

test("createPreloadOnce reuses the same in-flight load", async () => {
  let calls = 0;
  const preload = createPreloadOnce(async () => {
    calls += 1;
    return { loaded: true };
  });

  const first = preload();
  const second = preload();

  assert.equal(first, second);
  assert.deepEqual(await first, { loaded: true });
  assert.equal(calls, 1);
});
