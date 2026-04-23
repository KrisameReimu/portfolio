import React from "react";
import {getText} from "../../utils/i18n";

export default function ImageChartGallery({charts = [], language}) {
  if (!charts.length) return null;

  return (
    <div className="project-image-chart-stack">
      {charts.map((chart, index) => (
        <article className="project-image-chart-card" key={chart.src}>
          <div className="project-chart-header">
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{getText(chart.title, language)}</h3>
            {chart.caption && <p>{getText(chart.caption, language)}</p>}
          </div>
          <figure className="project-image-chart-figure">
            <img
              src={chart.src}
              alt={getText(chart.alt, language)}
              loading="lazy"
            />
          </figure>
        </article>
      ))}
    </div>
  );
}
