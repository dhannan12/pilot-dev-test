/**
 * UserCompletesA — Museum ticket purchase confirmation and receipt page
 *
 * Features: order confirmation, ticket details display, receipt download, payment summary, booking reference
 *
 * Ticket: SCRUM-1134 | Branch: proto/SCRUM-1127
 */

import React, { useState } from 'react'

interface Ticket {
  id: string
  type: string
  quantity: number
  price: number
}

interface Purchase {
  confirmationNumber: string
  purchaseDate: string
  customerName: string
  customerEmail: string
  tickets: Ticket[]
  subtotal: number
  tax: number
  total: number
  paymentMethod: string
  visitDate: string
}

const mockPurchases: Purchase[] = [
  {
    confirmationNumber: 'MUS-2026-08-001234',
    purchaseDate: '2026-08-25 14:32:15',
    customerName: 'Sarah O\'Connor',
    customerEmail: 'sarah.oconnor@email.com',
    tickets: [
      { id: '1', type: 'Adult General Admission', quantity: 2, price: 15.00 },
      { id: '2', type: 'Child (5-12 years)', quantity: 1, price: 8.00 },
    ],
    subtotal: 38.00,
    tax: 4.56,
    total: 42.56,
    paymentMethod: 'Visa ending in 4242',
    visitDate: '2026-09-05',
  },
  {
    confirmationNumber: 'MUS-2026-08-001235',
    purchaseDate: '2026-08-25 15:10:42',
    customerName: 'Michael Murphy',
    customerEmail: 'michael.murphy@email.ie',
    tickets: [
      { id: '3', type: 'Adult General Admission', quantity: 1, price: 15.00 },
      { id: '4', type: 'Senior (65+)', quantity: 1, price: 12.00 },
    ],
    subtotal: 27.00,
    tax: 3.24,
    total: 30.24,
    paymentMethod: 'Mastercard ending in 5555',
    visitDate: '2026-08-30',
  },
  {
    confirmationNumber: 'MUS-2026-08-001236',
    purchaseDate: '2026-08-25 16:22:33',
    customerName: 'Emma Byrne',
    customerEmail: 'emma.byrne@email.com',
    tickets: [
      { id: '5', type: 'Family Pass (2 Adults + 2 Children)', quantity: 1, price: 40.00 },
    ],
    subtotal: 40.00,
    tax: 4.80,
    total: 44.80,
    paymentMethod: 'American Express ending in 1001',
    visitDate: '2026-09-12',
  },
  {
    confirmationNumber: 'MUS-2026-08-001237',
    purchaseDate: '2026-08-25 17:05:19',
    customerName: 'Patrick Kelly',
    customerEmail: 'p.kelly@email.ie',
    tickets: [
      { id: '6', type: 'Adult General Admission', quantity: 4, price: 15.00 },
      { id: '7', type: 'Audio Guide', quantity: 4, price: 5.00 },
    ],
    subtotal: 80.00,
    tax: 9.60,
    total: 89.60,
    paymentMethod: 'Visa ending in 7890',
    visitDate: '2026-09-20',
  },
  {
    confirmationNumber: 'MUS-2026-08-001238',
    purchaseDate: '2026-08-25 18:15:07',
    customerName: 'Aoife Walsh',
    customerEmail: 'aoife.walsh@email.com',
    tickets: [
      { id: '8', type: 'Student', quantity: 3, price: 10.00 },
    ],
    subtotal: 30.00,
    tax: 3.60,
    total: 33.60,
    paymentMethod: 'Debit Card ending in 6789',
    visitDate: '2026-08-28',
  },
]

