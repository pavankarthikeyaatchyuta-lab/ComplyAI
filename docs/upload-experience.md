# Phase 4 Upload Experience

This document describes the upload experience implemented for ComplyAI.

The upload page is designed to feel like Dropbox plus Vercel: simple document intake, premium motion, strong validation, and clear next actions.

## Route

```text
#/upload
```

The current app uses a lightweight hash route so the upload page works in local Vite development and static deployments.

## Component Hierarchy

```text
UploadPage
├── Header
│   ├── BackToLanding
│   ├── PageTitle
│   └── SecureIntakeCard
├── UploadWorkspace
│   ├── UploadMainPanel
│   │   ├── FileDropzone
│   │   ├── SupportedFileBadges
│   │   ├── UnsupportedDocumentCard
│   │   ├── UploadFailureCard
│   │   ├── UploadSuccessState
│   │   └── UploadActions
│   ├── OCRIndicator
│   ├── ValidationChecks
│   └── RecentUploads
└── UploadPreviewPanel
    ├── DocumentPreview
    ├── FileMetadata
    ├── ValidationStatus
    ├── ProgressRing
    └── UploadSuccessSummary
```

## Reusable Components

### `FileDropzone`

Provides drag-and-drop and browse-file interactions.

Responsibilities:

- detect drag state
- expose selected file to parent state
- show supported file badges
- animate hover and drop state

### `SupportedFileBadges`

Shows accepted file types:

- PDF
- DOCX
- PNG
- JPG

### `ProgressRing`

Animated SVG progress ring powered by Framer Motion.

Used during:

- upload
- OCR indicator
- success completion

### `OCRIndicator`

Displays OCR readiness and active OCR state.

### `UnsupportedDocumentCard`

Shown when validation detects:

- unsupported extension
- file larger than 12 MB
- missing GST document signal

### `UploadFailureCard`

Shows retry controls for a failed valid upload.

### `UploadPreviewPanel`

Sticky document context panel.

Shows:

- file preview mockup
- selected file name
- file size
- detected document type
- validation state
- animated progress ring
- upload success summary

### `RecentUploads`

Displays recent intake history with statuses:

- verified
- needs review
- failed

## Validation Rules

Current frontend validation checks:

```text
Accepted extensions: PDF, DOCX, PNG, JPG, JPEG
Maximum file size: 12 MB
Supported document signal in file name: drc, gstr, asmt, invoice, reminder, notice, gst
```

This is intentionally frontend-only for Phase 4. Backend validation should repeat these rules later.

## Upload States

```text
idle
validating
uploading
ocr
success
failure
```

## UX Decisions

### Drag and browse are equal paths

Small business users may prefer browsing files, while power users may drag files from desktop or cloud folders.

### Validation happens before upload

This gives fast feedback and prevents unsupported files from entering the workflow.

### OCR is visible

OCR is a key confidence moment. Showing an OCR indicator helps users understand that the system is reading the document, not guessing.

### Recent uploads stay visible

Recent uploads make the page feel like a real product workspace rather than a one-off demo screen.

### Unsupported documents get a dedicated card

Failure states should be useful and professional. The unsupported document card explains what went wrong and how to recover.

## Visual Design

The page uses:

- deep navy background
- glass panels
- emerald and blue accents
- soft shadows
- Framer Motion hover states
- animated upload progress
- responsive two-column desktop layout

The UI remains workflow-first and avoids chatbot patterns.
