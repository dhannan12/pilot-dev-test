/**
 * SchedulePhysiotherapy — Patient physiotherapy appointment scheduling with treatment history view
 *
 * Features: appointment calendar, time slot selection, therapist profiles, treatment history, session booking
 *
 * Ticket: SCRUM-721 | Branch: proto/SCRUM-717
 */

import React, { useState } from 'react'

interface TreatmentHistory {
  id: string
  date: string
  therapist: string
  sessionType: string
  duration: number
  notes: string
  status: 'completed' | 'cancelled' | 'scheduled'
}

interface Therapist {
  id: string
  name: string
  specialization: string
  avatar: string
  rating: number
  availability: string[]
}

interface TimeSlot {
  time: string
  available: boolean
}

const mockTreatmentHistory: TreatmentHistory[] = [
  {
    id: 'TH001',
    date: '2026-07-15',
    therapist: 'Dr. Sarah Johnson',
    sessionType: 'Lower Back Pain Treatment',
    duration: 60,
    notes: 'Significant improvement in mobility. Continue with stretching exercises.',
    status: 'completed'
  },
  {
    id: 'TH002',
    date: '2026-07-22',
    therapist: 'Dr. Sarah Johnson',
    sessionType: 'Lower Back Pain Treatment',
    duration: 60,
    notes: 'Patient showing excellent progress. Reduced pain levels reported.',
    status: 'completed'
  },
  {
    id: 'TH003',
    date: '2026-07-29',
    therapist: 'Dr. Michael Chen',
    sessionType: 'Sports Injury Recovery',
    duration: 45,
    notes: 'Initial assessment completed. Recommended 6-week treatment plan.',
    status: 'completed'
  },
  {
    id: 'TH004',
    date: '2026-08-05',
    therapist: 'Dr. Sarah Johnson',
    sessionType: 'Lower Back Pain Treatment',
    duration: 60,
    notes: 'Patient cancelled due to personal reasons.',
    status: 'cancelled'
  },
  {
    id: 'TH005',
    date: '2026-08-20',
    therapist: 'Dr. Emily Rodriguez',
    sessionType: 'Post-Surgery Rehabilitation',
    duration: 90,
    notes: 'Scheduled follow-up session.',
    status: 'scheduled'
  },
  {
    id: 'TH006',
    date: '2026-08-12',
    therapist: 'Dr. Michael Chen',
    sessionType: 'Sports Injury Recovery',
    duration: 45,
    notes: 'Continue strengthening exercises. Patient recovering well.',
    status: 'completed'
  }
]

const mockTherapists: Therapist[] = [
  {
    id: 'T001',
    name: 'Dr. Sarah Johnson',
    specialization: 'Back & Spine Specialist',
    avatar: 'SJ',
    rating: 4.9,
    availability: ['2026-08-14', '2026-08-15', '2026-08-16', '2026-08-19', '2026-08-20']
  },
  {
    id: 'T002',
    name: 'Dr. Michael Chen',
    specialization: 'Sports Injury Expert',
    avatar: 'MC',
    rating: 4.8,
    availability: ['2026-08-13', '2026-08-14', '2026-08-16', '2026-08-17', '2026-08-20']
  },
  {
    id: 'T003',
    name: 'Dr. Emily Rodriguez',
    specialization: 'Post-Surgery Rehabilitation',
    avatar: 'ER',
    rating: 4.9,
    availability: ['2026-08-13', '2026-08-15', '2026-08-17', '2026-08-19', '2026-08-21']
  },
  {
    id: 'T004',
    name: 'Dr. James Wilson',
    specialization: 'Chronic Pain Management',
    avatar: 'JW',
    rating: 4.7,
    availability: ['2026-08-14', '2026-08-16', '2026-08-18', '2026-08-19', '2026-08-21']
  },
  {
    id: 'T005',
    name: 'Dr. Lisa Martinez',
    specialization: 'Pediatric Physiotherapy',
    avatar: 'LM',
    rating: 5.0,
    availability: ['2026-08-13', '2026-08-14', '2026-08-15', '2026-08-18', '2026-08-20']
  }
]

const timeSlots: TimeSlot[] = [
  { time: '08:00 AM', available: true },
  { time: '09:00 AM', available: true },
  { time: '10:00 AM', available: false },
  { time: '11:00 AM', available: true },
  { time: '12:00 PM', available: false },
  { time: '01:00 PM', available: true },
  { time: '02:00 PM', available: true },
  { time: '03:00 PM', available: false },
  { time: '04:00 PM', available: true },
  { time: '05:00 PM', available: true }
]

