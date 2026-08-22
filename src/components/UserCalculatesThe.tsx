/**
 * UserCalculatesThe — Calculate the cost for family activities in West Ireland
 *
 * Features: Activity selection, family size inputs, dynamic cost calculation, pricing breakdown, multiple activity options
 *
 * Ticket: SCRUM-1144 | Branch: proto/SCRUM-1140
 */

import React, { useState } from 'react'

interface Activity {
  id: string
  name: string
  description: string
  adultPrice: number
  childPrice: number
  familyDiscount?: number
}

const ACTIVITIES: Activity[] = [
  {
    id: 'cliffs-moher',
    name: 'Cliffs of Moher Tour',
    description: 'Guided tour of the iconic Cliffs of Moher with visitor center access',
    adultPrice: 25,
    childPrice: 12,
    familyDiscount: 10
  },
  {
    id: 'connemara-safari',
    name: 'Connemara Safari',
    description: 'Full day wildlife and landscape safari through Connemara National Park',
    adultPrice: 45,
    childPrice: 22,
    familyDiscount: 15
  },
  {
    id: 'aran-islands',
    name: 'Aran Islands Ferry & Tour',
    description: 'Ferry crossing and guided tour of the historic Aran Islands',
    adultPrice: 35,
    childPrice: 18,
    familyDiscount: 12
  },
  {
    id: 'burren-walk',
    name: 'Burren Nature Walk',
    description: 'Guided nature walk through the unique Burren limestone landscape',
    adultPrice: 20,
    childPrice: 10,
    familyDiscount: 8
  },
  {
    id: 'galway-bay-cruise',
    name: 'Galway Bay Cruise',
    description: 'Scenic cruise along Galway Bay with dolphin watching opportunities',
    adultPrice: 30,
    childPrice: 15,
    familyDiscount: 10
  },
  {
    id: 'kylemore-abbey',
    name: 'Kylemore Abbey Visit',
    description: 'Tour of the historic abbey and Victorian walled gardens',
    adultPrice: 18,
    childPrice: 8,
    familyDiscount: 5
  }
]

