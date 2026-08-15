/**
 * ClaimsExceedingA — Routes high-value claims over $10,000 to finance approvers
 *
 * Features: threshold filtering, finance routing, claim status tracking, approver assignment, amount validation
 *
 * Ticket: SCRUM-872 | Branch: proto/SCRUM-868
 */

import { useState } from 'react'

interface Claim {
  id: string
  claimNumber: string
  amount: number
  submittedBy: string
  submittedDate: string
  description: string
  status: 'pending' | 'routed' | 'approved' | 'rejected'
  assignedTo?: string
}

interface FinanceApprover {
  id: string
  name: string
  email: string
  department: string
}

const THRESHOLD = 10000

const mockClaims: Claim[] = [
  {
    id: '1',
    claimNumber: 'CLM-2024-1001',
    amount: 15750.00,
    submittedBy: 'John Smith',
    submittedDate: '2024-03-15',
    description: 'Equipment damage repair - Server room flood',
    status: 'pending',
  },
  {
    id: '2',
    claimNumber: 'CLM-2024-1002',
    amount: 25000.00,
    submittedBy: 'Sarah Johnson',
    submittedDate: '2024-03-14',
    description: 'Vehicle accident - Company fleet truck',
    status: 'routed',
    assignedTo: 'Michael Chen',
  },
  {
    id: '3',
    claimNumber: 'CLM-2024-1003',
    amount: 12500.50,
    submittedBy: 'David Williams',
    submittedDate: '2024-03-13',
    description: 'Property damage - Office renovation incident',
    status: 'pending',
  },
  {
    id: '4',
    claimNumber: 'CLM-2024-1004',
    amount: 50000.00,
    submittedBy: 'Emily Davis',
    submittedDate: '2024-03-12',
    description: 'Equipment theft - Construction site tools and machinery',
    status: 'approved',
    assignedTo: 'Jennifer Rodriguez',
  },
  {
    id: '5',
    claimNumber: 'CLM-2024-1005',
    amount: 18900.75,
    submittedBy: 'Robert Brown',
    submittedDate: '2024-03-11',
    description: 'Medical expense reimbursement - Emergency hospitalization',
    status: 'routed',
    assignedTo: 'David Martinez',
  },
  {
    id: '6',
    claimNumber: 'CLM-2024-1006',
    amount: 33250.00,
    submittedBy: 'Lisa Anderson',
    submittedDate: '2024-03-10',
    description: 'Legal settlement - Contract dispute resolution',
    status: 'pending',
  },
  {
    id: '7',
    claimNumber: 'CLM-2024-1007',
    amount: 11450.25,
    submittedBy: 'James Wilson',
    submittedDate: '2024-03-09',
    description: 'IT infrastructure failure - Data center outage',
    status: 'rejected',
    assignedTo: 'Michael Chen',
  },
]

const mockApprovers: FinanceApprover[] = [
  {
    id: '1',
    name: 'Michael Chen',
    email: 'mchen@company.com',
    department: 'Finance - Claims Division',
  },
  {
    id: '2',
    name: 'Jennifer Rodriguez',
    email: 'jrodriguez@company.com',
    department: 'Finance - Senior Approvals',
  },
  {
    id: '3',
    name: 'David Martinez',
    email: 'dmartinez@company.com',
    department: 'Finance - Executive Review',
  },
  {
    id: '4',
    name: 'Sarah Thompson',
    email: 'sthompson@company.com',
    department: 'Finance - Audit & Compliance',
  },
  {
    id: '5',
    name: 'Robert Lee',
    email: 'rlee@company.com',
    department: 'Finance - Risk Management',
  },
]

