/**
 * OnlyClaimsManagers — Claims approval interface with role-based access control
 *
 * Features: high-value claim detection, role-based approval authorization, claim status tracking, manager-only actions, claim details display
 *
 * Ticket: SCRUM-966 | Branch: proto/SCRUM-963
 */

import { useState } from 'react'

interface Claim {
  id: string
  claimNumber: string
  policyHolder: string
  claimAmount: number
  incidentType: string
  dateSubmitted: string
  status: 'pending' | 'approved' | 'rejected'
  requiresManager: boolean
}

type UserRole = 'claims_manager' | 'claims_adjuster' | 'viewer'

interface User {
  id: string
  name: string
  role: UserRole
}

const MOCK_CLAIMS: Claim[] = [
  {
    id: '1',
    claimNumber: 'CLM-2026-10045',
    policyHolder: 'Sarah Johnson',
    claimAmount: 85000,
    incidentType: 'Total Loss - Multi-vehicle collision',
    dateSubmitted: '2026-08-10',
    status: 'pending',
    requiresManager: true,
  },
  {
    id: '2',
    claimNumber: 'CLM-2026-10046',
    policyHolder: 'Michael Chen',
    claimAmount: 3500,
    incidentType: 'Minor fender bender',
    dateSubmitted: '2026-08-11',
    status: 'pending',
    requiresManager: false,
  },
  {
    id: '3',
    claimNumber: 'CLM-2026-10047',
    policyHolder: 'Emily Rodriguez',
    claimAmount: 125000,
    incidentType: 'Total Loss - Theft and vandalism',
    dateSubmitted: '2026-08-12',
    status: 'pending',
    requiresManager: true,
  },
  {
    id: '4',
    claimNumber: 'CLM-2026-10048',
    policyHolder: 'David Thompson',
    claimAmount: 15000,
    incidentType: 'Partial vehicle damage',
    dateSubmitted: '2026-08-13',
    status: 'approved',
    requiresManager: false,
  },
  {
    id: '5',
    claimNumber: 'CLM-2026-10049',
    policyHolder: 'Jessica Martinez',
    claimAmount: 95000,
    incidentType: 'Total Loss - Fire damage',
    dateSubmitted: '2026-08-14',
    status: 'pending',
    requiresManager: true,
  },
  {
    id: '6',
    claimNumber: 'CLM-2026-10050',
    policyHolder: 'Robert Williams',
    claimAmount: 7200,
    incidentType: 'Glass and body damage',
    dateSubmitted: '2026-08-15',
    status: 'pending',
    requiresManager: false,
  },
  {
    id: '7',
    claimNumber: 'CLM-2026-10051',
    policyHolder: 'Amanda Brown',
    claimAmount: 150000,
    incidentType: 'Total Loss - Catastrophic collision',
    dateSubmitted: '2026-08-15',
    status: 'rejected',
    requiresManager: true,
  },
]

const MOCK_USERS: User[] = [
  { id: '1', name: 'Alex Turner (Claims Manager)', role: 'claims_manager' },
  { id: '2', name: 'Jordan Lee (Claims Adjuster)', role: 'claims_adjuster' },
  { id: '3', name: 'Sam Wilson (Viewer)', role: 'viewer' },
]

const HIGH_VALUE_THRESHOLD = 50000

