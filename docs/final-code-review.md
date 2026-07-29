# Phase 15 Final Code Review

This review is scoped to the ChatGPT Codex India Hackathon 2026 submission timeline.

## Findings

### P1 - Backend workflow state is still stateless

File:

```text
backend/app/services/workflow_service.py
```

The workflow service recreates workflow outputs on every `get_workflow`, `run_workflow`, and `get_artifacts` call. Revision count is passed as an optional method argument rather than persisted per workflow. This is acceptable for a UI-first demo, but it can make the one-revision rule appear unenforced if the API is called normally without a persisted revision count.

Hackathon-fit fix:

- Add a tiny in-memory workflow store for demo state.
- Persist `revision_count`, artifacts, and status in that store.
- Keep SQLite persistence for after judging unless time remains.

### P1 - Real backend workflow requires provider keys even for demo paths

File:

```text
backend/app/services/workflow_service.py
backend/app/services/planner_service.py
```

`WorkflowService.run_workflow()` calls the LLM-backed Planner. Without configured Groq/Gemini keys, API workflow execution can fail even though the frontend has a complete demo experience.

Hackathon-fit fix:

- Add a `DEMO_MODE=true` setting.
- In demo mode, use deterministic sample Planner output.
- Keep real LLM execution available when keys are configured.

### P2 - Frontend uses hash routing instead of React Router

File:

```text
frontend/src/app/App.tsx
```

The app uses manual hash routing. It works and is deployment-safe, but the declared stack includes React Router. For judging, this is not a blocker, but it is a consistency gap between architecture and implementation.

Hackathon-fit fix:

- Either install and wire React Router for the four routes, or update docs to say hash routing is used for demo reliability.

### P2 - Custom cursor updates React state on pointer movement

File:

```text
frontend/src/components/cursor/ComplyCursor.tsx
```

The cursor is polished and guarded by fine-pointer and reduced-motion checks, which is good. However, `setMode` and trail updates can still cause frequent React renders during pointer movement.

Hackathon-fit fix:

- Only call `setMode` when the detected mode changes.
- Keep trail particle count low, which is already done.
- Do not expand the cursor effect further before submission.

### P2 - Export buttons are UI-only

File:

```text
frontend/src/features/report/components/ReportActionBar.tsx
backend/app/api/routes/reports.py
```

The report page exposes Download PDF, Export JSON, and Print actions, but backend export is currently a placeholder.

Hackathon-fit fix:

- Make Print call `window.print()`.
- Make Export JSON download the current report fixture.
- Leave PDF as "coming next" or implement a simple browser print-to-PDF path.

### P3 - Accessibility needs a quick polish pass

Frontend files:

```text
frontend/src/pages/
frontend/src/features/
```

The visual UI is strong, but the app would benefit from quick accessibility polish: focus rings, explicit button labels where icons exist, keyboard-visible states, and reduced-motion coverage beyond the cursor.

Hackathon-fit fix:

- Add global focus-visible styles.
- Ensure every icon-only or ambiguous button has accessible text.
- Keep animations subtle, already mostly true.

## Architecture

Strengths:

- Clear frontend feature separation.
- Backend separates API routes, schemas, services, integrations, and domain constants.
- Planner, Executor, and Reviewer now use strict Pydantic contracts.
- LLM client has testable fallback behavior.
- Developer Mode is excellent for judging because it exposes the pipeline.

Risks:

- Backend is scaffold-plus-demo logic, not persisted workflow infrastructure.
- Frontend and backend are not integrated yet.
- Real OCR is not implemented.

## Performance

Strengths:

- Frontend bundle builds successfully.
- Motion is mostly transform/opacity based.
- Cursor is disabled for touch and reduced-motion users.

Risks:

- Cursor state updates can become noisy.
- Many glass panels and blur effects may be heavy on low-end machines.

Hackathon-fit improvements:

- Avoid adding more blur-heavy components.
- Tune cursor state updates only if visible jank appears.

## Security

Strengths:

- Secrets are not committed.
- `.env.example` uses placeholders.
- LLM client reads provider keys from settings.
- Upload validation exists on frontend and backend scaffold.

Risks:

- Uploaded files are not persisted/scanned yet.
- No auth, tenancy, or rate limiting.
- CORS is config-driven but should be strict in deployment.

Hackathon-fit improvements:

- Keep API keys only in Render environment variables.
- Add a README note for setting `ALLOWED_ORIGINS` to the Vercel URL.

## Accessibility

Strengths:

- Layout is responsive.
- Text hierarchy is readable.
- Motion is mostly subtle.

Risks:

- Needs keyboard focus polish.
- Custom cursor must not hide default cursor for assistive contexts; current pointer/reduced-motion guard helps.

Hackathon-fit improvements:

- Add global `:focus-visible` styles.
- Verify tab order manually across landing, upload, workflow, report, and developer pages.

## Maintainability

Strengths:

- Good docs per phase.
- Reusable UI components were extracted.
- Backend service/schema layering is clean.

Risks:

- Demo data is duplicated between frontend fixtures and backend fixtures.
- Manual routing may grow awkward.

Hackathon-fit improvements:

- Freeze scope.
- Avoid further new pages unless they directly support demo flow.

## Scalability

Strengths:

- Repository and integration seams exist.
- LLM client transport abstraction is testable.

Risks:

- SQLite/repository persistence is not implemented.
- Background jobs are not implemented.

Hackathon-fit improvements:

- Use in-memory demo store now.
- Save real DB/job queue for post-hackathon.

## UI Consistency

Strengths:

- Strong premium dark SaaS identity.
- Consistent glassmorphism and emerald/blue accent language.
- The app consistently avoids chatbot patterns.

Risks:

- Some pages are static fixtures.
- Export actions are not functional yet.

Hackathon-fit improvements:

- Make the main CTA path seamless: Landing → Upload → Workflow → Report → Developer Mode.
- Ensure every CTA visibly works in the demo.

## Test Coverage

Strengths:

- LLM fallback tests.
- Planner regression tests across sample documents.
- Executor tests.
- Reviewer tests.

Risks:

- No API route tests.
- No frontend component tests.
- No E2E demo smoke test.

Hackathon-fit improvements:

- Add one API smoke test for `/api/health`.
- Add one Playwright/manual demo checklist rather than full frontend tests.

## Code Smells

- Stateless backend workflow after creating service boundaries.
- Duplicate demo fixtures across frontend/backend.
- Manual hash router despite planned React Router.
- Export actions are visual-only.

## Suggested Final Polish Commit Message

```text
Polish demo reliability and export interactions before submission
```

Suggested contents:

- add backend demo mode for workflow execution
- make report JSON export functional
- wire Print to `window.print()`
- add focus-visible styles
- add API health smoke test
