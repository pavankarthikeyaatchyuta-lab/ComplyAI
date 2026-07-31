# ComplyAI

🔍 **ComplyAI** turns compliance documents into verified action plans.

Built for the ChatGPT Codex India Hackathon 2026, ComplyAI is designed as a workflow application, not a chatbot. A user uploads a GST notice, GST invoice, or tax reminder, and the system produces a structured compliance action report through extraction, planning, execution, review, and one optional revision.

## 🚦 Product Flow

```text
Upload
|
v
Extraction
|
v
Planner
|
v
Executor
|
v
Reviewer
|
v
Optional one revision
|
v
Compliance Report
```

## 🧱 Planned Stack

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

## 📚 Architecture Documents

- [Architecture](docs/architecture.md)
- [Folder Structure](docs/folder-structure.md)
- [API Routes](docs/api.md)
- [Data Flow](docs/data-flow.md)
- [UI/UX Design](docs/ui-ux-design.md)
- [Landing Page](docs/landing-page.md)
- [Upload Experience](docs/upload-experience.md)
- [Workflow Dashboard](docs/workflow-dashboard.md)
- [Compliance Report](docs/compliance-report.md)
- [Developer Mode](docs/developer-mode.md)
- [Custom Cursor](docs/custom-cursor.md)
- [Micro Animations](docs/micro-animations.md)
- [Backend Scaffold](docs/backend-scaffold.md)
- [LLM Client](docs/llm-client.md)
- [Planner](docs/planner.md)
- [Executor](docs/executor.md)
- [Reviewer](docs/reviewer.md)
- [Final Code Review](docs/final-code-review.md)
- [Hackathon-Winning Review](docs/hackathon-winning-review.md)
- [Deployment](docs/deployment.md)

## 💻 Local Frontend

```bash
cd frontend
npm install
npm run dev
```

Then open:

```text
http://localhost:5173
```

The upload experience is available at:

```text
http://localhost:5173/#/upload
```

The workflow dashboard is available at:

```text
http://localhost:5173/#/workflow
```

The compliance report is available at:

```text
http://localhost:5173/#/report
```

Developer Mode is available at:

```text
http://localhost:5173/#/developer
```

## 🔐 Security

API keys and provider secrets must not be committed to this repository. Use deployment environment variables and local `.env` files based on `.env.example`.

