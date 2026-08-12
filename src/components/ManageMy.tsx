import React, { useState } from 'react'

interface Appointment {
  id: string
  clientName: string
  service: string
  date: string
  time: string
  duration: number
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled'
  notes?: string
}

interface TimeSlot {
  id: string
  date: string
  startTime: string
  endTime: string
  isAvailable: boolean
}

const MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt-001',
    clientName: 'Emma Johnson',
    service: 'Haircut & Style',
    date: '2026-08-15',
    time: '10:00',
    duration: 60,
    status: 'confirmed',
    notes: 'Prefers layers'
  },
  {
    id: 'apt-002',
    clientName: 'Michael Chen',
    service: 'Color Treatment',
    date: '2026-08-15',
    time: '14:00',
    duration: 120,
    status: 'confirmed',
    notes: 'First time color'
  },
  {
    id: 'apt-003',
    clientName: 'Sarah Williams',
    service: 'Deep Conditioning',
    date: '2026-08-16',
    time: '09:00',
    duration: 45,
    status: 'pending',
    notes: ''
  },
  {
    id: 'apt-004',
    clientName: 'David Martinez',
    service: 'Beard Trim',
    date: '2026-08-16',
    time: '11:30',
    duration: 30,
    status: 'confirmed',
    notes: ''
  },
  {
    id: 'apt-005',
    clientName: 'Lisa Anderson',
    service: 'Highlights',
    date: '2026-08-17',
    time: '13:00',
    duration: 150,
    status: 'confirmed',
    notes: 'Blonde highlights'
  },
  {
    id: 'apt-006',
    clientName: 'James Brown',
    service: 'Haircut',
    date: '2026-08-13',
    time: '15:00',
    duration: 45,
    status: 'completed',
    notes: ''
  }
]

const MOCK_TIME_SLOTS: TimeSlot[] = [
  { id: 'slot-001', date: '2026-08-15', startTime: '09:00', endTime: '10:00', isAvailable: true },
  { id: 'slot-002', date: '2026-08-15', startTime: '10:00', endTime: '11:00', isAvailable: false },
  { id: 'slot-003', date: '2026-08-15', startTime: '11:00', endTime: '12:00', isAvailable: true },
  { id: 'slot-004', date: '2026-08-15', startTime: '14:00', endTime: '16:00', isAvailable: false },
  { id: 'slot-005', date: '2026-08-16', startTime: '09:00', endTime: '10:00', isAvailable: false },
  { id: 'slot-006', date: '2026-08-16', startTime: '10:00', endTime: '11:00', isAvailable: true },
  { id: 'slot-007', date: '2026-08-16', startTime: '11:30', endTime: '12:00', isAvailable: false },
  { id: 'slot-008', date: '2026-08-17', startTime: '09:00', endTime: '10:00', isAvailable: true },
  { id: 'slot-009', date: '2026-08-17', startTime: '13:00', endTime: '15:30', isAvailable: false }
]

