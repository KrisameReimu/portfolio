import React, {useContext, useEffect, useMemo, useState} from "react";
import WritingShowcase from "../containers/writingShowcase/WritingShowcase";
import LandingHero from "../components/landingHero/LandingHero";
import {Link} from "react-router-dom";
import LanguageContext from "../contexts/LanguageContext";
import {formatDate, getText} from "../utils/i18n";
import {getArticles} from "../services/contentAPI";
import "./WritingPage.scss";

export default function WritingPage() {
  const {language} = useContext(LanguageContext);
  const [activeTab, setActiveTab] = useState("all");
  const [articles, setArticles] = useState([]);
  const [isLoadingYears, setIsLoadingYears] = useState(true);

  const copy = {
    title: {
      zh: "文字创作",
      en: "Writing Showcase"
    },
    subtitle: {
      zh: "持续发布的文章与思考归档",
      en: "A continuously updated archive of essays and reflections"
    },
    tabs: {
      all: {
        zh: "全部文章",
        en: "All Articles"
      },
      years: {
        zh: "按年份",
        en: "By Year"
      }
    },
    explore: {
      zh: "进入该年度",
      en: "Explore Year"
    },
    postCount: {
      zh: "篇文章",
      en: "articles"
    },
    latest: {
      zh: "最近更新",
      en: "Last update"
    },
    loading: {
      zh: "正在加载年份归档...",
      en: "Loading yearly archive..."
    }
  };

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setIsLoadingYears(true);
        const allArticles = await getArticles();
        if (mounted) setArticles(allArticles || []);
      } finally {
        if (mounted) setIsLoadingYears(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const yearCards = useMemo(() => {
    const byYear = new Map();
    articles.forEach(article => {
      const year = (article.publishedDate || "").slice(0, 4);
      if (!year) return;
      const existing = byYear.get(year);
      if (!existing) {
        byYear.set(year, {
          year,
          count: 1,
          latestDate: article.publishedDate
        });
        return;
      }
      existing.count += 1;
      if (
        new Date(article.publishedDate).getTime() >
        new Date(existing.latestDate).getTime()
      ) {
        existing.latestDate = article.publishedDate;
      }
    });

    return Array.from(byYear.values()).sort(
      (a, b) => Number(b.year) - Number(a.year)
    );
  }, [articles]);

  return (
    <div className="page-container">
      <LandingHero
        variant="narrative"
        title={copy.title}
        subtitle={copy.subtitle}
        description={{
          zh: "在这里我记录思考、分享观点、记述学习历程。每一篇文章都是一个创意对话。",
          en: "Here I record thoughts, share perspectives, and document my learning journey. Every essay is a creative conversation."
        }}
        accentColor="#667eea"
        className="writing-landing-hero"
      />
      <div className="archive-tabs">
        <button
          className={activeTab === "all" ? "active" : ""}
          onClick={() => setActiveTab("all")}
          type="button"
        >
          {getText(copy.tabs.all, language)}
        </button>
        <button
          className={activeTab === "years" ? "active" : ""}
          onClick={() => setActiveTab("years")}
          type="button"
        >
          {getText(copy.tabs.years, language)}
        </button>
      </div>

      {activeTab === "all" ? (
        <WritingShowcase />
      ) : (
        <div className="archive-grid">
          {isLoadingYears && (
            <div className="archive-card">
              <div className="archive-content">
                <p>{getText(copy.loading, language)}</p>
              </div>
            </div>
          )}
          {!isLoadingYears &&
            yearCards.map(item => (
              <div className="archive-card" key={item.year}>
                <div className="archive-content">
                  <span className="archive-label">{item.year}</span>
                  <h3>
                    {item.count} {getText(copy.postCount, language)}
                  </h3>
                  <p>
                    {getText(copy.latest, language)}:{" "}
                    {formatDate(item.latestDate, language)}
                  </p>
                  <Link to={`/writing/${item.year}`} className="archive-link">
                    {getText(copy.explore, language)} →
                  </Link>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
