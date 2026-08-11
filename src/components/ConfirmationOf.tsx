import React, { useState } from 'react';

const MOCK_RESERVATION_DATA = {
  reservationId: 'RES-2024-001234',
  guestName: 'John Doe',
  guestEmail: 'john.doe@example.com',
  hotelName: 'Grand Plaza Hotel',
  checkInDate: '2024-12-20',
  checkOutDate: '2024-12-25',
  roomType: 'Deluxe Suite',
  roomNumber: '512',
  numberOfGuests: 2,
  numberOfNights: 5,
  pricePerNight: 150,
  totalPrice: 750,
  currency: 'USD',
  specialRequests: 'Late checkout preferred',
  confirmationSentAt: new Date().toISOString(),
};

const MOCK_EMAIL_TEMPLATE = {
  subject: 'Reservation Confirmation - Grand Plaza Hotel',
  from: 'reservations@grandplazahotel.com',
  to: MOCK_RESERVATION_DATA.guestEmail,
  status: 'sent',
  sentTime: new Date().toLocaleString(),
};

export default function ConfirmationOf() {
  const [emailSent, setEmailSent] = useState(true);
  const [showDetails, setShowDetails] = useState(false);

  const handleResendEmail = () => {
    setEmailSent(false);
    setTimeout(() => {
      setEmailSent(true);
    }, 1500);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Reservation Confirmed</h1>
          <p className="text-gray-600">Your booking confirmation has been sent to your email</p>
        </div>

        {/* Email Status Card */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              {emailSent ? (
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                  <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              ) : (
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 animate-pulse">
                  <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900">
                {emailSent ? 'Confirmation Email Sent' : 'Sending Email...'}
              </h3>
              <p className="text-gray-600 mt-1">
                Sent to: <span className="font-medium text-gray-900">{MOCK_EMAIL_TEMPLATE.to}</span>
              </p>
              <p className="text-sm text-gray-500 mt-1">Subject: {MOCK_EMAIL_TEMPLATE.subject}</p>
              {emailSent && (
                <p className="text-sm text-gray-500 mt-1">Sent at: {MOCK_EMAIL_TEMPLATE.sentTime}</p>
              )}
            </div>
          </div>
        </div>

        {/* Reservation Details Card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
          <div className="bg-indigo-600 px-6 py-4">
            <h2 className="text-xl font-bold text-white">Reservation Details</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-sm text-gray-500 uppercase tracking-wide">Reservation ID</p>
                <p className="text-lg font-semibold text-gray-900 mt-1">{MOCK_RESERVATION_DATA.reservationId}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 uppercase tracking-wide">Guest Name</p>
                <p className="text-lg font-semibold text-gray-900 mt-1">{MOCK_RESERVATION_DATA.guestName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 uppercase tracking-wide">Hotel</p>
                <p className="text-lg font-semibold text-gray-900 mt-1">{MOCK_RESERVATION_DATA.hotelName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 uppercase tracking-wide">Room Type</p>
                <p className="text-lg font-semibold text-gray-900 mt-1">{MOCK_RESERVATION_DATA.roomType}</p>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="font-semibold text-gray-900 mb-4">Stay Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wide">Check-in</p>
                  <p className="text-base font-medium text-gray-900 mt-1">{formatDate(MOCK_RESERVATION_DATA.checkInDate)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wide">Check-out</p>
                  <p className="text-base font-medium text-gray-900 mt-1">{formatDate(MOCK_RESERVATION_DATA.checkOutDate)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wide">Number of Nights</p>
                  <p className="text-base font-medium text-gray-900 mt-1">{MOCK_RESERVATION_DATA.numberOfNights}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wide">Number of Guests</p>
                  <p className="text-base font-medium text-gray-900 mt-1">{MOCK_RESERVATION_DATA.numberOfGuests}</p>
                </div>
              </div>
            </div>

            {MOCK_RESERVATION_DATA.specialRequests && (
              <div className="border-t border-gray-200 pt-6 mt-6">
                <p className="text-sm text-gray-500 uppercase tracking-wide">Special Requests</p>
                <p className="text-base text-gray-900 mt-2">{MOCK_RESERVATION_DATA.specialRequests}</p>
              </div>
            )}
          </div>
        </div>

        {/* Pricing Card */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h3 className="font-semibold text-gray-900 mb-4">Price Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between text-gray-600">
              <span>{MOCK_RESERVATION_DATA.currency} {MOCK_RESERVATION_DATA.pricePerNight} × {MOCK_RESERVATION_DATA.numberOfNights} nights</span>
              <span>{MOCK_RESERVATION_DATA.currency} {MOCK_RESERVATION_DATA.totalPrice}</span>
            </div>
            <div className="border-t border-gray-200 pt-3 flex justify-between">
              <span className="font-semibold text-gray-900">Total</span>
              <span className="text-2xl font-bold text-indigo-600">{MOCK_RESERVATION_DATA.currency} {MOCK_RESERVATION_DATA.totalPrice}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleResendEmail}
            disabled={!emailSent}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 ease-in-out"
          >
            {emailSent ? 'Resend Confirmation Email' : 'Sending...'}
          </button>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold py-3 px-6 rounded-lg transition duration-200 ease-in-out"
          >
            {showDetails ? 'Hide Email Preview' : 'View Email Preview'}
          </button>
        </div>

        {/* Email Preview */}
        {showDetails && (
          <div className="mt-6 bg-white rounded-lg shadow-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Email Preview</h3>
            <div className="bg-gray-50 rounded p-4 border border-gray-200">
              <div className="text-sm text-gray-600 space-y-2">
                <p><span className="font-semibold">From:</span> {MOCK_EMAIL_TEMPLATE.from}</p>
                <p><span className="font-semibold">To:</span> {MOCK_EMAIL_TEMPLATE.to}</p>
                <p><span className="font-semibold">Subject:</span> {MOCK_EMAIL_TEMPLATE.subject}</p>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-gray-700 whitespace-pre-wrap text-sm leading-relaxed">
                  {`Dear ${MOCK_RESERVATION_DATA.guestName},\n\nThank you for your reservation! Your booking at ${MOCK_RESERVATION_DATA.hotelName} has been confirmed.\n\nReservation ID: ${MOCK_RESERVATION_DATA.reservationId}\nRoom: ${MOCK_RESERVATION_DATA.roomType} (${MOCK_RESERVATION_DATA.roomNumber})\nCheck-in: ${formatDate(MOCK_RESERVATION_DATA.checkInDate)}\nCheck-out: ${formatDate(MOCK_RESERVATION_DATA.checkOutDate)}\nTotal: ${MOCK_RESERVATION_DATA.currency} ${MOCK_RESERVATION_DATA.totalPrice}\n\nWe look forward to your arrival!\n\nBest regards,\nGrand Plaza Hotel Team`}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}