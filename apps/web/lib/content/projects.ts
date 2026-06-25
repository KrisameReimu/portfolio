import fs from "node:fs/promises";
import path from "node:path";
import {contentRoot} from "./root";
import {pickText} from "../utils";

export type ProjectSection = {
  title: string;
  items: string[];
};

export type ProjectDossier = {
  slug: string;
  title: string;
  role: string;
  timeline: string;
  status: string;
  summary: string;
  organization: string;
  stack: string[];
  highlights: string[];
  overview: Array<{label: string; value: string}>;
  sections: ProjectSection[];
  flowGroups: Array<{title: string; steps: string[]}>;
  links: Array<{label: string; href: string}>;
  assets: {
    cover?: string;
  };
};

type ProjectIndex = {
  projects: Array<{slug: string}>;
};

type RawProject = Record<string, unknown>;

const projectIndexPath = path.join(contentRoot, "projects", "index.json");

const normalizeProject = (project: RawProject): ProjectDossier => {
  const slug = String(project.slug || "");

  if (!slug) {
    throw new Error("Project is missing required slug.");
  }

  const title = pickText(project.title as {zh?: string; en?: string});
  const role = pickText(project.role as {zh?: string; en?: string});
  const timeline = pickText(project.timeframe as {zh?: string; en?: string});
  const summary = pickText(project.heroSummary as {zh?: string; en?: string});
  const organization = pickText(
    project.organization as {zh?: string; en?: string}
  );

  const stack = Array.isArray(project.cardHighlights)
    ? (project.cardHighlights as Array<{zh?: string; en?: string}>).map(item =>
        pickText(item)
      )
    : [];

  const overview = Array.isArray(project.overview)
    ? (
        project.overview as Array<{
          label?: {zh?: string; en?: string};
          value?: {zh?: string; en?: string};
        }>
      ).map(item => ({
        label: pickText(item.label),
        value: pickText(item.value)
      }))
    : [];

  const sections = Array.isArray(project.sections)
    ? (
        project.sections as Array<{
          title?: {zh?: string; en?: string};
          items?: Array<{zh?: string; en?: string}>;
        }>
      ).map(section => ({
        title: pickText(section.title),
        items: Array.isArray(section.items)
          ? section.items.map(item => pickText(item))
          : []
      }))
    : [];

  const flowGroups = Array.isArray(project.flowGroups)
    ? (
        project.flowGroups as Array<{
          title?: {zh?: string; en?: string};
          steps?: Array<{zh?: string; en?: string}>;
        }>
      ).map(group => ({
        title: pickText(group.title),
        steps: Array.isArray(group.steps)
          ? group.steps.map(step => pickText(step))
          : []
      }))
    : [];

  const links = [
    ...(Array.isArray(project.demoLinks)
      ? (
          project.demoLinks as Array<{
            label?: {zh?: string; en?: string};
            href?: string;
          }>
        ).map(link => ({
          label: pickText(link.label),
          href: link.href || ""
        }))
      : []),
    ...(Array.isArray(project.embedVideos)
      ? (
          project.embedVideos as Array<{
            title?: {zh?: string; en?: string};
            href?: string;
          }>
        ).map(link => ({
          label: pickText(link.title),
          href: link.href || ""
        }))
      : [])
  ].filter(link => link.href);

  return {
    slug,
    title,
    role,
    timeline,
    status: pickText(
      (project.cardType as {zh?: string; en?: string}) || {en: "Selected Work"}
    ),
    summary,
    organization,
    stack,
    highlights: stack,
    overview,
    sections,
    flowGroups,
    links,
    assets: {
      cover: undefined
    }
  };
};

export const getAllProjects = async () => {
  const raw = await fs.readFile(projectIndexPath, "utf8");
  const projectIndex = JSON.parse(raw) as ProjectIndex;

  const projects = await Promise.all(
    projectIndex.projects.map(async entry => {
      const filePath = path.join(contentRoot, "projects", `${entry.slug}.json`);
      const file = await fs.readFile(filePath, "utf8");
      return normalizeProject(JSON.parse(file) as RawProject);
    })
  );

  return projects;
};

export const getProjectBySlug = async (slug: string) => {
  const projects = await getAllProjects();
  return projects.find(project => project.slug === slug) || null;
};
