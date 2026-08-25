/**
 * UserViews — Displays family-friendly museum events for visitors
 *
 * Features: event listings, age recommendations, date/time display, ticket info, filtering
 *
 * Ticket: SCRUM-1130 | Branch: proto/SCRUM-1127
 */

import React, { useState } from 'react'

interface Event {
  id: number
  title: string
  description: string
  date: string
  time: string
  ageRange: string
  ticketPrice: string
  category: string
  imageUrl: string
}

const MOCK_EVENTS: Event[] = [
  {
    id: 1,
    title: 'Pirate Adventure Workshop',
    description: 'Join us for an exciting pirate-themed adventure! Children will learn about maritime history through interactive storytelling and crafts.',
    date: '2026-09-05',
    time: '10:00 AM - 12:00 PM',
    ageRange: '5-10 years',
    ticketPrice: '€8',
    category: 'workshop',
    imageUrl: 'https://via.placeholder.com/300x200/4F46E5/FFFFFF?text=Pirate+Adventure'
  },
  {
    id: 2,
    title: 'Fairy Tale Story Time',
    description: 'Magical storytelling session featuring Irish folklore and legends. Perfect for young children and their families.',
    date: '2026-09-12',
    time: '2:00 PM - 3:00 PM',
    ageRange: '3-7 years',
    ticketPrice: '€5',
    category: 'storytelling',
    imageUrl: 'https://via.placeholder.com/300x200/7C3AED/FFFFFF?text=Fairy+Tales'
  },
  {
    id: 3,
    title: 'Ancient Ireland Explorer Day',
    description: 'Hands-on archaeology experience where families can explore replicas of ancient Irish artifacts and learn about our heritage.',
    date: '2026-09-19',
    time: '11:00 AM - 3:00 PM',
    ageRange: '7-12 years',
    ticketPrice: '€10',
    category: 'workshop',
    imageUrl: 'https://via.placeholder.com/300x200/059669/FFFFFF?text=Ancient+Ireland'
  },
  {
    id: 4,
    title: 'Art & Crafts Festival',
    description: 'Creative fun for all ages! Make traditional Irish crafts and take home your masterpiece. All materials provided.',
    date: '2026-09-26',
    time: '1:00 PM - 4:00 PM',
    ageRange: 'All ages',
    ticketPrice: '€12',
    category: 'festival',
    imageUrl: 'https://via.placeholder.com/300x200/DC2626/FFFFFF?text=Arts+%26+Crafts'
  },
  {
    id: 5,
    title: 'Science Discovery Lab',
    description: 'Interactive science experiments that bring history to life! Learn about ancient technology and modern discoveries.',
    date: '2026-10-03',
    time: '10:30 AM - 12:30 PM',
    ageRange: '8-14 years',
    ticketPrice: '€9',
    category: 'workshop',
    imageUrl: 'https://via.placeholder.com/300x200/2563EB/FFFFFF?text=Science+Lab'
  },
  {
    id: 6,
    title: 'Medieval Castle Tour for Kids',
    description: 'Explore medieval history through an engaging guided tour designed specifically for children. Dress-up costumes available!',
    date: '2026-10-10',
    time: '2:00 PM - 3:30 PM',
    ageRange: '6-12 years',
    ticketPrice: '€7',
    category: 'tour',
    imageUrl: 'https://via.placeholder.com/300x200/EA580C/FFFFFF?text=Medieval+Tour'
  },
  {
    id: 7,
    title: 'Nature & Wildlife Walk',
    description: 'Discover local wildlife and plants around the museum grounds. A gentle walk suitable for families with young children.',
    date: '2026-10-17',
    time: '11:00 AM - 1:00 PM',
    ageRange: 'All ages',
    ticketPrice: '€6',
    category: 'outdoor',
    imageUrl: 'https://via.placeholder.com/300x200/16A34A/FFFFFF?text=Nature+Walk'
  }
]

export default function UserViews() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  
  const categories = ['all', 'workshop', 'storytelling', 'festival', 'tour', 'outdoor']
  
  const filteredEvents = selectedCategory === 'all' 
    ? MOCK_EVENTS 
    : MOCK_EVENTS.filter(event => event.category === selectedCategory)

  return (
    <div data-testid="userviews" className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Family-Friendly Events
          </h1>
          <p className="text-lg text-gray-600">
            Discover exciting activities for children and families at Dundalk Museum
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8 bg-white p-4 rounded-lg shadow-sm">
          <label htmlFor="category-filter" className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Category
          </label>
          <select
            id="category-filter"
            data-testid="userviews-category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Events List */}
        <div data-testid="userviews-list" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              data-testid="userviews-item"
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              {/* Event Image */}
              <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-semibold text-lg px-4 text-center">
                  {event.title}
                </span>
              </div>

              {/* Event Details */}
              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {event.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {event.description}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm">
                    <span className="font-semibold text-gray-700 w-20">Date:</span>
                    <span className="text-gray-600">
                      {new Date(event.date).toLocaleDateString('en-IE', { 
                        weekday: 'short', 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </span>
                  </div>
                  
                  <div className="flex items-center text-sm">
                    <span className="font-semibold text-gray-700 w-20">Time:</span>
                    <span className="text-gray-600">{event.time}</span>
                  </div>
                  
                  <div className="flex items-center text-sm">
                    <span className="font-semibold text-gray-700 w-20">Age:</span>
                    <span className="text-gray-600">{event.ageRange}</span>
                  </div>
                  
                  <div className="flex items-center text-sm">
                    <span className="font-semibold text-gray-700 w-20">Price:</span>
                    <span className="text-green-600 font-bold">{event.ticketPrice}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    data-testid="userviews-book"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200"
                  >
                    Book Now
                  </button>
                  <button
                    data-testid="userviews-info"
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-md transition-colors duration-200"
                  >
                    Info
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results Message */}
        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No events found in this category. Try selecting a different filter.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
