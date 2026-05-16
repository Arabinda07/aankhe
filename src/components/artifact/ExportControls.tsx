/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { FileArrowDown } from "@phosphor-icons/react/dist/csr/FileArrowDown";
import { Printer } from "@phosphor-icons/react/dist/csr/Printer";
import { WarningCircle } from "@phosphor-icons/react/dist/csr/WarningCircle";
import { SoftButton } from "../SoftButton";
import type { ManualViewMode } from "../../lib/visibilityPolicy";

interface ExportControlsProps {
  isExporting: boolean;
  exportError?: boolean;
  viewMode: ManualViewMode;
  onExportImage: () => void;
  onPrint: () => void;
}

export function ExportControls({
  isExporting,
  exportError,
  viewMode,
  onExportImage,
  onPrint,
}: ExportControlsProps) {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap justify-center gap-4">
        <SoftButton
          onClick={onExportImage}
          disabled={isExporting}
        >
          <FileArrowDown size={20} weight="light" />
          {isExporting ? "Exporting..." : viewMode === "private" ? "Save private image" : "Save included image"}
        </SoftButton>
        <SoftButton
          variant="secondary"
          onClick={onPrint}
        >
          <Printer size={20} weight="light" />
          {viewMode === "private" ? "Print private copy" : "Print included PDF"}
        </SoftButton>
      </div>
      {exportError && (
        <p className="type-caption flex items-center justify-center gap-1.5 text-parichay-danger">
          <WarningCircle size={16} weight="fill" />
          Export failed. Please try again.
        </p>
      )}
    </div>
  );
}
