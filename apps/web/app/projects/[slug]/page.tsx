import {notFound} from "next/navigation";
import Link from "next/link";
import PageShell from "../../../components/PageShell";
import JsonLd from "../../../components/JsonLd";
import styles from "../../site.module.scss";
import {getAllProjects, getProjectBySlug} from "../../../lib/content/projects";
import {createMetadata} from "../../../lib/metadata";
import {siteMeta} from "../../../lib/site";
import {createBreadcrumbJsonLd} from "../../../lib/structured-data";

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map(project => ({slug: project.slug}));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{slug: string}>;
}) {
  const {slug} = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return createMetadata({
      title: "Projects",
      path: `/projects/${slug}`
    });
  }

  return createMetadata({
    title: project.title,
    description: project.summary,
    path: `/projects/${project.slug}`
  });
}

export default async function ProjectDetailPage({
  params
}: {
  params: Promise<{slug: string}>;
}) {
  const {slug} = await params;
  const project = await getProjectBySlug(slug);

  if (!project) notFound();

  return (
    <PageShell eyebrow="Project dossier" title={project.title} summary={project.summary}>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "CreativeWork",
              name: project.title,
              description: project.summary,
              creator: {
                "@type": "Person",
                name: siteMeta.ownerName,
                url: `${siteMeta.siteUrl}/about`
              },
              url: `${siteMeta.siteUrl}/projects/${project.slug}`
            },
            createBreadcrumbJsonLd([
              {name: "Home", path: "/"},
              {name: "Projects", path: "/projects"},
              {name: project.title, path: `/projects/${project.slug}`}
            ])
          ]
        }}
      />

      <section className={styles.projectHero}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span className={styles.breadcrumbSeparator}>/</span>
          <Link href="/projects">Projects</Link>
          <span className={styles.breadcrumbSeparator}>/</span>
          <span>{project.title}</span>
        </nav>
        <div className={styles.projectMeta}>
          <span>{project.role}</span>
          <span>{project.timeline}</span>
          <span>{project.organization}</span>
        </div>
      </section>

      <section className={styles.detailGrid}>
        <div className={styles.panel}>
          <h2 className={styles.sectionTitle}>Overview</h2>
          <div className={styles.list}>
            {project.overview.map(item => (
              <article key={item.label} className={styles.articleListItem}>
                <h3>{item.label}</h3>
                <p className={styles.sectionLead}>{item.value}</p>
              </article>
            ))}
          </div>
        </div>

        <aside className={styles.asidePanel}>
          <div className={styles.panel}>
            <h2 className={styles.sectionTitle}>Stack / signals</h2>
            <ul className={styles.stackList}>
              {project.stack.map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          {project.links.length ? (
            <div className={styles.panel}>
              <h2 className={styles.sectionTitle}>Links</h2>
              <ul className={styles.stackList}>
                {project.links.map(link => (
                  <li key={`${link.label}-${link.href}`}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </aside>
      </section>

      {project.sections.map(section => (
        <section key={section.title} className={styles.section}>
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle}>{section.title}</h2>
            </div>
          </div>
          <div className={styles.panel}>
            <ul className={styles.simpleList}>
              {section.items.map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>
      ))}

      {project.flowGroups.map(group => (
        <section key={group.title} className={styles.section}>
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle}>{group.title}</h2>
            </div>
          </div>
          <div className={styles.panel}>
            <ul className={styles.simpleList}>
              {group.steps.map(step => (
                <li key={step}>{step}</li>
              ))}
            </ul>
          </div>
        </section>
      ))}

      <section className={styles.section}>
        <Link href="/projects" className={styles.textLink}>
          Back to Projects
        </Link>
      </section>
    </PageShell>
  );
}
