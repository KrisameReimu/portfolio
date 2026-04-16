import React, {useContext, useEffect, useMemo, useState} from "react";
import {Link} from "react-router-dom";
import "./HomeSummary.scss";
import {getArticles, getPhotos, getVideos} from "../../services/contentAPI";
import LanguageContext from "../../contexts/LanguageContext";
import {formatDate, getText} from "../../utils/i18n";
import {portfolioVideos} from "../../data/portfolioShowcase";

const extractYouTubeId = url => {
  if (!url) return "";
  const shortMatch = url.match(/youtu\.be\/([^?&]+)/);
  if (shortMatch?.[1]) return shortMatch[1];
  const longMatch = url.match(/[?&]v=([^?&]+)/);
  if (longMatch?.[1]) return longMatch[1];
  return "";
};

const toYouTubeThumb = url => {
  const id = extractYouTubeId(url);
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : "";
};

const HomeSummary = () => {
  const {language} = useContext(LanguageContext);
  const [articles, setArticles] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [videos, setVideos] = useState([]);

  const latestArticles = useMemo(() => {
    return [...articles]
      .filter(article => article.publishedDate)
      .sort(
        (a, b) =>
          new Date(b.publishedDate).getTime() -
          new Date(a.publishedDate).getTime()
      )
      .slice(0, 3);
  }, [articles]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const [remoteArticles, remotePhotos, remoteVideos] = await Promise.all([
        getArticles(),
        getPhotos(),
        getVideos()
      ]);
      if (mounted) {
        setArticles(remoteArticles || []);
        setPhotos(remotePhotos || []);
        setVideos(remoteVideos || []);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const latestPhotos = useMemo(() => {
    return [...photos]
      .filter(photo => photo.captureDate)
      .sort(
        (a, b) =>
          new Date(b.captureDate).getTime() - new Date(a.captureDate).getTime()
      )
      .slice(0, 3);
  }, [photos]);

  const latestVideos = useMemo(() => {
    return [...videos]
      .filter(video => video.publishedDate)
      .sort(
        (a, b) =>
          new Date(b.publishedDate).getTime() -
          new Date(a.publishedDate).getTime()
      )
      .slice(0, 2);
  }, [videos]);

  const curatedPortfolioVideos = useMemo(() => {
    return portfolioVideos
      .map((item, index) => ({
        id: `curated-${item.id}`,
        title: {zh: item.title, en: item.title},
        publishedDate: `2026-01-0${index + 1}`,
        thumbnailUrl: toYouTubeThumb(item.href),
        href: item.href
      }))
      .filter(item => item.thumbnailUrl);
  }, []);

  const latestActivityDate = useMemo(() => {
    const dates = [
      ...latestArticles.map(article => article.publishedDate),
      ...latestPhotos.map(photo => photo.captureDate),
      ...latestVideos.map(video => video.publishedDate)
    ]
      .map(date => new Date(date))
      .filter(date => !Number.isNaN(date.getTime()));
    if (!dates.length) return "";
    dates.sort((a, b) => b.getTime() - a.getTime());
    return formatDate(dates[0].toISOString(), language);
  }, [language, latestArticles, latestPhotos, latestVideos]);

  const featuredWorks = [
    {
      id: "polyu-research",
      title: {
        zh: "PolyU 研究项目助理",
        en: "PolyU Research Project Assistant"
      },
      description: {
        zh: "聚焦 AI 与多媒体交汇的研究项目，推进内容生成与交互体验的探索，并将研究成果转化为可展示的作品。",
        en: "Exploring AI + multimedia research, advancing content generation and interactive experiences, and turning results into showcase-worthy work."
      },
      meta: {zh: "当前工作 · 研究项目", en: "Current · Research Project"},
      link: "/about"
    },
    {
      id: "video-awards",
      title: {
        zh: "获奖影像作品集",
        en: "Award-Winning Video Portfolio"
      },
      description: {
        zh: "纪录片、短片与宣传片，聚焦人文叙事与视觉表达。",
        en: "Documentaries, short films, and promos focused on human stories and visual language."
      },
      meta: {zh: "多项奖项 · 影像创作", en: "Multiple awards · Video"},
      link: "/videos"
    },
    {
      id: "photo-series",
      title: {
        zh: "年度摄影系列",
        en: "Yearly Photography Series"
      },
      description: {
        zh: "城市、人像、自然主题的长期影像记录与年度总结。",
        en: "Long-term photo essays across urban, portrait, and nature themes with yearly recaps."
      },
      meta: {zh: "持续更新 · 摄影档案", en: "Ongoing · Photo Archive"},
      link: "/photos"
    }
  ];

  const copy = {
    intro: {
      zh: "我用技术讲故事，也用影像记录人生。这里是我持续输出的内容摘要与创作地图。",
      en: "I tell stories with technology and preserve life with visuals. This is a living summary of my work and ideas."
    },
    latestWriting: {
      zh: "最新文章",
      en: "Latest Writing"
    },
    featuredWorks: {
      zh: "精选作品",
      en: "Featured Works"
    },
    latestVisuals: {
      zh: "最新影像",
      en: "Latest Visuals"
    },
    exploreWriting: {
      zh: "进入写作页面",
      en: "Explore Writing"
    },
    exploreWorks: {
      zh: "查看全部作品",
      en: "View All Works"
    },
    exploreVisuals: {
      zh: "查看摄影与影像",
      en: "View Photo & Video"
    },
    cadence: {
      zh: "持续更新中 · 最近更新",
      en: "Updated regularly · Last updated"
    }
  };

  return (
    <section className="home-summary">
      <div className="summary-intro">
        <p className="summary-text">{getText(copy.intro, language)}</p>
        {latestActivityDate && (
          <p className="summary-cadence">
            {getText(copy.cadence, language)} {latestActivityDate}
          </p>
        )}
      </div>

      <div className="summary-section">
        <div className="summary-header">
          <h2>{getText(copy.latestWriting, language)}</h2>
          <Link className="summary-link" to="/writing">
            {getText(copy.exploreWriting, language)}
          </Link>
        </div>
        <div className="summary-grid">
          {latestArticles.map(article => (
            <Link
              key={article.id}
              className="summary-card"
              to={`/articles/${article.id}`}
            >
              <div className="summary-card-meta">
                <span>{formatDate(article.publishedDate, language)}</span>
                <span>{article.readingTime} min</span>
              </div>
              <h3>{getText(article.title, language)}</h3>
              <p>{getText(article.excerpt, language)}</p>
            </Link>
          ))}
        </div>
      </div>

      <div className="summary-section">
        <div className="summary-header">
          <h2>{getText(copy.featuredWorks, language)}</h2>
          <Link className="summary-link" to="/game-dev">
            {getText(copy.exploreWorks, language)}
          </Link>
        </div>
        <div className="featured-grid">
          {featuredWorks.map(work => (
            <Link key={work.id} className="featured-card" to={work.link}>
              <p className="featured-meta">{getText(work.meta, language)}</p>
              <h3>{getText(work.title, language)}</h3>
              <p>{getText(work.description, language)}</p>
            </Link>
          ))}
        </div>
      </div>

      <div className="summary-section">
        <div className="summary-header">
          <h2>{getText(copy.latestVisuals, language)}</h2>
          <Link className="summary-link" to="/photos">
            {getText(copy.exploreVisuals, language)}
          </Link>
        </div>
        <div className="visual-grid">
          {latestPhotos.map(photo => (
            <div className="visual-card" key={photo.id}>
              <img
                src={photo.thumbnail || photo.url}
                alt={getText(photo.title, language)}
              />
              <div className="visual-meta">
                <span>{getText(photo.title, language)}</span>
                <span>{formatDate(photo.captureDate, language)}</span>
              </div>
            </div>
          ))}
          {latestVideos.map(video => (
            <a
              className="visual-card"
              key={video.id}
              href={`/videos`}
              aria-label={getText(video.title, language)}
            >
              <img
                src={video.thumbnailUrl}
                alt={getText(video.title, language)}
              />
              <div className="visual-meta">
                <span>{getText(video.title, language)}</span>
                <span>{formatDate(video.publishedDate, language)}</span>
              </div>
            </a>
          ))}
          {curatedPortfolioVideos.map(video => (
            <a
              className="visual-card"
              key={video.id}
              href={video.href}
              target="_blank"
              rel="noreferrer"
              aria-label={getText(video.title, language)}
            >
              <img
                src={video.thumbnailUrl}
                alt={getText(video.title, language)}
              />
              <div className="visual-meta">
                <span>{getText(video.title, language)}</span>
                <span>{formatDate(video.publishedDate, language)}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeSummary;
