# Phase 2 UI/UX Design Specification

ComplyAI should be designed as a premium SaaS dashboard for compliance workflows.

It must not look or behave like a chatbot. The user should always feel they are moving through a verified document workflow:

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

## Target Users

ComplyAI is designed for:

- small business owners
- chartered accountants
- MSME operators

These users need confidence, clarity, and speed. The UI should feel professional and trustworthy without becoming visually heavy.

## Design Style

The visual direction is modern SaaS:

- premium
- minimal
- professional
- glassmorphism
- soft shadows
- rounded corners
- smooth motion
- strong information hierarchy

Reference feel:

- Stripe
- Linear
- Vercel
- Notion
- Clerk
- GitHub
- Perplexity

ComplyAI should borrow their polish, spacing, and confidence, but remain focused on compliance operations.

## Core UX Rule

```text
Never present ComplyAI as a chat interface.
```

Use:

- workflow steppers
- structured cards
- document previews
- checklists
- report sections
- review panels
- status badges
- progress indicators

Avoid:

- chat bubbles
- message composer as the main input
- assistant avatars as the product center
- open-ended conversation layouts
- vague AI output blocks

## Color System

### Background

Primary background:

```text
Deep Navy: #071A2F
```

Use this across the authenticated dashboard and report workspace. It gives the product a serious, premium, professional foundation.

### Secondary Gradient

Use a blue gradient for emphasis and motion states:

```text
#0B2A4A → #155EEF → #2E90FA
```

Use this for:

- primary CTA states
- active workflow step
- upload progress
- landing page light fields
- processing indicators

### Accent

```text
Emerald: #10B981
```

Use for:

- verified status
- completed workflow stages
- approved reports
- successful validations

### Success

```text
Green: #22C55E
```

Use for:

- successful upload
- completed extraction
- approved review
- generated report

### Warning

```text
Amber: #F59E0B
```

Use for:

- missing information
- due-soon deadlines
- low confidence extraction
- one revision remaining

### Error

```text
Red: #EF4444
```

Use for:

- failed upload
- failed extraction
- unsupported file type
- revision limit reached

### Glass Cards

Card background:

```text
rgba(255, 255, 255, 0.06)
```

Card border:

```text
rgba(255, 255, 255, 0.12)
```

Hover border:

```text
rgba(255, 255, 255, 0.22)
```

Backdrop:

```text
backdrop-blur-xl
```

### Text

Primary:

```text
#F8FAFC
```

Secondary:

```text
#CBD5E1
```

Muted:

```text
#94A3B8
```

Disabled:

```text
#64748B
```

## Typography

Use Inter as the primary typeface.

Recommended scale:

```text
Display: 56px / 64px / 700
H1:      40px / 48px / 700
H2:      32px / 40px / 650
H3:      24px / 32px / 650
H4:      20px / 28px / 600
Body:    16px / 24px / 400
Small:   14px / 20px / 400
Caption: 12px / 16px / 500
```

Rules:

- Use display typography only on the landing page.
- Dashboard headings should be compact and scannable.
- Report content should prioritize readability.
- Avoid long paragraphs inside cards.
- Use clear section names instead of marketing phrasing.

## Layout System

### Global App Shell

```text
AppShell
├── Sidebar
├── Topbar
└── MainContent
```

Desktop sidebar:

```text
280px
```

Tablet:

```text
collapsed icon rail
```

Mobile:

```text
bottom navigation or slide-over drawer
```

Main content padding:

```text
Desktop: 32px
Tablet: 24px
Mobile: 16px
```

Maximum dashboard width:

```text
1440px
```

## Navigation

Authenticated navigation:

```text
New Upload
Workflows
Reports
Developer Mode
Settings
```

Secondary sidebar area:

```text
Workspace
Help
User profile
```

Mobile navigation:

```text
Upload
Workflows
Reports
Settings
```

Developer Mode may be nested under Settings on mobile.

## Component System

### Buttons

Primary buttons:

- blue gradient
- white text
- rounded 12px
- subtle glow
- soft hover lift

Use for:

