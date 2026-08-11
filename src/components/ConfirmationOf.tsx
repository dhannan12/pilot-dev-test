import React, { useState } from 'react'

const MOCK_RESERVATION_DATA = {
  reservationId: 'RES-2024-001234',
  guestName: 'John Doe',
  guestEmail: 'john.doe@example.com',
  hotelName: 'Grand Plaza Hotel',
  checkInDate: '2024-03-15',
  checkOutDate: '2024-03-18',
  roomType: 'Deluxe Suite',
  roomNumber: '512',
  numberOfGuests: 2,
  numberOfNights: 3,
  pricePerNight: 150,
  totalPrice: 450,
  confirmationSent: false,
  emailStatus: 'pending'
}

export default function ConfirmationOf() {
  const [reservation, setReservation] = useState(MOCK_RESERVATION_DATA)
  const [emailSent, setEmailSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSendConfirmation = () => {
    setLoading(true)
    setMessage('')
    
    setTimeout(() => {
      setReservation(prev => ({
        ...prev,
        confirmationSent: true,
        emailStatus: 'sent'
      }))
      setEmailSent(true)
      setMessage('Confirmation email sent successfully!')
      setLoading(false)
    }, 1500)
  }

  const handleResendConfirmation = () => {
    setLoading(true)
    setMessage('')
    
    setTimeout(() => {
      setMessage('Confirmation email resent successfully!')
      setLoading(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Reservation Confirmation</h1>
          <p className="text-gray-600">Email confirmation for your booking</p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Status Banner */}
          <div className={`p-4 text-white text-center font-semibold ${
            emailSent ? 'bg-green-500' : 'bg-blue-500'
          }`}>
            {emailSent ? '✓ Confirmation Sent' : 'Pending Confirmation'}
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8">
            {/* Message Alert */}
            {message && (
              <div className={`mb-6 p-4 rounded-lg text-sm font-medium ${
                message.includes('successfully')
                  ? 'bg-green-50 text-green-800 border border-green-200'
                  : 'bg-blue-50 text-blue-800 border border-blue-200'
              }`}>
                {message}
              </div>
            )}

            {/* Reservation Details */}
            <div className="space-y-6">
              {/* Guest Information */}
              <div className="border-b pb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Guest Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Guest Name</p>
                    <p className="text-base font-medium text-gray-900">{reservation.guestName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email Address</p>
                    <p className="text-base font-medium text-gray-900">{reservation.guestEmail}</p>
                  </div>
                </div>
              </div>

              {/* Reservation Details */}
              <div className="border-b pb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Reservation Details</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Reservation ID</p>
                    <p className="text-base font-medium text-gray-900">{reservation.reservationId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Hotel</p>
                    <p className="text-base font-medium text-gray-900">{reservation.hotelName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Check-in Date</p>
                    <p className="text-base font-medium text-gray-900">{reservation.checkInDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Check-out Date</p>
                    <p className="text-base font-medium text-gray-900">{reservation.checkOutDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Room Type</p>
                    <p className="text-base font-medium text-gray-900">{reservation.roomType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Room Number</p>
                    <p className="text-base font-medium text-gray-900">{reservation.roomNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Number of Guests</p>
                    <p className="text-base font-medium text-gray-900">{reservation.numberOfGuests}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Number of Nights</p>
                    <p className="text-base font-medium text-gray-900">{reservation.numberOfNights}</p>
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700">Price per Night</span>
                  <span className="font-medium text-gray-900">${reservation.pricePerNight}</span>
                </div>
                <div className="flex justify-between items-center mb-3 pb-3 border-b">
                  <span className="text-gray-700">Number of Nights</span>
                  <span className="font-medium text-gray-900">{reservation.numberOfNights}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900">Total Price</span>
                  <span className="text-2xl font-bold text-indigo-600">${reservation.totalPrice}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 space-y-3">
              {!emailSent ? (
                <button
                  onClick={handleSendConfirmation}
                  disabled={loading}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-105 disabled:scale-100"
                >
                  {loading ? 'Sending...' : 'Send Confirmation Email'}
                </button>
              ) : (
                <button
                  onClick={handleResendConfirmation}
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-105 disabled:scale-100"
                >
                  {loading ? 'Resending...' : 'Resend Confirmation Email'}
                </button>
              )}
              <button
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold py-3 px-4 rounded-lg transition duration-200 ease-in-out"
              >
                Back to Reservations
              </button>
            </div>

            {/* Footer Note */}
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-900">
                <span className="font-semibold">Note:</span> A confirmation email will be sent to {reservation.guestEmail} with all reservation details and important information about your stay.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}