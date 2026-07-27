"""
Product Controller Integration Tests

Comprehensive tests for the GET /api/products endpoint.
"""

import pytest
from fastapi.testclient import TestClient
from app.main import app
import time


client = TestClient(app)


class TestProductControllerIntegration:
    """Integration tests for product API endpoint."""
    
    def test_get_products_returns_200(self):
        """Test that GET /api/products returns HTTP 200 status code."""
        response = client.get("/api/products")
        assert response.status_code == 200
    
    def test_get_products_returns_json_array(self):
        """Test that response body is a valid JSON array."""
        response = client.get("/api/products")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
    
    def test_get_products_content_type(self):
        """Test that response Content-Type is application/json."""
        response = client.get("/api/products")
        assert "application/json" in response.headers["content-type"]
    
    def test_get_products_returns_all_products(self):
        """Test that GET /api/products returns all products."""
        response = client.get("/api/products")
        data = response.json()
        assert len(data) >= 3, "Should return at least 3 products"
    
    def test_product_schema_consistency(self):
        """Test that all products have consistent schema with all 4 required fields."""
        response = client.get("/api/products")
        data = response.json()
        
        required_fields = {"id", "name", "price", "category"}
        
        for product in data:
            assert isinstance(product, dict), "Product should be a dictionary"
            product_fields = set(product.keys())
            assert required_fields.issubset(product_fields), \
                f"Product missing required fields. Expected {required_fields}, got {product_fields}"
            
            # Validate field types
            assert isinstance(product["id"], (int, str)), "id should be int or string"
            assert isinstance(product["name"], str), "name should be string"
            assert isinstance(product["price"], (int, float)), "price should be number"
            assert isinstance(product["category"], str), "category should be string"
    
    def test_category_filter_electronics(self):
        """Test that GET /api/products?category=electronics filters correctly."""
        response = client.get("/api/products?category=electronics")
        assert response.status_code == 200
        data = response.json()
        
        # Verify all returned products are electronics
        for product in data:
            assert product["category"] == "electronics", \
                f"Expected electronics, got {product['category']}"
        
        # Verify we get multiple electronics products
        assert len(data) >= 1, "Should return at least one electronics product"
    
    def test_category_filter_case_sensitive(self):
        """Test that category matching is case-sensitive."""
        # Test lowercase
        response_lower = client.get("/api/products?category=electronics")
        data_lower = response_lower.json()
        
        # Test uppercase (should return empty if case-sensitive)
        response_upper = client.get("/api/products?category=ELECTRONICS")
        data_upper = response_upper.json()
        
        # They should be different if case-sensitive
        assert len(data_lower) > 0, "Should find electronics (lowercase)"
        assert len(data_upper) == 0, "Should not find ELECTRONICS (uppercase) - case sensitive"
    
    def test_invalid_category_returns_empty_array(self):
        """Test that invalid/non-existent categories return empty array with 200 status."""
        response = client.get("/api/products?category=nonexistent")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        assert len(data) == 0, "Should return empty array for invalid category"
    
    def test_multiple_products_same_category(self):
        """Test that multiple products in same category are all returned."""
        response = client.get("/api/products?category=electronics")
        data = response.json()
        
        # Based on mock data, we should have multiple electronics products
        assert len(data) >= 2, "Should return multiple electronics products"
        
        # Verify all are electronics
        for product in data:
            assert product["category"] == "electronics"
    
    def test_omitting_category_returns_all(self):
        """Test that omitting category parameter returns all products."""
        response_all = client.get("/api/products")
        response_no_param = client.get("/api/products?")
        
        assert response_all.status_code == 200
        assert response_no_param.status_code == 200
        
        data_all = response_all.json()
        data_no_param = response_no_param.json()
        
        assert len(data_all) >= 3
        assert len(data_all) == len(data_no_param)
    
    def test_response_always_json_array(self):
        """Test that response is always a JSON array, even if empty."""
        # Test with valid category
        response_valid = client.get("/api/products?category=electronics")
        assert isinstance(response_valid.json(), list)
        
        # Test with invalid category
        response_invalid = client.get("/api/products?category=invalid")
        assert isinstance(response_invalid.json(), list)
        
        # Test without category
        response_all = client.get("/api/products")
        assert isinstance(response_all.json(), list)
    
    def test_no_server_errors_for_valid_requests(self):
        """Test that no server errors (5xx) occur for valid requests."""
        test_cases = [
            "/api/products",
            "/api/products?category=electronics",
            "/api/products?category=clothing",
            "/api/products?category=invalid",
            "/api/products?category=",
        ]
        
        for endpoint in test_cases:
            response = client.get(endpoint)
            assert response.status_code < 500, \
                f"Server error {response.status_code} for {endpoint}"
            assert response.status_code == 200, \
                f"Expected 200, got {response.status_code} for {endpoint}"
    
    def test_invalid_query_parameters_handled_gracefully(self):
        """Test that invalid query parameters are handled gracefully."""
        # Extra parameters should be ignored
        response = client.get("/api/products?category=electronics&extra=ignored")
        assert response.status_code == 200
        data = response.json()
        
        # Should still filter by category correctly
        for product in data:
            assert product["category"] == "electronics"
    
    def test_response_time_performance(self):
        """Test that response time is under 100ms (target performance)."""
        start = time.time()
        response = client.get("/api/products")
        end = time.time()
        
        response_time_ms = (end - start) * 1000
        
        assert response.status_code == 200
        assert response_time_ms < 100, \
            f"Response time {response_time_ms:.2f}ms exceeds 100ms target"
    
    def test_varied_categories(self):
        """Test that mock data includes products across multiple categories."""
        response = client.get("/api/products")
        data = response.json()
        
        categories = {product["category"] for product in data}
        assert len(categories) >= 2, \
            "Should have products in at least 2 different categories"
    
    def test_realistic_attributes(self):
        """Test that mock data includes realistic attributes."""
        response = client.get("/api/products")
        data = response.json()
        
        for product in data:
            # Name should not be empty
            assert len(product["name"]) > 0, "Product name should not be empty"
            
            # Price should be positive
            assert product["price"] > 0, "Product price should be positive"
            
            # Category should not be empty
            assert len(product["category"]) > 0, "Category should not be empty"
