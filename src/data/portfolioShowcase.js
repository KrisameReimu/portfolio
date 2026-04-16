// Portfolio MVP data source
// Update this file only to refresh homepage content.

export const portfolioHero = {
  name: "CHEN CHEN",
  role: {
    zh: "Portfolio of AI x Multimedia",
    en: "Portfolio of AI x Multimedia"
  },
  intro: {
    zh: "This site is a curated portfolio of my videos, coding projects, and visual stories. The CV is available separately as PDF.",
    en: "This site is a curated portfolio of my videos, coding projects, and visual stories. The CV is available separately as PDF."
  }
};

// Replace these with real YouTube links and production metadata.
export const portfolioVideos = [
  {
    id: "video-1",
    title: "Main Showcase Video",
    description: "Primary portfolio showcase video",
    meta: "YouTube Unlisted | Main Showcase",
    href: "https://youtu.be/uvdpACbEzjY"
  },
  {
    id: "video-2",
    title: "EIE2S02 Bridge The Digital Divided 5min",
    description: "Unlisted portfolio demo video (new upload)",
    meta: "YouTube Unlisted | 5:46",
    href: "https://youtu.be/DyRmvonFSP8"
  },
  {
    id: "video-3",
    title: "Featured Video 3",
    description: "Additional portfolio video highlight",
    meta: "YouTube Unlisted | Featured",
    href: "https://youtu.be/XjL2Tw4EoBs"
  }
];

// Keep each project short: value + stack + one action link.
export const portfolioProjects = [
  {
    id: "project-1",
    title: "GenAI Feedback System",
    subtitle: "Flask + React + Azure API",
    detail: "Replace with your strongest technical case study and demo link",
    to: "/lab"
  },
  {
    id: "project-2",
    title: "Game/Interactive Build",
    subtitle: "Unity / Web Interaction",
    detail: "Replace with gameplay trailer, architecture notes, and your role",
    to: "/game-dev"
  }
];

// Start with 2-4 strong visual series, then expand gradually.
export const portfolioPhotos = [
  {
    id: "photo-1",
    title: "Photo Story Placeholder A",
    detail: "Replace with your visual series cover",
    to: "/photos"
  },
  {
    id: "photo-2",
    title: "Photo Story Placeholder B",
    detail: "Replace with your best portrait / urban / narrative set",
    to: "/photos"
  }
];
