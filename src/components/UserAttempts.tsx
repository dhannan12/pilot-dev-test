/**
 * UserAttempts — Non-admin user attempts to approve an absence request
 *
 * Features: absence request display, approval attempt, permission error handling, user role validation, action feedback
 *
 * Ticket: SCRUM-944 | Branch: proto/SCRUM-938
 */

import { useState } from 'react'

interface AbsenceRequest {
  id: string
  studentName: string
  requestDate: string
  absenceDate: string
  reason: string
  status: 'pending' | 'approved' | 'rejected'
  requestedBy: string
}

interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'teacher' | 'staff' | 'parent'
}

const mockAbsenceRequests: AbsenceRequest[] = [
  {
    id: 'ABS-001',
    studentName: 'Emma Johnson',
    requestDate: '2026-08-10',
    absenceDate: '2026-08-20',
    reason: 'Family vacation',
    status: 'pending',
    requestedBy: 'parent'
  },
  {
    id: 'ABS-002',
    studentName: 'Michael Chen',
    requestDate: '2026-08-12',
    absenceDate: '2026-08-22',
    reason: 'Medical appointment',
    status: 'pending',
    requestedBy: 'parent'
  },
  {
    id: 'ABS-003',
    studentName: 'Sarah Williams',
    requestDate: '2026-08-14',
    absenceDate: '2026-08-25',
    reason: 'College visit',
    status: 'pending',
    requestedBy: 'parent'
  },
  {
    id: 'ABS-004',
    studentName: 'David Martinez',
    requestDate: '2026-08-11',
    absenceDate: '2026-08-21',
    reason: 'Religious observance',
    status: 'pending',
    requestedBy: 'parent'
  },
  {
    id: 'ABS-005',
    studentName: 'Olivia Brown',
    requestDate: '2026-08-13',
    absenceDate: '2026-08-23',
    reason: 'Family emergency',
    status: 'pending',
    requestedBy: 'parent'
  }
]

const mockCurrentUser: User = {
  id: 'USR-123',
  name: 'John Teacher',
  email: 'john.teacher@school.edu',
  role: 'teacher'
}

export default function UserAttempts() {
  const [requests, setRequests] = useState<AbsenceRequest[]>(mockAbsenceRequests)
  const [currentUser] = useState<User>(mockCurrentUser)
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const handleApproveAttempt = (requestId: string) => {
    setSelectedRequest(requestId)
    setSuccessMessage(null)

    // Check if user has admin permissions
    if (currentUser.role !== 'admin') {
      setErrorMessage(
        `Permission denied: Only administrators can approve absence requests. Your role: ${currentUser.role}`
      )
      return
    }

    // If admin (this won't execute with current mock user)
    setRequests(prevRequests =>
      prevRequests.map(req =>
        req.id === requestId ? { ...req, status: 'approved' as const } : req
      )
    )
    setSuccessMessage('Absence request approved successfully')
    setErrorMessage(null)
  }

  const handleRejectAttempt = (requestId: string) => {
    setSelectedRequest(requestId)
    setSuccessMessage(null)

    // Check if user has admin permissions
    if (currentUser.role !== 'admin') {
      setErrorMessage(
        `Permission denied: Only administrators can reject absence requests. Your role: ${currentUser.role}`
      )
      return
    }

    // If admin (this won't execute with current mock user)
    setRequests(prevRequests =>
      prevRequests.map(req =>
        req.id === requestId ? { ...req, status: 'rejected' as const } : req
      )
    )
    setSuccessMessage('Absence request rejected successfully')
    setErrorMessage(null)
  }

  const dismissMessage = () => {
    setErrorMessage(null)
    setSuccessMessage(null)
    setSelectedRequest(null)
  }

  return (
    <div data-testid="userattempts" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Absence Request Management
          </h1>
          <div className="flex items-center gap-4 text-sm">
            <div>
              <span className="text-gray-600">Current User:</span>{' '}
              <span className="font-semibold text-gray-900">{currentUser.name}</span>
            </div>
            <div>
              <span className="text-gray-600">Role:</span>{' '}
              <span
                className={`font-semibold ${
                  currentUser.role === 'admin'
                    ? 'text-green-600'
                    : 'text-yellow-600'
                }`}
              >
                {currentUser.role.toUpperCase()}
              </span>
            </div>
            <div>
              <span className="text-gray-600">Email:</span>{' '}
              <span className="text-gray-900">{currentUser.email}</span>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {errorMessage && (
          <div
            data-testid="userattempts-error"
            className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-lg"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start">
                <svg
                  className="h-6 w-6 text-red-500 mr-3 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <div>
                  <h3 className="text-red-800 font-semibold mb-1">
                    Action Not Permitted
                  </h3>
                  <p className="text-red-700 text-sm">{errorMessage}</p>
                </div>
              </div>
              <button
                data-testid="userattempts-dismiss"
                onClick={dismissMessage}
                className="text-red-500 hover:text-red-700 ml-4"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Success Message */}
        {successMessage && (
          <div
            data-testid="userattempts-success"
            className="bg-green-50 border-l-4 border-green-500 p-4 mb-6 rounded-lg"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start">
                <svg
                  className="h-6 w-6 text-green-500 mr-3 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div>
                  <h3 className="text-green-800 font-semibold mb-1">Success</h3>
                  <p className="text-green-700 text-sm">{successMessage}</p>
                </div>
              </div>
              <button
                data-testid="userattempts-dismiss"
                onClick={dismissMessage}
                className="text-green-500 hover:text-green-700 ml-4"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Absence Requests List */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Pending Absence Requests
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              {requests.filter(r => r.status === 'pending').length} requests awaiting
              review
            </p>
          </div>

          <div data-testid="userattempts-list" className="divide-y divide-gray-200">
            {requests.map(request => (
              <div
                key={request.id}
                data-testid="userattempts-item"
                className={`p-6 hover:bg-gray-50 transition-colors ${
                  selectedRequest === request.id ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {request.studentName}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          request.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : request.status === 'approved'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {request.status.toUpperCase()}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                      <div>
                        <span className="text-gray-600">Request ID:</span>{' '}
                        <span className="font-medium text-gray-900">
                          {request.id}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Requested By:</span>{' '}
                        <span className="font-medium text-gray-900">
                          {request.requestedBy}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Request Date:</span>{' '}
                        <span className="font-medium text-gray-900">
                          {request.requestDate}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Absence Date:</span>{' '}
                        <span className="font-medium text-gray-900">
                          {request.absenceDate}
                        </span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <span className="text-gray-600 text-sm">Reason:</span>
                      <p className="text-gray-900 mt-1">{request.reason}</p>
                    </div>
                  </div>

                  {request.status === 'pending' && (
                    <div className="flex flex-col gap-2 ml-4">
                      <button
                        data-testid="userattempts-approve"
                        onClick={() => handleApproveAttempt(request.id)}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm"
                      >
                        Approve
                      </button>
                      <button
                        data-testid="userattempts-reject"
                        onClick={() => handleRejectAttempt(request.id)}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium text-sm"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start">
            <svg
              className="h-6 w-6 text-blue-500 mr-3 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              <h4 className="text-blue-900 font-semibold mb-1">
                Permission Information
              </h4>
              <p className="text-blue-800 text-sm">
                Only users with the <strong>admin</strong> role can approve or reject
                absence requests. Teachers and staff members can view requests but
                cannot take action on them.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
