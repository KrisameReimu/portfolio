import Link from "next/link";
import PageShell from "../../components/PageShell";
import JsonLd from "../../components/JsonLd";
import styles from "../site.module.scss";
import {getAllProjects} from "../../lib/content/projects";
import {createMetadata} from "../../lib/metadata";
import {createItemListJsonLd} from "../../lib/structured-data";

export const metadata = createMetadata({
  title: "Projects",
  description:
    "Engineering dossiers that show problem definition, implementation scope, trade-offs, and outcomes.",
  path: "/projects"
});

export default async function ProjectsIndexPage() {
  const projects = await getAllProjects();

  return (
    <PageShell
      eyebrow="Project Dossiers"
      title="Projects organized for clarity, not just display."
      summary="Each project page is structured as a dossier: what the problem was, what I built, how it worked, and what signal remains."
    >
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "CollectionPage",
                name: "Projects",
                description: "Engineering project dossiers from Echo Chen",
                url: "https://www.chenchen-echo.com/projects"
              },
              createItemListJsonLd(
                "Project dossiers",
                projects.map(project => ({
                  name: project.title,
                  path: `/projects/${project.slug}`,
                  description: project.summary
                }))
              )
            ]
          }}
        />

      <section className={styles.section}>
        <div className={styles.projectGrid}>
          {projects.map(project => (
            <article key={project.slug} className={styles.projectCard}>
              <p className={styles.eyebrow}>{project.timeline}</p>
              <h2 className={styles.projectCardTitle}>{project.title}</h2>
              <p className={styles.sectionLead}>{project.summary}</p>
              <div className={styles.projectMeta}>
                <span>{project.role}</span>
                <span>{project.status}</span>
              </div>
              <p>
                <Link href={`/projects/${project.slug}`} className={styles.projectLink}>
                  Open dossier
                </Link>
              </p>
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
