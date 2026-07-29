# Deployment

ComplyAI is configured for a single Vercel deployment.

## Vercel

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

API runtime:

```text
/api/[...path].py
```

Environment variables:

```text
VITE_API_BASE_URL=/api
DATABASE_URL=sqlite:///./complyai.db
UPLOAD_DIR=./uploads
REPORT_DIR=./reports
ALLOWED_ORIGINS=https://<your-vercel-project>.vercel.app
GEMINI_API_KEY=
GROQ_API_KEY=
```

## Secret Management

Provider keys must be configured only as Vercel environment variables.

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
