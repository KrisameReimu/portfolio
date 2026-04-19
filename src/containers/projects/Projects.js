import React, {useContext, useMemo} from "react";
import {Fade} from "react-reveal";
import "./Project.scss";
import Button from "../../components/button/Button";
import LanguageContext from "../../contexts/LanguageContext";
import {portfolioProjects} from "../../data/portfolioShowcase";
import {getText} from "../../utils/i18n";

const Projects = () => {
  const {language} = useContext(LanguageContext);

  const copy = {
    intro: {
      zh: "这里放的是更接近你个人 IP 的稳定作品，不再依赖临时生成的 GitHub profile 数据。",
      en: "These are the stable showcase pieces that represent your personal brand, no longer tied to generated GitHub profile data."
    },
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
        <p className="projects-intro">{getText(copy.intro, language)}</p>
        <div className="projects-grid">
          {projects.map(project => (
            <article className="project-card" key={project.id}>
              <div className="project-card-top">
                <p className="project-card-eyebrow">{project.subtitle}</p>
                <h3 className="project-card-title">{project.title}</h3>
                <p className="project-card-detail">{project.detail}</p>
              </div>
              <div className="project-card-footer">
                <Button text={project.actionLabel} href={project.href} newTab />
              </div>
            </article>
          ))}
        </div>
      </section>
    </Fade>
  );
};

export default Projects;
