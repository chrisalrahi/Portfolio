# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A static personal portfolio website (HTML/CSS/JS, no build step) deployed via **GitHub Pages** on the custom domain `chrisalrahi.com` (see `CNAME`). In July 2026 the site was consolidated from a 10-page BootstrapMade "FolioOne" template into a **single hand-written page**; the template pages survive only as an archive under `/legacy`.

There is no package manager, bundler, linter, or test framework. "Building" means editing HTML/CSS/JS directly; "deploying" means pushing to `main` (GitHub Pages auto-publishes — nothing lands on `main` without review). To preview locally, serve the directory with any static server (e.g. `py -m http.server 8923`) so relative asset paths resolve exactly as in production.

## Architecture

**The live site is one page:** `index.html` (Hero → Projects → Experience → About → Contact), styled by `assets/css/site.css` (hand-written, design tokens in `:root`) and driven by `assets/js/site.js` (vanilla: nav toggle, scrolled header, scrollspy, IntersectionObserver fade-ups). It loads **zero vendor JS** — do not reintroduce the template's vendor libraries into it. Images it uses live in `assets/img/opt/` (resized WebP copies with explicit width/height; below-fold ones are `loading="lazy"`; regenerate with Node + `sharp` from the originals if new ones are added). `404.html` and `.nojekyll` are intentional GitHub Pages files.

**Design tokens (preserve):** bg `#101a20`, surface `#141f26`, text `#e7f2f7`, headings `#fff`, single accent `#ac23ff`; Raleway headings / Roboto body / Poppins nav; pill buttons (50px radius), cards 10px, images up to 20px radius; gentle lift-and-glow hovers. `.reveal` animations are gated on `html.js` (set by an inline script) so content is never hidden without JS.

**Old-URL compatibility (do not break):** the 9 old top-level pages (`about.html`, `resume.html`, `portfolio.html`, `contact.html`, `Beer-Goggles.html`, `Blade Polisher.html`, `Greenhouse System.html`, `Mobilitray.html`, `Truss Analysis.html`) are **redirect stubs** (meta refresh + `location.replace`) pointing at anchors on `/`. The full original pages are archived verbatim in `/legacy/` with asset paths rewritten to `../assets/…` and `noindex` added; they still depend on `assets/css/main.css`, `assets/js/main.js`, and the surviving files in `assets/vendor/` — keep all of those, and keep the original images/PDFs the legacy pages and `index.html` reference.

## Conventions and gotchas

- **Asset filenames contain spaces** (and one contains `#`: the Turbine Mold Polisher PDF). In `href`/`src` these must be URL-encoded (`%20`, `%23`) or the link breaks.
- **Filename case matters.** GitHub Pages serves from Linux; match on-disk casing exactly (existing files mix `.PNG`, `.png`, `.JPG`).
- **HTML structure is hand-maintained** — after structural edits, sanity-check that `div`/`section`/`main` open/close counts balance per file.
- Every project's copy follows **hook · My role · Outcome · tool tags · links**; keep new projects in that format.
- The contact section is links-only (no form). The resume PDF at `assets/Docs/Chris Al-Rahi Resume.pdf` is THE resume link everywhere (nav, hero, experience).
- `assets/vendor/` was pruned to exactly what `/legacy` loads (e.g. Bootstrap is only `bootstrap.min.css` + `bootstrap.bundle.min.js`); don't re-add variants, and don't delete what remains.
- The `.idea/` directory is JetBrains IDE config; leave it untracked/out of commits. `.playwright-mcp/` is test output; don't commit it.
