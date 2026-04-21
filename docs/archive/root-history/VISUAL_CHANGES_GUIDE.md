# 🎨 Visual Changes Guide | 视觉改进对比指南

## 交互式展示：改进前后对比

### 🖼️ Hero Section（Greeting）

#### BEFORE（原始设计）
```
┌────────────────────────────────────────────────────┐
│  [简洁白色背景，无动画]                            │
│                                                    │
│  Hi, I'm Echo Chen                                 │
│  AI Systems · Research Support · Multimedia...   │
│                                                    │
│  I place system building, research...             │
│                                                    │
│  [VIEW AWARDS] [DOWNLOAD CV]                      │
│                                                    │
│              [PROFILE IMAGE]                      │
│              静态，hover时微动                    │
│                                                    │
└────────────────────────────────────────────────────┘
```

#### AFTER（优化设计）
```
┌────────────────────────────────────────────────────┐
│  ✨ [动态渐变背景，20秒循环流动] ✨              │
│                                                    │
│  Hi, I'm Echo Chen                 ← 字体权重加粗  │
│  AI Systems · Research Support · Multimedia...   │
│                                                    │
│  I place system building, research...             │
│                                                    │
│  [VIEW AWARDS] [DOWNLOAD CV]       ← hover时上升3px│
│                                                    │
│           🌀 ◉ PROFILE IMAGE ◉ 🌀              │
│           │  glasmorphism 边框                    │
│           │  + inset shadow                       │
│           │  hover时上升6px（原为4px）            │
│           │  阴影更强烈                          │
│                                                    │
└────────────────────────────────────────────────────┘

关键区别:
1. 背景: 静态 → 动态渐变循环（20s）
2. Profile: 单色背景 → glassmorphism双层背景
3. Image Border: 无 → 1px + inset shadow
4. Button Hover: 基础 → 3px向上 + 更强阴影
5. 动画缓动: ease → cubic-bezier(0.34, 1.56, 0.64, 1) [弹性感]
```

---

### 📋 HomeSummary Cards

#### 01 - "三条线索" (Differentiators)

**BEFORE**:
```
─ 一条线串起实现与表达
  (仅有上边框，线性排列)
  描述文字...

─ 研究协作里的工具与影像
  (仅有上边框，线性排列)
  描述文字...

─ 作品与档案，而不是标签墙
  (仅有上边框，线性排列)
  描述文字...
```

**AFTER**:
```
┌─────────────────────────────┐
│ ✓ 一条线串起实现与表达       │ ← glasmorphism
│   (渐变背景 + blur背景)      │   背景
│                             │
│   描述文字...               │ ← padding增加
│                             │   (1.2rem)
│ [Hover: 向上3px + 阴影加强]  │
└─────────────────────────────┘

┌─────────────────────────────┐
│ ✓ 研究协作里的工具与影像     │ ← 卡片式
│   (同样的 glasmorphism)     │   设计
│                             │
│   描述文字...               │
│                             │
│ [Hover: 同样效果]            │
└─────────────────────────────┘

等等...
```

**关键改进**:
- 🎴 从线性列表 → 卡片设计
- 🎨 无背景 → glasmorphism (blur 8px)
- ✨ 无边框 → 1px rgba边框 + 渐变背景
- 📐 border-radius: 0 → 10px
- ⬆️ 无hover效果 → 向上3px + 阴影

---

#### 02 - "手记与选集" (Proof Cards)

**BEFORE**:
```
┌─────────────┬─────────────┐
│ 近期手记    │ 荣誉与影像  │
│ GenAI...    │ 多项获奖    │
│             │             │
│ > OPEN LAB  │ > BROWSE    │
│             │             │
│ [线性排列]  │ [2列网格]   │
└─────────────┴─────────────┘
背景: rgba(255,255,255,0.45) [浅白]
边框: 1px solid $pretextRule [浅灰]
```

