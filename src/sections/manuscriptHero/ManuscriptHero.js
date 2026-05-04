import React, {useContext, useEffect, useMemo, useRef, useState} from "react";
import {Link} from "react-router-dom";
import {layoutWithLines, prepareWithSegments} from "@chenglou/pretext";
import LanguageContext from "../../contexts/LanguageContext";
import {homeBrandAssets} from "../../config/pages/homeVisuals";
import {getPageHeroVisual} from "../../config/pages/pageHeroVisuals";
import {greeting} from "../../portfolio";
import {getText} from "../../utils/i18n";
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
  const [activeProof, setActiveProof] = useState("01");
  const homeHeroVisual = getPageHeroVisual("home");

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
      },
      expanded: {
        zh: "我最强的项目线索是把 student workflow、grading、feedback 与 analytics 真正做成一条闭环。",
        en: "My strongest line of work is turning student workflow, grading, feedback, and analytics into one connected loop."
      },
      cta: {zh: "Open Projects", en: "Open Projects"},
      href: "/projects"
    },
    {
      key: "02",
      label: {zh: "研究与证据", en: "Research & Evidence"},
      detail: {
        zh: "WAIE 2025 发表 · GenAI Feedback System",
        en: "WAIE 2025 publication · GenAI Feedback System"
      },
      expanded: {
        zh: "我倾向把研究支持、文档整理与对外表达一起做，让结果更容易被老师、评审和合作方真正读懂。",
        en: "I tend to build research support, documentation, and outward-facing communication together so the work becomes legible to teachers, reviewers, and collaborators."
      },
      cta: {zh: "Read the archive", en: "Read the archive"},
      href: "/writing"
    },
    {
      key: "03",
      label: {zh: "视觉叙事", en: "Visual Storytelling"},
      detail: {
        zh: "Video · Photography · Multimedia",
        en: "Video · Photography · Multimedia"
      },
      expanded: {
        zh: "视频、海报与摄影不是附属品，而是我把复杂内容重新编排成可传播 narrative 的方式。",
        en: "Video, poster, and photography work are not side material; they are how I recut complex work into narrative that travels."
      },
      cta: {zh: "Enter the gallery", en: "Enter the gallery"},
      href: "/photos"
    }
  ];
  const selectedProof =
    proofItems.find(item => item.key === activeProof) || proofItems[0];

  return (
    <section className="studio-hero">
      <div className="studio-hero__stage">
        <div className="studio-hero__surface">
          <figure className="studio-hero__poster">
            <img
              src={homeHeroVisual.src}
              alt={getText(homeHeroVisual.alt, language)}
              width="1672"
              height="941"
              decoding="async"
            />
            <figcaption>
              <span>{getText(homeHeroVisual.label, language)}</span>
              {getText(homeHeroVisual.caption, language)}
            </figcaption>
          </figure>
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
              <Link to={selectedProof.href}>
                {getText(selectedProof.cta, language)}
              </Link>
              <a href={greeting.resumeLink} target="_blank" rel="noreferrer">
                {language === "zh" ? "下载 CV" : "Download CV"}
              </a>
              <Link to="/now">
                {language === "zh" ? "查看最近进展" : "See now"}
              </Link>
            </div>
          </section>

          <aside className="studio-hero__aside" aria-label="Selected proof">
            <div
              className="studio-hero__character-strip"
              aria-label={
                language === "zh"
                  ? "Echo 个人 IP 视觉资产"
                  : "Echo personal IP visual assets"
              }
            >
              {[
                homeBrandAssets.studioFigurine,
                homeBrandAssets.focusAvatar
              ].map(asset => (
                <figure key={asset.src} className="studio-hero__character-card">
                  <img
                    src={asset.src}
                    alt={getText(asset.alt, language)}
                    width="1254"
                    height="1254"
                    loading="lazy"
                    decoding="async"
                  />
                  <figcaption>
                    <span>{getText(asset.label, language)}</span>
                    {getText(asset.caption, language)}
                  </figcaption>
                </figure>
              ))}
            </div>
            <div className="studio-hero__proof">
              {proofItems.map(item => (
                <button
                  key={item.key}
                  type="button"
                  className={`studio-hero__proof-item ${
                    item.key === activeProof ? "is-active" : ""
                  }`}
                  onClick={() => setActiveProof(item.key)}
                >
                  <span>{item.key}</span>
                  <div>
                    <p>{getText(item.label, language)}</p>
                    <strong>{getText(item.detail, language)}</strong>
                  </div>
                </button>
              ))}
            </div>
            <div className="studio-hero__focus-panel">
              <p>{getText(selectedProof.label, language)}</p>
              <h2>{getText(selectedProof.detail, language)}</h2>
              <div className="studio-hero__focus-copy">
                {getText(selectedProof.expanded, language)}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
