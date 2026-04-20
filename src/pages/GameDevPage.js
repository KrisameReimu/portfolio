import React, {useContext} from "react";
import GameDevShowcase from "../containers/gameDevShowcase/GameDevShowcase";
import Projects from "../containers/projects/Projects";
import DynamicLandingHero from "../components/dynamicLandingHero/DynamicLandingHero";
import LanguageContext from "../contexts/LanguageContext";
import {getText} from "../utils/i18n";
import "./GameDevPage.scss";

export default function GameDevPage() {
  const {language} = useContext(LanguageContext);
  const copy = {
    title: {zh: "项目作品集", en: "Projects"},
    subtitle: {
      zh: "游戏开发、交互体验与创意编码",
      en: "Game development, interactive experiences, and creative coding"
    },
    gameDevLabel: {
      zh: "游戏开发",
      en: "Game Development"
    },
    aiProjectsLabel: {
      zh: "AI & 创意编码",
      en: "AI & Creative Coding"
    }
  };
  return (
    <div className="page-container">
      <DynamicLandingHero
        title={copy.title}
        subtitle={copy.subtitle}
        description={{
          zh: "我在三个方向进行创意实践：游戏设计（玩家体验、机制设计），AI系统（生成式AI、交互），以及创意编码（视觉化、实验性UI）。",
          en: "I work across three creative directions: game design (player experience, mechanics), AI systems (generative AI, interaction), and creative coding (visualization, experimental UI)."
        }}
        visualType="custom"
        visualContent={
          <div
            style={{
              fontSize: "4rem",
              textAlign: "center",
              color: "rgba(156, 39, 176, 0.3)"
            }}
          >
            🎮 🤖 💻
          </div>
        }
        accentColor="#9C27B0"
        className="projects-landing-hero"
      />

      {/* Game Development Section */}
      <section className="projects-section game-dev-section">
        <div className="section-header">
          <h2>{getText(copy.gameDevLabel, language)}</h2>
          <p>探索玩家体验、AI交互和故事驱动的游戏机制</p>
        </div>
        <GameDevShowcase />
      </section>

      {/* AI & Creative Coding Section */}
      <section className="projects-section ai-projects-section">
        <div className="section-header">
          <h2>{getText(copy.aiProjectsLabel, language)}</h2>
          <p>生成式AI、创意编码和实验性交互设计</p>
        </div>
        <Projects />
      </section>
    </div>
  );
}
