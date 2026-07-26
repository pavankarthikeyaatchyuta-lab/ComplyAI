# ComplyAI

ComplyAI turns compliance documents into verified action plans.

Built for the ChatGPT Codex India Hackathon 2026, ComplyAI is designed as a workflow application, not a chatbot. A user uploads a GST notice, GST invoice, or tax reminder, and the system produces a structured compliance action report through extraction, planning, execution, review, and one optional revision.

## Product Flow

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

## Planned Stack

Frontend:

- React
- Vite
- Tailwind CSS
- TypeScript
- Framer Motion
- React Router
- React Query
- React Hook Form
- Zod

Backend:

- FastAPI
- Pydantic
- SQLite

Deployment:

- Frontend: Vercel
- Backend: Render

## Architecture Documents

- [Architecture](docs/architecture.md)
- [Folder Structure](docs/folder-structure.md)
- [API Routes](docs/api.md)
- [Data Flow](docs/data-flow.md)
- [Deployment](docs/deployment.md)

## Security

API keys and provider secrets must not be committed to this repository. Use deployment environment variables and local `.env` files based on `.env.example`.
