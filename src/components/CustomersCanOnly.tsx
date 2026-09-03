/**
 * CustomersCanOnly — Booking system that enforces single appointment per time slot
 *
 * Features: Time slot selection, date picker, conflict detection, existing appointments display, booking validation
 *
 * Ticket: SCRUM-1294 | Branch: proto/SCRUM-1288
 */

import React, { useState } from 'react'

interface Appointment {
  id: string
  customerName: string
  date: string
  timeSlot: string
  service: string
  status: 'booked' | 'available'
}

const MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: '1',
    customerName: 'John Smith',
    date: '2026-09-10',
    timeSlot: '09:00 AM',
    service: 'Haircut',
    status: 'booked'
  },
  {
    id: '2',
    customerName: 'Sarah Johnson',
    date: '2026-09-10',
    timeSlot: '10:00 AM',
    service: 'Color Treatment',
    status: 'booked'
  },
  {
    id: '3',
    customerName: 'Michael Brown',
    date: '2026-09-11',
    timeSlot: '02:00 PM',
    service: 'Trim',
    status: 'booked'
  },
  {
    id: '4',
    customerName: 'Emily Davis',
    date: '2026-09-12',
    timeSlot: '11:00 AM',
    service: 'Styling',
    status: 'booked'
  },
  {
    id: '5',
    customerName: 'David Wilson',
    date: '2026-09-12',
    timeSlot: '03:00 PM',
    service: 'Beard Trim',
    status: 'booked'
  }
]

const TIME_SLOTS = [
  '09:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '01:00 PM',
  '02:00 PM',
  '03:00 PM',
  '04:00 PM',
  '05:00 PM'
]

export default function CustomersCanOnly() {
  const [appointments, setAppointments] = useState<Appointment[]>(MOCK_APPOINTMENTS)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [customerName, setCustomerName] = useState('')
  const [service, setService] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const isSlotBooked = (date: string, time: string): boolean => {
    return appointments.some(
      apt => apt.date === date && apt.timeSlot === time && apt.status === 'booked'
    )
  }

  const handleBookAppointment = (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage('')
    setSuccessMessage('')

    if (!selectedDate || !selectedTime || !customerName || !service) {
      setErrorMessage('Please fill in all fields')
      return
    }

    // Check if slot is already booked
    if (isSlotBooked(selectedDate, selectedTime)) {
      setErrorMessage(
        `This time slot is already booked. Please select a different date or time.`
      )
      return
    }

    // Create new appointment
    const newAppointment: Appointment = {
      id: String(Date.now()),
      customerName,
      date: selectedDate,
      timeSlot: selectedTime,
      service,
      status: 'booked'
    }

    setAppointments([...appointments, newAppointment])
    setSuccessMessage(
      `Appointment booked successfully for ${customerName} on ${selectedDate} at ${selectedTime}`
    )

    // Reset form
    setSelectedDate('')
    setSelectedTime('')
    setCustomerName('')
    setService('')
  }

  const getAvailableSlots = () => {
    if (!selectedDate) return []
    return TIME_SLOTS.filter(slot => !isSlotBooked(selectedDate, slot))
  }

  const getBookedSlots = () => {
    if (!selectedDate) return []
    return TIME_SLOTS.filter(slot => isSlotBooked(selectedDate, slot))
  }

  return (
    <div data-testid="customerscanonly" className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Appointment Booking System
        </h1>
        <p className="text-gray-600 mb-8">
          Book one appointment at a time for your selected date and time
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Booking Form */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Book New Appointment
            </h2>

            <form onSubmit={handleBookAppointment} className="space-y-4">
              <div>
                <label
                  htmlFor="customerName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Customer Name
                </label>
                <input
                  id="customerName"
                  type="text"
                  data-testid="customerscanonly-name"
                  value={customerName}
                  onChange={e => setCustomerName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label
                  htmlFor="service"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Service
                </label>
                <input
                  id="service"
                  type="text"
                  data-testid="customerscanonly-service"
                  value={service}
                  onChange={e => setService(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Haircut, Color, Styling"
                />
              </div>

              <div>
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Select Date
                </label>
                <input
                  id="date"
                  type="date"
                  data-testid="customerscanonly-date"
                  value={selectedDate}
                  onChange={e => {
                    setSelectedDate(e.target.value)
                    setSelectedTime('')
                    setErrorMessage('')
                  }}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {selectedDate && (
                <div>
                  <label
                    htmlFor="timeSlot"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Select Time Slot
                  </label>
                  <select
                    id="timeSlot"
                    data-testid="customerscanonly-timeslot"
                    value={selectedTime}
                    onChange={e => {
                      setSelectedTime(e.target.value)
                      setErrorMessage('')
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">-- Select a time --</option>
                    {getAvailableSlots().map(slot => (
                      <option key={slot} value={slot}>
                        {slot} (Available)
                      </option>
                    ))}
                    {getBookedSlots().map(slot => (
                      <option key={slot} value={slot} disabled>
                        {slot} (Booked)
                      </option>
                    ))}
                  </select>
                  {getAvailableSlots().length === 0 && (
                    <p className="text-sm text-red-600 mt-1">
                      No available slots for this date. Please choose another date.
                    </p>
                  )}
                </div>
              )}

              {errorMessage && (
                <div
                  data-testid="customerscanonly-error"
                  className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm"
                >
                  {errorMessage}
                </div>
              )}

              {successMessage && (
                <div
                  data-testid="customerscanonly-success"
                  className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md text-sm"
                >
                  {successMessage}
                </div>
              )}

              <button
                type="submit"
                data-testid="customerscanonly-submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
              >
                Book Appointment
              </button>
            </form>
          </div>

          {/* Existing Appointments List */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Booked Appointments
            </h2>

            <div data-testid="customerscanonly-list" className="space-y-3">
              {appointments.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  No appointments booked yet
                </p>
              ) : (
                appointments
                  .sort((a, b) => {
                    const dateCompare = a.date.localeCompare(b.date)
                    if (dateCompare !== 0) return dateCompare
                    return a.timeSlot.localeCompare(b.timeSlot)
                  })
                  .map(apt => (
                    <div
                      key={apt.id}
                      data-testid="customerscanonly-item"
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-gray-900">
                          {apt.customerName}
                        </h3>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {apt.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Service:</span> {apt.service}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Date:</span> {apt.date}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Time:</span> {apt.timeSlot}
                      </p>
                    </div>
                  ))
              )}
            </div>
          </div>
        </div>

        {/* Time Slot Legend */}
        {selectedDate && (
          <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Time Slot Availability for {selectedDate}
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
              {TIME_SLOTS.map(slot => {
                const isBooked = isSlotBooked(selectedDate, slot)
                return (
                  <div
                    key={slot}
                    data-testid="customerscanonly-slot"
                    className={`text-center py-2 px-3 rounded-md text-sm font-medium ${
                      isBooked
                        ? 'bg-red-100 text-red-700 border border-red-200'
                        : 'bg-green-100 text-green-700 border border-green-200'
                    }`}
                  >
                    <div>{slot}</div>
                    <div className="text-xs mt-1">
                      {isBooked ? 'Booked' : 'Available'}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
