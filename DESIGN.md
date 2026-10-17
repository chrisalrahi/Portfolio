---
name: chrisalrahi.com (direction E, Cards)
description: A dark, card-built engineering portfolio where every project is a rounded surface carrying a badge, a hook, big key figures and pill tags.
colors:
  ground: "#101a20"
  surface: "#16222b"
  plate-ground: "#0c1419"
  text: "#e7f2f7"
  heading: "#ffffff"
  muted: "rgba(231, 242, 247, 0.68)"
  hairline: "rgba(231, 242, 247, 0.12)"
  hairline-strong: "rgba(231, 242, 247, 0.24)"
  hairline-hover: "rgba(231, 242, 247, 0.4)"
  plot-ground: "#ffffff"
  backdrop: "rgba(6, 11, 14, 0.8)"
  focus-halo: "rgba(16, 26, 32, 0.85)"
  accent: "#5a9fe0"
  accent-hover: "#74b0ea"
  accent-text: "#83b7e8"
  accent-text-hover: "#a9cdf0"
  accent-line: "rgba(131, 183, 232, 0.45)"
  accent-underline: "rgba(131, 183, 232, 0.55)"
  accent-wash: "rgba(90, 159, 224, 0.12)"
  signature-line: "rgba(90, 159, 224, 0.32)"
  work-ink: "#83b7e8"
  work-bg: "rgba(90, 159, 224, 0.16)"
  school-ink: "#8fd3b6"
  school-bg: "rgba(123, 196, 160, 0.16)"
  personal-ink: "#e6c079"
  personal-bg: "rgba(224, 179, 90, 0.16)"
  tag-ink: "#c9d4db"
  tag-bg: "rgba(231, 242, 247, 0.08)"
  tag-bg-hover: "rgba(231, 242, 247, 0.15)"
  ok-ink: "#8fd3b6"
  error-ink: "#f2a7a0"
typography:
  display:
    fontFamily: "Manrope, Manrope Fallback, system-ui, sans-serif"
    fontSize: "clamp(44px, 2.8vw + 24px, 64px)"
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Manrope, Manrope Fallback, system-ui, sans-serif"
    fontSize: "40px"
    fontWeight: 800
    lineHeight: 1.15
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Manrope, Manrope Fallback, system-ui, sans-serif"
    fontSize: "28px"
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  title-sm:
    fontFamily: "Manrope, Manrope Fallback, system-ui, sans-serif"
    fontSize: "19px"
    fontWeight: 800
    lineHeight: 1.25
    letterSpacing: "-0.01em"
  figure:
    fontFamily: "Manrope, Manrope Fallback, system-ui, sans-serif"
    fontSize: "30px"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.02em"
    fontFeature: "tnum"
  lede:
    fontFamily: "Manrope, Manrope Fallback, system-ui, sans-serif"
    fontSize: "22px"
    fontWeight: 400
    lineHeight: 1.5
  body:
    fontFamily: "Manrope, Manrope Fallback, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.6
  caption:
    fontFamily: "Manrope, Manrope Fallback, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.4
  label:
    fontFamily: "Manrope, Manrope Fallback, system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 500
    lineHeight: 1.25
  label-strong:
    fontFamily: "Manrope, Manrope Fallback, system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "0.01em"
rounded:
  field: "12px"
  thumb: "16px"
  plate: "20px"
  pill: "999px"
spacing:
  s-1: "4px"
  s-2: "8px"
  s-3: "12px"
  s-4: "16px"
  s-5: "20px"
  s-6: "24px"
  s-7: "32px"
  s-8: "48px"
  s-9: "64px"
  s-10: "96px"
