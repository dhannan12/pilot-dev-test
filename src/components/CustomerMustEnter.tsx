/**
 * CustomerMustEnter — Booking form requiring customer contact number
 *
 * Features: contact validation, service selection, date/time picker, stylist selection, form validation
 *
 * Ticket: SCRUM-1289 | Branch: proto/SCRUM-1288
 */

import React, { useState } from 'react'

interface Service {
  id: string
  name: string
  duration: string
  price: string
}

interface Stylist {
  id: string
  name: string
  specialty: string
}

interface TimeSlot {
  id: string
  time: string
  available: boolean
}

const MOCK_SERVICES: Service[] = [
  { id: '1', name: 'Haircut', duration: '30 min', price: '$35' },
  { id: '2', name: 'Hair Coloring', duration: '90 min', price: '$85' },
  { id: '3', name: 'Styling', duration: '45 min', price: '$50' },
  { id: '4', name: 'Beard Trim', duration: '20 min', price: '$20' },
  { id: '5', name: 'Hair Treatment', duration: '60 min', price: '$65' },
]

const MOCK_STYLISTS: Stylist[] = [
  { id: '1', name: 'Sarah Johnson', specialty: 'Color Specialist' },
  { id: '2', name: 'Michael Chen', specialty: 'Cut & Style' },
  { id: '3', name: 'Emma Davis', specialty: 'Beard & Grooming' },
  { id: '4', name: 'James Wilson', specialty: 'Hair Treatments' },
  { id: '5', name: 'Olivia Martinez', specialty: 'Wedding Styling' },
]

const MOCK_TIMESLOTS: TimeSlot[] = [
  { id: '1', time: '09:00 AM', available: true },
  { id: '2', time: '10:00 AM', available: true },
  { id: '3', time: '11:00 AM', available: false },
  { id: '4', time: '01:00 PM', available: true },
  { id: '5', time: '02:00 PM', available: true },
  { id: '6', time: '03:00 PM', available: true },
  { id: '7', time: '04:00 PM', available: false },
  { id: '8', time: '05:00 PM', available: true },
]

