import React, {useContext, useMemo, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import "./PhotoArchivePage.scss";
import LanguageContext from "../contexts/LanguageContext";
import {formatDate, getText} from "../utils/i18n";
import {getPhotos} from "../services/contentAPI";

export default function PhotoArchivePage() {
  const {language} = useContext(LanguageContext);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const allPhotos = await getPhotos();
      if (mounted) setPhotos(allPhotos || []);
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const yearHighlights = useMemo(() => {
    const byYear = new Map();
    photos.forEach(photo => {
      const year = (photo.captureDate || "").slice(0, 4);
      if (!year) return;
      const existing = byYear.get(year);
      if (!existing) {
        byYear.set(year, {
          year,
          count: 1,
          latestDate: photo.captureDate,
          coverImage: photo.thumbnail || photo.url
        });
        return;
      }
      existing.count += 1;
      if (
        new Date(photo.captureDate).getTime() >
        new Date(existing.latestDate).getTime()
      ) {
        existing.latestDate = photo.captureDate;
        existing.coverImage = photo.thumbnail || photo.url;
      }
    });
    return Array.from(byYear.values()).sort(
      (a, b) => Number(b.year) - Number(a.year)
    );
  }, [photos]);

  const copy = {
    title: {zh: "Photo Wall", en: "Photo Wall"},
    subtitle: {
      zh: "不放虚构图集。这里只展示已经整理好的影像条目，其余内容等正式归档后再上线。",
      en: "No fake galleries here. This page shows only the image entries that are already curated and ready to publish."
    },
    introTitle: {
      zh: "Archive Rules",
      en: "Archive Rules"
    },
    introPoints: [
      {
        zh: "只保留真实拍摄、已整理完成的图像。",
        en: "Keep only real images that have already been organized."
      },
      {
        zh: "没有现成系列时，宁可留白，也不摆模板占位图。",
        en: "If a series is not ready, leave space instead of filling it with placeholders."
      },
      {
        zh: "后续会按年度与主题继续补档。",
        en: "Year and theme-based archive sets will be added as they are ready."
      }
    ],
    latestWall: {zh: "Published Frames", en: "Published Frames"},
    explore: {zh: "进入该年度", en: "Open Year"},
    count: {zh: "张作品", en: "photos"},
    latest: {zh: "最近拍摄", en: "Latest"},
    empty: {
      zh: "摄影页面暂时不放占位内容。等首批正式图集整理好后，这里会直接变成完整照片墙。",
      en: "No placeholder content is shown on the photography page. Once the first real sets are curated, this will turn into a full photo wall."
    }
  };

  return (
    <div className="page-container">
      <div className="page-hero photo-archive-hero">
        <h1 className="page-title">{getText(copy.title, language)}</h1>
        <p className="page-subtitle">{getText(copy.subtitle, language)}</p>
      </div>

      <section className="photo-archive-notes">
        <h2>{getText(copy.introTitle, language)}</h2>
        <div className="photo-archive-note-list">
          {copy.introPoints.map(item => (
            <article className="photo-archive-note" key={item.en}>
              <p>{getText(item, language)}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="photo-archive-published">
        <div className="photo-archive-head">
          <h2>{getText(copy.latestWall, language)}</h2>
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
              <img src={yearItem.coverImage} alt={yearItem.year} />
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
      </section>
    </div>
  );
}
