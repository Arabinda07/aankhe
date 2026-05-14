# Ankahe Design System

## 1. Visual Theme & Atmosphere

Ankahe is a private personal manual studio. It turns careful answers into a finished artifact that feels worth saving or sending. The atmosphere is warm, exact, and intimate: sealed letters, sandal paper, smoked lac, rosewood ink, private manuals, high-end stationery, and emotional precision.

Ankahe is a sister site to Reflections, not a clone. Preserve Reflections' calm editorial rhythm, semantic tokens, generous whitespace, restrained motion, soft borders, artifact-first payoff, and trust-first language. Do not copy Reflections' botanical green brand, leaf identity, tone names, layouts, copy, icons, or motifs.

- **Product feeling:** document studio, private manual, composed artifact.
- **Density:** daily app balanced, with airy reading surfaces and focused controls.
- **Variance:** centered reading columns for long text, asymmetric split composition for setup and builder views.
- **Motion:** restrained state feedback, never cinematic or playful.
- **Primary promise:** Nothing is stored. Nothing is uploaded. You choose what leaves the page.
- **Tagline:** Say it once. Be understood.

Never let the product feel like a wellness app, green journaling app, SaaS dashboard, AI tool, HR assessment, chatbot, or therapy replacement.

## 2. Color Palette & Token Roles

Use CSS variables and Tailwind theme mappings. Components must use semantic token classes instead of raw brand colors. Add a new token only when a real semantic role is missing.

### Core Surface Tokens

- **`page` / `ankahe-bg`**: full-page warm paper background.
- **`surface` / `ankahe-surface`**: main panels, site chrome, side controls.
- **`surface-raised`**: subtly lifted warm surface when a layer needs more presence.
- **`surface-muted` / `ankahe-surface-soft`**: rails, selected surrounds, progress tracks, soft callouts.
- **`surface-translucent`**: restrained translucent overlays only when the underlying page remains quiet.
- **`surface-preview`**: reflective preview shells around artifact canvases.
- **`paper` / `ankahe-paper`**: document and artifact surfaces.
- **`paper-muted`**: inset document callouts and low-emphasis artifact panels.
- **`paper-border`**: document-specific 1px dividers and artifact frames.

### Text Tokens

- **`text` / `ankahe-text`**: primary ink for headings, body, controls, and artifact prose.
- **`text-muted` / `ankahe-muted`**: secondary text, descriptions, helper copy, metadata. Must remain WCAG AA against its surface.
- **`text-soft`**: tertiary hints or supporting metadata when `text-muted` is too strong.
- **Opacity rule:** prefer dedicated text tokens. Use opacity suffixes only for intentionally lower-stakes metadata, such as `text-ankahe-muted/70` in artifact footers.

### Border And Focus Tokens

- **`border` / `ankahe-border`**: default soft structural line.
- **`border-strong` / `ankahe-border-strong`**: hover borders, active outlines, or stronger choice separation.
- **`focus` / `ankahe-focus`**: visible focus rings. Do not remove focus rings for visual cleanliness.

### Action, Privacy, And State Tokens

- **`accent` / `ankahe-accent`**: smoked lac. Use for primary actions, selected state borders, progress fill, important icon color, and export/share emphasis.
- **`accent-hover` / `ankahe-accent-dark`**: deeper lac for hover and high-contrast accent text.
- **`accent-soft` / `ankahe-accent-soft`**: selected backgrounds and safe-to-send callouts.
- **`on-accent` / `ankahe-on-accent`**: text on lac-filled controls.
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

## 3. Typography Rules

Use the locally hosted fonts from `public/fonts`.

- **Spectral:** headings that should feel literary, artifact prose, composed manual text, wordmark, reflective moments.
- **Manrope:** UI, controls, labels, metadata, buttons, navigation, helper text, dense panels.
- **Banned:** Inter, generic system-only typography for branded surfaces, remote font imports, and undeclared font weights.
- **Spectral weights available:** 400 regular, 400 italic, 700 bold.
- **Manrope weights available:** variable 200-800 plus static files.
- **Letter spacing:** keep at `0` for most text. Use positive uppercase tracking only for eyebrow/meta styles.

