## Context

线上 bundle 中留言板逻辑通过 `https://giscus.app/client.js` 动态创建 script，并设置以下关键属性：

- `data-repo="Baymax104/baymax-blog"`
- `data-repo-id="R_kgDOPgcTmQ"`
- `data-mapping="number"`
- `data-term="3"`
- `data-reactions-enabled="0"`
- `data-emit-metadata="0"`
- `data-input-position="top"`
- `data-theme="preferred_color_scheme"`
- `data-lang="zh-CN"`
- `data-loading="lazy"`

Hero 中新增一个按钮，点击后调用 `scrollIntoView({ behavior: 'smooth', block: 'start' })` 滚动到留言板内部容器。

## Goals / Non-Goals

**Goals:**

- 新增 `MessageBoardSection`，在可见时使用现有左右进入动画。
- 动态注入 giscus script，并在组件卸载时清理容器内容。
- Hero 社交按钮区新增“留言板”按钮，视觉样式与社交链接一致。
- App 维护留言板内部目标元素 ref，用于 Hero 按钮平滑滚动。

**Non-Goals:**

- 不实现自建评论系统。
- 不修改 giscus 仓库配置。
- 不处理 GitHub OAuth 权限或评论数据同步。

## Decisions

1. **手动注入 giscus script，而不是引入 React 包。**
   - 理由：线上版本使用原生 script 注入；当前需求是对齐线上效果，不需要额外依赖。

2. **将滚动目标设为 giscus 容器而非 section 顶部。**
   - 理由：线上 bundle 使用 `setBoardElement` 保存内部 div，点击后更接近输入区位置。

3. **Hero 新增 `onMessageBoardClick` prop。**
   - 理由：Hero 不应知道页面下方 ref；App 负责页面编排和滚动行为。

## Risks / Trade-offs

- [Risk] giscus 脚本依赖外部网络，离线或被拦截时留言框不会加载 → 仍保留标题和最小高度容器，页面布局稳定。
- [Risk] React StrictMode 在开发环境会重复挂载 effect → effect 先 `replaceChildren()` 再 append script，并在 cleanup 时清空容器。
