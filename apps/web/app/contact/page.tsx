import PageShell from "../../components/PageShell";
import styles from "../site.module.scss";
import {createMetadata} from "../../lib/metadata";
import {contactCopy, siteMeta} from "../../lib/site";

export const metadata = createMetadata({
  title: "Contact",
  description:
    "Contact Echo Chen for project collaboration, research support, and media work.",
  path: "/contact"
});

export default function ContactPage() {
  return (
    <PageShell eyebrow="Contact" title={contactCopy.title} summary={contactCopy.summary}>
      <section className={styles.contactGrid}>
        <article className={styles.contactCard}>
          <h2 className={styles.contactCardTitle}>Primary contact</h2>
          <p className={styles.contactLead}>
            Email is the best path for clear, durable communication.
          </p>
          <div className={styles.contactActions}>
            <a
              href={`mailto:${siteMeta.externalLinks.email}`}
              className={`${styles.button} ${styles.buttonPrimary}`}
            >
              {siteMeta.externalLinks.email}
            </a>
            <a href={siteMeta.externalLinks.linkedin} className={styles.button}>
              LinkedIn
            </a>
            <a href={siteMeta.externalLinks.github} className={styles.button}>
              GitHub
            </a>
          </div>
        </article>

        <article className={styles.contactCard}>
          <h2 className={styles.contactCardTitle}>{contactCopy.wechatTitle}</h2>
          <p className={styles.contactLead}>{contactCopy.wechatSummary}</p>
          <div className={styles.recognitionThumb}>
            <img src="/wechat_qrcode_echo.jpg" alt="WeChat Official Account QR code" />
          </div>
          <p className={styles.contactLead}>{contactCopy.note}</p>
        </article>
      </section>
    </PageShell>
  );
}