### Canonical Type Classes

Use these classes before inventing ad hoc font sizes.

| Class | Font | Size | Weight | Line Height | Use |
| --- | --- | ---: | ---: | ---: | --- |
| `type-hero` | Manrope | 3.5rem mobile, 5.5rem tablet, 5.875rem desktop | 760 | 0.98/0.95 | Landing hero only |
| `type-hero-emphasis` | Manrope | inherit | 800 | inherit | Lac emphasis inside hero |
| `type-display` | Manrope | 3.25rem mobile, 4.5rem tablet, 5.5rem desktop | 800 | 0.96 | Major page titles |
| `type-mode-title` | Manrope | 3.25rem mobile, 4.25rem tablet, 5.25rem desktop | 800 | 0.95 | Mode selection titles |
| `type-question` | Spectral italic | 2.625rem mobile, 3rem tablet | 400 | 1.05-1.1 | Active form question |
| `type-answer-field` | Spectral | 1.75rem mobile, 2rem tablet | 400 | 1.45 | Main writing inputs |
| `type-artifact-title` | Manrope | 3rem mobile, 3.75rem tablet, 4.25rem desktop | 800 | 0.98 | Manual title |
| `type-artifact-heading` | Manrope | 2rem | 700 | 1.05 | Artifact section headings |
| `type-artifact-prose` | Spectral | 1.1875rem | 400 | 1.72 | Manual paragraphs and composed prose |
| `type-lead` | Manrope | 1.1875rem | 400 | 1.65 | Intro copy and explanation |
| `type-body` | Manrope | 1rem | 400 | 1.65 | Standard UI body |
| `type-ui-label` | Manrope | 0.875rem | 700 | 1.2 | Buttons, labels, nav |
| `type-panel-title` | Manrope | 0.9375rem | 700 | 1.25 | Panel headings |
| `type-eyebrow` | Manrope | 0.75rem | 800 | 1.2 | Uppercase section markers |
| `type-caption` | Manrope | 0.8125rem | 500 | 1.45 | Supporting text, chips, small descriptions |
| `type-meta` | Manrope | 0.8125rem | 700 | 1.2 | Uppercase metadata and counters |
| `type-footer-nav` | Manrope | 0.8125rem | 800 | 1.2 | Footer links |

### Typography Usage

- Use Spectral for what the user is writing or reading as a manual.
- Use Manrope for every control the user clicks, toggles, copies, exports, or navigates with.
- Do not use hero-scale type inside cards, sidebars, chips, buttons, or compact panels.
- Keep prose columns readable: body and artifact prose should generally stay near 60-65 characters per line.
- Use `type-tabular` for counters, dates, step numbers, URL length, and scale values.

## 4. Layout & Spacing System

Ankahe should feel like a document studio, not a marketing template or dashboard. Layouts should give the manual room to breathe while keeping choices easy to scan.

### Page Shells

- **Global app shell:** `min-h-[100dvh] flex flex-col font-sans`.
- **Main page width:** use `max-w-7xl mx-auto px-6` for app-scale surfaces.
- **Info page width:** use `max-w-5xl mx-auto px-6 py-16 md:py-24`.
- **Landing setup:** use a split composition similar to `lg:grid-cols-[minmax(0,0.82fr)_minmax(420px,1fr)]`.
- **Builder:** use `lg:grid-cols-[1fr_450px]` for draft plus live preview.
- **Artifact Studio:** use `lg:grid-cols-[1fr_400px]` for document plus controls.

### Spacing Cadence

Use Tailwind's 4px-based spacing scale. Preferred repeatable values:

