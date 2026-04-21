import React, {useContext, useEffect, useMemo, useState} from "react";
import {Link, useParams} from "react-router-dom";
import LanguageContext from "../contexts/LanguageContext";
import {formatDate, getText} from "../utils/i18n";
import {getExperiments} from "../services/siteOSAPI";
import "./SiteOSPages.scss";

const PILLAR_LABELS = {
  "ai-engineering": {zh: "AI 工程", en: "AI Engineering"},
  "investment-systems": {zh: "投资系统", en: "Investment Systems"},
  "creative-tech": {zh: "创作技术", en: "Creative Tech"}
};

export default function LabPillarPage() {
  const {pillar} = useParams();
  const {language} = useContext(LanguageContext);
  const [experiments, setExperiments] = useState([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const data = await getExperiments({pillar, limit: 100});
      if (mounted) setExperiments(data || []);
    })();
    return () => {
      mounted = false;
    };
  }, [pillar]);

  const sorted = useMemo(
    () =>
      [...experiments].sort(
        (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
      ),
    [experiments]
  );

  const copy = {
    back: {zh: "返回 Projects", en: "Back to Projects"},
    unknown: {zh: "实验轨道", en: "Experiment Track"},
    labels: {
      hypothesis: {zh: "假设", en: "Hypothesis"},
      method: {zh: "方法", en: "Method"},
      result: {zh: "结果", en: "Result"},
      failure: {zh: "失败与问题", en: "Failures"},
      decision: {zh: "决策", en: "Decision"}
    }
  };

  const title = PILLAR_LABELS[pillar] || copy.unknown;

  return (
    <div className="page-container siteos-page">
      <div className="page-hero siteos-hero">
        <h1 className="page-title">{getText(title, language)}</h1>
        <p className="page-subtitle">
          <Link to="/game-dev#experiment-tracks">
            ← {getText(copy.back, language)}
          </Link>
        </p>
      </div>

      <div className="siteos-stack">
        {sorted.map(item => (
          <article className="siteos-card" key={item.id}>
            <h3>{getText(item.title, language)}</h3>
            <span className="siteos-badge">{item.status}</span>
            <p className="siteos-date">
              {formatDate(item.publishedAt, language)}
            </p>
            <p>
              <strong>{getText(copy.labels.hypothesis, language)}:</strong>{" "}
              {getText(item.hypothesis, language)}
            </p>
            <p>
              <strong>{getText(copy.labels.method, language)}:</strong>{" "}
              {getText(item.method, language)}
            </p>
            <p>
              <strong>{getText(copy.labels.result, language)}:</strong>{" "}
              {getText(item.result, language)}
            </p>
            <p>
              <strong>{getText(copy.labels.failure, language)}:</strong>{" "}
              {getText(item.failureNotes, language)}
            </p>
            <p>
              <strong>{getText(copy.labels.decision, language)}:</strong>{" "}
              {getText(item.decision, language)}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
