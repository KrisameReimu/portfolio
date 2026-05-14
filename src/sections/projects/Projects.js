import React, {useContext, useMemo} from "react";
import {Fade} from "../../components/motion/Fade";
import "./Project.scss";
import Button from "../../components/button/Button";
import LanguageContext from "../../contexts/LanguageContext";
import {
  projectsDossierConfig,
  projectsPageCopy
} from "../../config/pages/projectsPage";
import {getText} from "../../utils/i18n";

const Projects = ({
  projects: projectItems = [],
  isLoading = false,
  errorMessage = "",
  summaryConfig = projectsDossierConfig
}) => {
  const {language} = useContext(LanguageContext);

  const projects = useMemo(() => {
    return projectItems.map(project => ({
      ...project,
      accent: project.subtitle || project.actionLabel
    }));
  }, [projectItems]);

  if (isLoading) {
    return (
      <p className="projects-empty">
        {getText(projectsPageCopy.loading, language)}
      </p>
    );
  }

  if (errorMessage) {
    return (
      <p className="projects-empty projects-empty--error">{errorMessage}</p>
    );
  }

  if (projects.length === 0) {
    return (
      <p className="projects-empty">
        {getText(projectsPageCopy.empty, language)}
      </p>
    );
  }

  return (
    <Fade bottom duration={1000} distance="20px">
      <section className="projects-showcase">
        <div className="projects-dossier-intro">
          <div className="dossier-header">
            <p className="dossier-kicker">{summaryConfig.kicker}</p>
            <h3>{getText(summaryConfig.title, language)}</h3>
            <p className="dossier-subtitle">
              {getText(summaryConfig.subtitle, language)}
            </p>
          </div>
          <p className="projects-intro">
            {getText(summaryConfig.lead, language)}
          </p>
          <div className="dossier-signal-grid">
            {summaryConfig.signals.map(signal => (
              <div className="dossier-signal" key={signal.label.en}>
                <span>{getText(signal.label, language)}</span>
                <strong>{getText(signal.value, language)}</strong>
              </div>
            ))}
          </div>
        </div>

        <div className="projects-dossier-list">
          {projects.map(project => (
            <article
              className="project-dossier-card"
              key={project.id}
              id={`project-${project.id}`}
            >
              <div className="project-dossier-meta">
                <span className="project-dossier-type">
                  {getText(project.type, language)}
                </span>
                <span className="project-dossier-time">
                  {getText(project.timeframe, language)}
                </span>
              </div>

              <div className="project-dossier-body">
                <div className="project-dossier-main">
                  <h3 className="project-dossier-title">
                    {getText(project.title, language)}
                  </h3>
                  <p className="project-dossier-organization">
                    {getText(project.organization, language)}
                  </p>
                  <p className="project-dossier-role">
                    {getText(project.role, language)}
                  </p>
                  <p className="project-dossier-summary">
                    {getText(project.summary, language)}
                  </p>
                </div>

                <div className="project-dossier-proof">
                  <span className="project-proof-label">PROOF</span>
                  <strong>{getText(project.proofTag, language)}</strong>
                </div>
              </div>

              <ul className="project-dossier-bullets">
                {project.bullets.map(item => (
                  <li key={item.en}>{getText(item, language)}</li>
                ))}
              </ul>

              {project.focusAreas && project.focusAreas.length > 0 && (
                <div className="project-dossier-focus">
                  <span className="project-dossier-section-label">
                    {getText(project.focusLabel, language)}
                  </span>
                  <ul className="project-dossier-bullets project-dossier-bullets-focus">
                    {project.focusAreas.map(item => (
                      <li key={item.en}>{getText(item, language)}</li>
                    ))}
                  </ul>
                </div>
              )}

              {project.impact && (
                <div className="project-dossier-impact">
                  <span className="project-dossier-section-label">
                    {getText(summaryConfig.impactLabel, language)}
                  </span>
                  <p>{getText(project.impact, language)}</p>
                </div>
              )}

              <div className="project-dossier-footer">
                <Button
                  text={getText(project.actionLabel, language)}
                  href={project.href}
                  newTab={!project.href.startsWith("/")}
                />
              </div>
            </article>
          ))}
        </div>
      </section>
    </Fade>
  );
};

export default Projects;
