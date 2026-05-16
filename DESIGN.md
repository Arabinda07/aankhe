# Parichay Design System

## 1. Visual Theme & Atmosphere

Parichay is a private intro-page studio. It turns careful answers into a finished artifact that feels worth saving or sending. The atmosphere is warm, exact, and intimate: sealed letters, sandal paper, smoked lac, rosewood ink, private notes, composed manuals, high-end stationery, and emotional precision.

Parichay is a sister site to Reflections, not a clone. Preserve Reflections' calm editorial rhythm, semantic tokens, generous whitespace, restrained motion, soft borders, artifact-first payoff, and trust-first language. Do not copy Reflections' botanical green brand, leaf identity, tone names, layouts, copy, icons, or motifs.

- **Product feeling:** private intro page, document studio, composed artifact.
- **Density:** daily app balanced, with airy reading surfaces and focused controls.
- **Variance:** centered reading columns for long text, asymmetric split composition for setup and builder views.
- **Motion:** restrained state feedback, never cinematic or playful.
- **Primary promise:** Nothing is stored. Nothing is uploaded. You choose what leaves the page.
- **Tagline:** Your Story, Always Ready.

Never let the product feel like a wellness app, green journaling app, SaaS dashboard, AI tool, HR assessment, chatbot, or therapy replacement.

## 2. Color Palette & Token Roles

Use CSS variables and Tailwind theme mappings. Components must use semantic token classes instead of raw brand colors. Add a new token only when a real semantic role is missing.

### Core Surface Tokens

- **`page` / `parichay-bg`**: full-page warm paper background.
- **`surface` / `parichay-surface`**: main panels, site chrome, side controls.
- **`surface-raised`**: subtly lifted warm surface when a layer needs more presence.
- **`surface-muted` / `parichay-surface-soft`**: rails, selected surrounds, progress tracks, soft callouts.
- **`surface-translucent`**: restrained translucent overlays only when the underlying page remains quiet.
- **`surface-preview`**: reflective preview shells around artifact canvases.
- **`paper` / `parichay-paper`**: document and artifact surfaces.
- **`paper-muted`**: inset document callouts and low-emphasis artifact panels.
- **`paper-border`**: document-specific 1px dividers and artifact frames.

### Text Tokens

- **`text` / `parichay-text`**: primary ink for headings, body, controls, and artifact prose.
- **`text-muted` / `parichay-muted`**: secondary text, descriptions, helper copy, metadata. Must remain WCAG AA against its surface.
- **`text-soft`**: tertiary hints or supporting metadata when `text-muted` is too strong.
- **Opacity rule:** prefer dedicated text tokens. Use opacity suffixes only for intentionally lower-stakes metadata, such as `text-parichay-muted/70` in artifact footers.

### Border And Focus Tokens

- **`border` / `parichay-border`**: default soft structural line.
- **`border-strong` / `parichay-border-strong`**: hover borders, active outlines, or stronger choice separation.
- **`focus` / `parichay-focus`**: visible focus rings. Do not remove focus rings for visual cleanliness.

### Action, Privacy, And State Tokens

- **`accent` / `parichay-accent`**: smoked lac. Use for primary actions, selected state borders, progress fill, important icon color, and export/share emphasis.
- **`accent-hover` / `parichay-accent-dark`**: deeper lac for hover and high-contrast accent text.
- **`accent-soft` / `parichay-accent-soft`**: selected backgrounds and safe-to-send callouts.
- **`on-accent` / `parichay-on-accent`**: text on lac-filled controls.
- **`sandal` / `sandal-soft`**: warm guidance, explanation, and low-pressure helper states.
- **`plum` / `private` / `private-soft`**: privacy and depth. Use when distinguishing local/private state from shareable state.
- **`hidden` / `hidden-soft`**: omitted state. Use for hidden or excluded content, not success.
- **`danger` / `danger-soft`**: destructive, reset, corrupted link, or caution states.

### Light And Dark Tuning

Light mode should feel like warm paper in natural light: calm, readable, high-trust. Dark mode should feel like a closed desk at night: deep warm ink, rosewood, low glare, and still-readable contrast.

- Tune light and dark separately. Do not simply invert colors.
- Avoid pure black. Use warm off-black or tokenized dark surfaces.
- Avoid generic Tailwind green, emerald, lime, blue, purple, slate, zinc, or red in components.
- Avoid botanical green and sage naming in new docs or UI. If legacy code references older support accents, migrate future language to sandal, plum, hidden, private, lac, and ember/danger roles.