- **Inline page padding:** `px-6`; header may use `px-3 sm:px-6`.
- **Panel padding:** `p-4`, `p-5`, `p-6`, `p-8`.
- **Artifact padding:** `p-8 md:p-14 lg:p-16` for document canvas; `p-7 md:p-9` or `p-8 md:p-12` for artifact callouts.
- **Major vertical rhythm:** `space-y-8`, `space-y-12`, `space-y-16`, `space-y-20`.
- **Control gaps:** `gap-2`, `gap-3`, `gap-4`.
- **Grid gaps:** `gap-3` for choices, `gap-8 md:gap-16` for artifact sections, `gap-12` for main two-column layouts.

### Responsive Rules

- All multi-column layouts must collapse to one column below `lg` unless the current component already uses a proven `sm:grid-cols-2` choice layout.
- No horizontal scrolling on mobile.
- Controls wrap instead of shrinking below 44px height.
- Sticky sidebars are desktop-only and must not cover content.
- Use `min-h-[100dvh]`, not `h-screen`.

## 5. Radius, Borders, Elevation & Surfaces

Ankahe uses modest rectangular geometry. The design may be soft, but it must not become pill-shaped or bubbly.

### Radius Rules

- **`rounded-sm` (2px):** chips, segmented control buttons, choice buttons, inputs, document callouts, compact panels.
- **`rounded-md` (6px):** primary buttons, icon buttons, brand tile, document shell, small menus.
- **`rounded-lg` (8px):** main setup panels and major app panels.
- **`rounded-xl` (12px):** preview frames only, where a larger enclosing shell needs visible separation.
- **Avoid:** `rounded-full` and pill buttons. Use only if a future component has a proven non-brand reason.

### Borders

- Default to 1px tokenized borders: `border border-ankahe-border` or `border border-ankahe-paper-border`.
- Use stronger borders for hover or selected states: `border-ankahe-border-strong` or `border-ankahe-accent`.
- Do not use thick decorative strokes or gradient border shells.

### Elevation

- Prefer border, surface contrast, and whitespace over shadows.
- Acceptable shadows:
  - `shadow-sm` for selected segmented buttons and small raised controls.
  - Lac-tinted soft shadow for primary buttons or artifact frames only.
  - Menu shadow may use a low-opacity tokenized text or accent color.
- Avoid heavy drop shadows, glass cards, blurred panels, neon glows, or dramatic depth.

## 6. Component Stylings

### Buttons

Use `SoftButton` for standard action buttons.

- **Shape:** `rounded-md`, never pill.
- **Base:** inline-flex, centered, `gap-3`, `font-semibold`, visible focus ring.
- **Minimum heights:** small `min-h-11`, medium `min-h-12`, large `min-h-14`.
- **Primary:** `bg-ankahe-accent text-ankahe-on-accent hover:bg-ankahe-accent-dark`.
- **Secondary:** `bg-ankahe-control border border-ankahe-border text-ankahe-text hover:bg-ankahe-control-hover`.
- **Ghost:** transparent, muted text, warm hover surface.
- **Danger:** `bg-ankahe-danger-soft text-ankahe-danger border border-ankahe-danger/25`.
- **Motion:** hover may lift by 2px; tap may scale to 0.97. Keep transitions around 200ms.

One primary action per area. Secondary actions should be visually quieter and never compete with export/share actions.

### Icon Buttons

- Use Phosphor icons only.
- Minimum target: `min-h-11 min-w-11`.
- Use `weight="light"` by default, `fill` only for selected visibility state.
- Icons must support text, not replace clarity unless the accessible label is explicit.

### Segmented Controls

Use the shared recipe visible in storage mode, builder view selector, public/private preview, and visibility toggles.

- **Outer rail:** `flex bg-ankahe-control-selected p-1 rounded-sm w-fit border border-ankahe-border`.
- **Button:** `type-ui-label min-h-11 px-4 py-1.5 rounded-sm`.
- **Selected:** `bg-ankahe-control text-ankahe-text shadow-sm`.
- **Unselected:** `text-ankahe-muted hover:bg-ankahe-control-hover hover:text-ankahe-text`.
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

