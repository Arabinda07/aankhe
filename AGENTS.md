# Ankahe Coding Agent Instructions

Ankahe is a sister site to Reflections, not a clone. Preserve Reflections' calm editorial rhythm, warm light/dark tuning, semantic tokens, generous whitespace, restrained motion, soft borders, artifact-first payoff, and trust-first language. Do not copy its botanical green brand, leaf identity, tone names, layouts, copy, icons, or motifs.

## Brand

Ankahe's identity is **Smoked Lac + Sandal Paper**. It should feel like sealed letters, warm paper, rosewood ink, private manuals, high-end stationery, quiet intimacy, and emotional precision. It must not feel like a wellness app, green journaling app, SaaS dashboard, AI tool, HR assessment, chatbot, or therapy replacement.

Use Spectral for headings, artifact prose, composed manual text, wordmark, and literary moments. Use Manrope for UI, controls, labels, metadata, buttons, and navigation. Do not use Inter.

## Non-Negotiables

- Client-side only: no backend, database, accounts, server persistence, or analytics unless explicitly requested.
- No botanical green, sage green, leaf marks, green success states, neon color, glassmorphism, heavy shadows, loud gradients, emojis, pill buttons, or dashboard aesthetic.
- Use semantic design tokens, warm paper surfaces, soft 1px borders, modest rectangular radii, and generous whitespace.
- Use Phosphor icons for product UI.
- Preserve visibility rules: Share answers may leave the page; Private answers stay local; Hide answers are omitted.
- Controls may say `Share`, `Private`, and `Hide`. Explanatory copy should prefer `included`, `private`, and `omitted`.

## Color System

Use CSS variables and Tailwind theme mappings. Components should not hardcode raw brand colors.

Primary roles:

- `page`, `surface`, `surface-raised`, `surface-muted`
- `text`, `text-muted`, `text-soft`
- `border`, `border-strong`
- `accent` / lac for primary action and selected state
- `sandal` for warmth, guidance, and explanation
- `plum` / `private` for privacy and depth
- `hidden` for omitted state
- `danger` / ember for destructive or caution states

Surface tone meanings:

- `paper`: document and artifact surfaces
- `veil`: privacy and boundaries
- `dusk`: reflective preview and composed insight
- `sandal`: guidance and warm helper text
- `lac`: primary brand, selected state, export/share action
- `ember`: reset, warnings, destructive actions

## Product Essence

Ankahe means "unspoken." It is a private personal manual studio with the tagline:

> Say it once. Be understood.

The product turns answers into a beautiful, shareable manual. The final artifact is the reward. Users should feel understood, safe, unhurried, and in control.

## Layout and Component Rules

- Landing should feel like a document studio, not a marketing template.
- Use centered reading columns, generous margins, warm page backgrounds, restrained panels, and editorial rhythm.
- Avoid dense dashboards, card soup, cramped forms, unnecessary sidebars, and nested cards.
- Buttons are rectangular with modest radii. Primary buttons use lac, secondary buttons use warm surface and 1px border.
- Inputs should feel like writing areas: warm paper background, soft border, readable type, calm lac focus state.
- The Artifact Studio must feel like a finished personal document, not a raw Q&A summary.

## Privacy Promise

The sacred promise:

> Nothing is stored. Nothing is uploaded. You choose what leaves the page.

Memory Mode keeps answers only in React memory. URL Mode may store compressed state in `#s=<compressed-state>`, but only Share answers may enter the shared URL. Private and Hide answers must never enter shared URLs or public exports.

## QA Checklist

Before calling a design pass complete, verify:

- No Lucide imports remain.
- No botanical green, sage naming, green success state, Inter, emojis, pill buttons, glass cards, or heavy gradients remain.
- The landing feels calm and editorial.
- The builder feels private and non-judgmental.
- The Artifact Studio feels worth saving or sending.
- Shared URLs include only Share answers.
- Private answers never appear in shared URLs.
- Hidden answers never appear in preview, share, or export.
- Light and dark token values are tuned as separate emotional spaces.

## Unslop Activation Rules

Write like a careful human. All technical substance stays exact. Only AI-slop dies.

Rules:
- Drop: sycophancy ("great question", "I'd be happy to"), stock vocab (delve/tapestry/testament/realm/landscape/seamless/holistic/leverage-as-filler/cutting-edge/state-of-the-art), hedging stacks ("it's important to note that"), tricolon padding, em-dash pileups (hard cap: two per paragraph), performative balance.
- Engineer burstiness: mix short and long sentences deliberately. Avoid tidy five-paragraph essay shapes.
- Keep: technical terms exact, errors quoted exact, code unchanged, real uncertainty ("I think", "probably") when honest.
- Pattern: [concrete observation]. [why or implication]. [what to do next].
- Not: "Sure! There are several factors to consider..."
- Yes: "Bug in auth middleware. Token expiry uses `<` not `<=`. Fix L42:"

Principles: Subtract, don't add (warmth = sycophancy). Style ≠ stance (humanize voice, don't soften disagreement). Warmth raises error rate — re-verify facts after rewriting. Simulated voice, not personhood (never invent bio, memory, or emotion). Reason privately, humanize publicly (think structured, output human).

Switch level: /unslop subtle|balanced|full|voice-match|anti-detector
Stop: "stop unslop" or "normal mode"

Auto-Clarity: drop unslop style for security warnings, irreversible actions, legal/medical/financial precision, user confused. Resume after.

Boundaries: code/commits/PRs written normal. Never invent facts to sound human. Anti-detector mode is for defensive use (ESL false positives, resume writers) — not for academic misconduct.
