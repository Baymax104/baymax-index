## Context

前端 Live2D 对话框已经具备桌面端显示、点击展开收起、消息列表、输入框、`thinking/typing/done` 状态、打字机效果和自动滚动基础。当前助手回复由 `live2dMockReplyProvider` 提供固定文本，并通过定时器逐字输出。

后端 `baymax-index-api` 已新增并部署 `POST /api/llm/chat`，生产别名为 `https://baymax-index-api.vercel.app`。前端本地开发通过 Vite proxy 转发 `/api`，生产通过 `vercel.json` rewrite 转发 `/api`，因此前端可统一调用相对路径 `/api/llm/chat`。

## Goals / Non-Goals

**Goals:**

- 将 Live2D 助手回复接入后端 `/api/llm/chat`。
- 消费 SSE `delta`、`done`、`error` 事件并增量更新当前助手消息。
- 保留提交后先显示思考状态，收到首个回复片段后进入打字状态。
- 回复进行中继续禁止并发提交。
- 收起对话框不取消正在进行的回复流程。
- 组件卸载时中止进行中的请求，避免泄漏和卸载后更新状态。
- 后端失败或流式错误时显示用户可见的简短错误消息。

**Non-Goals:**

- 不在本变更中新增用户认证、限流、会话持久化或历史压缩。
- 不直接调用 GLM，不在前端配置或暴露 `GLM_API_KEY`。
- 不改变 Live2D 模型加载、桌面端媒体查询、画布尺寸或对话框位置。
- 不改造后端接口契约。
- 不实现多个并发助手回复。

## Decisions

### 新增 LLM chat service

新增 `src/services/llmChat.ts` 或等效 service，负责：

- 构造 `POST /api/llm/chat` 请求。
- 只发送 `system/user/assistant` 文本消息，过滤前端内部状态字段。
- 使用 `fetch` 和 `ReadableStream` 解析 `text/event-stream`。
- 将后端事件转换为前端易消费的事件，例如 `delta`、`done`、`error`。
- 支持 `AbortSignal`。

备选方案是直接在 `Live2DWidget` 中解析 SSE。该方案会让组件同时承担 UI 状态、请求管理和协议解析，后续更换 provider 或增加测试都更困难。

### 组件保留现有回复状态机

提交后仍追加用户消息和空的助手占位消息。助手占位消息先标记为 `thinking`；收到第一个非空 `delta` 后，将状态改为 `typing` 并追加内容；收到 `done` 后改为 `done` 并释放 `isReplying`。

备选方案是让后端逐字输出、前端直接显示最终文本。当前后端只保证增量片段，不保证逐字粒度；前端按片段追加可以保留流式感，也避免重复本地计时器。

### 错误显式进入消息列表

请求失败、非 2xx 响应、SSE `error` 事件或流解析错误时，将当前助手占位消息改为完成状态，并展示简短错误文本，例如“回复暂时不可用，请稍后再试。”，同时释放提交门禁。

备选方案是失败时回退到 mock 回复。该方案会掩盖真实接口故障，不利于验证 LLM 接入链路。

### 使用 AbortController 管理生命周期

`Live2DWidget` 使用 ref 保存当前 `AbortController`，组件卸载时 abort。当前设计不支持并发回复，提交入口在 `isReplying` 时禁用，因此不需要管理多个 controller。

### 保留 mock provider 作为备用边界

`live2dMockReplyProvider` 可以保留，供后续测试、离线开发或临时 fallback 使用，但默认用户提交路径改为后端 LLM API。

## Risks / Trade-offs

- [Risk] SSE 解析不完整导致片段丢失 -> 使用 buffer 按空行切分事件，兼容 `LF` 和 `CRLF`，忽略未知事件。
- [Risk] 后端响应较慢时用户长期看到思考状态 -> 保留 `isReplying` 禁用态，错误路径释放门禁；后续可增加超时提示。
- [Risk] 收起面板后请求仍继续消耗资源 -> 这是现有“收起不取消回复流程”的一致性要求；卸载时才 abort。
- [Risk] 前端生产 rewrite 或后端部署异常 -> 实现后用本地 proxy 和生产 alias 验证 `/api/llm/chat` 的错误路径或 mock stream 行为。

## Migration Plan

1. 新增 LLM chat service 和类型。
2. 将 `Live2DWidget` 的 `startMockReply` 替换为流式回复流程。
3. 保留 mock provider 文件，但不作为默认提交路径。
4. 运行 `npm run build`。
5. 使用 Playwright 或等效浏览器验证桌面端提交、流式输出、错误展示、收起展开连续性和移动端不显示。

## Open Questions

无阻塞问题。默认调用相对路径 `/api/llm/chat`，不新增前端环境变量。
