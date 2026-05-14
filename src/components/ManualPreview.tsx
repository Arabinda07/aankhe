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
    <div data-mode={mode} className={cn("manual-preview-shell bg-ankahe-paper md:rounded-sm md:border md:border-ankahe-paper-border p-8 md:p-14 lg:p-16 overflow-y-auto max-h-screen", className)}>
      <div className="max-w-3xl mx-auto space-y-16">
        {/* Header */}
        <div className="space-y-6 border-b border-ankahe-paper-border pb-12 text-center">
          <p className="type-eyebrow text-ankahe-sandal">
            {manual.subtitle}
          </p>
          <h1 className={cn("type-artifact-title text-ankahe-text")}>
            {manual.title}
          </h1>
          <div className="type-meta flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-ankahe-muted">
            <span>For {manual.audience}</span>
            <span>{new Date().toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" })}</span>
          </div>
        </div>

        <section className="rounded-sm border border-ankahe-paper-border bg-ankahe-paper-muted p-7 md:p-9">
          <h2 className="type-meta mb-4 text-center text-ankahe-muted">How to read this</h2>
          <p className="type-artifact-prose text-center text-ankahe-text">
            {manual.recipientNote}
          </p>
        </section>

        {/* At a Glance */}
        {manual.atAGlance && (
          <section className="bg-ankahe-paper-muted p-8 md:p-12 rounded-sm border border-ankahe-paper-border">
            <h2 className="type-meta text-ankahe-muted mb-4 text-center">At a Glance</h2>
            <p className="type-artifact-prose text-center italic text-ankahe-text">
              {manual.atAGlance}
            </p>
          </section>
        )}

        {manual.recognitionSummaries.length > 1 && (
          <section className="space-y-4">
            <h2 className="type-artifact-heading text-ankahe-text">What this is noticing</h2>
            <div className="space-y-4">
              {manual.recognitionSummaries.slice(1, 3).map((summary) => (
                <p key={summary} className="type-artifact-prose text-ankahe-text">
                  {summary}
                </p>
              ))}
            </div>
          </section>
        )}

        {/* Sections */}
        <div className="space-y-20 py-8">
          {manual.sections.map((section: ComposedSection) => (
            <section key={section.id} className="grid md:grid-cols-[1fr_2fr] gap-8 md:gap-16 items-start">
              <div className="space-y-4 md:sticky md:top-8">
                <h3 className="type-artifact-heading text-ankahe-text">
                  {section.title}
                </h3>
                <p className="type-caption text-ankahe-muted max-w-xs">{section.description}</p>
              </div>

              <div className="space-y-6">
                {section.details.length > 0 && (
                  <div className="space-y-4">
                    {section.details.map((p, i) => (
                      <p key={i} className="type-artifact-prose text-ankahe-text">
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
            <p className="type-artifact-prose text-ankahe-muted italic">Your manual will start taking shape here.</p>
          </div>
        )}

        <div className="pt-16 pb-8 border-t border-ankahe-paper-border text-center">
          <p className="type-meta text-ankahe-muted/70">
            Made with Ankahe. No account. No database.
          </p>
        </div>
      </div>
    </div>
  );
}
