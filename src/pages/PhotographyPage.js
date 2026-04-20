import React, {useContext, useEffect, useMemo, useState} from "react";
import Photography from "../containers/photography/Photography";
import DynamicLandingHero from "../components/dynamicLandingHero/DynamicLandingHero";
import LanguageContext from "../contexts/LanguageContext";
import {getPhotos} from "../services/contentAPI";
import "./PhotographyPage.scss";

export default function PhotographyPage() {
  const {language} = useContext(LanguageContext);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const allPhotos = await getPhotos();
      if (mounted) setPhotos(allPhotos || []);
    })();
    return () => {
      mounted = false;
    };
  }, []);

  // 获取前8张照片用于展示墙
  const displayPhotos = useMemo(() => {
    return photos.slice(0, 8).map(photo => ({
      src: photo.url,
      alt:
        typeof photo.title === "object"
          ? photo.title[language] || photo.title.en || photo.title.zh || "Photo"
          : photo.title || "Photo",
      category: photo.category || "Uncategorized"
    }));
  }, [photos, language]);

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
        visualType={photos.length > 0 ? "interactive-photo" : "image-wall"}
        mediaItems={displayPhotos}
        accentColor="#000000"
        className="photography-landing-hero"
      />
      <Photography />
    </div>
  );
}
