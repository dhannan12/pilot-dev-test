/**
 * UserViewsGuided — Display available guided tour options for museum visitors
 *
 * Features: tour listing, duration display, pricing, time slots, booking button
 *
 * Ticket: SCRUM-1135 | Branch: proto/SCRUM-1127
 */

import React from 'react'

interface GuidedTour {
  id: number
  name: string
  description: string
  duration: string
  price: number
  maxGroupSize: number
  availableTimes: string[]
  highlights: string[]
}

const MOCK_TOURS: GuidedTour[] = [
  {
    id: 1,
    name: 'General Museum Tour',
    description: 'Explore the complete collection of artifacts and exhibits showcasing Dundalk\'s rich history from medieval times to the present day.',
    duration: '90 minutes',
    price: 12,
    maxGroupSize: 20,
    availableTimes: ['10:00 AM', '12:00 PM', '2:00 PM', '4:00 PM'],
    highlights: ['Medieval Artifacts', 'Industrial Revolution Exhibits', 'Local Art Gallery']
  },
  {
    id: 2,
    name: 'Medieval Dundalk Experience',
    description: 'Journey back to medieval times and discover the castle ruins, ancient manuscripts, and stories of the knights who defended Dundalk.',
    duration: '60 minutes',
    price: 10,
    maxGroupSize: 15,
    availableTimes: ['11:00 AM', '1:00 PM', '3:00 PM'],
    highlights: ['Castle Ruins Tour', 'Medieval Manuscripts', 'Knight Armor Display']
  },
  {
    id: 3,
    name: 'Industrial Heritage Walk',
    description: 'Learn about Dundalk\'s transformation during the Industrial Revolution, featuring original machinery, photographs, and worker testimonies.',
    duration: '75 minutes',
    price: 10,
    maxGroupSize: 25,
    availableTimes: ['10:30 AM', '1:30 PM', '3:30 PM'],
    highlights: ['Victorian Factory Floor', 'Railway Heritage', 'Maritime Trade Exhibits']
  },
  {
    id: 4,
    name: 'Art & Culture Highlights',
    description: 'An intimate tour focusing on local artists, contemporary exhibitions, and the vibrant cultural scene that defines modern Dundalk.',
    duration: '60 minutes',
    price: 8,
    maxGroupSize: 12,
    availableTimes: ['11:30 AM', '2:30 PM'],
    highlights: ['Local Artist Gallery', 'Contemporary Exhibits', 'Cultural Heritage Display']
  },
  {
    id: 5,
    name: 'Family Discovery Tour',
    description: 'Interactive and engaging tour designed for families with children, featuring hands-on activities, treasure hunts, and storytelling.',
    duration: '90 minutes',
    price: 15,
    maxGroupSize: 30,
    availableTimes: ['10:00 AM', '12:30 PM', '2:30 PM'],
    highlights: ['Interactive Activities', 'Treasure Hunt', 'Children\'s Discovery Zone']
  },
  {
    id: 6,
    name: 'Behind the Scenes Tour',
    description: 'Exclusive access to the museum\'s conservation lab, storage facilities, and curator discussions about collection management.',
    duration: '120 minutes',
    price: 20,
    maxGroupSize: 10,
    availableTimes: ['10:00 AM', '2:00 PM'],
    highlights: ['Conservation Lab', 'Storage Facilities', 'Curator Q&A Session']
  }
]

export default function UserViewsGuided() {
  const [selectedTour, setSelectedTour] = React.useState<number | null>(null)

  const handleBookTour = (tourId: number) => {
    setSelectedTour(tourId)
    // In a real app, this would navigate to booking page
    alert(`Booking tour ID: ${tourId}`)
  }

  return (
    <div data-testid="userviewsguided" className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Guided Tour Options
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Enhance your museum visit with an expert-led guided tour. Choose from our selection of specialized tours covering different aspects of Dundalk's heritage.
          </p>
        </div>

        {/* Tours List */}
        <div data-testid="userviewsguided-list" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_TOURS.map((tour) => (
            <div
              key={tour.id}
              data-testid="userviewsguided-item"
              className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow ${
                selectedTour === tour.id ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              {/* Card Header */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4">
                <h2 className="text-xl font-semibold mb-2">{tour.name}</h2>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {tour.duration}
                  </span>
                  <span className="text-lg font-bold">€{tour.price}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4">
                <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                  {tour.description}
                </p>

                {/* Highlights */}
                <div className="mb-4">
                  <h3 className="text-xs font-semibold text-gray-600 uppercase mb-2">
                    Tour Highlights
                  </h3>
                  <ul className="space-y-1">
                    {tour.highlights.map((highlight, idx) => (
                      <li key={idx} className="text-sm text-gray-600 flex items-start">
                        <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Group Size */}
                <div className="text-xs text-gray-500 mb-4">
                  <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Max group size: {tour.maxGroupSize} people
                </div>

                {/* Available Times */}
                <div className="mb-4">
                  <h3 className="text-xs font-semibold text-gray-600 uppercase mb-2">
                    Available Times
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {tour.availableTimes.map((time, idx) => (
                      <span
                        key={idx}
                        className="inline-block bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full"
                      >
                        {time}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Book Button */}
                <button
                  data-testid="userviewsguided-book"
                  onClick={() => handleBookTour(tour.id)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                >
                  Book This Tour
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Important Information
          </h2>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              All tours are led by experienced museum guides with extensive knowledge of Dundalk's history.
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Please arrive 10 minutes before your scheduled tour time at the main reception desk.
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Group bookings and private tours are available upon request. Contact us for more information.
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Tours include general admission to the museum. No additional ticket purchase required.
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
