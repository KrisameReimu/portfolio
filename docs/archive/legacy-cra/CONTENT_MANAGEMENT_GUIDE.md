# Moved from project root to docs/ (organizational cleanup)

```diff
- 原路径: /CONTENT_MANAGEMENT_GUIDE.md
+ 新路径: /docs/CONTENT_MANAGEMENT_GUIDE.md
```

（以下为原始内容）

# 内容管理完全指南

## 📋 快速开始

### 第一步：注册云服务账号

#### Cloudinary（图片托管 - 推荐）
1. 访问 https://cloudinary.com/users/register/free
2. 注册免费账号（10GB存储 + 25GB流量/月）
3. 获取您的 `Cloud Name`（在Dashboard顶部）
4. 更新 `src/config/assets.js` 第8行

#### YouTube（视频托管）
1. 上传视频到 https://studio.youtube.com
2. 获取视频ID（URL中的11位字符）
3. 在portfolio.js中使用：`videoId: "dQw4w9WgXcQ"`

---

## 📸 照片上传流程

### 方法1：Cloudinary Web界面（推荐新手）

```bash
1. 登录 Cloudinary Dashboard
2. 点击 "Media Library" → "Upload"
3. 创建文件夹：
   - photography/urban
   - photography/portrait
   - photography/nature
4. 拖拽照片到对应文件夹
5. 复制图片的 Public ID（例如：photography/urban/photo1）
```

### 方法2：批量上传工具

安装Cloudinary CLI：
```bash
npm install -g cloudinary-cli
cld config

# 批量上传
cld uploader upload ./my-photos/urban/*.jpg folder=photography/urban
```

### 更新portfolio.js：

 
```javascript
import {getPhotoGallery} from './config/assets';

const photographySection = {
  categories: [
    {
      name: "Urban Photography",
      photos: getPhotoGallery('urban', [
        'hongkong-001.jpg',  // 只写文件名
        'hongkong-002.jpg',
        'tokyo-night.jpg'
      ])
    }
  ]
};
```

---

## 🎬 视频管理流程

### YouTube嵌入示例：

```javascript
import {getVideoEmbedUrl} from './config/assets';

const videoPortfolioSection = {
  videos: [
    {
      title: "Gold Award作品",
      videoUrl: getVideoEmbedUrl('youtube', 'YOUR_VIDEO_ID'),
      thumbnail: getImageUrl('videos/thumbnails/gold-award.jpg')
    }
  ]
};
```

### 获取YouTube视频ID：
```
完整URL: https://www.youtube.com/watch?v=dQw4w9WgXcQ
视频ID:  dQw4w9WgXcQ （问号后面的部分）
```

---

## ✍️ 文章迁移方案

### 选项A：本地Markdown文件

1. 在 `public/articles/` 创建文件：

```markdown
---
title: "我的第一篇技术文章"
titleEn: "My First Tech Article"
date: "2024-11-07"
category: "Tech Insights"
---

# 标题

从微信公众号复制过来的内容...
```

2. 在portfolio.js中引用：

```javascript
const writingShowcaseSection = {
  articles: [
    {
      title: "我的第一篇技术文章",
      filePath: "/articles/my-first-article.md"
    }
  ]
};
```

### 选项B：GitHub独立仓库

1. 创建新仓库：`website-articles`
2. 上传所有文章Markdown文件
3. 在assets.js中更新URL
4. 使用GitHub Raw链接访问

---

## 🎨 项目截图管理

### 推荐结构：

```
Cloudinary文件夹：
/projects
  /melina-game
    cover.jpg          (1200x675 封面)
    screenshot-1.jpg   (1920x1080 截图)
    screenshot-2.jpg
  /genai-feedback
    cover.jpg
    demo.gif          (可以存GIF动图)
```

### 在portfolio.js中使用：

```javascript
import {getImageUrl} from './config/assets';

const bigProjects = {
  projects: [
    {
      projectName: "Melina Dream of Hero",
      image: getImageUrl('projects/melina-game/cover.jpg'),
      screenshots: [
        getImageUrl('projects/melina-game/screenshot-1.jpg'),
        getImageUrl('projects/melina-game/screenshot-2.jpg')
      ]
    }
  ]
};
```

---

## 📊 资源大小参考

