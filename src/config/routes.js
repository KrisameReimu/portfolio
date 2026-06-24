import React from "react";
import {Navigate} from "react-router-dom";
import HomePage from "../pages/HomePage";
import ProjectPage from "../pages/ProjectPage";
import MultimediaPage from "../pages/MultimediaPage";
import VideoPage from "../pages/VideoPage";
import VideoYearPage from "../pages/VideoYearPage";
import AwardsPage from "../pages/AwardsPage";
import PhotoArchivePage from "../pages/PhotoArchivePage";
import PhotoYearPage from "../pages/PhotoYearPage";
import WritingPage from "../pages/WritingPage";
import WritingYearPage from "../pages/WritingYearPage";
import ArticlePage from "../pages/ArticlePage";
import ProjectDetailPage from "../pages/ProjectDetailPage";
import AboutPage from "../pages/AboutPage";
import NowPage from "../pages/NowPage";
import ContactPage from "../pages/ContactPage";
import {greeting, contactInfo} from "../portfolio";
import {writingPageCopy} from "./pages/writingPage";
import {photosPageCopy} from "./pages/photosPage";
import {multimediaPageCopy} from "./pages/multimediaPage";
import {projectsPageCopy} from "./pages/projectsPage";
import {aboutPageCopy} from "./pages/aboutPage";
import {nowPageFallbackState, nowPageCopy} from "./pages/nowPage";
import {videosPageCopy} from "./pages/videosPage";

const redirectTo = path => <Navigate to={path} replace />;

export const siteRoutes = [
  {
    path: "/",
    element: <HomePage />,
    navLabel: "Home",
    navGroup: "primary",
    meta: {
      title: "Echo Chen 陈琛 | AI × Multimedia Storyteller",
      description: greeting.subTitle
    }
  },
  {
    path: "/writing",
    element: <WritingPage />,
    navLabel: "Writing",
    navGroup: "primary",
    meta: {
      title: writingPageCopy.title,
      description: writingPageCopy.lead
    }
  },
  {
    path: "/multimedia",
    element: <MultimediaPage />,
    navLabel: "Multimedia",
    navGroup: "primary",
    meta: {
      title: {
        zh: "Multimedia",
        en: "Multimedia"
      },
      description: multimediaPageCopy.hero.subtitle
    }
  },
  {
    path: "/photos",
    element: <PhotoArchivePage />,
    navLabel: "Photos",
    navGroup: "secondary",
    meta: {
      title: photosPageCopy.title,
      description: photosPageCopy.subtitle
    }
  },
  {
    path: "/multimedia/photos",
    element: <PhotoArchivePage />,
    navGroup: "secondary",
    meta: {
      title: photosPageCopy.title,
      description: photosPageCopy.subtitle
    }
  },
  {
    path: "/videos",
    element: <VideoPage />,
    navLabel: "Videos",
    navGroup: "secondary",
    meta: {
      title: videosPageCopy.title,
      description: videosPageCopy.description
    }
  },
  {
    path: "/multimedia/videos",
    element: <VideoPage />,
    navGroup: "secondary",
    meta: {
      title: videosPageCopy.title,
      description: videosPageCopy.description
    }
  },
  {
    path: "/multimedia/ai-visuals",
    element: redirectTo("/multimedia"),
    navGroup: "alias"
  },
  {
    path: "/multimedia/process",
    element: redirectTo("/multimedia"),
    navGroup: "alias"
  },
  {
    path: "/projects",
    element: <ProjectPage />,
    navLabel: "Projects",
    navGroup: "primary",
    meta: {
      title: projectsPageCopy.hero.title,
      description: projectsPageCopy.hero.description
    }
  },
  {
    path: "/awards",
    element: <AwardsPage />,
    navLabel: "Awards",
    navGroup: "secondary"
  },
  {
    path: "/about",
    element: <AboutPage />,
    navLabel: "About",
    navGroup: "primary",
    meta: {
      title: aboutPageCopy.title,
      description: aboutPageCopy.intro
    }
  },
  {
    path: "/contact",
    element: <ContactPage />,
    navLabel: "Contact",
    navGroup: "primary",
    meta: {
      title: contactInfo.title,
      description: contactInfo.subtitle
    }
  },
  {
    path: "/now",
    element: <NowPage />,
    navGroup: "secondary",
    meta: {
      title: nowPageCopy.kicker,
      description: nowPageFallbackState.focus
    }
  },
  {
    path: "/roadmap",
    element: redirectTo("/projects"),
    navGroup: "secondary"
  },
  {
    path: "/dashboard",
    element: redirectTo("/about"),
    navGroup: "secondary"
  },
  {
    path: "/ask",
    element: redirectTo("/contact"),
    navGroup: "secondary"
  },
  {
    path: "/community",
    element: redirectTo("/about"),
    navGroup: "secondary"
  },
  {
    path: "/favorites",
    element: redirectTo("/writing"),
    navGroup: "secondary"
  },
  {
    path: "/lab",
    element: redirectTo("/projects"),
    navGroup: "alias"
  },
  {
    path: "/lab/:pillar",
    element: redirectTo("/projects"),
    navGroup: "alias"
  },
  {
    path: "/game-dev",
    element: redirectTo("/projects"),
    navGroup: "alias"
  },
  {
    path: "/videos/:year",
    element: <VideoYearPage />,
    navGroup: "detail",
    meta: ({params}) => ({
      title: {
        zh: `${params.year} 影像精选`,
        en: `${params.year} Video Highlights`
      },
      description: {
        zh: "这一年的影像作品与视觉实验。",
        en: "Visual works and experiments from the year."
      }
    })
  },
  {
    path: "/multimedia/videos/:year",
    element: <VideoYearPage />,
    navGroup: "detail",
    meta: ({params}) => ({
      title: {
        zh: `${params.year} 影像精选`,
        en: `${params.year} Video Highlights`
      },
      description: {
        zh: "这一年的影像作品与视觉实验。",
        en: "Visual works and experiments from the year."
      }
    })
  },
  {
    path: "/photos/:year",
    element: <PhotoYearPage />,
    navGroup: "detail",
    meta: ({params}) => ({
      title: {
        zh: `${params.year} 摄影精选`,
        en: `${params.year} Photo Highlights`
      },
      description: {
        zh: "这一年的城市、人物与自然片段。",
        en: "Urban, portrait, and nature moments from the year."
      }
    })
  },
  {
    path: "/multimedia/photos/:year",
    element: <PhotoYearPage />,
    navGroup: "detail",
    meta: ({params}) => ({
      title: {
        zh: `${params.year} 摄影精选`,
        en: `${params.year} Photo Highlights`
      },
      description: {
        zh: "这一年的城市、人物与自然片段。",
        en: "Urban, portrait, and nature moments from the year."
      }
    })
  },
  {
    path: "/writing/:year",
    element: <WritingYearPage />,
    navGroup: "detail",
    meta: ({params}) => ({
      title: {
        zh: `${params.year} 写作精选`,
        en: `${params.year} Writing Highlights`
      },
      description: {
        zh: "这一年的思考、记录与技术观察。",
        en: "Essays, reflections, and technical notes from the year."
      }
    })
  },
  {
    path: "/articles/:slug",
    element: <ArticlePage />,
    navGroup: "detail"
  },
  {
    path: "/projects/:slug",
    element: <ProjectDetailPage />,
    navGroup: "detail"
  },
  {
    path: "/photography",
    element: redirectTo("/photos"),
    navGroup: "alias"
  }
];

export const primaryNavRoutes = siteRoutes.filter(
  route => route.navGroup === "primary"
);
