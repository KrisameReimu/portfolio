import React, {useContext, useMemo} from "react";
import {Link, useParams} from "react-router-dom";
import "./WritingYearPage.scss";
import {getArticles} from "../services/contentAPI";
import LanguageContext from "../contexts/LanguageContext";
import useAsyncCollection from "../hooks/useAsyncCollection";
import {filterEntriesByYear} from "../utils/archive";
import {formatDate, getText} from "../utils/i18n";
import ArchiveYearPage from "../components/archiveYearPage/ArchiveYearPage";

export default function WritingYearPage() {
  const {year} = useParams();
  const {language} = useContext(LanguageContext);
  const {items: articles, isLoading} = useAsyncCollection({
    load: () => getArticles(),
    reloadKey: year
  });

  const filtered = useMemo(() => {
    return filterEntriesByYear(articles, "publishedDate", year);
  }, [articles, year]);

  const copy = {
    title: {
      zh: `${year} 写作精选`,
      en: `${year} Writing Highlights`
    },
    subtitle: {
      zh: "这一年的思考、记录与技术观察。",
      en: "Essays, reflections, and technical notes from the year."
    },
    empty: {
      zh: "该年度文章正在整理中，敬请期待。",
      en: "This year's writing archive is being curated."
    },
    loading: {
      zh: "加载中...",
      en: "Loading..."
    },
    back: {
      zh: "返回写作主页",
      en: "Back to Writing"
    }
  };

  return (
    <ArchiveYearPage
      pageKey="writing"
      eyebrow="Writing Archive"
      title={getText(copy.title, language)}
      subtitle={getText(copy.subtitle, language)}
      backHref="/writing"
      backLabel={getText(copy.back, language)}
      loadingMessage={getText(copy.loading, language)}
      emptyMessage={getText(copy.empty, language)}
      isLoading={isLoading}
      hasItems={filtered.length > 0}
    >
      <div className="archive-year-page__content writing-year-grid">
        {filtered.map(article => (
          <div className="writing-year-card" key={article.id}>
            <h3>
              <Link to={`/articles/${article.slug || article.id}`}>
                {getText(article.title, language)}
              </Link>
            </h3>
            <p>{getText(article.excerpt, language)}</p>
            <span>{formatDate(article.publishedDate, language)}</span>
          </div>
        ))}
      </div>
    </ArchiveYearPage>
  );
}
