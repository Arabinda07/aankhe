/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ComposedManual, ComposedSection } from "../lib/schemaTypes";
import { cn } from "../lib/utils";
import { ModeId } from "../lib/schemaTypes";
import { LockKey } from "@phosphor-icons/react/dist/csr/LockKey";
import { BrandIllustration } from "./BrandIllustration";

interface ManualPreviewProps {
  manual: ComposedManual;
  mode: ModeId;
  className?: string;
}

export function ManualPreview({ manual, mode, className }: ManualPreviewProps) {
  return (
    <div data-mode={mode} className={cn("manual-preview-shell bg-parichay-paper md:rounded-bezel-inner md:border md:border-parichay-paper-border p-8 md:p-14 lg:p-16 overflow-y-auto max-h-[100dvh]", className)}>
      <div className="max-w-3xl mx-auto space-y-20">
        {/* Header */}
        <div className="space-y-6 border-b border-parichay-paper-border pb-16 text-center">
          <p className="type-eyebrow text-parichay-sandal">
            {manual.subtitle}
          </p>
          <h1 className={cn("type-artifact-title text-parichay-heading")}>
            {manual.title}
          </h1>
          <div className="type-meta flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-parichay-muted">
            <span>For {manual.audience}</span>
            <span>{new Date().toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" })}</span>
          </div>
        </div>

        {manual.artifactFormat !== "summary" && (
          <section className="mx-auto max-w-2xl space-y-5 py-4 text-center">
            <h2 className="type-meta text-parichay-muted mb-5 text-center">CONTEXT</h2>
            <div className="space-y-6">
              <p className="type-artifact-prose text-parichay-text-soft">
                {manual.recipientNote}
              </p>
              {manual.atAGlance && (
                <p className="type-artifact-prose text-parichay-text-soft">
                  {manual.atAGlance}
                </p>
              )}
              {manual.recognitionSummaries.slice(1, 3).map((summary) => (
                <p key={summary} className="type-artifact-prose text-parichay-text">
                  {summary}
                </p>
              ))}
            </div>
          </section>
        )}

        {/* Sections */}
        <div className="space-y-24 py-12">
          {manual.sections.map((section: ComposedSection) => (
            <section key={section.id} className="grid md:grid-cols-[1fr_2fr] gap-10 md:gap-16 items-start">
              <div className="space-y-4 md:sticky md:top-8">
                <h3 className="type-artifact-heading text-parichay-heading">
                  {section.title}
                </h3>
                <p className="type-caption text-parichay-muted max-w-xs leading-relaxed">{section.description}</p>
              </div>

              <div className="space-y-6">
                {section.details.length > 0 && (
                  <div className="space-y-4">
                    {section.details.map((detail, i) => (
                      <div 
                        key={i} 
                        className={cn(
                          "type-artifact-prose flex gap-3", 
                          "text-parichay-text"
                        )}
                      >
                        {detail.isPrivate && (
                          <span className="shrink-0 mt-[0.3em] text-parichay-private" aria-hidden="true" title="Private">
                            <LockKey size={20} weight="light" />
                          </span>
                        )}
                        <p>{detail.text}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>
          ))}
        </div>

        {manual.answeredCount === 0 && (
          <div className="text-center py-20 space-y-5">
            <BrandIllustration name="blank-artifact" className="mx-auto h-40 w-auto" />
            <p className="type-artifact-prose text-parichay-text-soft">Your intro will start taking shape here.</p>
          </div>
        )}

        <div className="pt-16 pb-8 border-t border-parichay-paper-border text-center">
          <p className="type-meta text-parichay-muted/70">
            Made with Parichay. No account. No database.
          </p>
        </div>
      </div>
    </div>
  );
}
