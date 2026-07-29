# Phase 13 Executor

This document describes the Executor implementation for ComplyAI.

## Files

```text
backend/app/services/executor_service.py
backend/app/schemas/executor.py
backend/tests/test_executor_service.py
```

## Modes

The Executor supports:

```text
normal
revision
```

## Normal Mode

Normal mode converts Planner output into user-facing compliance artifacts:

- summary
- required actions
- checklist
- missing information
- draft response
- provider used

The response is validated by:

```text
ExecutorOutput
```

## Revision Mode

Revision mode accepts:

```text
ExecutorRevisionRequest
```

Required fields:

- flagged_fields
- instructions

Only explicitly flagged fields are updated.

Supported flagged fields:

- summary
- required_actions
- checklist
- missing_information
- draft_response

## Safety Rule

Revision mode must preserve every unflagged field.

Example:

If only `draft_response` is flagged, these fields stay unchanged:

- summary
- required_actions
- checklist
- missing_information

## Tests

Test file:

```text
backend/tests/test_executor_service.py
```

Covered cases:

- normal mode returns a valid `ExecutorOutput`
- workflow-facing `run()` returns stage metadata and JSON artifact
- summary-only revision preserves all other fields
- draft-response-only revision preserves all other fields
- multi-field revision updates only the flagged fields

## Implementation Review

Review result:

- Normal mode is deterministic and schema-backed.
- Revision mode uses a copied artifact and does not mutate the original output.
- Unflagged fields are protected by regression tests.
- Workflow service remains compatible with the executor `run()` API.
- Provider metadata is included in executor output and workflow stage metadata.
