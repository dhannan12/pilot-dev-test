/**
 * CalculateTotalCost — Calculate total cost of membership based on type and duration
 *
 * Features: membership type selection, duration picker, price calculation, discount display, real-time cost updates
 *
 * Ticket: SCRUM-1034 | Branch: proto/SCRUM-1028
 */

import { useState } from 'react'

interface MembershipType {
  id: string
  name: string
  monthlyPrice: number
  description: string
  features: string[]
}

interface Duration {
  id: string
  label: string
  months: number
  discountPercent: number
}

const membershipTypes: MembershipType[] = [
  {
    id: 'basic',
    name: 'Basic Membership',
    monthlyPrice: 29.99,
    description: 'Access to gym equipment during off-peak hours',
    features: ['Gym access (6am-4pm)', 'Locker rental', 'Basic equipment']
  },
  {
    id: 'standard',
    name: 'Standard Membership',
    monthlyPrice: 49.99,
    description: 'Full access to all gym facilities',
    features: ['24/7 gym access', 'Group classes', 'Locker rental', 'Sauna & steam room']
  },
  {
    id: 'premium',
    name: 'Premium Membership',
    monthlyPrice: 79.99,
    description: 'All-inclusive membership with personal training',
    features: ['24/7 gym access', 'All group classes', 'Personal trainer sessions', 'Spa access', 'Guest passes']
  },
  {
    id: 'family',
    name: 'Family Membership',
    monthlyPrice: 129.99,
    description: 'Membership for up to 4 family members',
    features: ['24/7 gym access', 'All group classes', 'Kids club', 'Pool access', 'Family locker room']
  },
  {
    id: 'student',
    name: 'Student Membership',
    monthlyPrice: 24.99,
    description: 'Discounted membership for students',
    features: ['Gym access (6am-10pm)', 'Group classes', 'Study lounge', 'Student discounts']
  }
]

const durations: Duration[] = [
  { id: '1month', label: '1 Month', months: 1, discountPercent: 0 },
  { id: '3months', label: '3 Months', months: 3, discountPercent: 5 },
  { id: '6months', label: '6 Months', months: 6, discountPercent: 10 },
  { id: '12months', label: '12 Months', months: 12, discountPercent: 15 },
  { id: '24months', label: '24 Months', months: 24, discountPercent: 20 }
]

