## Context

GitHub 板块通过 useGitHubOverview/SWR 读取 API，失败时使用 fallback；Live2D 动态加载 Pixi/Cubism 和本地模型，聊天虽默认关闭但仍保留完整实现。两者是前端后端 API 的全部调用方。

## Goals / Non-Goals

完整移除这两项能力及其专属资源，保持其他区域和留言导航可用。不删除 GitHub 外链或基于 GitHub Discussions 的 Giscus，不修改独立后端。

## Decisions

- 从 App 移除组件、ref、可见性状态和数据 hook，使 About 与留言板自然相邻，不保留空白容器。
- 删除专属服务、配置、类型、fallback、样式和资源，移除 SWR 与两个 Pixi 直接依赖；同步锁文件。
- 清理仅被删除功能使用的 Card、Skeleton、Button、数字格式化和 Pin/Star 图标；保留共享 Badge、Separator、动画工具和 GitHub 图标。
- 移除 Vite server.proxy 和 Vercel API rewrite；Giscus 直接加载第三方服务，不受影响。
- 更新 AGENTS.md 的现行约定，保留既有 OpenSpec change 作为历史，不改写历史验证记录。

## Risks / Trade-offs

- 误删共享资源：用全局引用检查和构建确认依赖边界。
- 留言板布局或导航回归：桌面和移动浏览器验证标题、外链、跳转和 Giscus 容器。
- 第三方留言服务不可达：区分脚本注入与外部实际加载结果，明确报告。

## Migration Plan

完成代码、资源与依赖清理，运行 OpenSpec strict、build、lint，再验证两种视口无相关 API/模型请求。恢复功能需要通过版本控制恢复实现及依赖。
