## ADDED Requirements

### Requirement: 点击人物切换对话框

系统 SHALL 在桌面端允许用户通过点击 Live2D 人物切换对话框展开状态。

#### Scenario: 点击人物展开对话框

- **WHEN** 桌面端用户点击 Live2D 人物且对话框处于收起状态
- **THEN** 系统 MUST 展开对话框

#### Scenario: 再次点击人物收起对话框

- **WHEN** 桌面端用户点击 Live2D 人物且对话框处于展开状态
- **THEN** 系统 MUST 收起对话框

### Requirement: 对话框位于人物左上角

系统 SHALL 将对话框固定展示在 Live2D 人物左上角，并保持其不参与页面文档流布局。

#### Scenario: 展开后定位正确

- **WHEN** 桌面端用户展开对话框
- **THEN** 对话框 MUST 显示在人物左上角

#### Scenario: 不改变主页面布局

- **WHEN** 对话框展开或收起
- **THEN** About、GitHub、留言板和 Footer 的文档流布局 MUST 保持不变

### Requirement: 展开和收起动画

系统 SHALL 为对话框展开和收起提供轻量动画。

#### Scenario: 展开动画

- **WHEN** 对话框从收起切换为展开
- **THEN** 对话框 MUST 通过透明度、位移或缩放变化展示展开动画

#### Scenario: 收起动画

- **WHEN** 对话框从展开切换为收起
- **THEN** 对话框 MUST 通过透明度、位移或缩放变化展示收起动画

### Requirement: 对话框包含消息列表和输入框

系统 SHALL 在对话框内提供消息列表和单行输入框。

#### Scenario: 初始消息列表

- **WHEN** 用户首次展开对话框
- **THEN** 对话框 MUST 展示至少一条默认消息

#### Scenario: 输入框可编辑

- **WHEN** 对话框处于展开状态
- **THEN** 用户 MUST 能在输入框中输入文本

### Requirement: 本地消息提交

系统 SHALL 在用户提交输入后将消息追加到当前页面会话的本地消息列表。

#### Scenario: 提交有效消息

- **WHEN** 用户在输入框输入非空文本并提交
- **THEN** 系统 MUST 将该文本作为用户消息追加到消息列表
- **THEN** 系统 MUST 清空输入框

#### Scenario: 忽略空消息

- **WHEN** 用户提交空白文本
- **THEN** 系统 MUST 不追加新消息

### Requirement: 交互命中边界

系统 SHALL 只让人物点击区域和对话框接收指针事件，悬浮层透明区域不得阻挡页面其他操作。

#### Scenario: 面板内部可交互

- **WHEN** 用户点击对话框内的输入框或滚动消息列表
- **THEN** 对话框 MUST 正常响应交互且不触发收起

#### Scenario: 透明区域不阻挡页面

- **WHEN** 用户点击 Live2D 悬浮层中人物和对话框之外的透明区域
- **THEN** 页面底层元素 MUST 能正常接收点击

### Requirement: 移动端不显示聊天面板

系统 SHALL 在低于桌面断点的视口不显示 Live2D 聊天面板。

#### Scenario: 移动端隐藏面板

- **WHEN** 用户使用低于桌面断点的浏览器访问首页
- **THEN** 页面 MUST 不显示 Live2D 对话框

#### Scenario: 移动端不加载 Live2D 资源

- **WHEN** 用户使用低于桌面断点的浏览器访问首页
- **THEN** 页面 MUST 不加载 Live2D 模型资源和渲染 runtime
