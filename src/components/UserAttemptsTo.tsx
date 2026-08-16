/**
 * UserAttemptsTo — Displays user attempt to book a class with expired membership and redirects
 *
 * Features: membership status check, class booking validation, expiry notification, renewal redirect, booking history
 *
 * Ticket: SCRUM-960 | Branch: proto/SCRUM-951
 */

import { useState } from 'react'

interface ClassSchedule {
  id: string
  name: string
  instructor: string
  time: string
  date: string
  capacity: number
  enrolled: number
}

interface Membership {
  id: string
  userId: string
  type: string
  status: 'active' | 'expired' | 'pending'
  expiryDate: string
  startDate: string
}

interface BookingAttempt {
  id: string
  classId: string
  className: string
  attemptTime: string
  status: 'blocked' | 'success' | 'failed'
  reason?: string
}

const mockClasses: ClassSchedule[] = [
  {
    id: 'class-1',
    name: 'Yoga Flow',
    instructor: 'Sarah Johnson',
    time: '09:00 AM',
    date: '2026-08-17',
    capacity: 20,
    enrolled: 15
  },
  {
    id: 'class-2',
    name: 'HIIT Training',
    instructor: 'Mike Thompson',
    time: '10:30 AM',
    date: '2026-08-17',
    capacity: 15,
    enrolled: 12
  },
  {
    id: 'class-3',
    name: 'Spin Class',
    instructor: 'Lisa Chen',
    time: '06:00 PM',
    date: '2026-08-17',
    capacity: 25,
    enrolled: 20
  },
  {
    id: 'class-4',
    name: 'Pilates',
    instructor: 'Emily Davis',
    time: '11:00 AM',
    date: '2026-08-18',
    capacity: 18,
    enrolled: 10
  },
  {
    id: 'class-5',
    name: 'Zumba Dance',
    instructor: 'Carlos Rodriguez',
    time: '07:00 PM',
    date: '2026-08-18',
    capacity: 30,
    enrolled: 25
  }
]

const mockMembership: Membership = {
  id: 'mem-001',
  userId: 'user-123',
  type: 'Premium',
  status: 'expired',
  expiryDate: '2026-08-10',
  startDate: '2025-08-10'
}

const mockBookingAttempts: BookingAttempt[] = [
  {
    id: 'attempt-1',
    classId: 'class-1',
    className: 'Yoga Flow',
    attemptTime: '2026-08-16 08:30 AM',
    status: 'blocked',
    reason: 'Membership expired on 2026-08-10'
  },
  {
    id: 'attempt-2',
    classId: 'class-2',
    className: 'HIIT Training',
    attemptTime: '2026-08-16 09:15 AM',
    status: 'blocked',
    reason: 'Membership expired on 2026-08-10'
  },
  {
    id: 'attempt-3',
    classId: 'class-4',
    className: 'Pilates',
    attemptTime: '2026-08-16 09:45 AM',
    status: 'blocked',
    reason: 'Membership expired on 2026-08-10'
  },
  {
    id: 'attempt-4',
    classId: 'class-5',
    className: 'Zumba Dance',
    attemptTime: '2026-08-16 10:00 AM',
    status: 'blocked',
    reason: 'Membership expired on 2026-08-10'
  },
  {
    id: 'attempt-5',
    classId: 'class-3',
    className: 'Spin Class',
    attemptTime: '2026-08-16 10:30 AM',
    status: 'blocked',
    reason: 'Membership expired on 2026-08-10'
  }
]

