import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const siteHeader = readFileSync(new URL("../components/SiteHeader.tsx", import.meta.url), "utf8");
const mobileHeaderMenu = readFileSync(new URL("../components/MobileHeaderMenu.tsx", import.meta.url), "utf8");
const switchboard = readFileSync(new URL("../components/Switchboard.tsx", import.meta.url), "utf8");
const infoPages = readFileSync(new URL("../components/InfoPages.tsx", import.meta.url), "utf8");
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

test("landing restores story-led hero copy while keeping intro CTA language", () => {
  assert.match(switchboard, /Curate Your Life Story/);
  assert.match(
    switchboard,
    /Explaining yourself to new people gets old\. Write down your story, keep the private parts to yourself, then share the sealed copy\./,
  );
  assert.match(switchboard, /Create your intro/);
  assert.match(switchboard, /See how it works/);
});

test("how it works page explains Parichay with concrete trust copy", () => {
  assert.match(infoPages, /A clearer way to introduce yourself\./);
  assert.match(infoPages, /What is Parichay\?/);
  assert.match(infoPages, /Parichay is a personal onboarding page\./);
  assert.match(infoPages, /It helps people understand how to work with you, talk to you, or support you\./);
  assert.match(infoPages, /Use Parichay when/);
  assert.match(infoPages, /Example finished intro/);
  assert.match(infoPages, /Is this a personality test\?/);
  assert.match(infoPages, /Is this therapy\?/);
  assert.match(infoPages, /Privacy in plain language/);
  assert.match(infoPages, /No accounts\. No database\. Your answers stay in this browser unless you create a link or export\./);
  assert.match(infoPages, /Only answers marked Share are included in links and exports\./);
  assert.match(infoPages, /Share \/ Private \/ Hide/);
  assert.match(infoPages, /Modes and templates/);
  assert.match(infoPages, /Common questions/);
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