- Upload Document
- Start Compliance Workflow
- Approve Report
- Download Report

Secondary buttons:

- dark glass background
- light border
- white or slate text

Use for:

- Preview Document
- Back
- Save Draft

Destructive buttons:

- red border
- dark background
- red hover glow

Use for:

- Delete Workflow
- Remove Document

### Cards

Cards use dark glass surfaces.

Recommended styling:

```text
Background: rgba(255,255,255,0.06)
Border: rgba(255,255,255,0.12)
Radius: 20px
Shadow: soft navy shadow
Backdrop: blur
```

Use cards for:

- document metadata
- workflow artifacts
- checklists
- report sections
- settings groups

Do not place cards inside other cards.

### Badges

Use badges for status, risk, and verification.

Examples:

```text
Verified
Pending
Missing Info
High Risk
Due Soon
Approved
Processing
Failed
```

Color rules:

- emerald for verified or approved
- amber for warnings or missing information
- red for failed or high risk
- blue for active processing
- slate for draft or idle

### Workflow Stepper

The workflow stepper is a core product component.

```text
Upload → Extraction → Planner → Executor → Reviewer → Report
```

Each step shows:

- icon
- label
- status
- timestamp if complete
- animated connector

States:

```text
completed
active
pending
failed
revision
```

### Document Preview Panel

Used on upload, workflow, and report pages.

Shows:

- file name
- document type
- upload date
- page count when available
- preview placeholder
- extracted key fields
- status badge

### Compliance Artifact Card

Structure:

```text
ArtifactCard
├── Header
│   ├── Icon
│   ├── Title
│   └── StatusBadge
├── Summary
├── StructuredContent
└── FooterAction
```

Artifact cards include:

- compliance summary
- required actions
- missing information
- checklist
- draft response
- reviewer notes

## Animation System

Use Framer Motion.

### Page Transitions

```text
initial: opacity 0, y 12
animate: opacity 1, y 0
exit: opacity 0, y -8
duration: 180-260ms
```

### Card Entrance

Cards should enter with slight stagger:

```text
40-80ms per card
```

### Upload Animation

Drag state:

- border glows blue
- center icon lifts slightly
- background glass brightens
- accepted file type badge appears

Uploading state:

- animated circular progress
- smooth progress bar
- filename locked into place
- status text changes by phase

### Workflow Animation

When a stage runs:

- active step pulses softly
- connector animates left to right
- stage card shows skeleton content
- completed artifact fades in

### Micro Interactions

Use subtle interactions on:

- button hover
- card hover
- badge hover
- checklist toggles
- tab switches
- report expand/collapse sections

Motion must feel calm. Compliance software should not feel jumpy.

## Landing Page

### Purpose

Explain the product quickly and direct users into upload.

### Hierarchy

```text
LandingPage
├── PublicNav
├── HeroSection
├── SupportedDocumentsSection
├── WorkflowPreviewSection
├── TrustSection
└── Footer
```

### Hero

Headline:

```text
Turn GST documents into verified action plans.
```

Subheadline:

```text
Upload notices, invoices, and reminders. ComplyAI extracts facts, plans required actions, verifies the output, and generates a final compliance report.
```

Primary CTA:

```text
Upload Document
```

Secondary CTA:

```text
View Workflow
```

Hero visual:

- product dashboard preview
- workflow stepper
- document preview
- compliance summary card
- checklist card
- verified badge

Decision:

The hero should show the real product workflow, not an abstract AI assistant.

## Upload Page

### Purpose

Let users upload a compliance document confidently.

### Hierarchy

```text
UploadPage
├── AppShell
├── PageHeader
├── UploadGrid
│   ├── UploadPanel
│   └── DocumentGuidancePanel
└── RecentUploads
```

### Upload Panel

```text
UploadPanel
├── DocumentTypeSelector
├── FileDropzone
├── FileValidationStatus
├── OptionalMetadataFields
└── UploadButton
```

Supported document types:

```text
GST Notice DRC-01
GST Notice GSTR-3A
GST Notice ASMT-10
GST Invoice
Tax Reminder
```

