# Olivier Marie — academic website

Static site served by GitHub Pages at
<https://oliviermarie-econ.github.io/academic_website/>.
No build step: every page is a plain HTML file that links the shared `style.css`.

| File | Page |
|---|---|
| `index.html` | Home: intro, affiliations, research news, upcoming talks |
| `research.html` | Research: collapsible sections, one card per paper |
| `cv.html` | CV: embeds `files/CV_Olivier_Marie.pdf` |
| `teaching.html` | Current courses + supervision note |
| `twec.html` | Transatlantic Workshop on the Economics of Crime: current edition, programme, past editions |
| `contact.html` | Address, phone, email, map |
| `style.css` | Shared styles (fonts, colours, paper cards, nav) |
| `files/` | PDFs served by the site (CV, TWEC programme) |
| `cv/cv.tex` | LaTeX source of the CV |
| `cv/build_cv.sh` | Compiles the CV and copies the PDF into `files/` |

## Updating the site

1. Edit the HTML file(s).
2. Commit and push to `main`. GitHub Pages rebuilds within about a minute.

The Google Site (<https://sites.google.com/site/oliviermarie/>) shows these pages
through Embed blocks (iframes). When a page detects it is inside an iframe it hides
its own header and footer, so the Google Sites menu is the only navigation shown there.

## Updating the CV

1. Edit `cv/cv.tex` (and bump `\cvdate` near the top).
2. Run `bash cv/build_cv.sh` — needs `pdflatex` (MiKTeX).
3. Commit `cv/cv.tex` and `files/CV_Olivier_Marie.pdf`, push.

## Adding a paper to the research page

Copy an existing `<div class="paper ...">` block in `research.html` into the right section
(`working`, `forthcoming`, or `published` controls the coloured left border), then edit
title, venue line, coauthors, one-sentence summary, abstract, impact rows, and the pill links.
