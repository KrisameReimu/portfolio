import React from "react";
import {Navigate} from "react-router-dom";
import HomePage from "../pages/HomePage";
import LabPillarPage from "../pages/LabPillarPage";
import GameDevPage from "../pages/GameDevPage";
import VideoPage from "../pages/VideoPage";
import VideoYearPage from "../pages/VideoYearPage";
import AwardsPage from "../pages/AwardsPage";
import PhotoArchivePage from "../pages/PhotoArchivePage";
import PhotoYearPage from "../pages/PhotoYearPage";
import WritingPage from "../pages/WritingPage";
import WritingYearPage from "../pages/WritingYearPage";
import ArticlePage from "../pages/ArticlePage";
import AboutPage from "../pages/AboutPage";
import Contact from "../sections/contact/Contact";

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
    path: "/game-dev",
    element: <GameDevPage />,
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
    element: <Navigate to="/about" replace />,
    navGroup: "secondary"
  },
  {
    path: "/roadmap",
    element: <Navigate to="/game-dev" replace />,
    navGroup: "secondary"
  },
  {
    path: "/dashboard",
    element: <Navigate to="/about" replace />,
    navGroup: "secondary"
  },
  {
    path: "/ask",
    element: <Navigate to="/contact" replace />,
    navGroup: "secondary"
  },
  {
    path: "/community",
    element: <Navigate to="/about" replace />,
    navGroup: "secondary"
  },
  {
    path: "/favorites",
    element: <Navigate to="/writing" replace />,
    navGroup: "secondary"
  },
  {
    path: "/lab/:pillar",
    element: <LabPillarPage />,
    navGroup: "detail"
  },
  {
    path: "/lab",
    element: <Navigate to="/game-dev" replace />,
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
    path: "/photography",
    element: <Navigate to="/photos" replace />,
    navGroup: "alias"
  }
];

export const primaryNavRoutes = siteRoutes.filter(
  route => route.navGroup === "primary"
);
