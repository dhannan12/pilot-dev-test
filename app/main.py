from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.users import router as users_router
from middleware.contentType import content_type_middleware
from config.logger import setup_logger

# Setup logger
logger = setup_logger('app')

app = FastAPI(
    title="User Creation API",
    description="REST API for user registration with secure password handling",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Add content type validation middleware
app.middleware("http")(content_type_middleware)

# Include user routes
app.include_router(users_router)


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
