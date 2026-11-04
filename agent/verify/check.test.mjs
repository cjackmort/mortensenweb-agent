// Tests for check.mjs. No dependencies:  node --test agent/verify/
//
// check.mjs is a command-line script, so each test builds a tiny site in a
// temporary folder and runs the script on it, the way the deploy workflow does.
// CHECK_SCRIPT points the tests at a different copy of the script, which is how
// to see them fail against an older version.

import { test } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const script = resolve(process.env.CHECK_SCRIPT ?? join(here, "check.mjs"));

/** Run the check on one page whose <body> is `body`. */
function check(body) {
  const dir = mkdtempSync(join(tmpdir(), "check-"));
  try {
    writeFileSync(join(dir, "index.html"), `<!doctype html><html lang="en"><head><title>Test</title></head><body><h1>Test</h1>${body}</body></html>`);
    // cwd is the empty folder so a netlify.toml in the caller's directory is not read.
    const run = spawnSync(process.execPath, [script, dir, "--json"], { cwd: dir, encoding: "utf8" });
    const result = JSON.parse(run.stdout);
    return { status: run.status, errors: result.errors.map((e) => e.message), warnings: result.warnings.map((w) => w.message) };
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

const failsWith = (body, pattern) => {
  const { status, errors } = check(body);
  assert.equal(status, 1, `expected exit 1, got ${status}`);
  assert.ok(errors.some((e) => pattern.test(e)), `no error matched ${pattern}: ${JSON.stringify(errors)}`);
};

test("passes a page with real, ordinary content", () => {
  const { status, errors } = check("<p>Open Monday to Friday, 9 to 5.</p>");
  assert.equal(status, 0);
  assert.deepEqual(errors, []);
});

test("fails on [PLACEHOLDER: ...] text", () => {
  failsWith("<p>Licence [PLACEHOLDER: licence number]</p>", /placeholder marker/);
});

test("fails on [PLACEHOLDER] in any case, and when it is inside a comment", () => {
  failsWith("<p>Phone [Placeholder phone]</p>", /placeholder marker/);
  failsWith("<!-- [PLACEHOLDER] replace with a real quote --><p>Hello</p>", /placeholder marker/);
});

test("fails on a [SAMPLE: ...] marker", () => {
  failsWith("<!-- [SAMPLE] replace with real testimonial --><p>Hello</p>", /placeholder marker/);
  failsWith("<p>[SAMPLE: 1,200+ installs]</p>", /placeholder marker/);
});

test("does not fail on a real bracketed word such as [Sample menu]", () => {
  const { status } = check("<p>[Sample menu] is a PDF.</p>");
  assert.equal(status, 0);
});

test("other [BRACKETED CAPS] text is still only a warning", () => {
  const { status, warnings } = check("<p>Call [PHONE NUMBER]</p>");
  assert.equal(status, 0);
  assert.ok(warnings.some((w) => /placeholder/.test(w)));
});

// The strings the template shipped. Written out here on purpose, so removing
// one from the list in check.mjs fails a test instead of passing quietly.
const REMOVED_TEMPLATE_STRINGS = [
  "Called at 11pm with water coming through the ceiling. Tech was there in an hour and had it stopped in twenty minutes. Genuinely saved my house.",
  "Quoted me half what the last company wanted for the same water heater, and they showed me the price list. No games.",
  "Third plumber I tried and the only one who actually found the leak. Been using them for everything since.",
  "Yes. NJ Master Plumber License #12345, fully insured and bonded.",
  "500+ 5-star reviews",
  "27+ Years in business",
  "12,000+ Jobs completed",
  "4.9/5 Average rating",
];

for (const text of REMOVED_TEMPLATE_STRINGS) {
  test(`fails on the removed template text: ${text.slice(0, 40)}`, () => {
    failsWith(`<p>${text}</p>`, /Invented template text/);
  });
}

test("finds the template text when the page splits it across tags, as a built Astro page does", () => {
  failsWith('<div class="stat__value">12,000<!-- -->+</div><div class="stat__label">Jobs completed</div>', /12,000\+ Jobs completed/);
});

test("finds the template text inside a commented-out block and through HTML entities", () => {
  failsWith("<!-- TESTIMONIALS hidden for now <blockquote>Third plumber I tried and the only one who actually found the leak.</blockquote> -->", /Third plumber/);
  failsWith("<p>Quoted me half what the last company wanted for the same water heater, and they showed me the price list. No games.</p>".replace("the same", "&#116;he same"), /Quoted me half/);
});

test("does not fail a client's own figure that happens to resemble one", () => {
  const { status } = check("<p>Rated 4.9/5 on Google by 212 customers.</p>");
  assert.equal(status, 0);
});
