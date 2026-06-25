import JsonLd from "../../components/JsonLd";
import PageShell from "../../components/PageShell";
import styles from "../site.module.scss";
import {getNowState} from "../../lib/content/site";
import {createMetadata} from "../../lib/metadata";
import {aboutCopy, siteMeta} from "../../lib/site";

export const metadata = createMetadata({
  title: "About",
  description:
    "About Echo Chen: AI systems, multimedia storytelling, writing, recognition, and current focus.",
  path: "/about"
});

export default async function AboutPage() {
  const nowState = await getNowState();

  return (
    <PageShell
      eyebrow="About"
      title="One identity, built from systems, writing, and visual work."
      summary={aboutCopy.summary}
    >
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Person",
          name: siteMeta.ownerName,
          alternateName: siteMeta.ownerNameZh,
          url: `${siteMeta.siteUrl}/about`,
          jobTitle: "AI developer, multimedia storyteller, writer",
          sameAs: [
            siteMeta.externalLinks.github,
            siteMeta.externalLinks.linkedin,
            siteMeta.externalLinks.youtube,
            siteMeta.externalLinks.instagram
          ]
        }}
      />

      <section className={styles.aboutGrid}>
        {aboutCopy.profileSignals.map(signal => (
          <article key={signal.title} className={styles.aboutCard}>
            <h2 className={styles.aboutCardTitle}>{signal.title}</h2>
            <p className={styles.aboutLead}>{signal.body}</p>
          </article>
        ))}
      </section>

      <section className={styles.section} id="recognition">
        <div className={styles.sectionHeader}>
          <div>
            <h2 className={styles.sectionTitle}>Selected recognition</h2>
            <p className={styles.sectionLead}>
              Enough visibility for credibility, without turning the site into
              an award wall.
            </p>
          </div>
        </div>
        <div className={styles.recognitionGrid}>
          {aboutCopy.recognition.map(item => (
            <article key={item} className={styles.recognitionCard}>
              <h3 className={styles.recognitionTitle}>{item}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section} id="now">
        <div className={styles.sectionHeader}>
          <div>
            <h2 className={styles.sectionTitle}>Current focus</h2>
          </div>
        </div>
        <div className={styles.aboutGrid}>
          <article className={styles.aboutCard}>
            <h3 className={styles.aboutCardTitle}>Doing now</h3>
            <p className={styles.aboutLead}>
              {nowState?.doing ||
                "Modernizing the site into a static-first, long-term personal archive."}
            </p>
          </article>
          <article className={styles.aboutCard}>
            <h3 className={styles.aboutCardTitle}>Constraint</h3>
            <p className={styles.aboutLead}>
              {nowState?.blockers ||
                "Content curation and system migration are happening together, so pace matters."}
            </p>
          </article>
          <article className={styles.aboutCard}>
            <h3 className={styles.aboutCardTitle}>Next</h3>
            <p className={styles.aboutLead}>
              {nowState?.nextActions ||
                "Ship stable writing and project pages before expanding the visual archive."}
            </p>
          </article>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <h2 className={styles.sectionTitle}>Author links</h2>
            <p className={styles.sectionLead}>
              External profiles that help humans and search systems verify the
              broader identity behind this archive.
            </p>
          </div>
        </div>
        <div className={styles.authorLinks}>
          <a href={siteMeta.externalLinks.github} className={styles.button}>
            GitHub
          </a>
          <a href={siteMeta.externalLinks.linkedin} className={styles.button}>
            LinkedIn
          </a>
          <a href={siteMeta.externalLinks.youtube} className={styles.button}>
            YouTube
          </a>
          <a
            href={`mailto:${siteMeta.externalLinks.email}`}
            className={`${styles.button} ${styles.buttonPrimary}`}
          >
            Email
          </a>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <h2 className={styles.sectionTitle}>Tools / setup</h2>
          </div>
        </div>
        <div className={styles.archiveGrid}>
          {aboutCopy.tools.map(tool => (
            <article key={tool} className={styles.archiveCard}>
              <h3 className={styles.cardTitle}>{tool}</h3>
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