export default function ManageMy() {
  const [appointments, setAppointments] = useState<Appointment[]>(MOCK_APPOINTMENTS)
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>(MOCK_TIME_SLOTS)
  const [selectedDate, setSelectedDate] = useState<string>('2026-08-15')
  const [view, setView] = useState<'appointments' | 'availability'>('appointments')
  const [editingSlot, setEditingSlot] = useState<string | null>(null)

  const stylistName = 'Jessica Parker'

  const filterAppointmentsByDate = (date: string) => {
    return appointments.filter(apt => apt.date === date)
  }

  const filterSlotsByDate = (date: string) => {
    return timeSlots.filter(slot => slot.date === date)
  }

  const handleCancelAppointment = (appointmentId: string) => {
    setAppointments(prev =>
      prev.map(apt =>
        apt.id === appointmentId ? { ...apt, status: 'cancelled' as const } : apt
      )
    )
  }

  const handleCompleteAppointment = (appointmentId: string) => {
    setAppointments(prev =>
      prev.map(apt =>
        apt.id === appointmentId ? { ...apt, status: 'completed' as const } : apt
      )
    )
  }

  const handleToggleAvailability = (slotId: string) => {
    setTimeSlots(prev =>
      prev.map(slot =>
        slot.id === slotId ? { ...slot, isAvailable: !slot.isAvailable } : slot
      )
    )
    setEditingSlot(null)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'completed':
        return 'bg-gray-100 text-gray-800 border-gray-200'
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const upcomingDates = ['2026-08-15', '2026-08-16', '2026-08-17', '2026-08-18', '2026-08-19']

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Calendar</h1>
          <p className="text-gray-600">Welcome back, {stylistName}</p>
        </div>

        {/* View Toggle */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex gap-4">
            <button
              onClick={() => setView('appointments')}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                view === 'appointments'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              My Appointments
            </button>
            <button
              onClick={() => setView('availability')}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                view === 'availability'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Manage Availability
            </button>
          </div>
        </div>

        {/* Date Selector */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Select Date</h2>
          <div className="flex gap-3 overflow-x-auto">
            {upcomingDates.map(date => (
              <button
                key={date}
                onClick={() => setSelectedDate(date)}
                className={`px-4 py-3 rounded-lg border-2 min-w-max transition-colors ${
                  selectedDate === date
                    ? 'border-blue-600 bg-blue-50 text-blue-900'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="font-semibold">{new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}</div>
                <div className="text-sm">{new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Appointments View */}
        {view === 'appointments' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Appointments for {new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </h2>
            
            <div className="space-y-4">
              {filterAppointmentsByDate(selectedDate).length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <p className="text-lg">No appointments scheduled for this date</p>
                  <p className="text-sm mt-2">Your calendar is clear</p>
                </div>
              ) : (
                filterAppointmentsByDate(selectedDate).map(apt => (
                  <div
                    key={apt.id}
                    className="border-2 border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{apt.clientName}</h3>
                        <p className="text-gray-600">{apt.service}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(apt.status)}`}>
                        {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                      <div>
                        <span className="text-gray-500">Time:</span>
                        <span className="ml-2 font-medium text-gray-900">{apt.time}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Duration:</span>
                        <span className="ml-2 font-medium text-gray-900">{apt.duration} min</span>
                      </div>
                    </div>
                    
                    {apt.notes && (
                      <div className="mb-3 text-sm">
                        <span className="text-gray-500">Notes:</span>
                        <span className="ml-2 text-gray-900">{apt.notes}</span>
                      </div>
                    )}
                    
                    {apt.status !== 'completed' && apt.status !== 'cancelled' && (
                      <div className="flex gap-3 mt-4 pt-4 border-t border-gray-200">
                        <button
                          onClick={() => handleCompleteAppointment(apt.id)}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                        >
                          Mark Complete
                        </button>
                        <button
                          onClick={() => handleCancelAppointment(apt.id)}
                          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Availability View */}
        {view === 'availability' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Availability for {new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </h2>
            
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-900">
                <span className="font-semibold">Note:</span> Toggle time slots to update your availability. 
                Booked slots cannot be modified.
              </p>
            </div>

            <div className="space-y-3">
              {filterSlotsByDate(selectedDate).length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <p className="text-lg">No time slots configured for this date</p>
                </div>
              ) : (
                filterSlotsByDate(selectedDate).map(slot => (
                  <div
                    key={slot.id}
                    className={`border-2 rounded-lg p-4 flex justify-between items-center ${
                      slot.isAvailable
                        ? 'border-green-200 bg-green-50'
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div>
                      <div className="font-semibold text-gray-900">
                        {slot.startTime} - {slot.endTime}
                      </div>
                      <div className={`text-sm font-medium mt-1 ${
                        slot.isAvailable ? 'text-green-700' : 'text-gray-600'
                      }`}>
                        {slot.isAvailable ? 'Available for booking' : 'Unavailable / Booked'}
                      </div>
                    </div>
                    
                    <button
                      onClick={() => handleToggleAvailability(slot.id)}
                      className={`px-5 py-2 rounded-lg font-medium transition-colors ${
                        slot.isAvailable
                          ? 'bg-red-600 text-white hover:bg-red-700'
                          : 'bg-green-600 text-white hover:bg-green-700'
                      }`}
                    >
                      {slot.isAvailable ? 'Mark Unavailable' : 'Mark Available'}
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-200 border-2 border-green-300 rounded"></div>
                  <span className="text-gray-700">Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gray-200 border-2 border-gray-300 rounded"></div>
                  <span className="text-gray-700">Unavailable / Booked</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
