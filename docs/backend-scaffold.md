# Phase 10 Backend Scaffold

This document explains the FastAPI backend scaffold generated for ComplyAI.

The backend follows clean architecture boundaries:

```text
API routes
↓
Services
↓
Planner / Executor / Reviewer
↓
Schemas
↓
Repositories and integrations
```

## Runtime

```text
backend/app/main.py
```

Creates the FastAPI app, configures CORS, registers exception handlers, and mounts all routers.

## Requirements

```text
backend/requirements.txt
```

Defines the backend dependencies:

- FastAPI
- Uvicorn
- Pydantic
- Pydantic Settings
- python-multipart

## Core Files

### `backend/app/core/config.py`

Loads environment-based configuration.

Includes:

- app name
- app version
- log level
- database URL
- upload directory
- report directory
- allowed CORS origins
- Gemini API key placeholder
- Groq API key placeholder

Secrets are referenced by environment variable name only.

### `backend/app/core/logging.py`

Configures application logging with a consistent format.

### `backend/app/core/errors.py`

Defines:

- `ComplyAIError`
- JSON handler for expected application errors
- JSON handler for unexpected internal errors

All errors use the standard API response envelope.

## API Files

### `backend/app/api/deps.py`

Provides dependency injection helpers for:

- settings
- document service
- workflow service
- report service

### `backend/app/api/routes/health.py`

Route:

```text
GET /api/health
```

Returns API health status.

### `backend/app/api/routes/documents.py`

Routes:

```text
POST /api/documents/upload
GET  /api/documents/{document_id}
GET  /api/documents/{document_id}/preview
```

Handles document upload, metadata, and preview data.

### `backend/app/api/routes/workflows.py`

Routes:

```text
POST /api/workflows
GET  /api/workflows/{workflow_id}
POST /api/workflows/{workflow_id}/run
GET  /api/workflows/{workflow_id}/status
GET  /api/workflows/{workflow_id}/artifacts
```

Handles workflow creation, execution, polling, and artifact retrieval.

### `backend/app/api/routes/reviews.py`

Routes:

```text
GET  /api/workflows/{workflow_id}/review
POST /api/workflows/{workflow_id}/revision
POST /api/workflows/{workflow_id}/approve
```

Handles reviewer output, one revision request, and approval.

### `backend/app/api/routes/reports.py`

Routes:

```text
POST /api/workflows/{workflow_id}/report
GET  /api/workflows/{workflow_id}/report
GET  /api/reports/{report_id}
GET  /api/reports/{report_id}/download
```

Handles report generation, retrieval, and download placeholder.

## Schema Files

### `backend/app/schemas/common.py`

Defines the standard response envelope:

```text
ApiResponse
ApiError
```

### `backend/app/schemas/document.py`

Defines:

- supported document types
- document metadata
- document preview

### `backend/app/schemas/workflow.py`

Defines:

- workflow stage names
- stage status
- workflow creation request
- workflow stage result
- workflow response
- workflow artifacts

### `backend/app/schemas/review.py`

Defines:

- revision request
- review response

### `backend/app/schemas/report.py`

Defines:

- required action
- missing information
- final compliance report
- report generation request

## Service Files

### `backend/app/services/document_service.py`

Handles document intake:

- file name validation
- extension validation
- size validation
- metadata creation
- preview scaffold

### `backend/app/services/planner_service.py`

Planner stage.

Creates a compliance objective, priority, and required action plan.

### `backend/app/services/executor_service.py`

Executor stage.

Generates:

- summary
- checklist
- missing information
- draft response

### `backend/app/services/reviewer_service.py`

Reviewer stage.

Checks generated artifacts and returns:

- schema validation status
- approval readiness
- warnings
- review response

### `backend/app/services/workflow_service.py`

Orchestrates the workflow:

- create workflow
- run workflow
- get workflow
- get artifacts
- get review
- submit revision
- approve workflow

### `backend/app/services/report_service.py`

Generates the final compliance action report.

## Domain Files

### `backend/app/domain/compliance.py`

Defines domain constants:

- supported document types
- revision limit

## Repository Files

### `backend/app/repositories/base.py`

Defines a repository protocol for future SQLite persistence.

This keeps services decoupled from storage details.

## Integration Files

### `backend/app/integrations/llm_client.py`

Placeholder provider abstraction for Gemini, Groq, and fallback models.

## Utility Files

### `backend/app/utils/ids.py`

Creates prefixed IDs.

## Notes

This is a scaffold, not a production backend implementation.

It intentionally avoids:

- committing secrets
- real provider calls
- database writes
- file storage writes

Those can be implemented in later phases behind the existing service, integration, and repository boundaries.
