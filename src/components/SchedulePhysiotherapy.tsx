/**
 * SchedulePhysiotherapy — Patient appointment scheduling with confirmation notification
 *
 * Features: therapist selection, date/time picker, session type selection, booking confirmation, notification display
 *
 * Ticket: SCRUM-720 | Branch: proto/SCRUM-717
 */

import { useState } from 'react'

interface Therapist {
  id: string
  name: string
  specialization: string
  availability: string[]
}

interface SessionType {
  id: string
  name: string
  duration: string
  description: string
}

interface TimeSlot {
  time: string
  available: boolean
}

const MOCK_THERAPISTS: Therapist[] = [
  {
    id: 'T001',
    name: 'Dr. Sarah Johnson',
    specialization: 'Sports Physiotherapy',
    availability: ['2026-08-14', '2026-08-15', '2026-08-16', '2026-08-17', '2026-08-18']
  },
  {
    id: 'T002',
    name: 'Dr. Michael Chen',
    specialization: 'Orthopedic Rehabilitation',
    availability: ['2026-08-14', '2026-08-15', '2026-08-16', '2026-08-19', '2026-08-20']
  },
  {
    id: 'T003',
    name: 'Dr. Emily Rodriguez',
    specialization: 'Neurological Physiotherapy',
    availability: ['2026-08-14', '2026-08-17', '2026-08-18', '2026-08-19', '2026-08-21']
  },
  {
    id: 'T004',
    name: 'Dr. James Williams',
    specialization: 'Geriatric Physiotherapy',
    availability: ['2026-08-15', '2026-08-16', '2026-08-17', '2026-08-18', '2026-08-20']
  },
  {
    id: 'T005',
    name: 'Dr. Lisa Anderson',
    specialization: 'Pediatric Physiotherapy',
    availability: ['2026-08-14', '2026-08-15', '2026-08-18', '2026-08-19', '2026-08-21']
  }
]

const MOCK_SESSION_TYPES: SessionType[] = [
  {
    id: 'S001',
    name: 'Initial Assessment',
    duration: '60 minutes',
    description: 'Comprehensive evaluation and treatment plan development'
  },
  {
    id: 'S002',
    name: 'Standard Session',
    duration: '45 minutes',
    description: 'Regular physiotherapy treatment session'
  },
  {
    id: 'S003',
    name: 'Follow-up Session',
    duration: '30 minutes',
    description: 'Progress review and ongoing treatment'
  },
  {
    id: 'S004',
    name: 'Extended Therapy',
    duration: '90 minutes',
    description: 'Intensive treatment for complex conditions'
  },
  {
    id: 'S005',
    name: 'Group Session',
    duration: '60 minutes',
    description: 'Small group therapeutic exercises'
  }
]

const MOCK_TIME_SLOTS: TimeSlot[] = [
  { time: '09:00 AM', available: true },
  { time: '10:00 AM', available: true },
  { time: '11:00 AM', available: false },
  { time: '12:00 PM', available: true },
  { time: '01:00 PM', available: false },
  { time: '02:00 PM', available: true },
  { time: '03:00 PM', available: true },
  { time: '04:00 PM', available: true }
]

export default function SchedulePhysiotherapy() {
  const [selectedTherapist, setSelectedTherapist] = useState<string>('')
  const [selectedSessionType, setSelectedSessionType] = useState<string>('')
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [selectedTime, setSelectedTime] = useState<string>('')
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false)
  const [bookingDetails, setBookingDetails] = useState<{
    therapist: string
    sessionType: string
    date: string
    time: string
  } | null>(null)

  const handleBooking = () => {
    if (selectedTherapist && selectedSessionType && selectedDate && selectedTime) {
      const therapist = MOCK_THERAPISTS.find(t => t.id === selectedTherapist)
      const sessionType = MOCK_SESSION_TYPES.find(s => s.id === selectedSessionType)
      
      setBookingDetails({
        therapist: therapist?.name || '',
        sessionType: sessionType?.name || '',
        date: selectedDate,
        time: selectedTime
      })
      
      setShowConfirmation(true)
    }
  }

  const resetForm = () => {
    setSelectedTherapist('')
    setSelectedSessionType('')
    setSelectedDate('')
    setSelectedTime('')
    setShowConfirmation(false)
    setBookingDetails(null)
  }

  const isFormValid = selectedTherapist && selectedSessionType && selectedDate && selectedTime

  if (showConfirmation && bookingDetails) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Appointment Confirmed!</h2>
              <p className="text-gray-600">Your physiotherapy appointment has been successfully scheduled</p>
            </div>

            <div className="bg-blue-50 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Booking Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Therapist:</span>
                  <span className="font-semibold text-gray-800">{bookingDetails.therapist}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Session Type:</span>
                  <span className="font-semibold text-gray-800">{bookingDetails.sessionType}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-semibold text-gray-800">{new Date(bookingDetails.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Time:</span>
                  <span className="font-semibold text-gray-800">{bookingDetails.time}</span>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    <strong>Reminder:</strong> A confirmation email has been sent to your registered email address. Please arrive 10 minutes early for your appointment.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={resetForm}
                className="flex-1 bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Schedule Another Appointment
              </button>
              <button
                onClick={resetForm}
                className="flex-1 bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Schedule Physiotherapy Appointment</h1>
          <p className="text-gray-600 mb-8">Select your preferred therapist, session type, date, and time</p>

          <div className="space-y-6">
            {/* Therapist Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Select Therapist
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MOCK_THERAPISTS.map((therapist) => (
                  <div
                    key={therapist.id}
                    onClick={() => setSelectedTherapist(therapist.id)}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedTherapist === therapist.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <h3 className="font-semibold text-gray-800">{therapist.name}</h3>
                    <p className="text-sm text-gray-600">{therapist.specialization}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Session Type Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Select Session Type
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MOCK_SESSION_TYPES.map((session) => (
                  <div
                    key={session.id}
                    onClick={() => setSelectedSessionType(session.id)}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedSessionType === session.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-semibold text-gray-800">{session.name}</h3>
                      <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">{session.duration}</span>
                    </div>
                    <p className="text-sm text-gray-600">{session.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Date Selection */}
            {selectedTherapist && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Select Date
                </label>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {MOCK_THERAPISTS.find(t => t.id === selectedTherapist)?.availability.map((date) => (
                    <div
                      key={date}
                      onClick={() => setSelectedDate(date)}
                      className={`p-3 border-2 rounded-lg cursor-pointer text-center transition-all ${
                        selectedDate === date
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <div className="text-sm font-semibold text-gray-800">
                        {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </div>
                      <div className="text-xs text-gray-600">
                        {new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Time Slot Selection */}
            {selectedDate && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Select Time
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {MOCK_TIME_SLOTS.map((slot) => (
                    <button
                      key={slot.time}
                      onClick={() => slot.available && setSelectedTime(slot.time)}
                      disabled={!slot.available}
                      className={`p-3 border-2 rounded-lg font-semibold transition-all ${
                        selectedTime === slot.time
                          ? 'border-blue-500 bg-blue-500 text-white'
                          : slot.available
                          ? 'border-gray-200 text-gray-800 hover:border-blue-300'
                          : 'border-gray-100 bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {slot.time}
                      {!slot.available && <div className="text-xs">Unavailable</div>}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Book Appointment Button */}
            <div className="pt-6">
              <button
                onClick={handleBooking}
                disabled={!isFormValid}
                className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all ${
                  isFormValid
                    ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {isFormValid ? 'Confirm Appointment' : 'Please complete all selections'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
