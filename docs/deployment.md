# Deployment

ComplyAI is planned for separate frontend and backend deployment.

## Frontend: Vercel

The frontend should deploy from:

```text
frontend/
```

Build command:

```text
npm run build
```

Output directory:

```text
dist
```

Environment variables:

```text
VITE_API_BASE_URL=https://your-render-backend.onrender.com
```

## Backend: Render

The backend should deploy from:

```text
backend/
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
ALLOWED_ORIGINS=https://your-vercel-frontend.vercel.app
GEMINI_API_KEY=
GROQ_API_KEY=
```

## Secret Management

Provider keys must be configured only as environment variables.

Do not commit:

- Gemini API keys
- Groq API keys
- local `.env` files
- generated SQLite databases
- uploaded documents
- generated reports

## Production Upgrade Path

SQLite is acceptable for the hackathon demo.

For production, replace SQLite with PostgreSQL while keeping repositories stable.
