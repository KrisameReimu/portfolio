import React, {useContext, useMemo} from "react";
import {useParams} from "react-router-dom";
import "./VideoYearPage.scss";
import LanguageContext from "../contexts/LanguageContext";
import useAsyncCollection from "../hooks/useAsyncCollection";
import {filterEntriesByYear} from "../utils/archive";
import {formatDate, getText} from "../utils/i18n";
import {getVideos} from "../services/contentAPI";
import ArchiveYearPage from "../components/archiveYearPage/ArchiveYearPage";

export default function VideoYearPage() {
  const {year} = useParams();
  const {language} = useContext(LanguageContext);
  const {items: videos, isLoading} = useAsyncCollection({
    load: () => getVideos(),
    reloadKey: year
  });

  const filtered = useMemo(
    () => filterEntriesByYear(videos, "publishedDate", year),
    [videos, year]
  );

  const copy = {
    title: {zh: `${year} 影像精选`, en: `${year} Video Highlights`},
    subtitle: {
      zh: "这一年的影像作品与视觉实验。",
      en: "Visual works and experiments from the year."
    },
    empty: {
      zh: "该年度影像正在整理中，敬请期待。",
      en: "This year's video archive is being curated."
    },
    back: {zh: "返回影像主页", en: "Back to Videos"}
  };

  return (
    <ArchiveYearPage
      pageKey="videos"
      eyebrow="Video Archive"
      title={getText(copy.title, language)}
      subtitle={getText(copy.subtitle, language)}
      backHref="/videos"
      backLabel={getText(copy.back, language)}
      loadingMessage={getText({zh: "加载中...", en: "Loading..."}, language)}
      emptyMessage={getText(copy.empty, language)}
      isLoading={isLoading}
      hasItems={filtered.length > 0}
    >
      <div className="archive-year-page__content video-year-grid">
        {filtered.map(video => (
          <div className="video-year-card" key={video.id}>
            <img
              src={video.thumbnailUrl}
              alt={getText(video.title, language)}
            />
            <div className="video-year-meta">
              <h3>{getText(video.title, language)}</h3>
              <p>{formatDate(video.publishedDate, language)}</p>
            </div>
          </div>
        ))}
      </div>
    </ArchiveYearPage>
  );
}
