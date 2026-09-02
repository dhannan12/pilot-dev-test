/**
 * CreateApi — API endpoint demonstration for tradespeople search and filtering
 *
 * Features: search by name/trade, filter by trade type/location/rating/availability, real-time results, mock data display
 *
 * Ticket: SCRUM-1287 | Branch: proto/SCRUM-1277
 */

import React, { useState, useMemo } from 'react'

interface Tradesperson {
  id: number
  name: string
  trade: string
  location: string
  rating: number
  available: boolean
  hourlyRate: number
  yearsExperience: number
  description: string
}

const MOCK_TRADESPEOPLE: Tradesperson[] = [
  {
    id: 1,
    name: 'John Smith',
    trade: 'Plumber',
    location: 'London',
    rating: 4.8,
    available: true,
    hourlyRate: 45,
    yearsExperience: 12,
    description: 'Experienced plumber specializing in residential and commercial projects'
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    trade: 'Electrician',
    location: 'Manchester',
    rating: 4.9,
    available: true,
    hourlyRate: 50,
    yearsExperience: 15,
    description: 'Licensed electrician with expertise in rewiring and installations'
  },
  {
    id: 3,
    name: 'Michael Brown',
    trade: 'Carpenter',
    location: 'London',
    rating: 4.7,
    available: false,
    hourlyRate: 40,
    yearsExperience: 10,
    description: 'Skilled carpenter for custom furniture and home renovations'
  },
  {
    id: 4,
    name: 'Emma Wilson',
    trade: 'Plumber',
    location: 'Birmingham',
    rating: 4.6,
    available: true,
    hourlyRate: 42,
    yearsExperience: 8,
    description: 'Reliable plumber with focus on emergency repairs and installations'
  },
  {
    id: 5,
    name: 'David Martinez',
    trade: 'Electrician',
    location: 'London',
    rating: 4.9,
    available: true,
    hourlyRate: 55,
    yearsExperience: 18,
    description: 'Master electrician specializing in smart home systems'
  },
  {
    id: 6,
    name: 'Lisa Anderson',
    trade: 'Painter',
    location: 'Manchester',
    rating: 4.5,
    available: true,
    hourlyRate: 35,
    yearsExperience: 7,
    description: 'Professional painter for interior and exterior projects'
  },
  {
    id: 7,
    name: 'James Taylor',
    trade: 'Carpenter',
    location: 'Birmingham',
    rating: 4.8,
    available: false,
    hourlyRate: 48,
    yearsExperience: 14,
    description: 'Expert carpenter specializing in kitchen and bathroom fittings'
  },
  {
    id: 8,
    name: 'Rachel Green',
    trade: 'Plumber',
    location: 'London',
    rating: 4.7,
    available: true,
    hourlyRate: 46,
    yearsExperience: 11,
    description: 'Certified plumber with gas safe registration'
  }
]

const TRADE_TYPES = ['All', 'Plumber', 'Electrician', 'Carpenter', 'Painter']
const LOCATIONS = ['All', 'London', 'Manchester', 'Birmingham']
const MIN_RATING = 4.5

