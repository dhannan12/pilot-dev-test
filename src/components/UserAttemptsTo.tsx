/**
 * UserAttemptsTo — Handles user attempts to book a class exceeding capacity limit
 *
 * Features: class selection, capacity validation, booking attempt feedback, waitlist option, booking history
 *
 * Ticket: SCRUM-956 | Branch: proto/SCRUM-951
 */

import { useState } from 'react'

interface ClassBooking {
  id: string
  className: string
  instructor: string
  time: string
  date: string
  capacity: number
  currentBookings: number
  location: string
}

const MOCK_CLASSES: ClassBooking[] = [
  {
    id: 'cls-001',
    className: 'High-Intensity Interval Training',
    instructor: 'Sarah Martinez',
    time: '6:00 AM',
    date: '2026-08-17',
    capacity: 20,
    currentBookings: 20,
    location: 'Studio A'
  },
  {
    id: 'cls-002',
    className: 'Yoga Flow',
    instructor: 'Michael Chen',
    time: '7:30 AM',
    date: '2026-08-17',
    capacity: 15,
    currentBookings: 15,
    location: 'Studio B'
  },
  {
    id: 'cls-003',
    className: 'Spin Class',
    instructor: 'Jennifer Davis',
    time: '12:00 PM',
    date: '2026-08-17',
    capacity: 25,
    currentBookings: 25,
    location: 'Cycling Room'
  },
  {
    id: 'cls-004',
    className: 'Boxing Fundamentals',
    instructor: 'David Thompson',
    time: '5:30 PM',
    date: '2026-08-17',
    capacity: 12,
    currentBookings: 12,
    location: 'Training Area'
  },
  {
    id: 'cls-005',
    className: 'Power Pilates',
    instructor: 'Emily Rodriguez',
    time: '8:00 AM',
    date: '2026-08-18',
    capacity: 18,
    currentBookings: 18,
    location: 'Studio C'
  },
  {
    id: 'cls-006',
    className: 'Zumba Dance',
    instructor: 'Carlos Santos',
    time: '6:00 PM',
    date: '2026-08-18',
    capacity: 30,
    currentBookings: 28,
    location: 'Main Hall'
  }
]

