/**
 * UserCancelsA — Class cancellation interface with policy violation warnings
 *
 * Features: booked class list, late cancellation warnings, penalty fees, cancellation confirmation, booking history
 *
 * Ticket: SCRUM-1035 | Branch: proto/SCRUM-1028
 */

import { useState } from 'react'

interface ClassBooking {
  id: string
  className: string
  instructor: string
  dateTime: string
  hoursUntilClass: number
  cancellationDeadline: string
  cancellationFee: number
  status: 'upcoming' | 'cancelled'
}

const mockBookings: ClassBooking[] = [
  {
    id: 'b001',
    className: 'Yoga Flow',
    instructor: 'Sarah Johnson',
    dateTime: '2026-08-18 10:00 AM',
    hoursUntilClass: 17,
    cancellationDeadline: '2026-08-17 10:00 AM',
    cancellationFee: 15,
    status: 'upcoming'
  },
  {
    id: 'b002',
    className: 'HIIT Training',
    instructor: 'Mike Chen',
    dateTime: '2026-08-18 06:00 PM',
    hoursUntilClass: 25,
    cancellationDeadline: '2026-08-17 06:00 PM',
    cancellationFee: 20,
    status: 'upcoming'
  },
  {
    id: 'b003',
    className: 'Spin Class',
    instructor: 'Emily Rodriguez',
    dateTime: '2026-08-19 07:00 AM',
    hoursUntilClass: 38,
    cancellationDeadline: '2026-08-18 07:00 AM',
    cancellationFee: 15,
    status: 'upcoming'
  },
  {
    id: 'b004',
    className: 'Pilates Core',
    instructor: 'Jessica Lee',
    dateTime: '2026-08-20 12:00 PM',
    hoursUntilClass: 67,
    cancellationDeadline: '2026-08-19 12:00 PM',
    cancellationFee: 12,
    status: 'upcoming'
  },
  {
    id: 'b005',
    className: 'Boxing Bootcamp',
    instructor: 'Carlos Martinez',
    dateTime: '2026-08-21 05:30 PM',
    hoursUntilClass: 96,
    cancellationDeadline: '2026-08-20 05:30 PM',
    cancellationFee: 25,
    status: 'upcoming'
  },
  {
    id: 'b006',
    className: 'Yoga Flow',
    instructor: 'Sarah Johnson',
    dateTime: '2026-08-15 10:00 AM',
    hoursUntilClass: -55,
    cancellationDeadline: '2026-08-14 10:00 AM',
    cancellationFee: 0,
    status: 'cancelled'
  }
]

