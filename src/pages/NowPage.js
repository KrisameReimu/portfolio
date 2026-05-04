import React, {useContext, useEffect, useState} from "react";
import PageSurface from "../components/pageSurface/PageSurface";
import LanguageContext from "../contexts/LanguageContext";
import {getText} from "../utils/i18n";
import "./NowPage.scss";

const EMPTY_NOW_STATE = {
  focus: {
    zh: "把个人站推进成长期可维护的个人 IP 系统",
    en: "Push the website into a long-term maintainable personal IP system"
  },
  doing: {
    zh: "整理内容入口、重做旗舰页面、慢慢把真实项目与图像归档公开出来",
    en: "Tighten content entry points, rebuild flagship pages, and gradually publish real projects and image archives"
  },
  notDoing: {
    zh: "不追逐模板风格、不为了显得忙而填满页面",
    en: "No template-chasing and no filling the page just to look busy"
  },
  blockers: {
    zh: "内容整理和系统升级同时进行，所以节奏必须更克制",
    en: "Content curation and system upgrades are happening in parallel, so the pace has to stay disciplined"
  },
  nextActions: {
    zh: "继续补真实图集、压实项目 dossier、再推进第二阶段底座迁移",
    en: "Publish real photo sets, tighten the project dossier, then move into the second-stage platform migration"
  }
};

export default function NowPage() {
  const {language} = useContext(LanguageContext);
  const [nowState, setNowState] = useState(EMPTY_NOW_STATE);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const response = await fetch("/content/siteos/now.latest.json");
        if (!response.ok) return;
        const data = await response.json();
        if (mounted) {
          setNowState(data);
        }
      } catch {
        // Keep graceful fallback copy.
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <PageSurface pageKey="now" className="page-container now-page">
      <section className="now-landing">
        <div className="now-landing__hero">
          <div className="now-landing__intro">
            <p className="now-landing__kicker">Now</p>
            <h1>
              {language === "zh"
                ? "一个更轻、更活的页面，用来说明我现在正在把什么真正往前推。"
                : "A lighter, live page for what I am actually pushing forward right now."}
            </h1>
            <p className="now-landing__summary">
              {getText(nowState.focus, language)}
            </p>
          </div>
          <div className="now-landing__week">
            <span>{language === "zh" ? "Week of" : "Week of"}</span>
            <strong>{nowState.weekOf || "Current"}</strong>
          </div>
        </div>

        <div className="now-board">
          <article className="now-board__item">
            <span>{language === "zh" ? "Doing" : "Doing"}</span>
            <p>{getText(nowState.doing, language)}</p>
          </article>
          <article className="now-board__item">
            <span>{language === "zh" ? "Not doing" : "Not doing"}</span>
            <p>{getText(nowState.notDoing, language)}</p>
          </article>
          <article className="now-board__item">
            <span>{language === "zh" ? "Constraint" : "Constraint"}</span>
            <p>{getText(nowState.blockers, language)}</p>
          </article>
          <article className="now-board__item">
            <span>{language === "zh" ? "Next" : "Next"}</span>
            <p>{getText(nowState.nextActions, language)}</p>
          </article>
        </div>
      </section>
    </PageSurface>
  );
}
