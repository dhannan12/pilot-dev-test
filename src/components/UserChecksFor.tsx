/**
 * UserChecksFor — Displays current promotions and special offers for the restaurant
 *
 * Features: promotion cards, discount display, expiry dates, filter by category, apply button
 *
 * Ticket: SCRUM-1060 | Branch: proto/SCRUM-1056
 */

import { useState } from 'react'

interface Promotion {
  id: string
  title: string
  description: string
  discount: string
  category: string
  expiryDate: string
  code: string
  minOrder?: number
  active: boolean
}

const MOCK_PROMOTIONS: Promotion[] = [
  {
    id: '1',
    title: 'New Customer Special',
    description: 'Get 20% off your first order when you sign up',
    discount: '20% OFF',
    category: 'new-customer',
    expiryDate: '2026-12-31',
    code: 'WELCOME20',
    minOrder: 15,
    active: true
  },
  {
    id: '2',
    title: 'Free Spring Rolls',
    description: 'Free vegetable spring rolls with any order over $30',
    discount: 'FREE ITEM',
    category: 'food',
    expiryDate: '2026-09-30',
    code: 'SPRING30',
    minOrder: 30,
    active: true
  },
  {
    id: '3',
    title: 'Weekend Deal',
    description: '15% off all orders placed on Saturday and Sunday',
    discount: '15% OFF',
    category: 'weekend',
    expiryDate: '2026-10-31',
    code: 'WEEKEND15',
    minOrder: 20,
    active: true
  },
  {
    id: '4',
    title: 'Lunch Special',
    description: '$5 off any lunch combo between 11am - 3pm',
    discount: '$5 OFF',
    category: 'lunch',
    expiryDate: '2026-11-15',
    code: 'LUNCH5',
    minOrder: 12,
    active: true
  },
  {
    id: '5',
    title: 'Family Feast',
    description: '25% off orders over $50 - perfect for family dinners',
    discount: '25% OFF',
    category: 'family',
    expiryDate: '2026-12-15',
    code: 'FAMILY25',
    minOrder: 50,
    active: true
  },
  {
    id: '6',
    title: 'Student Discount',
    description: '10% off with valid student ID (mention at pickup)',
    discount: '10% OFF',
    category: 'student',
    expiryDate: '2027-06-30',
    code: 'STUDENT10',
    active: true
  },
  {
    id: '7',
    title: 'Free Delivery',
    description: 'No delivery fee on orders over $25',
    discount: 'FREE DELIVERY',
    category: 'delivery',
    expiryDate: '2026-10-20',
    code: 'FREEDEL25',
    minOrder: 25,
    active: true
  }
]

const CATEGORIES = [
  { value: 'all', label: 'All Promotions' },
  { value: 'new-customer', label: 'New Customer' },
  { value: 'food', label: 'Food Deals' },
  { value: 'weekend', label: 'Weekend' },
  { value: 'lunch', label: 'Lunch' },
  { value: 'family', label: 'Family' },
  { value: 'student', label: 'Student' },
  { value: 'delivery', label: 'Delivery' }
]

export default function UserChecksFor() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const filteredPromotions = selectedCategory === 'all'
    ? MOCK_PROMOTIONS
    : MOCK_PROMOTIONS.filter(p => p.category === selectedCategory)

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  return (
    <section data-testid="userchecksfor" className="min-h-screen bg-gradient-to-br from-red-50 via-white to-yellow-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Current Promotions</h1>
          <p className="text-lg text-gray-600">Save more on your favorite dishes</p>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <label htmlFor="category-filter" className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Category
          </label>
          <select
            id="category-filter"
            data-testid="userchecksfor-category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          >
            {CATEGORIES.map(cat => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        {/* Promotions Grid */}
        <div data-testid="userchecksfor-list" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPromotions.map(promo => (
            <div
              key={promo.id}
              data-testid="userchecksfor-item"
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300"
            >
              {/* Discount Badge */}
              <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-3 px-4 text-center">
                <div className="text-2xl font-bold">{promo.discount}</div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{promo.title}</h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">{promo.description}</p>

                {/* Details */}
                <div className="space-y-2 mb-4">
                  {promo.minOrder && (
                    <div className="flex items-center text-sm text-gray-500">
                      <span className="font-medium mr-1">Min order:</span>
                      <span>${promo.minOrder}</span>
                    </div>
                  )}
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="font-medium mr-1">Expires:</span>
                    <span>{formatDate(promo.expiryDate)}</span>
                  </div>
                </div>

                {/* Promo Code */}
                <div className="bg-gray-50 rounded-lg p-3 mb-4 border border-dashed border-gray-300">
                  <div className="text-xs text-gray-500 mb-1">Promo Code</div>
                  <div className="flex items-center justify-between">
                    <code className="text-lg font-mono font-bold text-red-600">{promo.code}</code>
                    <button
                      data-testid="userchecksfor-copy"
                      onClick={() => handleCopyCode(promo.code)}
                      className="text-sm px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded transition-colors"
                    >
                      {copiedCode === promo.code ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                </div>

                {/* Apply Button */}
                <button
                  data-testid="userchecksfor-apply"
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
                >
                  Apply This Offer
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredPromotions.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No promotions found in this category</p>
          </div>
        )}

        {/* Active Count */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Showing <span className="font-semibold">{filteredPromotions.length}</span> active promotion{filteredPromotions.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>
    </section>
  )
}
