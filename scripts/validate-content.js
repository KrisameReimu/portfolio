#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const root = process.cwd();
const appRoot = path.join(root, "apps", "web");
const contentDir = path.join(appRoot, "public", "content");
const schemaPath = path.join(appRoot, "contentSchema.json");
const files = {
  articles: path.join(contentDir, "index.json"),
  photos: path.join(contentDir, "photos.json"),
  videos: path.join(contentDir, "videos.json"),
  projects: path.join(contentDir, "projects.json"),
  projectDetailsIndex: path.join(contentDir, "projects", "index.json"),
  visualsIndex: path.join(contentDir, "visuals", "index.json")
};
const articlesDir = path.join(contentDir, "articles");
const projectDetailsDir = path.join(contentDir, "projects");

const schema = JSON.parse(fs.readFileSync(schemaPath, "utf8"));
const articleCategories = new Set(schema.writingCategories || []);
const photoCategories = new Set(schema.photoCategories || []);
const videoCategories = new Set(schema.videoCategories || []);
const projectStatuses = new Set(schema.projectStatuses || []);
const projectMilestoneStatuses = new Set(schema.projectMilestoneStatuses || []);

const errors = [];
const warnings = [];

const addError = message => errors.push(message);
const addWarning = message => warnings.push(message);

const readJsonArray = filePath => {
  if (!fs.existsSync(filePath)) {
    addError(`Missing file: ${filePath}`);
    return [];
  }

  try {
    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
    if (!Array.isArray(data)) {
      addError(`Expected array JSON: ${filePath}`);
      return [];
    }
    return data;
  } catch (error) {
    addError(`Invalid JSON in ${filePath}: ${error.message}`);
    return [];
  }
};

const readJsonObject = filePath => {
  if (!fs.existsSync(filePath)) {
    addError(`Missing file: ${filePath}`);
    return {};
  }

  try {
    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
    if (!data || typeof data !== "object" || Array.isArray(data)) {
      addError(`Expected object JSON: ${filePath}`);
      return {};
    }
    return data;
  } catch (error) {
    addError(`Invalid JSON in ${filePath}: ${error.message}`);
    return {};
  }
};

const isValidDate = value => {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value))
    return false;
  const date = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return false;
  return date.toISOString().slice(0, 10) === value;
};

const hasText = value => typeof value === "string" && value.trim().length > 0;

const validatePublicAssetPath = (value, pathLabel) => {
  if (!hasText(value)) {
    addError(`${pathLabel} is required`);
    return;
  }

  if (!value.startsWith("/")) {
    addError(`${pathLabel} must be an absolute public path`);
    return;
  }

  const assetPath = path.join(appRoot, "public", value.replace(/^\/+/, ""));
  if (!fs.existsSync(assetPath)) {
    addError(`${pathLabel} does not exist: ${assetPath}`);
  }
};

const validateRepoAssetPath = (value, pathLabel) => {
  if (!hasText(value)) {
    addError(`${pathLabel} is required`);
    return;
  }

  if (path.isAbsolute(value)) {
    addError(`${pathLabel} must be a repository-relative path`);
    return;
  }

  const assetPath = path.join(appRoot, value);
  if (!fs.existsSync(assetPath)) {
    addError(`${pathLabel} does not exist: ${assetPath}`);
  }
};

const validateI18nObject = (obj, pathLabel, requiredZh = true) => {
  if (!obj || typeof obj !== "object") {
    addError(`${pathLabel} must be an object with zh/en`);
    return;
  }
  if (requiredZh && !hasText(obj.zh)) {
    addError(`${pathLabel}.zh is required`);
  }
  if ("en" in obj && typeof obj.en !== "string") {
    addError(`${pathLabel}.en must be a string`);
  }
};

const validateUniqueIds = (items, listName) => {
  const seen = new Set();
  items.forEach((item, idx) => {
    const label = `${listName}[${idx}]`;
    if (!item || typeof item !== "object") {
      addError(`${label} must be an object`);
      return;
    }
    if (!hasText(item.id)) {
      addError(`${label}.id is required`);
      return;
    }
    if (seen.has(item.id)) {
      addError(`${listName} has duplicate id: ${item.id}`);
    }
    seen.add(item.id);
  });
  return seen;
};

const validateArticles = articles => {
  validateUniqueIds(articles, "articles");

  articles.forEach((article, idx) => {
    const label = `articles[${idx}](${article.id || "missing-id"})`;
    validateI18nObject(article.title, `${label}.title`);
    validateI18nObject(article.excerpt, `${label}.excerpt`, false);

    if (!isValidDate(article.publishedDate)) {
      addError(`${label}.publishedDate must be YYYY-MM-DD`);
    }
    if (!articleCategories.has(article.category)) {
      addWarning(`${label}.category is not in known categories`);
    }
    if (!Array.isArray(article.tags)) {
      addError(`${label}.tags must be an array`);
    }
    if (typeof article.readingTime !== "number" || article.readingTime <= 0) {
      addWarning(`${label}.readingTime should be a positive number`);
    }
    if (typeof article.featured !== "boolean") {
      addWarning(`${label}.featured should be boolean`);
    }

    const zhPath = path.join(articlesDir, `${article.id}.zh.md`);
    if (!fs.existsSync(zhPath)) {
      addError(`Missing article markdown: ${zhPath}`);
    }

    const enPath = path.join(articlesDir, `${article.id}.en.md`);
    if (!fs.existsSync(enPath)) {
      addWarning(`English markdown not found (optional): ${enPath}`);
    }
  });
};

