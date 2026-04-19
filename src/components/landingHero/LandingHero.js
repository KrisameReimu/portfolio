import React, {useContext} from "react";
import LanguageContext from "../../contexts/LanguageContext";
import {getText} from "../../utils/i18n";
import "./LandingHero.scss";

/**
 * LandingHero - Unified page landing component
 *
 * Replaces bland page-title with distinctive, story-driven hero sections.
 * Supports multiple variants: narrative, stats, carousel, minimal
 *
 * Props:
 *   variant: "narrative" | "stats" | "carousel" | "minimal" (default: "narrative")
 *   title: {zh, en} - Main heading
 *   subtitle: {zh, en} - Tagline or descriptor
 *   description: {zh, en} - (narrative only) Extended story text
 *   stats: Array<{label: {zh, en}, value: string|number}> - (stats only)
 *   accentColor: string - CSS color for visual accent (e.g., "#4A90E2")
 *   accentImage: string - Background image URL (optional)
 *   icon: React.ReactNode - (minimal only) Icon component
 *   children: React.ReactNode - Custom content
 */
export default function LandingHero({
  variant = "narrative",
  title = {},
  subtitle = {},
  description = {},
  stats = [],
  accentColor = "#4A90E2",
  accentImage = null,
  icon = null,
  children = null,
  className = ""
}) {
  const {language} = useContext(LanguageContext);

  const titleText = getText(title, language);
  const subtitleText = getText(subtitle, language);
  const descriptionText = description ? getText(description, language) : "";

  const renderNarrative = () => (
    <div className="landing-hero__narrative">
      <div className="narrative-content">
        <h1 className="narrative-title">{titleText}</h1>
        <p className="narrative-subtitle">{subtitleText}</p>
        {descriptionText && (
          <p className="narrative-description">{descriptionText}</p>
        )}
      </div>
      <div
        className="narrative-accent"
        style={{backgroundColor: accentColor}}
      />
    </div>
  );

  const renderStats = () => (
    <div className="landing-hero__stats">
      <div className="stats-header">
        <h1 className="stats-title">{titleText}</h1>
        <p className="stats-subtitle">{subtitleText}</p>
      </div>
      {stats.length > 0 && (
        <div className="stats-grid">
          {stats.map((stat, idx) => (
            <div key={idx} className="stat-item">
              <div
                className="stat-accent"
                style={{backgroundColor: accentColor}}
              />
              <div className="stat-content">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">
                  {getText(stat.label, language)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderCarousel = () => (
    <div className="landing-hero__carousel">
      <div className="carousel-overlay" style={{backgroundColor: accentColor}}>
        <div className="carousel-content">
          <h1 className="carousel-title">{titleText}</h1>
          <p className="carousel-subtitle">{subtitleText}</p>
        </div>
      </div>
      {accentImage && (
        <img
          src={accentImage}
          alt={titleText}
          className="carousel-background"
        />
      )}
    </div>
  );

  const renderMinimal = () => (
    <div className="landing-hero__minimal">
      {icon && <div className="minimal-icon">{icon}</div>}
      <h1 className="minimal-title">{titleText}</h1>
      <p className="minimal-subtitle">{subtitleText}</p>
    </div>
  );

  const renderContent = () => {
    switch (variant) {
      case "stats":
        return renderStats();
      case "carousel":
        return renderCarousel();
      case "minimal":
        return renderMinimal();
      case "narrative":
      default:
        return renderNarrative();
    }
  };

  return (
    <div className={`landing-hero ${className}`} data-variant={variant}>
      {renderContent()}
      {children}
    </div>
  );
}
