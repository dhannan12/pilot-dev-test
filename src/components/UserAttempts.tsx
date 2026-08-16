/**
 * UserAttempts — Non-staff user attempts to access the staff admin view
 *
 * Features: access control simulation, error messaging, redirect notification, user role display, retry prevention
 *
 * Ticket: SCRUM-957 | Branch: proto/SCRUM-951
 */

import { useState } from 'react'

interface AccessAttempt {
  id: string
  username: string
  userRole: 'member' | 'guest' | 'trainer'
  attemptedPage: string
  timestamp: string
  reason: string
  ipAddress: string
}

interface User {
  id: string
  username: string
  role: 'member' | 'guest' | 'trainer'
  email: string
}

const MOCK_ACCESS_ATTEMPTS: AccessAttempt[] = [
  {
    id: '1',
    username: 'john.doe',
    userRole: 'member',
    attemptedPage: '/admin/staff-management',
    timestamp: '2026-08-16 14:23:15',
    reason: 'Insufficient privileges - Staff access required',
    ipAddress: '192.168.1.45'
  },
  {
    id: '2',
    username: 'sarah.smith',
    userRole: 'guest',
    attemptedPage: '/admin/member-reports',
    timestamp: '2026-08-16 13:45:22',
    reason: 'Insufficient privileges - Staff access required',
    ipAddress: '192.168.1.78'
  },
  {
    id: '3',
    username: 'mike.johnson',
    userRole: 'member',
    attemptedPage: '/admin/financial-dashboard',
    timestamp: '2026-08-16 12:10:33',
    reason: 'Insufficient privileges - Staff access required',
    ipAddress: '192.168.1.102'
  },
  {
    id: '4',
    username: 'emily.brown',
    userRole: 'trainer',
    attemptedPage: '/admin/system-settings',
    timestamp: '2026-08-16 11:05:48',
    reason: 'Insufficient privileges - Staff access required',
    ipAddress: '192.168.1.156'
  },
  {
    id: '5',
    username: 'alex.wilson',
    userRole: 'guest',
    attemptedPage: '/admin/user-permissions',
    timestamp: '2026-08-16 10:30:12',
    reason: 'Insufficient privileges - Staff access required',
    ipAddress: '192.168.1.89'
  },
  {
    id: '6',
    username: 'lisa.taylor',
    userRole: 'member',
    attemptedPage: '/admin/audit-logs',
    timestamp: '2026-08-16 09:15:27',
    reason: 'Insufficient privileges - Staff access required',
    ipAddress: '192.168.1.201'
  }
]

const MOCK_CURRENT_USER: User = {
  id: 'user-001',
  username: 'john.doe',
  role: 'member',
  email: 'john.doe@example.com'
}

