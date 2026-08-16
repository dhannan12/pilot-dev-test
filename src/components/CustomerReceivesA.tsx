/**
 * CustomerReceivesA — Displays confirmation email after rental request submission
 *
 * Features: email preview, rental details display, confirmation message, contact info, next steps
 *
 * Ticket: SCRUM-919 | Branch: proto/SCRUM-914
 */

import React from 'react'

interface RentalConfirmation {
  id: string
  customerName: string
  customerEmail: string
  equipmentType: string
  rentalPeriod: string
  startDate: string
  endDate: string
  quantity: number
  totalCost: number
  confirmationNumber: string
  requestDate: string
  status: string
}

const mockConfirmations: RentalConfirmation[] = [
  {
    id: '1',
    customerName: 'John Smith',
    customerEmail: 'john.smith@example.com',
    equipmentType: 'Excavator',
    rentalPeriod: '7 days',
    startDate: '2026-08-20',
    endDate: '2026-08-27',
    quantity: 1,
    totalCost: 2450.00,
    confirmationNumber: 'RR-2026-08-001',
    requestDate: '2026-08-16 10:30 AM',
    status: 'Pending Review'
  },
  {
    id: '2',
    customerName: 'Sarah Johnson',
    customerEmail: 'sarah.johnson@example.com',
    equipmentType: 'Forklift',
    rentalPeriod: '3 days',
    startDate: '2026-08-18',
    endDate: '2026-08-21',
    quantity: 2,
    totalCost: 900.00,
    confirmationNumber: 'RR-2026-08-002',
    requestDate: '2026-08-16 11:15 AM',
    status: 'Pending Review'
  },
  {
    id: '3',
    customerName: 'Michael Chen',
    customerEmail: 'michael.chen@example.com',
    equipmentType: 'Crane',
    rentalPeriod: '14 days',
    startDate: '2026-08-25',
    endDate: '2026-09-08',
    quantity: 1,
    totalCost: 8400.00,
    confirmationNumber: 'RR-2026-08-003',
    requestDate: '2026-08-16 02:45 PM',
    status: 'Pending Review'
  },
  {
    id: '4',
    customerName: 'Emily Rodriguez',
    customerEmail: 'emily.rodriguez@example.com',
    equipmentType: 'Bulldozer',
    rentalPeriod: '5 days',
    startDate: '2026-08-22',
    endDate: '2026-08-27',
    quantity: 1,
    totalCost: 1750.00,
    confirmationNumber: 'RR-2026-08-004',
    requestDate: '2026-08-16 03:20 PM',
    status: 'Pending Review'
  },
  {
    id: '5',
    customerName: 'David Williams',
    customerEmail: 'david.williams@example.com',
    equipmentType: 'Skid Steer Loader',
    rentalPeriod: '10 days',
    startDate: '2026-08-19',
    endDate: '2026-08-29',
    quantity: 3,
    totalCost: 3600.00,
    confirmationNumber: 'RR-2026-08-005',
    requestDate: '2026-08-16 04:00 PM',
    status: 'Pending Review'
  }
]

