"""
User routes - API endpoints for user operations.
"""
from fastapi import APIRouter, status
from db.models.User import UserCreate, UserResponse
from controllers.userController import UserController


router = APIRouter(prefix="/api", tags=["users"])


@router.post(
    "/users",
    response_model=UserResponse,
    status_code=status.HTTP_201_CREATED,
    responses={
        201: {
            "description": "User created successfully",
            "content": {
                "application/json": {
                    "example": {
                        "id": 1,
                        "name": "John Doe",
                        "email": "john@example.com",
                        "createdAt": "2026-07-27T12:00:00"
                    }
                }
            }
        },
        400: {
            "description": "Validation error",
            "content": {
                "application/json": {
                    "example": {
                        "detail": {
                            "error": "Validation failed",
                            "fields": {
                                "name": "Name is required",
                                "email": "Invalid email format",
                                "password": "Password must be at least 8 characters"
                            }
                        }
                    }
                }
            }
        },
        409: {
            "description": "Email already registered",
            "content": {
                "application/json": {
                    "example": {
                        "detail": {"error": "Email already registered"}
                    }
                }
            }
        }
    }
)
async def create_user(user: UserCreate) -> UserResponse:
    """
    Create a new user account.
    
    Accepts JSON with name, email, and password fields.
    Returns created user data (excluding password).
    
    - **name**: User's full name (1-255 characters)
    - **email**: Valid email address (unique, case-insensitive)
    - **password**: Password (minimum 8 characters)
    """
    return await UserController.create_user(user)
