/**
 * AdminAttemptsTo — Admin interface for booking a venue for a sports fixture
 *
 * Features: fixture selection, venue selection, booking form, availability status, confirmation display
 *
 * Ticket: SCRUM-1272 | Branch: proto/SCRUM-1265
 */

import React, { useState } from 'react'

interface Fixture {
  id: string
  homeTeam: string
  awayTeam: string
  date: string
  time: string
  status: 'pending' | 'confirmed'
}

interface Venue {
  id: string
  name: string
  location: string
  capacity: number
  available: boolean
}

interface Booking {
  id: string
  fixtureId: string
  venueId: string
  notes: string
  bookedAt: string
}

const MOCK_FIXTURES: Fixture[] = [
  {
    id: 'FIX-001',
    homeTeam: 'Manchester United',
    awayTeam: 'Liverpool FC',
    date: '2026-09-15',
    time: '15:00',
    status: 'pending'
  },
  {
    id: 'FIX-002',
    homeTeam: 'Chelsea FC',
    awayTeam: 'Arsenal FC',
    date: '2026-09-16',
    time: '17:30',
    status: 'pending'
  },
  {
    id: 'FIX-003',
    homeTeam: 'Tottenham Hotspur',
    awayTeam: 'Newcastle United',
    date: '2026-09-17',
    time: '14:00',
    status: 'pending'
  },
  {
    id: 'FIX-004',
    homeTeam: 'Aston Villa',
    awayTeam: 'Brighton & Hove Albion',
    date: '2026-09-18',
    time: '19:45',
    status: 'pending'
  },
  {
    id: 'FIX-005',
    homeTeam: 'West Ham United',
    awayTeam: 'Everton FC',
    date: '2026-09-19',
    time: '12:30',
    status: 'confirmed'
  }
]

const MOCK_VENUES: Venue[] = [
  {
    id: 'VEN-001',
    name: 'Old Trafford',
    location: 'Manchester',
    capacity: 74879,
    available: true
  },
  {
    id: 'VEN-002',
    name: 'Stamford Bridge',
    location: 'London',
    capacity: 40343,
    available: true
  },
  {
    id: 'VEN-003',
    name: 'Emirates Stadium',
    location: 'London',
    capacity: 60704,
    available: false
  },
  {
    id: 'VEN-004',
    name: 'Tottenham Hotspur Stadium',
    location: 'London',
    capacity: 62850,
    available: true
  },
  {
    id: 'VEN-005',
    name: 'Etihad Stadium',
    location: 'Manchester',
    capacity: 53400,
    available: true
  },
  {
    id: 'VEN-006',
    name: 'Anfield',
    location: 'Liverpool',
    capacity: 53394,
    available: true
  }
]

