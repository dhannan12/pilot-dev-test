/**
 * ClaimsMust — High-value claims manager approval workflow interface
 *
 * Features: pending approvals list, claim details, manager actions, status tracking, value threshold display
 *
 * Ticket: SCRUM-869 | Branch: proto/SCRUM-869
 */

import { useState } from 'react'

interface Claim {
  id: string
  claimNumber: string
  adjusterName: string
  policyHolder: string
  claimAmount: number
  dateSubmitted: string
  claimType: string
  status: 'pending' | 'approved' | 'rejected'
  description: string
}

const MOCK_CLAIMS: Claim[] = [
  {
    id: 'CLM-001',
    claimNumber: 'CLM-2026-001234',
    adjusterName: 'Sarah Johnson',
    policyHolder: 'John Smith',
    claimAmount: 125000,
    dateSubmitted: '2026-08-10',
    claimType: 'Property Damage',
    status: 'pending',
    description: 'Major structural damage from storm. Roof and foundation repairs required.',
  },
  {
    id: 'CLM-002',
    claimNumber: 'CLM-2026-001567',
    adjusterName: 'Michael Chen',
    policyHolder: 'Emily Davis',
    claimAmount: 87500,
    dateSubmitted: '2026-08-12',
    claimType: 'Auto Collision',
    status: 'pending',
    description: 'Total loss vehicle, high-value luxury sedan with additional medical claims.',
  },
  {
    id: 'CLM-003',
    claimNumber: 'CLM-2026-001789',
    adjusterName: 'David Rodriguez',
    policyHolder: 'Robert Wilson',
    claimAmount: 250000,
    dateSubmitted: '2026-08-13',
    claimType: 'Medical Liability',
    status: 'pending',
    description: 'Complex medical liability claim involving surgical complications and long-term care.',
  },
  {
    id: 'CLM-004',
    claimNumber: 'CLM-2026-001890',
    adjusterName: 'Jennifer Martinez',
    policyHolder: 'Amanda Taylor',
    claimAmount: 95000,
    dateSubmitted: '2026-08-14',
    claimType: 'Business Interruption',
    status: 'pending',
    description: 'Business interruption due to fire damage. Loss of revenue and equipment replacement.',
  },
  {
    id: 'CLM-005',
    claimNumber: 'CLM-2026-002001',
    adjusterName: 'Thomas Anderson',
    policyHolder: 'Global Industries Inc.',
    claimAmount: 500000,
    dateSubmitted: '2026-08-15',
    claimType: 'Commercial Property',
    status: 'pending',
    description: 'Large warehouse fire with significant inventory loss and building damage.',
  },
]

const HIGH_VALUE_THRESHOLD = 75000

