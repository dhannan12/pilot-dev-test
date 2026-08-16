/**
 * UserAttemptsTo — Legal case creation form with invalid status validation
 *
 * Features: form validation, error messages, status dropdown, client information, invalid status handling
 *
 * Ticket: SCRUM-904 | Branch: proto/SCRUM-903
 */

import { useState } from 'react'

interface LegalCase {
  id: string
  caseNumber: string
  clientName: string
  status: string
  description: string
  createdAt: string
}

// Valid case statuses - "pending-review" is NOT valid
const VALID_STATUSES = ['new', 'active', 'closed', 'on-hold']
const INVALID_STATUSES = ['pending-review', 'archived', 'cancelled', 'draft', 'suspended']

// Mock data showing both valid and invalid attempts
const mockCaseAttempts: LegalCase[] = [
  {
    id: '1',
    caseNumber: 'CASE-2024-001',
    clientName: 'John Smith',
    status: 'pending-review',
    description: 'Personal injury case - attempted with invalid status',
    createdAt: '2024-08-15T10:30:00Z'
  },
  {
    id: '2',
    caseNumber: 'CASE-2024-002',
    clientName: 'Jane Doe',
    status: 'archived',
    description: 'Contract dispute - invalid status attempt',
    createdAt: '2024-08-14T14:20:00Z'
  },
  {
    id: '3',
    caseNumber: 'CASE-2024-003',
    clientName: 'Bob Johnson',
    status: 'active',
    description: 'Employment law case - valid status',
    createdAt: '2024-08-13T09:15:00Z'
  },
  {
    id: '4',
    caseNumber: 'CASE-2024-004',
    clientName: 'Alice Williams',
    status: 'draft',
    description: 'Real estate dispute - attempted with invalid status',
    createdAt: '2024-08-12T16:45:00Z'
  },
  {
    id: '5',
    caseNumber: 'CASE-2024-005',
    clientName: 'Charlie Brown',
    status: 'suspended',
    description: 'Criminal defense case - invalid status attempt',
    createdAt: '2024-08-11T11:00:00Z'
  }
]

export default function UserAttemptsTo() {
  const [caseNumber, setCaseNumber] = useState('')
  const [clientName, setClientName] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [attempts, setAttempts] = useState<LegalCase[]>(mockCaseAttempts)
  const [showForm, setShowForm] = useState(true)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Validate required fields
    if (!caseNumber || !clientName || !selectedStatus || !description) {
      setError('All fields are required')
      return
    }

    // Validate status
    if (!VALID_STATUSES.includes(selectedStatus)) {
      setError(`Invalid status "${selectedStatus}". Valid statuses are: ${VALID_STATUSES.join(', ')}`)
      return
    }

    // Success case
    const newCase: LegalCase = {
      id: Date.now().toString(),
      caseNumber,
      clientName,
      status: selectedStatus,
      description,
      createdAt: new Date().toISOString()
    }

    setAttempts([newCase, ...attempts])
    
    // Reset form
    setCaseNumber('')
    setClientName('')
    setSelectedStatus('')
    setDescription('')
    setError('Case created successfully!')
    
    setTimeout(() => setError(null), 3000)
  }

  const attemptInvalidCase = (invalidStatus: string) => {
    setSelectedStatus(invalidStatus)
    setError(null)
  }

  return (
    <section data-testid="userattemptsto" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Legal Case Management</h1>
            <button
              data-testid="userattemptsto-toggle-form"
              onClick={() => setShowForm(!showForm)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              {showForm ? 'Hide Form' : 'Show Form'}
            </button>
          </div>

          {showForm && (
            <form onSubmit={handleSubmit} className="space-y-4 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="caseNumber" className="block text-sm font-medium text-gray-700 mb-1">
                    Case Number
                  </label>
                  <input
                    id="caseNumber"
                    data-testid="userattemptsto-casenumber"
                    type="text"
                    value={caseNumber}
                    onChange={(e) => setCaseNumber(e.target.value)}
                    placeholder="CASE-2024-XXX"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="clientName" className="block text-sm font-medium text-gray-700 mb-1">
                    Client Name
                  </label>
                  <input
                    id="clientName"
                    data-testid="userattemptsto-clientname"
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Enter client name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                  Case Status
                </label>
                <select
                  id="status"
                  data-testid="userattemptsto-status"
                  value={selectedStatus}
                  onChange={(e) => {
                    setSelectedStatus(e.target.value)
                    setError(null)
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a status</option>
                  <optgroup label="Valid Statuses">
                    {VALID_STATUSES.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </optgroup>
                  <optgroup label="Invalid Statuses (for testing)">
                    {INVALID_STATUSES.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </optgroup>
                </select>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Case Description
                </label>
                <textarea
                  id="description"
                  data-testid="userattemptsto-description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter case details"
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {error && (
                <div 
                  data-testid="userattemptsto-error"
                  className={`p-4 rounded-md ${
                    error.includes('success') 
                      ? 'bg-green-50 text-green-800 border border-green-200' 
                      : 'bg-red-50 text-red-800 border border-red-200'
                  }`}
                >
                  <p className="text-sm font-medium">{error}</p>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  type="submit"
                  data-testid="userattemptsto-submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
                >
                  Create Case
                </button>
                <button
                  type="button"
                  data-testid="userattemptsto-reset"
                  onClick={() => {
                    setCaseNumber('')
                    setClientName('')
                    setSelectedStatus('')
                    setDescription('')
                    setError(null)
                  }}
                  className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors font-medium"
                >
                  Reset
                </button>
              </div>

              <div className="border-t pt-4 mt-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Quick Test: Try Invalid Status</p>
                <div className="flex flex-wrap gap-2">
                  {INVALID_STATUSES.map(status => (
                    <button
                      key={status}
                      type="button"
                      data-testid={`userattemptsto-quick-${status}`}
                      onClick={() => attemptInvalidCase(status)}
                      className="px-3 py-1 text-sm bg-orange-100 text-orange-700 rounded-md hover:bg-orange-200 transition-colors"
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            </form>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Case Creation Attempts</h2>
          <p className="text-sm text-gray-600 mb-4">
            History of case creation attempts (both valid and invalid)
          </p>
          
          <ul data-testid="userattemptsto-list" className="space-y-3">
            {attempts.map((attempt) => {
              const isValid = VALID_STATUSES.includes(attempt.status)
              return (
                <li
                  key={attempt.id}
                  data-testid="userattemptsto-item"
                  className={`p-4 border rounded-md ${
                    isValid 
                      ? 'border-green-200 bg-green-50' 
                      : 'border-red-200 bg-red-50'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {attempt.caseNumber}
                        </h3>
                        <span
                          className={`px-3 py-1 text-xs font-medium rounded-full ${
                            isValid
                              ? 'bg-green-200 text-green-800'
                              : 'bg-red-200 text-red-800'
                          }`}
                        >
                          {isValid ? 'VALID' : 'INVALID'} - {attempt.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 mb-1">
                        <span className="font-medium">Client:</span> {attempt.clientName}
                      </p>
                      <p className="text-sm text-gray-600 mb-2">{attempt.description}</p>
                      <p className="text-xs text-gray-500">
                        Created: {new Date(attempt.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      {isValid ? (
                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      )}
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
