"""
User model for database operations.
Uses in-memory storage for demo purposes (production should use PostgreSQL/MySQL).
"""
from datetime import datetime
from typing import Optional, Dict, List
from pydantic import BaseModel, EmailStr, Field


class UserCreate(BaseModel):
    """Schema for creating a new user"""
    name: str = Field(..., min_length=1, max_length=255)
    email: EmailStr
    password: str = Field(..., min_length=8)


class UserResponse(BaseModel):
    """Schema for user response (excludes password)"""
    id: int
    name: str
    email: str
    createdAt: datetime

    class Config:
        json_schema_extra = {
            "example": {
                "id": 1,
                "name": "John Doe",
                "email": "john@example.com",
                "createdAt": "2026-07-27T12:00:00"
            }
        }


class UserInDB(BaseModel):
    """Internal user model with password hash"""
    id: int
    name: str
    email: str
    password_hash: str
    created_at: datetime


class InMemoryUserDB:
    """
    In-memory user database for demonstration.
    In production, replace with actual database (PostgreSQL, MySQL, etc.)
    """
    def __init__(self):
        self.users: List[UserInDB] = []
        self.next_id = 1

    def create_user(self, name: str, email: str, password_hash: str) -> UserInDB:
        """Create a new user and store in database"""
        # Check for duplicate email (case-insensitive)
        if self.get_user_by_email(email):
            raise ValueError("Email already registered")
        
        user = UserInDB(
            id=self.next_id,
            name=name,
            email=email.lower(),  # Store email in lowercase
            password_hash=password_hash,
            created_at=datetime.utcnow()
        )
        self.users.append(user)
        self.next_id += 1
        return user

    def get_user_by_email(self, email: str) -> Optional[UserInDB]:
        """Get user by email (case-insensitive)"""
        email_lower = email.lower()
        for user in self.users:
            if user.email.lower() == email_lower:
                return user
        return None

    def get_user_by_id(self, user_id: int) -> Optional[UserInDB]:
        """Get user by ID"""
        for user in self.users:
            if user.id == user_id:
                return user
        return None


# Global database instance
user_db = InMemoryUserDB()
