import React from "react";
import {Navigate} from "react-router-dom";
import HomePage from "../pages/HomePage";
import NowPage from "../pages/NowPage";
import LabPage from "../pages/LabPage";
import LabPillarPage from "../pages/LabPillarPage";
import RoadmapPage from "../pages/RoadmapPage";
import DashboardPage from "../pages/DashboardPage";
import AskPage from "../pages/AskPage";
import GameDevPage from "../pages/GameDevPage";
import VideoPage from "../pages/VideoPage";
import VideoYearPage from "../pages/VideoYearPage";
import AwardsPage from "../pages/AwardsPage";
import PhotoArchivePage from "../pages/PhotoArchivePage";
import PhotoYearPage from "../pages/PhotoYearPage";
import WritingPage from "../pages/WritingPage";
import WritingYearPage from "../pages/WritingYearPage";
import ArticlePage from "../pages/ArticlePage";
import CommunityPage from "../pages/CommunityPage";
import FavoritesPage from "../pages/FavoritesPage";
import AboutPage from "../pages/AboutPage";
import Contact from "../containers/contact/Contact";

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
    path: "/lab",
    element: <LabPage />,
    navLabel: "Lab",
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
    element: <RoadmapPage />,
    navGroup: "secondary"
  },
  {
    path: "/dashboard",
    element: <DashboardPage />,
    navGroup: "secondary"
  },
  {
    path: "/ask",
    element: <AskPage />,
    navGroup: "secondary"
  },
  {
    path: "/community",
    element: <CommunityPage />,
    navGroup: "secondary"
  },
  {
    path: "/favorites",
    element: <FavoritesPage />,
    navGroup: "secondary"
  },
  {
    path: "/lab/:pillar",
    element: <LabPillarPage />,
    navGroup: "detail"
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
