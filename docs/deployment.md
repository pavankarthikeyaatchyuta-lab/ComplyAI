# Deployment

ComplyAI is deployed as two services:

- Frontend on Vercel
- Backend on Render

This keeps the static UI fast and lets the FastAPI app run in a normal Python host instead of Vercel serverless.

## Vercel Frontend

Project root:

```text
.
```

Build command:

```text
cd frontend && npm run build
```

Output directory:

```text
frontend/dist
```

Environment variables:

```text
VITE_API_BASE_URL=https://<your-render-backend>.onrender.com
```

## Render Backend

Render reads `render.yaml` from the repository root.

Service:

```text
backend
```

Build command:

```text
pip install -r requirements.txt
```

Start command:

```text
uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

Environment variables:

```text
DATABASE_URL=sqlite:///./complyai.db
UPLOAD_DIR=./uploads
REPORT_DIR=./reports
ALLOWED_ORIGINS=https://comply-ai-five.vercel.app
GEMINI_API_KEY=
GROQ_API_KEY=
```

## Secret Management

Provider keys must be configured only as Render environment variables for the backend.

Do not commit:

- Gemini API keys
- Groq API keys
- local `.env` files
- generated SQLite databases
- uploaded documents
- generated reports

## Production Upgrade Path

SQLite is acceptable for the hackathon demo.

For production, replace SQLite with a managed database while keeping repositories stable.
