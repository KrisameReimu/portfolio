import path from "node:path";

export const repoRoot = path.resolve(process.cwd(), "..", "..");
export const contentRoot = path.join(repoRoot, "public", "content");
