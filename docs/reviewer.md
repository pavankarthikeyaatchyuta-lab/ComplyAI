# Phase 14 Reviewer

This document describes the Reviewer implementation for ComplyAI.

## Files

```text
backend/app/services/reviewer_service.py
backend/app/schemas/review.py
backend/tests/test_reviewer_service.py
```

## Responsibilities

The Reviewer detects:

- missing information
- inconsistencies between Planner and Executor output
- whether a revision is required
- whether the one allowed revision is still available

## Reviewer Schema

The Reviewer returns strict:

```text
ReviewerOutput
```

Important fields:

- `review_status`
- `missing_information`
- `inconsistencies`
- `require_revision`
- `revision_count`
- `revision_available`
- `completeness_score`
- `provider_used`
- `summary`

## Revision Policy

ComplyAI allows a maximum of one revision.

The policy constant lives in:

```text
backend/app/domain/compliance.py
```

The workflow service raises:

```text
REVISION_LIMIT_REACHED
```

when a second revision is attempted.

## Tests

Test file:

```text
backend/tests/test_reviewer_service.py
```

Covered cases:

- detects missing information
- detects planner/executor priority inconsistency
- does not require another revision after the one allowed revision is used
- workflow service rejects a second revision

## Architecture Review

The Reviewer is intentionally deterministic in v1.0. This is a good hackathon tradeoff because it makes the demo reliable, keeps tests stable, and avoids LLM variability in the verification step.

The Reviewer consumes Planner and Executor artifacts through Pydantic schemas, which gives the pipeline strong contracts:

```text
PlannerOutput
↓
ExecutorOutput
↓
ReviewerOutput
```

This keeps ComplyAI workflow-driven rather than chat-driven.
