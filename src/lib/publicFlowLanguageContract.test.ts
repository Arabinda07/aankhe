import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const siteHeader = readFileSync(new URL("../components/SiteHeader.tsx", import.meta.url), "utf8");
const mobileHeaderMenu = readFileSync(new URL("../components/MobileHeaderMenu.tsx", import.meta.url), "utf8");
const questionController = readFileSync(new URL("../hooks/useQuestionController.ts", import.meta.url), "utf8");
const artifactStudio = readFileSync(new URL("../components/ArtifactStudio.tsx", import.meta.url), "utf8");

test("public header uses intro language and does not expose internal modes", () => {
  assert.match(siteHeader, />\s*How it works\s*</);
  assert.match(siteHeader, />\s*Privacy\s*</);
  assert.match(siteHeader, />\s*Create intro\s*</);
  assert.doesNotMatch(siteHeader, />\s*FAQ\s*</);
  assert.doesNotMatch(siteHeader, />\s*Me\s*</);
  assert.doesNotMatch(siteHeader, />\s*Work\s*</);
  assert.doesNotMatch(siteHeader, />\s*Talk\s*</);
  assert.doesNotMatch(siteHeader, />\s*Sync\s*</);
});

test("mobile menu keeps public navigation simple", () => {
  assert.match(mobileHeaderMenu, /label="How it works"/);
  assert.match(mobileHeaderMenu, /Create intro/);
  assert.doesNotMatch(mobileHeaderMenu, /MANUAL_MODES/);
  assert.doesNotMatch(mobileHeaderMenu, /Manual shortcuts/);
});

test("answer choices wait for an explicit continue action", () => {
  assert.doesNotMatch(questionController, /AUTO_ADVANCE_COMPONENTS/);
  assert.doesNotMatch(questionController, /setTimeout\(\(\) => next/);
});

test("artifact actions are kept out of the initial preview tab", () => {
  assert.match(artifactStudio, /defaultArtifactTab[^=]*=[^;]*"preview"/);
  assert.match(artifactStudio, /Send \/ Export/);
  assert.match(artifactStudio, /hasVisitedReview/);
  assert.match(artifactStudio, /ExportControls/);
  assert.match(artifactStudio, /ShareControls/);
});
