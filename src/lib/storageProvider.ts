/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ManualState, StorageMode } from "./schemaTypes";
import { readStateFromHash, writeStateToHash, clearStateFromHash } from "./stateCompression";

export interface StorageProvider {
  /** Restore state from storage, or null if empty/invalid. */
  load(): ManualState | null;
  
  /** Debounced save. Implementation handles the debounce. */
  save(state: ManualState): void;
  
  /** Clear storage synchronously. */
  clear(): void;
}

const HASH_SYNC_DEBOUNCE_MS = 400;

class UrlHashStorageProvider implements StorageProvider {
  private timer: ReturnType<typeof setTimeout> | undefined;

  constructor(private onCorrupt?: () => void) {}

  load(): ManualState | null {
    const hash = window.location.hash;
    if (!hash.startsWith("#s=")) return null;

    const saved = readStateFromHash();
    if (!saved && this.onCorrupt) {
      this.onCorrupt();
    }
    return saved;
  }

  save(state: ManualState): void {
    if (this.timer) clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      writeStateToHash(state);
    }, HASH_SYNC_DEBOUNCE_MS);
  }

  clear(): void {
    if (this.timer) clearTimeout(this.timer);
    clearStateFromHash();
  }
}

class MemoryStorageProvider implements StorageProvider {
  load(): ManualState | null {
    return null;
  }

  save(_state: ManualState): void {
    // Memory mode explicitly does not persist across reloads
  }

  clear(): void {
    // No-op
  }
}

export function createStorageProvider(
  mode: StorageMode,
  onCorrupt?: () => void
): StorageProvider {
  if (mode === "url") {
    return new UrlHashStorageProvider(onCorrupt);
  }
  return new MemoryStorageProvider();
}
