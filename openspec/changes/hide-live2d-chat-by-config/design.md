## Context

`Live2DWidget` 当前同时负责桌面端 Live2D 模型生命周期和聊天交互状态。聊天面板由 `Live2DChatPanel` 渲染，人物区域使用 `button` 语义并通过 `toggleChatPanel` 切换展开状态。用户提交消息后才会调用 `streamLive2DChat`，进而请求 `/api/llm/chat`。

本变更的目标不是移除聊天实现，而是提供一个显式配置项，让当前版本默认隐藏对话功能。人物本体仍应保留为桌面端视觉元素，因此不能通过卸载整个 `Live2DWidget` 来实现。

## Goals / Non-Goals

**Goals:**

- 在 `live2dWidgetConfig` 中新增对话功能开关，默认关闭。
- 配置关闭时不渲染 `Live2DChatPanel`。
- 配置关闭时人物不响应聊天展开/收起点击。
- 配置关闭时不出现可聚焦的聊天按钮入口。
- 保持 Live2D 人物加载、显示和清理逻辑不变。

**Non-Goals:**

- 不删除 Live2D 聊天面板、LLM service 或 persona prompt。
- 不隐藏桌面端 Live2D 人物。
- 不新增远程配置、环境变量或用户侧开关。
- 不修改后端 LLM API。

## Decisions

### 配置命名

在 `live2dWidgetConfig` 中新增 `chat.enabled`，并设为 `false`。使用嵌套 `chat` 是为了表达该开关只控制对话功能，不控制人物模型展示；后续如果需要恢复聊天或扩展聊天配置，可以继续放入同一命名空间。

### 配置关闭时使用非交互容器承载模型

配置开启时继续使用 `button` 承载人物点击区域，保持现有展开/收起行为。配置关闭时改为渲染普通 `div` 容器承载 canvas host，不绑定 `onClick`，不设置聊天相关 aria 文案，避免提供一个无效可聚焦入口。

### 聊天面板条件渲染

`Live2DChatPanel` 仅在 `chat.enabled` 为 `true` 时渲染。这样配置关闭时不会展示对话框 DOM，也不会暴露输入框或消息列表。

### 保留内部聊天状态

初版可以保留 `draft`、`isChatOpen`、`isReplying` 和 `messages` 状态声明，避免为了小开关做较大结构性拆分。真正的行为边界由条件渲染、点击短路和提交入口不可达保证。

## Risks / Trade-offs

- 配置关闭但代码仍保留聊天状态 -> 状态初始化成本很低，换取更小改动；后续若长期关闭可再做结构拆分。
- 使用 `disabled button` 可能仍暴露无效控件语义 -> 改用普通 `div` 承载人物，避免误导键盘和辅助技术用户。
- 后续重新开启聊天时回归风险 -> 任务中要求验证配置开启/关闭两种请求和 UI 行为。

## Migration Plan

1. 在 Live2D 配置中新增 `chat.enabled: false`。
2. 调整 `Live2DWidget`，根据配置条件渲染面板和人物交互容器。
3. 运行 build 和 lint。
4. 通过静态或浏览器验证确认默认关闭时无聊天面板、无点击展开、无 LLM 请求。

## Open Questions

无阻塞问题。当前版本默认关闭对话功能。
