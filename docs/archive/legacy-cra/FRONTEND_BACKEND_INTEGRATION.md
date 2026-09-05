# 前后端对接快速参考

## 🚀 三步对接流程

### 1️⃣ 本地开发（使用假数据）

```bash
# 创建 .env.local
cp .env.example .env.local

# 编辑 .env.local 设置
REACT_APP_USE_CMS=false

# 启动前端
npm start
# 访问 http://localhost:3000
```

✅ **此阶段不需要后端**，使用 `src/data/*.js` 的本地数据。

---

### 2️⃣ 对接 Railway CMS（后端部署完成后）

#### 步骤 A：配置 Strapi CORS

在 Railway 项目中编辑 `config/middlewares.js`：

```javascript
module.exports = [
  // ... 其他配置
  {
    name: 'strapi::cors',
    config: {
      origin: [
        'http://localhost:3000',       // 本地开发
        'https://yourdomain.com',      // 生产域名
        'https://*.vercel.app'         // Vercel 预览
      ],
      credentials: true
    }
  },
  // ...
];
```

部署后 Railway 自动重启生效。

#### 步骤 B：配置前端环境变量

编辑 `.env.local`：

```bash
REACT_APP_USE_CMS=true
REACT_APP_STRAPI_URL=https://your-strapi.up.railway.app
REACT_APP_CLOUDINARY_CLOUD_NAME=your-cloud-name
```

重启前端：

```bash
npm start
```

#### 步骤 C：验证连接

打开浏览器控制台（F12）→ Network 面板：

- ✅ 看到请求 `https://your-strapi.up.railway.app/api/articles` 返回 200
- ⚠️ 如果 CORS 错误：检查步骤 A
- 🔄 如果返回空数组：检查 Strapi 内容是否已点击 "Publish"

---

### 3️⃣ 部署到 Vercel

#### 推送代码

```bash
git add .
git commit -m "feat: integrate CMS backend"
git push origin main
```

#### 在 Vercel 配置环境变量

进入 Vercel 项目 → Settings → Environment Variables：

| Key | Value | Environment |
|-----|-------|-------------|
| `REACT_APP_USE_CMS` | `true` | Production, Preview |
| `REACT_APP_STRAPI_URL` | `https://your-strapi.up.railway.app` | Production, Preview |
| `REACT_APP_CLOUDINARY_CLOUD_NAME` | `your-cloud-name` | Production, Preview |

保存后 Vercel 自动重新部署。

---

## 🐛 常见问题排查

| 症状 | 原因 | 解决方案 |
|------|------|----------|
| Network Error / CORS blocked | Strapi 未配置跨域 | 检查 `middlewares.js` 中 origin 配置 |
| 403 Forbidden | API 权限未开放 | Strapi Settings → Roles → Public → 勾选 `find`/`findOne` |
| 返回空数组 | 内容未发布或为草稿 | Strapi 内容管理中点击 "Publish" |
| localhost 正常，生产环境失败 | 环境变量缺失 | 检查 Vercel 环境变量是否正确设置 |
| 图片 404 | Cloudinary 配置错误 | 核对 `REACT_APP_CLOUDINARY_CLOUD_NAME` |

---

## 📝 环境变量速查

### 前端（React）

| 变量 | 开发环境 | 生产环境 | 说明 |
|------|----------|----------|------|
| `REACT_APP_USE_CMS` | `false` | `true` | 开发用本地数据，生产用 CMS |
| `REACT_APP_STRAPI_URL` | (空) 或本地地址 | Railway URL | 后端 API 地址 |
| `REACT_APP_CLOUDINARY_CLOUD_NAME` | 测试 cloud | 正式 cloud | 图片云名称 |

### 后端（Strapi on Railway）

| 变量 | 示例值 | 说明 |
|------|--------|------|
| `DATABASE_URL` | Railway 自动提供 | PostgreSQL 连接串 |
| `NODE_ENV` | `production` | 环境标识 |
| `ADMIN_JWT_SECRET` | (自动生成) | Admin 面板密钥 |
| `API_TOKEN_SALT` | (自动生成) | Token 加密盐 |

详细后端部署见 `docs/RAILWAY_DEPLOYMENT.md`。

---

## 🔒 安全检查清单

- [ ] `.env.local` 已在 `.gitignore` 中（不会提交到 Git）
- [ ] Strapi Public Role 仅开放只读权限（find/findOne）
- [ ] CORS 仅允许信任的域名（不要用 `*`）
- [ ] 前端代码不包含硬编码的敏感 URL 或 token
- [ ] Cloudinary 上传权限限制为后端或本地脚本，前端仅读取
- [ ] Markdown 内容渲染前使用 DOMPurify 清洗（已在 ArticlePage 实现）

---

## 🎯 推荐工作流

### 阶段 1：UI 开发（当前）

```bash
.env.local → REACT_APP_USE_CMS=false
```

专注前端界面，不依赖后端。

### 阶段 2：后端部署

参考 `docs/RAILWAY_DEPLOYMENT.md` 部署 Strapi + PostgreSQL。

### 阶段 3：本地联调

```bash
.env.local → REACT_APP_USE_CMS=true + STRAPI_URL
```

在 `localhost:3000` 测试 CMS 集成。

### 阶段 4：生产发布

Vercel 环境变量配置 → Git push → 自动部署。

---

## 📚 相关文档

- **后端部署**：`docs/RAILWAY_DEPLOYMENT.md`
- **内容管理完整指南**：`CONTENT_MANAGEMENT_GUIDE.md`
- **架构说明**：`.github/copilot-instructions.md`

---

**最后提示**：本地 `localhost:3000` 是开发服务器，与生产环境后端对接完全正常。按照上述流程配置 CORS 和环境变量即可无缝对接！
