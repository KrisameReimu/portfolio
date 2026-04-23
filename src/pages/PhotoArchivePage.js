import React, {useContext, useMemo, useEffect, useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import "./PhotoArchivePage.scss";
import PageHero from "../components/pageHero/PageHero";
import LanguageContext from "../contexts/LanguageContext";
import {formatDate, getText} from "../utils/i18n";
import {getPhotos} from "../services/contentAPI";
import {openHeroTarget} from "../utils/heroNavigation";

export default function PhotoArchivePage() {
  const {language} = useContext(LanguageContext);
  const navigate = useNavigate();
  const location = useLocation();
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

  const heroCards = useMemo(() => {
    if (yearHighlights.length > 0) {
      return yearHighlights.slice(0, 3).map(item => ({
        year: item.year,
        title: {
          zh: `${item.year} 照片归档`,
          en: `${item.year} Photo Archive`
        },
        description: {
          zh: `${item.count} 张作品，最近拍摄 ${formatDate(
            item.latestDate,
            "zh"
          )}`,
          en: `${item.count} photos, latest ${formatDate(
            item.latestDate,
            "en"
          )}`
        },
        image: item.coverImage,
        cta: {
          zh: "Open Year",
          en: "Open Year"
        },
        href: `/photos/${item.year}`
      }));
    }

    return [
      {
        eyebrow: "01",
        title: {
          zh: "Archive Rules",
          en: "Archive Rules"
        },
        description: {
          zh: "只放真实、已整理好的作品，不用占位图补墙。",
          en: "Only real, curated work is published. No fake wall fillers."
        },
        cta: {
          zh: "Open Section",
          en: "Open Section"
        },
        href: "#archive-rules"
      },
      {
        eyebrow: "02",
        title: {
          zh: "Published Frames",
          en: "Published Frames"
        },
        description: {
          zh: "一旦首批图集完成，这里会直接成为照片墙入口。",
          en: "Once the first real set is ready, this becomes the photo-wall entry."
        },
        cta: {
          zh: "Open Section",
          en: "Open Section"
        },
        href: "#published-frames"
      },
      {
        eyebrow: "03",
        title: {
          zh: "About Practice",
          en: "About Practice"
        },
        description: {
          zh: "先把图像归档逻辑说清楚，再慢慢扩充长期系列。",
          en: "State the archive logic clearly first, then expand the long-term series."
        },
        cta: {
          zh: "Open About",
          en: "Open About"
        },
        href: "/about"
      }
    ];
  }, [yearHighlights]);

  return (
    <div className="page-container">
      <PageHero
        pageKey="photos"
        title={copy.title}
        subtitle={copy.subtitle}
        description={{
          zh: "摄影页也必须先讲真实内容，再谈形式。现在 hero 里的卡片都能直接点进相应归档或说明部分。",
          en: "The photography page should explain real content before styling it. Every hero card now opens a real archive target or section."
        }}
        visualType="interactive-feature"
        mediaItems={heroCards}
        onMediaItemClick={item =>
          openHeroTarget({
            target: item.href,
            navigate,
            currentPathname: location.pathname
          })
        }
      />

      <section className="photo-archive-notes" id="archive-rules">
        <h2>{getText(copy.introTitle, language)}</h2>
        <div className="photo-archive-note-list">
          {copy.introPoints.map(item => (
            <article className="photo-archive-note" key={item.en}>
              <p>{getText(item, language)}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="photo-archive-published" id="published-frames">
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
