"""
Product Service

This module provides product data management and filtering capabilities.
"""

from typing import List, Optional
from app.dto.product_response import ProductResponse


class ProductService:
    """
    Service class for managing product data.
    
    Contains mock product data and provides filtering capabilities.
    """
    
    # Mock product data with 3+ products across multiple categories
    _mock_products = [
        ProductResponse(
            id=1,
            name="Wireless Bluetooth Headphones",
            price=79.99,
            category="electronics"
        ),
        ProductResponse(
            id=2,
            name="Gaming Laptop Pro",
            price=1299.99,
            category="electronics"
        ),
        ProductResponse(
            id=3,
            name="Cotton T-Shirt",
            price=24.99,
            category="clothing"
        ),
        ProductResponse(
            id=4,
            name="Denim Jeans",
            price=59.99,
            category="clothing"
        ),
        ProductResponse(
            id=5,
            name="LED Desk Lamp",
            price=39.99,
            category="home"
        ),
        ProductResponse(
            id=6,
            name="Smartphone 5G",
            price=899.99,
            category="electronics"
        )
    ]
    
    @classmethod
    def get_all_products(cls) -> List[ProductResponse]:
        """
        Get all products.
        
        Returns:
            List[ProductResponse]: List of all products
        """
        return cls._mock_products
    
    @classmethod
    def get_products_by_category(cls, category: str) -> List[ProductResponse]:
        """
        Get products filtered by category.
        
        Category matching is case-sensitive.
        
        Args:
            category: The category to filter by
            
        Returns:
            List[ProductResponse]: List of products in the specified category
        """
        return [
            product for product in cls._mock_products 
            if product.category == category
        ]
