/**
 * TotalClaimsSubmitted — Displays and calculates total claims submitted by a policyholder
 *
 * Features: policyholder selection, claims history display, total calculation, claim status tracking, date filtering
 *
 * Ticket: SCRUM-969 | Branch: proto/SCRUM-963
 */

import { useState } from 'react'

interface Claim {
  id: string
  claimNumber: string
  policyholderName: string
  policyNumber: string
  claimDate: string
  claimType: string
  claimAmount: number
  status: 'submitted' | 'approved' | 'rejected' | 'pending'
  description: string
}

const MOCK_CLAIMS: Claim[] = [
  {
    id: '1',
    claimNumber: 'CLM-2024-001',
    policyholderName: 'John Smith',
    policyNumber: 'POL-12345',
    claimDate: '2024-01-15',
    claimType: 'Collision',
    claimAmount: 4500.00,
    status: 'approved',
    description: 'Front-end collision damage'
  },
  {
    id: '2',
    claimNumber: 'CLM-2024-002',
    policyholderName: 'John Smith',
    policyNumber: 'POL-12345',
    claimDate: '2024-03-22',
    claimType: 'Theft',
    claimAmount: 12000.00,
    status: 'approved',
    description: 'Vehicle stolen from parking lot'
  },
  {
    id: '3',
    claimNumber: 'CLM-2024-003',
    policyholderName: 'Sarah Johnson',
    policyNumber: 'POL-67890',
    claimDate: '2024-02-10',
    claimType: 'Windshield',
    claimAmount: 350.00,
    status: 'approved',
    description: 'Windshield crack repair'
  },
  {
    id: '4',
    claimNumber: 'CLM-2024-004',
    policyholderName: 'Sarah Johnson',
    policyNumber: 'POL-67890',
    claimDate: '2024-04-05',
    claimType: 'Collision',
    claimAmount: 8200.00,
    status: 'pending',
    description: 'Side impact collision'
  },
  {
    id: '5',
    claimNumber: 'CLM-2024-005',
    policyholderName: 'Michael Brown',
    policyNumber: 'POL-11223',
    claimDate: '2024-01-28',
    claimType: 'Comprehensive',
    claimAmount: 2800.00,
    status: 'approved',
    description: 'Hail damage to vehicle'
  },
  {
    id: '6',
    claimNumber: 'CLM-2024-006',
    policyholderName: 'Michael Brown',
    policyNumber: 'POL-11223',
    claimDate: '2024-05-12',
    claimType: 'Collision',
    claimAmount: 5600.00,
    status: 'submitted',
    description: 'Rear-end collision'
  },
  {
    id: '7',
    claimNumber: 'CLM-2024-007',
    policyholderName: 'Emily Davis',
    policyNumber: 'POL-44556',
    claimDate: '2024-03-15',
    claimType: 'Vandalism',
    claimAmount: 1500.00,
    status: 'rejected',
    description: 'Paint damage'
  },
  {
    id: '8',
    claimNumber: 'CLM-2024-008',
    policyholderName: 'Emily Davis',
    policyNumber: 'POL-44556',
    claimDate: '2024-06-01',
    claimType: 'Collision',
    claimAmount: 9500.00,
    status: 'submitted',
    description: 'Multiple vehicle collision'
  },
  {
    id: '9',
    claimNumber: 'CLM-2024-009',
    policyholderName: 'Robert Wilson',
    policyNumber: 'POL-78901',
    claimDate: '2024-02-20',
    claimType: 'Theft',
    claimAmount: 15000.00,
    status: 'approved',
    description: 'Vehicle parts stolen'
  },
  {
    id: '10',
    claimNumber: 'CLM-2024-010',
    policyholderName: 'Robert Wilson',
    policyNumber: 'POL-78901',
    claimDate: '2024-04-18',
    claimType: 'Fire',
    claimAmount: 22000.00,
    status: 'pending',
    description: 'Engine fire damage'
  }
]

