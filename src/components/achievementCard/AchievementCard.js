import React, {useEffect, useState} from "react";
import "./AchievementCard.scss";

export default function AchievementCard({cardInfo, isDark}) {
  const [imageSrc, setImageSrc] = useState(cardInfo.image);
  const primaryDocument =
    cardInfo.previewUrl || cardInfo.footer?.[0]?.url || "";
  const previewSrc = primaryDocument
    ? `${primaryDocument}#page=1&zoom=page-fit&toolbar=0&navpanes=0&scrollbar=0`
    : "";

  useEffect(() => {
    setImageSrc(cardInfo.image);
  }, [cardInfo.image]);

  return (
    <article
      className={isDark ? "dark-mode certificate-card" : "certificate-card"}
      style={{
        "--preview-ratio": cardInfo.previewAspectRatio || 1.25
      }}
    >
      <a
        className="certificate-media-div"
        href={primaryDocument}
        target="_blank"
        rel="noreferrer"
        aria-label={`Open ${cardInfo.title} PDF`}
      >
        {primaryDocument ? (
          <iframe
            src={previewSrc}
            title={`${cardInfo.title} preview`}
            className="certificate-pdf-frame"
            loading="lazy"
          />
        ) : (
          <img
            src={imageSrc}
            alt={cardInfo.imageAlt || `${cardInfo.title} thumbnail`}
            className="card-image"
            loading="lazy"
            onError={() => setImageSrc("/ECHOHOME.png")}
          />
        )}
      </a>
      <div className="certificate-detail-div">
        <h5 className={isDark ? "dark-mode card-title" : "card-title"}>
          {cardInfo.title}
        </h5>
        <p className={isDark ? "dark-mode card-subtitle" : "card-subtitle"}>
          {cardInfo.description}
        </p>
      </div>
      <div className="certificate-card-footer">
        {cardInfo.footer?.map((v, i) => {
          return (
            <a
              key={`${v.url}-${i}`}
              className={
                isDark ? "dark-mode certificate-tag" : "certificate-tag"
              }
              href={v.url}
              target="_blank"
              rel="noreferrer"
            >
              {v.name}
            </a>
          );
        })}
      </div>
    </article>
  );
}
