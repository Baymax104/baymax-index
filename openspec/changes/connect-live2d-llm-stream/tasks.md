## 1. LLM Stream Service

- [x] 1.1 Add `src/services/llmChat.ts` with request and SSE event types.
- [x] 1.2 Implement `POST /api/llm/chat` request using the relative `/api/llm/chat` path.
- [x] 1.3 Serialize Live2D messages into backend-compatible `system`/`user`/`assistant` text messages without status fields.
- [x] 1.4 Parse backend SSE `delta`, `done`, and `error` events from `ReadableStream`.
- [x] 1.5 Support `AbortSignal` and convert request, response, and parsing failures into service errors.

## 2. Live2D Reply Flow

- [x] 2.1 Replace the default mock reply path in `Live2DWidget` with the LLM stream service.
- [x] 2.2 Keep submit behavior that appends a user message and an assistant `thinking` placeholder.
- [x] 2.3 On the first non-empty `delta`, switch the assistant message to `typing`.
- [x] 2.4 Append every later `delta` to the same assistant message in order.
- [x] 2.5 On `done`, mark the assistant message as `done` and release `isReplying`.
- [x] 2.6 Handle empty completed replies with a short fallback assistant message.

## 3. Error And Lifecycle Handling

- [x] 3.1 Show a short assistant error message when the request fails, backend returns non-OK, SSE emits `error`, or parsing fails.
- [x] 3.2 Release the submit lock after every success, error, or abort path that leaves the component mounted.
- [x] 3.3 Abort the active stream request on component unmount.
- [x] 3.4 Preserve the existing behavior where collapsing the chat panel does not cancel an active reply.
- [x] 3.5 Keep Live2D hidden and unloaded on non-desktop viewports, with no hidden LLM request.

## 4. Validation

- [x] 4.1 Run `npm run build`.
- [x] 4.2 Use a mocked stream or local route interception to verify `delta` events incrementally update the assistant message.
- [x] 4.3 Verify `done` marks the message complete and re-enables submit.
- [x] 4.4 Verify request or stream errors display a recoverable assistant error message.
- [x] 4.5 Verify desktop collapse/reopen keeps reply progress.
- [x] 4.6 Verify mobile viewport does not display the widget or send an LLM request.