export default function UserAttempts() {
  const [currentUser] = useState<User>(MOCK_CURRENT_USER)
  const [selectedAttempt, setSelectedAttempt] = useState<AccessAttempt | null>(null)
  const [showAccessDenied, setShowAccessDenied] = useState(false)
  const [attemptedAccess, setAttemptedAccess] = useState(false)

  const handleAttemptAccess = () => {
    // Simulate attempting to access staff admin view
    setAttemptedAccess(true)
    setShowAccessDenied(true)
    
    // Auto-hide the message after 5 seconds
    setTimeout(() => {
      setShowAccessDenied(false)
    }, 5000)
  }

  const handleViewDetails = (attempt: AccessAttempt) => {
    setSelectedAttempt(attempt)
  }

  const handleCloseDetails = () => {
    setSelectedAttempt(null)
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'member':
        return 'bg-blue-100 text-blue-800'
      case 'guest':
        return 'bg-gray-100 text-gray-800'
      case 'trainer':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div data-testid="userattempts" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Access Control Dashboard
          </h1>
          
          {/* Current User Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Current User</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <span className="text-sm text-gray-600">Username:</span>
                <p className="font-medium text-gray-900">{currentUser.username}</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Email:</span>
                <p className="font-medium text-gray-900">{currentUser.email}</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Role:</span>
                <div className="mt-1">
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getRoleBadgeColor(currentUser.role)}`}>
                    {currentUser.role.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Attempt Access Button */}
          <div className="flex items-center justify-between">
            <p className="text-gray-600">
              Try accessing the staff admin panel with your current role
            </p>
            <button
              data-testid="userattempts-access"
              onClick={handleAttemptAccess}
              disabled={attemptedAccess}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                attemptedAccess
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {attemptedAccess ? 'Access Attempted' : 'Attempt Staff Access'}
            </button>
          </div>
        </div>

        {/* Access Denied Alert */}
        {showAccessDenied && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r-lg shadow-md animate-pulse">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="ml-3 flex-1">
                <h3 className="text-lg font-semibold text-red-800">Access Denied</h3>
                <p className="mt-1 text-sm text-red-700">
                  You do not have sufficient privileges to access the Staff Admin Panel. 
                  This area is restricted to staff members only.
                </p>
                <p className="mt-2 text-sm text-red-600 font-medium">
                  Your attempt has been logged. Current role: <span className="font-bold">{currentUser.role.toUpperCase()}</span>
                </p>
              </div>
              <button
                data-testid="userattempts-close-alert"
                onClick={() => setShowAccessDenied(false)}
                className="flex-shrink-0 ml-4 text-red-500 hover:text-red-700"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Access Attempts Log */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Recent Access Attempts
          </h2>
          <p className="text-gray-600 mb-6">
            Log of non-staff users attempting to access restricted admin areas
          </p>

          <div data-testid="userattempts-list" className="space-y-4">
            {MOCK_ACCESS_ATTEMPTS.map((attempt) => (
              <div
                key={attempt.id}
                data-testid="userattempts-item"
                className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {attempt.username}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleBadgeColor(attempt.userRole)}`}>
                        {attempt.userRole.toUpperCase()}
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        DENIED
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-gray-600">Attempted Page:</span>
                        <p className="font-mono text-gray-900">{attempt.attemptedPage}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Timestamp:</span>
                        <p className="text-gray-900">{attempt.timestamp}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">IP Address:</span>
                        <p className="font-mono text-gray-900">{attempt.ipAddress}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Reason:</span>
                        <p className="text-red-600 font-medium">{attempt.reason}</p>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    data-testid="userattempts-view"
                    onClick={() => handleViewDetails(attempt)}
                    className="ml-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Details Modal */}
        {selectedAttempt && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div data-testid="userattempts-modal" className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-2xl font-bold text-gray-900">Access Attempt Details</h3>
                <button
                  data-testid="userattempts-close-modal"
                  onClick={handleCloseDetails}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <span className="font-semibold text-red-800">Access Denied</span>
                  </div>
                  <p className="text-sm text-red-700">{selectedAttempt.reason}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <span className="text-sm text-gray-600 block mb-1">Username</span>
                    <p className="font-semibold text-gray-900">{selectedAttempt.username}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <span className="text-sm text-gray-600 block mb-1">User Role</span>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getRoleBadgeColor(selectedAttempt.userRole)}`}>
                      {selectedAttempt.userRole.toUpperCase()}
                    </span>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <span className="text-sm text-gray-600 block mb-1">Timestamp</span>
                    <p className="font-mono text-sm text-gray-900">{selectedAttempt.timestamp}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <span className="text-sm text-gray-600 block mb-1">IP Address</span>
                    <p className="font-mono text-sm text-gray-900">{selectedAttempt.ipAddress}</p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <span className="text-sm text-gray-600 block mb-1">Attempted Page</span>
                  <p className="font-mono text-sm text-gray-900">{selectedAttempt.attemptedPage}</p>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-900 mb-2">Security Note</h4>
                  <p className="text-sm text-yellow-800">
                    This access attempt has been logged for security purposes. Repeated unauthorized 
                    access attempts may result in account suspension and further investigation.
                  </p>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  data-testid="userattempts-close"
                  onClick={handleCloseDetails}
                  className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
