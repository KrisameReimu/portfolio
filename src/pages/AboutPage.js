import React, {useContext} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import LanguageContext from "../contexts/LanguageContext";
import PageHero from "../components/pageHero/PageHero";
import PageSurface from "../components/pageSurface/PageSurface";
import {getText} from "../utils/i18n";
import {greeting} from "../portfolio";
import {openHeroTarget} from "../utils/heroNavigation";
import "./AboutPage.scss";

export default function AboutPage() {
  const {language} = useContext(LanguageContext);
  const navigate = useNavigate();
  const location = useLocation();
  const copy = {
    title: {
      zh: "关于我",
      en: "About"
    },
    subtitle: {
      zh: "用履历证据、创作方向和工作方法拼起来的本人说明页。",
      en: "A profile built from career evidence, creative direction, and working method."
    },
    intro: {
      zh: "我在香港做 AI 系统、多媒体叙事和教学支持相关工作。这个页面不再写成泛泛自我介绍，而是直接说明我做过什么、现在站在哪个位置、以及为什么这些事情会汇成同一个个人 IP。",
      en: "I work across AI systems, multimedia storytelling, and teaching support in Hong Kong. This page avoids generic self-description and instead explains what I have done, where I stand now, and why these threads belong to the same personal IP."
    },
    profileTitle: {
      zh: "Profile Signals",
      en: "Profile Signals"
    },
    profileSignals: [
      {
        title: {
          zh: "Full-stack AI delivery",
          en: "Full-stack AI delivery"
        },
        body: {
          zh: "做过 GenAI 反馈系统、自动评测应用、前后端集成，以及教育场景下的真实交付。",
          en: "Built GenAI feedback systems, auto-grading applications, and full-stack integrations for real educational use."
        }
      },
      {
        title: {
          zh: "Multimedia evidence",
          en: "Multimedia evidence"
        },
        body: {
          zh: "视频、海报和影像竞赛奖项不是附属材料，而是我表达和传播能力的直接证据。",
          en: "Video, poster, and visual competition awards are not side material here. They are direct proof of communication and storytelling ability."
        }
      },
      {
        title: {
          zh: "Research and teaching support",
          en: "Research and teaching support"
        },
        body: {
          zh: "我长期在 PolyU 的研究、项目与服务环境里工作，因此习惯把抽象问题做成能被团队直接使用的页面、材料和流程。",
          en: "Working inside PolyU research, project, and service settings taught me to turn abstract needs into pages, materials, and workflows a team can actually use."
        }
      }
    ],
    timelineTitle: {
      zh: "CV Timeline",
      en: "CV Timeline"
    },
    timelineItems: [
      {
        period: "Sep 2025 - Present",
        title: {
          zh: "Full-Stack AI Developer / Project Assistant",
          en: "Full-Stack AI Developer / Project Assistant"
        },
        body: {
          zh: "EEE, Hong Kong Polytechnic University。开发与维护 AI-powered feedback system，做 Flask + React + Azure API 应用，并支持 tutorial / lab。",
          en: "EEE, Hong Kong Polytechnic University. Building and maintaining AI-powered feedback systems with Flask, React, and Azure API, while supporting tutorials and labs."
        }
      },
      {
        period: "May 2024 - Jul 2024",
        title: {
          zh: "Ecommerce Platform & Web Developer Intern",
          en: "Ecommerce Platform & Web Developer Intern"
        },
        body: {
          zh: "Borntea Company, Hong Kong。参与电商平台开发，提升体验与性能，并与营销侧协作完成数字 campaign 支持。",
          en: "Borntea Company, Hong Kong. Worked on eCommerce platform development, performance improvements, and digital campaign support."
        }
      },
      {
        period: "Jun 2023 - Jun 2025",
        title: {
          zh: "Student Assistant",
          en: "Student Assistant"
        },
        body: {
          zh: "Office of Undergraduate Studies, PolyU。负责新生引导、校园调查、活动与对外服务支持。",
          en: "Office of Undergraduate Studies, PolyU. Supported freshman guidance, surveys, campus events, and public-facing service work."
        }
      }
    ],
    educationTitle: {
      zh: "Education",
      en: "Education"
    },
    educationItems: [
      {
        title: {
          zh: "香港理工大学",
          en: "Hong Kong Polytechnic University"
        },
        body: {
          zh: "互联网与多媒体科技学士，2021 - 2025。",
          en: "BSc in Internet and Multimedia Technologies, 2021 - 2025."
        }
      },
      {
        title: {
          zh: "牛津大学 Lady Margaret Hall",
          en: "Lady Margaret Hall, University of Oxford"
        },
        body: {
          zh: "Artificial Intelligence and Machine Learning Program，Summer 2024。",
          en: "Artificial Intelligence and Machine Learning Program, Summer 2024."
        }
      }
    ],
    resumeHint: {
      zh: "更正式的版本可以直接查看 CV；这个页面负责把履历转换成更容易理解的网站叙事。",
      en: "The formal version lives in the CV. This page turns that record into a clearer website narrative."
    },
    resumeButton: {
      zh: "查看 CV",
      en: "View CV"
    }
  };

  const heroCards = [
    {
      eyebrow: "01",
      title: {
        zh: "Profile Signals",
        en: "Profile Signals"
      },
      description: {
        zh: "看我最核心的能力结构和工作方式。",
        en: "Open the strongest signals of how I work."
      },
      cta: {
        zh: "Open Section",
        en: "Open Section"
      },
      href: "#profile-signals"
    },
    {
      eyebrow: "02",
      title: {
        zh: "CV Timeline",
        en: "CV Timeline"
      },
      description: {
        zh: "按时间看角色、组织和产出脉络。",
        en: "Read the roles, organizations, and outputs in timeline form."
      },
      cta: {
        zh: "Open Section",
        en: "Open Section"
      },
      href: "#cv-timeline"
    },
    {
      eyebrow: "03",
      title: {
        zh: "Education",
        en: "Education"
      },
      description: {
        zh: "把学术背景和训练来源放在同一处查看。",
        en: "See the academic background and training context in one place."
      },
      cta: {
        zh: "Open Section",
        en: "Open Section"
      },
      href: "#education"
    }
  ];

  return (
    <PageSurface pageKey="about" className="page-container about-page">
      <PageHero
        pageKey="about"
        title={copy.title}
        subtitle={copy.subtitle}
        description={copy.intro}
        mediaItems={heroCards}
        onMediaItemClick={item =>
          openHeroTarget({
            target: item.href,
            navigate,
            currentPathname: location.pathname
          })
        }
      />

      <section className="about-block" id="profile-signals">
        <h2>{getText(copy.profileTitle, language)}</h2>
        <div className="about-signal-list">
          {copy.profileSignals.map(item => (
            <article className="about-signal-item" key={item.title.en}>
              <h3>{getText(item.title, language)}</h3>
              <p>{getText(item.body, language)}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-current" id="cv-timeline">
        <h2>{getText(copy.timelineTitle, language)}</h2>
        <div className="about-timeline">
          {copy.timelineItems.map(item => (
            <article className="about-timeline-item" key={item.period}>
              <span>{item.period}</span>
              <h3>{getText(item.title, language)}</h3>
              <p>{getText(item.body, language)}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-block" id="education">
        <h2>{getText(copy.educationTitle, language)}</h2>
        <div className="about-signal-list">
          {copy.educationItems.map(item => (
            <article className="about-signal-item" key={item.title.en}>
              <h3>{getText(item.title, language)}</h3>
              <p>{getText(item.body, language)}</p>
            </article>
          ))}
        </div>
      </section>

      {greeting.resumeLink && (
        <div className="about-resume-card">
          <p>{getText(copy.resumeHint, language)}</p>
          <a
            href={greeting.resumeLink}
            target="_blank"
            rel="noreferrer"
            className="about-resume-button"
          >
            {getText(copy.resumeButton, language)}
          </a>
        </div>
      )}
    </PageSurface>
  );
}
