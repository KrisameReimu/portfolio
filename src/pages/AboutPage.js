import React, {useContext} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import LanguageContext from "../contexts/LanguageContext";
import PageHero from "../components/pageHero/PageHero";
import PageSurface from "../components/pageSurface/PageSurface";
import {aboutPageCopy} from "../config/pages/aboutPage";
import {getText} from "../utils/i18n";
import {greeting} from "../portfolio";
import {openHeroTarget} from "../utils/heroNavigation";
import "./AboutPage.scss";

export default function AboutPage() {
  const {language} = useContext(LanguageContext);
  const navigate = useNavigate();
  const location = useLocation();
  const copy = aboutPageCopy;

  return (
    <PageSurface pageKey="about" className="page-container about-page">
      <PageHero
        pageKey="about"
        title={copy.title}
        subtitle={copy.subtitle}
        description={copy.intro}
        mediaItems={copy.heroCards}
        onMediaItemClick={item =>
          openHeroTarget({
            target: item.href,
            navigate,
            currentPathname: location.pathname
          })
        }
      />

      <section className="about-block" id="profile-signals">
        <h2>{getText(copy.profileTitle, language)}</h2>
        <div className="about-signal-list">
          {copy.profileSignals.map(item => (
            <article className="about-signal-item" key={item.title.en}>
              <h3>{getText(item.title, language)}</h3>
              <p>{getText(item.body, language)}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-current" id="cv-timeline">
        <h2>{getText(copy.timelineTitle, language)}</h2>
        <div className="about-timeline">
          {copy.timelineItems.map(item => (
            <article className="about-timeline-item" key={item.period}>
              <span>{item.period}</span>
              <h3>{getText(item.title, language)}</h3>
              <p>{getText(item.body, language)}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-block" id="education">
        <h2>{getText(copy.educationTitle, language)}</h2>
        <div className="about-signal-list">
          {copy.educationItems.map(item => (
            <article className="about-signal-item" key={item.title.en}>
              <h3>{getText(item.title, language)}</h3>
              <p>{getText(item.body, language)}</p>
            </article>
          ))}
        </div>
      </section>

      {greeting.resumeLink && (
        <div className="about-resume-card">
          <p>{getText(copy.resumeHint, language)}</p>
          <a
            href={greeting.resumeLink}
            target="_blank"
            rel="noreferrer"
            className="about-resume-button"
          >
            {getText(copy.resumeButton, language)}
          </a>
        </div>
      )}
    </PageSurface>
  );
}
