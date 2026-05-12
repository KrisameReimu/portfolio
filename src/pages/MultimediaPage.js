import React, {useContext} from "react";
import {Link} from "react-router-dom";
import PageSurface from "../components/pageSurface/PageSurface";
import LanguageContext from "../contexts/LanguageContext";
import {
  multimediaPageAssets,
  multimediaPageCopy
} from "../config/pages/multimediaPage";
import {getPageHeroVisual} from "../config/pages/pageHeroVisuals";
import {getText} from "../utils/i18n";
import "./MultimediaPage.scss";

export default function MultimediaPage() {
  const {language} = useContext(LanguageContext);
  const copy = multimediaPageCopy;
  const heroVisual = getPageHeroVisual("multimedia");

  return (
    <PageSurface
      pageKey="multimedia"
      className="page-container multimedia-page"
    >
      <section className="multimedia-hero" aria-labelledby="multimedia-title">
        <div className="multimedia-hero__surface">
          {heroVisual && (
            <figure className="multimedia-hero__poster">
              <img
                src={heroVisual.src}
                alt={getText(heroVisual.alt, language)}
                width="1672"
                height="941"
                decoding="async"
              />
              <figcaption>
                <span>{getText(heroVisual.label, language)}</span>
                {getText(heroVisual.caption, language)}
              </figcaption>
            </figure>
          )}
          <div className="multimedia-hero__content">
            <p className="multimedia-kicker">
              {getText(copy.hero.kicker, language)}
            </p>
            <h1 id="multimedia-title">{getText(copy.hero.title, language)}</h1>
            <p className="multimedia-hero__subtitle">
              {getText(copy.hero.subtitle, language)}
            </p>
            <p className="multimedia-hero__meta">
              {getText(copy.hero.meta, language)}
            </p>
          </div>
        </div>
      </section>

      <section className="multimedia-overview" aria-labelledby="media-areas">
        <div className="multimedia-section-head">
          <p>{getText(copy.entryLabel, language)}</p>
          <h2 id="media-areas">{getText(copy.hero.note, language)}</h2>
        </div>
        <div className="multimedia-entry-grid">
          {copy.entries.map(entry => {
            const existingPageVisual = entry.visualKey
              ? getPageHeroVisual(entry.visualKey)
              : null;
            const customVisual = entry.imageKey
              ? multimediaPageAssets[entry.imageKey]
              : null;
            const visual = customVisual || existingPageVisual;
            const content = (
              <>
                <div className="multimedia-entry__visual">
                  {visual ? (
                    <img
                      src={visual.src}
                      alt={getText(visual.alt, language)}
                      width="720"
                      height="405"
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <div className="multimedia-entry__placeholder">
                      <span>{getText(entry.title, language)}</span>
                    </div>
                  )}
                </div>
                <div className="multimedia-entry__meta">
                  <span>{getText(entry.status, language)}</span>
                  <span>{getText(entry.label, language)}</span>
                </div>
                <h3>{getText(entry.title, language)}</h3>
                <p>{getText(entry.description, language)}</p>
                <span className="multimedia-entry__action">
                  {entry.href
                    ? getText(copy.openLabel, language)
                    : getText(copy.futureLabel, language)}
                </span>
              </>
            );

            if (entry.href) {
              return (
                <Link
                  className="multimedia-entry multimedia-entry--link"
                  to={entry.href}
                  key={entry.id}
                >
                  {content}
                </Link>
              );
            }

            return (
              <article
                className="multimedia-entry multimedia-entry--future"
                key={entry.id}
              >
                {content}
              </article>
            );
          })}
        </div>
      </section>

      <section className="multimedia-transition-note">
        <p>{getText(copy.footer.title, language)}</p>
        <h2>{getText(copy.footer.body, language)}</h2>
      </section>
    </PageSurface>
  );
}
