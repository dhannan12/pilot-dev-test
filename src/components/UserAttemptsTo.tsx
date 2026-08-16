/**
 * UserAttemptsTo — Handles user attempts to book a class with an expired membership
 *
 * Features: class selection, membership validation, expired membership detection, renewal prompt, booking restrictions
 *
 * Ticket: SCRUM-958 | Branch: proto/SCRUM-951
 */

import { useState } from 'react'

interface GymClass {
  id: string
  className: string
  instructor: string
  time: string
  date: string
  capacity: number
  currentBookings: number
  location: string
}

interface Membership {
  id: string
  memberName: string
  membershipType: string
  startDate: string
  expiryDate: string
  isActive: boolean
}

const MOCK_CLASSES: GymClass[] = [
  {
    id: 'cls-001',
    className: 'High-Intensity Interval Training',
    instructor: 'Sarah Martinez',
    time: '6:00 AM',
    date: '2026-08-17',
    capacity: 20,
    currentBookings: 12,
    location: 'Studio A'
  },
  {
    id: 'cls-002',
    className: 'Yoga Flow',
    instructor: 'Michael Chen',
    time: '7:30 AM',
    date: '2026-08-17',
    capacity: 15,
    currentBookings: 8,
    location: 'Studio B'
  },
  {
    id: 'cls-003',
    className: 'Spin Class',
    instructor: 'Jennifer Davis',
    time: '12:00 PM',
    date: '2026-08-17',
    capacity: 25,
    currentBookings: 18,
    location: 'Cycling Room'
  },
  {
    id: 'cls-004',
    className: 'Boxing Fundamentals',
    instructor: 'David Thompson',
    time: '5:30 PM',
    date: '2026-08-17',
    capacity: 12,
    currentBookings: 7,
    location: 'Training Area'
  },
  {
    id: 'cls-005',
    className: 'Power Pilates',
    instructor: 'Emily Rodriguez',
    time: '8:00 AM',
    date: '2026-08-18',
    capacity: 18,
    currentBookings: 10,
    location: 'Studio C'
  },
  {
    id: 'cls-006',
    className: 'Zumba Dance',
    instructor: 'Carlos Santos',
    time: '6:00 PM',
    date: '2026-08-18',
    capacity: 30,
    currentBookings: 22,
    location: 'Main Hall'
  }
]

const MOCK_MEMBERSHIP: Membership = {
  id: 'mem-001',
  memberName: 'John Doe',
  membershipType: 'Gold Annual',
  startDate: '2025-08-01',
  expiryDate: '2026-07-31',
  isActive: false
}

export default function UserAttemptsTo() {
  const [selectedClass, setSelectedClass] = useState<GymClass | null>(null)
  const [bookingStatus, setBookingStatus] = useState<'idle' | 'attempting' | 'failed' | 'expired'>('idle')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [membership] = useState<Membership>(MOCK_MEMBERSHIP)
  const [showRenewalPrompt, setShowRenewalPrompt] = useState<boolean>(false)

  const handleSelectClass = (classItem: GymClass) => {
    setSelectedClass(classItem)
    setBookingStatus('idle')
    setErrorMessage('')
    setShowRenewalPrompt(false)
  }

  const handleBookClass = () => {
    if (!selectedClass) return

    setBookingStatus('attempting')
    
    // Simulate booking attempt with membership validation
    setTimeout(() => {
      if (!membership.isActive) {
        setBookingStatus('expired')
        setErrorMessage(
          `Unable to book ${selectedClass.className}. Your ${membership.membershipType} membership expired on ${membership.expiryDate}. Please renew your membership to continue booking classes.`
        )
        setShowRenewalPrompt(true)
      }
    }, 500)
  }

  const handleRenewMembership = () => {
    // In a real app, this would redirect to the renewal page
    alert('Redirecting to membership renewal page...')
  }

  const calculateDaysExpired = (expiryDate: string): number => {
    const expiry = new Date(expiryDate)
    const today = new Date('2026-08-16') // Using current date from context
    const diffTime = today.getTime() - expiry.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <div data-testid="userattemptsto" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Class Booking</h1>
          <p className="text-gray-600">Select a class to book your spot</p>
        </header>

        {/* Membership Status Alert */}
        {!membership.isActive && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
            <div className="flex items-start">
              <svg className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-red-800 mb-1">Membership Expired</h3>
                <p className="text-sm text-red-700">
                  Your {membership.membershipType} membership expired on {membership.expiryDate} 
                  ({calculateDaysExpired(membership.expiryDate)} days ago). 
                  Renew your membership to continue booking classes.
                </p>
                <button
                  data-testid="userattemptsto-renew-header"
                  onClick={handleRenewMembership}
                  className="mt-3 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
                >
                  Renew Membership
                </button>
              </div>
            </div>
          </div>
        )}

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
                        <div className="text-sm text-gray-600">
                          {classItem.currentBookings}/{classItem.capacity} spots
                        </div>
                        <div className="text-sm font-medium text-green-600 mt-1">
                          Available
                        </div>
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
              
              {/* Membership Info */}
              <div className="mb-4 pb-4 border-b border-gray-200">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Membership Status</h3>
                <div className="space-y-1 text-sm">
                  <p><span className="text-gray-600">Member:</span> <span className="font-medium text-gray-900">{membership.memberName}</span></p>
                  <p><span className="text-gray-600">Type:</span> <span className="font-medium text-gray-900">{membership.membershipType}</span></p>
                  <p><span className="text-gray-600">Expires:</span> <span className={`font-medium ${membership.isActive ? 'text-green-600' : 'text-red-600'}`}>
                    {membership.expiryDate}
                  </span></p>
                  <div className="mt-2">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                      membership.isActive 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {membership.isActive ? '● Active' : '● Expired'}
                    </span>
                  </div>
                </div>
              </div>

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
                      <p><span className="font-medium">Availability:</span> {selectedClass.capacity - selectedClass.currentBookings} spots remaining</p>
                    </div>
                  </div>

                  {bookingStatus === 'expired' && errorMessage && (
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

                  <div className="space-y-2">
                    <button
                      data-testid="userattemptsto-book"
                      onClick={handleBookClass}
                      disabled={bookingStatus === 'attempting' || !membership.isActive}
                      className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed disabled:text-gray-500"
                    >
                      {bookingStatus === 'attempting' ? 'Booking...' : 'Book Class'}
                    </button>
                    
                    {showRenewalPrompt && (
                      <button
                        data-testid="userattemptsto-renew"
                        onClick={handleRenewMembership}
                        className="w-full px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Renew Membership Now
                      </button>
                    )}
                    
                    <button
                      data-testid="userattemptsto-cancel"
                      onClick={() => {
                        setSelectedClass(null)
                        setBookingStatus('idle')
                        setErrorMessage('')
                        setShowRenewalPrompt(false)
                      }}
                      className="w-full px-4 py-2 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>

                  {!membership.isActive && (
                    <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-xs text-yellow-800">
                        <strong>Note:</strong> You cannot book classes with an expired membership. 
                        Please renew to continue using our facilities.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
