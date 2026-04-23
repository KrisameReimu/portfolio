import React, {useState, useEffect, useContext, useMemo} from "react";
import {Fade} from "../motion/Fade";
import LanguageContext from "../../contexts/LanguageContext";
import {getText, formatDate} from "../../utils/i18n";
import "./FeaturedVideoCarousel.scss";

/**
 * FeaturedVideoCarousel - 精选视频轮动展示组件
 *
 * 功能：
 * - 展示精选视频（有awards或featured标记的视频）
 * - 自动轮播（5秒间隔）
 * - 支持手动左右切换
 * - 显示详细背景故事
 * - 响应式设计
 */
export default function FeaturedVideoCarousel({videos = []}) {
  const {language} = useContext(LanguageContext);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  // 从所有视频中筛选出精选视频
  const featuredVideos = useMemo(() => {
    return videos.filter(
      video => video.featured || (video.awards && video.awards.length > 0)
    );
  }, [videos]);

  useEffect(() => {
    if (featuredVideos.length === 0) {
      setCurrentIndex(0);
      return;
    }
    if (currentIndex >= featuredVideos.length) {
      setCurrentIndex(0);
    }
  }, [currentIndex, featuredVideos.length]);

  // 自动轮播逻辑
  useEffect(() => {
    if (featuredVideos.length === 0 || !autoPlay) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % featuredVideos.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoPlay, featuredVideos.length]);

  // 恢复自动播放（用户交互后3秒）
  useEffect(() => {
    if (!autoPlay && featuredVideos.length > 0) {
      const timer = setTimeout(() => setAutoPlay(true), 3000);
      return () => clearTimeout(timer);
    }
  }, [autoPlay, featuredVideos.length]);

  if (featuredVideos.length === 0) return null;

  const current = featuredVideos[currentIndex];
  if (!current) return null;
  const videoId = current.videoId || "";
  const embedUrl = videoId
    ? `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`
    : "";
  const watchUrl =
    current.watchUrl || (videoId ? `https://youtu.be/${videoId}` : "");

  const handlePrev = () => {
    setAutoPlay(false);
    setCurrentIndex(
      prev => (prev - 1 + featuredVideos.length) % featuredVideos.length
    );
  };

  const handleNext = () => {
    setAutoPlay(false);
    setCurrentIndex(prev => (prev + 1) % featuredVideos.length);
  };

  const handleDotClick = index => {
    setAutoPlay(false);
    setCurrentIndex(index);
  };

  return (
    <Fade bottom duration={800} distance="20px">
      <div className="featured-video-carousel">
        <div className="carousel-container">
          {/* 视频展示部分 */}
          <div className="carousel-video-section">
            {embedUrl ? (
              <div className="carousel-video-embed">
                <iframe
                  key={current.id}
                  src={embedUrl}
                  title={getText(current.title, language)}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            ) : (
              <div className="carousel-video-placeholder">
                <img
                  src={current.thumbnailUrl || ""}
                  alt={getText(current.title, language)}
                />
                <div className="play-button-overlay">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            )}
          </div>

          {/* 信息和导航部分 */}
          <div className="carousel-info-section">
            {/* 标题 */}
            <h2 className="carousel-title">
              {getText(current.title, language)}
            </h2>

            {/* 背景故事 */}
            {current.backgroundStory && (
              <div className="carousel-story">
                <p className="story-label">✨ 背景故事</p>
                <p className="story-text">
                  {getText(current.backgroundStory, language)}
                </p>
              </div>
            )}

            {/* 元数据 */}
            <div className="carousel-meta">
              {current.awards && current.awards.length > 0 && (
                <div className="carousel-awards">
                  {current.awards.map((award, idx) => (
                    <span
                      key={idx}
                      className={`award-badge ${award.level || ""}`}
                    >
                      <i className="fas fa-trophy"></i> {award.name}
                    </span>
                  ))}
                </div>
              )}
              <div className="carousel-date">
                <i className="far fa-calendar"></i>
                {formatDate(current.publishedDate, language)}
              </div>
            </div>

            {/* 查看按钮 */}
            {watchUrl && (
              <a
                href={watchUrl}
                target="_blank"
                rel="noreferrer"
                className="carousel-watch-button"
              >
                <span>在YouTube上查看</span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M7 17L17 7M17 7H7m10 0v10" />
                </svg>
              </a>
            )}

            {/* 导航控制 */}
            <div className="carousel-controls">
              {/* 左右箭头 */}
              <div className="carousel-arrows">
                <button
                  className="carousel-arrow prev"
                  onClick={handlePrev}
                  aria-label="Previous video"
                  type="button"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                  </svg>
                </button>

                {/* 圆点指示器 */}
                <div className="carousel-dots">
                  {featuredVideos.map((_, idx) => (
                    <button
                      key={idx}
                      className={`dot ${idx === currentIndex ? "active" : ""}`}
                      onClick={() => handleDotClick(idx)}
                      aria-label={`Go to video ${idx + 1}`}
                      type="button"
                    />
                  ))}
                </div>

                <button
                  className="carousel-arrow next"
                  onClick={handleNext}
                  aria-label="Next video"
                  type="button"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 进度指示 */}
        <div className="carousel-progress">
          <div
            className="progress-bar"
            style={{
              width: `${((currentIndex + 1) / featuredVideos.length) * 100}%`,
              animation: autoPlay ? "progress 5s linear forwards" : "none"
            }}
          />
        </div>
      </div>
    </Fade>
  );
}
