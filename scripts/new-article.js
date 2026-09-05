#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const root = process.cwd();
const contentDir = path.join(root, "apps", "web", "public", "content");
const indexPath = path.join(contentDir, "index.json");
const articlesDir = path.join(contentDir, "articles");

const args = process.argv.slice(2);
const argMap = {};
for (let i = 0; i < args.length; i += 1) {
  const key = args[i];
  const next = args[i + 1];
  if (!key.startsWith("--")) continue;
  argMap[key.replace("--", "")] = next;
}

const required = ["id", "title-zh", "date", "category"];
const missing = required.filter(key => !argMap[key]);
if (missing.length > 0) {
  console.error(
    `Missing required arguments: ${missing.join(", ")}\n` +
      "Usage:\n" +
      'npm run new:article -- --id my-article --title-zh "标题" --date 2026-02-06 --category reflection --tags "AI,写作" --excerpt-zh "摘要"\n'
  );
  process.exit(1);
}

if (!/^\d{4}-\d{2}-\d{2}$/.test(argMap.date)) {
  console.error("`--date` must be in YYYY-MM-DD format.");
  process.exit(1);
}

if (!fs.existsSync(indexPath)) {
  console.error(`index.json not found: ${indexPath}`);
  process.exit(1);
}

const index = JSON.parse(fs.readFileSync(indexPath, "utf8"));
if (!Array.isArray(index)) {
  console.error("index.json must be an array.");
  process.exit(1);
}

if (index.some(item => item.id === argMap.id)) {
  console.error(`Article id already exists: ${argMap.id}`);
  process.exit(1);
}

const tags = (argMap.tags || "")
  .split(",")
  .map(tag => tag.trim())
  .filter(Boolean);

const entry = {
  id: argMap.id,
  publishedDate: argMap.date,
  title: {
    zh: argMap["title-zh"],
    en: argMap["title-en"] || ""
  },
  excerpt: {
    zh: argMap["excerpt-zh"] || "",
    en: argMap["excerpt-en"] || ""
  },
  category: argMap.category,
  tags,
  readingTime: Number(argMap["reading-time"] || 5),
  featured: argMap.featured === "true"
};

index.push(entry);
fs.writeFileSync(indexPath, `${JSON.stringify(index, null, 2)}\n`);

if (!fs.existsSync(articlesDir)) {
  fs.mkdirSync(articlesDir, {recursive: true});
}

const zhPath = path.join(articlesDir, `${argMap.id}.zh.md`);
if (!fs.existsSync(zhPath)) {
  const zhContent = `# ${argMap["title-zh"]}\n\n在这里写中文正文。\n`;
  fs.writeFileSync(zhPath, zhContent);
}

if (argMap["create-en"] === "true") {
  const enPath = path.join(articlesDir, `${argMap.id}.en.md`);
  if (!fs.existsSync(enPath)) {
    const enTitle = argMap["title-en"] || argMap["title-zh"];
    const enContent = `# ${enTitle}\n\nWrite English content here.\n`;
    fs.writeFileSync(enPath, enContent);
  }
}

console.log(`Created article entry: ${argMap.id}`);
console.log(`Updated: ${indexPath}`);
console.log(`Created: ${zhPath}`);
