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
      title: "Where do my answers actually live once I type them?",
      text: "It depends entirely on the mode you pick before you start writing. In 'Memory Only' mode, your words exist solely in your browser's active memory. The moment you close the tab, refresh the page, or navigate away, everything is permanently gone. We don't have a server to save them to, even if we wanted to.\n\nIf you choose 'Save in Link', things work differently. We take the text you write, compress it, and tuck it directly into the web address—the URL itself. That means your data is stored inside the link, not in a database. You can bookmark that long link to return to your work later. Just know that if you lose the link, you lose the answers. We have no way to recover them for you.",
    },
    {
      title: "What does marking an answer as 'Private' actually do?",
      text: "When you mark an answer as 'Private', you're drawing a hard boundary. Sometimes you need to write out the messy, unfiltered version of a thought before you can figure out what you actually want to communicate. 'Private' gives you the space to do that safely.\n\nThose specific private answers never leave your device. If you're using 'Save in Link' mode, your private notes are deliberately excluded from the URL compression process. They will never appear when you export a PDF, they won't show up in a generated QR code, and if you send your link to someone else, the private sections simply won't exist for them. They remain entirely for your eyes only.",
    },
    {
      title: "Exactly what gets shared when I send a link or export?",
      text: "You are entirely in control of what makes it into the final document. The only things that get shared are the specific answers you explicitly decide to 'Share'. Everything else is left behind.\n\nWhen you generate a link to send to someone, or when you export your manual as a PDF, only those included answers are bundled up. Think of the workspace as your drafting table, and the final manual as the polished document you hand to a friend. You get to decide exactly which pieces make it into the envelope. We don't sneak anything extra in.",
    },
    {
      title: "What is the point of the 'Hide' option if we already have 'Private'?",
      text: "You might be wondering why we have both 'Hide' and 'Private'. It comes down to intent. You use 'Private' for sensitive context you want to keep visible for your own reference while you work.\n\nYou use 'Hide' for things you just don't need anymore. Maybe you started answering a prompt, realized you were going off-topic, and decided to scrap it. Instead of forcing you to delete the text completely, 'Hide' simply omits it. The omitted answer is tucked out of sight. It won't clutter up your preview, and it certainly won't make it into the final shared manual.",
    },
    {
      title: "Do I need to create an account or sign in?",
      text: "No, and we will never ask you to create one. We don't ask for your email address, we don't require a password, and we don't use analytics to track your behavior.\n\nThe reason is simple: we don't have a database to store your information in the first place. Ankahe is designed as a standalone tool that runs entirely inside your web browser. When you load the page, you download the application, and from that point on, you're just writing on a blank digital piece of paper. You own your words. We never see them, and we don't want to.",
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
              <p className="type-lead whitespace-pre-wrap text-ankahe-muted">{item.text}</p>
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
