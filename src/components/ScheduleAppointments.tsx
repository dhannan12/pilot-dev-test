/**
 * ScheduleAppointments — Online dental appointment scheduling with emergency prioritization
 *
 * Features: Emergency prioritization, Available time slots, Dentist selection, Appointment type filtering, Real-time slot availability
 *
 * Ticket: SCRUM-752 | Branch: proto/SCRUM-747
 */

import React, { useState } from 'react'

interface TimeSlot {
  id: string
  date: string
  time: string
  dentist: string
  isAvailable: boolean
  isEmergency?: boolean
}

interface Dentist {
  id: string
  name: string
  specialty: string
}

interface AppointmentType {
  id: string
  name: string
  duration: string
  isEmergency: boolean
}

const MOCK_DENTISTS: Dentist[] = [
  { id: '1', name: 'Dr. Sarah Johnson', specialty: 'General Dentistry' },
  { id: '2', name: 'Dr. Michael Chen', specialty: 'Orthodontics' },
  { id: '3', name: 'Dr. Emily Rodriguez', specialty: 'Endodontics' },
  { id: '4', name: 'Dr. David Kim', specialty: 'Oral Surgery' },
  { id: '5', name: 'Dr. Jennifer Lee', specialty: 'Periodontics' },
]

const MOCK_APPOINTMENT_TYPES: AppointmentType[] = [
  { id: '1', name: 'Emergency Visit', duration: '30 min', isEmergency: true },
  { id: '2', name: 'General Checkup', duration: '45 min', isEmergency: false },
  { id: '3', name: 'Teeth Cleaning', duration: '60 min', isEmergency: false },
  { id: '4', name: 'Root Canal', duration: '90 min', isEmergency: false },
  { id: '5', name: 'Tooth Extraction', duration: '45 min', isEmergency: false },
  { id: '6', name: 'Emergency Pain Relief', duration: '30 min', isEmergency: true },
  { id: '7', name: 'Cavity Filling', duration: '60 min', isEmergency: false },
]

const MOCK_TIME_SLOTS: TimeSlot[] = [
  { id: '1', date: '2026-08-14', time: '08:00 AM', dentist: 'Dr. Sarah Johnson', isAvailable: true, isEmergency: true },
  { id: '2', date: '2026-08-14', time: '09:00 AM', dentist: 'Dr. Sarah Johnson', isAvailable: true },
  { id: '3', date: '2026-08-14', time: '10:30 AM', dentist: 'Dr. Michael Chen', isAvailable: true },
  { id: '4', date: '2026-08-14', time: '02:00 PM', dentist: 'Dr. Emily Rodriguez', isAvailable: true, isEmergency: true },
  { id: '5', date: '2026-08-14', time: '03:30 PM', dentist: 'Dr. David Kim', isAvailable: false },
  { id: '6', date: '2026-08-15', time: '08:00 AM', dentist: 'Dr. Jennifer Lee', isAvailable: true, isEmergency: true },
  { id: '7', date: '2026-08-15', time: '09:30 AM', dentist: 'Dr. Sarah Johnson', isAvailable: true },
  { id: '8', date: '2026-08-15', time: '11:00 AM', dentist: 'Dr. Michael Chen', isAvailable: true },
  { id: '9', date: '2026-08-15', time: '01:00 PM', dentist: 'Dr. Emily Rodriguez', isAvailable: true },
  { id: '10', date: '2026-08-15', time: '02:30 PM', dentist: 'Dr. David Kim', isAvailable: true, isEmergency: true },
  { id: '11', date: '2026-08-16', time: '08:30 AM', dentist: 'Dr. Jennifer Lee', isAvailable: true },
  { id: '12', date: '2026-08-16', time: '10:00 AM', dentist: 'Dr. Sarah Johnson', isAvailable: true, isEmergency: true },
  { id: '13', date: '2026-08-16', time: '01:30 PM', dentist: 'Dr. Michael Chen', isAvailable: true },
  { id: '14', date: '2026-08-16', time: '03:00 PM', dentist: 'Dr. Emily Rodriguez', isAvailable: false },
  { id: '15', date: '2026-08-16', time: '04:00 PM', dentist: 'Dr. David Kim', isAvailable: true },
]

