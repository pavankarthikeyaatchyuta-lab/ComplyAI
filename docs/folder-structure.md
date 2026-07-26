# Folder Structure

This document defines the intended ComplyAI folder structure and file responsibilities.

No implementation is required at this stage. The structure is a build blueprint.

## Repository Layout

```text
ComplyAI/
├── frontend/
├── backend/
├── docs/
├── README.md
├── .env.example
└── .gitignore
```

## Frontend Structure

```text
frontend/
├── public/
├── src/
│   ├── app/
│   ├── assets/
│   ├── components/
│   ├── features/
│   ├── hooks/
│   ├── lib/
│   ├── pages/
│   ├── routes/
│   ├── services/
│   ├── stores/
│   ├── types/
│   ├── validation/
│   ├── main.tsx
│   └── index.css
├── package.json
├── vite.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

## Frontend Responsibilities

### `src/app`

Application wiring:

- root app component
- global providers
- React Query client
- route mounting
- error boundaries

### `src/routes`

Route definitions.

Planned routes:

```text
/                         Upload page
/workflows/:id            Workflow progress page
/workflows/:id/review     Review page
/workflows/:id/report     Final report page
```

### `src/pages`

Top-level screens:

- `UploadPage`
- `WorkflowPage`
- `ReviewPage`
- `ReportPage`
- `NotFoundPage`

Pages compose feature components and should avoid business logic.

### `src/features`

Business feature modules:

```text
features/
├── upload/
├── extraction/
├── workflow/
├── review/
└── report/
```

Each feature can own:

- components
- hooks
- API functions
- local types
- validation schemas

### `src/components`

Shared reusable components.

Recommended groups:

```text
components/
├── layout/
├── ui/
├── feedback/
└── workflow/
```

UI components should remain domain-agnostic.

### `src/services`

API client code:

- base URL
- request helpers
- response normalization
- error handling

### `src/stores`

Client-only UI state:

- active tab
- expanded panels
- selected artifact
- revision drawer open state

Server state should stay in React Query.

### `src/types`

Shared TypeScript types:

- document
- workflow
- compliance artifacts
- report

### `src/validation`

Shared Zod schemas for frontend forms.

## Backend Structure

```text
backend/
├── app/
│   ├── api/
│   ├── core/
│   ├── db/
│   ├── domain/
│   ├── integrations/
│   ├── repositories/
│   ├── schemas/
│   ├── services/
│   ├── utils/
│   ├── workflows/
│   └── main.py
├── tests/
├── uploads/
├── reports/
├── requirements.txt
└── render.yaml
```

## Backend Responsibilities

### `app/main.py`

FastAPI application entry point.

Responsible for:

- app creation
- middleware registration
- route registration
- startup checks

### `app/api`

HTTP route layer.

Recommended route files:

```text
api/routes/documents.py
api/routes/workflows.py
api/routes/reviews.py
api/routes/reports.py
```

### `app/core`

Application configuration and cross-cutting concerns:

- settings
- CORS
- logging
- app errors
- security helpers

### `app/db`

Database setup:

- connection
- SQLite models
- migrations or initialization helpers

### `app/domain`

Pure business concepts:

- document entities
- workflow entities
- compliance entities
- report entities

### `app/schemas`

Pydantic request and response schemas.

These schemas define the API contract.

### `app/repositories`

Database access modules:

- document repository
- workflow repository
- report repository

### `app/services`

Application use cases:

- document upload service
- extraction service
- planner service
- executor service
- reviewer service
- report service

### `app/workflows`

Workflow orchestration:

- stage order
- status transitions
- revision policy
- artifact persistence strategy

### `app/integrations`

External provider clients:

- LLM client
- OCR client
- storage client

### `app/utils`

Small generic helpers:

- file utilities
- ID utilities
- date utilities

## Component Hierarchy

### Upload Page

```text
UploadPage
├── AppShell
├── UploadHeader
├── DocumentTypeSelector
├── FileDropzone
├── UploadMetadataForm
├── UploadRequirementsHint
└── SubmitUploadButton
```

### Workflow Page

```text
WorkflowPage
├── AppShell
├── WorkflowHeader
├── WorkflowStepper
├── DocumentPreviewPanel
├── StageOutputPanel
├── MissingInfoPanel
└── ContinueToReviewButton
```

### Review Page

```text
ReviewPage
├── AppShell
├── ReviewHeader
├── ComplianceSummaryCard
├── RequiredActionsList
├── MissingInformationList
├── ComplianceChecklist
├── DraftResponseEditor
├── RevisionRequestForm
└── ApproveReportButton
```

### Report Page

```text
ReportPage
├── AppShell
├── ReportHeader
├── ComplianceActionReport
├── ExportButtons
└── StartNewWorkflowButton
```
