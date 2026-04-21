import React, {useEffect, useMemo, useContext, useState} from "react";
import {Link} from "react-router-dom";
import "./WritingShowcase.scss";
import {Fade} from "react-reveal";
import {getArticles} from "../../services/contentAPI";
import LanguageContext from "../../contexts/LanguageContext";
import {formatDate, getText} from "../../utils/i18n";
import {
  fallbackWritingCategory,
  writingCategoryMeta
} from "../../config/contentTaxonomy";

const writingShowcaseSection = {
  display: true
};

const WritingShowcase = () => {
  const {language} = useContext(LanguageContext);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [hoveredArticle, setHoveredArticle] = useState(null);
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const copy = {
    title: {
      zh: "文字创作",
      en: "Writing Showcase"
    },
    subtitle: {
      zh: "用文字记录思考，用故事传递温度",
      en: "Recording thoughts and stories in long-form writing"
    },
    description: {
      zh: "默认按时间展示全部文章，精选置顶，方便长期更新与归档。",
      en: "All articles are listed chronologically with featured pieces pinned for long-term updates."
    },
    featured: {
      zh: "精选文章",
      en: "Featured Picks"
    },
    allStories: {
      zh: "全部文章",
      en: "All Stories"
    },
    readArticle: {
      zh: "阅读文章",
      en: "Read Article"
    },
    continueReading: {
      zh: "继续阅读",
      en: "Continue Reading"
    },
    emptyState: {
      zh: "该分类暂时还没有文章，敬请期待。",
      en: "No articles yet for this category."
    },
    loading: {
      zh: "加载中...",
      en: "Loading..."
    },
    readTimeUnit: {
      zh: "分钟",
      en: "min"
    }
  };

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setIsLoading(true);
        const all = await getArticles();
        if (mounted) {
          setArticles(all || []);
        }
      } finally {
        if (mounted) setIsLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const featuredArticles = useMemo(
    () => articles.filter(article => article.featured).slice(0, 3),
    [articles]
  );

  const availableCategories = useMemo(() => {
    const categoryIds = Array.from(
      new Set(
        articles
          .map(article => article.category)
          .filter(category => typeof category === "string" && category.trim())
      )
    );
    return categoryIds.map(categoryId => ({
      id: categoryId,
      ...((writingCategoryMeta && writingCategoryMeta[categoryId]) ||
        fallbackWritingCategory)
    }));
  }, [articles]);

  const filteredArticles = useMemo(() => {
    if (selectedCategory === "all") return articles;
    return articles.filter(article => article.category === selectedCategory);
  }, [articles, selectedCategory]);

  const getCategoryMeta = categoryId =>
    (writingCategoryMeta && writingCategoryMeta[categoryId]) ||
    fallbackWritingCategory;

  if (!writingShowcaseSection.display) return null;

  return (
    <Fade bottom duration={1000} distance="20px">
      <div className="main writing-showcase" id="writing">
        <div className="writing-container">
          <div className="writing-header">
            <h1 className="writing-heading">{getText(copy.title, language)}</h1>
            <p className="subTitle writing-subtitle">
              {getText(copy.subtitle, language)}
            </p>
            <p className="writing-description">
              {getText(copy.description, language)}
            </p>
          </div>

          {!isLoading && featuredArticles.length > 0 && (
            <div className="featured-quick-section">
              <h2 className="featured-quick-title">
                {getText(copy.featured, language)}
              </h2>
              <div className="featured-quick-grid">
                {featuredArticles.map(article => (
                  <Link
                    key={article.id}
                    className="featured-quick-card"
                    to={`/articles/${article.id}`}
                  >
                    <p className="featured-quick-date">
                      {formatDate(article.publishedDate, language)}
                    </p>
                    <h3>{getText(article.title, language)}</h3>
                    <p>{getText(article.excerpt, language)}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="category-filter">
            <button
              className={`category-pill ${
                selectedCategory === "all" ? "active" : ""
              }`}
              onClick={() => setSelectedCategory("all")}
              type="button"
            >
              <i className="fas fa-th"></i> {getText(copy.allStories, language)}
            </button>
            {availableCategories.map(category => (
              <button
                key={category.id}
                className={`category-pill ${
                  selectedCategory === category.id ? "active" : ""
                }`}
                onClick={() => setSelectedCategory(category.id)}
                style={
                  selectedCategory === category.id
                    ? {
                        backgroundColor: category.color,
                        color: "white"
                      }
                    : {}
                }
                type="button"
              >
                <i className="fas fa-book"></i>{" "}
                {getText(category.label, language)}
              </button>
            ))}
          </div>

          <div className="articles-grid">
            {isLoading && (
              <div className="empty-state">
                <p>{getText(copy.loading, language)}</p>
              </div>
            )}
            {!isLoading && filteredArticles.length === 0 && (
              <div className="empty-state">
                <p>{getText(copy.emptyState, language)}</p>
              </div>
            )}
            {filteredArticles.map((article, index) => {
              const categoryMeta = getCategoryMeta(article.category);
              return (
                <Fade key={article.id || index} bottom duration={1000}>
                  <article
                    className={`article-card ${
                      hoveredArticle === index ? "hovered" : ""
                    }`}
                    onMouseEnter={() => setHoveredArticle(index)}
                    onMouseLeave={() => setHoveredArticle(null)}
                  >
                    <div className="article-image-container">
                      {article.coverImage ? (
                        <img
                          src={article.coverImage}
                          alt={getText(article.title, language)}
                          className="article-image"
                          loading="lazy"
                        />
                      ) : (
                        <div className="article-image article-image-placeholder">
                          <span>{getText(copy.readArticle, language)}</span>
                        </div>
                      )}
                    </div>

                    <div className="article-content">
                      <div className="article-meta">
                        <span
                          className="article-category"
                          style={{background: categoryMeta.color}}
                        >
                          {getText(categoryMeta.label, language)}
                        </span>
                        <span className="article-date">
                          <i className="far fa-calendar"></i>{" "}
                          {formatDate(article.publishedDate, language)}
                        </span>
                        <span className="article-read-time">
                          <i className="far fa-clock"></i> {article.readingTime}{" "}
                          {getText(copy.readTimeUnit, language)}
                        </span>
                      </div>

                      <h3 className="article-title">
                        {getText(article.title, language)}
                      </h3>

                      <p className="article-excerpt">
                        {getText(article.excerpt, language)}
                      </p>

                      <div className="article-tags">
                        {(article.tags || []).map(tag => (
                          <span
                            key={`${article.id}-${tag}`}
                            className="article-tag"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <Link
                        to={`/articles/${article.id}`}
                        className="article-link"
                      >
                        {getText(copy.continueReading, language)}{" "}
                        <i className="fas fa-arrow-right"></i>
                      </Link>
                    </div>
                  </article>
                </Fade>
              );
            })}
          </div>
        </div>
      </div>
    </Fade>
  );
};

export default WritingShowcase;
export {writingShowcaseSection};
