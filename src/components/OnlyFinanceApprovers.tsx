/**
 * OnlyFinanceApprovers — Role-based financial approval system for claims
 *
 * Features: finance role validation, claim approval workflow, approval history, role-based UI, financial aspect review
 *
 * Ticket: SCRUM-875 | Branch: proto/SCRUM-868
 */

import { useState } from 'react'

interface Claim {
  id: string
  claimNumber: string
  claimant: string
  financialAmount: number
  description: string
  status: 'pending' | 'approved' | 'rejected'
  submittedDate: string
  approvedBy?: string
  approvedDate?: string
}

interface User {
  id: string
  name: string
  role: 'finance_approver' | 'regular_user' | 'manager'
  email: string
}

interface ApprovalHistory {
  id: string
  claimId: string
  approver: string
  action: 'approved' | 'rejected'
  timestamp: string
  notes: string
}

const mockUsers: User[] = [
  { id: 'u1', name: 'Sarah Chen', role: 'finance_approver', email: 'sarah.chen@company.com' },
  { id: 'u2', name: 'Michael Brooks', role: 'finance_approver', email: 'michael.brooks@company.com' },
  { id: 'u3', name: 'Jessica Martinez', role: 'manager', email: 'jessica.martinez@company.com' },
  { id: 'u4', name: 'David Kim', role: 'regular_user', email: 'david.kim@company.com' },
  { id: 'u5', name: 'Emily Taylor', role: 'finance_approver', email: 'emily.taylor@company.com' },
]

const mockClaims: Claim[] = [
  {
    id: 'c1',
    claimNumber: 'CLM-2026-001',
    claimant: 'John Doe',
    financialAmount: 5420.00,
    description: 'Medical expenses for surgery',
    status: 'pending',
    submittedDate: '2026-08-10',
  },
  {
    id: 'c2',
    claimNumber: 'CLM-2026-002',
    claimant: 'Jane Smith',
    financialAmount: 1250.50,
    description: 'Dental procedure claim',
    status: 'pending',
    submittedDate: '2026-08-11',
  },
  {
    id: 'c3',
    claimNumber: 'CLM-2026-003',
    claimant: 'Robert Johnson',
    financialAmount: 3890.75,
    description: 'Physical therapy treatment',
    status: 'approved',
    submittedDate: '2026-08-08',
    approvedBy: 'Sarah Chen',
    approvedDate: '2026-08-12',
  },
  {
    id: 'c4',
    claimNumber: 'CLM-2026-004',
    claimant: 'Maria Garcia',
    financialAmount: 875.00,
    description: 'Prescription medication reimbursement',
    status: 'pending',
    submittedDate: '2026-08-12',
  },
  {
    id: 'c5',
    claimNumber: 'CLM-2026-005',
    claimant: 'William Brown',
    financialAmount: 12500.00,
    description: 'Hospital stay and treatment',
    status: 'rejected',
    submittedDate: '2026-08-09',
    approvedBy: 'Michael Brooks',
    approvedDate: '2026-08-13',
  },
]

const mockApprovalHistory: ApprovalHistory[] = [
  {
    id: 'h1',
    claimId: 'c3',
    approver: 'Sarah Chen',
    action: 'approved',
    timestamp: '2026-08-12 14:35:00',
    notes: 'All documentation verified, amount approved',
  },
  {
    id: 'h2',
    claimId: 'c5',
    approver: 'Michael Brooks',
    action: 'rejected',
    timestamp: '2026-08-13 09:20:00',
    notes: 'Insufficient supporting documentation',
  },
]

