/**
 * UserPlacesAn — Order placement confirmation and processing for Chinese restaurant takeaway
 *
 * Features: order summary review, payment processing, order confirmation, estimated time, order tracking setup
 *
 * Ticket: SCRUM-1062 | Branch: proto/SCRUM-1056
 */

import { useState } from 'react'

interface OrderItem {
  id: string
  name: string
  quantity: number
  price: number
  specialInstructions?: string
}

interface CustomerDetails {
  name: string
  phone: string
  email: string
  address: string
}

interface Order {
  orderId: string
  items: OrderItem[]
  customer: CustomerDetails
  orderType: 'delivery' | 'pickup'
  subtotal: number
  tax: number
  deliveryFee: number
  total: number
  paymentMethod: string
  estimatedTime: string
  status: 'pending' | 'processing' | 'confirmed' | 'preparing'
}

const MOCK_ORDERS: Order[] = [
  {
    orderId: 'ORD-2026-001',
    items: [
      { id: '1', name: 'Kung Pao Chicken', quantity: 2, price: 13.99, specialInstructions: 'Extra spicy' },
      { id: '2', name: 'Spring Rolls (6pc)', quantity: 1, price: 6.99 },
      { id: '3', name: 'Fried Rice', quantity: 1, price: 9.99 }
    ],
    customer: {
      name: 'John Smith',
      phone: '555-0123',
      email: 'john.smith@example.com',
      address: '123 Main St, Apt 4B'
    },
    orderType: 'delivery',
    subtotal: 44.96,
    tax: 4.50,
    deliveryFee: 5.00,
    total: 54.46,
    paymentMethod: 'Credit Card ending in 4242',
    estimatedTime: '35-45 minutes',
    status: 'pending'
  },
  {
    orderId: 'ORD-2026-002',
    items: [
      { id: '4', name: 'Sweet & Sour Pork', quantity: 1, price: 12.99 },
      { id: '5', name: 'Wonton Soup', quantity: 2, price: 5.99 },
      { id: '6', name: 'Chow Mein', quantity: 1, price: 10.99 }
    ],
    customer: {
      name: 'Sarah Johnson',
      phone: '555-0456',
      email: 'sarah.j@example.com',
      address: '456 Oak Avenue'
    },
    orderType: 'pickup',
    subtotal: 35.96,
    tax: 3.60,
    deliveryFee: 0,
    total: 39.56,
    paymentMethod: 'Cash on Pickup',
    estimatedTime: '20-25 minutes',
    status: 'pending'
  },
  {
    orderId: 'ORD-2026-003',
    items: [
      { id: '7', name: 'Mongolian Beef', quantity: 1, price: 15.99 },
      { id: '8', name: 'Egg Rolls (4pc)', quantity: 1, price: 5.99 },
      { id: '9', name: 'Hot & Sour Soup', quantity: 1, price: 4.99 }
    ],
    customer: {
      name: 'Michael Chen',
      phone: '555-0789',
      email: 'mchen@example.com',
      address: '789 Elm Street, Unit 12'
    },
    orderType: 'delivery',
    subtotal: 26.97,
    tax: 2.70,
    deliveryFee: 5.00,
    total: 34.67,
    paymentMethod: 'Debit Card ending in 1234',
    estimatedTime: '40-50 minutes',
    status: 'pending'
  },
  {
    orderId: 'ORD-2026-004',
    items: [
      { id: '10', name: 'General Tso\'s Chicken', quantity: 3, price: 14.99 },
      { id: '11', name: 'Vegetable Lo Mein', quantity: 2, price: 9.99 },
      { id: '12', name: 'Crab Rangoon (8pc)', quantity: 1, price: 7.99 }
    ],
    customer: {
      name: 'Emily Rodriguez',
      phone: '555-0321',
      email: 'emily.r@example.com',
      address: '321 Pine Road'
    },
    orderType: 'pickup',
    subtotal: 72.93,
    tax: 7.29,
    deliveryFee: 0,
    total: 80.22,
    paymentMethod: 'Credit Card ending in 5678',
    estimatedTime: '25-30 minutes',
    status: 'pending'
  },
  {
    orderId: 'ORD-2026-005',
    items: [
      { id: '13', name: 'Szechuan Shrimp', quantity: 1, price: 16.99 },
      { id: '14', name: 'Steamed Dumplings (10pc)', quantity: 1, price: 8.99 },
      { id: '15', name: 'White Rice', quantity: 2, price: 2.99 }
    ],
    customer: {
      name: 'David Park',
      phone: '555-0654',
      email: 'david.park@example.com',
      address: '654 Maple Drive, Suite 5'
    },
    orderType: 'delivery',
    subtotal: 31.96,
    tax: 3.20,
    deliveryFee: 5.00,
    total: 40.16,
    paymentMethod: 'Credit Card ending in 9012',
    estimatedTime: '35-40 minutes',
    status: 'pending'
  }
]

