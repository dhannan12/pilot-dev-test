import React, { useState } from 'react';

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
  specialRequests: 'High floor preferred, late checkout if available',
  confirmationSentAt: new Date().toLocaleString(),
};

export default function ConfirmationOf() {
  const [emailSent, setEmailSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showDetails, setShowDetails] = useState(true);

  const handleSendConfirmation = () => {
    setIsLoading(true);
    setTimeout(() => {
      setEmailSent(true);
      setIsLoading(false);
    }, 1500);
  };

  const handleResendEmail = () => {
    setEmailSent(false);
    handleSendConfirmation();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Reservation Confirmation</h1>
          <p className="text-gray-600">Your booking details and email confirmation</p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Status Banner */}
          <div className={`p-6 text-white text-center ${
            emailSent ? 'bg-green-500' : 'bg-blue-500'
          }`}>
            <div className="text-5xl mb-2">{emailSent ? '✓' : '📧'}</div>
            <h2 className="text-2xl font-bold mb-1">
              {emailSent ? 'Confirmation Email Sent!' : 'Ready to Send Confirmation'}
            </h2>
            <p className="text-sm opacity-90">
              {emailSent
                ? `Confirmation sent to ${MOCK_RESERVATION_DATA.guestEmail}`
                : 'Send your reservation confirmation via email'}
            </p>
          </div>

          {/* Reservation Details */}
          <div className="p-6 sm:p-8">
            {/* Guest Information */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b-2 border-indigo-200 pb-2">
                Guest Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 font-medium">Guest Name</p>
                  <p className="text-gray-800 font-semibold">{MOCK_RESERVATION_DATA.guestName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Email Address</p>
                  <p className="text-gray-800 font-semibold">{MOCK_RESERVATION_DATA.guestEmail}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Reservation ID</p>
                  <p className="text-gray-800 font-semibold">{MOCK_RESERVATION_DATA.reservationId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Number of Guests</p>
                  <p className="text-gray-800 font-semibold">{MOCK_RESERVATION_DATA.numberOfGuests}</p>
                </div>
              </div>
            </div>

            {/* Hotel & Room Details */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b-2 border-indigo-200 pb-2">
                Hotel & Room Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 font-medium">Hotel Name</p>
                  <p className="text-gray-800 font-semibold">{MOCK_RESERVATION_DATA.hotelName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Room Type</p>
                  <p className="text-gray-800 font-semibold">{MOCK_RESERVATION_DATA.roomType}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Room Number</p>
                  <p className="text-gray-800 font-semibold">{MOCK_RESERVATION_DATA.roomNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Number of Nights</p>
                  <p className="text-gray-800 font-semibold">{MOCK_RESERVATION_DATA.numberOfNights}</p>
                </div>
              </div>
            </div>

            {/* Dates */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b-2 border-indigo-200 pb-2">
                Stay Dates
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 font-medium">Check-in Date</p>
                  <p className="text-gray-800 font-semibold">{MOCK_RESERVATION_DATA.checkInDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Check-out Date</p>
                  <p className="text-gray-800 font-semibold">{MOCK_RESERVATION_DATA.checkOutDate}</p>
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="mb-8 bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Pricing Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-gray-700">
                  <span>Price per Night</span>
                  <span>${MOCK_RESERVATION_DATA.pricePerNight}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Number of Nights</span>
                  <span>×{MOCK_RESERVATION_DATA.numberOfNights}</span>
                </div>
                <div className="border-t-2 border-gray-200 pt-2 mt-2 flex justify-between text-xl font-bold text-indigo-600">
                  <span>Total Price</span>
                  <span>${MOCK_RESERVATION_DATA.totalPrice}</span>
                </div>
              </div>
            </div>

            {/* Special Requests */}
            {MOCK_RESERVATION_DATA.specialRequests && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Special Requests</h3>
                <p className="text-gray-700 bg-blue-50 p-3 rounded border-l-4 border-blue-400">
                  {MOCK_RESERVATION_DATA.specialRequests}
                </p>
              </div>
            )}

            {/* Confirmation Status */}
            {emailSent && (
              <div className="mb-8 bg-green-50 border-l-4 border-green-400 p-4 rounded">
                <p className="text-green-800 font-semibold">✓ Confirmation email sent successfully</p>
                <p className="text-green-700 text-sm mt-1">
                  Sent at: {MOCK_RESERVATION_DATA.confirmationSentAt}
                </p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="bg-gray-50 p-6 sm:p-8 border-t border-gray-200 flex flex-col sm:flex-row gap-3">
            <button
              onClick={emailSent ? handleResendEmail : handleSendConfirmation}
              disabled={isLoading}
              className={`flex-1 py-3 px-6 rounded-lg font-semibold text-white transition-all duration-200 ${
                isLoading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : emailSent
                  ? 'bg-blue-500 hover:bg-blue-600 active:scale-95'
                  : 'bg-indigo-600 hover:bg-indigo-700 active:scale-95'
              }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <span className="inline-block animate-spin mr-2">⟳</span>
                  Sending...
                </span>
              ) : emailSent ? (
                'Resend Confirmation Email'
              ) : (
                'Send Confirmation Email'
              )}
            </button>
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="flex-1 py-3 px-6 rounded-lg font-semibold text-gray-700 bg-white border-2 border-gray-300 hover:bg-gray-100 transition-all duration-200 active:scale-95"
            >
              {showDetails ? 'Hide Details' : 'Show Details'}
            </button>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-6 text-center text-gray-600 text-sm">
          <p>A confirmation email will be sent to the guest's email address with all reservation details.</p>
        </div>
      </div>
    </div>
  );
}