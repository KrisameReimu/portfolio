const test = require("node:test");
const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const {validateHandoff, preflight} = require("../scripts/import-writing-handoff");

const markdown = "# 测试正文\n\n这是一篇纯合成测试文章，只验证出版交接数据结构，不向任何外部渠道发布。\n";
const entry = {
  id: "test-editorial-handoff",
  slug: "test-editorial-handoff",
  publishedDate: "2026-11-22",
  title: {zh: "测试作品", en: ""},
  excerpt: {zh: "经确认的测试作品", en: ""},
  category: "essay",
  tags: ["测试"],
  readingTime: 2,
  featured: false
};
const fixture = () => ({
  format: "echo-writing-portfolio-handoff/v1",
  entry: structuredClone(entry),
  body: {
    markdown,
    sha256: crypto.createHash("sha256").update(markdown).digest("hex")
  }
});

test("accepts approved-shape public-only handoff", () => {
  const parsed = validateHandoff(fixture());
  assert.equal(parsed.entry.slug, entry.slug);
  assert.equal(parsed.markdown, markdown);
});

test("rejects tampered markdown hash", () => {
  const doc = fixture();
  doc.body.markdown += " silently changed";
  assert.throws(() => validateHandoff(doc), /hash mismatch/i);
});

test("rejects accidental private links", () => {
  const doc = fixture();
  doc.body.markdown += "https://docs.google.com/document/d/secret";
  doc.body.sha256 = crypto.createHash("sha256").update(doc.body.markdown).digest("hex");
  assert.throws(() => validateHandoff(doc), /private google drive link/i);
});

test("rejects unexpected public metadata and unsafe cover URLs", () => {
  const doc = fixture();
  doc.entry.master_doc_id = "PRIVATE";
  assert.throws(() => validateHandoff(doc), /unexpected public entry field/i);
  delete doc.entry.master_doc_id;
  doc.entry.cover = "https://malicious.example/file.jpg";
  assert.throws(() => validateHandoff(doc), /public image domain/i);
});

test("refuses existing article id, URL slug, or body file", () => {
  const index = [{id:entry.id, slug:"another-slug"}];
  assert.throws(() => preflight(fixture(), index), /id already exists/);
  assert.throws(
    () => preflight(fixture(), [{id:"other-article", slug:entry.slug}]),
    /slug already exists/
  );
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "portfolio-handoff-"));
  try {
    const folder = path.join(tmp, "apps/web/public/content/articles");
    fs.mkdirSync(folder, {recursive:true});
    fs.writeFileSync(path.join(folder, entry.id + ".zh.md"), "existing");
    assert.throws(() => preflight(fixture(), [], tmp), /already exists/);
  } finally {
    fs.rmSync(tmp, {recursive:true, force:true});
  }
});

test("refuses invalid dates and unsupported categories", () => {
  const badDate = fixture();
  badDate.entry.publishedDate = "2026-02-30";
  assert.throws(() => validateHandoff(badDate), /valid YYYY-MM-DD/);
  const badCategory = fixture();
  badCategory.entry.category = "unverified";
  assert.throws(() => validateHandoff(badCategory), /unsupported writing category/i);
});