export default function OnlyFinanceApprovers() {
  const [currentUser, setCurrentUser] = useState<User>(mockUsers[0])
  const [claims, setClaims] = useState<Claim[]>(mockClaims)
  const [selectedClaim, setSelectedClaim] = useState<Claim | null>(null)
  const [approvalNotes, setApprovalNotes] = useState('')
  const [approvalHistory] = useState<ApprovalHistory[]>(mockApprovalHistory)
  const [showAccessDenied, setShowAccessDenied] = useState(false)

  const isFinanceApprover = currentUser.role === 'finance_approver'

  const handleClaimSelect = (claim: Claim) => {
    setSelectedClaim(claim)
    setApprovalNotes('')
    setShowAccessDenied(false)
  }

  const handleApprove = () => {
    if (!isFinanceApprover) {
      setShowAccessDenied(true)
      return
    }

    if (selectedClaim) {
      setClaims(claims.map(c => 
        c.id === selectedClaim.id 
          ? { ...c, status: 'approved', approvedBy: currentUser.name, approvedDate: new Date().toISOString().split('T')[0] }
          : c
      ))
      setSelectedClaim(null)
      setApprovalNotes('')
    }
  }

  const handleReject = () => {
    if (!isFinanceApprover) {
      setShowAccessDenied(true)
      return
    }

    if (selectedClaim) {
      setClaims(claims.map(c => 
        c.id === selectedClaim.id 
          ? { ...c, status: 'rejected', approvedBy: currentUser.name, approvedDate: new Date().toISOString().split('T')[0] }
          : c
      ))
      setSelectedClaim(null)
      setApprovalNotes('')
    }
  }

  const pendingClaims = claims.filter(c => c.status === 'pending')
  const processedClaims = claims.filter(c => c.status !== 'pending')

  return (
    <div data-testid="onlyfinanceapprovers" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Financial Claims Approval</h1>
          
          {/* User Selector */}
          <div className="flex items-center gap-4">
            <label htmlFor="user-select" className="text-sm font-medium text-gray-700">
              Current User:
            </label>
            <select
              id="user-select"
              data-testid="onlyfinanceapprovers-user-select"
              value={currentUser.id}
              onChange={(e) => {
                const user = mockUsers.find(u => u.id === e.target.value)
                if (user) {
                  setCurrentUser(user)
                  setSelectedClaim(null)
                  setShowAccessDenied(false)
                }
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {mockUsers.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name} ({user.role.replace('_', ' ')})
                </option>
              ))}
            </select>
          </div>

          {/* Role Badge */}
          <div className="mt-4">
            {isFinanceApprover ? (
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                ✓ Finance Approver - Can approve financial claims
              </div>
            ) : (
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                ✗ {currentUser.role.replace('_', ' ')} - Cannot approve financial claims
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pending Claims */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Pending Financial Approvals</h2>
            <div data-testid="onlyfinanceapprovers-list" className="space-y-3">
              {pendingClaims.length === 0 ? (
                <p className="text-gray-500 text-sm">No pending claims</p>
              ) : (
                pendingClaims.map(claim => (
                  <div
                    key={claim.id}
                    data-testid="onlyfinanceapprovers-item"
                    onClick={() => handleClaimSelect(claim)}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedClaim?.id === claim.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-semibold text-gray-900">{claim.claimNumber}</span>
                      <span className="text-lg font-bold text-gray-900">
                        ${claim.financialAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 mb-1">{claim.claimant}</p>
                    <p className="text-sm text-gray-600 mb-2">{claim.description}</p>
                    <p className="text-xs text-gray-500">Submitted: {claim.submittedDate}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Approval Panel */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Approval Actions</h2>
            
            {showAccessDenied && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 font-medium">Access Denied</p>
                <p className="text-red-700 text-sm mt-1">
                  Only finance approvers can approve financial aspects of claims.
                </p>
              </div>
            )}

            {selectedClaim ? (
              <div>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <h3 className="font-semibold text-gray-900 mb-2">{selectedClaim.claimNumber}</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Claimant:</span>
                      <span className="font-medium text-gray-900">{selectedClaim.claimant}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Amount:</span>
                      <span className="font-bold text-gray-900">
                        ${selectedClaim.financialAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Submitted:</span>
                      <span className="text-gray-900">{selectedClaim.submittedDate}</span>
                    </div>
                    <div className="pt-2 border-t border-gray-200">
                      <p className="text-gray-700">{selectedClaim.description}</p>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="approval-notes" className="block text-sm font-medium text-gray-700 mb-2">
                    Approval Notes
                  </label>
                  <textarea
                    id="approval-notes"
                    data-testid="onlyfinanceapprovers-notes"
                    value={approvalNotes}
                    onChange={(e) => setApprovalNotes(e.target.value)}
                    placeholder="Enter notes about this approval decision..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                    rows={3}
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    data-testid="onlyfinanceapprovers-approve"
                    onClick={handleApprove}
                    disabled={!isFinanceApprover}
                    className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                      isFinanceApprover
                        ? 'bg-green-600 text-white hover:bg-green-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Approve
                  </button>
                  <button
                    data-testid="onlyfinanceapprovers-reject"
                    onClick={handleReject}
                    disabled={!isFinanceApprover}
                    className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                      isFinanceApprover
                        ? 'bg-red-600 text-white hover:bg-red-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Reject
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-gray-500 text-sm">Select a claim to review</p>
            )}
          </div>
        </div>

        {/* Processed Claims & History */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Processed Claims */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Processed Claims</h2>
            <div className="space-y-3">
              {processedClaims.length === 0 ? (
                <p className="text-gray-500 text-sm">No processed claims</p>
              ) : (
                processedClaims.map(claim => (
                  <div
                    key={claim.id}
                    className="p-4 border border-gray-200 rounded-lg"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-semibold text-gray-900">{claim.claimNumber}</span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        claim.status === 'approved'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {claim.status.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 mb-1">{claim.claimant}</p>
                    <p className="text-sm font-bold text-gray-900 mb-2">
                      ${claim.financialAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </p>
                    {claim.approvedBy && (
                      <p className="text-xs text-gray-500">
                        {claim.status === 'approved' ? 'Approved' : 'Rejected'} by {claim.approvedBy} on {claim.approvedDate}
                      </p>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Approval History */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Approval History</h2>
            <div className="space-y-3">
              {approvalHistory.length === 0 ? (
                <p className="text-gray-500 text-sm">No history available</p>
              ) : (
                approvalHistory.map(history => {
                  const claim = claims.find(c => c.id === history.claimId)
                  return (
                    <div
                      key={history.id}
                      className="p-4 border border-gray-200 rounded-lg"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-semibold text-gray-900">{claim?.claimNumber}</span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          history.action === 'approved'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {history.action.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 mb-1">By: {history.approver}</p>
                      <p className="text-xs text-gray-500 mb-2">{history.timestamp}</p>
                      <p className="text-sm text-gray-600 italic">{history.notes}</p>
                    </div>
                  )
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
