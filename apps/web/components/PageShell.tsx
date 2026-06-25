import styles from "../app/site.module.scss";

type PageShellProps = {
  eyebrow?: string;
  title: string;
  summary?: string;
  children: React.ReactNode;
};

export default function PageShell({
  eyebrow,
  title,
  summary,
  children
}: PageShellProps) {
  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <section className={styles.pageHero}>
          {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
          <h1 className={styles.pageTitle}>{title}</h1>
          {summary ? <p className={styles.pageSummary}>{summary}</p> : null}
        </section>
        {children}
      </div>
    </main>
  );
}
