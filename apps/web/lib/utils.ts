type LocalizedText =
  | string
  | null
  | undefined
  | {
      zh?: string | null;
      en?: string | null;
    };

export const pickText = (value: LocalizedText) => {
  if (!value) return "";
  if (typeof value === "string") return value;
  return value.zh || value.en || "";
};

export const toPlainText = (value: string) =>
  value
    .replace(/[#>*_`~-]/g, " ")
    .replace(/\[(.*?)\]\((.*?)\)/g, "$1")
    .replace(/\s+/g, " ")
    .trim();

export const formatDate = (value?: string) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "numeric"
  }).format(date);
};

export const ensureAbsoluteUrl = (path: string) => {
  if (!path) return path;
  if (/^https?:\/\//i.test(path)) return path;
  return path.startsWith("/") ? path : `/${path}`;
};
