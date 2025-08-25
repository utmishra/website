# FastAPI LLM Cookiecutter

A production-ready FastAPI backend scaffold configured for Azure deployments. It includes
SSE streaming chat, Retrieval-Augmented Generation, background ingestion with Celery,
and observability integrations.

## Quickstart

```bash
uv sync
make dev
```

## Features
- SSE chat endpoint backed by Azure OpenAI
- RAG with Azure AI Search
- Background ingestion via Celery and Redis
- Azure Blob Storage for file handling
- Azure Content Safety integration
- Structured logging and OpenTelemetry
- Prometheus metrics
- Rate limiting with Redis
- CI/CD to Azure Container Apps

Refer to [docs/](docs) for operations, security, and observability guides.
