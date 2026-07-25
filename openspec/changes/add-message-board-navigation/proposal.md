## Why

线上当前版本在 GitHub 区块后提供“留言板”，首屏也有“留言板”按钮可直接滚动到评论输入区。本地早期版本缺少这个用户交互入口和 giscus 留言能力。

## What Changes

- 新增留言板区块，位于 GitHub 区块之后、Footer 之前。
- 使用 giscus client script 动态挂载留言板。
- Hero 社交按钮区新增“留言板”按钮。
- 点击 Hero 中“留言板”按钮时平滑滚动到留言板输入区域。

## Capabilities

### New Capabilities

- `message-board-navigation`: 覆盖留言板渲染、giscus 配置和 Hero 到留言板的页面内导航。

### Modified Capabilities

- 无。

## Impact

- 影响 `src/App.tsx`、`src/components/sections/HeroSection.tsx`。
- 新增 `src/components/sections/MessageBoardSection.tsx`。
- 使用现有 `useInView`、`sectionClass`、lucide 图标和浏览器 DOM API。
- 不新增 npm 依赖。