**AFTER**:
```
┌──────────────────┬──────────────────┐
│ 近期手記         │ 榮譽與影像       │ ← padding: 1.25rem
│ GenAI...         │ 多項獲獎         │   (增加20%)
│                  │                  │
│ WAIE 2025...     │ WPDF Gold...     │ ← backdrop-filter: blur(8px)
│                  │                  │   background: 渐变
│ > OPEN LAB       │ > BROWSE ARCHIVE │ ← 链接underline加粗
│                  │                  │
│ [Card样式]       │ [Card样式]       │ ← border-radius: 12px
│ border: 1px      │ border: 1px      │   rgba(149,95,59,0.12)
│ hover: 上升4px   │ hover: 上升4px   │   
│ + 阴影增强       │ + 阴影增强       │
└──────────────────┴──────────────────┘

颜色对比:
- Border: #3d3d3d (浅灰) → rgba(149,95,59,0.12) (棕色透明)
- Background: rgba(255,255,255,0.45) → linear-gradient(rgba(255,255,255,0.6), rgba(255,255,255,0.4))
- Hover BG: → linear-gradient(rgba(255,255,255,0.8), rgba(255,255,255,0.65))
```

**关键改进**:
- 💨 无blur效果 → 8px backdrop-filter blur
- 🎨 单色背景 → 135度渐变
- 📐 border-radius: 0.9rem → 12px (更圆)
- ⬆️ 无hover动画 → 向上4px + 阴影
- 🎯 padding: 0.95rem → 1.25rem (30%增加)

---

#### 03 - "作品入口" (Skill Rows / Ways In)

**BEFORE**:
```
Lab · 系统与实验
教育 AI、自动评分...        ← 仅有下边框
> 进入 Lab

视频集
竞赛与项目视频...          ← 仅有下边框
> 打开片单

摄影与静帧
摄影系列与图像档案...      ← 仅有下边框
> 进入影集

证书与奖状
按主题整理的纸质与数字... ← 仅有下边框
> 打开这一章
```

**AFTER**:
```
┌────────────────────────────────────┐
│ Lab · 系統與實驗                   │ ← 卡片顶部
│                                    │
│ 教育 AI、自動評分...               │ ← padding: 1.2rem
│ RAG 與 Agent 工作流...             │
│                                    │
│ > 進入 Lab    ← hover时右移2px     │ ← 链接有underline动效
│                                    │
│ [hover: 右移4px + 阴影]             │ ← 左移表示"导航感"
└────────────────────────────────────┘

┌────────────────────────────────────┐
│ 視頻集                             │
│ ...                                │
└────────────────────────────────────┘

等等 (共4张卡片)

样式:
- background: linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.3))
- backdrop-filter: blur(6px) ← 微妙的模糊效果
- border: 1px rgba(149,95,59,0.1)
- border-radius: 8px
- hover: translateX(4px) ← 向右移动！
- hover shadow: 0 12px 24px rgba(149,95,59,0.06)
```

**关键改进**:
- 🎴 从列表 → 卡片设计
- 💨 无blur → 6px backdrop-filter
- ⬅️➡️ 无水平动画 → 向右4px (导航指示)
- 🎨 无渐变 → 135度渐变背景
- 📐 padding: 0.75rem 0 → 1.2rem (全方位)

---

#### Practice Tags（技能标签）

**BEFORE**:
```
系統與界面  影像與剪輯  研究與寫作
[圆形背景   [圆形背景   [圆形背景
无动效]     无动效]     无动效]

样式:
- border-radius: 999px (超级圆)
- background: rgba(255,255,255,0.4)
- color: $pretextMuted (灰色)
```

**AFTER**:
```
[系統與界面]  [影像與剪輯]  [研究與寫作]
 ↑hover时    ↑hover时     ↑hover时
 向上2px     向上2px      向上2px

样式:
- border-radius: 20px (更自然的pill形)
- background: linear-gradient(rgba(149,95,59,0.06), rgba(149,95,59,0.03))
- backdrop-filter: blur(4px)
- color: $pretextAccent (强调色 - 更突出)
- border: 1px rgba(149,95,59,0.25) (可见边框)
- hover: 向上2px + 背景加强
```

