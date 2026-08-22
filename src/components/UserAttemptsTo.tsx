/**
 * UserAttemptsTo — User attempts to book a fishing trip
 *
 * Features: trip selection, date/time picker, party size, contact details, booking attempt display
 *
 * Ticket: SCRUM-1142 | Branch: proto/SCRUM-1140
 */

import React, { useState } from 'react'

interface Booking {
  id: number
  tripType: string
  date: string
  time: string
  partySize: number
  customerName: string
  phone: string
  status: 'pending' | 'confirmed' | 'cancelled'
}

const mockBookings: Booking[] = [
  {
    id: 1,
    tripType: "Deep Sea Fishing Adventure",
    date: "2026-08-25",
    time: "06:00 AM",
    partySize: 4,
    customerName: "Liam O'Brien",
    phone: "+353 86 123 4567",
    status: 'confirmed'
  },
  {
    id: 2,
    tripType: "Coastal Fishing Experience",
    date: "2026-08-26",
    time: "08:00 AM",
    partySize: 2,
    customerName: "Siobhan Walsh",
    phone: "+353 87 234 5678",
    status: 'confirmed'
  },
  {
    id: 3,
    tripType: "Sunset Fishing Cruise",
    date: "2026-08-24",
    time: "06:00 PM",
    partySize: 6,
    customerName: "Paddy McCarthy",
    phone: "+353 85 345 6789",
    status: 'pending'
  },
  {
    id: 4,
    tripType: "Deep Sea Fishing Adventure",
    date: "2026-08-27",
    time: "06:00 AM",
    partySize: 3,
    customerName: "Maeve Donnelly",
    phone: "+353 86 456 7890",
    status: 'confirmed'
  },
  {
    id: 5,
    tripType: "River Fishing Day Trip",
    date: "2026-08-28",
    time: "10:00 AM",
    partySize: 2,
    customerName: "Declan Fitzpatrick",
    phone: "+353 87 567 8901",
    status: 'pending'
  }
]

const tripTypes = [
  "Deep Sea Fishing Adventure",
  "Coastal Fishing Experience",
  "Sunset Fishing Cruise",
  "River Fishing Day Trip",
  "Half-Day Charter"
]

const timeSlots = [
  "06:00 AM",
  "08:00 AM",
  "10:00 AM",
  "12:00 PM",
  "02:00 PM",
  "04:00 PM",
  "06:00 PM"
]

export default function UserAttemptsTo() {
  const [bookings, setBookings] = useState<Booking[]>(mockBookings)
  const [tripType, setTripType] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [partySize, setPartySize] = useState(1)
  const [customerName, setCustomerName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [attempted, setAttempted] = useState(false)

  const handleBookingAttempt = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!tripType || !date || !time || !customerName.trim() || !email.trim() || !phone.trim()) {
      alert('Please fill in all fields to complete your booking')
      return
    }

    const newBooking: Booking = {
      id: bookings.length + 1,
      tripType,
      date,
      time,
      partySize,
      customerName,
      phone,
      status: 'pending'
    }

    setBookings([newBooking, ...bookings])
    setTripType('')
    setDate('')
    setTime('')
    setPartySize(1)
    setCustomerName('')
    setEmail('')
    setPhone('')
    setAttempted(true)
    
    setTimeout(() => setAttempted(false), 4000)
  }

  const getStatusBadge = (status: string) => {
    const styles = {
      confirmed: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      cancelled: 'bg-red-100 text-red-800'
    }
    return styles[status as keyof typeof styles] || styles.pending
  }

  return (
    <section data-testid="userattemptsto" className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-md p-8 mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Book Your Fishing Trip</h1>
        <p className="text-gray-600 mb-6">Experience the best fishing adventures on the Wild Atlantic Way</p>

        {attempted && (
          <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded mb-4">
            Booking attempt submitted! We'll contact you shortly to confirm your reservation.
          </div>
        )}

        <form onSubmit={handleBookingAttempt} className="space-y-6">
          <div>
            <label htmlFor="tripType" className="block text-sm font-medium text-gray-700 mb-2">
              Select Fishing Trip *
            </label>
            <select
              id="tripType"
              data-testid="userattemptsto-triptype"
              value={tripType}
              onChange={(e) => setTripType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Choose your adventure...</option>
              {tripTypes.map((trip) => (
                <option key={trip} value={trip}>{trip}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Date *
              </label>
              <input
                type="date"
                id="date"
                data-testid="userattemptsto-date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Time *
              </label>
              <select
                id="time"
                data-testid="userattemptsto-time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select time...</option>
                {timeSlots.map((slot) => (
                  <option key={slot} value={slot}>{slot}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="partySize" className="block text-sm font-medium text-gray-700 mb-2">
              Party Size *
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                id="partySize"
                data-testid="userattemptsto-partysize"
                min="1"
                max="12"
                value={partySize}
                onChange={(e) => setPartySize(Number(e.target.value))}
                className="flex-1"
              />
              <span className="text-lg font-semibold text-gray-700 w-24">
                {partySize} {partySize === 1 ? 'person' : 'people'}
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-1">Maximum 12 people per trip</p>
          </div>

          <div>
            <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-2">
              Your Name *
            </label>
            <input
              type="text"
              id="customerName"
              data-testid="userattemptsto-name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Full name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                data-testid="userattemptsto-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                data-testid="userattemptsto-phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+353 86 123 4567"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            data-testid="userattemptsto-submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md transition duration-200 ease-in-out transform hover:scale-105"
          >
            Book Fishing Trip
          </button>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Booking Attempts</h2>
        <ul data-testid="userattemptsto-list" className="space-y-4">
          {bookings.map((booking) => (
            <li
              key={booking.id}
              data-testid="userattemptsto-item"
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">{booking.tripType}</h3>
                  <p className="text-sm text-gray-500">
                    {booking.customerName} • {booking.phone}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${getStatusBadge(booking.status)}`}>
                  {booking.status}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Date:</span>
                  <p className="font-medium text-gray-800">{booking.date}</p>
                </div>
                <div>
                  <span className="text-gray-500">Time:</span>
                  <p className="font-medium text-gray-800">{booking.time}</p>
                </div>
                <div>
                  <span className="text-gray-500">Party Size:</span>
                  <p className="font-medium text-gray-800">
                    {booking.partySize} {booking.partySize === 1 ? 'person' : 'people'}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