export default function CalculateTotalCost() {
  const [selectedMembership, setSelectedMembership] = useState<string>('')
  const [selectedDuration, setSelectedDuration] = useState<string>('')

  const calculateCost = () => {
    if (!selectedMembership || !selectedDuration) {
      return { subtotal: 0, discount: 0, total: 0, discountPercent: 0, months: 0 }
    }

    const membership = membershipTypes.find(m => m.id === selectedMembership)
    const duration = durations.find(d => d.id === selectedDuration)

    if (!membership || !duration) {
      return { subtotal: 0, discount: 0, total: 0, discountPercent: 0, months: 0 }
    }

    const subtotal = membership.monthlyPrice * duration.months
    const discount = subtotal * (duration.discountPercent / 100)
    const total = subtotal - discount

    return {
      subtotal,
      discount,
      total,
      discountPercent: duration.discountPercent,
      months: duration.months
    }
  }

  const cost = calculateCost()
  const selectedMembershipData = membershipTypes.find(m => m.id === selectedMembership)

  return (
    <div data-testid="calculatetotalcost" className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Membership Cost Calculator</h1>
            <p className="text-gray-600">Select your membership type and duration to calculate total cost</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Membership Type Selection */}
            <div>
              <label htmlFor="membership-select" className="block text-lg font-semibold text-gray-900 mb-4">
                Select Membership Type
              </label>
              <select
                id="membership-select"
                data-testid="calculatetotalcost-membership"
                value={selectedMembership}
                onChange={(e) => setSelectedMembership(e.target.value)}
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none text-gray-900 mb-4"
              >
                <option value="">Choose a membership...</option>
                {membershipTypes.map(type => (
                  <option key={type.id} value={type.id}>
                    {type.name} - ${type.monthlyPrice}/month
                  </option>
                ))}
              </select>

              {selectedMembershipData && (
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">{selectedMembershipData.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{selectedMembershipData.description}</p>
                  <ul className="space-y-1">
                    {selectedMembershipData.features.map((feature, idx) => (
                      <li key={idx} className="text-sm text-gray-700 flex items-start">
                        <span className="text-indigo-600 mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Duration Selection */}
            <div>
              <label htmlFor="duration-select" className="block text-lg font-semibold text-gray-900 mb-4">
                Select Duration
              </label>
              <select
                id="duration-select"
                data-testid="calculatetotalcost-duration"
                value={selectedDuration}
                onChange={(e) => setSelectedDuration(e.target.value)}
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none text-gray-900 mb-4"
              >
                <option value="">Choose a duration...</option>
                {durations.map(duration => (
                  <option key={duration.id} value={duration.id}>
                    {duration.label}
                    {duration.discountPercent > 0 && ` (Save ${duration.discountPercent}%)`}
                  </option>
                ))}
              </select>

              {selectedDuration && (
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Commitment Period</h3>
                  <p className="text-sm text-gray-700 mb-2">
                    Duration: <span className="font-semibold">{cost.months} months</span>
                  </p>
                  {cost.discountPercent > 0 && (
                    <p className="text-sm text-green-700 font-semibold">
                      🎉 You'll save {cost.discountPercent}% on this plan!
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Cost Breakdown */}
          {selectedMembership && selectedDuration && (
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border-2 border-indigo-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Cost Breakdown</h2>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Monthly Price:</span>
                  <span className="font-semibold text-gray-900">
                    ${selectedMembershipData?.monthlyPrice.toFixed(2)}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Duration:</span>
                  <span className="font-semibold text-gray-900">{cost.months} months</span>
                </div>
                
                <div className="flex justify-between items-center pt-2 border-t border-indigo-300">
                  <span className="text-gray-700">Subtotal:</span>
                  <span className="font-semibold text-gray-900">${cost.subtotal.toFixed(2)}</span>
                </div>
                
                {cost.discount > 0 && (
                  <div className="flex justify-between items-center text-green-700">
                    <span>Discount ({cost.discountPercent}%):</span>
                    <span className="font-semibold">-${cost.discount.toFixed(2)}</span>
                  </div>
                )}
              </div>
              
              <div className="pt-4 border-t-2 border-indigo-300">
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-gray-900">Total Cost:</span>
                  <span className="text-3xl font-bold text-indigo-600">
                    ${cost.total.toFixed(2)}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-2 text-right">
                  Effective monthly rate: ${(cost.total / cost.months).toFixed(2)}/month
                </p>
              </div>

              <button
                data-testid="calculatetotalcost-submit"
                className="w-full mt-6 bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-200"
              >
                Proceed to Checkout
              </button>
            </div>
          )}

          {!selectedMembership || !selectedDuration ? (
            <div className="text-center py-8 text-gray-500">
              <p>Please select both membership type and duration to calculate the total cost</p>
            </div>
          ) : null}

          {/* Membership Type List */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">All Membership Options</h2>
            <div data-testid="calculatetotalcost-list" className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {membershipTypes.map(type => (
                <div
                  key={type.id}
                  data-testid="calculatetotalcost-item"
                  className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                    selectedMembership === type.id
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 bg-white hover:border-indigo-300'
                  }`}
                >
                  <h3 className="font-bold text-gray-900 mb-1">{type.name}</h3>
                  <p className="text-2xl font-bold text-indigo-600 mb-2">
                    ${type.monthlyPrice}
                    <span className="text-sm text-gray-600 font-normal">/month</span>
                  </p>
                  <p className="text-sm text-gray-600">{type.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
