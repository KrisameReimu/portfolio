import React from "react";
import {Navigate} from "react-router-dom";
import HomePage from "../pages/HomePage";
import ProjectPage from "../pages/ProjectPage";
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
import Contact from "../sections/contact/Contact";

const redirectTo = path => <Navigate to={path} replace />;

export const siteRoutes = [
  {
    path: "/",
    element: <HomePage />,
    navLabel: "Home",
    navGroup: "primary"
  },
  {
    path: "/writing",
    element: <WritingPage />,
    navLabel: "Writing",
    navGroup: "primary"
  },
  {
    path: "/photos",
    element: <PhotoArchivePage />,
    navLabel: "Photos",
    navGroup: "primary"
  },
  {
    path: "/videos",
    element: <VideoPage />,
    navLabel: "Videos",
    navGroup: "primary"
  },
  {
    path: "/projects",
    element: <ProjectPage />,
    navLabel: "Projects",
    navGroup: "primary"
  },
  {
    path: "/awards",
    element: <AwardsPage />,
    navLabel: "Awards",
    navGroup: "primary"
  },
  {
    path: "/about",
    element: <AboutPage />,
    navLabel: "About",
    navGroup: "primary"
  },
  {
    path: "/contact",
    element: <Contact />,
    navLabel: "Contact",
    navGroup: "primary"
  },
  {
    path: "/now",
    element: <NowPage />,
    navGroup: "secondary"
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
    navGroup: "detail"
  },
  {
    path: "/photos/:year",
    element: <PhotoYearPage />,
    navGroup: "detail"
  },
  {
    path: "/writing/:year",
    element: <WritingYearPage />,
    navGroup: "detail"
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
