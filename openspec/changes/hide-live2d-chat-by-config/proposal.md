## Why

当前 Live2D 人物默认带有点击展开对话框能力，但该对话功能在某些版本中需要先下线或灰度关闭。新增配置项可以让前端保留桌面人物展示，同时显式关闭对话 UI、点击响应和 LLM 请求链路。

## What Changes

- 在 Live2D 前端配置中新增对话功能开关，默认值为关闭。
- 当前版本将该配置保持为关闭状态。
- 配置关闭时不渲染 Live2D 对话框 UI。
- 配置关闭时人物区域不响应点击展开/收起对话框，也不作为可聚焦聊天入口。
- 配置关闭时不会因人物点击或隐藏聊天逻辑触发 `/api/llm/chat` 请求。
- 保持桌面 Live2D 人物本体显示、加载和移动端隐藏策略不变。

## Capabilities

### New Capabilities

- `live2d-chat-visibility-config`: 覆盖 Live2D 对话功能配置开关、默认隐藏状态、UI 可见性、点击响应和 LLM 请求禁用行为。

### Modified Capabilities

- 无。

## Impact

- 修改 `src/config/live2d.ts`，新增对话功能开关。
- 修改 `src/components/live2d/Live2DWidget.tsx`，根据配置控制聊天面板渲染和人物点击响应。
- 不修改 `src/services/llmChat.ts` 的 SSE 协议解析和请求格式。
- 不修改后端 API、Vercel rewrite、Live2D 模型资源或桌面断点策略。