| 类型 | 建议尺寸 | 文件大小 | 格式 |
|------|---------|---------|------|
| 项目封面 | 1200×675 | 100-300KB | JPG |
| 照片作品 | 1920×1280 | 300-800KB | JPG |
| 视频缩略图 | 1280×720 | 100-200KB | JPG |
| 文章封面 | 1200×630 | 100-200KB | JPG |
| Logo | 200×200 | 10-30KB | PNG |

**Cloudinary会自动优化，您只需上传高质量原图！**

---

## ⚡ 性能优化技巧

### 1. 响应式图片尺寸

```javascript
// 缩略图（节省流量）
getImageUrl('photo.jpg', {width: 400})

// 全屏查看
getImageUrl('photo.jpg', {width: 1920})
```

### 2. 懒加载

```javascript
// 在Photography组件中
import {LazyLoadImage} from 'react-lazy-load-image-component';

<LazyLoadImage
  src={photo}
  effect="blur"
  threshold={300}
/>
```

### 3. WebP自动转换

Cloudinary自动转换，无需手动处理：
```javascript
getImageUrl('photo.jpg', {format: 'auto'}) 
// 会根据浏览器支持自动返回WebP或JPG
```

---

## 🔄 内容更新工作流

### 日常添加新照片：

```bash
# 1. 上传到Cloudinary的对应文件夹
# 2. 打开 src/portfolio.js
# 3. 在对应数组中添加文件名：

const photographySection = {
  categories: [
    {
      name: "Urban",
      photos: getPhotoGallery('urban', [
        // ... 现有照片
        'new-photo-2024-11-07.jpg'  // 👈 添加这一行
      ])
    }
  ]
};

# 4. git commit & push
# 5. Vercel自动部署
```

### 发布新视频：

```bash
# 1. 上传到YouTube
# 2. 获取视频ID
# 3. 在portfolio.js添加：

videos: [
  // ... 现有视频
  {
    title: "新视频标题",
    videoUrl: getVideoEmbedUrl('youtube', 'NEW_VIDEO_ID'),
    awards: ["Special Award"]
  }
]
```

---

## 💡 进阶技巧

### 自动化脚本（可选）

创建 `scripts/upload-photos.js`：

```javascript
// 批量生成portfolio配置
const fs = require('fs');
const path = require('path');

const photosDir = './photos/urban';
const files = fs.readdirSync(photosDir);

const config = files
  .filter(f => f.endsWith('.jpg'))
  .map(f => `'${f}'`)
  .join(',\n        ');

console.log(`photos: [\n        ${config}\n      ]`);
```

运行：
```bash
node scripts/upload-photos.js
# 复制输出到portfolio.js
```

---

## 📞 常见问题

**Q: Cloudinary免费额度够用吗？**
A: 10GB存储约可容纳2000张高质量照片，25GB流量约支持25,000次访问。对个人网站完全够用。

**Q: 视频一定要用YouTube吗？**
A: 不是。国内可用Bilibili，专业可用Vimeo。只需修改assets.js中的平台配置。

**Q: 如何备份资源？**
A: Cloudinary有导出功能；YouTube可下载原视频；建议本地保留一份高清原件。

**Q: 如何批量替换占位符？**
A: 上传真实资源后，在portfolio.js中找到对应的数组，替换文件名即可。

---

## ✅ 检查清单

上线前确认：

- [ ] Cloudinary账号创建并获取Cloud Name
- [ ] 更新 `src/config/assets.js` 第8行
- [ ] 测试图片链接是否正常访问
- [ ] YouTube视频设置为"公开"或"不公开（链接可访问）"
- [ ] 检查所有外部链接是否有效
- [ ] 测试移动端加载速度

---

## 🚀 下一步行动

1. 立即注册Cloudinary账号
2. 上传5-10张最佳作品测试
3. 更新assets.js配置
4. 在portfolio.js中引用
5. 本地测试 `npm start`
6. 推送到GitHub → Vercel自动部署

**需要帮助？** 参考本指南或随时询问！

---

## 🔧 深度架构与后端部署（Strapi + Railway）

> 本节补充生产级内容管理架构：数据模型、迁移脚本、CMS接入、媒体策略、安全、性能与运维。与 `docs/RAILWAY_DEPLOYMENT.md` 互补：那里是“怎么部署”，这里是“为什么这样设计 + 如何演进”。

