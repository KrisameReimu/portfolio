# 🚀 多页面优化实施路线图

## 总体战略

从"主页已优化 + 其他页面模板化" → "全站统一品质 + 各页面有特色"

**总工作量**: ~8-10 小时  
**推荐周期**: 1-2 周 (每天改进 1-2 个页面)

---

## 第 1 阶段：基础设施建设（1 小时）

### Task 1.1: 创建全局主题色系统

**文件**: 新建 `src/_pageThemes.scss`

**内容**: 定义所有页面的主题色 token

```scss
// Videos 页面主题
$videos-primary: #D32F2F;      // 红色
$videos-accent: #FF6B6B;       // 亮红
$videos-light: rgba(211, 47, 47, 0.08);

// Awards 页面主题
$awards-primary: #FFD700;      // 金色
$awards-accent: #FFC107;       // 琥珀色
$awards-light: rgba(255, 215, 0, 0.08);

// Photography 页面主题
$photo-primary: #000000;       // 黑色
$photo-accent: #FFFFFF;        // 白色
$photo-light: rgba(0, 0, 0, 0.05);

// Projects 页面主题
$projects-primary: #9C27B0;    // 紫色
$projects-accent: #00E676;     // 荧光绿
$projects-light: rgba(156, 39, 176, 0.08);

// About 页面主题
$about-primary: #1976D2;       // 蓝色
$about-accent: #42A5F5;        // 亮蓝
$about-light: rgba(25, 118, 210, 0.08);
```

**检查点**: 编译无误

---

### Task 1.2: 创建基础组件样式库

**文件**: 新建 `src/_componentBase.scss`

**内容**: 定义通用的 Hero、Card、Button 样式模板

```scss
// Hero Section 基础样式 (所有页面继承)
.page-hero {
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem;
  text-align: center;
  
  h1 {
    font-size: clamp(2rem, 5vw, 3.5rem);
    margin-bottom: 1rem;
    font-family: Georgia, serif;
    font-weight: 700;
  }
  
  .hero-subtitle {
    font-size: 1.1rem;
    color: rgba(0, 0, 0, 0.6);
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.8;
  }
}

// Card 基础样式 (Glassmorphism + 主题色)
.themed-card {
  background: linear-gradient(135deg, rgba(255,255,255,0.6), rgba(255,255,255,0.4));
  backdrop-filter: blur(8px);
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  padding: 1.5rem;
  transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
  }
}

// 主题色 variant
.card-videos { border-left: 4px solid $videos-primary; }
.card-awards { border-left: 4px solid $awards-primary; }
.card-photos { border-left: 4px solid $photo-primary; }
.card-projects { border-left: 4px solid $projects-primary; }
```

**检查点**: 编译无误

---

## 第 2 阶段：Videos Page 优化（1-2 小时）

### Task 2.1: 升级 VideoPage 样式

**文件修改**: `src/pages/VideoPage.scss`

**改动**:

```scss
// 改变 Hero 背景为暗色 + 红色主题
.video-hero {
  background: linear-gradient(135deg, #2a1a1a 0%, #1a1a2e 100%) !important;
  padding: 3rem 2rem;
  
  h1 { color: #FFFFFF; }
  .hero-subtitle { color: rgba(255,255,255,0.8); }
}

// 标签页改为红色主题
.archive-tabs button.active {
  background: $videos-primary;
  border-color: $videos-primary;
}

// 卡片加红色边框 + hover 增强
.archive-card {
  border-left: 4px solid $videos-primary;
  background: rgba(255,255,255,0.5);
  backdrop-filter: blur(6px);
  
  &::before {
    // 播放按钮 overlay
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 60px;
    height: 60px;
    background: rgba($videos-primary, 0.9);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s;
  }
  
  &:hover::before {
    opacity: 1;
    // 三角形播放按钮
    &::after {
      content: "▶";
      color: white;
      font-size: 1.5rem;
    }
  }
}
```

**检查点**: 
- [ ] 构建通过
- [ ] 本地预览效果

---

### Task 2.2: 添加播放按钮组件

**文件**: 修改 `src/pages/VideoPage.js`

**改动**: 在视频卡片上添加播放指示符

```jsx
// 在卡片的 img 上添加 overlay
<div className="video-play-button">
  <div className="play-icon">▶</div>
  <span>{video.duration || "..."}</span>
</div>
```

**检查点**: 视觉效果符合预期

---

## 第 3 阶段：Awards Page 优化（1-2 小时）

### Task 3.1: 升级证书卡片设计

**文件修改**: `src/pages/AwardsPage.scss`

**改动**:

