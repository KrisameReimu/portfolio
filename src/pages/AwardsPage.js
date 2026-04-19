import React, {useContext, useMemo} from "react";
import LanguageContext from "../contexts/LanguageContext";
import StyleContext from "../contexts/StyleContext";
import LandingHero from "../components/landingHero/LandingHero";
import {getText} from "../utils/i18n";
import {certificationCards} from "../data/certifications";
import AchievementCard from "../components/achievementCard/AchievementCard";
import "./AwardsPage.scss";

const groupOrder = ["multimedia", "research", "service"];

const groupMeta = {
  multimedia: {
    title: {
      zh: "多媒体与竞赛",
      en: "Multimedia & Competitions"
    },
    subtitle: {
      zh: "影像、竞赛与更能体现创作能量的奖项。",
      en: "Video, competitions, and the awards that show creative energy."
    }
  },
  research: {
    title: {
      zh: "研究与学术",
      en: "Research & Academic"
    },
    subtitle: {
      zh: "和 AI、学术训练、专业成长相关的证书与认可。",
      en: "Certificates and recognition tied to AI, academic training, and professional growth."
    }
  },
  service: {
    title: {
      zh: "教学与服务",
      en: "Teaching & Service"
    },
    subtitle: {
      zh: "课堂协助、校园服务，以及支持型角色的证明。",
      en: "Lab support, campus service, and proofs from support-focused roles."
    }
  }
};

function AwardsGrid({cards, isDark}) {
  return (
    <div className="awards-grid">
      {cards.map(card => (
        <AchievementCard
          key={card.title}
          isDark={isDark}
          cardInfo={{
            title: card.title,
            description: card.subtitle,
            image: card.image,
            imageAlt: card.imageAlt,
            footer: card.footerLink,
            previewUrl: card.previewUrl,
            previewAspectRatio: card.previewAspectRatio
          }}
        />
      ))}
    </div>
  );
}

export default function AwardsPage() {
  const {language} = useContext(LanguageContext);
  const {isDark} = useContext(StyleContext);

  const copy = {
    title: {
      zh: "荣誉与证书",
      en: "Awards & Certifications"
    },
    subtitle: {
      zh: "把最能证明你能力的奖项和证书，按主题做成可快速浏览的展示页。",
      en: "A themed showcase of the awards and certificates that best prove your work."
    },
    intro: {
      zh: "我只保留对个人 IP 有帮助的证据：创作、研究、教学服务和可验证的成果。",
      en: "I keep only the evidence that strengthens the personal IP: creative work, research, teaching support, and verifiable outcomes."
    }
  };

  const groupedCards = useMemo(() => {
    return groupOrder
      .map(group => ({
        key: group,
        cards: certificationCards.filter(card => card.group === group)
      }))
      .filter(section => section.cards.length > 0);
  }, []);

  return (
    <div className="page-container awards-page">
      <LandingHero
        variant="stats"
        title={copy.title}
        subtitle={copy.subtitle}
        stats={[
          {
            label: {zh: "获奖总数", en: "Total Awards"},
            value: certificationCards.length
          },
          {
            label: {zh: "多媒体作品", en: "Multimedia"},
            value: certificationCards.filter(c => c.group === "multimedia")
              .length
          },
          {
            label: {zh: "学术研究", en: "Research"},
            value: certificationCards.filter(c => c.group === "research").length
          },
          {
            label: {zh: "教学服务", en: "Service"},
            value: certificationCards.filter(c => c.group === "service").length
          }
        ]}
        accentColor="#FFD700"
        className="awards-landing-hero"
      />
      <p
        className="awards-intro"
        style={{
          textAlign: "center",
          maxWidth: "800px",
          margin: "40px auto",
          color: "rgba(0,0,0,0.7)"
        }}
      >
        {getText(copy.intro, language)}
      </p>

      <div className="awards-sections">
        {groupedCards.map(section => {
          const meta = groupMeta[section.key];
          return (
            <section className="awards-section" key={section.key}>
              <div className="awards-section-header">
                <div>
                  <h2>{getText(meta.title, language)}</h2>
                  <p>{getText(meta.subtitle, language)}</p>
                </div>
                <span>{section.cards.length}</span>
              </div>
              <AwardsGrid cards={section.cards} isDark={isDark} />
            </section>
          );
        })}
      </div>
    </div>
  );
}
