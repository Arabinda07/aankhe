/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Hash persistence module.
 *
 * Responsibilities:
 *   1. One-time: restore ManualState from `#s=<compressed>` on mount.
 *   2. Ongoing: debounced sync of state → hash when storage mode is "url".
 *   3. Clear hash when storage mode switches to "memory".
 *   4. Surface hash-decode errors so the UI can show a recovery prompt.
 *
 * This module owns ALL `window.location.hash` interaction for manual state.
 * No other module should call writeStateToHash / clearStateFromHash directly.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import type { ManualState } from "../lib/schemaTypes";
import {
  readStateFromHash,
  writeStateToHash,
  clearStateFromHash,
} from "../lib/stateCompression";

const HASH_SYNC_DEBOUNCE_MS = 400;

export interface HashPersistence {
  /** State restored from the URL hash on mount, or null if none was found. */
  restoredState: ManualState | null;
  /** True when hash contained data but decoding failed (corrupted link). */
  hashError: boolean;
  /** Dismiss the hash error and clear the hash fragment. */
  clearHashError: () => void;
}

/**
 * Manages the full lifecycle of state ↔ hash synchronization.
 *
 * @param state   Current manual state (read-only — this hook never calls setState).
 * @param isReady Set to true after the caller has finished initial hydration
 *                so the hook doesn't overwrite the hash before the first read.
 */
export function useHashPersistence(
  state: ManualState,
  isReady: boolean
): HashPersistence {
  const [restoredState, setRestoredState] = useState<ManualState | null>(null);
  const [hashError, setHashError] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  // ── One-time: read from hash on mount ────────────────────────────
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash.startsWith("#s=")) return;

    const saved = readStateFromHash();
    if (saved) {
      setRestoredState(saved);
    } else {
      setHashError(true);
    }
  }, []);

  // ── Ongoing: debounced write to hash ─────────────────────────────
  useEffect(() => {
    if (!isReady) return;

    if (state.storageMode === "url") {
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        writeStateToHash(state);
      }, HASH_SYNC_DEBOUNCE_MS);
    } else {
      clearTimeout(timerRef.current);
      clearStateFromHash();
    }

    return () => clearTimeout(timerRef.current);
  }, [state, isReady]);

  const clearHashError = useCallback(() => {
    setHashError(false);
    clearStateFromHash();
  }, []);

  return { restoredState, hashError, clearHashError };
}
