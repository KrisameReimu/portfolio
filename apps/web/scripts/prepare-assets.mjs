import fs from "node:fs";
import path from "node:path";

const appRoot = process.cwd();
const repoRoot = path.resolve(appRoot, "..", "..");
const appPublicDir = path.join(appRoot, "public");
const sourcePublicDir = path.join(repoRoot, "public");

const copyTargets = [
  "content",
  "android-chrome-192x192.png",
  "android-chrome-384x384.png",
  "apple-touch-icon.png",
  "favicon-16x16.png",
  "favicon-32x32.png",
  "favicon.ico",
  "safari-pinned-tab.svg",
  "wechat_qrcode_echo.jpg",
  "ECHOHOME.png"
];

fs.mkdirSync(appPublicDir, {recursive: true});

for (const target of copyTargets) {
  const sourcePath = path.join(sourcePublicDir, target);
  const destinationPath = path.join(appPublicDir, target);

  if (!fs.existsSync(sourcePath)) {
    continue;
  }

  fs.rmSync(destinationPath, {recursive: true, force: true});
  fs.cpSync(sourcePath, destinationPath, {recursive: true});
}
