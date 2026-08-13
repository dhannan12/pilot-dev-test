/**
 * BuildAppointmentScheduling — Appointment scheduling interface for physiotherapy sessions
 *
 * Features: calendar view, time slot selection, therapist availability, appointment booking, patient information
 *
 * Ticket: SCRUM-728 | Branch: proto/SCRUM-717
 */

import React, { useState } from 'react'

interface TimeSlot {
  id: string
  time: string
  available: boolean
  therapistId: string
}

interface Therapist {
  id: string
  name: string
  specialty: string
  avatar: string
}

interface Appointment {
  id: string
  patientName: string
  date: string
  time: string
  therapistId: string
  treatmentType: string
  status: 'scheduled' | 'confirmed' | 'completed'
}

const mockTherapists: Therapist[] = [
  { id: 'th1', name: 'Dr. Sarah Johnson', specialty: 'Sports Injury', avatar: '👩‍⚕️' },
  { id: 'th2', name: 'Dr. Michael Chen', specialty: 'Orthopedic', avatar: '👨‍⚕️' },
  { id: 'th3', name: 'Dr. Emily Rodriguez', specialty: 'Neurological', avatar: '👩‍⚕️' },
  { id: 'th4', name: 'Dr. James Wilson', specialty: 'Post-Surgery', avatar: '👨‍⚕️' },
  { id: 'th5', name: 'Dr. Lisa Anderson', specialty: 'Pediatric', avatar: '👩‍⚕️' },
]

const mockTimeSlots: TimeSlot[] = [
  { id: 'ts1', time: '09:00 AM', available: true, therapistId: 'th1' },
  { id: 'ts2', time: '09:30 AM', available: false, therapistId: 'th1' },
  { id: 'ts3', time: '10:00 AM', available: true, therapistId: 'th1' },
  { id: 'ts4', time: '10:30 AM', available: true, therapistId: 'th2' },
  { id: 'ts5', time: '11:00 AM', available: false, therapistId: 'th2' },
  { id: 'ts6', time: '11:30 AM', available: true, therapistId: 'th3' },
  { id: 'ts7', time: '02:00 PM', available: true, therapistId: 'th3' },
  { id: 'ts8', time: '02:30 PM', available: true, therapistId: 'th4' },
  { id: 'ts9', time: '03:00 PM', available: false, therapistId: 'th4' },
  { id: 'ts10', time: '03:30 PM', available: true, therapistId: 'th5' },
]

const mockAppointments: Appointment[] = [
  { id: 'apt1', patientName: 'John Smith', date: '2026-08-15', time: '09:30 AM', therapistId: 'th1', treatmentType: 'Knee Rehabilitation', status: 'scheduled' },
  { id: 'apt2', patientName: 'Emma Davis', date: '2026-08-15', time: '11:00 AM', therapistId: 'th2', treatmentType: 'Back Pain Therapy', status: 'confirmed' },
  { id: 'apt3', patientName: 'Robert Johnson', date: '2026-08-14', time: '10:00 AM', therapistId: 'th3', treatmentType: 'Stroke Recovery', status: 'completed' },
  { id: 'apt4', patientName: 'Maria Garcia', date: '2026-08-15', time: '03:00 PM', therapistId: 'th4', treatmentType: 'Post-Surgery Care', status: 'scheduled' },
  { id: 'apt5', patientName: 'David Lee', date: '2026-08-16', time: '09:00 AM', therapistId: 'th5', treatmentType: 'Pediatric Therapy', status: 'confirmed' },
]

const treatmentTypes = [
  'General Physiotherapy',
  'Sports Injury',
  'Orthopedic Rehabilitation',
  'Neurological Therapy',
  'Post-Surgery Recovery',
  'Pediatric Therapy',
  'Back Pain Treatment',
  'Knee Rehabilitation',
]

