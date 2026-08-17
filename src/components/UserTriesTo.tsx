/**
 * UserTriesTo — Handles booking attempts for classes with capacity constraints
 *
 * Features: class listing, capacity display, booking validation, full-class alerts, booking history
 *
 * Ticket: SCRUM-1033 | Branch: proto/SCRUM-1028
 */

import { useState } from 'react'

interface GymClass {
  id: string
  name: string
  instructor: string
  time: string
  date: string
  capacity: number
  enrolled: number
  duration: string
  level: string
}

interface BookingAttempt {
  id: string
  className: string
  timestamp: string
  success: boolean
  reason?: string
}

const MOCK_CLASSES: GymClass[] = [
  {
    id: 'cls-1',
    name: 'High-Intensity Interval Training',
    instructor: 'Sarah Johnson',
    time: '6:00 AM',
    date: '2026-08-18',
    capacity: 20,
    enrolled: 20,
    duration: '45 min',
    level: 'Advanced'
  },
  {
    id: 'cls-2',
    name: 'Yoga Flow',
    instructor: 'Michael Chen',
    time: '9:00 AM',
    date: '2026-08-18',
    capacity: 15,
    enrolled: 15,
    duration: '60 min',
    level: 'Intermediate'
  },
  {
    id: 'cls-3',
    name: 'Spin Class',
    instructor: 'Jessica Martinez',
    time: '12:00 PM',
    date: '2026-08-18',
    capacity: 25,
    enrolled: 18,
    duration: '50 min',
    level: 'All Levels'
  },
  {
    id: 'cls-4',
    name: 'CrossFit Fundamentals',
    instructor: 'David Thompson',
    time: '5:30 PM',
    date: '2026-08-18',
    capacity: 12,
    enrolled: 12,
    duration: '60 min',
    level: 'Beginner'
  },
  {
    id: 'cls-5',
    name: 'Pilates Core',
    instructor: 'Emily Roberts',
    time: '7:00 PM',
    date: '2026-08-18',
    capacity: 18,
    enrolled: 14,
    duration: '55 min',
    level: 'Intermediate'
  },
  {
    id: 'cls-6',
    name: 'Boxing Bootcamp',
    instructor: 'Marcus Williams',
    time: '6:30 PM',
    date: '2026-08-19',
    capacity: 16,
    enrolled: 16,
    duration: '45 min',
    level: 'Advanced'
  },
  {
    id: 'cls-7',
    name: 'Zumba Dance',
    instructor: 'Sofia Garcia',
    time: '10:00 AM',
    date: '2026-08-19',
    capacity: 30,
    enrolled: 22,
    duration: '60 min',
    level: 'All Levels'
  }
]

