/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Eye } from "@phosphor-icons/react/dist/csr/Eye";
import { EyeSlash } from "@phosphor-icons/react/dist/csr/EyeSlash";
import { LinkSimpleHorizontal } from "@phosphor-icons/react/dist/csr/LinkSimpleHorizontal";
import { LockKey } from "@phosphor-icons/react/dist/csr/LockKey";
import type React from "react";

export function PrivacyPage() {
  return (
    <InfoShell
      eyebrow="Privacy"
      title="Nothing leaves until you say so"
      lead="No accounts. No database. Your tab is the room. You decide what stays and what goes."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <InfoCard icon={<LockKey size={24} weight="light" />} title="Memory Only">
          Your answers live in this tab. Close it or refresh it and they disappear. Generate a link or export before you leave if you want to keep them.
        </InfoCard>
        <InfoCard icon={<LinkSimpleHorizontal size={24} weight="light" />} title="Save in Link">
          Only answers marked Share are compressed into the link. Anyone with that link can read those included answers. Lose the link and it's gone.
        </InfoCard>
      </div>

      <section className="px-2 py-12 md:px-8">
        <h2 className="type-reading-heading text-parichay-heading">What can leave the page</h2>
        <div className="mt-8 grid gap-8 md:grid-cols-3">
          <VisibilityRule icon={<Eye size={22} weight="light" />} title="Included">
            May appear in preview, export, QR code, and shared links.
          </VisibilityRule>
          <VisibilityRule icon={<LockKey size={22} weight="light" />} title="Private">
            Stays local. It never enters shared links or public exports.
          </VisibilityRule>
          <VisibilityRule icon={<EyeSlash size={22} weight="light" />} title="Omitted">
            Left out of preview, share, and export.
          </VisibilityRule>
        </div>
      </section>

      <section className="grid gap-6 py-12 md:grid-cols-[0.8fr_1.2fr] md:items-center">
        <h2 className="type-reading-heading text-parichay-heading">The promise</h2>
        <p className="type-lead text-parichay-muted">
          You decide what goes into the final envelope. We don't add private answers behind your back. The boundary you wrote for yourself stays right where you put it.
        </p>
      </section>
    </InfoShell>
  );
}

export function HowItWorksPage() {
  const useCases = [
    "A new manager or teammate needs the quick version of how you work.",
    "Someone close keeps misreading your silence, pace, or tone.",
    "A conversation matters, and you want to say things clearly before you are in it.",
    "You want a short intro page ready to send without making an account.",
  ];

  const steps = [
    "Choose who it's for.",
    "Answer guided questions.",
    "Review what gets shared.",
    "Send your intro.",
  ];

  const questions = [
    {
      title: "What is Parichay for?",
      text: "It helps you make a short intro page about how you work, communicate, and want to be understood.",
    },
    {
      title: "What stays private?",
      text: "Private answers stay in your tab. Omitted answers are left out. Only included answers can appear in a link or export.",
    },
    {
      title: "Do I need an account?",
      text: "No. Nothing is stored. Nothing is uploaded. You choose what leaves the page.",
    },
  ];

  return (
    <InfoShell
      eyebrow="How it works"
      title="Make the intro before the moment gets awkward."
      lead="Parichay helps you explain the important stuff once, then decide what is safe to send."
    >
      <section className="space-y-6 py-4">
        <h2 className="type-reading-heading text-parichay-heading">Use Parichay when...</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {useCases.map((item) => (
            <div key={item} className="rounded-md border border-parichay-border bg-parichay-surface px-5 py-5">
              <p className="type-body text-parichay-text">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-8 py-10 md:grid-cols-[0.7fr_1.3fr] md:items-start">
        <div className="space-y-3">
          <h2 className="type-reading-heading text-parichay-heading">How it works</h2>
          <p className="type-body text-parichay-muted">
            A guided draft becomes a short intro page. You stay in control the whole time.
          </p>
        </div>
        <ol className="grid gap-3">
          {steps.map((item, index) => (
            <li key={item} className="grid grid-cols-[3rem_1fr] items-center gap-4 rounded-md border border-parichay-border bg-parichay-surface px-4 py-4">
              <span className="type-meta text-parichay-muted">{String(index + 1).padStart(2, "0")}</span>
              <span className="type-body font-semibold text-parichay-heading">{item}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="grid gap-8 rounded-md border border-parichay-paper-border bg-parichay-paper px-6 py-7 md:grid-cols-[0.8fr_1.2fr] md:px-8 md:py-9">
        <div className="space-y-2">
          <p className="type-eyebrow text-parichay-sandal">Example intro</p>
          <h2 className="type-reading-heading text-parichay-heading">What people see</h2>
        </div>
        <div className="space-y-4">
          <p className="type-artifact-prose text-parichay-text">
            I do my clearest thinking in writing. If something feels urgent, send me the context first and I will come back with a better answer.
          </p>
          <p className="type-caption text-parichay-muted">
            Included answers only. Private notes stay out.
          </p>
        </div>
      </section>

      <section className="divide-y divide-parichay-border/60 py-6">
        {questions.map((item) => (
          <div key={item.title} className="grid gap-3 py-8 md:grid-cols-[0.8fr_1.2fr]">
            <h2 className="type-reading-heading text-parichay-heading">{item.title}</h2>
            <p className="type-lead text-parichay-muted">{item.text}</p>
          </div>
        ))}
      </section>
    </InfoShell>
  );
}

function InfoShell({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-parichay-bg">
      <section className="mx-auto max-w-5xl px-6 py-24 md:py-32 lg:py-40">
        <div className="mb-12 max-w-3xl space-y-5">
          <p className="type-eyebrow text-parichay-sandal">{eyebrow}</p>
          <h1 className="type-serif-title-page text-parichay-heading">{title}</h1>
          <p className="type-lead text-parichay-muted">{lead}</p>
        </div>
        <div className="space-y-10">{children}</div>
      </section>
    </div>
  );
}

function InfoCard({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="px-2 py-6 md:px-0 md:py-8">
      <div className="mb-6 text-parichay-muted">{icon}</div>
      <h2 className="type-reading-heading text-parichay-heading">{title}</h2>
      <p className="type-lead mt-4 text-parichay-muted">{children}</p>
    </section>
  );
}

function VisibilityRule({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="py-2">
      <div className="mb-4 text-parichay-muted">{icon}</div>
      <h3 className="type-panel-title text-parichay-heading">{title}</h3>
      <p className="type-caption mt-2 text-parichay-muted">{children}</p>
    </div>
  );
}
