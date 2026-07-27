# Phase 5 Workflow Dashboard

This document describes the Workflow Dashboard implemented for ComplyAI.

The dashboard replaces chat messages with a structured animated timeline:

```text
Planner
↓
Executor
↓
Reviewer
↓
Revision
↓
Compliance Report
```

## Route

```text
#/workflow
```

## Component Hierarchy

```text
WorkflowDashboardPage
├── Header
│   ├── BackToUpload
│   ├── LiveUpdatesBadge
│   ├── PageTitle
│   └── MetricCards
├── WorkflowTimeline
│   ├── TimelineConnector
│   └── WorkflowStageCard[]
│       ├── StageStatusBadge
│       ├── ExecutionMetadata
│       ├── WorkflowProgressBar
│       ├── OutputSummary
│       └── IssuesPanel
└── WorkflowSidebar
    ├── DocumentContextCard
    ├── EnterpriseTraceCard
    └── ContinueReviewAction
```

## Stage Data

Each workflow stage displays:

- status
- execution time
- provider used
- output summary
- issues
- progress

## Stages

### Planner

Maps extracted GST facts into a compliance action strategy.

### Executor

Generates user-facing artifacts:

- compliance summary
- required actions
- missing information
- checklist
- draft response

### Reviewer

Checks consistency, completeness, and report readiness.

### Revision

Keeps the one-revision workflow visible and controlled.

### Compliance Report

Shows report generation readiness after review approval.

## UX Decisions

### Timeline instead of chat

The dashboard uses a vertical timeline with animated connectors because ComplyAI is a workflow product, not a chatbot.

### Stage cards expose execution details

Each stage card shows provider, execution time, progress, output summary, and issues. This makes the system auditable and judge-friendly.

### Live updates are simulated in the UI

The Phase 5 dashboard includes live-style progress updates using React state. Later, this can be connected to backend polling or server-sent events.

### Issues are first-class

Warnings such as confidence problems or missing annexure references are visible inside each stage, not buried in prose.

## Visual Design

The dashboard uses:

- deep navy background
- glassmorphism cards
- animated timeline connectors
- emerald completed states
- sky blue running states
- amber issue states
- soft enterprise shadows

The page is desktop-first but remains responsive on tablet and mobile.
