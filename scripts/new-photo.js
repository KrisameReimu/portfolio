#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const root = process.cwd();
const indexPath = path.join(
  root,
  "apps",
  "web",
  "public",
  "content",
  "photos.json"
);
const args = process.argv.slice(2);
const argMap = {};

for (let i = 0; i < args.length; i += 1) {
  const key = args[i];
  const value = args[i + 1];
  if (!key || !key.startsWith("--")) continue;
  argMap[key.replace("--", "")] = value;
}

const required = ["id", "title-zh", "date", "category", "url"];
const missing = required.filter(key => !argMap[key]);
if (missing.length > 0) {
  console.error(
    `Missing required arguments: ${missing.join(", ")}\n` +
      "Usage:\n" +
      'npm run new:photo -- --id photo-id --title-zh "标题" --date 2026-02-06 --category urban --url "https://img.xxx.com/a.jpg" --thumbnail "https://img.xxx.com/a_thumb.jpg"\n'
  );
  process.exit(1);
}

if (!/^\d{4}-\d{2}-\d{2}$/.test(argMap.date)) {
  console.error("`--date` must be in YYYY-MM-DD format.");
  process.exit(1);
}

const index = JSON.parse(fs.readFileSync(indexPath, "utf8"));
if (index.some(item => item.id === argMap.id)) {
  console.error(`Photo id already exists: ${argMap.id}`);
  process.exit(1);
}

const tags = (argMap.tags || "")
  .split(",")
  .map(tag => tag.trim())
  .filter(Boolean);

index.push({
  id: argMap.id,
  url: argMap.url,
  thumbnail: argMap.thumbnail || argMap.url,
  title: {
    zh: argMap["title-zh"],
    en: argMap["title-en"] || ""
  },
  description: {
    zh: argMap["desc-zh"] || "",
    en: argMap["desc-en"] || ""
  },
  category: argMap.category,
  captureDate: argMap.date,
  tags,
  exifData: {
    camera: argMap.camera || "",
    settings: argMap.settings || ""
  }
});

fs.writeFileSync(indexPath, `${JSON.stringify(index, null, 2)}\n`);
console.log(`Created photo entry: ${argMap.id}`);