export default function UserAttemptsTo() {
  const [selectedClass, setSelectedClass] = useState<ClassBooking | null>(null)
  const [bookingStatus, setBookingStatus] = useState<'idle' | 'attempting' | 'failed' | 'waitlisted'>('idle')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [onWaitlist, setOnWaitlist] = useState<string[]>([])

  const handleSelectClass = (classItem: ClassBooking) => {
    setSelectedClass(classItem)
    setBookingStatus('idle')
    setErrorMessage('')
  }

  const handleBookClass = () => {
    if (!selectedClass) return

    setBookingStatus('attempting')
    
    // Simulate booking attempt
    setTimeout(() => {
      if (selectedClass.currentBookings >= selectedClass.capacity) {
        setBookingStatus('failed')
        setErrorMessage(
          `Unable to book ${selectedClass.className}. This class has reached its maximum capacity of ${selectedClass.capacity} participants.`
        )
      }
    }, 500)
  }

  const handleJoinWaitlist = () => {
    if (!selectedClass) return

    setOnWaitlist([...onWaitlist, selectedClass.id])
    setBookingStatus('waitlisted')
    setErrorMessage('')
  }

  const isClassFull = (classItem: ClassBooking) => {
    return classItem.currentBookings >= classItem.capacity
  }

  const isOnWaitlist = (classId: string) => {
    return onWaitlist.includes(classId)
  }

  return (
    <div data-testid="userattemptsto" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Class Booking</h1>
          <p className="text-gray-600">Select a class to book your spot</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Class List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Available Classes</h2>
              <ul data-testid="userattemptsto-list" className="space-y-3">
                {MOCK_CLASSES.map((classItem) => (
                  <li
                    key={classItem.id}
                    data-testid="userattemptsto-item"
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      selectedClass?.id === classItem.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                    onClick={() => handleSelectClass(classItem)}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{classItem.className}</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          Instructor: {classItem.instructor}
                        </p>
                        <div className="flex gap-4 mt-2 text-sm text-gray-500">
                          <span>{classItem.date} at {classItem.time}</span>
                          <span>• {classItem.location}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-sm font-medium ${
                          isClassFull(classItem) ? 'text-red-600' : 'text-green-600'
                        }`}>
                          {classItem.currentBookings}/{classItem.capacity}
                        </div>
                        {isClassFull(classItem) && (
                          <span className="inline-block mt-1 px-2 py-1 text-xs font-semibold text-red-700 bg-red-100 rounded">
                            FULL
                          </span>
                        )}
                        {isOnWaitlist(classItem.id) && (
                          <span className="inline-block mt-1 px-2 py-1 text-xs font-semibold text-yellow-700 bg-yellow-100 rounded">
                            WAITLISTED
                          </span>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Booking Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Booking Details</h2>
              
              {!selectedClass ? (
                <div className="text-center py-8 text-gray-500">
                  <p>Select a class to view booking options</p>
                </div>
              ) : (
                <div>
                  <div className="mb-4 pb-4 border-b border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {selectedClass.className}
                    </h3>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p><span className="font-medium">Instructor:</span> {selectedClass.instructor}</p>
                      <p><span className="font-medium">Date:</span> {selectedClass.date}</p>
                      <p><span className="font-medium">Time:</span> {selectedClass.time}</p>
                      <p><span className="font-medium">Location:</span> {selectedClass.location}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium text-gray-700">Capacity</span>
                      <span className={`font-semibold ${
                        isClassFull(selectedClass) ? 'text-red-600' : 'text-gray-900'
                      }`}>
                        {selectedClass.currentBookings}/{selectedClass.capacity}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all ${
                          isClassFull(selectedClass) ? 'bg-red-500' : 'bg-green-500'
                        }`}
                        style={{
                          width: `${(selectedClass.currentBookings / selectedClass.capacity) * 100}%`
                        }}
                      />
                    </div>
                  </div>

                  {bookingStatus === 'failed' && errorMessage && (
                    <div 
                      data-testid="userattemptsto-error"
                      className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg"
                    >
                      <div className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        <div>
                          <p className="text-sm font-semibold text-red-800 mb-1">Booking Failed</p>
                          <p className="text-sm text-red-700">{errorMessage}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {bookingStatus === 'waitlisted' && (
                    <div 
                      data-testid="userattemptsto-success"
                      className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg"
                    >
                      <div className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <div>
                          <p className="text-sm font-semibold text-yellow-800 mb-1">Added to Waitlist</p>
                          <p className="text-sm text-yellow-700">
                            You've been added to the waitlist. We'll notify you if a spot opens up.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    {!isOnWaitlist(selectedClass.id) ? (
                      <>
                        <button
                          data-testid="userattemptsto-book"
                          onClick={handleBookClass}
                          disabled={bookingStatus === 'attempting'}
                          className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
                        >
                          {bookingStatus === 'attempting' ? 'Booking...' : 'Book Class'}
                        </button>
                        
                        {bookingStatus === 'failed' && (
                          <button
                            data-testid="userattemptsto-waitlist"
                            onClick={handleJoinWaitlist}
                            className="w-full px-4 py-2 bg-yellow-600 text-white font-medium rounded-lg hover:bg-yellow-700 transition-colors"
                          >
                            Join Waitlist
                          </button>
                        )}
                      </>
                    ) : (
                      <div className="text-center py-2 text-sm text-gray-600">
                        You are on the waitlist for this class
                      </div>
                    )}
                    
                    <button
                      data-testid="userattemptsto-cancel"
                      onClick={() => {
                        setSelectedClass(null)
                        setBookingStatus('idle')
                        setErrorMessage('')
                      }}
                      className="w-full px-4 py-2 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
