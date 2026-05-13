/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useId, useState } from "react";
import { Check, Copy, QrCode, ShareNetwork, WarningCircle } from "@phosphor-icons/react";
import { QRCodeSVG } from "qrcode.react";
import { motion } from "motion/react";
import { StorageMode } from "../../lib/schemaTypes";
import { SoftButton } from "../SoftButton";

interface ShareControlsProps {
  storageMode: StorageMode;
  sharedUrl: string;
  copied: boolean;
  onCopyLink: () => void;
}

export function ShareControls({
  storageMode,
  sharedUrl,
  copied,
  onCopyLink,
}: ShareControlsProps) {
  const [showQR, setShowQR] = useState(false);
  const qrPanelId = useId();

  return (
    <div className="bg-ankahe-surface p-8 space-y-8 rounded-lg border border-ankahe-border shadow-sm">
      <h3 className="type-panel-title text-ankahe-text flex items-center gap-2">
        <ShareNetwork size={20} className="text-ankahe-accent" weight="light" />
        Share link
      </h3>

      {storageMode === "url" ? (
        <div className="space-y-6">
          <div className="flex items-center gap-2 p-2 bg-ankahe-control-selected rounded-sm border border-ankahe-border">
            <div className="type-caption flex-1 truncate text-ankahe-muted pl-2">
              {sharedUrl}
            </div>
            <button
              onClick={onCopyLink}
              aria-label={copied ? "Link copied" : "Copy share link"}
              className="min-h-11 min-w-11 p-2 bg-ankahe-control rounded-sm shadow-sm hover:bg-ankahe-control-hover transition-colors text-ankahe-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ankahe-focus focus-visible:ring-offset-2"
            >
              {copied ? <Check size={18} className="text-ankahe-accent" weight="light" /> : <Copy size={18} weight="light" />}
            </button>
          </div>

          {sharedUrl.length > 2000 && (
            <div className="type-caption p-3 bg-ankahe-warning-soft rounded-sm border border-ankahe-warning/25 flex gap-3 text-ankahe-warning">
              <WarningCircle size={18} className="shrink-0 text-ankahe-warning" weight="light" />
              <p>
                This URL is long. Saving an image or PDF may be more reliable in older apps.
              </p>
            </div>
          )}

          <div className="pt-4 space-y-4">
            <SoftButton
              variant="secondary"
              className="w-full gap-2 bg-ankahe-control-selected text-ankahe-text border-ankahe-border"
              onClick={() => setShowQR((current) => !current)}
              aria-expanded={showQR}
              aria-controls={qrPanelId}
            >
              <QrCode size={20} weight="light" />
              {showQR ? "Hide QR Code" : "Show QR Code"}
            </SoftButton>

            {showQR && (
              <motion.div
                id={qrPanelId}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-ankahe-paper p-6 rounded-sm border border-ankahe-paper-border flex flex-col items-center gap-4 shadow-sm"
              >
                <QRCodeSVG value={sharedUrl} size={200} level="M" />
                <p className="type-caption text-ankahe-muted text-center">
                  Scan to open this manual on another device.
                </p>
              </motion.div>
            )}
          </div>
        </div>
      ) : (
        <div className="p-6 bg-ankahe-control-selected rounded-sm border border-ankahe-border space-y-4 text-center">
          <p className="type-body text-ankahe-text">
            Memory Only keeps answers in this tab.
          </p>
          <p className="type-caption text-ankahe-muted">
            Save in Link creates a share link with included answers only.
          </p>
        </div>
      )}
    </div>
  );
}
