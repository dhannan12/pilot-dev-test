/**
 * UserChecksThe — Displays catalog of new arrival products with filtering
 *
 * Features: product grid, category filter, sort options, product cards, price display
 *
 * Ticket: SCRUM-1250 | Branch: proto/SCRUM-1242
 */

import React, { useState } from 'react'

interface Product {
  id: number
  name: string
  category: string
  price: number
  imageUrl: string
  arrivalDate: string
  inStock: boolean
}

const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Summer Floral Dress',
    category: 'Dresses',
    price: 79.99,
    imageUrl: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400',
    arrivalDate: '2026-08-25',
    inStock: true
  },
  {
    id: 2,
    name: 'Classic Denim Jacket',
    category: 'Outerwear',
    price: 129.99,
    imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400',
    arrivalDate: '2026-08-24',
    inStock: true
  },
  {
    id: 3,
    name: 'Striped Cotton T-Shirt',
    category: 'Tops',
    price: 34.99,
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
    arrivalDate: '2026-08-26',
    inStock: true
  },
  {
    id: 4,
    name: 'High-Waisted Jeans',
    category: 'Bottoms',
    price: 89.99,
    imageUrl: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400',
    arrivalDate: '2026-08-27',
    inStock: false
  },
  {
    id: 5,
    name: 'Leather Ankle Boots',
    category: 'Shoes',
    price: 159.99,
    imageUrl: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400',
    arrivalDate: '2026-08-23',
    inStock: true
  },
  {
    id: 6,
    name: 'Silk Scarf Collection',
    category: 'Accessories',
    price: 49.99,
    imageUrl: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400',
    arrivalDate: '2026-08-28',
    inStock: true
  },
  {
    id: 7,
    name: 'Wool Blend Cardigan',
    category: 'Tops',
    price: 94.99,
    imageUrl: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400',
    arrivalDate: '2026-08-22',
    inStock: true
  },
  {
    id: 8,
    name: 'Pleated Midi Skirt',
    category: 'Bottoms',
    price: 69.99,
    imageUrl: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=400',
    arrivalDate: '2026-08-26',
    inStock: true
  }
]

export default function UserChecksThe() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [sortBy, setSortBy] = useState<string>('newest')

  const categories = ['All', 'Dresses', 'Outerwear', 'Tops', 'Bottoms', 'Shoes', 'Accessories']

  const filteredProducts = mockProducts
    .filter(product => selectedCategory === 'All' || product.category === selectedCategory)
    .sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.arrivalDate).getTime() - new Date(a.arrivalDate).getTime()
      } else if (sortBy === 'price-low') {
        return a.price - b.price
      } else if (sortBy === 'price-high') {
        return b.price - a.price
      }
      return 0
    })

  return (
    <div data-testid="userchecksthe" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">New Arrivals</h1>
          <p className="text-gray-600">Discover the latest additions to our collection</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6 flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2">
            <label htmlFor="category-filter" className="text-sm font-medium text-gray-700">
              Category:
            </label>
            <select
              id="category-filter"
              data-testid="userchecksthe-category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="sort-filter" className="text-sm font-medium text-gray-700">
              Sort by:
            </label>
            <select
              id="sort-filter"
              data-testid="userchecksthe-sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="newest">Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          <button
            data-testid="userchecksthe-reset"
            onClick={() => {
              setSelectedCategory('All')
              setSortBy('newest')
            }}
            className="ml-auto text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            Reset Filters
          </button>
        </div>

        {/* Product Count */}
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
          </p>
        </div>

        {/* Product Grid */}
        <div data-testid="userchecksthe-list" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <div
              key={product.id}
              data-testid="userchecksthe-item"
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="aspect-square bg-gray-200 overflow-hidden">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 text-lg">{product.name}</h3>
                  {!product.inStock && (
                    <span className="text-xs text-red-600 font-medium">Out of Stock</span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-3">{product.category}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                  <span className="text-xs text-gray-500">
                    Added {new Date(product.arrivalDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                </div>
                <button
                  data-testid="userchecksthe-view"
                  className={`mt-4 w-full py-2 px-4 rounded-md font-medium text-sm transition-colors ${
                    product.inStock
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                  disabled={!product.inStock}
                >
                  {product.inStock ? 'View Details' : 'Out of Stock'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found matching your filters.</p>
            <button
              data-testid="userchecksthe-clear"
              onClick={() => {
                setSelectedCategory('All')
                setSortBy('newest')
              }}
              className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
