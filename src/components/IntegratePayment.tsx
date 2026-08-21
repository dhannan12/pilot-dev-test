/**
 * IntegratePayment — Payment gateway integration with multiple payment options
 *
 * Features: Credit/Debit Card, PayPal, Apple Pay, secure checkout, payment validation
 *
 * Ticket: SCRUM-1068 | Branch: proto/SCRUM-1056
 */

import { useState } from 'react'

interface PaymentMethod {
  id: string
  name: string
  type: 'card' | 'paypal' | 'applepay'
  icon: string
  description: string
  processingFee: number
}

interface Order {
  id: string
  items: string[]
  subtotal: number
  tax: number
  delivery: number
  total: number
}

const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: 'pm-1',
    name: 'Credit/Debit Card',
    type: 'card',
    icon: '💳',
    description: 'Visa, Mastercard, Amex accepted',
    processingFee: 0
  },
  {
    id: 'pm-2',
    name: 'PayPal',
    type: 'paypal',
    icon: '🅿️',
    description: 'Pay securely with your PayPal account',
    processingFee: 0.50
  },
  {
    id: 'pm-3',
    name: 'Apple Pay',
    type: 'applepay',
    icon: '🍎',
    description: 'Fast and secure Apple Pay checkout',
    processingFee: 0
  }
]

const MOCK_ORDER: Order = {
  id: 'ORD-2024-001',
  items: ['Sweet and Sour Chicken', 'Fried Rice', 'Spring Rolls'],
  subtotal: 32.50,
  tax: 3.25,
  delivery: 5.00,
  total: 40.75
}

