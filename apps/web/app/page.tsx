import Link from "next/link";
import PageShell from "../components/PageShell";
import JsonLd from "../components/JsonLd";
import styles from "./site.module.scss";
import {getFeaturedWritingPosts} from "../lib/content/writing";
import {getAllProjects} from "../lib/content/projects";
import {createMetadata} from "../lib/metadata";
import {homeCopy, siteMeta} from "../lib/site";
import {createItemListJsonLd} from "../lib/structured-data";
import {formatDate} from "../lib/utils";

export const metadata = createMetadata({
  title: "Writing, projects, and visual archive",
  description: homeCopy.intro,
  path: "/"
});

export default async function HomePage() {
  const [featuredWriting, projects] = await Promise.all([
    getFeaturedWritingPosts(3),
    getAllProjects()
  ]);

  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebSite",
                name: siteMeta.siteName,
                url: siteMeta.siteUrl,
                description: siteMeta.defaultDescription
              },
              {
                "@type": "Person",
                name: siteMeta.ownerName,
                alternateName: siteMeta.ownerNameZh,
                url: `${siteMeta.siteUrl}/about`,
                sameAs: [
                  siteMeta.externalLinks.github,
                  siteMeta.externalLinks.linkedin,
                  siteMeta.externalLinks.youtube
                ],
                jobTitle: "AI developer, multimedia storyteller, writer"
              },
              {
                "@type": "WebPage",
                name: "Home",
                description: homeCopy.intro,
                url: siteMeta.siteUrl
              },
              createItemListJsonLd(
                "Featured writing",
                featuredWriting.map(post => ({
                  name: post.title,
                  path: `/writing/${post.slug}`,
                  description: post.summary
                }))
              ),
              createItemListJsonLd(
                "Selected projects",
                projects.slice(0, 3).map(project => ({
                  name: project.title,
                  path: `/projects/${project.slug}`,
                  description: project.summary
                }))
              )
            ]
          }}
        />

        <section className={styles.hero}>
          <div className={styles.heroSplit}>
            <div>
              <p className={styles.heroEyebrow}>{homeCopy.tagline}</p>
              <h1 className={styles.heroTitle}>{homeCopy.title}</h1>
              <p className={styles.heroSummary}>{homeCopy.intro}</p>
              <div className={styles.heroMeta}>
                <span className={styles.metaPill}>Writing archive</span>
                <span className={styles.metaPill}>Engineering dossiers</span>
                <span className={styles.metaPill}>Visual archive</span>
              </div>
              <div className={styles.contactActions}>
                <Link
                  href="/writing"
                  className={`${styles.button} ${styles.buttonPrimary}`}
                >
                  Read Writing
                </Link>
                <Link href="/projects" className={styles.button}>
                  View Projects
                </Link>
                <a href={siteMeta.externalLinks.resume} className={styles.button}>
                  Open CV
                </a>
              </div>
            </div>
            <aside className={styles.signalRail} aria-label="Home signals">
              {homeCopy.rail.map(item => (
                <article key={item.title} className={styles.signalCard}>
                  <p className={styles.signalTitle}>{item.title}</p>
                  <p className={styles.signalBody}>{item.body}</p>
                </article>
              ))}
            </aside>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.introGrid}>
            <div>
              <h2 className={styles.sectionTitle}>Positioning</h2>
              <p className={styles.introLead}>
                The site is not a profile summary first. It is a durable public
                archive first.
              </p>
              <p className={styles.introBody}>{homeCopy.positioning}</p>
            </div>
            <div className={styles.signalRail}>
              <article className={styles.signalCard}>
                <p className={styles.signalTitle}>Best entry point</p>
                <p className={styles.signalBody}>
                  Start with Writing if you want voice, Projects if you want
                  proof, and About if you want entity context.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle}>Selected Writing</h2>
              <p className={styles.sectionLead}>
                Long-form essays and notes that carry the strongest author
                voice.
              </p>
            </div>
            <Link href="/writing" className={styles.textLink}>
              Open archive
            </Link>
          </div>
          <div className={styles.list}>
            {featuredWriting.map(post => (
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
              <h2 className={styles.sectionTitle}>Selected Projects</h2>
              <p className={styles.sectionLead}>
                Projects organized as dossiers: scope, constraints,
                implementation, and outcomes.
              </p>
            </div>
            <Link href="/projects" className={styles.textLink}>
              Open dossiers
            </Link>
          </div>
          <div className={styles.projectGrid}>
            {projects.slice(0, 3).map(project => (
              <article key={project.slug} className={styles.projectCard}>
                <p className={styles.eyebrow}>{project.timeline}</p>
                <h3 className={styles.projectCardTitle}>{project.title}</h3>
                <p className={styles.sectionLead}>{project.summary}</p>
                <div className={styles.projectMeta}>
                  <span>{project.role}</span>
                  <span>{project.organization}</span>
                </div>
                <p>
                  <Link href={`/projects/${project.slug}`} className={styles.projectLink}>
                    View dossier
                  </Link>
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle}>Multimedia</h2>
              <p className={styles.sectionLead}>
                A quiet entry point into photos, video, and future visual
                archive areas.
              </p>
            </div>
          </div>
          <div className={styles.mediaGrid}>
            <article className={styles.mediaCard}>
              <h3 className={styles.mediaCardTitle}>Photos</h3>
              <p className={styles.sectionLead}>
                Gallery-first, low-chrome image archive.
              </p>
              <Link href="/multimedia/photos" className={styles.textLink}>
                Open photos
              </Link>
            </article>
            <article className={styles.mediaCard}>
              <h3 className={styles.mediaCardTitle}>Videos</h3>
              <p className={styles.sectionLead}>
                Cinematic cards and a year-first archive of visual stories.
              </p>
              <Link href="/multimedia/videos" className={styles.textLink}>
                Open videos
              </Link>
            </article>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle}>Recognition</h2>
              <p className={styles.sectionLead}>
                Compact credibility signals, not a full award wall.
              </p>
            </div>
          </div>
          <div className={styles.recognitionGrid}>
            {homeCopy.recognition.map(item => (
              <article key={item} className={styles.recognitionCard}>
                <h3 className={styles.recognitionTitle}>{item}</h3>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