export default function BuildAppointmentScheduling() {
  const [selectedDate, setSelectedDate] = useState('2026-08-15')
  const [selectedTherapist, setSelectedTherapist] = useState<string>('')
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('')
  const [patientName, setPatientName] = useState('')
  const [treatmentType, setTreatmentType] = useState('')
  const [view, setView] = useState<'schedule' | 'appointments'>('schedule')

  const filteredTimeSlots = selectedTherapist
    ? mockTimeSlots.filter(slot => slot.therapistId === selectedTherapist)
    : mockTimeSlots

  const todayAppointments = mockAppointments.filter(apt => apt.date === selectedDate)

  const handleBookAppointment = () => {
    if (patientName && selectedTherapist && selectedTimeSlot && treatmentType) {
      alert(`Appointment booked!\nPatient: ${patientName}\nDate: ${selectedDate}\nTime: ${selectedTimeSlot}\nTreatment: ${treatmentType}`)
      // Reset form
      setPatientName('')
      setTreatmentType('')
      setSelectedTimeSlot('')
    } else {
      alert('Please fill in all required fields')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Appointment Scheduling</h1>
          <p className="text-gray-600">Schedule and manage physiotherapy appointments</p>
        </div>

        {/* View Toggle */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setView('schedule')}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              view === 'schedule'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            📅 Schedule New
          </button>
          <button
            onClick={() => setView('appointments')}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              view === 'appointments'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            📋 View Appointments
          </button>
        </div>

        {view === 'schedule' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Booking Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Date Selection */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Select Date</h2>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              {/* Therapist Selection */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Select Therapist</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mockTherapists.map((therapist) => (
                    <button
                      key={therapist.id}
                      onClick={() => setSelectedTherapist(therapist.id)}
                      className={`p-4 rounded-lg border-2 text-left transition-all ${
                        selectedTherapist === therapist.id
                          ? 'border-blue-600 bg-blue-50 shadow-lg'
                          : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{therapist.avatar}</span>
                        <div>
                          <div className="font-semibold text-gray-800">{therapist.name}</div>
                          <div className="text-sm text-gray-600">{therapist.specialty}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Slot Selection */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Select Time Slot</h2>
                {!selectedTherapist ? (
                  <p className="text-gray-500 text-center py-8">Please select a therapist first</p>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {filteredTimeSlots.map((slot) => (
                      <button
                        key={slot.id}
                        onClick={() => slot.available && setSelectedTimeSlot(slot.time)}
                        disabled={!slot.available}
                        className={`p-3 rounded-lg border-2 font-semibold transition-all ${
                          slot.available
                            ? selectedTimeSlot === slot.time
                              ? 'border-blue-600 bg-blue-600 text-white shadow-lg'
                              : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
                            : 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        {slot.time}
                        {!slot.available && <div className="text-xs mt-1">Booked</div>}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Patient Info */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Patient Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Patient Name *
                    </label>
                    <input
                      type="text"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      placeholder="Enter patient name"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Treatment Type *
                    </label>
                    <select
                      value={treatmentType}
                      onChange={(e) => setTreatmentType(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                    >
                      <option value="">Select treatment</option>
                      {treatmentTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <h3 className="font-semibold text-gray-800 mb-2">Booking Summary</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Date:</span>
                        <span className="font-semibold">{selectedDate}</span>
                      </div>
                      {selectedTherapist && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Therapist:</span>
                          <span className="font-semibold">
                            {mockTherapists.find(t => t.id === selectedTherapist)?.name}
                          </span>
                        </div>
                      )}
                      {selectedTimeSlot && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Time:</span>
                          <span className="font-semibold">{selectedTimeSlot}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={handleBookAppointment}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl"
                  >
                    Book Appointment
                  </button>
                </div>
              </div>

              {/* Today's Appointments Summary */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="font-bold text-gray-800 mb-3">Today's Schedule</h3>
                <div className="space-y-2">
                  {todayAppointments.length > 0 ? (
                    todayAppointments.map((apt) => (
                      <div
                        key={apt.id}
                        className="text-sm p-3 bg-gray-50 rounded-lg border border-gray-200"
                      >
                        <div className="font-semibold text-gray-800">{apt.time}</div>
                        <div className="text-gray-600">{apt.patientName}</div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500 text-center py-4">No appointments</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Appointments View */
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">All Appointments</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Patient</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Time</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Therapist</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Treatment</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {mockAppointments.map((apt) => {
                    const therapist = mockTherapists.find(t => t.id === apt.therapistId)
                    return (
                      <tr key={apt.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 font-semibold text-gray-800">{apt.patientName}</td>
                        <td className="py-3 px-4 text-gray-600">{apt.date}</td>
                        <td className="py-3 px-4 text-gray-600">{apt.time}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <span>{therapist?.avatar}</span>
                            <span className="text-gray-700">{therapist?.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-gray-600">{apt.treatmentType}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-semibold ${
                              apt.status === 'completed'
                                ? 'bg-green-100 text-green-700'
                                : apt.status === 'confirmed'
                                ? 'bg-blue-100 text-blue-700'
                                : 'bg-yellow-100 text-yellow-700'
                            }`}
                          >
                            {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                          </span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
