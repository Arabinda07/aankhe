/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import LZString from "lz-string";
import { ManualState } from "./schemaTypes";
import { createShareSafeState } from "./visibilityPolicy";

export function encodeState(state: ManualState): string {
  try {
    const json = JSON.stringify(state);
    return LZString.compressToEncodedURIComponent(json);
  } catch (e) {
    console.error("Failed to encode state:", e);
    return "";
  }
}

export function decodeState(encoded: string): ManualState | null {
  try {
    const decompressed = LZString.decompressFromEncodedURIComponent(encoded);
    if (!decompressed) return null;
    return JSON.parse(decompressed) as ManualState;
  } catch (e) {
    console.error("Failed to decode state:", e);
    return null;
  }
}

export function readStateFromHash(): ManualState | null {
  const hash = window.location.hash;
  if (!hash.startsWith("#s=")) return null;
  const encoded = hash.substring(3);
  return decodeState(encoded);
}

export function writeStateToHash(state: ManualState) {
  const encoded = encodeState(createShareSafeState(state));
  if (encoded) {
    const newHash = `#s=${encoded}`;
    // Replace state to avoid clogging history during every answer
    window.history.replaceState(null, "", newHash);
  }
}

export function clearStateFromHash() {
  window.history.replaceState(null, "", window.location.pathname);
}

export function generateSharedUrl(state: ManualState): string {
  const encoded = encodeState(createShareSafeState(state));
  return window.location.origin + window.location.pathname + `#s=${encoded}`;
}
