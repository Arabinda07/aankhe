# Typography And Interface Language

## Typography Role

Parichay uses type to create calm structure. The interface should feel like a private document studio: legible controls around a warm editorial artifact.

## Font Families

- Geist is the product UI face.
- Source Serif 4 is the editorial/manual face.
- Geist Mono is reserved for technical/privacy microcopy.

Geist handles navigation, controls, labels, buttons, help text, progress, metadata, choice cards, privacy controls, and body UI. Source Serif 4 handles reflective prompts, question text, answer fields, editorial hooks, artifact titles, and manual prose moments. Geist Mono is only for URL hashes, timestamps, export metadata, and local-only technical details.

## Local Font Files

The app loads fonts from `public/fonts`.

- `Geist[wght].woff2` for UI weights.
- `Geist-Italic[wght].woff2` for UI italic fallback where needed.
- `SourceSerif4Variable-Roman.otf.woff2` for editorial regular and weighted text.
- `SourceSerif4Variable-Italic.otf.woff2` for quiet reflective emphasis.
- `GeistMono[wght].woff2` for technical/privacy microcopy.
- `GeistMono-Italic[wght].woff2` for technical italic fallback where needed.

Do not add another type family unless the brand system is intentionally revised.

## Scale

- Use restrained product type in controls.
- Reserve large Source Serif 4 for reflective hooks, question text, and artifact surfaces.
- Keep labels compact and high contrast.
- Keep prose line length around 65 to 75 characters.
- Do not use viewport-scaled font sizes.
- Letter spacing should be zero for normal text. Use uppercase tracking only for rare labels.

## Interface Language

Controls should use familiar product language:

- Include
- Keep private
- Omit
- Continue
- Back
- Copy link
- Export PDF
- Download image

Avoid metaphorical controls:

- Reveal
- Unlock
- Transform
- Activate
- Complete journey

## Layout Language

Parichay should prefer:

- Full-width bands.
- Clear panels.
- Gentle dividers.
- Document-like columns.
- Inline controls over modals.
- One primary action per decision area.

Avoid:

- Cards inside cards.
- Repeated identical card grids.
- Decorative blobs or orbs.
- Gradient text.
- Glass panels as a default surface.
- Metric blocks that make the user feel scored.

## Touch And Responsive Standards

- Interactive targets must be at least 44px in the active dimension.
- Segmented controls must expose selected state through semantics and visible styling.
- Header and footer links must remain tappable on mobile.
- Text must wrap without overlapping controls.
- Mobile should keep the next action visible without crowding the writing surface.
