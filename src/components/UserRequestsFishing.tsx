/**
 * UserRequestsFishing — User requests fishing spot recommendations
 *
 * Features: fishing spot search, experience level filter, fishing type selection, location-based recommendations, detailed spot information
 *
 * Ticket: SCRUM-1146 | Branch: proto/SCRUM-1140
 */

import React, { useState } from 'react'

interface FishingSpot {
  id: number
  name: string
  location: string
  fishingType: string
  experienceLevel: string
  description: string
  species: string[]
  bestSeason: string
  facilities: string[]
}

const MOCK_FISHING_SPOTS: FishingSpot[] = [
  {
    id: 1,
    name: 'Lough Corrib',
    location: 'County Galway',
    fishingType: 'Freshwater',
    experienceLevel: 'All Levels',
    description: 'One of Ireland\'s largest lakes, famous for brown trout and pike fishing. Stunning scenery and excellent facilities.',
    species: ['Brown Trout', 'Pike', 'Salmon'],
    bestSeason: 'April - September',
    facilities: ['Boat Hire', 'Guides Available', 'Parking', 'Accommodation']
  },
  {
    id: 2,
    name: 'Killary Harbour',
    location: 'County Mayo',
    fishingType: 'Sea',
    experienceLevel: 'Intermediate',
    description: 'Ireland\'s only fjord offers spectacular sea fishing with deep waters and abundant marine life.',
    species: ['Pollack', 'Mackerel', 'Coalfish', 'Wrasse'],
    bestSeason: 'May - October',
    facilities: ['Boat Charters', 'Equipment Rental', 'Parking', 'Cafe']
  },
  {
    id: 3,
    name: 'River Moy',
    location: 'County Mayo',
    fishingType: 'River',
    experienceLevel: 'Beginner',
    description: 'Renowned as one of Europe\'s premier salmon rivers. Beginner-friendly with excellent ghillie services.',
    species: ['Salmon', 'Sea Trout', 'Brown Trout'],
    bestSeason: 'June - September',
    facilities: ['Guides Available', 'Equipment Hire', 'Parking', 'Tackle Shop']
  },
  {
    id: 4,
    name: 'Achill Island Coastline',
    location: 'County Mayo',
    fishingType: 'Sea',
    experienceLevel: 'Advanced',
    description: 'Rugged Atlantic coastline offering challenging rock and shore fishing with spectacular catches.',
    species: ['Bass', 'Pollock', 'Conger Eel', 'Ray'],
    bestSeason: 'March - November',
    facilities: ['Parking', 'Local Guides', 'Equipment Rental']
  },
  {
    id: 5,
    name: 'Delphi Fishery',
    location: 'County Galway',
    fishingType: 'Freshwater',
    experienceLevel: 'All Levels',
    description: 'Private fishery in spectacular mountain setting. Perfect for fly fishing enthusiasts of all abilities.',
    species: ['Salmon', 'Sea Trout', 'Brown Trout'],
    bestSeason: 'April - October',
    facilities: ['Boat Hire', 'Professional Guides', 'Accommodation', 'Restaurant', 'Equipment Shop']
  },
  {
    id: 6,
    name: 'Clew Bay',
    location: 'County Mayo',
    fishingType: 'Sea',
    experienceLevel: 'All Levels',
    description: 'Sheltered bay with 365 islands, offering safe and productive sea fishing for all experience levels.',
    species: ['Mackerel', 'Pollock', 'Coalfish', 'Flatfish'],
    bestSeason: 'May - September',
    facilities: ['Boat Charters', 'Equipment Hire', 'Parking', 'Cafe', 'Tackle Shop']
  },
  {
    id: 7,
    name: 'Lough Mask',
    location: 'County Mayo',
    fishingType: 'Freshwater',
    experienceLevel: 'Intermediate',
    description: 'Connected to Lough Corrib, famous for its limestone-fed crystal waters and trophy brown trout.',
    species: ['Brown Trout', 'Pike'],
    bestSeason: 'March - September',
    facilities: ['Boat Hire', 'Guides Available', 'Parking', 'Local Accommodation']
  }
]