export default function UserCancelsA() {
  const [bookings, setBookings] = useState<ClassBooking[]>(mockBookings)
  const [selectedBooking, setSelectedBooking] = useState<ClassBooking | null>(null)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [cancelReason, setCancelReason] = useState('')
  const [acknowledgePolicy, setAcknowledgePolicy] = useState(false)

  const handleCancelClick = (booking: ClassBooking) => {
    setSelectedBooking(booking)
    setShowConfirmation(true)
    setCancelReason('')
    setAcknowledgePolicy(false)
  }

  const handleConfirmCancellation = () => {
    if (!selectedBooking || !acknowledgePolicy) return

    setBookings(bookings.map(b => 
      b.id === selectedBooking.id 
        ? { ...b, status: 'cancelled' as const }
        : b
    ))

    setShowConfirmation(false)
    setSelectedBooking(null)
    setCancelReason('')
    setAcknowledgePolicy(false)
  }

  const handleCloseModal = () => {
    setShowConfirmation(false)
    setSelectedBooking(null)
    setCancelReason('')
    setAcknowledgePolicy(false)
  }

  const isPastDeadline = (booking: ClassBooking) => {
    return booking.hoursUntilClass < 24
  }

  const upcomingBookings = bookings.filter(b => b.status === 'upcoming')
  const cancelledBookings = bookings.filter(b => b.status === 'cancelled')

  return (
    <div data-testid="usercancelsa" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Class Bookings</h1>
          <p className="text-gray-600">Manage your upcoming fitness classes</p>
        </div>

        {/* Cancellation Policy Notice */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
          <h3 className="text-amber-900 font-semibold mb-2">⚠️ Cancellation Policy</h3>
          <p className="text-amber-800 text-sm">
            Classes must be cancelled at least 24 hours in advance to avoid cancellation fees. 
            Late cancellations will be charged the full class fee.
          </p>
        </div>

        {/* Upcoming Bookings */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Upcoming Classes</h2>
          {upcomingBookings.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
              No upcoming bookings
            </div>
          ) : (
            <div data-testid="usercancelsa-list" className="space-y-4">
              {upcomingBookings.map(booking => (
                <div
                  key={booking.id}
                  data-testid="usercancelsa-item"
                  className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">
                        {booking.className}
                      </h3>
                      <p className="text-gray-600 mb-2">with {booking.instructor}</p>
                      <div className="space-y-1 text-sm text-gray-500">
                        <p>📅 {booking.dateTime}</p>
                        <p>🕐 {booking.hoursUntilClass} hours until class</p>
                        <p>⏰ Cancel by: {booking.cancellationDeadline}</p>
                      </div>
                      {isPastDeadline(booking) && (
                        <div className="mt-3 bg-red-50 border border-red-200 rounded p-2">
                          <p className="text-red-700 text-sm font-medium">
                            ⚠️ Past cancellation deadline - ${booking.cancellationFee} fee applies
                          </p>
                        </div>
                      )}
                    </div>
                    <button
                      data-testid="usercancelsa-cancel"
                      onClick={() => handleCancelClick(booking)}
                      className="ml-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                      Cancel Booking
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Cancelled Bookings History */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Cancellation History</h2>
          {cancelledBookings.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
              No cancelled bookings
            </div>
          ) : (
            <div data-testid="usercancelsa-history-list" className="space-y-4">
              {cancelledBookings.map(booking => (
                <div
                  key={booking.id}
                  data-testid="usercancelsa-history-item"
                  className="bg-gray-100 rounded-lg p-6 opacity-75"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-700 mb-1">
                        {booking.className} <span className="text-red-600">(Cancelled)</span>
                      </h3>
                      <p className="text-gray-600 text-sm">with {booking.instructor}</p>
                      <p className="text-gray-500 text-sm">📅 {booking.dateTime}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Cancellation Confirmation Modal */}
      {showConfirmation && selectedBooking && (
        <div
          data-testid="usercancelsa-modal"
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        >
          <div className="bg-white rounded-lg max-w-lg w-full p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Confirm Cancellation
            </h2>

            <div className="mb-6">
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <h3 className="font-semibold text-gray-900 mb-2">
                  {selectedBooking.className}
                </h3>
                <p className="text-gray-600 text-sm mb-1">
                  Instructor: {selectedBooking.instructor}
                </p>
                <p className="text-gray-600 text-sm">
                  Date & Time: {selectedBooking.dateTime}
                </p>
              </div>

              {isPastDeadline(selectedBooking) && (
                <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4 mb-4">
                  <h4 className="text-red-900 font-bold mb-2 flex items-center">
                    <span className="text-2xl mr-2">⚠️</span>
                    Policy Violation Warning
                  </h4>
                  <p className="text-red-800 text-sm mb-2">
                    You are canceling outside the 24-hour cancellation window.
                  </p>
                  <p className="text-red-900 font-semibold text-lg">
                    Cancellation Fee: ${selectedBooking.cancellationFee}
                  </p>
                  <p className="text-red-700 text-sm mt-2">
                    This fee will be charged to your account immediately.
                  </p>
                </div>
              )}

              <div className="mb-4">
                <label
                  htmlFor="cancel-reason"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Reason for cancellation (optional)
                </label>
                <textarea
                  id="cancel-reason"
                  data-testid="usercancelsa-reason"
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  rows={3}
                  placeholder="Let us know why you're cancelling..."
                />
              </div>

              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="acknowledge-policy"
                  data-testid="usercancelsa-acknowledge"
                  checked={acknowledgePolicy}
                  onChange={(e) => setAcknowledgePolicy(e.target.checked)}
                  className="mt-1 h-4 w-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                />
                <label
                  htmlFor="acknowledge-policy"
                  className="ml-2 text-sm text-gray-700"
                >
                  {isPastDeadline(selectedBooking) ? (
                    <>
                      I understand that I will be charged a ${selectedBooking.cancellationFee} 
                      cancellation fee for canceling outside the policy window.
                    </>
                  ) : (
                    <>
                      I confirm that I want to cancel this booking. No fees will be charged.
                    </>
                  )}
                </label>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                data-testid="usercancelsa-confirm"
                onClick={handleConfirmCancellation}
                disabled={!acknowledgePolicy}
                className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
                  acknowledgePolicy
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {isPastDeadline(selectedBooking)
                  ? `Confirm & Pay $${selectedBooking.cancellationFee}`
                  : 'Confirm Cancellation'}
              </button>
              <button
                data-testid="usercancelsa-close"
                onClick={handleCloseModal}
                className="flex-1 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                Keep Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
