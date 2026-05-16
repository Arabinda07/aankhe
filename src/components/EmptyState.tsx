import { BrandIllustration } from "./BrandIllustration";
import { SoftButton } from "./SoftButton";

interface EmptyStateProps {
  variant: "no-results";
  onAction?: () => void;
  actionLabel?: string;
}

export function EmptyState({ variant, onAction, actionLabel }: EmptyStateProps) {
  if (variant === "no-results") {
    return (
      <div className="flex min-h-64 flex-col items-center justify-center gap-4 text-center">
        <BrandIllustration name="no-results" className="h-32 w-auto sm:h-36" />
        <div className="space-y-2">
          <h3 className="type-reading-heading text-parichay-heading">No answers found</h3>
          <p className="type-caption text-parichay-muted">Try a different word, or check for typos.</p>
        </div>
        {onAction && (
          <SoftButton variant="secondary" onClick={onAction}>
            {actionLabel || "Clear search"}
          </SoftButton>
        )}
      </div>
    );
  }
}
