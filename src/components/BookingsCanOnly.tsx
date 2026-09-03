/**
 * BookingsCanOnly — Booking form that only allows submission when slots are available
 *
 * Features: slot availability checking, service selection, date picker, disabled state management, real-time validation
 *
 * Ticket: SCRUM-1290 | Branch: proto/SCRUM-1288
 */

import React, { useState } from 'react'

interface Service {
  id: string
  name: string
  duration: string
  price: string
}

interface TimeSlot {
  id: string
  time: string
  available: boolean
}

interface DateOption {
  id: string
  date: string
  displayDate: string
  hasAvailableSlots: boolean
  availableCount: number
}

const MOCK_SERVICES: Service[] = [
  { id: '1', name: 'Haircut', duration: '30 min', price: '$35' },
  { id: '2', name: 'Hair Coloring', duration: '90 min', price: '$85' },
  { id: '3', name: 'Styling', duration: '45 min', price: '$50' },
  { id: '4', name: 'Manicure', duration: '40 min', price: '$30' },
  { id: '5', name: 'Massage Therapy', duration: '60 min', price: '$70' },
]

const MOCK_DATES: DateOption[] = [
  { id: '1', date: '2026-09-04', displayDate: 'Thu, Sep 4', hasAvailableSlots: true, availableCount: 5 },
  { id: '2', date: '2026-09-05', displayDate: 'Fri, Sep 5', hasAvailableSlots: true, availableCount: 3 },
  { id: '3', date: '2026-09-06', displayDate: 'Sat, Sep 6', hasAvailableSlots: false, availableCount: 0 },
  { id: '4', date: '2026-09-07', displayDate: 'Sun, Sep 7', hasAvailableSlots: false, availableCount: 0 },
  { id: '5', date: '2026-09-08', displayDate: 'Mon, Sep 8', hasAvailableSlots: true, availableCount: 7 },
  { id: '6', date: '2026-09-09', displayDate: 'Tue, Sep 9', hasAvailableSlots: true, availableCount: 4 },
  { id: '7', date: '2026-09-10', displayDate: 'Wed, Sep 10', hasAvailableSlots: true, availableCount: 2 },
]

// Mock time slots that vary by date
const getTimeSlotsForDate = (dateId: string): TimeSlot[] => {
  const dateOption = MOCK_DATES.find(d => d.id === dateId)
  
  if (!dateOption || !dateOption.hasAvailableSlots) {
    return [
      { id: '1', time: '09:00 AM', available: false },
      { id: '2', time: '10:00 AM', available: false },
      { id: '3', time: '11:00 AM', available: false },
      { id: '4', time: '01:00 PM', available: false },
      { id: '5', time: '02:00 PM', available: false },
      { id: '6', time: '03:00 PM', available: false },
      { id: '7', time: '04:00 PM', available: false },
      { id: '8', time: '05:00 PM', available: false },
    ]
  }

  // Simulate different availability patterns
  const patterns: Record<string, TimeSlot[]> = {
    '1': [
      { id: '1', time: '09:00 AM', available: true },
      { id: '2', time: '10:00 AM', available: true },
      { id: '3', time: '11:00 AM', available: false },
      { id: '4', time: '01:00 PM', available: true },
      { id: '5', time: '02:00 PM', available: true },
      { id: '6', time: '03:00 PM', available: true },
      { id: '7', time: '04:00 PM', available: false },
      { id: '8', time: '05:00 PM', available: false },
    ],
    '2': [
      { id: '1', time: '09:00 AM', available: false },
      { id: '2', time: '10:00 AM', available: true },
      { id: '3', time: '11:00 AM', available: false },
      { id: '4', time: '01:00 PM', available: false },
      { id: '5', time: '02:00 PM', available: true },
      { id: '6', time: '03:00 PM', available: true },
      { id: '7', time: '04:00 PM', available: false },
      { id: '8', time: '05:00 PM', available: false },
    ],
    '5': [
      { id: '1', time: '09:00 AM', available: true },
      { id: '2', time: '10:00 AM', available: true },
      { id: '3', time: '11:00 AM', available: true },
      { id: '4', time: '01:00 PM', available: true },
      { id: '5', time: '02:00 PM', available: true },
      { id: '6', time: '03:00 PM', available: true },
      { id: '7', time: '04:00 PM', available: true },
      { id: '8', time: '05:00 PM', available: false },
    ],
    '6': [
      { id: '1', time: '09:00 AM', available: true },
      { id: '2', time: '10:00 AM', available: false },
      { id: '3', time: '11:00 AM', available: true },
      { id: '4', time: '01:00 PM', available: false },
      { id: '5', time: '02:00 PM', available: true },
      { id: '6', time: '03:00 PM', available: true },
      { id: '7', time: '04:00 PM', available: false },
      { id: '8', time: '05:00 PM', available: false },
    ],
    '7': [
      { id: '1', time: '09:00 AM', available: false },
      { id: '2', time: '10:00 AM', available: false },
      { id: '3', time: '11:00 AM', available: true },
      { id: '4', time: '01:00 PM', available: false },
      { id: '5', time: '02:00 PM', available: true },
      { id: '6', time: '03:00 PM', available: false },
      { id: '7', time: '04:00 PM', available: false },
      { id: '8', time: '05:00 PM', available: false },
    ],
  }

  return patterns[dateId] || patterns['1']
}

