/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useRef, useState, useMemo } from "react";
import { ManualState } from "../lib/schemaTypes";
import { PROTOCOL_MANIFEST } from "../lib/protocolManifest";
import { composeManual } from "../lib/manualComposer";
import { generateSharedUrl } from "../lib/stateCompression";
import { SoftButton } from "./SoftButton";
import { ManualPreview } from "./ManualPreview";
import { useArtifactExport } from "../hooks/useArtifactExport";
import { Check, Copy, DownloadSimple, Printer, QrCode, ShareNetwork, WarningCircle } from "@phosphor-icons/react";
import { QRCodeSVG } from "qrcode.react";
import { cn } from "../lib/utils";
import { motion } from "motion/react";

interface ArtifactStudioProps {
  state: ManualState;
  url: string;
  storageMode: string;
}

export function ArtifactStudio({ state, url, storageMode }: ArtifactStudioProps) {
  const artifactRef = useRef<HTMLDivElement>(null);
  const [showQR, setShowQR] = useState(false);
  
  const [viewMode, setViewMode] = useState<"public" | "private">("public");
  const [excludedSections, setExcludedSections] = useState<string[]>([]);

  const manual = useMemo(() => composeManual(state, { viewMode, excludedSections }), [state, viewMode, excludedSections]);
  const mode = state.mode;
  const config = PROTOCOL_MANIFEST[mode];
  const secureSharedUrl = useMemo(() => {
    return generateSharedUrl(state);
  }, [state]);

  const {
    isExporting,
    copied,
    copyError,
    exportAsImage,
    printManual,
    copyLink
  } = useArtifactExport(artifactRef, mode, secureSharedUrl);

  const toggleSection = (sectionId: string) => {
    setExcludedSections(prev => 
      prev.includes(sectionId) ? prev.filter(id => id !== sectionId) : [...prev, sectionId]
    );
  };

  return (
    <div className="space-y-12 pb-24">
      <div aria-live="polite" className="sr-only">
        {copied ? "Link copied to clipboard" : ""}
        {copyError ? "Could not copy the link" : ""}
        {isExporting ? "Exporting image..." : ""}
      </div>
      <div className="space-y-4 text-center md:text-left">
        <h2 className="type-display text-ankahe-text">Artifact Studio</h2>
        <p className="type-lead text-ankahe-muted">Shape your manual into a finished document for saving, printing, or sharing.</p>
      </div>

      <div className="grid lg:grid-cols-[1fr_400px] gap-12 items-start">
        {/* Preview Container */}
        <div className="space-y-8">
          <div className="overflow-hidden rounded-xl border border-ankahe-border bg-ankahe-surface p-4 md:p-12">
            <div ref={artifactRef} className="mx-auto w-full max-w-2xl origin-top overflow-hidden rounded-md border border-ankahe-border bg-ankahe-bg shadow-[0_18px_48px_color-mix(in_oklch,var(--color-accent)_8%,transparent)]">
              <ManualPreview manual={manual} mode={mode} className="border-none shadow-none max-h-none" />
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            <SoftButton onClick={exportAsImage} disabled={isExporting} className="gap-2 bg-ankahe-accent text-ankahe-on-accent border-none py-3">
              <DownloadSimple size={18} />
              {isExporting ? "Exporting..." : "Save Image"}
            </SoftButton>
            <SoftButton variant="secondary" onClick={printManual} className="gap-2 bg-ankahe-surface text-ankahe-text py-3">
              <Printer size={18} />
              Print / PDF
            </SoftButton>
          </div>
        </div>

        {/* Sharing Side */}
        <div className="space-y-8 sticky top-8">
          <div className="bg-ankahe-surface p-8 space-y-8 rounded-lg border border-ankahe-border shadow-sm">
            <div>
              <h3 className="type-panel-title text-ankahe-text mb-4">Manual view</h3>
              <div className="flex bg-ankahe-surface-soft p-1 rounded-sm w-fit border border-ankahe-border">
                <button
                  onClick={() => setViewMode("public")}
                  aria-pressed={viewMode === "public"}
                  className={cn("type-ui-label min-h-11 px-4 py-1.5 rounded-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ankahe-accent focus-visible:ring-offset-2", viewMode === "public" ? "bg-ankahe-surface text-ankahe-text shadow-sm" : "text-ankahe-muted hover:text-ankahe-text")}
                >
                  Included only
                </button>
                <button
                  onClick={() => setViewMode("private")}
                  aria-pressed={viewMode === "private"}
                  className={cn("type-ui-label min-h-11 px-4 py-1.5 rounded-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ankahe-accent focus-visible:ring-offset-2", viewMode === "private" ? "bg-ankahe-surface text-ankahe-text shadow-sm" : "text-ankahe-muted hover:text-ankahe-text")}
                >
                  Full private copy
                </button>
              </div>
              <p className="type-caption text-ankahe-muted mt-3">
                {viewMode === "public" 
                  ? "Previewing the manual made from included answers. Private answers are left out." 
                  : "Previewing your own copy, including answers you marked private."}
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="type-panel-title text-ankahe-text">Include Sections</h4>
              <div className="flex flex-wrap gap-2">
                {config.sections.map(sec => {
                  const isExcluded = excludedSections.includes(sec.id);
                  return (
                    <button
                      key={sec.id}
                      onClick={() => toggleSection(sec.id)}
                      aria-pressed={!isExcluded}
                      className={cn(
                        "type-caption min-h-11 px-3 py-1.5 rounded-sm border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ankahe-accent focus-visible:ring-offset-2",
                        isExcluded 
                          ? "bg-ankahe-surface-soft border-ankahe-border text-ankahe-muted" 
                          : "bg-ankahe-accent/10 border-ankahe-accent text-ankahe-accent-dark"
                      )}
                    >
                      {sec.title}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="bg-ankahe-surface p-8 space-y-8 rounded-lg border border-ankahe-border shadow-sm">
            <h3 className="type-panel-title text-ankahe-text flex items-center gap-2">
              <ShareNetwork size={18} className="text-ankahe-accent" />
              Share Link
            </h3>

            {storageMode === "url" ? (
              <div className="space-y-6">
                <div className="flex items-center gap-2 p-2 bg-ankahe-bg rounded-sm border border-ankahe-border">
                  <div className="type-caption flex-1 truncate text-ankahe-muted pl-2">
                    {secureSharedUrl}
                  </div>
                  <button 
                    onClick={copyLink}
                    aria-label={copied ? "Link copied" : "Copy share link"}
                    className="min-h-11 min-w-11 p-2 bg-ankahe-surface rounded-sm shadow-sm hover:bg-ankahe-surface-soft transition-colors text-ankahe-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ankahe-accent focus-visible:ring-offset-2"
                  >
                    {copied ? <Check size={16} className="text-ankahe-accent" /> : <Copy size={16} />}
                  </button>
                </div>

                {secureSharedUrl.length > 2000 && (
                  <div className="type-caption p-3 bg-ankahe-warning-soft rounded-sm border border-ankahe-warning/25 flex gap-3 text-ankahe-warning">
                    <WarningCircle size={16} className="shrink-0 text-ankahe-warning" />
                    <p>
                      This URL is very long. Some older apps or browsers might struggle to open it. Saving it as an image or PDF is recommended.
                    </p>
                  </div>
                )}

                <div className="pt-4 space-y-4">
                  <SoftButton 
                    variant="secondary" 
                    className="w-full gap-2 bg-ankahe-surface-soft text-ankahe-text border-ankahe-border"
                    onClick={() => setShowQR(!showQR)}
                  >
                    <QrCode size={18} />
                    {showQR ? "Hide QR Code" : "Show QR Code"}
                  </SoftButton>

                  {showQR && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-ankahe-on-accent p-6 rounded-sm border border-ankahe-border flex flex-col items-center gap-4 shadow-sm"
                    >
                      <QRCodeSVG value={secureSharedUrl} size={200} level="M" />
                      <p className="type-caption text-ankahe-muted text-center">
                        Scan to open this manual on another device.
                      </p>
                    </motion.div>
                  )}
                </div>
              </div>
            ) : (
              <div className="p-6 bg-ankahe-bg rounded-sm border border-ankahe-border space-y-4 text-center">
                <p className="type-body text-ankahe-text">
                  You are in <strong>Memory Only</strong> mode. Your link does not contain your answers.
                </p>
                <p className="type-caption text-ankahe-muted">
                  Switch to <strong>Save in Link</strong> to generate a shareable QR or URL.
                </p>
              </div>
            )}
          </div>

          <div className="bg-ankahe-surface p-8 space-y-4 rounded-lg border border-ankahe-border shadow-sm">
            <h3 className="type-panel-title text-ankahe-text">Visibility Note</h3>
            <div className="space-y-3">
              <div className="type-caption flex items-center justify-between">
                <span className="text-ankahe-muted">Included answers</span>
                <span className="text-ankahe-text">{manual.shareableCount}</span>
              </div>
              <div className="type-caption flex items-center justify-between">
                <span className="text-ankahe-muted">Private answers</span>
                <span className="text-ankahe-accent-dark">{manual.privateCount}</span>
              </div>
            </div>
            <p className="type-caption text-ankahe-muted pt-2">
              Private answers appear only in your own copy. Included answers are used for share links, QR codes, images, and PDFs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
