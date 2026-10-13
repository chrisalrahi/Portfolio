import fs from "node:fs";
import path from "node:path";

const repoRoot = path.resolve(import.meta.dirname, "..");
const defaultFiles = ["index.html", "deck.html", "404.html"];
const inputFiles = process.argv.slice(2);
const htmlFiles = (inputFiles.length ? inputFiles : defaultFiles).map((file) =>
  path.resolve(repoRoot, file)
);
const skippedPrefixes = /^(?:https?:|mailto:|tel:|data:|javascript:|#)/i;
const missing = [];
let checked = 0;

function displayPath(file) {
  const relative = path.relative(repoRoot, file);
  const displayed = relative && !relative.startsWith("..") ? relative : file;
  return displayed.split(path.sep).join("/");
}

function targetStatus(target) {
  const relative = path.relative(repoRoot, target);
  if (!relative || relative.startsWith("..") || path.isAbsolute(relative)) {
    return { exists: fs.existsSync(target) };
  }

  let parent = repoRoot;
  let caseMismatch = false;
  for (const segment of relative.split(path.sep)) {
    if (!fs.existsSync(parent) || !fs.statSync(parent).isDirectory()) {
      return { exists: false };
    }

    const entries = fs.readdirSync(parent);
    let actual = entries.find((entry) => entry === segment);
    if (!actual) {
      actual = entries.find(
        (entry) => entry.toLowerCase() === segment.toLowerCase()
      );
      if (!actual) return { exists: false };
      caseMismatch = true;
    }
    parent = path.join(parent, actual);
  }

  return { exists: !caseMismatch, actual: caseMismatch ? parent : null };
}

function lineNumber(text, offset) {
  return text.slice(0, offset).split(/\r?\n/).length;
}

function localTarget(reference, sourceFile) {
  const trimmed = reference.trim();
  if (!trimmed || skippedPrefixes.test(trimmed) || trimmed.startsWith("//")) {
    return null;
  }

  const withoutSuffix = trimmed.split(/[?#]/, 1)[0];
  if (!withoutSuffix) return null;

  let decoded;
  try {
    decoded = decodeURIComponent(withoutSuffix);
  } catch {
    decoded = withoutSuffix;
  }

  return decoded.startsWith("/")
    ? path.resolve(repoRoot, `.${decoded}`)
    : path.resolve(path.dirname(sourceFile), decoded);
}

function checkReference(reference, sourceFile, line) {
  const target = localTarget(reference, sourceFile);
  if (!target) return;

  checked += 1;
  const status = targetStatus(target);
  if (!status.exists) {
    missing.push({
      source: displayPath(sourceFile),
      line,
      reference,
      target: displayPath(target),
      actual: status.actual ? displayPath(status.actual) : null,
    });
  }
}

function attributeValue(attributes, name) {
  const pattern = new RegExp(
    `(?:^|\\s)${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`,
    "i"
  );
  const match = attributes.match(pattern);
  return match ? match[1] ?? match[2] ?? match[3] : null;
}

function checkCssUrls(text, sourceFile, baseLine = 1) {
  const pattern = /url\(\s*(?:"([^"]*)"|'([^']*)'|([^)'"\s]+))\s*\)/gi;
  for (const match of text.matchAll(pattern)) {
    const reference = match[1] ?? match[2] ?? match[3];
    const line = baseLine + lineNumber(text, match.index) - 1;
    checkReference(reference, sourceFile, line);
  }
}

function srcsetCandidates(value) {
  const candidates = [];
  let position = 0;

  while (position < value.length) {
    while (/[\s,]/.test(value[position] ?? "")) position += 1;
    const start = position;
    while (position < value.length && !/\s/.test(value[position])) position += 1;
    let url = value.slice(start, position);

    if (url.endsWith(",")) {
      url = url.replace(/,+$/, "");
    } else {
      let parentheses = 0;
      while (position < value.length) {
        const character = value[position];
        if (character === "(") parentheses += 1;
        if (character === ")") parentheses = Math.max(0, parentheses - 1);
        position += 1;
        if (character === "," && parentheses === 0) break;
      }
    }

    if (url) candidates.push(url);
  }

  return candidates;
}

function scanHtml(file) {
  const html = fs.readFileSync(file, "utf8");
  const htmlWithoutScripts = html.replace(
    /(<script\b[^>]*>)([\s\S]*?)(<\/script>)/gi,
    (block, openingTag, content, closingTag) =>
      openingTag + content.replace(/[^\r\n]/g, " ") + closingTag
  );
  const cssFiles = new Set();
  const tagPattern = /<([a-z][\w:-]*)(\s[^<>]*?)?>/gi;

  for (const match of htmlWithoutScripts.matchAll(tagPattern)) {
    const tag = match[1].toLowerCase();
    const attributes = match[2] ?? "";
    const line = lineNumber(html, match.index);

    for (const name of [
      "href",
      "src",
      "poster",
      "data-sc-src",
      "data-sc-src-mobile",
    ]) {
      const value = attributeValue(attributes, name);
      if (value !== null) checkReference(value, file, line);
    }

    const srcset = attributeValue(attributes, "srcset");
    if (srcset !== null) {
      for (const candidate of srcsetCandidates(srcset)) {
        checkReference(candidate, file, line);
      }
    }

    const inlineStyle = attributeValue(attributes, "style");
    if (inlineStyle !== null) checkCssUrls(inlineStyle, file, line);

    if (tag === "link") {
      const rel = attributeValue(attributes, "rel") ?? "";
      const href = attributeValue(attributes, "href");
      if (/\bstylesheet\b/i.test(rel) && href !== null) {
        const cssFile = localTarget(href, file);
        if (cssFile && fs.existsSync(cssFile)) cssFiles.add(cssFile);
      }
    }
  }

  const stylePattern = /<style\b[^>]*>([\s\S]*?)<\/style>/gi;
  for (const match of html.matchAll(stylePattern)) {
    const content = match[1];
    const contentOffset = match.index + match[0].indexOf(content);
    checkCssUrls(content, file, lineNumber(html, contentOffset));
  }

  for (const cssFile of cssFiles) {
    const css = fs.readFileSync(cssFile, "utf8");
    checkCssUrls(css, cssFile);
  }
}

for (const file of htmlFiles) {
  if (!fs.existsSync(file)) {
    checked += 1;
    missing.push({
      source: displayPath(file),
      line: 1,
      reference: displayPath(file),
      target: displayPath(file),
    });
    continue;
  }
  scanHtml(file);
}

console.log(`checked ${checked}, missing ${missing.length}`);
for (const item of missing) {
  const reason = item.actual
    ? `case mismatch, on disk as ${item.actual}`
    : item.target;
  console.log(`${item.source}:${item.line}: ${item.reference} -> ${reason}`);
}

if (missing.length > 0) process.exitCode = 1;
