import fs from "node:fs/promises";
import path from "node:path";
import {remark} from "remark";
import html from "remark-html";
import {contentRoot} from "./root";
import {pickText, toPlainText} from "../utils";

export type WritingPost = {
  id: string;
  slug: string;
  title: string;
  date: string;
  summary: string;
  cover?: string;
  tags: string[];
  topics?: string[];
  featured?: boolean;
  readingTime?: number;
  distribution?: {
    wechatUrl?: string;
    facebookPostUrl?: string;
    syncMode?: string;
  };
  html?: string;
};

type WritingIndexItem = {
  id: string;
  slug?: string;
  publishedDate: string;
  title: {zh?: string; en?: string};
  excerpt?: {zh?: string; en?: string};
  tags?: string[];
  topics?: string[];
  featured?: boolean;
  readingTime?: number;
  cover?: string;
  source?: {
    wechat?: string;
  };
};

const indexPath = path.join(contentRoot, "index.json");

const sortByDateDesc = (posts: WritingPost[]) =>
  [...posts].sort(
    (left, right) =>
      new Date(right.date).getTime() - new Date(left.date).getTime()
  );

const parseMarkdown = async (raw: string) => {
  const file = await remark().use(html).process(raw);
  return String(file);
};

const toPost = (item: WritingIndexItem): WritingPost => {
  const slug = item.slug || item.id;
  return {
    id: item.id,
    slug,
    title: pickText(item.title),
    date: item.publishedDate,
    summary: pickText(item.excerpt),
    cover: item.cover,
    tags: item.tags || [],
    topics: item.topics || [],
    featured: Boolean(item.featured),
    readingTime: item.readingTime,
    distribution: item.source?.wechat
      ? {
          wechatUrl: item.source.wechat,
          syncMode: "manual"
        }
      : undefined
  };
};

export const getAllWritingPosts = async () => {
  const raw = await fs.readFile(indexPath, "utf8");
  const items = JSON.parse(raw) as WritingIndexItem[];
  return sortByDateDesc(items.map(toPost));
};

export const getWritingPostBySlug = async (slug: string) => {
  const posts = await getAllWritingPosts();
  const matched = posts.find(post => post.slug === slug);

  if (!matched) return null;

  const markdownPath = path.join(contentRoot, "articles", `${matched.id}.zh.md`);
  const rawMarkdown = await fs.readFile(markdownPath, "utf8");
  const html = await parseMarkdown(rawMarkdown);

  return {
    ...matched,
    html,
    summary: matched.summary || toPlainText(rawMarkdown).slice(0, 180)
  };
};

export const getFeaturedWritingPosts = async (limit = 3) => {
  const posts = await getAllWritingPosts();
  return posts.filter(post => post.featured).slice(0, limit);
};

export const getWritingArchiveYears = async () => {
  const posts = await getAllWritingPosts();
  const years = new Map<
    string,
    {year: string; count: number; latestDate: string}
  >();

  posts.forEach(post => {
    const year = post.date.slice(0, 4);
    if (!year) return;
    if (!years.has(year)) {
      years.set(year, {year, count: 0, latestDate: post.date});
    }
    const entry = years.get(year)!;
    entry.count += 1;
  });

  return Array.from(years.values()).sort(
    (left, right) => Number(right.year) - Number(left.year)
  );
};
