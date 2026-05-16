import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const html = readFileSync(new URL("../../index.html", import.meta.url), "utf8");

test("document starts with a normal React root and no duplicate landing shell", () => {
  const rootMatch = html.match(/<div id="root"(?<attributes>[^>]*)>\s*<\/div>/s);

  assert.ok(rootMatch, "#root should start empty for React");
  assert.doesNotMatch(rootMatch.groups?.attributes ?? "", /\baria-hidden=/);
  assert.doesNotMatch(rootMatch.groups?.attributes ?? "", /\binert\b/);
  assert.ok(!html.includes('id="initial-shell"'), "#initial-shell should not duplicate the React landing");
  assert.ok(!html.includes("use-initial-shell"), "home should not use delayed static shell classes");
  assert.ok(!html.includes("skip-initial-shell"), "non-home routes should not need static shell classes");
});
