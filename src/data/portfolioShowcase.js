// Portfolio MVP data source
// Update this file to refresh homepage showcase content.

export const portfolioHero = {
  name: "CHEN CHEN",
  role: {
    zh: "Full-stack AI Developer / Multimedia Storyteller",
    en: "Full-stack AI Developer / Multimedia Storyteller"
  },
  intro: {
    zh: "A curated portfolio of videos, AI application projects, and visual storytelling work.",
    en: "A curated portfolio of videos, AI application projects, and visual storytelling work."
  }
};

export const portfolioVideos = [
  {
    id: "video-1",
    title: "Bridge The Digital Divide (Main Showcase)",
    description:
      "Primary showcase video featuring overseas service-learning storytelling and production.",
    backgroundStory: {
      zh: "2024年 POLYU EEE Service Learning QS Award Video，讲述了在Vietnam、Cambodia等地进行Service Learning的故事，展现跨国志愿服务对当地社区的深远影响",
      en: "2024 POLYU EEE Service Learning QS Award Video, capturing the story of service learning experiences in Vietnam, Cambodia and beyond, showcasing the profound impact of cross-border volunteer work on local communities"
    },
    meta: "Main Showcase | YouTube Unlisted",
    href: "https://youtu.be/uvdpACbEzjY",
    featured: true
  },
  {
    id: "video-2",
    title: "EIE2S02 Service Learning Documentary",
    description:
      "5-minute documentary cut used for presentation and communication impact.",
    backgroundStory: {
      zh: "电气工程学系Service Learning项目的5分钟纪录片版本，用于学术演讲和社区交流，精心剪辑以呈现最有冲击力的故事弧线",
      en: "A 5-minute documentary version of the EIE Service Learning project, crafted for academic presentations and community outreach, carefully edited to deliver the most impactful narrative arc"
    },
    meta: "Secondary Showcase | 5:46",
    href: "https://youtu.be/DyRmvonFSP8",
    featured: false
  },
  {
    id: "video-3",
    title: "Hong Kong Story Reel",
    description:
      "Additional visual storytelling sample for pacing, framing, and editing rhythm.",
    backgroundStory: {
      zh: "香港视觉故事精编，展现独特的视角构图和剪辑节奏，代表个人创意在电影化表达中的美学追求",
      en: "A visual storytelling reel from Hong Kong, demonstrating distinctive framing choices and editing pacing, representing personal creative aesthetics in cinematic expression"
    },
    meta: "Creative Reel | YouTube Unlisted",
    href: "https://youtu.be/XjL2Tw4EoBs",
    featured: false
  }
];

export const projectSummary = {
  title: {
    zh: "Project Dossier",
    en: "Project Dossier"
  },
  subtitle: {
    zh: "把工作经历、项目成果和可验证证据放在同一页里。",
    en: "A single view for work history, shipped systems, and the evidence behind them."
  },
  lead: {
    zh: "这里不是普通项目列表，而是我过去几条主线工作的缩略档案：做过什么、在哪个角色里完成、留下了哪些可展示的结果。",
    en: "This is not a generic project list. It is a compressed dossier of the main work lines I have built through: what was shipped, under which role, and what proof remains visible."
  },
  signals: [
    {
      label: {
        zh: "Role",
        en: "Role"
      },
      value: {
        zh: "Full-stack AI Developer / Project Assistant",
        en: "Full-stack AI Developer / Project Assistant"
      }
    },
    {
      label: {
        zh: "Focus",
        en: "Focus"
      },
      value: {
        zh: "AI systems, multimedia storytelling, education support",
        en: "AI systems, multimedia storytelling, education support"
      }
    },
    {
      label: {
        zh: "Mode",
        en: "Mode"
      },
      value: {
        zh: "Build, integrate, support, publish",
        en: "Build, integrate, support, publish"
      }
    }
  ]
};

