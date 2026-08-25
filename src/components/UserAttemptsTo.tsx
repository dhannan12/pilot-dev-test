/**
 * UserAttemptsTo — User attempts to purchase a ticket for museum entry
 *
 * Features: ticket type selection, visitor information form, date picker, quantity selector, price calculation
 *
 * Ticket: SCRUM-1128 | Branch: proto/SCRUM-1127
 */

import React, { useState } from 'react'

interface TicketType {
  id: number
  name: string
  description: string
  price: number
}

interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  visitDate: string
}

const mockTicketTypes: TicketType[] = [
  { id: 1, name: 'Adult', description: 'Ages 18-64', price: 12 },
  { id: 2, name: 'Senior', description: 'Ages 65+', price: 10 },
  { id: 3, name: 'Student', description: 'With valid student ID', price: 8 },
  { id: 4, name: 'Child', description: 'Ages 5-17', price: 6 },
  { id: 5, name: 'Family Pass', description: '2 Adults + 2 Children', price: 30 },
]

export default function UserAttemptsTo() {
  const [selectedTicket, setSelectedTicket] = useState<TicketType>(mockTicketTypes[0])
  const [quantity, setQuantity] = useState<number>(1)
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    visitDate: '',
  })
  const [agreedToTerms, setAgreedToTerms] = useState<boolean>(false)

  const totalPrice = selectedTicket.price * quantity

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!agreedToTerms) {
      alert('Please agree to the terms and conditions to continue.')
      return
    }
    alert(`Ticket purchase initiated!\n\nTicket: ${selectedTicket.name}\nQuantity: ${quantity}\nTotal: €${totalPrice.toFixed(2)}\n\nName: ${formData.firstName} ${formData.lastName}\nEmail: ${formData.email}\nVisit Date: ${formData.visitDate}`)
  }

  const minDate = new Date().toISOString().split('T')[0]

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4" data-testid="userattemptsto">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Dundalk Museum - Ticket Purchase
            </h1>
            <p className="text-gray-600">
              Purchase your tickets for the Dundalk Museum in Co. Louth, Ireland
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Ticket Type Selection */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                1. Select Ticket Type
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" data-testid="userattemptsto-list">
                {mockTicketTypes.map((ticket) => (
                  <button
                    key={ticket.id}
                    type="button"
                    data-testid="userattemptsto-item"
                    onClick={() => setSelectedTicket(ticket)}
                    className={`p-4 border-2 rounded-lg text-left transition-all ${
                      selectedTicket.id === ticket.id
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-400'
                    }`}
                  >
                    <div className="font-semibold text-gray-900 mb-1">{ticket.name}</div>
                    <div className="text-sm text-gray-600 mb-2">{ticket.description}</div>
                    <div className="text-lg font-bold text-blue-600">€{ticket.price.toFixed(2)}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selection */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                2. Select Quantity
              </h2>
              <div className="flex items-center gap-4">
                <label className="text-gray-700 font-medium">Number of Tickets:</label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    data-testid="userattemptsto-decrease"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    data-testid="userattemptsto-quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, Math.min(20, parseInt(e.target.value) || 1)))}
                    className="w-20 px-3 py-2 border border-gray-300 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="1"
                    max="20"
                  />
                  <button
                    type="button"
                    data-testid="userattemptsto-increase"
                    onClick={() => setQuantity(Math.min(20, quantity + 1))}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    disabled={quantity >= 20}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Visitor Information */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                3. Visitor Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    data-testid="userattemptsto-firstname"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    data-testid="userattemptsto-lastname"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    data-testid="userattemptsto-email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="john.doe@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    data-testid="userattemptsto-phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="+353 1 234 5678"
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="visitDate" className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Visit Date *
                  </label>
                  <input
                    id="visitDate"
                    name="visitDate"
                    type="date"
                    data-testid="userattemptsto-date"
                    value={formData.visitDate}
                    onChange={handleInputChange}
                    required
                    min={minDate}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="mb-8">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="terms"
                  data-testid="userattemptsto-terms"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="terms" className="text-sm text-gray-700">
                  I agree to the terms and conditions, including the cancellation policy. 
                  Tickets are non-refundable but can be rescheduled up to 24 hours before the visit date.
                </label>
              </div>
            </div>

            {/* Order Summary */}
            <div className="mb-8 bg-gray-50 rounded-lg p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Order Summary
              </h2>
              <div className="space-y-2">
                <div className="flex justify-between text-gray-700">
                  <span>Ticket Type:</span>
                  <span className="font-medium">{selectedTicket.name}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Price per Ticket:</span>
                  <span className="font-medium">€{selectedTicket.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Quantity:</span>
                  <span className="font-medium">{quantity}</span>
                </div>
                <div className="border-t border-gray-300 pt-2 mt-2">
                  <div className="flex justify-between text-lg font-bold text-gray-900">
                    <span>Total:</span>
                    <span className="text-blue-600">€{totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between gap-4">
              <button
                type="button"
                data-testid="userattemptsto-cancel"
                onClick={() => {
                  setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    visitDate: '',
                  })
                  setQuantity(1)
                  setSelectedTicket(mockTicketTypes[0])
                  setAgreedToTerms(false)
                }}
                className="px-6 py-3 bg-gray-200 text-gray-700 font-medium rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                data-testid="userattemptsto-submit"
                className="px-8 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!agreedToTerms}
              >
                Purchase Tickets - €{totalPrice.toFixed(2)}
              </button>
            </div>
          </form>
        </div>

        {/* Museum Information */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-blue-900 mb-3">Museum Information</h2>
          <div className="text-sm text-blue-800 space-y-2">
            <p><strong>Opening Hours:</strong> Tuesday - Sunday, 10:00 AM - 5:00 PM (Closed Mondays)</p>
            <p><strong>Location:</strong> Jocelyn Street, Dundalk, Co. Louth, Ireland</p>
            <p><strong>Facilities:</strong> Wheelchair accessible, gift shop, café, free WiFi</p>
            <p><strong>Parking:</strong> Free parking available on-site</p>
            <p><strong>Contact:</strong> +353 42 932 7056 | info@dundalkmuseum.ie</p>
          </div>
        </div>
      </div>
    </div>
  )
}
