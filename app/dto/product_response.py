"""
Product Data Transfer Object (DTO)

This module defines the ProductResponse model used for API responses.
"""

from pydantic import BaseModel, Field
from typing import Union


class ProductResponse(BaseModel):
    """
    Product DTO with id, name, price, and category fields.
    
    Attributes:
        id: Unique product identifier (string or number)
        name: Product name
        price: Product price
        category: Product category
    """
    
    id: Union[str, int] = Field(..., description="Unique product identifier")
    name: str = Field(..., description="Product name")
    price: float = Field(..., ge=0, description="Product price (must be non-negative)")
    category: str = Field(..., description="Product category")
    
    class Config:
        json_schema_extra = {
            "example": {
                "id": 1,
                "name": "Laptop",
                "price": 999.99,
                "category": "electronics"
            }
        }