export default function SchedulePhysiotherapy() {
  const [selectedTherapist, setSelectedTherapist] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'schedule' | 'history'>('schedule')

  const handleBooking = () => {
    if (selectedTherapist && selectedDate && selectedTime) {
      alert(`Appointment booked with ${mockTherapists.find(t => t.id === selectedTherapist)?.name} on ${selectedDate} at ${selectedTime}`)
      // Reset selections
      setSelectedTherapist(null)
      setSelectedDate(null)
      setSelectedTime(null)
    }
  }

  const selectedTherapistData = mockTherapists.find(t => t.id === selectedTherapist)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Physiotherapy Portal</h1>
          <p className="text-gray-600">Schedule appointments and view your treatment history</p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-md mb-6">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('schedule')}
              className={`flex-1 py-4 px-6 font-semibold transition-colors ${
                activeTab === 'schedule'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Schedule Appointment
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`flex-1 py-4 px-6 font-semibold transition-colors ${
                activeTab === 'history'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Treatment History
            </button>
          </div>
        </div>

        {/* Schedule Appointment Tab */}
        {activeTab === 'schedule' && (
          <div className="space-y-6">
            {/* Therapist Selection */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Select Your Therapist</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockTherapists.map((therapist) => (
                  <div
                    key={therapist.id}
                    onClick={() => setSelectedTherapist(therapist.id)}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedTherapist === therapist.id
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-400'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                        {therapist.avatar}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{therapist.name}</h3>
                        <p className="text-sm text-gray-600">{therapist.specialization}</p>
                        <div className="flex items-center mt-1">
                          <span className="text-yellow-500">★</span>
                          <span className="text-sm text-gray-700 ml-1">{therapist.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Date Selection */}
            {selectedTherapist && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Select Date</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                  {selectedTherapistData?.availability.map((date) => (
                    <button
                      key={date}
                      onClick={() => setSelectedDate(date)}
                      className={`p-4 border-2 rounded-lg font-medium transition-all ${
                        selectedDate === date
                          ? 'border-blue-600 bg-blue-50 text-blue-600'
                          : 'border-gray-200 hover:border-blue-400 text-gray-700'
                      }`}
                    >
                      <div className="text-sm">{new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}</div>
                      <div className="text-lg">{new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Time Slot Selection */}
            {selectedDate && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Select Time Slot</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot.time}
                      onClick={() => slot.available && setSelectedTime(slot.time)}
                      disabled={!slot.available}
                      className={`p-3 border-2 rounded-lg font-medium transition-all ${
                        selectedTime === slot.time
                          ? 'border-blue-600 bg-blue-50 text-blue-600'
                          : slot.available
                          ? 'border-gray-200 hover:border-blue-400 text-gray-700'
                          : 'border-gray-100 bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Booking Summary */}
            {selectedTherapist && selectedDate && selectedTime && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Booking Summary</h2>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Therapist:</span>
                    <span className="font-semibold text-gray-900">{selectedTherapistData?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Specialization:</span>
                    <span className="font-semibold text-gray-900">{selectedTherapistData?.specialization}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-semibold text-gray-900">{new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Time:</span>
                    <span className="font-semibold text-gray-900">{selectedTime}</span>
                  </div>
                </div>
                <button
                  onClick={handleBooking}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Confirm Booking
                </button>
              </div>
            )}
          </div>
        )}

        {/* Treatment History Tab */}
        {activeTab === 'history' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Treatment History</h2>
            <div className="space-y-4">
              {mockTreatmentHistory.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((treatment) => (
                <div key={treatment.id} className="border-2 border-gray-200 rounded-lg p-5 hover:border-blue-400 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{treatment.sessionType}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          treatment.status === 'completed' ? 'bg-green-100 text-green-700' :
                          treatment.status === 'scheduled' ? 'bg-blue-100 text-blue-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {treatment.status.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">
                        <span className="font-medium">Therapist:</span> {treatment.therapist}
                      </p>
                      <p className="text-sm text-gray-600 mb-1">
                        <span className="font-medium">Date:</span> {new Date(treatment.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                      </p>
                      <p className="text-sm text-gray-600 mb-3">
                        <span className="font-medium">Duration:</span> {treatment.duration} minutes
                      </p>
                      {treatment.notes && (
                        <div className="bg-gray-50 rounded p-3 mt-2">
                          <p className="text-sm text-gray-700">
                            <span className="font-medium">Notes:</span> {treatment.notes}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