## 🏗 总体拓扑

 
```text
Vercel Frontend (React SPA)
   │  REST / GraphQL
   ▼
Railway Strapi CMS (Node.js)
   ├─ PostgreSQL  (结构化内容)
   ├─ Cloudinary  (图片/截图/封面变换)
   ├─ YouTube/Bilibili (视频承载)
   └─ Webhooks → 触发前端缓存失效 & 搜索索引刷新
```

## 📂 内容模型映射

| 模块 | 前端数据来源 | Strapi类型 | 关键字段 | 特殊组件 |
|------|---------------|-----------|----------|----------|
| 文章 Article | `data/writings.js` | collectionType | 双语标题/摘要/分类/标签/阅读时长 | 无 |
| 照片 Photo | `data/photography.js` | collectionType | 标题/描述/分类/EXIF/标签 | 无 |
| 视频 Video | `data/videos.js` | collectionType | 平台/视频ID/奖项/分类/时长 | Award(组件) |
| 游戏项目 GameProject | `data/gamedev.js` | collectionType | 标题/描述/状态/技术栈/封面 | Milestone(组件) |

### 推荐组件结构示例（Award / Milestone）

`components/award.json`
```json
{
  "collectionName": "components_award",
  "info": {"displayName": "Award"},
  "attributes": {
    "name": {"type": "string", "required": true},
    "level": {"type": "enumeration", "enum": ["gold","silver","special"], "required": true},
    "organization": {"type": "string"},
    "year": {"type": "string"}
  }
}
```

`components/milestone.json`
```json
{
  "collectionName": "components_milestone",
  "info": {"displayName": "Milestone"},
  "attributes": {
    "title": {"type": "string", "required": true},
    "description": {"type": "text"},
    "completedDate": {"type": "date"},
    "status": {"type": "enumeration", "enum": ["completed","in-progress","planned"], "required": true}
  }
}
```

## 🔄 数据迁移策略

阶段式：
步骤：

1. “Freeze” 前端本地数据（不再新增直接硬编码）  
2. 导出 JSON（将 `data/*.js` 转换为纯对象文件）  
3. 运行迁移脚本 → POST 到 Strapi API  
4. 启用 `REACT_APP_USE_CMS=true` → 验证前端渲染  
5. 清理旧数据模块（保留备份 zip）  

迁移脚本示例（articles）：
```javascript
// scripts/migrate-articles.js
const fetch = require('node-fetch');
const articles = require('./export/articles.json');

const API = process.env.STRAPI_URL + '/api/articles';
const TOKEN = process.env.STRAPI_ADMIN_TOKEN;

(async () => {
  for (const a of articles) {
    const payload = { data: {
      title_zh: a.title.zh,
      title_en: a.title.en,
      excerpt_zh: a.excerpt.zh,
      excerpt_en: a.excerpt.en,
      category: a.category,
      tags: a.tags,
      readingTime: a.readingTime,
      publishedDate: a.publishedDate,
      featured: !!a.featured
    }};
    const res = await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${TOKEN}` },
      body: JSON.stringify(payload)
    });
    console.log(res.ok ? 'Imported:' + a.id : 'Failed:' + a.id, await res.text());
  }
})();
 
```text

## 🖼 媒体命名规范（Cloudinary）

```text
portfolio/
  articles/{slug}/cover.jpg
  photos/urban/hk-night-001.jpg
  photos/portrait/portrait-001.jpg
  projects/melina/screenshot-1.jpg
  videos/thumbnails/promo-2024.jpg
```

访问：`https://res.cloudinary.com/<cloud>/image/upload/q_auto,f_auto,w_640/portfolio/photos/urban/hk-night-001.jpg`

## 🛡 安全与权限

| 目标 | 措施 |
|------|------|
| 草稿隔离 | Strapi Draft & Publish，只在前端请求 `publicationState=live` |
| 防意外写入 | Public Role 仅开放 `find`/`findOne` |
| API令牌管理 | 使用短期 Admin Token + 每季度轮换 |
| XSS防护 | 富文本渲染前使用 DOMPurify 清洗 |
| 失效缓存 | 发布后触发 Vercel webhook（可选）|

