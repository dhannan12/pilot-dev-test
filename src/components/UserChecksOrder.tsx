/**
 * UserChecksOrder — Order summary and total verification component for restaurant takeaway
 *
 * Features: itemized order display, subtotal calculation, tax breakdown, delivery fee, total amount, discount display
 *
 * Ticket: SCRUM-1065 | Branch: proto/SCRUM-1056
 */

import { useState } from 'react'

interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
  specialInstructions?: string
}

interface OrderSummary {
  items: OrderItem[]
  subtotal: number
  tax: number
  deliveryFee: number
  discount: number
  total: number
  promoCode?: string
}

const MOCK_ORDER_ITEMS: OrderItem[] = [
  {
    id: '1',
    name: 'Kung Pao Chicken',
    price: 13.99,
    quantity: 2,
    specialInstructions: 'Extra spicy'
  },
  {
    id: '2',
    name: 'Vegetable Spring Rolls (6pc)',
    price: 6.99,
    quantity: 1
  },
  {
    id: '3',
    name: 'Beef Chow Mein',
    price: 11.99,
    quantity: 1
  },
  {
    id: '4',
    name: 'Hot and Sour Soup',
    price: 4.99,
    quantity: 2
  },
  {
    id: '5',
    name: 'Egg Fried Rice',
    price: 8.99,
    quantity: 1
  }
]

const calculateOrderSummary = (items: OrderItem[], promoCode?: string): OrderSummary => {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const tax = subtotal * 0.13 // 13% tax
  const deliveryFee = subtotal >= 30 ? 0 : 3.99
  const discount = promoCode === 'SAVE10' ? subtotal * 0.1 : 0
  const total = subtotal + tax + deliveryFee - discount

  return {
    items,
    subtotal,
    tax,
    deliveryFee,
    discount,
    total,
    promoCode: promoCode || undefined
  }
}

export default function UserChecksOrder() {
  const [promoCode, setPromoCode] = useState<string>('')
  const [appliedPromo, setAppliedPromo] = useState<string>('')
  const [promoError, setPromoError] = useState<string>('')

  const orderSummary = calculateOrderSummary(MOCK_ORDER_ITEMS, appliedPromo)

  const handleApplyPromo = () => {
    if (promoCode.trim() === '') {
      setPromoError('Please enter a promo code')
      return
    }
    
    if (promoCode.toUpperCase() === 'SAVE10' || promoCode.toUpperCase() === 'WELCOME20') {
      setAppliedPromo(promoCode.toUpperCase())
      setPromoError('')
    } else {
      setPromoError('Invalid promo code')
      setAppliedPromo('')
    }
  }

  const handleRemovePromo = () => {
    setAppliedPromo('')
    setPromoCode('')
    setPromoError('')
  }

  return (
    <div data-testid="userchecksorder" className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Summary</h1>
          <p className="text-gray-600">Review your order details and total</p>
        </div>

        {/* Order Items */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Items in Your Order</h2>
          <ul data-testid="userchecksorder-list" className="divide-y divide-gray-200">
            {orderSummary.items.map((item) => (
              <li
                key={item.id}
                data-testid="userchecksorder-item"
                className="py-4 flex justify-between items-start"
              >
                <div className="flex-1">
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                    <span className="text-lg font-medium text-gray-900 ml-4">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                  <div className="mt-1 flex items-center text-sm text-gray-600">
                    <span>Quantity: {item.quantity}</span>
                    <span className="mx-2">•</span>
                    <span>${item.price.toFixed(2)} each</span>
                  </div>
                  {item.specialInstructions && (
                    <p className="mt-1 text-sm text-blue-600 italic">
                      Note: {item.specialInstructions}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Promo Code Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Promo Code</h2>
          {!appliedPromo ? (
            <div className="flex gap-2">
              <input
                type="text"
                data-testid="userchecksorder-promocode"
                value={promoCode}
                onChange={(e) => {
                  setPromoCode(e.target.value)
                  setPromoError('')
                }}
                placeholder="Enter promo code"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
              <button
                data-testid="userchecksorder-apply"
                onClick={handleApplyPromo}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                Apply
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-medium text-green-800">Promo code "{appliedPromo}" applied</span>
              </div>
              <button
                data-testid="userchecksorder-removepromo"
                onClick={handleRemovePromo}
                className="text-red-600 hover:text-red-800 font-medium text-sm"
              >
                Remove
              </button>
            </div>
          )}
          {promoError && (
            <p className="mt-2 text-sm text-red-600">{promoError}</p>
          )}
          <p className="mt-2 text-xs text-gray-500">Try: SAVE10 or WELCOME20</p>
        </div>

        {/* Order Total Breakdown */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Total</h2>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center text-gray-700">
              <span>Subtotal</span>
              <span className="font-medium">${orderSummary.subtotal.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between items-center text-gray-700">
              <span>Tax (13%)</span>
              <span className="font-medium">${orderSummary.tax.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between items-center text-gray-700">
              <span>Delivery Fee</span>
              <span className="font-medium">
                {orderSummary.deliveryFee === 0 ? (
                  <span className="text-green-600">FREE</span>
                ) : (
                  `$${orderSummary.deliveryFee.toFixed(2)}`
                )}
              </span>
            </div>

            {orderSummary.deliveryFee === 0 && (
              <p className="text-xs text-green-600">Free delivery on orders over $30</p>
            )}
            
            {orderSummary.discount > 0 && (
              <div className="flex justify-between items-center text-green-600">
                <span>Discount ({appliedPromo})</span>
                <span className="font-medium">-${orderSummary.discount.toFixed(2)}</span>
              </div>
            )}
            
            <div className="border-t-2 border-gray-300 pt-3 mt-3">
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-gray-900">Total</span>
                <span className="text-2xl font-bold text-red-600">
                  ${orderSummary.total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              data-testid="userchecksorder-back"
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Continue Shopping
            </button>
            <button
              data-testid="userchecksorder-checkout"
              className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium text-lg"
            >
              Proceed to Checkout
            </button>
          </div>
          
          <div className="mt-4 text-center text-sm text-gray-600">
            <p>Estimated delivery time: 30-45 minutes</p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center text-xs text-gray-500">
          <p>Prices and availability subject to change</p>
          <p className="mt-1">All prices shown in CAD</p>
        </div>
      </div>
    </div>
  )
}
