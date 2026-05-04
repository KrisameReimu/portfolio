import React, {useContext, useMemo} from "react";
import {Link} from "react-router-dom";
import LanguageContext from "../../contexts/LanguageContext";
import {getText} from "../../utils/i18n";
import "./HomeCuratedWorlds.scss";

export default function HomeCuratedWorlds() {
  const {language} = useContext(LanguageContext);

  const chapterEntries = useMemo(
    () => [
      {
        index: "01",
        title: {
          zh: "Projects",
          en: "Projects"
        },
        summary: {
          zh: "以 dossier 方式整理教育 AI、student workflow 与真正交付过的系统工作。",
          en: "A dossier-led reading of educational AI, student workflow, and systems that were actually delivered."
        },
        detail: {
          zh: "重点是 problem、role、result 与可验证证据，不是技术名词堆叠。",
          en: "Centered on problem, role, result, and verifiable proof instead of buzzword stacking."
        },
        href: "/projects",
        action: {
          zh: "Open dossier",
          en: "Open dossier"
        }
      },
      {
        index: "02",
        title: {
          zh: "Photos",
          en: "Photos"
        },
        summary: {
          zh: "把摄影页当作正在搭建的展厅：宁可留白，也不上传虚构图集。",
          en: "Photography is treated as an exhibition in progress: better to leave space than publish invented galleries."
        },
        detail: {
          zh: "页面先讲清楚 archive logic，再让首批正式图集自然接管版面。",
          en: "The page explains the archive logic first, then lets the first real sets take over the surface."
        },
        href: "/photos",
        action: {
          zh: "Enter gallery",
          en: "Enter gallery"
        }
      },
      {
        index: "03",
        title: {
          zh: "Videos",
          en: "Videos"
        },
        summary: {
          zh: "竞赛作品、项目影像与传播输出，展示我如何把复杂工作变成能被看懂的叙事。",
          en: "Competition work, project videos, and outward-facing outputs that show how I turn complex work into narrative that people can actually follow."
        },
        detail: {
          zh: "这里更像 reel，而不是附件区。",
          en: "This works more like a reel than an attachments section."
        },
        href: "/videos",
        action: {
          zh: "Open reel",
          en: "Open reel"
        }
      },
      {
        index: "04",
        title: {
          zh: "Writing",
          en: "Writing"
        },
        summary: {
          zh: "写作不是补充说明，而是研究、观察与个人叙事的一条独立主线。",
          en: "Writing is not supporting material; it is its own line of research, observation, and authored narrative."
        },
        detail: {
          zh: "更像 archive-aware editorial shelf，而不是博客列表。",
          en: "Closer to an archive-aware editorial shelf than a blog list."
        },
        href: "/writing",
        action: {
          zh: "Browse archive",
          en: "Browse archive"
        }
      }
    ],
    []
  );

  const currentSignals = useMemo(
    () => [
      {
        label: {
          zh: "Current focus",
          en: "Current focus"
        },
        value: {
          zh: "把个人网站从精致 portfolio 推成长期个人 IP 系统",
          en: "Pushing the site from a polished portfolio into a long-term personal IP system"
        }
      },
      {
        label: {
          zh: "Build mode",
          en: "Build mode"
        },
        value: {
          zh: "页面差异化、内容收口、真实公开归档",
          en: "Page differentiation, content consolidation, and real public archives"
        }
      },
      {
        label: {
          zh: "Live page",
          en: "Live page"
        },
        value: {
          zh: "Now 页面会持续更新最近在做什么、接下来学什么",
          en: "The Now page tracks what I am doing now and what I am learning next"
        }
      }
    ],
    []
  );

  return (
    <section className="home-curated-worlds">
      <div className="home-curated-worlds__grid">
        <div className="home-curated-worlds__intro">
          <p className="home-curated-worlds__kicker">
            {language === "zh" ? "Curated Worlds" : "Curated Worlds"}
          </p>
          <h2>
            {language === "zh"
              ? "这个网站不是把经历摊开，而是把我真正长期在做的几条线索整理成可进入的章节。"
              : "This site does not flatten experience into a résumé. It turns the lines I am actually working on into chapters you can enter."}
          </h2>
          <p className="home-curated-worlds__summary">
            {language === "zh"
              ? "我更关心每个入口是否像一个真实世界，而不是是否把所有信息一次讲完。"
              : "I care more about whether each entry feels like a real world than whether every detail is explained at once."}
          </p>
          <div className="home-curated-worlds__actions">
            <Link to="/projects">
              {language === "zh" ? "Open flagship work" : "Open flagship work"}
            </Link>
            <Link to="/now">
              {language === "zh"
                ? "See what is live now"
                : "See what is live now"}
            </Link>
          </div>
        </div>

        <div className="home-curated-worlds__signals">
          {currentSignals.map(signal => (
            <article
              className="home-curated-worlds__signal"
              key={signal.label.en}
            >
              <span>{getText(signal.label, language)}</span>
              <p>{getText(signal.value, language)}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="home-curated-worlds__chapters">
        {chapterEntries.map(entry => (
          <article
            className="home-curated-worlds__chapter"
            key={entry.title.en}
          >
            <span className="home-curated-worlds__chapter-index">
              {entry.index}
            </span>
            <div className="home-curated-worlds__chapter-body">
              <h3>{getText(entry.title, language)}</h3>
              <p>{getText(entry.summary, language)}</p>
            </div>
            <div className="home-curated-worlds__chapter-detail">
              <p>{getText(entry.detail, language)}</p>
              <Link to={entry.href}>{getText(entry.action, language)}</Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
