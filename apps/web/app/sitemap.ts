import type {MetadataRoute} from "next";
import {getAllProjects} from "../lib/content/projects";
import {getAllWritingPosts} from "../lib/content/writing";
import {siteMeta} from "../lib/site";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, projects] = await Promise.all([
    getAllWritingPosts(),
    getAllProjects()
  ]);

  const staticRoutes = [
    "",
    "/writing",
    "/projects",
    "/multimedia",
    "/multimedia/photos",
    "/multimedia/videos",
    "/photos",
    "/videos",
    "/about",
    "/contact",
    "/awards",
    "/now"
  ];

  return [
    ...staticRoutes.map(route => ({
      url: `${siteMeta.siteUrl}${route}`
    })),
    ...posts.map(post => ({
      url: `${siteMeta.siteUrl}/writing/${post.slug}`
    })),
    ...projects.map(project => ({
      url: `${siteMeta.siteUrl}/projects/${project.slug}`
    }))
  ];
}
