## ADDED Requirements

### Requirement: Homepage omits GitHub data section

The homepage SHALL omit GitHub statistics, pinned project cards and their loading placeholders.

#### Scenario: Homepage opens

- **WHEN** a visitor opens or scrolls the homepage
- **THEN** no GitHub data section is rendered
- **AND** no GitHub overview API request is sent

### Requirement: Live2D and chat are removed

The application SHALL omit Live2D characters, chat controls, model resources and LLM integration.

#### Scenario: Desktop or mobile visit

- **WHEN** a visitor opens or interacts with the homepage at desktop or mobile width
- **THEN** no Live2D character or chat control is rendered
- **AND** no Pixi, Cubism, model or LLM chat request is sent

### Requirement: Remaining homepage capabilities are preserved

The homepage SHALL preserve Hero, About, the message board, Footer and GitHub profile links.

#### Scenario: Navigate to message board

- **WHEN** a visitor activates the Hero message board navigation
- **THEN** the page scrolls to the message board container
- **AND** Giscus integration remains configured

#### Scenario: Follow profile link

- **WHEN** a visitor views the Hero or Footer
- **THEN** the existing GitHub profile link remains available
