/**
 * ClaimOver — Motor vehicle insurance claims over £10,000 requiring manager approval
 *
 * Features: Claim submission form, manager approval workflow, claim amount validation, approval status tracking, claim history display
 *
 * Ticket: SCRUM-965 | Branch: proto/SCRUM-963
 */

import { useState } from 'react'

interface Claim {
  id: string
  claimantName: string
  vehicleReg: string
  amount: number
  description: string
  submittedDate: string
  status: 'pending' | 'approved' | 'rejected'
  managerNotes?: string
}

const mockClaims: Claim[] = [
  {
    id: 'CLM-2024-001',
    claimantName: 'Sarah Johnson',
    vehicleReg: 'AB12 CDE',
    amount: 15750.00,
    description: 'Extensive bodywork damage from collision with commercial vehicle. Requires replacement of front bumper, bonnet, and left wing mirror.',
    submittedDate: '2024-01-15',
    status: 'approved',
    managerNotes: 'Approved - All documentation provided and estimate verified with approved garage.'
  },
  {
    id: 'CLM-2024-002',
    claimantName: 'Michael Chen',
    vehicleReg: 'FG34 HIJ',
    amount: 22500.00,
    description: 'Multi-vehicle accident resulting in structural damage to chassis and engine compartment. Full mechanical assessment required.',
    submittedDate: '2024-01-18',
    status: 'pending',
    managerNotes: undefined
  },
  {
    id: 'CLM-2024-003',
    claimantName: 'Emma Williams',
    vehicleReg: 'KL56 MNO',
    amount: 12300.00,
    description: 'Damage from fallen tree during storm. Roof panel crushed, windscreen shattered, and interior water damage.',
    submittedDate: '2024-01-20',
    status: 'approved',
    managerNotes: 'Approved - Weather incident confirmed by police report. Proceed with repairs.'
  },
  {
    id: 'CLM-2024-004',
    claimantName: 'David Thompson',
    vehicleReg: 'PQ78 RST',
    amount: 18900.00,
    description: 'Hit and run incident. Rear-end collision causing boot damage, rear light cluster replacement, and bumper replacement.',
    submittedDate: '2024-01-22',
    status: 'rejected',
    managerNotes: 'Rejected - Insufficient evidence provided. CCTV footage required before reconsideration.'
  },
  {
    id: 'CLM-2024-005',
    claimantName: 'Jessica Martinez',
    vehicleReg: 'UV90 WXY',
    amount: 31200.00,
    description: 'Total loss claim following motorway pile-up. Vehicle deemed uneconomical to repair. Requires full vehicle replacement payout.',
    submittedDate: '2024-01-25',
    status: 'pending',
    managerNotes: undefined
  },
  {
    id: 'CLM-2024-006',
    claimantName: 'Robert Anderson',
    vehicleReg: 'ZA12 BCD',
    amount: 14750.00,
    description: 'Fire damage to engine bay and front section. Electrical system compromised. Comprehensive mechanical inspection needed.',
    submittedDate: '2024-01-28',
    status: 'pending',
    managerNotes: undefined
  }
]

