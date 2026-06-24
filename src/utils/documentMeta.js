import siteMeta from "../config/siteMeta";

const getAbsoluteUrl = value => {
  if (!value) {
    return `${siteMeta.siteUrl}${window.location.pathname}`;
  }

  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  return `${siteMeta.siteUrl}${value.startsWith("/") ? value : `/${value}`}`;
};

const ensureMetaTag = attributes => {
  const selector = Object.entries(attributes)
    .map(([key, value]) => `meta[${key}="${value}"]`)
    .join("");
  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement("meta");
    Object.entries(attributes).forEach(([key, value]) => {
      element.setAttribute(key, value);
    });
    document.head.appendChild(element);
  }

  return element;
};

const ensureCanonicalLink = () => {
  let element = document.head.querySelector('link[rel="canonical"]');

  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", "canonical");
    document.head.appendChild(element);
  }

  return element;
};

export const buildDocumentTitle = title => {
  if (!title || title === siteMeta.defaultTitle) {
    return siteMeta.defaultTitle;
  }

  return `${title} | ${siteMeta.titleSuffix}`;
};

export const applyDocumentMeta = ({
  title,
  description,
  image,
  url,
  lang = "en",
  type = "website"
}) => {
  const resolvedTitle = buildDocumentTitle(title);
  const resolvedDescription = description || siteMeta.defaultDescription;
  const resolvedImage = getAbsoluteUrl(image || siteMeta.defaultSocialImage);
  const resolvedUrl = getAbsoluteUrl(url || window.location.pathname);

  document.title = resolvedTitle;
  document.documentElement.setAttribute("lang", lang);

  ensureMetaTag({name: "description"}).setAttribute(
    "content",
    resolvedDescription
  );
  ensureMetaTag({name: "title"}).setAttribute("content", resolvedTitle);
  ensureMetaTag({property: "og:type"}).setAttribute("content", type);
  ensureMetaTag({property: "og:url"}).setAttribute("content", resolvedUrl);
  ensureMetaTag({property: "og:title"}).setAttribute("content", resolvedTitle);
  ensureMetaTag({property: "og:description"}).setAttribute(
    "content",
    resolvedDescription
  );
  ensureMetaTag({property: "og:image"}).setAttribute("content", resolvedImage);
  ensureMetaTag({property: "twitter:card"}).setAttribute(
    "content",
    "summary_large_image"
  );
  ensureMetaTag({property: "twitter:url"}).setAttribute("content", resolvedUrl);
  ensureMetaTag({property: "twitter:title"}).setAttribute(
    "content",
    resolvedTitle
  );
  ensureMetaTag({property: "twitter:description"}).setAttribute(
    "content",
    resolvedDescription
  );
  ensureMetaTag({property: "twitter:image"}).setAttribute(
    "content",
    resolvedImage
  );
  ensureCanonicalLink().setAttribute("href", resolvedUrl);
};