export default function ScheduleAppointments() {
  const [selectedAppointmentType, setSelectedAppointmentType] = useState<string>('')
  const [selectedDentist, setSelectedDentist] = useState<string>('')
  const [selectedSlot, setSelectedSlot] = useState<string>('')
  const [patientName, setPatientName] = useState<string>('')
  const [patientEmail, setPatientEmail] = useState<string>('')
  const [patientPhone, setPatientPhone] = useState<string>('')
  const [notes, setNotes] = useState<string>('')
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)

  const selectedType = MOCK_APPOINTMENT_TYPES.find(t => t.id === selectedAppointmentType)
  const isEmergencyAppointment = selectedType?.isEmergency || false

  const filteredSlots = MOCK_TIME_SLOTS.filter(slot => {
    if (!slot.isAvailable) return false
    if (selectedDentist && slot.dentist !== selectedDentist) return false
    if (isEmergencyAppointment && !slot.isEmergency) return false
    return true
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedAppointmentType && selectedSlot && patientName && patientEmail && patientPhone) {
      setIsSubmitted(true)
    }
  }

  const handleReset = () => {
    setSelectedAppointmentType('')
    setSelectedDentist('')
    setSelectedSlot('')
    setPatientName('')
    setPatientEmail('')
    setPatientPhone('')
    setNotes('')
    setIsSubmitted(false)
  }

  if (isSubmitted) {
    const slot = MOCK_TIME_SLOTS.find(s => s.id === selectedSlot)
    const appointmentType = MOCK_APPOINTMENT_TYPES.find(t => t.id === selectedAppointmentType)
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
          <div className="text-center">
            <div className="mb-4 flex justify-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Appointment Confirmed!</h2>
            {isEmergencyAppointment && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 font-semibold">⚡ Emergency Appointment - Priority Booking</p>
              </div>
            )}
            <div className="mt-6 bg-gray-50 rounded-lg p-6 text-left">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Appointment Details:</h3>
              <div className="space-y-2 text-gray-600">
                <p><span className="font-medium">Patient:</span> {patientName}</p>
                <p><span className="font-medium">Email:</span> {patientEmail}</p>
                <p><span className="font-medium">Phone:</span> {patientPhone}</p>
                <p><span className="font-medium">Type:</span> {appointmentType?.name} ({appointmentType?.duration})</p>
                <p><span className="font-medium">Date:</span> {slot?.date}</p>
                <p><span className="font-medium">Time:</span> {slot?.time}</p>
                <p><span className="font-medium">Dentist:</span> {slot?.dentist}</p>
                {notes && <p><span className="font-medium">Notes:</span> {notes}</p>}
              </div>
            </div>
            <button
              onClick={handleReset}
              className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium"
            >
              Schedule Another Appointment
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Schedule Your Appointment</h1>
          <p className="text-gray-600 mb-6">Book your dental appointment online with ease. Emergency appointments are prioritized.</p>

          {isEmergencyAppointment && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
              <div className="flex items-center">
                <span className="text-2xl mr-3">⚡</span>
                <div>
                  <p className="font-bold text-red-800">Emergency Appointment Selected</p>
                  <p className="text-red-700 text-sm">Priority slots available - We'll see you as soon as possible</p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Appointment Type Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Appointment Type <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {MOCK_APPOINTMENT_TYPES.map(type => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setSelectedAppointmentType(type.id)}
                    className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                      selectedAppointmentType === type.id
                        ? type.isEmergency
                          ? 'border-red-500 bg-red-50'
                          : 'border-indigo-500 bg-indigo-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className={`font-semibold ${type.isEmergency ? 'text-red-800' : 'text-gray-800'}`}>
                          {type.isEmergency && '⚡ '}{type.name}
                        </p>
                        <p className="text-sm text-gray-600">{type.duration}</p>
                      </div>
                      {selectedAppointmentType === type.id && (
                        <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Dentist Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Preferred Dentist (Optional)
              </label>
              <select
                value={selectedDentist}
                onChange={(e) => setSelectedDentist(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Any Available Dentist</option>
                {MOCK_DENTISTS.map(dentist => (
                  <option key={dentist.id} value={dentist.name}>
                    {dentist.name} - {dentist.specialty}
                  </option>
                ))}
              </select>
            </div>

            {/* Time Slot Selection */}
            {selectedAppointmentType && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Select Time Slot <span className="text-red-500">*</span>
                </label>
                {filteredSlots.length === 0 ? (
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-yellow-800">No available slots match your criteria. Please adjust your selection.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto p-1">
                    {filteredSlots.map(slot => (
                      <button
                        key={slot.id}
                        type="button"
                        onClick={() => setSelectedSlot(slot.id)}
                        className={`p-3 rounded-lg border-2 transition-all duration-200 text-left ${
                          selectedSlot === slot.id
                            ? 'border-indigo-500 bg-indigo-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {slot.isEmergency && (
                          <span className="inline-block px-2 py-1 text-xs font-semibold bg-red-500 text-white rounded mb-1">
                            EMERGENCY SLOT
                          </span>
                        )}
                        <p className="font-semibold text-gray-800">{slot.date}</p>
                        <p className="text-sm text-gray-600">{slot.time}</p>
                        <p className="text-xs text-gray-500 mt-1">{slot.dentist}</p>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Patient Information */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Patient Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="John Doe"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={patientEmail}
                      onChange={(e) => setPatientEmail(e.target.value)}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={patientPhone}
                      onChange={(e) => setPatientPhone(e.target.value)}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Any special requirements or concerns..."
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={!selectedAppointmentType || !selectedSlot || !patientName || !patientEmail || !patientPhone}
                className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 font-semibold"
              >
                Confirm Appointment
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200 font-medium"
              >
                Reset
              </button>
            </div>
          </form>

          {/* Info Box */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">📋 Appointment Guidelines</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Emergency appointments are prioritized and have dedicated time slots</li>
              <li>• Please arrive 10 minutes before your scheduled time</li>
              <li>• Confirmation details will be sent to your email</li>
              <li>• For cancellations, please notify us 24 hours in advance</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
