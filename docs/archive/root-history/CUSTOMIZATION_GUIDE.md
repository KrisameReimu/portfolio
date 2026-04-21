# 个人网站定制指南 / Personal Website Customization Guide

## 📝 概述 / Overview

这个个人网站已经根据你的CV进行了全面的个性化定制，增加了以下新功能：

1. **视频作品展示** - 展示你的获奖视频作品
2. **摄影作品集** - 展示你的摄影作品，支持分类和灯箱效果
3. **游戏开发展示** - 展示你的Unity游戏项目和开发进度
4. **更新的个人信息** - 包括教育背景、工作经历、技能等

## 🎨 如何添加内容

### 1. 添加图片资源

#### 必需的图片文件：

将以下图片添加到 `src/assets/images/` 目录：

**项目相关：**
- `aiProject.png` - AI/ML项目封面图
- `gameDev.png` - 游戏开发项目封面图
- `webDev.png` - Web开发项目封面图
- `videoProduction.png` - 视频制作封面图

**公司Logo：**
- `datricsLogo.png` - Datrics公司Logo
- `polyuLogo.png` - 香港理工大学Logo
- `oxfordLogo.png` - 牛津大学Logo
- `ietLogo.png` - IET Logo
- `polyuAward.png` - 理工大学奖项图标

**游戏开发：**
- `game1.png` - 游戏项目1截图
- `game2.png` - 游戏项目2截图

**视频作品：**
- `video1-thumb.png` - 视频1缩略图
- `video2-thumb.png` - 视频2缩略图
- `video3-thumb.png` - 视频3缩略图

**摄影作品：**
- `urban-cover.png` - 城市摄影封面
- `portrait-cover.png` - 人像摄影封面
- `nature-cover.png` - 自然风光封面

### 2. 配置个人信息

编辑 `src/portfolio.js` 文件：

#### 上传简历
```javascript
const greeting = {
  // ...
  resumeLink: "https://drive.google.com/file/d/your-cv-link", // 上传CV到Google Drive并替换链接
};
```

#### 添加社交媒体链接
```javascript
const socialMediaLinks = {
  github: "https://github.com/KrisameReimu",
  linkedin: "https://www.linkedin.com/in/chenchenai/",
  gmail: "chen944420634@gmail.com",
  instagram: "your-instagram-handle", // 添加Instagram
  youtube: "your-youtube-channel", // 添加YouTube频道
};
```

### 3. 添加视频作品

在 `portfolio.js` 中的 `videoPortfolioSection` 配置：

```javascript
videos: [
  {
    title: "你的视频标题",
    description: "视频描述",
    thumbnail: require("./assets/images/video-thumb.png"),
    videoUrl: "https://www.youtube.com/embed/VIDEO_ID", // YouTube嵌入链接
    category: "类别",
    awards: ["获得的奖项"]
  }
]
```

**如何获取YouTube嵌入链接：**
1. 打开你的YouTube视频
2. 点击"分享" → "嵌入"
3. 复制 `src="https://www.youtube.com/embed/..."` 中的URL

### 4. 添加摄影作品

在 `portfolio.js` 中的 `photographySection` 配置：

```javascript
categories: [
  {
    name: "城市摄影",
    description: "探索城市生活和建筑",
    coverImage: require("./assets/images/urban-cover.png"),
    photos: [
      require("./assets/images/urban/photo1.jpg"),
      require("./assets/images/urban/photo2.jpg"),
      // 添加更多照片
    ]
  }
]
```

**建议的照片组织方式：**
```
src/assets/images/
├── photography/
│   ├── urban/
│   │   ├── photo1.jpg
│   │   ├── photo2.jpg
│   ├── portrait/
│   │   ├── photo1.jpg
│   ├── nature/
│       ├── photo1.jpg
```

### 5. 添加游戏项目

在 `portfolio.js` 中的 `gameDevSection` 配置：

```javascript
games: [
  {
    title: "游戏名称",
    description: "游戏描述",
    image: require("./assets/images/game-screenshot.png"),
    demoVideo: "https://www.youtube.com/embed/DEMO_VIDEO_ID",
    downloadLink: "https://your-game-download-link.com",
    technologies: ["Unity", "C#", "Blender"],
    status: "In Development" // 或 "Completed", "Published"
  }
]
```

### 6. 更新项目链接

在 `bigProjects` 部分更新你的实际项目链接。

## 🚀 运行和部署

### 本地开发
```bash
npm install
npm start
```

### 部署到Vercel
```bash
npm run build
# 然后在Vercel中连接你的GitHub仓库
```

## 📸 图片要求

**推荐尺寸：**
- 项目封面：1200x675px (16:9)
- 视频缩略图：1280x720px (16:9)
- 游戏截图：1920x1080px (16:9)
- 摄影作品：根据原始比例，建议宽度至少1200px
- Logo：正方形，至少200x200px

**格式：**
- 支持 PNG, JPG, JPEG
- 建议使用压缩工具优化图片大小

## 🎯 接下来的步骤

1. ✅ 收集并准备所有图片资源
2. ✅ 将图片放入 `src/assets/images/` 目录
3. ✅ 上传你的视频到YouTube或Vimeo
4. ✅ 更新 `portfolio.js` 中的所有链接和内容
5. ✅ 上传简历到Google Drive并更新链接
6. ✅ 本地测试网站效果
7. ✅ 推送到GitHub并部署到Vercel

## 💡 建议

- 定期更新你的项目和作品
- 保持图片质量的同时注意文件大小
- 添加详细的项目描述以展示你的技能
- 使用专业的照片和视频展示你的最佳作品

## 📞 需要帮助？

如果你在配置过程中遇到任何问题，可以：
1. 检查浏览器控制台的错误信息
2. 确保所有图片路径正确
3. 验证所有必需的依赖已安装

祝你打造出完美的个人品牌网站！🎉
