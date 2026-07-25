## ADDED Requirements

### Requirement: GitHub 区块展示 pinned 项目列表
GitHub 区块 SHALL 展示与线上版本一致规模的 pinned 项目列表，项目卡最多展示 6 个仓库。

#### Scenario: 展示 6 个 pinned fallback 项目
- **WHEN** GitHub 区块使用 fallback 项目数据渲染
- **THEN** 页面 MUST 展示 `baymax-blog`、`ysu-ai-training`、`jeykll-cli`、`icmpv6-parser`、`CampusNavigator`、`baymax-agent` 六个项目卡

#### Scenario: pinned 项目使用两行三列布局
- **WHEN** 视口宽度达到桌面布局
- **THEN** pinned 项目列表 MUST 使用三列网格展示，六个项目形成两行布局

#### Scenario: 项目卡内容对齐线上
- **WHEN** 项目卡渲染完成
- **THEN** 每张项目卡 MUST 展示项目名称、描述、语言和 star 数，不得展示额外的“查看仓库”按钮或胶囊

### Requirement: GitHub 数据获取不得暴露 token
GitHub 数据能力 SHALL NOT 在前端源码或构建产物中包含 GitHub personal access token。

#### Scenario: 源码不包含 GitHub token
- **WHEN** 检查 `src` 目录
- **THEN** 源码 MUST NOT 包含 `github_pat_` 或 `Authorization: token`

#### Scenario: 构建产物不包含 GitHub token
- **WHEN** 运行生产构建后检查 `dist`
- **THEN** 构建产物 MUST NOT 包含 `github_pat_` 或 `Authorization: token`

### Requirement: GitHub stats 保持公开 REST 获取
GitHub 区块 SHALL 继续通过公开 REST API 获取用户仓库数量、最多语言和贡献 commit 数。

#### Scenario: REST stats 成功时保留 live source
- **WHEN** 公开 REST API 请求成功
- **THEN** GitHub overview MUST 返回 `source: live`，并使用 REST 响应计算 stats

#### Scenario: REST stats 失败时使用 fallback
- **WHEN** 公开 REST API 请求失败
- **THEN** GitHub overview MUST 返回 fallback stats 和 pinned fallback 项目列表
