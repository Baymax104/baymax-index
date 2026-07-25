## 1. 留言板组件

- [x] 1.1 新增 `MessageBoardSection` 组件，包含标题、副标题、容器 ref 和进入动画
- [x] 1.2 在组件中注入 giscus script，并配置线上一致的 data 属性与 cleanup

## 2. Hero 导航

- [x] 2.1 更新 `HeroSection` props，支持 `onMessageBoardClick`
- [x] 2.2 在 Hero 社交按钮区新增“留言板”按钮并复用现有按钮视觉样式

## 3. 首页编排

- [x] 3.1 更新 `App`，新增留言板 section ref 和内部滚动目标 ref
- [x] 3.2 将留言板插入 GitHub 区块之后、Footer 之前，并让 Hero 按钮平滑滚动到留言板容器

## 4. 验证

- [x] 4.1 运行构建验证 TypeScript 与 Tailwind 类可用
- [x] 4.2 检查源码包含 giscus 配置、Hero 留言板按钮和 GitHub 后的留言板顺序