export default function ClaimsMust() {
  const [claims, setClaims] = useState<Claim[]>(MOCK_CLAIMS)
  const [selectedClaim, setSelectedClaim] = useState<Claim | null>(null)
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all')

  const handleApprove = (claimId: string) => {
    setClaims(claims.map(claim => 
      claim.id === claimId ? { ...claim, status: 'approved' as const } : claim
    ))
    setSelectedClaim(null)
  }

  const handleReject = (claimId: string) => {
    setClaims(claims.map(claim => 
      claim.id === claimId ? { ...claim, status: 'rejected' as const } : claim
    ))
    setSelectedClaim(null)
  }

  const filteredClaims = claims.filter(claim => 
    filter === 'all' ? true : claim.status === filter
  )

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'approved':
        return 'bg-green-100 text-green-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const pendingCount = claims.filter(c => c.status === 'pending').length

  return (
    <div data-testid="claims-must" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            High-Value Claims Approval
          </h1>
          <p className="text-gray-600">
            Claims exceeding {formatCurrency(HIGH_VALUE_THRESHOLD)} require manager approval before finalization
          </p>
          <div className="mt-4 flex items-center gap-2">
            <span className="text-sm text-gray-500">Pending Approvals:</span>
            <span data-testid="claims-must-pending-count" className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold">
              {pendingCount}
            </span>
          </div>
        </div>

        {/* Filter Tabs */}
        <div data-testid="claims-must-filters" className="mb-6 border-b border-gray-200">
          <div className="flex gap-4">
            {['all', 'pending', 'approved', 'rejected'].map((status) => (
              <button
                key={status}
                data-testid={`claims-must-filter-${status}`}
                onClick={() => setFilter(status as typeof filter)}
                className={`pb-4 px-2 text-sm font-medium border-b-2 transition-colors ${
                  filter === status
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
                {status !== 'all' && (
                  <span className="ml-2 text-xs">
                    ({claims.filter(c => c.status === status).length})
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Claims Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Claims List */}
          <div data-testid="claims-must-list" className="space-y-4">
            {filteredClaims.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                <p className="text-gray-500">No claims found</p>
              </div>
            ) : (
              filteredClaims.map((claim) => (
                <div
                  key={claim.id}
                  data-testid="claims-must-item"
                  onClick={() => setSelectedClaim(claim)}
                  className={`bg-white rounded-lg border p-4 cursor-pointer transition-all hover:shadow-md ${
                    selectedClaim?.id === claim.id
                      ? 'border-blue-500 shadow-md'
                      : 'border-gray-200'
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {claim.claimNumber}
                      </h3>
                      <p className="text-sm text-gray-600">{claim.policyHolder}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(claim.status)}`}>
                      {claim.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm mb-3">
                    <div>
                      <span className="text-gray-500">Amount:</span>
                      <span className="ml-2 font-semibold text-gray-900">
                        {formatCurrency(claim.claimAmount)}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">Type:</span>
                      <span className="ml-2 text-gray-900">{claim.claimType}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Adjuster:</span>
                      <span className="ml-2 text-gray-900">{claim.adjusterName}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Date:</span>
                      <span className="ml-2 text-gray-900">{formatDate(claim.dateSubmitted)}</span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 line-clamp-2">
                    {claim.description}
                  </p>
                </div>
              ))
            )}
          </div>

          {/* Claim Details Panel */}
          <div className="lg:sticky lg:top-6 h-fit">
            {selectedClaim ? (
              <div data-testid="claims-must-detail" className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Claim Details</h2>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Claim Number</label>
                    <p className="text-gray-900">{selectedClaim.claimNumber}</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-500">Policy Holder</label>
                    <p className="text-gray-900">{selectedClaim.policyHolder}</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-500">Claim Amount</label>
                    <p className="text-2xl font-bold text-gray-900">
                      {formatCurrency(selectedClaim.claimAmount)}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-500">Claim Type</label>
                    <p className="text-gray-900">{selectedClaim.claimType}</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-500">Claims Adjuster</label>
                    <p className="text-gray-900">{selectedClaim.adjusterName}</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-500">Date Submitted</label>
                    <p className="text-gray-900">{formatDate(selectedClaim.dateSubmitted)}</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-500">Status</label>
                    <span className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedClaim.status)}`}>
                      {selectedClaim.status}
                    </span>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-500">Description</label>
                    <p className="text-gray-900 mt-1">{selectedClaim.description}</p>
                  </div>
                </div>

                {selectedClaim.status === 'pending' && (
                  <div className="flex gap-3 pt-4 border-t border-gray-200">
                    <button
                      data-testid="claims-must-approve"
                      onClick={() => handleApprove(selectedClaim.id)}
                      className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
                    >
                      Approve Claim
                    </button>
                    <button
                      data-testid="claims-must-reject"
                      onClick={() => handleReject(selectedClaim.id)}
                      className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors"
                    >
                      Reject Claim
                    </button>
                  </div>
                )}

                {selectedClaim.status !== 'pending' && (
                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-600 text-center">
                      This claim has been {selectedClaim.status}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400 mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <p className="text-gray-500">Select a claim to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
