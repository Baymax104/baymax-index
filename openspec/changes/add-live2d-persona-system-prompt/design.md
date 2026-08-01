## Context

当前 Live2D 对话框由前端维护可见消息历史，并通过 `streamLive2DChat` 调用后端 `POST /api/llm/chat`。前端会把 `Live2DChatMessage` 转换为后端接受的 `{ role, content }` 简化消息列表，后端再将该列表转发给固定 GLM 模型并返回 SSE。

About 模块已经包含清晰的个人站点人设信息：Baymax 小振、研二在读、AI 算法实习、关注工程与模型落地、喜欢代码、华语 vocal、声乐、魔方，并强调理性、稳定、长期成长节奏。本变更将这些信息整理为前端默认 system prompt，让 Live2D 回复保持一致的人设语气。

## Goals / Non-Goals

**Goals:**

- 基于 About 模块内容编写稳定的 Baymax 小振人设 prompt。
- 在每次 Live2D LLM 请求中将人设 prompt 作为第一条 system message 发送。
- 保持 Live2D 可见消息历史只包含用户和助手消息。
- 保持后端 `/api/llm/chat` 契约不变。

**Non-Goals:**

- 不在后端强制注入 system prompt。
- 不把 prompt 作为安全策略或防越权机制。
- 不新增 prompt 编辑后台、远程配置或环境变量。
- 不改变 Live2D UI 布局、SSE 解析、错误文案或提交门禁。

## Decisions

### 前端集中维护人设 prompt

将 prompt 放在前端配置模块中，优先考虑新增 `src/config/persona.ts`，避免把长文本塞进 `llmChat.ts`。`llmChat.ts` 只负责在请求前组装消息。

备选方案是放入 `src/config/live2d.ts`。该方案文件更少，但 Live2D 模型尺寸、聊天面板布局和 LLM 人设文本混在一起，后续维护边界较弱。

### 每次请求都前置 system message

每次调用 `/api/llm/chat` 时都发送：

```json
{
  "messages": [
    { "role": "system", "content": "<persona prompt>" },
    { "role": "user", "content": "..." }
  ]
}
```

这样即使前端只保留可见消息历史，模型也能在每轮请求中获得完整人设上下文。system message 不进入 React state 中的 `messages`，因此不会出现在聊天面板里。

### 保留后端契约

后端已经允许 `system`、`user`、`assistant` 三类消息。本变更只改变前端请求体，不修改后端校验、模型固定策略、SSE 事件格式或 API key 读取方式。

### Prompt 风格

Prompt 使用 About 模块中已经公开展示的信息，要求助手以“Baymax 小振”的第一人称或贴近站点主人的口吻进行轻量交流，表达保持中文、简洁、稳定、有技术感，但避免伪造现实经历、联系方式或未提供的私人信息。

## Risks / Trade-offs

- 前端 prompt 可见且可篡改 -> 明确它只用于默认体验，不作为安全边界；强约束需求应另行放到后端。
- Prompt 过长增加每次请求 token 成本 -> 控制为短人设说明和行为规则，不复制 About 组件的所有文案。
- About 文案后续变化导致 prompt 失配 -> 将 prompt 模块命名清晰，并在任务中要求与 About 内容保持一致。
- 客户端后续如果传入其他 system message 可能冲突 -> 当前 Live2D 客户端只由本服务组装 system message；后续若开放外部调用再另行设计合并策略。

## Migration Plan

1. 新增或扩展前端配置，定义 `live2dPersonaSystemPrompt`。
2. 调整 `streamLive2DChat` 的请求体消息组装，在可见消息前插入 system message。
3. 运行类型检查和构建。
4. 如需浏览器验证，打开 Live2D 聊天并确认请求体包含 system message，聊天 UI 不显示 system 内容。

## Open Questions

无阻塞问题。Prompt 初版以 About 模块当前公开内容为准。