- **Main panels:** `rounded-lg border border-ankahe-border bg-ankahe-surface p-4 md:p-6`.
- **Document panels:** `rounded-md border border-ankahe-paper-border bg-ankahe-paper`.
- **Choice cards:** `min-h-24 rounded-sm border p-4 text-left`.
- **Info cards:** `rounded-md border border-ankahe-border bg-ankahe-surface px-6 py-7`.
- **Avoid:** nested cards unless the inner surface is a real document/artifact inside a studio shell. Never create decorative card soup.

### Tags, Chips, And Small Choices

Use small rectangular controls, not pills.

- **Base:** `type-caption min-h-11 rounded-sm border px-3 py-1.5`.
- **Selected:** `border-ankahe-accent bg-ankahe-accent-soft text-ankahe-accent-dark`.
- **Unselected:** `border-ankahe-paper-border bg-ankahe-paper-muted text-ankahe-text hover:border-ankahe-border-strong`.
- **Metadata badges:** use `type-meta` only when uppercase scan behavior is useful.

### Inputs And Writing Areas

Inputs should feel like writing on warm paper.

- **Main text input:** `type-answer-field`, transparent background, bottom border, lac focus.
- **Textarea:** `type-answer-field bg-ankahe-paper border border-ankahe-paper-border rounded-sm p-6`.
- **Optional note textarea:** `type-body bg-ankahe-paper-muted border border-ankahe-paper-border rounded-sm p-4`.
- **Placeholder:** `placeholder:text-ankahe-muted/50` or `/60`.
- **Focus:** lac border plus visible tokenized focus ring.
- **Resize:** textareas should not introduce uncontrolled layout jumps.

### Select And Multi-Select Options

- Use button groups, not native selects, when the options are short and meaningful.
- Layout: `grid gap-3 sm:grid-cols-2`.
- Option button: `min-h-20 px-5 py-4 rounded-sm text-left text-base font-semibold leading-snug`.
- Selected state must use lac border and soft lac background.
- Use `role="group"` with `aria-labelledby` and `aria-describedby` where applicable.

### Progress And Step Navigation

- Progress rail: `h-1.5 rounded-[3px] bg-ankahe-surface-soft`.
- Progress fill: `bg-ankahe-accent`, animated via transform/scale only.
- Question shortcuts: small bars inside 44px targets, not tiny inaccessible dots.
- Current step can widen from `w-2` to `w-6`; answered steps may use `bg-ankahe-accent/60`.

### Header And Footer

- Header stays sticky with warm page translucency and a soft bottom border.
- Header links use `type-ui-label`, muted text, 44px minimum target, and visible focus rings.
- Footer uses dedicated footer tokens and `type-footer-nav`.
- Navigation and footer items must be real links or clearly non-interactive text.

### Artifact Studio And Manual Preview

The Artifact Studio is the payoff. It must feel like a finished personal document, not a raw Q&A summary or dashboard report.

- Artifact outer shell: warm surface, soft border, generous padding.
- Artifact document: `max-w-2xl` or `max-w-3xl`, `bg-ankahe-paper`, `border-ankahe-paper-border`.
- Manual title uses `type-artifact-title`.
- Manual body uses `type-artifact-prose`.
- Artifact sections may use a two-column layout on desktop: section heading/description left, prose right.
- The preview footer may be quiet, but should retain the privacy promise: no account, no database.

### Share And Export Controls

- Export/save is a primary lac action.
- Print, QR, and copy actions are secondary unless they are the only action in the area.
- Share link panels must state when Memory Only prevents link creation.
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
- **Default easing:** `var(--ease-out-expo)` or restrained spring settings already used in Motion components.
- **Allowed animation properties:** transform and opacity.
- **Avoid:** animating width, height, top, left, or expensive layout properties.
- **Reduced motion:** respect `prefers-reduced-motion`; animations collapse to near-zero duration.
- **Hover:** color, border, subtle lift, or selected surface changes.
- **Tap:** small scale feedback is acceptable for buttons.

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
- Prefer "Your manual will start taking shape here." for empty artifact states.
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
- No generic 3-card marketing rows unless they are true repeated choices and follow Ankahe card rules.
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
- All new colors use semantic Ankahe tokens.
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
