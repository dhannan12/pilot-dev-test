/**
 * UserAttemptsTo — Order placement flow for Chinese restaurant takeaway
 *
 * Features: cart review, delivery/pickup selection, contact info, order submission, validation
 *
 * Ticket: SCRUM-1064 | Branch: proto/SCRUM-1056
 */

import { useState } from 'react'

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  category: string
}

interface OrderFormData {
  name: string
  phone: string
  email: string
  address: string
  orderType: 'delivery' | 'pickup'
  specialInstructions: string
}

const MOCK_CART_ITEMS: CartItem[] = [
  { id: '1', name: 'Kung Pao Chicken', price: 12.99, quantity: 2, category: 'Main Course' },
  { id: '2', name: 'Spring Rolls (4 pcs)', price: 5.99, quantity: 1, category: 'Appetizer' },
  { id: '3', name: 'Fried Rice', price: 8.99, quantity: 1, category: 'Side' },
  { id: '4', name: 'Sweet and Sour Pork', price: 11.99, quantity: 1, category: 'Main Course' },
  { id: '5', name: 'Wonton Soup', price: 6.99, quantity: 2, category: 'Soup' },
]

export default function UserAttemptsTo() {
  const [formData, setFormData] = useState<OrderFormData>({
    name: '',
    phone: '',
    email: '',
    address: '',
    orderType: 'delivery',
    specialInstructions: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const calculateTotal = () => {
    const subtotal = MOCK_CART_ITEMS.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const tax = subtotal * 0.08
    const deliveryFee = formData.orderType === 'delivery' ? 3.99 : 0
    return {
      subtotal: subtotal.toFixed(2),
      tax: tax.toFixed(2),
      deliveryFee: deliveryFee.toFixed(2),
      total: (subtotal + tax + deliveryFee).toFixed(2),
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (formData.orderType === 'delivery' && !formData.address.trim()) {
      newErrors.address = 'Delivery address is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    
    // Simulate order processing
    setTimeout(() => {
      setIsSubmitting(false)
      setOrderPlaced(true)
    }, 1500)
  }

  const totals = calculateTotal()

  if (orderPlaced) {
    return (
      <div data-testid="userattemptsto" className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8 text-center">
          <div className="mb-6">
            <svg
              className="w-16 h-16 text-green-500 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Order Placed Successfully!</h2>
          <p className="text-gray-600 mb-2">
            Thank you, {formData.name}! Your order has been received.
          </p>
          <p className="text-gray-600 mb-6">
            {formData.orderType === 'delivery'
              ? `We'll deliver to: ${formData.address}`
              : 'Your order will be ready for pickup in 20-30 minutes'}
          </p>
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600">Order Total</p>
            <p className="text-2xl font-bold text-gray-800">${totals.total}</p>
          </div>
          <button
            data-testid="userattemptsto-new-order"
            onClick={() => {
              setOrderPlaced(false)
              setFormData({
                name: '',
                phone: '',
                email: '',
                address: '',
                orderType: 'delivery',
                specialInstructions: '',
              })
            }}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Place Another Order
          </button>
        </div>
      </div>
    )
  }

  return (
    <div data-testid="userattemptsto" className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Complete Your Order
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Form - Left Side */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Order Details
              </h2>

              {/* Order Type Selection */}
              <div className="mb-6">
                <label
                  htmlFor="orderType"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Order Type *
                </label>
                <select
                  id="orderType"
                  name="orderType"
                  data-testid="userattemptsto-ordertype"
                  value={formData.orderType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="delivery">Delivery</option>
                  <option value="pickup">Pickup</option>
                </select>
              </div>

              {/* Name Input */}
              <div className="mb-6">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  data-testid="userattemptsto-name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              {/* Phone Input */}
              <div className="mb-6">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  data-testid="userattemptsto-phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="(555) 123-4567"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                )}
              </div>

              {/* Email Input */}
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  data-testid="userattemptsto-email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              {/* Address Input (conditional) */}
              {formData.orderType === 'delivery' && (
                <div className="mb-6">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Delivery Address *
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    data-testid="userattemptsto-address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                      errors.address ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="123 Main St, Apt 4B, City, State 12345"
                  />
                  {errors.address && (
                    <p className="mt-1 text-sm text-red-600">{errors.address}</p>
                  )}
                </div>
              )}

              {/* Special Instructions */}
              <div className="mb-6">
                <label
                  htmlFor="specialInstructions"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Special Instructions (Optional)
                </label>
                <textarea
                  id="specialInstructions"
                  name="specialInstructions"
                  data-testid="userattemptsto-instructions"
                  value={formData.specialInstructions}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Any special requests? (e.g., extra spicy, no MSG, etc.)"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                data-testid="userattemptsto-submit"
                disabled={isSubmitting}
                className={`w-full py-3 rounded-lg font-semibold text-white transition-colors ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                {isSubmitting ? 'Processing Order...' : 'Place Order'}
              </button>
            </form>
          </div>

          {/* Order Summary - Right Side */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Order Summary
              </h2>

              <div data-testid="userattemptsto-list" className="space-y-3 mb-4">
                {MOCK_CART_ITEMS.map(item => (
                  <div
                    key={item.id}
                    data-testid="userattemptsto-item"
                    className="flex justify-between items-start border-b border-gray-200 pb-3"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity} × ${item.price.toFixed(2)}
                      </p>
                    </div>
                    <p className="font-semibold text-gray-800">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-300 pt-4 space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${totals.subtotal}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (8%)</span>
                  <span>${totals.tax}</span>
                </div>
                {formData.orderType === 'delivery' && (
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery Fee</span>
                    <span>${totals.deliveryFee}</span>
                  </div>
                )}
                <div className="border-t border-gray-300 pt-2 flex justify-between font-bold text-lg text-gray-800">
                  <span>Total</span>
                  <span>${totals.total}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