### Guidance Panel

Show what ComplyAI will extract:

- GSTIN
- notice number
- tax period
- due date
- demand amount
- missing information
- response requirements

### Empty State

```text
Drop a GST document here to start your compliance workflow.
```

### Success State

```text
Document uploaded successfully. Ready to start extraction.
```

CTA:

```text
Start Compliance Workflow
```

## Workflow Dashboard

### Purpose

Show live progress through extraction, planning, execution, and review.

### Hierarchy

```text
WorkflowDashboard
├── AppShell
├── WorkflowHeader
├── WorkflowStepper
├── MainWorkflowGrid
│   ├── StageOutputArea
│   └── DocumentContextPanel
└── BottomActionBar
```

### Workflow Header

Show:

- workflow name
- document type
- current stage
- risk badge
- created timestamp

Example:

```text
DRC-01 Notice Review
Currently reviewing generated action plan
```

### Stage Output Area

Sections:

```text
Extraction
Planner
Executor
Reviewer
```

Each section shows:

- status
- generated timestamp
- structured output
- confidence or verification metadata

### Document Context Panel

Sticky right panel containing:

- uploaded document preview
- extracted key fields
- missing fields
- deadline warning
- revision count

### Bottom Action Bar

Contextual actions:

- Continue to Review
- Request Revision
- Generate Report
- Back to Upload

Decision:

The user should always know the current stage and next action.

## Review Page

### Purpose

Allow the user to review and approve generated artifacts.

### Hierarchy

```text
ReviewPage
├── AppShell
├── ReviewHeader
├── ReviewGrid
│   ├── ReviewArtifacts
│   └── VerificationPanel
└── ReviewActionBar
```

### Review Artifacts

Sections:

```text
Compliance Summary
Required Actions
Missing Information
Compliance Checklist
Draft Response
```

### Verification Panel

Shows:

- reviewer status
- completeness score
- detected risks
- unresolved missing information
- one revision availability

### Revision UX

The revision interaction should be a form, not a chat box.

```text
RevisionRequestForm
├── RevisionReasonSelect
├── CorrectionDetailsTextarea
├── AffectedSectionsCheckboxGroup
└── SubmitRevisionButton
```

Possible revision reasons:

- incorrect extracted field
- missing document detail
- draft response needs adjustment
- checklist item missing
- deadline or risk level incorrect

Revision availability copy:

```text
One revision available
```

After revision is used:

```text
Revision used. You can approve or restart with a new upload.
```

## Compliance Report Page

### Purpose

Present the final verified deliverable.

### Hierarchy

```text
ComplianceReportPage
├── AppShell
├── ReportHeader
├── ReportLayout
│   ├── ReportDocument
│   └── ReportSidebar
└── ExportActionBar
```

### Report Header

Show:

- report title
- verified badge
- generated date
- document type
- risk level

### Report Document

Sections:

```text
1. Document Details
2. Compliance Summary
3. Required Actions
4. Missing Information
5. Compliance Checklist
6. Draft Response
7. Reviewer Verification
8. Final Notes
```

### Report Sidebar

Sticky metadata:

- workflow status
- document uploaded
- extraction completed
- review completed
- revision count
- export buttons

### Export Actions

```text
Download PDF
Download Markdown
Copy Draft Response
Start New Workflow
```

## Developer Mode

### Purpose

Expose internals for hackathon judges, developers, and debugging.

Developer Mode should be clearly separate from the normal user flow.

### Hierarchy

```text
DeveloperModePage
├── AppShell
├── DeveloperHeader
├── DebugGrid
│   ├── WorkflowTracePanel
│   ├── APIRequestPanel
│   ├── ArtifactJSONViewer
│   └── ProviderStatusPanel
```

### Workflow Trace Panel

Shows:

```text
Upload completed
Extraction started
Extraction completed
Planner started
Planner completed
Executor completed
Reviewer completed
Report generated
```

### API Request Panel

Shows API route calls and response status.

### Artifact JSON Viewer

Shows structured artifacts:

- extracted fields
- planner output
- executor output
- reviewer output
- report JSON

