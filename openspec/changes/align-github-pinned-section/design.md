## Context

线上 bundle 的 GitHub 区块通过 GitHub GraphQL `pinnedItems(first: 6, types: REPOSITORY)` 查询 pinned repositories，并在请求中设置 `Authorization: token ...`。这能得到线上截图中的 6 个 pinned 项目，但在前端 bundle 暴露 token 是不可接受的安全风险。

本地当前实现只使用公开 REST API：

- `/users/Baymax104`
- `/users/Baymax104/repos?per_page=100&sort=updated`
- 每个 repo 的 `contributors_url`

该路径可继续提供 stats，但无法无认证读取 pinned repositories。

## Goals / Non-Goals

**Goals:**

- GitHub 区块项目列表视觉上对齐线上：最多 6 个 pinned 项目，三列网格，两行卡片。
- fallback 数据对齐截图可见 pinned 项目名称、描述、语言和 star 数。
- 保留公开 REST stats 获取能力；REST 成功时 stats 标记为 live。
- 构建产物不得包含 GitHub token 或 `github_pat_` 片段。

**Non-Goals:**

- 不实现后端代理或 serverless API。
- 不在前端读取私密环境变量 token。
- 不保证 pinned 列表运行时自动跟随 GitHub pinned 设置变化。

## Decisions

1. **使用静态 pinned fallback 作为项目列表权威来源。**
   - 理由：前端无认证无法读取 GraphQL pinnedItems；静态数据能对齐当前线上视觉且没有凭据泄露。
   - 备选：把线上 token 写入源码或 `VITE_` 环境变量。放弃原因是任何前端 token 都会进入 bundle。
   - 备选：抓取 GitHub HTML。放弃原因是不稳定，且容易受 GitHub 页面结构和 CORS 影响。

2. **REST stats 与 pinned 项目列表解耦。**
   - 理由：repo count、top language、commit count 可以继续从公开 REST 获取；项目列表需要固定为线上 pinned fallback。
   - 影响：当 REST 成功时 `source` 为 `live`，但项目卡仍来自静态 pinned fallback。

3. **将 `GitHubProject.id` 放宽为 `number | string`。**
   - 理由：REST repo id 是 number，GraphQL id 是 string；静态 fallback 使用字符串更清晰。

4. **移除项目卡底部“查看仓库”Badge。**
   - 理由：线上截图中的项目卡只显示名称、描述、语言和 star 数，不显示额外 CTA 胶囊。

## Risks / Trade-offs

- [Risk] pinned 项目以后变化时静态 fallback 可能过期 → 未来可以新增安全后端代理变更，专门提供 pinned 数据。
- [Risk] stats live 但 projects static 可能让“数据源：实时”含义不够精确 → 当前目标是视觉对齐；后续如需严谨可把 source 拆成 statsSource/projectsSource。
- [Risk] screenshot 中项目名称 `jeykll-cli` 可能是仓库真实拼写或截图误读 → 按截图和用户目标优先保持当前线上可见效果。
