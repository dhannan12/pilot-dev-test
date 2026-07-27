# Health Check API Endpoint

## Overview

The health check endpoint provides a lightweight mechanism for monitoring application availability and status. It is designed for integration with monitoring tools, load balancers, and orchestration platforms.

## Endpoint

**GET /api/health**

### Authentication

None required. This endpoint is publicly accessible.

### Request

No parameters required.

```bash
curl http://localhost:8000/api/health
```

### Response

**Status Code:** `200 OK`

**Content-Type:** `application/json`

#### Response Schema

| Field | Type | Description |
|-------|------|-------------|
| `status` | string | Health status indicator. Always returns `"healthy"` |
| `uptime` | integer | Application uptime in seconds since start |
| `version` | string | Application version. Always returns `"1.0.0"` |
| `timestamp` | string | Current server time in ISO 8601 format (UTC) |

#### Example Response

```json
{
  "status": "healthy",
  "uptime": 3600,
  "version": "1.0.0",
  "timestamp": "2026-07-27T14:30:00Z"
}
```

## Characteristics

### Zero Dependencies

This endpoint is designed to have **no external dependencies**:

- ✅ No database connections
- ✅ No external API calls
- ✅ No authentication required
- ✅ No filesystem operations (beyond code execution)

The endpoint will respond successfully even if:
- The database is unavailable
- External services are down
- Network connectivity is limited

### Performance

- **Response Time:** < 100ms under normal conditions
- **Throughput:** Suitable for high-frequency polling (e.g., every 5 seconds)
- **Resource Usage:** Minimal CPU and memory footprint

### Reliability

- **Availability:** Independent of all other system components
- **Consistency:** Returns predictable structure on every request
- **Idempotency:** Safe to call repeatedly without side effects

## Integration Examples

### Docker Healthcheck

Add to your `Dockerfile`:

```dockerfile
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:8000/api/health || exit 1
```

### Kubernetes Liveness Probe

Add to your deployment configuration:

```yaml
livenessProbe:
  httpGet:
    path: /api/health
    port: 8000
  initialDelaySeconds: 10
  periodSeconds: 10
  timeoutSeconds: 3
  failureThreshold: 3
```

### AWS Application Load Balancer

Configure health check settings:
- **Path:** `/api/health`
- **Port:** `8000`
- **Protocol:** `HTTP`
- **Interval:** `30 seconds`
- **Timeout:** `5 seconds`
- **Healthy threshold:** `2`
- **Unhealthy threshold:** `3`
- **Success codes:** `200`

### Prometheus Monitoring

Use `blackbox_exporter` to monitor endpoint availability:

```yaml
modules:
  http_2xx:
    prober: http
    http:
      method: GET
      valid_status_codes: [200]
      fail_if_not_matches_regexp:
        - '"status":"healthy"'
```

### cURL Monitoring Script

Simple bash script for monitoring:

```bash
#!/bin/bash
response=$(curl -s -w "\n%{http_code}" http://localhost:8000/api/health)
status_code=$(echo "$response" | tail -n 1)
body=$(echo "$response" | head -n -1)

if [ "$status_code" -eq 200 ]; then
  echo "Health check passed: $body"
  exit 0
else
  echo "Health check failed: HTTP $status_code"
  exit 1
fi
```

## Usage Recommendations

### Monitoring Tools

- **Frequency:** Poll every 10-30 seconds for production systems
- **Timeout:** Set timeout to 5 seconds maximum
- **Alerting:** Alert if 3+ consecutive failures occur

### Load Balancers

- **Health Check Path:** `/api/health`
- **Expected Status:** `200 OK`
- **Expected Body:** JSON with `"status": "healthy"`
- **Deregistration:** Remove instance after 2-3 failed checks

### Container Orchestration

- **Liveness Probe:** Use for detecting crashed containers
- **Readiness Probe:** Use to control traffic routing
- **Startup Probe:** Use during initial application startup

## Differences from Legacy Endpoint

The application also maintains a legacy endpoint at `/health` for backward compatibility:

| Feature | `/api/health` (New) | `/health` (Legacy) |
|---------|---------------------|-------------------|
| Status Field | `"healthy"` | `"ok"` |
| Version Field | ✅ Included | ❌ Not included |
| Uptime Field | ✅ Included | ❌ Not included |
| Timestamp Field | ✅ Included | ❌ Not included |
| Message Field | ❌ Not included | ✅ "Hello World" |

**Recommendation:** Use `/api/health` for all new integrations. The `/health` endpoint is deprecated and may be removed in future versions.

## Technical Implementation

The endpoint is implemented using:
- **FastAPI** router for HTTP handling
- **In-memory uptime tracking** (no database)
- **UTC timezone** for timestamp consistency
- **Async handler** for non-blocking execution

The uptime counter starts when the application initializes and increments based on elapsed time. No persistent state is maintained.
