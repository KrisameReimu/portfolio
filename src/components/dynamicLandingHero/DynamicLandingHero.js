import React, {useContext} from "react";
import LanguageContext from "../../contexts/LanguageContext";
import {getText} from "../../utils/i18n";
import "./DynamicLandingHero.scss";

/**
 * DynamicLandingHero - Specialized landing hero with left-text / right-visual layout
 *
 * Purpose: Create unique, non-templated page introductions with visual assets
 *
 * Props:
 *   title: {zh, en}
 *   subtitle: {zh, en}
 *   description: {zh, en} - Optional detailed text
 *   visualType: "video-wall" | "image-wall" | "stat-preview" | "custom"
 *   visualContent: React.ReactNode - Custom visual element
 *   accentColor: string
 *   stats: Array<{value, label}> - For stat-preview type
 *   images: Array<string> - For image-wall type
 */
export default function DynamicLandingHero({
  title = {},
  subtitle = {},
  description = {},
  visualType = "custom",
  visualContent = null,
  accentColor = "#4A90E2",
  stats = [],
  images = [],
  className = ""
}) {
  const {language} = useContext(LanguageContext);

  const titleText = getText(title, language);
  const subtitleText = getText(subtitle, language);
  const descriptionText = description ? getText(description, language) : "";

  const renderVisual = () => {
    switch (visualType) {
      case "video-wall":
        return (
          <div className="visual-wall video-wall">
            <div className="placeholder">🎬 Video Wall</div>
          </div>
        );

      case "image-wall":
        return (
          <div className="visual-wall image-wall">
            {images.length > 0 ? (
              <div className="image-grid">
                {images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`Visual ${idx}`}
                    className="wall-image"
                  />
                ))}
              </div>
            ) : (
              <div className="placeholder">📷 Image Wall</div>
            )}
          </div>
        );

      case "stat-preview":
        return (
          <div className="visual-wall stat-preview">
            <div className="stat-items">
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="stat-bubble"
                  style={{backgroundColor: accentColor}}
                >
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">
                    {getText(stat.label, language)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "custom":
      default:
        return visualContent ? (
          <div className="visual-wall custom-visual">{visualContent}</div>
        ) : null;
    }
  };

  return (
    <div className={`dynamic-landing-hero ${className}`}>
      <div className="hero-container">
        {/* 左侧文字区域 */}
        <div className="hero-content">
          <h1 className="hero-title">{titleText}</h1>
          <p className="hero-subtitle">{subtitleText}</p>
          {descriptionText && (
            <p className="hero-description">{descriptionText}</p>
          )}
        </div>

        {/* 右侧视觉区域 */}
        <div className="hero-visual">{renderVisual()}</div>
      </div>

      {/* 底部分割线 */}
      <div className="hero-divider" style={{backgroundColor: accentColor}} />
    </div>
  );
}
