/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Info, ShieldCheck } from "@phosphor-icons/react";
import { StorageMode } from "../lib/schemaTypes";
import { getCurrentURLSize } from "../lib/urlSize";

interface PrivacyMeterProps {
  storageMode: StorageMode;
  answeredCount: number;
}

export function PrivacyMeter({ storageMode, answeredCount }: PrivacyMeterProps) {
  const { length, category } = getCurrentURLSize();
  const urlStatus = {
    safe: { label: "Link Ready", color: "text-ankahe-accent" },
    long: { label: "Getting Long", color: "text-ankahe-danger" },
    excessive: { label: "Too Large", color: "text-ankahe-danger" }
  };

  return (
    <div className="bg-ankahe-surface rounded-sm border border-ankahe-border p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="type-panel-title text-ankahe-text flex items-center gap-2">
          <ShieldCheck size={18} className="text-ankahe-muted" />
          Privacy Meter
        </h3>
        <span className="type-caption rounded-sm bg-ankahe-private-soft px-2 py-0.5 text-ankahe-private">Local</span>
      </div>

      <div className="space-y-3">
        <div className="type-caption flex justify-between items-center">
          <span className="text-ankahe-muted">Answer storage</span>
          <span className="font-semibold text-ankahe-text">
            {storageMode === "url" ? "Save in link" : "Memory only"}
          </span>
        </div>
        
        <div className="type-caption flex justify-between items-center">
          <span className="text-ankahe-muted">Account / Database</span>
          <span className="font-semibold text-ankahe-text">None</span>
        </div>

        <div className="type-caption flex justify-between items-center">
          <span className="text-ankahe-muted">Visibility</span>
          <span className="font-semibold text-ankahe-text type-tabular">
            {answeredCount} Answered
          </span>
        </div>

        {storageMode === "url" && (
          <div className="type-caption flex justify-between items-center border-t border-ankahe-border pt-3">
            <span className="text-ankahe-muted">URL Integrity</span>
            <span className={urlStatus[category].color + " font-semibold type-tabular"}>
              {urlStatus[category].label} ({length} ch)
            </span>
          </div>
        )}
      </div>

      <div className="type-caption p-3 bg-ankahe-control-selected rounded-sm border border-ankahe-border flex gap-3 text-ankahe-text">
        <Info size={16} className="shrink-0 text-ankahe-muted" />
        <p>
          Nothing is saved automatically. Keep your link, QR, image, or PDF before leaving.
        </p>
      </div>
    </div>
  );
}
