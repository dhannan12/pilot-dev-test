/**
 * UserCalculatesThe — Family activity cost calculator for tourist attractions
 *
 * Features: activity selection, family size input, pricing breakdown, real-time cost calculation, responsive design
 *
 * Ticket: SCRUM-1144 | Branch: proto/SCRUM-1140
 */

import React, { useState } from 'react'

interface Activity {
  id: string
  name: string
  adultPrice: number
  childPrice: number
  description: string
}

const MOCK_ACTIVITIES: Activity[] = [
  {
    id: '1',
    name: 'Connemara National Park Tour',
    adultPrice: 15.00,
    childPrice: 8.00,
    description: 'Guided walking tour through stunning mountain landscapes'
  },
  {
    id: '2',
    name: 'Cliffs of Moher Day Trip',
    adultPrice: 25.00,
    childPrice: 12.00,
    description: 'Full day excursion to one of Ireland\'s most iconic landmarks'
  },
  {
    id: '3',
    name: 'Traditional Irish Music Session',
    adultPrice: 12.00,
    childPrice: 5.00,
    description: 'Evening of authentic Irish music and dance in a local pub'
  },
  {
    id: '4',
    name: 'Boat Tour of Galway Bay',
    adultPrice: 20.00,
    childPrice: 10.00,
    description: 'Scenic boat tour with wildlife spotting and coastal views'
  },
  {
    id: '5',
    name: 'Aran Islands Ferry & Tour',
    adultPrice: 30.00,
    childPrice: 15.00,
    description: 'Ferry ride and guided tour of the historic Aran Islands'
  },
  {
    id: '6',
    name: 'Kylemore Abbey Visit',
    adultPrice: 18.00,
    childPrice: 9.00,
    description: 'Explore the beautiful abbey and Victorian walled gardens'
  },
  {
    id: '7',
    name: 'Horseback Riding on the Beach',
    adultPrice: 35.00,
    childPrice: 25.00,
    description: 'Guided horseback riding experience along the Atlantic coast'
  }
]

