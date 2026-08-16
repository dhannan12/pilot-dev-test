/**
 * UnauthorizedUserAttempts — Displays unauthorized user attempts to submit absence reports
 *
 * Features: unauthorized access blocking, attempt logging, user feedback, security alerts, access denial messages
 *
 * Ticket: SCRUM-940 | Branch: proto/SCRUM-938
 */

import { useState } from 'react'

interface UnauthorizedAttempt {
  id: string
  userId: string
  userName: string
  attemptedAction: string
  timestamp: string
  reason: string
  ipAddress: string
}

const mockAttempts: UnauthorizedAttempt[] = [
  {
    id: '1',
    userId: 'user-001',
    userName: 'John Doe',
    attemptedAction: 'Submit absence report for student Sarah Miller',
    timestamp: '2026-08-16T10:15:00',
    reason: 'Not a parent/guardian of this student',
    ipAddress: '192.168.1.101'
  },
  {
    id: '2',
    userId: 'user-002',
    userName: 'Jane Smith',
    attemptedAction: 'Submit absence report for student Michael Chen',
    timestamp: '2026-08-16T09:30:00',
    reason: 'Account not verified',
    ipAddress: '192.168.1.102'
  },
  {
    id: '3',
    userId: 'user-003',
    userName: 'Bob Johnson',
    attemptedAction: 'Submit absence report for student Emma Davis',
    timestamp: '2026-08-16T08:45:00',
    reason: 'No guardian relationship established',
    ipAddress: '192.168.1.103'
  },
  {
    id: '4',
    userId: 'user-004',
    userName: 'Alice Williams',
    attemptedAction: 'Submit absence report for student James Wilson',
    timestamp: '2026-08-16T08:20:00',
    reason: 'Insufficient permissions',
    ipAddress: '192.168.1.104'
  },
  {
    id: '5',
    userId: 'user-005',
    userName: 'Charlie Brown',
    attemptedAction: 'Submit absence report for student Olivia Taylor',
    timestamp: '2026-08-16T07:55:00',
    reason: 'Account suspended',
    ipAddress: '192.168.1.105'
  },
  {
    id: '6',
    userId: 'user-006',
    userName: 'Diana Prince',
    attemptedAction: 'Submit absence report for student Ethan Martinez',
    timestamp: '2026-08-16T07:30:00',
    reason: 'Not authenticated',
    ipAddress: '192.168.1.106'
  }
]

export default function UnauthorizedUserAttempts() {
  const [attempts] = useState<UnauthorizedAttempt[]>(mockAttempts)
  const [showDemoModal, setShowDemoModal] = useState(false)
  const [studentName, setStudentName] = useState('')
  const [reason, setReason] = useState('')

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowDemoModal(true)
  }

  const closeDemoModal = () => {
    setShowDemoModal(false)
    setStudentName('')
    setReason('')
  }

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div data-testid="unauthorizeduserattempts" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Unauthorized Access Attempts
          </h1>
          <p className="text-gray-600">
            Monitor and track unauthorized attempts to submit absence reports
          </p>
        </div>

        {/* Demo Form - Shows how unauthorized submission is blocked */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Try Submitting as Unauthorized User (Demo)
          </h2>
          <form onSubmit={handleDemoSubmit} className="space-y-4">
            <div>
              <label htmlFor="student-name" className="block text-sm font-medium text-gray-700 mb-1">
                Student Name
              </label>
              <input
                id="student-name"
                type="text"
                data-testid="unauthorizeduserattempts-student-name"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Enter student name"
                required
              />
            </div>
            <div>
              <label htmlFor="absence-reason" className="block text-sm font-medium text-gray-700 mb-1">
                Absence Reason
              </label>
              <textarea
                id="absence-reason"
                data-testid="unauthorizeduserattempts-absence-reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Enter absence reason"
                rows={3}
                required
              />
            </div>
            <button
              type="submit"
              data-testid="unauthorizeduserattempts-submit"
              className="w-full bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
            >
              Submit Absence Report (Will Be Blocked)
            </button>
          </form>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-sm font-medium text-gray-600 mb-1">Total Attempts</h3>
            <p className="text-3xl font-bold text-red-600">{attempts.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-sm font-medium text-gray-600 mb-1">Last 24 Hours</h3>
            <p className="text-3xl font-bold text-orange-600">{attempts.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-sm font-medium text-gray-600 mb-1">Unique Users</h3>
            <p className="text-3xl font-bold text-yellow-600">
              {new Set(attempts.map(a => a.userId)).size}
            </p>
          </div>
        </div>

        {/* Attempts List */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Recent Unauthorized Attempts
          </h2>
          <div data-testid="unauthorizeduserattempts-list" className="space-y-4">
            {attempts.map((attempt) => (
              <div
                key={attempt.id}
                data-testid="unauthorizeduserattempts-item"
                className="border border-red-200 rounded-lg p-4 bg-red-50"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-600 text-white">
                        BLOCKED
                      </span>
                      <span className="text-sm font-semibold text-gray-900">
                        {attempt.userName}
                      </span>
                      <span className="text-xs text-gray-500">
                        (ID: {attempt.userId})
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">
                      <span className="font-medium">Attempted Action:</span>{' '}
                      {attempt.attemptedAction}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs text-gray-600">
                      <div>
                        <span className="font-medium">Reason:</span>{' '}
                        <span className="text-red-700">{attempt.reason}</span>
                      </div>
                      <div>
                        <span className="font-medium">Time:</span>{' '}
                        {formatTimestamp(attempt.timestamp)}
                      </div>
                      <div>
                        <span className="font-medium">IP:</span>{' '}
                        {attempt.ipAddress}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Demo Modal - Access Denied */}
      {showDemoModal && (
        <div
          data-testid="unauthorizeduserattempts-modal"
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        >
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="text-center mb-4">
              <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h3>
              <p className="text-red-600 font-semibold mb-4">Unauthorized Submission Attempt Blocked</p>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-left">
                <p className="text-sm text-gray-700 mb-2">
                  <span className="font-semibold">Reason:</span> You do not have permission to submit absence reports for this student.
                </p>
                <p className="text-sm text-gray-700 mb-2">
                  <span className="font-semibold">Student:</span> {studentName || 'N/A'}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Action:</span> This attempt has been logged for security purposes.
                </p>
              </div>
            </div>
            <div className="mt-6">
              <button
                data-testid="unauthorizeduserattempts-close"
                onClick={closeDemoModal}
                className="w-full bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
