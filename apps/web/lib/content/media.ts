import fs from "node:fs/promises";
import path from "node:path";
import {contentRoot} from "./root";
import {pickText} from "../utils";

export type PhotoEntry = {
  id: string;
  title: string;
  date: string;
  year: number;
  location?: string;
  device?: string;
  cover: string;
  url: string;
  tags?: string[];
};

export type VideoEntry = {
  id: string;
  title: string;
  date: string;
  year: number;
  platform?: string;
  thumbnail: string;
  embedUrl?: string;
  description?: string;
  tags?: string[];
};

const photosPath = path.join(contentRoot, "photos.json");
const videosPath = path.join(contentRoot, "videos.json");

export const getAllPhotos = async (): Promise<PhotoEntry[]> => {
  const raw = await fs.readFile(photosPath, "utf8");
  const photos = JSON.parse(raw) as Array<Record<string, unknown>>;

  return photos.map(photo => {
    const date = String(photo.captureDate || photo.date || "");
    const url = String(photo.url || photo.thumbnail || "");

    return {
      id: String(photo.id || photo.slug || url || date),
      title: pickText(photo.title as {zh?: string; en?: string}),
      date,
      year: Number(date.slice(0, 4)) || 0,
      location: typeof photo.location === "string" ? photo.location : undefined,
      device: typeof photo.device === "string" ? photo.device : undefined,
      cover: url,
      url,
      tags: Array.isArray(photo.tags) ? (photo.tags as string[]) : []
    };
  });
};

export const getAllVideos = async (): Promise<VideoEntry[]> => {
  const raw = await fs.readFile(videosPath, "utf8");
  const videos = JSON.parse(raw) as Array<Record<string, unknown>>;

  return videos
    .map(video => {
      const date = String(video.publishedDate || video.date || "");
      const videoId = String(video.videoId || "");
      const platform = String(video.platform || "");

      return {
        id: String(video.id || video.slug || videoId || date),
        title: pickText(video.title as {zh?: string; en?: string}),
        date,
        year: Number(date.slice(0, 4)) || 0,
        platform,
        thumbnail: String(video.thumbnailUrl || ""),
        embedUrl:
          platform === "youtube" && videoId
            ? `https://www.youtube.com/embed/${videoId}`
            : undefined,
        description: pickText(video.description as {zh?: string; en?: string}),
        tags: Array.isArray(video.tags) ? (video.tags as string[]) : []
      };
    })
    .sort(
      (left, right) => new Date(right.date).getTime() - new Date(left.date).getTime()
    );
};
