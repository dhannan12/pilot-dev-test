/**
 * UserAttemptsTo — Filter tradespeople by service area with validation for out-of-area searches
 *
 * Features: service area filter, tradesperson listings, area validation, error messaging, filtered results display
 *
 * Ticket: SCRUM-1281 | Branch: proto/SCRUM-1277
 */

import React, { useState } from 'react'

interface Tradesperson {
  id: number
  name: string
  trade: string
  serviceAreas: string[]
  rating: number
  yearsExperience: number
}

const MOCK_TRADESPEOPLE: Tradesperson[] = [
  {
    id: 1,
    name: 'John Smith',
    trade: 'Plumber',
    serviceAreas: ['Downtown', 'North District', 'West End'],
    rating: 4.8,
    yearsExperience: 12
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    trade: 'Electrician',
    serviceAreas: ['Downtown', 'East Side', 'South Bay'],
    rating: 4.9,
    yearsExperience: 8
  },
  {
    id: 3,
    name: 'Mike Chen',
    trade: 'Carpenter',
    serviceAreas: ['North District', 'West End', 'Hillside'],
    rating: 4.7,
    yearsExperience: 15
  },
  {
    id: 4,
    name: 'Emily Davis',
    trade: 'HVAC Technician',
    serviceAreas: ['Downtown', 'South Bay', 'Hillside'],
    rating: 4.6,
    yearsExperience: 10
  },
  {
    id: 5,
    name: 'Robert Taylor',
    trade: 'General Contractor',
    serviceAreas: ['East Side', 'West End', 'North District'],
    rating: 4.9,
    yearsExperience: 20
  },
  {
    id: 6,
    name: 'Lisa Martinez',
    trade: 'Painter',
    serviceAreas: ['Downtown', 'South Bay', 'East Side'],
    rating: 4.5,
    yearsExperience: 7
  }
]

const DEFINED_AREAS = [
  'Downtown',
  'North District',
  'East Side',
  'West End',
  'South Bay',
  'Hillside'
]

export default function UserAttemptsTo() {
  const [searchArea, setSearchArea] = useState('')
  const [filterActive, setFilterActive] = useState(false)
  const [showError, setShowError] = useState(false)
  const [filteredTradespeople, setFilteredTradespeople] = useState<Tradesperson[]>(MOCK_TRADESPEOPLE)

  const handleFilter = () => {
    if (!searchArea.trim()) {
      setFilterActive(false)
      setShowError(false)
      setFilteredTradespeople(MOCK_TRADESPEOPLE)
      return
    }

    const isValidArea = DEFINED_AREAS.some(
      area => area.toLowerCase() === searchArea.trim().toLowerCase()
    )

    if (!isValidArea) {
      setShowError(true)
      setFilterActive(true)
      setFilteredTradespeople([])
      return
    }

    setShowError(false)
    setFilterActive(true)
    const filtered = MOCK_TRADESPEOPLE.filter(tp =>
      tp.serviceAreas.some(
        area => area.toLowerCase() === searchArea.trim().toLowerCase()
      )
    )
    setFilteredTradespeople(filtered)
  }

  const handleReset = () => {
    setSearchArea('')
    setFilterActive(false)
    setShowError(false)
    setFilteredTradespeople(MOCK_TRADESPEOPLE)
  }

  return (
    <div data-testid="userattemptsto" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Find Tradespeople by Service Area
        </h1>
        <p className="text-gray-600 mb-6">
          Search for qualified tradespeople in your area
        </p>

        {/* Filter Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="mb-4">
            <label htmlFor="area-input" className="block text-sm font-medium text-gray-700 mb-2">
              Service Area
            </label>
            <div className="flex gap-3">
              <input
                id="area-input"
                type="text"
                data-testid="userattemptsto-area"
                value={searchArea}
                onChange={(e) => setSearchArea(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleFilter()}
                placeholder="Enter service area (e.g., Downtown, North District)"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                data-testid="userattemptsto-submit"
                onClick={handleFilter}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Filter
              </button>
              <button
                data-testid="userattemptsto-reset"
                onClick={handleReset}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                Reset
              </button>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-2">Defined service areas:</p>
            <div className="flex flex-wrap gap-2">
              {DEFINED_AREAS.map(area => (
                <button
                  key={area}
                  data-testid="userattemptsto-area-tag"
                  onClick={() => {
                    setSearchArea(area)
                    setShowError(false)
                  }}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                >
                  {area}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Error Message */}
        {showError && (
          <div
            data-testid="userattemptsto-error"
            className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6"
          >
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  Service Area Not Found
                </h3>
                <p className="mt-1 text-sm text-red-700">
                  The area "{searchArea}" is outside our defined service areas. Please select from the available areas above or contact support to request coverage in your area.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Results Summary */}
        {filterActive && !showError && (
          <div className="mb-4">
            <p className="text-gray-700">
              Found <span className="font-semibold">{filteredTradespeople.length}</span> tradesperson{filteredTradespeople.length !== 1 ? 's' : ''} servicing <span className="font-semibold">{searchArea}</span>
            </p>
          </div>
        )}

        {!filterActive && (
          <div className="mb-4">
            <p className="text-gray-700">
              Showing <span className="font-semibold">{filteredTradespeople.length}</span> available tradesperson{filteredTradespeople.length !== 1 ? 's' : ''}
            </p>
          </div>
        )}

        {/* Tradespeople List */}
        <div data-testid="userattemptsto-list" className="grid gap-4">
          {filteredTradespeople.length === 0 && !showError && (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <p className="text-gray-500">No tradespeople found for this area.</p>
            </div>
          )}
          
          {filteredTradespeople.map(person => (
            <div
              key={person.id}
              data-testid="userattemptsto-item"
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {person.name}
                  </h3>
                  <p className="text-blue-600 font-medium mb-3">{person.trade}</p>
                  
                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-gray-700 font-medium">{person.rating}</span>
                    </div>
                    <div className="text-gray-600">
                      {person.yearsExperience} years experience
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500 mb-1">Service Areas:</p>
                    <div className="flex flex-wrap gap-2">
                      {person.serviceAreas.map(area => (
                        <span
                          key={area}
                          className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-sm"
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  data-testid="userattemptsto-contact"
                  className="ml-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  Contact
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