components:
  pill-solid:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.ground}"
    rounded: "{rounded.pill}"
    padding: "0 32px"
    height: "52px"
  pill-solid-hover:
    backgroundColor: "{colors.accent-hover}"
    textColor: "{colors.ground}"
  pill-ghost:
    backgroundColor: "{colors.tag-bg}"
    textColor: "{colors.text}"
    rounded: "{rounded.pill}"
    padding: "0 32px"
    height: "52px"
  pill-ghost-hover:
    backgroundColor: "{colors.accent-wash}"
    textColor: "{colors.heading}"
  pill-sm:
    rounded: "{rounded.pill}"
    padding: "0 24px"
    height: "44px"
  see-more:
    backgroundColor: "transparent"
    textColor: "{colors.accent-text}"
    rounded: "{rounded.pill}"
    padding: "0 20px"
    height: "44px"
  see-more-hover:
    backgroundColor: "{colors.accent-wash}"
    textColor: "{colors.accent-text-hover}"
  badge-work:
    backgroundColor: "{colors.work-bg}"
    textColor: "{colors.work-ink}"
    typography: "{typography.label-strong}"
    rounded: "{rounded.pill}"
    padding: "0 12px"
    height: "28px"
  badge-school:
    backgroundColor: "{colors.school-bg}"
    textColor: "{colors.school-ink}"
    typography: "{typography.label-strong}"
    rounded: "{rounded.pill}"
    padding: "0 12px"
    height: "28px"
  badge-personal:
    backgroundColor: "{colors.personal-bg}"
    textColor: "{colors.personal-ink}"
    typography: "{typography.label-strong}"
    rounded: "{rounded.pill}"
    padding: "0 12px"
    height: "28px"
  tag:
    backgroundColor: "{colors.tag-bg}"
    textColor: "{colors.tag-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "6px 12px"
  tag-hover:
    backgroundColor: "{colors.tag-bg-hover}"
    textColor: "{colors.text}"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.plate}"
    padding: "32px"
  mini-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.thumb}"
    padding: "16px 20px 20px"
  dialog:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.plate}"
    padding: "32px"
    width: "min(880px, 100% - 32px)"
  field:
    backgroundColor: "{colors.ground}"
    textColor: "{colors.text}"
    rounded: "{rounded.field}"
    padding: "12px 16px"
    height: "48px"
  nav-link:
    textColor: "{colors.muted}"
    height: "44px"
  nav-link-hover:
    textColor: "{colors.heading}"
---

# Design System: chrisalrahi.com (direction E, Cards)

## Overview

**Creative North Star: "The Evidence Cards"**

The page is a dark navy desk with one steel-blue accent, and every piece of proof sits on it as a rounded card: a photo plate on top, then a coloured track badge, a heavy title, a one- or two-sentence hook, a row of big key figures and a few pill tags. A recruiter skims cards, not paragraphs, so the system leans on numbers set large, photographs set in deep-shadowed plates, and a single typeface at three weights. Density is low: one sentence where a bullet list would have been, and the detail moves into a native dialog behind "See more".

Personality comes from the materials, not from decoration. The hero sets the surname in the accent beside a 4:5 portrait plate; the pendulum card is the one signature moment, its looping clip overlapped at the corner by a white step-response plot that wipes itself in once. Motion is a short load sequence, once-only fade-ups, 4 px hover lifts and count-ups on the key figures, and none of it is tied to scroll position. Reduced motion is the only switch, and under it everything sits at its final state.

Confirmed rejections from the direction: no bullets in the project unit, no labels above headings, no blueprint grid texture, no side rail, no big centred section titles, no scroll-driven effects, and no purple.

