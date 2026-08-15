/**
 * UserAttemptsTo — Demonstrates invalid case status validation in legal case management
 *
 * Features: case status updates, validation errors, invalid state detection, user feedback, status history
 *
 * Ticket: SCRUM-894 | Branch: proto/SCRUM-892
 */

import { useState } from 'react'

interface CaseItem {
  id: string
  caseNumber: string
  clientName: string
  currentStatus: string
  validStatuses: string[]
  assignedTo: string
  lastUpdated: string
}

interface StatusAttempt {
  id: string
  caseNumber: string
  attemptedStatus: string
  timestamp: string
  result: 'success' | 'error'
  errorMessage?: string
}

const MOCK_CASES: CaseItem[] = [
  {
    id: '1',
    caseNumber: 'CASE-2024-001',
    clientName: 'Acme Corporation',
    currentStatus: 'Open',
    validStatuses: ['In Progress', 'On Hold', 'Closed'],
    assignedTo: 'Sarah Mitchell',
    lastUpdated: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    caseNumber: 'CASE-2024-002',
    clientName: 'TechStart Inc',
    currentStatus: 'In Progress',
    validStatuses: ['Open', 'Under Review', 'Closed'],
    assignedTo: 'David Chen',
    lastUpdated: '2024-01-14T14:20:00Z'
  },
  {
    id: '3',
    caseNumber: 'CASE-2024-003',
    clientName: 'Global Ventures LLC',
    currentStatus: 'Under Review',
    validStatuses: ['In Progress', 'Approved', 'Rejected'],
    assignedTo: 'Maria Garcia',
    lastUpdated: '2024-01-13T09:15:00Z'
  },
  {
    id: '4',
    caseNumber: 'CASE-2024-004',
    clientName: 'Riverside Properties',
    currentStatus: 'On Hold',
    validStatuses: ['Open', 'In Progress', 'Cancelled'],
    assignedTo: 'James Wilson',
    lastUpdated: '2024-01-12T16:45:00Z'
  },
  {
    id: '5',
    caseNumber: 'CASE-2024-005',
    clientName: 'Metro Health Systems',
    currentStatus: 'Approved',
    validStatuses: ['Closed', 'Archived'],
    assignedTo: 'Linda Brown',
    lastUpdated: '2024-01-11T11:00:00Z'
  },
  {
    id: '6',
    caseNumber: 'CASE-2024-006',
    clientName: 'Summit Financial',
    currentStatus: 'Closed',
    validStatuses: ['Archived', 'Reopened'],
    assignedTo: 'Robert Taylor',
    lastUpdated: '2024-01-10T13:30:00Z'
  },
  {
    id: '7',
    caseNumber: 'CASE-2024-007',
    clientName: 'Horizon Manufacturing',
    currentStatus: 'Open',
    validStatuses: ['In Progress', 'On Hold', 'Cancelled'],
    assignedTo: 'Emily Davis',
    lastUpdated: '2024-01-09T15:20:00Z'
  }
]

const ALL_POSSIBLE_STATUSES = [
  'Open',
  'In Progress',
  'On Hold',
  'Under Review',
  'Approved',
  'Rejected',
  'Closed',
  'Cancelled',
  'Archived',
  'Reopened',
  'Pending',
  'Suspended'
]

