## Why

Live2D 对话框当前仍使用本地 mock 回复，无法验证真实 LLM 回复链路。后端 `/api/llm/chat` 已部署并提供 SSE 流式输出，前端需要接入该接口，让现有“思考中”和打字展示流程承载真实增量回复。

## What Changes

- 新增前端 LLM chat service，调用 `POST /api/llm/chat` 并解析 `text/event-stream`。
- 将 Live2D 助手回复来源从 mock 文案切换为后端流式 API。
- 保留现有回复生命周期：提交后先显示 `thinking`，收到首个 `delta` 后进入 `typing`，收到 `done` 后进入 `done`。
- 保留回复期间禁止并发提交、收起对话框不取消回复流程、首次回复内容出现时自动滚动到底部。
- 组件卸载时中止正在进行的流式请求，避免卸载后更新状态。
- 后端或网络错误时在对话框中展示简短错误消息，并释放提交门禁。
- 不在前端引入 GLM API key 或任何 `VITE_GLM_*` 环境变量。
- mock provider 保留为开发备用边界，但默认回复路径改为后端 LLM API。

## Capabilities

### New Capabilities

- `live2d-llm-stream-chat`: 覆盖 Live2D 对话框调用后端 LLM SSE 接口、解析 `delta/done/error` 事件、维护回复状态和错误处理的前端行为。

### Modified Capabilities

- 无。

## Impact

- 新增 `src/services/llmChat.ts` 或等效 service，封装 `/api/llm/chat` 请求和 SSE 解析。
- 修改 `src/components/live2d/Live2DWidget.tsx` 的回复流程，从 mock timer provider 改为消费流式 provider。
- 可能调整 `src/types/live2d.ts`，为错误态或 provider 事件补充类型。
- 保持 `src/components/live2d/Live2DChatPanel.tsx` 视觉结构基本不变，仅在需要时复用现有 `thinking/typing/done` 展示。
- 不修改后端项目、不修改 Vercel rewrite、不新增前端密钥配置。