**Key Characteristics:**
- Dark tonal layering (ground, surface, plate ground) with soft, deep black shadows.
- One accent (#5a9fe0) for fills and the surname; a lighter accent ink for small text and links.
- Track badges in their own semantic tints (Work blue, School green, Personal amber), separate from the accent.
- Manrope only, 400 / 500 / 800, with 800 carrying every heading and figure.
- Everything interactive is a pill; every surface is a 20 px or 16 px rounded rectangle.
- Motion plays once and settles; final values are always in the markup.

## Colors

A cool, near-black navy ground with blue-tinted greys and one steel-blue accent, plus three soft track tints.

### Primary
- **Steel Blue** (accent): solid pill fills, the hero surname, the selection highlight, the focus ring and the brand underline on hover. Text on it is always the ground, never white.
- **Steel Blue Lifted** (accent-hover): the solid pill on hover.
- **Pale Steel Ink** (accent-text, hover accent-text-hover): links, "See more" text and any small accent-coloured type; it holds 5.9:1 on the ground where the fill blue would not.
- **Steel Washes** (accent-line, accent-underline, accent-wash, signature-line): the "See more" outline, link underlines, the ghost and outline hover fill, and the pendulum card's border.

### Secondary
- **Track tints** (work-ink on work-bg, school-ink on school-bg, personal-ink on personal-bg): the Work, School and Personal badges only. Each is a light ink on a 16% wash of its hue.

### Neutral
- **Night Navy** (ground): the page, form field fills, and the ink on accent fills.
- **Deep Slate** (surface): cards, mini cards, panels, dialogs and the open mobile menu.
- **Plate Black** (plate-ground): behind every photo and logo, darker than the card so plates read as inset.
- **Frost** (text) and **White** (heading): body copy and every heading, name and figure value.
- **Frost Muted** (muted): section intros, mini card copy, figure labels, captions, nav links at rest and the footer.
- **Hairlines** (hairline, hairline-strong, hairline-hover): 1 px card borders and dividers, ghost and field borders, and the field border on hover.
- **Tag Grey** (tag-ink on tag-bg, tag-bg-hover): neutral pill tags and the icon button hover fills.
- **Plot White** (plot-ground): the ground behind plots and drawings exported on white, so they never sit on a dark plate.
- **Status inks** (ok-ink, error-ink): the contact form's inline result line.

### Named Rules
**The Ground Ink Rule.** Text on a Steel Blue fill is the ground colour (#101a20), never white; white on this blue fails AA.

**The Separate Tracks Rule.** Track badges use their own tints and never borrow the accent; the accent means "act here", a badge means "which part of his life".

## Typography

**Display Font:** Manrope (with a metric-matched Arial fallback, then system-ui)
**Body Font:** Manrope
**Label/Mono Font:** none; labels are Manrope at 500 or 800

**Character:** One geometric grotesque doing everything, with the contrast carried by weight (800 against 400) and tight negative tracking on the large sizes.

### Hierarchy
- **Display** (800, 44 to 64 px fluid, 1.02, -0.035em): the name in the hero only, in two stacked lines with the surname in the accent.
- **Headline** (800, 40 px, 1.15, -0.025em; 32 px on phones): section titles, left-aligned.
- **Title** (800, 28 px, 1.2, -0.02em; 24 px on phones): featured card titles. Dialog titles step down to 24 px (20 px on phones), experience employers to 20 px.
- **Title small** (800, 19 px, 1.25; 20 px on phones): mini card titles.
- **Figure** (800, 30 px, 1.1, -0.02em, tabular numerals, no wrap): key figure values; units sit at 0.6em in the body colour. A card with one figure sets it at the same size, never larger.
- **Lede** (400, 22 px, 1.5, 40ch; 19 px on phones): the hero sentence.
- **Body** (400, 17 px, 1.6; 16 px on phones): running copy, measure 60 to 65ch; About and Contact copy run at 19 px.
- **Caption** (400, 14 px, 1.4, muted): figure captions under plates and the clip.
- **Label** (500, 13 px): pill tags and figure labels. **Label strong** (800, 13 px, +0.01em) is the badge.
- Buttons and links: pills at 16 px 800 (ghost at 500), small pills and card links at 15 px 800.

### Named Rules
**The Three Weights Rule.** Manrope at 400, 500 and 800 only. No 600 or 700, no second family.

**The Balanced Heading Rule.** Headings use `text-wrap: balance`, paragraphs `text-wrap: pretty`.

## Layout

A single 1200 px frame with 32 px gutters (16 px on phones), sections stacked with 64 px above each, and a top bar 84 px tall (72 px at tablet, 64 px on phones). The spacing scale is 4, 8, 12, 16, 20, 24, 32, 48, 64, 96 px, and gaps and paddings use it throughout.

The hero is a two-column grid (copy, then a 420 px portrait plate; 340 px at tablet) filling the viewport up to 900 px tall, stacking below 760 px. Featured projects sit in a two-column card grid with no holes: a pair, a wide card spanning both columns with its plate left, the pendulum signature spanning both columns, then a pair. The grid drops to one column at 860 px. Also-built mini cards run four columns, two at tablet, one on phones. Experience, About and Contact are each one surface panel: experience as rows (128 px logo plate, employer and role, date and link on the right), About as photo plate plus paragraph, Contact as link pills beside the form, stacked at tablet.

Breakpoints, as built: 1180 px (signature card rebalances, four-figure rows go to two), 1023 px (nav behind a toggle, signature card stacks), 860 px (one-column cards), 760 px (hero and About stack), 640 px (phone type and padding).

## Elevation & Depth

Depth is a hybrid: three tonal layers (ground, surface, plate ground) carry the structure, and soft, wide, pure-black shadows lift plates and cards off the ground. Shadows are ambient, never directional or hard-edged, and they deepen only on hover or for a modal.

### Shadow Vocabulary
- **Plate** (`box-shadow: 0 24px 60px rgba(0, 0, 0, 0.45)`): the hero portrait, photos inside dialogs, and the open mobile menu.
- **Lift** (`box-shadow: 0 32px 72px rgba(0, 0, 0, 0.55)`): the hero plate on hover and the open dialog.
- **Card** (`box-shadow: 0 12px 32px rgba(0, 0, 0, 0.35)`): cards, mini cards and panels at rest.
- **Card hover** (`box-shadow: 0 18px 40px rgba(0, 0, 0, 0.45)`): cards and mini cards when lifted.
- **Pill** (`box-shadow: 0 12px 28px rgba(0, 0, 0, 0.35)`, hover `0 16px 32px rgba(0, 0, 0, 0.45)`): the solid pill only.

### Named Rules
**The Lift On Hover Rule.** Plates and cards rise 4 px with the next shadow step over 220 ms, only on fine pointers with hover and never under reduced motion. The solid pill rises 2 px.

## Shapes

Soft rounded rectangles and full pills, nothing sharp. Cards, panels, dialogs and the hero plate use the plate radius (20 px); mini cards, the About photo, the plot and dialog images use the thumb radius (16 px); form fields use 12 px; every button, badge, tag and icon button is a full pill. Borders are 1 px hairlines; plates inside cards clip to the card's corners. The only overlap in the system is the pendulum plot plate breaking out over the clip's lower corner and past the card edge.

## Components

### Buttons (pills)
Confident, filled and round.
- **Shape:** full pill (999px), 52 px tall, 32 px side padding, 16 px at 800.
- **Solid:** Steel Blue fill, ground ink, pill shadow. Hover goes to Steel Blue Lifted, deeper shadow, 2 px rise; active returns to rest; disabled (while sending) sits at 0.85 opacity with a progress cursor.
- **Ghost:** Tag Grey wash with a strong hairline, Frost text at 500. Hover tints with the accent wash and accent line; active uses the stronger grey wash.
- **Small:** 44 px tall, 24 px padding, 15 px; used for link pills in dialogs and Contact.
- **See more:** a 44 px outline pill in the accent line with Pale Steel text, filling with the accent wash on hover. Hidden without JavaScript.
- **Icon buttons** (menu toggle, dialog close): 44 px circles with a hairline border and an inline SVG stroke icon; the menu lines morph into a cross when open.
- **Focus:** a 2 px Steel Blue outline at 3 px offset on everything; plate buttons draw it inset with a dark halo so it shows over photos.

### Chips (badges and tags)
- **Badges:** 28 px pills, 12 px padding, 13 px at 800, in the track tint for Work, School or Personal. One per card and dialog head.
- **Tags:** neutral pills with a hairline, 13 px at 500, at most three per card; hover brightens the wash and border.

### Cards / Containers
- **Corner Style:** 20 px for featured cards, 16 px for mini cards.
- **Background:** Deep Slate, with the photo plate on Plate Black above the body.
- **Shadow Strategy:** card shadow at rest, card hover shadow plus a 4 px lift on hover.
- **Border:** 1 px hairline; the pendulum card uses the signature line instead.
- **Internal Padding:** 32 px for featured card bodies (32 by 48 px on the wide card, 20 px on phones), 16 by 20 px for mini cards.
- **Order inside:** badge, title, hook (one or two sentences), figures, tags, then a footer with links and "See more" pinned to the bottom.

### Key figures
A row of up to four figures under a hairline: a 30 px 800 white value with its 13 px muted label beneath, four columns (two on narrow cards and phones). Values count up once from zero over 600 ms when the row is 60% visible; ratios such as 9:1 count only their leading number.

### Card dialogs
A native modal per project, 880 px wide, Deep Slate with a strong hairline and the lift shadow over an 80% near-black backdrop. A sticky header carries the badge, a 24 px title and the close button. The body holds every image as 16 px rounded plates in a one- or two-column grid with a 14 px muted caption under each, then one paragraph, the figures again and link pills. It opens with a fade and 8 px rise over 220 ms, locks page scroll, closes on Escape or a backdrop click, and returns focus to the card's "See more".

### Signature card (pendulum)
The one card with a different anatomy: the looping clip fills two thirds, the white step-response plot plate (16 px radius) overlaps its lower right corner and the card edge, and the copy sits on the right. The plot wipes in left to right (`clip-path` from `inset(0 100% 0 0)` to `inset(0 0 0 0)`) over 1.1 s once it is half visible. The clip loads only when the card is within 600 px and plays only while on screen; under reduced motion it never loads and the poster stays. On phones it becomes a plain stacked card with a square-cornered clip.

### Inputs / Fields
- **Style:** 48 px tall (textarea 120 px), ground fill, 1 px strong hairline, 12 px radius, 16 px text; labels above at 15 px 500.
- **Focus:** border turns Steel Blue plus the standard focus outline at 2 px offset; hover brightens the hairline.
- **Error / Status:** the inline result line under the form, green ink for sent, coral ink with role alert for a failure.

### Navigation
- **Desktop:** brand at 18 px 800 on the left; links at 16 px 500 in Frost Muted on the right, 44 px targets, turning white with a 2 px accent underline on hover and Pale Steel when pressed.
- **Tablet and phone (below 1024 px):** one 44 px toggle opens a dropdown panel in Deep Slate with the plate radius and shadow; links become 48 px rows at 17 px with a grey wash on hover. Escape or a link click closes it. Without JavaScript the links wrap inline instead.

### Motion
- **Load sequence:** hero only (bar, name, sentence, actions, plate) rising 14 px from transparent over 600 ms, staggered 70 ms, on the shared ease `cubic-bezier(0.2, 0.8, 0.2, 1)`.
- **Reveals:** section heads and cards fade up 14 px over 500 ms once, when 15% visible, staggered 70 ms within a row; anything already above the viewport settles at once, so anchor jumps never leave hidden content.
- **State changes:** 200 ms on the shared ease for colour, border and pill changes; 220 ms for lifts and the dialog.
- **Reduced motion:** no sequence, no reveals, no wipe, no count, no lift, no smooth scroll, poster in place of the clip. All hidden states depend on the `js` class, so content is visible without JavaScript.

## Do's and Don'ts

### Do:
- **Do** put ground-coloured text (#101a20) on every Steel Blue fill.
- **Do** build every new project unit as badge, title, hook, figures, tags, links and "See more", with the detail in its dialog.
- **Do** set photos in Plate Black plates with the 20 px or 16 px radius, and put white-ground drawings and plots on Plot White.
- **Do** keep final values in the markup for anything that animates, and gate every hidden starting state behind the `js` class and `prefers-reduced-motion: no-preference`.
- **Do** keep interactive targets at least 44 px tall.
- **Do** use the spacing scale (4 to 96 px) and the 200 / 220 ms timings on the shared ease.

### Don't:
- **Don't** use bullets or Role and Outcome labels in a project unit.
- **Don't** put labels above headings, centre the section titles, or add the blueprint grid texture or a side rail.
- **Don't** tie any motion to scroll position or replay a reveal; motion plays once.
- **Don't** set a single key figure larger than 30 px to fill space.
- **Don't** add a second typeface or a weight outside 400 / 500 / 800.
- **Don't** colour a track badge with the accent, or use purple anywhere.