export default function UserCompletesA() {
  const [selectedPurchase] = useState<Purchase>(mockPurchases[0])
  const [emailSent, setEmailSent] = useState(false)

  const handleDownloadReceipt = () => {
    // Mock download functionality
    alert(`Downloading receipt for order ${selectedPurchase.confirmationNumber}`)
  }

  const handlePrintReceipt = () => {
    // Mock print functionality
    window.print()
  }

  const handleEmailReceipt = () => {
    setEmailSent(true)
    setTimeout(() => setEmailSent(false), 3000)
  }

  return (
    <div data-testid="usercompletesa" className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Success Header */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6 text-center">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Purchase Complete!
          </h1>
          <p className="text-gray-600 mb-4">
            Thank you for your purchase. Your tickets have been confirmed.
          </p>
          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 inline-block">
            <p className="text-sm text-gray-600 mb-1">Confirmation Number</p>
            <p className="text-2xl font-mono font-bold text-green-700">
              {selectedPurchase.confirmationNumber}
            </p>
          </div>
        </div>

        {/* Customer Information */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
            Customer Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Name</p>
              <p className="font-semibold text-gray-800">{selectedPurchase.customerName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="font-semibold text-gray-800">{selectedPurchase.customerEmail}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Purchase Date</p>
              <p className="font-semibold text-gray-800">{selectedPurchase.purchaseDate}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Visit Date</p>
              <p className="font-semibold text-gray-800">{selectedPurchase.visitDate}</p>
            </div>
          </div>
        </div>

        {/* Ticket Details */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
            Ticket Details
          </h2>
          <div data-testid="usercompletesa-list" className="space-y-3">
            {selectedPurchase.tickets.map((ticket) => (
              <div
                key={ticket.id}
                data-testid="usercompletesa-item"
                className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="font-semibold text-gray-800">{ticket.type}</p>
                  <p className="text-sm text-gray-600">Quantity: {ticket.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-800">
                    €{(ticket.price * ticket.quantity).toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-600">€{ticket.price.toFixed(2)} each</p>
                </div>
              </div>
            ))}
          </div>

          {/* Payment Summary */}
          <div className="mt-6 pt-4 border-t space-y-2">
            <div className="flex justify-between text-gray-700">
              <span>Subtotal</span>
              <span>€{selectedPurchase.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Tax (12%)</span>
              <span>€{selectedPurchase.tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xl font-bold text-gray-900 pt-2 border-t-2">
              <span>Total</span>
              <span>€{selectedPurchase.total.toFixed(2)}</span>
            </div>
          </div>

          {/* Payment Method */}
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-600">Payment Method</p>
            <p className="font-semibold text-gray-800">{selectedPurchase.paymentMethod}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            What's Next?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              data-testid="usercompletesa-download"
              onClick={handleDownloadReceipt}
              className="flex flex-col items-center justify-center p-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
            >
              <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="font-semibold">Download Receipt</span>
            </button>

            <button
              data-testid="usercompletesa-print"
              onClick={handlePrintReceipt}
              className="flex flex-col items-center justify-center p-4 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
            >
              <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              <span className="font-semibold">Print Receipt</span>
            </button>

            <button
              data-testid="usercompletesa-email"
              onClick={handleEmailReceipt}
              className={`flex flex-col items-center justify-center p-4 rounded-lg transition-colors ${
                emailSent
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-purple-500 hover:bg-purple-600'
              } text-white`}
              disabled={emailSent}
            >
              <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="font-semibold">
                {emailSent ? 'Email Sent!' : 'Email Receipt'}
              </span>
            </button>
          </div>

          {emailSent && (
            <div className="mt-4 p-3 bg-green-100 border border-green-300 rounded-lg text-green-800 text-center">
              Receipt has been sent to {selectedPurchase.customerEmail}
            </div>
          )}
        </div>

        {/* Important Information */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Important Information
          </h2>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-green-500 mr-2 mt-1">✓</span>
              <span>Please present your confirmation number at the museum entrance</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2 mt-1">✓</span>
              <span>Tickets are valid for the date selected: {selectedPurchase.visitDate}</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2 mt-1">✓</span>
              <span>Museum hours: Tuesday-Sunday, 10:00 AM - 6:00 PM (Closed Mondays)</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2 mt-1">✓</span>
              <span>For changes or cancellations, please contact us at least 24 hours in advance</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2 mt-1">✓</span>
              <span>A confirmation email has been sent to {selectedPurchase.customerEmail}</span>
            </li>
          </ul>
        </div>

        {/* Return Button */}
        <div className="mt-6 text-center">
          <button
            data-testid="usercompletesa-home"
            className="px-8 py-3 bg-gray-800 hover:bg-gray-900 text-white font-semibold rounded-lg transition-colors"
          >
            Return to Homepage
          </button>
        </div>
      </div>
    </div>
  )
}
