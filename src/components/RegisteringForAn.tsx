/**
 * RegisteringForAn — Event registration form with email validation
 *
 * Features: email validation, event selection, error states, form submission, mock event data
 *
 * Ticket: SCRUM-1235 | Branch: proto/SCRUM-1233
 */

import React, { useState } from 'react'

interface Event {
  id: string
  name: string
  date: string
  location: string
  capacity: number
}

const MOCK_EVENTS: Event[] = [
  {
    id: 'evt-001',
    name: 'Summer Tech Conference 2026',
    date: '2026-09-15',
    location: 'San Francisco Convention Center',
    capacity: 500
  },
  {
    id: 'evt-002',
    name: 'Web Development Workshop',
    date: '2026-10-03',
    location: 'Online Virtual Event',
    capacity: 200
  },
  {
    id: 'evt-003',
    name: 'Product Design Bootcamp',
    date: '2026-10-20',
    location: 'New York Design Hub',
    capacity: 100
  },
  {
    id: 'evt-004',
    name: 'AI & Machine Learning Summit',
    date: '2026-11-08',
    location: 'Boston Tech Center',
    capacity: 300
  },
  {
    id: 'evt-005',
    name: 'Startup Founders Meetup',
    date: '2026-11-22',
    location: 'Austin Innovation Lab',
    capacity: 150
  },
  {
    id: 'evt-006',
    name: 'Cybersecurity Forum 2026',
    date: '2026-12-05',
    location: 'Washington DC Conference Hall',
    capacity: 400
  }
]

export default function RegisteringForAn() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventId: ''
  })
  const [emailError, setEmailError] = useState<string>('')
  const [submitted, setSubmitted] = useState(false)
  const [registrationSuccess, setRegistrationSuccess] = useState(false)

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value
    setFormData({ ...formData, email })
    
    if (email && !validateEmail(email)) {
      setEmailError('Please enter a valid email address')
    } else {
      setEmailError('')
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)

    if (!formData.name || !formData.email || !formData.eventId) {
      return
    }

    if (!validateEmail(formData.email)) {
      setEmailError('Please enter a valid email address')
      return
    }

    // Simulate successful registration
    setRegistrationSuccess(true)
    setTimeout(() => {
      setFormData({ name: '', email: '', phone: '', eventId: '' })
      setSubmitted(false)
      setRegistrationSuccess(false)
      setEmailError('')
    }, 3000)
  }

  const selectedEvent = MOCK_EVENTS.find(evt => evt.id === formData.eventId)

  return (
    <div data-testid="registeringforan" className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Event Registration</h1>
            <p className="text-gray-600">Register for upcoming events and workshops</p>
          </div>

          {registrationSuccess && (
            <div data-testid="registeringforan-success" className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md">
              <p className="font-semibold">Registration Successful!</p>
              <p className="text-sm">You will receive a confirmation email shortly.</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                type="text"
                data-testid="registeringforan-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                  submitted && !formData.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your full name"
              />
              {submitted && !formData.name && (
                <p className="mt-1 text-sm text-red-600">Name is required</p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                type="email"
                data-testid="registeringforan-email"
                value={formData.email}
                onChange={handleEmailChange}
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                  emailError || (submitted && !formData.email) ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="your.email@example.com"
              />
              {emailError && (
                <p data-testid="registeringforan-email-error" className="mt-1 text-sm text-red-600">{emailError}</p>
              )}
              {submitted && !formData.email && !emailError && (
                <p className="mt-1 text-sm text-red-600">Email is required</p>
              )}
            </div>

            {/* Phone Field */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                data-testid="registeringforan-phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="+1 (555) 123-4567"
              />
            </div>

            {/* Event Selection */}
            <div>
              <label htmlFor="event" className="block text-sm font-medium text-gray-700 mb-2">
                Select Event <span className="text-red-500">*</span>
              </label>
              <select
                id="event"
                data-testid="registeringforan-event"
                value={formData.eventId}
                onChange={(e) => setFormData({ ...formData, eventId: e.target.value })}
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                  submitted && !formData.eventId ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Choose an event...</option>
                {MOCK_EVENTS.map((event) => (
                  <option key={event.id} value={event.id}>
                    {event.name} - {new Date(event.date).toLocaleDateString()}
                  </option>
                ))}
              </select>
              {submitted && !formData.eventId && (
                <p className="mt-1 text-sm text-red-600">Please select an event</p>
              )}
            </div>

            {/* Event Details Preview */}
            {selectedEvent && (
              <div data-testid="registeringforan-preview" className="p-4 bg-indigo-50 border border-indigo-200 rounded-md">
                <h3 className="font-semibold text-indigo-900 mb-2">Event Details</h3>
                <div className="space-y-1 text-sm text-indigo-800">
                  <p><span className="font-medium">Event:</span> {selectedEvent.name}</p>
                  <p><span className="font-medium">Date:</span> {new Date(selectedEvent.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  <p><span className="font-medium">Location:</span> {selectedEvent.location}</p>
                  <p><span className="font-medium">Capacity:</span> {selectedEvent.capacity} attendees</p>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                data-testid="registeringforan-submit"
                className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors font-medium"
              >
                Register for Event
              </button>
            </div>
          </form>

          {/* Available Events List */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Available Events</h2>
            <ul data-testid="registeringforan-list" className="space-y-3">
              {MOCK_EVENTS.map((event) => (
                <li
                  key={event.id}
                  data-testid="registeringforan-item"
                  className="p-4 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900">{event.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{event.location}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-indigo-600">
                        {new Date(event.date).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{event.capacity} spots</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
