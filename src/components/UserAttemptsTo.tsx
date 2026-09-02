/**
 * UserAttemptsTo — Demonstrates location validation for accessing location-based services
 *
 * Features: service listing, location input validation, error handling, service access control, user feedback
 *
 * Ticket: SCRUM-1278 | Branch: proto/SCRUM-1277
 */

import React, { useState } from 'react'

interface LocationService {
  id: string
  name: string
  description: string
  category: string
  requiresLocation: boolean
}

const MOCK_SERVICES: LocationService[] = [
  {
    id: 'srv-1',
    name: 'Find Local Plumbers',
    description: 'Connect with licensed plumbers in your area',
    category: 'Plumbing',
    requiresLocation: true
  },
  {
    id: 'srv-2',
    name: 'Electrician Services',
    description: 'Book certified electricians near you',
    category: 'Electrical',
    requiresLocation: true
  },
  {
    id: 'srv-3',
    name: 'HVAC Specialists',
    description: 'Find heating and cooling experts in your location',
    category: 'HVAC',
    requiresLocation: true
  },
  {
    id: 'srv-4',
    name: 'General Contractors',
    description: 'Search for general contractors in your area',
    category: 'Construction',
    requiresLocation: true
  },
  {
    id: 'srv-5',
    name: 'Landscaping Services',
    description: 'Discover landscaping professionals near you',
    category: 'Landscaping',
    requiresLocation: true
  },
  {
    id: 'srv-6',
    name: 'Roofing Experts',
    description: 'Find qualified roofers in your vicinity',
    category: 'Roofing',
    requiresLocation: true
  }
]

export default function UserAttemptsTo() {
  const [location, setLocation] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [attemptedService, setAttemptedService] = useState<string | null>(null)

  const handleAccessService = (service: LocationService) => {
    setAttemptedService(service.name)
    
    if (!location.trim()) {
      setError('Please provide a valid location to access location-based services')
      return
    }
    
    if (location.trim().length < 3) {
      setError('Location must be at least 3 characters long')
      return
    }
    
    // Success case
    setError(null)
    // In a real app, this would navigate to the service
    alert(`Accessing ${service.name} for location: ${location}`)
  }

  const handleLocationChange = (value: string) => {
    setLocation(value)
    // Clear error when user starts typing
    if (value.trim() && error) {
      setError(null)
    }
  }

  const handleClearLocation = () => {
    setLocation('')
    setError(null)
    setAttemptedService(null)
  }

  return (
    <section data-testid="userattemptsto" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Location-Based Services
          </h1>
          <p className="text-gray-600 mb-6">
            Access local tradesperson services in your area
          </p>

          {/* Location Input Section */}
          <div className="mb-6">
            <label 
              htmlFor="location-input" 
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Your Location *
            </label>
            <div className="flex gap-3">
              <input
                id="location-input"
                data-testid="userattemptsto-location"
                type="text"
                value={location}
                onChange={(e) => handleLocationChange(e.target.value)}
                placeholder="Enter your city, zip code, or address"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {location && (
                <button
                  data-testid="userattemptsto-clear"
                  onClick={handleClearLocation}
                  className="px-4 py-2 text-gray-600 hover:text-gray-900 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Clear
                </button>
              )}
            </div>
            {!location && (
              <p className="mt-2 text-sm text-gray-500">
                Location is required to access services
              </p>
            )}
          </div>

          {/* Error Display */}
          {error && (
            <div 
              data-testid="userattemptsto-error" 
              className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md"
            >
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg 
                    className="h-5 w-5 text-red-400" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    Location Required
                  </h3>
                  <p className="mt-1 text-sm text-red-700">
                    {error}
                  </p>
                  {attemptedService && (
                    <p className="mt-1 text-sm text-red-600">
                      Attempted to access: <strong>{attemptedService}</strong>
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Services List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Available Services
          </h2>
          <div data-testid="userattemptsto-list" className="grid gap-4 md:grid-cols-2">
            {MOCK_SERVICES.map((service) => (
              <div
                key={service.id}
                data-testid="userattemptsto-item"
                className="bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {service.name}
                    </h3>
                    <span className="inline-block mt-1 px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                      {service.category}
                    </span>
                  </div>
                  {service.requiresLocation && (
                    <svg 
                      className="h-5 w-5 text-gray-400" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" 
                      />
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" 
                      />
                    </svg>
                  )}
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  {service.description}
                </p>
                <button
                  data-testid="userattemptsto-access"
                  onClick={() => handleAccessService(service)}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                  Access Service
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-blue-900 mb-2">
            Why do we need your location?
          </h3>
          <p className="text-sm text-blue-800">
            We use your location to connect you with local tradespeople in your area. 
            This ensures you get the most relevant and nearby service providers.
          </p>
        </div>
      </div>
    </section>
  )
}
