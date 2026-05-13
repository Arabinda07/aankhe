/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { DownloadSimple, Printer } from "@phosphor-icons/react";
import { SoftButton } from "../SoftButton";
import type { ManualViewMode } from "../../lib/visibilityPolicy";

interface ExportControlsProps {
  isExporting: boolean;
  viewMode: ManualViewMode;
  onExportImage: () => void;
  onPrint: () => void;
}

export function ExportControls({
  isExporting,
  viewMode,
  onExportImage,
  onPrint,
}: ExportControlsProps) {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      <SoftButton
        onClick={onExportImage}
        disabled={isExporting}
        className="gap-2 bg-ankahe-accent text-ankahe-on-accent border-none py-3"
      >
        <DownloadSimple size={18} />
        {isExporting ? "Exporting..." : viewMode === "private" ? "Save Private Image" : "Save Included Image"}
      </SoftButton>
      <SoftButton
        variant="secondary"
        onClick={onPrint}
        className="gap-2 bg-ankahe-surface text-ankahe-text py-3"
      >
        <Printer size={18} />
        {viewMode === "private" ? "Print Private Copy" : "Print Included PDF"}
      </SoftButton>
    </div>
  );
}
