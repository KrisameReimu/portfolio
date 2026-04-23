import React from "react";
import DynamicLandingHero from "../dynamicLandingHero/DynamicLandingHero";
import {getPageIdentity} from "../../config/pageIdentity";

export default function PageHero({
  pageKey,
  title,
  subtitle,
  description,
  visualType,
  mediaItems,
  onMediaItemClick,
  visualContent,
  stats,
  images,
  className = "",
  accentColor
}) {
  const identity = getPageIdentity(pageKey);
  const heroClassName = [identity.heroClassName, className]
    .filter(Boolean)
    .join(" ");

  return (
    <DynamicLandingHero
      title={title}
      subtitle={subtitle}
      description={description}
      visualType={visualType || identity.visualType}
      mediaItems={mediaItems}
      onMediaItemClick={onMediaItemClick}
      visualContent={visualContent}
      stats={stats}
      images={images}
      accentColor={accentColor || identity.accentColor}
      className={heroClassName}
    />
  );
}
