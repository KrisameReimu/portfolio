import React, {useContext, useMemo} from "react";
import {Fade} from "react-reveal";
import "./Project.scss";
import Button from "../../components/button/Button";
import LanguageContext from "../../contexts/LanguageContext";
import {portfolioProjects, projectSummary} from "../../data/portfolioShowcase";
import {getText} from "../../utils/i18n";

const Projects = () => {
  const {language} = useContext(LanguageContext);

  const copy = {
    empty: {
      zh: "暂无可展示项目。",
      en: "No showcase projects available yet."
    }
  };

  const projects = useMemo(() => {
    return portfolioProjects.map(project => ({
      ...project,
      accent: project.subtitle || project.actionLabel
    }));
  }, []);

  if (projects.length === 0) {
    return <p className="projects-empty">{getText(copy.empty, language)}</p>;
  }

  return (
    <Fade bottom duration={1000} distance="20px">
      <section className="projects-showcase">
        <div className="projects-dossier-intro">
          <div className="dossier-header">
            <p className="dossier-kicker">PROJECT DOSSIER</p>
            <h3>{getText(projectSummary.title, language)}</h3>
            <p className="dossier-subtitle">
              {getText(projectSummary.subtitle, language)}
            </p>
          </div>
          <p className="projects-intro">
            {getText(projectSummary.lead, language)}
          </p>
          <div className="dossier-signal-grid">
            {projectSummary.signals.map(signal => (
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