export default function UserPlacesAn() {
  const [selectedOrderIndex, setSelectedOrderIndex] = useState(0)
  const [orderStatus, setOrderStatus] = useState<'review' | 'processing' | 'confirmed'>('review')
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)

  const currentOrder = MOCK_ORDERS[selectedOrderIndex]

  const handlePlaceOrder = () => {
    if (!termsAccepted) {
      alert('Please accept the terms and conditions')
      return
    }
    setOrderStatus('processing')
    // Simulate processing delay
    setTimeout(() => {
      setOrderStatus('confirmed')
      setShowConfirmation(true)
    }, 2000)
  }

  const handleSelectOrder = (index: number) => {
    setSelectedOrderIndex(index)
    setOrderStatus('review')
    setShowConfirmation(false)
    setTermsAccepted(false)
  }

  return (
    <div data-testid="userplacesan" className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Place Your Order</h1>
          <p className="text-gray-600">Review your order details and confirm to complete your purchase</p>
        </div>

        {/* Order Selection (for demo) */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Select Sample Order</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {MOCK_ORDERS.map((order, index) => (
              <button
                key={order.orderId}
                data-testid="userplacesan-select-order"
                onClick={() => handleSelectOrder(index)}
                className={`p-3 rounded-lg border-2 transition ${
                  selectedOrderIndex === index
                    ? 'border-red-600 bg-red-50'
                    : 'border-gray-200 hover:border-red-300'
                }`}
              >
                <div className="text-sm font-semibold text-gray-900">{order.orderId}</div>
                <div className="text-xs text-gray-600">${order.total.toFixed(2)}</div>
              </button>
            ))}
          </div>
        </div>

        {!showConfirmation ? (
          <>
            {/* Order Summary */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Order Summary</h2>
              
              {/* Order Type Badge */}
              <div className="mb-4">
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                  currentOrder.orderType === 'delivery' 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'bg-green-100 text-green-800'
                }`}>
                  {currentOrder.orderType === 'delivery' ? '🚗 Delivery' : '🏪 Pickup'}
                </span>
              </div>

              {/* Items List */}
              <div data-testid="userplacesan-items-list" className="space-y-3 mb-6">
                {currentOrder.items.map((item) => (
                  <div 
                    key={item.id} 
                    data-testid="userplacesan-item"
                    className="flex justify-between items-start border-b border-gray-200 pb-3"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900">{item.quantity}x</span>
                        <span className="text-gray-900">{item.name}</span>
                      </div>
                      {item.specialInstructions && (
                        <div className="text-sm text-gray-600 mt-1 ml-6">
                          Note: {item.specialInstructions}
                        </div>
                      )}
                    </div>
                    <div className="font-semibold text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="border-t border-gray-300 pt-4 space-y-2">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal:</span>
                  <span>${currentOrder.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Tax:</span>
                  <span>${currentOrder.tax.toFixed(2)}</span>
                </div>
                {currentOrder.deliveryFee > 0 && (
                  <div className="flex justify-between text-gray-700">
                    <span>Delivery Fee:</span>
                    <span>${currentOrder.deliveryFee.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-xl font-bold text-gray-900 pt-2 border-t border-gray-300">
                  <span>Total:</span>
                  <span>${currentOrder.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Customer Details */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Customer Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <div data-testid="userplacesan-customer-name" className="text-gray-900 font-medium">
                    {currentOrder.customer.name}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <div data-testid="userplacesan-customer-phone" className="text-gray-900 font-medium">
                    {currentOrder.customer.phone}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <div data-testid="userplacesan-customer-email" className="text-gray-900 font-medium">
                    {currentOrder.customer.email}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {currentOrder.orderType === 'delivery' ? 'Delivery Address' : 'Pickup Location'}
                  </label>
                  <div data-testid="userplacesan-customer-address" className="text-gray-900 font-medium">
                    {currentOrder.orderType === 'delivery' 
                      ? currentOrder.customer.address 
                      : 'Golden Dragon Restaurant, 123 Food Street'}
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Payment Method</h2>
              <div className="flex items-center gap-3">
                <div className="text-3xl">💳</div>
                <div>
                  <div data-testid="userplacesan-payment-method" className="text-gray-900 font-medium">
                    {currentOrder.paymentMethod}
                  </div>
                  <div className="text-sm text-gray-600">Payment will be processed upon order confirmation</div>
                </div>
              </div>
            </div>

            {/* Estimated Time */}
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-6">
              <div className="flex items-start">
                <div className="text-2xl mr-3">⏱️</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Estimated Time</h3>
                  <p data-testid="userplacesan-estimated-time" className="text-gray-700 font-medium">
                    Your order will be ready in approximately {currentOrder.estimatedTime}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    You'll receive a confirmation email and SMS once your order is confirmed
                  </p>
                </div>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  data-testid="userplacesan-terms-checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="mt-1 w-5 h-5 text-red-600 rounded focus:ring-red-500"
                />
                <span className="text-gray-700">
                  I agree to the <button data-testid="userplacesan-terms-link" className="text-red-600 underline hover:text-red-700">terms and conditions</button> and 
                  confirm that all information provided is accurate. I understand that this order is final once placed.
                </span>
              </label>
            </div>

            {/* Place Order Button */}
            <div className="bg-white rounded-lg shadow-md p-6">
              {orderStatus === 'processing' ? (
                <div data-testid="userplacesan-processing" className="text-center py-8">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-red-600 mx-auto mb-4"></div>
                  <p className="text-xl font-semibold text-gray-900">Processing Your Order...</p>
                  <p className="text-gray-600 mt-2">Please wait while we confirm your order</p>
                </div>
              ) : (
                <button
                  data-testid="userplacesan-submit"
                  onClick={handlePlaceOrder}
                  disabled={!termsAccepted}
                  className={`w-full py-4 px-6 rounded-lg text-lg font-semibold transition ${
                    termsAccepted
                      ? 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  🛒 Place Order - ${currentOrder.total.toFixed(2)}
                </button>
              )}
            </div>
          </>
        ) : (
          /* Confirmation Screen */
          <div data-testid="userplacesan-confirmation" className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="mb-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-5xl">✅</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h2>
              <p className="text-gray-600 mb-4">Thank you for your order</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <div className="text-sm text-gray-600 mb-2">Order Number</div>
              <div data-testid="userplacesan-order-id" className="text-2xl font-bold text-red-600 mb-4">
                {currentOrder.orderId}
              </div>
              
              <div className="border-t border-gray-300 pt-4 mb-4">
                <div className="text-sm text-gray-600 mb-2">Estimated {currentOrder.orderType === 'delivery' ? 'Delivery' : 'Pickup'} Time</div>
                <div className="text-xl font-semibold text-gray-900">{currentOrder.estimatedTime}</div>
              </div>

              <div className="text-sm text-gray-600">
                A confirmation email has been sent to <span className="font-medium text-gray-900">{currentOrder.customer.email}</span>
              </div>
            </div>

            <div className="space-y-3">
              <button
                data-testid="userplacesan-track-order"
                className="w-full bg-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-700 transition"
              >
                📍 Track Your Order
              </button>
              
              <button
                data-testid="userplacesan-view-receipt"
                className="w-full bg-gray-100 text-gray-900 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition"
              >
                📄 View Receipt
              </button>
              
              <button
                data-testid="userplacesan-new-order"
                onClick={() => {
                  setShowConfirmation(false)
                  setOrderStatus('review')
                  setTermsAccepted(false)
                }}
                className="w-full border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:border-gray-400 transition"
              >
                🍜 Place Another Order
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
