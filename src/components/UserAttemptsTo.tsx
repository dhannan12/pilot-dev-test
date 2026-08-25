/**
 * UserAttemptsTo — Fishing trip booking form for West Ireland tourist town
 *
 * Features: trip type selection, date picker, participant count, contact details, special requests
 *
 * Ticket: SCRUM-1142 | Branch: proto/SCRUM-1140
 */

import React, { useState } from 'react'

interface FishingTrip {
  id: string
  name: string
  description: string
  duration: string
  price: number
  maxParticipants: number
}

const FISHING_TRIPS: FishingTrip[] = [
  {
    id: 'deep-sea',
    name: 'Deep Sea Fishing',
    description: 'Full day ocean fishing experience with experienced crew',
    duration: '8 hours',
    price: 120,
    maxParticipants: 12
  },
  {
    id: 'lake-fishing',
    name: 'Lake Fishing Adventure',
    description: 'Peaceful lake fishing in scenic West Ireland waters',
    duration: '4 hours',
    price: 65,
    maxParticipants: 8
  },
  {
    id: 'fly-fishing',
    name: 'Fly Fishing Experience',
    description: 'Learn fly fishing techniques in pristine river locations',
    duration: '3 hours',
    price: 85,
    maxParticipants: 6
  },
  {
    id: 'night-fishing',
    name: 'Night Fishing Expedition',
    description: 'Unique night fishing experience under the stars',
    duration: '5 hours',
    price: 95,
    maxParticipants: 10
  },
  {
    id: 'family-fishing',
    name: 'Family Fishing Trip',
    description: 'Family-friendly fishing trip suitable for all ages',
    duration: '3 hours',
    price: 55,
    maxParticipants: 15
  },
  {
    id: 'shore-fishing',
    name: 'Shore Fishing Tour',
    description: 'Guided shore fishing along the beautiful coastline',
    duration: '2 hours',
    price: 40,
    maxParticipants: 20
  }
]

export default function UserAttemptsTo() {
  const [selectedTrip, setSelectedTrip] = useState('')
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [date, setDate] = useState('')
  const [participants, setParticipants] = useState(1)
  const [specialRequests, setSpecialRequests] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const selectedTripData = FISHING_TRIPS.find(trip => trip.id === selectedTrip)

  if (submitted) {
    return (
      <div data-testid="userattemptsto" className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 p-6">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-xl p-8">
          <div className="text-center">
            <div className="mb-4">
              <svg className="w-16 h-16 mx-auto text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Booking Submitted!</h2>
            <p className="text-gray-600 mb-6">Thank you, {fullName}. We'll contact you shortly at {email} to confirm your fishing trip.</p>
            <button
              data-testid="userattemptsto-reset"
              onClick={() => setSubmitted(false)}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Book Another Trip
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div data-testid="userattemptsto" className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Book Your Fishing Trip</h1>
          <p className="text-gray-600 mb-8">Experience the best fishing adventures in West Ireland</p>

          {/* Trip Options */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Available Fishing Trips</h2>
            <div data-testid="userattemptsto-list" className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {FISHING_TRIPS.map(trip => (
                <div
                  key={trip.id}
                  data-testid="userattemptsto-item"
                  onClick={() => setSelectedTrip(trip.id)}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    selectedTrip === trip.id
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <h3 className="font-bold text-lg text-gray-800">{trip.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{trip.description}</p>
                  <div className="mt-3 flex justify-between items-center">
                    <span className="text-sm text-gray-500">{trip.duration}</span>
                    <span className="font-bold text-blue-600">€{trip.price}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Max: {trip.maxParticipants} people</p>
                </div>
              ))}
            </div>
          </div>

          {/* Booking Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="trip-select" className="block text-sm font-medium text-gray-700 mb-2">
                Selected Trip *
              </label>
              <select
                id="trip-select"
                data-testid="userattemptsto-trip"
                value={selectedTrip}
                onChange={(e) => setSelectedTrip(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Choose a fishing trip...</option>
                {FISHING_TRIPS.map(trip => (
                  <option key={trip.id} value={trip.id}>
                    {trip.name} - €{trip.price} ({trip.duration})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="full-name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  id="full-name"
                  type="text"
                  data-testid="userattemptsto-name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  id="email"
                  type="email"
                  data-testid="userattemptsto-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  id="phone"
                  type="tel"
                  data-testid="userattemptsto-phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="+353 123 4567"
                />
              </div>

              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Date *
                </label>
                <input
                  id="date"
                  type="date"
                  data-testid="userattemptsto-date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label htmlFor="participants" className="block text-sm font-medium text-gray-700 mb-2">
                Number of Participants *
              </label>
              <input
                id="participants"
                type="number"
                data-testid="userattemptsto-participants"
                value={participants}
                onChange={(e) => setParticipants(parseInt(e.target.value) || 1)}
                required
                min="1"
                max={selectedTripData?.maxParticipants || 20}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {selectedTripData && (
                <p className="text-sm text-gray-500 mt-1">
                  Maximum {selectedTripData.maxParticipants} participants for this trip
                </p>
              )}
            </div>

            <div>
              <label htmlFor="special-requests" className="block text-sm font-medium text-gray-700 mb-2">
                Special Requests or Questions
              </label>
              <textarea
                id="special-requests"
                data-testid="userattemptsto-requests"
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Any special requirements, dietary restrictions, or questions..."
              />
            </div>

            {selectedTripData && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-2">Booking Summary</h3>
                <div className="space-y-1 text-sm text-gray-700">
                  <p><span className="font-medium">Trip:</span> {selectedTripData.name}</p>
                  <p><span className="font-medium">Duration:</span> {selectedTripData.duration}</p>
                  <p><span className="font-medium">Price per person:</span> €{selectedTripData.price}</p>
                  <p><span className="font-medium">Participants:</span> {participants}</p>
                  <p className="text-lg font-bold text-blue-600 mt-2">
                    Total: €{selectedTripData.price * participants}
                  </p>
                </div>
              </div>
            )}

            <button
              type="submit"
              data-testid="userattemptsto-submit"
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
            >
              Submit Booking Request
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
