# Phase 3 Landing Page

This document explains the landing page hierarchy implemented for ComplyAI.

The page is designed as a premium SaaS landing experience, not a chatbot interface. It focuses on structured compliance workflow, trusted document handling, and final verified reports.

## Page Hierarchy

```text
LandingPage
├── SiteHeader
├── HeroSection
│   ├── AnimatedParticleField
│   ├── HeroCopy
│   ├── HeroActions
│   └── HeroDashboardPreview
├── FeatureSection
├── AgentWorkflowSection
├── SecuritySection
├── ComplianceReportPreviewSection
├── SupportedDocumentsSection
├── FAQSection
└── Footer
```

## Component Responsibilities

### `SiteHeader`

Provides lightweight navigation and primary access to the product flow.

Navigation items:

- Features
- Workflow
- Security
- FAQ

Primary action:

- Analyze Document

### `HeroSection`

Creates the strongest first impression.

Required headline:

```text
Turn GST Notices into Verified Action Plans
```

Required subtitle:

```text
Upload once.
Understand instantly.
```

Actions:

- Analyze Document
- Developer Mode

The hero includes floating glass cards, an animated particle background, and a dashboard-style product preview.

### `FeatureSection`

Explains the main benefits without using chatbot language.

Feature themes:

- structured extraction
- action planning
- review and verification
- final report generation

### `AgentWorkflowSection`

Shows the system pipeline:

```text
Upload → Extraction → Planner → Executor → Reviewer → Report
```

This makes the product feel auditable and workflow-driven.

### `SecuritySection`

Communicates professional trust:

- local-first demo structure
- environment-based secrets
- traceable artifacts
- review before report

### `ComplianceReportPreviewSection`

Shows the final deliverable as a polished report preview with:

- compliance summary
- required actions
- missing information
- checklist
- draft response
- reviewer verification

### `SupportedDocumentsSection`

Lists supported input types:

- GST Notice DRC-01
- GST Notice GSTR-3A
- GST Notice ASMT-10
- GST Invoice
- Tax Reminder

### `FAQSection`

Answers common product questions for small business owners, chartered accountants, and MSME operators.

### `Footer`

Provides closing navigation and hackathon/project identity.

## Design Decisions

### Use glassmorphism on cards

Glass cards create a premium SaaS feel while preserving the dark navy visual identity.

### Use SVG illustrations

The landing page uses SVG-style visual compositions for the document workflow and report preview. This keeps assets lightweight and easy to deploy.

### Use animated background particles

Particles add movement and polish without making the page feel like a game or chatbot.

### Use workflow language

The page avoids chat-first words and emphasizes:

- upload
- extract
- plan
- execute
- review
- report

### Keep the CTA direct

The primary call to action is:

```text
Analyze Document
```

This matches the user's intent more directly than conversational phrases.
