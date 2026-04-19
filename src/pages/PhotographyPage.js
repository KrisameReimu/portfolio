import React, {useContext} from "react";
import Photography from "../containers/photography/Photography";
import LandingHero from "../components/landingHero/LandingHero";
import LanguageContext from "../contexts/LanguageContext";
import "./PhotographyPage.scss";

export default function PhotographyPage() {
  useContext(LanguageContext);
  const copy = {
    title: {zh: "摄影作品", en: "Photography"},
    subtitle: {
      zh: "记录光影与情绪的长期影像档案",
      en: "A long-term visual archive of light, places, and emotions."
    }
  };
  return (
    <div className="page-container">
      <LandingHero
        variant="minimal"
        title={copy.title}
        subtitle={copy.subtitle}
        icon="📷"
        className="photography-landing-hero"
      />
      <Photography />
    </div>
  );
}
