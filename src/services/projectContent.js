import {
  buildProjectCards,
  buildProjectHeroCards
} from "../utils/projectPresenters";

const PROJECT_CONTENT = {
  indexUrl: "/content/projects/index.json",
  baseUrl: "/content/projects"
};

export class ProjectContentLoadError extends Error {
  constructor(message, meta = {}) {
    super(message);
    this.name = "ProjectContentLoadError";
    this.slug = meta.slug;
    this.url = meta.url;
    this.status = meta.status;
  }
}

let projectIndexCache = null;
let projectIndexPromise = null;
const projectDetailCache = new Map();
const projectDetailPromises = new Map();
let allProjectDetailsCache = null;
let allProjectDetailsPromise = null;

const fetchJson = async url => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new ProjectContentLoadError(
      `Unable to load project content: ${url}`,
      {
        url,
        status: response.status
      }
    );
  }
  return response.json();
};

export const getProjectIndex = async () => {
  if (projectIndexCache) return projectIndexCache;
  if (projectIndexPromise) return projectIndexPromise;

  projectIndexPromise = (async () => {
    const data = await fetchJson(PROJECT_CONTENT.indexUrl);
    const projects = Array.isArray(data?.projects) ? data.projects : [];
    projectIndexCache = projects;
    projectIndexPromise = null;
    return projectIndexCache;
  })().catch(error => {
    projectIndexPromise = null;
    throw error;
  });

  return projectIndexPromise;
};

export const getProjectDetailBySlug = async slug => {
  if (!slug) return null;
  if (projectDetailCache.has(slug)) return projectDetailCache.get(slug);
  if (projectDetailPromises.has(slug)) return projectDetailPromises.get(slug);

  const promise = (async () => {
    const url = `${PROJECT_CONTENT.baseUrl}/${slug}.json`;
    try {
      const data = await fetchJson(url);
      projectDetailCache.set(slug, data);
      return data;
    } catch (error) {
      throw new ProjectContentLoadError(
        `Unable to load project detail: ${slug}`,
        {
          slug,
          url,
          status: error.status
        }
      );
    } finally {
      projectDetailPromises.delete(slug);
    }
  })();

  projectDetailPromises.set(slug, promise);
  return promise;
};

export const getAllProjectDetails = async () => {
  if (allProjectDetailsCache) return allProjectDetailsCache;
  if (allProjectDetailsPromise) return allProjectDetailsPromise;

  allProjectDetailsPromise = (async () => {
    const index = await getProjectIndex();
    const details = await Promise.all(
      index.map(item => getProjectDetailBySlug(item.slug))
    );
    allProjectDetailsCache = details;
    allProjectDetailsPromise = null;
    return allProjectDetailsCache;
  })().catch(error => {
    allProjectDetailsPromise = null;
    throw error;
  });

  return allProjectDetailsPromise;
};

export const getProjectCards = async () => {
  const projects = await getAllProjectDetails();
  return buildProjectCards(projects);
};

export const getProjectHeroCards = async () => {
  const projects = await getAllProjectDetails();
  return buildProjectHeroCards(projects);
};
