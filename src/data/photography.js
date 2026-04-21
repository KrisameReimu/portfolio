/**
 * 摄影作品数据配置
 * 三大主题分类：Urban（城市）/ Portrait（人像）/ Nature（自然）
 *
 * 设计特色：
 * - Cloudinary图床集成
 * - 支持EXIF数据展示
 * - Lightbox画廊体验
 * - 双语标题与描述
 */

import {getImageUrl, PHOTO_FOLDERS} from "../config/assets";
import photographyCover from "../assets/images/photography.png";

export const photographyConfig = {
  sectionTitle: {
    zh: "摄影作品",
    en: "Photography Portfolio"
  },
  subtitle: {
    zh: "用镜头捕捉瞬间，用光影讲述故事",
    en: "Capturing Moments, Telling Stories Through Light and Shadow"
  },
  lightboxSettings: {
    enableKeyboard: true,
    showImageCount: true,
    animationDuration: 300
  }
};

export const photoYearHighlights = [
  {
    year: "2024",
    title: {
      zh: "2024 摄影精选",
      en: "2024 Photography Highlights"
    },
    description: {
      zh: "城市、人像与自然的年度影像总结，记录我在香港与旅行中的视觉片段。",
      en: "An annual visual summary across urban, portrait, and nature themes, capturing moments from Hong Kong and travels."
    },
    coverImage: photographyCover
  },
  {
    year: "2025",
    title: {
      zh: "2025 摄影记录",
      en: "2025 Photo Journal"
    },
    description: {
      zh: "持续更新中，整理我的长期影像计划与年度项目。",
      en: "Work in progress. A living archive of long-term visual projects."
    },
    coverImage: photographyCover
  },
  {
    year: "2023",
    title: {
      zh: "2023 影像回顾",
      en: "2023 Visual Recap"
    },
    description: {
      zh: "从校园到城市街头，记录成长与探索的影像片段。",
      en: "From campus to street scenes, a visual recap of growth and exploration."
    },
    coverImage: photographyCover
  }
];

// Urban Photography - 城市摄影
export const urbanPhotos = [
  {
    id: "hk-night-001",
    url: getImageUrl(`${PHOTO_FOLDERS.urban}/hongkong-night-001.jpg`, {
      width: 1920,
      quality: 90
    }),
    thumbnail: getImageUrl(`${PHOTO_FOLDERS.urban}/hongkong-night-001.jpg`, {
      width: 400,
      height: 300
    }),
    title: {
      zh: "维港夜色",
      en: "Victoria Harbour at Night"
    },
    description: {
      zh: "从中环码头拍摄的维多利亚港夜景，灯火辉煌的香港岛与九龙半岛遥相呼应",
      en: "Victoria Harbour night view from Central Pier, the illuminated Hong Kong Island and Kowloon Peninsula echoing each other"
    },
    category: "urban",
    captureDate: "2024-03-15",
    exifData: {
      camera: "Sony A7III",
      lens: "FE 24-70mm F2.8 GM",
      settings: "ISO 800, f/2.8, 1/60s"
    },
    tags: ["香港", "夜景", "城市", "Hong Kong", "Night"],
    width: 1920,
    height: 1280
  },
  {
    id: "street-life-001",
    url: getImageUrl(`${PHOTO_FOLDERS.urban}/street-life-001.jpg`, {
      width: 1920,
      quality: 90
    }),
    thumbnail: getImageUrl(`${PHOTO_FOLDERS.urban}/street-life-001.jpg`, {
      width: 400,
      height: 300
    }),
    title: {
      zh: "街头生活",
      en: "Street Life"
    },
    description: {
      zh: "旺角街头的日常，人来人往中捕捉到的一个安静瞬间",
      en: "Daily life in Mong Kok streets, a quiet moment captured amidst the bustling crowd"
    },
    category: "urban",
    captureDate: "2024-05-20",
    exifData: {
      camera: "Sony A7III",
      lens: "FE 35mm F1.8",
      settings: "ISO 400, f/2.8, 1/125s"
    },
    tags: ["街头", "人文", "Street", "Documentary"],
    width: 1920,
    height: 1280
  },
  {
    id: "architecture-001",
    url: getImageUrl(`${PHOTO_FOLDERS.urban}/architecture-001.jpg`, {
      width: 1920,
      quality: 90
    }),
    thumbnail: getImageUrl(`${PHOTO_FOLDERS.urban}/architecture-001.jpg`, {
      width: 400,
      height: 300
    }),
    title: {
      zh: "建筑几何",
      en: "Architectural Geometry"
    },
    description: {
      zh: "现代建筑的线条与光影",
      en: "Lines and shadows of modern architecture"
    },
    category: "urban",
    captureDate: "2024-04-10",
    exifData: {
      camera: "Sony A7III",
      lens: "FE 16-35mm F2.8 GM",
      settings: "ISO 100, f/8, 1/250s"
    },
    tags: ["建筑", "几何", "Architecture", "Geometry"],
    width: 1920,
    height: 1280
  }
];

