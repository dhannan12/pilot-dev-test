/**
 * UserAttemptsTo — Handles user attempting to close a case with incomplete document checklist
 *
 * Features: case closure validation, document checklist tracking, validation warnings, status indicators, user feedback
 *
 * Ticket: SCRUM-896 | Branch: proto/SCRUM-892
 */

import React, { useState } from 'react'

interface Document {
  id: string
  name: string
  required: boolean
  completed: boolean
}

interface CaseData {
  id: string
  caseNumber: string
  clientName: string
  status: 'open' | 'pending' | 'closed'
  documents: Document[]
}

const MOCK_CASES: CaseData[] = [
  {
    id: '1',
    caseNumber: 'CASE-2024-001',
    clientName: 'Smith vs. Johnson',
    status: 'open',
    documents: [
      { id: 'd1', name: 'Initial Complaint', required: true, completed: true },
      { id: 'd2', name: 'Evidence Documentation', required: true, completed: true },
      { id: 'd3', name: 'Witness Statements', required: true, completed: false },
      { id: 'd4', name: 'Final Judgment', required: true, completed: false },
      { id: 'd5', name: 'Client Signature', required: true, completed: false },
    ],
  },
  {
    id: '2',
    caseNumber: 'CASE-2024-002',
    clientName: 'Williams Estate',
    status: 'open',
    documents: [
      { id: 'd6', name: 'Will Document', required: true, completed: true },
      { id: 'd7', name: 'Death Certificate', required: true, completed: false },
      { id: 'd8', name: 'Asset Inventory', required: true, completed: true },
      { id: 'd9', name: 'Beneficiary Consent', required: true, completed: false },
      { id: 'd10', name: 'Court Filing', required: true, completed: false },
    ],
  },
  {
    id: '3',
    caseNumber: 'CASE-2024-003',
    clientName: 'Davis Inc. Contract Dispute',
    status: 'open',
    documents: [
      { id: 'd11', name: 'Original Contract', required: true, completed: true },
      { id: 'd12', name: 'Breach Documentation', required: true, completed: false },
      { id: 'd13', name: 'Email Correspondence', required: false, completed: true },
      { id: 'd14', name: 'Settlement Offer', required: true, completed: false },
      { id: 'd15', name: 'Legal Opinion', required: true, completed: false },
    ],
  },
  {
    id: '4',
    caseNumber: 'CASE-2024-004',
    clientName: 'Martinez Personal Injury',
    status: 'open',
    documents: [
      { id: 'd16', name: 'Medical Records', required: true, completed: false },
      { id: 'd17', name: 'Accident Report', required: true, completed: true },
      { id: 'd18', name: 'Insurance Claim', required: true, completed: false },
      { id: 'd19', name: 'Witness Depositions', required: true, completed: false },
      { id: 'd20', name: 'Damage Assessment', required: true, completed: true },
    ],
  },
  {
    id: '5',
    caseNumber: 'CASE-2024-005',
    clientName: 'Brown Family Custody',
    status: 'open',
    documents: [
      { id: 'd21', name: 'Custody Petition', required: true, completed: true },
      { id: 'd22', name: 'Home Study Report', required: true, completed: false },
      { id: 'd23', name: 'Financial Disclosure', required: true, completed: true },
      { id: 'd24', name: 'Child Welfare Report', required: true, completed: false },
      { id: 'd25', name: 'Parenting Plan', required: true, completed: false },
    ],
  },
]

