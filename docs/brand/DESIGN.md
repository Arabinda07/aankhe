# Parichay Brand Design

## Design Position

Parichay is a warm private manual studio. It should feel calm, practical, and carefully made: sealed letters, sandal paper, smoked lac, rosewood ink, private manuals, and precise controls.

The brand is related to Reflections through restraint and privacy, but Parichay is more structured and artifact-led. Do not copy Reflections' botanical green brand, leaf identity, tone names, layouts, copy, icons, or motifs.

## Scene

A person is writing sensitive context at a desk, likely before a work conversation, care conversation, repair conversation, or handoff. They need clarity, privacy, and a useful document more than atmosphere.

This scene calls for a light warm interface with restrained color and strong readability.

## Color Strategy

Use a restrained product palette built from semantic tokens.

- Warm paper backgrounds.
- Soft tinted surfaces.
- Deep warm ink for text.
- Smoked lac for primary actions and selected states.
- Sandal for warmth, guidance, and explanation.
- Plum/private and hidden tokens for privacy state distinctions.
- Ember/danger for destructive, reset, warning, or caution states.

Color should guide action, state, and hierarchy. It should not decorate empty space.

## Token Roles

- `parichay-bg`: page background, warm paper.
- `parichay-surface`: primary panels and document surfaces.
- `parichay-surface-soft`: rails, selected surrounds, soft callouts.
- `parichay-text`: main ink.
- `parichay-muted`: secondary text with WCAG AA contrast.
- `parichay-border`: quiet dividers.
- `parichay-accent`: smoked lac action and selection.
- `parichay-accent-dark`: high-contrast deep lac text.
- `parichay-on-accent`: light text on accent surfaces.
- `parichay-sandal`: warm guidance and explanation.
- `parichay-private`: privacy and local-only state.
- `parichay-hidden`: omitted state.
- `parichay-danger`: destructive or caution state.
- Footer tokens keep the footer a deliberate dark close in both light and dark modes.

## Typography

Geist is the product face. Source Serif 4 is the editorial/manual face. Geist Mono is reserved for technical/privacy microcopy.

Use Geist for task surfaces and Source Serif 4 for moments where the manual should feel composed. Avoid Source Serif 4 in small controls, dense labels, or data-like status rows. Avoid Geist Mono except for URL hashes, timestamps, export metadata, and local-only technical details.

## Components

- Mode cards are wide, simple, and visibly selectable.
- Visibility controls pair text, icon, selected state, and screen-reader state.
- Storage mode controls must name what happens to the user's answers.
- Artifact surfaces should feel like a document, not a dashboard.
- Navigation and footer items must be real links or clearly non-interactive text.
- Footer links wrap horizontally at all widths and remain inside the dark footer band.
- The question builder should feel like a focused writing surface, not a configuration panel.
- Use `type-question-builder` for active builder prompts. Keep Source Serif 4 italic, but use restrained scale and readable measure.
- Before an answer exists, show the question, answer controls, quiet escape actions, and a short privacy reassurance only.
- After an answer exists, reveal optional nuance and collapsed visibility controls.
- Visibility controls may say Share, Private, and Hide. Explanation copy should say included, private, and omitted.
- Do not show Draft/Artifact segmented navigation on the focused question screen; use quiet preview/manual-return links instead.
- Do not add bottom progress dots or question shortcut rails to the focused question flow.

## Clutter Rules

- One primary action per area.
- Remove copy that repeats the heading.
- Prefer inline explanation to extra panels.
- Use cards only for real choices, repeated items, or framed tools.
- Never put cards inside cards.
- Do not add decorative metrics, badges, blobs, gradient text, or glassmorphism.
- Secondary question controls should not compete with answer choices.
- Escape actions and skip actions are text buttons, not boxed cards.
- Visibility explanation belongs behind disclosure unless the user asks to change visibility.

## Motion

Use motion only for state changes, reveals, and feedback. Keep transitions between 150 and 250ms for controls, and respect `prefers-reduced-motion`.

## Accessibility

Design for WCAG AA contrast, visible focus, named controls, semantic landmarks, reduced motion, keyboard access, and 44px touch targets.
