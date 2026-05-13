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
    <div data-mode={mode} className={cn("bg-ankahe-surface md:rounded-sm md:border md:border-ankahe-border p-8 md:p-14 lg:p-16 overflow-y-auto max-h-screen", className)}>
      <div className="max-w-3xl mx-auto space-y-16">
        {/* Header */}
        <div className="space-y-6 border-b border-ankahe-border pb-12 text-center">
          <p className="type-eyebrow text-ankahe-accent">
            {manual.subtitle}
          </p>
          <h1 className={cn("type-artifact-title text-ankahe-accent-dark")}>
            {manual.title}
          </h1>
        </div>

        {/* At a Glance */}
        {manual.atAGlance && (
          <section className="bg-ankahe-bg/50 p-8 md:p-12 rounded-sm border border-ankahe-border">
            <h2 className="type-meta text-ankahe-muted mb-4 text-center">At a Glance</h2>
            <p className="type-artifact-prose text-center italic text-ankahe-accent-dark">
              "{manual.atAGlance}"
            </p>
          </section>
        )}

        {/* Sections */}
        <div className="space-y-20 py-8">
          {manual.sections.map((section: ComposedSection) => (
            <section key={section.id} className="grid md:grid-cols-[1fr_2fr] gap-8 md:gap-16 items-start">
              <div className="space-y-4 md:sticky md:top-8">
                <h3 className="type-artifact-heading text-ankahe-accent-dark">
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

        <div className="pt-16 pb-8 border-t border-ankahe-border text-center">
          <p className="type-meta text-ankahe-muted/70">
            Made with Ankahe. No account. No database.
          </p>
        </div>
      </div>
    </div>
  );
}
