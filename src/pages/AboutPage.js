import React, {useContext} from "react";
import LanguageContext from "../contexts/LanguageContext";
import LandingHero from "../components/landingHero/LandingHero";
import {getText} from "../utils/i18n";
import {greeting} from "../portfolio";
import "./AboutPage.scss";

export default function AboutPage() {
  const {language} = useContext(LanguageContext);
  const copy = {
    title: {
      zh: "关于我",
      en: "About Me"
    },
    subtitle: {
      zh: "不是一份参数列表，而是一个持续成长的人。",
      en: "Not a list of specs, but a person still in progress."
    },
    intro: {
      zh: "我在香港做研究与创作，主要方向是 AI 系统、多媒体叙事和教学支持。比起堆很多标签，我更在意把少数几件事做到能被看见、能被验证、能持续更新。",
      en: "I work on research and creative projects in Hong Kong, centered on AI systems, multimedia storytelling, and teaching support. Instead of collecting labels, I care about a few things done well enough to be seen, verified, and maintained."
    },
    signalsTitle: {
      zh: "高信号经历",
      en: "Selected Signals"
    },
    signals: [
      {
        title: {
          zh: "AI 产品与发表",
          en: "AI Product Work"
        },
        body: {
          zh: "GenAI 反馈与自动评测平台、WAIE 2025 论文发表，以及 React + Flask + Azure API 的完整交付。",
          en: "GenAI feedback and auto-grading platform, a WAIE 2025 publication, and full-stack delivery with React, Flask, and Azure API."
        }
      },
      {
        title: {
          zh: "荣誉与认可",
          en: "Awards and Recognition"
        },
        body: {
          zh: "PolyU 视频竞赛奖项、Sasakawa Cup、Oxford AI/ML programme，以及多项学术与创作层面的证明。",
          en: "PolyU video awards, Sasakawa Cup, the Oxford AI/ML programme, and multiple academic and creative recognitions."
        }
      },
      {
        title: {
          zh: "教学与制作",
          en: "Teaching and Production"
        },
        body: {
          zh: "在 PolyU 做研究/项目助理和 TA，也做多媒体制作、实验课协助，以及电商前端交付。",
          en: "At PolyU I work as a research/project assistant and TA, while also handling multimedia production, lab support, and e-commerce front-end delivery."
        }
      }
    ],
    nowTitle: {
      zh: "当前关注",
      en: "Current Focus"
    },
    nowItems: [
      {
        zh: "把 AI 反馈系统做得更稳、更轻、更可维护",
        en: "Making AI feedback systems lighter, more stable, and easier to maintain"
      },
      {
        zh: "让作品集只保留最有证据力的内容",
        en: "Keeping the portfolio limited to its strongest evidence"
      },
      {
        zh: "把研究、创作和职业履历收束成一个更清晰的个人 IP",
        en: "Unifying research, creative output, and career evidence into a clearer personal IP"
      }
    ],
    resumeHint: {
      zh: "如果你需要更正式的版本，可以直接看我的 CV。",
      en: "If you need the formal version, you can go straight to my CV."
    },
    resumeButton: {
      zh: "查看 CV",
      en: "View CV"
    }
  };

  return (
    <div className="page-container about-page">
      <LandingHero
        variant="narrative"
        title={copy.title}
        subtitle={copy.subtitle}
        description={copy.intro}
        accentColor="#1976D2"
        className="about-landing-hero"
      />

      <section className="about-block">
        <h2>{getText(copy.signalsTitle, language)}</h2>
        <div className="about-signal-list">
          {copy.signals.map(item => (
            <article className="about-signal-item" key={item.title.en}>
              <h3>{getText(item.title, language)}</h3>
              <p>{getText(item.body, language)}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-current">
        <h2>{getText(copy.nowTitle, language)}</h2>
        <ul className="about-list">
          {copy.nowItems.map(item => (
            <li key={item.en}>{getText(item, language)}</li>
          ))}
        </ul>
      </section>

      {greeting.resumeLink && (
        <div className="about-resume-card">
          <p>{getText(copy.resumeHint, language)}</p>
          <a
            href={greeting.resumeLink}
            target="_blank"
            rel="noreferrer"
            className="about-resume-button"
          >
            {getText(copy.resumeButton, language)}
          </a>
        </div>
      )}
    </div>
  );
}
