import React, {useContext, useState} from "react";
import "./InteractiveFeatured.scss";
import LanguageContext from "../../contexts/LanguageContext";
import {getText} from "../../utils/i18n";

const InteractiveFeatured = () => {
  const {language} = useContext(LanguageContext);
  const [mousePosition, setMousePosition] = useState({x: 0, y: 0});
  const [mediaOffset, setMediaOffset] = useState({x: 0, y: 0});
  const [isHovering, setIsHovering] = useState(false);

  const content = {
    label: {
      zh: "精选演示",
      en: "Featured Demo"
    },
    headline: {
      zh: "文本动态环绕的交互体验",
      en: "Dynamic Text Flow Interactive Experience"
    },
    description: {
      zh: "这是一个受 Pretext 启发的交互式布局演示。当你与右侧的媒体元素交互时，左侧的文本会动态调整，就像真实的排版软件一样。文字会智能地避开或环绕媒体，创造出流畅的阅读体验。",
      en: "This is an interactive layout demo inspired by Pretext. As you interact with the media element on the right, the text on the left dynamically adjusts, just like real typographic software. Words intelligently flow around or avoid media, creating a smooth reading experience."
    },
    features: {
      zh: [
        "文本动态流动：根据媒体位置实时调整",
        "交互式设计：hover 和拖动效果",
        "响应式布局：完美适配所有屏幕",
        "流畅动画：舒适的视觉过渡"
      ],
      en: [
        "Dynamic text flow: Adjust in real-time based on media position",
        "Interactive design: Hover and drag effects",
        "Responsive layout: Perfect adaptation to all screens",
        "Smooth animation: Comfortable visual transitions"
      ]
    },
    cta: {
      zh: "探索更多交互演示",
      en: "Explore More Demos"
    }
  };

  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

  const handleMediaMouseMove = event => {
    const rect = event.currentTarget.getBoundingClientRect();
    const localX = event.clientX - rect.left;
    const localY = event.clientY - rect.top;
    const normalizedX = (localX - rect.width / 2) / (rect.width / 2 || 1);
    const normalizedY = (localY - rect.height / 2) / (rect.height / 2 || 1);

    setMousePosition({
      x: localX,
      y: localY
    });
    setMediaOffset({
      x: clamp(normalizedX * 18, -18, 18),
      y: clamp(normalizedY * 18, -18, 18)
    });
  };

  const handleMediaMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMediaMouseLeave = () => {
    setIsHovering(false);
    setMediaOffset({x: 0, y: 0});
  };

  return (
    <section className="interactive-featured">
      <div className="featured-label">{getText(content.label, language)}</div>

      <div className="featured-container">
        {/* Left: Text Area with Flow Around Media */}
        <div className="featured-text-area">
          <h2 className="featured-headline">
            {getText(content.headline, language)}
          </h2>

          <div className="featured-text-flow">
            <p className="featured-description">
              {getText(content.description, language)}
            </p>

            <div className="featured-features">
              <h3>{language === "zh" ? "核心特性" : "Key Features"}</h3>
              <ul>
                {getText(content.features, language).map((feature, idx) => (
                  <li key={idx}>
                    <span className="feature-dot"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="featured-cta">
            <a href="/lab" className="cta-link">
              {getText(content.cta, language)}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M8 1v14M8 1l-6 6m6-6l6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>

        {/* Right: Interactive Media Area */}
        <div className="featured-media-container">
          {/* Responsive media placeholder with interactive shape */}
          <div
            className={`featured-media ${isHovering ? "hovering" : ""}`}
            onMouseMove={handleMediaMouseMove}
            onMouseEnter={handleMediaMouseEnter}
            onMouseLeave={handleMediaMouseLeave}
            style={{
              transform: isHovering
                ? `translate(${mediaOffset.x}px, ${mediaOffset.y}px)`
                : "translate(0, 0)"
            }}
          >
            {/* Animated shape */}
            <div className="media-shape media-shape-1"></div>
            <div className="media-shape media-shape-2"></div>
            <div className="media-shape media-shape-3"></div>

            {/* Placeholder for video/image */}
            <div className="media-placeholder">
              <div className="media-icon">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <path
                    d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm-4 30V14l12 10-12 10z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <p className="media-text">
                {language === "zh" ? "视频或媒体展示" : "Video or Media"}
              </p>
              <p className="media-hint">
                {language === "zh"
                  ? "移动鼠标查看交互效果"
                  : "Move your mouse to see interactions"}
              </p>
            </div>

            {/* Mouse tracker dot */}
            {isHovering && (
              <div
                className="mouse-tracker"
                style={{
                  left: `${mousePosition.x - 10}px`,
                  top: `${mousePosition.y - 10}px`
                }}
              />
            )}
          </div>

          {/* Decorative elements */}
          <div className="media-decoration media-decoration-1"></div>
          <div className="media-decoration media-decoration-2"></div>
        </div>
      </div>

      {/* Background gradient */}
      <div className="featured-bg-gradient"></div>
    </section>
  );
};

export default InteractiveFeatured;
