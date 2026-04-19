import React, {useContext, useEffect, useMemo, useState} from "react";
import LanguageContext from "../contexts/LanguageContext";
import {getArticles} from "../services/contentAPI";
import {getExperiments, getPublicDashboard} from "../services/siteOSAPI";
import {formatDate, getText} from "../utils/i18n";
import "./SiteOSPages.scss";

export default function DashboardPage() {
  const {language} = useContext(LanguageContext);
  const [dashboard, setDashboard] = useState(null);
  const [articles, setArticles] = useState([]);
  const [experiments, setExperiments] = useState([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const [dbData, articleData, expData] = await Promise.all([
        getPublicDashboard(),
        getArticles(),
        getExperiments({limit: 200})
      ]);
      if (!mounted) return;
      setDashboard(dbData);
      setArticles(articleData || []);
      setExperiments(expData || []);
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const metricCards = useMemo(() => {
    const totals = dashboard?.totals || {};
    return [
      {
        key: "articles",
        label: {zh: "文章", en: "Articles"},
        value: articles.length
      },
      {
        key: "experiments",
        label: {zh: "实验", en: "Experiments"},
        value: experiments.length
      },
      {
        key: "comments",
        label: {zh: "留言", en: "Comments"},
        value: totals.comments || 0
      },
      {
        key: "favorites",
        label: {zh: "收藏", en: "Favorites"},
        value: totals.favorites || 0
      },
      {
        key: "subscribers",
        label: {zh: "订阅", en: "Subscribers"},
        value: totals.subscribers || 0
      },
      {
        key: "ask",
        label: {zh: "Ask 查询", en: "Ask Queries"},
        value: totals.askQueries || 0
      }
    ];
  }, [dashboard, articles.length, experiments.length]);

  const copy = {
    title: {zh: "Dashboard", en: "Dashboard"},
    subtitle: {
      zh: "公开内容与互动系统的关键指标，方便快速查看站点状态。",
      en: "Public metrics for content and engagement systems at a glance."
    },
    updatedAt: {zh: "更新时间", en: "Updated"}
  };

  return (
    <div className="page-container siteos-page">
      <div className="page-hero siteos-hero">
        <h1 className="page-title">{getText(copy.title, language)}</h1>
        <p className="page-subtitle">{getText(copy.subtitle, language)}</p>
      </div>

      <div className="siteos-grid">
        {metricCards.map(metric => (
          <article className="siteos-card" key={metric.key}>
            <h3>{getText(metric.label, language)}</h3>
            <p className="siteos-metric-value">{metric.value}</p>
          </article>
        ))}
      </div>

      <div className="siteos-stack">
        <article className="siteos-card">
          <p>
            {getText(copy.updatedAt, language)}:{" "}
            {formatDate(dashboard?.updatedAt, language)}
          </p>
        </article>
      </div>
    </div>
  );
}
