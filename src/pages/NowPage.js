import React, {useContext, useEffect, useState} from "react";
import PageSurface from "../components/pageSurface/PageSurface";
import LanguageContext from "../contexts/LanguageContext";
import {nowPageCopy, nowPageFallbackState} from "../config/pages/nowPage";
import {getText} from "../utils/i18n";
import "./NowPage.scss";

export default function NowPage() {
  const {language} = useContext(LanguageContext);
  const [nowState, setNowState] = useState(nowPageFallbackState);

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
            <p className="now-landing__kicker">
              {getText(nowPageCopy.kicker, language)}
            </p>
            <h1>{getText(nowPageCopy.title, language)}</h1>
            <p className="now-landing__summary">
              {getText(nowState.focus, language)}
            </p>
          </div>
          <div className="now-landing__week">
            <span>{getText(nowPageCopy.weekOf, language)}</span>
            <strong>
              {nowState.weekOf || getText(nowPageCopy.currentWeek, language)}
            </strong>
          </div>
        </div>

        <div className="now-board">
          <article className="now-board__item">
            <span>{getText(nowPageCopy.labels.doing, language)}</span>
            <p>{getText(nowState.doing, language)}</p>
          </article>
          <article className="now-board__item">
            <span>{getText(nowPageCopy.labels.notDoing, language)}</span>
            <p>{getText(nowState.notDoing, language)}</p>
          </article>
          <article className="now-board__item">
            <span>{getText(nowPageCopy.labels.constraint, language)}</span>
            <p>{getText(nowState.blockers, language)}</p>
          </article>
          <article className="now-board__item">
            <span>{getText(nowPageCopy.labels.next, language)}</span>
            <p>{getText(nowState.nextActions, language)}</p>
          </article>
        </div>
      </section>
    </PageSurface>
  );
}
