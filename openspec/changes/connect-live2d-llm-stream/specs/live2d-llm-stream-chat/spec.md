## ADDED Requirements

### Requirement: Live2D chat uses backend LLM stream

The system SHALL use the backend `POST /api/llm/chat` endpoint as the default assistant reply source for the Live2D chat.

#### Scenario: User submits a valid message

- **WHEN** the desktop Live2D chat is open and the user submits a non-empty message
- **THEN** the frontend sends the conversation messages to `/api/llm/chat`
- **AND** the request does not include any GLM API key
- **AND** the request does not include frontend-only message status fields

#### Scenario: Frontend runs in development or production

- **WHEN** the frontend sends a Live2D chat request
- **THEN** it uses the relative path `/api/llm/chat`
- **AND** the request can be routed by the existing Vite proxy or Vercel rewrite

### Requirement: Streamed deltas update assistant message

The system SHALL consume `delta` events from the backend SSE response and append generated content to the current assistant message.

#### Scenario: First delta arrives

- **WHEN** a submitted message has created an assistant placeholder in `thinking` state
- **AND** the backend emits the first `delta` event with content
- **THEN** the assistant placeholder changes to `typing`
- **AND** the emitted content appears in that assistant message

#### Scenario: Multiple deltas arrive

- **WHEN** the backend emits multiple `delta` events for one reply
- **THEN** the frontend appends each content fragment in order to the same assistant message

### Requirement: Stream completion releases reply lock

The system SHALL mark the assistant reply complete and re-enable submission when the backend emits `done`.

#### Scenario: Done event arrives

- **WHEN** the backend emits a `done` event after one or more deltas
- **THEN** the current assistant message enters `done` status
- **AND** the user can submit another non-empty message

#### Scenario: Done event arrives without content

- **WHEN** the backend emits `done` without any prior non-empty `delta`
- **THEN** the assistant message enters `done` status with a short empty-response fallback message
- **AND** the user can submit another non-empty message

### Requirement: Stream errors are visible and recoverable

The system SHALL show a user-visible assistant error message and release the reply lock when the LLM request or stream fails.

#### Scenario: Request fails before streaming

- **WHEN** `/api/llm/chat` returns a non-OK response or the network request fails
- **THEN** the assistant placeholder becomes a completed assistant message with a short error message
- **AND** the user can submit another message

#### Scenario: SSE error event arrives

- **WHEN** the backend emits an `error` SSE event
- **THEN** the assistant placeholder becomes a completed assistant message with a short error message
- **AND** the stream processing stops
- **AND** the user can submit another message

#### Scenario: Stream parsing fails

- **WHEN** the frontend cannot parse the active SSE response
- **THEN** the assistant placeholder becomes a completed assistant message with a short error message
- **AND** the user can submit another message

### Requirement: Reply lifecycle remains compatible with existing chat UI

The system SHALL preserve the existing Live2D chat interaction constraints while using the LLM stream.

#### Scenario: Reply is in progress

- **WHEN** the assistant message is thinking or typing
- **THEN** the input and submit controls remain disabled
- **AND** concurrent message submission is prevented

#### Scenario: Chat panel is collapsed during streaming

- **WHEN** the user collapses the Live2D chat panel while a reply is in progress
- **THEN** the stream continues
- **AND** reopening the panel shows the latest assistant message state

#### Scenario: Component unmounts during streaming

- **WHEN** the Live2D widget unmounts while a stream request is active
- **THEN** the frontend aborts the active request
- **AND** it does not update component state after unmount

### Requirement: Mobile behavior remains unchanged

The system SHALL keep Live2D chat hidden and unloaded on non-desktop viewports.

#### Scenario: Mobile viewport opens the page

- **WHEN** the viewport does not satisfy the configured desktop media query
- **THEN** the Live2D character and chat UI are not displayed
- **AND** no LLM chat request is sent by the hidden widget
