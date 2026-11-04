# Faraj Shekh — Portfolio & Résumé

Single-page portfolio and print-ready résumé for a highway design engineer.
Plain HTML + CSS + vanilla JS — **no build step, no framework, no CDN scripts** (only Google Fonts).

## Branches

| Branch | Purpose |
|---|---|
| `main` | Approved/stable site |
| `change` | Content rebuilt from the Nov 2026 résumé (current work) — merge into `main` once approved |

## Design: "Asphalt & Amber"

Dark (asphalt `#0c0d10` + road-marking amber `#f2b632`) and light (warm paper) themes. Fraunces (display),
Manrope (body), JetBrains Mono (labels). All colours, radii and fonts are tokens at the top of `styles.css`.

## Sections

`Hero` · `01 About` · `02 Expertise` · `03 Experience` · `04 Portfolio` · `05 Education & research` ·
`06 Recognition & training` · `07 Résumé` · `08 Contact`

- **Résumé section** shows the online résumé. *Download PDF* downloads `assets/Faraj-Shekh-Resume.pdf` — to update the PDF, replace that file (keep the same name).
- **Portfolio** cards and the detail dialog are rendered from `projects.js`.

## Files

```
index.html        Markup and page content
styles.css        Design tokens, components, responsive + print styles
script.js         Theme, scroll effects, contours, portfolio rendering + dialog, print/copy
projects.js       Portfolio data (one entry per project)
assets/
  faraj-shekh.jpg       Portrait (original, un-recompressed)
  Faraj-Shekh-Resume.pdf  The résumé PDF served by the Download button
  projects/<id>/        Put each project's photos / videos here
```

## Adding project photos and videos

1. Drop files into `assets/projects/<project-id>/` (ids are in `projects.js`, e.g. `expressways`, `amaravati`).
2. In that project's entry in `projects.js`, set:

```js
cover: 'assets/projects/expressways/cover.jpg',        // card image
media: [
  { type: 'image', src: 'assets/projects/expressways/site-01.jpg', alt: 'Alignment survey', caption: 'Optional' },
  { type: 'video', src: 'assets/projects/expressways/flythrough.mp4', poster: 'assets/projects/expressways/poster.jpg' }
]
```

Until media is added, cards and the dialog show tasteful placeholders.

## Run / deploy

Open `index.html`, or serve the folder (`python -m http.server`). Deploys as-is to GitHub Pages, Netlify or Vercel.
