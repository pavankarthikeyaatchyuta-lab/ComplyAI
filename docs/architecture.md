# ComplyAI Architecture

ComplyAI is a document-to-action compliance workflow application. It converts GST notices, GST invoices, and tax reminders into verified compliance deliverables.

ComplyAI is not a chatbot. The product should expose a structured workflow where every stage creates auditable artifacts.

## Core Workflow

```text
Upload
↓
Extraction
↓
Planner
↓
Executor
↓
Reviewer
↓
Optional one revision
↓
Compliance Report
```

## System Overview

```text
React + Vite frontend
↓ REST API
FastAPI backend
↓ repository layer
SQLite database
```

## Architectural Decisions

### Use a frontend/backend monorepo

The project should keep `frontend` and `backend` in one repository. This is the fastest structure for a hackathon team because documentation, API contracts, and deployment configuration stay together.

The frontend and backend remain independently deployable:

- `frontend` goes to Vercel.
- `backend` goes to Render.

### Make workflow the center of the product

The main product entity is not a chat session. It is a compliance workflow.

A workflow owns:

- uploaded document reference
- current stage
- generated artifacts
- review status
- revision count
- final report

This keeps the application aligned with the business goal: verified action plans.

### Persist intermediate artifacts

Every stage should save its output.

This gives the user and team:

- auditability
- easier debugging
- resumable workflows
- better demos
- a clear explanation of how the report was produced

### Separate extraction, planning, execution, and review

The backend should not produce a final report in one opaque operation.

Each stage has a specific responsibility:

- Extraction identifies facts from the document.
- Planner decides what must be done.
- Executor produces user-facing compliance artifacts.
- Reviewer checks completeness and consistency.

This separation makes the system easier to test and explain.

### Allow exactly one revision

The optional revision should be a controlled workflow action, not an open-ended conversation.

The backend must enforce:

```text
revision_count <= 1
```

This protects the product identity and keeps the demo flow predictable.

## Clean Architecture Layers

```text
API routes
↓
Application services
↓
Workflow orchestration
↓
Domain models
↓
Repositories
↓
Database
```

## Layer Responsibilities

### API Layer

The API layer handles HTTP concerns only:

- request validation
- response status codes
- dependency injection
- calling services
- returning structured responses

It should not contain compliance logic.

### Service Layer

The service layer coordinates use cases:

- upload a document
- start a workflow
- submit a revision
- approve a workflow
- generate a final report

Services express application behavior without knowing low-level database details.

### Workflow Layer

The workflow layer owns stage ordering and transitions.

It controls:

- extraction
- planning
- execution
- review
- revision policy
- completion

This is the heart of ComplyAI.

### Domain Layer

The domain layer defines business concepts:

- document type
- workflow status
- compliance summary
- required action
- missing information
- checklist item
- draft response
- compliance report

Domain models should not depend on FastAPI, SQLite, or external providers.

### Repository Layer

Repositories isolate database access.

This allows the project to start with SQLite and later move to PostgreSQL without rewriting business logic.

### Integrations Layer

Integrations wrap external services:

- Gemini
- Groq
- OCR provider
- file storage

External providers should be replaceable through dedicated client modules.

## Frontend Architecture

The frontend should use feature-based organization.

Major features:

- upload
- extraction
- workflow
- review
- report

React Query owns server state. Local component state owns small UI interactions. React Hook Form and Zod own form validation.

## Backend Architecture

The backend should use FastAPI with Pydantic schemas and repository-backed services.

The backend must expose structured JSON artifacts rather than free-text-only responses. This keeps the UI predictable and prevents the product from becoming a chatbot.

## Final Deliverable

The final output is a compliance action report containing:

- compliance summary
- required actions
- missing information
- compliance checklist
- draft response
- reviewer verification notes
