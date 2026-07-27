"""
User controller - handles user creation business logic.
Coordinates validation, password hashing, and database operations.
"""
from fastapi import HTTPException, status
from db.models.User import UserCreate, UserResponse, user_db
from utils.passwordHasher import hash_password
from middleware.validation import ValidationMiddleware
import logging


# Configure logger to exclude sensitive data
logger = logging.getLogger(__name__)


class UserController:
    """Handles user-related operations"""
    
    @staticmethod
    async def create_user(user_data: UserCreate) -> UserResponse:
        """
        Create a new user with validation and secure password hashing.
        
        Args:
            user_data: User creation data (name, email, password)
        
        Returns:
            UserResponse with created user data (excluding password)
        
        Raises:
            HTTPException: For validation errors (400) or conflicts (409)
        """
        # Extract data
        name = user_data.name.strip()
        email = user_data.email.lower().strip()
        password = user_data.password
        
        # Additional validation
        errors = ValidationMiddleware.validate_user_data(name, email, password)
        if errors:
            logger.warning(f"Validation failed for user creation: {list(errors.keys())}")
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail={
                    "error": "Validation failed",
                    "fields": errors
                }
            )
        
        # Check for duplicate email (case-insensitive)
        existing_user = user_db.get_user_by_email(email)
        if existing_user:
            logger.warning(f"Duplicate email registration attempt: {email[:3]}***")
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail={"error": "Email already registered"}
            )
        
        # Hash password (bcrypt with cost factor >= 10)
        try:
            password_hash = hash_password(password)
            logger.info(f"Password hashed successfully for user: {email[:3]}***")
        except Exception as e:
            logger.error(f"Password hashing failed: {type(e).__name__}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail={"error": "Failed to process password"}
            )
        
        # Create user in database
        try:
            user = user_db.create_user(name, email, password_hash)
            logger.info(f"User created successfully: ID={user.id}, email={email[:3]}***")
        except ValueError as e:
            # Race condition - another request created the user
            logger.warning(f"Race condition detected for email: {email[:3]}***")
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail={"error": "Email already registered"}
            )
        except Exception as e:
            logger.error(f"User creation failed: {type(e).__name__}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail={"error": "Failed to create user"}
            )
        
        # Return user response (excluding password)
        return UserResponse(
            id=user.id,
            name=user.name,
            email=user.email,
            createdAt=user.created_at
        )
