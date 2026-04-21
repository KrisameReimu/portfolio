import contentSchema from "./contentSchema.json";

export const writingCategoryIds = contentSchema.writingCategories;
export const photoCategoryIds = contentSchema.photoCategories;
export const videoCategoryIds = contentSchema.videoCategories;
export const projectStatusIds = contentSchema.projectStatuses;

export const writingCategoryMeta = {
  reflection: {
    label: {
      zh: "深度思考",
      en: "Reflections"
    },
    color: "#6b5b95"
  },
  essay: {
    label: {
      zh: "散文随笔",
      en: "Essays"
    },
    color: "#764ba2"
  },
  tech: {
    label: {
      zh: "技术洞察",
      en: "Tech Insights"
    },
    color: "#667eea"
  },
  creative: {
    label: {
      zh: "创意创作",
      en: "Creative Works"
    },
    color: "#9d50bb"
  },
  achievement: {
    label: {
      zh: "成就纪事",
      en: "Achievements"
    },
    color: "#f59e0b"
  }
};

export const fallbackWritingCategory = {
  label: {
    zh: "未分类",
    en: "Uncategorized"
  },
  color: "#64748b"
};

export const photoCategoryMeta = {
  urban: {
    label: {zh: "城市光影", en: "Urban"},
    description: {
      zh: "城市街头、建筑与夜景",
      en: "Street, architecture, and city light"
    },
    icon: "fas fa-city",
    color: "#2563eb"
  },
  portrait: {
    label: {zh: "人像", en: "Portrait"},
    description: {
      zh: "人物、情绪与关系",
      en: "People, emotions, and human connection"
    },
    icon: "fas fa-user",
    color: "#dc2626"
  },
  nature: {
    label: {zh: "自然", en: "Nature"},
    description: {
      zh: "山海、光线与季节",
      en: "Landscape, light, and seasons"
    },
    icon: "fas fa-mountain",
    color: "#16a34a"
  }
};

export const fallbackPhotoCategory = {
  label: {zh: "未分类", en: "Uncategorized"},
  description: {zh: "待整理", en: "To be curated"},
  icon: "fas fa-image",
  color: "#64748b"
};

export const videoCategoryMeta = {
  promotional: {
    label: {zh: "宣传片", en: "Promotional"},
    color: "#2563eb"
  },
  "short-film": {
    label: {zh: "短片", en: "Short Film"},
    color: "#dc2626"
  },
  documentary: {
    label: {zh: "纪录片", en: "Documentary"},
    color: "#16a34a"
  }
};

export const fallbackVideoCategory = {
  label: {zh: "未分类", en: "Uncategorized"},
  color: "#64748b"
};
