import React, {useContext, useEffect, useMemo, useState} from "react";
import WritingShowcase from "../sections/writingShowcase/WritingShowcase";
import {Link, useLocation, useNavigate} from "react-router-dom";
import PageHero from "../components/pageHero/PageHero";
import LanguageContext from "../contexts/LanguageContext";
import {formatDate, getText} from "../utils/i18n";
import {getArticles} from "../services/contentAPI";
import {openHeroTarget} from "../utils/heroNavigation";
import {writingPageCopy} from "../config/pages/writingPage";
import "./WritingPage.scss";

export default function WritingPage() {
  const {language} = useContext(LanguageContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("all");
  const [articles, setArticles] = useState([]);
  const [isLoadingYears, setIsLoadingYears] = useState(true);

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

  const heroCards = useMemo(() => {
    const featured = articles.filter(article => article.featured).slice(0, 3);
    if (featured.length > 0) {
      return featured.map(article => ({
        year: (article.publishedDate || "").slice(0, 4),
        title: article.title,
        description: article.excerpt,
        cta: writingPageCopy.heroCta.article,
        href: `/articles/${article.slug || article.id}`
      }));
    }

    return yearCards.slice(0, 3).map(item => ({
      year: item.year,
      title: {
        zh: `${item.year} ${writingPageCopy.archiveTitle.zh}`,
        en: `${item.year} ${writingPageCopy.archiveTitle.en}`
      },
      description: {
        zh: `${item.count} 篇文章，最近更新 ${formatDate(
          item.latestDate,
          "zh"
        )}`,
        en: `${item.count} articles, last updated ${formatDate(
          item.latestDate,
          "en"
        )}`
      },
      cta: writingPageCopy.heroCta.year,
      href: `/writing/${item.year}`
    }));
  }, [articles, yearCards]);

  return (
    <div className="page-container">
      <PageHero
        pageKey="writing"
        title={writingPageCopy.title}
        subtitle={writingPageCopy.subtitle}
        description={writingPageCopy.lead}
        mediaItems={heroCards}
        onMediaItemClick={item =>
          openHeroTarget({
            target: item.href,
            navigate,
            currentPathname: location.pathname
          })
        }
      />
      <div className="archive-tabs">
        <button
          className={activeTab === "all" ? "active" : ""}
          onClick={() => setActiveTab("all")}
          type="button"
        >
          {getText(writingPageCopy.tabs.all, language)}
        </button>
        <button
          className={activeTab === "years" ? "active" : ""}
          onClick={() => setActiveTab("years")}
          type="button"
        >
          {getText(writingPageCopy.tabs.years, language)}
        </button>
      </div>

      {activeTab === "all" ? (
        <WritingShowcase />
      ) : (
        <div className="archive-grid">
          {isLoadingYears && (
            <div className="archive-card">
              <div className="archive-content">
                <p>{getText(writingPageCopy.loading, language)}</p>
              </div>
            </div>
          )}
          {!isLoadingYears &&
            yearCards.map(item => (
              <div className="archive-card" key={item.year}>
                <div className="archive-content">
                  <span className="archive-label">{item.year}</span>
                  <h3>
                    {item.count} {getText(writingPageCopy.postCount, language)}
                  </h3>
                  <p>
                    {getText(writingPageCopy.latest, language)}:{" "}
                    {formatDate(item.latestDate, language)}
                  </p>
                  <Link to={`/writing/${item.year}`} className="archive-link">
                    {getText(writingPageCopy.explore, language)} →
                  </Link>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