export default function ClaimsExceedingA() {
  const [claims, setClaims] = useState<Claim[]>(mockClaims)
  const [selectedClaim, setSelectedClaim] = useState<Claim | null>(null)
  const [selectedApprover, setSelectedApprover] = useState<string>('')

  const exceedingClaims = claims.filter(claim => claim.amount > THRESHOLD)

  const handleRouteClaim = () => {
    if (!selectedClaim || !selectedApprover) return

    const approver = mockApprovers.find(a => a.id === selectedApprover)
    if (!approver) return

    setClaims(claims.map(claim =>
      claim.id === selectedClaim.id
        ? { ...claim, status: 'routed', assignedTo: approver.name }
        : claim
    ))

    setSelectedClaim(null)
    setSelectedApprover('')
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'routed':
        return 'bg-blue-100 text-blue-800'
      case 'approved':
        return 'bg-green-100 text-green-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div data-testid="claimsexceedinga" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            High-Value Claims Management
          </h1>
          <p className="text-gray-600">
            Claims exceeding ${THRESHOLD.toLocaleString()} threshold require finance approval
          </p>
          <div className="mt-4 flex gap-4">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex-1">
              <div className="text-2xl font-bold text-yellow-900">
                {exceedingClaims.filter(c => c.status === 'pending').length}
              </div>
              <div className="text-sm text-yellow-700">Pending Routing</div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex-1">
              <div className="text-2xl font-bold text-blue-900">
                {exceedingClaims.filter(c => c.status === 'routed').length}
              </div>
              <div className="text-sm text-blue-700">Routed to Finance</div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex-1">
              <div className="text-2xl font-bold text-green-900">
                {exceedingClaims.filter(c => c.status === 'approved').length}
              </div>
              <div className="text-sm text-green-700">Approved</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Claims Exceeding ${THRESHOLD.toLocaleString()}
              </h2>
              <div data-testid="claimsexceedinga-list" className="space-y-4">
                {exceedingClaims.map(claim => (
                  <div
                    key={claim.id}
                    data-testid="claimsexceedinga-item"
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      selectedClaim?.id === claim.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedClaim(claim)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {claim.claimNumber}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Submitted by {claim.submittedBy} on {claim.submittedDate}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          claim.status
                        )}`}
                      >
                        {claim.status.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-2">{claim.description}</p>
                    <div className="flex justify-between items-center">
                      <div className="text-2xl font-bold text-red-600">
                        ${claim.amount.toLocaleString('en-US', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </div>
                      {claim.assignedTo && (
                        <div className="text-sm text-gray-600">
                          Assigned to: <span className="font-medium">{claim.assignedTo}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Route to Finance Approver
              </h2>
              {selectedClaim ? (
                <div>
                  <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Selected Claim</div>
                    <div className="font-semibold text-gray-900">
                      {selectedClaim.claimNumber}
                    </div>
                    <div className="text-lg font-bold text-red-600 mt-1">
                      ${selectedClaim.amount.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </div>
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="approver-select"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Assign to Finance Approver
                    </label>
                    <select
                      id="approver-select"
                      data-testid="claimsexceedinga-approver"
                      value={selectedApprover}
                      onChange={(e) => setSelectedApprover(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={selectedClaim.status !== 'pending'}
                    >
                      <option value="">Select an approver...</option>
                      {mockApprovers.map(approver => (
                        <option key={approver.id} value={approver.id}>
                          {approver.name} - {approver.department}
                        </option>
                      ))}
                    </select>
                  </div>

                  {selectedClaim.status === 'pending' && (
                    <button
                      data-testid="claimsexceedinga-route"
                      onClick={handleRouteClaim}
                      disabled={!selectedApprover}
                      className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                    >
                      Route to Finance
                    </button>
                  )}

                  {selectedClaim.status === 'routed' && (
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
                      This claim has been routed to {selectedClaim.assignedTo}
                    </div>
                  )}

                  {selectedClaim.status === 'approved' && (
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800">
                      This claim has been approved by {selectedClaim.assignedTo}
                    </div>
                  )}

                  {selectedClaim.status === 'rejected' && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-800">
                      This claim has been rejected by {selectedClaim.assignedTo}
                    </div>
                  )}

                  <button
                    data-testid="claimsexceedinga-clear"
                    onClick={() => {
                      setSelectedClaim(null)
                      setSelectedApprover('')
                    }}
                    className="w-full mt-3 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                  >
                    Clear Selection
                  </button>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>Select a claim from the list to route it to a finance approver</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
