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
  "videos.json"
);
const args = process.argv.slice(2);
const argMap = {};

for (let i = 0; i < args.length; i += 1) {
  const key = args[i];
  const value = args[i + 1];
  if (!key || !key.startsWith("--")) continue;
  argMap[key.replace("--", "")] = value;
}

const required = ["id", "title-zh", "date", "category", "thumbnail"];
const missing = required.filter(key => !argMap[key]);
if (missing.length > 0) {
  console.error(
    `Missing required arguments: ${missing.join(", ")}\n` +
      "Usage:\n" +
      'npm run new:video -- --id video-id --title-zh "标题" --date 2026-02-06 --category documentary --thumbnail "https://img.xxx.com/cover.jpg" --platform youtube --video-id "abc123"\n'
  );
  process.exit(1);
}

if (!/^\d{4}-\d{2}-\d{2}$/.test(argMap.date)) {
  console.error("`--date` must be in YYYY-MM-DD format.");
  process.exit(1);
}

const index = JSON.parse(fs.readFileSync(indexPath, "utf8"));
if (index.some(item => item.id === argMap.id)) {
  console.error(`Video id already exists: ${argMap.id}`);
  process.exit(1);
}

const tags = (argMap.tags || "")
  .split(",")
  .map(tag => tag.trim())
  .filter(Boolean);

index.push({
  id: argMap.id,
  title: {
    zh: argMap["title-zh"],
    en: argMap["title-en"] || ""
  },
  description: {
    zh: argMap["desc-zh"] || "",
    en: argMap["desc-en"] || ""
  },
  platform: argMap.platform || "youtube",
  videoId: argMap["video-id"] || "",
  thumbnailUrl: argMap.thumbnail,
  category: argMap.category,
  awards: [],
  publishedDate: argMap.date,
  duration: Number(argMap.duration || 0),
  tags
});

fs.writeFileSync(indexPath, `${JSON.stringify(index, null, 2)}\n`);
console.log(`Created video entry: ${argMap.id}`);
