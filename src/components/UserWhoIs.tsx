/**
 * UserWhoIs — Role-based access control for billable hours with permission validation
 *
 * Features: user role selection, permission validation, billable hours restriction, access denial messaging, role-based UI
 *
 * Ticket: SCRUM-908 | Branch: proto/SCRUM-903
 */

import { useState } from 'react'

interface User {
  id: string
  name: string
  email: string
  role: 'solicitor' | 'paralegal' | 'admin' | 'receptionist' | 'intern'
}

interface TimeEntry {
  id: string
  caseNumber: string
  hours: number
  description: string
  attemptedBy: string
  attemptedAt: string
  status: 'allowed' | 'denied'
  reason?: string
}

const MOCK_USERS: User[] = [
  { id: '1', name: 'Sarah Mitchell', email: 'sarah.mitchell@lawfirm.com', role: 'solicitor' },
  { id: '2', name: 'David Chen', email: 'david.chen@lawfirm.com', role: 'paralegal' },
  { id: '3', name: 'Emma Johnson', email: 'emma.johnson@lawfirm.com', role: 'admin' },
  { id: '4', name: 'Michael Brown', email: 'michael.brown@lawfirm.com', role: 'receptionist' },
  { id: '5', name: 'Alex Rodriguez', email: 'alex.rodriguez@lawfirm.com', role: 'intern' },
]

const MOCK_ATTEMPTS: TimeEntry[] = [
  { 
    id: '1', 
    caseNumber: 'CASE-2024-001', 
    hours: 3.5, 
    description: 'Contract review', 
    attemptedBy: 'Sarah Mitchell (Solicitor)', 
    attemptedAt: '2024-08-16 09:15',
    status: 'allowed'
  },
  { 
    id: '2', 
    caseNumber: 'CASE-2024-002', 
    hours: 2.0, 
    description: 'Client consultation', 
    attemptedBy: 'David Chen (Paralegal)', 
    attemptedAt: '2024-08-16 10:30',
    status: 'allowed'
  },
  { 
    id: '3', 
    caseNumber: 'CASE-2024-003', 
    hours: 4.5, 
    description: 'Legal research', 
    attemptedBy: 'Emma Johnson (Admin)', 
    attemptedAt: '2024-08-16 11:00',
    status: 'denied',
    reason: 'Admin role is not authorized to log billable hours'
  },
  { 
    id: '4', 
    caseNumber: 'CASE-2024-004', 
    hours: 1.5, 
    description: 'Document filing', 
    attemptedBy: 'Michael Brown (Receptionist)', 
    attemptedAt: '2024-08-16 13:45',
    status: 'denied',
    reason: 'Receptionist role is not authorized to log billable hours'
  },
  { 
    id: '5', 
    caseNumber: 'CASE-2024-005', 
    hours: 3.0, 
    description: 'Case preparation', 
    attemptedBy: 'Alex Rodriguez (Intern)', 
    attemptedAt: '2024-08-16 14:20',
    status: 'denied',
    reason: 'Intern role is not authorized to log billable hours'
  },
]

