import React, {useContext, useEffect, useMemo, useState} from "react";
import {Link} from "react-router-dom";
import Projects from "../sections/projects/Projects";
import PageSurface from "../components/pageSurface/PageSurface";
import LanguageContext from "../contexts/LanguageContext";
import {getText} from "../utils/i18n";
import {getProjectCards, getProjectHeroCards} from "../services/projectContent";
import {
  projectExperienceSignals,
  projectsDossierConfig,
  projectsPageCopy
} from "../config/pages/projectsPage";
import {getPageHeroVisual} from "../config/pages/pageHeroVisuals";
import "./ProjectPage.scss";

export default function ProjectPage() {
  const {language} = useContext(LanguageContext);
  const [heroCards, setHeroCards] = useState([]);
  const [projectCards, setProjectCards] = useState([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);
  const [projectsLoadError, setProjectsLoadError] = useState(false);
  const [activeCaseHref, setActiveCaseHref] = useState(null);
  const projectsHeroVisual = getPageHeroVisual("projects");

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setIsLoadingProjects(true);
        setProjectsLoadError(false);
        const [nextHeroCards, nextProjectCards] = await Promise.all([
          getProjectHeroCards(),
          getProjectCards()
        ]);
        if (mounted) {
          setHeroCards(nextHeroCards);
          setProjectCards(nextProjectCards);
        }
      } catch {
        if (mounted) setProjectsLoadError(true);
      } finally {
        if (mounted) setIsLoadingProjects(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const flagshipCases = useMemo(
    () =>
      heroCards
        .map((item, index) => ({
          ...item,
          originalIndex: index
        }))
        .sort((a, b) => {
          const aPriority = Number(a.flagshipPriority);
          const bPriority = Number(b.flagshipPriority);
          const hasAPriority = Number.isFinite(aPriority);
          const hasBPriority = Number.isFinite(bPriority);

          if (hasAPriority && hasBPriority) return aPriority - bPriority;
          if (hasAPriority) return -1;
          if (hasBPriority) return 1;
          return a.originalIndex - b.originalIndex;
        })
        .slice(0, 3)
        .map((item, index) => ({
          ...item,
          index: String(index + 1).padStart(2, "0")
        })),
    [heroCards]
  );

  const activeCase = useMemo(
    () =>
      flagshipCases.find(item => item.href === activeCaseHref) ||
      flagshipCases[0],
    [activeCaseHref, flagshipCases]
  );

  return (
    <PageSurface pageKey="projects" className="page-container projects-page">
      <section className="projects-dossier-landing">
        <div className="projects-dossier-landing__intro">
          <p className="projects-dossier-landing__kicker">Flagship Cases</p>
          <h1>{getText(projectsPageCopy.hero.title, language)}</h1>
          <p className="projects-dossier-landing__subtitle">
            {getText(projectsPageCopy.hero.description, language)}
          </p>
          <div className="projects-dossier-landing__signals">
            {projectsDossierConfig.signals.map(signal => (
              <article
                className="projects-dossier-landing__signal"
                key={signal.label.en}
              >
                <span>{getText(signal.label, language)}</span>
                <strong>{getText(signal.value, language)}</strong>
              </article>
            ))}
          </div>
        </div>
        {projectsHeroVisual && (
          <figure className="projects-dossier-landing__visual">
            <img
              src={projectsHeroVisual.src}
              alt={getText(projectsHeroVisual.alt, language)}
              width="1672"
              height="941"
              decoding="async"
            />
            <figcaption>
              <span>{getText(projectsHeroVisual.label, language)}</span>
              {getText(projectsHeroVisual.caption, language)}
            </figcaption>
          </figure>
        )}
        <div className="projects-dossier-landing__cases">
          <div className="projects-dossier-landing__rows">
            {flagshipCases.map(item => (
              <Link
                className={`projects-flagship-case ${
                  activeCase && activeCase.href === item.href ? "is-active" : ""
                }`}
                to={item.href}
                key={item.href}
                onFocus={() => setActiveCaseHref(item.href)}
                onMouseEnter={() => setActiveCaseHref(item.href)}
              >
                <span className="projects-flagship-case__index">
                  {item.index}
                </span>
                <div className="projects-flagship-case__body">
                  <p className="projects-flagship-case__year">{item.year}</p>
                  <h2>{getText(item.title, language)}</h2>
                  <p className="projects-flagship-case__summary">
                    {getText(item.description, language)}
                  </p>
                </div>
                <div className="projects-flagship-case__meta">
                  <p>{getText(item.problem, language)}</p>
                  <strong>{getText(item.medium, language)}</strong>
                </div>
              </Link>
            ))}
          </div>
          {activeCase && (
            <aside className="projects-dossier-preview" aria-live="polite">
              <p className="projects-dossier-preview__eyebrow">
                Active dossier
              </p>
              <span className="projects-dossier-preview__index">
                {activeCase.index}
              </span>
              <h2>{getText(activeCase.title, language)}</h2>
              <p>{getText(activeCase.problem, language)}</p>
              <div className="projects-dossier-preview__rail">
                <span>{activeCase.year}</span>
                <strong>{getText(activeCase.medium, language)}</strong>
              </div>
            </aside>
          )}
        </div>
      </section>

      <section className="projects-section selected-work-section">
        <div className="section-header">
          <h2>{getText(projectsPageCopy.selectedWork.title, language)}</h2>
          <p>{getText(projectsPageCopy.selectedWork.subtitle, language)}</p>
        </div>
        <Projects
          projects={projectCards}
          isLoading={isLoadingProjects}
          errorMessage={
            projectsLoadError
              ? getText(projectsPageCopy.loadError, language)
              : ""
          }
          summaryConfig={projectsDossierConfig}
        />
      </section>

      <section className="projects-section experience-section">
        <div className="section-header">
          <h2>{getText(projectsPageCopy.experience.title, language)}</h2>
          <p>{getText(projectsPageCopy.experience.subtitle, language)}</p>
        </div>
        <div className="experience-signal-grid experience-signal-grid--narrative">
          {projectExperienceSignals.map(signal => (
            <article className="experience-signal-card" key={signal.role.en}>
              <span>{signal.period}</span>
              <h3>{getText(signal.role, language)}</h3>
              <p className="experience-signal-org">
                {getText(signal.org, language)}
              </p>
              <p>{getText(signal.detail, language)}</p>
            </article>
          ))}
        </div>
      </section>
    </PageSurface>
  );
}
