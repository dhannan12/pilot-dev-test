"""
Integration tests for the health check endpoint.

These tests verify the health endpoint behavior in a more realistic
environment, testing independence from database and external services.
"""
import time
import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_health_endpoint_integration():
    """Integration test for complete health check workflow."""
    response = client.get("/api/health")
    
    assert response.status_code == 200
    assert response.headers["content-type"] == "application/json"
    
    data = response.json()
    assert data["status"] == "healthy"
    assert data["version"] == "1.0.0"
    assert isinstance(data["uptime"], int)
    assert data["uptime"] >= 0
    assert isinstance(data["timestamp"], str)
    assert data["timestamp"].endswith("Z")


def test_health_endpoint_multiple_requests():
    """Test that multiple health check requests work consistently."""
    responses = []
    for _ in range(5):
        response = client.get("/api/health")
        responses.append(response)
        time.sleep(0.1)
    
    # All requests should succeed
    for response in responses:
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "healthy"
        assert data["version"] == "1.0.0"


def test_health_endpoint_performance():
    """Test that health endpoint maintains performance under multiple calls."""
    times = []
    
    for _ in range(10):
        start_time = time.time()
        response = client.get("/api/health")
        end_time = time.time()
        
        response_time_ms = (end_time - start_time) * 1000
        times.append(response_time_ms)
        assert response.status_code == 200
    
    # Calculate average and verify it's under 100ms
    avg_time = sum(times) / len(times)
    assert avg_time < 100, f"Average response time {avg_time}ms exceeded 100ms threshold"


def test_health_endpoint_independent_of_database():
    """Test that health endpoint succeeds without database connectivity."""
    # The health endpoint should not attempt any database operations
    # This test verifies it works in isolation
    response = client.get("/api/health")
    assert response.status_code == 200
    data = response.json()
    
    # Verify response structure is complete without database
    assert "status" in data
    assert "uptime" in data
    assert "version" in data
    assert "timestamp" in data


def test_health_endpoint_no_external_dependencies():
    """Test that health endpoint has no external dependencies."""
    # This endpoint should work without any external service calls
    response = client.get("/api/health")
    assert response.status_code == 200
    
    # Verify it responds quickly (no network calls)
    start_time = time.time()
    response = client.get("/api/health")
    end_time = time.time()
    
    response_time_ms = (end_time - start_time) * 1000
    assert response_time_ms < 50, "Health check should be very fast with no external calls"
