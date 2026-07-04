import Link from "next/link";
import PageShell from "../../components/PageShell";
import JsonLd from "../../components/JsonLd";
import styles from "../site.module.scss";
import {
  getAllWritingPosts,
  getFeaturedWritingPosts,
  getWritingArchiveYears
} from "../../lib/content/writing";
import {createMetadata} from "../../lib/metadata";
import {createItemListJsonLd} from "../../lib/structured-data";
import {formatDate} from "../../lib/utils";

export const metadata = createMetadata({
  title: "Writing",
  description:
    "Essays, reflections, and long-form notes from Echo Chen. This archive is designed to remain readable, citable, and durable.",
  path: "/writing"
});

export default async function WritingIndexPage() {
  const [featured, posts, years] = await Promise.all([
    getFeaturedWritingPosts(3),
    getAllWritingPosts(),
    getWritingArchiveYears()
  ]);

  return (
    <PageShell
      eyebrow="Writing Archive"
      title="Long-form writing that stays readable over time."
      summary="This archive keeps essays, reflections, and technical or cultural notes in one calm editorial surface."
    >
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "CollectionPage",
                name: "Writing",
                description: "Writing archive from Echo Chen",
                url: "https://www.chenchen-echo.com/writing"
              },
              createItemListJsonLd(
                "Writing archive",
                posts.map(post => ({
                  name: post.title,
                  path: `/writing/${post.slug}`,
                  description: post.summary
                }))
              )
            ]
          }}
        />

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <h2 className={styles.sectionTitle}>Featured</h2>
            <p className={styles.sectionLead}>
              A small set of essays that best represent the archive right now.
            </p>
          </div>
        </div>
        <div className={styles.list}>
          {featured.map(post => (
            <article key={post.slug} className={styles.articleListItem}>
              <h3>
                <Link href={`/writing/${post.slug}`} className={styles.articleLink}>
                  {post.title}
                </Link>
              </h3>
              <p className={styles.sectionLead}>{post.summary}</p>
              <div className={styles.cardMeta}>
                <span>{formatDate(post.date)}</span>
                <span>{post.readingTime ? `${post.readingTime} min` : "Essay"}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <h2 className={styles.sectionTitle}>Latest writing</h2>
            <p className={styles.sectionLead}>
              Every article stays on a stable URL and remains available as part
              of the long-term archive.
            </p>
          </div>
          <a href="/feed.xml" className={styles.textLink}>
            RSS feed
          </a>
        </div>
        <div className={styles.list}>
          {posts.map(post => (
            <article key={post.slug} className={styles.articleListItem}>
              <h3>
                <Link href={`/writing/${post.slug}`} className={styles.articleLink}>
                  {post.title}
                </Link>
              </h3>
              <p className={styles.sectionLead}>{post.summary}</p>
              <div className={styles.cardMeta}>
                <span>{formatDate(post.date)}</span>
                <span>{post.tags.slice(0, 3).join(" · ") || "Writing"}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <h2 className={styles.sectionTitle}>Archive by year</h2>
            <p className={styles.sectionLead}>
              Year grouping stays visible for people and search systems alike.
            </p>
          </div>
        </div>
        <div className={styles.archiveGrid}>
          {years.map(year => (
            <article key={year.year} className={styles.archiveCard}>
              <h3 className={styles.cardTitle}>{year.year}</h3>
              <p className={styles.sectionLead}>
                {year.count} article{year.count > 1 ? "s" : ""} in this archive
                year.
              </p>
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