const validatePhotos = photos => {
  validateUniqueIds(photos, "photos");

  photos.forEach((photo, idx) => {
    const label = `photos[${idx}](${photo.id || "missing-id"})`;
    validateI18nObject(photo.title, `${label}.title`);
    validateI18nObject(photo.description, `${label}.description`, false);

    if (!hasText(photo.url)) addError(`${label}.url is required`);
    if (!hasText(photo.thumbnail)) addWarning(`${label}.thumbnail is empty`);
    if (!isValidDate(photo.captureDate)) {
      addError(`${label}.captureDate must be YYYY-MM-DD`);
    }
    if (!photoCategories.has(photo.category)) {
      addWarning(`${label}.category is not in known categories`);
    }
    if (!Array.isArray(photo.tags)) {
      addError(`${label}.tags must be an array`);
    }
  });
};

const validateVideos = videos => {
  validateUniqueIds(videos, "videos");

  videos.forEach((video, idx) => {
    const label = `videos[${idx}](${video.id || "missing-id"})`;
    validateI18nObject(video.title, `${label}.title`);
    validateI18nObject(video.description, `${label}.description`, false);

    if (!hasText(video.thumbnailUrl)) {
      addError(`${label}.thumbnailUrl is required`);
    }
    if (!isValidDate(video.publishedDate)) {
      addError(`${label}.publishedDate must be YYYY-MM-DD`);
    }
    if (!videoCategories.has(video.category)) {
      addWarning(`${label}.category is not in known categories`);
    }
    if (!Array.isArray(video.tags)) {
      addError(`${label}.tags must be an array`);
    }
    if (typeof video.duration !== "number" || video.duration < 0) {
      addError(`${label}.duration must be >= 0`);
    }
    if (video.platform === "youtube" && !hasText(video.videoId)) {
      addWarning(`${label}.videoId is empty for youtube platform`);
    }
  });
};

const validateProjects = projects => {
  validateUniqueIds(projects, "projects");

  projects.forEach((project, idx) => {
    const label = `projects[${idx}](${project.id || "missing-id"})`;
    validateI18nObject(project.title, `${label}.title`);
    validateI18nObject(project.description, `${label}.description`, false);

    if (!hasText(project.coverImage)) {
      addError(`${label}.coverImage is required`);
    }
    if (!projectStatuses.has(project.status)) {
      addWarning(`${label}.status is not in known statuses`);
    }
    if (!isValidDate(project.startDate)) {
      addError(`${label}.startDate must be YYYY-MM-DD`);
    }
    if (project.releaseDate !== null && !isValidDate(project.releaseDate)) {
      addError(`${label}.releaseDate must be null or YYYY-MM-DD`);
    }
    if (!Array.isArray(project.technologies)) {
      addError(`${label}.technologies must be an array`);
    }
    if (!Array.isArray(project.highlights)) {
      addError(`${label}.highlights must be an array`);
    } else {
      project.highlights.forEach((highlight, highlightIdx) => {
        validateI18nObject(
          highlight,
          `${label}.highlights[${highlightIdx}]`,
          true
        );
      });
    }
    if (!Array.isArray(project.milestones)) {
      addError(`${label}.milestones must be an array`);
    } else {
      project.milestones.forEach((milestone, milestoneIdx) => {
        const milestoneLabel = `${label}.milestones[${milestoneIdx}]`;
        if (!milestone || typeof milestone !== "object") {
          addError(`${milestoneLabel} must be an object`);
          return;
        }
        if (!hasText(milestone.title)) {
          addError(`${milestoneLabel}.title is required`);
        }
        if (!hasText(milestone.description)) {
          addError(`${milestoneLabel}.description is required`);
        }
        if (
          milestone.completedDate !== null &&
          milestone.completedDate !== undefined &&
          !isValidDate(milestone.completedDate)
        ) {
          addError(
            `${milestoneLabel}.completedDate must be null or YYYY-MM-DD`
          );
        }
        if (!projectMilestoneStatuses.has(milestone.status)) {
          addWarning(`${milestoneLabel}.status is not in known statuses`);
        }
      });
    }
  });
};

