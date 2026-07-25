## 1. 数据模型与 fallback

- [x] 1.1 将 `GitHubProject.id` 放宽为 `number | string`
- [x] 1.2 更新 GitHub fallback stats 和 6 个 pinned 项目数据

## 2. GitHub 服务

- [x] 2.1 保留公开 REST stats 获取逻辑，移除任何前端 token 方案
- [x] 2.2 让 live stats 返回时仍使用 pinned fallback 项目列表

## 3. GitHub 区块 UI

- [x] 3.1 将项目 skeleton 数量扩展为 6 个
- [x] 3.2 移除项目卡底部“查看仓库”Badge，使卡片结构对齐线上

## 4. 验证

- [x] 4.1 运行构建验证 TypeScript 与 Tailwind 类可用
- [x] 4.2 检查 `src` 和 `dist` 不包含 `github_pat_` 或 `Authorization: token`
- [x] 4.3 检查源码包含 6 个 pinned fallback 项目且 GitHub 区块仍在构建中通过
