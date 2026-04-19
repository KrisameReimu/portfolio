import React, {useContext, useEffect, useMemo, useRef, useState} from "react";
import {Link} from "react-router-dom";
import {layoutWithLines, prepareWithSegments} from "@chenglou/pretext";
import LanguageContext from "../../contexts/LanguageContext";
import {greeting} from "../../portfolio";
import {getText} from "../../utils/i18n";
import profileImage from "../../assets/images/profile.jpg";
import "./ManuscriptHero.scss";

function usePretextLines(text) {
  const bodyRef = useRef(null);
  const probeRef = useRef(null);
  const [layout, setLayout] = useState(null);

  useEffect(() => {
    const bodyNode = bodyRef.current;
    const probeNode = probeRef.current;

    if (!bodyNode || !probeNode || typeof window === "undefined") {
      return undefined;
    }

    let frameId = 0;
    let observer = null;

    const measure = () => {
      const width = Math.floor(bodyNode.getBoundingClientRect().width);
      const computed = window.getComputedStyle(probeNode);
      const lineHeight = Number.parseFloat(computed.lineHeight);

      if (!width || !Number.isFinite(lineHeight)) {
        return;
      }

      const font = `${computed.fontStyle} ${computed.fontWeight} ${computed.fontSize} ${computed.fontFamily}`;
      const prepared = prepareWithSegments(text, font);
      setLayout(layoutWithLines(prepared, width, lineHeight));
    };

    const schedule = () => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(measure);
    };

    schedule();

    if (typeof ResizeObserver !== "undefined") {
      observer = new ResizeObserver(schedule);
      observer.observe(bodyNode);
    } else {
      window.addEventListener("resize", schedule);
    }

    return () => {
      cancelAnimationFrame(frameId);
      if (observer) {
        observer.disconnect();
      } else {
        window.removeEventListener("resize", schedule);
      }
    };
  }, [text]);

  return {bodyRef, probeRef, layout};
}

export default function CanvasHero() {
  const {language} = useContext(LanguageContext);

  const narrative = useMemo(
    () => ({
      zh: "我把系统开发、研究协作和视觉叙事放进同一条创作链路：从教育 AI 的功能实现，到可展示、可传播、可复用的内容表达。",
      en: "I place system building, research collaboration, and visual storytelling in one pipeline: from educational AI implementation to content that is visible, communicable, and reusable."
    }),
    []
  );
  const statement = getText(narrative, language);
  const {bodyRef, probeRef, layout} = usePretextLines(statement);

  const proofItems = [
    {
      key: "01",
      label: {zh: "系统", en: "Systems"},
      detail: {
        zh: "GenAI Feedback · Auto-grading",
        en: "GenAI Feedback · Auto-grading"
      }
    },
    {
      key: "02",
      label: {zh: "研究与证据", en: "Research & Evidence"},
      detail: {
        zh: "WAIE 2025 发表 · GenAI Feedback System",
        en: "WAIE 2025 publication · GenAI Feedback System"
      }
    },
    {
      key: "03",
      label: {zh: "视觉叙事", en: "Visual Storytelling"},
      detail: {
        zh: "Video · Photography · Multimedia",
        en: "Video · Photography · Multimedia"
      }
    }
  ];

  return (
    <section className="studio-hero">
      <div className="studio-hero__stage">
        <div className="studio-hero__surface">
          <section className="studio-hero__lead">
            <h1>{getText(greeting.title, language)}</h1>
            <p className="studio-hero__tagline">
              AI Systems · Research Support · Multimedia Storytelling
            </p>
            <div
              ref={bodyRef}
              className="studio-hero__narrative"
              aria-label={statement}
            >
              <span ref={probeRef} className="studio-hero__narrative-probe">
                {statement}
              </span>
              {layout ? (
                <div className="studio-hero__narrative-lines">
                  {layout.lines.map((line, index) => (
                    <p
                      key={`${index}-${line.text}`}
                      className="studio-hero__narrative-line"
                    >
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      {line.text}
                    </p>
                  ))}
                </div>
              ) : (
                <p className="studio-hero__narrative-fallback">{statement}</p>
              )}
            </div>
            <div className="studio-hero__actions">
              <Link to="/awards">
                {language === "zh" ? "查看荣誉" : "View awards"}
              </Link>
              <a href={greeting.resumeLink} target="_blank" rel="noreferrer">
                {language === "zh" ? "下载 CV" : "Download CV"}
              </a>
              <Link to="/about">{language === "zh" ? "关于我" : "About"}</Link>
            </div>
          </section>

          <aside className="studio-hero__aside" aria-label="Selected proof">
            <figure className="studio-hero__portrait">
              <img src={profileImage} alt="Echo Chen portrait" />
            </figure>
            <div className="studio-hero__proof">
              {proofItems.map(item => (
                <article key={item.key} className="studio-hero__proof-item">
                  <span>{item.key}</span>
                  <div>
                    <p>{getText(item.label, language)}</p>
                    <strong>{getText(item.detail, language)}</strong>
                  </div>
                </article>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
