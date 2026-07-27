# FastAPI Hello World Health Endpoint

A simple FastAPI application with a comprehensive health check endpoint for monitoring and orchestration.

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

## API Endpoints

### Health Check Endpoint (Recommended)

**GET /api/health**

Comprehensive health check endpoint designed for monitoring tools, load balancers, and orchestration platforms.

Response:
```json
{
  "status": "healthy",
  "uptime": 3600,
  "version": "1.0.0",
  "timestamp": "2026-07-27T14:30:00Z"
}
```

**Features:**
- ✅ No database dependencies
- ✅ No authentication required
- ✅ Sub-100ms response time
- ✅ ISO 8601 timestamp format
- ✅ Application uptime tracking
- ✅ Version information

**Documentation:** See [docs/api/health.md](docs/api/health.md) for detailed integration examples.

### Legacy Health Endpoint

**GET /health**

Legacy endpoint maintained for backward compatibility. Use `/api/health` for new integrations.

Response:
```json
{
  "message": "Hello World",
  "status": "ok"
}
```

## Integration Examples

### Docker Healthcheck

```dockerfile
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:8000/api/health || exit 1
```

### Kubernetes Liveness Probe

```yaml
livenessProbe:
  httpGet:
    path: /api/health
    port: 8000
  initialDelaySeconds: 10
  periodSeconds: 10
```

### Simple Monitoring

```bash
curl http://localhost:8000/api/health
```

## Project Structure

```
.
├── app/
│   ├── main.py              # Application entry point
│   ├── routes/
│   │   └── health.py        # Health check endpoint handler
│   └── utils/
│       └── uptime.py        # Uptime tracking utility
├── tests/
│   ├── test_health.py       # Legacy endpoint tests
│   ├── test_api_health.py   # Health endpoint unit tests
│   └── integration/
│       └── test_health_integration.py
├── docs/
│   └── api/
│       └── health.md        # API documentation
└── requirements.txt
```

## Development

### Running with Auto-reload

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Running Tests with Coverage

```bash
pytest --cov=app tests/
```

### Running Specific Test Files

```bash
pytest tests/test_api_health.py -v
pytest tests/integration/test_health_integration.py -v
```
