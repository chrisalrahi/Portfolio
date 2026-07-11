# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A static personal portfolio website (HTML/CSS/JS, no build step) based on the **FolioOne** Bootstrap template from BootstrapMade. Deployed via **GitHub Pages** on the custom domain `chrisalrahi.com` (see `CNAME`).

There is no package manager, bundler, linter, or test framework. "Building" means editing HTML/CSS/JS directly; "deploying" means pushing to `main` (GitHub Pages auto-publishes). To preview locally, open an `.html` file in a browser or serve the directory with any static server (e.g. `python -m http.server`) — a server is preferable so relative asset paths resolve exactly as they do in production.

## Architecture

**Multi-page static site.** Every page is a standalone, complete HTML document — there is no templating or shared include mechanism. The `<head>` (fonts, vendor CSS, `assets/css/main.css`), the `<header>`/`<nav>`, the scroll-top/preloader elements, and the block of vendor `<script>` tags at the bottom are **duplicated verbatim in every `.html` file**. When changing anything in that shared chrome (nav links, meta tags, script list), apply the edit to all pages, not just one.

**Pages:**
- Top-level: `index.html` (home), `about.html`, `resume.html`, `portfolio.html` (project grid), `contact.html`.
- Project detail pages: `Beer-Goggles.html`, `Blade Polisher.html`, `Greenhouse System.html`, `Mobilitray.html`, `Truss Analysis.html`. These five share one copy-pasted detail-page layout (slider + accordion + features). `portfolio.html` links into them, and each ends with a "Next Project" link forming a manual carousel between them.

**JavaScript** (`assets/js/main.js`, unminified template file) is the single script that wires up all behavior on page load. It initializes the vendor libraries declaratively based on markup hooks, so features are enabled by adding the right classes/attributes rather than writing JS:
- `AOS` — scroll animations via `data-aos` attributes.
- `Typed.js` — the rotating hero text, driven by `.typed` + `data-typed-items`.
- `Swiper` — image sliders via `.init-swiper` + an inline `<script class="swiper-config">` JSON block.
- `Isotope` + `imagesLoaded` — the filterable project grid (`.isotope-layout`, `.portfolio-filters`).
- `GLightbox` — lightbox popups via `.glightbox`.
- `PureCounter` — animated number counters.

**Contact form** (`contact.html`) submits client-side to **Formspree** (`https://formspree.io/f/mldoepqq`) via a `fetch` in an inline `<script>`. The `forms/contact.php` file is leftover template scaffolding and is **dead code** — GitHub Pages cannot execute PHP. Do not wire anything to it.

## Conventions and gotchas

- **Asset filenames contain spaces** (e.g. `assets/img/portfolio/Beer Goggles.PNG`). In `href`/`src` these must be URL-encoded with `%20`. When adding an image reference, encode spaces or the link breaks.
- **Filename case matters.** GitHub Pages serves from Linux, so `GreenHouse System.PNG` and `greenhouse system.png` are different files. Match the on-disk casing exactly (note existing files mix `.PNG`, `.png`, `.JPG`).
- **HTML structure is hand-maintained and easy to break** — the pages have a history of unclosed `<div>`/`<main>` tags and stray closing tags from copy-paste edits. After structural edits, sanity-check that `<div>`, `<section>`, and `<main>` open/close counts balance per file before committing.
- `assets/vendor/` holds third-party libraries; `assets/scss/` is empty (Sass sources are pro-only). Edit compiled `assets/css/main.css` directly.
- The `.idea/` directory is JetBrains IDE config; leave it untracked/out of commits.
