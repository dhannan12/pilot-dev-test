"""
Request validation middleware for FastAPI.
Validates request body fields and constraints.
"""
from fastapi import Request, HTTPException, status
from fastapi.responses import JSONResponse
import re


class ValidationMiddleware:
    """Validation utilities for request data"""
    
    # RFC 5322 compliant email regex (simplified)
    EMAIL_REGEX = re.compile(
        r'^[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~-]+@'
        r'[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?'
        r'(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$'
    )
    
    MAX_REQUEST_SIZE = 1024 * 1024  # 1MB
    
    @staticmethod
    def validate_email(email: str) -> bool:
        """Validate email format (RFC 5322 compliant)"""
        if not email or len(email) > 320:  # RFC 5322 max length
            return False
        return bool(ValidationMiddleware.EMAIL_REGEX.match(email))
    
    @staticmethod
    def validate_name(name: str) -> tuple[bool, str]:
        """
        Validate name field.
        
        Returns:
            (is_valid, error_message)
        """
        if not name:
            return False, "Name is required"
        if len(name) < 1:
            return False, "Name must be at least 1 character"
        if len(name) > 255:
            return False, "Name must not exceed 255 characters"
        return True, ""
    
    @staticmethod
    def validate_password(password: str) -> tuple[bool, str]:
        """
        Validate password field.
        
        Returns:
            (is_valid, error_message)
        """
        if not password:
            return False, "Password is required"
        if len(password) < 8:
            return False, "Password must be at least 8 characters"
        return True, ""
    
    @staticmethod
    def validate_user_data(name: str, email: str, password: str) -> dict:
        """
        Validate all user creation fields.
        
        Returns:
            Dictionary with validation errors (empty if valid)
        """
        errors = {}
        
        # Validate name
        is_valid, error_msg = ValidationMiddleware.validate_name(name)
        if not is_valid:
            errors['name'] = error_msg
        
        # Validate email
        if not email:
            errors['email'] = "Email is required"
        elif not ValidationMiddleware.validate_email(email):
            errors['email'] = "Invalid email format"
        
        # Validate password
        is_valid, error_msg = ValidationMiddleware.validate_password(password)
        if not is_valid:
            errors['password'] = error_msg
        
        return errors


async def validate_content_type(request: Request, call_next):
    """
    Middleware to validate Content-Type header for POST/PUT requests.
    """
    if request.method in ["POST", "PUT", "PATCH"]:
        content_type = request.headers.get("content-type", "")
        if not content_type.startswith("application/json"):
            return JSONResponse(
                status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE,
                content={"error": "Content-Type must be application/json"}
            )
    
    response = await call_next(request)
    return response


async def validate_body_size(request: Request, call_next):
    """
    Middleware to validate request body size (max 1MB).
    """
    content_length = request.headers.get("content-length")
    if content_length and int(content_length) > ValidationMiddleware.MAX_REQUEST_SIZE:
        return JSONResponse(
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            content={"error": "Request body too large (max 1MB)"}
        )
    
    response = await call_next(request)
    return response
