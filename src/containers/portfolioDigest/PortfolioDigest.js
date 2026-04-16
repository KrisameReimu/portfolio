import React, {useContext} from "react";
import {Link} from "react-router-dom";
import "./PortfolioDigest.scss";
import LanguageContext from "../../contexts/LanguageContext";
import {getText} from "../../utils/i18n";
import {greeting, socialMediaLinks} from "../../portfolio";
import {
  portfolioHero,
  portfolioPhotos,
  portfolioProjects,
  portfolioVideos
} from "../../data/portfolioShowcase";

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

const isExternal = href => /^https?:\/\//.test(href || "");

const ActionLink = ({href, label}) => {
  if (!href) return null;
  if (isExternal(href)) {
    return (
      <a href={href} target="_blank" rel="noreferrer">
        {label}
      </a>
    );
  }
  return <Link to={href}>{label}</Link>;
};

export default function PortfolioDigest() {
  const {language} = useContext(LanguageContext);
  const primaryVideo = portfolioVideos[0];
  const secondaryVideos = portfolioVideos.slice(1);
  const hasPhotos = portfolioPhotos.length > 0;

  return (
    <section className="portfolio-digest" id="portfolio-highlights">
      <header className="portfolio-hero">
        <p className="hero-kicker">Portfolio</p>
        <h2>
          {portfolioHero.name}
          <span>{getText(portfolioHero.role, language)}</span>
        </h2>
        <p>{getText(portfolioHero.intro, language)}</p>
        <div className="hero-actions">
          <Link to="/videos">Videos</Link>
          <Link to="/lab">Coding Projects</Link>
          <a href={socialMediaLinks.youtube} target="_blank" rel="noreferrer">
            YouTube Channel
          </a>
          {greeting.resumeLink && (
            <a href={greeting.resumeLink} target="_blank" rel="noreferrer">
              Download CV
            </a>
          )}
        </div>
      </header>

      <section className="portfolio-block">
        <div className="block-header">
          <h3>Featured Videos</h3>
          <Link to="/videos">View All</Link>
        </div>
        <div className="featured-videos-layout">
          {primaryVideo && (
            <a
              href={primaryVideo.href}
              target="_blank"
              rel="noreferrer"
              className="video-card video-card-primary"
            >
              <div className="video-frame video-frame-primary">
                <img
                  src={toYouTubeThumb(primaryVideo.href)}
                  alt={primaryVideo.title}
                />
                <span>Main Showcase</span>
              </div>
              <h4>{primaryVideo.title}</h4>
              <p>{primaryVideo.description}</p>
              <p className="video-meta">{primaryVideo.meta}</p>
            </a>
          )}

          <div className="video-grid-secondary">
            {secondaryVideos.map(item => (
              <a
                key={item.id}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="video-card"
              >
                <div className="video-frame">
                  <img src={toYouTubeThumb(item.href)} alt={item.title} />
                  <span>Watch</span>
                </div>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
                <p className="video-meta">{item.meta}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section
        className={hasPhotos ? "portfolio-block dual" : "portfolio-block"}
      >
        <div>
          <div className="block-header">
            <h3>Selected Coding Projects</h3>
            <Link to="/lab">Explore</Link>
          </div>
          <div className="project-list">
            {portfolioProjects.map(project => (
              <article key={project.id} className="project-card">
                <h4>{project.title}</h4>
                <p className="project-subtitle">{project.subtitle}</p>
                <p>{project.detail}</p>
                <ActionLink
                  href={project.href || project.to}
                  label={project.actionLabel || "Open Project"}
                />
              </article>
            ))}
          </div>
        </div>

        {hasPhotos && (
          <div>
            <div className="block-header">
              <h3>Photo Stories</h3>
              <Link to="/photos">Explore</Link>
            </div>
            <div className="photo-list">
              {portfolioPhotos.map(photo => (
                <article key={photo.id} className="photo-card">
                  <div className="photo-thumb">
                    {photo.imageUrl && (
                      <img src={photo.imageUrl} alt={photo.title} />
                    )}
                  </div>
                  <h4>{photo.title}</h4>
                  <p>{photo.detail}</p>
                  <ActionLink
                    href={photo.href || photo.to}
                    label={photo.actionLabel || "Open Gallery"}
                  />
                </article>
              ))}
            </div>
          </div>
        )}
      </section>
    </section>
  );
}
