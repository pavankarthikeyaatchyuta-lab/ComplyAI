# Phase 12 Planner

This document describes the Planner implementation for ComplyAI.

## Files

```text
backend/app/services/planner_service.py
backend/app/schemas/planner.py
backend/tests/test_planner_service.py
backend/sample_documents/
```

## Behavior

The Planner uses:

```text
backend/app/integrations/llm_client.py
```

It calls:

```python
llm_client.complete_json(prompt=..., response_schema=PlannerOutput)
```

This guarantees every Planner response is validated against the strict Pydantic `PlannerOutput` schema.

## Planner Schema

The Planner returns only valid:

```text
PlannerOutput
```

Required fields:

- document_type
- priority
- deadline
- objective
- required_actions
- missing_information
- risk_notes
- provider_used

## Supported Document Types

```text
DRC_01
GSTR_3A
ASMT_10
GST_INVOICE
TAX_REMINDER
```

## Regression Samples

Sample documents live in:

```text
backend/sample_documents/
```

Included samples:

- `drc_01_notice.txt`
- `gstr_3a_notice.txt`
- `asmt_10_notice.txt`
- `gst_invoice.txt`
- `tax_reminder.txt`

## Regression Test

Test file:

```text
backend/tests/test_planner_service.py
```

The test runs the Planner against every file in `backend/sample_documents` and prints:

```text
| File | Expected | Detected | Pass | Notes |
```

The test uses a fake LLM transport, so it does not call Groq or Gemini.

## Latest Regression Output

```text
| File | Expected | Detected | Pass | Notes |
| --- | --- | --- | --- | --- |
| asmt_10_notice.txt | ASMT_10 | ASMT_10 | True | ok |
| drc_01_notice.txt | DRC_01 | DRC_01 | True | ok |
| gst_invoice.txt | GST_INVOICE | GST_INVOICE | True | ok |
| gstr_3a_notice.txt | GSTR_3A | GSTR_3A | True | ok |
| tax_reminder.txt | TAX_REMINDER | TAX_REMINDER | True | ok |
```