export default function TotalClaimsSubmitted() {
  const [selectedPolicyholder, setSelectedPolicyholder] = useState<string>('all')
  const [filterStatus, setFilterStatus] = useState<string>('all')

  // Get unique policyholders
  const policyholders = Array.from(new Set(MOCK_CLAIMS.map(c => c.policyholderName)))

  // Filter claims based on selected policyholder and status
  const filteredClaims = MOCK_CLAIMS.filter(claim => {
    const matchesPolicyholder = selectedPolicyholder === 'all' || claim.policyholderName === selectedPolicyholder
    const matchesStatus = filterStatus === 'all' || claim.status === filterStatus
    return matchesPolicyholder && matchesStatus
  })

  // Calculate totals
  const totalClaims = filteredClaims.length
  const totalAmount = filteredClaims.reduce((sum, claim) => sum + claim.claimAmount, 0)
  const approvedClaims = filteredClaims.filter(c => c.status === 'approved').length
  const pendingClaims = filteredClaims.filter(c => c.status === 'pending').length
  const rejectedClaims = filteredClaims.filter(c => c.status === 'rejected').length
  const submittedClaims = filteredClaims.filter(c => c.status === 'submitted').length

  // Calculate policyholder-specific stats when a specific policyholder is selected
  const policyholderStats = selectedPolicyholder !== 'all' ? {
    totalSubmitted: MOCK_CLAIMS.filter(c => c.policyholderName === selectedPolicyholder).length,
    totalValue: MOCK_CLAIMS.filter(c => c.policyholderName === selectedPolicyholder).reduce((sum, c) => sum + c.claimAmount, 0)
  } : null

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800'
      case 'rejected': return 'bg-red-100 text-red-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'submitted': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <section data-testid="total-claims-submitted" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Total Claims Submitted</h1>
          <p className="text-gray-600">Calculate and view total claims submitted by policyholders</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Filters</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="policyholder-select" className="block text-sm font-medium text-gray-700 mb-2">
                Select Policyholder
              </label>
              <select
                id="policyholder-select"
                data-testid="total-claims-submitted-policyholder"
                value={selectedPolicyholder}
                onChange={(e) => setSelectedPolicyholder(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Policyholders</option>
                {policyholders.map(name => (
                  <option key={name} value={name}>{name}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="status-select" className="block text-sm font-medium text-gray-700 mb-2">
                Claim Status
              </label>
              <select
                id="status-select"
                data-testid="total-claims-submitted-status"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Statuses</option>
                <option value="submitted">Submitted</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>

        {/* Summary Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-sm font-medium text-gray-600 mb-1">Total Claims</h3>
            <p className="text-3xl font-bold text-blue-600">{totalClaims}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-sm font-medium text-gray-600 mb-1">Total Amount</h3>
            <p className="text-3xl font-bold text-green-600">${totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-sm font-medium text-gray-600 mb-1">Approved</h3>
            <p className="text-3xl font-bold text-green-600">{approvedClaims}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-sm font-medium text-gray-600 mb-1">Pending/Submitted</h3>
            <p className="text-3xl font-bold text-yellow-600">{pendingClaims + submittedClaims}</p>
          </div>
        </div>

        {/* Policyholder-specific stats */}
        {policyholderStats && (
          <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">
              {selectedPolicyholder} - Total Submission Summary
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-blue-700">Total Claims Submitted</p>
                <p className="text-2xl font-bold text-blue-900">{policyholderStats.totalSubmitted}</p>
              </div>
              <div>
                <p className="text-sm text-blue-700">Total Value of Claims</p>
                <p className="text-2xl font-bold text-blue-900">
                  ${policyholderStats.totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Claims List */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Claims List</h2>
            <button
              data-testid="total-claims-submitted-reset"
              onClick={() => {
                setSelectedPolicyholder('all')
                setFilterStatus('all')
              }}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
            >
              Reset Filters
            </button>
          </div>
          
          {filteredClaims.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No claims found matching the selected filters</p>
            </div>
          ) : (
            <div data-testid="total-claims-submitted-list" className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Claim #
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Policyholder
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredClaims.map((claim) => (
                    <tr key={claim.id} data-testid="total-claims-submitted-item" className="hover:bg-gray-50">
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                        {claim.claimNumber}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div>
                          <div className="font-medium">{claim.policyholderName}</div>
                          <div className="text-gray-500">{claim.policyNumber}</div>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(claim.claimDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                        {claim.claimType}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                        ${claim.claimAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(claim.status)}`}>
                          {claim.status.charAt(0).toUpperCase() + claim.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
