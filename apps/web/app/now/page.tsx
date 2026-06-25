import Link from "next/link";
import PageShell from "../../components/PageShell";
import styles from "../site.module.scss";
import {getNowState} from "../../lib/content/site";
import {createMetadata} from "../../lib/metadata";

export const metadata = createMetadata({
  title: "Now",
  description:
    "Current focus and next actions, kept as a compatibility page and linked into About.",
  path: "/now"
});

export default async function NowCompatibilityPage() {
  const now = await getNowState();

  return (
    <PageShell
      eyebrow="Now"
      title="A compatibility page for current focus."
      summary="Now remains public, but its long-term structural home is inside About."
    >
      <section className={styles.aboutGrid}>
        <article className={styles.aboutCard}>
          <h2 className={styles.aboutCardTitle}>Doing</h2>
          <p className={styles.aboutLead}>
            {now?.doing || "Building the static-first site and tightening the archive."}
          </p>
        </article>
        <article className={styles.aboutCard}>
          <h2 className={styles.aboutCardTitle}>Next</h2>
          <p className={styles.aboutLead}>
            {now?.nextActions || "Ship writing and project pages before broader expansion."}
          </p>
        </article>
      </section>
      <section className={styles.section}>
        <Link href="/about#now" className={styles.textLink}>
          Open the About current focus section
        </Link>
      </section>
    </PageShell>
  );
}
