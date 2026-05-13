/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ModeId, StorageMode } from "../lib/schemaTypes";
import { SoftButton } from "./SoftButton";
import { StorageModeToggle } from "./StorageModeToggle";
import { motion } from "motion/react";
import { SAMPLE_PERSONAL_STATE, SAMPLE_WORK_STATE } from "../lib/sampleState";
import { cn } from "../lib/utils";
import { ArrowRight } from "lucide-react";

interface SwitchboardProps {
  onStart: (mode: ModeId) => void;
  onTrySample: (sample: any) => void;
  storageMode: StorageMode;
  onStorageModeChange: (mode: StorageMode) => void;
}

export function Switchboard({ onStart, onTrySample, storageMode, onStorageModeChange }: SwitchboardProps) {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10 md:py-16 space-y-16 md:space-y-20 bg-ankahe-bg">
      {/* Hero */}
      <section className="grid lg:grid-cols-[minmax(0,1fr)_360px] gap-10 lg:gap-16 items-end">
        <div className="space-y-8 text-center lg:text-left">
          <motion.h1
            className="type-hero text-ankahe-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Say it once. <br className="hidden md:block" />
            <span className="type-hero-emphasis">Be understood.</span>
          </motion.h1>
          <motion.p
            className="type-lead text-ankahe-muted mx-auto lg:mx-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            A private place to write what usually goes unsaid. <br className="hidden md:block" />
            For work, care, hard conversations, and the people who matter.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 }}
          >
            <SoftButton size="md" onClick={() => onStart("me")} icon={<ArrowRight size={16} />}>
              Start Me Manual
            </SoftButton>
            <SoftButton size="md" variant="secondary" onClick={() => onStart("work")}>
              Start Work Manual
            </SoftButton>
          </motion.div>
        </div>

        <motion.aside
          aria-label="Manual preview"
          className="hidden lg:block bg-ankahe-surface border border-ankahe-border rounded-sm p-7 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.14 }}
        >
          <div className="space-y-6">
            <div className="space-y-2 border-b border-ankahe-border pb-5">
              <p className="type-eyebrow text-ankahe-accent">Sample manual</p>
              <h2 className="font-display text-4xl font-bold leading-none text-ankahe-accent-dark">
                A useful artifact
              </h2>
            </div>
            <div className="space-y-4">
              <p className="type-caption text-ankahe-muted">
                Included answers become the shareable manual.
              </p>
              <p className="type-caption text-ankahe-muted">
                Private answers stay available for your own copy.
              </p>
              <p className="type-caption text-ankahe-muted">
                Omitted answers are left out without penalty.
              </p>
            </div>
          </div>
        </motion.aside>
      </section>

      <section className="flex justify-center">
        <div className="max-w-lg text-center space-y-4">
          <p className="type-meta text-ankahe-muted/80">
            Nothing is saved. Keep your link, QR, image, or PDF before leaving.
          </p>
        </div>
      </section>

      {/* Modes */}
      <section className="grid lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-7">
          <ModeCard 
            id="me"
            title="Me"
            label="How to understand me"
            description="Write the things people should know before they guess wrong. Context for care, boundaries, and personal connection."
            themeColor="ankahe-clay"
            onClick={() => onStart("me")}
            onSampleClick={() => onTrySample(SAMPLE_PERSONAL_STATE)}
          />
        </div>
        <div className="lg:col-span-5 lg:mt-12">
          <ModeCard 
            id="work"
            title="Work"
            label="How to work with me"
            description="Share how you focus, decide, talk, and build trust in a professional context."
            themeColor="ankahe-sage"
            onClick={() => onStart("work")}
            onSampleClick={() => onTrySample(SAMPLE_WORK_STATE)}
          />
        </div>
      </section>

      {/* Settings / Footer */}
      <section className="flex flex-col items-center gap-6 border-t border-ankahe-border pt-16 pb-12">
        <div className="space-y-4 text-center pb-8 border-b border-ankahe-border/50 max-w-xl mx-auto">
          <h3 className="type-panel-title text-ankahe-text">Where answers live</h3>
          <StorageModeToggle value={storageMode} onChange={onStorageModeChange} />
          <p className="type-caption text-ankahe-muted">
            {storageMode === "url" 
              ? "Answers are saved inside your link. If you share the link, others see your answers."
              : "Answers live only in this tab's memory. They vanish if you refresh or close."}
          </p>
        </div>
      </section>
    </div>
  );
}

function ModeCard({ title, label, description, onClick, onSampleClick }: any) {
  return (
    <motion.article 
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="p-1.5 rounded-[2rem] bg-ankahe-surface-soft/50 ring-1 ring-ankahe-border/50 group"
    >
      <div className="bg-ankahe-surface rounded-[calc(2rem-0.375rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] p-8 md:p-12 h-full flex flex-col justify-between min-h-[320px]">
        <div className="space-y-4 mb-12">
          <p className="type-eyebrow text-ankahe-accent">{label}</p>
          <h2 className="type-mode-title text-ankahe-text">{title}</h2>
          <p className="type-lead text-ankahe-muted">{description}</p>
        </div>
        <div className="flex flex-wrap items-center gap-4 mt-auto pt-8 border-t border-ankahe-border/40">
          <SoftButton size="md" onClick={onClick} icon={<ArrowRight size={16} />}>Start a manual</SoftButton>
          <button 
            onClick={onSampleClick}
            className="type-ui-label min-h-11 px-2 inline-flex items-center text-ankahe-muted hover:text-ankahe-text transition-colors underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ankahe-accent focus-visible:ring-offset-2"
          >
            See a sample
          </button>
        </div>
      </div>
    </motion.article>
  );
}
