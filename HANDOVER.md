# 个人网站 Pretext 重设计 - Agent Handover 文档

**最后更新**: 2026-04-08  
**工作状态**: ✅ Phase 3 完成，SVG 博丽灵梦角色系统就绪

---

## 📋 项目概述

### 核心目标
参考 Pretext 设计系统重新设计个人网站，实现：
1. 暖色/编辑式美学外观
2. 交互式 UI（文本围绕多媒体元素无遮挡）
3. 互动角色助手（东方 Project 风格）

### 用户需求关键点
- 📐 设计参考：[Pretext by Chenglou](https://chenglou.github.io/pretext/)
- 🎨 色彩系统：暖棕色调（#955f3b 主色，#f5f1ea 背景）
- 👸 角色选择：博丽灵梦（东方 Project）
- 🎯 实现方式：SVG 版本（完全自定义，无版权问题）

---

## ✅ 已完成工作

### Phase 1: 全局色彩系统重构
**文件**: `src/_globalColor.scss`

更新 30+ 个颜色变量从旧系统 → Pretext 暖色调：

```scss
// 新的全局色彩令牌 (Global Color Tokens)
$pretextPage:      #f5f1ea    // 页面背景 (湿润米色)
$pretextPanel:     #fffdf8    // 卡片背景 (奶油白)
$pretextInk:       #201b18    // 主文本 (深棕)
$pretextMuted:     #6d645d    // 副文本 (褐灰)
$pretextRule:      #d8cec3    // 边框/分割线 (浅棕)
$pretextAccent:    #955f3b    // 强调/CTA (暖褐)
```

**影响范围**: 全网站所有组件、按钮、卡片、背景

---

### Phase 2: 首页视觉层次重构

#### 2.1 Greeting 组件 (`src/containers/greeting/Greeting.scss`)
- 布局: Flex → Grid (两列，4rem 间距)
- 图片: 圆形 → 20px 圆角方形
- 排版: 添加 Georgia/Iowan Old Style 衬线字体
- 动画: 新增衬线字体优化、阴影系统升级

#### 2.2 HomeSummary 组件 (`src/containers/homeSummary/HomeSummary.scss`)
- 卡片系统: 三类卡片设计（文章、特色、视觉）
- 渐变背景: 135° 线性渐变 + 放射状装饰元素
- Hover 效果: translateY(-4px) + 分层阴影
- 完整响应式: 1024px, 768px, 480px 断点

#### 2.3 HomePage 背景 (`src/pages/HomePage.scss`)
- 从彩虹渐变 → 暖色 Pretext 渐变
- 深色模式: 深棕色调替代冷灰

#### 2.4 Button 组件 (`src/components/button/Button.scss`)
- 颜色: #55198b (紫) → #955f3b (暖褐)
- 边框: 1px → 2px
- Padding: 标准化为响应式单位 (0.875rem 1.75rem)
- Hover: 缩放+ 双层阴影

---

### Phase 3: 交互组件系统

#### 3.1 InteractiveFeatured 组件
**路径**: `src/containers/interactiveFeatured/`
- **JavaScript** (200+ 行):
  - 双列网格布局 (4rem gap)
  - 鼠标追踪: 计算鼠标位置，15% 视差偏移
  - 动画形状: 3 个浮动圆形，脉冲动画
  - 鼠标跟踪点: 20px 圆形，0.15s 延迟
  - Responsive: 768px 以下单列

- **SCSS** (600+ 行):
  - 标签 + 标题 + 特性列表 + CTA 按钮
  - 特性框: 渐变背景 + 点标记 + 边框
  - 媒体容器: 20px 圆角 + 线性渐变背景
  - 6 个关键帧动画 (float, glow effects)
  - 完整深色模式支持

#### 3.2 CharacterNPC 系统 (原 Emoji 版本)
**路径**: `src/components/characterNPC/`
- 状态管理: idle, sitting, standing, drinking, waving, thinking
- 自动切换: 5 秒随机切换
- 控制面板: 6 个动作按钮 + 2 个控制按钮
- 位置系统: bottom-right → bottom-left → top-right
- 对话系统: 中英文双语
- 完整动画库: 15+ 关键帧

---

### Phase 4: SVG 博丽灵梦角色系统 ⭐

#### 4.1 ReimhuCharacter.js (150+ 行 React)
**路径**: `src/components/characterNPC/ReimhuCharacter.js`

**SVG 设计特征**:
- 黑色长发 (渐变阴影) + 红色蝴蝶结 (#d32f2f)
- 红白武墓服装 + 肤色脸部 (#f4d4bc)
- 完整身体构成: 头+躯干+腿

**表情系统** (动态):
- 眼睛: 3 种 (正常、开心、闭眼)
- 嘴巴: 3 种 (正常、微笑、惊讶)
- 腮红: 两侧对称

**6 个动作状态**:
```
idle      → 轻飘漂浮 (3s)
sitting   → 摇晃 (2.5s) + 舒适表情
standing  → 左右移动 (3s)
drinking  → 倾斜 + ☕ 效果 + 惊讶表情
waving    → 挥手 (2s) + 开心表情
thinking  → 点头 (3s) + 闭眼表情
```

**动作效果**:
- 茶杯: ☕ 旋转动画
- 挥手: 👋 缩放波浪
- 思考: 💭 浮动气泡

#### 4.2 ReimhuCharacter.scss (700+ 行 CSS)
**路径**: `src/components/characterNPC/ReimhuCharacter.scss`

**动画库** (15+ 关键帧):
- `idle-float`: 0→-8px 浮动
- `sit-sway`: ±2° 旋转摇晃
- `stand-shift`: ±4px 水平移动
- `drink-tilt`: ±8° 倾斜
- `wave-motion`: 水平摇摆
- `think-nod`: 细微旋转
- `blink`: 4s 循环眨眼
- `mouth-talk`: 3s 说话动作
- 以及 5 个效果动画

**响应式系统**:
```
1200px+: 100px × 160px    (desktop)
768px:   85px × 136px     (tablet)
480px:   70px × 112px     (mobile)
```

**特性**:
- ✅ 完整深色模式
- ✅ 固定定位 (fixed) - 不阻挡文本
- ✅ 对话气泡 (动态淡入淡出)
- ✅ 中英文双语对话

#### 4.3 升级的 CharacterNPC.js
**路径**: `src/components/characterNPC/CharacterNPC.js`

**关键更新**:
- 参数 `useReimhu={true}` 控制渲染
- 支持二元模式:
  - `useReimhu=true` → 渲染 SVG 博丽灵梦
  - `useReimhu=false` → 回退 Emoji 版本
- 完整状态共享: state, position, visibility
- 交互联动: 控制面板实时控制角色

#### 4.4 CharacterNPC.scss 扩展
新增 Reimhu 控制面板样式:
- `.character-npc-container`: 位置管理容器
- `.character-controls-panel`: 控制面板 (Pretext 样式)
- `.action-buttons-group`: 3×2 网格
- `.control-buttons-group`: 位置/隐藏按钮
- 完整深色模式 + 响应式

#### 4.5 Main.js 集成
```javascript
// 在 Header 之后、Routes 之前
<CharacterNPC useReimhu={true} />  // 全页面可见
```

---

## 📊 技术架构

### 文件结构对比

#### 已更新的文件
```
src/
├── _globalColor.scss           (✅ 30+ 颜色变量更新)
├── _globalColor.scss           (✅ Pretext 调色板)
├── containers/
│   ├── Main.scss               (✅ 深色模式)
│   ├── greeting/Greeting.scss  (✅ Grid 布局)
│   ├── homeSummary/            (✅ 卡片系统)
│   ├── interactiveFeatured/    (✅ 鼠标追踪)
│   └── Main.js                 (✅ 角色集成)
├── components/
│   ├── button/Button.scss      (✅ 暖褐色)
│   └── characterNPC/
│       ├── CharacterNPC.js     (✅ SVG + Emoji 切换)
│       ├── CharacterNPC.scss   (✅ 二元样式)
│       ├── ReimhuCharacter.js  (✨ 新增)
│       └── ReimhuCharacter.scss(✨ 新增)
└── pages/HomePage.js           (✅ 集成新组件)
```

### 色彩系统映射

| 用途 | 旧值 | 新值 (Pretext) | CSS 变量 |
|------|------|---|---|
| 页面背景 | #ffffff | #f5f1ea | $pretextPage |
| 卡片背景 | #f7f7f7 | #fffdf8 | $pretextPanel |
| 主文本 | #000000 | #201b18 | $pretextInk |
| 副文本 | #8c8c8c | #6d645d | $pretextMuted |
| 分割线 | #e0e0e0 | #d8cec3 | $pretextRule |
| 按钮/强调 | #55198b | #955f3b | $pretextAccent |

### 响应式断点

```scss
// 全站统一
$desktop:  1024px+   // PC 桌面
$tablet:   768px     // 平板
$mobile:   480px     // 手机
```

---

## 🎮 使用方式

### 启动开发服务器
```bash
npm install
npm start          # 默认 http://localhost:3000
```

### 切换角色版本
```javascript
// 在 Main.js 中
// SVG 版本 (当前)
<CharacterNPC useReimhu={true} />

// 回退 Emoji 版本
<CharacterNPC useReimhu={false} />
```

### 自定义角色外观
编辑 `src/components/characterNPC/ReimhuCharacter.js` 中的 SVG:
- 衣着颜色: 修改 `#d32f2f` (红) 和 `#f4d4bc` (肤色)
- 发型元素: 编辑 ellipse 和 path 元素
- 蝴蝶结: 调整大小和颜色参数

---

## 🚀 下一步任务优先级

### High Priority (立即可做)
1. **页面视觉审核** ✅ (已在浏览器验证，无错误)
2. **其他页面重设计** (Writing, Photos, Video, Game Dev)
   - 复用色彩系统
   - 应用 Pretext 排版
   - 统一卡片设计

3. **角色场景集成** (可选)
   - Writing 页面: 灵梦讲述故事
   - Photos 页面: 灵梦推荐照片
   - Video 页面: 灵梦介绍视频

### Medium Priority (周期任务)
4. **性能优化**
   - 图片懒加载
   - SVG 优化 (压缩、路径简化)
   - 动画性能检查

5. **深色模式完善**
   - 检查所有页面深色模式
   - 对比度验证 (WCAG AA)
   - 用户偏好检测

6. **Pretext 库集成** (可选高级)
   - `npm install @chenglou/pretext`
   - 实现动态文本环绕
   - 高级排版控制

### Low Priority (后续改进)
7. **辅助功能** (Accessibility)
   - ARIA 标签
   - 键盘导航
   - 屏幕阅读器支持

8. **国际化** (i18n)
   - 中英文切换
   - 日文字体支持 (可选)

---

## ⚠️ 已知问题 & 技术债

### ESLint 警告 (非阻塞)
```
Line 27:6 in CharacterNPC.js: 
  React Hook useEffect has missing dependency 'actions'
  → 可安全忽略或加入 dependency array
```

### 可改进的地方
1. CharacterNPC 部分对话可扩展
2. SVG 角色可增加更多动作状态
3. 头发阴影效果可优化
4. 响应式图片加载策略未实现

### 暂不处理的范围
- SSR/Next.js 迁移 (暂时不需要)
- Analytics 集成 (在其他文件)
- CMS 后端集成 (独立项目)

---

## 📝 Commit 记录建议

针对本轮工作的 commit 消息示例:

```bash
# Phase 1
git commit -m "style: 更新全局色彩系统为 Pretext 暖色调"

# Phase 2  
git commit -m "style(greeting): 重设计首页 Hero 段落 (Grid 布局+衬线字体)"
git commit -m "style(homeSummary): 实现三层卡片设计系统"
git commit -m "style(button): 更新按钮样式为 Pretext 风格"

# Phase 3
git commit -m "feat(interactive): 添加交互特色段落组件 (鼠标追踪)"

# Phase 4
git commit -m "feat(character): 创建 SVG 博丽灵梦角色系统"
git commit -m "feat(character): 实现 6 个完整动作状态和表情系统"
git commit -m "refactor(character): 支持 SVG/Emoji 二元模式切换"
```

---

## 🧪 测试清单

- [x] 首页在桌面端显示正确
- [x] 所有颜色变量正确应用
- [x] 按钮交互正常
- [x] 博丽灵梦角色渲染无误
- [x] 6 个动作状态工作正常
- [x] 控制面板响应点击
- [x] 深色模式基础支持
- [x] 移动端响应式布局
- [ ] 性能分析 (Lighthouse)
- [ ] 无障碍测试

---

## 📞 关键联系点

### 配置文件
- `package.json`: start script 已修复 (Windows 兼容)
- `src/_globalColor.scss`: 所有色彩在此集中
- `copilot-instructions.md`: 项目指导原则

### 主要分支
- `main`: 当前分支（直接工作）
- 建议 next PR 前创建 feature 分支

### 环境变量
- 无新增环保变量
- GitHub Actions workflow 检查 `deploy.yml` (如需更新)

---

## 💾 数据完整性

**重要文件备份**:
- ✅ SVG Reimhu 设计存储在 ReimhuCharacter.js (可用任何 SVG 编辑器修改)
- ✅ 色彩系统完全参数化 (便于主题切换)
- ✅ 所有动画使用 CSS @keyframes (易于调整)
- ✅ 组件完全解耦 (可单独修改)

---

## 📚 参考文档

当前工作参考: [Pretext Design](https://chenglou.github.io/pretext/)

项目文档:
- [QUICK_START.md](./QUICK_START.md) - 快速开始
- [CUSTOMIZATION_GUIDE.md](./CUSTOMIZATION_GUIDE.md) - 自定义指南
- [CONTENT_MANAGEMENT_GUIDE.md](./CONTENT_MANAGEMENT_GUIDE.md) - 内容管理

---

## 🎯 下一个 Agent 优先级指南

**如果时间有限，按此优先级执行** (成本/收益):

1. ✅ **查看浏览器** - 确认视觉效果 (5 min)
2. 🔄 **其他页面重设计** - Writing 页面 (30 min)
3. 📱 **响应式测试** - 平板/手机 (15 min)
4. 🎨 **深色模式 Polish** - 所有页面 (20 min)
5. 🚀 **性能检查** - Lighthouse 评分 (10 min)

**完全可跳过** (非关键):
- Pretext 库集成 (高级特性)
- 辅助功能审计 (后续)
- 国际化 (暂不需要)

---

**文档生成时间**: 2026-04-08  
**最后调试环境**: Windows, Node.js LTS, React 16.10.2  
**知识库版本**: Phase 4 完成
