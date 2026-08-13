/**
 * SchedulePhysiotherapy — Patients can easily schedule physiotherapy appointments with automated 24-hour reminders
 *
 * Features: appointment calendar view, time slot selection, therapist selection, booking confirmation, 24-hour reminder display
 *
 * Ticket: SCRUM-723 | Branch: proto/SCRUM-717
 */

import React, { useState } from 'react'

interface PhysiotherapyAppointment {
  id: string
  patientName: string
  therapistName: string
  date: string
  time: string
  service: string
  reminderSent: boolean
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled'
}

interface TimeSlot {
  id: string
  time: string
  available: boolean
}

interface Therapist {
  id: string
  name: string
  specialty: string
  avatar: string
}

const mockTherapists: Therapist[] = [
  { id: '1', name: 'Dr. Sarah Johnson', specialty: 'Sports Injury', avatar: 'SJ' },
  { id: '2', name: 'Dr. Michael Chen', specialty: 'Post-Surgery Recovery', avatar: 'MC' },
  { id: '3', name: 'Dr. Emily Davis', specialty: 'Chronic Pain Management', avatar: 'ED' },
  { id: '4', name: 'Dr. James Wilson', specialty: 'Orthopedic Rehab', avatar: 'JW' },
  { id: '5', name: 'Dr. Amanda Brown', specialty: 'Neurological Rehab', avatar: 'AB' },
]

const mockTimeSlots: TimeSlot[] = [
  { id: '1', time: '08:00 AM', available: true },
  { id: '2', time: '09:00 AM', available: true },
  { id: '3', time: '10:00 AM', available: false },
  { id: '4', time: '11:00 AM', available: true },
  { id: '5', time: '01:00 PM', available: true },
  { id: '6', time: '02:00 PM', available: true },
  { id: '7', time: '03:00 PM', available: false },
  { id: '8', time: '04:00 PM', available: true },
]

const mockAppointments: PhysiotherapyAppointment[] = [
  {
    id: '1',
    patientName: 'John Smith',
    therapistName: 'Dr. Sarah Johnson',
    date: '2026-08-14',
    time: '09:00 AM',
    service: 'Sports Injury Assessment',
    reminderSent: true,
    status: 'confirmed',
  },
  {
    id: '2',
    patientName: 'Emma Wilson',
    therapistName: 'Dr. Michael Chen',
    date: '2026-08-15',
    time: '11:00 AM',
    service: 'Post-Surgery Recovery Session',
    reminderSent: false,
    status: 'scheduled',
  },
  {
    id: '3',
    patientName: 'Robert Davis',
    therapistName: 'Dr. Emily Davis',
    date: '2026-08-14',
    time: '02:00 PM',
    service: 'Chronic Pain Therapy',
    reminderSent: true,
    status: 'confirmed',
  },
  {
    id: '4',
    patientName: 'Lisa Anderson',
    therapistName: 'Dr. James Wilson',
    date: '2026-08-16',
    time: '10:00 AM',
    service: 'Orthopedic Rehabilitation',
    reminderSent: false,
    status: 'scheduled',
  },
  {
    id: '5',
    patientName: 'Michael Brown',
    therapistName: 'Dr. Amanda Brown',
    date: '2026-08-17',
    time: '01:00 PM',
    service: 'Neurological Rehabilitation',
    reminderSent: false,
    status: 'scheduled',
  },
]

export default function SchedulePhysiotherapy() {
  const [selectedDate, setSelectedDate] = useState<string>('2026-08-14')
  const [selectedTherapist, setSelectedTherapist] = useState<string>('')
  const [selectedTime, setSelectedTime] = useState<string>('')
  const [bookingSuccess, setBookingSuccess] = useState<boolean>(false)
  const [appointments] = useState<PhysiotherapyAppointment[]>(mockAppointments)

  const handleBookAppointment = () => {
    if (selectedTherapist && selectedTime && selectedDate) {
      setBookingSuccess(true)
      setTimeout(() => setBookingSuccess(false), 3000)
    }
  }

  const upcomingAppointments = appointments.filter(
    (apt) => apt.status === 'scheduled' || apt.status === 'confirmed'
  )

  const appointmentsWithReminders = upcomingAppointments.filter(
    (apt) => apt.reminderSent
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Schedule Physiotherapy Appointment
          </h1>
          <p className="text-gray-600">
            Book your session with our expert physiotherapists. Receive automated reminders 24 hours before your appointment.
          </p>
        </div>

        {/* Success Message */}
        {bookingSuccess && (
          <div className="mb-6 p-4 bg-green-100 border border-green-400 rounded-lg">
            <p className="text-green-800 font-semibold">
              ✓ Appointment booked successfully! You'll receive a reminder 24 hours before your session.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Booking Form */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">New Appointment</h2>

            {/* Date Selection */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Select Date
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min="2026-08-14"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Therapist Selection */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Select Therapist
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {mockTherapists.map((therapist) => (
                  <button
                    key={therapist.id}
                    onClick={() => setSelectedTherapist(therapist.id)}
                    className={`flex items-center p-4 border-2 rounded-lg transition-all ${
                      selectedTherapist === therapist.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold mr-3">
                      {therapist.avatar}
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-gray-900">{therapist.name}</p>
                      <p className="text-sm text-gray-600">{therapist.specialty}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Time Slot Selection */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Available Time Slots
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {mockTimeSlots.map((slot) => (
                  <button
                    key={slot.id}
                    onClick={() => slot.available && setSelectedTime(slot.time)}
                    disabled={!slot.available}
                    className={`py-3 px-4 rounded-lg font-medium transition-all ${
                      !slot.available
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : selectedTime === slot.time
                        ? 'bg-blue-500 text-white'
                        : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-blue-400'
                    }`}
                  >
                    {slot.time}
                    {!slot.available && (
                      <span className="block text-xs mt-1">Booked</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Book Button */}
            <button
              onClick={handleBookAppointment}
              disabled={!selectedTherapist || !selectedTime || !selectedDate}
              className={`w-full py-4 rounded-lg font-bold text-lg transition-all ${
                selectedTherapist && selectedTime && selectedDate
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-lg'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Book Appointment
            </button>
          </div>

          {/* Upcoming Appointments & Reminders */}
          <div className="lg:col-span-1 space-y-6">
            {/* Reminder Info Card */}
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-3">
                  <span className="text-2xl">🔔</span>
                </div>
                <h3 className="text-lg font-bold">24-Hour Reminders</h3>
              </div>
              <p className="text-sm text-blue-100">
                Automated reminders are sent 24 hours before your scheduled appointment to ensure you never miss a session.
              </p>
              <div className="mt-4 pt-4 border-t border-white border-opacity-20">
                <p className="text-sm font-semibold">
                  {appointmentsWithReminders.length} upcoming appointment{appointmentsWithReminders.length !== 1 ? 's' : ''} with reminders
                </p>
              </div>
            </div>

            {/* Upcoming Appointments List */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Upcoming Appointments
              </h3>
              <div className="space-y-3">
                {upcomingAppointments.map((apt) => (
                  <div
                    key={apt.id}
                    className="border-l-4 border-blue-500 bg-gray-50 p-4 rounded-r-lg"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <p className="font-semibold text-gray-900">{apt.therapistName}</p>
                      {apt.reminderSent && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                          Reminder Sent
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{apt.service}</p>
                    <div className="flex items-center mt-2 text-sm text-gray-500">
                      <span className="mr-3">📅 {apt.date}</span>
                      <span>🕐 {apt.time}</span>
                    </div>
                    <div className="mt-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        apt.status === 'confirmed'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
