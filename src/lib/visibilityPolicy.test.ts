import assert from "node:assert/strict";
import test from "node:test";
import { composeManual } from "./manualComposer.ts";
import { decodeState, generateSharedUrl, writeStateToHash } from "./stateCompression.ts";
import type { ManualState } from "./schemaTypes.ts";

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
