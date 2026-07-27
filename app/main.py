from fastapi import FastAPI

app = FastAPI()


@app.get("/health")
def health():
    """
    Health check endpoint that returns service status.
    
    Returns:
        dict: JSON response with message and status fields
    """
    return {
        "message": "Hello World",
        "status": "ok"
    }
