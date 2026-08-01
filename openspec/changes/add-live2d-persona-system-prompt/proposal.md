## Why

Live2D 对话已经接入后端 LLM SSE，但当前请求只携带用户与助手可见消息，模型缺少稳定的人设上下文。基于首页“关于我”模块注入前端 system prompt，可以让 Live2D 回复更贴近 Baymax 小振的个人站点身份与表达风格。

## What Changes

- 新增前端内置 Live2D 人设 system prompt，内容参考 About 模块中的个人介绍、身份标签和兴趣关键词。
- Live2D 发起 `/api/llm/chat` 请求时，将 system message 作为第一条消息发送给后端。
- system prompt 不显示在聊天面板、不写入 Live2D 可见消息历史。
- 保持后端 API、SSE 响应契约和 GLM API key 边界不变。
- 明确该前端 system prompt 是默认体验配置，不作为安全边界；用户仍可在浏览器中查看或篡改请求。

## Capabilities

### New Capabilities

- `live2d-persona-system-prompt`: 覆盖 Live2D LLM 请求的人设 system prompt 来源、注入位置、请求格式和可见性约束。

### Modified Capabilities

- 无。

## Impact

- 影响 `src/services/llmChat.ts` 的请求消息组装。
- 可能新增 `src/config/persona.ts` 或扩展现有 Live2D 配置，用于集中维护人设 prompt。
- 不修改 `baymax-index-api` 后端代码。
- 不新增依赖、环境变量、持久化存储或前端密钥。
