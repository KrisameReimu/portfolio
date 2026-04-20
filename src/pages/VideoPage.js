import React, {useContext, useEffect, useMemo, useState} from "react";
import VideoPortfolio from "../containers/videoPortfolio/VideoPortfolio";
import FeaturedVideoCarousel from "../components/featuredVideoCarousel/FeaturedVideoCarousel";
import DynamicLandingHero from "../components/dynamicLandingHero/DynamicLandingHero";
import LanguageContext from "../contexts/LanguageContext";
import {getText} from "../utils/i18n";
import {getVideos} from "../services/contentAPI";
import "./VideoPage.scss";

export default function VideoPage() {
  const {language} = useContext(LanguageContext);
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

  // 最近上传的视频（最近6个）
  const latestVideos = useMemo(() => {
    return [...videos]
      .sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate))
      .slice(0, 6);
  }, [videos]);

  // 按年份分组的视频
  const videosByYear = useMemo(() => {
    const byYear = new Map();
    videos.forEach(video => {
      const year = (video.publishedDate || "").slice(0, 4);
      if (!year) return;

      if (!byYear.has(year)) {
        byYear.set(year, []);
      }
      byYear.get(year).push(video);
    });

    return Array.from(byYear.entries())
      .sort((a, b) => Number(b[0]) - Number(a[0]))
      .map(([year, yearVideos]) => ({
        year,
        videos: yearVideos.sort(
          (a, b) => new Date(b.publishedDate) - new Date(a.publishedDate)
        )
      }));
  }, [videos]);

  const copy = {
    title: {zh: "影像作品集", en: "Video Portfolio"},
    subtitle: {
      zh: "记录创意瞬间，从想法到故事",
      en: "From ideas to stories, capturing creative moments"
    },
    latest: {
      zh: "最近上传",
      en: "Latest Uploads"
    },
    latestSubtitle: {
      zh: "最新的创意作品",
      en: "My latest creative works"
    },
    archive: {
      zh: "年度档案库",
      en: "Archive"
    },
    videos: {zh: "个作品", en: "videos"},
    empty: {zh: "暂无视频内容。", en: "No videos yet."}
  };

  return (
    <div className="page-container">
      <DynamicLandingHero
        title={copy.title}
        subtitle={copy.subtitle}
        description={{
          zh: "我用影像讲故事。从概念到成品，每一帧都是创意的痕迹。",
          en: "I tell stories with video. Every frame is a trace of creativity—from concept to final cut."
        }}
        visualType="video-wall"
        accentColor="#4A90E2"
        className="videos-landing-hero"
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
    </div>
  );
}
