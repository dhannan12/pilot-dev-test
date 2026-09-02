/**
 * TradespersonWithLess — Displays tradespeople with less than 3 customer reviews in search results
 *
 * Features: search results display, review count filtering, profile cards, rating display, contact actions
 *
 * Ticket: SCRUM-1280 | Branch: proto/SCRUM-1277
 */

import React from 'react'

interface Tradesperson {
  id: number
  name: string
  trade: string
  reviewCount: number
  averageRating: number
  location: string
  hourlyRate: number
  description: string
  availability: string
}

const MOCK_TRADESPEOPLE: Tradesperson[] = [
  {
    id: 1,
    name: 'John Smith',
    trade: 'Plumber',
    reviewCount: 2,
    averageRating: 5.0,
    location: 'London, UK',
    hourlyRate: 45,
    description: 'Experienced plumber specializing in residential repairs and installations.',
    availability: 'Available this week'
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    trade: 'Electrician',
    reviewCount: 1,
    averageRating: 4.5,
    location: 'Manchester, UK',
    hourlyRate: 50,
    description: 'Certified electrician with expertise in commercial and residential projects.',
    availability: 'Available now'
  },
  {
    id: 3,
    name: 'Michael Brown',
    trade: 'Carpenter',
    reviewCount: 0,
    averageRating: 0,
    location: 'Birmingham, UK',
    hourlyRate: 40,
    description: 'Skilled carpenter offering custom woodwork and furniture repairs.',
    availability: 'Available next week'
  },
  {
    id: 4,
    name: 'Emily Davis',
    trade: 'Painter',
    reviewCount: 2,
    averageRating: 4.8,
    location: 'Leeds, UK',
    hourlyRate: 35,
    description: 'Professional painter with attention to detail for interior and exterior work.',
    availability: 'Available this week'
  },
  {
    id: 5,
    name: 'David Wilson',
    trade: 'Roofer',
    reviewCount: 1,
    averageRating: 5.0,
    location: 'Liverpool, UK',
    hourlyRate: 55,
    description: 'Reliable roofer specializing in repairs, maintenance, and installations.',
    availability: 'Available now'
  },
  {
    id: 6,
    name: 'Rachel Thompson',
    trade: 'Landscaper',
    reviewCount: 2,
    averageRating: 4.6,
    location: 'Bristol, UK',
    hourlyRate: 38,
    description: 'Creative landscaper transforming outdoor spaces with modern designs.',
    availability: 'Available this week'
  }
]

export default function TradespersonWithLess() {
  const tradespeopleWithLessReviews = MOCK_TRADESPEOPLE.filter(
    (person) => person.reviewCount < 3
  )

  const handleContact = (name: string) => {
    console.log(`Contact ${name}`)
  }

  const handleViewProfile = (name: string) => {
    console.log(`View profile for ${name}`)
  }

  return (
    <section data-testid="tradespersonwithless" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Search Results
          </h1>
          <p className="text-gray-600">
            Showing {tradespeopleWithLessReviews.length} tradespeople with less than 3 reviews
          </p>
        </div>

        <div data-testid="tradespersonwithless-list" className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tradespeopleWithLessReviews.map((person) => (
            <div
              key={person.id}
              data-testid="tradespersonwithless-item"
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{person.name}</h2>
                  <p className="text-sm text-gray-600">{person.trade}</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-blue-600">
                    £{person.hourlyRate}/hr
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  {person.reviewCount > 0 ? (
                    <>
                      <div className="flex items-center">
                        <span className="text-yellow-500 text-lg">★</span>
                        <span className="ml-1 font-medium text-gray-900">
                          {person.averageRating.toFixed(1)}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">
                        ({person.reviewCount} {person.reviewCount === 1 ? 'review' : 'reviews'})
                      </span>
                    </>
                  ) : (
                    <span className="text-sm text-gray-500 italic">No reviews yet</span>
                  )}
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
                  <span>📍</span>
                  <span>{person.location}</span>
                </div>
                <div className="text-sm text-green-600 font-medium mb-3">
                  {person.availability}
                </div>
              </div>

              <p className="text-sm text-gray-700 mb-4 line-clamp-3">
                {person.description}
              </p>

              <div className="flex gap-2">
                <button
                  data-testid="tradespersonwithless-contact"
                  onClick={() => handleContact(person.name)}
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors font-medium"
                >
                  Contact
                </button>
                <button
                  data-testid="tradespersonwithless-view"
                  onClick={() => handleViewProfile(person.name)}
                  className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors font-medium"
                >
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>

        {tradespeopleWithLessReviews.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No tradespeople found with less than 3 reviews</p>
          </div>
        )}
      </div>
    </section>
  )
}
