import React, {useEffect, useMemo, useState} from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import ScrollToTop from "../components/ScrollToTop";
import SplashScreen from "./splashScreen/SplashScreen";
import CharacterNPC from "../components/characterNPC/CharacterNPC";
import {characterSection, splashScreen} from "../portfolio";
import {StyleProvider} from "../contexts/StyleContext";
import LanguageContext from "../contexts/LanguageContext";
import {useLocalStorage} from "../hooks/useLocalStorage";
import {AuthProvider} from "../contexts/AuthContext";
import {CommunityProvider} from "../contexts/CommunityContext";
import RouteAnalytics from "../components/RouteAnalytics";
import {siteRoutes} from "../config/routes";
import "./Main.scss";

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
                    {siteRoutes.map(route => (
                      <Route
                        key={route.path}
                        path={route.path}
                        element={route.element}
                      />
                    ))}
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
