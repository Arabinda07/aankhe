import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const html = readFileSync(new URL("../../index.html", import.meta.url), "utf8");

test("initial shell renders beside the React root", () => {
  const rootMatch = html.match(/<div id="root"(?<attributes>[^>]*)>\s*<\/div>/s);

  assert.ok(rootMatch, "#root should start empty so React does not replace a painted shell");
  assert.match(rootMatch.groups?.attributes ?? "", /\baria-hidden="true"/);
  assert.match(rootMatch.groups?.attributes ?? "", /\binert\b/);
  assert.ok(!rootMatch[0].includes('id="initial-shell"'));

  const rootIndex = html.indexOf('id="root"');
  const shellIndex = html.indexOf('id="initial-shell"');

  assert.ok(shellIndex > -1, "#initial-shell should still exist as the performance shell");
  assert.ok(rootIndex > -1 && rootIndex < shellIndex, "#root should appear before the shell so real app anchors win after paint");
});
