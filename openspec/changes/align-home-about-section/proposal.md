## Why

当前项目是 baymaxam.top 的早期版本，内容区只有 GitHub 模块，缺少线上当前版本中承接首屏后的个人介绍与页面背景层次。先补齐 About 区块和内容区结构，可以建立后续 GitHub pinned 与留言板变更的页面骨架。

## What Changes

- 在首屏下方新增与线上版本一致的“关于我”内容区块。
- 将内容区调整为带视觉背景装饰的滚动区域，并保持现有首屏 sticky 效果。
- 在 App 中增加 About 区块的视口检测与进入动画。
- 保持 GitHub 数据源、留言板能力不在本变更中处理。

## Capabilities

### New Capabilities

- `home-about-section`: 覆盖首页 About 区块、内容区骨架、进入动画与线上视觉对齐要求。

### Modified Capabilities

- 无。

## Impact

- 影响 `src/App.tsx` 的页面编排。
- 新增 `src/components/sections/AboutSection.tsx`。
- 复用现有 `useInView`、`sectionClass` 和 Tailwind/shadcn 样式体系。
- 不新增运行时依赖，不改变路由、构建脚本或外部 API。
