/**
 * CalculateSecurity — Calculates security deposit for rental properties based on monthly rent
 *
 * Features: property listing, rent input, automatic deposit calculation, currency formatting, multi-property support
 *
 * Ticket: SCRUM-711 | Branch: proto/SCRUM-703
 */

import React, { useState } from 'react'

interface Property {
  id: string
  address: string
  monthlyRent: number
  propertyType: string
  bedrooms: number
}

const mockProperties: Property[] = [
  {
    id: 'prop-001',
    address: '123 Maple Street, Downtown',
    monthlyRent: 2500,
    propertyType: 'Apartment',
    bedrooms: 2
  },
  {
    id: 'prop-002',
    address: '456 Oak Avenue, Riverside',
    monthlyRent: 3200,
    propertyType: 'Condo',
    bedrooms: 3
  },
  {
    id: 'prop-003',
    address: '789 Pine Road, Suburbs',
    monthlyRent: 1800,
    propertyType: 'Studio',
    bedrooms: 1
  },
  {
    id: 'prop-004',
    address: '321 Elm Boulevard, City Center',
    monthlyRent: 4500,
    propertyType: 'Townhouse',
    bedrooms: 4
  },
  {
    id: 'prop-005',
    address: '654 Birch Lane, Lakeside',
    monthlyRent: 2800,
    propertyType: 'Apartment',
    bedrooms: 2
  }
]

export default function CalculateSecurity() {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [customRent, setCustomRent] = useState<string>('')
  const [useCustom, setUseCustom] = useState(false)

  const calculateDeposit = (): number => {
    if (useCustom && customRent) {
      const rent = parseFloat(customRent)
      return isNaN(rent) ? 0 : rent
    }
    return selectedProperty?.monthlyRent || 0
  }

  const securityDeposit = calculateDeposit()

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Security Deposit Calculator
          </h1>
          <p className="text-gray-600 mb-8">
            Calculate security deposit as one month's rent
          </p>

          {/* Toggle between property selection and custom input */}
          <div className="mb-6 flex gap-4">
            <button
              onClick={() => setUseCustom(false)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                !useCustom
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Select Property
            </button>
            <button
              onClick={() => setUseCustom(true)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                useCustom
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Custom Rent Amount
            </button>
          </div>

          {/* Property Selection Mode */}
          {!useCustom && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">
                Select a Property
              </h2>
              <div className="space-y-3">
                {mockProperties.map((property) => (
                  <div
                    key={property.id}
                    onClick={() => setSelectedProperty(property)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedProperty?.id === property.id
                        ? 'border-indigo-600 bg-indigo-50'
                        : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-800">
                          {property.address}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {property.propertyType} • {property.bedrooms} bed
                          {property.bedrooms > 1 ? 's' : ''}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-indigo-600">
                          {formatCurrency(property.monthlyRent)}
                        </p>
                        <p className="text-xs text-gray-500">per month</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Custom Rent Input Mode */}
          {useCustom && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">
                Enter Monthly Rent
              </h2>
              <div className="relative">
                <span className="absolute left-4 top-3 text-gray-500 text-lg">
                  $
                </span>
                <input
                  type="number"
                  value={customRent}
                  onChange={(e) => setCustomRent(e.target.value)}
                  placeholder="0.00"
                  className="w-full pl-8 pr-4 py-3 border-2 border-gray-300 rounded-lg text-lg focus:outline-none focus:border-indigo-600"
                  min="0"
                  step="0.01"
                />
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Enter the monthly rent amount to calculate security deposit
              </p>
            </div>
          )}

          {/* Calculation Result */}
          {securityDeposit > 0 && (
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-indigo-100 text-sm font-medium mb-1">
                    SECURITY DEPOSIT REQUIRED
                  </p>
                  <p className="text-4xl font-bold">
                    {formatCurrency(securityDeposit)}
                  </p>
                  <p className="text-indigo-100 text-sm mt-2">
                    Equivalent to one month's rent
                  </p>
                </div>
                <div className="text-right">
                  <div className="bg-white bg-opacity-20 rounded-lg px-4 py-3">
                    <p className="text-xs text-indigo-100 mb-1">Monthly Rent</p>
                    <p className="text-xl font-semibold">
                      {formatCurrency(securityDeposit)}
                    </p>
                  </div>
                </div>
              </div>

              {!useCustom && selectedProperty && (
                <div className="mt-4 pt-4 border-t border-indigo-400">
                  <p className="text-sm text-indigo-100">
                    <span className="font-semibold">Property:</span>{' '}
                    {selectedProperty.address}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Empty State */}
          {securityDeposit === 0 && (
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <div className="text-gray-400 mb-3">
                <svg
                  className="w-16 h-16 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <p className="text-gray-600 font-medium">
                {useCustom
                  ? 'Enter a monthly rent amount to calculate security deposit'
                  : 'Select a property to calculate security deposit'}
              </p>
            </div>
          )}

          {/* Information Footer */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">
              About Security Deposits
            </h3>
            <p className="text-sm text-gray-600">
              The security deposit is calculated as equivalent to one month's
              rent and is collected at the start of the lease to cover potential
              damages or unpaid rent.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
