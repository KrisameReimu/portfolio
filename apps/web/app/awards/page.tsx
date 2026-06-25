import Link from "next/link";
import PageShell from "../../components/PageShell";
import styles from "../site.module.scss";
import {createMetadata} from "../../lib/metadata";
import {aboutCopy} from "../../lib/site";

export const metadata = createMetadata({
  title: "Awards",
  description:
    "Recognition and award highlights, kept as a compatibility page and linked into About.",
  path: "/awards"
});

export default function AwardsCompatibilityPage() {
  return (
    <PageShell
      eyebrow="Recognition"
      title="Selected recognition and award signals."
      summary="This compatibility page remains public, but recognition now belongs structurally inside About."
    >
      <section className={styles.recognitionGrid}>
        {aboutCopy.recognition.map(item => (
          <article key={item} className={styles.recognitionCard}>
            <h2 className={styles.recognitionTitle}>{item}</h2>
          </article>
        ))}
      </section>
      <section className={styles.section}>
        <Link href="/about#recognition" className={styles.textLink}>
          Open the About recognition section
        </Link>
      </section>
    </PageShell>
  );
}
