import React, {useContext} from "react";
import Photography from "../containers/photography/Photography";
import DynamicLandingHero from "../components/dynamicLandingHero/DynamicLandingHero";
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
      <DynamicLandingHero
        title={copy.title}
        subtitle={copy.subtitle}
        visualType="image-wall"
        accentColor="#000000"
        images={[
          "https://via.placeholder.com/200x150?text=Photo1",
          "https://via.placeholder.com/200x150?text=Photo2",
          "https://via.placeholder.com/200x150?text=Photo3",
          "https://via.placeholder.com/200x150?text=Photo4",
          "https://via.placeholder.com/200x150?text=Photo5",
          "https://via.placeholder.com/200x150?text=Photo6"
        ]}
        className="photography-landing-hero"
      />
      <Photography />
    </div>
  );
}
