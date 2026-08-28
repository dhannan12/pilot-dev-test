/**
 * UserViewsA — Sales page displaying eligible products with discounts
 *
 * Features: product grid, sale badges, price display, add-to-cart actions, category filter
 *
 * Ticket: SCRUM-1245 | Branch: proto/SCRUM-1242
 */

import React, { useState } from 'react'

interface Product {
  id: number
  name: string
  category: string
  originalPrice: number
  salePrice: number
  discount: number
  image: string
  eligible: boolean
  description: string
}

const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Premium Cotton T-Shirt',
    category: 'Clothing',
    originalPrice: 49.99,
    salePrice: 34.99,
    discount: 30,
    image: 'https://via.placeholder.com/300x300?text=T-Shirt',
    eligible: true,
    description: 'Comfortable premium cotton t-shirt in multiple colors',
  },
  {
    id: 2,
    name: 'Denim Jeans Classic Fit',
    category: 'Clothing',
    originalPrice: 89.99,
    salePrice: 62.99,
    discount: 30,
    image: 'https://via.placeholder.com/300x300?text=Jeans',
    eligible: true,
    description: 'Classic fit denim jeans with stretch comfort',
  },
  {
    id: 3,
    name: 'Leather Sneakers',
    category: 'Shoes',
    originalPrice: 129.99,
    salePrice: 90.99,
    discount: 30,
    image: 'https://via.placeholder.com/300x300?text=Sneakers',
    eligible: true,
    description: 'Premium leather sneakers for everyday wear',
  },
  {
    id: 4,
    name: 'Winter Jacket',
    category: 'Outerwear',
    originalPrice: 199.99,
    salePrice: 139.99,
    discount: 30,
    image: 'https://via.placeholder.com/300x300?text=Jacket',
    eligible: true,
    description: 'Warm winter jacket with waterproof exterior',
  },
  {
    id: 5,
    name: 'Canvas Backpack',
    category: 'Accessories',
    originalPrice: 69.99,
    salePrice: 48.99,
    discount: 30,
    image: 'https://via.placeholder.com/300x300?text=Backpack',
    eligible: true,
    description: 'Durable canvas backpack with laptop compartment',
  },
  {
    id: 6,
    name: 'Wool Scarf',
    category: 'Accessories',
    originalPrice: 39.99,
    salePrice: 27.99,
    discount: 30,
    image: 'https://via.placeholder.com/300x300?text=Scarf',
    eligible: true,
    description: 'Soft wool scarf available in multiple patterns',
  },
  {
    id: 7,
    name: 'Running Shoes',
    category: 'Shoes',
    originalPrice: 149.99,
    salePrice: 104.99,
    discount: 30,
    image: 'https://via.placeholder.com/300x300?text=Running+Shoes',
    eligible: true,
    description: 'Lightweight running shoes with cushioned sole',
  },
]

export default function UserViewsA() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')

  const categories = ['All', ...Array.from(new Set(MOCK_PRODUCTS.map(p => p.category)))]
  
  const filteredProducts = selectedCategory === 'All' 
    ? MOCK_PRODUCTS.filter(p => p.eligible)
    : MOCK_PRODUCTS.filter(p => p.eligible && p.category === selectedCategory)

  return (
    <div data-testid="userviewsa" className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Summer Sale</h1>
          <p className="text-xl">Up to 30% off on selected items</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Category Filter */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Filter by Category</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                data-testid={`userviewsa-filter-${category.toLowerCase()}`}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-red-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Product Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing <span className="font-semibold text-gray-900">{filteredProducts.length}</span> eligible products
          </p>
        </div>

        {/* Products Grid */}
        <div data-testid="userviewsa-list" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <div
              key={product.id}
              data-testid="userviewsa-item"
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
            >
              {/* Product Image */}
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover"
                />
                {product.discount > 0 && (
                  <div className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                    -{product.discount}%
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="p-4">
                <div className="mb-2">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    {product.category}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {product.description}
                </p>

                {/* Pricing */}
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-2xl font-bold text-red-600">
                    ${product.salePrice.toFixed(2)}
                  </span>
                  <span className="text-sm text-gray-500 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                </div>

                {/* Add to Cart Button */}
                <button
                  data-testid="userviewsa-add-to-cart"
                  className="w-full bg-red-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-red-700 transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No eligible products found in this category</p>
          </div>
        )}
      </div>
    </div>
  )
}