// Portrait Photography - 人像摄影
export const portraitPhotos = [
  {
    id: "portrait-001",
    url: getImageUrl(`${PHOTO_FOLDERS.portrait}/portrait-001.jpg`, {
      width: 1920,
      quality: 90
    }),
    thumbnail: getImageUrl(`${PHOTO_FOLDERS.portrait}/portrait-001.jpg`, {
      width: 400,
      height: 300
    }),
    title: {
      zh: "自然光人像",
      en: "Natural Light Portrait"
    },
    description: {
      zh: "利用窗边自然光拍摄的情绪人像",
      en: "Emotional portrait shot with natural window light"
    },
    category: "portrait",
    captureDate: "2024-06-05",
    exifData: {
      camera: "Sony A7III",
      lens: "FE 85mm F1.4 GM",
      settings: "ISO 200, f/1.8, 1/160s"
    },
    tags: ["人像", "自然光", "Portrait", "Natural Light"],
    width: 1280,
    height: 1920
  },
  {
    id: "portrait-002",
    url: getImageUrl(`${PHOTO_FOLDERS.portrait}/portrait-002.jpg`, {
      width: 1920,
      quality: 90
    }),
    thumbnail: getImageUrl(`${PHOTO_FOLDERS.portrait}/portrait-002.jpg`, {
      width: 400,
      height: 300
    }),
    title: {
      zh: "街拍人像",
      en: "Street Portrait"
    },
    description: {
      zh: "城市街头的即兴拍摄",
      en: "Spontaneous street portrait in the city"
    },
    category: "portrait",
    captureDate: "2024-07-12",
    exifData: {
      camera: "Sony A7III",
      lens: "FE 50mm F1.8",
      settings: "ISO 400, f/2.0, 1/200s"
    },
    tags: ["街拍", "人像", "Street", "Portrait"],
    width: 1920,
    height: 1280
  }
];

// Nature Photography - 自然风光
export const naturePhotos = [
  {
    id: "nature-001",
    url: getImageUrl(`${PHOTO_FOLDERS.nature}/nature-001.jpg`, {
      width: 1920,
      quality: 90
    }),
    thumbnail: getImageUrl(`${PHOTO_FOLDERS.nature}/nature-001.jpg`, {
      width: 400,
      height: 300
    }),
    title: {
      zh: "大屿山日出",
      en: "Lantau Island Sunrise"
    },
    description: {
      zh: "凤凰山顶拍摄的日出云海",
      en: "Sunrise and sea of clouds from Phoenix Mountain peak"
    },
    category: "nature",
    captureDate: "2024-02-28",
    exifData: {
      camera: "Sony A7III",
      lens: "FE 24-105mm F4 G",
      settings: "ISO 100, f/11, 1/30s"
    },
    tags: ["日出", "风景", "Sunrise", "Landscape"],
    width: 1920,
    height: 1280
  },
  {
    id: "nature-002",
    url: getImageUrl(`${PHOTO_FOLDERS.nature}/nature-002.jpg`, {
      width: 1920,
      quality: 90
    }),
    thumbnail: getImageUrl(`${PHOTO_FOLDERS.nature}/nature-002.jpg`, {
      width: 400,
      height: 300
    }),
    title: {
      zh: "西贡海岸",
      en: "Sai Kung Coastline"
    },
    description: {
      zh: "西贡的蔚蓝海岸线",
      en: "The azure coastline of Sai Kung"
    },
    category: "nature",
    captureDate: "2024-05-08",
    exifData: {
      camera: "Sony A7III",
      lens: "FE 16-35mm F2.8 GM",
      settings: "ISO 100, f/8, 1/500s"
    },
    tags: ["海景", "自然", "Seascape", "Nature"],
    width: 1920,
    height: 1280
  },
  {
    id: "nature-003",
    url: getImageUrl(`${PHOTO_FOLDERS.nature}/nature-003.jpg`, {
      width: 1920,
      quality: 90
    }),
    thumbnail: getImageUrl(`${PHOTO_FOLDERS.nature}/nature-003.jpg`, {
      width: 400,
      height: 300
    }),
    title: {
      zh: "山间薄雾",
      en: "Mountain Mist"
    },
    description: {
      zh: "清晨山间的薄雾缭绕",
      en: "Morning mist winding through the mountains"
    },
    category: "nature",
    captureDate: "2024-03-22",
    exifData: {
      camera: "Sony A7III",
      lens: "FE 70-200mm F2.8 GM",
      settings: "ISO 400, f/5.6, 1/250s"
    },
    tags: ["山景", "雾", "Mountain", "Mist"],
    width: 1920,
    height: 1280
  }
];

// 所有照片集合
export const allPhotos = [...urbanPhotos, ...portraitPhotos, ...naturePhotos];

// 按分类组织
export const photosByCategory = {
  urban: urbanPhotos,
  portrait: portraitPhotos,
  nature: naturePhotos
};

// 分类元数据
export const categories = [
  {
    id: "urban",
    name: {zh: "城市光影", en: "Urban Photography"},
    description: {
      zh: "捕捉城市的脉搏与韵律",
      en: "Capturing the Pulse and Rhythm of Cities"
    },
    coverImage: urbanPhotos[0]?.thumbnail || "",
    photoCount: urbanPhotos.length,
    icon: "fas fa-city",
    color: "#3498db"
  },
  {
    id: "portrait",
    name: {zh: "人像摄影", en: "Portrait Photography"},
    description: {
      zh: "记录情感与表情的瞬间",
      en: "Recording Moments of Emotion and Expression"
    },
    coverImage: portraitPhotos[0]?.thumbnail || "",
    photoCount: portraitPhotos.length,
    icon: "fas fa-user",
    color: "#e74c3c"
  },
  {
    id: "nature",
    name: {zh: "自然风光", en: "Nature & Landscape"},
    description: {
      zh: "探索自然之美",
      en: "Exploring the Beauty of Nature"
    },
    coverImage: naturePhotos[0]?.thumbnail || "",
    photoCount: naturePhotos.length,
    icon: "fas fa-mountain",
    color: "#27ae60"
  }
];

const photographyData = {
  photographyConfig,
  allPhotos,
  photosByCategory,
  urbanPhotos,
  portraitPhotos,
  naturePhotos,
  categories
};

export default photographyData;
