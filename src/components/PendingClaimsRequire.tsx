/**
 * PendingClaimsRequire — Displays pending claims requiring additional documentation from policyholders
 *
 * Features: claim list, document requirements, status tracking, upload prompts, deadline warnings
 *
 * Ticket: SCRUM-871 | Branch: proto/SCRUM-868
 */

import React, { useState } from 'react'

interface PendingClaim {
  id: string
  claimNumber: string
  policyholderName: string
  policyNumber: string
  claimType: string
  dateSubmitted: string
  documentsRequired: string[]
  dueDate: string
  priority: 'high' | 'medium' | 'low'
  status: 'pending'
}

const MOCK_PENDING_CLAIMS: PendingClaim[] = [
  {
    id: '1',
    claimNumber: 'CLM-2026-0891',
    policyholderName: 'Sarah Mitchell',
    policyNumber: 'POL-45678',
    claimType: 'Auto Accident',
    dateSubmitted: '2026-08-10',
    documentsRequired: ['Police Report', 'Repair Estimates', 'Photos of Damage'],
    dueDate: '2026-08-18',
    priority: 'high',
    status: 'pending'
  },
  {
    id: '2',
    claimNumber: 'CLM-2026-0892',
    policyholderName: 'Robert Chen',
    policyNumber: 'POL-78923',
    claimType: 'Property Damage',
    dateSubmitted: '2026-08-08',
    documentsRequired: ['Contractor Invoice', 'Building Inspection Report'],
    dueDate: '2026-08-22',
    priority: 'medium',
    status: 'pending'
  },
  {
    id: '3',
    claimNumber: 'CLM-2026-0893',
    policyholderName: 'Maria Rodriguez',
    policyNumber: 'POL-34512',
    claimType: 'Medical',
    dateSubmitted: '2026-08-05',
    documentsRequired: ['Medical Records', 'Doctor\'s Statement', 'Prescription Bills'],
    dueDate: '2026-08-25',
    priority: 'high',
    status: 'pending'
  },
  {
    id: '4',
    claimNumber: 'CLM-2026-0894',
    policyholderName: 'James Anderson',
    policyNumber: 'POL-90123',
    claimType: 'Home Insurance',
    dateSubmitted: '2026-08-12',
    documentsRequired: ['Proof of Ownership', 'Damage Assessment'],
    dueDate: '2026-08-28',
    priority: 'low',
    status: 'pending'
  },
  {
    id: '5',
    claimNumber: 'CLM-2026-0895',
    policyholderName: 'Emily Thompson',
    policyNumber: 'POL-56789',
    claimType: 'Liability',
    dateSubmitted: '2026-08-11',
    documentsRequired: ['Incident Report', 'Witness Statements', 'Legal Documentation'],
    dueDate: '2026-08-20',
    priority: 'high',
    status: 'pending'
  },
  {
    id: '6',
    claimNumber: 'CLM-2026-0896',
    policyholderName: 'David Park',
    policyNumber: 'POL-12367',
    claimType: 'Water Damage',
    dateSubmitted: '2026-08-13',
    documentsRequired: ['Plumber Report', 'Water Damage Photos'],
    dueDate: '2026-08-30',
    priority: 'medium',
    status: 'pending'
  }
]

