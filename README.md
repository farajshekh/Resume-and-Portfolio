# Shekh Faraj — Portfolio & Résumé

A single-page portfolio and print-ready résumé for a transportation / highway engineer.
Plain HTML + CSS + vanilla JS — **no build step, no framework, no CDN scripts** (only Google Fonts).

## Design: "Asphalt & Amber"

| Token | Dark | Light |
|---|---|---|
| Background | asphalt `#0c0d10` | warm paper `#f5f2eb` |
| Accent | road-marking amber `#f2b632` | `#e8a317` (text `#8a5800`) |
| Display font | Fraunces (editorial serif) | |
| Body / mono | Manrope / JetBrains Mono | |

All colours, radii and fonts live in the `:root` tokens at the top of `styles.css` — change them there.

## Features

- Dark / light theme (follows system, remembers choice)
- Generated topographic-contour hero, animated stats, tools marquee
- Scroll-spy navigation, reading-progress bar, mobile menu
- Bento "Expertise" grid, experience timeline, education cards, case-study cards
- **Interactive pavement layer composer** (illustrative visualiser, not a design calculation)
- **Résumé section = print layout**: *Download PDF* uses `window.print()`; the print stylesheet outputs only the A4 CV
- Copy-email button with toast, full keyboard focus states, `prefers-reduced-motion` support

## Files

```
index.html   Markup (all content lives here)
styles.css   Design tokens, components, responsive + print styles
script.js    Theme, scroll effects, contours, pavement composer, print/copy
```

## Editing content

- Text: edit `index.html` directly (sections are commented and ids are stable: `about`, `expertise`, `experience`, `education`, `work`, `lab`, `resume`, `contact`).
- The résumé sheet (`#sheet`) is a separate, condensed copy of the content — update it alongside the main sections.

## Run / deploy

Open `index.html` in a browser, or serve the folder (`python -m http.server`).
Deploys as-is to GitHub Pages, Netlify or Vercel.
