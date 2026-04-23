import React, {useContext, useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import Projects from "../sections/projects/Projects";
import DynamicLandingHero from "../components/dynamicLandingHero/DynamicLandingHero";
import LanguageContext from "../contexts/LanguageContext";
import {getText} from "../utils/i18n";
import {openHeroTarget} from "../utils/heroNavigation";
import {getProjectCards, getProjectHeroCards} from "../services/projectContent";
import {
  projectExperienceSignals,
  projectsDossierConfig,
  projectsPageCopy
} from "../config/pages/projectsPage";
import "./ProjectPage.scss";

export default function ProjectPage() {
  const {language} = useContext(LanguageContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [heroCards, setHeroCards] = useState([]);
  const [projectCards, setProjectCards] = useState([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setIsLoadingProjects(true);
        const [nextHeroCards, nextProjectCards] = await Promise.all([
          getProjectHeroCards(),
          getProjectCards()
        ]);
        if (mounted) {
          setHeroCards(nextHeroCards);
          setProjectCards(nextProjectCards);
        }
      } finally {
        if (mounted) setIsLoadingProjects(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="page-container projects-page">
      <DynamicLandingHero
        title={projectsPageCopy.hero.title}
        subtitle={projectsPageCopy.hero.subtitle}
        description={projectsPageCopy.hero.description}
        visualType="interactive-feature"
        mediaItems={heroCards}
        onMediaItemClick={item =>
          openHeroTarget({
            target: item.href,
            navigate,
            currentPathname: location.pathname
          })
        }
        accentColor="#9C27B0"
        className="projects-landing-hero"
      />

      <section className="projects-section selected-work-section">
        <div className="section-header">
          <h2>{getText(projectsPageCopy.selectedWork.title, language)}</h2>
          <p>{getText(projectsPageCopy.selectedWork.subtitle, language)}</p>
        </div>
        <Projects
          projects={projectCards}
          isLoading={isLoadingProjects}
          summaryConfig={projectsDossierConfig}
        />
      </section>

      <section className="projects-section experience-section">
        <div className="section-header">
          <h2>{getText(projectsPageCopy.experience.title, language)}</h2>
          <p>{getText(projectsPageCopy.experience.subtitle, language)}</p>
        </div>
        <div className="experience-signal-grid">
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
    </div>
  );
}
