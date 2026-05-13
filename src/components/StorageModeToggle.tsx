/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { StorageMode } from "../lib/schemaTypes";
import { cn } from "../lib/utils";
import { Database, Link } from "lucide-react";

interface StorageModeToggleProps {
  value: StorageMode;
  onChange: (mode: StorageMode) => void;
}

export function StorageModeToggle({ value, onChange }: StorageModeToggleProps) {
  return (
    <div className="flex p-1 bg-ankahe-surface-soft rounded-sm w-fit border border-ankahe-border">
      <button
        onClick={() => onChange("memory")}
        aria-pressed={value === "memory"}
        className={cn(
          "type-ui-label min-h-11 flex items-center gap-2 px-4 py-2 rounded-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ankahe-accent focus-visible:ring-offset-2",
          value === "memory" 
            ? "bg-ankahe-surface text-ankahe-text shadow-sm" 
            : "text-ankahe-muted hover:text-ankahe-text"
        )}
      >
        <Database size={16} />
        Memory Only
      </button>
      <button
        onClick={() => onChange("url")}
        aria-pressed={value === "url"}
        className={cn(
          "type-ui-label min-h-11 flex items-center gap-2 px-4 py-2 rounded-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ankahe-accent focus-visible:ring-offset-2",
          value === "url" 
            ? "bg-ankahe-surface text-ankahe-text shadow-sm" 
            : "text-ankahe-muted hover:text-ankahe-text"
        )}
      >
        <Link size={16} />
        Save in Link
      </button>
    </div>
  );
}
