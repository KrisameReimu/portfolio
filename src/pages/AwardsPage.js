import React, {useContext, useMemo} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import LanguageContext from "../contexts/LanguageContext";
import StyleContext from "../contexts/StyleContext";
import PageHero from "../components/pageHero/PageHero";
import PageSurface from "../components/pageSurface/PageSurface";
import {getText} from "../utils/i18n";
import {certificationCards} from "../data/certifications";
import AchievementCard from "../components/achievementCard/AchievementCard";
import {openHeroTarget} from "../utils/heroNavigation";
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
  const navigate = useNavigate();
  const location = useLocation();

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

  const heroCards = useMemo(
    () =>
      groupOrder.map(group => {
        const card = certificationCards.find(item => item.group === group);
        return {
          eyebrow: group.toUpperCase(),
          title: groupMeta[group].title,
          description: groupMeta[group].subtitle,
          image: card?.image || "",
          cta: {
            zh: "Open Section",
            en: "Open Section"
          },
          href: `#awards-${group}`
        };
      }),
    []
  );

  return (
    <PageSurface pageKey="awards" className="page-container awards-page">
      <PageHero
        pageKey="awards"
        title={copy.title}
        subtitle={copy.subtitle}
        description={{
          zh: "我只保留对个人 IP 有帮助的证据：创作、研究、教学服务和可验证的成果。",
          en: "I keep only the evidence that strengthens the personal IP: creative work, research, teaching support, and verifiable outcomes."
        }}
        visualType="interactive-feature"
        mediaItems={heroCards}
        onMediaItemClick={item =>
          openHeroTarget({
            target: item.href,
            navigate,
            currentPathname: location.pathname
          })
        }
      />

      <div className="awards-sections">
        {groupedCards.map(section => {
          const meta = groupMeta[section.key];
          return (
            <section
              className="awards-section"
              key={section.key}
              id={`awards-${section.key}`}
            >
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
    </PageSurface>
  );
}
