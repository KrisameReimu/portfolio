import React, {useContext, useMemo, useState} from "react";
import WritingShowcase from "../sections/writingShowcase/WritingShowcase";
import {Link, useLocation, useNavigate} from "react-router-dom";
import PageHero from "../components/pageHero/PageHero";
import PageSurface from "../components/pageSurface/PageSurface";
import LanguageContext from "../contexts/LanguageContext";
import useAsyncCollection from "../hooks/useAsyncCollection";
import {formatDate, getText} from "../utils/i18n";
import {getArticles} from "../services/contentAPI";
import {summarizeEntriesByYear} from "../utils/archive";
import {openHeroTarget} from "../utils/heroNavigation";
import {writingPageCopy} from "../config/pages/writingPage";
import "./WritingPage.scss";

export default function WritingPage() {
  const {language} = useContext(LanguageContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("all");
  const {items: articles, isLoading: isLoadingArticles} = useAsyncCollection({
    load: () => getArticles()
  });

  const yearCards = useMemo(() => {
    return summarizeEntriesByYear(articles, {
      dateField: "publishedDate"
    }).map(group => ({
      year: group.year,
      count: group.count,
      latestDate: group.latestDate
    }));
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
    <PageSurface pageKey="writing" className="page-container">
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
        <WritingShowcase articles={articles} isLoading={isLoadingArticles} />
      ) : (
        <div className="archive-grid">
          {isLoadingArticles && (
            <div className="archive-card">
              <div className="archive-content">
                <p>{getText(writingPageCopy.loading, language)}</p>
              </div>
            </div>
          )}
          {!isLoadingArticles &&
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
    </PageSurface>
  );
}