export default function UserAttemptsTo() {
  const [selectedClass, setSelectedClass] = useState<string | null>(null)
  const [showExpiredModal, setShowExpiredModal] = useState(false)
  const [bookingAttempts, setBookingAttempts] = useState<BookingAttempt[]>(mockBookingAttempts)
  const [redirected, setRedirected] = useState(false)

  const handleBookClass = (classItem: ClassSchedule) => {
    setSelectedClass(classItem.id)
    
    if (mockMembership.status === 'expired') {
      const newAttempt: BookingAttempt = {
        id: `attempt-${Date.now()}`,
        classId: classItem.id,
        className: classItem.name,
        attemptTime: new Date().toLocaleString(),
        status: 'blocked',
        reason: `Membership expired on ${mockMembership.expiryDate}`
      }
      setBookingAttempts([newAttempt, ...bookingAttempts])
      setShowExpiredModal(true)
    }
  }

  const handleRenewMembership = () => {
    setRedirected(true)
    setShowExpiredModal(false)
  }

  const handleCloseModal = () => {
    setShowExpiredModal(false)
    setSelectedClass(null)
  }

  if (redirected) {
    return (
      <div data-testid="userattemptsto" className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-8 text-center">
            <div className="text-6xl mb-4">🔄</div>
            <h2 className="text-2xl font-bold text-blue-900 mb-4">Redirecting to Renewal Page</h2>
            <p className="text-blue-700 mb-6">
              Please renew your membership to continue booking classes.
            </p>
            <div className="bg-white rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-600 mb-2">Membership Details</p>
              <p className="font-semibold text-gray-900">Type: {mockMembership.type}</p>
              <p className="text-red-600 font-semibold">Expired: {mockMembership.expiryDate}</p>
            </div>
            <button
              data-testid="userattemptsto-back"
              onClick={() => setRedirected(false)}
              className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Back to Classes
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div data-testid="userattemptsto" className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Book a Class</h1>
          <p className="text-gray-600">Select a class to book your spot</p>
        </header>

        {/* Membership Status Warning */}
        <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4 mb-6">
          <div className="flex items-start">
            <div className="text-2xl mr-3">⚠️</div>
            <div className="flex-1">
              <h3 className="font-bold text-red-900 mb-1">Membership Expired</h3>
              <p className="text-red-700 text-sm mb-2">
                Your {mockMembership.type} membership expired on {mockMembership.expiryDate}.
                You need an active membership to book classes.
              </p>
              <button
                data-testid="userattemptsto-renew"
                onClick={handleRenewMembership}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-semibold"
              >
                Renew Membership
              </button>
            </div>
          </div>
        </div>

        {/* Available Classes */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Available Classes</h2>
          <ul data-testid="userattemptsto-list" className="space-y-4">
            {mockClasses.map((classItem) => (
              <li
                key={classItem.id}
                data-testid="userattemptsto-item"
                className="bg-white rounded-lg shadow p-6 border border-gray-200"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900">{classItem.name}</h3>
                    <p className="text-gray-600 text-sm">Instructor: {classItem.instructor}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-700">{classItem.date}</p>
                    <p className="text-sm text-gray-600">{classItem.time}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-600">
                    <span className="font-semibold">{classItem.enrolled}/{classItem.capacity}</span> spots filled
                  </div>
                  <button
                    data-testid="userattemptsto-book"
                    onClick={() => handleBookClass(classItem)}
                    className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                      selectedClass === classItem.id
                        ? 'bg-gray-400 text-white cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                    disabled={selectedClass === classItem.id}
                  >
                    {selectedClass === classItem.id ? 'Attempted' : 'Book Now'}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Booking Attempt History */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Booking Attempts</h2>
          <div className="bg-white rounded-lg shadow border border-gray-200">
            {bookingAttempts.length === 0 ? (
              <p className="p-6 text-gray-500 text-center">No booking attempts yet</p>
            ) : (
              <ul data-testid="userattemptsto-attempts-list" className="divide-y divide-gray-200">
                {bookingAttempts.map((attempt) => (
                  <li
                    key={attempt.id}
                    data-testid="userattemptsto-attempt-item"
                    className="p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{attempt.className}</h4>
                        <p className="text-sm text-gray-600 mt-1">{attempt.attemptTime}</p>
                        {attempt.reason && (
                          <p className="text-sm text-red-600 mt-1">❌ {attempt.reason}</p>
                        )}
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          attempt.status === 'blocked'
                            ? 'bg-red-100 text-red-800'
                            : attempt.status === 'success'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {attempt.status.toUpperCase()}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Expired Membership Modal */}
      {showExpiredModal && (
        <div
          data-testid="userattemptsto-modal"
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        >
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="text-center mb-4">
              <div className="text-5xl mb-3">🚫</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Booking Failed</h3>
              <p className="text-gray-600">
                Your membership has expired and you cannot book classes.
              </p>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-red-800 mb-1">
                <strong>Membership Type:</strong> {mockMembership.type}
              </p>
              <p className="text-sm text-red-800">
                <strong>Expired On:</strong> {mockMembership.expiryDate}
              </p>
            </div>
            <div className="space-y-3">
              <button
                data-testid="userattemptsto-redirect"
                onClick={handleRenewMembership}
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Renew Membership Now
              </button>
              <button
                data-testid="userattemptsto-close"
                onClick={handleCloseModal}
                className="w-full px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
