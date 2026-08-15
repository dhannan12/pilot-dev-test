/**
 * TotalClaimValue — Calculates and displays the sum of all individual claim amounts
 *
 * Features: claim amount list, automatic sum calculation, currency formatting, breakdown view, visual total display
 *
 * Ticket: SCRUM-873 | Branch: proto/SCRUM-868
 */

import { useState } from 'react'

interface Claim {
  id: string
  claimNumber: string
  claimant: string
  amount: number
  status: 'Approved' | 'Pending' | 'Rejected'
  category: string
  date: string
}

const MOCK_CLAIMS: Claim[] = [
  {
    id: '1',
    claimNumber: 'CLM-2024-001',
    claimant: 'John Smith',
    amount: 15750.00,
    status: 'Approved',
    category: 'Medical',
    date: '2024-01-15',
  },
  {
    id: '2',
    claimNumber: 'CLM-2024-002',
    claimant: 'Sarah Johnson',
    amount: 28500.50,
    status: 'Approved',
    category: 'Property Damage',
    date: '2024-02-10',
  },
  {
    id: '3',
    claimNumber: 'CLM-2024-003',
    claimant: 'Michael Brown',
    amount: 5200.75,
    status: 'Pending',
    category: 'Auto',
    date: '2024-03-05',
  },
  {
    id: '4',
    claimNumber: 'CLM-2024-004',
    claimant: 'Emily Davis',
    amount: 42000.00,
    status: 'Approved',
    category: 'Liability',
    date: '2024-03-20',
  },
  {
    id: '5',
    claimNumber: 'CLM-2024-005',
    claimant: 'Robert Wilson',
    amount: 12350.25,
    status: 'Approved',
    category: 'Medical',
    date: '2024-04-12',
  },
  {
    id: '6',
    claimNumber: 'CLM-2024-006',
    claimant: 'Jennifer Martinez',
    amount: 8900.00,
    status: 'Rejected',
    category: 'Auto',
    date: '2024-04-18',
  },
  {
    id: '7',
    claimNumber: 'CLM-2024-007',
    claimant: 'David Lee',
    amount: 19475.50,
    status: 'Approved',
    category: 'Property Damage',
    date: '2024-05-02',
  },
]

export default function TotalClaimValue() {
  const [selectedStatus, setSelectedStatus] = useState<'All' | 'Approved' | 'Pending' | 'Rejected'>('All')

  const filteredClaims = selectedStatus === 'All' 
    ? MOCK_CLAIMS 
    : MOCK_CLAIMS.filter(claim => claim.status === selectedStatus)

  const totalClaimValue = filteredClaims.reduce((sum, claim) => sum + claim.amount, 0)
  const claimCount = filteredClaims.length

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-800'
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'Rejected':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const statusOptions: Array<'All' | 'Approved' | 'Pending' | 'Rejected'> = ['All', 'Approved', 'Pending', 'Rejected']

  const categoryTotals = filteredClaims.reduce((acc, claim) => {
    acc[claim.category] = (acc[claim.category] || 0) + claim.amount
    return acc
  }, {} as Record<string, number>)

  return (
    <div data-testid="totalclaimvalue" className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Total Claim Value Dashboard</h1>

        {/* Status Filter */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Filter by Status</h2>
          <div className="flex flex-wrap gap-3">
            {statusOptions.map(status => (
              <button
                key={status}
                data-testid={`totalclaimvalue-filter-${status.toLowerCase()}`}
                onClick={() => setSelectedStatus(status)}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  selectedStatus === status
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Total Summary Card */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg shadow-lg p-8 mb-6">
          <div className="text-center">
            <h2 className="text-white text-opacity-90 text-lg font-medium mb-2">
              Total Claim Value {selectedStatus !== 'All' && `(${selectedStatus})`}
            </h2>
            <div data-testid="totalclaimvalue-total" className="text-5xl font-bold text-white mb-2">
              {formatCurrency(totalClaimValue)}
            </div>
            <div className="text-white text-opacity-80 text-sm">
              Based on {claimCount} claim{claimCount !== 1 ? 's' : ''}
            </div>
          </div>
        </div>

        {/* Category Breakdown */}
        {Object.keys(categoryTotals).length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Breakdown by Category</h2>
            <div data-testid="totalclaimvalue-category-list" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(categoryTotals).map(([category, amount]) => (
                <div
                  key={category}
                  data-testid="totalclaimvalue-category-item"
                  className="p-4 bg-gray-50 border border-gray-200 rounded-lg"
                >
                  <div className="text-sm font-medium text-gray-600 mb-1">{category}</div>
                  <div className="text-2xl font-bold text-gray-900">{formatCurrency(amount)}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {((amount / totalClaimValue) * 100).toFixed(1)}% of total
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Claims List */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Individual Claims</h2>
          
          {filteredClaims.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No claims found for the selected status filter.
            </div>
          ) : (
            <div data-testid="totalclaimvalue-list" className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Claim Number</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Claimant</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Category</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Date</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredClaims.map(claim => (
                    <tr
                      key={claim.id}
                      data-testid="totalclaimvalue-item"
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-4 px-4 text-sm font-medium text-gray-900">{claim.claimNumber}</td>
                      <td className="py-4 px-4 text-sm text-gray-700">{claim.claimant}</td>
                      <td className="py-4 px-4 text-sm text-gray-600">{claim.category}</td>
                      <td className="py-4 px-4 text-sm text-gray-600">{claim.date}</td>
                      <td className="py-4 px-4">
                        <span
                          className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                            claim.status
                          )}`}
                        >
                          {claim.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-sm font-bold text-gray-900 text-right">
                        {formatCurrency(claim.amount)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-50 border-t-2 border-gray-300">
                    <td colSpan={5} className="py-4 px-4 text-right font-semibold text-gray-900">
                      Total:
                    </td>
                    <td className="py-4 px-4 text-right font-bold text-xl text-blue-600">
                      {formatCurrency(totalClaimValue)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