export default function CustomerReceivesA() {
  const [selectedConfirmation, setSelectedConfirmation] = React.useState<RentalConfirmation>(mockConfirmations[0])

  return (
    <div data-testid="customerreceivesa" className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Rental Confirmation Emails</h1>
          <p className="text-gray-600">View confirmation emails sent to customers after rental request submission</p>
        </div>

        {/* Confirmation Selector */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <label htmlFor="confirmation-select" className="block text-sm font-medium text-gray-700 mb-2">
            Select Confirmation Email:
          </label>
          <select
            id="confirmation-select"
            data-testid="customerreceivesa-confirmation-select"
            value={selectedConfirmation.id}
            onChange={(e) => {
              const confirmation = mockConfirmations.find(c => c.id === e.target.value)
              if (confirmation) setSelectedConfirmation(confirmation)
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {mockConfirmations.map((conf) => (
              <option key={conf.id} value={conf.id}>
                {conf.confirmationNumber} - {conf.customerName} - {conf.equipmentType}
              </option>
            ))}
          </select>
        </div>

        {/* Email Preview */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Email Header */}
          <div className="bg-blue-600 text-white p-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-bold">Equipment Rental Platform</h2>
              <span className="text-sm bg-blue-700 px-3 py-1 rounded">Confirmation</span>
            </div>
            <p className="text-blue-100">Your rental request has been received</p>
          </div>

          {/* Email Body */}
          <div className="p-6">
            {/* Greeting */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Dear {selectedConfirmation.customerName},
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Thank you for submitting your rental request! We have received your request and our team is currently reviewing it. 
                You will receive a follow-up email within 24 hours with approval status and next steps.
              </p>
            </div>

            {/* Confirmation Number Box */}
            <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-sm text-green-700 font-medium mb-1">Confirmation Number</p>
                  <p className="text-2xl font-bold text-green-900">{selectedConfirmation.confirmationNumber}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-green-700">Request Date</p>
                  <p className="text-green-900 font-semibold">{selectedConfirmation.requestDate}</p>
                </div>
              </div>
            </div>

            {/* Rental Details */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Rental Request Details</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Equipment Type</p>
                  <p className="text-gray-900 font-medium">{selectedConfirmation.equipmentType}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Quantity</p>
                  <p className="text-gray-900 font-medium">{selectedConfirmation.quantity}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Start Date</p>
                  <p className="text-gray-900 font-medium">{selectedConfirmation.startDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">End Date</p>
                  <p className="text-gray-900 font-medium">{selectedConfirmation.endDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Rental Period</p>
                  <p className="text-gray-900 font-medium">{selectedConfirmation.rentalPeriod}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Estimated Total</p>
                  <p className="text-gray-900 font-medium">${selectedConfirmation.totalCost.toFixed(2)}</p>
                </div>
              </div>
            </div>

            {/* Status */}
            <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-sm font-medium text-yellow-800 mb-1">Current Status</p>
                  <p className="text-lg font-semibold text-yellow-900">{selectedConfirmation.status}</p>
                </div>
                <div className="w-12 h-12 bg-yellow-200 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Next Steps</h4>
              <ul data-testid="customerreceivesa-list" className="space-y-2">
                <li data-testid="customerreceivesa-item" className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mr-3 flex-shrink-0">1</span>
                  <span className="text-gray-700">Our team will review your rental request within 24 hours</span>
                </li>
                <li data-testid="customerreceivesa-item" className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mr-3 flex-shrink-0">2</span>
                  <span className="text-gray-700">You will receive an approval email with payment instructions</span>
                </li>
                <li data-testid="customerreceivesa-item" className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mr-3 flex-shrink-0">3</span>
                  <span className="text-gray-700">Complete payment to confirm your rental booking</span>
                </li>
                <li data-testid="customerreceivesa-item" className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mr-3 flex-shrink-0">4</span>
                  <span className="text-gray-700">Receive delivery details and equipment preparation information</span>
                </li>
                <li data-testid="customerreceivesa-item" className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mr-3 flex-shrink-0">5</span>
                  <span className="text-gray-700">Equipment will be delivered on your requested start date</span>
                </li>
              </ul>
            </div>

            {/* Contact Information */}
            <div className="border-t pt-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Need Help?</h4>
              <p className="text-gray-700 mb-4">
                If you have any questions about your rental request, please don't hesitate to contact us:
              </p>
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-gray-700">support@equipmentrental.com</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-gray-700">1-800-RENTAL-1 (1-800-736-8251)</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-700">Monday - Friday: 8:00 AM - 6:00 PM EST</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex gap-3">
              <button
                data-testid="customerreceivesa-view-details"
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                View Full Request Details
              </button>
              <button
                data-testid="customerreceivesa-print"
                className="px-6 bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
              >
                Print Confirmation
              </button>
            </div>
          </div>

          {/* Email Footer */}
          <div className="bg-gray-100 px-6 py-4 text-center text-sm text-gray-600">
            <p className="mb-1">This is an automated confirmation email. Please do not reply to this message.</p>
            <p>© 2026 Equipment Rental Platform. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
