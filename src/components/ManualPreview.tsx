/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ComposedManual, ComposedSection } from "../lib/schemaTypes";
import { cn } from "../lib/utils";
import { ModeId } from "../lib/schemaTypes";

interface ManualPreviewProps {
  manual: ComposedManual;
  mode: ModeId;
  className?: string;
}

export function ManualPreview({ manual, mode, className }: ManualPreviewProps) {
  return (
    <div data-mode={mode} className={cn("manual-preview-shell bg-parichay-paper md:rounded-md md:border md:border-parichay-paper-border p-8 md:p-14 lg:p-16 overflow-y-auto max-h-[100dvh]", className)}>
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

        <section className="mx-auto max-w-2xl space-y-5 py-4 text-center">
          <h2 className="type-meta text-parichay-muted mb-5 text-center">HOW TO READ THIS</h2>
          <p className="type-artifact-prose text-parichay-text-soft">
            {manual.recipientNote}
          </p>
        </section>

        {/* At a Glance */}
        {manual.atAGlance && (
          <section className="mx-auto max-w-2xl space-y-5 py-4 text-center">
            <h2 className="type-meta text-parichay-muted mb-5 text-center">AT A GLANCE</h2>
            <p className="type-artifact-prose text-parichay-text-soft">
              {manual.atAGlance}
            </p>
          </section>
        )}

        {manual.recognitionSummaries.length > 1 && (
          <section className="mx-auto max-w-2xl space-y-5 py-4 text-center">
            <h2 className="type-meta text-parichay-muted mb-5 text-center">WHAT THIS IS NOTICING</h2>
            <div className="space-y-5">
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
                    {section.details.map((p, i) => (
                      <p key={i} className="type-artifact-prose text-parichay-text">
                        {p}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </section>
          ))}
        </div>

        {manual.answeredCount === 0 && (
          <div className="text-center py-24 space-y-4">
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
