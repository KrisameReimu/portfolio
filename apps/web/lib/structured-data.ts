import {siteMeta} from "./site";

type BreadcrumbItem = {
  name: string;
  path: string;
};

type ItemListItem = {
  name: string;
  path: string;
  description?: string;
};

export const createBreadcrumbJsonLd = (items: BreadcrumbItem[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: `${siteMeta.siteUrl}${item.path === "/" ? "" : item.path}`
  }))
});

export const createItemListJsonLd = (
  name: string,
  items: ItemListItem[]
) => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  name,
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    url: `${siteMeta.siteUrl}${item.path === "/" ? "" : item.path}`,
    name: item.name,
    description: item.description
  }))
});
