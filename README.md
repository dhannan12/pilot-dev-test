# FastAPI Hello World Health Endpoint

A simple FastAPI application with a health check endpoint.

## Installation

```bash
pip install -r requirements.txt
```

## Running the application

```bash
uvicorn app.main:app --reload
```

## Running tests

```bash
pytest
```

## Health Endpoint

**GET /health**

Returns service health status.

Response:
```json
{
  "message": "Hello World",
  "status": "ok"
}
```
