import React from "react";
import {Link} from "react-router-dom";
import {getText} from "../../utils/i18n";

export default function CaseStudyHero({
  project,
  language,
  backLabel,
  metaLabels
}) {
  const overview = project.overview || [];

  return (
    <header className="case-study-hero">
      <div className="case-study-hero__topline">
        <Link to="/projects" className="project-detail-back">
          ← {getText(backLabel, language)}
        </Link>
        <span>{getText(project.eyebrow, language)}</span>
      </div>

      <div className="case-study-hero__grid">
        <div className="case-study-hero__copy">
          <p className="case-study-hero__kicker">
            {getText(project.proofTag, language)}
          </p>
          <h1>{getText(project.title, language)}</h1>
          <p className="case-study-hero__summary">
            {getText(project.heroSummary, language)}
          </p>
        </div>

        <aside className="case-study-hero__panel" aria-label="Project metadata">
          <div>
            <span>{getText(metaLabels.organization, language)}</span>
            <strong>{getText(project.organization, language)}</strong>
          </div>
          <div>
            <span>{getText(metaLabels.role, language)}</span>
            <strong>{getText(project.role, language)}</strong>
          </div>
          <div>
            <span>{getText(metaLabels.time, language)}</span>
            <strong>{getText(project.timeframe, language)}</strong>
          </div>
        </aside>
      </div>

      {overview.length > 0 && (
        <div className="case-study-evidence-strip">
          {overview.map(item => (
            <article key={item.label.en}>
              <span>{getText(item.label, language)}</span>
              <p>{getText(item.value, language)}</p>
            </article>
          ))}
        </div>
      )}
    </header>
  );
}
