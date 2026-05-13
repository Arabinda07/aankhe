/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Shield, Info } from "lucide-react";
import { ManualState } from "../lib/schemaTypes";
import { getCurrentURLSize } from "../lib/urlSize";

interface PrivacyMeterProps {
  state: ManualState;
  compact?: boolean;
}

export function PrivacyMeter({ state, compact }: PrivacyMeterProps) {
  const { length, category } = getCurrentURLSize();
  const urlStatus = {
    safe: { label: "QR-Safe", color: "text-ankahe-success" },
    long: { label: "Getting Long", color: "text-ankahe-warning" },
    excessive: { label: "Too Large", color: "text-ankahe-danger" }
  };

  if (compact) {
    return (
      <div className="type-meta flex items-center gap-4 text-ankahe-muted">
        <div className="flex items-center gap-1.5">
          <Shield size={14} className="text-ankahe-success" />
          No Account / No Database
        </div>
        <div className="w-1 h-1 bg-ankahe-border rounded-full" />
        <div>{state.storageMode === "url" ? "Save in link" : "Memory only"}</div>
      </div>
    );
  }

  return (
    <div className="bg-ankahe-surface rounded-sm border border-ankahe-border p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="type-panel-title text-ankahe-text flex items-center gap-2">
          <Shield size={18} className="text-ankahe-success" />
          Privacy Meter
        </h3>
        <span className="type-caption bg-ankahe-success-soft text-ankahe-success px-2 py-0.5 rounded-sm">Safe</span>
      </div>

      <div className="space-y-3">
        <div className="type-caption flex justify-between items-center">
          <span className="text-ankahe-muted">Answer storage</span>
          <span className="font-semibold text-ankahe-text">
            {state.storageMode === "url" ? "Save in link" : "Memory only"}
          </span>
        </div>
        
        <div className="type-caption flex justify-between items-center">
          <span className="text-ankahe-muted">Account / Database</span>
          <span className="font-semibold text-ankahe-text">None</span>
        </div>

        <div className="type-caption flex justify-between items-center">
          <span className="text-ankahe-muted">Visibility</span>
          <span className="font-semibold text-ankahe-text type-tabular">
            {Object.keys(state.answers).length} Answered
          </span>
        </div>

        {state.storageMode === "url" && (
          <div className="type-caption flex justify-between items-center border-t border-ankahe-border pt-3">
            <span className="text-ankahe-muted">URL Integrity</span>
            <span className={urlStatus[category].color + " font-semibold type-tabular"}>
              {urlStatus[category].label} ({length} ch)
            </span>
          </div>
        )}
      </div>

      <div className="type-caption p-3 bg-ankahe-surface-soft rounded-sm border border-ankahe-border flex gap-3 text-ankahe-text">
        <Info size={16} className="shrink-0 text-ankahe-accent" />
        <p>
          Nothing is saved automatically. Keep your link, QR, image, or PDF before leaving.
        </p>
      </div>
    </div>
  );
}
