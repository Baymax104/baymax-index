## 1. Persona Prompt Configuration

- [x] 1.1 Add a frontend persona prompt configuration based on the current About module profile.
- [x] 1.2 Keep the prompt separate from visible Live2D chat messages and UI copy.

## 2. LLM Request Assembly

- [x] 2.1 Prepend the persona `system` message when building `/api/llm/chat` request messages.
- [x] 2.2 Ensure user and assistant visible messages are still filtered and serialized without UI-only status fields.
- [x] 2.3 Preserve the existing endpoint selection, abort signal handling, and SSE parsing behavior.

## 3. Validation

- [x] 3.1 Run `npm run build`.
- [x] 3.2 Run `npm run lint`.
- [x] 3.3 Verify the Live2D chat request body contains the first `system` message and the chat panel does not render that message.
