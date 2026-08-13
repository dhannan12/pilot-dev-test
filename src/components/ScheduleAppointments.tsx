/**
 * ScheduleAppointments — Patient appointment scheduling interface with 24-hour reminder system
 *
 * Features: appointment booking calendar, time slot selection, dentist selection, appointment confirmation, 24-hour reminder display
 *
 * Ticket: SCRUM-753 | Branch: proto/SCRUM-747
 */

import React, { useState } from 'react'

interface Appointment {
  id: string
  patientName: string
  dentistName: string
  date: string
  time: string
  type: string
  status: 'scheduled' | 'confirmed' | 'reminder-sent'
  reminderSent: boolean
  reminderTime?: string
}

interface TimeSlot {
  time: string
  available: boolean
}

interface Dentist {
  id: string
  name: string
  specialty: string
  available: boolean
}

const mockDentists: Dentist[] = [
  { id: 'd1', name: 'Dr. Sarah Johnson', specialty: 'General Dentistry', available: true },
  { id: 'd2', name: 'Dr. Michael Chen', specialty: 'Orthodontics', available: true },
  { id: 'd3', name: 'Dr. Emily Rodriguez', specialty: 'Cosmetic Dentistry', available: true },
  { id: 'd4', name: 'Dr. James Wilson', specialty: 'Pediatric Dentistry', available: true },
  { id: 'd5', name: 'Dr. Lisa Thompson', specialty: 'Oral Surgery', available: true }
]

const mockTimeSlots: TimeSlot[] = [
  { time: '09:00 AM', available: true },
  { time: '10:00 AM', available: true },
  { time: '11:00 AM', available: false },
  { time: '01:00 PM', available: true },
  { time: '02:00 PM', available: true },
  { time: '03:00 PM', available: true },
  { time: '04:00 PM', available: false }
]

const mockAppointments: Appointment[] = [
  {
    id: 'apt1',
    patientName: 'John Smith',
    dentistName: 'Dr. Sarah Johnson',
    date: '2026-08-14',
    time: '09:00 AM',
    type: 'Regular Checkup',
    status: 'reminder-sent',
    reminderSent: true,
    reminderTime: '2026-08-13 09:00 AM'
  },
  {
    id: 'apt2',
    patientName: 'Mary Williams',
    dentistName: 'Dr. Michael Chen',
    date: '2026-08-15',
    time: '10:00 AM',
    type: 'Teeth Cleaning',
    status: 'confirmed',
    reminderSent: false
  },
  {
    id: 'apt3',
    patientName: 'Robert Brown',
    dentistName: 'Dr. Emily Rodriguez',
    date: '2026-08-14',
    time: '02:00 PM',
    type: 'Cosmetic Consultation',
    status: 'reminder-sent',
    reminderSent: true,
    reminderTime: '2026-08-13 02:00 PM'
  },
  {
    id: 'apt4',
    patientName: 'Jennifer Davis',
    dentistName: 'Dr. James Wilson',
    date: '2026-08-16',
    time: '03:00 PM',
    type: 'Pediatric Checkup',
    status: 'scheduled',
    reminderSent: false
  },
  {
    id: 'apt5',
    patientName: 'Michael Garcia',
    dentistName: 'Dr. Lisa Thompson',
    date: '2026-08-17',
    time: '01:00 PM',
    type: 'Tooth Extraction',
    status: 'scheduled',
    reminderSent: false
  }
]

const appointmentTypes = [
  'Regular Checkup',
  'Teeth Cleaning',
  'Cosmetic Consultation',
  'Orthodontic Consultation',
  'Emergency Care',
  'Root Canal',
  'Tooth Extraction'
]