export default function UserAttemptsTo() {
  const [selectedCaseId, setSelectedCaseId] = useState<string>('')
  const [attemptedStatus, setAttemptedStatus] = useState<string>('')
  const [attempts, setAttempts] = useState<StatusAttempt[]>([])
  const [errorMessage, setErrorMessage] = useState<string>('')

  const selectedCase = MOCK_CASES.find(c => c.id === selectedCaseId)

  const handleStatusUpdate = () => {
    if (!selectedCase || !attemptedStatus) {
      setErrorMessage('Please select a case and a status')
      return
    }

    const isValid = selectedCase.validStatuses.includes(attemptedStatus)
    const timestamp = new Date().toISOString()

    if (isValid) {
      const newAttempt: StatusAttempt = {
        id: Date.now().toString(),
        caseNumber: selectedCase.caseNumber,
        attemptedStatus,
        timestamp,
        result: 'success'
      }
      setAttempts([newAttempt, ...attempts])
      setErrorMessage('')
      // Success feedback
      setTimeout(() => {
        setSelectedCaseId('')
        setAttemptedStatus('')
      }, 1500)
    } else {
      const errorMsg = `Invalid status transition: Cannot change ${selectedCase.caseNumber} from "${selectedCase.currentStatus}" to "${attemptedStatus}". Valid statuses: ${selectedCase.validStatuses.join(', ')}`
      const newAttempt: StatusAttempt = {
        id: Date.now().toString(),
        caseNumber: selectedCase.caseNumber,
        attemptedStatus,
        timestamp,
        result: 'error',
        errorMessage: errorMsg
      }
      setAttempts([newAttempt, ...attempts])
      setErrorMessage(errorMsg)
    }
  }

  const formatTimestamp = (isoString: string) => {
    const date = new Date(isoString)
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div data-testid="userattemptsto" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Case Status Management
          </h1>
          <p className="text-gray-600">
            Update case statuses with built-in validation
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Update Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Update Status
              </h2>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="case-select"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Select Case
                  </label>
                  <select
                    id="case-select"
                    data-testid="userattemptsto-case"
                    value={selectedCaseId}
                    onChange={(e) => {
                      setSelectedCaseId(e.target.value)
                      setErrorMessage('')
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">-- Choose a case --</option>
                    {MOCK_CASES.map((caseItem) => (
                      <option key={caseItem.id} value={caseItem.id}>
                        {caseItem.caseNumber} - {caseItem.clientName}
                      </option>
                    ))}
                  </select>
                </div>

                {selectedCase && (
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                    <p className="text-sm font-medium text-blue-900">
                      Current Status: <span className="font-bold">{selectedCase.currentStatus}</span>
                    </p>
                    <p className="text-xs text-blue-700 mt-1">
                      Valid transitions: {selectedCase.validStatuses.join(', ')}
                    </p>
                  </div>
                )}

                <div>
                  <label
                    htmlFor="status-select"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    New Status
                  </label>
                  <select
                    id="status-select"
                    data-testid="userattemptsto-status"
                    value={attemptedStatus}
                    onChange={(e) => {
                      setAttemptedStatus(e.target.value)
                      setErrorMessage('')
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">-- Select status --</option>
                    {ALL_POSSIBLE_STATUSES.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>

                {errorMessage && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-sm text-red-800">{errorMessage}</p>
                  </div>
                )}

                <button
                  data-testid="userattemptsto-submit"
                  onClick={handleStatusUpdate}
                  disabled={!selectedCaseId || !attemptedStatus}
                  className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  Update Status
                </button>
              </div>
            </div>
          </div>

          {/* Cases List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Active Cases
              </h2>
              <div data-testid="userattemptsto-list" className="space-y-3">
                {MOCK_CASES.map((caseItem) => (
                  <div
                    key={caseItem.id}
                    data-testid="userattemptsto-item"
                    className="p-4 border border-gray-200 rounded-md hover:border-blue-300 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {caseItem.caseNumber}
                        </h3>
                        <p className="text-sm text-gray-600">{caseItem.clientName}</p>
                      </div>
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                        {caseItem.currentStatus}
                      </span>
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                      <p>Assigned to: {caseItem.assignedTo}</p>
                      <p>Last updated: {formatTimestamp(caseItem.lastUpdated)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Attempt History */}
            {attempts.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Status Update History
                </h2>
                <div data-testid="userattemptsto-history" className="space-y-3">
                  {attempts.map((attempt) => (
                    <div
                      key={attempt.id}
                      data-testid="userattemptsto-history-item"
                      className={`p-4 border rounded-md ${
                        attempt.result === 'success'
                          ? 'border-green-200 bg-green-50'
                          : 'border-red-200 bg-red-50'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-900">
                              {attempt.caseNumber}
                            </span>
                            <span className="text-gray-500">→</span>
                            <span className="font-medium text-gray-700">
                              {attempt.attemptedStatus}
                            </span>
                          </div>
                          {attempt.errorMessage && (
                            <p className="text-sm text-red-700 mt-1">
                              {attempt.errorMessage}
                            </p>
                          )}
                          <p className="text-xs text-gray-500 mt-1">
                            {formatTimestamp(attempt.timestamp)}
                          </p>
                        </div>
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded ${
                            attempt.result === 'success'
                              ? 'bg-green-200 text-green-800'
                              : 'bg-red-200 text-red-800'
                          }`}
                        >
                          {attempt.result === 'success' ? 'Success' : 'Error'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
