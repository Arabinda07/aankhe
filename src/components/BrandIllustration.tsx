import { useThemePreference } from "../hooks/useThemePreference";
import { cn } from "../lib/utils";

export const ILLUSTRATION_NAMES = [
  "blank-artifact",
  "no-results",
  "no-included-answers",
  "private-only-preview",
  "omitted-sections",
  "first-answer",
  "skipped-question",
  "broken-shared-link",
  "copy-link-success",
  "copy-link-failure",
  "export-progress",
  "export-failure",
  "install-prompt",
  "already-installed",
  "offline-saved",
  "fresh-version",
  "visibility-set",
  "mode-emblems",
  "answer-review-empty",
  "no-private-answers",
  "no-shareable-link",
  "qr-placeholder",
  "corrupt-url",
  "privacy-page",
  "how-it-works",
] as const;

export type IllustrationName = (typeof ILLUSTRATION_NAMES)[number];

interface BrandIllustrationProps {
  name: IllustrationName;
  className?: string;
  alt?: string;
}

export function BrandIllustration({ name, className, alt = "" }: BrandIllustrationProps) {
  const { resolvedTheme } = useThemePreference();
  const isDecorative = alt.length === 0;

  return (
    <img
      src={`/illustrations/${resolvedTheme}/${name}.svg`}
      alt={alt}
      aria-hidden={isDecorative ? "true" : undefined}
      loading="lazy"
      decoding="async"
      className={cn("pointer-events-none select-none", className)}
      width="360"
      height="260"
    />
  );
}
