"""
Product Controller

This module implements the REST API endpoints for product operations.
"""

from fastapi import APIRouter, Query
from typing import List, Optional
from app.dto.product_response import ProductResponse
from app.services.product_service import ProductService


router = APIRouter(
    prefix="/api",
    tags=["products"]
)


@router.get(
    "/products",
    response_model=List[ProductResponse],
    status_code=200,
    summary="Get all products or filter by category",
    response_description="List of products"
)
def get_products(
    category: Optional[str] = Query(
        None,
        description="Filter products by category (case-sensitive)"
    )
) -> List[ProductResponse]:
    """
    GET /api/products endpoint - Returns a list of products.
    
    This endpoint returns all products or filters by category if the category
    query parameter is provided.
    
    Args:
        category: Optional category filter (case-sensitive)
        
    Returns:
        List[ProductResponse]: JSON array of product objects with:
            - id: Unique product identifier
            - name: Product name
            - price: Product price
            - category: Product category
            
    Response Codes:
        - 200: Success - Returns JSON array (may be empty for invalid categories)
        
    Examples:
        - GET /api/products - Returns all products
        - GET /api/products?category=electronics - Returns only electronics
        - GET /api/products?category=invalid - Returns empty array
    """
    if category is not None:
        # Filter by category (case-sensitive)
        return ProductService.get_products_by_category(category)
    else:
        # Return all products
        return ProductService.get_all_products()