export default function UserAttemptsTo() {
  const [selectedCase, setSelectedCase] = useState<CaseData>(MOCK_CASES[0])
  const [showWarning, setShowWarning] = useState(false)
  const [attemptedClose, setAttemptedClose] = useState(false)

  const getCompletionStats = (caseData: CaseData) => {
    const requiredDocs = caseData.documents.filter((doc) => doc.required)
    const completedRequired = requiredDocs.filter((doc) => doc.completed)
    return {
      total: requiredDocs.length,
      completed: completedRequired.length,
      percentage: Math.round((completedRequired.length / requiredDocs.length) * 100),
    }
  }

  const handleCloseCase = () => {
    const stats = getCompletionStats(selectedCase)
    if (stats.completed < stats.total) {
      setShowWarning(true)
      setAttemptedClose(true)
    } else {
      setShowWarning(false)
      setAttemptedClose(false)
      // Would close the case here
      alert('Case closed successfully!')
    }
  }

  const getIncompleteRequiredDocs = () => {
    return selectedCase.documents.filter((doc) => doc.required && !doc.completed)
  }

  const stats = getCompletionStats(selectedCase)

  return (
    <div data-testid="userattemptsto" className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Case Closure Manager
          </h1>
          <p className="text-gray-600">
            Ensure all required documents are completed before closing a case
          </p>
        </header>

        {/* Case Selection */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <label
            htmlFor="case-select"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Select Case
          </label>
          <select
            id="case-select"
            data-testid="userattemptsto-case-select"
            value={selectedCase.id}
            onChange={(e) => {
              const newCase = MOCK_CASES.find((c) => c.id === e.target.value)
              if (newCase) {
                setSelectedCase(newCase)
                setShowWarning(false)
                setAttemptedClose(false)
              }
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {MOCK_CASES.map((caseData) => (
              <option key={caseData.id} value={caseData.id}>
                {caseData.caseNumber} - {caseData.clientName}
              </option>
            ))}
          </select>
        </div>

        {/* Case Details */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {selectedCase.caseNumber}
              </h2>
              <p className="text-gray-600">{selectedCase.clientName}</p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                selectedCase.status === 'open'
                  ? 'bg-green-100 text-green-800'
                  : selectedCase.status === 'pending'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {selectedCase.status.toUpperCase()}
            </span>
          </div>

          {/* Completion Progress */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">
                Document Completion Progress
              </span>
              <span className="text-sm font-semibold text-gray-900">
                {stats.completed} / {stats.total} ({stats.percentage}%)
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className={`h-3 rounded-full transition-all ${
                  stats.percentage === 100
                    ? 'bg-green-500'
                    : stats.percentage >= 50
                    ? 'bg-yellow-500'
                    : 'bg-red-500'
                }`}
                style={{ width: `${stats.percentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Document Checklist */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Document Checklist
          </h3>
          <ul data-testid="userattemptsto-list" className="space-y-3">
            {selectedCase.documents.map((doc) => (
              <li
                key={doc.id}
                data-testid="userattemptsto-item"
                className={`flex items-center justify-between p-3 rounded-md border ${
                  doc.completed
                    ? 'bg-green-50 border-green-200'
                    : doc.required
                    ? 'bg-red-50 border-red-200'
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                      doc.completed
                        ? 'bg-green-500 border-green-500'
                        : 'bg-white border-gray-300'
                    }`}
                  >
                    {doc.completed && (
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span
                    className={`font-medium ${
                      doc.completed ? 'text-gray-900' : 'text-gray-700'
                    }`}
                  >
                    {doc.name}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {doc.required && (
                    <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">
                      Required
                    </span>
                  )}
                  <span
                    className={`text-sm font-medium ${
                      doc.completed ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {doc.completed ? 'Complete' : 'Incomplete'}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Warning Message */}
        {showWarning && attemptedClose && (
          <div
            data-testid="userattemptsto-warning"
            className="bg-red-50 border-l-4 border-red-500 p-6 mb-6 rounded-r-lg"
          >
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg
                  className="h-6 w-6 text-red-500"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-semibold text-red-800 mb-2">
                  Cannot Close Case - Incomplete Documents
                </h3>
                <p className="text-red-700 mb-3">
                  The following required documents must be completed before closing
                  this case:
                </p>
                <ul className="list-disc list-inside space-y-1 text-red-700">
                  {getIncompleteRequiredDocs().map((doc) => (
                    <li key={doc.id}>{doc.name}</li>
                  ))}
                </ul>
                <p className="mt-3 text-sm text-red-600">
                  Please complete all required documents and try again.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            data-testid="userattemptsto-close"
            onClick={handleCloseCase}
            className={`flex-1 px-6 py-3 rounded-md font-semibold transition-colors ${
              stats.percentage === 100
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            Close Case
          </button>
          <button
            data-testid="userattemptsto-cancel"
            onClick={() => {
              setShowWarning(false)
              setAttemptedClose(false)
            }}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-md font-semibold hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
        </div>

        {/* Attempt Counter */}
        {attemptedClose && (
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Case closure attempted. {stats.completed} of {stats.total} required
              documents completed.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
