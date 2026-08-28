/**
 * UserViewsA — Product page component displaying product details without sizing information
 *
 * Features: product image gallery, price display, color selection, quantity selector, add to cart
 *
 * Ticket: SCRUM-1244 | Branch: proto/SCRUM-1242
 */

import React, { useState } from 'react'

interface Product {
  id: string
  name: string
  price: number
  description: string
  images: string[]
  colors: Array<{ name: string; hex: string }>
  material: string
  care: string[]
  inStock: boolean
}

const MOCK_PRODUCTS: Product[] = [
  {
    id: 'prod-001',
    name: 'Classic Cotton T-Shirt',
    price: 29.99,
    description: 'A timeless wardrobe essential crafted from premium 100% organic cotton. This versatile t-shirt features a comfortable relaxed fit and durable construction that maintains its shape wash after wash.',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800',
      'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800'
    ],
    colors: [
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Black', hex: '#000000' },
      { name: 'Navy', hex: '#1E3A8A' }
    ],
    material: '100% Organic Cotton',
    care: ['Machine wash cold', 'Tumble dry low', 'Do not bleach', 'Iron on low heat'],
    inStock: true
  },
  {
    id: 'prod-002',
    name: 'Denim Jacket',
    price: 89.99,
    description: 'A classic denim jacket with a modern twist. Features button closure, chest pockets, and a comfortable fit perfect for layering. Made from premium denim that gets better with age.',
    images: [
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800',
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800',
      'https://images.unsplash.com/photo-1601333144130-8cbb312386b6?w=800'
    ],
    colors: [
      { name: 'Light Wash', hex: '#A7C7E7' },
      { name: 'Dark Wash', hex: '#1C3A5B' },
      { name: 'Black', hex: '#1A1A1A' }
    ],
    material: '98% Cotton, 2% Elastane',
    care: ['Machine wash cold', 'Hang to dry', 'Do not bleach', 'Iron if needed'],
    inStock: true
  },
  {
    id: 'prod-003',
    name: 'Wool Blend Sweater',
    price: 69.99,
    description: 'Stay warm and stylish with this cozy wool blend sweater. Features a classic crew neck design and ribbed cuffs for a secure fit. Perfect for cooler weather.',
    images: [
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800',
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800',
      'https://images.unsplash.com/photo-1620799139834-6b8f844fbe61?w=800'
    ],
    colors: [
      { name: 'Charcoal', hex: '#36454F' },
      { name: 'Cream', hex: '#FFFDD0' },
      { name: 'Forest Green', hex: '#228B22' }
    ],
    material: '70% Wool, 30% Acrylic',
    care: ['Hand wash only', 'Lay flat to dry', 'Do not wring', 'Dry clean recommended'],
    inStock: true
  },
  {
    id: 'prod-004',
    name: 'Linen Button-Up Shirt',
    price: 54.99,
    description: 'Breathable and lightweight linen shirt perfect for warm weather. Features a relaxed fit, button-front closure, and a versatile style that works for both casual and semi-formal occasions.',
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800',
      'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=800'
    ],
    colors: [
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Sky Blue', hex: '#87CEEB' },
      { name: 'Sand', hex: '#C2B280' }
    ],
    material: '100% European Linen',
    care: ['Machine wash cold', 'Line dry', 'Iron while damp', 'Do not bleach'],
    inStock: true
  },
  {
    id: 'prod-005',
    name: 'Fleece Hoodie',
    price: 49.99,
    description: 'Ultimate comfort meets everyday style in this premium fleece hoodie. Features a drawstring hood, kangaroo pocket, and soft brushed interior for maximum coziness.',
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800',
      'https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?w=800',
      'https://images.unsplash.com/photo-1620799139507-2a76f79a2f4d?w=800'
    ],
    colors: [
      { name: 'Heather Grey', hex: '#BCC6CC' },
      { name: 'Black', hex: '#000000' },
      { name: 'Burgundy', hex: '#800020' }
    ],
    material: '80% Cotton, 20% Polyester',
    care: ['Machine wash cold', 'Tumble dry low', 'Do not iron', 'Do not dry clean'],
    inStock: false
  }
]

