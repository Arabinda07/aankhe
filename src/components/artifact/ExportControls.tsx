/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { FileArrowDown } from "@phosphor-icons/react/dist/csr/FileArrowDown";
import { Printer } from "@phosphor-icons/react/dist/csr/Printer";
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
      >
        <FileArrowDown size={20} weight="light" />
        {isExporting ? "Exporting..." : viewMode === "private" ? "Save Private Image" : "Save Included Image"}
      </SoftButton>
      <SoftButton
        variant="secondary"
        onClick={onPrint}
      >
        <Printer size={20} weight="light" />
        {viewMode === "private" ? "Print Private Copy" : "Print Included PDF"}
      </SoftButton>
    </div>
  );
}
