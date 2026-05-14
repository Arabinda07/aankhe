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
      titleLines={{ main: "Nothing leaves", emphasis: "until you choose" }}
      lead="Ankahe runs entirely in your browser. You have complete control over what gets included, what stays private, and what gets tossed out."
    >
      <div className="grid gap-5 md:grid-cols-2">
        <InfoCard icon={<LockKey size={24} weight="light" />} title="Memory Only">
          Your answers live right here in this tab's memory. If you close or refresh the page, they disappear. We never see them.
        </InfoCard>
        <InfoCard icon={<LinkSimple size={24} weight="light" />} title="Save in Link">
          If you want to share your manual, the answers you included get compressed directly into the web address. Anyone who has that specific link can read it.
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
          No accounts. No databases. No analytics trackers looking over your shoulder. Your manual only becomes shareable the exact moment you decide to generate a link or export a PDF.
        </p>
      </section>
    </InfoShell>
  );
}

export function HowItWorksPage() {
  const items = [
    {
      title: "Where do my answers live?",
      text: "If you're in Memory Only mode, they live right here in this browser tab. Close it, and they vanish. If you choose 'Save in Link', the answers you mark as 'Included' get compressed straight into the URL so you can open them later.",
    },
    {
      title: "What does 'Private' actually do?",
      text: "Private means private. Those answers stay on your device. They might help you think through a problem, but they will never end up in a shared link, a QR code, or an exported PDF.",
    },
    {
      title: "What gets shared?",
      text: "Only the answers you explicitly mark as 'Share'. That's it. Those are the ones that show up when you send someone a link or download the manual.",
    },
    {
      title: "What's the point of 'Hide'?",
      text: "Sometimes you write an answer and realize you don't actually want to include it. 'Hide' just leaves it out completely. It's skipped in the final manual.",
    },
    {
      title: "Do I need an account?",
      text: "No. We don't have a database, and we don't track you. You're just writing on a blank page in your browser.",
    },
  ];

  return (
    <InfoShell
      eyebrow="FAQ"
      titleLines={{ main: "Before you write", emphasis: "a few honest answers" }}
      lead="Ankahe is small on purpose. Write your manual, decide what actually belongs in it, and only share the parts you want people to read."
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
              <p className="type-lead text-ankahe-muted">{item.text}</p>
            </div>
          </section>
        ))}
      </div>

      <section className="border-y border-ankahe-border bg-ankahe-sandal-soft/45 py-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl space-y-2">
            <p className="type-eyebrow text-ankahe-sandal">Begin</p>
            <h2 className="type-artifact-heading text-ankahe-text">Start with the manual that fits the conversation</h2>
          </div>
          <Link
            to="/"
            className="type-ui-label inline-flex min-h-12 items-center justify-center gap-3 rounded-md bg-ankahe-accent px-6 py-3 text-ankahe-on-accent transition-colors hover:bg-ankahe-accent-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ankahe-accent focus-visible:ring-offset-2"
          >
            Choose a manual
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
      <section className="mx-auto max-w-5xl px-6 py-16 md:py-24">
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