DOMPurify前端使用：
```bash
npm install dompurify marked
```text
```javascript
import DOMPurify from 'dompurify';
import { marked } from 'marked';
const html = DOMPurify.sanitize(marked(markdownSource));
```

## ⚡ 性能优化清单

| 场景 | 方案 |
|------|------|
| 图片多尺寸 | Cloudinary 变换 `q_auto,f_auto,w_<size>` |
| 首屏减载 | 视频 iframe 延迟加载（点击或进入视窗再挂载） |
| 列表大量 | 后端分页 `?pagination[page]=1&pagination[pageSize]=10` |
| 重复请求 | 前端引入 SWR/React Query 缓存（未来） |
| SEO | 文章详情注入 `<title>` / OG 图 / canonical |

## 🧪 测试与验证

| 测试 | Action | 预期 |
|------|--------|------|
| 健康检查 | GET `/api/articles?limit=1` | 返回200及data数组 |
| 回退机制 | 关闭CMS环境变量 | 前端自动使用本地 data 模块 |
| 安全 | 请求未启用权限的写操作 | 返回403 |
| Markdown注入 | 输入含`<script>`的内容 | 页面不执行脚本 |

## 🔁 演进路线（Roadmap）

阶段 1：静态本地 → CMS切换完成（当前进行）  
阶段 2：搜索/标签统计（Meilisearch 或内置聚合API）  
阶段 3：Webhook + 增量构建（Vercel ISR）  
阶段 4：多作者与审核流（Reviewer Role + 状态字段）  
阶段 5：国际化插件替换手工 zh/en 字段  

## 📦 环境变量对照（扩展）

| 变量 | 用途 | 示例 |
|------|------|------|
| REACT_APP_USE_CMS | 切换数据源 | true / false |
| REACT_APP_STRAPI_URL | CMS基础URL | `https://cms.yourdomain.com` |
| REACT_APP_CLOUDINARY_CLOUD_NAME | 图片云名称 | my-cloud |
| STRAPI_ADMIN_TOKEN | 迁移脚本写入 | (secure) |
| CLOUDINARY_KEY/SECRET | 上传授权 | (secure) |

---

## 🔗 前后端对接实战指南

### localhost开发环境说明

**你的前端运行在 `localhost:3000`，后端将在 Railway 部署后有独立域名（如 `https://your-strapi.up.railway.app`）**

✅ **完全正常**：前端开发服务器只是本地调试，与生产环境后端对接没有任何冲突。

关键配置策略：

#### 1. 本地开发环境（开发阶段）

创建 `.env.local`（已在 `.gitignore`，不会提交）：

```bash
# 开发时先用本地数据，避免依赖后端
REACT_APP_USE_CMS=false

# 或如果你已部署 Strapi 到 Railway，可以直接测试对接：
# REACT_APP_USE_CMS=true
# REACT_APP_STRAPI_URL=https://your-strapi.up.railway.app
```

```bash
npm start  # 本地访问 http://localhost:3000
```

#### 2. 生产环境配置（Vercel部署）

在 Vercel 项目设置 → Environment Variables 添加：

```text
REACT_APP_USE_CMS=true
REACT_APP_STRAPI_URL=https://your-strapi.up.railway.app
REACT_APP_CLOUDINARY_CLOUD_NAME=your-cloud-name
```

Vercel 构建后自动注入这些变量，生产站点会读取真实 CMS 数据。

#### 3. CORS 配置（重要！）

Strapi 必须允许你的前端域名跨域请求：

**在 Railway Strapi 项目中修改 `config/middlewares.js`：**

```javascript
module.exports = [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      origin: [
        'http://localhost:3000',              // 本地开发
        'https://yourdomain.com',             // 生产域名
        'https://*.vercel.app'                // Vercel预览环境
      ],
      credentials: true
    }
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
```

部署后 Railway 会自动重启，CORS 生效。

#### 4. API 请求调试技巧

在 `src/services/contentAPI.js` 中已有日志，浏览器控制台会显示：

```javascript
// contentAPI.js 中的调试输出
```javascript
console.log('Fetching from:', API_URL);
console.log('CMS Mode:', USE_CMS);
```

打开浏览器 DevTools → Network 面板，筛选 XHR：

- ✅ 看到请求到 `https://your-strapi.up.railway.app/api/articles` → CMS 对接成功
- ⚠️ 如果失败，检查 Response Headers 是否有 CORS 错误
- 🔄 如果返回空数组，检查 Strapi 是否已发布内容（Draft & Publish）

