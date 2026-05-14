import assert from "node:assert/strict";
import test from "node:test";
import { composeManual } from "./manualComposer.ts";
import { PROTOCOL_MANIFEST } from "./protocolManifest.ts";
import { decodeState, generateSharedUrl, writeStateToHash } from "./stateCompression.ts";
import type { ArtifactFormat, ManualState, ModeId } from "./schemaTypes.ts";

const privateAnswer = "please do not share this";
const omittedAnswer = "leave this out entirely";

function makeState(): ManualState {
  return {
    mode: "me",
    storageMode: "url",
    updatedAt: "2026-05-13T00:00:00.000Z",
    answers: {
      M_01: "Alex",
      M_03: "I need direct context.",
      M_07: privateAnswer,
      M_10: omittedAnswer,
    },
    visibilityByQuestion: {
      M_01: "share",
      M_03: "share",
      M_07: "private",
      M_10: "hide",
    },
  };
}

function installWindowStub() {
  let href = "https://ankahe.test/manual/me";

  globalThis.window = {
    location: {
      origin: "https://ankahe.test",
      pathname: "/manual/me",
      get href() {
        return href;
      },
      set href(nextHref: string) {
        href = nextHref;
      },
      hash: "",
    },
    history: {
      replaceState: (_state: unknown, _title: string, url: string) => {
        href = `https://ankahe.test/manual/me${url}`;
        window.location.hash = url.startsWith("#") ? url : "";
      },
    },
  } as Window & typeof globalThis;
}

function decodeHashFromUrl(url: string): ManualState {
  const encoded = url.split("#s=")[1];
  assert.ok(encoded, "expected URL to contain encoded state");
  const decoded = decodeState(encoded);
  assert.ok(decoded, "expected encoded state to decode");
  return decoded;
}

test("share URL contains only included answers and included visibility metadata", () => {
  installWindowStub();

  const sharedUrl = generateSharedUrl(makeState());
  const sharedState = decodeHashFromUrl(sharedUrl);

  assert.deepEqual(sharedState.answers, {
    M_01: "Alex",
    M_03: "I need direct context.",
  });
  assert.deepEqual(sharedState.visibilityByQuestion, {
    M_01: "share",
    M_03: "share",
  });
  assert.equal(JSON.stringify(sharedState).includes(privateAnswer), false);
  assert.equal(JSON.stringify(sharedState).includes(omittedAnswer), false);
});

test("URL storage writes the same share-safe payload as share links", () => {
  installWindowStub();

  writeStateToHash(makeState());
  const urlState = decodeHashFromUrl(window.location.href);

  assert.deepEqual(urlState.answers, {
    M_01: "Alex",
    M_03: "I need direct context.",
  });
  assert.deepEqual(urlState.visibilityByQuestion, {
    M_01: "share",
    M_03: "share",
  });
});

test("included manual view omits private and hidden answers", () => {
  const manual = composeManual(makeState(), { viewMode: "included" });
  const manualText = JSON.stringify(manual);

  assert.equal(manualText.includes("Alex"), true);
  assert.equal(manualText.includes(privateAnswer), false);
  assert.equal(manualText.includes(omittedAnswer), false);
});

test("private manual view includes private answers and still omits hidden answers", () => {
  const manual = composeManual(makeState(), { viewMode: "private" });
  const manualText = JSON.stringify(manual);

  assert.equal(manualText.includes(privateAnswer.toLowerCase()), true);
  assert.equal(manualText.includes(omittedAnswer), false);
});

test("all manual modes have protocol manifests", () => {
  const modes: ModeId[] = ["me", "work", "talk", "us"];

  for (const mode of modes) {
    assert.ok(PROTOCOL_MANIFEST[mode], `expected ${mode} manifest`);
    assert.ok(PROTOCOL_MANIFEST[mode].questions.length > 0, `expected ${mode} questions`);
  }
});

test("share URL preserves safe onboarding and artifact preferences but strips private notes", () => {
  installWindowStub();

  const state = makeState();
  state.onboarding = {
    recipient: "partner",
    misunderstanding: "how I handle conflict",
    depth: "manual",
  };
  state.answerNotes = {
    M_01: "They can see this note.",
    M_07: "They must not see this private note.",
  };
  state.artifactFormat = "conversation";
  state.tone = "warmer";

  const sharedState = decodeHashFromUrl(generateSharedUrl(state));

  assert.deepEqual(sharedState.onboarding, state.onboarding);
  assert.equal(sharedState.artifactFormat, "conversation");
  assert.equal(sharedState.tone, "warmer");
  assert.deepEqual(sharedState.answerNotes, {
    M_01: "They can see this note.",
  });
  assert.equal(JSON.stringify(sharedState).includes("private note"), false);
});

test("composer creates recognition summaries and handles directness with time to process", () => {
  const state: ManualState = {
    mode: "talk",
    storageMode: "memory",
    updatedAt: "2026-05-13T00:00:00.000Z",
    onboarding: {
      recipient: "someone I need to talk to",
      misunderstanding: "how I handle conflict",
      depth: "manual",
    },
    answers: {
      T_01: "direct conversation",
      T_02: "time to think",
      T_03: "urgency",
    },
    visibilityByQuestion: {
      T_01: "share",
      T_02: "share",
      T_03: "share",
    },
  };

  const manual = composeManual(state, { viewMode: "included" });
  const manualText = JSON.stringify(manual);

  assert.equal(manual.recognitionSummaries.length > 0, true);
  assert.match(manualText, /direct/i);
  assert.match(manualText, /time/i);
  assert.match(manualText, /pause/i);
});

test("composer applies artifact formats and tone variants", () => {
  const state = makeState();
  state.artifactFormat = "note";
  state.tone = "professional";

  const manual = composeManual(state, { viewMode: "included" });

  assert.equal(manual.artifactFormat, "note");
  assert.equal(manual.tone, "professional");
  assert.match(manual.recipientNote, /context/i);
  assert.ok(manual.sections.length <= 3);
  assert.equal(manual.sections.some((section) => section.details.some((detail) => /I value clarity/i.test(detail))), true);
});

test("each artifact format keeps private and hidden answers out of included view", () => {
  const formats: ArtifactFormat[] = ["full", "onePage", "conversation", "work", "private"];

  for (const artifactFormat of formats) {
    const state = makeState();
    state.artifactFormat = artifactFormat;
    const manual = composeManual(state, { viewMode: "included" });
    const manualText = JSON.stringify(manual);

    assert.equal(manualText.includes(privateAnswer), false, `${artifactFormat} leaked private answer`);
    assert.equal(manualText.includes(omittedAnswer), false, `${artifactFormat} leaked hidden answer`);
  }
});
