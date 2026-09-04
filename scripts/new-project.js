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
  "projects.json"
);
const args = process.argv.slice(2);
const argMap = {};

for (let i = 0; i < args.length; i += 1) {
  const key = args[i];
  const value = args[i + 1];
  if (!key || !key.startsWith("--")) continue;
  argMap[key.replace("--", "")] = value;
}

const required = ["id", "title-zh", "status", "cover"];
const missing = required.filter(key => !argMap[key]);
if (missing.length > 0) {
  console.error(
    `Missing required arguments: ${missing.join(", ")}\n` +
      "Usage:\n" +
      'npm run new:project -- --id project-id --title-zh "项目名" --status in-development --cover "https://img.xxx.com/cover.jpg" --tech "Unity,C#,Node.js"\n'
  );
  process.exit(1);
}

const index = JSON.parse(fs.readFileSync(indexPath, "utf8"));
if (index.some(item => item.id === argMap.id)) {
  console.error(`Project id already exists: ${argMap.id}`);
  process.exit(1);
}

const technologies = (argMap.tech || "")
  .split(",")
  .map(item => item.trim())
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
  coverImage: argMap.cover,
  screenshots: [],
  demoVideo: argMap.demo || "",
  downloadLink: argMap.download || "",
  technologies,
  status: argMap.status,
  startDate: argMap["start-date"] || new Date().toISOString().slice(0, 10),
  releaseDate: null,
  highlights: [],
  milestones: []
});

fs.writeFileSync(indexPath, `${JSON.stringify(index, null, 2)}\n`);
console.log(`Created project entry: ${argMap.id}`);