export default function CreateApi() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTrade, setSelectedTrade] = useState('All')
  const [selectedLocation, setSelectedLocation] = useState('All')
  const [minRating, setMinRating] = useState(0)
  const [availableOnly, setAvailableOnly] = useState(false)

  const filteredResults = useMemo(() => {
    return MOCK_TRADESPEOPLE.filter(person => {
      const matchesSearch = 
        searchQuery === '' ||
        person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        person.trade.toLowerCase().includes(searchQuery.toLowerCase()) ||
        person.description.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesTrade = selectedTrade === 'All' || person.trade === selectedTrade
      const matchesLocation = selectedLocation === 'All' || person.location === selectedLocation
      const matchesRating = person.rating >= minRating
      const matchesAvailability = !availableOnly || person.available

      return matchesSearch && matchesTrade && matchesLocation && matchesRating && matchesAvailability
    })
  }, [searchQuery, selectedTrade, selectedLocation, minRating, availableOnly])

  const handleClearFilters = () => {
    setSearchQuery('')
    setSelectedTrade('All')
    setSelectedLocation('All')
    setMinRating(0)
    setAvailableOnly(false)
  }

  return (
    <div data-testid="createapi" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Tradesperson Search API
          </h1>
          <p className="text-gray-600">
            Search and filter qualified tradespeople in your area
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            {/* Search Input */}
            <div className="lg:col-span-3">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                Search
              </label>
              <input
                id="search"
                type="text"
                data-testid="createapi-search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, trade, or description..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Trade Type Filter */}
            <div>
              <label htmlFor="trade" className="block text-sm font-medium text-gray-700 mb-2">
                Trade Type
              </label>
              <select
                id="trade"
                data-testid="createapi-trade"
                value={selectedTrade}
                onChange={(e) => setSelectedTrade(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {TRADE_TYPES.map(trade => (
                  <option key={trade} value={trade}>{trade}</option>
                ))}
              </select>
            </div>

            {/* Location Filter */}
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <select
                id="location"
                data-testid="createapi-location"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {LOCATIONS.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>

            {/* Minimum Rating Filter */}
            <div>
              <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-2">
                Minimum Rating
              </label>
              <select
                id="rating"
                data-testid="createapi-rating"
                value={minRating}
                onChange={(e) => setMinRating(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value={0}>Any Rating</option>
                <option value={4.5}>4.5+ Stars</option>
                <option value={4.7}>4.7+ Stars</option>
                <option value={4.8}>4.8+ Stars</option>
                <option value={4.9}>4.9+ Stars</option>
              </select>
            </div>
          </div>

          {/* Available Only Checkbox */}
          <div className="flex items-center mb-4">
            <input
              id="available"
              type="checkbox"
              data-testid="createapi-available"
              checked={availableOnly}
              onChange={(e) => setAvailableOnly(e.target.checked)}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="available" className="ml-2 text-sm text-gray-700">
              Show only available tradespeople
            </label>
          </div>

          {/* Clear Filters Button */}
          <button
            data-testid="createapi-clear"
            onClick={handleClearFilters}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
          >
            Clear All Filters
          </button>
        </div>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-gray-700 font-medium">
            Found {filteredResults.length} {filteredResults.length === 1 ? 'tradesperson' : 'tradespeople'}
          </p>
        </div>

        {/* Results List */}
        <div data-testid="createapi-list" className="space-y-4">
          {filteredResults.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <p className="text-gray-500 text-lg">No tradespeople found matching your criteria</p>
              <p className="text-gray-400 text-sm mt-2">Try adjusting your filters</p>
            </div>
          ) : (
            filteredResults.map(person => (
              <div
                key={person.id}
                data-testid="createapi-item"
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <h3 className="text-xl font-semibold text-gray-900 mr-3">
                        {person.name}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        person.available 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {person.available ? 'Available' : 'Busy'}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap gap-3 mb-3">
                      <span className="text-sm text-gray-600">
                        <span className="font-medium">Trade:</span> {person.trade}
                      </span>
                      <span className="text-sm text-gray-600">
                        <span className="font-medium">Location:</span> {person.location}
                      </span>
                      <span className="text-sm text-gray-600">
                        <span className="font-medium">Experience:</span> {person.yearsExperience} years
                      </span>
                    </div>

                    <p className="text-gray-700 mb-3">{person.description}</p>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center">
                        <span className="text-yellow-500 mr-1">★</span>
                        <span className="text-sm font-medium text-gray-900">
                          {person.rating.toFixed(1)}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600">
                        <span className="font-medium text-gray-900">£{person.hourlyRate}</span>/hour
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 md:mt-0 md:ml-6">
                    <button
                      data-testid="createapi-contact"
                      className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Contact
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
