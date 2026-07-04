import type {Metadata} from "next";
import {siteMeta} from "./site";

type MetaInput = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  type?: "article" | "profile" | "website";
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
  image = siteMeta.defaultOgImage,
  type = "website"
}: MetaInput = {}): Metadata => {
  const resolvedTitle = buildTitle(title);
  const resolvedDescription = description || siteMeta.defaultDescription;
  const url = buildUrl(path);

  return {
    metadataBase: new URL(siteMeta.siteUrl),
    title: resolvedTitle,
    description: resolvedDescription,
    robots: {
      index: true,
      follow: true
    },
    alternates: {
      canonical: url
    },
    openGraph: {
      title: resolvedTitle,
      description: resolvedDescription,
      url,
      siteName: siteMeta.siteName,
      type,
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