export default function UserViewsA() {
  const [selectedProduct] = useState<Product>(MOCK_PRODUCTS[0])
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [selectedColor, setSelectedColor] = useState(selectedProduct.colors[0].name)
  const [quantity, setQuantity] = useState(1)

  const handleQuantityChange = (delta: number) => {
    setQuantity(prev => Math.max(1, prev + delta))
  }

  return (
    <div data-testid="userviewsa" className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
            
            {/* Image Gallery Section */}
            <div data-testid="userviewsa-gallery" className="space-y-4">
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={selectedProduct.images[selectedImageIndex]}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                  data-testid="userviewsa-main-image"
                />
              </div>
              
              <div className="flex gap-2" data-testid="userviewsa-thumbnails">
                {selectedProduct.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`w-20 h-20 rounded-md overflow-hidden border-2 ${
                      selectedImageIndex === index ? 'border-blue-600' : 'border-gray-200'
                    }`}
                    data-testid={`userviewsa-thumbnail-${index}`}
                  >
                    <img
                      src={image}
                      alt={`${selectedProduct.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Details Section */}
            <div className="space-y-6">
              <div>
                <h1 data-testid="userviewsa-title" className="text-3xl font-bold text-gray-900">
                  {selectedProduct.name}
                </h1>
                <div className="mt-2 flex items-center gap-2">
                  <span data-testid="userviewsa-price" className="text-2xl font-semibold text-gray-900">
                    ${selectedProduct.price.toFixed(2)}
                  </span>
                  {selectedProduct.inStock ? (
                    <span data-testid="userviewsa-stock-status" className="text-sm text-green-600 font-medium">
                      In Stock
                    </span>
                  ) : (
                    <span data-testid="userviewsa-stock-status" className="text-sm text-red-600 font-medium">
                      Out of Stock
                    </span>
                  )}
                </div>
              </div>

              <p data-testid="userviewsa-description" className="text-gray-700 leading-relaxed">
                {selectedProduct.description}
              </p>

              {/* Color Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">
                  Color: <span className="font-semibold">{selectedColor}</span>
                </label>
                <div className="flex gap-3" data-testid="userviewsa-color-options">
                  {selectedProduct.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`w-10 h-10 rounded-full border-2 ${
                        selectedColor === color.name ? 'border-blue-600 ring-2 ring-blue-200' : 'border-gray-300'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                      data-testid={`userviewsa-color-${color.name.toLowerCase().replace(/\s+/g, '-')}`}
                    />
                  ))}
                </div>
              </div>

              {/* Quantity Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">
                  Quantity
                </label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="w-10 h-10 rounded-md border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                    data-testid="userviewsa-quantity-decrease"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    readOnly
                    className="w-16 h-10 text-center border border-gray-300 rounded-md"
                    data-testid="userviewsa-quantity-input"
                  />
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="w-10 h-10 rounded-md border border-gray-300 bg-white hover:bg-gray-50 font-semibold"
                    data-testid="userviewsa-quantity-increase"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                disabled={!selectedProduct.inStock}
                className="w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                data-testid="userviewsa-add-to-cart"
              >
                {selectedProduct.inStock ? 'Add to Cart' : 'Out of Stock'}
              </button>

              {/* Material and Care Information */}
              <div className="border-t pt-6 space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">Material</h3>
                  <p data-testid="userviewsa-material" className="text-sm text-gray-700">
                    {selectedProduct.material}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">Care Instructions</h3>
                  <ul data-testid="userviewsa-care-list" className="space-y-1">
                    {selectedProduct.care.map((instruction, index) => (
                      <li
                        key={index}
                        data-testid="userviewsa-care-item"
                        className="text-sm text-gray-700 flex items-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                        {instruction}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Note about sizing */}
        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p data-testid="userviewsa-sizing-note" className="text-sm text-yellow-800">
            <strong>Note:</strong> Sizing information is currently unavailable for this product. Please contact customer service for assistance.
          </p>
        </div>
      </div>
    </div>
  )
}