export default function UserCalculatesThe() {
  const [selectedActivityId, setSelectedActivityId] = useState<string>('')
  const [numAdults, setNumAdults] = useState<number>(0)
  const [numChildren, setNumChildren] = useState<number>(0)
  const [totalCost, setTotalCost] = useState<number | null>(null)

  const selectedActivity = MOCK_ACTIVITIES.find(a => a.id === selectedActivityId)

  const handleCalculate = () => {
    if (selectedActivity && (numAdults > 0 || numChildren > 0)) {
      const cost = (numAdults * selectedActivity.adultPrice) + (numChildren * selectedActivity.childPrice)
      setTotalCost(cost)
    } else {
      setTotalCost(null)
    }
  }

  const handleReset = () => {
    setSelectedActivityId('')
    setNumAdults(0)
    setNumChildren(0)
    setTotalCost(null)
  }

  return (
    <section data-testid="usercalculatesthe" className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-4xl font-bold text-emerald-800 mb-2 text-center">
            Family Activity Cost Calculator
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Plan your West Ireland family adventure with ease
          </p>

          {/* Activity Selection */}
          <div className="mb-6">
            <label htmlFor="activity-select" className="block text-lg font-semibold text-gray-700 mb-2">
              Choose Your Activity
            </label>
            <select
              id="activity-select"
              data-testid="usercalculatesthe-activity"
              value={selectedActivityId}
              onChange={(e) => setSelectedActivityId(e.target.value)}
              className="w-full px-4 py-3 border-2 border-emerald-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-700"
            >
              <option value="">-- Select an activity --</option>
              {MOCK_ACTIVITIES.map(activity => (
                <option key={activity.id} value={activity.id}>
                  {activity.name} - Adult: €{activity.adultPrice.toFixed(2)}, Child: €{activity.childPrice.toFixed(2)}
                </option>
              ))}
            </select>
          </div>

          {/* Activity Description */}
          {selectedActivity && (
            <div className="mb-6 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
              <p className="text-gray-700">{selectedActivity.description}</p>
              <div className="mt-3 flex gap-4 text-sm">
                <span className="font-semibold text-emerald-700">
                  Adult: €{selectedActivity.adultPrice.toFixed(2)}
                </span>
                <span className="font-semibold text-emerald-700">
                  Child: €{selectedActivity.childPrice.toFixed(2)}
                </span>
              </div>
            </div>
          )}

          {/* Family Size Inputs */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="adults-input" className="block text-lg font-semibold text-gray-700 mb-2">
                Number of Adults
              </label>
              <input
                id="adults-input"
                type="number"
                data-testid="usercalculatesthe-adults"
                min="0"
                max="20"
                value={numAdults}
                onChange={(e) => setNumAdults(parseInt(e.target.value) || 0)}
                className="w-full px-4 py-3 border-2 border-emerald-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-700"
                placeholder="0"
              />
            </div>

            <div>
              <label htmlFor="children-input" className="block text-lg font-semibold text-gray-700 mb-2">
                Number of Children
              </label>
              <input
                id="children-input"
                type="number"
                data-testid="usercalculatesthe-children"
                min="0"
                max="20"
                value={numChildren}
                onChange={(e) => setNumChildren(parseInt(e.target.value) || 0)}
                className="w-full px-4 py-3 border-2 border-emerald-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-700"
                placeholder="0"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mb-8">
            <button
              data-testid="usercalculatesthe-calculate"
              onClick={handleCalculate}
              disabled={!selectedActivityId || (numAdults === 0 && numChildren === 0)}
              className="flex-1 bg-emerald-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-emerald-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Calculate Total Cost
            </button>
            <button
              data-testid="usercalculatesthe-reset"
              onClick={handleReset}
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
            >
              Reset
            </button>
          </div>

          {/* Cost Breakdown */}
          {totalCost !== null && selectedActivity && (
            <div data-testid="usercalculatesthe-result" className="bg-gradient-to-r from-emerald-100 to-blue-100 rounded-xl p-6 border-2 border-emerald-300">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Cost Breakdown</h2>
              
              <div className="space-y-2 mb-4">
                {numAdults > 0 && (
                  <div className="flex justify-between text-gray-700">
                    <span>{numAdults} Adult{numAdults > 1 ? 's' : ''} × €{selectedActivity.adultPrice.toFixed(2)}</span>
                    <span className="font-semibold">€{(numAdults * selectedActivity.adultPrice).toFixed(2)}</span>
                  </div>
                )}
                {numChildren > 0 && (
                  <div className="flex justify-between text-gray-700">
                    <span>{numChildren} Child{numChildren > 1 ? 'ren' : ''} × €{selectedActivity.childPrice.toFixed(2)}</span>
                    <span className="font-semibold">€{(numChildren * selectedActivity.childPrice).toFixed(2)}</span>
                  </div>
                )}
              </div>

              <div className="border-t-2 border-emerald-400 pt-3 mt-3">
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-gray-800">Total Cost:</span>
                  <span className="text-3xl font-bold text-emerald-700">€{totalCost.toFixed(2)}</span>
                </div>
              </div>

              <p className="text-sm text-gray-600 mt-4 text-center">
                Total guests: {numAdults + numChildren} • {selectedActivity.name}
              </p>
            </div>
          )}

          {/* Available Activities List */}
          <div className="mt-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Available Activities</h3>
            <div data-testid="usercalculatesthe-list" className="grid md:grid-cols-2 gap-4">
              {MOCK_ACTIVITIES.map(activity => (
                <div
                  key={activity.id}
                  data-testid="usercalculatesthe-item"
                  className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                    selectedActivityId === activity.id
                      ? 'border-emerald-500 bg-emerald-50'
                      : 'border-gray-200 hover:border-emerald-300 hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedActivityId(activity.id)}
                >
                  <h4 className="font-semibold text-gray-800 mb-1">{activity.name}</h4>
                  <p className="text-sm text-gray-600 mb-2">{activity.description}</p>
                  <div className="flex gap-3 text-sm">
                    <span className="text-emerald-700 font-medium">Adult: €{activity.adultPrice.toFixed(2)}</span>
                    <span className="text-blue-700 font-medium">Child: €{activity.childPrice.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
