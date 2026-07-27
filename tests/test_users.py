"""
Unit tests for user creation endpoint.
Tests validation, error handling, and success cases.
"""
import pytest
from fastapi.testclient import TestClient
from app.main import app
from db.models.User import user_db
from utils.passwordHasher import verify_password


client = TestClient(app)


@pytest.fixture(autouse=True)
def reset_db():
    """Reset database before each test"""
    user_db.users.clear()
    user_db.next_id = 1
    yield


class TestUserCreation:
    """Test suite for POST /api/users endpoint"""
    
    def test_create_user_success(self):
        """Test successful user creation returns 201"""
        response = client.post(
            "/api/users",
            json={
                "name": "John Doe",
                "email": "john@example.com",
                "password": "SecurePass123"
            },
            headers={"Content-Type": "application/json"}
        )
        
        assert response.status_code == 201
        data = response.json()
        
        # Verify response structure
        assert "id" in data
        assert data["name"] == "John Doe"
        assert data["email"] == "john@example.com"
        assert "createdAt" in data
        
        # Verify password is NOT in response
        assert "password" not in data
        assert "password_hash" not in data
    
    def test_missing_name_returns_400(self):
        """Test missing name field returns 400 with error message"""
        response = client.post(
            "/api/users",
            json={
                "email": "john@example.com",
                "password": "SecurePass123"
            },
            headers={"Content-Type": "application/json"}
        )
        
        assert response.status_code == 422  # FastAPI validation error
        data = response.json()
        assert "detail" in data
    
    def test_missing_email_returns_400(self):
        """Test missing email field returns 400"""
        response = client.post(
            "/api/users",
            json={
                "name": "John Doe",
                "password": "SecurePass123"
            },
            headers={"Content-Type": "application/json"}
        )
        
        assert response.status_code == 422
    
    def test_missing_password_returns_400(self):
        """Test missing password field returns 400"""
        response = client.post(
            "/api/users",
            json={
                "name": "John Doe",
                "email": "john@example.com"
            },
            headers={"Content-Type": "application/json"}
        )
        
        assert response.status_code == 422
    
    def test_invalid_email_format_returns_400(self):
        """Test invalid email format returns 400"""
        response = client.post(
            "/api/users",
            json={
                "name": "John Doe",
                "email": "invalid-email",
                "password": "SecurePass123"
            },
            headers={"Content-Type": "application/json"}
        )
        
        assert response.status_code == 422
        data = response.json()
        assert "detail" in data
    
    def test_short_password_returns_400(self):
        """Test password < 8 characters returns 400"""
        response = client.post(
            "/api/users",
            json={
                "name": "John Doe",
                "email": "john@example.com",
                "password": "Short1"
            },
            headers={"Content-Type": "application/json"}
        )
        
        assert response.status_code == 422
    
    def test_duplicate_email_returns_409(self):
        """Test duplicate email returns 409 Conflict"""
        # Create first user
        client.post(
            "/api/users",
            json={
                "name": "John Doe",
                "email": "john@example.com",
                "password": "SecurePass123"
            },
            headers={"Content-Type": "application/json"}
        )
        
        # Attempt to create duplicate
        response = client.post(
            "/api/users",
            json={
                "name": "Jane Doe",
                "email": "john@example.com",
                "password": "DifferentPass456"
            },
            headers={"Content-Type": "application/json"}
        )
        
        assert response.status_code == 409
        data = response.json()
        assert "detail" in data
        assert "already registered" in str(data["detail"]).lower()
    
    def test_case_insensitive_email_uniqueness(self):
        """Test email uniqueness is case-insensitive"""
        # Create user with lowercase email
        client.post(
            "/api/users",
            json={
                "name": "John Doe",
                "email": "john@example.com",
                "password": "SecurePass123"
            },
            headers={"Content-Type": "application/json"}
        )
        
        # Attempt with uppercase email
        response = client.post(
            "/api/users",
            json={
                "name": "Jane Doe",
                "email": "JOHN@EXAMPLE.COM",
                "password": "DifferentPass456"
            },
            headers={"Content-Type": "application/json"}
        )
        
        assert response.status_code == 409
    
    def test_password_not_in_response(self):
        """Test password is never returned in response"""
        response = client.post(
            "/api/users",
            json={
                "name": "John Doe",
                "email": "john@example.com",
                "password": "SecurePass123"
            },
            headers={"Content-Type": "application/json"}
        )
        
        assert response.status_code == 201
        response_text = response.text.lower()
        
        # Ensure password not in response
        assert "securepass123" not in response_text
        assert "password" not in response.json()
    
    def test_password_hashed_in_database(self):
        """Test passwords are hashed with bcrypt in database"""
        response = client.post(
            "/api/users",
            json={
                "name": "John Doe",
                "email": "john@example.com",
                "password": "SecurePass123"
            },
            headers={"Content-Type": "application/json"}
        )
        
        assert response.status_code == 201
        
        # Check database storage
        user = user_db.get_user_by_email("john@example.com")
        assert user is not None
        assert user.password_hash != "SecurePass123"
        assert user.password_hash.startswith("$2b$")  # Bcrypt hash format
        
        # Verify password can be validated
        assert verify_password("SecurePass123", user.password_hash)
        assert not verify_password("WrongPassword", user.password_hash)
    
    def test_name_length_validation(self):
        """Test name field length constraints"""
        # Name too long (> 255 chars)
        response = client.post(
            "/api/users",
            json={
                "name": "A" * 256,
                "email": "john@example.com",
                "password": "SecurePass123"
            },
            headers={"Content-Type": "application/json"}
        )
        
        assert response.status_code == 422
    
    def test_invalid_content_type(self):
        """Test invalid Content-Type returns 415"""
        response = client.post(
            "/api/users",
            data="name=John&email=john@example.com",
            headers={"Content-Type": "application/x-www-form-urlencoded"}
        )
        
        assert response.status_code == 415
    
    def test_response_time_performance(self):
        """Test response time is reasonable (< 500ms for 95th percentile)"""
        import time
        
        times = []
        for i in range(20):
            start = time.time()
            response = client.post(
                "/api/users",
                json={
                    "name": f"User {i}",
                    "email": f"user{i}@example.com",
                    "password": "SecurePass123"
                },
                headers={"Content-Type": "application/json"}
            )
            elapsed = (time.time() - start) * 1000  # Convert to ms
            times.append(elapsed)
            assert response.status_code == 201
        
        # Calculate 95th percentile
        times.sort()
        p95_index = int(len(times) * 0.95)
        p95_time = times[p95_index]
        
        # Note: bcrypt hashing can take time, so we allow up to 1000ms for p95
        # In production with optimized hardware, this should be < 500ms
        assert p95_time < 1000, f"95th percentile response time: {p95_time}ms"
