# Parichay Design System

## Core Aesthetic

A warm, calm, human-centric product system avoiding clinical lines, generic AI styling, and clutter. It feels like a premium private document studio: clear controls around a useful manual artifact.

Brand-level rules live in `docs/brand/`.

## Design Tokens

### Colors

- `parichay-bg`: warm paper background, defined in OKLCH.
- `parichay-surface`: soft panel surface, tinted instead of pure white.
- `parichay-surface-soft`: interaction states and highlights.
- `parichay-text`: deep warm ink.
- `parichay-muted`: secondary warm text, tuned for WCAG AA contrast.
- `parichay-border`: gentle dividers.
- `parichay-accent`: darker terracotta primary accent, tuned for WCAG AA with `parichay-on-accent`.
- `parichay-accent-dark`: deep contrast variation.
- `parichay-on-accent`: warm light text on primary accent surfaces.
- `parichay-sage`, `parichay-clay`, `parichay-oat`: supporting warmth and trust accents.
- `parichay-success`, `parichay-warning`, `parichay-danger`: semantic status colors expressed as Parichay tokens, not default Tailwind colors.

### Typography

- Primary Sans (`font-sans`): `Geist`, self-hosted from `public/fonts/Geist[wght].woff2`.
- Display/Serif (`font-display`, `font-serif`, `font-editor`): `Source Serif 4`, self-hosted from `public/fonts/SourceSerif4Variable-Roman.otf.woff2` and `SourceSerif4Variable-Italic.otf.woff2`.
- Technical Mono (`font-mono`): `Geist Mono`, self-hosted from `public/fonts/GeistMono[wght].woff2`.
- Use Geist for product controls, labels, dense UI, navigation, progress, metadata, and structure.
- Use Source Serif 4 for reflective prompts, answer fields, artifact titles, and manual prose.
- Use Geist Mono only for technical/privacy microcopy such as URL hashes, timestamps, export metadata, and local-only technical details.

### Interaction Standards

- **Wait Time:** 150-250ms for small interactions, 300-500ms for screen transitions.
- **Controls:** Scale inputs, soft selection chips, and segmented buttons should expose selected state semantically.
- **Targets:** Touch and navigation controls are at least 44px in their interactive dimension.
- **Elevation:** Shadows are avoided when possible. Surface layers are distinguished by 1px borders or subtle color shifts.
- **Focus:** Focus indicators must stay visible and high contrast.

## Component Standards

### Mode Cards

Wide, simple layouts summarizing the intent. Use clear borders and direct actions.

### Multi-Select And Option Chips

Use large, tappable `<button>` elements wrapped in flex layouts. Border and text states should communicate selection before heavy background fills.

### Visibility Controls

Use icon plus text to state exactly what will be included, private, or omitted. Selected state must be exposed semantically, not only visually.

### Storage Mode Controls

Copy must explain the consequence:

- Memory only: answers stay in browser memory.
- Save in link: answers are encoded into the URL.

### Artifact Canvas

Use generous padding and a centered document column. The artifact should feel like a readable manual, not a dashboard report.

## Clutter Rules

- One primary action per area.
- Avoid nested cards.
- Avoid repeated identical card grids.
- Avoid gradient text, decorative blobs, glass panels, and metric blocks.
- Use color for action, state, and trust, not empty decoration.

## Voice

Calm, clear, warm, non-judgmental. Not clinical, not manipulative, not gamified.

Use "Your manual will start taking shape here." instead of "No data generated."

Use "Your Story, Always Ready." only in title, meta, and social preview contexts.