export default function AdminAttemptsTo() {
  const [selectedFixtureId, setSelectedFixtureId] = useState<string>('')
  const [selectedVenueId, setSelectedVenueId] = useState<string>('')
  const [notes, setNotes] = useState<string>('')
  const [bookings, setBookings] = useState<Booking[]>([])
  const [showSuccess, setShowSuccess] = useState<boolean>(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!selectedFixtureId || !selectedVenueId) {
      return
    }

    const newBooking: Booking = {
      id: `BOOK-${Date.now()}`,
      fixtureId: selectedFixtureId,
      venueId: selectedVenueId,
      notes,
      bookedAt: new Date().toISOString()
    }

    setBookings([...bookings, newBooking])
    setShowSuccess(true)
    
    // Reset form
    setSelectedFixtureId('')
    setSelectedVenueId('')
    setNotes('')

    // Hide success message after 3 seconds
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const selectedFixture = MOCK_FIXTURES.find(f => f.id === selectedFixtureId)
  const selectedVenue = MOCK_VENUES.find(v => v.id === selectedVenueId)

  return (
    <div data-testid="adminattemptsto" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Venue Booking System
          </h1>
          <p className="text-gray-600">
            Book a venue for upcoming fixtures
          </p>
        </header>

        {showSuccess && (
          <div
            data-testid="adminattemptsto-success"
            className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg"
          >
            ✓ Venue successfully booked for fixture!
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Booking Form */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Create Booking
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Fixture Selection */}
              <div>
                <label
                  htmlFor="fixture-select"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Select Fixture
                </label>
                <select
                  id="fixture-select"
                  data-testid="adminattemptsto-fixture"
                  value={selectedFixtureId}
                  onChange={(e) => setSelectedFixtureId(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">-- Select a fixture --</option>
                  {MOCK_FIXTURES.filter(f => f.status === 'pending').map((fixture) => (
                    <option key={fixture.id} value={fixture.id}>
                      {fixture.homeTeam} vs {fixture.awayTeam} - {fixture.date} {fixture.time}
                    </option>
                  ))}
                </select>
              </div>

              {/* Venue Selection */}
              <div>
                <label
                  htmlFor="venue-select"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Select Venue
                </label>
                <select
                  id="venue-select"
                  data-testid="adminattemptsto-venue"
                  value={selectedVenueId}
                  onChange={(e) => setSelectedVenueId(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">-- Select a venue --</option>
                  {MOCK_VENUES.filter(v => v.available).map((venue) => (
                    <option key={venue.id} value={venue.id}>
                      {venue.name} - {venue.location} (Capacity: {venue.capacity.toLocaleString()})
                    </option>
                  ))}
                </select>
              </div>

              {/* Notes */}
              <div>
                <label
                  htmlFor="notes-input"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Notes (Optional)
                </label>
                <textarea
                  id="notes-input"
                  data-testid="adminattemptsto-notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Add any special requirements or notes..."
                />
              </div>

              {/* Booking Preview */}
              {selectedFixture && selectedVenue && (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
                  <h3 className="font-semibold text-blue-900 mb-2">Booking Preview</h3>
                  <div className="text-sm text-blue-800 space-y-1">
                    <p><strong>Fixture:</strong> {selectedFixture.homeTeam} vs {selectedFixture.awayTeam}</p>
                    <p><strong>Date:</strong> {selectedFixture.date} at {selectedFixture.time}</p>
                    <p><strong>Venue:</strong> {selectedVenue.name}, {selectedVenue.location}</p>
                    <p><strong>Capacity:</strong> {selectedVenue.capacity.toLocaleString()} seats</p>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                data-testid="adminattemptsto-submit"
                disabled={!selectedFixtureId || !selectedVenueId}
                className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Book Venue
              </button>
            </form>
          </div>

          {/* Available Venues List */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Available Venues
            </h2>
            <div data-testid="adminattemptsto-list" className="space-y-3">
              {MOCK_VENUES.map((venue) => (
                <div
                  key={venue.id}
                  data-testid="adminattemptsto-item"
                  className={`p-4 border rounded-lg ${
                    venue.available
                      ? 'border-green-200 bg-green-50'
                      : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900">{venue.name}</h3>
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded ${
                        venue.available
                          ? 'bg-green-200 text-green-800'
                          : 'bg-red-200 text-red-800'
                      }`}
                    >
                      {venue.available ? 'Available' : 'Unavailable'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">
                    📍 {venue.location}
                  </p>
                  <p className="text-sm text-gray-600">
                    👥 Capacity: {venue.capacity.toLocaleString()} seats
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Booking History */}
        {bookings.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Recent Bookings
            </h2>
            <div className="space-y-3">
              {bookings.map((booking) => {
                const fixture = MOCK_FIXTURES.find(f => f.id === booking.fixtureId)
                const venue = MOCK_VENUES.find(v => v.id === booking.venueId)
                return (
                  <div
                    key={booking.id}
                    className="p-4 border border-gray-200 rounded-lg bg-gray-50"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-gray-900">
                          {fixture?.homeTeam} vs {fixture?.awayTeam}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          📍 {venue?.name}, {venue?.location}
                        </p>
                        <p className="text-sm text-gray-600">
                          📅 {fixture?.date} at {fixture?.time}
                        </p>
                        {booking.notes && (
                          <p className="text-sm text-gray-500 mt-1 italic">
                            Note: {booking.notes}
                          </p>
                        )}
                      </div>
                      <span className="text-xs text-gray-500">
                        {new Date(booking.bookedAt).toLocaleString()}
                      </span>
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
