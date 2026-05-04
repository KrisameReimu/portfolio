const pageHeroBase = "/content/visuals/assets/page-heroes";

export const pageHeroVisuals = {
  home: {
    id: "home-echo-chen-ai-multimedia-storytelling",
    src: `${pageHeroBase}/home-echo-chen-ai-multimedia-storytelling.jpg`,
    sourcePath: `${pageHeroBase}/home-echo-chen-ai-multimedia-storytelling-source.png`,
    alt: {
      zh: "Echo Chen 首页视觉拼贴，包含 AI、多媒体、摄影与创作线索。",
      en: "Echo Chen home visual collage with AI, multimedia, photography, and creative signals."
    },
    label: {
      zh: "Home System",
      en: "Home System"
    },
    caption: {
      zh: "AI · Multimedia · Storytelling",
      en: "AI · Multimedia · Storytelling"
    }
  },
  writing: {
    id: "writing-essays-reflections-stories-notes",
    src: `${pageHeroBase}/writing-essays-reflections-stories-notes.jpg`,
    sourcePath: `${pageHeroBase}/writing-essays-reflections-stories-notes-source.png`,
    alt: {
      zh: "Writing 页面视觉，Echo 在书桌前写作，周围是笔记、书籍和影像碎片。",
      en: "Writing page visual showing Echo writing at a desk with notes, books, and image fragments."
    },
    label: {
      zh: "Writing",
      en: "Writing"
    },
    caption: {
      zh: "Essays · Reflections · Notes",
      en: "Essays · Reflections · Notes"
    }
  },
  photos: {
    id: "photos-moments-places-stories-archive",
    src: `${pageHeroBase}/photos-moments-places-stories-archive.jpg`,
    sourcePath: `${pageHeroBase}/photos-moments-places-stories-archive-source.png`,
    alt: {
      zh: "Photos 页面视觉，Echo 拿着相机，周围是香港、城市、自然和旅途照片。",
      en: "Photos page visual with Echo holding a camera, surrounded by Hong Kong, city, nature, and travel frames."
    },
    label: {
      zh: "Photo Archive",
      en: "Photo Archive"
    },
    caption: {
      zh: "Moments · Places · Stories",
      en: "Moments · Places · Stories"
    }
  },
  videos: {
    id: "videos-filmmaking-editing-visual-stories",
    src: `${pageHeroBase}/videos-filmmaking-editing-visual-stories.jpg`,
    sourcePath: `${pageHeroBase}/videos-filmmaking-editing-visual-stories-source.png`,
    alt: {
      zh: "Videos 页面视觉，Echo 在剪辑和制作视频，周围是 storyboard、胶片和时间线。",
      en: "Videos page visual showing Echo editing and producing videos with storyboards, film strips, and timelines."
    },
    label: {
      zh: "Video Studio",
      en: "Video Studio"
    },
    caption: {
      zh: "Filmmaking · Editing · Visual stories",
      en: "Filmmaking · Editing · Visual stories"
    }
  },
  projects: {
    id: "projects-system-overview-dossier",
    src: `${pageHeroBase}/projects-system-overview-dossier.jpg`,
    sourcePath: `${pageHeroBase}/projects-system-overview-dossier-source.png`,
    alt: {
      zh: "Projects 页面视觉，Echo 在系统设计桌面前工作，周围是架构图、技术栈和多媒体流程。",
      en: "Projects page visual showing Echo working at a systems desk with architecture diagrams, tech stack, and multimedia pipelines."
    },
    label: {
      zh: "Project Dossier",
      en: "Project Dossier"
    },
    caption: {
      zh: "Systems · Data · Storytelling",
      en: "Systems · Data · Storytelling"
    }
  },
  awards: {
    id: "awards-recognition-milestones-achievements",
    src: `${pageHeroBase}/awards-recognition-milestones-achievements.jpg`,
    sourcePath: `${pageHeroBase}/awards-recognition-milestones-achievements-source.png`,
    alt: {
      zh: "Awards 页面视觉，Echo 站在奖项、证书和项目成功证据墙前。",
      en: "Awards page visual showing Echo standing in front of awards, certificates, and project evidence."
    },
    label: {
      zh: "Evidence Board",
      en: "Evidence Board"
    },
    caption: {
      zh: "Recognition · Milestones · Achievements",
      en: "Recognition · Milestones · Achievements"
    }
  },
  about: {
    id: "about-me-profile-dossier-board",
    src: `${pageHeroBase}/about-me-profile-dossier-board.jpg`,
    sourcePath: `${pageHeroBase}/about-me-profile-dossier-board-source.png`,
    alt: {
      zh: "About 页面视觉，Echo 的个人档案墙，包含技术、写作、摄影、教育和协作线索。",
      en: "About page visual showing Echo's profile dossier wall with technology, writing, photography, education, and collaboration signals."
    },
    label: {
      zh: "Profile Dossier",
      en: "Profile Dossier"
    },
    caption: {
      zh: "Curious · Creative · Growing",
      en: "Curious · Creative · Growing"
    }
  },
  contact: {
    id: "contact-say-hello-collaborate-connect",
    src: `${pageHeroBase}/contact-say-hello-collaborate-connect.jpg`,
    sourcePath: `${pageHeroBase}/contact-say-hello-collaborate-connect-source.png`,
    alt: {
      zh: "Contact 页面视觉，Echo 在桌前挥手，旁边有消息、邮件和协作符号。",
      en: "Contact page visual showing Echo waving at a desk with message, email, and collaboration symbols."
    },
    label: {
      zh: "Contact",
      en: "Contact"
    },
    caption: {
      zh: "Say hello · Collaborate · Connect",
      en: "Say hello · Collaborate · Connect"
    }
  }
};

export const getPageHeroVisual = pageKey => pageHeroVisuals[pageKey] || null;
