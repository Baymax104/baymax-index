## ADDED Requirements

### Requirement: Live2D requests include persona system prompt

The system SHALL include a frontend-defined persona system message in every Live2D LLM chat request.

#### Scenario: User submits Live2D message

- **WHEN** the user submits a non-empty Live2D chat message
- **THEN** the frontend sends a `system` message as the first item in the `/api/llm/chat` request `messages` array
- **AND** the visible user and assistant conversation messages follow after the `system` message

#### Scenario: Multiple chat turns are sent

- **WHEN** the Live2D chat sends a later request with previous visible conversation history
- **THEN** the frontend still prepends the same persona `system` message to that request
- **AND** it does not persist the `system` message as a visible chat history item

### Requirement: Persona prompt reflects About profile

The persona system prompt SHALL be based on the public About module profile for Baymax 小振.

#### Scenario: Prompt content is prepared

- **WHEN** the frontend builds the persona system prompt
- **THEN** the prompt identifies Baymax 小振 as a graduate student and AI algorithm intern
- **AND** it references the public interests in coding, music or vocal, and Rubik's cube
- **AND** it asks the assistant to respond in concise Simplified Chinese with a stable, practical, personal-site tone

#### Scenario: Prompt avoids unsupported private claims

- **WHEN** the model receives the persona system prompt
- **THEN** the prompt instructs the model not to invent private contact details, work secrets, or experiences not present in the provided profile

### Requirement: Persona prompt remains a frontend experience setting

The system SHALL treat the frontend persona prompt as a default user experience setting rather than a security boundary.

#### Scenario: Request is inspected in browser

- **WHEN** a user inspects the browser bundle or network request
- **THEN** the persona prompt may be visible as frontend data
- **AND** no GLM API key or backend credential is included in the request

#### Scenario: Backend contract is unchanged

- **WHEN** the frontend sends the persona `system` message to `/api/llm/chat`
- **THEN** the backend API accepts it through the existing `system` role support
- **AND** the SSE response contract remains `delta`, `done`, and `error`
