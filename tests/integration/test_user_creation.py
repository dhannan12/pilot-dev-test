"""
Integration tests for user creation endpoint.
Tests concurrent requests, race conditions, and end-to-end scenarios.
"""
import pytest
from fastapi.testclient import TestClient
from app.main import app
from db.models.User import user_db
from concurrent.futures import ThreadPoolExecutor
import threading


client = TestClient(app)


@pytest.fixture(autouse=True)
def reset_db():
    """Reset database before each test"""
    user_db.users.clear()
    user_db.next_id = 1
    yield


class TestUserCreationIntegration:
    """Integration tests for user creation"""
    
    def test_concurrent_duplicate_email_submissions(self):
        """Test that concurrent duplicate email submissions are handled correctly"""
        email = "concurrent@example.com"
        success_count = 0
        conflict_count = 0
        lock = threading.Lock()
        
        def create_user(index):
            nonlocal success_count, conflict_count
            response = client.post(
                "/api/users",
                json={
                    "name": f"User {index}",
                    "email": email,
                    "password": "SecurePass123"
                },
                headers={"Content-Type": "application/json"}
            )
            
            with lock:
                if response.status_code == 201:
                    success_count += 1
                elif response.status_code == 409:
                    conflict_count += 1
        
        # Submit 10 concurrent requests with same email
        with ThreadPoolExecutor(max_workers=10) as executor:
            futures = [executor.submit(create_user, i) for i in range(10)]
            for future in futures:
                future.result()
        
        # Exactly one should succeed, rest should get 409
        assert success_count == 1, f"Expected 1 success, got {success_count}"
        assert conflict_count == 9, f"Expected 9 conflicts, got {conflict_count}"
        
        # Verify only one user in database
        users_with_email = [u for u in user_db.users if u.email == email.lower()]
        assert len(users_with_email) == 1
    
    def test_end_to_end_user_creation_flow(self):
        """Test complete user creation flow"""
        # Step 1: Create user
        response = client.post(
            "/api/users",
            json={
                "name": "Alice Smith",
                "email": "alice@example.com",
                "password": "AliceSecure999"
            },
            headers={"Content-Type": "application/json"}
        )
        
        assert response.status_code == 201
        user_data = response.json()
        user_id = user_data["id"]
        
        # Step 2: Verify user in database
        db_user = user_db.get_user_by_id(user_id)
        assert db_user is not None
        assert db_user.name == "Alice Smith"
        assert db_user.email == "alice@example.com"
        assert db_user.password_hash != "AliceSecure999"
        
        # Step 3: Attempt duplicate creation
        response = client.post(
            "/api/users",
            json={
                "name": "Alice Clone",
                "email": "alice@example.com",
                "password": "DifferentPass123"
            },
            headers={"Content-Type": "application/json"}
        )
        
        assert response.status_code == 409
        
        # Step 4: Verify still only one user
        assert len(user_db.users) == 1
    
    def test_multiple_users_different_emails(self):
        """Test creating multiple users with different emails"""
        users = [
            {"name": "User 1", "email": "user1@example.com", "password": "Pass1234"},
            {"name": "User 2", "email": "user2@example.com", "password": "Pass5678"},
            {"name": "User 3", "email": "user3@example.com", "password": "Pass9012"},
        ]
        
        created_users = []
        for user in users:
            response = client.post(
                "/api/users",
                json=user,
                headers={"Content-Type": "application/json"}
            )
            assert response.status_code == 201
            created_users.append(response.json())
        
        # Verify all users created
        assert len(created_users) == 3
        assert len(user_db.users) == 3
        
        # Verify unique IDs
        ids = [u["id"] for u in created_users]
        assert len(set(ids)) == 3
    
    def test_case_variations_email_uniqueness(self):
        """Test email uniqueness with various case combinations"""
        base_email = "test@example.com"
        variations = [
            "test@example.com",
            "TEST@example.com",
            "Test@Example.Com",
            "TeSt@ExAmPlE.cOm",
        ]
        
        # First should succeed
        response = client.post(
            "/api/users",
            json={
                "name": "First User",
                "email": variations[0],
                "password": "SecurePass123"
            },
            headers={"Content-Type": "application/json"}
        )
        assert response.status_code == 201
        
        # All others should fail with 409
        for i, email in enumerate(variations[1:], 1):
            response = client.post(
                "/api/users",
                json={
                    "name": f"User {i}",
                    "email": email,
                    "password": "SecurePass123"
                },
                headers={"Content-Type": "application/json"}
            )
            assert response.status_code == 409, f"Expected 409 for {email}"
        
        # Verify only one user in database
        assert len(user_db.users) == 1
    
    def test_validation_errors_detailed_messages(self):
        """Test that validation errors return detailed field-specific messages"""
        response = client.post(
            "/api/users",
            json={
                "name": "",  # Empty name
                "email": "invalid-email",  # Invalid format
                "password": "short"  # Too short
            },
            headers={"Content-Type": "application/json"}
        )
        
        assert response.status_code == 422
        data = response.json()
        assert "detail" in data
        
        # Should have multiple validation errors
        errors = data["detail"]
        assert isinstance(errors, list)
        assert len(errors) >= 2  # At least email and password errors
    
    def test_security_password_not_logged(self):
        """Test that passwords are not exposed in any way"""
        import io
        import sys
        from contextlib import redirect_stdout
        
        # Capture stdout
        captured_output = io.StringIO()
        
        with redirect_stdout(captured_output):
            response = client.post(
                "/api/users",
                json={
                    "name": "Security Test",
                    "email": "security@example.com",
                    "password": "UniquePassword12345"
                },
                headers={"Content-Type": "application/json"}
            )
        
        assert response.status_code == 201
        
        # Check that password is not in response
        response_text = response.text
        assert "UniquePassword12345" not in response_text
        
        # Check that password is not in captured logs (if any)
        log_output = captured_output.getvalue()
        assert "UniquePassword12345" not in log_output
    
    def test_large_request_body_handling(self):
        """Test that excessively large request bodies are handled"""
        # Create a very long name (> 255 chars)
        long_name = "A" * 300
        
        response = client.post(
            "/api/users",
            json={
                "name": long_name,
                "email": "test@example.com",
                "password": "SecurePass123"
            },
            headers={"Content-Type": "application/json"}
        )
        
        # Should return validation error
        assert response.status_code == 422
    
    def test_special_characters_in_name(self):
        """Test that names with special characters are handled correctly"""
        special_names = [
            "John O'Brien",
            "María García",
            "Jean-Pierre Dupont",
            "李明",
            "Müller",
        ]
        
        for i, name in enumerate(special_names):
            response = client.post(
                "/api/users",
                json={
                    "name": name,
                    "email": f"user{i}@example.com",
                    "password": "SecurePass123"
                },
                headers={"Content-Type": "application/json"}
            )
            
            assert response.status_code == 201
            data = response.json()
            assert data["name"] == name
