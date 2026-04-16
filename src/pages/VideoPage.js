import React, {useContext, useState, useEffect, useMemo} from "react";
import VideoPortfolio from "../containers/videoPortfolio/VideoPortfolio";
import Achievement from "../containers/achievement/Achievement";
import {Link} from "react-router-dom";
import LanguageContext from "../contexts/LanguageContext";
import {formatDate, getText} from "../utils/i18n";
import {getVideos} from "../services/contentAPI";
import "./VideoPage.scss";

export default function VideoPage() {
  const {language} = useContext(LanguageContext);
  const [activeTab, setActiveTab] = useState("highlights");
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const allVideos = await getVideos();
      if (mounted) setVideos(allVideos || []);
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const yearCards = useMemo(() => {
    const byYear = new Map();
    videos.forEach(video => {
      const year = (video.publishedDate || "").slice(0, 4);
      if (!year) return;

      const existing = byYear.get(year);
      if (!existing) {
        byYear.set(year, {
          year,
          count: 1,
          latestDate: video.publishedDate,
          coverImage: video.thumbnailUrl
        });
        return;
      }

      existing.count += 1;
      if (
        new Date(video.publishedDate).getTime() >
        new Date(existing.latestDate).getTime()
      ) {
        existing.latestDate = video.publishedDate;
        existing.coverImage = video.thumbnailUrl;
      }
    });

    return Array.from(byYear.values()).sort(
      (a, b) => Number(b.year) - Number(a.year)
    );
  }, [videos]);

  const copy = {
    title: {zh: "视频作品集", en: "Video Portfolio"},
    subtitle: {
      zh: "持续更新的影像作品与视觉实验",
      en: "Continuously updated visual works and moving-image experiments"
    },
    tabs: {
      highlights: {zh: "精选作品", en: "Highlights"},
      years: {zh: "按年份", en: "By Year"}
    },
    explore: {zh: "进入该年度", en: "Explore Year"},
    count: {zh: "个作品", en: "videos"},
    latest: {zh: "最近发布", en: "Last release"},
    empty: {zh: "暂无年度视频内容。", en: "No yearly videos yet."}
  };

  return (
    <div className="page-container">
      <div className="page-hero video-hero">
        <h1 className="page-title">{getText(copy.title, language)}</h1>
        <p className="page-subtitle">{getText(copy.subtitle, language)}</p>
      </div>

      <div className="archive-tabs">
        <button
          className={activeTab === "highlights" ? "active" : ""}
          onClick={() => setActiveTab("highlights")}
          type="button"
        >
          {getText(copy.tabs.highlights, language)}
        </button>
        <button
          className={activeTab === "years" ? "active" : ""}
          onClick={() => setActiveTab("years")}
          type="button"
        >
          {getText(copy.tabs.years, language)}
        </button>
      </div>

      {activeTab === "highlights" ? (
        <>
          <VideoPortfolio showHeading={false} />
          <div className="achievements-section">
            <Achievement />
          </div>
        </>
      ) : (
        <div className="archive-grid">
          {yearCards.length === 0 && (
            <div className="archive-card">
              <div className="archive-content">
                <p>{getText(copy.empty, language)}</p>
              </div>
            </div>
          )}

          {yearCards.map(item => (
            <div className="archive-card" key={item.year}>
              <img src={item.coverImage} alt={item.year} />
              <div className="archive-content">
                <span className="archive-label">{item.year}</span>
                <h3>
                  {item.count} {getText(copy.count, language)}
                </h3>
                <p>
                  {getText(copy.latest, language)}:{" "}
                  {formatDate(item.latestDate, language)}
                </p>
                <Link to={`/videos/${item.year}`} className="archive-link">
                  {getText(copy.explore, language)} ->
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
