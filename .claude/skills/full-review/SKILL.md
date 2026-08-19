---
name: full-review
description: Runs a full quality pass on chrisalrahi.com — code-reviewer and visual-reviewer in parallel, then fixer applies what they find, then a local commit (no push). Use when the user says "give me a full review", "run a full review", "review and fix the site", or similar — a complete review-and-fix pass, not just a single reviewer.
---

You are orchestrating this repo's review-and-fix pipeline: `code-reviewer` and `visual-reviewer` (read-only findings) feed `fixer` (applies them), then you commit locally and stop for approval before any push. Tell the user briefly what you're about to run before starting.

## 1. Run both reviewers in parallel

In a single message, launch two `Agent` calls:
- `subagent_type: "code-reviewer"` — "Review index.html, assets/css/site.css, and assets/js/site.js for correctness and performance issues, following your standard checklist and runtime pass."
- `subagent_type: "visual-reviewer"` — "Review the rendered site for visual polish, following your standard checklist and runtime pass."

If the user's invocation names a specific area to focus on (e.g. "give me a full review of the hero section"), pass that focus along to both reviewers instead of the generic prompt above.

**Otherwise, scope to what actually changed.** The visual reviewer screenshots every section it is given, which is the slow and expensive part of this pipeline. Before launching, run `git diff --stat HEAD` (and `git status --short`) to see what has been touched since the last commit. If the changes are confined to particular sections of `index.html` or specific CSS rules, name those sections in the `visual-reviewer` prompt so it only renders and checks those. Give `code-reviewer` the changed files.

Run the full site sweep only when the user asks for one ("full sweep", "review the whole site", "everything"), when the working tree is clean so there is no diff to scope by, or when the changes are global (design tokens in `:root`, fonts, `site.js` behaviour that affects every section). Say which mode you picked and why in one sentence, so the user can ask for the wider pass if the narrow one is not what they wanted.

Wait for both to finish. Read each one's Obstacles section too, not just the findings — if a reviewer flags something that blocked it (a permission prompt, a check it couldn't complete), surface that to the user rather than letting it disappear.

## 2. Check whether there's anything to fix

If both reports come back with zero findings, say so, skip straight to a short summary, and stop — do not invoke `fixer` or touch git for a no-op run.

## 3. Run fixer

Invoke `Agent` with `subagent_type: "fixer"`, pasting both full reports into the prompt (or just the one that has findings, if only one does). Let it apply what it can and flag what it can't, per its own brief — don't pre-filter the findings yourself.

## 4. Verify before trusting the summary

Don't take `fixer`'s summary at face value. Run `git status` and `git diff` yourself and confirm the actual changes match what it reported. Confirm nothing unexpected changed — only `index.html`, `assets/css/site.css`, `assets/js/site.js`, and/or `CLAUDE.md` should show up; if something else appears (e.g. a stray screenshot file left in the repo root from the runtime pass), investigate and clean it up before staging anything. Never `git add -A` blindly here — stage the specific files that should have changed.

## 5. Commit locally — do not push

Write a concise, imperative commit message describing what was actually fixed (derive it from `fixer`'s summary, not a generic "apply review findings" — e.g. "Fix card hover lift bug and hero/about grid spacing mismatch"). No em dashes, matching this repo's writing-style convention. Follow the repo's normal commit conventions (see recent `git log` for tone/style). Create the commit.

Then **stop**. Do not run `git push`. Summarize for the user: what both reviewers found, what `fixer` applied, what it skipped and why (e.g. needs new image assets, needed human judgment), and that a commit is sitting locally ready for their review. Explicitly ask whether to push it — do not push without them confirming in this conversation, even if they approved a push once before. This site auto-publishes from `main` via GitHub Pages, and this repo's own convention (`CLAUDE.md`) is that nothing lands on `main` without review.
