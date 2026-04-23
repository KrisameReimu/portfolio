export const pageIdentities = {
  writing: {
    accentColor: "#667eea",
    pageClassName: "page-surface page-surface--writing",
    heroClassName: "writing-landing-hero",
    visualType: "interactive-feature",
    visualThesis: "Editorial, reflective, archive-led",
    contentRole: "Long-form thought and voice"
  },
  photos: {
    accentColor: "#4c6ef5",
    pageClassName: "page-surface page-surface--photos",
    heroClassName: "photo-archive-landing-hero",
    visualType: "interactive-feature",
    visualThesis: "Atmospheric, image-first, archive-aware",
    contentRole: "Visual memory and place"
  },
  videos: {
    accentColor: "#4a90e2",
    pageClassName: "page-surface page-surface--videos",
    heroClassName: "videos-landing-hero",
    visualType: "interactive-video",
    emptyVisualType: "video-wall",
    visualThesis: "Cinematic, story-led, motion-forward",
    contentRole: "Narrative proof through video"
  },
  projects: {
    accentColor: "#9c27b0",
    pageClassName: "page-surface page-surface--projects",
    heroClassName: "projects-landing-hero",
    visualType: "interactive-feature",
    visualThesis: "Technical dossier with visible process",
    contentRole: "Hands-on systems and workflows"
  },
  awards: {
    accentColor: "#d8a400",
    pageClassName: "page-surface page-surface--awards",
    heroClassName: "awards-landing-hero",
    visualType: "interactive-feature",
    visualThesis: "Archive board, evidence-first, selective",
    contentRole: "Verifiable proof and recognition"
  },
  about: {
    accentColor: "#1976d2",
    pageClassName: "page-surface page-surface--about",
    heroClassName: "about-landing-hero",
    visualType: "interactive-feature",
    visualThesis: "Profile dossier, career signal, working method",
    contentRole: "Personal IP orientation"
  }
};

export const getPageIdentity = pageKey => pageIdentities[pageKey] || {};
