/**
 * UserReachesCheckout — Checkout page for finalizing restaurant takeaway orders
 *
 * Features: cart review, delivery/pickup selection, contact form, promo code application, order summary
 *
 * Ticket: SCRUM-1061 | Branch: proto/SCRUM-1056
 */

import { useState } from 'react'

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  specialInstructions?: string
}

interface CheckoutForm {
  fullName: string
  phone: string
  email: string
  orderType: 'delivery' | 'pickup'
  address: string
  city: string
  postalCode: string
  paymentMethod: 'card' | 'cash'
  promoCode: string
}

const MOCK_CART_ITEMS: CartItem[] = [
  {
    id: '1',
    name: 'General Tso\'s Chicken',
    price: 14.99,
    quantity: 2,
    specialInstructions: 'Extra spicy please'
  },
  {
    id: '2',
    name: 'Vegetable Spring Rolls (6pc)',
    price: 6.99,
    quantity: 1
  },
  {
    id: '3',
    name: 'Beef Fried Rice',
    price: 12.99,
    quantity: 1
  },
  {
    id: '4',
    name: 'Hot and Sour Soup',
    price: 5.99,
    quantity: 2
  },
  {
    id: '5',
    name: 'Kung Pao Shrimp',
    price: 16.99,
    quantity: 1
  }
]

const PROMO_CODES: Record<string, { discount: number; type: 'percent' | 'fixed' }> = {
  'WELCOME20': { discount: 20, type: 'percent' },
  'SAVE5': { discount: 5, type: 'fixed' },
  'STUDENT10': { discount: 10, type: 'percent' }
}

