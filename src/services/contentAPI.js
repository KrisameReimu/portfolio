/**
 * Content API Service Layer
 * 统一的内容获取接口，支持本地数据和远程CMS无缝切换
 *
 * 设计原则：
 * 1. 本地优先：开发和离线时使用本地数据
 * 2. CMS可选：生产环境可切换到CMS
 * 3. 优雅降级：CMS失败时回退到本地数据
 * 4. 保持个人IP特色：双语、分类、多媒体支持
 */

import {ContentTypes} from "../types/content.types";
import contentSchema from "../config/contentSchema.json";

// CMS配置 - 通过环境变量控制
const CMS_CONFIG = {
  enabled: process.env.REACT_APP_USE_CMS === "true",
  baseUrl: process.env.REACT_APP_CMS_URL || "http://localhost:1337",
  apiVersion: process.env.REACT_APP_CMS_API_VERSION || "v1",
  timeout: 5000 // 5秒超时
};

const PUBLIC_CONTENT = {
  articlesIndexUrl: "/content/index.json",
  articlesBaseUrl: "/content/articles",
  photosIndexUrl: "/content/photos.json",
  videosIndexUrl: "/content/videos.json",
  projectsIndexUrl: "/content/projects.json"
};

export const CONTENT_SOURCE_PRIORITY = contentSchema.contentSourcePriority;

let publicArticlesIndexCache = null;
let publicArticlesIndexPromise = null;
const publicIndexCache = {
  photos: null,
  videos: null,
  projects: null
};
const publicIndexPromise = {
  photos: null,
  videos: null,
  projects: null
};

const fetchWithTimeout = async (url, options = {}) => {
  const controller = new AbortController();
  const timeoutMs = options.timeoutMs ?? 5000;
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    return response;
  } finally {
    clearTimeout(timeoutId);
  }
};

const getPublicArticlesIndex = async () => {
  if (publicArticlesIndexCache) return publicArticlesIndexCache;
  if (publicArticlesIndexPromise) return publicArticlesIndexPromise;

  publicArticlesIndexPromise = (async () => {
    try {
      const response = await fetchWithTimeout(PUBLIC_CONTENT.articlesIndexUrl, {
        timeoutMs: 3000
      });
      if (!response.ok) return null;
      const data = await response.json();
      if (!Array.isArray(data)) return null;
      publicArticlesIndexCache = data;
      return publicArticlesIndexCache;
    } catch {
      return null;
    } finally {
      publicArticlesIndexPromise = null;
    }
  })();

  return publicArticlesIndexPromise;
};

const getPublicIndex = async (key, url) => {
  if (publicIndexCache[key]) return publicIndexCache[key];
  if (publicIndexPromise[key]) return publicIndexPromise[key];

  publicIndexPromise[key] = (async () => {
    try {
      const response = await fetchWithTimeout(url, {timeoutMs: 3000});
      if (!response.ok) return null;
      const data = await response.json();
      if (!Array.isArray(data)) return null;
      publicIndexCache[key] = data;
      return publicIndexCache[key];
    } catch {
      return null;
    } finally {
      publicIndexPromise[key] = null;
    }
  })();

  return publicIndexPromise[key];
};

const getPublicPhotosIndex = () =>
  getPublicIndex("photos", PUBLIC_CONTENT.photosIndexUrl);

const getPublicVideosIndex = () =>
  getPublicIndex("videos", PUBLIC_CONTENT.videosIndexUrl);

const getPublicProjectsIndex = () =>
  getPublicIndex("projects", PUBLIC_CONTENT.projectsIndexUrl);

const getPublicArticleMarkdown = async (id, language) => {
  const suffix = language === "en" ? "en" : "zh";
  const url = `${PUBLIC_CONTENT.articlesBaseUrl}/${id}.${suffix}.md`;
  try {
    const response = await fetchWithTimeout(url, {timeoutMs: 5000});
    if (!response.ok) return "";

    const contentType = response.headers.get("content-type") || "";
    const text = await response.text();

    // Dev/proxy fallbacks can sometimes return index.html with 200 for a
    // missing markdown file. Treat that as "missing content", not article body.
    if (
      contentType.includes("text/html") ||
      /^\s*<!doctype html>/i.test(text) ||
      /^\s*<html[\s>]/i.test(text)
    ) {
      return "";
    }

    return text;
  } catch {
    return "";
  }
};

