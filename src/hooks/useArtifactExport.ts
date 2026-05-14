/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import type { ManualViewMode } from "../lib/visibilityPolicy";

export function useArtifactExport(
  artifactRef: React.RefObject<HTMLElement | null>,
  mode: string,
  secureSharedUrl: string,
  viewMode: ManualViewMode
) {
  const [isExporting, setIsExporting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);

  const exportAsImage = async () => {
    if (!artifactRef.current) return;
    setIsExporting(true);
    try {
      const pageColor =
        getComputedStyle(document.documentElement).getPropertyValue("--color-page").trim() ||
        getComputedStyle(document.body).backgroundColor ||
        "transparent";
      const { toPng } = await import("html-to-image");
      const dataUrl = await toPng(artifactRef.current, {
        cacheBust: true,
        backgroundColor: pageColor,
        pixelRatio: 2
      });
      const link = document.createElement("a");
      link.download = `ankahe-${viewMode}-manual-${mode}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Oops, something went wrong!", err);
    } finally {
      setIsExporting(false);
    }
  };

  const printManual = () => {
    window.print();
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(secureSharedUrl);
      setCopyError(false);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
      setCopyError(true);
    }
  };

  return {
    isExporting,
    copied,
    copyError,
    exportAsImage,
    printManual,
    copyLink
  };
}
