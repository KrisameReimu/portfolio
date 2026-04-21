import React, {useContext, useMemo} from "react";
import {Link} from "react-router-dom";
import "./HomeSummary.scss";
import LanguageContext from "../../contexts/LanguageContext";
import {greeting} from "../../portfolio";
import {getText} from "../../utils/i18n";

const HomeSummary = () => {
  const {language} = useContext(LanguageContext);
  const profile = useMemo(
    () => ({
      kicker: {
        zh: "创作与实践",
        en: "Practice"
      },
      title: {
        zh: "代码、影像与研究叙事，在同一条个人作品线上交汇",
        en: "Code, image, and research narrative meet on one personal work line"
      },
      summary: {
        zh: "这个站点是我长期实践的切片：教育场景里的 AI 系统、研究协作里的工具与文档、以及用摄影与视频完成的表达。我不把它写成履历，而更像一本可以翻开的创作手记。",
        en: "This site is a slice of ongoing practice: AI systems for learning, tooling and writing inside research collaboration, and expression through photography and video. I treat it less like a résumé and more like a notebook you can browse."
      },
      availability: {
        zh: "新章节会随项目与影像集持续更新",
        en: "New chapters ship as projects and image sets evolve"
      }
    }),
    []
  );

  const differentiators = [
    {
      title: {
        zh: "一条线串起实现与表达",
        en: "One thread from build to expression"
      },
      body: {
        zh: "同一套审美与节奏会出现在界面、镜头和剪辑里：系统要稳，叙事也要让人愿意看完。",
        en: "The same sense of rhythm shows up in interfaces, lenses, and edits: systems stay grounded while the story still invites you to stay."
      }
    },
    {
      title: {
        zh: "研究协作里的工具与影像",
        en: "Tools and images inside research"
      },
      body: {
        zh: "在 PolyU 的研究与教学语境里，我习惯把抽象问题落成可演示的页面、短片或视觉材料，让讨论更快对齐。",
        en: "In PolyU research and teaching contexts, I turn abstract questions into demoable surfaces, short films, or visual material so conversations align faster."
      }
    },
    {
      title: {
        zh: "作品与档案，而不是标签墙",
        en: "Archive, not a tag wall"
      },
      body: {
        zh: "WAIE 论文、竞赛影像、摄影系列和项目档案，都会以「可点开、可回看」的形式留在这里，像个人 IP 的公开书架。",
        en: "WAIE writing, competition films, photo series, and project dossiers live here as things you can open and revisit, like a public shelf for a personal IP."
      }
    }
  ];

  const practiceTags = [
    {zh: "系统与界面", en: "Systems & UI"},
    {zh: "影像与剪辑", en: "Image & edit"},
    {zh: "研究与写作", en: "Research & writing"}
  ];

  const selectedProof = [
    {
      label: {zh: "近期手记", en: "Recent studio note"},
      title: {
        zh: "GenAI 短答题反馈系统",
        en: "GenAI Feedback System for Short-answer Questions"
      },
      note: {
        zh: "WAIE 2025 发表（IEEE 联合支持）",
        en: "Published at WAIE 2025 (co-sponsored by IEEE)"
      },
      to: "/game-dev",
      action: {zh: "查看项目页", en: "Open projects"}
    },
    {
      label: {zh: "荣誉与影像", en: "Honors & moving image"},
      title: {
        zh: "视频与海报赛事多项获奖",
        en: "Multiple awards in video and poster competitions"
      },
      note: {
        zh: "含 WPDF 金奖、特别奖，Sasakawa Cup 二等奖等",
        en: "Including WPDF Gold/Special awards and Sasakawa Cup second prize"
      },
      to: "/awards",
      action: {zh: "翻阅档案", en: "Browse archive"}
    }
  ];

  const showcaseChannels = [
    {
      title: {zh: "项目档案", en: "Project dossier"},
      body: {
        zh: "教育 AI、自动评分、多媒体项目与正式交付的系统实现。",
        en: "Educational AI systems, auto-grading, multimedia work, and shipped implementation."
      },
      to: "/game-dev",
      action: {zh: "打开档案", en: "Open dossier"}
    },
    {
      title: {zh: "视频集", en: "Moving image"},
      body: {
        zh: "竞赛与项目视频，覆盖策划、剪辑、叙事与传播。",
        en: "Competition and project videos spanning planning, editing, narrative, and communication."
      },
      to: "/videos",
      action: {zh: "打开片单", en: "Open reel"}
    },
    {
      title: {zh: "摄影与静帧", en: "Photography & stills"},
      body: {
        zh: "摄影系列与图像档案，用视觉语言支持项目表达。",
        en: "Photography series and image archives that support storytelling and project communication."
      },
      to: "/photos",
      action: {zh: "进入照片页", en: "Open wall"}
    },
    {
      title: {zh: "证书与奖状", en: "Certificates & citations"},
      body: {
        zh: "按主题整理的纸质与数字痕迹，当作个人档案的一章。",
        en: "Paper and digital traces grouped by theme, as one chapter of a personal archive."
      },
      to: "/awards",
      action: {zh: "打开这一章", en: "Open chapter"}
    }
  ];

  return (
    <section className="home-summary">
      <div className="cv-grid">
        <aside className="cv-profile">
          <p className="cv-kicker">{getText(profile.kicker, language)}</p>
          <h2>{getText(profile.title, language)}</h2>
          <p className="cv-summary">{getText(profile.summary, language)}</p>
          <p className="cv-availability">
            {getText(profile.availability, language)}
          </p>
          <div className="cv-quick-links">
            <a
              href={greeting.resumeLink}
              target="_blank"
              rel="noreferrer"
              aria-label="CV"
            >
              <i className="fas fa-file-alt"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/chenchenai/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a
              href="https://github.com/KrisameReimu"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
            >
              <i className="fab fa-github"></i>
            </a>
            <a href="mailto:chen944420634@gmail.com" aria-label="Email">
              <i className="fas fa-envelope"></i>
            </a>
            <Link to="/contact" aria-label="Contact">
              <i className="fas fa-comment-dots"></i>
            </Link>
          </div>
        </aside>

        <div className="cv-content">
          <section className="cv-section">
            <div className="cv-section-head">
              <p>01</p>
              <h3>
                {language === "zh"
                  ? "三条创作线索"
                  : "Three threads of practice"}
              </h3>
            </div>
            <div className="cv-timeline cv-diff">
              {differentiators.map(item => (
                <article key={item.title.en} className="cv-timeline-item">
                  <h4>{getText(item.title, language)}</h4>
                  <p className="cv-detail">{getText(item.body, language)}</p>
                </article>
              ))}
            </div>
            <div className="cv-practice-tags" role="list">
              {practiceTags.map(tag => (
                <span key={tag.en} className="cv-practice-tag" role="listitem">
                  {getText(tag, language)}
                </span>
              ))}
            </div>
          </section>

          <section className="cv-section">
            <div className="cv-section-head">
              <p>02</p>
              <h3>{language === "zh" ? "手记与选集" : "Notes & selections"}</h3>
            </div>
            <div className="cv-proof">
              {selectedProof.map(item => (
                <article key={item.title.en} className="cv-proof-item">
                  <p>{getText(item.label, language)}</p>
                  <h4>{getText(item.title, language)}</h4>
                  <p className="cv-note">{getText(item.note, language)}</p>
                  <Link to={item.to}>{getText(item.action, language)}</Link>
                </article>
              ))}
            </div>
          </section>

          <section className="cv-section cv-section--split">
            <div>
              <div className="cv-section-head">
                <p>03</p>
                <h3>{language === "zh" ? "作品入口" : "Ways in"}</h3>
              </div>
              <div className="cv-skill-list">
                {showcaseChannels.map(item => (
                  <article key={item.title.en} className="cv-skill-row">
                    <p>{getText(item.title, language)}</p>
                    <span>{getText(item.body, language)}</span>
                    <Link to={item.to}>{getText(item.action, language)}</Link>
                  </article>
                ))}
              </div>
            </div>

            <div>
              <div className="cv-section-head">
                <p>04</p>
                <h3>
                  {language === "zh" ? "背景与联络" : "Background & reach"}
                </h3>
              </div>
              <div className="cv-edu">
                <article>
                  <h4>
                    {language === "zh"
                      ? "香港理工大学"
                      : "Hong Kong Polytechnic University"}
                  </h4>
                  <p>
                    {language === "zh"
                      ? "互联网与多媒体科技学士（2021-2025）"
                      : "BSc in Internet and Multimedia Technologies (2021-2025)"}
                  </p>
                </article>
                <article>
                  <h4>
                    {language === "zh"
                      ? "牛津大学暑期课程"
                      : "University of Oxford Summer Programme"}
                  </h4>
                  <p>
                    {language === "zh"
                      ? "AI 与机器学习（2024）"
                      : "AI and Machine Learning (2024)"}
                  </p>
                </article>
                <article>
                  <h4>{language === "zh" ? "联络" : "Reach"}</h4>
                  <div className="cv-edu-icons">
                    <a href="mailto:chen944420634@gmail.com" aria-label="Email">
                      <i className="fas fa-envelope"></i>
                    </a>
                    <a href="tel:+85291303739" aria-label="Phone">
                      <i className="fas fa-phone-alt"></i>
                    </a>
                  </div>
                </article>
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
};

export default HomeSummary;
