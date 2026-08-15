/**
 * ClaimsMustBe — Claims management interface showing claims marked as open, closed, or pending
 *
 * Features: status badges, claim list, filter by status, claim details display, visual status indicators
 *
 * Ticket: SCRUM-876 | Branch: proto/SCRUM-868
 */

import { useState } from 'react'

type ClaimStatus = 'open' | 'closed' | 'pending'

interface Claim {
  id: string
  claimNumber: string
  claimant: string
  description: string
  amount: number
  dateSubmitted: string
  status: ClaimStatus
}

const MOCK_CLAIMS: Claim[] = [
  {
    id: '1',
    claimNumber: 'CLM-2024-001',
    claimant: 'John Smith',
    description: 'Vehicle damage from accident on Highway 101',
    amount: 4500.00,
    dateSubmitted: '2024-01-15',
    status: 'open'
  },
  {
    id: '2',
    claimNumber: 'CLM-2024-002',
    claimant: 'Sarah Johnson',
    description: 'Water damage to property from burst pipe',
    amount: 12800.00,
    dateSubmitted: '2024-01-10',
    status: 'closed'
  },
  {
    id: '3',
    claimNumber: 'CLM-2024-003',
    claimant: 'Michael Brown',
    description: 'Medical expenses from workplace injury',
    amount: 8750.00,
    dateSubmitted: '2024-01-20',
    status: 'pending'
  },
  {
    id: '4',
    claimNumber: 'CLM-2024-004',
    claimant: 'Emily Davis',
    description: 'Theft of personal belongings from vehicle',
    amount: 2300.00,
    dateSubmitted: '2024-01-18',
    status: 'open'
  },
  {
    id: '5',
    claimNumber: 'CLM-2024-005',
    claimant: 'Robert Wilson',
    description: 'Fire damage to residential property',
    amount: 45000.00,
    dateSubmitted: '2024-01-05',
    status: 'pending'
  },
  {
    id: '6',
    claimNumber: 'CLM-2024-006',
    claimant: 'Jennifer Martinez',
    description: 'Windstorm damage to roof and windows',
    amount: 15600.00,
    dateSubmitted: '2024-01-08',
    status: 'closed'
  },
  {
    id: '7',
    claimNumber: 'CLM-2024-007',
    claimant: 'David Anderson',
    description: 'Liability claim from slip and fall incident',
    amount: 9200.00,
    dateSubmitted: '2024-01-22',
    status: 'open'
  },
  {
    id: '8',
    claimNumber: 'CLM-2024-008',
    claimant: 'Lisa Thompson',
    description: 'Equipment damage during construction work',
    amount: 6700.00,
    dateSubmitted: '2024-01-12',
    status: 'pending'
  }
]

export default function ClaimsMustBe() {
  const [filterStatus, setFilterStatus] = useState<ClaimStatus | 'all'>('all')

  const filteredClaims = filterStatus === 'all' 
    ? MOCK_CLAIMS 
    : MOCK_CLAIMS.filter(claim => claim.status === filterStatus)

  const getStatusColor = (status: ClaimStatus): string => {
    switch (status) {
      case 'open':
        return 'bg-blue-100 text-blue-800 border-blue-300'
      case 'closed':
        return 'bg-gray-100 text-gray-800 border-gray-300'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  const getStatusIcon = (status: ClaimStatus): string => {
    switch (status) {
      case 'open':
        return '●'
      case 'closed':
        return '✓'
      case 'pending':
        return '⏱'
      default:
        return '○'
    }
  }

  const statusCounts = {
    open: MOCK_CLAIMS.filter(c => c.status === 'open').length,
    closed: MOCK_CLAIMS.filter(c => c.status === 'closed').length,
    pending: MOCK_CLAIMS.filter(c => c.status === 'pending').length
  }

  return (
    <div data-testid="claimsmustbe" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Claims Management</h1>
          <p className="text-gray-600">View and manage insurance claims by status</p>
        </div>

        {/* Status Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Open Claims</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{statusCounts.open}</p>
              </div>
              <div className="text-4xl text-blue-500">●</div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Pending Claims</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{statusCounts.pending}</p>
              </div>
              <div className="text-4xl text-yellow-500">⏱</div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-gray-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Closed Claims</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{statusCounts.closed}</p>
              </div>
              <div className="text-4xl text-gray-500">✓</div>
            </div>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex flex-wrap gap-3 items-center">
            <span className="text-sm font-medium text-gray-700">Filter by status:</span>
            <button
              data-testid="claimsmustbe-filter-all"
              onClick={() => setFilterStatus('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filterStatus === 'all'
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Claims ({MOCK_CLAIMS.length})
            </button>
            <button
              data-testid="claimsmustbe-filter-open"
              onClick={() => setFilterStatus('open')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filterStatus === 'open'
                  ? 'bg-blue-600 text-white'
                  : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
              }`}
            >
              Open ({statusCounts.open})
            </button>
            <button
              data-testid="claimsmustbe-filter-pending"
              onClick={() => setFilterStatus('pending')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filterStatus === 'pending'
                  ? 'bg-yellow-600 text-white'
                  : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
              }`}
            >
              Pending ({statusCounts.pending})
            </button>
            <button
              data-testid="claimsmustbe-filter-closed"
              onClick={() => setFilterStatus('closed')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filterStatus === 'closed'
                  ? 'bg-gray-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Closed ({statusCounts.closed})
            </button>
          </div>
        </div>

        {/* Claims List */}
        <div data-testid="claimsmustbe-list" className="space-y-4">
          {filteredClaims.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <p className="text-gray-500 text-lg">No claims found for the selected filter</p>
            </div>
          ) : (
            filteredClaims.map(claim => (
              <div
                key={claim.id}
                data-testid="claimsmustbe-item"
                className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-6"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-2">
                      <span className="text-2xl mt-1">{getStatusIcon(claim.status)}</span>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{claim.claimNumber}</h3>
                        <p className="text-sm text-gray-600">Claimant: {claim.claimant}</p>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-3 ml-9">{claim.description}</p>
                    <div className="flex flex-wrap gap-4 ml-9 text-sm text-gray-600">
                      <span>
                        <span className="font-medium">Amount:</span> ${claim.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                      <span>
                        <span className="font-medium">Submitted:</span> {new Date(claim.dateSubmitted).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(claim.status)}`}
                    >
                      {claim.status.toUpperCase()}
                    </span>
                    <button
                      data-testid="claimsmustbe-view"
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline"
                    >
                      View Details →
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Results Summary */}
        {filteredClaims.length > 0 && (
          <div className="mt-6 text-center text-gray-600 text-sm">
            Showing {filteredClaims.length} of {MOCK_CLAIMS.length} claims
          </div>
        )}
      </div>
    </div>
  )
}