export default function UserTriesTo() {
  const [bookingHistory, setBookingHistory] = useState<BookingAttempt[]>([])
  const [selectedClass, setSelectedClass] = useState<string | null>(null)
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [alertType, setAlertType] = useState<'success' | 'error'>('success')

  const handleBookClass = (gymClass: GymClass) => {
    setSelectedClass(gymClass.id)
    
    const isFull = gymClass.enrolled >= gymClass.capacity
    
    if (isFull) {
      const attempt: BookingAttempt = {
        id: `attempt-${Date.now()}`,
        className: gymClass.name,
        timestamp: new Date().toLocaleString(),
        success: false,
        reason: 'Class has reached maximum capacity'
      }
      
      setBookingHistory([attempt, ...bookingHistory])
      setAlertMessage(`Cannot book "${gymClass.name}". This class is full (${gymClass.enrolled}/${gymClass.capacity}).`)
      setAlertType('error')
      setShowAlert(true)
      
      setTimeout(() => setShowAlert(false), 5000)
    } else {
      const attempt: BookingAttempt = {
        id: `attempt-${Date.now()}`,
        className: gymClass.name,
        timestamp: new Date().toLocaleString(),
        success: true
      }
      
      setBookingHistory([attempt, ...bookingHistory])
      setAlertMessage(`Successfully booked "${gymClass.name}"!`)
      setAlertType('success')
      setShowAlert(true)
      
      setTimeout(() => setShowAlert(false), 5000)
    }
  }

  const getCapacityStatus = (gymClass: GymClass) => {
    const percentage = (gymClass.enrolled / gymClass.capacity) * 100
    if (percentage >= 100) return { color: 'text-red-600', bg: 'bg-red-100', label: 'FULL' }
    if (percentage >= 90) return { color: 'text-orange-600', bg: 'bg-orange-100', label: 'Almost Full' }
    if (percentage >= 70) return { color: 'text-yellow-600', bg: 'bg-yellow-100', label: 'Filling Up' }
    return { color: 'text-green-600', bg: 'bg-green-100', label: 'Available' }
  }

  return (
    <div data-testid="usertriesto" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Book a Class</h1>
          <p className="text-gray-600">
            Select a class to book. Please note capacity limits for each session.
          </p>
        </div>

        {/* Alert Banner */}
        {showAlert && (
          <div
            data-testid="usertriesto-alert"
            className={`mb-6 p-4 rounded-lg ${
              alertType === 'error'
                ? 'bg-red-50 border border-red-200 text-red-800'
                : 'bg-green-50 border border-green-200 text-green-800'
            }`}
          >
            <div className="flex items-center">
              <span className="text-lg mr-2">{alertType === 'error' ? '⚠️' : '✓'}</span>
              <p className="font-medium">{alertMessage}</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Classes List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Available Classes</h2>
              
              <div data-testid="usertriesto-list" className="space-y-4">
                {MOCK_CLASSES.map((gymClass) => {
                  const status = getCapacityStatus(gymClass)
                  const isFull = gymClass.enrolled >= gymClass.capacity
                  const spotsLeft = gymClass.capacity - gymClass.enrolled

                  return (
                    <div
                      key={gymClass.id}
                      data-testid="usertriesto-item"
                      className={`border rounded-lg p-5 transition-all ${
                        selectedClass === gymClass.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      } ${isFull ? 'opacity-75' : ''}`}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-bold text-gray-900">
                              {gymClass.name}
                            </h3>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${status.bg} ${status.color}`}
                            >
                              {status.label}
                            </span>
                          </div>
                          
                          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                            <span>👨‍🏫 {gymClass.instructor}</span>
                            <span>📅 {gymClass.date}</span>
                            <span>⏰ {gymClass.time}</span>
                            <span>⏱️ {gymClass.duration}</span>
                            <span>📊 {gymClass.level}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="text-sm">
                            <span className="font-semibold text-gray-900">
                              {gymClass.enrolled}/{gymClass.capacity}
                            </span>
                            <span className="text-gray-600 ml-1">enrolled</span>
                          </div>
                          
                          {!isFull && (
                            <div className="text-sm text-green-600 font-medium">
                              {spotsLeft} spot{spotsLeft !== 1 ? 's' : ''} left
                            </div>
                          )}
                          
                          {isFull && (
                            <div className="text-sm text-red-600 font-medium">
                              No spots available
                            </div>
                          )}
                        </div>

                        <button
                          data-testid="usertriesto-book"
                          onClick={() => handleBookClass(gymClass)}
                          className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                            isFull
                              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                              : 'bg-blue-600 text-white hover:bg-blue-700'
                          }`}
                        >
                          {isFull ? 'Class Full' : 'Book Now'}
                        </button>
                      </div>

                      {/* Capacity Bar */}
                      <div className="mt-3">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all ${
                              isFull
                                ? 'bg-red-500'
                                : status.color === 'text-orange-600'
                                ? 'bg-orange-500'
                                : status.color === 'text-yellow-600'
                                ? 'bg-yellow-500'
                                : 'bg-green-500'
                            }`}
                            style={{
                              width: `${(gymClass.enrolled / gymClass.capacity) * 100}%`
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Booking History Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Booking History</h2>
              
              {bookingHistory.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 text-sm">No booking attempts yet</p>
                  <p className="text-gray-400 text-xs mt-2">
                    Try booking a class to see your history
                  </p>
                </div>
              ) : (
                <div data-testid="usertriesto-history-list" className="space-y-3 max-h-[600px] overflow-y-auto">
                  {bookingHistory.map((attempt) => (
                    <div
                      key={attempt.id}
                      data-testid="usertriesto-history-item"
                      className={`border rounded-lg p-3 ${
                        attempt.success
                          ? 'border-green-200 bg-green-50'
                          : 'border-red-200 bg-red-50'
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        <span className="text-lg">
                          {attempt.success ? '✓' : '✗'}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm text-gray-900 truncate">
                            {attempt.className}
                          </p>
                          <p className="text-xs text-gray-600 mt-1">
                            {attempt.timestamp}
                          </p>
                          {!attempt.success && attempt.reason && (
                            <p className="text-xs text-red-600 mt-1 font-medium">
                              {attempt.reason}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {bookingHistory.length > 0 && (
                <button
                  data-testid="usertriesto-clear-history"
                  onClick={() => setBookingHistory([])}
                  className="mt-4 w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                >
                  Clear History
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-3">Capacity Legend</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-green-500"></div>
              <span className="text-sm text-gray-700">Available (0-69%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
              <span className="text-sm text-gray-700">Filling Up (70-89%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-orange-500"></div>
              <span className="text-sm text-gray-700">Almost Full (90-99%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-red-500"></div>
              <span className="text-sm text-gray-700">Full (100%)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