export default function BookingsCanOnly() {
  const [customerName, setCustomerName] = useState('')
  const [email, setEmail] = useState('')
  const [selectedService, setSelectedService] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([])
  const [submitted, setSubmitted] = useState(false)

  const handleDateChange = (dateId: string) => {
    setSelectedDate(dateId)
    setSelectedTime('') // Reset time when date changes
    const slots = getTimeSlotsForDate(dateId)
    setAvailableSlots(slots)
  }

  const hasAvailableSlots = availableSlots.some(slot => slot.available)
  const selectedDateOption = MOCK_DATES.find(d => d.id === selectedDate)
  const canSubmit = 
    customerName.trim() !== '' &&
    email.trim() !== '' &&
    selectedService !== '' &&
    selectedDate !== '' &&
    selectedTime !== '' &&
    hasAvailableSlots

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!canSubmit) {
      if (!hasAvailableSlots) {
        alert('Cannot submit booking: No available slots for the selected date')
      } else {
        alert('Please fill in all required fields')
      }
      return
    }

    const selectedSlot = availableSlots.find(slot => slot.id === selectedTime)
    if (selectedSlot && !selectedSlot.available) {
      alert('The selected time slot is not available')
      return
    }

    setSubmitted(true)
  }

  const handleReset = () => {
    setCustomerName('')
    setEmail('')
    setSelectedService('')
    setSelectedDate('')
    setSelectedTime('')
    setAvailableSlots([])
    setSubmitted(false)
  }

  if (submitted) {
    return (
      <div data-testid="bookingscanonly" className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Booking Confirmed!</h2>
              <p className="text-gray-600">Your appointment has been successfully scheduled.</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
              <h3 className="font-semibold text-gray-800 mb-4">Booking Details:</h3>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Name:</span> {customerName}</p>
                <p><span className="font-medium">Email:</span> {email}</p>
                <p><span className="font-medium">Service:</span> {MOCK_SERVICES.find(s => s.id === selectedService)?.name}</p>
                <p><span className="font-medium">Date:</span> {selectedDateOption?.displayDate}</p>
                <p><span className="font-medium">Time:</span> {availableSlots.find(s => s.id === selectedTime)?.time}</p>
              </div>
            </div>
            
            <button
              data-testid="bookingscanonly-new"
              onClick={handleReset}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
            >
              Book Another Appointment
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div data-testid="bookingscanonly" className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Book Your Appointment</h1>
          <p className="text-gray-600 mb-6">Fill in your details to schedule a service</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Customer Information */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  id="name"
                  type="text"
                  data-testid="bookingscanonly-name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  id="email"
                  type="email"
                  data-testid="bookingscanonly-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
            </div>

            {/* Service Selection */}
            <div>
              <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                Select Service *
              </label>
              <select
                id="service"
                data-testid="bookingscanonly-service"
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                required
              >
                <option value="">Choose a service...</option>
                {MOCK_SERVICES.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.name} - {service.duration} ({service.price})
                  </option>
                ))}
              </select>
            </div>

            {/* Date Selection */}
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                Select Date *
              </label>
              <select
                id="date"
                data-testid="bookingscanonly-date"
                value={selectedDate}
                onChange={(e) => handleDateChange(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                required
              >
                <option value="">Choose a date...</option>
                {MOCK_DATES.map((date) => (
                  <option key={date.id} value={date.id}>
                    {date.displayDate} - {date.hasAvailableSlots 
                      ? `${date.availableCount} slots available` 
                      : 'Fully booked'}
                  </option>
                ))}
              </select>
            </div>

            {/* Time Slot Selection */}
            {selectedDate && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Select Time Slot *
                </label>
                
                {!hasAvailableSlots && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                    <div className="flex items-start">
                      <svg className="w-5 h-5 text-red-600 mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <h4 className="text-sm font-semibold text-red-800">No Available Slots</h4>
                        <p className="text-sm text-red-700 mt-1">
                          The selected date has no available time slots. Please choose a different date.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div data-testid="bookingscanonly-slot-list" className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {availableSlots.map((slot) => (
                    <button
                      key={slot.id}
                      type="button"
                      data-testid="bookingscanonly-slot-item"
                      onClick={() => slot.available && setSelectedTime(slot.id)}
                      disabled={!slot.available}
                      className={`
                        px-4 py-3 rounded-lg border-2 text-sm font-medium transition-all
                        ${!slot.available 
                          ? 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed line-through' 
                          : selectedTime === slot.id
                            ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                            : 'border-gray-300 bg-white text-gray-700 hover:border-indigo-400'
                        }
                      `}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Availability Summary */}
            {selectedDate && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h4 className="text-sm font-semibold text-blue-800">Slot Availability</h4>
                    <p className="text-sm text-blue-700 mt-1">
                      {selectedDateOption?.hasAvailableSlots 
                        ? `${selectedDateOption.availableCount} time slot${selectedDateOption.availableCount !== 1 ? 's' : ''} available for ${selectedDateOption.displayDate}`
                        : `No slots available for ${selectedDateOption?.displayDate}. Booking cannot be submitted.`
                      }
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                data-testid="bookingscanonly-submit"
                disabled={!canSubmit}
                className={`
                  flex-1 py-3 px-6 rounded-lg font-semibold text-white transition-all
                  ${canSubmit
                    ? 'bg-indigo-600 hover:bg-indigo-700 cursor-pointer'
                    : 'bg-gray-300 cursor-not-allowed'
                  }
                `}
              >
                {!hasAvailableSlots && selectedDate 
                  ? 'No Available Slots - Cannot Submit' 
                  : 'Confirm Booking'
                }
              </button>
              
              <button
                type="button"
                data-testid="bookingscanonly-reset"
                onClick={handleReset}
                className="px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Reset
              </button>
            </div>

            {/* Disabled State Message */}
            {!canSubmit && selectedDate && (
              <p className="text-sm text-gray-600 text-center">
                {!hasAvailableSlots 
                  ? '⚠️ Booking submission is disabled because there are no available slots for the selected date'
                  : 'Please fill in all required fields and select an available time slot'
                }
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}
