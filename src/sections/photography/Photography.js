import React, {
  useState,
  useEffect,
  useCallback,
  useContext,
  useMemo
} from "react";
import "./Photography.scss";
import {Fade} from "react-reveal";
import {getPhotos} from "../../services/contentAPI";
import LanguageContext from "../../contexts/LanguageContext";
import {formatDate, getText} from "../../utils/i18n";
import {
  fallbackPhotoCategory,
  photoCategoryMeta
} from "../../config/contentTaxonomy";

const photographySection = {
  display: true
};

const Photography = () => {
  const {language} = useContext(LanguageContext);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [currentPhotos, setCurrentPhotos] = useState([]);
  const [loadedImages, setLoadedImages] = useState({});
  const [photos, setPhotos] = useState([]);
  const loadedImagesRef = React.useRef({});
  const inFlightRef = React.useRef(new Set());

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

  const categories = useMemo(() => {
    const categoryIds = Array.from(
      new Set(photos.map(photo => photo.category).filter(Boolean))
    );
    return categoryIds.map(categoryId => {
      const meta = photoCategoryMeta[categoryId] || fallbackPhotoCategory;
      const categoryPhotos = photos.filter(
        photo => photo.category === categoryId
      );
      return {
        id: categoryId,
        name: meta.label,
        description: meta.description,
        icon: meta.icon,
        color: meta.color,
        photoCount: categoryPhotos.length,
        coverImage: categoryPhotos[0]?.thumbnail || categoryPhotos[0]?.url || ""
      };
    });
  }, [photos]);

  const photosByCategory = useMemo(() => {
    const grouped = {};
    photos.forEach(photo => {
      if (!photo.category) return;
      if (!grouped[photo.category]) grouped[photo.category] = [];
      grouped[photo.category].push(photo);
    });
    return grouped;
  }, [photos]);

  const loadImage = useCallback(src => {
    if (!src || loadedImagesRef.current[src] || inFlightRef.current.has(src))
      return;
    inFlightRef.current.add(src);
    const img = new Image();
    img.src = src;
    img.onload = () => {
      loadedImagesRef.current = {...loadedImagesRef.current, [src]: src};
      setLoadedImages(loadedImagesRef.current);
      inFlightRef.current.delete(src);
    };
    img.onerror = () => {
      inFlightRef.current.delete(src);
    };
  }, []);

  useEffect(() => {
    if (!selectedCategory) return;
    const selected = photosByCategory[selectedCategory.id] || [];
    selected.forEach(photo => {
      loadImage(photo.thumbnail || photo.url);
      loadImage(photo.url);
    });
  }, [selectedCategory, photosByCategory, loadImage]);

  const openLightbox = useCallback((nextPhotos, index) => {
    setLightboxOpen(true);
    setLightboxIndex(index);
    setCurrentPhotos(nextPhotos);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const nextPhoto = useCallback(() => {
    setLightboxIndex(prev => (prev + 1) % currentPhotos.length);
  }, [currentPhotos]);

  const prevPhoto = useCallback(() => {
    setLightboxIndex(
      prev => (prev - 1 + currentPhotos.length) % currentPhotos.length
    );
  }, [currentPhotos]);

  const handleKeydown = useCallback(
    e => {
      if (!lightboxOpen) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextPhoto();
      if (e.key === "ArrowLeft") prevPhoto();
    },
    [lightboxOpen, closeLightbox, nextPhoto, prevPhoto]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [handleKeydown]);

  if (!photographySection.display) return null;

  const copy = {
    title: {zh: "摄影作品", en: "Photography"},
    subtitle: {
      zh: "记录光影与情绪的长期影像档案",
      en: "A long-term visual archive of light, places, and emotions."
    },
    back: {zh: "返回分类", en: "Back to Categories"},
    photoCount: {zh: "张", en: "Photos"},
    empty: {zh: "该分类暂时还没有作品。", en: "Photos coming soon..."}
  };

  const selectedCategoryData = selectedCategory
    ? categories.find(c => c.id === selectedCategory.id)
    : null;
  const selectedPhotos = selectedCategory
    ? photosByCategory[selectedCategory.id] || []
    : [];

  return (
    <Fade bottom duration={1000} distance="20px">
      <div className="main" id="photography">
        <div className="photography-container">
          <div>
            <h1 className="photography-heading">
              {getText(copy.title, language)}
            </h1>
            <p className="subTitle photography-subtitle">
              {getText(copy.subtitle, language)}
            </p>
          </div>

          {!selectedCategory ? (
            <div className="photo-categories-grid">
              {categories.map(category => (
                <Fade key={category.id} bottom duration={1200} distance="24px">
                  <div
                    className="category-card"
                    onClick={() => setSelectedCategory(category)}
                  >
                    <div className="category-image-container">
                      <img
                        src={category.coverImage}
                        alt={getText(category.name, language)}
                        className="category-cover"
                        loading="lazy"
                      />
                      <div className="category-overlay">
                        <span className="category-icon">
                          <i className={category.icon}></i>
                        </span>
                        <h3 className="category-name">
                          {getText(category.name, language)}
                        </h3>
                        <p className="category-description">
                          {getText(category.description, language)}
                        </p>
                        <span className="photo-count">
                          <i className="fas fa-images"></i>{" "}
                          {category.photoCount}{" "}
                          {getText(copy.photoCount, language)}
                        </span>
                      </div>
                    </div>
                  </div>
                </Fade>
              ))}
            </div>
          ) : (
            <div className="photo-gallery">
              <button
                className="back-button"
                onClick={() => setSelectedCategory(null)}
                type="button"
              >
                <i className="fas fa-arrow-left"></i>{" "}
                {getText(copy.back, language)}
              </button>
              <h2 className="gallery-title">
                {getText(selectedCategoryData?.name || {}, language)}
              </h2>
              <p className="gallery-description">
                {getText(selectedCategoryData?.description || {}, language)}
              </p>
              <div className="photos-grid">
                {selectedPhotos.map((photo, index) => (
                  <div
                    key={photo.id}
                    className="photo-item"
                    onClick={() => openLightbox(selectedPhotos, index)}
                  >
                    <img
                      src={
                        loadedImages[photo.thumbnail] ||
                        photo.thumbnail ||
                        photo.url
                      }
                      alt={getText(photo.title, language)}
                      loading="lazy"
                    />
                    <div className="photo-overlay">
                      <h4 className="photo-title">
                        {getText(photo.title, language)}
                      </h4>
                      <p className="photo-meta">
                        <i className="far fa-calendar"></i>{" "}
                        {formatDate(photo.captureDate, language)}
                      </p>
                    </div>
                  </div>
                ))}
                {selectedPhotos.length === 0 && (
                  <div className="empty-gallery">
                    <i className="fas fa-images"></i>
                    <p>{getText(copy.empty, language)}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {lightboxOpen && currentPhotos.length > 0 && (
            <div className="lightbox" onClick={closeLightbox}>
              <button className="lightbox-close" aria-label="Close lightbox">
                <i className="fas fa-times"></i>
              </button>
              <button
                className="lightbox-prev"
                onClick={e => {
                  e.stopPropagation();
                  prevPhoto();
                }}
                aria-label="Previous photo"
              >
                <i className="fas fa-chevron-left"></i>
              </button>
              <div
                className="lightbox-content"
                onClick={e => e.stopPropagation()}
              >
                <img
                  src={currentPhotos[lightboxIndex].url}
                  alt={getText(currentPhotos[lightboxIndex].title, language)}
                />
                <div className="lightbox-info">
                  <h3>
                    {getText(currentPhotos[lightboxIndex].title, language)}
                  </h3>
                  <p className="photo-description">
                    {getText(
                      currentPhotos[lightboxIndex].description,
                      language
                    )}
                  </p>
                  {currentPhotos[lightboxIndex].exifData && (
                    <div className="exif-data">
                      <span>
                        <i className="fas fa-camera"></i>{" "}
                        {currentPhotos[lightboxIndex].exifData.camera}
                      </span>
                      <span>
                        <i className="fas fa-cog"></i>{" "}
                        {currentPhotos[lightboxIndex].exifData.settings}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <button
                className="lightbox-next"
                onClick={e => {
                  e.stopPropagation();
                  nextPhoto();
                }}
                aria-label="Next photo"
              >
                <i className="fas fa-chevron-right"></i>
              </button>
              <div className="lightbox-counter">
                {lightboxIndex + 1} / {currentPhotos.length}
              </div>
            </div>
          )}
        </div>
      </div>
    </Fade>
  );
};

export default Photography;
export {photographySection};
