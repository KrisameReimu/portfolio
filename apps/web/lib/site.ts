export const siteMeta = {
  siteName: "Echo Chen",
  ownerName: "Echo Chen",
  ownerNameZh: "陈琛",
  siteUrl: "https://www.chenchen-echo.com",
  defaultTitle: "Echo Chen 陈琛 | AI × Multimedia Storyteller",
  defaultDescription:
    "Echo Chen (陈琛) — AI developer, multimedia storyteller, and writer building a long-term archive of projects, essays, and visual work.",
  defaultOgImage: "/android-chrome-384x384.png",
  navItems: [
    {href: "/", label: "Home"},
    {href: "/writing", label: "Writing"},
    {href: "/multimedia", label: "Multimedia"},
    {href: "/projects", label: "Projects"},
    {href: "/about", label: "About"},
    {href: "/contact", label: "Contact"}
  ],
  externalLinks: {
    github: "https://github.com/KrisameReimu",
    linkedin: "https://www.linkedin.com/in/chenchenai/",
    youtube: "https://www.youtube.com/@KrisameReimu",
    instagram: "https://www.instagram.com/krisame_reimu/",
    email: "chen944420634@gmail.com",
    resume: "https://img.chenchen-echo.com/chenchen-personal-cv.pdf"
  }
} as const;

export const homeCopy = {
  tagline: "AI × Multimedia Storyteller",
  title: "A long-term archive of writing, projects, and visual work.",
  intro:
    "I build AI-supported systems, document how they work, and turn technical or creative work into something clearer, calmer, and more worth keeping.",
  positioning:
    "This site is the canonical home for my essays, engineering case studies, and visual archive.",
  rail: [
    {
      title: "Canonical source",
      body: "The website keeps the durable version of essays, project dossiers, and identity context instead of treating social platforms as the archive."
    },
    {
      title: "Current focus",
      body: "Static-first writing and project pages come before extra experiments, because stable URLs and readable HTML are the long-term asset."
    },
    {
      title: "AI-readable surface",
      body: "Metadata, structured data, sitemap, RSS, and llms.txt help the site stay quotable for search and AI systems."
    }
  ],
  recognition: [
    "PolyU AI systems and student workflow delivery",
    "Sasagawa Cup Japan Writing Contest 2024 — Second Prize",
    "HK videos Competition — Golden / Special Award work"
  ]
};

export const aboutCopy = {
  summary:
    "I work across AI systems, multimedia storytelling, and long-form writing. What connects them is not a generic personal brand, but a habit of turning complex work into structures people can actually use, read, and remember.",
  profileSignals: [
    {
      title: "AI systems and product delivery",
      body: "I build and stabilize educational AI systems, product flows, and integration layers that can be shown, explained, and maintained."
    },
    {
      title: "Writing as long-term evidence",
      body: "Writing is not filler here. It is where reflection, argument, and author voice stay visible over time."
    },
    {
      title: "Multimedia as communication proof",
      body: "Videos, posters, and competition work are direct evidence that I can turn dense material into narrative output."
    }
  ],
  recognition: [
    "Sasagawa Cup Japan Writing Contest 2024 — Second Prize",
    "HK videos Competition — Golden / Special Award work",
    "Oxford AI and Machine Learning Program, Summer 2024"
  ],
  tools: ["Next.js", "React", "TypeScript", "Python", "Flask", "Azure OpenAI"]
};

export const contactCopy = {
  title: "Contact",
  summary:
    "Reach out for projects, research support, multimedia collaboration, or anything that starts with real work and a clear reason to talk.",
  wechatTitle: "WeChat Official Account",
  wechatSummary: "Scan for article and project updates.",
  note: "This page stays low-friction on purpose. Email is the primary contact path."
};

export const routeCompatibility = {
  photos: "/multimedia/photos",
  videos: "/multimedia/videos",
  awards: "/about#recognition",
  now: "/about#now"
} as const;
