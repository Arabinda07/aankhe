import { Copy } from "@phosphor-icons/react/dist/csr/Copy";
import { DownloadSimple } from "@phosphor-icons/react/dist/csr/DownloadSimple";
import { useIsMobile } from "../../hooks/useIsMobile";

interface MobileExportBarProps {
  copied: boolean;
  isExporting: boolean;
  onCopyLink: () => void;
  onExportImage: () => void;
}

export function MobileExportBar({
  copied,
  isExporting,
  onCopyLink,
  onExportImage,
}: MobileExportBarProps) {
  const isMobile = useIsMobile();

  if (!isMobile) return null;

  return (
    <div className="sticky z-40 -mx-6 flex min-w-0 max-w-[calc(100%+3rem)] items-center gap-3 border-t border-parichay-border bg-parichay-surface px-5 py-3 bottom-[var(--mobile-nav-total)]">
      <button
        type="button"
        onClick={onCopyLink}
        className="type-ui-label inline-flex min-h-11 min-w-0 flex-1 items-center justify-center gap-2 rounded-md bg-parichay-accent px-3 text-parichay-on-accent transition-colors hover:bg-parichay-accent-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-parichay-focus focus-visible:ring-offset-2 sm:px-4"
      >
        <Copy size={18} weight="light" />
        {copied ? "Copied" : "Copy link"}
      </button>
      <button
        type="button"
        onClick={onExportImage}
        disabled={isExporting}
        className="type-ui-label inline-flex min-h-11 min-w-0 flex-1 items-center justify-center gap-2 rounded-md border border-parichay-border bg-parichay-control px-3 text-parichay-text transition-colors hover:bg-parichay-control-hover disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-parichay-focus focus-visible:ring-offset-2 sm:px-4"
      >
        <DownloadSimple size={18} weight="light" />
        {isExporting ? "Exporting" : "Export image"}
      </button>
    </div>
  );
}