```scss
// Hero 背景为深紫金色
.awards-hero {
  background: linear-gradient(135deg, #2a1a3a 0%, #3a2a5a 100%);
  position: relative;
  
  // 金色光晕背景
  &::before {
    content: "";
    position: absolute;
    top: -50%;
    right: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255,215,0,0.1), transparent 70%);
    pointer-events: none;
  }
  
  h1, .subtitle { color: #FFFFFF; }
}

// 证书卡片 3D flip 效果
.achievement-card {
  perspective: 1000px;
  height: 320px;
  position: relative;
  
  &:hover {
    .card-inner {
      transform: rotateY(180deg);
    }
  }
}

.card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

.card-front,
.card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  padding: 1.5rem;
  border-radius: 12px;
}

.card-front {
  background: linear-gradient(135deg, rgba(255,255,255,0.6), rgba(255,255,255,0.4));
  backdrop-filter: blur(8px);
  border: 1px solid $awards-primary;
  
  // 奖项等级徽章
  .award-badge {
    display: inline-block;
    padding: 0.4rem 0.8rem;
    border-radius: 20px;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    
    &.gold { background: $awards-primary; color: #333; }
    &.silver { background: #C0C0C0; color: #333; }
    &.special { background: #9C27B0; color: white; }
  }
}

.card-back {
  background: linear-gradient(135deg, rgba($awards-primary, 0.9), rgba($awards-accent, 0.8));
  color: white;
  transform: rotateY(180deg);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  
  .award-details {
    font-size: 0.9rem;
    line-height: 1.6;
  }
}
```

**检查点**:
- [ ] 卡片 hover 时翻转
- [ ] 金色光晕显示正常

---

## 第 4 阶段：Photography Page 优化（2-3 小时）

### Task 4.1: 改为画廊白色背景

**文件修改**: `src/pages/PhotoArchivePage.scss`

**改动**:

```scss
// 整体背景改为纯白
body.photo-archive-page {
  background: #FFFFFF !important;
}

.photo-archive {
  background: #FFFFFF;
  min-height: 100vh;
}

// Hero 保持白色，但加精致边框
.photo-hero {
  background: transparent;
  border-bottom: 2px solid #000;
  padding: 2rem 0;
  
  h1 {
    font-size: 2.5rem;
    color: #000;
    font-weight: 700;
  }
}

// 图片网格改为画廊样式
.photo-grid {
  display: grid;
  gap: 2rem;
  padding: 2rem;
  max-width: 1000px;
  margin: 0 auto;
  
  img {
    border: 8px solid #FFFFFF;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    transition: all 0.3s;
    cursor: pointer;
    
    &:hover {
      box-shadow: 0 12px 32px rgba(0,0,0,0.25);
      transform: scale(1.02);
    }
  }
}

// Lightbox 全屏沉浸
.lightbox-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.95);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  
  img {
    max-width: 90vw;
    max-height: 80vh;
    object-fit: contain;
    animation: fadeIn 0.3s;
  }
  
  .photo-meta {
    color: #FFFFFF;
    text-align: center;
    margin-top: 1rem;
    font-size: 0.9rem;
    opacity: 0.8;
  }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

**检查点**:
- [ ] 背景为纯白
- [ ] 图片有白色边框和阴影
- [ ] Lightbox 全屏显示正常

---

### Task 4.2: 实现 Lightbox 功能增强

**文件**: 修改 `src/containers/photography/Photography.js`

**改动**: 添加图片信息、Exif 数据显示

```jsx
// 在 lightbox 中显示图片元信息
const showPhotoMeta = (photo) => {
  return `
    📸 ${photo.title || "Untitled"}
    📍 ${photo.location || ""}
    📅 ${photo.captureDate || ""}
  `;
};
```

**检查点**: 图片详情显示正确

---

## 第 5 阶段：Projects Page 优化（2-3 小时）

### Task 5.1: 创建 Projects 页面主题

**文件**: 新建或改进 `src/pages/ProjectsPage.scss`

**改动**:

```scss
// 深灰黑色背景 (黑客工作室风)
.projects-page {
  background: linear-gradient(135deg, #1a1a2e 0%, #0f3460 100%);
  min-height: 100vh;
}

.projects-hero {
  background: transparent;
  padding: 2rem;
  text-align: center;
  
  h1 {
    font-family: 'Courier New', monospace;
    color: #00E676;  // 荧光绿
    font-size: 1.5rem;
    letter-spacing: 0.05em;
    
    &::before { content: "$ "; }
    &::after { content: " | grep -i work"; }
  }
  
  .hero-subtitle {
    color: rgba(255,255,255,0.7);
    font-family: 'Courier New', monospace;
  }
}

// 项目卡片 - 代码+Demo 混合布局
.project-card {
  background: rgba(15, 52, 96, 0.5);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 230, 118, 0.2);
  border-left: 3px solid #00E676;
  padding: 1.5rem;
  border-radius: 8px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 1.5rem;
  
  .code-section {
    font-family: 'Courier New', monospace;
    font-size: 0.85rem;
    color: #00E676;
    line-height: 1.5;
    overflow-x: auto;
    
    .code-line {
      &::before {
        content: attr(data-line);
        color: rgba(0, 230, 118, 0.5);
        margin-right: 1rem;
      }
    }
  }
  
  .demo-section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    
    img {
      border-radius: 6px;
      border: 1px solid rgba(0, 230, 118, 0.3);
      margin-bottom: 1rem;
    }
    
    .demo-button {
      background: #00E676;
      color: #0f3460;
      border: none;
      padding: 0.8rem 1.5rem;
      border-radius: 6px;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.3s;
      
      &:hover {
        background: #1DE9B6;
        transform: scale(1.05);
      }
    }
  }
  
  .tech-tags {
    grid-column: 1 / -1;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    
    .tag {
      background: rgba(0, 230, 118, 0.1);
      border: 1px solid rgba(0, 230, 118, 0.3);
      color: #00E676;
      padding: 0.3rem 0.8rem;
      border-radius: 20px;
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
    }
  }
}
```

**检查点**:
- [ ] 背景为深灰/紫色
- [ ] 文字为荧光绿(终端风格)
- [ ] 代码+Demo 并排显示

---

## 第 6 阶段：About Page 优化（1-2 小时）

### Task 6.1: Timeline 改版

**文件修改**: `src/pages/AboutPage.scss`

**改动**:

```scss
// 竖向 Timeline 布局
.timeline {
  position: relative;
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  
  &::before {
    // 竖线
    content: "";
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(180deg, $about-primary, $about-accent);
    transform: translateX(-50%);
  }
}

