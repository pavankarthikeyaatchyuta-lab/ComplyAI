# Phase 7 Developer Mode

This document describes the Developer Mode page implemented for ComplyAI.

Developer Mode is designed for judges and engineers. It shows how the agent pipeline works without exposing users to implementation detail during the normal compliance workflow.

## Route

```text
#/developer
```

## Design Inspiration

The page uses a professional DevOps dashboard style inspired by:

- Grafana
- Datadog
- GitHub Actions
- Vercel Analytics

## Component Hierarchy

```text
DeveloperModePage
├── Header
│   ├── BackToWorkflow
│   ├── PipelineStateBadge
│   └── LiveStateCard
├── DevMetricGrid
│   └── DevMetricCard[]
├── MainDevGrid
│   ├── ExecutionTimeline
│   ├── JsonViewer
│   │   ├── Planner JSON
│   │   ├── Executor JSON
│   │   └── Reviewer JSON
│   └── LogConsole
└── DevSidebar
    ├── SchemaValidationPanel
    ├── FallbackProviderPanel
    ├── ApiTimingPanel
    └── ErrorsLane
```

## Dashboard Shows

- Planner JSON
- Executor JSON
- Reviewer JSON
- Provider Used
- Execution Timeline
- Stage Duration
- Revision Count
- Logs
- Errors
- Schema Validation
- Fallback Provider
- API Timing

## Reusable Components

### `DevMetricCard`

Displays high-level system telemetry such as provider used, revision count, fallback readiness, and API timing.

### `JsonViewer`

Displays formatted JSON artifacts for planner, executor, and reviewer outputs.

### `ExecutionTimeline`

Shows stage-by-stage provider use, duration, status, and API timing.

### `LogConsole`

Displays info, warning, and error logs in a DevOps-style console.

### `SchemaValidationPanel`

Shows schema-level validation status for report artifacts.

### `DevStatusPill`

Reusable status badge for success, running, warning, and failed states.

## UX Decisions

### Separate Developer Mode from user workflow

Developer Mode is judge-facing and engineer-facing. It should not clutter the normal upload, workflow, or report pages.

### JSON artifacts are first-class

Showing planner, executor, and reviewer JSON makes the pipeline explainable and auditable.

### Errors and schema warnings are distinct

Runtime failures are different from compliance uncertainty. The dashboard displays them separately.

### Fallback provider is visible

Fallback readiness communicates resilience and improves technical credibility.

## Visual Design

The page uses:

- dense DevOps-style layout
- dark glass cards
- terminal-style log console
- JSON viewers
- animated timeline
- API timing bars
- green success states
- amber warning states
- red error lane

The result should feel like a professional observability dashboard for the ComplyAI agent pipeline.