### Core Color Values (OKLCH)

| Role | Light Value | Note |
|---|---|---|
| `parichay-page` | `oklch(0.96 0.012 60)` | Main background |
| `parichay-surface` | `oklch(0.983 0.012 68)` | Component background |
| `parichay-paper` | `oklch(0.982 0.011 68)` | Artifact background |
| `parichay-text` | `oklch(0.239 0.02 357)` | Main text |
| `parichay-border` | `oklch(0.886 0.026 52)` | Soft structural line |
| `parichay-accent` | `oklch(0.477 0.109 7)` | Smoked lac |
## 3. Typography Rules

- Use the locally hosted fonts from `public/fonts`.

- **Geist:** UI, structure, navigation, buttons, labels, captions, metadata, choice cards, privacy controls, progress text, and product chrome.
- **Source Serif 4:** reflective prompts, question text, answer fields, generated manual prose, artifact reading surfaces, editorial hooks, and human/authored text.
- **Geist Mono:** technical/privacy microcopy only: URL hashes, timestamps, export metadata, and local-only technical details.
- **Banned:** Inter, generic system-only typography for branded surfaces, remote font imports, and undeclared font weights.
- **Geist weights available:** variable 100-900 plus static files.
- **Source Serif 4 weights available:** variable roman and italic.
- **Geist Mono weights available:** variable 100-900 plus static files.
- **Letter spacing:** keep at `0` for most text. Use positive uppercase tracking only for eyebrow/meta styles.

### Canonical Type Classes

Use these classes before inventing ad hoc font sizes. Parichay uses a strict 5-step mathematical scale (1.25 ratio) above a 1rem base.

| Class | Font | Scale Step | Size | Weight | Line Height | Use |
| --- | --- | ---: | ---: | ---: | ---: | --- |
| `type-serif-title` | Source Serif 4 italic | Step 5 | `clamp(3.052rem, 8vw, 4.768rem)` | 650 | 1.1 | Landing hero title |
| `type-display` | Geist | Step 5 | `clamp(3.052rem, 8vw, 4.768rem)` | 800 | 0.96 | Major structural page titles |
| `type-mode-title` | Geist | Step 5 | `clamp(3.052rem, 8vw, 4.768rem)` | 800 | 0.96 | Mode selection titles |
| `type-serif-title-page` | Source Serif 4 italic | Step 4 | `clamp(2.441rem, 6vw, 3.815rem)` | 650 | 1.1 | Info page titles |
| `type-artifact-title` | Source Serif 4 | Step 4 | `clamp(2.441rem, 6vw, 3.815rem)` | 650 | 1.02 | Manual title |
| `type-question` | Source Serif 4 italic | Step 4 | `clamp(2.441rem, 6vw, 3.815rem)` | 400 | 1.05 | Active form question |
| `type-question-builder` | Source Serif 4 italic | Step 3 | `clamp(1.953rem, 5vw, 2.441rem)` | 400 | 1.14 | Focused builder question prompt |
| `type-artifact-heading` | Source Serif 4 | Step 2 | 1.5625rem | 650 | 1.12 | Artifact section headings |
| `type-reading-heading` | Source Serif 4 | Step 2 | 1.5625rem | 650 | 1.12 | Info page section headings |
| `type-answer-field` | Source Serif 4 | Step 2 | 1.5625rem | 400 | 1.45 | Main writing inputs |
| `type-artifact-prose` | Source Serif 4 | Step 1 | 1.25rem | 400 | 1.78 | Manual paragraphs and composed prose |
| `type-lead` | Geist | Step 1 | 1.25rem | 400 | 1.65 | Intro copy and explanation |
| `type-body` | Geist | Step 0 | 1rem | 400 | 1.65 | Standard UI body |
| `type-choice` | Geist | Step 0 | 1rem | 600 | 1.375 | Choice card and option button labels |
| `type-ui-label` | Geist | Step -1 | 0.8rem | 700 | 1.2 | Buttons, labels, nav |
| `type-panel-title` | Geist | Step -1 | 0.8rem | 700 | 1.25 | Panel headings |
| `type-eyebrow` | Geist | Step -1 | 0.8rem | 800 | 1.2 | Uppercase section markers |
| `type-caption` | Geist | Step -1 | 0.8rem | 500 | 1.45 | Supporting text, chips, small descriptions |
| `type-meta` | Geist | Step -1 | 0.8rem | 700 | 1.2 | Uppercase metadata and counters |
| `type-footer-nav` | Geist | Step -1 | 0.8rem | 800 | 1.2 | Footer links |

