export const pageIdentities = {
  writing: {
    accentColor: "#667eea",
    pageClassName: "page-surface page-surface--writing",
    heroClassName: "writing-landing-hero",
    heroMode: "feature-grid",
    layoutRhythm: "editorial-archive",
    motionTone: "measured",
    mediaTreatment: "text-led",
    visualType: "interactive-feature",
    heroVisual: {
      assetId: "writing-essays-reflections-stories-notes",
      status: "available",
      placement: "editorial-paper-hero",
      interaction: "pretext-margin-reveal"
    },
    designReference: {
      source: "Refero",
      archetype: "editorial-paper plus Plain digital workbench",
      borrow:
        "reading rhythm, warm paper surfaces, quiet rules, precise labels",
      avoid: "cold enterprise dashboard styling"
    },
    visualThesis: "Editorial, reflective, archive-led",
    contentRole: "Long-form thought and voice"
  },
  photos: {
    accentColor: "#4c6ef5",
    pageClassName: "page-surface page-surface--photos",
    heroClassName: "photo-archive-landing-hero",
    heroMode: "immersive-gallery",
    layoutRhythm: "gallery-to-archive",
    motionTone: "atmospheric",
    mediaTreatment: "image-first",
    visualType: "interactive-feature",
    heroVisual: {
      assetId: "photos-moments-places-stories-archive",
      status: "available",
      placement: "exhibition-entrance",
      interaction: "focus-mode-gallery"
    },
    designReference: {
      source: "Refero",
      archetype: "Leo Natsume gallery wall precision",
      borrow:
        "high whitespace, image-led hierarchy, a single sharp active accent",
      avoid: "stock-photo mood boards and heavy card chrome"
    },
    visualThesis: "Atmospheric, image-first, archive-aware",
    contentRole: "Visual memory and place"
  },
  videos: {
    accentColor: "#4a90e2",
    pageClassName: "page-surface page-surface--videos",
    heroClassName: "videos-landing-hero",
    heroMode: "cinematic-reel",
    layoutRhythm: "sequence",
    motionTone: "projected",
    mediaTreatment: "motion-led",
    visualType: "interactive-video",
    emptyVisualType: "video-wall",
    heroVisual: {
      assetId: "videos-filmmaking-editing-visual-stories",
      status: "available",
      placement: "cinematic-title-wall",
      interaction: "reel-hover-preview"
    },
    designReference: {
      source: "Refero",
      archetype: "Mercury command center",
      borrow: "cinematic contrast, sequence rhythm, restrained action color",
      avoid: "dark gradients applied as a generic site-wide mood"
    },
    visualThesis: "Cinematic, story-led, motion-forward",
    contentRole: "Narrative proof through video"
  },
  projects: {
    accentColor: "#9c27b0",
    pageClassName: "page-surface page-surface--projects",
    heroClassName: "projects-landing-hero",
    heroMode: "dossier-landing",
    layoutRhythm: "case-sequence",
    motionTone: "precise",
    mediaTreatment: "evidence-led",
    visualType: "interactive-feature",
    heroVisual: {
      assetId: "projects-system-overview-dossier",
      status: "available",
      placement: "dossier-surface",
      interaction: "case-row-preview"
    },
    designReference: {
      source: "Refero",
      archetype: "Plain workbench plus Limitless blueprint",
      borrow:
        "evidence-first cards, thin separators, diagrams, clean technical hierarchy",
      avoid: "decorative purple SaaS hero language"
    },
    visualThesis: "Technical dossier with visible process",
    contentRole: "Hands-on systems and workflows"
  },
  awards: {
    accentColor: "#d8a400",
    pageClassName: "page-surface page-surface--awards",
    heroClassName: "awards-landing-hero",
    heroMode: "archive-board",
    layoutRhythm: "grid",
    motionTone: "quiet",
    mediaTreatment: "evidence-led",
    visualType: "interactive-feature",
    heroVisual: {
      assetId: "awards-recognition-milestones-achievements",
      status: "available",
      placement: "archive-evidence-board",
      interaction: "proof-cluster-reveal"
    },
    designReference: {
      source: "Refero",
      archetype: "gallery wall plus architectural blueprint",
      borrow: "proof-board hierarchy, strict metadata, thin separators",
      avoid: "trophy-wall clutter"
    },
    visualThesis: "Archive board, evidence-first, selective",
    contentRole: "Verifiable proof and recognition"
  },
  about: {
    accentColor: "#1976d2",
    pageClassName: "page-surface page-surface--about",
    heroClassName: "about-landing-hero",
    heroMode: "profile-dossier",
    layoutRhythm: "profile-flow",
    motionTone: "steady",
    mediaTreatment: "mixed",
    visualType: "interactive-feature",
    heroVisual: {
      assetId: "about-me-profile-dossier-board",
      status: "available",
      placement: "profile-dossier-board",
      interaction: "identity-map-lines"
    },
    designReference: {
      source: "Refero",
      archetype: "Apple gallery white plus blueprint dossier",
      borrow:
        "calm profile space, strong typography, selective portrait or asset use",
      avoid: "resume-template sections"
    },
    visualThesis: "Profile dossier, career signal, working method",
    contentRole: "Personal IP orientation"
  },
  now: {
    accentColor: "#2f7a65",
    pageClassName: "page-surface page-surface--now",
    heroClassName: "now-landing-hero",
    heroMode: "live-log",
    layoutRhythm: "status-board",
    motionTone: "light",
    mediaTreatment: "signal-led",
    visualType: "custom",
    heroVisual: {
      assetId: "now-studio-status-board",
      status: "prompt-ready",
      placement: "live-status-board",
      interaction: "status-pulse"
    },
    designReference: {
      source: "Refero",
      archetype: "Plain digital workbench",
      borrow:
        "live status surfaces, compact progress signals, clear update cadence",
      avoid: "over-polished marketing blocks"
    },
    visualThesis: "Current focus, live progress, open notebook",
    contentRole: "A living signal of current direction"
  },
  contact: {
    accentColor: "#955f3b",
    pageClassName: "page-surface page-surface--contact",
    heroClassName: "contact-landing-hero",
    heroMode: "collaboration-card",
    layoutRhythm: "direct-contact",
    motionTone: "warm",
    mediaTreatment: "signal-led",
    visualType: "custom",
    heroVisual: {
      assetId: "contact-say-hello-collaborate-connect",
      status: "available",
      placement: "contact-studio-card",
      interaction: "social-signal-hover"
    },
    visualThesis: "Warm invitation, collaboration signal, direct contact",
    contentRole: "Conversation and collaboration entry point"
  }
};

export const getPageIdentity = pageKey => pageIdentities[pageKey] || {};
