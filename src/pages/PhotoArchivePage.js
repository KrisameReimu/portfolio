import React, {useContext, useMemo, useState} from "react";
import {Link, useSearchParams} from "react-router-dom";
import "./PhotoArchivePage.scss";
import PageSurface from "../components/pageSurface/PageSurface";
import LanguageContext from "../contexts/LanguageContext";
import useAsyncCollection from "../hooks/useAsyncCollection";
import {formatDate, getText} from "../utils/i18n";
import {getPhotos} from "../services/contentAPI";
import {summarizeEntriesByYear} from "../utils/archive";
import {
  DEFAULT_PHOTO_VIEW_MODE,
  PHOTO_VIEW_MODES,
  photosPageCopy
} from "../config/pages/photosPage";
import {getPageHeroVisual} from "../config/pages/pageHeroVisuals";

export default function PhotoArchivePage() {
  const {language} = useContext(LanguageContext);
  const [focusedFrame, setFocusedFrame] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const {items: photos} = useAsyncCollection({
    load: () => getPhotos()
  });
  const requestedView = searchParams.get("view");
  const activeView = PHOTO_VIEW_MODES.includes(requestedView)
    ? requestedView
    : DEFAULT_PHOTO_VIEW_MODE;

  const setActiveView = view => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set("view", view);
    setSearchParams(nextParams);
  };

  const yearHighlights = useMemo(() => {
    return summarizeEntriesByYear(photos, {
      dateField: "captureDate",
      getCoverImage: photo => photo.thumbnail || photo.url
    }).map(group => ({
      year: group.year,
      count: group.count,
      latestDate: group.latestDate,
      coverImage: group.coverImage
    }));
  }, [photos]);

  const copy = photosPageCopy;
  const photoHeroVisual = getPageHeroVisual("photos");
  const galleryFrames = [
    {
      id: "pending",
      label: "Featured set pending release",
      size: "large"
    },
    {id: "urban", label: "Urban"},
    {id: "portrait", label: "Portrait"},
    {id: "stillness", label: "Stillness"},
    {id: "year-archive", label: "Year archive"}
  ];
  const focusedFrameData = galleryFrames.find(
    frame => frame.id === focusedFrame
  );

  return (
    <PageSurface pageKey="photos" className="page-container">
      <section className="photo-landing">
        <div className="photo-landing__hero">
          <div className="photo-landing__copy">
            <p className="photo-landing__kicker">Photo Exhibition</p>
            <h1>{getText(copy.title, language)}</h1>
            <p className="photo-landing__subtitle">
              {getText(copy.subtitle, language)}
            </p>
            <div className="photo-landing__actions">
              <button
                type="button"
                className={activeView === "featured" ? "is-active" : ""}
                aria-pressed={activeView === "featured"}
                onClick={() => setActiveView("featured")}
              >
                {getText(copy.tabs.featured, language)}
              </button>
              <button
                type="button"
                className={activeView === "archive" ? "is-active" : ""}
                aria-pressed={activeView === "archive"}
                onClick={() => setActiveView("archive")}
              >
                {getText(copy.tabs.archive, language)}
              </button>
              <button
                type="button"
                className={activeView === "year" ? "is-active" : ""}
                aria-pressed={activeView === "year"}
                onClick={() => setActiveView("year")}
              >
                {getText(copy.tabs.year, language)}
              </button>
            </div>
          </div>

          <div className="photo-landing__wall">
            {photoHeroVisual && (
              <figure className="photo-landing__poster">
                <img
                  src={photoHeroVisual.src}
                  alt={getText(photoHeroVisual.alt, language)}
                  width="1672"
                  height="941"
                  decoding="async"
                />
                <figcaption>
                  <span>{getText(photoHeroVisual.label, language)}</span>
                  {getText(photoHeroVisual.caption, language)}
                </figcaption>
              </figure>
            )}
            <div className="photo-landing__frame-grid">
              {galleryFrames.slice(1).map(frame => (
                <button
                  className="photo-landing__frame"
                  key={frame.id}
                  onClick={() => setFocusedFrame(frame.id)}
                  type="button"
                >
                  <span>{frame.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
      {focusedFrameData && (
        <section className="photo-focus-mode" aria-live="polite">
          <button
            className="photo-focus-mode__close"
            onClick={() => setFocusedFrame(null)}
            type="button"
          >
            Close focus
          </button>
          <div className="photo-focus-mode__stage">
            <p>Focus preview</p>
            <h2>{focusedFrameData.label}</h2>
            <span>
              {language === "zh"
                ? "真实照片集准备好后，这里会进入沉浸式观看。"
                : "When the real set is ready, this becomes the immersive viewing state."}
            </span>
          </div>
        </section>
      )}

      <section className="photo-archive-stage">
        {activeView === "featured" && (
          <div className="photo-stage-panel">
            <div className="photo-stage-panel__head">
              <p>{getText(copy.stageTitle, language)}</p>
              <h2>{getText(copy.stageLead, language)}</h2>
            </div>
            <div className="photo-stage-panel__grid">
              {copy.featuredNotes.map(item => (
                <article className="photo-stage-note" key={item.label.en}>
                  <span>{getText(item.label, language)}</span>
                  <p>{getText(item.title, language)}</p>
                </article>
              ))}
            </div>
          </div>
        )}

        {activeView === "archive" && (
          <div className="photo-stage-panel">
            <div className="photo-stage-panel__head">
              <p>{getText(copy.archiveTitle, language)}</p>
              <h2>{getText(copy.archiveLead, language)}</h2>
            </div>
            <div className="photo-stage-panel__stats">
              {copy.categoryCards.map(card => (
                <article className="photo-stage-stat" key={card.label.en}>
                  <span>{getText(card.label, language)}</span>
                  <strong>{getText(card.value, language)}</strong>
                </article>
              ))}
            </div>
            <div className="photo-stage-panel__rules">
              {copy.introPoints.map(item => (
                <article className="photo-stage-rule" key={item.en}>
                  <p>{getText(item, language)}</p>
                </article>
              ))}
            </div>
          </div>
        )}

        {activeView === "year" && (
          <div className="photo-stage-panel">
            <div className="photo-stage-panel__head">
              <p>{getText(copy.latestWall, language)}</p>
              <h2>
                {yearHighlights.length > 0
                  ? language === "zh"
                    ? "年度入口已经准备好进入真实归档。"
                    : "Year entries are ready to lead into the real archive."
                  : getText(copy.yearEmpty, language)}
              </h2>
            </div>
            <div className="photo-archive-grid">
              {yearHighlights.length === 0 && (
                <div className="photo-year-card photo-year-card--empty">
                  <div className="photo-year-content">
                    <p>{getText(copy.empty, language)}</p>
                  </div>
                </div>
              )}
              {yearHighlights.map(yearItem => (
                <div className="photo-year-card" key={yearItem.year}>
                  <img
                    src={yearItem.coverImage}
                    alt={yearItem.year}
                    width="640"
                    height="420"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="photo-year-content">
                    <span className="photo-year-label">{yearItem.year}</span>
                    <h3>
                      {yearItem.count} {getText(copy.count, language)}
                    </h3>
                    <p>
                      {getText(copy.latest, language)}:{" "}
                      {formatDate(yearItem.latestDate, language)}
                    </p>
                    <Link
                      to={`/photos/${yearItem.year}`}
                      className="photo-year-link"
                    >
                      {getText(copy.explore, language)} →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
      <section className="photo-archive-afterword">
        <p>{getText(copy.emptyStage, language)}</p>
      </section>
    </PageSurface>
  );
}