export default function ClaimOver() {
  const [claims, setClaims] = useState<Claim[]>(mockClaims)
  const [showNewClaimForm, setShowNewClaimForm] = useState(false)
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all')
  
  const [newClaim, setNewClaim] = useState({
    claimantName: '',
    vehicleReg: '',
    amount: '',
    description: ''
  })

  const handleSubmitClaim = (e: React.FormEvent) => {
    e.preventDefault()
    
    const claimAmount = parseFloat(newClaim.amount)
    
    if (claimAmount > 10000) {
      const claim: Claim = {
        id: `CLM-2024-${String(claims.length + 1).padStart(3, '0')}`,
        claimantName: newClaim.claimantName,
        vehicleReg: newClaim.vehicleReg,
        amount: claimAmount,
        description: newClaim.description,
        submittedDate: new Date().toISOString().split('T')[0],
        status: 'pending'
      }
      
      setClaims([claim, ...claims])
      setNewClaim({ claimantName: '', vehicleReg: '', amount: '', description: '' })
      setShowNewClaimForm(false)
    }
  }

  const handleApprove = (claimId: string) => {
    setClaims(claims.map(claim => 
      claim.id === claimId 
        ? { ...claim, status: 'approved' as const, managerNotes: 'Approved by manager' }
        : claim
    ))
  }

  const handleReject = (claimId: string) => {
    setClaims(claims.map(claim => 
      claim.id === claimId 
        ? { ...claim, status: 'rejected' as const, managerNotes: 'Rejected - requires additional documentation' }
        : claim
    ))
  }

  const filteredClaims = filterStatus === 'all' 
    ? claims 
    : claims.filter(claim => claim.status === filterStatus)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP'
    }).format(amount)
  }

  return (
    <div data-testid="claimover" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            High-Value Claims Management
          </h1>
          <p className="text-gray-600">
            Claims over £10,000 require manager approval before processing
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mb-6 flex gap-4">
          <button
            data-testid="claimover-new-claim"
            onClick={() => setShowNewClaimForm(!showNewClaimForm)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {showNewClaimForm ? 'Cancel' : 'Submit New Claim'}
          </button>
        </div>

        {/* New Claim Form */}
        {showNewClaimForm && (
          <div data-testid="claimover-form" className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Submit New Claim (Over £10,000)</h2>
            <form onSubmit={handleSubmitClaim}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Claimant Name
                  </label>
                  <input
                    data-testid="claimover-claimant-name"
                    type="text"
                    value={newClaim.claimantName}
                    onChange={(e) => setNewClaim({ ...newClaim, claimantName: e.target.value })}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Vehicle Registration
                  </label>
                  <input
                    data-testid="claimover-vehicle-reg"
                    type="text"
                    value={newClaim.vehicleReg}
                    onChange={(e) => setNewClaim({ ...newClaim, vehicleReg: e.target.value })}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Claim Amount (£)
                </label>
                <input
                  data-testid="claimover-amount"
                  type="number"
                  step="0.01"
                  min="10000.01"
                  value={newClaim.amount}
                  onChange={(e) => setNewClaim({ ...newClaim, amount: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Minimum amount: £10,000.01 (requires manager approval)
                </p>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Claim Description
                </label>
                <textarea
                  data-testid="claimover-description"
                  value={newClaim.description}
                  onChange={(e) => setNewClaim({ ...newClaim, description: e.target.value })}
                  required
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <button
                data-testid="claimover-submit"
                type="submit"
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Submit for Approval
              </button>
            </form>
          </div>
        )}

        {/* Filter Buttons */}
        <div className="mb-6 flex gap-2">
          <button
            data-testid="claimover-filter-all"
            onClick={() => setFilterStatus('all')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filterStatus === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            All Claims
          </button>
          <button
            data-testid="claimover-filter-pending"
            onClick={() => setFilterStatus('pending')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filterStatus === 'pending'
                ? 'bg-yellow-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Pending
          </button>
          <button
            data-testid="claimover-filter-approved"
            onClick={() => setFilterStatus('approved')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filterStatus === 'approved'
                ? 'bg-green-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Approved
          </button>
          <button
            data-testid="claimover-filter-rejected"
            onClick={() => setFilterStatus('rejected')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filterStatus === 'rejected'
                ? 'bg-red-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Rejected
          </button>
        </div>

        {/* Claims List */}
        <div data-testid="claimover-list" className="space-y-4">
          {filteredClaims.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center text-gray-500">
              No claims found for the selected filter
            </div>
          ) : (
            filteredClaims.map((claim) => (
              <div
                key={claim.id}
                data-testid="claimover-item"
                className="bg-white rounded-lg shadow-md p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{claim.id}</h3>
                    <p className="text-sm text-gray-600">{claim.claimantName}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        claim.status === 'approved'
                          ? 'bg-green-100 text-green-800'
                          : claim.status === 'rejected'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {claim.status.charAt(0).toUpperCase() + claim.status.slice(1)}
                    </span>
                    <span className="text-xl font-bold text-gray-900">
                      {formatCurrency(claim.amount)}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Vehicle Registration</p>
                    <p className="text-sm font-medium text-gray-900">{claim.vehicleReg}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Submitted Date</p>
                    <p className="text-sm font-medium text-gray-900">{claim.submittedDate}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-500 mb-1">Claim Description</p>
                  <p className="text-sm text-gray-700">{claim.description}</p>
                </div>

                {claim.managerNotes && (
                  <div className="mb-4 p-3 bg-gray-50 rounded-md">
                    <p className="text-sm text-gray-500 mb-1">Manager Notes</p>
                    <p className="text-sm text-gray-700">{claim.managerNotes}</p>
                  </div>
                )}

                {claim.status === 'pending' && (
                  <div className="flex gap-3 pt-4 border-t border-gray-200">
                    <button
                      data-testid="claimover-approve"
                      onClick={() => handleApprove(claim.id)}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Approve Claim
                    </button>
                    <button
                      data-testid="claimover-reject"
                      onClick={() => handleReject(claim.id)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Reject Claim
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
