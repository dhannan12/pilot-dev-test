/**
 * UserChecksThe — Displays the museum's schedule of events
 *
 * Features: event calendar, date/time display, event descriptions, location info, event categories
 *
 * Ticket: SCRUM-1132 | Branch: proto/SCRUM-1127
 */

import React, { useState } from 'react'

interface Event {
  id: number
  title: string
  date: string
  time: string
  location: string
  category: string
  description: string
  capacity: number
  availableSeats: number
}

const MOCK_EVENTS: Event[] = [
  {
    id: 1,
    title: 'Ancient Ireland: A Journey Through Time',
    date: '2026-09-01',
    time: '10:00 AM - 11:30 AM',
    location: 'Main Gallery',
    category: 'Guided Tour',
    description: 'Explore the rich history of ancient Ireland through our extensive collection of artifacts from prehistoric times to the medieval period.',
    capacity: 25,
    availableSeats: 12
  },
  {
    id: 2,
    title: 'Textile Arts of County Louth',
    date: '2026-09-03',
    time: '2:00 PM - 4:00 PM',
    location: 'Workshop Room',
    category: 'Workshop',
    description: 'Learn traditional textile techniques from local artisans and create your own piece of Irish textile art to take home.',
    capacity: 15,
    availableSeats: 5
  },
  {
    id: 3,
    title: 'Maritime Heritage Talk',
    date: '2026-09-05',
    time: '6:00 PM - 7:30 PM',
    location: 'Lecture Hall',
    category: 'Lecture',
    description: 'Discover Dundalk\'s maritime history and its importance as a port town. Featuring historian Dr. Siobhan Murphy.',
    capacity: 50,
    availableSeats: 38
  },
  {
    id: 4,
    title: 'Children\'s Discovery Day',
    date: '2026-09-07',
    time: '11:00 AM - 3:00 PM',
    location: 'Education Center',
    category: 'Family Event',
    description: 'A fun-filled day for children aged 5-12 with interactive exhibits, storytelling, and hands-on activities exploring local history.',
    capacity: 40,
    availableSeats: 18
  },
  {
    id: 5,
    title: 'Evening at the Museum: Medieval Music',
    date: '2026-09-10',
    time: '7:00 PM - 9:00 PM',
    location: 'Grand Hall',
    category: 'Performance',
    description: 'Experience the sounds of medieval Ireland with traditional instruments and period costumes. Includes wine and refreshments.',
    capacity: 80,
    availableSeats: 22
  },
  {
    id: 6,
    title: 'Photography Exhibition Opening',
    date: '2026-09-12',
    time: '5:00 PM - 8:00 PM',
    location: 'Special Exhibitions Gallery',
    category: 'Exhibition',
    description: 'Opening reception for "Faces of Louth" photography exhibition showcasing contemporary life in County Louth.',
    capacity: 100,
    availableSeats: 67
  },
  {
    id: 7,
    title: 'Historical Walking Tour of Dundalk',
    date: '2026-09-14',
    time: '10:00 AM - 12:00 PM',
    location: 'Meet at Museum Entrance',
    category: 'Guided Tour',
    description: 'Join us for a guided walk through historic Dundalk, visiting key landmarks and learning about the town\'s fascinating past.',
    capacity: 20,
    availableSeats: 8
  }
]

const CATEGORIES = ['All Events', 'Guided Tour', 'Workshop', 'Lecture', 'Family Event', 'Performance', 'Exhibition']

export default function UserChecksThe() {
  const [selectedCategory, setSelectedCategory] = useState('All Events')

  const filteredEvents = selectedCategory === 'All Events' 
    ? MOCK_EVENTS 
    : MOCK_EVENTS.filter(event => event.category === selectedCategory)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-IE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
  }

  const getAvailabilityStatus = (availableSeats: number, capacity: number) => {
    const percentage = (availableSeats / capacity) * 100
    if (percentage > 50) return { text: 'Available', color: 'text-green-600', bg: 'bg-green-50' }
    if (percentage > 20) return { text: 'Limited', color: 'text-yellow-600', bg: 'bg-yellow-50' }
    if (percentage > 0) return { text: 'Few Seats', color: 'text-orange-600', bg: 'bg-orange-50' }
    return { text: 'Sold Out', color: 'text-red-600', bg: 'bg-red-50' }
  }

  return (
    <div data-testid="userchecksthe" className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Schedule of Events
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover engaging events, workshops, and exhibitions at the Museum of Dundalk, County Louth
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8 bg-white rounded-lg shadow-sm p-6">
          <label htmlFor="category-filter" className="block text-sm font-medium text-gray-700 mb-3">
            Filter by Category
          </label>
          <select
            id="category-filter"
            data-testid="userchecksthe-category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="block w-full md:w-auto px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
          >
            {CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <p className="mt-2 text-sm text-gray-500">
            Showing {filteredEvents.length} {filteredEvents.length === 1 ? 'event' : 'events'}
          </p>
        </div>

        {/* Events List */}
        <div data-testid="userchecksthe-list" className="space-y-6">
          {filteredEvents.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <p className="text-gray-500">No events found in this category.</p>
            </div>
          ) : (
            filteredEvents.map((event) => {
              const status = getAvailabilityStatus(event.availableSeats, event.capacity)
              return (
                <div
                  key={event.id}
                  data-testid="userchecksthe-item"
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      {/* Event Details */}
                      <div className="flex-1">
                        <div className="flex items-start gap-3 mb-3">
                          <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                            {event.category}
                          </span>
                          <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${status.bg} ${status.color}`}>
                            {status.text}
                          </span>
                        </div>
                        
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                          {event.title}
                        </h2>
                        
                        <div className="space-y-2 mb-4 text-gray-600">
                          <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className="font-medium">{formatDate(event.date)}</span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{event.time}</span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span>{event.location}</span>
                          </div>
                        </div>
                        
                        <p className="text-gray-700 leading-relaxed mb-4">
                          {event.description}
                        </p>
                        
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          <span>
                            <strong>{event.availableSeats}</strong> of <strong>{event.capacity}</strong> seats available
                          </span>
                        </div>
                      </div>
                      
                      {/* Action Button */}
                      <div className="flex-shrink-0">
                        <button
                          data-testid="userchecksthe-book"
                          disabled={event.availableSeats === 0}
                          className={`px-6 py-3 rounded-lg font-semibold transition-colors duration-200 ${
                            event.availableSeats === 0
                              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                              : 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800'
                          }`}
                        >
                          {event.availableSeats === 0 ? 'Sold Out' : 'Book Now'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center">
          <div className="inline-block bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-2xl">
            <h3 className="font-semibold text-blue-900 mb-2">Planning Your Visit</h3>
            <p className="text-sm text-blue-800">
              Most events require advance booking. Please arrive 15 minutes before the scheduled start time. 
              For group bookings or special requirements, contact us at events@dundalmuseum.ie or call +353 42 932 7056.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
