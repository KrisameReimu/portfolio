import fs from "node:fs";
import path from "node:path";

const appRoot = process.cwd();
const publicDir = path.join(appRoot, "public");
const siteUrl = "https://www.chenchen-echo.com";

const articles = JSON.parse(
  fs.readFileSync(path.join(publicDir, "content", "index.json"), "utf8")
);

const sorted = [...articles]
  .filter(article => article?.id && article?.publishedDate)
  .sort(
    (left, right) =>
      new Date(right.publishedDate).getTime() -
      new Date(left.publishedDate).getTime()
  );

const escapeXml = value =>
  String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");

const items = sorted
  .map(article => {
    const title = article?.title?.zh || article?.title?.en || article.id;
    const description =
      article?.excerpt?.zh || article?.excerpt?.en || "Writing from Echo Chen";
    const slug = article.slug || article.id;

    return `
    <item>
      <title>${escapeXml(title)}</title>
      <link>${siteUrl}/writing/${slug}</link>
      <guid>${siteUrl}/writing/${slug}</guid>
      <pubDate>${new Date(article.publishedDate).toUTCString()}</pubDate>
      <description>${escapeXml(description)}</description>
    </item>`;
  })
  .join("\n");

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Echo Chen Writing</title>
    <link>${siteUrl}/writing</link>
    <description>Writing archive from Echo Chen</description>
    <language>zh-HK</language>
    ${items}
  </channel>
</rss>
`;

fs.mkdirSync(publicDir, {recursive: true});
fs.writeFileSync(path.join(publicDir, "feed.xml"), rss, "utf8");
