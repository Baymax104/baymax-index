## Why

首页不再需要 GitHub 数据展示和 Live2D 人物，需要完整移除相关实现、资源和依赖，避免继续维护隐藏功能或下载无用资源。

## What Changes

- **BREAKING** 删除 GitHub 统计、Pinned 项目、加载占位及数据获取链路。
- **BREAKING** 删除桌面 Live2D、聊天面板、persona、mock 回复与 LLM SSE 链路。
- 删除两套模型、Cubism runtime、专属样式、无剩余引用的组件和依赖。
- 删除不再使用的 API proxy/rewrite，更新当前开发说明。
- 保留 Hero、About、留言板、Footer 和 GitHub 个人主页外链。

## Capabilities

### New Capabilities

- `homepage-feature-removal`: 定义精简后的首页布局、资源和网络行为。

### Modified Capabilities

- 无；旧 change 作为历史记录保留，本提案取代其中要求展示 GitHub/Live2D 的行为。

## Impact

涉及 App、GitHub/Live2D 专属模块、public 资源、依赖锁文件、Vite/Vercel 配置和 AGENTS.md。不修改独立后端，不提交、推送或部署。