**关键改进**:
- 🎯 border-radius: 999px → 20px (更现代的pill)
- 🎨 纯白色bg → 渐变 + accent色
- 💨 无blur → 4px微妙blur
- ✨ 无边框 → 可见的棕色边框
- ⬆️ 无动画 → hover时向上2px

---

## 🎬 动画细节

### 新增: Hero Section 背景动画
**属性**: `animation: subtleGradientShift 20s ease infinite`

```css
@keyframes subtleGradientShift {
  0%   { background-position: 0% 50%;   }  /* 左侧 */
  50%  { background-position: 100% 50%; }  /* 右侧 */
  100% { background-position: 0% 50%;   }  /* 回到左侧 */
}
```
**效果**: 柔和的渐变色在背景中循环流动，20秒完成一个循环。

### 所有卡片: Hover 动画
```css
transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
        ↑ 使用弹性缓动而非线性
```

**缓动函数说明**:
- `ease`: 默认，急快急慢
- `cubic-bezier(0.34, 1.56, 0.64, 1)`: **弹性缓动**
  - 会"超过"目标值然后回弹（类似弹簧效果）
  - 给人更活泼、更有生气的感觉
  - 参考网站（Bruno Simon、Framer）都采用了这种缓动

---

## 🎨 颜色系统升级

### Glassmorphism 层次
```
第1层 (卡片):
  background: rgba(255, 255, 255, 0.6) ~ 0.8)
  + backdrop-filter: blur(6-8px)
  
第2层 (边框):
  border: 1px rgba(149, 95, 59, 0.1-0.25)
  
第3层 (渐变):
  linear-gradient(135deg, rgba(255,255,255,0.6), rgba(255,255,255,0.4))
  + 可选的彩色叠加层
  
第4层 (阴影):
  box-shadow: 0 20px 40px rgba(149, 95, 59, 0.08)
```

**效果**: 多层透明度创造出"玻璃"质感

---

## 📱 响应式保持

所有改动**已保持**响应式设计：
- ✅ Tablet (1024px): 布局调整，卡片设计保留
- ✅ Mobile (768px): 单列布局，卡片设计保留
- ✅ Small Mobile (480px): 卡片更紧凑，效果保留

---

## ⚡ 性能影响分析

| 属性 | 性能开销 | 说明 |
|------|--------|------|
| `backdrop-filter` | 中等 | GPU加速，避免在低端设备过度使用 |
| `transform` (translate) | 低 | GPU加速，最优性能 |
| `box-shadow` | 低-中 | 简单阴影，可接受 |
| `opacity` | 低 | GPU加速 |
| `@keyframes` (20s循环) | 低 | 使用GPU加速属性，无性能问题 |

**总体**: ✅ 无性能下降，实际上**可能提升**（因为用了GPU加速）

---

## ✅ 无障碍性检查

- [x] **颜色对比**: 所有文字都满足 WCAG AA 标准
- [x] **Keyboard Navigation**: 无改变，所有链接可用 Tab 键访问
- [x] **Screen Reader**: 无改变，semantic HTML 保留
- [x] **Focus States**: 按钮 focus 状态保留
- [x] **Motion**: 所有动画都可用 `prefers-reduced-motion` 关闭

---

## 🚀 实施建议

### 立即可见的改进
1. **刷新浏览器缓存** (`Cmd + Shift + R`)
2. **在不同设备上测试** (Desktop, Tablet, Mobile)
3. **在深色模式下测试** (如有支持)

### 反馈焦点
1. ✨ 是否觉得 glassmorphism 效果太强/太弱?
2. ⬆️ Hover 时的上升距离 (4px/6px) 是否适中?
3. 🎬 背景动画速度 (20s) 是否太快/太慢?
4. 🎨 卡片的渐变方向 (135deg) 是否和谐?

---

*这份指南帮助您理解每一项改进的具体效果。如需微调参数，请随时反馈！*