### Typography Usage

- Use Source Serif 4 for what the user is writing or reading as a manual, and for editorial info pages (FAQ, Privacy) where the user is reading authored explanatory content.
- Use Geist for every control the user clicks, toggles, copies, exports, or navigates with.
- Use Geist Mono only for technical/privacy microcopy, not normal captions or metadata.
- Do not use hero-scale type inside cards, sidebars, chips, buttons, or compact panels.
- Keep prose columns readable: body and artifact prose should generally stay near 60-65 characters per line.
- Use `type-tabular` for counters, dates, step numbers, URL length, and scale values.
- Use `type-choice` for choice card and option button labels instead of ad hoc font utilities.

## 4. Layout & Spacing System

Parichay should feel like a private document studio, not a marketing template or dashboard. Layouts should give the intro and finished artifact room to breathe while keeping choices easy to scan.

### Page Shells

- **Global app shell:** `min-h-[100dvh] flex flex-col font-sans`.
- **Main page width:** use `max-w-7xl mx-auto px-6` for app-scale surfaces.
- **Info page width:** use `max-w-5xl mx-auto px-6 py-16 md:py-24`.
- **Landing setup:** use a split composition similar to `lg:grid-cols-[minmax(0,0.82fr)_minmax(420px,1fr)]`.
- **Builder:** use `lg:grid-cols-[1fr_450px]` for draft plus live preview.
- **Artifact Studio:** use `lg:grid-cols-[1fr_400px]` for document plus controls.

### Spacing Cadence

Parichay uses semantic spacing tokens based on a 4px scale, available in CSS variables and Tailwind extensions (`p-space-md`, `gap-space-xl`).

- `--space-xs`: 0.25rem (4px)
- `--space-sm`: 0.5rem (8px)
- `--space-md`: 0.75rem (12px)
- `--space-lg`: 1rem (16px)
- `--space-xl`: 1.5rem (24px)
- `--space-2xl`: 2rem (32px)
- `--space-3xl`: 3rem (48px)
- `--space-4xl`: 4rem (64px)
- `--space-5xl`: 6rem (96px)

Preferred repeatable values:

- **Inline page padding:** `px-6`; header may use `px-3 sm:px-6`.
- **Panel padding:** `p-4`, `p-5`, `p-6`, `p-8`.
- **Artifact padding:** `p-8 md:p-14 lg:p-16` for document canvas; `p-7 md:p-9` or `p-8 md:p-12` for artifact callouts.
- **Major vertical rhythm:** `space-y-8`, `space-y-12`, `space-y-16`, `space-y-20`.
- **Macro-whitespace:** `py-24`, `py-32`, `py-40` for major section pacing to enforce an unhurried, editorial reading rhythm.
- **Control gaps:** `gap-2`, `gap-3`, `gap-4`.
- **Grid gaps:** `gap-3` for choices, `gap-8 md:gap-16` for artifact sections, `gap-12` for main two-column layouts.

### Responsive Rules

- All multi-column layouts must collapse to one column below `lg` unless the current component already uses a proven `sm:grid-cols-2` choice layout.
- No horizontal scrolling on mobile.
- Controls wrap instead of shrinking below 44px height.
- Sticky sidebars are desktop-only and must not cover content.
- Use `min-h-[100dvh]`, not `h-screen`.

## 5. Radius, Borders, Elevation & Surfaces

Parichay uses modest rectangular geometry. The design may be soft, but it must not become pill-shaped or bubbly.

### Radius Rules

- **`rounded-sm` (2px):** chips, segmented control buttons, choice buttons, inputs, document callouts, compact panels.
- **`rounded-md` (6px):** primary buttons, icon buttons, brand tile, document shell, small menus.
- **`rounded-lg` (8px):** main setup panels and major app panels.
- **`rounded-xl` (12px):** preview frames only, where a larger enclosing shell needs visible separation.
- **Double-Bezel Architecture:** when creating deep, nested panels (like the ManualPreview shell), use calculated concentric radii: `rounded-bezel-outer` for the outer shell and `rounded-bezel-inner` for the inner core.
- **Avoid:** `rounded-full` and pill buttons. Use only if a future component has a proven non-brand reason (e.g., standard avatars). Never use pill buttons for navigation or primary actions.

