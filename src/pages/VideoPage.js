import React, {useContext, useMemo} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import VideoPortfolio from "../sections/videoPortfolio/VideoPortfolio";
import FeaturedVideoCarousel from "../components/featuredVideoCarousel/FeaturedVideoCarousel";
import PageHero from "../components/pageHero/PageHero";
import PageSurface from "../components/pageSurface/PageSurface";
import LanguageContext from "../contexts/LanguageContext";
import useAsyncCollection from "../hooks/useAsyncCollection";
import {getText} from "../utils/i18n";
import {getVideos} from "../services/contentAPI";
import {sortEntriesByDateDesc, summarizeEntriesByYear} from "../utils/archive";
import {openHeroTarget} from "../utils/heroNavigation";
import {videosPageCopy} from "../config/pages/videosPage";
import "./VideoPage.scss";

export default function VideoPage() {
  const {language} = useContext(LanguageContext);
  const navigate = useNavigate();
  const location = useLocation();
  const {items: videos} = useAsyncCollection({
    load: () => getVideos()
  });

  // 最近上传的视频（最近6个）
  const latestVideos = useMemo(() => {
    return sortEntriesByDateDesc(videos, "publishedDate").slice(0, 6);
  }, [videos]);

  // 按年份分组的视频
  const videosByYear = useMemo(() => {
    return summarizeEntriesByYear(videos, {
      dateField: "publishedDate"
    }).map(group => ({
      year: group.year,
      videos: group.items
    }));
  }, [videos]);

  const copy = videosPageCopy;

  return (
    <PageSurface pageKey="videos" className="page-container">
      <PageHero
        pageKey="videos"
        title={copy.title}
        subtitle={copy.subtitle}
        description={copy.description}
        visualType={videos.length > 0 ? "interactive-video" : "video-wall"}
        mediaItems={latestVideos.slice(0, 8)}
        onMediaItemClick={item =>
          openHeroTarget({
            target: item.videoId
              ? `https://www.youtube.com/watch?v=${item.videoId}`
              : "/videos",
            navigate,
            currentPathname: location.pathname
          })
        }
      />

      {/* 精选视频轮动Hero */}
      {videos.length > 0 && <FeaturedVideoCarousel videos={videos} />}

      {/* 最近上传部分 */}
      {latestVideos.length > 0 && (
        <section className="videos-latest-section">
          <div className="section-container">
            <div className="section-header">
              <h2 className="section-title">
                {getText(copy.latest, language)}
              </h2>
              <p className="section-subtitle">
                {getText(copy.latestSubtitle, language)}
              </p>
            </div>
            <VideoPortfolio videos={latestVideos} showHeading={false} />
          </div>
        </section>
      )}

      {/* 年度档案部分 */}
      {videosByYear.length > 0 && (
        <section className="videos-archive-section">
          <div className="section-container">
            <h2 className="section-title">{getText(copy.archive, language)}</h2>

            {videosByYear.map(yearData => (
              <div key={yearData.year} className="year-group">
                <div className="year-header">
                  <h3 className="year-title">{yearData.year}</h3>
                  <span className="year-count">
                    {yearData.videos.length} {getText(copy.videos, language)}
                  </span>
                </div>
                <VideoPortfolio videos={yearData.videos} showHeading={false} />
              </div>
            ))}
          </div>
        </section>
      )}

      {videos.length === 0 && (
        <div className="empty-state">
          <p>{getText(copy.empty, language)}</p>
        </div>
      )}
    </PageSurface>
  );
}
