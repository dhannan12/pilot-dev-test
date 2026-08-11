import React, { useState } from 'react'

const MOCK_RESERVATION_DATA = {
  reservationId: 'RES-2024-001234',
  guestName: 'John Doe',
  guestEmail: 'john.doe@example.com',
  hotelName: 'Grand Plaza Hotel',
  checkInDate: '2024-12-20',
  checkOutDate: '2024-12-25',
  roomType: 'Deluxe Suite',
  roomNumber: '502',
  numberOfGuests: 2,
  numberOfNights: 5,
  pricePerNight: 150,
  totalPrice: 750,
  specialRequests: 'Late checkout if available',
  confirmationSentAt: '2024-12-01T14:30:00Z'
}

const MOCK_EMAIL_TEMPLATE = {
  subject: 'Reservation Confirmation - Grand Plaza Hotel',
  from: 'reservations@grandplazahotel.com',
  to: 'john.doe@example.com',
  sentStatus: 'delivered'
}

export default function ConfirmationOf() {
  const [emailSent, setEmailSent] = useState(true)
  const [showDetails, setShowDetails] = useState(false)

  const handleResendEmail = () => {
    setEmailSent(false)
    setTimeout(() => {
      setEmailSent(true)
    }, 1500)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Reservation Confirmed</h1>
          <p className="text-gray-600">Your confirmation email has been sent</p>
        </div>

        {/* Email Status Card */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-1">Confirmation Email</h2>
              <p className="text-sm text-gray-600">Sent to {MOCK_RESERVATION_DATA.guestEmail}</p>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
              emailSent ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
            }`}>
              {emailSent ? '✓ Delivered' : 'Sending...'}
            </div>
          </div>
          <div className="border-t border-gray-200 pt-4 mt-4">
            <p className="text-sm text-gray-600 mb-2"><span className="font-medium text-gray-900">From:</span> {MOCK_EMAIL_TEMPLATE.from}</p>
            <p className="text-sm text-gray-600 mb-2"><span className="font-medium text-gray-900">Subject:</span> {MOCK_EMAIL_TEMPLATE.subject}</p>
            <p className="text-sm text-gray-600"><span className="font-medium text-gray-900">Sent:</span> {formatDateTime(MOCK_RESERVATION_DATA.confirmationSentAt)}</p>
          </div>
        </div>

        {/* Reservation Details Card */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Reservation Details</h2>
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="text-indigo-600 hover:text-indigo-700 font-medium text-sm"
            >
              {showDetails ? 'Hide' : 'Show'} Details
            </button>
          </div>

          {showDetails && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Reservation ID</p>
                  <p className="text-gray-900 font-medium">{MOCK_RESERVATION_DATA.reservationId}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Guest Name</p>
                  <p className="text-gray-900 font-medium">{MOCK_RESERVATION_DATA.guestName}</p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Hotel</p>
                <p className="text-gray-900 font-medium">{MOCK_RESERVATION_DATA.hotelName}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Check-in</p>
                  <p className="text-gray-900 font-medium">{formatDate(MOCK_RESERVATION_DATA.checkInDate)}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Check-out</p>
                  <p className="text-gray-900 font-medium">{formatDate(MOCK_RESERVATION_DATA.checkOutDate)}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Room Type</p>
                  <p className="text-gray-900 font-medium">{MOCK_RESERVATION_DATA.roomType}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Room Number</p>
                  <p className="text-gray-900 font-medium">{MOCK_RESERVATION_DATA.roomNumber}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Number of Guests</p>
                  <p className="text-gray-900 font-medium">{MOCK_RESERVATION_DATA.numberOfGuests}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Number of Nights</p>
                  <p className="text-gray-900 font-medium">{MOCK_RESERVATION_DATA.numberOfNights}</p>
                </div>
              </div>

              {MOCK_RESERVATION_DATA.specialRequests && (
                <div className="border-t border-gray-200 pt-4">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Special Requests</p>
                  <p className="text-gray-900">{MOCK_RESERVATION_DATA.specialRequests}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Price Summary Card */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Price Summary</h2>
          <div className="space-y-3">
            <div className="flex justify-between text-gray-600">
              <span>${MOCK_RESERVATION_DATA.pricePerNight} × {MOCK_RESERVATION_DATA.numberOfNights} nights</span>
              <span>${MOCK_RESERVATION_DATA.pricePerNight * MOCK_RESERVATION_DATA.numberOfNights}</span>
            </div>
            <div className="border-t border-gray-200 pt-3 flex justify-between">
              <span className="font-semibold text-gray-900">Total</span>
              <span className="text-2xl font-bold text-indigo-600">${MOCK_RESERVATION_DATA.totalPrice}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleResendEmail}
            disabled={!emailSent}
            className="flex-1 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-medium rounded-lg transition-colors duration-200"
          >
            {emailSent ? 'Resend Confirmation Email' : 'Sending...'}
          </button>
          <button
            className="flex-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-900 font-medium rounded-lg transition-colors duration-200"
          >
            Download Confirmation
          </button>
        </div>

        {/* Footer Info */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Need help?</span> If you don't receive the confirmation email within a few minutes, please check your spam folder or contact our support team at support@grandplazahotel.com
          </p>
        </div>
      </div>
    </div>
  )
}