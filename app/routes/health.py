"""
Health check endpoint handler.

This module provides a lightweight health check endpoint that returns
system status information without requiring database connectivity.
"""
from datetime import datetime, timezone
from fastapi import APIRouter
from app.utils.uptime import get_uptime_seconds

router = APIRouter()


@router.get("/api/health")
async def health_check():
    """
    Health check endpoint that returns system status information.
    
    This endpoint is designed for monitoring tools, load balancers, and
    orchestration platforms. It requires no authentication and does not
    access the database.
    
    Returns:
        dict: JSON response containing:
            - status (str): Always "healthy"
            - uptime (int): Seconds since application start
            - version (str): Application version "1.0.0"
            - timestamp (str): Current server time in ISO 8601 format
    """
    return {
        "status": "healthy",
        "uptime": get_uptime_seconds(),
        "version": "1.0.0",
        "timestamp": datetime.now(timezone.utc).isoformat().replace("+00:00", "Z")
    }
