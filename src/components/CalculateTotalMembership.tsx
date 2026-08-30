/**
 * CalculateTotalMembership — Calculate total membership fees for the year
 *
 * Features: membership list, fee breakdown, annual total, filter by type, summary statistics
 *
 * Ticket: SCRUM-1269 | Branch: proto/SCRUM-1265
 */

import React, { useState } from 'react'

interface Membership {
  id: number
  memberName: string
  membershipType: 'Basic' | 'Premium' | 'Elite' | 'Family' | 'Student'
  monthlyFee: number
  joinedMonth: number
  status: 'Active' | 'Inactive'
}

const MOCK_MEMBERSHIPS: Membership[] = [
  { id: 1, memberName: 'John Smith', membershipType: 'Premium', monthlyFee: 75, joinedMonth: 1, status: 'Active' },
  { id: 2, memberName: 'Sarah Johnson', membershipType: 'Basic', monthlyFee: 45, joinedMonth: 1, status: 'Active' },
  { id: 3, memberName: 'Michael Chen', membershipType: 'Elite', monthlyFee: 120, joinedMonth: 3, status: 'Active' },
  { id: 4, memberName: 'Emily Davis', membershipType: 'Family', monthlyFee: 95, joinedMonth: 2, status: 'Active' },
  { id: 5, memberName: 'Robert Brown', membershipType: 'Student', monthlyFee: 30, joinedMonth: 1, status: 'Active' },
  { id: 6, memberName: 'Lisa Martinez', membershipType: 'Premium', monthlyFee: 75, joinedMonth: 4, status: 'Active' },
  { id: 7, memberName: 'David Wilson', membershipType: 'Basic', monthlyFee: 45, joinedMonth: 1, status: 'Inactive' },
  { id: 8, memberName: 'Jennifer Taylor', membershipType: 'Elite', monthlyFee: 120, joinedMonth: 1, status: 'Active' },
]

export default function CalculateTotalMembership() {
  const [filterType, setFilterType] = useState<string>('All')
  const [showInactive, setShowInactive] = useState<boolean>(false)

  const filteredMemberships = MOCK_MEMBERSHIPS.filter((m) => {
    if (!showInactive && m.status === 'Inactive') return false
    if (filterType === 'All') return true
    return m.membershipType === filterType
  })

  const calculateAnnualFee = (membership: Membership): number => {
    const monthsRemaining = 13 - membership.joinedMonth
    return membership.monthlyFee * monthsRemaining
  }

  const totalAnnualFees = filteredMemberships.reduce((sum, m) => sum + calculateAnnualFee(m), 0)
  const totalMonthlyFees = filteredMemberships.reduce((sum, m) => sum + m.monthlyFee, 0)
  const activeMembersCount = filteredMemberships.filter((m) => m.status === 'Active').length

  const membershipTypes = ['All', 'Basic', 'Premium', 'Elite', 'Family', 'Student']

  return (
    <div data-testid="calculatetotalmembership" className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-6 text-3xl font-bold text-gray-900">Annual Membership Fees Calculator</h1>

        {/* Filters Section */}
        <div className="mb-6 rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-lg font-semibold text-gray-700">Filters</h2>
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <label htmlFor="membershipTypeFilter" className="mb-2 block text-sm font-medium text-gray-700">
                Membership Type
              </label>
              <select
                id="membershipTypeFilter"
                data-testid="calculatetotalmembership-type-filter"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                {membershipTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  data-testid="calculatetotalmembership-show-inactive"
                  checked={showInactive}
                  onChange={(e) => setShowInactive(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">Show Inactive Members</span>
              </label>
            </div>
          </div>
        </div>

        {/* Summary Statistics */}
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-lg bg-blue-50 p-4 shadow">
            <p className="text-sm font-medium text-blue-600">Total Annual Fees</p>
            <p data-testid="calculatetotalmembership-total-annual" className="mt-2 text-3xl font-bold text-blue-900">
              ${totalAnnualFees.toFixed(2)}
            </p>
          </div>
          <div className="rounded-lg bg-green-50 p-4 shadow">
            <p className="text-sm font-medium text-green-600">Monthly Revenue</p>
            <p data-testid="calculatetotalmembership-total-monthly" className="mt-2 text-3xl font-bold text-green-900">
              ${totalMonthlyFees.toFixed(2)}
            </p>
          </div>
          <div className="rounded-lg bg-purple-50 p-4 shadow">
            <p className="text-sm font-medium text-purple-600">Active Members</p>
            <p data-testid="calculatetotalmembership-active-count" className="mt-2 text-3xl font-bold text-purple-900">
              {activeMembersCount}
            </p>
          </div>
        </div>

        {/* Memberships List */}
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-lg font-semibold text-gray-700">
            Membership Details ({filteredMemberships.length} members)
          </h2>
          <div data-testid="calculatetotalmembership-list" className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Member Name</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Type</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Monthly Fee</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Joined (Month)</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Months Remaining</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Annual Total</th>
                </tr>
              </thead>
              <tbody>
                {filteredMemberships.map((membership) => {
                  const monthsRemaining = 13 - membership.joinedMonth
                  const annualFee = calculateAnnualFee(membership)
                  return (
                    <tr
                      key={membership.id}
                      data-testid="calculatetotalmembership-item"
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="px-4 py-3 text-sm text-gray-900">{membership.memberName}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        <span className="inline-flex rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-800">
                          {membership.membershipType}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        <span
                          className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                            membership.status === 'Active'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {membership.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right text-sm text-gray-900">${membership.monthlyFee.toFixed(2)}</td>
                      <td className="px-4 py-3 text-right text-sm text-gray-700">{membership.joinedMonth}</td>
                      <td className="px-4 py-3 text-right text-sm text-gray-700">{monthsRemaining}</td>
                      <td className="px-4 py-3 text-right text-sm font-semibold text-gray-900">
                        ${annualFee.toFixed(2)}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-gray-300 bg-gray-50">
                  <td colSpan={6} className="px-4 py-3 text-right text-sm font-bold text-gray-900">
                    Grand Total:
                  </td>
                  <td className="px-4 py-3 text-right text-lg font-bold text-blue-600">
                    ${totalAnnualFees.toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Calculation Info */}
        <div className="mt-6 rounded-lg bg-blue-50 p-4">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> Annual fees are calculated based on the month each member joined. The calculation
            assumes members pay for the remaining months of the year (Month 1 = 12 months, Month 2 = 11 months, etc.).
          </p>
        </div>
      </div>
    </div>
  )
}
