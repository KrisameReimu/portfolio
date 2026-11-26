const test = require("node:test");
const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const {spawnSync} = require("node:child_process");
const {
  validateHandoff,
  preflight
} = require("../scripts/import-writing-handoff");

const markdown =
  "# 测试正文\n\n这是一篇纯合成测试文章，只验证出版交接数据结构，不向任何外部渠道发布。\n";
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

test("rejects accidental private links in body and metadata", () => {
  for (const url of [
    "https://docs.google.com/document/d/secret",
    "https://docs.google.com/spreadsheets/d/secret",
    "https://docs.google.com/presentation/d/secret",
    "https://docs.google.com/forms/d/secret",
    "https://DOCS.GOOGLE.COM/spreadsheets/d/secret",
    "https://drive.google.com/file/d/secret",
    "https://accounts.google.com/"
  ]) {
    const doc = fixture();
    doc.body.markdown += url;
    doc.body.sha256 = crypto
      .createHash("sha256")
      .update(doc.body.markdown)
      .digest("hex");
    assert.throws(() => validateHandoff(doc), /private google drive link/i);
    const metadata = fixture();
    metadata.entry.excerpt.zh += url;
    assert.throws(
      () => validateHandoff(metadata),
      /private google drive link/i
    );
  }
});

test("rejects unexpected public metadata and unsafe cover URLs", () => {
  const doc = fixture();
  doc.entry.master_doc_id = "PRIVATE";
  assert.throws(() => validateHandoff(doc), /unexpected public entry field/i);
  delete doc.entry.master_doc_id;
  doc.entry.cover = "https://malicious.example/file.jpg";
  assert.throws(() => validateHandoff(doc), /public image domain/i);
});

test("validates WeChat source type and URL before import", () => {
  for (const value of [null, 123, {}, [], "", " "]) {
    const doc = fixture();
    doc.entry.source = {wechat: value};
    assert.throws(() => validateHandoff(doc), /nonempty text/i);
  }
  for (const value of [
    "not a URL",
    "http://mp.weixin.qq.com/s/test",
    "https://example.org/s/test",
    "https://user@mp.weixin.qq.com/s/test"
  ]) {
    const doc = fixture();
    doc.entry.source = {wechat: value};
    assert.throws(() => validateHandoff(doc), /invalid public wechat source/i);
  }
  const doc = fixture();
  doc.entry.source = {wechat: "https://mp.weixin.qq.com/s/synthetic"};
  assert.deepEqual(validateHandoff(doc).entry.source, doc.entry.source);
});

test("refuses existing article id, URL slug, or body file", () => {
  const index = [{id: entry.id, slug: "another-slug"}];
  assert.throws(() => preflight(fixture(), index), /id already exists/);
  assert.throws(
    () => preflight(fixture(), [{id: "other-article", slug: entry.slug}]),
    /slug already exists/
  );
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "portfolio-handoff-"));
  try {
    const folder = path.join(tmp, "apps/web/public/content/articles");
    fs.mkdirSync(folder, {recursive: true});
    fs.writeFileSync(path.join(folder, entry.id + ".zh.md"), "existing");
    assert.throws(() => preflight(fixture(), [], tmp), /already exists/);
  } finally {
    fs.rmSync(tmp, {recursive: true, force: true});
  }
});

test("refuses invalid dates and unsupported categories", () => {
  const badDate = fixture();
  badDate.entry.publishedDate = "2026-02-30";
  assert.throws(() => validateHandoff(badDate), /valid YYYY-MM-DD/);
  const badCategory = fixture();
  badCategory.entry.category = "unverified";
  assert.throws(
    () => validateHandoff(badCategory),
    /unsupported writing category/i
  );
});

test("CLI dry run, explicit apply, and duplicate refusal in isolated checkout", () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "portfolio-handoff-cli-"));
  try {
    const scripts = path.join(tmp, "scripts");
    const content = path.join(tmp, "apps/web/public/content");
    const articles = path.join(content, "articles");
    fs.mkdirSync(scripts, {recursive: true});
    fs.mkdirSync(articles, {recursive: true});
    const script = path.join(scripts, "import-writing-handoff.js");
    fs.copyFileSync(
      require.resolve("../scripts/import-writing-handoff"),
      script
    );
    const index = path.join(content, "index.json");
    const article = path.join(articles, entry.id + ".zh.md");
    const input = path.join(tmp, "handoff.json");
    fs.writeFileSync(index, "[]\n");
    fs.writeFileSync(input, JSON.stringify(fixture()));
    const run = (...flags) =>
      spawnSync(process.execPath, [script, "--input", input, ...flags], {
        encoding: "utf8"
      });
    const dry = run();
    assert.equal(dry.status, 0, dry.stderr);
    assert.equal(fs.readFileSync(index, "utf8"), "[]\n");
    assert.equal(fs.existsSync(article), false);
    const applied = run("--apply");
    assert.equal(applied.status, 0, applied.stderr);
    assert.equal(fs.readFileSync(article, "utf8"), markdown);
    assert.deepEqual(JSON.parse(fs.readFileSync(index, "utf8")), [entry]);
    const duplicate = run("--apply");
    assert.notEqual(duplicate.status, 0);
    assert.match(duplicate.stderr, /already exists/i);
    assert.equal(fs.readFileSync(article, "utf8"), markdown);
    assert.deepEqual(JSON.parse(fs.readFileSync(index, "utf8")), [entry]);
  } finally {
    fs.rmSync(tmp, {recursive: true, force: true});
  }
});