export default function CustomerMustEnter() {
  const [customerName, setCustomerName] = useState('')
  const [contactNumber, setContactNumber] = useState('')
  const [email, setEmail] = useState('')
  const [selectedService, setSelectedService] = useState('')
  const [selectedStylist, setSelectedStylist] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [contactError, setContactError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const validateContactNumber = (number: string): boolean => {
    // Remove spaces and dashes for validation
    const cleaned = number.replace(/[\s-]/g, '')
    // Check if it's a valid phone number (10-15 digits)
    const phoneRegex = /^\d{10,15}$/
    return phoneRegex.test(cleaned)
  }

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setContactNumber(value)
    
    if (value.trim() === '') {
      setContactError('Contact number is required')
    } else if (!validateContactNumber(value)) {
      setContactError('Please enter a valid contact number (10-15 digits)')
    } else {
      setContactError('')
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate required fields
    if (!customerName || !contactNumber || !selectedService || !selectedStylist || !selectedDate || !selectedTime) {
      alert('Please fill in all required fields')
      return
    }

    // Validate contact number
    if (!validateContactNumber(contactNumber)) {
      setContactError('Please enter a valid contact number')
      return
    }

    // If all validations pass
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      // Reset form
      setCustomerName('')
      setContactNumber('')
      setEmail('')
      setSelectedService('')
      setSelectedStylist('')
      setSelectedDate('')
      setSelectedTime('')
      setContactError('')
    }, 3000)
  }

  const handleReset = () => {
    setCustomerName('')
    setContactNumber('')
    setEmail('')
    setSelectedService('')
    setSelectedStylist('')
    setSelectedDate('')
    setSelectedTime('')
    setContactError('')
    setSubmitted(false)
  }

  return (
    <div data-testid="customermustenter" className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Book Your Appointment</h1>
            <p className="text-gray-600">Fill in your details to schedule a service</p>
          </div>

          {submitted && (
            <div data-testid="customermustenter-success" className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
              ✓ Appointment booked successfully! We'll contact you at {contactNumber}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Customer Name */}
            <div>
              <label htmlFor="customer-name" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                id="customer-name"
                data-testid="customermustenter-name"
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Enter your full name"
              />
            </div>

            {/* Contact Number - REQUIRED */}
            <div>
              <label htmlFor="contact-number" className="block text-sm font-medium text-gray-700 mb-2">
                Contact Number <span className="text-red-500">*</span>
              </label>
              <input
                id="contact-number"
                data-testid="customermustenter-contact"
                type="tel"
                value={contactNumber}
                onChange={handleContactChange}
                required
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                  contactError ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="e.g., 1234567890"
              />
              {contactError && (
                <p data-testid="customermustenter-contact-error" className="mt-1 text-sm text-red-600">
                  {contactError}
                </p>
              )}
              <p className="mt-1 text-xs text-gray-500">We'll use this to confirm your appointment</p>
            </div>

            {/* Email - Optional */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email (Optional)
              </label>
              <input
                id="email"
                data-testid="customermustenter-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="your.email@example.com"
              />
            </div>

            {/* Service Selection */}
            <div>
              <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                Select Service <span className="text-red-500">*</span>
              </label>
              <select
                id="service"
                data-testid="customermustenter-service"
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="">Choose a service...</option>
                {MOCK_SERVICES.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.name} - {service.duration} ({service.price})
                  </option>
                ))}
              </select>
            </div>

            {/* Stylist Selection */}
            <div>
              <label htmlFor="stylist" className="block text-sm font-medium text-gray-700 mb-2">
                Select Stylist <span className="text-red-500">*</span>
              </label>
              <select
                id="stylist"
                data-testid="customermustenter-stylist"
                value={selectedStylist}
                onChange={(e) => setSelectedStylist(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="">Choose a stylist...</option>
                {MOCK_STYLISTS.map((stylist) => (
                  <option key={stylist.id} value={stylist.id}>
                    {stylist.name} - {stylist.specialty}
                  </option>
                ))}
              </select>
            </div>

            {/* Date Selection */}
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                Appointment Date <span className="text-red-500">*</span>
              </label>
              <input
                id="date"
                data-testid="customermustenter-date"
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                required
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            {/* Time Slot Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Available Time Slots <span className="text-red-500">*</span>
              </label>
              <div data-testid="customermustenter-timeslots" className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {MOCK_TIMESLOTS.map((slot) => (
                  <button
                    key={slot.id}
                    type="button"
                    data-testid="customermustenter-timeslot"
                    onClick={() => slot.available && setSelectedTime(slot.time)}
                    disabled={!slot.available}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      selectedTime === slot.time
                        ? 'bg-indigo-600 text-white'
                        : slot.available
                        ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        : 'bg-gray-50 text-gray-400 cursor-not-allowed line-through'
                    }`}
                  >
                    {slot.time}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                data-testid="customermustenter-submit"
                disabled={!!contactError || !contactNumber}
                className="flex-1 bg-indigo-600 text-white py-3 px-6 rounded-md font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                Book Appointment
              </button>
              <button
                type="button"
                data-testid="customermustenter-reset"
                onClick={handleReset}
                className="px-6 py-3 border border-gray-300 rounded-md font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
              >
                Reset
              </button>
            </div>
          </form>

          {/* Info Box */}
          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-md">
            <h3 className="text-sm font-semibold text-blue-900 mb-2">Important Information:</h3>
            <ul className="text-xs text-blue-800 space-y-1 list-disc list-inside">
              <li>Contact number is mandatory for appointment confirmation</li>
              <li>You will receive a confirmation call/SMS at the provided number</li>
              <li>Please arrive 10 minutes before your scheduled time</li>
              <li>Cancellations must be made at least 24 hours in advance</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
