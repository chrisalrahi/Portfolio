// Verification for the redesign build. Run from this folder: node check-site.mjs (Node 24, no dependencies).
// Prints every check and exits 1 if any fails.
import { readFileSync, existsSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => readFileSync(join(here, p), 'utf8');

const pages = { 'index.html': read('index.html'), '404.html': read('404.html') };
const assets = { 'assets/css/site.css': read('assets/css/site.css'), 'assets/js/site.js': read('assets/js/site.js') };
const pack = readFileSync(resolve(here, 'content/content.md'), 'utf8');
const index = pages['index.html'];

const results = [];
const report = (n, name, problems, note) => results.push({ n, name, problems, note });

const stripCode = (html) => html
  .replace(/<!--[\s\S]*?-->/g, ' ')
  .replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
  .replace(/<style\b[\s\S]*?<\/style>/gi, ' ');

const ENTITIES = { amp: '&', nbsp: ' ', copy: '©', plusmn: '±', ndash: '–', mdash: '—', deg: '°', lt: '<', gt: '>', quot: '"', apos: "'", rsquo: '’', lsquo: '‘', hellip: '…', middot: '·' };
const decode = (s) => s
  .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
  .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
  .replace(/&([a-z]+);/gi, (m, n) => ENTITIES[n.toLowerCase()] ?? m);

// Visible text: text nodes outside head, script, style, noscript, svg, template, video and .sr-only.
// Text inside <dialog> is returned separately (dialogs are closed when the page loads).
const INLINE = new Set(['a', 'abbr', 'b', 'bdi', 'bdo', 'button', 'cite', 'code', 'data', 'dfn', 'em', 'i', 'kbd', 'label', 'mark', 'q', 's', 'samp', 'small', 'span', 'strong', 'sub', 'sup', 'time', 'u', 'var']);
const VOID = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr']);
const HIDDEN = new Set(['head', 'title', 'script', 'style', 'noscript', 'svg', 'template', 'video', 'textarea', 'select']);
function visibleText(html) {
  const out = { page: '', dialogs: '' };
  const stack = [];
  const re = /<!--[\s\S]*?-->|<!doctype[^>]*>|<(\/)?([a-zA-Z][\w-]*)((?:[^>"']|"[^"]*"|'[^']*')*)>|([^<]+)/gi;
  const src = html.replace(/<script\b[\s\S]*?<\/script>/gi, ' ').replace(/<style\b[\s\S]*?<\/style>/gi, ' ');
  let m;
  while ((m = re.exec(src))) {
    const top = stack[stack.length - 1] || { hidden: false, dialog: false };
    if (m[4] !== undefined) {
      if (top.hidden) continue;
      if (top.dialog) out.dialogs += decode(m[4]); else out.page += decode(m[4]);
      continue;
    }
    if (!m[2]) continue;
    const tag = m[2].toLowerCase();
    const attrs = m[3] || '';
    const sep = INLINE.has(tag) ? '' : ' ';
    if (top.dialog) out.dialogs += sep; else out.page += sep;
    if (m[1]) {
      for (let i = stack.length - 1; i >= 0; i--) {
        if (stack[i].tag === tag) { stack.length = i; break; }
      }
      continue;
    }
    if (VOID.has(tag) || /\/\s*$/.test(attrs)) continue;
    const srOnly = /\sclass="[^"]*\bsr-only\b[^"]*"/.test(attrs);
    const hiddenAttr = /\shidden(?=[\s=>]|$)/.test(attrs);
    stack.push({ tag, hidden: top.hidden || HIDDEN.has(tag) || srOnly || hiddenAttr, dialog: top.dialog || tag === 'dialog' });
  }
  return out;
}
const words = (t) => t.split(/\s+/).filter((w) => /[A-Za-z0-9]/.test(w));

// 1. Tag balance
{
  const TAGS = ['div', 'section', 'main', 'header', 'footer', 'nav', 'ul', 'li', 'a', 'p', 'figure', 'form', 'label', 'button', 'dialog', 'article', 'dl'];
  const problems = [];
  for (const [name, html] of Object.entries(pages)) {
    const h = stripCode(html);
    for (const t of TAGS) {
      const open = (h.match(new RegExp(`<${t}(?=[\\s>])`, 'gi')) || []).length;
      const close = (h.match(new RegExp(`</${t}\\s*>`, 'gi')) || []).length;
      if (open !== close) problems.push(`${name}: <${t}> opened ${open}, closed ${close}`);
    }
  }
  report(1, 'tag balance', problems, `${Object.keys(pages).join(', ')}; ${17} tag types`);
}

// 2. Every local src, href and poster resolves to a file on disk
{
  const problems = [];
  let count = 0;
  for (const [name, html] of Object.entries(pages)) {
    const h = stripCode(html);
    const ids = new Set([...h.matchAll(/\sid="([^"]+)"/g)].map((x) => x[1]));
    for (const [, attr, raw] of h.matchAll(/\s(src|href|poster)="([^"]*)"/gi)) {
      const value = decode(raw);
      if (value.startsWith('#')) {
        if (value.length > 1 && !ids.has(value.slice(1))) problems.push(`${name}: anchor ${value} has no target`);
        continue;
      }
      if (!value || /^(https?:|mailto:|tel:|data:|\/\/)/i.test(value)) continue;
      count++;
      const clean = decodeURIComponent(value.split('?')[0].split('#')[0]);
      let path = clean.startsWith('/') ? join(here, clean) : resolve(here, clean);
      if (existsSync(path) && statSync(path).isDirectory()) path = join(path, 'index.html');
      if (!existsSync(path)) problems.push(`${name}: ${attr}="${value}" not found`);
    }
  }
  report(2, 'local files', problems, `${count} local src/href/poster references resolved`);
}

// 3. No em dash anywhere
{
  const problems = [];
  const files = { ...pages, ...assets };
  for (const [name, text] of Object.entries(files)) {
    text.split(/\r?\n/).forEach((line, i) => {
      if (line.includes('—') || /&mdash;|&#8212;|&#x2014;/i.test(line)) problems.push(`${name}:${i + 1}`);
    });
  }
  report(3, 'no em dash', problems, Object.keys(files).join(', '));
}

// 4. Every <img> has width, height and a non-empty alt
{
  const problems = [];
  let count = 0;
  for (const [name, html] of Object.entries(pages)) {
    for (const [tag] of stripCode(html).matchAll(/<img\b[^>]*>/gi)) {
      count++;
      if (!/\swidth="\d+"/.test(tag)) problems.push(`${name}: no width: ${tag.slice(0, 80)}`);
      if (!/\sheight="\d+"/.test(tag)) problems.push(`${name}: no height: ${tag.slice(0, 80)}`);
      if (!/\salt="[^"]+"/.test(tag)) problems.push(`${name}: no alt: ${tag.slice(0, 80)}`);
    }
  }
  report(4, 'img width, height, alt', problems, `${count} images`);
}

// 5. Visible word count under 900 with dialogs closed; all dialogs together under 450
const text = visibleText(index);
const pageWords = words(text.page).length;
const dialogWords = words(text.dialogs).length;
{
  const problems = [];
  if (pageWords >= 900) problems.push(`page has ${pageWords} visible words`);
  if (dialogWords >= 450) problems.push(`dialogs have ${dialogWords} words`);
  report(5, 'visible words', problems, `page ${pageWords} (limit 900), dialogs ${dialogWords} (limit 450)`);
}

// 6. Contact form
{
  const problems = [];
  const form = index.match(/<form\b([^>]*)>([\s\S]*?)<\/form>/i);
  if (!form) problems.push('no form');
  else {
    const action = (form[1].match(/\saction="([^"]*)"/) || [])[1];
    const method = (form[1].match(/\smethod="([^"]*)"/) || [])[1];
    const names = [...form[2].matchAll(/<(?:input|textarea|select)\b[^>]*\sname="([^"]+)"/gi)].map((x) => x[1]);
    if (action !== 'https://formspree.io/f/mldoepqq') problems.push(`action is ${action}`);
    if (method !== 'POST') problems.push(`method is ${method}`);
    if (names.join(',') !== 'name,email,subject,message') problems.push(`fields are ${names.join(', ')}`);
  }
  report(6, 'contact form', problems, 'action, POST, name/email/subject/message');
}

// 7. Every number token in the visible text exists in the pack.
// A token is digits with attached , . : % and a leading plus-minus, plus a following unit word.
// "9-metre" in the pack and "9 m" on the page are the same quantity, so metre is normalized to m on both sides.
{
  const UNIT = '(?:hp|rpm|mm|m|kg|g|V|W|years?|lbs?)';
  const NUM = new RegExp(`(?<![\\w.\\u00b1])\\u00b1?\\d+(?:[.,:]\\d+)*%?(?:\\s?${UNIT}(?!\\w))?`, 'g');
  const norm = (s) => s.replace(/(\d)[\s-]?metres?\b/gi, '$1 m');
  const tokens = (s) => [...norm(s).matchAll(NUM)].map((x) => x[0].replace(/\s+/g, ''));
  const known = new Set(tokens(pack));
  const seen = [...new Set(tokens(`${text.page} ${text.dialogs}`))];
  const problems = seen.filter((t) => !known.has(t)).map((t) => `"${t}" is not in pack/content.md`);
  report(7, 'numbers from the pack', problems, `${seen.length} distinct number tokens: ${seen.join(' ')}`);
}

// 8. Canadian spelling in the visible text, alt text and aria-labels
{
  const attrText = [...index.matchAll(/\s(?:alt|aria-label|title|content)="([^"]*)"/gi)].map((x) => decode(x[1])).join(' ');
  const all = `${text.page} ${text.dialogs} ${attrText}`.replace(/Curtiss-Wright Defense/g, 'Curtiss-Wright').replace(/defense electronics/gi, 'electronics');
  const BANNED = [/\bpractis(?:e|ed|es|ing)\b/i, /\bcolor/i, /\bcenter/i, /\bfavorite/i, /\borganis/i, /\btravel(?:ed|ing|er)\b/i, /\bdefense\b/i, /\blicense\b/i, /\bgray\b/i];
  const problems = BANNED.filter((re) => re.test(all)).map((re) => `matches ${re}`);
  report(8, 'Canadian spelling', problems, 'visible text, dialogs, alt, aria-label and meta content');
}

// 9. site.css + site.js under 110,000 bytes
{
  const bytes = Object.keys(assets).reduce((sum, p) => sum + statSync(join(here, p)).size, 0);
  report(9, 'css + js size', bytes < 110000 ? [] : [`${bytes} bytes`], `${bytes} bytes (limit 110000)`);
}

// Extra: every dialog trigger has a dialog, every dialog has a trigger, a Close button and a label; ids unique
{
  const problems = [];
  const h = stripCode(index);
  const ids = [...h.matchAll(/\sid="([^"]+)"/g)].map((x) => x[1]);
  const dup = ids.filter((id, i) => ids.indexOf(id) !== i);
  if (dup.length) problems.push(`duplicate ids: ${[...new Set(dup)].join(', ')}`);
  const targets = [...h.matchAll(/\sdata-dialog="([^"]+)"/g)].map((x) => x[1]);
  const dialogs = [...h.matchAll(/<dialog\b([^>]*)>([\s\S]*?)<\/dialog>/gi)];
  for (const t of new Set(targets)) if (!dialogs.some((d) => d[1].includes(`id="${t}"`))) problems.push(`trigger for missing dialog ${t}`);
  for (const [, attrs, body] of dialogs) {
    const id = (attrs.match(/\sid="([^"]+)"/) || [])[1];
    if (targets.filter((t) => t === id).length !== 1) problems.push(`${id}: expected 1 card trigger`);
    if (!/aria-labelledby="[^"]+"/.test(attrs)) problems.push(`${id}: no aria-labelledby`);
    if (!/<button class="detail-close" type="button" aria-label="Close">/.test(body)) problems.push(`${id}: no Close button`);
  }
  report('+', 'dialogs and ids', problems, `${dialogs.length} dialogs, ${targets.length} triggers, ${ids.length} unique ids`);
}

let failed = 0;
for (const r of results) {
  const ok = r.problems.length === 0;
  if (!ok) failed++;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${String(r.n).padStart(2)} ${r.name}: ${r.note}`);
  for (const p of r.problems) console.log(`        - ${p}`);
}
console.log(failed ? `\n${failed} check(s) failed` : `\nAll ${results.length} checks passed`);
process.exit(failed ? 1 : 0);
