from fastapi import FastAPI
from app.routes.health import router as health_router
from app.utils.uptime import get_start_time

# Initialize application and capture start time
app = FastAPI()

# Ensure uptime tracking is initialized
_ = get_start_time()

# Register health check router
app.include_router(health_router)


@app.get("/health")
def health():
    """
    Legacy health check endpoint (deprecated).
    
    Use /api/health for the standardized health check endpoint.
    
    Returns:
        dict: JSON response with message and status fields
    """
    return {
        "message": "Hello World",
        "status": "ok"
    }
