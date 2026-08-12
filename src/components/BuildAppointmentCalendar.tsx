import React, { useState } from 'react'

interface Appointment {
  id: string
  clientName: string
  stylistName: string
  service: string
  date: string
  time: string
  duration: number
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled'
  phone: string
}

const mockAppointments: Appointment[] = [
  {
    id: '1',
    clientName: 'Sarah Johnson',
    stylistName: 'Emma Williams',
    service: 'Hair Cut & Style',
    date: '2026-08-12',
    time: '09:00',
    duration: 60,
    status: 'confirmed',
    phone: '(555) 123-4567'
  },
  {
    id: '2',
    clientName: 'Michael Chen',
    stylistName: 'Olivia Brown',
    service: 'Color Treatment',
    date: '2026-08-12',
    time: '10:00',
    duration: 120,
    status: 'confirmed',
    phone: '(555) 234-5678'
  },
  {
    id: '3',
    clientName: 'Jessica Martinez',
    stylistName: 'Emma Williams',
    service: 'Keratin Treatment',
    date: '2026-08-12',
    time: '14:00',
    duration: 180,
    status: 'pending',
    phone: '(555) 345-6789'
  },
  {
    id: '4',
    clientName: 'David Thompson',
    stylistName: 'Sophia Davis',
    service: 'Beard Trim',
    date: '2026-08-13',
    time: '09:00',
    duration: 30,
    status: 'confirmed',
    phone: '(555) 456-7890'
  },
  {
    id: '5',
    clientName: 'Emily Rodriguez',
    stylistName: 'Olivia Brown',
    service: 'Highlights',
    date: '2026-08-13',
    time: '11:00',
    duration: 150,
    status: 'confirmed',
    phone: '(555) 567-8901'
  },
  {
    id: '6',
    clientName: 'James Wilson',
    stylistName: 'Emma Williams',
    service: 'Hair Cut',
    date: '2026-08-13',
    time: '15:00',
    duration: 45,
    status: 'completed',
    phone: '(555) 678-9012'
  },
  {
    id: '7',
    clientName: 'Ashley Lee',
    stylistName: 'Sophia Davis',
    service: 'Bridal Styling',
    date: '2026-08-14',
    time: '10:00',
    duration: 120,
    status: 'confirmed',
    phone: '(555) 789-0123'
  },
  {
    id: '8',
    clientName: 'Robert Garcia',
    stylistName: 'Olivia Brown',
    service: 'Hair Cut & Beard',
    date: '2026-08-14',
    time: '13:00',
    duration: 60,
    status: 'pending',
    phone: '(555) 890-1234'
  }
]

