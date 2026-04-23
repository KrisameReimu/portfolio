import React from "react";
import {getText} from "../../utils/i18n";

export default function CaseStudySectionHeader({eyebrow, title, language}) {
  return (
    <div className="project-detail-section-header">
      {eyebrow && <span>{eyebrow}</span>}
      <h2>{getText(title, language)}</h2>
    </div>
  );
}