.timeline-item {
  margin-bottom: 2rem;
  position: relative;
  
  &:nth-child(odd) {
    text-align: right;
    margin-right: 50%;
    padding-right: 3rem;
  }
  
  &:nth-child(even) {
    text-align: left;
    margin-left: 50%;
    padding-left: 3rem;
  }
  
  // 圆点
  &::before {
    content: "";
    position: absolute;
    width: 20px;
    height: 20px;
    background: $about-primary;
    border: 3px solid #FFFFFF;
    border-radius: 50%;
    left: 50%;
    transform: translateX(-50%);
    top: 0;
    z-index: 10;
  }
}

.timeline-content {
  background: linear-gradient(135deg, rgba(25,118,210,0.1), rgba(66,165,245,0.08));
  backdrop-filter: blur(6px);
  border: 1px solid rgba(25, 118, 210, 0.2);
  border-radius: 8px;
  padding: 1.5rem;
  transition: all 0.3s;
  
  h3 {
    color: $about-primary;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: rgba(0,0,0,0.7);
    line-height: 1.6;
  }
  
  &:hover {
    border-color: $about-accent;
    background: linear-gradient(135deg, rgba(25,118,210,0.15), rgba(66,165,245,0.12));
  }
}
```

**检查点**:
- [ ] Timeline 竖向显示
- [ ] 左右交替排列
- [ ] 蓝色主题应用

---

## 第 7 阶段：全局优化 & 测试（1 小时）

### Task 7.1: 深色模式兼容性

**文件**: 各页面 SCSS

**改动**: 为每个页面的深色模式适配

```scss
.dark-mode {
  .page-hero h1 { color: #FFFFFF; }
  .themed-card { background: rgba(255,255,255,0.08); }
  
  // Videos dark mode
  .video-hero { background: linear-gradient(135deg, #1a1a2e 0%, #0f1b2e 100%); }
  
  // Awards dark mode
  .awards-hero { background: linear-gradient(135deg, #1a1a1a 0%, #2a1a2a 100%); }
}
```

**检查点**:
- [ ] 所有页面在深色模式下正常显示
- [ ] 对比度满足 WCAG AA

---

### Task 7.2: 响应式测试

在以下尺寸测试:
- [ ] Desktop (1920x1080)
- [ ] Tablet (768x1024)
- [ ] Mobile (375x667)

调整必要的 breakpoints:

```scss
@media (max-width: 768px) {
  .project-card { grid-template-columns: 1fr; }
  .timeline { &::before { display: none; } }
}
```

---

### Task 7.3: 性能优化

- [ ] 构建通过: `npm run build`
- [ ] 无性能警告
- [ ] 所有动效在 60fps 运行

---

### Task 7.4: 最终检查清单

- [ ] 所有页面主题色应用正确
- [ ] Glasmorphism 效果保留
- [ ] 微交互流畅
- [ ] 深色模式兼容
- [ ] 响应式设计完善
- [ ] 构建成功
- [ ] 无访问性问题

---

## 📊 时间预估

| 阶段 | 任务 | 预估时间 |
|------|------|--------|
| 1 | 基础设施 | 1 小时 |
| 2 | Videos | 1-2 小时 |
| 3 | Awards | 1-2 小时 |
| 4 | Photography | 2-3 小时 |
| 5 | Projects | 2-3 小时 |
| 6 | About | 1-2 小时 |
| 7 | 测试优化 | 1 小时 |
| **总计** | | **9-14 小时** |

---

## 🎯 优先顺序推荐

**如果时间紧张，先做这些**:

1. ✅ 第 1 阶段 (必做)
2. ✅ 第 2 阶段 Videos (高收益)
3. ✅ 第 3 阶段 Awards (高收益)
4. ✅ 第 7 阶段 测试 (必做)

这样 4-5 小时就能显著改善主要页面！

---

## 📝 实施检查点

每完成一个阶段，检查:

- [ ] 代码编译通过
- [ ] 本地预览效果符合预期
- [ ] 没有引入新的 bug
- [ ] 响应式设计正常
- [ ] 深色模式兼容

---

*准备好开始优化了吗？建议从第 1-2 阶段开始！* 🚀
