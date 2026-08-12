import React, { useState } from 'react'

// Mock data for available services
const SERVICES = [
  { id: '1', name: 'Haircut', duration: 30, price: 50 },
  { id: '2', name: 'Hair Coloring', duration: 90, price: 120 },
  { id: '3', name: 'Blowout', duration: 45, price: 60 },
  { id: '4', name: 'Hair Treatment', duration: 60, price: 80 },
  { id: '5', name: 'Styling', duration: 40, price: 55 },
]

// Mock data for available stylists
const STYLISTS = [
  { id: '1', name: 'Emily Rodriguez', specialty: 'Haircut & Styling' },
  { id: '2', name: 'Michael Chen', specialty: 'Hair Coloring' },
  { id: '3', name: 'Sarah Johnson', specialty: 'Blowout & Treatment' },
  { id: '4', name: 'David Kim', specialty: 'All Services' },
  { id: '5', name: 'Jessica Taylor', specialty: 'Haircut & Coloring' },
]

// Mock data for available time slots
const TIME_SLOTS = [
  { id: '1', time: '09:00 AM', available: true },
  { id: '2', time: '10:00 AM', available: true },
  { id: '3', time: '11:00 AM', available: false },
  { id: '4', time: '01:00 PM', available: true },
  { id: '5', time: '02:00 PM', available: true },
  { id: '6', time: '03:00 PM', available: true },
  { id: '7', time: '04:00 PM', available: false },
]

interface BookingForm {
  service: string
  stylist: string
  date: string
  timeSlot: string
  email: string
  name: string
  phone: string
}

export default function EasilyBook() {
  const [formData, setFormData] = useState<BookingForm>({
    service: '',
    stylist: '',
    date: '',
    timeSlot: '',
    email: '',
    name: '',
    phone: '',
  })

  const [emailError, setEmailError] = useState<string>('')
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)

  // Email validation function
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value
    setFormData({ ...formData, email })
    
    if (email && !validateEmail(email)) {
      setEmailError('Please provide a valid email address')
    } else {
      setEmailError('')
    }
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate email before submission
    if (!formData.email) {
      setEmailError('Email address is required to receive booking confirmation')
      return
    }

    if (!validateEmail(formData.email)) {
      setEmailError('Please provide a valid email address')
      return
    }

    // Check all required fields
    if (
      !formData.service ||
      !formData.stylist ||
      !formData.date ||
      !formData.timeSlot ||
      !formData.name
    ) {
      return
    }

    // Simulate successful booking
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center py-8">
          <div className="mb-4">
            <svg
              className="w-16 h-16 text-green-500 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Booking Confirmed!
          </h2>
          <p className="text-gray-600 mb-4">
            A confirmation email has been sent to{' '}
            <span className="font-semibold">{formData.email}</span>
          </p>
          <div className="bg-gray-50 rounded-lg p-4 text-left max-w-md mx-auto">
            <h3 className="font-semibold text-gray-800 mb-2">
              Appointment Details
            </h3>
            <div className="space-y-1 text-sm text-gray-600">
              <p>
                <span className="font-medium">Service:</span>{' '}
                {SERVICES.find((s) => s.id === formData.service)?.name}
              </p>
              <p>
                <span className="font-medium">Stylist:</span>{' '}
                {STYLISTS.find((s) => s.id === formData.stylist)?.name}
              </p>
              <p>
                <span className="font-medium">Date:</span> {formData.date}
              </p>
              <p>
                <span className="font-medium">Time:</span>{' '}
                {TIME_SLOTS.find((t) => t.id === formData.timeSlot)?.time}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setIsSubmitted(false)
              setFormData({
                service: '',
                stylist: '',
                date: '',
                timeSlot: '',
                email: '',
                name: '',
                phone: '',
              })
            }}
            className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Book Another Appointment
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        Book Your Appointment
      </h1>
      <p className="text-gray-600 mb-6">
        Easily book your appointment online. A confirmation will be sent to your
        email.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Service Selection */}
        <div>
          <label
            htmlFor="service"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Select Service *
          </label>
          <select
            id="service"
            name="service"
            value={formData.service}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Choose a service</option>
            {SERVICES.map((service) => (
              <option key={service.id} value={service.id}>
                {service.name} - ${service.price} ({service.duration} min)
              </option>
            ))}
          </select>
        </div>

        {/* Stylist Selection */}
        <div>
          <label
            htmlFor="stylist"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Select Stylist *
          </label>
          <select
            id="stylist"
            name="stylist"
            value={formData.stylist}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Choose a stylist</option>
            {STYLISTS.map((stylist) => (
              <option key={stylist.id} value={stylist.id}>
                {stylist.name} - {stylist.specialty}
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
            Select Date *
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            required
            min={new Date().toISOString().split('T')[0]}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Time Slot Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Time Slot *
          </label>
          <div className="grid grid-cols-3 gap-3">
            {TIME_SLOTS.map((slot) => (
              <button
                key={slot.id}
                type="button"
                disabled={!slot.available}
                onClick={() => setFormData({ ...formData, timeSlot: slot.id })}
                className={`px-4 py-2 rounded-lg border-2 transition-colors ${
                  formData.timeSlot === slot.id
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : slot.available
                    ? 'border-gray-300 hover:border-blue-300'
                    : 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                {slot.time}
              </button>
            ))}
          </div>
        </div>

        {/* Client Information */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Your Information
          </h3>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleEmailChange}
                required
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  emailError ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="your.email@example.com"
              />
              {emailError && (
                <p className="mt-1 text-sm text-red-600">{emailError}</p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                You will receive booking confirmation at this email address
              </p>
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Phone Number (Optional)
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="(555) 123-4567"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={!!emailError || !formData.email}
            className="w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            Confirm Booking
          </button>
        </div>
      </form>
    </div>
  )
}
