const multimediaVisualBase = "/content/visuals/multimedia";

export const multimediaPageAssets = {
  hero: {
    src: `${multimediaVisualBase}/multimedia-hero.webp`,
    alt: {
      zh: "Multimedia 总入口视觉，Echo 站在照片、视频、AI 视觉和创作流程拼贴墙前。",
      en: "Multimedia hub visual with Echo surrounded by photos, videos, AI visuals, and process boards."
    },
    label: {zh: "Multimedia", en: "Multimedia"},
    caption: {
      zh: "Photos · Videos · AI Visuals · Process",
      en: "Photos · Videos · AI Visuals · Process"
    }
  },
  aiVisuals: {
    src: `${multimediaVisualBase}/ai-visuals.webp`,
    alt: {
      zh: "AI Visuals 视觉资产，展示生成图像、海报实验和运动概念。",
      en: "AI Visuals asset showing generated images, poster experiments, and motion concepts."
    }
  },
  process: {
    src: `${multimediaVisualBase}/process.webp`,
    alt: {
      zh: "Process 视觉资产，展示拍摄、提示词、剪辑和发布流程。",
      en: "Process asset showing capture, prompting, editing, and publishing workflow."
    }
  }
};

export const multimediaPageCopy = {
  hero: {
    kicker: {zh: "MULTIMEDIA ARCHIVE", en: "MULTIMEDIA ARCHIVE"},
    title: {zh: "视觉输出的总入口", en: "A visual archive, gathered by medium"},
    subtitle: {
      zh: "摄影、影像、AI 视觉和幕后过程放在同一个入口里，但每种媒介保留自己的节奏。",
      en: "Photos, videos, AI visuals, and process notes share one entry point while keeping their own pace."
    },
    meta: {
      zh: "Photos · Videos · AI Visuals · Process",
      en: "Photos · Videos · AI Visuals · Process"
    },
    note: {
      zh: "这里先建立信息架构。真实内容仍然保留在现有 Photos 和 Videos 归档中。",
      en: "This first pass establishes the information architecture. Existing Photos and Videos archives remain in place."
    }
  },
  entryLabel: {zh: "Archive Areas", en: "Archive Areas"},
  entries: [
    {
      id: "photos",
      title: {zh: "Photos", en: "Photos"},
      label: {zh: "真实照片", en: "Real-world stills"},
      description: {
        zh: "城市、旅途、日常观察和地点记忆，保留 image-first 的安静观看节奏。",
        en: "City scenes, travel, daily observation, and place memory with a quiet image-first rhythm."
      },
      href: "/photos",
      status: {zh: "已开放", en: "Live archive"},
      visualKey: "photos"
    },
    {
      id: "videos",
      title: {zh: "Videos", en: "Videos"},
      label: {zh: "影像叙事", en: "Motion stories"},
      description: {
        zh: "比赛、项目、航拍和短片，把复杂工作剪成更容易被理解的故事。",
        en: "Competition work, projects, drone footage, and short stories shaped for clearer viewing."
      },
      href: "/videos",
      status: {zh: "已开放", en: "Live archive"},
      visualKey: "videos"
    },
    {
      id: "ai-visuals",
      title: {zh: "AI Visuals", en: "AI Visuals"},
      label: {zh: "生成视觉", en: "Generated visuals"},
      description: {
        zh: "未来用于收纳 AI 图像、海报概念、封面实验和视觉身份探索。",
        en: "A future home for AI images, poster concepts, cover experiments, and identity studies."
      },
      status: {zh: "进行中", en: "In progress"},
      imageKey: "aiVisuals"
    },
    {
      id: "process",
      title: {zh: "Process", en: "Process"},
      label: {zh: "幕后过程", en: "Behind the scenes"},
      description: {
        zh: "未来记录工具、提示词、剪辑流程、设备设置和 before/after 对照。",
        en: "A future record of tools, prompts, editing flow, device setup, and before/after notes."
      },
      status: {zh: "即将开放", en: "Coming soon"},
      imageKey: "process"
    }
  ],
  openLabel: {zh: "打开归档", en: "Open archive"},
  futureLabel: {zh: "未来入口", en: "Future area"},
  footer: {
    title: {zh: "过渡原则", en: "Transition principle"},
    body: {
      zh: "Multimedia 现在负责发现和分流；Photos 与 Videos 继续负责各自的真实归档。",
      en: "Multimedia now handles discovery and routing; Photos and Videos continue to own their real archives."
    }
  }
};
