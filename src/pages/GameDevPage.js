import React, {useContext} from "react";
import GameDevShowcase from "../containers/gameDevShowcase/GameDevShowcase";
import Projects from "../containers/projects/Projects";
import LandingHero from "../components/landingHero/LandingHero";
import LanguageContext from "../contexts/LanguageContext";
import {getText} from "../utils/i18n";
import "./GameDevPage.scss";

export default function GameDevPage() {
  const {language} = useContext(LanguageContext);
  const copy = {
    title: {zh: "游戏开发", en: "Game Development"},
    subtitle: {
      zh: "从研究到交互体验的项目实践",
      en: "Projects from research to interactive experience"
    }
  };
  const relatedLabel = {
    zh: "相关项目",
    en: "Related Projects"
  };
  return (
    <div className="page-container">
      <LandingHero
        variant="narrative"
        title={copy.title}
        subtitle={copy.subtitle}
        description={{
          zh: "游戏设计与开发是我的创意实验室，在这里我探索玩家体验、AI交互和故事驱动的游戏机制。",
          en: "Game design and development is my creative lab where I explore player experience, AI interaction, and narrative-driven mechanics."
        }}
        accentColor="#9C27B0"
        className="gamedev-landing-hero"
      />
      <GameDevShowcase />
      <div className="related-section">
        <h2 className="section-title">{getText(relatedLabel, language)}</h2>
        <Projects />
      </div>
    </div>
  );
}
