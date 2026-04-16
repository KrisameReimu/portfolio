import React, {useEffect, useMemo, useState} from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import ScrollToTop from "../components/ScrollToTop";
import SplashScreen from "./splashScreen/SplashScreen";
import CharacterNPC from "../components/characterNPC/CharacterNPC";
import HomePage from "../pages/HomePage";
import GameDevPage from "../pages/GameDevPage";
import VideoPage from "../pages/VideoPage";
import VideoYearPage from "../pages/VideoYearPage";
import PhotoArchivePage from "../pages/PhotoArchivePage";
import PhotoYearPage from "../pages/PhotoYearPage";
import WritingPage from "../pages/WritingPage";
import WritingYearPage from "../pages/WritingYearPage";
import AboutPage from "../pages/AboutPage";
import ArticlePage from "../pages/ArticlePage";
import NowPage from "../pages/NowPage";
import LabPage from "../pages/LabPage";
import LabPillarPage from "../pages/LabPillarPage";
import RoadmapPage from "../pages/RoadmapPage";
import DashboardPage from "../pages/DashboardPage";
import AskPage from "../pages/AskPage";
import Contact from "./contact/Contact";
import {characterSection, splashScreen} from "../portfolio";
import {StyleProvider} from "../contexts/StyleContext";
import LanguageContext from "../contexts/LanguageContext";
import {useLocalStorage} from "../hooks/useLocalStorage";
import {AuthProvider} from "../contexts/AuthContext";
import AuthContext from "../contexts/AuthContext";
import {CommunityProvider} from "../contexts/CommunityContext";
import FavoritesPage from "../pages/FavoritesPage";
import CommunityPage from "../pages/CommunityPage";
import RouteAnalytics from "../components/RouteAnalytics";
import "./Main.scss";

const OwnerRoute = ({children}) => {
  const {isOwner} = React.useContext(AuthContext);
  if (!isOwner) {
    return <Navigate to="/" replace />;
  }
  return children;
};

const Main = () => {
  const darkPref = window.matchMedia("(prefers-color-scheme: dark)");
  const [isDark, setIsDark] = useLocalStorage("isDark", darkPref.matches);
  const browserLanguage = useMemo(() => {
    const rawLanguage =
      window.navigator.language || window.navigator.languages?.[0] || "en";
    return rawLanguage.toLowerCase().startsWith("zh") ? "zh" : "en";
  }, []);
  const [language, setLanguage] = useState(browserLanguage);
  const [isShowingSplashAnimation, setIsShowingSplashAnimation] =
    useState(true);

  useEffect(() => {
    if (splashScreen.enabled) {
      const splashTimer = setTimeout(
        () => setIsShowingSplashAnimation(false),
        splashScreen.duration
      );
      return () => {
        clearTimeout(splashTimer);
      };
    }
  }, []);

  const changeTheme = () => {
    setIsDark(!isDark);
  };

  const toggleLanguage = () => {
    setLanguage(language === "zh" ? "en" : "zh");
  };

  return (
    <div className={isDark ? "dark-mode" : null}>
      <LanguageContext.Provider value={{language, setLanguage, toggleLanguage}}>
        <StyleProvider value={{isDark: isDark, changeTheme: changeTheme}}>
          <AuthProvider>
            <CommunityProvider>
              {isShowingSplashAnimation && splashScreen.enabled ? (
                <SplashScreen />
              ) : (
                <Router>
                  <ScrollToTop />
                  <RouteAnalytics />
                  <Header />
                  {characterSection.display && <CharacterNPC />}
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/now" element={<NowPage />} />
                    <Route path="/lab" element={<LabPage />} />
                    <Route path="/lab/:pillar" element={<LabPillarPage />} />
                    <Route path="/roadmap" element={<RoadmapPage />} />
                    <Route
                      path="/dashboard"
                      element={
                        <OwnerRoute>
                          <DashboardPage />
                        </OwnerRoute>
                      }
                    />
                    <Route path="/ask" element={<AskPage />} />
                    <Route path="/game-dev" element={<GameDevPage />} />
                    <Route path="/videos" element={<VideoPage />} />
                    <Route path="/videos/:year" element={<VideoYearPage />} />
                    <Route
                      path="/photography"
                      element={<Navigate to="/photos" replace />}
                    />
                    <Route path="/photos" element={<PhotoArchivePage />} />
                    <Route path="/photos/:year" element={<PhotoYearPage />} />
                    <Route path="/writing" element={<WritingPage />} />
                    <Route
                      path="/writing/:year"
                      element={<WritingYearPage />}
                    />
                    <Route path="/articles/:slug" element={<ArticlePage />} />
                    <Route path="/community" element={<CommunityPage />} />
                    <Route path="/favorites" element={<FavoritesPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/contact" element={<Contact />} />
                  </Routes>
                  <Footer />
                </Router>
              )}
            </CommunityProvider>
          </AuthProvider>
        </StyleProvider>
      </LanguageContext.Provider>
    </div>
  );
};

export default Main;