### Provider Status Panel

Shows:

- Gemini configured
- Groq configured
- OCR status
- database status

Decision:

Developer Mode demonstrates technical credibility without distracting regular users.

## Settings Page

### Purpose

Let users configure workspace and compliance preferences.

### Hierarchy

```text
SettingsPage
├── AppShell
├── SettingsSidebar
└── SettingsContent
```

### Sections

```text
Profile
Workspace
Compliance Preferences
Provider Settings
Data & Privacy
Developer Mode
```

### Compliance Preferences

Fields:

- default document type
- default jurisdiction
- default reminder window
- risk tolerance display
- report format preference

### Provider Settings

Show configured state only. Never reveal secrets.

Example:

```text
Gemini API: Configured
Groq API: Configured
```

### Data & Privacy

Actions:

- clear local demo workflows
- delete uploaded documents
- export data
- reset settings

## Error Pages

### 404

Message:

```text
This page does not exist.
```

CTA:

```text
Back to Dashboard
```

### 500

Message:

```text
Something went wrong while processing your request.
```

Actions:

```text
Retry
Go to Upload
```

### Workflow Error

Show:

- failed stage
- error summary
- retry action
- upload new document action

Example:

```text
Extraction failed because the document text could not be read clearly.
```

## Loading States

### Global Page Loading

Use skeleton panels:

- header skeleton
- stepper skeleton
- card skeletons
- document preview skeleton

### Upload Loading

Show:

- animated upload icon
- progress bar
- filename
- validating file state
- storing document state

### Workflow Loading

Stage labels:

```text
Extracting document facts
Planning required actions
Generating compliance checklist
Reviewing final artifacts
```

### Report Loading

Message:

```text
Preparing verified compliance report
```

Use animated report section skeletons.

## Empty States

### No Uploads

```text
No compliance workflows yet.
```

CTA:

```text
Upload your first document
```

### No Missing Information

```text
No missing information detected.
```

Use emerald verification styling.

### No Required Actions

```text
No immediate required actions found.
```

Use this carefully. The app should avoid implying legal certainty.

### No Developer Logs

```text
Run a workflow to see trace logs.
```

## Success States

### Upload Success

```text
Document uploaded successfully.
```

CTA:

```text
Start Workflow
```

### Extraction Success

```text
Key compliance details extracted.
```

### Review Success

```text
Artifacts verified and ready for approval.
```

### Report Success

```text
Compliance action report generated.
```

Actions:

```text
Download Report
Start New Workflow
```

## Responsive Design

### Desktop

Desktop is the primary experience.

Use:

- sidebar navigation
- multi-column layouts
- sticky context panels
- dense artifact cards
- full workflow stepper

### Tablet

Use:

- collapsed sidebar
- two-column layout when possible
- document panel below main content if needed
- horizontally scrollable stepper

### Mobile

Use:

- top header
- bottom navigation
- single-column layout
- compact cards
- collapsible report sections
- simplified stepper

Mobile workflow stepper:

```text
Current stage card
Progress: 3 of 6
Expandable full timeline
```

## Complete UI Hierarchy

```text
App
├── PublicLanding
│   ├── PublicNav
│   ├── HeroSection
│   ├── ProductPreview
│   ├── SupportedDocuments
│   ├── WorkflowExplanation
│   └── Footer
│
└── AuthenticatedAppShell
    ├── Sidebar
    ├── Topbar
    └── Pages
        ├── UploadPage
        ├── WorkflowDashboard
        ├── ReviewPage
        ├── ComplianceReportPage
        ├── DeveloperModePage
        ├── SettingsPage
        ├── ErrorPages
        ├── LoadingStates
        ├── EmptyStates
        └── SuccessStates
```

## Final Design Principle

ComplyAI should look like a serious premium SaaS product for compliance work.

The premium feel should come from:

- calm dark navy background
- glass panels
- restrained gradients
- crisp typography
- visible workflow progress
- structured reports
- smooth motion
- clear verification signals
- obvious next actions

The interface should make users trust the process before they trust the output.
