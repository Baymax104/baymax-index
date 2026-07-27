## Context

当前 `Live2DWidget` 已作为桌面端右下角悬浮组件挂载在首页，并通过 `matchMedia('(min-width: 1024px)')` 控制 Live2D runtime 和模型资源只在桌面端加载。

现有组件为了避免遮挡页面交互，将外层容器设置为 `pointer-events-none`，并将 Live2D 模型设置为非交互。新增聊天面板后，需要让人物和面板可点击，同时继续保证透明悬浮区域不吞掉页面点击。

## Goals / Non-Goals

**Goals:**

- 点击 Live2D 人物时展开或收起对话框。
- 对话框固定显示在人物左上角。
- 展开和收起具备轻量动画，使用 CSS transition 完成。
- 对话框包含消息列表和输入框。
- 输入消息后追加到当前页面会话内的本地消息列表。
- 保持移动端不显示、不初始化 Live2D 和聊天面板交互。
- 保持悬浮层透明区域不影响页面其他内容交互。

**Non-Goals:**

- 不接入远程 AI/API、GitHub API 或任何后端服务。
- 不持久化聊天记录到 localStorage、后端或评论系统。
- 不实现富文本、Markdown、流式输出、语音、文件上传或快捷指令。
- 不实现像素级人物命中检测；初版接受矩形点击区域。
- 不新增动画库。

## Decisions

### 使用组件内部本地状态

`Live2DWidget` 管理 `isChatOpen` 和本地 `messages` 状态。默认包含一条 assistant 欢迎消息，用户提交输入后追加 user 消息。

备选方案是引入全局状态或持久化存储。放弃原因是当前能力只属于页面内轻量交互，跨页面、跨刷新保存都不在范围内。

### 拆分 `Live2DChatPanel` 子组件

新增 `Live2DChatPanel` 子组件承载消息列表、输入框和提交逻辑。`Live2DWidget` 继续负责 Live2D runtime 生命周期、桌面断点和面板开关状态。

备选方案是把所有 JSX 写在 `Live2DWidget` 中。放弃原因是 Live2D 初始化逻辑已经较重，再混入表单和消息列表会降低可读性。

### 使用人物容器作为点击切换区域

Live2D 外层仍保持 `pointer-events-none`，但人物 canvas 所在容器设置 `pointer-events-auto` 和 `button` 语义，用于切换面板。面板本身也设置 `pointer-events-auto`，支持输入框操作。

备选方案是启用 Pixi 模型自身点击事件。放弃原因是当前模型已禁用 `autoInteract`，Pixi 命中和 React UI 状态联动更复杂；矩形点击区域足够满足初版需求。

### 对话框固定在人物左上角

面板使用绝对定位挂在 Live2D widget 内部，建议位置为 `right-[180px] bottom-[220px]` 或对应配置化参数。这样面板随人物的固定右下角位置移动，不参与页面文档流。

面板最大宽度和高度应稳定，消息列表内部滚动，避免消息增多导致面板挤压页面或跳动。

### CSS transition 实现展开和收起动画

面板常驻 DOM，通过 `isChatOpen` 切换 class：

- 打开：`opacity-100 translate-x-0 translate-y-0 scale-100 pointer-events-auto`
- 关闭：`opacity-0 translate-x-4 translate-y-5 scale-[0.96] pointer-events-none`

常驻 DOM 可以保留收起动画，不需要引入 unmount 延迟状态。

## Risks / Trade-offs

- 矩形点击区域可能覆盖人物外透明区域 → 将点击容器限制在当前人物 canvas 尺寸内，外层继续 `pointer-events-none`。
- 对话框遮挡页面内容 → 控制面板宽高，并固定在人物左上角；验证桌面视口下不遮挡主要交互。
- 输入框点击触发收起 → 只有人物点击容器绑定切换事件，面板内部不绑定关闭事件。
- 消息过多导致布局跳动 → 面板固定高度，消息列表内部滚动。
- 移动端误加载面板逻辑 → 组件可渲染轻量 DOM，但不得在移动端加载 Live2D runtime 或模型资源；面板应随桌面样式隐藏。

## Migration Plan

1. 扩展 Live2D 配置，加入对话框尺寸、位置、动画和默认消息文案。
2. 新增 `Live2DChatPanel` 子组件。
3. 调整 `Live2DWidget` 的点击命中区域和 `pointer-events` 策略。
4. 接入 `isChatOpen`、消息列表和输入提交逻辑。
5. 使用 Playwright CLI 验证桌面端点击展开/收起、输入追加消息、移动端不显示。
6. 运行 lint 和 build。

回滚策略：移除 `Live2DChatPanel` 挂载和 `isChatOpen` 状态，恢复 Live2D 人物为纯展示组件。

## Open Questions

- 后续是否需要把本地用户输入接入真实 AI/API。
- 后续是否需要提供显式关闭按钮、清空消息按钮或可拖拽面板。
