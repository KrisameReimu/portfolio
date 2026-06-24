import React, {useContext, useMemo} from "react";
import {useParams} from "react-router-dom";
import "./PhotoYearPage.scss";
import LanguageContext from "../contexts/LanguageContext";
import useAsyncCollection from "../hooks/useAsyncCollection";
import {filterEntriesByYear} from "../utils/archive";
import {formatDate, getText} from "../utils/i18n";
import {getPhotos} from "../services/contentAPI";
import ArchiveYearPage from "../components/archiveYearPage/ArchiveYearPage";

export default function PhotoYearPage() {
  const {year} = useParams();
  const {language} = useContext(LanguageContext);
  const {items: photos, isLoading} = useAsyncCollection({
    load: () => getPhotos(),
    reloadKey: year
  });

  const filtered = useMemo(
    () => filterEntriesByYear(photos, "captureDate", year),
    [photos, year]
  );

  const copy = {
    title: {zh: `${year} 摄影精选`, en: `${year} Photo Highlights`},
    subtitle: {
      zh: "这一年的城市、人物与自然片段。",
      en: "Urban, portrait, and nature moments from the year."
    },
    empty: {
      zh: "该年度影像正在整理中，敬请期待。",
      en: "This year's archive is being curated."
    },
    back: {zh: "返回摄影档案", en: "Back to Photo Archive"}
  };

  return (
    <ArchiveYearPage
      pageKey="photos"
      eyebrow="Photo Archive"
      title={getText(copy.title, language)}
      subtitle={getText(copy.subtitle, language)}
      backHref="/photos"
      backLabel={getText(copy.back, language)}
      loadingMessage={getText({zh: "加载中...", en: "Loading..."}, language)}
      emptyMessage={getText(copy.empty, language)}
      isLoading={isLoading}
      hasItems={filtered.length > 0}
    >
      <div className="archive-year-page__content photo-year-grid">
        {filtered.map(photo => (
          <div className="photo-year-item" key={photo.id}>
            <img src={photo.url} alt={getText(photo.title, language)} />
            <div className="photo-year-meta">
              <h3>{getText(photo.title, language)}</h3>
              <p>{formatDate(photo.captureDate, language)}</p>
            </div>
          </div>
        ))}
      </div>
    </ArchiveYearPage>
  );
}