export default function PendingClaimsRequire() {
  const [selectedClaim, setSelectedClaim] = useState<string | null>(null)
  const [filterPriority, setFilterPriority] = useState<string>('all')

  const filteredClaims = MOCK_PENDING_CLAIMS.filter(claim => {
    if (filterPriority === 'all') return true
    return claim.priority === filterPriority
  })

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-300'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      case 'low':
        return 'bg-green-100 text-green-800 border-green-300'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date('2026-08-15')
    const due = new Date(dueDate)
    const diffTime = due.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const handleRequestDocuments = (claimId: string) => {
    console.log(`Requesting documents for claim: ${claimId}`)
  }

  const handleViewDetails = (claimId: string) => {
    setSelectedClaim(selectedClaim === claimId ? null : claimId)
  }

  return (
    <div data-testid="pendingclaimsrequire" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Pending Claims - Documentation Required
          </h1>
          <p className="text-gray-600">
            Claims awaiting additional documentation from policyholders
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex items-center gap-4">
            <label htmlFor="priority-filter" className="text-sm font-medium text-gray-700">
              Filter by Priority:
            </label>
            <select
              id="priority-filter"
              data-testid="pendingclaimsrequire-priority"
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Priorities</option>
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
            </select>
            <div className="ml-auto text-sm text-gray-600">
              Showing {filteredClaims.length} of {MOCK_PENDING_CLAIMS.length} claims
            </div>
          </div>
        </div>

        {/* Claims List */}
        <div data-testid="pendingclaimsrequire-list" className="space-y-4">
          {filteredClaims.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
              <p className="text-gray-500">No pending claims found with the selected filter.</p>
            </div>
          ) : (
            filteredClaims.map((claim) => {
              const daysUntilDue = getDaysUntilDue(claim.dueDate)
              const isUrgent = daysUntilDue <= 3

              return (
                <div
                  key={claim.id}
                  data-testid="pendingclaimsrequire-item"
                  className={`bg-white rounded-lg shadow-sm border ${
                    isUrgent ? 'border-red-400 border-2' : 'border-gray-200'
                  } p-6 transition-all hover:shadow-md`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">
                          {claim.claimNumber}
                        </h3>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(
                            claim.priority
                          )}`}
                        >
                          {claim.priority.toUpperCase()} PRIORITY
                        </span>
                        {isUrgent && (
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-600 text-white">
                            URGENT - {daysUntilDue} DAY{daysUntilDue !== 1 ? 'S' : ''} LEFT
                          </span>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Policyholder:</span>
                          <span className="ml-2 font-medium text-gray-900">
                            {claim.policyholderName}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500">Policy Number:</span>
                          <span className="ml-2 font-medium text-gray-900">
                            {claim.policyNumber}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500">Claim Type:</span>
                          <span className="ml-2 font-medium text-gray-900">
                            {claim.claimType}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500">Submitted:</span>
                          <span className="ml-2 font-medium text-gray-900">
                            {claim.dateSubmitted}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500">Due Date:</span>
                          <span className={`ml-2 font-medium ${
                            isUrgent ? 'text-red-600' : 'text-gray-900'
                          }`}>
                            {claim.dueDate} ({daysUntilDue} days)
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Documents Required */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">
                      Documents Required ({claim.documentsRequired.length}):
                    </h4>
                    <ul className="space-y-1">
                      {claim.documentsRequired.map((doc, index) => (
                        <li
                          key={index}
                          className="flex items-center text-sm text-gray-600"
                        >
                          <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                          {doc}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button
                      data-testid="pendingclaimsrequire-request"
                      onClick={() => handleRequestDocuments(claim.id)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
                    >
                      Request Documents
                    </button>
                    <button
                      data-testid="pendingclaimsrequire-details"
                      onClick={() => handleViewDetails(claim.id)}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm"
                    >
                      {selectedClaim === claim.id ? 'Hide Details' : 'View Details'}
                    </button>
                    <button
                      data-testid="pendingclaimsrequire-contact"
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm"
                    >
                      Contact Policyholder
                    </button>
                  </div>

                  {/* Expanded Details */}
                  {selectedClaim === claim.id && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h5 className="font-semibold text-gray-900 mb-2">Claim Details</h5>
                        <p className="text-sm text-gray-600 mb-2">
                          This claim requires the policyholder to submit additional documentation
                          before processing can continue. All documents must be received by the due
                          date to avoid delays.
                        </p>
                        <div className="text-sm text-gray-600">
                          <p><strong>Status:</strong> Awaiting Documentation</p>
                          <p><strong>Last Contact:</strong> {claim.dateSubmitted}</p>
                          <p><strong>Next Action:</strong> Follow up if documents not received by {claim.dueDate}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })
          )}
        </div>

        {/* Summary Stats */}
        <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Summary</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600">
                {MOCK_PENDING_CLAIMS.filter(c => c.priority === 'high').length}
              </div>
              <div className="text-sm text-gray-600">High Priority</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-600">
                {MOCK_PENDING_CLAIMS.filter(c => c.priority === 'medium').length}
              </div>
              <div className="text-sm text-gray-600">Medium Priority</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">
                {MOCK_PENDING_CLAIMS.filter(c => c.priority === 'low').length}
              </div>
              <div className="text-sm text-gray-600">Low Priority</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
