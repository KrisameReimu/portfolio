import React, {useContext, useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import LanguageContext from "../contexts/LanguageContext";
import {getText} from "../utils/i18n";
import {getProjectDetailBySlug} from "../services/projectContent";
import {projectDetailPageCopy} from "../config/pages/projectsPage";
import CaseStudyHero from "../components/caseStudy/CaseStudyHero";
import CaseStudySectionHeader from "../components/caseStudy/CaseStudySectionHeader";
import ImageChartGallery from "../components/caseStudy/ImageChartGallery";
import "./ProjectDetailPage.scss";

const getEmbedUrl = href => {
  if (!href) return null;
  if (href.includes("/embed/")) return href;

  try {
    const url = new URL(href);

    if (url.hostname.includes("youtube.com") && url.searchParams.get("v")) {
      return `https://www.youtube.com/embed/${url.searchParams.get("v")}`;
    }

    if (url.hostname === "youtu.be") {
      const id = url.pathname.replace("/", "");
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }
  } catch {
    return null;
  }

  return null;
};

const formatSectionNumber = index => String(index + 1).padStart(2, "0");

export default function ProjectDetailPage() {
  const {slug} = useParams();
  const {language} = useContext(LanguageContext);
  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setIsLoading(true);
        setLoadError(false);
        const detail = await getProjectDetailBySlug(slug);
        if (mounted) {
          setProject(detail);
        }
      } catch {
        if (mounted) {
          setProject(null);
          setLoadError(true);
        }
      } finally {
        if (mounted) setIsLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [slug]);

  if (isLoading) {
    return (
      <div className="project-detail-page project-detail-empty">
        <p>{getText(projectDetailPageCopy.loading, language)}</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="project-detail-page project-detail-empty">
        <p>
          {getText(
            loadError
              ? projectDetailPageCopy.loadError
              : projectDetailPageCopy.notFound,
            language
          )}
        </p>
        <Link to="/projects" className="project-detail-back">
          {getText(projectDetailPageCopy.back, language)}
        </Link>
      </div>
    );
  }

  const authoredSections = project.sections ?? [];
  const contentSections = [];

  if (project.flowGroups?.length > 0) {
    contentSections.push({
      id: "project-workflow",
      label: projectDetailPageCopy.sections.flow,
      title: projectDetailPageCopy.sections.flow,
      content: (
        <div className="project-flow-group-stack">
          {project.flowGroups.map(group => (
            <article className="project-flow-group" key={group.title.en}>
              <h3>{getText(group.title, language)}</h3>
              <div className="project-flow-steps">
                {group.steps.map(step => (
                  <div className="project-flow-step" key={step.en}>
                    {getText(step, language)}
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      )
    });
  }

  if (project.chartBlocks?.length > 0 || project.imageCharts?.length > 0) {
    contentSections.push({
      id: "project-charts",
      label: projectDetailPageCopy.sections.charts,
      title: projectDetailPageCopy.sections.charts,
      content: (
        <>
          {project.chartBlocks?.length > 0 && (
            <div className="project-chart-stack">
              {project.chartBlocks.map(block => (
                <article className="project-chart-card" key={block.title.en}>
                  <div className="project-chart-header">
                    <h3>{getText(block.title, language)}</h3>
                    {block.caption && <p>{getText(block.caption, language)}</p>}
                  </div>
                  <div className="project-chart-lanes">
                    {block.lanes.map(lane => (
                      <div className="project-chart-lane" key={lane.label.en}>
                        <span className="project-chart-lane-label">
                          {getText(lane.label, language)}
                        </span>
                        <div className="project-chart-nodes">
                          {lane.nodes.map(node => (
                            <div className="project-chart-node" key={node.en}>
                              {getText(node, language)}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          )}

          <ImageChartGallery charts={project.imageCharts} language={language} />
        </>
      )
    });
  }

  if (project.demoLinks?.length > 0 || project.embedVideos?.length > 0) {
    contentSections.push({
      id: "project-demos",
      label: projectDetailPageCopy.sections.demos,
      title: projectDetailPageCopy.sections.demos,
      content: (
        <div className="project-demo-stack">
          {project.embedVideos?.map(video => {
            const embedUrl = getEmbedUrl(video.href);

            if (!embedUrl) {
              return (
                <article className="project-demo-card" key={video.title.en}>
                  <h3>{getText(video.title, language)}</h3>
                  <a
                    href={video.href}
                    target="_blank"
                    rel="noreferrer"
                    className="project-detail-link"
                  >
                    {getText(projectDetailPageCopy.open, language)}
                  </a>
                </article>
              );
            }

            return (
              <article className="project-demo-card" key={video.title.en}>
                <h3>{getText(video.title, language)}</h3>
                <div className="project-demo-embed">
                  <iframe
                    src={embedUrl}
                    title={getText(video.title, language)}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </article>
            );
          })}

          {project.demoLinks?.length > 0 && (
            <div className="project-detail-link-grid">
              {project.demoLinks.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="project-detail-link-card"
                >
                  <span>{getText(link.label, language)}</span>
                  <strong>{link.href}</strong>
                </a>
              ))}
            </div>
          )}
        </div>
      )
    });
  }

  if (project.relatedDocs?.length > 0) {
    contentSections.push({
      id: "project-docs",
      label: projectDetailPageCopy.sections.docs,
      title: projectDetailPageCopy.sections.docs,
      content: (
        <div className="project-detail-link-grid">
          {project.relatedDocs.map(link => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="project-detail-link-card"
            >
              <span>{getText(link.label, language)}</span>
              <strong>{link.href}</strong>
            </a>
          ))}
        </div>
      )
    });
  }

  const projectSectionNav = [
    authoredSections.length > 0 && {
      id: "project-scope",
      label: projectDetailPageCopy.sections.scope
    },
    ...contentSections.map(section => ({
      id: section.id,
      label: section.label
    }))
  ].filter(Boolean);

  return (
    <div className="project-detail-page">
      <div className="project-detail-shell">
        <CaseStudyHero
          project={project}
          language={language}
          backLabel={projectDetailPageCopy.back}
          metaLabels={projectDetailPageCopy.metaLabels}
        />

        <div className="project-detail-body">
          <aside className="project-detail-rail" aria-label="Project sections">
            <span>{getText(project.proofTag, language)}</span>
            {projectSectionNav.map(section => (
              <a href={`#${section.id}`} key={section.id}>
                {getText(section.label, language)}
              </a>
            ))}
          </aside>

          <main className="project-detail-main">
            {authoredSections.map((section, index) => (
              <section
                className="project-detail-section"
                id={index === 0 ? "project-scope" : undefined}
                key={section.title.en}
              >
                <CaseStudySectionHeader
                  eyebrow={`0${index + 1}`}
                  title={section.title}
                  language={language}
                />
                <div className="project-detail-prose-card">
                  <ul className="project-detail-list">
                    {section.items.map(item => (
                      <li key={item.en}>{getText(item, language)}</li>
                    ))}
                  </ul>
                </div>
              </section>
            ))}

            {contentSections.map((section, index) => (
              <section
                className="project-detail-section"
                id={section.id}
                key={section.id}
              >
                <CaseStudySectionHeader
                  eyebrow={formatSectionNumber(authoredSections.length + index)}
                  title={section.title}
                  language={language}
                />
                {section.content}
              </section>
            ))}
          </main>
        </div>
      </div>
    </div>
  );
}
