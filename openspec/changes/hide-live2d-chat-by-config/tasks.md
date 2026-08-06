## 1. Configuration

- [x] 1.1 Add a Live2D chat feature visibility configuration option.
- [x] 1.2 Set the default and current-version value to disabled.

## 2. Widget Integration

- [x] 2.1 Hide `Live2DChatPanel` when the chat feature is disabled.
- [x] 2.2 Disable character click-to-chat behavior when the chat feature is disabled.
- [x] 2.3 Keep the Live2D character canvas and desktop loading behavior unchanged.
- [x] 2.4 Keep existing chat behavior reachable when the configuration is enabled.

## 3. Validation

- [x] 3.1 Run `npm run build`.
- [x] 3.2 Run `npm run lint`.
- [x] 3.3 Verify default configuration hides the chat UI and prevents `/api/llm/chat` requests.