export default function UserReachesCheckout() {
  const [cartItems] = useState<CartItem[]>(MOCK_CART_ITEMS)
  const [formData, setFormData] = useState<CheckoutForm>({
    fullName: '',
    phone: '',
    email: '',
    orderType: 'delivery',
    address: '',
    city: '',
    postalCode: '',
    paymentMethod: 'card',
    promoCode: ''
  })
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null)
  const [promoError, setPromoError] = useState<string>('')

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const tax = subtotal * 0.13 // 13% tax
  const deliveryFee = formData.orderType === 'delivery' ? 4.99 : 0
  
  let discount = 0
  if (appliedPromo && PROMO_CODES[appliedPromo]) {
    const promo = PROMO_CODES[appliedPromo]
    discount = promo.type === 'percent' 
      ? subtotal * (promo.discount / 100)
      : promo.discount
  }
  
  const total = subtotal + tax + deliveryFee - discount

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleApplyPromo = () => {
    const code = formData.promoCode.toUpperCase()
    if (PROMO_CODES[code]) {
      setAppliedPromo(code)
      setPromoError('')
    } else {
      setPromoError('Invalid promo code')
      setAppliedPromo(null)
    }
  }

  const handleRemovePromo = () => {
    setAppliedPromo(null)
    setFormData(prev => ({ ...prev, promoCode: '' }))
    setPromoError('')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would submit to an API
    alert('Order placed successfully! (This is a demo)')
  }

  return (
    <section data-testid="userreachescheckout" className="min-h-screen bg-gradient-to-br from-red-50 via-white to-yellow-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact Information */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      data-testid="userreachescheckout-fullname"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        data-testid="userreachescheckout-phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        data-testid="userreachescheckout-email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Type */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Order Type</h2>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    data-testid="userreachescheckout-delivery"
                    onClick={() => setFormData(prev => ({ ...prev, orderType: 'delivery' }))}
                    className={`py-4 px-6 rounded-lg border-2 font-semibold transition-all ${
                      formData.orderType === 'delivery'
                        ? 'border-red-600 bg-red-50 text-red-700'
                        : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    Delivery
                  </button>
                  <button
                    type="button"
                    data-testid="userreachescheckout-pickup"
                    onClick={() => setFormData(prev => ({ ...prev, orderType: 'pickup' }))}
                    className={`py-4 px-6 rounded-lg border-2 font-semibold transition-all ${
                      formData.orderType === 'pickup'
                        ? 'border-red-600 bg-red-50 text-red-700'
                        : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    Pickup
                  </button>
                </div>
              </div>

              {/* Delivery Address (only shown for delivery) */}
              {formData.orderType === 'delivery' && (
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Delivery Address</h2>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                        Street Address *
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        data-testid="userreachescheckout-address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required={formData.orderType === 'delivery'}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="123 Main Street"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                          City *
                        </label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          data-testid="userreachescheckout-city"
                          value={formData.city}
                          onChange={handleInputChange}
                          required={formData.orderType === 'delivery'}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          placeholder="Toronto"
                        />
                      </div>
                      <div>
                        <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
                          Postal Code *
                        </label>
                        <input
                          type="text"
                          id="postalCode"
                          name="postalCode"
                          data-testid="userreachescheckout-postalcode"
                          value={formData.postalCode}
                          onChange={handleInputChange}
                          required={formData.orderType === 'delivery'}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          placeholder="M1A 1A1"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Payment Method */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Payment Method</h2>
                <div>
                  <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700 mb-2">
                    Select Payment Method *
                  </label>
                  <select
                    id="paymentMethod"
                    name="paymentMethod"
                    data-testid="userreachescheckout-paymentmethod"
                    value={formData.paymentMethod}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <option value="card">Credit/Debit Card</option>
                    <option value="cash">Cash on {formData.orderType === 'delivery' ? 'Delivery' : 'Pickup'}</option>
                  </select>
                </div>
              </div>
            </form>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Order Summary</h2>

              {/* Cart Items */}
              <div data-testid="userreachescheckout-list" className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                {cartItems.map(item => (
                  <div key={item.id} data-testid="userreachescheckout-item" className="flex justify-between text-sm">
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{item.name}</div>
                      <div className="text-gray-500">Qty: {item.quantity}</div>
                      {item.specialInstructions && (
                        <div className="text-xs text-gray-400 italic">{item.specialInstructions}</div>
                      )}
                    </div>
                    <div className="font-semibold text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Promo Code */}
              <div className="mb-4 pb-4 border-b border-gray-200">
                <label htmlFor="promoCode" className="block text-sm font-medium text-gray-700 mb-2">
                  Promo Code
                </label>
                {appliedPromo ? (
                  <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg px-4 py-2">
                    <div>
                      <div className="text-sm font-semibold text-green-700">{appliedPromo}</div>
                      <div className="text-xs text-green-600">Code applied!</div>
                    </div>
                    <button
                      type="button"
                      data-testid="userreachescheckout-removepromo"
                      onClick={handleRemovePromo}
                      className="text-sm text-red-600 hover:text-red-700 font-medium"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        id="promoCode"
                        name="promoCode"
                        data-testid="userreachescheckout-promocode"
                        value={formData.promoCode}
                        onChange={handleInputChange}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                        placeholder="Enter code"
                      />
                      <button
                        type="button"
                        data-testid="userreachescheckout-applypromo"
                        onClick={handleApplyPromo}
                        className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg text-sm transition-colors"
                      >
                        Apply
                      </button>
                    </div>
                    {promoError && (
                      <div className="text-xs text-red-600 mt-1">{promoError}</div>
                    )}
                  </div>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold text-gray-900">${subtotal.toFixed(2)}</span>
                </div>
                {appliedPromo && discount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-green-600">Discount</span>
                    <span className="font-semibold text-green-600">-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax (13%)</span>
                  <span className="font-semibold text-gray-900">${tax.toFixed(2)}</span>
                </div>
                {formData.orderType === 'delivery' && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span className="font-semibold text-gray-900">${deliveryFee.toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t border-gray-300 pt-2 flex justify-between text-lg font-bold">
                  <span className="text-gray-900">Total</span>
                  <span className="text-red-600">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Place Order Button */}
              <button
                type="submit"
                data-testid="userreachescheckout-submit"
                onClick={handleSubmit}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
              >
                Place Order
              </button>

              {/* Estimated Time */}
              <div className="mt-4 text-center text-sm text-gray-600">
                Estimated {formData.orderType === 'delivery' ? 'delivery' : 'pickup'} time: 30-45 min
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