### Borders

- Default to 1px tokenized borders: `border border-parichay-border` or `border border-parichay-paper-border`.
- Use stronger borders for hover or selected states: `border-parichay-border-strong` or `border-parichay-accent`.
- Do not use thick decorative strokes or gradient border shells.

### Elevation

- Prefer border, surface contrast, and whitespace over shadows.
- Acceptable shadows:
  - `shadow-sm` for selected segmented buttons and small raised controls.
  - Lac-tinted soft shadow for primary buttons or artifact frames only.
  - Menu shadow may use a low-opacity tokenized text or accent color.
  - **Optical Inner Highlights:** use `shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]` (tuned for dark mode) or similar subtle insets on Double-Bezel inner cores to create a machined, physical hardware feel.
- Avoid heavy drop shadows, glass cards, blurred panels, neon glows, or dramatic depth.

## 6. Component Stylings

### Buttons

Use `SoftButton` for standard action buttons.

- **Shape:** `rounded-md`, never pill.
- **Base:** inline-flex, centered, `gap-3`, `font-semibold`, visible focus ring.
- **Minimum heights:** small `min-h-11`, medium `min-h-12`, large `min-h-14`.
- **Primary:** `bg-parichay-accent text-parichay-on-accent hover:bg-parichay-accent-dark`.
- **Secondary:** `bg-parichay-control border border-parichay-border text-parichay-text hover:bg-parichay-control-hover`.
- **Ghost:** transparent, muted text, warm hover surface.
- **Danger:** `bg-parichay-danger-soft text-parichay-danger border border-parichay-danger/25`.
- **Motion:** hover may lift by 2px; tap may scale to 0.97. Keep transitions around 200ms.

One primary action per area. Secondary actions should be visually quieter and never compete with export/share actions.

### Icon Buttons

- Use Phosphor icons only.
- Minimum target: `min-h-11 min-w-11`.
- Use `weight="light"` by default, `fill` only for selected visibility state.
- Icons must support text, not replace clarity unless the accessible label is explicit.

### Segmented Controls

Use the shared recipe visible in storage mode, builder view selector, public/private preview, and visibility toggles.

- **Outer rail:** `flex bg-parichay-control-selected p-1 rounded-sm w-fit border border-parichay-border`.
- **Button:** `type-ui-label min-h-11 px-4 py-1.5 rounded-sm`.
- **Selected:** `bg-parichay-control text-parichay-text shadow-sm`.
- **Unselected:** `text-parichay-muted hover:bg-parichay-control-hover hover:text-parichay-text`.
- **Semantics:** use `aria-pressed` for toggle buttons and `aria-current` for current step where appropriate.

### Visibility Controls

Visibility is a core privacy affordance, not decoration.

- Builder controls may say `Share`, `Private`, and `Hide`.
- Explanatory copy should use `included`, `private`, and `omitted`.
- Pair each state with icon and text:
  - `Share` / included: Eye.
  - `Private`: LockKey.
  - `Hide` / omitted: EyeSlash.
- Never rely on color alone.
- Private answers must stay local.
- Hidden/omitted answers must never appear in preview, shared URLs, QR codes, public export, or public artifact views.

### Cards, Panels, And Document Surfaces

Use cards only for choices, repeated items, modals/menus, and genuinely framed tools.

- **Main panels:** `rounded-lg border border-parichay-border bg-parichay-surface p-4 md:p-6`.
- **Document panels:** `rounded-md border border-parichay-paper-border bg-parichay-paper`.
- **Choice cards:** `min-h-24 rounded-sm border p-4 text-left`.
- **Info cards:** `rounded-md border border-parichay-border bg-parichay-surface px-6 py-7`.
- **Avoid:** nested cards unless the inner surface is a real document/artifact inside a studio shell. Never create decorative card soup.

### Tags, Chips, And Small Choices

Use small rectangular controls, not pills.

