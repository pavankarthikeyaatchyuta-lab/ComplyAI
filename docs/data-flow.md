# Data Flow

This document explains how data moves through ComplyAI.

## End-to-End Flow

```text
User uploads document
↓
Frontend validates file and document type
↓
Backend stores uploaded file
↓
Backend creates document record
↓
Frontend creates workflow
↓
Backend runs workflow stages
↓
Frontend polls workflow status
↓
User reviews generated artifacts
↓
Optional one revision
↓
User approves
↓
Backend generates final report
↓
Frontend renders report
```

## Upload Flow

```text
UploadPage
↓
React Hook Form + Zod validation
↓
POST /api/documents/upload
↓
DocumentService
↓
Storage client
↓
DocumentRepository
↓
SQLite documents table
```

Decision:

The upload flow separates file storage from workflow creation. This makes the uploaded document reusable and keeps failure states clear.

## Workflow Creation Flow

```text
Frontend receives document_id
↓
POST /api/workflows
↓
Workflow service creates workflow
↓
WorkflowRepository stores workflow
↓
Frontend navigates to /workflows/:id
```

Decision:

The workflow becomes the main user-facing unit after upload.

## Workflow Execution Flow

```text
POST /api/workflows/{workflow_id}/run
↓
ComplianceWorkflow starts
↓
ExtractionService
↓
PlannerService
↓
ExecutorService
↓
ReviewerService
↓
Artifacts saved after each stage
```

Decision:

Saving after every stage makes the system auditable and recoverable.

## Extraction Stage

Input:

```text
Uploaded document
Document type
```

Output:

```text
Extracted fields
Document classification
Detected dates
GSTIN
Notice number
Tax period
Demand amount
Missing fields
Confidence values
```

Decision:

Extraction should produce structured facts, not a paragraph.

## Planner Stage

Input:

```text
Extracted fields
Document type
```

Output:

```text
Compliance objective
Required action plan
Deadline analysis
Risk level
Information gaps
```

Decision:

Planning is separated from execution so reasoning can be reviewed before deliverables are generated.

## Executor Stage

Input:

```text
Compliance plan
Extracted facts
```

Output:

```text
Compliance summary
Required actions
Missing information
Checklist
Draft response
```

Decision:

The executor creates structured user-facing artifacts for the UI.

## Reviewer Stage

Input:

```text
Extracted facts
Plan
Generated artifacts
```

Output:

```text
Verification notes
Completeness score
Consistency warnings
Approval readiness
```

Decision:

Review is mandatory because the product promise is verified action plans.

## Revision Flow

```text
User submits revision request
↓
POST /api/workflows/{workflow_id}/revision
↓
Backend checks revision_count
↓
If revision_count is 0, rerun affected stages
↓
Save updated artifacts
↓
Increment revision_count
```

Decision:

The revision is intentionally limited to one cycle to keep ComplyAI from becoming a chatbot.

## Report Flow

```text
User approves review
↓
POST /api/workflows/{workflow_id}/approve
↓
POST /api/workflows/{workflow_id}/report
↓
ReportService composes final report
↓
ReportRepository stores JSON and Markdown
↓
Frontend renders ReportPage
```

Decision:

Store both structured JSON and Markdown. JSON supports UI rendering. Markdown supports export and download.

## State Ownership

### Server State

Owned by React Query:

- document details
- workflow status
- workflow artifacts
- review data
- report data

### Client UI State

Owned by local state or a small UI store:

- selected tab
- expanded panels
- active artifact
- revision panel state

Decision:

Server state should not be duplicated in global client stores.