export default function UserWhoIs() {
  const [selectedUserId, setSelectedUserId] = useState<string>('')
  const [caseNumber, setCaseNumber] = useState<string>('')
  const [hours, setHours] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [attempts, setAttempts] = useState<TimeEntry[]>(MOCK_ATTEMPTS)
  const [showError, setShowError] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

  const selectedUser = MOCK_USERS.find(u => u.id === selectedUserId)

  const canLogBillableHours = (role: string): boolean => {
    return role === 'solicitor' || role === 'paralegal'
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowError(false)
    setErrorMessage('')

    if (!selectedUserId || !caseNumber || !hours || !description) {
      alert('Please fill in all required fields')
      return
    }

    const hoursNum = parseFloat(hours)
    if (isNaN(hoursNum) || hoursNum <= 0) {
      alert('Please enter a valid number of hours')
      return
    }

    if (!selectedUser) return

    const now = new Date()
    const timestamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`

    if (!canLogBillableHours(selectedUser.role)) {
      // User is not authorized - create denied attempt
      const deniedReason = `${selectedUser.role.charAt(0).toUpperCase() + selectedUser.role.slice(1)} role is not authorized to log billable hours. Only solicitors and paralegals can log billable hours.`
      
      const newAttempt: TimeEntry = {
        id: Date.now().toString(),
        caseNumber,
        hours: hoursNum,
        description,
        attemptedBy: `${selectedUser.name} (${selectedUser.role.charAt(0).toUpperCase() + selectedUser.role.slice(1)})`,
        attemptedAt: timestamp,
        status: 'denied',
        reason: deniedReason,
      }

      setAttempts([newAttempt, ...attempts])
      setShowError(true)
      setErrorMessage(deniedReason)

      // Don't reset form to let user see what they entered
      return
    }

    // User is authorized - create allowed attempt
    const newAttempt: TimeEntry = {
      id: Date.now().toString(),
      caseNumber,
      hours: hoursNum,
      description,
      attemptedBy: `${selectedUser.name} (${selectedUser.role.charAt(0).toUpperCase() + selectedUser.role.slice(1)})`,
      attemptedAt: timestamp,
      status: 'allowed',
    }

    setAttempts([newAttempt, ...attempts])
    
    // Reset form
    setCaseNumber('')
    setHours('')
    setDescription('')
  }

  const getRoleBadgeColor = (role: string): string => {
    if (canLogBillableHours(role)) {
      return 'bg-green-100 text-green-800 border-green-300'
    }
    return 'bg-red-100 text-red-800 border-red-300'
  }

  return (
    <div data-testid="userwhois" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Billable Hours - Role Access Control</h1>
        <p className="text-gray-600 mb-8">
          Only <span className="font-semibold text-green-700">Solicitors</span> and{' '}
          <span className="font-semibold text-green-700">Paralegals</span> can log billable hours
        </p>

        {/* User Selection and Hour Logging Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Log Billable Hours</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="user-select" className="block text-sm font-medium text-gray-700 mb-1">
                Select User *
              </label>
              <select
                id="user-select"
                data-testid="userwhois-user"
                value={selectedUserId}
                onChange={(e) => {
                  setSelectedUserId(e.target.value)
                  setShowError(false)
                  setErrorMessage('')
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">-- Choose a user --</option>
                {MOCK_USERS.map(u => (
                  <option key={u.id} value={u.id}>
                    {u.name} - {u.role.charAt(0).toUpperCase() + u.role.slice(1)} ({u.email})
                  </option>
                ))}
              </select>
            </div>

            {selectedUser && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-gray-900">{selectedUser.name}</div>
                    <div className="text-sm text-gray-500">{selectedUser.email}</div>
                  </div>
                  <div className={`px-3 py-1 rounded-lg border font-semibold text-sm ${getRoleBadgeColor(selectedUser.role)}`}>
                    {selectedUser.role.charAt(0).toUpperCase() + selectedUser.role.slice(1)}
                  </div>
                </div>
                {canLogBillableHours(selectedUser.role) ? (
                  <div className="mt-3 flex items-start">
                    <svg className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-green-700 font-medium">
                      This user is authorized to log billable hours
                    </span>
                  </div>
                ) : (
                  <div className="mt-3 flex items-start">
                    <svg className="w-5 h-5 text-red-600 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-red-700 font-medium">
                      This user is NOT authorized to log billable hours
                    </span>
                  </div>
                )}
              </div>
            )}

            {showError && (
              <div data-testid="userwhois-error" className="bg-red-50 border border-red-300 rounded-lg p-4">
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-red-600 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <div className="font-semibold text-red-900 mb-1">Access Denied</div>
                    <div className="text-sm text-red-800">{errorMessage}</div>
                  </div>
                </div>
              </div>
            )}

            <div>
              <label htmlFor="case-number" className="block text-sm font-medium text-gray-700 mb-1">
                Case Number *
              </label>
              <input
                id="case-number"
                type="text"
                data-testid="userwhois-casenumber"
                value={caseNumber}
                onChange={(e) => setCaseNumber(e.target.value)}
                placeholder="e.g., CASE-2024-001"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="hours-input" className="block text-sm font-medium text-gray-700 mb-1">
                Hours *
              </label>
              <input
                id="hours-input"
                type="number"
                step="0.25"
                min="0"
                data-testid="userwhois-hours"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                placeholder="e.g., 2.5"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="description-input" className="block text-sm font-medium text-gray-700 mb-1">
                Description *
              </label>
              <textarea
                id="description-input"
                data-testid="userwhois-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the work performed..."
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <button
              type="submit"
              data-testid="userwhois-submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Attempt to Log Hours
            </button>
          </form>
        </div>

        {/* Attempt History */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Hour Logging Attempts</h2>
          {attempts.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No attempts logged yet</p>
          ) : (
            <div data-testid="userwhois-list" className="space-y-3">
              {attempts.map(attempt => (
                <div
                  key={attempt.id}
                  data-testid="userwhois-item"
                  className={`border rounded-lg p-4 ${
                    attempt.status === 'allowed' 
                      ? 'border-green-200 bg-green-50' 
                      : 'border-red-200 bg-red-50'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-gray-900">{attempt.caseNumber}</span>
                        <span
                          className={`px-2 py-0.5 text-xs font-semibold rounded ${
                            attempt.status === 'allowed'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {attempt.status === 'allowed' ? 'ALLOWED' : 'DENIED'}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 mb-1">{attempt.description}</div>
                      <div className="text-xs text-gray-500">
                        Attempted by: {attempt.attemptedBy} at {attempt.attemptedAt}
                      </div>
                      {attempt.reason && (
                        <div className="mt-2 text-sm text-red-700 font-medium flex items-start">
                          <svg className="w-4 h-4 mr-1 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          {attempt.reason}
                        </div>
                      )}
                    </div>
                    <div className="text-right ml-4">
                      <div className={`text-lg font-bold ${
                        attempt.status === 'allowed' ? 'text-green-700' : 'text-red-700'
                      }`}>
                        {attempt.hours.toFixed(2)} hrs
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Stats Summary */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="text-sm text-green-600 font-medium mb-1">Allowed Attempts</div>
            <div className="text-3xl font-bold text-green-700">
              {attempts.filter(a => a.status === 'allowed').length}
            </div>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="text-sm text-red-600 font-medium mb-1">Denied Attempts</div>
            <div className="text-3xl font-bold text-red-700">
              {attempts.filter(a => a.status === 'denied').length}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
