export const PHOTO_VIEW_MODES = ["featured", "archive", "year"];

export const DEFAULT_PHOTO_VIEW_MODE = "featured";

export const photosPageCopy = {
  title: {zh: "Photos", en: "Photos"},
  subtitle: {
    zh: "我把摄影页当成展厅，而不是占位图墙。没有整理好的系列时，页面会先说明 archive logic，再等待真实作品接管版面。",
    en: "I treat the photography page as an exhibition, not a placeholder wall. When a series is not curated yet, the page explains the archive logic and waits for real work to take over."
  },
  tabs: {
    featured: {zh: "Featured Set", en: "Featured Set"},
    archive: {zh: "Archive", en: "Archive"},
    year: {zh: "Year View", en: "Year View"}
  },
  introPoints: [
    {
      zh: "只发布真实拍摄、已整理完成、愿意长期保留的图像。",
      en: "Publish only real images that are curated, finished, and worth keeping long-term."
    },
    {
      zh: "如果系列还没准备好，宁可留白，也不拿模板填满页面。",
      en: "If a series is not ready, leave space instead of filling the page with template imagery."
    },
    {
      zh: "正式归档后会按年度与主题展开，不会把图片和说明拆成无意义碎片。",
      en: "Once sets are ready, they will expand by year and theme without being broken into meaningless fragments."
    }
  ],
  stageTitle: {zh: "Exhibition Notes", en: "Exhibition Notes"},
  stageLead: {
    zh: "当前摄影页先公开方法和节奏：真实归档、缓慢补档、让图像比说明更靠前。",
    en: "For now, the page publishes its method and pacing: real archives, gradual release, and images taking priority over explanation."
  },
  archiveTitle: {zh: "Archive Status", en: "Archive Status"},
  archiveLead: {
    zh: "当下这部分更像 darkroom log，而不是内容农场。",
    en: "At the moment this reads more like a darkroom log than a content farm."
  },
  categoryCards: [
    {
      label: {zh: "Release mode", en: "Release mode"},
      value: {
        zh: "只在系列准备好时公开",
        en: "Publish only when a series is ready"
      }
    },
    {
      label: {zh: "Published frames", en: "Published frames"},
      value: {
        zh: "由真实归档决定，不拿占位图补齐",
        en: "Determined by real archives, never padded with placeholders"
      }
    },
    {
      label: {zh: "Reading style", en: "Reading style"},
      value: {
        zh: "先看氛围与路径，再进入年度档案",
        en: "Read the atmosphere and path first, then enter the yearly archive"
      }
    }
  ],
  featuredNotes: [
    {
      label: {zh: "Atmosphere first", en: "Atmosphere first"},
      title: {
        zh: "摄影页不追求一上来铺满，而是先留出展览的呼吸感。",
        en: "The photography page does not aim to be instantly full; it makes room for exhibition-like breathing space first."
      }
    },
    {
      label: {zh: "Archive discipline", en: "Archive discipline"},
      title: {
        zh: "当图集准备好时，年度与主题会自然出现，不需要模板撑场面。",
        en: "When a set is ready, year and theme naturally appear without templates trying to hold the stage."
      }
    },
    {
      label: {zh: "Next release", en: "Next release"},
      title: {
        zh: "下一步是让首批正式图集接管 Featured Set，而不是继续扩写说明文字。",
        en: "The next step is to let the first released set take over Featured Set instead of writing more explanatory copy."
      }
    }
  ],
  latestWall: {zh: "Published Frames", en: "Published Frames"},
  explore: {zh: "进入该年度", en: "Open Year"},
  count: {zh: "张作品", en: "photos"},
  latest: {zh: "最近拍摄", en: "Latest"},
  empty: {
    zh: "目前还没有正式公开的照片归档。等首批图集整理好后，这个区域会直接切换成真实照片墙。",
    en: "There is no published photo archive yet. Once the first real set is ready, this area will switch directly into a real photo wall."
  },
  emptyStage: {
    zh: "首批作品仍在整理，因此这个展厅先公开方法与节奏，而不是伪装出一面完整照片墙。",
    en: "The first released set is still being curated, so this exhibition opens with method and pacing instead of pretending to have a finished wall."
  },
  yearEmpty: {
    zh: "当首批系列发布后，这里会按年份展开归档入口。",
    en: "Once the first set is released, year-based archive entries will appear here."
  }
};
