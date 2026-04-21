import React, {useEffect, useState, useMemo, useContext} from "react";
import {useParams, Link} from "react-router-dom";
import {getArticleBySlug, getArticles} from "../services/contentAPI";
import DOMPurify from "dompurify";
import {marked} from "marked";
import "./ArticlePage.scss";
import LanguageContext from "../contexts/LanguageContext";
import {formatDate} from "../utils/i18n";

// Article detail page with bilingual toggle and markdown rendering.
// CMS future-proof: tries fields content_zh/content_en; falls back to excerpt.

const ArticlePage = () => {
  const {slug} = useParams();
  const {language} = useContext(LanguageContext);
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [siblings, setSiblings] = useState([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const item = await getArticleBySlug(slug);
        const all = await getArticles();
        if (mounted) {
          setArticle(item);
          setSiblings(all);
        }
      } catch (e) {
        if (mounted) setError(e.message || "Failed to load article");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [slug]);

  const currentIndex = useMemo(() => {
    if (!article || !siblings.length) return -1;
    return siblings.findIndex(
      a =>
        a.slug === slug || a.id === slug || (article.id && a.id === article.id)
    );
  }, [article, siblings, slug]);

  const prevArticle = currentIndex > 0 ? siblings[currentIndex - 1] : null;
  const nextArticle =
    currentIndex >= 0 && currentIndex < siblings.length - 1
      ? siblings[currentIndex + 1]
      : null;

  const {
    safeHtml,
    usedFallbackLanguage // "zh" | "en" | null
  } = useMemo(() => {
    if (!article) return {safeHtml: "", usedFallbackLanguage: null};

    const getRaw = lang =>
      (lang === "zh"
        ? article.content_zh || article.contentZh
        : article.content_en || article.contentEn) ||
      (lang === "zh"
        ? article.excerpt?.zh || article.excerpt_zh
        : article.excerpt?.en || article.excerpt_en) ||
      "";

    // Prefer current UI language; if missing, fall back to the other language
    // to avoid rendering an empty page.
    const primaryRaw = getRaw(language);
    const fallbackLang = language === "zh" ? "en" : "zh";
    const fallbackRaw = primaryRaw ? "" : getRaw(fallbackLang);

    const raw = primaryRaw || fallbackRaw || "";
    const usedFallbackLanguage = primaryRaw
      ? null
      : fallbackRaw
      ? fallbackLang
      : null;

    try {
      return {
        safeHtml: DOMPurify.sanitize(marked.parse(raw)),
        usedFallbackLanguage
      };
    } catch {
      return {safeHtml: DOMPurify.sanitize(raw), usedFallbackLanguage};
    }
  }, [article, language]);

  const copy = {
    loading: {zh: "加载中...", en: "Loading..."},
    notFound: {zh: "未找到文章。", en: "Article not found."},
    failed: {zh: "文章加载失败。", en: "Failed to load article."},
    readingTime: {zh: "分钟", en: "min"},
    prev: {zh: "上一篇", en: "Previous"},
    next: {zh: "下一篇", en: "Next"},
    fallbackNotice: {
      zh: "英文版整理中，当前展示中文内容。",
      en: "English version is in progress. Showing the Chinese version for now."
    },
    back: {zh: "返回写作", en: "Back to Writing"}
  };

  if (loading)
    return <div className="article-loading">{copy.loading[language]}</div>;
  if (error)
    return (
      <div className="article-error">
        {language === "zh" ? copy.failed.zh : error}
      </div>
    );
  if (!article)
    return <div className="article-empty">{copy.notFound[language]}</div>;

  const displayTitleZh =
    article.title_zh || article.title?.zh || article.titleZh;
  const displayTitleEn =
    article.title_en || article.title?.en || article.titleEn;
  const displayTitle =
    language === "zh"
      ? displayTitleZh || displayTitleEn
      : displayTitleEn || displayTitleZh;

  return (
    <div className="article-page">
      <div className="article-header">
        <h1 className="article-title">{displayTitle}</h1>
        <div className="article-meta">
          {article.publishedDate && (
            <span>
              <i className="far fa-calendar" />{" "}
              {formatDate(article.publishedDate, language)}
            </span>
          )}
          {article.readingTime && (
            <span>
              <i className="far fa-clock" /> {article.readingTime}{" "}
              {copy.readingTime[language]}
            </span>
          )}
          {article.category && (
            <span className="article-category">
              <i className="fas fa-tag" /> {article.category}
            </span>
          )}
        </div>
      </div>
      {article.coverImage && (
        <figure className="article-cover">
          <img src={article.coverImage} alt={displayTitle} loading="lazy" />
        </figure>
      )}
      {usedFallbackLanguage && (
        <div className="article-fallback" role="note">
          {copy.fallbackNotice[language]}
        </div>
      )}
      <article
        className="article-body"
        dangerouslySetInnerHTML={{__html: safeHtml}}
      />
      {article.tags && article.tags.length > 0 && (
        <div className="article-tags" aria-label="Article tags">
          {article.tags.map((t, i) => (
            <span key={i} className="tag">
              #{t}
            </span>
          ))}
        </div>
      )}
      <nav className="article-nav" aria-label="Article navigation">
        {prevArticle && (
          <Link
            to={`/articles/${prevArticle.slug || prevArticle.id}`}
            className="prev-article"
          >
            ←{" "}
            {(language === "zh"
              ? prevArticle.title?.zh ||
                prevArticle.title_zh ||
                prevArticle.titleZh
              : prevArticle.title?.en ||
                prevArticle.title_en ||
                prevArticle.titleEn) || prevArticle.id}
          </Link>
        )}
        {nextArticle && (
          <Link
            to={`/articles/${nextArticle.slug || nextArticle.id}`}
            className="next-article"
          >
            {(language === "zh"
              ? nextArticle.title?.zh ||
                nextArticle.title_zh ||
                nextArticle.titleZh
              : nextArticle.title?.en ||
                nextArticle.title_en ||
                nextArticle.titleEn) || nextArticle.id}{" "}
            →
          </Link>
        )}
      </nav>
      <div className="back-link">
        <Link to="/writing">
          <i className="fas fa-arrow-left" /> {copy.back[language]}
        </Link>
      </div>
    </div>
  );
};

export default ArticlePage;
