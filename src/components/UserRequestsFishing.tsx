/**
 * UserRequestsFishing — User requests fishing spot recommendations
 *
 * Features: request form, experience level filter, recommended spots list, species info, location details
 *
 * Ticket: SCRUM-1146 | Branch: proto/SCRUM-1140
 */

import React, { useState } from 'react'

interface FishingSpot {
  id: number
  name: string
  location: string
  species: string[]
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  description: string
  bestSeason: string
  facilities: string[]
}

const MOCK_FISHING_SPOTS: FishingSpot[] = [
  {
    id: 1,
    name: 'Corrib River Banks',
    location: 'East Galway, 3km from town center',
    species: ['Brown Trout', 'Salmon', 'Pike'],
    difficulty: 'Intermediate',
    description: 'Peaceful river spot with excellent salmon runs during season. Easy access from main road.',
    bestSeason: 'April - September',
    facilities: ['Parking', 'Picnic Area', 'Accessible Path']
  },
  {
    id: 2,
    name: 'Lough Mask Shore',
    location: 'Northwest shore, 15km from town',
    species: ['Brown Trout', 'Rainbow Trout', 'Perch'],
    difficulty: 'Beginner',
    description: 'Calm lough waters perfect for beginners. Stunning mountain views and plenty of space.',
    bestSeason: 'March - October',
    facilities: ['Boat Launch', 'Parking', 'Toilets', 'Cafe Nearby']
  },
  {
    id: 3,
    name: "Murphy's Deep Pool",
    location: 'West Valley Stream, 8km from town',
    species: ['Pike', 'Brown Trout', 'Eel'],
    difficulty: 'Advanced',
    description: 'Deep pool known for trophy pike. Requires experienced casting and navigation skills.',
    bestSeason: 'May - August',
    facilities: ['Limited Parking', 'Trail Access']
  },
  {
    id: 4,
    name: 'Claregalway Pier',
    location: 'Claregalway Village, 10km from town',
    species: ['Sea Bass', 'Mullet', 'Flounder'],
    difficulty: 'Beginner',
    description: 'Family-friendly pier fishing with calm waters. Great for kids and first-timers.',
    bestSeason: 'June - September',
    facilities: ['Parking', 'Toilets', 'Playground', 'Restaurant']
  },
  {
    id: 5,
    name: 'Black River Rapids',
    location: 'Mountain Road, 12km from town',
    species: ['Salmon', 'Sea Trout', 'Brown Trout'],
    difficulty: 'Advanced',
    description: 'Fast-flowing rapids with challenging terrain. Best for experienced fly fishers.',
    bestSeason: 'June - July',
    facilities: ['Parking', 'Hiking Trail']
  },
  {
    id: 6,
    name: 'Annaghdown Bay',
    location: 'North shore of Lough Corrib, 11km from town',
    species: ['Pike', 'Bream', 'Roach', 'Perch'],
    difficulty: 'Intermediate',
    description: 'Sheltered bay with consistent catches. Popular with local anglers year-round.',
    bestSeason: 'April - November',
    facilities: ['Boat Rental', 'Parking', 'Picnic Area']
  }
]

export default function UserRequestsFishing() {
  const [fishType, setFishType] = useState('')
  const [experienceLevel, setExperienceLevel] = useState<string>('')
  const [season, setSeason] = useState('')
  const [filteredSpots, setFilteredSpots] = useState<FishingSpot[]>(MOCK_FISHING_SPOTS)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    
    let results = MOCK_FISHING_SPOTS

    if (experienceLevel) {
      results = results.filter(spot => spot.difficulty === experienceLevel)
    }

    if (fishType) {
      results = results.filter(spot => 
        spot.species.some(s => s.toLowerCase().includes(fishType.toLowerCase()))
      )
    }

    setFilteredSpots(results)
  }

  const handleReset = () => {
    setFishType('')
    setExperienceLevel('')
    setSeason('')
    setFilteredSpots(MOCK_FISHING_SPOTS)
  }

  return (
    <section data-testid="userrequestsfishing" className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-900 mb-4">
            Fishing Spot Recommendations
          </h1>
          <p className="text-lg text-gray-700">
            Discover the best fishing locations in West Ireland
          </p>
        </header>

        {/* Request Form */}
        <form 
          onSubmit={handleSearch}
          className="bg-white rounded-xl shadow-lg p-8 mb-10"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Find Your Perfect Fishing Spot
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label htmlFor="fishType" className="block text-sm font-medium text-gray-700 mb-2">
                Fish Type (optional)
              </label>
              <input
                id="fishType"
                type="text"
                data-testid="userrequestsfishing-fishtype"
                value={fishType}
                onChange={(e) => setFishType(e.target.value)}
                placeholder="e.g., Salmon, Trout, Pike"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="experienceLevel" className="block text-sm font-medium text-gray-700 mb-2">
                Experience Level
              </label>
              <select
                id="experienceLevel"
                data-testid="userrequestsfishing-experience"
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Levels</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            <div>
              <label htmlFor="season" className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Season
              </label>
              <input
                id="season"
                type="text"
                data-testid="userrequestsfishing-season"
                value={season}
                onChange={(e) => setSeason(e.target.value)}
                placeholder="e.g., Summer, Spring"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              data-testid="userrequestsfishing-submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
            >
              Search Fishing Spots
            </button>
            <button
              type="button"
              onClick={handleReset}
              data-testid="userrequestsfishing-reset"
              className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition duration-200"
            >
              Reset
            </button>
          </div>
        </form>

        {/* Results Section */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Recommended Spots ({filteredSpots.length})
          </h2>

          <div data-testid="userrequestsfishing-list" className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredSpots.map((spot) => (
              <div
                key={spot.id}
                data-testid="userrequestsfishing-item"
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-900">{spot.name}</h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        spot.difficulty === 'Beginner'
                          ? 'bg-green-100 text-green-800'
                          : spot.difficulty === 'Intermediate'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {spot.difficulty}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 mb-4 flex items-center">
                    <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {spot.location}
                  </p>

                  <p className="text-gray-700 mb-4 text-sm leading-relaxed">
                    {spot.description}
                  </p>

                  <div className="mb-3">
                    <h4 className="text-xs font-semibold text-gray-600 uppercase mb-2">Fish Species:</h4>
                    <div className="flex flex-wrap gap-2">
                      {spot.species.map((fish, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-md"
                        >
                          {fish}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-3">
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">Best Season:</span> {spot.bestSeason}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-semibold text-gray-600 uppercase mb-2">Facilities:</h4>
                    <div className="flex flex-wrap gap-2">
                      {spot.facilities.map((facility, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
                        >
                          {facility}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredSpots.length === 0 && (
            <div className="bg-white rounded-xl shadow-md p-12 text-center">
              <p className="text-gray-600 text-lg">
                No fishing spots match your criteria. Try adjusting your filters.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
