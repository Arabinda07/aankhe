/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ArrowRight, Eye, EyeSlash, LinkSimple, LockKey } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import type React from "react";

export function PrivacyPage() {
  return (
    <InfoShell
      eyebrow="Privacy"
      titleLines={{ main: "Nothing leaves", emphasis: "until you say so" }}
      lead="No accounts. No databases. Just a burner space in your browser. You control what stays and what goes."
    >
      <div className="grid gap-5 md:grid-cols-2">
        <InfoCard icon={<LockKey size={24} weight="light" />} title="Memory Only">
          Your answers live right here in this tab. Close it, refresh it, whatever—they disappear. We literally never see them.
        </InfoCard>
        <InfoCard icon={<LinkSimple size={24} weight="light" />} title="Save in Link">
          When you're ready, the answers you explicitly chose to share get squished into a web address. Anyone with that specific link can read it. Lose the link? It's gone.
        </InfoCard>
      </div>

      <section className="border-y border-ankahe-border bg-ankahe-surface/45 py-8">
        <h2 className="type-artifact-heading text-ankahe-text">What can leave the page</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
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

      <section className="grid gap-5 border-y border-ankahe-border py-8 md:grid-cols-[0.8fr_1.2fr] md:items-center">
        <h2 className="type-artifact-heading text-ankahe-text">The promise</h2>
        <p className="type-lead text-ankahe-muted">
          You decide exactly what makes it into the final envelope. We don't sneak anything extra in. Your weirdly specific boundary about texting stays exactly where you put it.
        </p>
      </section>
    </InfoShell>
  );
}

export function HowItWorksPage() {
  const items = [
    {
      title: "Why actually use this?",
      text: "Because people aren't mind readers. Whether it's a new boss, a new situationship, or a friend who keeps misreading your texts—handing them the cheat sheet saves everyone a lot of unnecessary friction.",
    },
    {
      title: "How do I use it?",
      text: "Treat it like your private notes app. Pick a category. Write the feral, unedited truth first. Then, decide what stays just for you and what actually makes it into the final link.",
    },
    {
      title: "Is this actually private?",
      text: "Yes. Nothing is saved to a server. We don't want your data, and we don't want your email. If you close this tab, your answers are gone forever. You only keep them if you generate a link or download the PDF.",
    },
    {
      title: "What do the buttons do?",
      text: "'Share' puts the answer in your final link. 'Private' keeps it visible only to you on your screen. 'Hide' tosses it entirely. You control the narrative.",
    },
  ];

  return (
    <InfoShell
      eyebrow="Why & How"
      titleLines={{ main: "Why are we", emphasis: "doing this?" }}
      lead="Because repeating yourself is exhausting. Here's the actual deal with how this works."
    >
      <div className="border-y border-ankahe-border">
        {items.map((item, index) => (
          <section
            key={item.title}
            className="grid gap-5 border-b border-ankahe-border py-7 last:border-b-0 md:grid-cols-[5rem_1fr] md:items-start md:py-8"
          >
            <span className="type-meta text-ankahe-muted">{String(index + 1).padStart(2, "0")}</span>
            <div className="space-y-2">
              <h2 className="type-artifact-heading text-ankahe-text">{item.title}</h2>
              <p className="type-lead whitespace-pre-wrap text-ankahe-muted">{item.text}</p>
            </div>
          </section>
        ))}
      </div>

      <section className="border-t border-ankahe-border py-14 md:py-20">
        <div className="mx-auto max-w-xl text-center space-y-6">
          <p className="type-eyebrow text-ankahe-sandal">Begin</p>
          <h2 className="type-panel-title text-ankahe-text text-lg md:text-xl">
            Start with the manual that fits the conversation
          </h2>
          <Link
            to="/"
            className="type-ui-label inline-flex min-h-12 items-center justify-center gap-3 rounded-md bg-ankahe-accent px-8 py-3 text-ankahe-on-accent transition-colors hover:bg-ankahe-accent-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ankahe-accent focus-visible:ring-offset-2"
          >
            Pick who this is for
            <ArrowRight size={18} weight="light" />
          </Link>
        </div>
      </section>
    </InfoShell>
  );
}

function InfoShell({
  eyebrow,
  title,
  titleLines,
  lead,
  children,
}: {
  eyebrow: string;
  title?: string;
  titleLines?: {
    main: string;
    emphasis: string;
  };
  lead: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-ankahe-bg">
      <section className="mx-auto max-w-5xl px-6 py-24 md:py-32 lg:py-40">
        <div className="mb-12 max-w-3xl space-y-5">
          <p className="type-eyebrow text-ankahe-sandal">{eyebrow}</p>
          {titleLines ? (
            <h1 className="type-mixed-heading type-mixed-heading-page text-ankahe-text">
              <span className="type-mixed-heading-main">{titleLines.main}</span>
              <span className="type-mixed-heading-emphasis">{titleLines.emphasis}</span>
            </h1>
          ) : (
            <h1 className="type-display text-ankahe-text">{title}</h1>
          )}
          <p className="type-lead text-ankahe-muted">{lead}</p>
        </div>
        <div className="space-y-6">{children}</div>
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
    <section className="rounded-md border border-ankahe-border bg-ankahe-surface px-6 py-7">
      <div className="mb-5 text-ankahe-muted">{icon}</div>
      <h2 className="type-artifact-heading text-ankahe-text">{title}</h2>
      <p className="type-lead mt-3 text-ankahe-muted">{children}</p>
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
    <div className="rounded-sm border border-ankahe-border bg-ankahe-bg px-4 py-5">
      <div className="mb-3 text-ankahe-muted">{icon}</div>
      <h3 className="type-panel-title text-ankahe-text">{title}</h3>
      <p className="type-caption mt-2 text-ankahe-muted">{children}</p>
    </div>
  );
}
