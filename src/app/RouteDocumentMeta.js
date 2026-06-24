import {useContext, useMemo} from "react";
import {matchPath, useLocation} from "react-router-dom";
import LanguageContext from "../contexts/LanguageContext";
import {getText} from "../utils/i18n";
import usePageMeta from "../hooks/usePageMeta";

const getMatchedRoute = (routes, pathname) => {
  return routes
    .filter(route => route.meta)
    .map(route => ({
      route,
      match: matchPath({path: route.path, end: true}, pathname)
    }))
    .filter(result => result.match)
    .sort((left, right) => right.route.path.length - left.route.path.length)[0];
};

export default function RouteDocumentMeta({routes}) {
  const location = useLocation();
  const {language} = useContext(LanguageContext);

  const meta = useMemo(() => {
    const matchedRoute = getMatchedRoute(routes, location.pathname);

    if (!matchedRoute) return null;

    const rawMeta =
      typeof matchedRoute.route.meta === "function"
        ? matchedRoute.route.meta({
            params: matchedRoute.match.params,
            pathname: location.pathname
          })
        : matchedRoute.route.meta;

    if (!rawMeta) return null;

    return {
      title: getText(rawMeta.title, language),
      description: getText(rawMeta.description, language),
      image: rawMeta.image,
      url: rawMeta.url || location.pathname,
      type: rawMeta.type,
      lang: language === "zh" ? "zh" : "en"
    };
  }, [language, location.pathname, routes]);

  usePageMeta(meta);
  return null;
}