- **Base:** `type-caption min-h-11 rounded-sm border px-3 py-1.5`.
- **Selected:** `border-parichay-accent bg-parichay-accent-soft text-parichay-accent-dark`.
- **Unselected:** `border-parichay-paper-border bg-parichay-paper-muted text-parichay-text hover:border-parichay-border-strong`.
- **Metadata badges:** use `type-meta` only when uppercase scan behavior is useful.

### Inputs And Writing Areas

Inputs should feel like writing on warm paper.

- **Main text input:** `type-answer-field`, transparent background, bottom border, lac focus.
- **Textarea:** `type-answer-field bg-parichay-paper border border-parichay-paper-border rounded-sm p-6`.
- **Optional note textarea:** `type-body bg-parichay-paper-muted border border-parichay-paper-border rounded-sm p-4`.
- **Placeholder:** `placeholder:text-parichay-muted/50` or `/60`.
- **Focus:** lac border plus visible tokenized focus ring.
- **Resize:** textareas should not introduce uncontrolled layout jumps.

### Select And Multi-Select Options

- Use button groups, not native selects, when the options are short and meaningful.
- Layout: `grid gap-3`, one column on mobile, two columns only from tablet/desktop when each card can keep a readable measure.
- Option button: `min-h-16 md:min-h-20 px-4 md:px-5 py-3 md:py-4 rounded-sm text-left text-base font-semibold leading-snug`.
- Selected state must use lac border and soft lac background.
- Use `role="group"` with `aria-labelledby` and `aria-describedby` where applicable.

### Progress And Step Navigation

- Progress rail: `h-1.5 rounded-[3px] bg-parichay-surface-soft`.
- Progress fill: `bg-parichay-accent`, animated via transform/scale only.
- Focused question pages use the section label, question count, and progress rail only.
- Do not add bottom dot rails or shortcut bars to the focused question flow.

### Focused Question Pages

- The visible hierarchy is question, answer choices, quiet escape actions, and one primary next action.
- Keep active prompts on `type-question-builder`; do not use landing/display scale inside the builder.
- Before an answer exists, hide optional nuance and the full visibility control. A small privacy reassurance may say: "Privacy can be changed before sharing."
- After an answer exists, show `Add nuance` as a text action and `Visibility: Share/Private/Hide · Change` as a collapsed row.
- Reveal the full Share/Private/Hide segmented control only after the user chooses Change.
- Put the visibility explanation behind a disclosure. Use included/private/omitted language in explanatory copy.
- Escape actions such as "None of these fit" and "I am not ready to answer this" are text actions, not answer cards.
- Skip is a quiet text action. Continue or Review intro is the only strong action in the question footer.
- The builder top navigation should be quiet: back to hub on the left, optional preview/manual return on the right, no Draft/Artifact segmented selector while answering.

### Header And Footer

- Header stays sticky with warm page translucency and a soft bottom border.
- Header links use `type-ui-label`, muted text, 44px minimum target, and visible focus rings.
- Footer uses dedicated footer tokens and `type-footer-nav`.
- Footer remains a dark band in light and dark modes. Do not make it paper-colored in light mode.
- Footer links wrap horizontally at all widths and should not become a vertical mobile link list.
- Navigation and footer items must be real links or clearly non-interactive text.

### Artifact Studio And Manual Preview

The Artifact Studio is the payoff. It must feel like a finished personal document, not a raw Q&A summary or dashboard report.

- Artifact outer shell: warm surface, soft border, generous padding.
- Artifact document: `max-w-2xl` or `max-w-3xl`, `bg-parichay-paper`, `border-parichay-paper-border`.
- Manual title uses `type-artifact-title`.
- Manual body uses `type-artifact-prose`.
- Artifact sections may use a two-column layout on desktop: section heading/description left, prose right.
- The preview footer may be quiet, but should retain the privacy promise: no account, no database.

### Share And Export Controls

- Export/save is a primary lac action.
- Print, QR, and copy actions are secondary unless they are the only action in the area.
- Share link panels in Memory Mode must create a link only after a deliberate user action.
- Long URL warnings use sandal/warning tokens, not generic yellow.
- QR panels use paper surfaces and restrained borders.

## 7. Iconography & Brand Mark

- Use `@phosphor-icons/react` for all product UI icons.
- Default icon size: 16-24px depending on context.
- Default weight: `light`.
- Selected state may use `fill` where it improves comprehension.
- Brand mark uses the PenNib icon inside a smoked-lac rectangular tile.
- Do not use Lucide, Solar, emoji, leaf marks, botanical marks, generic sparkly AI motifs, or wellness symbols.

