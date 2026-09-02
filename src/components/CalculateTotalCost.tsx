/**
 * CalculateTotalCost — Calculate total cost of services based on hourly rate and estimated hours
 *
 * Features: service list display, cost calculation per service, grand total calculation, service selection, cost breakdown
 *
 * Ticket: SCRUM-1282 | Branch: proto/SCRUM-1277
 */

import React, { useState } from 'react'

interface Service {
  id: number
  name: string
  description: string
  hourlyRate: number
  estimatedHours: number
  category: string
}

const MOCK_SERVICES: Service[] = [
  {
    id: 1,
    name: 'Plumbing Installation',
    description: 'Install new bathroom fixtures and pipes',
    hourlyRate: 85,
    estimatedHours: 6,
    category: 'Plumbing'
  },
  {
    id: 2,
    name: 'Electrical Wiring',
    description: 'Rewire kitchen and install new outlets',
    hourlyRate: 95,
    estimatedHours: 8,
    category: 'Electrical'
  },
  {
    id: 3,
    name: 'Carpentry Work',
    description: 'Build custom cabinets and shelving',
    hourlyRate: 75,
    estimatedHours: 12,
    category: 'Carpentry'
  },
  {
    id: 4,
    name: 'HVAC Repair',
    description: 'Service and repair heating system',
    hourlyRate: 110,
    estimatedHours: 4,
    category: 'HVAC'
  },
  {
    id: 5,
    name: 'Painting Interior',
    description: 'Paint living room and two bedrooms',
    hourlyRate: 55,
    estimatedHours: 16,
    category: 'Painting'
  },
  {
    id: 6,
    name: 'Roofing Repair',
    description: 'Fix damaged shingles and flashing',
    hourlyRate: 90,
    estimatedHours: 10,
    category: 'Roofing'
  },
  {
    id: 7,
    name: 'Landscaping',
    description: 'Design and install garden features',
    hourlyRate: 65,
    estimatedHours: 20,
    category: 'Landscaping'
  }
]

export default function CalculateTotalCost() {
  const [selectedServices, setSelectedServices] = useState<number[]>([1, 2])
  const [customHourlyRate, setCustomHourlyRate] = useState<string>('75')
  const [customEstimatedHours, setCustomEstimatedHours] = useState<string>('8')

  const toggleService = (serviceId: number) => {
    setSelectedServices(prev =>
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    )
  }

  const calculateServiceCost = (hourlyRate: number, hours: number): number => {
    return hourlyRate * hours
  }

  const calculateGrandTotal = (): number => {
    return MOCK_SERVICES
      .filter(service => selectedServices.includes(service.id))
      .reduce((total, service) => {
        return total + calculateServiceCost(service.hourlyRate, service.estimatedHours)
      }, 0)
  }

  const calculateCustomCost = (): number => {
    const rate = parseFloat(customHourlyRate) || 0
    const hours = parseFloat(customEstimatedHours) || 0
    return rate * hours
  }

  return (
    <div data-testid="calculatetotalcost" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Service Cost Calculator
          </h1>
          <p className="text-gray-600">
            Select services to calculate total project cost based on hourly rates and estimated hours
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Services List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Available Services
              </h2>
              <div data-testid="calculatetotalcost-list" className="space-y-3">
                {MOCK_SERVICES.map(service => {
                  const isSelected = selectedServices.includes(service.id)
                  const serviceCost = calculateServiceCost(service.hourlyRate, service.estimatedHours)

                  return (
                    <div
                      key={service.id}
                      data-testid="calculatetotalcost-item"
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${
                        isSelected
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => toggleService(service.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <input
                              type="checkbox"
                              data-testid={`calculatetotalcost-checkbox-${service.id}`}
                              checked={isSelected}
                              onChange={() => toggleService(service.id)}
                              className="w-4 h-4 text-blue-600 rounded"
                              onClick={(e) => e.stopPropagation()}
                            />
                            <h3 className="font-semibold text-gray-900">
                              {service.name}
                            </h3>
                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700">
                              {service.category}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 ml-7">
                            {service.description}
                          </p>
                          <div className="flex items-center gap-4 mt-3 ml-7 text-sm">
                            <span className="text-gray-700">
                              <span className="font-medium">Rate:</span> ${service.hourlyRate}/hr
                            </span>
                            <span className="text-gray-700">
                              <span className="font-medium">Hours:</span> {service.estimatedHours}h
                            </span>
                          </div>
                        </div>
                        <div className="text-right ml-4">
                          <div className="text-lg font-bold text-gray-900">
                            ${serviceCost.toFixed(2)}
                          </div>
                          <div className="text-xs text-gray-500">
                            Total Cost
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Custom Cost Calculator */}
            <div className="bg-white rounded-lg shadow-md p-6 mt-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Custom Cost Calculator
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="hourly-rate"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Hourly Rate ($)
                  </label>
                  <input
                    id="hourly-rate"
                    type="number"
                    data-testid="calculatetotalcost-hourlyrate"
                    value={customHourlyRate}
                    onChange={(e) => setCustomHourlyRate(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    min="0"
                    step="0.01"
                  />
                </div>
                <div>
                  <label
                    htmlFor="estimated-hours"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Estimated Hours
                  </label>
                  <input
                    id="estimated-hours"
                    type="number"
                    data-testid="calculatetotalcost-estimatedhours"
                    value={customEstimatedHours}
                    onChange={(e) => setCustomEstimatedHours(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    min="0"
                    step="0.5"
                  />
                </div>
              </div>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium">Custom Calculation:</span>
                  <span className="text-xl font-bold text-gray-900">
                    ${calculateCustomCost().toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Cost Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Cost Summary
              </h2>
              
              {selectedServices.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p>No services selected</p>
                  <p className="text-sm mt-2">Select services to see the total cost</p>
                </div>
              ) : (
                <>
                  <div className="space-y-3 mb-4">
                    {MOCK_SERVICES
                      .filter(service => selectedServices.includes(service.id))
                      .map(service => {
                        const cost = calculateServiceCost(service.hourlyRate, service.estimatedHours)
                        return (
                          <div key={service.id} className="flex justify-between text-sm">
                            <span className="text-gray-700">{service.name}</span>
                            <span className="font-medium text-gray-900">
                              ${cost.toFixed(2)}
                            </span>
                          </div>
                        )
                      })}
                  </div>

                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-700">Subtotal:</span>
                      <span className="font-semibold text-gray-900">
                        ${calculateGrandTotal().toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-700">Tax (10%):</span>
                      <span className="font-semibold text-gray-900">
                        ${(calculateGrandTotal() * 0.1).toFixed(2)}
                      </span>
                    </div>
                    <div className="border-t border-gray-200 pt-3 mt-3">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-gray-900">Grand Total:</span>
                        <span className="text-2xl font-bold text-blue-600">
                          ${(calculateGrandTotal() * 1.1).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    data-testid="calculatetotalcost-clear"
                    onClick={() => setSelectedServices([])}
                    className="w-full mt-6 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                  >
                    Clear Selection
                  </button>

                  <button
                    data-testid="calculatetotalcost-submit"
                    className="w-full mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Request Quote
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
