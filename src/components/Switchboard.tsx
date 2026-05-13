/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ArrowRight, SealCheck, ShieldCheck, Sparkle } from "@phosphor-icons/react";
import type React from "react";
import { ModeId, StorageMode } from "../lib/schemaTypes";
import { cn } from "../lib/utils";
import { SoftButton } from "./SoftButton";
import { motion } from "motion/react";

interface SwitchboardProps {
  onStart: (mode: ModeId) => void;
  onTrySample: (sample: any) => void;
  onLearnMore: () => void;
  storageMode: StorageMode;
  onStorageModeChange: (mode: StorageMode) => void;
}



export function Switchboard({
  onStart,
  onTrySample,
  onLearnMore,
  storageMode,
  onStorageModeChange,
}: SwitchboardProps) {
  return (
    <div className="bg-ankahe-bg">
      <section className="mx-auto grid min-h-[calc(100dvh-4rem)] max-w-7xl grid-cols-1 gap-11 px-6 py-10 md:py-14 lg:grid-cols-[minmax(0,1fr)_minmax(420px,0.82fr)] lg:items-center lg:gap-16">
        <div className="min-w-0 max-w-[680px] space-y-9">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="space-y-6">
              <h1 className="type-hero max-w-[8.6ch] text-ankahe-text">
                A guide to{" "}
                <span className="font-display italic font-normal text-ankahe-accent">your</span>{" "}
                <span className="font-display italic font-normal text-ankahe-accent">mind</span>
              </h1>
              <p className="type-lead text-ankahe-muted">
                Write what usually goes unsaid, then shape it into a manual worth keeping.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="flex flex-col gap-3 sm:flex-row"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <SoftButton size="md" onClick={() => onStart("me")} icon={<ArrowRight size={16} />}>
              Begin your manual
            </SoftButton>
            <SoftButton size="md" variant="secondary" onClick={onLearnMore}>
              How it works
            </SoftButton>
          </motion.div>

          <motion.ul
            className="flex flex-col gap-5 pt-2 sm:flex-row sm:flex-wrap sm:gap-x-10 sm:gap-y-5"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <PromiseItem icon={<ShieldCheck size={22} weight="light" />} title="Private by default" text="No account, backend, or database." />
            <PromiseItem icon={<SealCheck size={22} weight="light" />} title="You choose what leaves" text="Included answers can become a link, QR, image, or PDF." />
          </motion.ul>
        </div>

        <motion.aside
          aria-label="Manual document preview"
          className="group relative min-w-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="absolute -inset-2 rounded-lg border border-ankahe-border/60 bg-ankahe-surface-halo transition-colors duration-500 group-hover:bg-ankahe-surface-halo-hover" />
          <div className="relative rounded-lg border border-ankahe-border bg-ankahe-surface p-3 shadow-[0_18px_48px_color-mix(in_oklch,var(--color-accent)_8%,transparent)] transition-shadow duration-500 group-hover:shadow-[0_22px_56px_color-mix(in_oklch,var(--color-accent)_10%,transparent)]">
            <div className="rounded-md border border-ankahe-border bg-ankahe-bg px-7 py-8 md:px-9 md:py-10">
              <div className="mb-9 flex items-start justify-between gap-6 border-b border-ankahe-border pb-8">
                <div className="space-y-2">
                  <p className="type-eyebrow text-ankahe-accent">Sample manual</p>
                  <h2 className="font-sans font-bold tracking-tight text-4xl leading-none text-ankahe-accent-dark md:text-5xl">
                    How to understand me
                  </h2>
                </div>
                <span className="grid h-11 w-11 place-items-center rounded-md bg-ankahe-accent-soft text-ankahe-accent transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:rotate-12 group-hover:scale-110">
                  <Sparkle size={22} weight="light" />
                </span>
              </div>

              <div className="space-y-8">
                <DocumentSection
                  accessibleLabel="When I am quiet"
                  label={
                    <>
                      <span>When I am</span>
                      <span>quiet</span>
                    </>
                  }
                  text="I may be thinking, not withdrawing. A steady question usually helps more than pressure to answer quickly."
                />
                <DocumentSection
                  accessibleLabel="How care reaches me"
                  label={
                    <>
                      <span>How care</span>
                      <span>reaches me</span>
                    </>
                  }
                  text="Specific, practical care lands best. I trust warmth that leaves room for me to respond in my own time."
                />
                <div className="grid gap-3 border-t border-ankahe-border pt-7 text-sm sm:grid-cols-3">
                  <VisibilityChip label="Included" className="bg-ankahe-accent-soft text-ankahe-accent-dark" />
                  <VisibilityChip label="Private" className="bg-private-soft text-private" />
                  <VisibilityChip label="Omitted" className="bg-hidden-soft text-hidden" />
                </div>
              </div>
            </div>
          </div>
        </motion.aside>
      </section>

    </div>
  );
}

function PromiseItem({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <li className="flex items-start gap-3.5">
      <div className="mt-0.5 text-ankahe-accent/80">{icon}</div>
      <div>
        <p className="type-ui-label text-ankahe-text">{title}</p>
        <p className="type-caption text-ankahe-muted">{text}</p>
      </div>
    </li>
  );
}

function DocumentSection({
  accessibleLabel,
  label,
  text,
}: {
  accessibleLabel: string;
  label: React.ReactNode;
  text: string;
}) {
  return (
    <section className="grid gap-3 sm:grid-cols-[0.7fr_1.3fr] sm:gap-7">
      <h3 aria-label={accessibleLabel} className="type-meta flex flex-col text-ankahe-muted">{label}</h3>
      <p className="type-artifact-prose text-ankahe-text">{text}</p>
    </section>
  );
}

function VisibilityChip({ label, className }: { label: string; className?: string }) {
  return (
    <span className={cn("type-caption inline-flex min-h-9 items-center justify-center rounded-sm px-3 font-semibold", className)}>
      {label}
    </span>
  );
}
