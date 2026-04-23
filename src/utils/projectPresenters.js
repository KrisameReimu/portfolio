const getSectionByTitle = (project, titleEn) =>
  project.sections?.find(section => section.title?.en === titleEn) || null;

export const buildProjectCard = project => {
  const buildScope = getSectionByTitle(project, "Build Scope");
  const readingSection =
    getSectionByTitle(project, "Project Reading") ||
    getSectionByTitle(project, "Platform Reading") ||
    getSectionByTitle(project, "Reading This Line");

  return {
    id: project.cardId || project.slug,
    type: project.cardType || project.eyebrow,
    title: project.title,
    organization: project.organization,
    timeframe: project.timeframe,
    role: project.role,
    summary: project.heroSummary,
    focusLabel: buildScope?.title || null,
    focusAreas: buildScope?.items || [],
    bullets: project.cardHighlights || [],
    impact:
      readingSection?.items?.[0] ||
      project.overview?.find(item => item.label?.en === "Outcome")?.value ||
      null,
    proofTag: project.proofTag,
    actionLabel: project.actionLabel,
    href: `/projects/${project.slug}`
  };
};

export const buildProjectHeroCard = project => ({
  year: project.heroYear || "",
  title: project.title,
  description: project.heroCardDescription || project.heroSummary,
  cta: {
    ...project.actionLabel
  },
  href: `/projects/${project.slug}`
});

export const buildProjectCards = projects => projects.map(buildProjectCard);

export const buildProjectHeroCards = projects =>
  projects.map(buildProjectHeroCard);
