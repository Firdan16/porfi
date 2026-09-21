---
name: Porfi
description: Personal creative-tech archive for Firdan Umar.
colors:
  paper: "#F3EFE7"
  paper-deep: "#E8E1D7"
  ink: "#17191D"
  identity: "#1F4FBF"
  navy: "#122434"
typography:
  display:
    fontFamily: "Cormorant Garamond, serif"
    fontSize: "clamp(3.5rem, 10vw, 9rem)"
    fontWeight: 600
    lineHeight: 0.86
  body:
    fontFamily: "Plus Jakarta Sans, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
  metadata:
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "0.68rem"
    fontWeight: 700
rounded:
  control: "999px"
  artifact: "0.75rem"
  surface: "0"
---

# Design System: Porfi

## Creative North Star

**Digital Field Notes.** Porfi is a personal archive of mobile products, AI tools, and digital worlds built by Firdan Umar. The interface should feel authored and observant, closer to a studio notebook or exhibition index than a product dashboard.

## Visual language

- Warm paper, ink, deep navy, and one cobalt identity accent.
- Real screenshots are treated as artifacts and allowed to dominate the composition.
- Project colors remain visible as chapter accents instead of being flattened into one blue theme.
- Cormorant Garamond carries personal statements, project titles, quotes, and editorial emphasis.
- Plus Jakarta Sans carries navigation, body copy, controls, and functional information.
- Mono is reserved for archive captions, platform labels, and technical metadata.
- Borders and rules organize content. Cards are used only when an image needs containment or interaction needs a clear boundary.
- Motion explains hierarchy, reveal, and state change. Nothing moves only to look busy.

## Composition

- Use asymmetric grids, image bleed, offset crops, caption columns, and varied project rhythms.
- Do not repeat the same split card for every project.
- Mobile collapses to a single readable column while preserving image scale and editorial order.
- Tablet is a transitional composition, not a squeezed desktop layout.

## Accessibility

- Native controls and visible `:focus-visible` rings are required.
- Gallery controls are keyboard and touch accessible.
- Reduced motion removes pointer physics, entrance transforms, and decorative loops.
- Text contrast must pass WCAG AA.

## Avoid

- Universal neumorphic shadows.
- Glass navigation and pill labels on every section.
- Blue glow as a substitute for hierarchy.
- Generic dashboard/console language.
- Fake screenshots, stock imagery, and abstract blobs without a content role.