// ====== 本地数据导入 ======
// 懒加载本地数据，按需加载以优化性能
const getLocalData = async type => {
  try {
    switch (type) {
      case ContentTypes.ARTICLE:
        return (await import("../data/writings")).default;
      case ContentTypes.PHOTO:
        return (await import("../data/photography")).default;
      case ContentTypes.VIDEO:
        return (await import("../data/videos")).default;
      case ContentTypes.GAME:
        return (await import("../data/gamedev")).default;
      case ContentTypes.WORK:
        return (await import("../portfolio")).workExperiences;
      case ContentTypes.EDUCATION:
        return (await import("../portfolio")).educationInfo;
      default:
        return null;
    }
  } catch (error) {
    console.warn(`Failed to load local data for ${type}:`, error);
    return null;
  }
};

// ====== CMS API调用 ======
const fetchFromCMS = async (endpoint, options = {}) => {
  if (!CMS_CONFIG.enabled) {
    throw new Error("CMS is not enabled");
  }

  const url = `${CMS_CONFIG.baseUrl}/api/${CMS_CONFIG.apiVersion}/${endpoint}`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), CMS_CONFIG.timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        ...options.headers
      }
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`CMS API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    clearTimeout(timeoutId);
    console.error("CMS fetch error:", error);
    throw error;
  }
};

// ====== 核心API方法 ======

/**
 * 获取文章列表
 * @param {Object} options - 查询选项
 * @param {string} options.category - 分类过滤
 * @param {boolean} options.featured - 是否只获取精选
 * @param {number} options.limit - 数量限制
 * @returns {Promise<Array>}
 */
export const getArticles = async (options = {}) => {
  try {
    if (CMS_CONFIG.enabled) {
      const queryParams = new URLSearchParams();
      if (options.category) queryParams.append("category", options.category);
      if (options.featured) queryParams.append("featured", "true");
      if (options.limit) queryParams.append("limit", options.limit);

      const data = await fetchFromCMS(`articles?${queryParams.toString()}`);
      return data.data || [];
    }
  } catch (error) {
    console.warn("Falling back to local articles data");
  }

  // Public content is the canonical authored source in normal development.
  // Bundled src/data remains as a legacy fallback until migration is complete.
  const publicIndex = await getPublicArticlesIndex();
  if (publicIndex) {
    let articles = [...publicIndex].sort((a, b) => {
      const da = new Date(a?.publishedDate || 0).getTime();
      const db = new Date(b?.publishedDate || 0).getTime();
      if (Number.isNaN(da) && Number.isNaN(db)) return 0;
      if (Number.isNaN(da)) return 1;
      if (Number.isNaN(db)) return -1;
      return db - da; // newest first
    });
    if (options.category) {
      articles = articles.filter(a => a.category === options.category);
    }
    if (options.featured) {
      articles = articles.filter(a => a.featured);
    }
    if (options.limit) {
      articles = articles.slice(0, options.limit);
    }
    return articles;
  }

  // 回退到本地数据
  const localData = await getLocalData(ContentTypes.ARTICLE);
  if (!localData) return [];

  let articles = localData.articles || [];

  // 应用过滤
  if (options.category) {
    articles = articles.filter(a => a.category === options.category);
  }
  if (options.featured) {
    articles = articles.filter(a => a.featured);
  }
  if (options.limit) {
    articles = articles.slice(0, options.limit);
  }

  return articles;
};

/**
 * 获取单篇文章详情
 * @param {string} id - 文章ID
 * @returns {Promise<Object|null>}
 */
export const getArticleById = async id => {
  try {
    if (CMS_CONFIG.enabled) {
      const data = await fetchFromCMS(`articles/${id}`);
      return data.data || null;
    }
  } catch (error) {
    console.warn("Falling back to local article data");
  }

  const publicIndex = await getPublicArticlesIndex();
  const publicArticle = publicIndex?.find(a => a.id === id) || null;
  if (publicArticle) {
    const contentZh = await getPublicArticleMarkdown(publicArticle.id, "zh");
    const contentEn = await getPublicArticleMarkdown(publicArticle.id, "en");
    return {
      ...publicArticle,
      content_zh: contentZh,
      content_en: contentEn
    };
  }

  const localData = await getLocalData(ContentTypes.ARTICLE);
  const articles = localData?.articles || [];
  return articles.find(a => a.id === id) || null;
};

/**
 * 通过 slug 获取文章（适用于详情页路由）
 * @param {string} slug
 * @returns {Promise<Object|null>}
 */
export const getArticleBySlug = async slug => {
  try {
    if (CMS_CONFIG.enabled) {
      // Strapi v4 常用过滤方式：/api/articles?filters[slug][$eq]=my-slug
      const query = new URLSearchParams({[`filters[slug][$eq]`]: slug});
      const data = await fetchFromCMS(`articles?${query.toString()}`);
      const item = data.data?.[0];
      return item || null;
    }
  } catch (error) {
    console.warn("Falling back to local article by slug");
  }

  const publicIndex = await getPublicArticlesIndex();
  const publicArticle =
    publicIndex?.find(a => a.id === slug || a.slug === slug) || null;
  if (publicArticle) {
    const contentZh = await getPublicArticleMarkdown(publicArticle.id, "zh");
    const contentEn = await getPublicArticleMarkdown(publicArticle.id, "en");
    return {
      ...publicArticle,
      content_zh: contentZh,
      content_en: contentEn
    };
  }

  const localData = await getLocalData(ContentTypes.ARTICLE);
  const articles = localData?.articles || [];
  return articles.find(a => a.id === slug) || null; // 本地id即slug
};

/**
 * 获取照片列表
 * @param {Object} options - 查询选项
 * @param {string} options.category - 分类（urban/portrait/nature）
 * @param {number} options.limit - 数量限制
 * @returns {Promise<Array>}
 */
export const getPhotos = async (options = {}) => {
  try {
    if (CMS_CONFIG.enabled) {
      const queryParams = new URLSearchParams();
      if (options.category) queryParams.append("category", options.category);
      if (options.limit) queryParams.append("limit", options.limit);

      const data = await fetchFromCMS(`photos?${queryParams.toString()}`);
      return data.data || [];
    }
  } catch (error) {
    console.warn("Falling back to local photos data");
  }

  const publicPhotos = await getPublicPhotosIndex();
  if (publicPhotos) {
    let photos = [...publicPhotos].sort((a, b) => {
      const da = new Date(a?.captureDate || 0).getTime();
      const db = new Date(b?.captureDate || 0).getTime();
      if (Number.isNaN(da) && Number.isNaN(db)) return 0;
      if (Number.isNaN(da)) return 1;
      if (Number.isNaN(db)) return -1;
      return db - da;
    });
    if (options.category) {
      photos = photos.filter(p => p.category === options.category);
    }
    if (options.limit) {
      photos = photos.slice(0, options.limit);
    }
    return photos;
  }

  const localData = await getLocalData(ContentTypes.PHOTO);
  if (!localData) return [];

  let photos = localData.photos || [];

  if (options.category) {
    photos = photos.filter(p => p.category === options.category);
  }
  if (options.limit) {
    photos = photos.slice(0, options.limit);
  }

  return photos;
};

/**
 * 获取视频列表
 * @param {Object} options - 查询选项
 * @param {string} options.category - 分类
 * @param {string} options.awardLevel - 按奖项级别过滤
 * @returns {Promise<Array>}
 */
export const getVideos = async (options = {}) => {
  try {
    if (CMS_CONFIG.enabled) {
      const queryParams = new URLSearchParams();
      if (options.category) queryParams.append("category", options.category);
      if (options.awardLevel)
        queryParams.append("awardLevel", options.awardLevel);

      const data = await fetchFromCMS(`videos?${queryParams.toString()}`);
      return data.data || [];
    }
  } catch (error) {
    console.warn("Falling back to local videos data");
  }

  const publicVideos = await getPublicVideosIndex();
  if (publicVideos) {
    let videos = [...publicVideos].sort((a, b) => {
      const da = new Date(a?.publishedDate || 0).getTime();
      const db = new Date(b?.publishedDate || 0).getTime();
      if (Number.isNaN(da) && Number.isNaN(db)) return 0;
      if (Number.isNaN(da)) return 1;
      if (Number.isNaN(db)) return -1;
      return db - da;
    });
    if (options.category) {
      videos = videos.filter(v => v.category === options.category);
    }
    if (options.awardLevel) {
      videos = videos.filter(v =>
        v.awards?.some(award => award.level === options.awardLevel)
      );
    }
    return videos;
  }

  const localData = await getLocalData(ContentTypes.VIDEO);
  if (!localData) return [];

  let videos = localData.videos || [];

  if (options.category) {
    videos = videos.filter(v => v.category === options.category);
  }
  if (options.awardLevel) {
    videos = videos.filter(v =>
      v.awards?.some(award => award.level === options.awardLevel)
    );
  }

  return videos;
};

/**
 * 获取游戏项目列表
 * @param {Object} options - 查询选项
 * @returns {Promise<Array>}
 */
export const getGameProjects = async (options = {}) => {
  try {
    if (CMS_CONFIG.enabled) {
      const data = await fetchFromCMS("game-projects");
      return data.data || [];
    }
  } catch (error) {
    console.warn("Falling back to local game projects data");
  }

  const publicProjects = await getPublicProjectsIndex();
  if (publicProjects) {
    return publicProjects;
  }

  const localData = await getLocalData(ContentTypes.GAME);
  return localData?.projects || [];
};

/**
 * 获取工作经历
 * @returns {Promise<Array>}
 */
export const getWorkExperiences = async () => {
  try {
    if (CMS_CONFIG.enabled) {
      const data = await fetchFromCMS("work-experiences");
      return data.data || [];
    }
  } catch (error) {
    console.warn("Falling back to local work experiences");
  }

  const localData = await getLocalData(ContentTypes.WORK);
  return localData?.experience || [];
};

/**
 * 获取教育经历
 * @returns {Promise<Array>}
 */
export const getEducation = async () => {
  try {
    if (CMS_CONFIG.enabled) {
      const data = await fetchFromCMS("education");
      return data.data || [];
    }
  } catch (error) {
    console.warn("Falling back to local education data");
  }

  const localData = await getLocalData(ContentTypes.EDUCATION);
  return localData?.schools || [];
};

/**
 * 通用内容获取方法
 * @param {string} contentType - 内容类型
 * @param {Object} options - 查询选项
 * @returns {Promise<Array>}
 */
export const getContent = async (contentType, options = {}) => {
  switch (contentType) {
    case ContentTypes.ARTICLE:
      return getArticles(options);
    case ContentTypes.PHOTO:
      return getPhotos(options);
    case ContentTypes.VIDEO:
      return getVideos(options);
    case ContentTypes.GAME:
      return getGameProjects(options);
    case ContentTypes.WORK:
      return getWorkExperiences();
    case ContentTypes.EDUCATION:
      return getEducation();
    default:
      throw new Error(`Unknown content type: ${contentType}`);
  }
};

// ====== CMS配置管理 ======

/**
 * 检查CMS是否可用
 * @returns {Promise<boolean>}
 */
export const checkCMSHealth = async () => {
  if (!CMS_CONFIG.enabled) return false;

  try {
    await fetchFromCMS("health");
    return true;
  } catch (error) {
    return false;
  }
};

/**
 * 获取当前内容源
 * @returns {string} 'cms' | 'local'
 */
export const getContentSource = () => {
  return CMS_CONFIG.enabled ? "cms" : "public-content";
};

export const getContentSourcePolicy = () => CONTENT_SOURCE_PRIORITY;

const contentAPI = {
  getArticles,
  getArticleById,
  getArticleBySlug,
  getPhotos,
  getVideos,
  getGameProjects,
  getWorkExperiences,
  getEducation,
  getContent,
  checkCMSHealth,
  getContentSource,
  getContentSourcePolicy
};

export default contentAPI;
