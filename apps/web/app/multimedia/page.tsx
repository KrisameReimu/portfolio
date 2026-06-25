import Link from "next/link";
import PageShell from "../../components/PageShell";
import JsonLd from "../../components/JsonLd";
import styles from "../site.module.scss";
import {createMetadata} from "../../lib/metadata";

export const metadata = createMetadata({
  title: "Multimedia",
  description:
    "A medium-first archive for photos, videos, and future visual work.",
  path: "/multimedia"
});

export default function MultimediaPage() {
  return (
    <PageShell
      eyebrow="Multimedia"
      title="Visual work, gathered by medium."
      summary="Photos and videos stay distinct here. The point is quiet discovery, not one undifferentiated feed."
    >
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Multimedia",
          description: "Visual archive by medium",
          url: "https://www.chenchen-echo.com/multimedia"
        }}
      />

      <section className={styles.mediaGrid}>
        <article className={styles.mediaCard}>
          <h2 className={styles.mediaCardTitle}>Photos</h2>
          <p className={styles.sectionLead}>
            Real-world still images arranged as a quieter archive.
          </p>
          <Link href="/multimedia/photos" className={styles.textLink}>
            Open photos
          </Link>
        </article>
        <article className={styles.mediaCard}>
          <h2 className={styles.mediaCardTitle}>Videos</h2>
          <p className={styles.sectionLead}>
            Motion work, clips, and documentary edits in a year-first archive.
          </p>
          <Link href="/multimedia/videos" className={styles.textLink}>
            Open videos
          </Link>
        </article>
        <article className={styles.mediaCard}>
          <h2 className={styles.mediaCardTitle}>AI Visuals</h2>
          <p className={styles.sectionLead}>
            Reserved for future image and poster experiments, not yet part of
            the core public archive.
          </p>
        </article>
        <article className={styles.mediaCard}>
          <h2 className={styles.mediaCardTitle}>Process</h2>
          <p className={styles.sectionLead}>
            Reserved for behind-the-scenes notes, tools, and before/after
            comparisons when the archive is ready.
          </p>
        </article>
      </section>
    </PageShell>
  );
}