const validateProjectDetail = (project, filePath) => {
  const label = `projectDetail(${project?.slug || path.basename(filePath)})`;
  if (!project || typeof project !== "object") {
    addError(`${label} must be an object`);
    return;
  }
  if (!hasText(project.slug)) addError(`${label}.slug is required`);
  if (!hasText(project.cardId)) addWarning(`${label}.cardId is recommended`);
  validateI18nObject(project.title, `${label}.title`);
  validateI18nObject(project.eyebrow, `${label}.eyebrow`, false);
  validateI18nObject(project.organization, `${label}.organization`, false);
  validateI18nObject(project.timeframe, `${label}.timeframe`, false);
  validateI18nObject(project.role, `${label}.role`, false);
  validateI18nObject(project.heroSummary, `${label}.heroSummary`);
  validateI18nObject(
    project.heroCardDescription,
    `${label}.heroCardDescription`,
    false
  );
  validateI18nObject(project.proofTag, `${label}.proofTag`, false);
  validateI18nObject(project.actionLabel, `${label}.actionLabel`, false);

  ["overview", "sections", "flowGroups", "chartBlocks", "imageCharts"].forEach(
    key => {
      if (project[key] !== undefined && !Array.isArray(project[key])) {
        addError(`${label}.${key} must be an array`);
      }
    }
  );

  if (Array.isArray(project.imageCharts)) {
    project.imageCharts.forEach((chart, idx) => {
      const chartLabel = `${label}.imageCharts[${idx}]`;
      validateI18nObject(chart.title, `${chartLabel}.title`);
      validateI18nObject(chart.alt, `${chartLabel}.alt`, false);
      validateI18nObject(chart.caption, `${chartLabel}.caption`, false);
      validatePublicAssetPath(chart.src, `${chartLabel}.src`);
    });
  }

  if (!Array.isArray(project.cardHighlights)) {
    addWarning(`${label}.cardHighlights should be an array`);
  }
};

const validateProjectDetails = index => {
  const projects = Array.isArray(index.projects) ? index.projects : [];
  if (!Array.isArray(index.projects)) {
    addError("project detail index must include a projects array");
    return [];
  }

  const seen = new Set();
  const details = [];

  projects.forEach((item, idx) => {
    const label = `projectDetailsIndex.projects[${idx}]`;
    if (!item || typeof item !== "object" || !hasText(item.slug)) {
      addError(`${label}.slug is required`);
      return;
    }
    if (seen.has(item.slug)) {
      addError(`project detail index has duplicate slug: ${item.slug}`);
      return;
    }
    seen.add(item.slug);

    const detailPath = path.join(projectDetailsDir, `${item.slug}.json`);
    const detail = readJsonObject(detailPath);
    validateProjectDetail(detail, detailPath);
    if (detail.slug && detail.slug !== item.slug) {
      addError(`${detailPath} slug must match index slug ${item.slug}`);
    }
    if (detail.slug) details.push(detail);
  });

  return details;
};

const validateVisualsIndex = index => {
  if (!Array.isArray(index.assets)) {
    addError("visuals index must include an assets array");
    return;
  }

  validateUniqueIds(index.assets, "visuals.assets");

  index.assets.forEach((asset, idx) => {
    const label = `visuals.assets[${idx}](${asset?.id || "missing-id"})`;
    if (!asset || typeof asset !== "object") return;

    if (!hasText(asset.page)) addError(`${label}.page is required`);
    if (!hasText(asset.role)) addError(`${label}.role is required`);
    if (!hasText(asset.status)) addError(`${label}.status is required`);
    if (!hasText(asset.type)) addError(`${label}.type is required`);
    validateI18nObject(asset.title, `${label}.title`);

    if (asset.status === "available") {
      if (!asset.output || typeof asset.output !== "object") {
        addError(`${label}.output is required for available assets`);
        return;
      }
      if (!hasText(asset.output.format)) {
        addError(`${label}.output.format is required`);
      }
      validateRepoAssetPath(
        asset.output.storagePath,
        `${label}.output.storagePath`
      );
      if (asset.output.sourcePath !== undefined) {
        validateRepoAssetPath(
          asset.output.sourcePath,
          `${label}.output.sourcePath`
        );
      }
    }
  });
};

const run = () => {
  const articles = readJsonArray(files.articles);
  const photos = readJsonArray(files.photos);
  const videos = readJsonArray(files.videos);
  const projects = readJsonArray(files.projects);
  const projectDetailsIndex = readJsonObject(files.projectDetailsIndex);
  const visualsIndex = readJsonObject(files.visualsIndex);

  validateArticles(articles);
  validatePhotos(photos);
  validateVideos(videos);
  validateProjects(projects);
  const projectDetails = validateProjectDetails(projectDetailsIndex);
  validateVisualsIndex(visualsIndex);

  const globalIds = new Map();
  [
    ["articles", articles],
    ["photos", photos],
    ["videos", videos],
    ["projects", projects]
  ].forEach(([type, list]) => {
    list.forEach(item => {
      const id = item?.id || item?.slug;
      if (!item || !hasText(id)) return;
      if (globalIds.has(id)) {
        addError(
          `Global duplicate id: ${id} appears in ${globalIds.get(
            id
          )} and ${type}`
        );
      } else {
        globalIds.set(id, type);
      }
    });
  });

  if (warnings.length > 0) {
    console.log("Content warnings:");
    warnings.forEach(item => console.log(`- ${item}`));
  }

  if (errors.length > 0) {
    console.error("\nContent validation failed:");
    errors.forEach(item => console.error(`- ${item}`));
    process.exit(1);
  }

  console.log("Content validation passed.");
  if (warnings.length > 0) {
    console.log(`Validation completed with ${warnings.length} warning(s).`);
  }
};

run();
