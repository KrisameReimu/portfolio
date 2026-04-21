/**
 * 内容类型定义 - 为CMS集成提供标准化数据结构
 * 保持个人IP特色：支持双语、分类、多媒体展示
 */

/**
 * @typedef {Object} BilingualText
 * @property {string} zh - 中文文本
 * @property {string} en - 英文文本
 */

/**
 * @typedef {Object} Article
 * @property {string} id - 唯一标识符
 * @property {BilingualText} title - 双语标题
 * @property {BilingualText} excerpt - 双语摘要
 * @property {string} content - 文章内容（Markdown格式）
 * @property {string} coverImage - 封面图URL
 * @property {string[]} tags - 标签数组
 * @property {string} category - 分类（essay/tech/creative/reflection/achievement）
 * @property {string} publishedDate - 发布日期 ISO格式
 * @property {number} readingTime - 阅读时长（分钟）
 * @property {boolean} featured - 是否精选
 * @property {string} [externalUrl] - 外部链接（如微信公众号）
 */

/**
 * @typedef {Object} Photo
 * @property {string} id - 唯一标识符
 * @property {string} url - 图片URL（Cloudinary）
 * @property {string} thumbnail - 缩略图URL
 * @property {BilingualText} title - 双语标题
 * @property {BilingualText} [description] - 双语描述
 * @property {string} category - 分类（urban/portrait/nature）
 * @property {string} captureDate - 拍摄日期
 * @property {Object} exifData - EXIF数据
 * @property {string} exifData.camera - 相机型号
 * @property {string} exifData.lens - 镜头
 * @property {string} exifData.settings - 拍摄参数
 * @property {string[]} tags - 标签
 * @property {number} width - 图片宽度
 * @property {number} height - 图片高度
 */

/**
 * @typedef {Object} Video
 * @property {string} id - 唯一标识符
 * @property {BilingualText} title - 双语标题
 * @property {BilingualText} description - 双语描述
 * @property {string} platform - 平台（youtube/bilibili/vimeo）
 * @property {string} videoId - 视频ID
 * @property {string} thumbnailUrl - 缩略图URL
 * @property {string} category - 分类（promotional/short-film/documentary）
 * @property {Award[]} awards - 获奖记录
 * @property {string} publishedDate - 发布日期
 * @property {number} duration - 时长（秒）
 * @property {string[]} tags - 标签
 */

/**
 * @typedef {Object} Award
 * @property {string} name - 奖项名称
 * @property {string} level - 奖项级别（gold/silver/special）
 * @property {string} organization - 颁奖机构
 * @property {string} year - 年份
 */

/**
 * @typedef {Object} GameProject
 * @property {string} id - 唯一标识符
 * @property {BilingualText} title - 双语标题
 * @property {BilingualText} description - 双语描述
 * @property {string} coverImage - 封面图
 * @property {string[]} screenshots - 截图数组
 * @property {string} [demoVideo] - 演示视频URL
 * @property {string} [downloadLink] - 下载链接
 * @property {string[]} technologies - 使用的技术栈
 * @property {string} status - 状态（planning/in-development/released）
 * @property {Milestone[]} milestones - 开发里程碑
 * @property {string} startDate - 开始日期
 * @property {string} [releaseDate] - 发布日期
 * @property {string[]} highlights - 亮点特性
 */

/**
 * @typedef {Object} Milestone
 * @property {string} title - 里程碑标题
 * @property {string} description - 描述
 * @property {string} completedDate - 完成日期
 * @property {string} status - 状态（completed/in-progress/planned）
 */

/**
 * @typedef {Object} WorkExperience
 * @property {string} id - 唯一标识符
 * @property {string} role - 职位
 * @property {string} company - 公司名称
 * @property {string} companyLogo - 公司Logo URL
 * @property {string} startDate - 开始日期
 * @property {string} [endDate] - 结束日期（在职则为null）
 * @property {string} description - 职位描述
 * @property {string[]} highlights - 工作亮点
 * @property {string[]} technologies - 使用的技术
 */

/**
 * @typedef {Object} Education
 * @property {string} id - 唯一标识符
 * @property {string} schoolName - 学校名称
 * @property {string} logo - 学校Logo URL
 * @property {string} degree - 学位/学历
 * @property {string} major - 专业
 * @property {string} startDate - 开始日期
 * @property {string} endDate - 结束日期
 * @property {string} description - 描述
 * @property {string[]} highlights - 亮点成就
 * @property {number} [gpa] - GPA
 */

/**
 * 内容API响应包装
 * @typedef {Object} ApiResponse
 * @property {boolean} success - 是否成功
 * @property {*} data - 数据
 * @property {string} [error] - 错误信息
 * @property {Object} [meta] - 元数据（分页、总数等）
 */

export const ContentTypes = {
  ARTICLE: "article",
  PHOTO: "photo",
  VIDEO: "video",
  GAME: "game",
  WORK: "work",
  EDUCATION: "education"
};

export const ContentCategories = {
  WRITING: {
    ESSAY: "essay",
    TECH: "tech",
    CREATIVE: "creative",
    REFLECTION: "reflection",
    ACHIEVEMENT: "achievement"
  },
  PHOTOGRAPHY: {
    URBAN: "urban",
    PORTRAIT: "portrait",
    NATURE: "nature"
  },
  VIDEO: {
    PROMOTIONAL: "promotional",
    SHORT_FILM: "short-film",
    DOCUMENTARY: "documentary"
  },
  GAME: {
    STATUS: {
      PLANNING: "planning",
      IN_DEVELOPMENT: "in-development",
      RELEASED: "released"
    }
  }
};

export const AwardLevels = {
  GOLD: "gold",
  SILVER: "silver",
  SPECIAL: "special",
  BRONZE: "bronze"
};

const contentTypes = {
  ContentTypes,
  ContentCategories,
  AwardLevels
};

export default contentTypes;
