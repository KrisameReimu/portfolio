import styles from "../app/site.module.scss";
import {siteMeta} from "../lib/site";

export default function SiteFooter() {
  return (
    <footer className={styles.siteFooter}>
      <div className={styles.shell}>
        <div className={styles.footerInner}>
          <p>
            {siteMeta.siteName} builds AI systems, writing, and visual work into
            one long-term archive.
          </p>
          <div className={styles.footerLinks}>
            <a href={siteMeta.externalLinks.github}>GitHub</a>
            <a href={siteMeta.externalLinks.linkedin}>LinkedIn</a>
            <a href={siteMeta.externalLinks.youtube}>YouTube</a>
            <a href={`mailto:${siteMeta.externalLinks.email}`}>Email</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
