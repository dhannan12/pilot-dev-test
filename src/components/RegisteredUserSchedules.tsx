/**
 * RegisteredUserSchedules — Appointment scheduling interface for registered users
 *
 * Features: service selection, tradesperson picker, date/time slots, appointment history, notes
 *
 * Ticket: SCRUM-1279 | Branch: proto/SCRUM-1277
 */

import React, { useState } from 'react'

interface Service {
  id: string
  name: string
  duration: number
}

interface Tradesperson {
  id: string
  name: string
  specialty: string
  rating: number
}

interface TimeSlot {
  id: string
  time: string
  available: boolean
}

interface Appointment {
  id: string
  service: string
  tradesperson: string
  date: string
  time: string
  status: 'scheduled' | 'completed' | 'cancelled'
  notes: string
}

const MOCK_SERVICES: Service[] = [
  { id: 's1', name: 'Plumbing Repair', duration: 60 },
  { id: 's2', name: 'Electrical Installation', duration: 90 },
  { id: 's3', name: 'HVAC Maintenance', duration: 120 },
  { id: 's4', name: 'Carpentry Work', duration: 180 },
  { id: 's5', name: 'Painting Service', duration: 240 },
]

const MOCK_TRADESPEOPLE: Tradesperson[] = [
  { id: 't1', name: 'John Smith', specialty: 'Plumbing', rating: 4.8 },
  { id: 't2', name: 'Sarah Johnson', specialty: 'Electrical', rating: 4.9 },
  { id: 't3', name: 'Mike Davis', specialty: 'HVAC', rating: 4.7 },
  { id: 't4', name: 'Emily Brown', specialty: 'Carpentry', rating: 4.6 },
  { id: 't5', name: 'David Wilson', specialty: 'Painting', rating: 4.8 },
]

const MOCK_TIME_SLOTS: TimeSlot[] = [
  { id: 'ts1', time: '09:00 AM', available: true },
  { id: 'ts2', time: '10:00 AM', available: true },
  { id: 'ts3', time: '11:00 AM', available: false },
  { id: 'ts4', time: '01:00 PM', available: true },
  { id: 'ts5', time: '02:00 PM', available: true },
  { id: 'ts6', time: '03:00 PM', available: true },
  { id: 'ts7', time: '04:00 PM', available: false },
]

const MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: 'a1',
    service: 'Plumbing Repair',
    tradesperson: 'John Smith',
    date: '2026-09-05',
    time: '10:00 AM',
    status: 'scheduled',
    notes: 'Fix kitchen sink leak',
  },
  {
    id: 'a2',
    service: 'Electrical Installation',
    tradesperson: 'Sarah Johnson',
    date: '2026-08-28',
    time: '02:00 PM',
    status: 'completed',
    notes: 'Install ceiling fan',
  },
  {
    id: 'a3',
    service: 'HVAC Maintenance',
    tradesperson: 'Mike Davis',
    date: '2026-08-15',
    time: '09:00 AM',
    status: 'completed',
    notes: 'Annual AC checkup',
  },
  {
    id: 'a4',
    service: 'Carpentry Work',
    tradesperson: 'Emily Brown',
    date: '2026-08-20',
    time: '01:00 PM',
    status: 'cancelled',
    notes: 'Build custom shelving',
  },
  {
    id: 'a5',
    service: 'Painting Service',
    tradesperson: 'David Wilson',
    date: '2026-09-10',
    time: '09:00 AM',
    status: 'scheduled',
    notes: 'Paint living room',
  },
]

export default function RegisteredUserSchedules() {
  const [selectedService, setSelectedService] = useState('')
  const [selectedTradesperson, setSelectedTradesperson] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [notes, setNotes] = useState('')
  const [appointments] = useState<Appointment[]>(MOCK_APPOINTMENTS)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedService && selectedTradesperson && selectedDate && selectedTime) {
      setShowSuccess(true)
      setTimeout(() => {
        setShowSuccess(false)
        setSelectedService('')
        setSelectedTradesperson('')
        setSelectedDate('')
        setSelectedTime('')
        setNotes('')
      }, 3000)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800'
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div data-testid="registereduserschedules" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Schedule an Appointment</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Scheduling Form */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">New Appointment</h2>

            {showSuccess && (
              <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800 font-medium">
                  Appointment scheduled successfully!
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Service Selection */}
              <div>
                <label
                  htmlFor="service"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Select Service
                </label>
                <select
                  id="service"
                  data-testid="registereduserschedules-service"
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Choose a service...</option>
                  {MOCK_SERVICES.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.name} ({service.duration} min)
                    </option>
                  ))}
                </select>
              </div>

              {/* Tradesperson Selection */}
              <div>
                <label
                  htmlFor="tradesperson"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Select Tradesperson
                </label>
                <select
                  id="tradesperson"
                  data-testid="registereduserschedules-tradesperson"
                  value={selectedTradesperson}
                  onChange={(e) => setSelectedTradesperson(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Choose a tradesperson...</option>
                  {MOCK_TRADESPEOPLE.map((person) => (
                    <option key={person.id} value={person.id}>
                      {person.name} - {person.specialty} (⭐ {person.rating})
                    </option>
                  ))}
                </select>
              </div>

              {/* Date Selection */}
              <div>
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Select Date
                </label>
                <input
                  id="date"
                  type="date"
                  data-testid="registereduserschedules-date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Time Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Time
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {MOCK_TIME_SLOTS.map((slot) => (
                    <button
                      key={slot.id}
                      type="button"
                      data-testid="registereduserschedules-timeslot"
                      onClick={() => slot.available && setSelectedTime(slot.time)}
                      disabled={!slot.available}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        selectedTime === slot.time
                          ? 'bg-blue-600 text-white'
                          : slot.available
                          ? 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                          : 'bg-gray-50 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div>
                <label
                  htmlFor="notes"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Additional Notes (Optional)
                </label>
                <textarea
                  id="notes"
                  data-testid="registereduserschedules-notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  placeholder="Any specific requirements or concerns..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                data-testid="registereduserschedules-submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                disabled={!selectedService || !selectedTradesperson || !selectedDate || !selectedTime}
              >
                Schedule Appointment
              </button>
            </form>
          </div>

          {/* Appointment History */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Your Appointments</h2>

            <div data-testid="registereduserschedules-list" className="space-y-4">
              {appointments.map((appointment) => (
                <div
                  key={appointment.id}
                  data-testid="registereduserschedules-item"
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">{appointment.service}</h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        appointment.status
                      )}`}
                    >
                      {appointment.status}
                    </span>
                  </div>

                  <div className="space-y-1 text-sm text-gray-600">
                    <p>
                      <span className="font-medium">Tradesperson:</span> {appointment.tradesperson}
                    </p>
                    <p>
                      <span className="font-medium">Date:</span>{' '}
                      {new Date(appointment.date).toLocaleDateString('en-US', {
                        weekday: 'short',
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </p>
                    <p>
                      <span className="font-medium">Time:</span> {appointment.time}
                    </p>
                    {appointment.notes && (
                      <p>
                        <span className="font-medium">Notes:</span> {appointment.notes}
                      </p>
                    )}
                  </div>

                  {appointment.status === 'scheduled' && (
                    <div className="mt-3 flex gap-2">
                      <button
                        data-testid="registereduserschedules-reschedule"
                        className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Reschedule
                      </button>
                      <button
                        data-testid="registereduserschedules-cancel"
                        className="text-sm text-red-600 hover:text-red-800 font-medium"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
