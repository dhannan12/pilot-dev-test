/**
 * SchedulePhysiotherapy — Appointment scheduling with training time filters
 *
 * Features: physiotherapy appointment booking, training time slot filtering, therapist selection, date picker, session type filtering
 *
 * Ticket: SCRUM-725 | Branch: proto/SCRUM-717
 */

import React, { useState } from 'react'

interface Therapist {
  id: string
  name: string
  specialty: string
  avatar: string
}

interface TimeSlot {
  id: string
  therapistId: string
  date: string
  time: string
  trainingTime: 'morning' | 'afternoon' | 'evening'
  sessionType: string
  available: boolean
  duration: number
}

const mockTherapists: Therapist[] = [
  { id: '1', name: 'Dr. Sarah Johnson', specialty: 'Sports Physiotherapy', avatar: 'SJ' },
  { id: '2', name: 'Dr. Michael Chen', specialty: 'Orthopedic Rehab', avatar: 'MC' },
  { id: '3', name: 'Dr. Emily Rodriguez', specialty: 'Manual Therapy', avatar: 'ER' },
  { id: '4', name: 'Dr. James Wilson', specialty: 'Neurological Rehab', avatar: 'JW' },
  { id: '5', name: 'Dr. Amanda Lee', specialty: 'Post-Surgery Recovery', avatar: 'AL' }
]

const mockTimeSlots: TimeSlot[] = [
  { id: '1', therapistId: '1', date: '2026-08-15', time: '09:00', trainingTime: 'morning', sessionType: 'Initial Assessment', available: true, duration: 60 },
  { id: '2', therapistId: '1', date: '2026-08-15', time: '10:30', trainingTime: 'morning', sessionType: 'Follow-up', available: true, duration: 45 },
  { id: '3', therapistId: '2', date: '2026-08-15', time: '14:00', trainingTime: 'afternoon', sessionType: 'Manual Therapy', available: true, duration: 60 },
  { id: '4', therapistId: '2', date: '2026-08-16', time: '15:30', trainingTime: 'afternoon', sessionType: 'Exercise Training', available: false, duration: 45 },
  { id: '5', therapistId: '3', date: '2026-08-16', time: '09:30', trainingTime: 'morning', sessionType: 'Initial Assessment', available: true, duration: 60 },
  { id: '6', therapistId: '3', date: '2026-08-16', time: '18:00', trainingTime: 'evening', sessionType: 'Follow-up', available: true, duration: 45 },
  { id: '7', therapistId: '4', date: '2026-08-17', time: '10:00', trainingTime: 'morning', sessionType: 'Neurological Rehab', available: true, duration: 60 },
  { id: '8', therapistId: '4', date: '2026-08-17', time: '16:00', trainingTime: 'afternoon', sessionType: 'Balance Training', available: true, duration: 45 },
  { id: '9', therapistId: '5', date: '2026-08-18', time: '08:30', trainingTime: 'morning', sessionType: 'Post-Surgery Recovery', available: true, duration: 60 },
  { id: '10', therapistId: '5', date: '2026-08-18', time: '17:00', trainingTime: 'evening', sessionType: 'Strength Training', available: true, duration: 45 },
  { id: '11', therapistId: '1', date: '2026-08-19', time: '11:00', trainingTime: 'morning', sessionType: 'Sports Rehab', available: true, duration: 60 },
  { id: '12', therapistId: '2', date: '2026-08-19', time: '13:00', trainingTime: 'afternoon', sessionType: 'Manual Therapy', available: true, duration: 45 },
  { id: '13', therapistId: '3', date: '2026-08-20', time: '19:00', trainingTime: 'evening', sessionType: 'Follow-up', available: false, duration: 45 },
  { id: '14', therapistId: '4', date: '2026-08-20', time: '14:30', trainingTime: 'afternoon', sessionType: 'Exercise Training', available: true, duration: 60 },
  { id: '15', therapistId: '5', date: '2026-08-21', time: '09:00', trainingTime: 'morning', sessionType: 'Initial Assessment', available: true, duration: 60 }
]

