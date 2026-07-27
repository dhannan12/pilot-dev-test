"""
Unit tests for the health check endpoint.

These tests verify the health endpoint returns correct response structure,
status codes, and timing requirements without external dependencies.
"""
import time
import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_health_endpoint_returns_200():
    """Test that /api/health endpoint returns HTTP 200 status code."""
    response = client.get("/api/health")
    assert response.status_code == 200


def test_health_endpoint_content_type():
    """Test that /api/health endpoint returns application/json Content-Type."""
    response = client.get("/api/health")
    assert "application/json" in response.headers["content-type"]


def test_health_endpoint_status_field():
    """Test that /api/health endpoint returns status field with value 'healthy'."""
    response = client.get("/api/health")
    data = response.json()
    assert "status" in data
    assert data["status"] == "healthy"


def test_health_endpoint_version_field():
    """Test that /api/health endpoint returns version field with value '1.0.0'."""
    response = client.get("/api/health")
    data = response.json()
    assert "version" in data
    assert data["version"] == "1.0.0"


def test_health_endpoint_uptime_field():
    """Test that /api/health endpoint returns uptime as integer."""
    response = client.get("/api/health")
    data = response.json()
    assert "uptime" in data
    assert isinstance(data["uptime"], int)
    assert data["uptime"] >= 0


def test_health_endpoint_timestamp_field():
    """Test that /api/health endpoint returns timestamp in ISO 8601 format."""
    response = client.get("/api/health")
    data = response.json()
    assert "timestamp" in data
    assert isinstance(data["timestamp"], str)
    # Verify ISO 8601 format with Z suffix
    assert data["timestamp"].endswith("Z")
    # Verify parseable as ISO format
    from datetime import datetime
    datetime.fromisoformat(data["timestamp"].replace("Z", "+00:00"))


def test_health_endpoint_response_structure():
    """Test that /api/health endpoint returns all required fields."""
    response = client.get("/api/health")
    data = response.json()
    
    required_fields = ["status", "uptime", "version", "timestamp"]
    for field in required_fields:
        assert field in data, f"Missing required field: {field}"


def test_health_endpoint_response_time():
    """Test that /api/health endpoint responds within 100ms."""
    start_time = time.time()
    response = client.get("/api/health")
    end_time = time.time()
    
    response_time_ms = (end_time - start_time) * 1000
    assert response.status_code == 200
    assert response_time_ms < 100, f"Response time {response_time_ms}ms exceeded 100ms threshold"


def test_health_endpoint_no_authentication():
    """Test that /api/health endpoint is accessible without authentication."""
    response = client.get("/api/health")
    assert response.status_code == 200


def test_health_endpoint_uptime_consistency():
    """Test that uptime values are consistent and increasing."""
    response1 = client.get("/api/health")
    uptime1 = response1.json()["uptime"]
    
    time.sleep(1)
    
    response2 = client.get("/api/health")
    uptime2 = response2.json()["uptime"]
    
    assert uptime2 >= uptime1, "Uptime should be non-decreasing"


def test_health_endpoint_no_database_dependency():
    """Test that /api/health endpoint works without database access."""
    # This test verifies the endpoint responds successfully
    # The implementation should not attempt database connections
    response = client.get("/api/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
