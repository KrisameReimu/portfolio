import React, {useEffect, useRef, useState, useContext} from "react";
import LanguageContext from "../../contexts/LanguageContext";
import {getText} from "../../utils/i18n";
import "./InteractiveMediaWall.scss";

/**
 * InteractiveMediaWall - Advanced interactive media visualization
 *
 * Combines DOM rendering with canvas animations for smooth interactions
 * Supports: video thumbnails, photo galleries, stat displays
 *
 * Props:
 *   type: 'video' | 'photo' | 'stat'
 *   items: Array of items to display
 *   onItemClick: Callback when item is clicked
 *   accentColor: Primary color for the wall
 *   animationSpeed: 'slow' | 'normal' | 'fast'
 */
export default function InteractiveMediaWall({
  type = "video",
  items = [],
  onItemClick = null,
  accentColor = "#4A90E2",
  animationSpeed = "normal"
}) {
  const {language} = useContext(LanguageContext);
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const animationFrameRef = useRef(null);
  const particlesRef = useRef([]);

  // Animation speed mapping
  const speedMap = {
    slow: 0.3,
    normal: 0.6,
    fast: 1
  };
  const speedFactor = speedMap[animationSpeed] || 0.6;

  // Canvas animation setup
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size to match container
    const updateCanvasSize = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.setTransform(
        window.devicePixelRatio,
        0,
        0,
        window.devicePixelRatio,
        0,
        0
      );
    };

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    // Particle system for background animation
    const initParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < 20; i++) {
        particlesRef.current.push({
          x: (Math.random() * canvas.width) / window.devicePixelRatio,
          y: (Math.random() * canvas.height) / window.devicePixelRatio,
          vx: (Math.random() - 0.5) * 0.5 * speedFactor,
          vy: (Math.random() - 0.5) * 0.5 * speedFactor,
          radius: Math.random() * 2 + 1,
          opacity: Math.random() * 0.3 + 0.1,
          life: 1
        });
      }
    };

    initParticles();

    // Animation loop
    const animate = () => {
      // Clear canvas
      ctx.fillStyle = "rgba(255, 255, 255, 0)";
      ctx.clearRect(
        0,
        0,
        canvas.width / window.devicePixelRatio,
        canvas.height / window.devicePixelRatio
      );

      // Update and draw particles
      particlesRef.current.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        p.opacity -= 0.002 * speedFactor;
        p.life -= 0.002 * speedFactor;

        // Wrap around edges
        const w = canvas.width / window.devicePixelRatio;
        const h = canvas.height / window.devicePixelRatio;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        // Draw particle
        ctx.fillStyle = `rgba(${parseInt(
          accentColor.slice(1, 3),
          16
        )}, ${parseInt(accentColor.slice(3, 5), 16)}, ${parseInt(
          accentColor.slice(5, 7),
          16
        )}, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        // Respawn dead particles
        if (p.life <= 0) {
          particlesRef.current[i] = {
            x: Math.random() * w,
            y: Math.random() * h,
            vx: (Math.random() - 0.5) * 0.5 * speedFactor,
            vy: (Math.random() - 0.5) * 0.5 * speedFactor,
            radius: Math.random() * 2 + 1,
            opacity: Math.random() * 0.3 + 0.1,
            life: 1
          };
        }
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Check visibility
    const checkVisibility = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      // Element is in viewport - we can use this for future optimizations
      const inViewport = rect.top < window.innerHeight && rect.bottom > 0;
      return inViewport;
    };

    window.addEventListener("scroll", checkVisibility);
    checkVisibility();

    return () => {
      window.removeEventListener("resize", updateCanvasSize);
      window.removeEventListener("scroll", checkVisibility);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [accentColor, speedFactor]);

  // Handle item hover with ripple effect
  const handleItemHover = index => {
    setHoveredIndex(index);

    // Ripple effect on canvas
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Draw ripple (subtle background effect)
      ctx.strokeStyle = `${accentColor}40`; // 25% opacity
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(
        (Math.random() * canvas.width) / window.devicePixelRatio,
        (Math.random() * canvas.height) / window.devicePixelRatio,
        20,
        0,
        Math.PI * 2
      );
      ctx.stroke();
    }
  };

  const handleItemClick = (item, index) => {
    if (onItemClick) {
      onItemClick(item, index);
    }
  };

  return (
    <div className="interactive-media-wall" ref={containerRef}>
      <canvas ref={canvasRef} className="wall-canvas" />

      <div className="wall-content">
        {type === "video" && (
          <div className="video-grid">
            {items.map((item, idx) => (
              <div
                key={idx}
                className={`video-item ${
                  hoveredIndex === idx ? "hovered" : ""
                }`}
                onMouseEnter={() => handleItemHover(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => handleItemClick(item, idx)}
              >
                <div
                  className="video-thumbnail"
                  style={{
                    backgroundImage: `url(${
                      item.thumbnail || item.thumbnailUrl
                    })`
                  }}
                >
                  <div className="play-button">▶</div>
                </div>
                <div className="video-info">
                  <span className="year">
                    {item.year ||
                      (item.publishedDate
                        ? new Date(item.publishedDate).getFullYear()
                        : "")}
                  </span>
                  <h3 className="title">
                    {typeof item.title === "object"
                      ? getText(item.title, language)
                      : item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        )}

        {type === "photo" && (
          <div className="photo-grid">
            {items.map((item, idx) => (
              <div
                key={idx}
                className={`photo-item ${
                  hoveredIndex === idx ? "hovered" : ""
                }`}
                onMouseEnter={() => handleItemHover(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => handleItemClick(item, idx)}
              >
                <img
                  src={item.url || item.src}
                  alt={item.alt || `Photo ${idx}`}
                  className="photo-image"
                />
                <div className="photo-overlay">
                  <span className="category">
                    {typeof item.category === "object"
                      ? getText(item.category, language)
                      : item.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {type === "stat" && (
          <div className="stat-grid">
            {items.map((item, idx) => (
              <div
                key={idx}
                className={`stat-item ${hoveredIndex === idx ? "hovered" : ""}`}
                onMouseEnter={() => handleItemHover(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div
                  className="stat-value"
                  style={{color: item.color || accentColor}}
                >
                  {item.value}
                </div>
                <div className="stat-label">
                  {typeof item.label === "object"
                    ? getText(item.label, language)
                    : item.label}
                </div>
                {item.description && (
                  <div className="stat-description">
                    {typeof item.description === "object"
                      ? getText(item.description, language)
                      : item.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
