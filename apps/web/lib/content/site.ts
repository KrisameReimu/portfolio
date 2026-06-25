import fs from "node:fs/promises";
import path from "node:path";
import {contentRoot} from "./root";
import {pickText} from "../utils";

export type NowState = {
  focus: string;
  doing: string;
  notDoing: string;
  blockers: string;
  nextActions: string;
  weekOf?: string;
};

const nowPath = path.join(contentRoot, "siteos", "now.latest.json");

export const getNowState = async (): Promise<NowState | null> => {
  try {
    const raw = await fs.readFile(nowPath, "utf8");
    const now = JSON.parse(raw) as Record<string, unknown>;

    return {
      focus: pickText(now.focus as {zh?: string; en?: string}),
      doing: pickText(now.doing as {zh?: string; en?: string}),
      notDoing: pickText(now.notDoing as {zh?: string; en?: string}),
      blockers: pickText(now.blockers as {zh?: string; en?: string}),
      nextActions: pickText(now.nextActions as {zh?: string; en?: string}),
      weekOf:
        typeof now.weekOf === "string"
          ? now.weekOf
          : typeof now.updatedAt === "string"
          ? now.updatedAt
          : undefined
    };
  } catch {
    return null;
  }
};