export default function SchedulePhysiotherapy() {
  const [selectedTherapist, setSelectedTherapist] = useState<string>('')
  const [selectedTrainingTime, setSelectedTrainingTime] = useState<string>('')
  const [selectedSessionType, setSelectedSessionType] = useState<string>('')
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null)

  // Get unique session types
  const sessionTypes = Array.from(new Set(mockTimeSlots.map(slot => slot.sessionType)))

  // Filter time slots based on selections
  const filteredSlots = mockTimeSlots.filter(slot => {
    if (selectedTherapist && slot.therapistId !== selectedTherapist) return false
    if (selectedTrainingTime && slot.trainingTime !== selectedTrainingTime) return false
    if (selectedSessionType && slot.sessionType !== selectedSessionType) return false
    if (selectedDate && slot.date !== selectedDate) return false
    return true
  })

  const getTherapistById = (id: string) => {
    return mockTherapists.find(t => t.id === id)
  }

  const handleBookAppointment = (slot: TimeSlot) => {
    if (slot.available) {
      setSelectedSlot(slot)
    }
  }

  const confirmBooking = () => {
    if (selectedSlot) {
      alert(`Appointment booked successfully!\nTherapist: ${getTherapistById(selectedSlot.therapistId)?.name}\nDate: ${selectedSlot.date}\nTime: ${selectedSlot.time}\nSession: ${selectedSlot.sessionType}`)
      setSelectedSlot(null)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Schedule Physiotherapy Appointment</h1>
          <p className="text-gray-600">Filter available appointments based on your training times and preferences</p>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Filter Appointments</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Therapist Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Therapist</label>
              <select
                value={selectedTherapist}
                onChange={(e) => setSelectedTherapist(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Therapists</option>
                {mockTherapists.map(therapist => (
                  <option key={therapist.id} value={therapist.id}>{therapist.name}</option>
                ))}
              </select>
            </div>

            {/* Training Time Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Training Time</label>
              <select
                value={selectedTrainingTime}
                onChange={(e) => setSelectedTrainingTime(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Times</option>
                <option value="morning">Morning (8AM - 12PM)</option>
                <option value="afternoon">Afternoon (12PM - 6PM)</option>
                <option value="evening">Evening (6PM - 9PM)</option>
              </select>
            </div>

            {/* Session Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Session Type</label>
              <select
                value={selectedSessionType}
                onChange={(e) => setSelectedSessionType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Sessions</option>
                {sessionTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Date Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Clear Filters Button */}
          <div className="mt-4">
            <button
              onClick={() => {
                setSelectedTherapist('')
                setSelectedTrainingTime('')
                setSelectedSessionType('')
                setSelectedDate('')
              }}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        </div>

        {/* Results Summary */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-blue-800">
            <span className="font-semibold">{filteredSlots.filter(s => s.available).length}</span> available appointments found
            {selectedTrainingTime && <span className="ml-2">in the <strong>{selectedTrainingTime}</strong></span>}
          </p>
        </div>

        {/* Available Slots */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Available Appointments</h2>
          
          {filteredSlots.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No appointments found matching your criteria</p>
              <p className="text-gray-400 mt-2">Try adjusting your filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredSlots.map(slot => {
                const therapist = getTherapistById(slot.therapistId)
                return (
                  <div
                    key={slot.id}
                    className={`border rounded-lg p-4 ${
                      slot.available
                        ? 'border-gray-300 hover:border-blue-500 cursor-pointer'
                        : 'border-gray-200 bg-gray-50 opacity-60'
                    } transition-all`}
                    onClick={() => slot.available && handleBookAppointment(slot)}
                  >
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold mr-3">
                        {therapist?.avatar}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{therapist?.name}</h3>
                        <p className="text-xs text-gray-500">{therapist?.specialty}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <span className="text-gray-600 w-16">Date:</span>
                        <span className="font-medium text-gray-900">{new Date(slot.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                      
                      <div className="flex items-center text-sm">
                        <span className="text-gray-600 w-16">Time:</span>
                        <span className="font-medium text-gray-900">{slot.time}</span>
                        <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">
                          {slot.trainingTime}
                        </span>
                      </div>
                      
                      <div className="flex items-center text-sm">
                        <span className="text-gray-600 w-16">Session:</span>
                        <span className="font-medium text-gray-900 text-xs">{slot.sessionType}</span>
                      </div>
                      
                      <div className="flex items-center text-sm">
                        <span className="text-gray-600 w-16">Duration:</span>
                        <span className="font-medium text-gray-900">{slot.duration} min</span>
                      </div>
                    </div>

                    <div className="mt-4">
                      {slot.available ? (
                        <button className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium">
                          Book Appointment
                        </button>
                      ) : (
                        <button disabled className="w-full py-2 bg-gray-300 text-gray-500 rounded-md cursor-not-allowed font-medium">
                          Not Available
                        </button>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Booking Confirmation Modal */}
        {selectedSlot && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Confirm Appointment</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Therapist:</span>
                  <span className="font-semibold text-gray-900">{getTherapistById(selectedSlot.therapistId)?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Specialty:</span>
                  <span className="font-semibold text-gray-900">{getTherapistById(selectedSlot.therapistId)?.specialty}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-semibold text-gray-900">{new Date(selectedSlot.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Time:</span>
                  <span className="font-semibold text-gray-900">{selectedSlot.time} ({selectedSlot.trainingTime})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Session Type:</span>
                  <span className="font-semibold text-gray-900">{selectedSlot.sessionType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-semibold text-gray-900">{selectedSlot.duration} minutes</span>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setSelectedSlot(null)}
                  className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmBooking}
                  className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
                >
                  Confirm Booking
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
