import React from "react";
import {getPageIdentity} from "../../config/pageIdentity";
import "./PageSurface.scss";

export default function PageSurface({pageKey, className = "", children}) {
  const identity = getPageIdentity(pageKey);
  const surfaceClassName = [identity.pageClassName, className]
    .filter(Boolean)
    .join(" ");
  const surfaceStyle = identity.accentColor
    ? {
        "--page-accent": identity.accentColor
      }
    : undefined;

  return (
    <div
      className={surfaceClassName}
      style={surfaceStyle}
      data-hero-mode={identity.heroMode}
      data-layout-rhythm={identity.layoutRhythm}
      data-motion-tone={identity.motionTone}
      data-media-treatment={identity.mediaTreatment}
      data-design-reference={identity.designReference?.archetype}
    >
      {children}
    </div>
  );
}
