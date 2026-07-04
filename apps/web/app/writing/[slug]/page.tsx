import Link from "next/link";
import {notFound} from "next/navigation";
import JsonLd from "../../../components/JsonLd";
import PageShell from "../../../components/PageShell";
import styles from "../../site.module.scss";
import {
  getAllWritingPosts,
  getWritingPostBySlug
} from "../../../lib/content/writing";
import {createMetadata} from "../../../lib/metadata";
import {siteMeta} from "../../../lib/site";
import {createBreadcrumbJsonLd} from "../../../lib/structured-data";
import {formatDate} from "../../../lib/utils";

export async function generateStaticParams() {
  const posts = await getAllWritingPosts();
  return posts.map(post => ({slug: post.slug}));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{slug: string}>;
}) {
  const {slug} = await params;
  const post = await getWritingPostBySlug(slug);

  if (!post) {
    return createMetadata({
      title: "Writing",
      path: `/writing/${slug}`
    });
  }

  return createMetadata({
    title: post.title,
    description: post.summary,
    path: `/writing/${post.slug}`,
    type: "article"
  });
}

export default async function WritingDetailPage({
  params
}: {
  params: Promise<{slug: string}>;
}) {
  const {slug} = await params;
  const [post, posts] = await Promise.all([
    getWritingPostBySlug(slug),
    getAllWritingPosts()
  ]);

  if (!post) notFound();

  const currentIndex = posts.findIndex(entry => entry.slug === post.slug);
  const previous = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;
  const next = currentIndex > 0 ? posts[currentIndex - 1] : null;

  return (
    <PageShell eyebrow="Writing" title={post.title} summary={post.summary}>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "BlogPosting",
              headline: post.title,
              description: post.summary,
              datePublished: post.date,
              author: {
                "@type": "Person",
                name: siteMeta.ownerName,
                url: `${siteMeta.siteUrl}/about`
              },
              mainEntityOfPage: `${siteMeta.siteUrl}/writing/${post.slug}`
            },
            createBreadcrumbJsonLd([
              {name: "Home", path: "/"},
              {name: "Writing", path: "/writing"},
              {name: post.title, path: `/writing/${post.slug}`}
            ])
          ]
        }}
      />

      <article className={styles.articlePage}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span className={styles.breadcrumbSeparator}>/</span>
          <Link href="/writing">Writing</Link>
          <span className={styles.breadcrumbSeparator}>/</span>
          <span>{post.title}</span>
        </nav>
        <div className={styles.articleMeta}>
          <span>{formatDate(post.date)}</span>
          {post.readingTime ? <span>{post.readingTime} min read</span> : null}
          {post.tags.slice(0, 2).map(tag => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
        <div
          className={styles.articleBody}
          dangerouslySetInnerHTML={{__html: post.html || ""}}
        />
        {post.distribution?.wechatUrl ? (
          <div className={styles.articleMeta}>
            <a href={post.distribution.wechatUrl}>Also on WeChat</a>
          </div>
        ) : null}
      </article>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <h2 className={styles.sectionTitle}>Continue reading</h2>
          </div>
        </div>
        <div className={styles.archiveGrid}>
          {next ? (
            <article className={styles.archiveCard}>
              <p className={styles.eyebrow}>Next</p>
              <h3 className={styles.cardTitle}>{next.title}</h3>
              <p className={styles.sectionLead}>{next.summary}</p>
              <Link href={`/writing/${next.slug}`} className={styles.textLink}>
                Open article
              </Link>
            </article>
          ) : null}
          {previous ? (
            <article className={styles.archiveCard}>
              <p className={styles.eyebrow}>Previous</p>
              <h3 className={styles.cardTitle}>{previous.title}</h3>
              <p className={styles.sectionLead}>{previous.summary}</p>
              <Link href={`/writing/${previous.slug}`} className={styles.textLink}>
                Open article
              </Link>
            </article>
          ) : null}
        </div>
      </section>
    </PageShell>
  );
}
