# 🎬 Videos页面重新设计 - 实现方案

## 📐 新的页面结构

```
┌─────────────────────────────────────────┐
│  Featured Video Carousel Hero           │ ← 新增：精选视频轮动展示
│  (自动轮播/可手动切换)                  │   - 大尺寸视频卡片
│                                         │   - 详细背景故事
│                                         │   - 过渡动画
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  Latest Uploads                         │ ← 最近上传（按上传时间倒序）
│  [卡片1] [卡片2] [卡片3] ...            │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  2024 Archive (5 videos)                │ ← 按年份分组展开
│  [卡片1] [卡片2] [卡片3] ...            │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  2023 Archive (3 videos)                │
│  [卡片1] [卡片2] [卡片3]                │
└─────────────────────────────────────────┘
```

---

## 🎯 核心改动

### 1. Hero部分：精选视频轮动

#### 视觉设计
```
┌──────────────────────────────────────────┐
│                                          │
│     [视频缩略图/嵌入 - 大尺寸]           │
│                                          │
│     ┌──────────────────────────────────┐ │
│     │ 标题                              │ │
│     │                                  │ │
│     │ 详细背景故事：                    │ │
│     │ "2024年 POLYU EEE Service       │ │
│     │  Learning QS Award Video，      │ │
│     │  讲述了在Vietnam、Cambodia等    │ │
│     │  地方Service Learning的故事"    │ │
│     │                                  │ │
│     │ [← 上一个] • • • [下一个 →]    │ │
│     └──────────────────────────────────┘ │
└──────────────────────────────────────────┘
```

#### 技术实现
- 从所有视频中选出有 `featured: true` 或 `awards` 的作为精选
- 自动轮播（5秒间隔）
- 可点击左右箭头或圆点手动切换
- 平滑过渡动画

#### 数据结构示例
```javascript
{
  id: "video-1",
  title: {
    zh: "EEE Service Learning之旅",
    en: "EEE Service Learning Journey"
  },
  description: {
    zh: "快速概述",
    en: "Quick Overview"
  },
  backgroundStory: {
    zh: "2024年POLYU EEE Service Learning QS Award Video，讲述了在Vietnam、Cambodia等地Service Learning的故事，展现跨国志愿服务的意义与影响",
    en: "2024 POLYU EEE Service Learning QS Award Video, telling stories from Service Learning experiences in Vietnam, Cambodia and more, showcasing the meaning and impact of cross-border volunteer service"
  },
  videoId: "...",
  thumbnailUrl: "...",
  featured: true,  // ← 标记为精选
  publishedDate: "2024-03-15",
  awards: [...],
  category: "documentary"
}
```

---

### 2. 下方内容：按最近上传和年份展开

#### Latest Uploads 部分
```
显示最近 6-8 个上传的视频
- 按 publishedDate 倒序
- 每个卡片显示：缩略图 + 标题 + 简短背景 + 上传时间
```

#### Year-based Archive 部分
```
2024 Archive
├─ 5 videos
└─ [卡片排列]

2023 Archive
├─ 3 videos
└─ [卡片排列]

2022 Archive
├─ 2 videos
└─ [卡片排列]
```

---

## 🎨 视觉改动清单

### 删除
- ❌ 统计卡片（Total Awards / Gold / Silver / Special）
- ❌ 过滤按钮（all / gold / silver / special）

### 保留 & 优化
- ✅ 标题和副标题
- ✅ 视频卡片设计（保留Glassmorphism）
- ✅ 响应式布局

### 新增
- ✅ Featured Video Carousel Hero
- ✅ 每个视频的详细背景故事字段
- ✅ Latest Uploads 分组
- ✅ Year-based Archive 分组
- ✅ 轮播导航（圆点 / 箭头）

---

## 📝 实现步骤

### Step 1: 更新数据结构
- [ ] 为portfolioShowcase添加 `backgroundStory` 字段
- [ ] 为certificationCards中的视频添加 `featured` 标记
- [ ] 从API获取视频时保留 `backgroundStory`

### Step 2: 创建FeaturedVideoCarousel组件
- [ ] 状态管理：当前选中的精选视频索引
- [ ] 自动轮播逻辑（useEffect + interval）
- [ ] 左右箭头和圆点导航
- [ ] 平滑过渡动画

### Step 3: 修改VideoPage.js
- [ ] 删除导航选项卡（highlights / by year）
- [ ] 整合Hero为 FeaturedVideoCarousel
- [ ] 新增 Latest Uploads 分组
- [ ] 新增 Year-based Archive 分组

### Step 4: 优化VideoPortfolio.js
- [ ] 删除 award-stats 部分
- [ ] 删除 filter-buttons 部分
- [ ] 调整样式（取消过滤导致的样式混乱）

### Step 5: 更新SCSS
- [ ] VideoPage.scss 中添加轮播样式
- [ ] VideoPortfolio.scss 中清理统计相关样式
- [ ] 确保响应式布局正确

### Step 6: 测试
- [ ] npm build 验证编译
- [ ] 浏览器测试轮播交互
- [ ] 响应式测试（mobile/tablet/desktop）
- [ ] 深色模式验证

---

## 📊 预计工作量

| 任务 | 时间 |
|------|------|
| 更新数据结构 | 15分钟 |
| 创建FeaturedVideoCarousel组件 | 30分钟 |
| 修改VideoPage架构 | 20分钟 |
| 优化VideoPortfolio | 15分钟 |
| SCSS调整 | 15分钟 |
| 测试验证 | 15分钟 |
| **总计** | **1.5-2小时** |

---

## 🎬 最终效果预览

用户访问 `/videos` 时：

1. **进入页面** → FeaturedVideoCarousel 自动开始轮播
   - 首张精选视频展示大尺寸卡片
   - 显示详细背景故事
   - 底部圆点指示当前位置

2. **向下滚动** → Latest Uploads 部分
   - 看到最近上传的6-8个作品
   - 每个卡片显示简明背景故事
   - 了解你最新的创意输出

3. **继续滚动** → Year-based Archive
   - 按年份分组浏览历史作品
   - 一眼看出每年的创作数量和主题
   - 可点击进入年度详情

**整体体验**：从"统计数字堆砌" → "创意故事叙述"

---

## ⚙️ 需要你的输入

在我开始实现前，请确认：

1. **精选视频的选择标准**
   - 只要 `featured: true` 的？
   - 还是 `featured: true` + `awards.length > 0` 的？
   - 还是手动在 portfolioShowcase 中标记？

2. **Latest Uploads 的数量**
   - 显示最近 6 个？8 个？10 个？

3. **轮播的自动播放**
   - 要自动轮播吗？（每5秒切换）
   - 还是只支持手动点击切换？

4. **年份档案的呈现**
   - 一屏显示所有年份？
   - 还是折叠式（点击年份展开/收起）？

---

**一旦确认这些细节，我就能快速实现！** 🚀
