from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()


class HealthCheckResponse(BaseModel):
    """Pydantic model for health check response."""
    message: str
    status: str


@app.get("/health", response_model=HealthCheckResponse)
def health() -> HealthCheckResponse:
    """
    Health check endpoint that returns service status.
    
    Returns:
        HealthCheckResponse: JSON response with message and status fields
    """
    return HealthCheckResponse(
        message="Hello World",
        status="ok"
    )
