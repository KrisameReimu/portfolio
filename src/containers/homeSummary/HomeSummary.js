import React, {useContext, useEffect, useMemo, useState} from "react";
import {Link} from "react-router-dom";
import "./HomeSummary.scss";
import {getArticles} from "../../services/contentAPI";
import LanguageContext from "../../contexts/LanguageContext";
import {formatDate, getText} from "../../utils/i18n";

const HomeSummary = () => {
  const {language} = useContext(LanguageContext);
  const [articles, setArticles] = useState([]);

  const latestArticles = useMemo(() => {
    return [...articles]
      .filter(article => article.publishedDate)
      .sort(
        (a, b) =>
          new Date(b.publishedDate).getTime() -
          new Date(a.publishedDate).getTime()
      )
      .slice(0, 3);
  }, [articles]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const remoteArticles = await getArticles();
      if (mounted) {
        setArticles(remoteArticles || []);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const latestActivityDate = useMemo(() => {
    const dates = latestArticles
      .map(article => article.publishedDate)
      .map(date => new Date(date))
      .filter(date => !Number.isNaN(date.getTime()));

    if (!dates.length) return "";
    dates.sort((a, b) => b.getTime() - a.getTime());
    return formatDate(dates[0].toISOString(), language);
  }, [language, latestArticles]);

  const featuredWorks = [
    {
      id: "polyu-research",
      title: {
        zh: "PolyU 研究项目助理",
        en: "PolyU Research Project Assistant"
      },
      description: {
        zh: "聚焦 AI 与多媒体研究，推进内容生成与交互体验，并将结果转化为可展示作品。",
        en: "Exploring AI + multimedia research, advancing content generation and interactive experiences, and turning results into showcase-ready work."
      },
      meta: {zh: "当前工作 / 研究", en: "Current / Research"},
      link: "/about"
    },
    {
      id: "video-awards",
      title: {
        zh: "获奖影像作品",
        en: "Award-Winning Video Work"
      },
      description: {
        zh: "纪录片、短片与宣传片，聚焦人文叙事与视觉表达。",
        en: "Documentaries, short films, and promos focused on human stories and visual language."
      },
      meta: {zh: "多项奖项 / 视频创作", en: "Awards / Video"},
      link: "/videos"
    },
    {
      id: "coding-impact",
      title: {
        zh: "AI 应用与全栈开发",
        en: "AI Applications & Full-stack Delivery"
      },
      description: {
        zh: "从原型到部署，持续构建可演示、可迭代的 AI 教育应用。",
        en: "From prototype to deployment, building AI applications that are demo-ready and production-minded."
      },
      meta: {zh: "工程实践 / 产品化", en: "Engineering / Product"},
      link: "/lab"
    }
  ];

  const copy = {
    intro: {
      zh: "我用技术讲故事，也用影像记录表达。这里是我持续更新的项目与创作摘要。",
      en: "I tell stories with technology and visual work. This is a living summary of my projects and creations."
    },
    latestWriting: {
      zh: "最新文章",
      en: "Latest Writing"
    },
    featuredWorks: {
      zh: "精选作品",
      en: "Featured Work"
    },
    exploreWriting: {
      zh: "进入写作页面",
      en: "Explore Writing"
    },
    exploreWorks: {
      zh: "查看全部项目",
      en: "View All Projects"
    },
    cadence: {
      zh: "持续更新 / 最近更新",
      en: "Updated regularly / Last updated"
    },
    emptyWriting: {
      zh: "写作内容正在整理中，稍后会更新。",
      en: "Writing content is being curated and will be updated soon."
    }
  };

  return (
    <section className="home-summary">
      <div className="summary-intro">
        <p className="summary-text">{getText(copy.intro, language)}</p>
        {latestActivityDate && (
          <p className="summary-cadence">
            {getText(copy.cadence, language)} {latestActivityDate}
          </p>
        )}
      </div>

      <div className="summary-section">
        <div className="summary-header">
          <h2>{getText(copy.latestWriting, language)}</h2>
          <Link className="summary-link" to="/writing">
            {getText(copy.exploreWriting, language)}
          </Link>
        </div>
        <div className="summary-grid">
          {latestArticles.length > 0 ? (
            latestArticles.map(article => (
              <Link
                key={article.id}
                className="summary-card"
                to={`/articles/${article.id}`}
              >
                <div className="summary-card-meta">
                  <span>{formatDate(article.publishedDate, language)}</span>
                  <span>{article.readingTime} min</span>
                </div>
                <h3>{getText(article.title, language)}</h3>
                <p>{getText(article.excerpt, language)}</p>
              </Link>
            ))
          ) : (
            <article className="summary-card summary-empty-card">
              <h3>{getText(copy.latestWriting, language)}</h3>
              <p>{getText(copy.emptyWriting, language)}</p>
            </article>
          )}
        </div>
      </div>

      <div className="summary-section">
        <div className="summary-header">
          <h2>{getText(copy.featuredWorks, language)}</h2>
          <Link className="summary-link" to="/lab">
            {getText(copy.exploreWorks, language)}
          </Link>
        </div>
        <div className="featured-grid">
          {featuredWorks.map(work => (
            <Link key={work.id} className="featured-card" to={work.link}>
              <p className="featured-meta">{getText(work.meta, language)}</p>
              <h3>{getText(work.title, language)}</h3>
              <p>{getText(work.description, language)}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeSummary;
