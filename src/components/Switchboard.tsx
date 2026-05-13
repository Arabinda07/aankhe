/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ArrowRight, SealCheck, ShieldCheck, Sparkle } from "@phosphor-icons/react";
import type React from "react";
import { ModeId, StorageMode } from "../lib/schemaTypes";
import { SAMPLE_PERSONAL_STATE, SAMPLE_WORK_STATE } from "../lib/sampleState";
import { cn } from "../lib/utils";
import { SoftButton } from "./SoftButton";
import { StorageModeToggle } from "./StorageModeToggle";
import { motion } from "motion/react";

interface SwitchboardProps {
  onStart: (mode: ModeId) => void;
  onTrySample: (sample: any) => void;
  storageMode: StorageMode;
  onStorageModeChange: (mode: StorageMode) => void;
}

interface ModeCardProps {
  id: "me" | "work";
  title: string;
  label: string;
  description: string;
  tone: "lac" | "sandal";
  onClick: () => void;
  onSampleClick: () => void;
}

export function Switchboard({
  onStart,
  onTrySample,
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
            <SoftButton size="md" variant="secondary" onClick={() => onStart("work")}>
              Start Work Manual
            </SoftButton>
          </motion.div>

          <motion.ul
            className="flex flex-col gap-5 pt-2 sm:flex-row sm:flex-wrap sm:gap-x-10 sm:gap-y-5"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <PromiseItem icon={<ShieldCheck size={20} weight="regular" />} title="Private by default" text="No account, backend, or database." />
            <PromiseItem icon={<SealCheck size={20} weight="regular" />} title="You choose what leaves" text="Included answers can become a link, QR, image, or PDF." />
          </motion.ul>
        </div>

        <motion.aside
          aria-label="Manual document preview"
          className="group relative min-w-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="absolute -inset-3 rounded-shell border border-ankahe-border/60 bg-ankahe-surface-halo transition-colors duration-500 group-hover:bg-ankahe-surface-halo-hover" />
          <div className="relative rounded-shell border border-ankahe-border bg-ankahe-surface p-5 shadow-[0_24px_70px_color-mix(in_oklch,var(--color-accent)_10%,transparent)] transition-shadow duration-500 group-hover:shadow-[0_32px_80px_color-mix(in_oklch,var(--color-accent)_14%,transparent)]">
            <div className="rounded-xl border border-ankahe-border bg-ankahe-bg px-7 py-8 md:px-9 md:py-10">
              <div className="mb-9 flex items-start justify-between gap-6 border-b border-ankahe-border pb-8">
                <div className="space-y-2">
                  <p className="type-eyebrow text-ankahe-accent">Sample manual</p>
                  <h2 className="font-sans font-bold tracking-tight text-4xl leading-none text-ankahe-accent-dark md:text-5xl">
                    How to understand me
                  </h2>
                </div>
                <span className="grid h-11 w-11 place-items-center rounded-lg bg-ankahe-accent-soft text-ankahe-accent transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:rotate-12 group-hover:scale-110">
                  <Sparkle size={20} weight="regular" />
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

      <section className="mx-auto max-w-7xl px-6 pb-20 md:pb-28">
        <div className="grid gap-10 lg:gap-8 lg:grid-cols-12 lg:items-start">
          <div className="flex flex-col gap-10 lg:col-span-4 lg:pt-2 lg:pr-4">
            <StoragePanel 
              storageMode={storageMode} 
              onStorageModeChange={onStorageModeChange} 
              className="hidden lg:block"
            />
          </div>
          <div className="grid gap-5 lg:col-span-8 lg:grid-cols-2 lg:pt-2">
            <ModeCard
              id="me"
              title="Me"
              label="For care and connection"
              description="Write context for people who know you personally, before they have to guess."
              tone="lac"
              onClick={() => onStart("me")}
              onSampleClick={() => onTrySample(SAMPLE_PERSONAL_STATE)}
            />
            <ModeCard
              id="work"
              title="Work"
              label="For collaboration"
              description="Share how you focus, decide, communicate, and build trust at work."
              tone="sandal"
              onClick={() => onStart("work")}
              onSampleClick={() => onTrySample(SAMPLE_WORK_STATE)}
            />
          </div>
          <StoragePanel 
            storageMode={storageMode} 
            onStorageModeChange={onStorageModeChange} 
            className="lg:hidden lg:col-span-12"
          />
        </div>
      </section>
    </div>
  );
}

function StoragePanel({ storageMode, onStorageModeChange, className }: { storageMode: StorageMode, onStorageModeChange: (mode: StorageMode) => void, className?: string }) {
  return (
    <div className={cn("space-y-6 rounded-2xl bg-ankahe-surface-translucent border border-ankahe-border/60 p-6 md:p-8", className)}>
      <div className="space-y-2">
        <p className="type-eyebrow text-ankahe-muted">Storage</p>
        <h3 className="font-sans text-xl font-bold tracking-tight text-ankahe-text md:text-2xl leading-tight">
          Keep it in this tab, or carry included answers in the link.
        </h3>
      </div>
      <div className="space-y-5">
        <StorageModeToggle value={storageMode} onChange={onStorageModeChange} />
        <p className="type-caption text-ankahe-muted">
          {storageMode === "url"
            ? "Private and omitted answers stay out."
            : "Refreshing or closing the tab clears the draft."}
        </p>
      </div>
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
    <span className={cn("type-caption inline-flex min-h-9 items-center justify-center rounded-md px-3 font-semibold", className)}>
      {label}
    </span>
  );
}

function ModeCard({
  title,
  label,
  description,
  tone,
  onClick,
  onSampleClick,
}: ModeCardProps) {
  const toneClasses = {
    lac: "border-ankahe-accent/30 bg-ankahe-accent-soft/35 text-ankahe-accent-dark",
    sandal: "border-sandal/30 bg-sandal-soft/65 text-sandal",
  };

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className="rounded-xl border border-ankahe-border bg-ankahe-surface p-6 md:p-8"
    >
      <div className="flex min-h-[300px] flex-col justify-between gap-10">
        <div className="space-y-5">
          <span className={cn("type-caption inline-flex rounded-md border px-3 py-2 font-bold", toneClasses[tone])}>
            {label}
          </span>
          <div className="space-y-4">
            <h3 className="type-mode-title text-ankahe-text">{title}</h3>
            <p className="type-lead text-ankahe-muted">{description}</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-4 border-t border-ankahe-border pt-6">
          <SoftButton size="md" onClick={onClick} icon={<ArrowRight size={16} />}>
            Start manual
          </SoftButton>
          <button
            onClick={onSampleClick}
            className="type-ui-label inline-flex min-h-11 items-center px-1 text-ankahe-muted underline underline-offset-4 transition-colors hover:text-ankahe-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ankahe-accent focus-visible:ring-offset-2"
          >
            See a sample
          </button>
        </div>
      </div>
    </motion.article>
  );
}
