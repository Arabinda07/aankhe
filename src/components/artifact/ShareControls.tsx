/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useId, useState } from "react";
import { Check } from "@phosphor-icons/react/dist/csr/Check";
import { Copy } from "@phosphor-icons/react/dist/csr/Copy";
import { EnvelopeSimple } from "@phosphor-icons/react/dist/csr/EnvelopeSimple";
import { QrCode } from "@phosphor-icons/react/dist/csr/QrCode";
import { WarningCircle } from "@phosphor-icons/react/dist/csr/WarningCircle";
import * as Popover from "@radix-ui/react-popover";
import * as Tooltip from "@radix-ui/react-tooltip";
import { QRCodeSVG } from "qrcode.react";
import { StorageMode } from "../../lib/schemaTypes";
import { SoftButton } from "../SoftButton";

interface ShareControlsProps {
  storageMode: StorageMode;
  sharedUrl: string;
  copied: boolean;
  onCopyLink: () => void;
  onCreateLink: () => void;
}

export function ShareControls({
  storageMode,
  sharedUrl,
  copied,
  onCopyLink,
  onCreateLink,
}: ShareControlsProps) {
  const [isQrOpen, setIsQrOpen] = useState(false);
  const qrPanelId = useId();

  return (
    <div className="bg-parichay-surface p-8 space-y-8 rounded-lg border border-parichay-border shadow-sm">
      <h3 className="type-panel-title text-parichay-heading flex items-center gap-2">
        <EnvelopeSimple size={20} className="text-parichay-accent" weight="light" />
        Share link
      </h3>

      {storageMode === "url" ? (
        <div className="space-y-6">
          <div className="flex items-center gap-2 p-2 bg-parichay-control-selected rounded-sm border border-parichay-border">
            <div className="type-caption font-mono flex-1 truncate text-parichay-muted pl-2">
              {sharedUrl}
            </div>
            <Tooltip.Provider delayDuration={250}>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <button
                    onClick={onCopyLink}
                    aria-label={copied ? "Link copied" : "Copy share link"}
                    className="min-h-11 min-w-11 p-2 bg-parichay-control rounded-sm shadow-sm hover:bg-parichay-control-hover transition-colors text-parichay-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-parichay-focus focus-visible:ring-offset-2"
                  >
                    {copied ? <Check size={18} className="text-parichay-accent" weight="light" /> : <Copy size={18} weight="light" />}
                  </button>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Content
                    sideOffset={8}
                    className="type-caption rounded-sm border border-parichay-border bg-parichay-surface px-3 py-2 text-parichay-text shadow-sm"
                  >
                    {copied ? "Copied" : "Copy included link"}
                    <Tooltip.Arrow className="fill-parichay-surface" />
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>
            </Tooltip.Provider>
          </div>

          {sharedUrl.length > 2000 && (
            <div className="type-caption flex gap-3 rounded-sm border border-parichay-danger/25 bg-parichay-danger-soft p-3 text-parichay-danger">
              <WarningCircle size={18} className="shrink-0 text-parichay-danger" weight="light" />
              <p>
                This URL is long. Saving an image or PDF may be more reliable in older apps.
              </p>
            </div>
          )}

          <div className="pt-4 space-y-4">
            <Popover.Root open={isQrOpen} onOpenChange={setIsQrOpen}>
              <Popover.Trigger asChild>
                <SoftButton
                  variant="secondary"
                  className="w-full gap-2 bg-parichay-control-selected text-parichay-text border-parichay-border"
                  aria-controls={qrPanelId}
                >
                  <QrCode size={20} weight="light" />
                  {isQrOpen ? "Hide QR code" : "Show QR code"}
                </SoftButton>
              </Popover.Trigger>
              <Popover.Portal>
                <Popover.Content
                  id={qrPanelId}
                  sideOffset={12}
                  align="center"
                  className="z-50 bg-parichay-paper p-6 rounded-sm border border-parichay-paper-border flex flex-col items-center gap-4 shadow-sm"
                >
                  <QRCodeSVG value={sharedUrl} size={200} level="M" />
                  <p className="type-caption max-w-56 text-center text-parichay-muted">
                    Scan to open this intro on another device.
                  </p>
                  <Popover.Arrow className="fill-parichay-paper" />
                </Popover.Content>
              </Popover.Portal>
            </Popover.Root>
          </div>
        </div>
      ) : (
        <div className="p-6 bg-parichay-control-selected rounded-sm border border-parichay-border space-y-5">
          <p className="type-caption text-parichay-muted">
            Answers are only in this tab. Create a link when you are ready to include the shareable parts.
          </p>
          <SoftButton variant="secondary" className="w-full" onClick={onCreateLink}>
            Create link with included answers
          </SoftButton>
        </div>
      )}
    </div>
  );
}
