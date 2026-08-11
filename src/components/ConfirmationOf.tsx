import React, { useState } from 'react'

const MOCK_RESERVATION_DATA = {
  id: 'RES-2024-001',
  guestName: 'John Doe',
  guestEmail: 'john.doe@example.com',
  checkInDate: '2024-12-20',
  checkOutDate: '2024-12-25',
  roomType: 'Deluxe Suite',
  roomNumber: '402',
  numberOfGuests: 2,
  totalPrice: 1250.00,
  currency: 'USD',
  hotelName: 'Grand Plaza Hotel',
  hotelAddress: '123 Main Street, New York, NY 10001',
  hotelPhone: '+1 (555) 123-4567',
  hotelEmail: 'reservations@grandplaza.com'
}

const MOCK_EMAIL_TEMPLATE = {
  subject: 'Reservation Confirmation - Grand Plaza Hotel',
  sentAt: new Date().toISOString(),
  status: 'sent'
}

export default function ConfirmationOf() {
  const [emailSent, setEmailSent] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  const handleSendConfirmation = () => {
    setEmailSent(true)
    setTimeout(() => {
      setEmailSent(false)
    }, 3000)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const calculateNights = () => {
    const checkIn = new Date(MOCK_RESERVATION_DATA.checkInDate)
    const checkOut = new Date(MOCK_RESERVATION_DATA.checkOutDate)
    return Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Reservation Confirmation</h1>
          <p className="text-gray-600">Your booking confirmation will be sent to your email</p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Success Message */}
          {emailSent && (
            <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-800">Confirmation email sent successfully to {MOCK_RESERVATION_DATA.guestEmail}</p>
                </div>
              </div>
            </div>
          )}

          {/* Email Preview Section */}
          <div className="bg-gray-50 p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Email Preview</h2>
            <div className="bg-white border border-gray-300 rounded p-6 space-y-4">
              <div>
                <p className="text-sm text-gray-600">To:</p>
                <p className="font-medium text-gray-800">{MOCK_RESERVATION_DATA.guestEmail}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Subject:</p>
                <p className="font-medium text-gray-800">{MOCK_EMAIL_TEMPLATE.subject}</p>
              </div>
              <div className="border-t border-gray-200 pt-4 mt-4">
                <p className="text-sm text-gray-600 mb-2">Message:</p>
                <div className="text-gray-700 space-y-2 text-sm">
                  <p>Dear {MOCK_RESERVATION_DATA.guestName},</p>
                  <p>Thank you for your reservation at {MOCK_RESERVATION_DATA.hotelName}. Your booking has been confirmed.</p>
                  <p className="font-semibold mt-4">Reservation Details:</p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>Confirmation ID: {MOCK_RESERVATION_DATA.id}</li>
                    <li>Check-in: {formatDate(MOCK_RESERVATION_DATA.checkInDate)}</li>
                    <li>Check-out: {formatDate(MOCK_RESERVATION_DATA.checkOutDate)}</li>
                    <li>Room: {MOCK_RESERVATION_DATA.roomType} (#{MOCK_RESERVATION_DATA.roomNumber})</li>
                    <li>Guests: {MOCK_RESERVATION_DATA.numberOfGuests}</li>
                  </ul>
                  <p className="mt-4">We look forward to your arrival!</p>
                  <p>Best regards,<br />{MOCK_RESERVATION_DATA.hotelName}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Reservation Details */}
          <div className="p-6">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="w-full flex justify-between items-center mb-4 p-3 bg-gray-50 hover:bg-gray-100 rounded transition-colors"
            >
              <h3 className="text-lg font-semibold text-gray-800">Reservation Details</h3>
              <svg className={`h-5 w-5 text-gray-600 transition-transform ${showDetails ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </button>

            {showDetails && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 p-4 bg-gray-50 rounded">
                <div>
                  <p className="text-sm text-gray-600">Guest Name</p>
                  <p className="font-semibold text-gray-800">{MOCK_RESERVATION_DATA.guestName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Confirmation ID</p>
                  <p className="font-semibold text-gray-800">{MOCK_RESERVATION_DATA.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Check-in Date</p>
                  <p className="font-semibold text-gray-800">{formatDate(MOCK_RESERVATION_DATA.checkInDate)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Check-out Date</p>
                  <p className="font-semibold text-gray-800">{formatDate(MOCK_RESERVATION_DATA.checkOutDate)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Room Type</p>
                  <p className="font-semibold text-gray-800">{MOCK_RESERVATION_DATA.roomType}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Room Number</p>
                  <p className="font-semibold text-gray-800">#{MOCK_RESERVATION_DATA.roomNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Number of Guests</p>
                  <p className="font-semibold text-gray-800">{MOCK_RESERVATION_DATA.numberOfGuests}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Number of Nights</p>
                  <p className="font-semibold text-gray-800">{calculateNights()}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm text-gray-600">Hotel</p>
                  <p className="font-semibold text-gray-800">{MOCK_RESERVATION_DATA.hotelName}</p>
                  <p className="text-sm text-gray-600 mt-1">{MOCK_RESERVATION_DATA.hotelAddress}</p>
                  <p className="text-sm text-gray-600">{MOCK_RESERVATION_DATA.hotelPhone}</p>
                </div>
              </div>
            )}
          </div>

          {/* Price Summary */}
          <div className="bg-indigo-50 p-6 border-t border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-700">Subtotal ({calculateNights()} nights)</span>
              <span className="font-semibold text-gray-800">{MOCK_RESERVATION_DATA.currency} {(MOCK_RESERVATION_DATA.totalPrice * 0.9).toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center mb-4 pb-4 border-b border-indigo-200">
              <span className="text-gray-700">Taxes & Fees</span>
              <span className="font-semibold text-gray-800">{MOCK_RESERVATION_DATA.currency} {(MOCK_RESERVATION_DATA.totalPrice * 0.1).toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-gray-800">Total Amount</span>
              <span className="text-2xl font-bold text-indigo-600">{MOCK_RESERVATION_DATA.currency} {MOCK_RESERVATION_DATA.totalPrice.toFixed(2)}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="p-6 bg-white border-t border-gray-200 flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleSendConfirmation}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Send Confirmation Email
            </button>
            <button className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-4 rounded-lg transition-colors duration-200">
              Download PDF
            </button>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>A confirmation email will be sent to <span className="font-semibold">{MOCK_RESERVATION_DATA.guestEmail}</span></p>
          <p className="mt-2">For questions, contact {MOCK_RESERVATION_DATA.hotelName} at {MOCK_RESERVATION_DATA.hotelPhone}</p>
        </div>
      </div>
    </div>
  )
}