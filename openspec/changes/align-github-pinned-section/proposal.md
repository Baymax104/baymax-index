## Why

当前 GitHub 区块仍展示按 star 数排序的 3 个仓库，和线上版本中展示 6 个 pinned repositories 的效果不一致。需要先把 GitHub 区块的项目列表、空态和 fallback 数据对齐线上，同时避免复刻线上 bundle 中暴露 GitHub token 的实现。

## What Changes

- GitHub 项目列表从 3 个扩展为最多 6 个 pinned 项目卡。
- fallback 数据改为线上截图可见的 pinned 项目：`baymax-blog`、`ysu-ai-training`、`jeykll-cli`、`icmpv6-parser`、`CampusNavigator`、`baymax-agent`。
- GitHub stats 继续使用公开 REST API 获取；项目列表在无安全后端时使用静态 pinned fallback 保持线上视觉效果。
- 移除项目卡底部“查看仓库”胶囊，使卡片结构贴近线上版本。
- 不引入前端 GitHub token。

## Capabilities

### New Capabilities

- `github-pinned-section`: 覆盖 GitHub 区块展示 pinned 项目列表、fallback 数据、安全边界与线上视觉对齐要求。

### Modified Capabilities

- 无。

## Impact

- 影响 `src/data/fallback.ts`、`src/services/github.ts`、`src/components/sections/GithubSection.tsx`。
- 可能影响 `GitHubProject.id` 类型，以便同时支持 REST 数字 id 和 GraphQL 字符串 id。
- 不新增依赖，不改变 SWR hook 使用方式。
