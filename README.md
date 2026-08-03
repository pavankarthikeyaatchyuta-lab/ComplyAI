# ?? ComplyAI

### AI Compliance Copilot for Indian MSMEs

> **ComplyAI turns compliance documents into verified action plans.**

Built for the **ChatGPT Codex India Hackathon 2026** ? Theme 6 ? *AI Agents for Bharat's Businesses*

[![Live App](https://img.shields.io/badge/??_Live_App-comply--ai--five.vercel.app-2ea44f?style=for-the-badge)](https://comply-ai-five.vercel.app)
[![Backend API](https://img.shields.io/badge/??_API-Render-46E3B7?style=for-the-badge)](https://complyai-tsfo.onrender.com/api/health)
[![Built with Codex](https://img.shields.io/badge/??_Built_with-OpenAI_Codex-412991?style=for-the-badge)](#-built-with-openai-codex)

---

## ?? Table of Contents

- [The Problem](#-the-problem)
- [Why ComplyAI](#-why-complyai-not-just-a-chatbot)
- [How It Works](#-how-it-works)
- [Scope](#-scope)
- [Agent Contracts](#-agent-contracts)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Built With OpenAI Codex](#-built-with-openai-codex)
- [Roadmap](#-roadmap)
- [License](#-license)

---

## ?? The Problem

Indian MSMEs regularly receive invoices, GST notices, and tax reminders that are **time-sensitive and easy to misread**. Missing a deadline or misunderstanding a notice can trigger real penalties.

Existing options fall short:

| Option | Limitation |
|---|---|
| ????? Professional accountant | Costly, slow to reach for small filings |
| ?? Document viewers | Passive ? no guidance, no action plan |
| ?? Generic chatbots | No structured workflow, no self-checking |

---

## ? Why ComplyAI, Not Just a Chatbot

ComplyAI doesn't just *explain* a GST notice ? it tells you exactly what to do, checks its own work, and hands you a compliance-ready report.

- ?? **Structured compliance report** ? not a conversational answer
- ? **Actionable checklist** with real deadlines
- ?? **Automatic gap detection** ? flags a missing GSTIN instead of guessing
- ?? **Self-review & revision** ? the output is checked before you ever see it
- ?? **Consistent JSON-backed structure** ? not free-form text

---

## ?? How It Works

ComplyAI runs on an **agentic three-stage pipeline** ? not a single linear prompt:

```text
?? Upload
   ?
   ?
?? Extract Text
   ?
   ?
?? Planner  ?????? classifies the document, extracts key fields
   ?
   ?
? Executor ?????? drafts summary, checklist, and response
   ?
   ?
?? Reviewer ?????? checks completeness & consistency
   ?
   ??? ?? Issues found ??? ? Executor (revision mode) ??? ?? Reviewer
   ?
   ??? ? Approved
   ?
   ?
?? Compliance Action Report
```

> ?? **One automatic revision cycle** ? if issues remain after the second review, they're surfaced to the user rather than looping indefinitely. This closed loop ? *plan ? execute ? evaluate ? improve* ? is what makes the workflow genuinely agentic.

---

## ?? Scope

### ? Supported (v1.0)

- ?? GST Notice ? **DRC-01**
- ?? GST Notice ? **GSTR-3A**
- ?? GST Notice ? **ASMT-10**
- ?? GST Invoice
- ? Tax Reminder

### ?? Explicitly Unsupported (v1.0)

Income Tax notices ? Legal contracts / loan agreements ? Bank statements ? Utility bills ? General/unrelated documents

> Unsupported documents are rejected with a **clear, user-facing message** ? never a guessed classification.

---

## ?? Agent Contracts

<details>
<summary><b>?? Planner</b> ? click to expand</summary>

**Input:** Uploaded document (PDF / image / text)

```json
{
  "status": "OK",
  "document_type": "GST Notice",
  "priority": "High",
  "summary": "...",
  "required_actions": ["..."],
  "required_documents": ["..."],
  "deadline": "2026-08-10",
  "detected_fields": ["..."],
  "missing_fields": ["GSTIN"]
}
```

No fabricated confidence scores ? only fields the pipeline actually observed.
</details>

<details>
<summary><b>? Executor</b> ? click to expand</summary>

**Input:** Planner output *(or, in revision mode, just the Reviewer's flagged issues)*

```json
{
  "draft_summary": "...",
  "recommended_next_steps": ["..."],
  "draft_response": "...",
  "checklist": [{ "task": "Verify GSTIN", "status": "Pending" }]
}
```

Revision mode updates **only the affected fields** ? it never regenerates from scratch.
</details>

<details>
<summary><b>?? Reviewer</b> ? click to expand</summary>

**Input:** Planner output + Executor output

```json
{
  "approved": false,
  "issues": [{ "severity": "High", "message": "GSTIN is missing." }],
  "revision_required": true
}
```
</details>

---

## ??? Tech Stack

| Layer | Technology |
|---|---|
| ?? Frontend | React ? Vite ? Tailwind CSS |
| ?? Backend | FastAPI ? Pydantic |
| ??? Database | SQLite |
| ?? Runtime LLM | **Groq** (primary) ? **Gemini** (fallback), single provider-agnostic client with schema validation |
| ?? Deployment | Vercel (frontend) + Render (backend) |
| ????? Dev Tool | **OpenAI Codex** |

---

## ?? Project Structure

```text
ComplyAI/
??? ?? frontend/          # React + Vite + Tailwind UI
?   ??? src/
?       ??? pages/        # Upload, Workflow Dashboard, Report, Developer Mode
?       ??? services/     # API client ? backend
??? ?? backend/           # FastAPI application
?   ??? app/
?       ??? api/routes/   # /documents, /workflows, /health
?       ??? services/     # Planner, Executor, Reviewer
?       ??? integrations/ # llm_client.py (Groq + Gemini fallback)
?       ??? schemas/      # Pydantic contracts
??? ?? tests/             # pytest suite + regression harness
??? ?? sample_documents/   # Test corpus (GST notices, invoices, negatives)
??? ?? docs/               # Architecture & deployment notes
```

---

## ?? Getting Started

### Prerequisites

`Python 3.11+` ? `Node.js 18+` ? Groq & Gemini API keys

### Backend

```bash
cd backend
pip install -r requirements.txt
cp .env.example .env   # add GROQ_API_KEY, GEMINI_API_KEY
uvicorn app.main:app --reload
```

### Frontend

```bash
cd frontend
npm install
echo "VITE_API_BASE_URL=http://localhost:8000" > .env
npm run dev
```

Visit **`http://localhost:5173`** ??

---

## ?? Testing

```bash
cd backend
python -m pytest tests/ -q
```

Sample documents in `sample_documents/` are run through a regression harness after every Planner or extraction change ? a pass/fail table across every supported document type **plus negative samples**, so a fix for one format can't silently break another.

---

## ?? Deployment

| Service | Platform | URL |
|---|---|---|
| ?? Frontend | Vercel | [comply-ai-five.vercel.app](https://comply-ai-five.vercel.app) |
| ?? Backend | Render | [complyai-tsfo.onrender.com](https://complyai-tsfo.onrender.com) |

> ? Backend runs on Render's free tier ? the first request after inactivity may take 30?60s to wake up.

---

## ?? Built With OpenAI Codex

Codex was used as the **primary development agent** throughout the engineering lifecycle:

- ??? Architecture planning and service structure, before any code was written
- ?? Backend and frontend scaffolding
- ?? Implementation of the Planner, Executor, and Reviewer services against agreed schemas
- ?? Unit test generation and expansion, including for the LLM fallback client
- ?? Self-review passes that surfaced real gaps ? incomplete frontend?backend wiring, missing OCR ? fixed in follow-up sessions
- ??? Debugging real production issues: a Python runtime mismatch, a settings-parsing format bug, and two LLM provider models that had been deprecated between build and launch

This isn't a polished-first-try story ? it's a real, iterative build, reflected in the commit history.

---

## ??? Roadmap

- [ ] ?? Live backend-driven data for the Developer Mode observability panel
- [ ] ?? Expanded document type coverage beyond the three v1.0 categories
- [ ] ??? Persistent storage beyond SQLite for multi-user production use
- [ ] ?? Bilingual, regional-language interface support

---

## ?? License

Built for the ChatGPT Codex India Hackathon 2026.

---

<div align="center">

**ComplyAI** ? turning compliance documents into verified action plans. ???

[Live App](https://comply-ai-five.vercel.app) ? [Repository](https://github.com/pavankarthikeyaatchyuta-lab/ComplyAI)

</div>
