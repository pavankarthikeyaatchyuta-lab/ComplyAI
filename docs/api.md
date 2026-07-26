# API Routes

ComplyAI should expose a REST API from the FastAPI backend.

All responses should follow a consistent envelope.

## Response Format

Success:

```json
{
  "success": true,
  "data": {},
  "error": null
}
```

Failure:

```json
{
  "success": false,
  "data": null,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message"
  }
}
```

## Documents

### Upload Document

```http
POST /api/documents/upload
```

Purpose:

Upload a GST notice, GST invoice, or tax reminder.

Responsibilities:

- validate file type
- validate document type
- store uploaded file
- create document record
- return document metadata

### Get Document

```http
GET /api/documents/{document_id}
```

Purpose:

Return document metadata.

### Get Document Preview

```http
GET /api/documents/{document_id}/preview
```

Purpose:

Return a preview-friendly representation of the uploaded document.

## Workflows

### Create Workflow

```http
POST /api/workflows
```

Purpose:

Create a compliance workflow for an uploaded document.

### Get Workflow

```http
GET /api/workflows/{workflow_id}
```

Purpose:

Return workflow metadata, current stage, and status.

### Run Workflow

```http
POST /api/workflows/{workflow_id}/run
```

Purpose:

Start the compliance pipeline.

Pipeline:

```text
Extraction
Planner
Executor
Reviewer
```

### Get Workflow Status

```http
GET /api/workflows/{workflow_id}/status
```

Purpose:

Support frontend polling while stages execute.

### Get Workflow Artifacts

```http
GET /api/workflows/{workflow_id}/artifacts
```

Purpose:

Return generated artifacts for the workflow.

Artifacts:

- extracted fields
- compliance summary
- required actions
- missing information
- checklist
- draft response
- reviewer notes

## Reviews

### Get Review

```http
GET /api/workflows/{workflow_id}/review
```

Purpose:

Return review-ready artifacts.

### Submit Revision

```http
POST /api/workflows/{workflow_id}/revision
```

Purpose:

Submit one user revision request.

Backend rule:

```text
revision_count must be less than 1
```

If the limit is reached, return:

```json
{
  "success": false,
  "data": null,
  "error": {
    "code": "REVISION_LIMIT_REACHED",
    "message": "Only one revision is allowed for this workflow."
  }
}
```

### Approve Workflow

```http
POST /api/workflows/{workflow_id}/approve
```

Purpose:

Approve reviewed artifacts for final report generation.

## Reports

### Generate Report

```http
POST /api/workflows/{workflow_id}/report
```

Purpose:

Generate the final compliance action report.

### Get Workflow Report

```http
GET /api/workflows/{workflow_id}/report
```

Purpose:

Return the final report for a workflow.

### Get Report

```http
GET /api/reports/{report_id}
```

Purpose:

Return report details by report ID.

### Download Report

```http
GET /api/reports/{report_id}/download
```

Purpose:

Download the final report.

## Planned Data Schemas

### Compliance Summary

```json
{
  "documentType": "DRC_01",
  "taxpayerName": "Example Taxpayer",
  "gstin": "22AAAAA0000A1Z5",
  "taxPeriod": "2025-2026",
  "noticeDate": "2026-07-01",
  "dueDate": "2026-07-15",
  "issueSummary": "Summary of compliance issue.",
  "riskLevel": "medium"
}
```

### Required Action

```json
{
  "id": "action_001",
  "title": "Prepare response",
  "description": "Prepare a response with supporting GST documents.",
  "dueDate": "2026-07-15",
  "priority": "high",
  "status": "pending"
}
```

### Missing Information

```json
{
  "field": "GSTIN",
  "reason": "GSTIN was not detected in the uploaded document.",
  "requiredFor": "Draft response validation",
  "severity": "critical"
}
```

### Checklist Item

```json
{
  "id": "check_001",
  "label": "Verify GSTIN and notice number",
  "category": "Document verification",
  "completed": false
}
```
