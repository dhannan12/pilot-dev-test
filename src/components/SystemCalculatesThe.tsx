/**
 * SystemCalculatesThe — Calculates gym membership fees based on type and duration
 *
 * Features: membership type selection, duration picker, automatic fee calculation, pricing display, summary view
 *
 * Ticket: SCRUM-955 | Branch: proto/SCRUM-951
 */

import { useState } from 'react'

interface MembershipType {
  id: string
  name: string
  monthlyRate: number
  description: string
}

interface Duration {
  months: number
  label: string
  discount: number // percentage discount
}

const MEMBERSHIP_TYPES: MembershipType[] = [
  {
    id: 'basic',
    name: 'Basic Membership',
    monthlyRate: 29.99,
    description: 'Access to gym equipment and facilities'
  },
  {
    id: 'premium',
    name: 'Premium Membership',
    monthlyRate: 49.99,
    description: 'Gym access plus group classes'
  },
  {
    id: 'elite',
    name: 'Elite Membership',
    monthlyRate: 79.99,
    description: 'Full access plus personal training sessions'
  },
  {
    id: 'family',
    name: 'Family Membership',
    monthlyRate: 99.99,
    description: 'Access for up to 4 family members'
  },
  {
    id: 'student',
    name: 'Student Membership',
    monthlyRate: 19.99,
    description: 'Discounted rate for students with valid ID'
  }
]

const DURATIONS: Duration[] = [
  { months: 1, label: '1 Month', discount: 0 },
  { months: 3, label: '3 Months', discount: 5 },
  { months: 6, label: '6 Months', discount: 10 },
  { months: 12, label: '12 Months', discount: 15 },
  { months: 24, label: '24 Months', discount: 20 }
]

export default function SystemCalculatesThe() {
  const [selectedMembership, setSelectedMembership] = useState<string>('')
  const [selectedDuration, setSelectedDuration] = useState<number>(1)

  const calculateTotal = (): number => {
    if (!selectedMembership) return 0
    
    const membership = MEMBERSHIP_TYPES.find(m => m.id === selectedMembership)
    if (!membership) return 0
    
    const duration = DURATIONS.find(d => d.months === selectedDuration)
    if (!duration) return 0
    
    const subtotal = membership.monthlyRate * duration.months
    const discountAmount = subtotal * (duration.discount / 100)
    return subtotal - discountAmount
  }

  const getSubtotal = (): number => {
    if (!selectedMembership) return 0
    const membership = MEMBERSHIP_TYPES.find(m => m.id === selectedMembership)
    return membership ? membership.monthlyRate * selectedDuration : 0
  }

  const getDiscountAmount = (): number => {
    const duration = DURATIONS.find(d => d.months === selectedDuration)
    const discount = duration?.discount || 0
    return getSubtotal() * (discount / 100)
  }

  const getSelectedMembership = () => {
    return MEMBERSHIP_TYPES.find(m => m.id === selectedMembership)
  }

  const getSelectedDuration = () => {
    return DURATIONS.find(d => d.months === selectedDuration)
  }

  return (
    <section data-testid="system-calculates-the" className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">
            Membership Fee Calculator
          </h1>
          <p className="text-slate-600 mb-8">
            Select your membership type and duration to calculate your total fee
          </p>

          {/* Membership Type Selection */}
          <div className="mb-8">
            <label htmlFor="membership-select" className="block text-lg font-semibold text-slate-700 mb-4">
              Select Membership Type
            </label>
            <select
              id="membership-select"
              data-testid="system-calculates-the-membership"
              value={selectedMembership}
              onChange={(e) => setSelectedMembership(e.target.value)}
              className="w-full p-3 border-2 border-slate-300 rounded-lg focus:border-blue-500 focus:outline-none text-slate-700"
            >
              <option value="">-- Choose a membership --</option>
              {MEMBERSHIP_TYPES.map((membership) => (
                <option key={membership.id} value={membership.id}>
                  {membership.name} - ${membership.monthlyRate.toFixed(2)}/month
                </option>
              ))}
            </select>
            {selectedMembership && (
              <p className="mt-2 text-sm text-slate-600">
                {getSelectedMembership()?.description}
              </p>
            )}
          </div>

          {/* Duration Selection */}
          <div className="mb-8">
            <label className="block text-lg font-semibold text-slate-700 mb-4">
              Select Duration
            </label>
            <div data-testid="system-calculates-the-duration-list" className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {DURATIONS.map((duration) => (
                <button
                  key={duration.months}
                  data-testid="system-calculates-the-duration-item"
                  onClick={() => setSelectedDuration(duration.months)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedDuration === duration.months
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-slate-300 bg-white text-slate-700 hover:border-slate-400'
                  }`}
                >
                  <div className="font-semibold">{duration.label}</div>
                  {duration.discount > 0 && (
                    <div className="text-xs mt-1 text-green-600 font-medium">
                      Save {duration.discount}%
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Calculation Summary */}
          {selectedMembership && (
            <div data-testid="system-calculates-the-summary" className="bg-slate-50 rounded-lg p-6 mb-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-4">
                Fee Summary
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between text-slate-700">
                  <span>Membership Type:</span>
                  <span className="font-medium">{getSelectedMembership()?.name}</span>
                </div>
                <div className="flex justify-between text-slate-700">
                  <span>Monthly Rate:</span>
                  <span className="font-medium">
                    ${getSelectedMembership()?.monthlyRate.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-slate-700">
                  <span>Duration:</span>
                  <span className="font-medium">{getSelectedDuration()?.label}</span>
                </div>
                <div className="flex justify-between text-slate-700">
                  <span>Subtotal:</span>
                  <span className="font-medium">${getSubtotal().toFixed(2)}</span>
                </div>
                {getDiscountAmount() > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount ({getSelectedDuration()?.discount}%):</span>
                    <span className="font-medium">-${getDiscountAmount().toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t-2 border-slate-300 pt-3 mt-3">
                  <div className="flex justify-between text-lg font-bold text-slate-800">
                    <span>Total Fee:</span>
                    <span data-testid="system-calculates-the-total" className="text-blue-600">
                      ${calculateTotal().toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              data-testid="system-calculates-the-calculate"
              disabled={!selectedMembership}
              className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all ${
                selectedMembership
                  ? 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800'
                  : 'bg-slate-300 text-slate-500 cursor-not-allowed'
              }`}
            >
              Proceed to Payment
            </button>
            <button
              data-testid="system-calculates-the-reset"
              onClick={() => {
                setSelectedMembership('')
                setSelectedDuration(1)
              }}
              className="px-6 py-3 rounded-lg font-semibold border-2 border-slate-300 text-slate-700 hover:bg-slate-50 transition-all"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Pricing Information */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">
            All Membership Plans
          </h2>
          <div data-testid="system-calculates-the-plans-list" className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {MEMBERSHIP_TYPES.map((membership) => (
              <div
                key={membership.id}
                data-testid="system-calculates-the-plan-item"
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedMembership === membership.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <h3 className="font-semibold text-slate-800 mb-1">
                  {membership.name}
                </h3>
                <p className="text-sm text-slate-600 mb-2">
                  {membership.description}
                </p>
                <p className="text-lg font-bold text-blue-600">
                  ${membership.monthlyRate.toFixed(2)}/mo
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