export default function UserRequestsFishing() {
  const [experienceLevel, setExperienceLevel] = useState('')
  const [fishingType, setFishingType] = useState('')
  const [preferredLocation, setPreferredLocation] = useState('')
  const [showRecommendations, setShowRecommendations] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowRecommendations(true)
  }

  const handleReset = () => {
    setExperienceLevel('')
    setFishingType('')
    setPreferredLocation('')
    setShowRecommendations(false)
  }

  const filteredSpots = MOCK_FISHING_SPOTS.filter(spot => {
    const matchesExperience = !experienceLevel || 
      spot.experienceLevel === experienceLevel || 
      spot.experienceLevel === 'All Levels'
    const matchesType = !fishingType || spot.fishingType === fishingType
    const matchesLocation = !preferredLocation || 
      spot.location.toLowerCase().includes(preferredLocation.toLowerCase())
    
    return matchesExperience && matchesType && matchesLocation
  })

  return (
    <div data-testid="userrequestsfishing" className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🎣 Find Your Perfect Fishing Spot
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover the best fishing locations in West Ireland. Tell us your preferences and we'll recommend the perfect spot for you.
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Your Preferences</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Experience Level */}
              <div>
                <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">
                  Experience Level
                </label>
                <select
                  id="experience"
                  data-testid="userrequestsfishing-experience"
                  value={experienceLevel}
                  onChange={(e) => setExperienceLevel(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Any Level</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="All Levels">All Levels</option>
                </select>
              </div>

              {/* Fishing Type */}
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                  Fishing Type
                </label>
                <select
                  id="type"
                  data-testid="userrequestsfishing-type"
                  value={fishingType}
                  onChange={(e) => setFishingType(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Any Type</option>
                  <option value="Freshwater">Freshwater</option>
                  <option value="Sea">Sea</option>
                  <option value="River">River</option>
                </select>
              </div>

              {/* Location */}
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Location
                </label>
                <input
                  type="text"
                  id="location"
                  data-testid="userrequestsfishing-location"
                  value={preferredLocation}
                  onChange={(e) => setPreferredLocation(e.target.value)}
                  placeholder="e.g., County Mayo"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-center">
              <button
                type="submit"
                data-testid="userrequestsfishing-submit"
                className="bg-blue-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors shadow-md"
              >
                Find Fishing Spots
              </button>
              <button
                type="button"
                data-testid="userrequestsfishing-reset"
                onClick={handleReset}
                className="bg-gray-200 text-gray-700 px-8 py-3 rounded-md font-semibold hover:bg-gray-300 transition-colors"
              >
                Reset
              </button>
            </div>
          </form>
        </div>

        {/* Recommendations */}
        {showRecommendations && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                Recommended Fishing Spots ({filteredSpots.length})
              </h2>
            </div>

            {filteredSpots.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl text-gray-600 mb-2">No fishing spots match your criteria</p>
                <p className="text-gray-500">Try adjusting your filters</p>
              </div>
            ) : (
              <div data-testid="userrequestsfishing-list" className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredSpots.map((spot) => (
                  <div
                    key={spot.id}
                    data-testid="userrequestsfishing-item"
                    className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{spot.name}</h3>
                        <p className="text-sm text-blue-600 font-medium">{spot.location}</p>
                      </div>
                      <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
                        {spot.fishingType}
                      </span>
                    </div>

                    <div className="mb-3">
                      <span className="inline-block bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded mr-2">
                        {spot.experienceLevel}
                      </span>
                      <span className="text-sm text-gray-600">
                        Best: {spot.bestSeason}
                      </span>
                    </div>

                    <p className="text-gray-700 mb-4">{spot.description}</p>

                    <div className="mb-3">
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">Species Available:</h4>
                      <div className="flex flex-wrap gap-2">
                        {spot.species.map((species, idx) => (
                          <span
                            key={idx}
                            className="bg-teal-50 text-teal-700 text-xs px-2 py-1 rounded border border-teal-200"
                          >
                            {species}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">Facilities:</h4>
                      <div className="flex flex-wrap gap-2">
                        {spot.facilities.map((facility, idx) => (
                          <span
                            key={idx}
                            className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                          >
                            {facility}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Info Section */}
        {!showRecommendations && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Why Fish in West Ireland?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-3">🌊</div>
                <h3 className="font-semibold text-gray-800 mb-2">Pristine Waters</h3>
                <p className="text-gray-600 text-sm">
                  Clean, unpolluted waters teeming with diverse fish species
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">🏔️</div>
                <h3 className="font-semibold text-gray-800 mb-2">Stunning Scenery</h3>
                <p className="text-gray-600 text-sm">
                  Fish against the backdrop of mountains, lakes, and coastal beauty
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">👨‍🏫</div>
                <h3 className="font-semibold text-gray-800 mb-2">Expert Guides</h3>
                <p className="text-gray-600 text-sm">
                  Local experts available to help you make the most of your trip
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