export default function UserCalculatesThe() {
  const [selectedActivityId, setSelectedActivityId] = useState<string>('')
  const [adults, setAdults] = useState<number>(2)
  const [children, setChildren] = useState<number>(2)
  const [calculated, setCalculated] = useState<boolean>(false)
  const [totalCost, setTotalCost] = useState<number>(0)
  const [breakdown, setBreakdown] = useState<{
    subtotal: number
    discount: number
    total: number
  }>({ subtotal: 0, discount: 0, total: 0 })

  const selectedActivity = ACTIVITIES.find(a => a.id === selectedActivityId)

  const handleCalculate = () => {
    if (!selectedActivity) return

    const adultsCost = adults * selectedActivity.adultPrice
    const childrenCost = children * selectedActivity.childPrice
    const subtotal = adultsCost + childrenCost

    let discount = 0
    const familySize = adults + children
    if (familySize >= 4 && selectedActivity.familyDiscount) {
      discount = selectedActivity.familyDiscount
    }

    const total = subtotal - discount

    setBreakdown({ subtotal, discount, total })
    setTotalCost(total)
    setCalculated(true)
  }

  const handleReset = () => {
    setSelectedActivityId('')
    setAdults(2)
    setChildren(2)
    setCalculated(false)
    setTotalCost(0)
    setBreakdown({ subtotal: 0, discount: 0, total: 0 })
  }

  return (
    <section data-testid="usercalculatesthe" className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-teal-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Family Activity Cost Calculator
          </h1>
          <p className="text-lg text-gray-600">
            Plan your West Ireland adventure and calculate costs
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column - Calculator Form */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Calculate Your Trip
            </h2>

            <div className="space-y-6">
              {/* Activity Selection */}
              <div>
                <label htmlFor="activity-select" className="block text-sm font-medium text-gray-700 mb-2">
                  Select Activity
                </label>
                <select
                  id="activity-select"
                  data-testid="usercalculatesthe-activity"
                  value={selectedActivityId}
                  onChange={(e) => {
                    setSelectedActivityId(e.target.value)
                    setCalculated(false)
                  }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
                >
                  <option value="">-- Choose an activity --</option>
                  {ACTIVITIES.map(activity => (
                    <option key={activity.id} value={activity.id}>
                      {activity.name} (€{activity.adultPrice}/adult, €{activity.childPrice}/child)
                    </option>
                  ))}
                </select>
              </div>

              {/* Selected Activity Details */}
              {selectedActivity && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                  <h3 className="font-semibold text-emerald-900 mb-1">
                    {selectedActivity.name}
                  </h3>
                  <p className="text-sm text-emerald-700 mb-2">
                    {selectedActivity.description}
                  </p>
                  <div className="text-sm text-emerald-800">
                    <div>Adult: €{selectedActivity.adultPrice}</div>
                    <div>Child: €{selectedActivity.childPrice}</div>
                    {selectedActivity.familyDiscount && (
                      <div className="text-emerald-600 font-medium mt-1">
                        Family discount (4+ people): -€{selectedActivity.familyDiscount}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Number of Adults */}
              <div>
                <label htmlFor="adults-input" className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Adults
                </label>
                <input
                  id="adults-input"
                  type="number"
                  data-testid="usercalculatesthe-adults"
                  value={adults}
                  onChange={(e) => {
                    setAdults(Math.max(0, parseInt(e.target.value) || 0))
                    setCalculated(false)
                  }}
                  min="0"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              {/* Number of Children */}
              <div>
                <label htmlFor="children-input" className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Children
                </label>
                <input
                  id="children-input"
                  type="number"
                  data-testid="usercalculatesthe-children"
                  value={children}
                  onChange={(e) => {
                    setChildren(Math.max(0, parseInt(e.target.value) || 0))
                    setCalculated(false)
                  }}
                  min="0"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  data-testid="usercalculatesthe-calculate"
                  onClick={handleCalculate}
                  disabled={!selectedActivityId || (adults === 0 && children === 0)}
                  className="flex-1 bg-emerald-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  Calculate Cost
                </button>
                <button
                  data-testid="usercalculatesthe-reset"
                  onClick={handleReset}
                  className="px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Results */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Cost Breakdown
            </h2>

            {!calculated && (
              <div className="flex items-center justify-center h-64 text-gray-400">
                <div className="text-center">
                  <svg className="mx-auto h-16 w-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  <p className="text-lg">Select an activity and click Calculate</p>
                </div>
              </div>
            )}

            {calculated && selectedActivity && (
              <div data-testid="usercalculatesthe-results" className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    {selectedActivity.name}
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-gray-600">
                      <span>{adults} Adult{adults !== 1 ? 's' : ''} × €{selectedActivity.adultPrice}</span>
                      <span>€{adults * selectedActivity.adultPrice}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>{children} Child{children !== 1 ? 'ren' : ''} × €{selectedActivity.childPrice}</span>
                      <span>€{children * selectedActivity.childPrice}</span>
                    </div>
                    <div className="border-t border-gray-300 pt-2 mt-2">
                      <div className="flex justify-between text-gray-800 font-medium">
                        <span>Subtotal</span>
                        <span>€{breakdown.subtotal}</span>
                      </div>
                    </div>
                    {breakdown.discount > 0 && (
                      <div className="flex justify-between text-emerald-600 font-medium">
                        <span>Family Discount</span>
                        <span>-€{breakdown.discount}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-emerald-600 text-white rounded-lg p-6">
                  <div className="text-sm uppercase tracking-wide mb-1">
                    Total Cost
                  </div>
                  <div className="text-4xl font-bold">
                    €{breakdown.total}
                  </div>
                  <div className="text-sm mt-2 text-emerald-100">
                    For {adults + children} person{(adults + children) !== 1 ? 's' : ''}
                  </div>
                </div>

                {breakdown.discount > 0 && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-start">
                      <svg className="h-5 w-5 text-yellow-600 mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <p className="text-sm font-medium text-yellow-900">
                          Family Discount Applied!
                        </p>
                        <p className="text-xs text-yellow-700 mt-1">
                          You saved €{breakdown.discount} with our family package
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Activity List */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Available Activities
          </h2>
          <div data-testid="usercalculatesthe-list" className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ACTIVITIES.map(activity => (
              <div
                key={activity.id}
                data-testid="usercalculatesthe-item"
                className={`border rounded-lg p-4 transition-all cursor-pointer ${
                  selectedActivityId === activity.id
                    ? 'border-emerald-500 bg-emerald-50'
                    : 'border-gray-200 hover:border-emerald-300 hover:bg-gray-50'
                }`}
                onClick={() => {
                  setSelectedActivityId(activity.id)
                  setCalculated(false)
                }}
              >
                <h3 className="font-semibold text-gray-900 mb-2">
                  {activity.name}
                </h3>
                <p className="text-xs text-gray-600 mb-3">
                  {activity.description}
                </p>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">Adult: €{activity.adultPrice}</span>
                  <span className="text-gray-700">Child: €{activity.childPrice}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
