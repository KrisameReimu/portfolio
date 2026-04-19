import React, {useContext} from "react";
import "./Achievement.scss";
import AchievementCard from "../../components/achievementCard/AchievementCard";
import {achievementSection} from "../../portfolio";
import {Fade} from "react-reveal";
import StyleContext from "../../contexts/StyleContext";
export default function Achievement({
  title = achievementSection.title,
  subtitle = achievementSection.subtitle,
  cards = achievementSection.achievementsCards,
  showHeader = true,
  sectionId = "achievements"
}) {
  const {isDark} = useContext(StyleContext);
  if (!achievementSection.display) {
    return null;
  }
  return (
    <Fade bottom duration={1000} distance="20px">
      <div className="main" id={sectionId}>
        <div className="achievement-main-div">
          {showHeader && (
            <div className="achievement-header">
              <h1
                className={
                  isDark
                    ? "dark-mode heading achievement-heading"
                    : "heading achievement-heading"
                }
              >
                {title}
              </h1>
              <p
                className={
                  isDark
                    ? "dark-mode subTitle achievement-subtitle"
                    : "subTitle achievement-subtitle"
                }
              >
                {subtitle}
              </p>
            </div>
          )}
          <div className="achievement-cards-div">
            {cards.map((card, i) => {
              return (
                <AchievementCard
                  key={i}
                  isDark={isDark}
                  cardInfo={{
                    title: card.title,
                    description: card.subtitle,
                    image: card.image,
                    imageAlt: card.imageAlt,
                    footer: card.footerLink,
                    previewUrl: card.footerLink?.[0]?.url
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </Fade>
  );
}
