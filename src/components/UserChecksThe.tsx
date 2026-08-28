/**
 * UserChecksThe — Shows product prices with discounts and calculates totals
 *
 * Features: product list, discount display, price calculation, selection, total summary
 *
 * Ticket: SCRUM-1247 | Branch: proto/SCRUM-1242
 */

import React, { useState } from 'react'

interface Product {
  id: number
  name: string
  originalPrice: number
  discountPercent: number
  category: string
  imageUrl: string
}

const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Classic Denim Jacket',
    originalPrice: 89.99,
    discountPercent: 20,
    category: 'Jackets',
    imageUrl: 'https://via.placeholder.com/150/4A90E2/ffffff?text=Denim+Jacket'
  },
  {
    id: 2,
    name: 'Cotton T-Shirt',
    originalPrice: 24.99,
    discountPercent: 15,
    category: 'Shirts',
    imageUrl: 'https://via.placeholder.com/150/7ED321/ffffff?text=T-Shirt'
  },
  {
    id: 3,
    name: 'Leather Boots',
    originalPrice: 149.99,
    discountPercent: 30,
    category: 'Footwear',
    imageUrl: 'https://via.placeholder.com/150/BD10E0/ffffff?text=Boots'
  },
  {
    id: 4,
    name: 'Wool Sweater',
    originalPrice: 64.99,
    discountPercent: 25,
    category: 'Sweaters',
    imageUrl: 'https://via.placeholder.com/150/F5A623/ffffff?text=Sweater'
  },
  {
    id: 5,
    name: 'Slim Fit Jeans',
    originalPrice: 79.99,
    discountPercent: 10,
    category: 'Pants',
    imageUrl: 'https://via.placeholder.com/150/50E3C2/ffffff?text=Jeans'
  },
  {
    id: 6,
    name: 'Summer Dress',
    originalPrice: 54.99,
    discountPercent: 35,
    category: 'Dresses',
    imageUrl: 'https://via.placeholder.com/150/E94B3C/ffffff?text=Dress'
  },
  {
    id: 7,
    name: 'Casual Sneakers',
    originalPrice: 69.99,
    discountPercent: 20,
    category: 'Footwear',
    imageUrl: 'https://via.placeholder.com/150/417505/ffffff?text=Sneakers'
  }
]

export default function UserChecksThe() {
  const [selectedProducts, setSelectedProducts] = useState<Set<number>>(new Set())

  const calculateDiscountedPrice = (originalPrice: number, discountPercent: number): number => {
    return originalPrice * (1 - discountPercent / 100)
  }

  const toggleProductSelection = (productId: number) => {
    const newSelection = new Set(selectedProducts)
    if (newSelection.has(productId)) {
      newSelection.delete(productId)
    } else {
      newSelection.add(productId)
    }
    setSelectedProducts(newSelection)
  }

  const calculateTotal = () => {
    let originalTotal = 0
    let discountedTotal = 0

    mockProducts.forEach(product => {
      if (selectedProducts.has(product.id)) {
        originalTotal += product.originalPrice
        discountedTotal += calculateDiscountedPrice(product.originalPrice, product.discountPercent)
      }
    })

    return { originalTotal, discountedTotal, savings: originalTotal - discountedTotal }
  }

  const totals = calculateTotal()

  return (
    <div data-testid="userchecksthe" className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Check Product Prices</h1>
        <p className="text-gray-600 mb-8">Select products to see total price with discounts applied</p>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Product List */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Available Products</h2>
            <div data-testid="userchecksthe-list" className="space-y-4">
              {mockProducts.map(product => {
                const discountedPrice = calculateDiscountedPrice(product.originalPrice, product.discountPercent)
                const isSelected = selectedProducts.has(product.id)

                return (
                  <div
                    key={product.id}
                    data-testid="userchecksthe-item"
                    onClick={() => toggleProductSelection(product.id)}
                    className={`bg-white rounded-lg shadow-md p-4 cursor-pointer transition-all hover:shadow-lg ${
                      isSelected ? 'ring-2 ring-blue-500' : ''
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-20 h-20 rounded-md object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-900">{product.name}</h3>
                            <p className="text-sm text-gray-500">{product.category}</p>
                          </div>
                          <input
                            type="checkbox"
                            data-testid={`userchecksthe-checkbox-${product.id}`}
                            checked={isSelected}
                            onChange={() => toggleProductSelection(product.id)}
                            className="w-5 h-5 text-blue-600 rounded"
                            onClick={(e) => e.stopPropagation()}
                          />
                        </div>
                        <div className="mt-2">
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-green-600">
                              ${discountedPrice.toFixed(2)}
                            </span>
                            <span className="text-sm text-gray-400 line-through">
                              ${product.originalPrice.toFixed(2)}
                            </span>
                            <span className="text-xs font-semibold text-white bg-red-500 px-2 py-1 rounded">
                              {product.discountPercent}% OFF
                            </span>
                          </div>
                          <p className="text-xs text-green-600 mt-1">
                            Save ${(product.originalPrice - discountedPrice).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Total Summary */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Price Summary</h2>
            <div data-testid="userchecksthe-summary" className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              {selectedProducts.size === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-400">No products selected</p>
                  <p className="text-sm text-gray-500 mt-2">Click on products to add them to your cart</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600">Selected Items</p>
                    <p className="text-2xl font-bold text-gray-900">{selectedProducts.size} products</p>
                  </div>

                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Original Price:</span>
                      <span className="text-gray-400 line-through">
                        ${totals.originalTotal.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Discount Savings:</span>
                      <span className="text-green-600 font-semibold">
                        -${totals.savings.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-gray-900">Total Price:</span>
                      <span className="text-2xl font-bold text-green-600">
                        ${totals.discountedTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <button
                    data-testid="userchecksthe-checkout"
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors mt-4"
                  >
                    Proceed to Checkout
                  </button>

                  <button
                    data-testid="userchecksthe-clear"
                    onClick={() => setSelectedProducts(new Set())}
                    className="w-full bg-gray-200 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                  >
                    Clear Selection
                  </button>
                </div>
              )}
            </div>

            {/* Additional Info */}
            <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">💰 Discount Information</h3>
              <p className="text-sm text-blue-800">
                All prices shown include applicable discounts. Save more by buying multiple items!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
