// Post-build: remove Next.js's baked-in legacy polyfills from the exported chunks.
//
// Next/Turbopack prepends a small feature-detected polyfill module to the client
// entry unconditionally — there is no supported config to omit it. Every feature
// it polyfills EXCEPT URL.canParse is natively supported by the browserslist floor
// declared in package.json (safari >= 16.4 / chrome >= 111 / firefox >= 128 —
// the same floor Tailwind CSS v4 already imposes on the shipped styles), so those
// polyfills are dead code and keep Lighthouse's "Legacy JavaScript" insight red.
//
// This strips ONLY the operands listed in LEGACY_PREFIXES from that module and
// keeps the rest (URL.canParse is genuinely needed on Safari 16.4–16.x).
//
// Fail-safe by design: if the module can't be found, can't be parsed the way we
// expect, or the result fails `node --check`, the original file is left in place
// and the build SUCCEEDS with a warning — the Lighthouse flag would simply come
// back, which the next audit makes visible. This script must never be the reason
// a deploy fails or ships broken JS.

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const CHUNKS_DIR = path.join(process.cwd(), "out", "_next", "static", "chunks");
const MARKER = '"trimStart"in String.prototype||';

// Operand prefixes to drop — each is a self-contained `<feature-test>||(<polyfill>)`
// operand of the module's single top-level comma expression. Array.prototype.flat's
// operand also defines flatMap.
const LEGACY_PREFIXES = [
  '"trimStart"in String.prototype||',
  '"trimEnd"in String.prototype||',
  "Array.prototype.flat||",
  "Object.fromEntries||",
  "Array.prototype.at||",
  "Object.hasOwn||",
];

// After stripping, none of these definition patterns may remain in the module.
const MUST_BE_GONE = [
  "String.prototype.trimStart=",
  "String.prototype.trimEnd=",
  "Array.prototype.flat=",
  "Array.prototype.flatMap=",
  "Object.fromEntries=",
  "Array.prototype.at=",
  "Object.hasOwn=",
];

function warnSkip(msg) {
  console.warn(`strip-legacy-polyfills: ${msg} — leaving build output untouched.`);
}

// Split a comma expression at depth 0. The module body contains no template
// literals and its one regex literal has balanced parens, so plain depth
// tracking is sufficient; every downstream sanity check guards against this
// assumption rotting in a future Next version.
function splitTopLevel(expr) {
  const parts = [];
  let depth = 0;
  let start = 0;
  let inString = null;
  for (let i = 0; i < expr.length; i++) {
    const c = expr[i];
    if (inString) {
      if (c === "\\") i++;
      else if (c === inString) inString = null;
      continue;
    }
    if (c === '"' || c === "'") inString = c;
    else if (c === "(" || c === "{" || c === "[") depth++;
    else if (c === ")" || c === "}" || c === "]") depth--;
    else if (c === "," && depth === 0) {
      parts.push(expr.slice(start, i));
      start = i + 1;
    }
  }
  parts.push(expr.slice(start));
  return depth === 0 ? parts : null;
}

function stripFile(file) {
  const src = fs.readFileSync(file, "utf8");
  const markerAt = src.indexOf(MARKER);
  if (markerAt === -1) return false;

  // The polyfills live in one arrow-function module body: `,NNN,(e,t,n)=>{...}`.
  const arrowAt = src.lastIndexOf("=>{", markerAt);
  if (arrowAt === -1) return warnSkip(`${file}: no module body before marker`);
  const open = src.indexOf("{", arrowAt);
  let depth = 0;
  let close = -1;
  for (let i = open; i < src.length; i++) {
    if (src[i] === "{") depth++;
    else if (src[i] === "}" && --depth === 0) {
      close = i;
      break;
    }
  }
  if (close === -1) return warnSkip(`${file}: unbalanced module body`);
  const body = src.slice(open + 1, close);
  if (body.length > 20000) return warnSkip(`${file}: module body unexpectedly large`);

  const operands = splitTopLevel(body);
  if (!operands) return warnSkip(`${file}: could not split module body`);
  const kept = operands.filter(
    (op) => !LEGACY_PREFIXES.some((p) => op.startsWith(p))
  );
  if (operands.length - kept.length !== LEGACY_PREFIXES.length) {
    return warnSkip(
      `${file}: expected to drop ${LEGACY_PREFIXES.length} polyfills, matched ${operands.length - kept.length}`
    );
  }

  const out = src.slice(0, open + 1) + kept.join(",") + src.slice(close);
  const remaining = MUST_BE_GONE.filter((sig) => out.includes(sig));
  if (remaining.length) {
    return warnSkip(`${file}: still contains ${remaining.join(", ")}`);
  }

  // Must end in .js so `node --check` can infer the (CommonJS) module format.
  const tmp = `${file}.strip-tmp.js`;
  fs.writeFileSync(tmp, out);
  try {
    execFileSync(process.execPath, ["--check", tmp], { stdio: "pipe" });
  } catch (err) {
    fs.rmSync(tmp);
    const detail = err.stderr?.toString().split("\n")[0] ?? err.message;
    return warnSkip(`${file}: stripped output failed syntax check (${detail})`);
  }
  fs.renameSync(tmp, file);
  console.log(
    `strip-legacy-polyfills: ${path.basename(file)} — removed ${src.length - out.length} bytes of dead polyfills`
  );
  return true;
}

if (!fs.existsSync(CHUNKS_DIR)) {
  warnSkip(`${CHUNKS_DIR} not found`);
} else {
  const files = fs
    .readdirSync(CHUNKS_DIR)
    .filter((f) => f.endsWith(".js"))
    .map((f) => path.join(CHUNKS_DIR, f));
  let touched = 0;
  for (const f of files) if (stripFile(f)) touched++;
  if (touched === 0) {
    warnSkip("no chunk contained the polyfill module (Next output changed?)");
  }
}
