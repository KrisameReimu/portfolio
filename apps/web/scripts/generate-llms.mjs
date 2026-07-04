import fs from "node:fs/promises";
import path from "node:path";

const appRoot = process.cwd();
const repoRoot = path.resolve(appRoot, "..", "..");
const contentRoot = path.join(repoRoot, "public", "content");
const outputRoot = path.join(appRoot, "public");
const siteUrl = "https://www.chenchen-echo.com";

const readJson = async filePath =>
  JSON.parse(await fs.readFile(filePath, "utf8"));

const pickText = value =>
  typeof value === "string" ? value : value?.en || value?.zh || "";

const buildWritingLines = async () => {
  const entries = await readJson(path.join(contentRoot, "index.json"));

  return entries
    .slice()
    .sort(
      (left, right) =>
        new Date(right.publishedDate).getTime() -
        new Date(left.publishedDate).getTime()
    )
    .slice(0, 8)
    .map(entry => {
      const slug = entry.slug || entry.id;
      const title = pickText(entry.title);
      const summary = pickText(entry.excerpt);
      return `- [${title}](${siteUrl}/writing/${slug}): ${summary}`;
    });
};

const buildProjectLines = async () => {
  const projectIndex = await readJson(path.join(contentRoot, "projects", "index.json"));

  const projects = await Promise.all(
    projectIndex.projects.map(async entry => {
      const filePath = path.join(contentRoot, "projects", `${entry.slug}.json`);
      return readJson(filePath);
    })
  );

  return projects.map(project => {
    const title = pickText(project.title);
    const summary =
      pickText(project.heroSummary) ||
      project.hero?.problem?.en ||
      project.hero?.problem?.zh ||
      pickText(project.flagship?.problem) ||
      "";

    return `- [${title}](${siteUrl}/projects/${project.slug}): ${summary}`;
  });
};

const buildLlmsTxt = async () => {
  const writingLines = await buildWritingLines();
  const projectLines = await buildProjectLines();

  return `# Echo Chen

> Canonical personal site for Echo Chen's writing, engineering dossiers, and multimedia archive.

This website is static-first and intended to be the durable source of record for authored essays, project case studies, and public-facing identity context.

## Primary Pages
- [Home](${siteUrl}/): Editorial entry point to the site and current positioning.
- [Writing](${siteUrl}/writing): Long-form essays and reflections on stable URLs.
- [Projects](${siteUrl}/projects): Engineering dossiers organized around problem, scope, implementation, and outcome.
- [Multimedia](${siteUrl}/multimedia): Entry point for photos, videos, and future visual archive surfaces.
- [About](${siteUrl}/about): Author entity page with role, recognition, tools, and current focus.
- [Contact](${siteUrl}/contact): Low-friction contact page.

## Writing
${writingLines.join("\n")}

## Projects
${projectLines.join("\n")}
`;
};

const buildLlmsFullTxt = async () => {
  const writingIndex = await readJson(path.join(contentRoot, "index.json"));
  const projectIndex = await readJson(path.join(contentRoot, "projects", "index.json"));

  const writingEntries = writingIndex
    .slice()
    .sort(
      (left, right) =>
        new Date(right.publishedDate).getTime() -
        new Date(left.publishedDate).getTime()
    )
    .map(entry => {
      const slug = entry.slug || entry.id;
      return [
        `### ${pickText(entry.title)}`,
        `- URL: ${siteUrl}/writing/${slug}`,
        `- Published: ${entry.publishedDate}`,
        `- Tags: ${(entry.tags || []).join(", ") || "none"}`,
        `- Summary: ${pickText(entry.excerpt)}`
      ].join("\n");
    });

  const projectEntries = await Promise.all(
    projectIndex.projects.map(async entry => {
      const project = await readJson(
        path.join(contentRoot, "projects", `${entry.slug}.json`)
      );
      const summary =
        pickText(project.heroSummary) ||
        project.hero?.problem?.en ||
        project.hero?.problem?.zh ||
        pickText(project.flagship?.problem) ||
        "";

      const role = pickText(project.role) || pickText(project.organization) || "Project";
      const timeline = project.heroYear || pickText(project.timeframe) || "ongoing";

      return [
        `### ${pickText(project.title)}`,
        `- URL: ${siteUrl}/projects/${project.slug}`,
        `- Role: ${role}`,
        `- Timeline: ${timeline}`,
        `- Summary: ${summary}`
      ].join("\n");
    })
  );

  return `# Echo Chen — Full LLM Context

> Expanded machine-readable context for Echo Chen's personal website.

This file is a compact companion to the website's human-facing pages. It prioritizes stable public URLs, summaries, and author context over hidden implementation detail.

## Author
- Name: Echo Chen
- Chinese name: 陈琛
- Site: ${siteUrl}
- About: ${siteUrl}/about
- Focus: AI-supported systems, multimedia storytelling, long-form writing

## Writing Archive
${writingEntries.join("\n\n")}

## Project Dossiers
${projectEntries.join("\n\n")}
`;
};

await fs.mkdir(outputRoot, {recursive: true});
await fs.writeFile(path.join(outputRoot, "llms.txt"), await buildLlmsTxt(), "utf8");
await fs.writeFile(
  path.join(outputRoot, "llms-full.txt"),
  await buildLlmsFullTxt(),
  "utf8"
);
