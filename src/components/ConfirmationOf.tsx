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
  confirmationCode: 'GP-2024-ABC123XYZ',
  bookingDate: '2024-12-01',
  specialRequests: 'Late checkout if available, high floor preferred'
}

const MOCK_EMAIL_TEMPLATE = {
  subject: 'Reservation Confirmation - Grand Plaza Hotel',
  status: 'sent',
  sentAt: '2024-12-01T14:30:00Z',
  recipientEmail: 'john.doe@example.com'
}

export default function ConfirmationOf() {
  const [emailSent, setEmailSent] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleSendConfirmation = () => {
    setEmailSent(true)
    setTimeout(() => {
      setCopied(false)
    }, 3000)
  }

  const handleCopyConfirmationCode = () => {
    navigator.clipboard.writeText(MOCK_RESERVATION_DATA.confirmationCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Reservation Confirmation</h1>
          <p className="text-gray-600">Your booking details and email confirmation</p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Status Banner */}
          <div className={`p-6 ${ emailSent ? 'bg-green-50 border-b-4 border-green-500' : 'bg-blue-50 border-b-4 border-blue-500'}`}>
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${ emailSent ? 'bg-green-200' : 'bg-blue-200'}`}>
                <span className={`text-xl font-bold ${ emailSent ? 'text-green-700' : 'text-blue-700'}`}>
                  {emailSent ? '✓' : '📧'}
                </span>
              </div>
              <div>
                <h2 className={`text-lg font-semibold ${ emailSent ? 'text-green-900' : 'text-blue-900'}`}>
                  {emailSent ? 'Confirmation Email Sent' : 'Ready to Send Confirmation'}
                </h2>
                <p className={`text-sm ${ emailSent ? 'text-green-700' : 'text-blue-700'}`}>
                  {emailSent ? `Sent to ${MOCK_EMAIL_TEMPLATE.recipientEmail}` : 'Click below to send confirmation email'}
                </p>
              </div>
            </div>
          </div>

          {/* Confirmation Code Section */}
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Confirmation Code</h3>
            <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg">
              <code className="flex-1 text-lg font-mono font-bold text-gray-900">{MOCK_RESERVATION_DATA.confirmationCode}</code>
              <button
                onClick={handleCopyConfirmationCode}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>

          {/* Guest Information */}
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">Guest Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Guest Name</p>
                <p className="text-gray-900 font-medium">{MOCK_RESERVATION_DATA.guestName}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Email</p>
                <p className="text-gray-900 font-medium">{MOCK_RESERVATION_DATA.guestEmail}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Number of Guests</p>
                <p className="text-gray-900 font-medium">{MOCK_RESERVATION_DATA.numberOfGuests}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Booking Date</p>
                <p className="text-gray-900 font-medium">{formatDate(MOCK_RESERVATION_DATA.bookingDate)}</p>
              </div>
            </div>
          </div>

          {/* Hotel & Room Details */}
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">Hotel & Room Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Hotel</p>
                <p className="text-gray-900 font-medium">{MOCK_RESERVATION_DATA.hotelName}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Room Type</p>
                <p className="text-gray-900 font-medium">{MOCK_RESERVATION_DATA.roomType}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Room Number</p>
                <p className="text-gray-900 font-medium">{MOCK_RESERVATION_DATA.roomNumber}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Number of Nights</p>
                <p className="text-gray-900 font-medium">{MOCK_RESERVATION_DATA.numberOfNights}</p>
              </div>
            </div>
          </div>

          {/* Stay Dates */}
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">Stay Dates</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Check-In</p>
                <p className="text-gray-900 font-medium">{formatDate(MOCK_RESERVATION_DATA.checkInDate)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Check-Out</p>
                <p className="text-gray-900 font-medium">{formatDate(MOCK_RESERVATION_DATA.checkOutDate)}</p>
              </div>
            </div>
          </div>

          {/* Pricing Summary */}
          <div className="p-6 border-b border-gray-200 bg-gray-50">
            <h3 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">Price Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-gray-700">
                <span>${MOCK_RESERVATION_DATA.pricePerNight} × {MOCK_RESERVATION_DATA.numberOfNights} nights</span>
                <span>${MOCK_RESERVATION_DATA.pricePerNight * MOCK_RESERVATION_DATA.numberOfNights}</span>
              </div>
              <div className="border-t border-gray-300 pt-2 flex justify-between text-lg font-bold text-gray-900">
                <span>Total</span>
                <span>${MOCK_RESERVATION_DATA.totalPrice}</span>
              </div>
            </div>
          </div>

          {/* Special Requests */}
          {MOCK_RESERVATION_DATA.specialRequests && (
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Special Requests</h3>
              <p className="text-gray-700 bg-blue-50 p-3 rounded-lg">{MOCK_RESERVATION_DATA.specialRequests}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="p-6 bg-gray-50 flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleSendConfirmation}
              className="flex-1 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
            >
              {emailSent ? '✓ Email Sent' : 'Send Confirmation Email'}
            </button>
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="flex-1 px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg border-2 border-indigo-600 hover:bg-indigo-50 transition-colors"
            >
              {showDetails ? 'Hide Details' : 'View Email Template'}
            </button>
          </div>

          {/* Email Template Preview */}
          {showDetails && (
            <div className="p-6 bg-gray-100 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">Email Template Preview</h3>
              <div className="bg-white p-4 rounded-lg border border-gray-300 font-mono text-sm">
                <p className="text-gray-600 mb-2"><strong>To:</strong> {MOCK_EMAIL_TEMPLATE.recipientEmail}</p>
                <p className="text-gray-600 mb-4"><strong>Subject:</strong> {MOCK_EMAIL_TEMPLATE.subject}</p>
                <div className="border-t border-gray-300 pt-4 text-gray-700 whitespace-pre-wrap text-xs leading-relaxed">
{`Dear ${MOCK_RESERVATION_DATA.guestName},

Thank you for your reservation! We are delighted to confirm your booking.

RESERVATION DETAILS:
Confirmation Code: ${MOCK_RESERVATION_DATA.confirmationCode}
Reservation ID: ${MOCK_RESERVATION_DATA.reservationId}

HOTEL INFORMATION:
Hotel: ${MOCK_RESERVATION_DATA.hotelName}
Room Type: ${MOCK_RESERVATION_DATA.roomType}
Room Number: ${MOCK_RESERVATION_DATA.roomNumber}

STAY DATES:
Check-In: ${formatDate(MOCK_RESERVATION_DATA.checkInDate)}
Check-Out: ${formatDate(MOCK_RESERVATION_DATA.checkOutDate)}
Number of Nights: ${MOCK_RESERVATION_DATA.numberOfNights}

GUEST INFORMATION:
Number of Guests: ${MOCK_RESERVATION_DATA.numberOfGuests}

PRICING:
Price per Night: $${MOCK_RESERVATION_DATA.pricePerNight}
Total Amount: $${MOCK_RESERVATION_DATA.totalPrice}

Please keep this confirmation for your records. If you have any questions, please contact us.

Best regards,
The ${MOCK_RESERVATION_DATA.hotelName} Team`}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Note */}
        <div className="mt-6 text-center text-gray-600 text-sm">
          <p>A confirmation email will be sent to <strong>{MOCK_RESERVATION_DATA.guestEmail}</strong></p>
          <p className="mt-2">Reservation ID: <strong>{MOCK_RESERVATION_DATA.reservationId}</strong></p>
        </div>
      </div>
    </div>
  )
}