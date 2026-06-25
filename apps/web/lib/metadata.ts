import type {Metadata} from "next";
import {siteMeta} from "./site";

type MetaInput = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
};

const buildTitle = (title?: string) =>
  title && title !== siteMeta.defaultTitle
    ? `${title} | ${siteMeta.siteName}`
    : siteMeta.defaultTitle;

const buildUrl = (path = "/") =>
  `${siteMeta.siteUrl}${path === "/" ? "" : path}`;

export const createMetadata = ({
  title,
  description,
  path = "/",
  image = siteMeta.defaultOgImage
}: MetaInput = {}): Metadata => {
  const resolvedTitle = buildTitle(title);
  const resolvedDescription = description || siteMeta.defaultDescription;
  const url = buildUrl(path);

  return {
    title: resolvedTitle,
    description: resolvedDescription,
    alternates: {
      canonical: url
    },
    openGraph: {
      title: resolvedTitle,
      description: resolvedDescription,
      url,
      siteName: siteMeta.siteName,
      type: "website",
      images: [
        {
          url: `${siteMeta.siteUrl}${image}`
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description: resolvedDescription,
      images: [`${siteMeta.siteUrl}${image}`]
    }
  };
};
