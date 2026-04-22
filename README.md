# Requirements Writer

Requirements Writer is a web application for creating, managing, and exporting high-quality system and software requirements with the EARS method.

The project combines guided requirement authoring, project-based organization, practical EARS education, and spreadsheet-friendly export in one interface. The current product is intentionally English-only.

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Supported EARS Types](#supported-ears-types)
- [Validation Rules](#validation-rules)
- [Tech Stack](#tech-stack)
- [Repository Structure](#repository-structure)
- [Getting Started](#getting-started)
- [Backend Status](#backend-status)
- [Current Limitations](#current-limitations)
- [Roadmap](#roadmap)

## Overview

Requirements Writer is built around four main goals:

1. Explain what good requirements look like
2. Guide users through structured EARS-based authoring
3. Organize requirements inside `SYS` and `SW` project folders
4. Export project requirements into an Excel-friendly format

The current frontend includes these areas:

- `Home`
- `Create Requirements`
- `Project Manager`
- `Dashboard`
- `Export`

## Key Features

### Guided Requirement Authoring

- Step-by-step requirement creation wizard
- Explicit EARS type selection
- Structured condition entry instead of unstructured free text
- Support for condition linking with only `AND` or only `OR`
- Automatic generation of the final requirement sentence
- Built-in validation feedback during authoring

### EARS Guidance

- Explains what requirements are
- Explains the difference between software and system requirements
- Introduces the EARS method and its sentence patterns
- Shows when to use each EARS type
- Provides quality guidance for writing clearer, more testable requirements

### Project Management

- Create `SYS` and `SW` projects
- Open projects in a dedicated detail view
- Edit project name, description, and type
- Delete individual requirements
- Delete complete projects including linked requirements

### Export

- Select a project before export
- Export requirements as Excel-friendly CSV
- Uses UTF-8 BOM and semicolon-separated output for better Excel compatibility

## Supported EARS Types

The app currently supports these EARS categories:

1. `Ubiquitous`
2. `Event-driven`
3. `State-driven`
4. `Optional feature`
5. `Unwanted behavior`

Example EARS pattern:

```text
When <trigger>, the system shall <response>.
```

## Validation Rules

The current implementation uses built-in rule-based validation. AI review is planned for a later stage.

The current validation checks include:

- a project is selected
- the title is filled in
- the system field is filled in
- the response field is filled in
- required conditions exist for EARS types that need them
- condition entries are not empty
- the response appears to describe one clear testable output

## Tech Stack

### Frontend

- Angular 19
- TypeScript
- SCSS
- Angular standalone components

### Backend

- Node.js
- Minimal HTTP server
- JSON file storage

## Repository Structure

```text
RequirementsWriter/
|-- Frontend/
|   |-- src/
|   |   |-- app/
|   |   |   |-- pages/
|   |   |   |-- app.component.*
|   |   |   |-- app.models.ts
|   |   |   |-- app.routes.ts
|   |   |   `-- requirements-store.service.ts
|   |   |-- index.html
|   |   |-- main.ts
|   |   `-- styles.scss
|   |-- angular.json
|   `-- package.json
|-- Backend/
|   |-- data/
|   |   `-- store.json
|   |-- server.js
|   |-- package.json
|   `-- README.md
`-- README.md
```

## Getting Started

### Prerequisites

- Node.js 18 or newer recommended
- npm

### Run the Frontend

```bash
cd Frontend
npm install
npm start
```

Frontend development server:

- `http://localhost:4200`

### Build the Frontend

```bash
cd Frontend
npm run build
```

### Run the Backend

```bash
cd Backend
npm install
npm start
```

Backend server:

- `http://localhost:3001`

## Backend Status

The backend exists as an MVP foundation and currently exposes a small REST surface:

- `GET /api/health`
- `GET /api/projects`
- `POST /api/projects`
- `GET /api/requirements`
- `POST /api/requirements`

At the moment, the frontend still works primarily from local browser state. Full frontend-to-backend integration is a logical next step.

## Current Limitations

- frontend persistence is still local-first
- export is CSV, not native `.xlsx`
- inline requirement editing in the project detail view is not implemented yet
- validation is rule-based only
- there is no authentication or role model
- there is no revision history yet

## Roadmap

- connect frontend state to backend APIs
- add native `.xlsx` export
- add inline requirement editing from project detail
- add AI-assisted requirement review and improvement hints
- add approval workflows and release states
- add revision history for projects and requirements
