/**
 * CalculatingAverageRating — Displays yachts with ratings and calculates their average
 *
 * Features: yacht listing, individual ratings, average calculation, visual rating display, statistics
 *
 * Ticket: SCRUM-1237 | Branch: proto/SCRUM-1233
 */

import React, { useState } from 'react'

interface Yacht {
  id: number
  name: string
  model: string
  rating: number
  reviewCount: number
  price: number
  location: string
}

const mockYachts: Yacht[] = [
  {
    id: 1,
    name: 'Ocean Dream',
    model: 'Sunseeker 76',
    rating: 4.8,
    reviewCount: 24,
    price: 15000,
    location: 'Miami Beach, FL'
  },
  {
    id: 2,
    name: 'Wave Rider',
    model: 'Azimut 60',
    rating: 4.5,
    reviewCount: 18,
    price: 12000,
    location: 'Newport, RI'
  },
  {
    id: 3,
    name: 'Sea Breeze',
    model: 'Princess 72',
    rating: 4.9,
    reviewCount: 32,
    price: 18000,
    location: 'San Diego, CA'
  },
  {
    id: 4,
    name: 'Blue Horizon',
    model: 'Ferretti 80',
    rating: 4.6,
    reviewCount: 21,
    price: 16500,
    location: 'Fort Lauderdale, FL'
  },
  {
    id: 5,
    name: 'Sunset Glory',
    model: 'Pershing 64',
    rating: 4.7,
    reviewCount: 27,
    price: 14000,
    location: 'Charleston, SC'
  },
  {
    id: 6,
    name: 'Marina Star',
    model: 'Riva 88',
    rating: 5.0,
    reviewCount: 15,
    price: 22000,
    location: 'Key West, FL'
  },
  {
    id: 7,
    name: 'Aqua Vista',
    model: 'Benetti 85',
    rating: 4.4,
    reviewCount: 19,
    price: 19000,
    location: 'Naples, FL'
  }
]

export default function CalculatingAverageRating() {
  const [selectedYacht, setSelectedYacht] = useState<number | null>(null)

  // Calculate average rating
  const averageRating = mockYachts.reduce((sum, yacht) => sum + yacht.rating, 0) / mockYachts.length
  const totalReviews = mockYachts.reduce((sum, yacht) => sum + yacht.reviewCount, 0)

  // Helper to render stars
  const renderStars = (rating: number) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={`full-${i}`} className="text-yellow-400">★</span>
      )
    }
    if (hasHalfStar) {
      stars.push(
        <span key="half" className="text-yellow-400">★</span>
      )
    }
    const emptyStars = 5 - stars.length
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="text-gray-300">★</span>
      )
    }
    return stars
  }

  return (
    <section data-testid="calculatingaveragerating" className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Yacht Rating Calculator</h1>
          <p className="text-gray-600">Browse our premium yacht collection and see their ratings</p>
        </div>

        {/* Average Rating Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border-2 border-blue-200">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Fleet Average Rating</h2>
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="text-6xl font-bold text-blue-600">
                {averageRating.toFixed(2)}
              </div>
              <div className="text-left">
                <div className="text-3xl flex">
                  {renderStars(averageRating)}
                </div>
                <p className="text-sm text-gray-500 mt-1">out of 5.0</p>
              </div>
            </div>
            <div className="flex justify-center gap-8 text-sm">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-800">{mockYachts.length}</p>
                <p className="text-gray-600">Yachts</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-800">{totalReviews}</p>
                <p className="text-gray-600">Total Reviews</p>
              </div>
            </div>
          </div>
        </div>

        {/* Yachts List */}
        <div data-testid="calculatingaveragerating-list" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockYachts.map((yacht) => (
            <div
              key={yacht.id}
              data-testid="calculatingaveragerating-item"
              className={`bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer ${
                selectedYacht === yacht.id ? 'ring-4 ring-blue-400' : ''
              }`}
              onClick={() => setSelectedYacht(selectedYacht === yacht.id ? null : yacht.id)}
            >
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-4 text-white">
                <h3 className="text-xl font-bold mb-1">{yacht.name}</h3>
                <p className="text-sm opacity-90">{yacht.model}</p>
              </div>
              
              <div className="p-4">
                {/* Rating */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-gray-800">{yacht.rating}</span>
                    <div className="text-xl flex">
                      {renderStars(yacht.rating)}
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">({yacht.reviewCount} reviews)</span>
                </div>

                {/* Details */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Location:</span>
                    <span className="font-medium text-gray-800">{yacht.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Price/Day:</span>
                    <span className="font-bold text-blue-600">${yacht.price.toLocaleString()}</span>
                  </div>
                </div>

                {/* View Details Button */}
                <button
                  data-testid="calculatingaveragerating-view"
                  className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                  onClick={(e) => {
                    e.stopPropagation()
                    alert(`Viewing details for ${yacht.name}`)
                  }}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Rating Distribution */}
        <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Rating Distribution</h2>
          <div className="space-y-3">
            {[5, 4.5, 4].map((threshold) => {
              const count = mockYachts.filter(y => 
                threshold === 5 ? y.rating === 5 : 
                threshold === 4.5 ? y.rating >= 4.5 && y.rating < 5 :
                y.rating >= 4 && y.rating < 4.5
              ).length
              const percentage = (count / mockYachts.length) * 100

              return (
                <div key={threshold} className="flex items-center gap-4">
                  <div className="w-16 text-sm font-medium text-gray-700">
                    {threshold === 5 ? '5.0' : threshold === 4.5 ? '4.5-4.9' : '4.0-4.4'}
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-full h-6 overflow-hidden">
                    <div
                      className="bg-blue-500 h-full rounded-full flex items-center justify-end pr-2"
                      style={{ width: `${percentage}%` }}
                    >
                      {percentage > 0 && (
                        <span className="text-xs font-bold text-white">{count}</span>
                      )}
                    </div>
                  </div>
                  <div className="w-16 text-sm text-gray-600 text-right">
                    {percentage.toFixed(0)}%
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Reset Selection Button */}
        {selectedYacht !== null && (
          <div className="text-center mt-6">
            <button
              data-testid="calculatingaveragerating-reset"
              className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200"
              onClick={() => setSelectedYacht(null)}
            >
              Clear Selection
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
