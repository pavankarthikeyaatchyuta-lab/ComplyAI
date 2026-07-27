# Phase 6 Compliance Action Report

This document describes the Compliance Action Report implemented for ComplyAI.

The report is inspired by:

- Stripe Invoice
- Notion documents
- Linear issues
- GitHub Security reports

It is designed as a professional export-ready dashboard view, not a chat transcript.

## Route

```text
#/report
```

## Component Hierarchy

```text
ComplianceReportPage
├── Header
│   ├── BackToWorkflow
│   ├── ReportTitle
│   └── ReportIdentityCard
├── MetricGrid
│   ├── DocumentType
│   ├── Priority
│   ├── Deadline
│   └── ReviewStatus
├── ReportBody
│   ├── ImmediateActions
│   ├── Checklist
│   ├── MissingInformation
│   └── DraftResponse
├── ReportSidebar
│   ├── ReviewStatus
│   ├── ProviderUsed
│   └── AttentionRequired
└── ReportActionBar
    ├── DownloadPDF
    ├── ExportJSON
    └── Print
```

## Reusable Components

### `ReportMetricCard`

Displays top-level report metadata:

- document type
- priority
- deadline
- review status

### `ReportSectionCard`

Reusable glass section wrapper for report content.

### `ActionList`

Displays immediate compliance actions with owner and due timing.

### `ChecklistPanel`

Displays completed and pending checklist items.

### `MissingInfoPanel`

Displays unresolved missing information with severity.

### `DraftResponsePanel`

Displays the draft response using professional report typography.

### `ReportActionBar`

Provides:

- Download PDF
- Export JSON
- Print

These buttons are UI-ready placeholders for backend/export integration.

## Report Sections

The report includes:

- Document Type
- Priority
- Deadline
- Immediate Actions
- Checklist
- Missing Information
- Draft Response
- Review Status
- Provider Used
- Download PDF
- Export JSON
- Print

## UX Decisions

### Use report-first layout

The page is structured like a professional report, not an app chat history.

### Keep metadata above the fold

Document type, priority, deadline, and review status are visible immediately.

### Use a sticky-style action bar

Export actions remain prominent without crowding report content.

### Separate content from verification

The main report body contains action content. The sidebar contains review status, provider trace, and attention notes.

## Visual Design

The page uses:

- premium dark glass cards
- crisp Inter typography
- generous spacing
- professional dashboard density
- emerald verification states
- amber warning states
- red priority states
- responsive two-column layout

The design should feel suitable for a chartered accountant, MSME operator, or business owner reviewing compliance output.