export default function IntegratePayment() {
  const [selectedMethod, setSelectedMethod] = useState<string>('')
  const [cardNumber, setCardNumber] = useState('')
  const [cardName, setCardName] = useState('')
  const [cardExpiry, setCardExpiry] = useState('')
  const [cardCvv, setCardCvv] = useState('')
  const [paypalEmail, setPaypalEmail] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const selectedPaymentMethod = PAYMENT_METHODS.find(m => m.id === selectedMethod)
  const finalTotal = selectedPaymentMethod 
    ? MOCK_ORDER.total + selectedPaymentMethod.processingFee 
    : MOCK_ORDER.total

  const validateCardNumber = (num: string): boolean => {
    const cleaned = num.replace(/\s/g, '')
    return /^\d{13,19}$/.test(cleaned)
  }

  const validateExpiry = (exp: string): boolean => {
    return /^(0[1-9]|1[0-2])\/\d{2}$/.test(exp)
  }

  const validateCvv = (cvv: string): boolean => {
    return /^\d{3,4}$/.test(cvv)
  }

  const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const newErrors: Record<string, string> = {}

    if (!selectedMethod) {
      newErrors.method = 'Please select a payment method'
    }

    if (selectedPaymentMethod?.type === 'card') {
      if (!cardNumber) {
        newErrors.cardNumber = 'Card number is required'
      } else if (!validateCardNumber(cardNumber)) {
        newErrors.cardNumber = 'Invalid card number'
      }

      if (!cardName) {
        newErrors.cardName = 'Cardholder name is required'
      }

      if (!cardExpiry) {
        newErrors.cardExpiry = 'Expiry date is required'
      } else if (!validateExpiry(cardExpiry)) {
        newErrors.cardExpiry = 'Invalid format (MM/YY)'
      }

      if (!cardCvv) {
        newErrors.cardCvv = 'CVV is required'
      } else if (!validateCvv(cardCvv)) {
        newErrors.cardCvv = 'Invalid CVV'
      }
    }

    if (selectedPaymentMethod?.type === 'paypal') {
      if (!paypalEmail) {
        newErrors.paypalEmail = 'PayPal email is required'
      } else if (!validateEmail(paypalEmail)) {
        newErrors.paypalEmail = 'Invalid email address'
      }
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      setIsProcessing(true)
      
      // Simulate payment processing
      setTimeout(() => {
        setIsProcessing(false)
        setPaymentSuccess(true)
      }, 2000)
    }
  }

  const formatCardNumber = (value: string): string => {
    const cleaned = value.replace(/\s/g, '')
    const groups = cleaned.match(/.{1,4}/g)
    return groups ? groups.join(' ') : cleaned
  }

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value.replace(/\s/g, ''))
    if (formatted.replace(/\s/g, '').length <= 19) {
      setCardNumber(formatted)
    }
  }

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '')
    if (value.length >= 2) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4)
    }
    setCardExpiry(value)
  }

  if (paymentSuccess) {
    return (
      <div data-testid="integrate-payment" className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="text-6xl mb-4">✅</div>
            <h2 className="text-3xl font-bold text-green-600 mb-4">Payment Successful!</h2>
            <p className="text-gray-600 mb-2">Order ID: {MOCK_ORDER.id}</p>
            <p className="text-gray-600 mb-6">
              Amount charged: £{finalTotal.toFixed(2)}
            </p>
            <p className="text-gray-500 text-sm">
              A confirmation email has been sent to your inbox.
            </p>
            <button
              data-testid="integrate-payment-back"
              onClick={() => setPaymentSuccess(false)}
              className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Back to Payment
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div data-testid="integrate-payment" className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Payment Checkout</h1>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Payment Form */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Select Payment Method</h2>

              {/* Payment Method Selection */}
              <div data-testid="integrate-payment-methods-list" className="space-y-3 mb-8">
                {PAYMENT_METHODS.map((method) => (
                  <button
                    key={method.id}
                    data-testid="integrate-payment-method-item"
                    onClick={() => setSelectedMethod(method.id)}
                    className={`w-full p-4 border-2 rounded-lg text-left transition-all ${
                      selectedMethod === method.id
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{method.icon}</span>
                        <div>
                          <div className="font-semibold text-gray-900">{method.name}</div>
                          <div className="text-sm text-gray-600">{method.description}</div>
                        </div>
                      </div>
                      {method.processingFee > 0 && (
                        <div className="text-sm text-gray-600">
                          +£{method.processingFee.toFixed(2)} fee
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {errors.method && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  {errors.method}
                </div>
              )}

              {/* Payment Form */}
              <form onSubmit={handlePaymentSubmit}>
                {selectedPaymentMethod?.type === 'card' && (
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900 mb-4">Card Details</h3>

                    <div>
                      <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                        Card Number
                      </label>
                      <input
                        id="cardNumber"
                        type="text"
                        data-testid="integrate-payment-card-number"
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        placeholder="1234 5678 9012 3456"
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors.cardNumber ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.cardNumber && (
                        <p className="mt-1 text-sm text-red-600">{errors.cardNumber}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                        Cardholder Name
                      </label>
                      <input
                        id="cardName"
                        type="text"
                        data-testid="integrate-payment-card-name"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        placeholder="John Smith"
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors.cardName ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.cardName && (
                        <p className="mt-1 text-sm text-red-600">{errors.cardName}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="cardExpiry" className="block text-sm font-medium text-gray-700 mb-1">
                          Expiry Date
                        </label>
                        <input
                          id="cardExpiry"
                          type="text"
                          data-testid="integrate-payment-card-expiry"
                          value={cardExpiry}
                          onChange={handleExpiryChange}
                          placeholder="MM/YY"
                          maxLength={5}
                          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                            errors.cardExpiry ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {errors.cardExpiry && (
                          <p className="mt-1 text-sm text-red-600">{errors.cardExpiry}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="cardCvv" className="block text-sm font-medium text-gray-700 mb-1">
                          CVV
                        </label>
                        <input
                          id="cardCvv"
                          type="text"
                          data-testid="integrate-payment-card-cvv"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                          placeholder="123"
                          maxLength={4}
                          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                            errors.cardCvv ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {errors.cardCvv && (
                          <p className="mt-1 text-sm text-red-600">{errors.cardCvv}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {selectedPaymentMethod?.type === 'paypal' && (
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900 mb-4">PayPal Account</h3>

                    <div>
                      <label htmlFor="paypalEmail" className="block text-sm font-medium text-gray-700 mb-1">
                        PayPal Email
                      </label>
                      <input
                        id="paypalEmail"
                        type="email"
                        data-testid="integrate-payment-paypal-email"
                        value={paypalEmail}
                        onChange={(e) => setPaypalEmail(e.target.value)}
                        placeholder="your.email@example.com"
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors.paypalEmail ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.paypalEmail && (
                        <p className="mt-1 text-sm text-red-600">{errors.paypalEmail}</p>
                      )}
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-sm text-blue-800">
                        You will be redirected to PayPal to complete your payment securely.
                      </p>
                    </div>
                  </div>
                )}

                {selectedPaymentMethod?.type === 'applepay' && (
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900 mb-4">Apple Pay</h3>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
                      <div className="text-6xl mb-4">🍎</div>
                      <p className="text-gray-700 mb-2">
                        Click the button below to pay with Apple Pay
                      </p>
                      <p className="text-sm text-gray-600">
                        Your payment information is securely handled by Apple
                      </p>
                    </div>
                  </div>
                )}

                {selectedMethod && (
                  <button
                    type="submit"
                    data-testid="integrate-payment-submit"
                    disabled={isProcessing}
                    className="w-full mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                  >
                    {isProcessing ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="animate-spin">⏳</span>
                        Processing Payment...
                      </span>
                    ) : (
                      `Pay £${finalTotal.toFixed(2)}`
                    )}
                  </button>
                )}
              </form>

              <div className="mt-6 flex items-center justify-center gap-4 text-gray-500 text-sm">
                <span>🔒 Secure Payment</span>
                <span>•</span>
                <span>SSL Encrypted</span>
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>

              <div data-testid="integrate-payment-order-items" className="space-y-2 mb-4 pb-4 border-b border-gray-200">
                {MOCK_ORDER.items.map((item, index) => (
                  <div key={index} data-testid="integrate-payment-order-item" className="text-sm text-gray-700">
                    {item}
                  </div>
                ))}
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span>£{MOCK_ORDER.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Tax</span>
                  <span>£{MOCK_ORDER.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Delivery</span>
                  <span>£{MOCK_ORDER.delivery.toFixed(2)}</span>
                </div>
                {selectedPaymentMethod && selectedPaymentMethod.processingFee > 0 && (
                  <div className="flex justify-between text-gray-700">
                    <span>Processing Fee</span>
                    <span>£{selectedPaymentMethod.processingFee.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span>£{finalTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