export default function BuildAppointmentCalendar() {
  const [selectedDate, setSelectedDate] = useState('2026-08-12')
  const [viewMode, setViewMode] = useState<'day' | 'week'>('day')

  // Get unique dates from appointments
  const availableDates = Array.from(
    new Set(mockAppointments.map(apt => apt.date))
  ).sort()

  // Filter appointments by selected date
  const filteredAppointments = mockAppointments.filter(
    apt => apt.date === selectedDate
  ).sort((a, b) => a.time.localeCompare(b.time))

  // Get status color
  const getStatusColor = (status: Appointment['status']) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 border-green-300'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      case 'completed':
        return 'bg-blue-100 text-blue-800 border-blue-300'
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-300'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  // Format date for display
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // Get time slots for day view
  const timeSlots = Array.from({ length: 13 }, (_, i) => {
    const hour = i + 8 // Start at 8 AM
    return `${hour.toString().padStart(2, '0')}:00`
  })

  // Check if there's an appointment at a given time
  const getAppointmentAtTime = (time: string) => {
    return filteredAppointments.find(apt => apt.time === time)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Appointment Calendar
          </h1>
          <p className="text-gray-600">
            Manage and view all salon appointments
          </p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            {/* View Mode Toggle */}
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('day')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  viewMode === 'day'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Day View
              </button>
              <button
                onClick={() => setViewMode('week')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  viewMode === 'week'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Week View
              </button>
            </div>

            {/* Date Selector */}
            <div className="flex items-center gap-3">
              <label htmlFor="date-select" className="text-gray-700 font-medium">
                Select Date:
              </label>
              <select
                id="date-select"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {availableDates.map(date => (
                  <option key={date} value={date}>
                    {formatDate(date)}
                  </option>
                ))}
              </select>
            </div>

            {/* Add New Appointment Button */}
            <button className="px-6 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors">
              + New Appointment
            </button>
          </div>
        </div>

        {/* Calendar Content */}
        <div className="bg-white rounded-lg shadow-md">
          {/* Date Header */}
          <div className="border-b border-gray-200 p-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              {formatDate(selectedDate)}
            </h2>
            <p className="text-gray-600 mt-1">
              {filteredAppointments.length} appointment(s) scheduled
            </p>
          </div>

          {viewMode === 'day' ? (
            /* Day View - Time Grid */
            <div className="p-6">
              <div className="space-y-2">
                {timeSlots.map(timeSlot => {
                  const appointment = getAppointmentAtTime(timeSlot)
                  
                  return (
                    <div
                      key={timeSlot}
                      className="flex items-start gap-4 border-b border-gray-100 pb-2"
                    >
                      {/* Time Column */}
                      <div className="w-20 flex-shrink-0 text-gray-600 font-medium pt-2">
                        {timeSlot}
                      </div>

                      {/* Appointment Slot */}
                      <div className="flex-1">
                        {appointment ? (
                          <div
                            className={`border-l-4 rounded-lg p-4 ${getStatusColor(
                              appointment.status
                            )}`}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h3 className="font-semibold text-lg">
                                  {appointment.clientName}
                                </h3>
                                <p className="text-sm mt-1">
                                  {appointment.service} ({appointment.duration} min)
                                </p>
                                <p className="text-sm mt-1">
                                  Stylist: {appointment.stylistName}
                                </p>
                                <p className="text-sm mt-1">
                                  Phone: {appointment.phone}
                                </p>
                              </div>
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${getStatusColor(
                                  appointment.status
                                )}`}
                              >
                                {appointment.status}
                              </span>
                            </div>
                          </div>
                        ) : (
                          <div className="h-12 border border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 text-sm">
                            Available
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ) : (
            /* Week View - List of Appointments */
            <div className="p-6">
              <div className="grid grid-cols-1 gap-4">
                {filteredAppointments.length > 0 ? (
                  filteredAppointments.map(appointment => (
                    <div
                      key={appointment.id}
                      className={`border rounded-lg p-4 ${getStatusColor(
                        appointment.status
                      )}`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <span className="text-lg font-semibold">
                              {appointment.time}
                            </span>
                            <span className="text-2xl font-bold">
                              {appointment.clientName}
                            </span>
                          </div>
                          <div className="mt-2 text-sm space-y-1">
                            <p>
                              <span className="font-medium">Service:</span>{' '}
                              {appointment.service} ({appointment.duration} min)
                            </p>
                            <p>
                              <span className="font-medium">Stylist:</span>{' '}
                              {appointment.stylistName}
                            </p>
                            <p>
                              <span className="font-medium">Phone:</span>{' '}
                              {appointment.phone}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <span
                            className={`px-4 py-2 rounded-full text-xs font-semibold uppercase ${getStatusColor(
                              appointment.status
                            )}`}
                          >
                            {appointment.status}
                          </span>
                          <div className="flex gap-2">
                            <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors">
                              Edit
                            </button>
                            <button className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors">
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <p className="text-lg">No appointments scheduled for this date</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-gray-600 text-sm font-medium">Total</h3>
            <p className="text-3xl font-bold text-gray-900 mt-2">
              {mockAppointments.length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-gray-600 text-sm font-medium">Confirmed</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">
              {mockAppointments.filter(a => a.status === 'confirmed').length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-gray-600 text-sm font-medium">Pending</h3>
            <p className="text-3xl font-bold text-yellow-600 mt-2">
              {mockAppointments.filter(a => a.status === 'pending').length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-gray-600 text-sm font-medium">Completed</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">
              {mockAppointments.filter(a => a.status === 'completed').length}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