#### 5. 开发时的推荐工作流

##### 阶段 A：本地开发 UI（当前）

```bash
.env.local → REACT_APP_USE_CMS=false
npm start
# 使用 data/*.js 假数据，不依赖后端
```

##### 阶段 B：后端部署完成后联调

```bash
.env.local → REACT_APP_USE_CMS=true + 添加 STRAPI_URL
npm start
# 前端 localhost:3000 直接请求 Railway CMS
# 确保 Strapi CORS 已配置 localhost:3000
```

##### 阶段 C：上线验证

```bash
# 推送代码到 GitHub
# Vercel 自动构建 + 注入生产环境变量
# 访问 https://yourdomain.vercel.app 验证
```
```

打开浏览器 DevTools → Network 面板，筛选 XHR：
- ✅ 看到请求到 `https://your-strapi.up.railway.app/api/articles` → CMS 对接成功
- ⚠️ 如果失败，检查 Response Headers 是否有 CORS 错误
- 🔄 如果返回空数组，检查 Strapi 是否已发布内容（Draft & Publish）

#### 5. 开发时的推荐工作流

**阶段 A：本地开发 UI（当前）**
```bash
.env.local → REACT_APP_USE_CMS=false
npm start
# 使用 data/*.js 假数据，不依赖后端
```

**阶段 B：后端部署完成后联调**
```bash
.env.local → REACT_APP_USE_CMS=true + 添加 STRAPI_URL
npm start
# 前端 localhost:3000 直接请求 Railway CMS
# 确保 Strapi CORS 已配置 localhost:3000
```

**阶段 C：上线验证**
```bash
# 推送代码到 GitHub
# Vercel 自动构建 + 注入生产环境变量
# 访问 https://yourdomain.vercel.app 验证
```

#### 6. 常见对接问题排查

| 问题 | 原因 | 解决 |
|------|------|------|
| Network Error | CORS未配置 | 检查Strapi `middlewares.js` |
| 403 Forbidden | 权限未开放 | Strapi Settings → Roles → Public → 勾选 `find`/`findOne` |
| 返回空数组 | 内容未发布 | Strapi 内容条目点击 "Publish" |
| localhost能访问，生产不行 | 环境变量缺失 | 检查 Vercel 环境变量是否正确 |
| 图片404 | Cloudinary URL错误 | 检查 `assets.js` 中 `CLOUDINARY_CLOUD_NAME` |

#### 7. 安全最佳实践

**永远不要在前端代码中硬编码后端URL或敏感信息！**

✅ 正确：

```javascript
const API_URL = process.env.REACT_APP_STRAPI_URL || 'http://localhost:1337';
```

❌ 错误：

```javascript
const API_URL = 'https://my-secret-cms.railway.app'; // 泄露到源码
```

**Strapi Admin Token 仅用于迁移脚本（服务端运行），前端只读公共接口不需要 token。**

#### 8. 本地 Mock 后端（可选）

如果还未部署 Railway，可以本地临时运行 Strapi：

```bash
npx create-strapi-app@latest my-cms --quickstart
cd my-cms
npm run develop  # 运行在 http://localhost:1337
```

然后前端配置：

```bash
REACT_APP_USE_CMS=true
REACT_APP_STRAPI_URL=http://localhost:1337
```

这样可以先验证 CMS 集成逻辑，后续再迁移到 Railway 生产环境。

---

## 🧹 清理策略

迁移完成后：
清理步骤：

1. 删除或归档 `data/*.js`（保留一个备份压缩包）  
2. 精简 `portfolio.js` 保留个性化基础信息（greeting/social/meta）  
3. 在 GitHub README 中更新“使用CMS”说明  
4. 添加脚本 `scripts/export-backup.js` 定期导出 JSON 快照  

---

> 本文档与部署指南互补：部署操作看 `docs/RAILWAY_DEPLOYMENT.md`；整体策略与演进看此文件。完成后端首次上线后，优先做文章详情页与数据回退验证，再进入搜索/缓存阶段。
