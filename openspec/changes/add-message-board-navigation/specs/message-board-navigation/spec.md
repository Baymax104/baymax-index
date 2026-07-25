## ADDED Requirements

### Requirement: 首页展示留言板区块
首页 SHALL 在 GitHub 区块之后、Footer 之前展示留言板区块。

#### Scenario: 留言板出现在 GitHub 后
- **WHEN** 用户滚动到 GitHub 区块下方
- **THEN** 页面 MUST 展示标题为 `留言板` 的区块，并显示 `欢迎留言交流`

#### Scenario: 留言板预留 giscus 容器
- **WHEN** 留言板区块渲染完成
- **THEN** 页面 MUST 提供一个最小高度为留言组件预留的容器

### Requirement: 留言板加载 giscus
留言板区块 SHALL 使用线上版本一致的 giscus 配置加载评论组件。

#### Scenario: giscus script 注入
- **WHEN** 留言板组件挂载
- **THEN** 系统 MUST 向留言板容器注入 `https://giscus.app/client.js` script

#### Scenario: giscus 配置一致
- **WHEN** giscus script 被创建
- **THEN** script MUST 包含 `data-repo="Baymax104/baymax-blog"`、`data-mapping="number"`、`data-term="3"`、`data-lang="zh-CN"` 和 `data-loading="lazy"`

### Requirement: Hero 提供留言板导航
Hero 区块 SHALL 在社交按钮旁提供“留言板”按钮，点击后平滑滚动到留言板输入区域。

#### Scenario: Hero 显示留言板按钮
- **WHEN** Hero 区块渲染完成
- **THEN** 社交按钮区 MUST 显示文本为 `留言板` 的按钮

#### Scenario: 点击留言板按钮滚动
- **WHEN** 用户点击 Hero 中的 `留言板` 按钮
- **THEN** 页面 MUST 调用平滑滚动，将视图移动到留言板容器起始位置
