## Why

当前 Live2D 对话框只会记录用户输入，没有助手回复过程，无法验证后续接入大模型 API 时需要的交互状态、消息生命周期和 UI 承载能力。新增 mock 回复流程可以先建立“思考中 -> 打字机输出 -> 完成”的前端基础，同时保持初版不依赖真实网络服务。

## What Changes

- 用户提交非空消息后，先追加用户消息，再创建一条助手回复占位消息。
- 助手回复先进入思考状态，随后使用 mock 数据以打字机效果逐字展示。
- 回复过程中禁止并发提交，避免多条 mock 回复状态互相覆盖。
- 对话框收起或再次展开时，不取消正在进行的思考或打字流程。
- mock 回复来源和时序参数集中配置或封装，便于后续替换为大模型 API 回复。
- 不接入真实 LLM API，不新增环境变量、后端接口或网络请求。

## Capabilities

### New Capabilities

- `live2d-mock-reply-flow`: 覆盖 Live2D 对话框的助手 mock 回复生命周期、思考状态、打字机展示、提交门禁和未来 API 替换边界。

### Modified Capabilities

- 无。

## Impact

- 影响 `src/types/live2d.ts` 的消息状态建模。
- 影响 `src/config/live2d.ts` 或新增等效配置模块，用于 mock 回复文案和时序参数。
- 影响 `src/components/live2d/Live2DWidget.tsx` 的提交流程、回复生命周期状态和计时器清理。
- 影响 `src/components/live2d/Live2DChatPanel.tsx` 的思考状态、打字中消息展示和提交禁用 UI。
- 不新增运行时依赖、后端 API、外部服务或环境变量。