export default function OnlyClaimsManagers() {
  const [claims, setClaims] = useState<Claim[]>(MOCK_CLAIMS)
  const [currentUser, setCurrentUser] = useState<User>(MOCK_USERS[1]) // Start as adjuster
  const [message, setMessage] = useState<string>('')

  const handleApprove = (claimId: string) => {
    const claim = claims.find((c) => c.id === claimId)
    if (!claim) return

    if (claim.requiresManager && currentUser.role !== 'claims_manager') {
      setMessage(
        `⚠️ Access Denied: High-value claims (>${HIGH_VALUE_THRESHOLD.toLocaleString()}) require Claims Manager approval`
      )
      return
    }

    setClaims(
      claims.map((c) =>
        c.id === claimId ? { ...c, status: 'approved' as const } : c
      )
    )
    setMessage(`✅ Claim ${claim.claimNumber} approved by ${currentUser.name}`)
  }

  const handleReject = (claimId: string) => {
    const claim = claims.find((c) => c.id === claimId)
    if (!claim) return

    if (claim.requiresManager && currentUser.role !== 'claims_manager') {
      setMessage(
        `⚠️ Access Denied: High-value claims (>${HIGH_VALUE_THRESHOLD.toLocaleString()}) require Claims Manager approval`
      )
      return
    }

    setClaims(
      claims.map((c) =>
        c.id === claimId ? { ...c, status: 'rejected' as const } : c
      )
    )
    setMessage(`❌ Claim ${claim.claimNumber} rejected by ${currentUser.name}`)
  }

  const canModifyClaim = (claim: Claim): boolean => {
    if (claim.status !== 'pending') return false
    if (claim.requiresManager && currentUser.role !== 'claims_manager') return false
    if (currentUser.role === 'viewer') return false
    return true
  }

  const pendingClaims = claims.filter((c) => c.status === 'pending')
  const processedClaims = claims.filter((c) => c.status !== 'pending')

  return (
    <div data-testid="only-claims-managers" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Claims Approval System
          </h1>
          <p className="text-gray-600">
            High-value claims (&gt;${HIGH_VALUE_THRESHOLD.toLocaleString()}) require Claims
            Manager authorization
          </p>
        </header>

        {/* User Role Selector */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <label
            htmlFor="user-select"
            className="block text-sm font-semibold text-gray-700 mb-3"
          >
            Current User Role
          </label>
          <select
            id="user-select"
            data-testid="only-claims-managers-user-select"
            value={currentUser.id}
            onChange={(e) => {
              const user = MOCK_USERS.find((u) => u.id === e.target.value)
              if (user) {
                setCurrentUser(user)
                setMessage(`Switched to ${user.name}`)
              }
            }}
            className="w-full md:w-96 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {MOCK_USERS.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          <div className="mt-2 text-sm text-gray-600">
            <span className="font-medium">Role:</span>{' '}
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                currentUser.role === 'claims_manager'
                  ? 'bg-purple-100 text-purple-800'
                  : currentUser.role === 'claims_adjuster'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {currentUser.role.replace('_', ' ').toUpperCase()}
            </span>
          </div>
        </div>

        {/* Message Display */}
        {message && (
          <div
            data-testid="only-claims-managers-message"
            className={`p-4 rounded-lg mb-6 ${
              message.includes('Access Denied')
                ? 'bg-red-50 border border-red-200 text-red-800'
                : message.includes('approved')
                ? 'bg-green-50 border border-green-200 text-green-800'
                : message.includes('rejected')
                ? 'bg-orange-50 border border-orange-200 text-orange-800'
                : 'bg-blue-50 border border-blue-200 text-blue-800'
            }`}
          >
            {message}
          </div>
        )}

        {/* Pending Claims */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Pending Claims ({pendingClaims.length})
          </h2>
          <div data-testid="only-claims-managers-pending-list" className="space-y-4">
            {pendingClaims.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center text-gray-500">
                No pending claims
              </div>
            ) : (
              pendingClaims.map((claim) => {
                const canModify = canModifyClaim(claim)
                return (
                  <div
                    key={claim.id}
                    data-testid="only-claims-managers-claim-item"
                    className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-bold text-gray-900">
                            {claim.claimNumber}
                          </h3>
                          {claim.requiresManager && (
                            <span
                              data-testid="only-claims-managers-manager-badge"
                              className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-semibold rounded-full"
                            >
                              MANAGER APPROVAL REQUIRED
                            </span>
                          )}
                        </div>
                        <p className="text-gray-700 mb-1">
                          <span className="font-semibold">Policy Holder:</span>{' '}
                          {claim.policyHolder}
                        </p>
                        <p className="text-gray-700 mb-1">
                          <span className="font-semibold">Incident:</span>{' '}
                          {claim.incidentType}
                        </p>
                        <p className="text-gray-700 mb-1">
                          <span className="font-semibold">Amount:</span>{' '}
                          <span
                            className={`font-bold ${
                              claim.claimAmount >= HIGH_VALUE_THRESHOLD
                                ? 'text-purple-600'
                                : 'text-gray-900'
                            }`}
                          >
                            ${claim.claimAmount.toLocaleString()}
                          </span>
                        </p>
                        <p className="text-sm text-gray-500">
                          Submitted: {claim.dateSubmitted}
                        </p>
                      </div>
                      <div className="flex gap-3">
                        <button
                          data-testid="only-claims-managers-approve"
                          onClick={() => handleApprove(claim.id)}
                          disabled={!canModify}
                          className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                            canModify
                              ? 'bg-green-600 text-white hover:bg-green-700'
                              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          }`}
                        >
                          Approve
                        </button>
                        <button
                          data-testid="only-claims-managers-reject"
                          onClick={() => handleReject(claim.id)}
                          disabled={!canModify}
                          className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                            canModify
                              ? 'bg-red-600 text-white hover:bg-red-700'
                              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          }`}
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                    {!canModify && claim.status === 'pending' && (
                      <div className="mt-3 text-sm text-gray-600 bg-gray-50 p-3 rounded">
                        {currentUser.role === 'viewer'
                          ? '🔒 Viewers cannot approve or reject claims'
                          : claim.requiresManager
                          ? '🔒 This high-value claim requires Claims Manager authorization'
                          : '🔒 Already processed'}
                      </div>
                    )}
                  </div>
                )
              })
            )}
          </div>
        </section>

        {/* Processed Claims */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Processed Claims ({processedClaims.length})
          </h2>
          <div data-testid="only-claims-managers-processed-list" className="space-y-4">
            {processedClaims.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center text-gray-500">
                No processed claims
              </div>
            ) : (
              processedClaims.map((claim) => (
                <div
                  key={claim.id}
                  data-testid="only-claims-managers-claim-item"
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 opacity-75"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-gray-900">
                          {claim.claimNumber}
                        </h3>
                        <span
                          className={`px-3 py-1 text-xs font-semibold rounded-full ${
                            claim.status === 'approved'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {claim.status.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-gray-700 mb-1">
                        <span className="font-semibold">Policy Holder:</span>{' '}
                        {claim.policyHolder}
                      </p>
                      <p className="text-gray-700 mb-1">
                        <span className="font-semibold">Amount:</span> $
                        {claim.claimAmount.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  )
}