## 8. Motion & Interaction

Motion should clarify state and make the interface feel responsive. It should never entertain at the expense of privacy or calm.

- **Small interactions:** 150-250ms.
- **Screen transitions:** 300-500ms only when the change benefits orientation.
- **Default easing:** `var(--ease-out-expo)` for standard transitions. Use a cinematic `cubic-bezier(0.32,0.72,0,1)` for heavy, staggered entry cascades (like `parichay-enter`).
- **Allowed animation properties:** transform and opacity.
- **Avoid:** animating width, height, top, left, or expensive layout properties.
- **Reduced motion:** respect `prefers-reduced-motion`; animations collapse to near-zero duration.
- **Hover & Tap (CSS Pseudo-Physics):** use pure CSS pseudo-physics to simulate physical weight and internal tension. Apply `active:scale-[0.98]` on buttons/cards and `group-hover:translate-x-1` on internal icons. Do NOT use heavy JavaScript spring libraries (e.g., framer-motion) for simple hover physics.

No bouncing chevrons, scroll hints, decorative loops, confetti, gamified progress, or perpetual attention-grabbing motion.

## 9. Privacy & Visibility Rules

Privacy is product architecture and design language.

- **Client-side only:** no backend, database, accounts, server persistence, or analytics unless explicitly requested.
- **Memory Mode:** answers stay in React memory only.
- **URL Mode:** compressed state may live in `#s=<compressed-state>`.
- **Shared URL rule:** only Share/included answers may enter shared URLs.
- **Private rule:** private answers stay local and must never enter shared URLs or public exports.
- **Hide/Omitted rule:** hidden answers are omitted from preview, share, export, QR, and public artifact output.

Canonical language:

- Use `Share`, `Private`, `Hide` for direct controls.
- Use `included`, `private`, `omitted` in explanatory copy.
- Prefer "Nothing is stored. Nothing is uploaded. You choose what leaves the page."
- Prefer "Your intro will start taking shape here." for empty artifact states.
- Avoid technical privacy explanations when a clear human sentence will do.

## 10. Voice & Copy

The voice is calm, precise, warm, and non-judgmental. It should feel like a careful manual, not advice, coaching, therapy, or AI analysis.

- Speak plainly about consequences: what is included, what stays private, what is omitted.
- Use trust-first language without overpromising.
- Keep labels short and exact.
- Remove copy that repeats the heading.
- Avoid manipulative urgency, hype, and fake certainty.
- Avoid AI cliches: "elevate", "seamless", "unlock", "unleash", "next-gen", "revolutionize".
- No emojis.

## 11. Anti-Patterns: Never Use

- No Inter.
- No Lucide icons.
- No botanical green, sage green, leaf marks, green success states, or wellness-app motifs.
- No neon colors.
- No glassmorphism, blurred glass cards, gradient border shells, or heavy shadows.
- No loud gradients or gradient text.
- No pill buttons.
- No dashboard aesthetic, metric cards, dense admin panels, or generic SaaS composition.
- No chatbot framing or AI-tool framing.
- No generic 3-card marketing rows unless they are true repeated choices and follow Parichay card rules.
- No nested cards except a document artifact inside a studio shell.
- No pure black.
- No raw hardcoded brand colors in components.
- No oversized hero typography inside compact panels.
- No decorative blobs, orbs, bokeh, confetti, or scroll arrows.
- No hidden focus states or touch targets below 44px for interactive controls.

## 12. QA Checklist

Before calling a design pass complete, verify:

- No Lucide imports remain.
- No Inter usage remains.
- No botanical green, sage naming, green success state, leaf identity, neon color, emojis, pill buttons, glass cards, or heavy gradients remain.
- All new colors use semantic Parichay tokens.
- Light and dark token values are tuned as separate emotional spaces.
- The landing feels like a document studio, not a marketing template.
- The builder feels private, calm, and non-judgmental.
- The Artifact Studio feels like the reward and is worth saving or sending.
- Buttons, links, chips, and segmented controls have 44px minimum targets.
- Focus rings are visible and high contrast.
- Shared URLs include only Share/included answers.
- Private answers never appear in shared URLs.
- Hidden/omitted answers never appear in preview, share, QR, or export.
- Motion respects `prefers-reduced-motion`.
