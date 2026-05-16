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
      <div className="grid gap-8 md:grid-cols-2">
        <InfoCard icon={<LockKey size={24} weight="light" />} title="Memory Only">
          Your answers live in this tab. Close it or refresh it and they disappear. Generate a link or export before you leave if you want to keep them.
        </InfoCard>
        <InfoCard icon={<LinkSimpleHorizontal size={24} weight="light" />} title="Save in Link">
          Only answers marked Share are compressed into the link. Anyone with that link can read those included answers. Lose the link and it's gone.
        </InfoCard>
      </div>

      <section className="px-2 py-12 md:px-8">
        <h2 className="type-reading-heading text-parichay-heading">What can leave the page</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
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

      <section className="grid gap-12 py-12 md:grid-cols-[0.8fr_1.2fr] md:items-center">
        <h2 className="type-reading-heading text-parichay-heading">The promise</h2>
        <p className="type-body text-parichay-muted">
          You decide what goes into the final envelope. We don't add private answers behind your back. The boundary you wrote for yourself stays right where you put it.
        </p>
      </section>
    </InfoShell>
  );
}

export function HowItWorksPage() {
  const useCases = [
    "You are joining a new team and want people to know how to work with you.",
    "A friend or partner keeps misreading your quiet, pace, or tone.",
    "A conversation needs context before it gets messy.",
    "Someone wants to support you, but you do not want to explain it all again.",
  ];

  const steps = [
    "Choose who the intro page is for.",
    "Answer guided questions in plain language.",
    "Review what is included, private, or omitted.",
    "Send a link, save an export, or keep it for yourself.",
  ];

  const commonQuestions = [
    {
      title: "Do I have to finish it all at once?",
      text: "No. You can answer the questions that matter right now and leave the rest out.",
    },
    {
      title: "Can I use this for work and personal life?",
      text: "Yes. Pick the starting point that fits the person reading it. A teammate may need different context than someone close.",
    },
    {
      title: "Will it tell me who I am?",
      text: "No. You write the answers. Parichay helps shape them into a short intro page you can review before sharing.",
    },
    {
      title: "What if something feels too personal?",
      text: "Mark it Private, Hide it, or skip the question. The intro page should feel useful, not exposing.",
    },
  ];

  return (
    <InfoShell
      eyebrow="How it works"
      title="A clearer way to introduce yourself."
      lead="Parichay helps you make a short intro page for how you work, communicate, and want to be understood."
    >
      <section className="grid gap-12 py-8 md:grid-cols-[0.75fr_1.25fr] md:items-start">
        <h2 className="type-reading-heading text-parichay-heading">What is Parichay?</h2>
        <div className="space-y-4">
          <p className="type-body text-parichay-muted">
            Parichay is a private intro page.
          </p>
          <p className="type-body text-parichay-muted">
            It helps people understand how to work with you, talk to you, or support you. You answer a few guided questions, choose what people can see, and turn the useful parts into a short intro page.
          </p>
        </div>
      </section>

      <section className="space-y-6 border-t border-parichay-border/60 py-12">
        <h2 className="type-reading-heading text-parichay-heading">Use Parichay when...</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {useCases.map((item) => (
            <div key={item} className="rounded-md border border-parichay-border bg-parichay-surface px-6 py-7">
              <p className="type-body text-parichay-text">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-8 rounded-md border border-parichay-paper-border bg-parichay-paper px-6 py-7 md:grid-cols-[0.8fr_1.2fr] md:px-8 md:py-9">
        <div className="space-y-3">
          <p className="type-eyebrow text-parichay-sandal">Example finished intro</p>
          <h2 className="type-reading-heading text-parichay-heading">What someone might read</h2>
          <p className="type-caption text-parichay-muted">
            Short, specific, and only made from answers you chose to include.
          </p>
        </div>
        <div className="space-y-4">
          <p className="type-artifact-prose text-parichay-text">
            I do my clearest thinking in writing. If something is urgent, send me the context first and I will come back with a cleaner answer. I appreciate directness when it is kind, and I sometimes need a little time before I can respond well.
          </p>
          <p className="type-caption text-parichay-muted">
            Included answers can be shared. Private answers stay here. Omitted answers are left out.
          </p>
        </div>
      </section>

      <section className="grid gap-8 border-t border-parichay-border/60 py-12 md:grid-cols-[0.7fr_1.3fr] md:items-start">
        <div className="space-y-3">
          <h2 className="type-reading-heading text-parichay-heading">How it works</h2>
          <p className="type-body text-parichay-muted">
            The shape is simple: answer, review, share only what you meant to share.
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

      <section className="grid gap-4 border-t border-parichay-border/60 py-12 md:grid-cols-2">
        <InfoCard icon={<Eye size={24} weight="light" />} title="Is this a personality test?">
          No. Parichay does not score you, sort you, or tell you what type of person you are. It turns your own words into an intro page that is easier for someone else to read.
        </InfoCard>
        <InfoCard icon={<LockKey size={24} weight="light" />} title="Is this therapy?">
          No. It is a writing tool for introductions and context. It can help you say something clearly, but it does not replace care, advice, or support from a real person.
        </InfoCard>
      </section>

      <section className="grid gap-12 border-t border-parichay-border/60 py-12 md:grid-cols-[0.75fr_1.25fr] md:items-start">
        <h2 className="type-reading-heading text-parichay-heading">Privacy in plain language</h2>
        <div className="space-y-4">
          <p className="type-body text-parichay-muted">
            No accounts. No database. Your answers stay in this browser unless you create a link or export.
          </p>
          <p className="type-body text-parichay-muted">
            Nothing is stored. Nothing is uploaded. You choose what leaves the page.
          </p>
        </div>
      </section>

      <section className="border-t border-parichay-border/60 py-12">
        <div className="mb-8 max-w-2xl space-y-3">
          <h2 className="type-reading-heading text-parichay-heading">Share / Private / Hide</h2>
          <p className="type-body text-parichay-muted">
            Only answers marked Share are included in links and exports. Private answers stay in this browser. Hidden answers are omitted from the intro page.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <VisibilityRule icon={<Eye size={22} weight="light" />} title="Share">
            Included in the intro page, link, and export.
          </VisibilityRule>
          <VisibilityRule icon={<LockKey size={22} weight="light" />} title="Private">
            Kept here for your own reference.
          </VisibilityRule>
          <VisibilityRule icon={<EyeSlash size={22} weight="light" />} title="Hide">
            Left out completely.
          </VisibilityRule>
        </div>
      </section>

      <section className="grid gap-8 border-t border-parichay-border/60 py-12 md:grid-cols-[0.75fr_1.25fr] md:items-start">
        <div className="space-y-2">
          <h2 className="type-reading-heading text-parichay-heading">Modes and templates</h2>
          <p className="type-body text-parichay-muted">
            You do not need to start from a blank page.
          </p>
        </div>
        <div className="space-y-4">
          <p className="type-body text-parichay-muted">
            Parichay asks different questions depending on who the intro page is for. A work intro might ask about feedback, pace, and meetings. A closer intro might ask about reassurance, conflict, or what helps you feel understood.
          </p>
          <p className="type-body text-parichay-muted">
            These are starting points, not boxes. You can skip anything, keep answers private, or leave whole sections out.
          </p>
        </div>
      </section>

      <section className="divide-y divide-parichay-border/60 border-t border-parichay-border/60 py-6">
        <div className="py-8">
          <h2 className="type-serif-title-page text-parichay-heading">Common questions</h2>
        </div>
        {commonQuestions.map((question) => (
          <div key={question.title} className="grid gap-3 py-8 md:grid-cols-[0.8fr_1.2fr]">
            <h3 className="type-reading-heading text-parichay-heading">{question.title}</h3>
            <p className="type-body text-parichay-muted">{question.text}</p>
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
        <div className="space-y-12">{children}</div>
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
    <section className="rounded-md border border-parichay-border bg-parichay-surface px-6 py-7">
      <div className="mb-6 text-parichay-muted">{icon}</div>
      <h2 className="type-reading-heading text-parichay-heading">{title}</h2>
      <p className="type-body mt-4 text-parichay-muted">{children}</p>
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
    <div className="rounded-md border border-parichay-border bg-parichay-surface px-6 py-7">
      <div className="mb-4 text-parichay-muted">{icon}</div>
      <h3 className="type-panel-title text-parichay-heading">{title}</h3>
      <p className="type-caption mt-2 text-parichay-muted">{children}</p>
    </div>
  );
}
