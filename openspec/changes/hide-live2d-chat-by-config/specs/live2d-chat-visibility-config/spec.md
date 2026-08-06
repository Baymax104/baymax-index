## ADDED Requirements

### Requirement: Live2D chat visibility is configurable

The system SHALL provide a frontend configuration option that controls whether the Live2D chat feature is available.

#### Scenario: Default configuration

- **WHEN** the application loads with the default Live2D configuration
- **THEN** the Live2D chat feature is disabled

#### Scenario: Chat feature is enabled by configuration

- **WHEN** the Live2D chat feature configuration is enabled
- **THEN** the desktop Live2D character can expose the existing chat panel and message submission behavior

### Requirement: Disabled chat hides chat UI

The system SHALL hide all Live2D chat UI when the Live2D chat feature configuration is disabled.

#### Scenario: Desktop viewport with chat disabled

- **WHEN** a desktop user opens the page and the Live2D chat feature is disabled
- **THEN** the Live2D character remains visible
- **AND** the Live2D chat panel is not rendered
- **AND** no Live2D chat input or submit control is rendered

#### Scenario: Character is clicked while chat is disabled

- **WHEN** a desktop user clicks the Live2D character while the Live2D chat feature is disabled
- **THEN** no chat panel is opened
- **AND** no visible chat state changes occur

### Requirement: Disabled chat prevents LLM requests

The system SHALL prevent Live2D chat requests when the Live2D chat feature configuration is disabled.

#### Scenario: User interacts with character while chat is disabled

- **WHEN** the Live2D chat feature is disabled
- **AND** the user interacts with the Live2D character
- **THEN** the frontend does not send a request to `/api/llm/chat`

### Requirement: Live2D character display remains unchanged

The system SHALL preserve the existing Live2D character display behavior while hiding the chat feature.

#### Scenario: Desktop viewport with chat disabled

- **WHEN** the desktop viewport satisfies the configured Live2D media query
- **THEN** the Live2D character still loads and displays in the configured position

#### Scenario: Mobile viewport with chat disabled

- **WHEN** the viewport does not satisfy the configured Live2D media query
- **THEN** the Live2D character and chat feature remain hidden and unloaded