export default function ScheduleAppointments() {
  const [view, setView] = useState<'schedule' | 'list'>('schedule')
  const [selectedDentist, setSelectedDentist] = useState<string>('')
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [selectedTime, setSelectedTime] = useState<string>('')
  const [selectedType, setSelectedType] = useState<string>('')
  const [patientName, setPatientName] = useState<string>('')
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false)

  const handleScheduleAppointment = () => {
    if (patientName && selectedDentist && selectedDate && selectedTime && selectedType) {
      setShowConfirmation(true)
      setTimeout(() => {
        setShowConfirmation(false)
        // Reset form
        setPatientName('')
        setSelectedDentist('')
        setSelectedDate('')
        setSelectedTime('')
        setSelectedType('')
      }, 3000)
    }
  }

  const isFormValid = patientName && selectedDentist && selectedDate && selectedTime && selectedType

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Schedule Appointments</h1>
          <p className="text-gray-600">Book your dental appointment easily online. Reminders will be sent 24 hours before your scheduled time.</p>
        </div>

        {/* View Toggle */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setView('schedule')}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              view === 'schedule'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Schedule New Appointment
          </button>
          <button
            onClick={() => setView('list')}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              view === 'list'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            View Appointments
          </button>
        </div>

        {/* Confirmation Message */}
        {showConfirmation && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-lg mb-6">
            <div className="flex items-center">
              <span className="text-xl mr-3">✓</span>
              <div>
                <p className="font-semibold">Appointment Scheduled Successfully!</p>
                <p className="text-sm">You will receive a reminder 24 hours before your appointment.</p>
              </div>
            </div>
          </div>
        )}

        {view === 'schedule' ? (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Book Your Appointment</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Patient Information */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Patient Name *
                </label>
                <input
                  type="text"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Appointment Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Appointment Type *
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select appointment type</option>
                  {appointmentTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Appointment Date *
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Dentist Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Select Dentist *
                </label>
                <select
                  value={selectedDentist}
                  onChange={(e) => setSelectedDentist(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Choose a dentist</option>
                  {mockDentists.map((dentist) => (
                    <option key={dentist.id} value={dentist.name}>
                      {dentist.name} - {dentist.specialty}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Time Slots */}
            <div className="mt-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Available Time Slots *
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
                {mockTimeSlots.map((slot) => (
                  <button
                    key={slot.time}
                    onClick={() => slot.available && setSelectedTime(slot.time)}
                    disabled={!slot.available}
                    className={`px-4 py-3 rounded-lg font-medium transition-all ${
                      selectedTime === slot.time
                        ? 'bg-blue-600 text-white'
                        : slot.available
                        ? 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                        : 'bg-gray-50 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {slot.time}
                  </button>
                ))}
              </div>
            </div>

            {/* Reminder Notice */}
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start">
                <span className="text-blue-600 text-xl mr-3">ℹ️</span>
                <div>
                  <p className="font-semibold text-blue-900">24-Hour Reminder Service</p>
                  <p className="text-sm text-blue-700">
                    You will automatically receive a reminder notification 24 hours before your scheduled appointment time.
                  </p>
                </div>
              </div>
            </div>

            {/* Schedule Button */}
            <div className="mt-6">
              <button
                onClick={handleScheduleAppointment}
                disabled={!isFormValid}
                className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                  isFormValid
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Schedule Appointment
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Scheduled Appointments</h2>
            
            {mockAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{appointment.patientName}</h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          appointment.status === 'reminder-sent'
                            ? 'bg-green-100 text-green-800'
                            : appointment.status === 'confirmed'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {appointment.status === 'reminder-sent'
                          ? 'Reminder Sent'
                          : appointment.status === 'confirmed'
                          ? 'Confirmed'
                          : 'Scheduled'}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-600">
                      <p>
                        <span className="font-semibold">Dentist:</span> {appointment.dentistName}
                      </p>
                      <p>
                        <span className="font-semibold">Type:</span> {appointment.type}
                      </p>
                      <p>
                        <span className="font-semibold">Date:</span> {appointment.date}
                      </p>
                      <p>
                        <span className="font-semibold">Time:</span> {appointment.time}
                      </p>
                    </div>

                    {appointment.reminderSent && appointment.reminderTime && (
                      <div className="mt-3 bg-green-50 border border-green-200 rounded px-3 py-2">
                        <p className="text-sm text-green-800">
                          <span className="font-semibold">✓ Reminder sent:</span> {appointment.reminderTime}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 md:mt-0 md:ml-4 flex gap-2">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Reschedule
                    </button>
                    <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
