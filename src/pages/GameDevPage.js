import React, {useContext, useMemo} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import Projects from "../sections/projects/Projects";
import DynamicLandingHero from "../components/dynamicLandingHero/DynamicLandingHero";
import LanguageContext from "../contexts/LanguageContext";
import {getText} from "../utils/i18n";
import {openHeroTarget} from "../utils/heroNavigation";
import "./GameDevPage.scss";

export default function GameDevPage() {
  const {language} = useContext(LanguageContext);
  const navigate = useNavigate();
  const location = useLocation();
  const heroCards = useMemo(
    () => [
      {
        year: "2025",
        title: {
          zh: "Capstone Success Project",
          en: "Capstone Success Project"
        },
        description: {
          zh: "OTP、前端实现与 API 接入",
          en: "OTP, frontend implementation, and API integration"
        },
        cta: {
          zh: "Open Dossier",
          en: "Open Dossier"
        },
        href: "/game-dev#project-capstone-success"
      },
      {
        year: "2024",
        title: {
          zh: "GenAI 短答题反馈系统",
          en: "GenAI Feedback System for Short-answer Questions"
        },
        description: {
          zh: "WAIE 2025 发表与在线 demo",
          en: "WAIE 2025 publication and live demo"
        },
        cta: {
          zh: "Open Dossier",
          en: "Open Dossier"
        },
        href: "/game-dev#project-genai-feedback-system"
      },
      {
        year: "2023-2026",
        title: {
          zh: "多媒体项目与获奖作品",
          en: "Multimedia Projects and Award-winning Works"
        },
        description: {
          zh: "视频、海报与竞赛成果",
          en: "Video, poster, and competition outputs"
        },
        cta: {
          zh: "Open Dossier",
          en: "Open Dossier"
        },
        href: "/game-dev#project-multimedia-awards"
      }
    ],
    []
  );

  const copy = {
    title: {zh: "Projects", en: "Projects"},
    subtitle: {
      zh: "CV-backed systems, products, and multimedia work",
      en: "CV-backed systems, products, and multimedia work"
    },
    description: {
      zh: "这里不放占位概念，也不放还没站稳的尝试。当前只保留已经进入履历、能被项目经历或公开成果支撑的作品。",
      en: "No placeholder concepts and no early-stage experiments here. This page keeps only the work already backed by the CV, shipped output, or public proof."
    },
    selectedWork: {
      zh: "Selected Work",
      en: "Selected Work"
    },
    selectedWorkSubtitle: {
      zh: "以系统建设、多媒体产出和教育场景应用为主轴。",
      en: "Organized around system building, multimedia output, and educational applications."
    },
    experience: {
      zh: "Experience Signals",
      en: "Experience Signals"
    },
    experienceSubtitle: {
      zh: "把工作经验里的角色、技术栈和输出类型压缩成快速可读的档案。",
      en: "A compact reading of the roles, stacks, and output types already visible across the CV."
    }
  };

  const experienceSignals = [
    {
      role: {
        zh: "Full-Stack AI Developer / Project Assistant",
        en: "Full-Stack AI Developer / Project Assistant"
      },
      org: {
        zh: "EEE, Hong Kong Polytechnic University",
        en: "EEE, Hong Kong Polytechnic University"
      },
      period: "Sep 2025 - Present",
      detail: {
        zh: "AI feedback system、自动评测应用、React + Flask + Azure API 交付。",
        en: "AI feedback system, auto-grading application, and React + Flask + Azure API delivery."
      }
    },
    {
      role: {
        zh: "Web Developer Intern",
        en: "Web Developer Intern"
      },
      org: {
        zh: "Borntea Company, Hong Kong",
        en: "Borntea Company, Hong Kong"
      },
      period: "May 2024 - Jul 2024",
      detail: {
        zh: "电商平台开发、性能与体验优化，以及营销协作支持。",
        en: "eCommerce platform development, UX and performance improvements, and campaign support."
      }
    },
    {
      role: {
        zh: "Student Assistant",
        en: "Student Assistant"
      },
      org: {
        zh: "Office of Undergraduate Studies, PolyU",
        en: "Office of Undergraduate Studies, PolyU"
      },
      period: "Jun 2023 - Jun 2025",
      detail: {
        zh: "校园服务、活动支持、以及对外沟通类工作。",
        en: "Campus service, event support, and public-facing communication work."
      }
    }
  ];

  return (
    <div className="page-container projects-page">
      <DynamicLandingHero
        title={copy.title}
        subtitle={copy.subtitle}
        description={copy.description}
        visualType="interactive-feature"
        mediaItems={heroCards}
        onMediaItemClick={item =>
          openHeroTarget({
            target: item.href,
            navigate,
            currentPathname: location.pathname
          })
        }
        accentColor="#9C27B0"
        className="projects-landing-hero"
      />

      <section className="projects-section selected-work-section">
        <div className="section-header">
          <h2>{getText(copy.selectedWork, language)}</h2>
          <p>{getText(copy.selectedWorkSubtitle, language)}</p>
        </div>
        <Projects />
      </section>

      <section className="projects-section experience-section">
        <div className="section-header">
          <h2>{getText(copy.experience, language)}</h2>
          <p>{getText(copy.experienceSubtitle, language)}</p>
        </div>
        <div className="experience-signal-grid">
          {experienceSignals.map(signal => (
            <article className="experience-signal-card" key={signal.role.en}>
              <span>{signal.period}</span>
              <h3>{getText(signal.role, language)}</h3>
              <p className="experience-signal-org">
                {getText(signal.org, language)}
              </p>
              <p>{getText(signal.detail, language)}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