export const portfolioProjects = [
  {
    id: "capstone-success",
    type: {
      zh: "Work Line 01",
      en: "Work Line 01"
    },
    title: {
      zh: "Capstone Success Project",
      en: "Capstone Success Project"
    },
    organization: {
      zh: "EEE DEV TEAM, Hong Kong Polytechnic University",
      en: "EEE DEV TEAM, Hong Kong Polytechnic University"
    },
    timeframe: {
      zh: "Sep 2025 - Present",
      en: "Sep 2025 - Present"
    },
    role: {
      zh: "Full-stack AI Developer / Project Assistant",
      en: "Full-stack AI Developer / Project Assistant"
    },
    summary: {
      zh: "参与 AI FYP support platform 的持续开发，把 OTP、前端 UI 和后端 API 接入落到真实产品流程里。",
      en: "Contributed to an AI FYP support platform, shipping OTP, frontend UI work, and backend API integration inside a real product workflow."
    },
    bullets: [
      {
        zh: "参与 AI FYP support platform 的开发与迭代",
        en: "Contributed to the development and iteration of an AI FYP support platform"
      },
      {
        zh: "实现 OTP 与 frontend features，并把 backend API 接入到 UI",
        en: "Implemented OTP and frontend features, then integrated backend APIs into the UI"
      },
      {
        zh: "在团队协作环境中完成可交付的产品功能",
        en: "Delivered production-facing features inside a collaborative team environment"
      }
    ],
    proofTag: {
      zh: "Product Delivery",
      en: "Product Delivery"
    },
    actionLabel: {
      zh: "Open GitHub",
      en: "Open GitHub"
    },
    href: "https://github.com/KrisameReimu"
  },
  {
    id: "genai-feedback-system",
    type: {
      zh: "Work Line 02",
      en: "Work Line 02"
    },
    title: {
      zh: "A GenAI-Powered Feedback System for Short-Answer Questions",
      en: "A GenAI-Powered Feedback System for Short-Answer Questions"
    },
    organization: {
      zh: "FYP, Hong Kong Polytechnic University",
      en: "FYP, Hong Kong Polytechnic University"
    },
    timeframe: {
      zh: "Sep 2024 - Jun 2025",
      en: "Sep 2024 - Jun 2025"
    },
    role: {
      zh: "Full-stack AI Builder",
      en: "Full-stack AI Builder"
    },
    summary: {
      zh: "把 React 前端、Flask 后端和 Azure API 结合成一个 AI-powered feedback workflow，并留下了论文发表与在线 demo 两类证据。",
      en: "Combined React, Flask, and Azure API into an AI-powered feedback workflow, with both a publication and a live demo as visible proof."
    },
    bullets: [
      {
        zh: "Published at WAIE 2025, co-sponsored by IEEE",
        en: "Published at WAIE 2025, co-sponsored by IEEE"
      },
      {
        zh: "开发 AI-powered feedback system，用于 short-answer evaluation",
        en: "Built an AI-powered feedback system for short-answer evaluation"
      },
      {
        zh: "整合 React frontend、Flask backend 与 Azure API",
        en: "Integrated React frontend, Flask backend, and Azure API"
      }
    ],
    proofTag: {
      zh: "Publication + Demo",
      en: "Publication + Demo"
    },
    actionLabel: {
      zh: "Open Live Demo",
      en: "Open Live Demo"
    },
    href: "https://genai-sql.eiedev.app/"
  },
  {
    id: "multimedia-awards",
    type: {
      zh: "Work Line 03",
      en: "Work Line 03"
    },
    title: {
      zh: "Multimedia Projects & Awards",
      en: "Multimedia Projects & Awards"
    },
    organization: {
      zh: "Videos, posters, and competition work",
      en: "Videos, posters, and competition work"
    },
    timeframe: {
      zh: "2023 - 2026",
      en: "2023 - 2026"
    },
    role: {
      zh: "Multimedia Designer / Story Builder",
      en: "Multimedia Designer / Story Builder"
    },
    summary: {
      zh: "这条线代表我把影像、竞赛和叙事能力做成可验证成果的方式，不只是作品展示，也是个人 IP 的证据层。",
      en: "This line represents how video, competitions, and narrative work become verifiable outcomes, not just portfolio pieces but proof for the personal IP."
    },
    bullets: [
      {
        zh: "HK videos Competition: Golden & Special Award (2023, 2025)",
        en: "HK videos Competition: Golden & Special Award (2023, 2025)"
      },
      {
        zh: "QS Award in EEE Service Learning (2025)",
        en: "QS Award in EEE Service Learning (2025)"
      },
      {
        zh: "Second Prize in the 2024 Japan Sasakawa Cup",
        en: "Second Prize in the 2024 Japan Sasakawa Cup"
      }
    ],
    proofTag: {
      zh: "Creative Evidence",
      en: "Creative Evidence"
    },
    actionLabel: {
      zh: "Open Awards",
      en: "Open Awards"
    },
    href: "/awards"
  }
];

export const portfolioPhotos = [];
