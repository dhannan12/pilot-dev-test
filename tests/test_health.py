import time
import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_health_endpoint_returns_200():
    """Test that /health endpoint returns HTTP 200 status code."""
    response = client.get("/health")
    assert response.status_code == 200


def test_health_endpoint_json_structure():
    """Test that /health endpoint returns correct JSON structure."""
    response = client.get("/health")
    data = response.json()
    
    assert "message" in data
    assert "status" in data
    assert data["message"] == "Hello World"
    assert data["status"] == "ok"


def test_health_endpoint_content_type():
    """Test that /health endpoint returns application/json Content-Type."""
    response = client.get("/health")
    assert response.headers["content-type"] == "application/json"


def test_health_endpoint_response_time():
    """Test that /health endpoint responds within 100ms."""
    start_time = time.time()
    response = client.get("/health")
    end_time = time.time()
    
    response_time_ms = (end_time - start_time) * 1000
    assert response.status_code == 200
    assert response_time_ms < 100, f"Response time {response_time_ms}ms exceeded 100ms threshold"


def test_health_endpoint_no_authentication():
    """Test that /health endpoint is accessible without authentication."""
    # Simply calling without auth headers should succeed
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"message": "Hello World", "status": "ok"}
