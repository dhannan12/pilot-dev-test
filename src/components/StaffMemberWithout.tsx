/**
 * StaffMemberWithout — Access denied view for staff members without admin privileges
 *
 * Features: role-based access control, unauthorized access warning, navigation back, help resources, contact support
 *
 * Ticket: SCRUM-1032 | Branch: proto/SCRUM-1028
 */

import React, { useState } from 'react'

interface AccessAttempt {
  id: string
  timestamp: string
  userName: string
  userRole: string
  attemptedResource: string
  requiredRole: string
}

interface HelpResource {
  id: string
  title: string
  description: string
  url: string
}

interface StaffMember {
  id: string
  name: string
  email: string
  role: string
  department: string
}

const mockAccessAttempts: AccessAttempt[] = [
  {
    id: '1',
    timestamp: '2026-08-17T14:30:00',
    userName: 'Sarah Johnson',
    userRole: 'Staff',
    attemptedResource: 'Admin Dashboard',
    requiredRole: 'Admin'
  },
  {
    id: '2',
    timestamp: '2026-08-17T13:15:00',
    userName: 'Mike Davis',
    userRole: 'Staff',
    attemptedResource: 'User Management',
    requiredRole: 'Admin'
  },
  {
    id: '3',
    timestamp: '2026-08-17T11:45:00',
    userName: 'Emily Chen',
    userRole: 'Staff',
    attemptedResource: 'System Settings',
    requiredRole: 'Admin'
  },
  {
    id: '4',
    timestamp: '2026-08-17T10:20:00',
    userName: 'Tom Wilson',
    userRole: 'Staff',
    attemptedResource: 'Financial Reports',
    requiredRole: 'Admin'
  },
  {
    id: '5',
    timestamp: '2026-08-17T09:00:00',
    userName: 'Lisa Martinez',
    userRole: 'Staff',
    attemptedResource: 'Security Logs',
    requiredRole: 'Admin'
  }
]

const mockHelpResources: HelpResource[] = [
  {
    id: '1',
    title: 'Understanding User Roles',
    description: 'Learn about different role types and their permissions',
    url: '/help/roles'
  },
  {
    id: '2',
    title: 'Request Admin Access',
    description: 'Submit a formal request to upgrade your access level',
    url: '/help/request-access'
  },
  {
    id: '3',
    title: 'Staff Portal Guide',
    description: 'Complete guide to features available to staff members',
    url: '/help/staff-guide'
  },
  {
    id: '4',
    title: 'Contact IT Support',
    description: 'Get help from our IT support team',
    url: '/help/support'
  },
  {
    id: '5',
    title: 'Security Policies',
    description: 'Review our access control and security policies',
    url: '/help/security'
  }
]

const mockCurrentUser: StaffMember = {
  id: '1',
  name: 'Sarah Johnson',
  email: 'sarah.johnson@gymportal.com',
  role: 'Staff',
  department: 'Front Desk'
}

export default function StaffMemberWithout() {
  const [showDetails, setShowDetails] = useState(false)
  const [selectedAttempt, setSelectedAttempt] = useState<AccessAttempt | null>(null)
  const [contactMessage, setContactMessage] = useState('')
  const [showContactForm, setShowContactForm] = useState(false)

  const handleViewDetails = (attempt: AccessAttempt) => {
    setSelectedAttempt(attempt)
    setShowDetails(true)
  }

  const handleCloseDetails = () => {
    setShowDetails(false)
    setSelectedAttempt(null)
  }

  const handleSubmitContact = () => {
    if (contactMessage.trim()) {
      // Mock submission
      alert('Your request has been submitted to the administrator')
      setContactMessage('')
      setShowContactForm(false)
    }
  }

  return (
    <div data-testid="staffmemberwithout" className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Access Denied Header */}
        <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6 mb-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <svg
                className="w-12 h-12 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-red-900 mb-2">
                Access Denied
              </h1>
              <p className="text-red-800 text-lg mb-4">
                You do not have permission to access the admin view.
              </p>
              <div className="bg-white rounded border border-red-200 p-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-semibold text-gray-700">Your Role:</span>
                    <span className="ml-2 text-gray-900">{mockCurrentUser.role}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">Required Role:</span>
                    <span className="ml-2 text-gray-900">Admin</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">Department:</span>
                    <span className="ml-2 text-gray-900">{mockCurrentUser.department}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">User:</span>
                    <span className="ml-2 text-gray-900">{mockCurrentUser.name}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mb-6">
          <button
            data-testid="staffmemberwithout-back"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            ← Back to Dashboard
          </button>
          <button
            data-testid="staffmemberwithout-request-access"
            onClick={() => setShowContactForm(!showContactForm)}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
          >
            Request Admin Access
          </button>
          <button
            data-testid="staffmemberwithout-help"
            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-semibold"
          >
            Help & Support
          </button>
        </div>

        {/* Contact Form */}
        {showContactForm && (
          <div data-testid="staffmemberwithout-contact-form" className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Request Admin Access
            </h2>
            <p className="text-gray-600 mb-4">
              Explain why you need admin access and your request will be reviewed by an administrator.
            </p>
            <textarea
              data-testid="staffmemberwithout-message"
              value={contactMessage}
              onChange={(e) => setContactMessage(e.target.value)}
              placeholder="Enter your reason for requesting admin access..."
              className="w-full border border-gray-300 rounded-lg p-3 mb-4 h-32 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="flex gap-3">
              <button
                data-testid="staffmemberwithout-submit"
                onClick={handleSubmitContact}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Submit Request
              </button>
              <button
                data-testid="staffmemberwithout-cancel"
                onClick={() => {
                  setShowContactForm(false)
                  setContactMessage('')
                }}
                className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Help Resources */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Help Resources
          </h2>
          <div data-testid="staffmemberwithout-resources-list" className="space-y-3">
            {mockHelpResources.map((resource) => (
              <div
                key={resource.id}
                data-testid="staffmemberwithout-resource-item"
                className="flex items-start justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {resource.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {resource.description}
                  </p>
                </div>
                <button
                  data-testid="staffmemberwithout-view-resource"
                  className="ml-4 px-4 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors text-sm font-semibold whitespace-nowrap"
                >
                  View →
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Access Attempts */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Recent Access Attempts
          </h2>
          <p className="text-gray-600 mb-4 text-sm">
            Your recent attempts to access restricted resources are logged for security purposes.
          </p>
          <div data-testid="staffmemberwithout-list" className="space-y-3">
            {mockAccessAttempts.map((attempt) => (
              <div
                key={attempt.id}
                data-testid="staffmemberwithout-item"
                className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">
                        DENIED
                      </span>
                      <span className="text-sm text-gray-500">
                        {new Date(attempt.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-semibold text-gray-700">Resource:</span>
                        <span className="ml-2 text-gray-900">{attempt.attemptedResource}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-700">Required:</span>
                        <span className="ml-2 text-gray-900">{attempt.requiredRole}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-700">User:</span>
                        <span className="ml-2 text-gray-900">{attempt.userName}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-700">Your Role:</span>
                        <span className="ml-2 text-gray-900">{attempt.userRole}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    data-testid="staffmemberwithout-view-details"
                    onClick={() => handleViewDetails(attempt)}
                    className="ml-4 px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors text-sm font-semibold"
                  >
                    Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Details Modal */}
        {showDetails && selectedAttempt && (
          <div
            data-testid="staffmemberwithout-modal"
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  Access Attempt Details
                </h2>
                <button
                  data-testid="staffmemberwithout-close-modal"
                  onClick={handleCloseDetails}
                  className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                >
                  ×
                </button>
              </div>
              <div className="space-y-4">
                <div className="border-b border-gray-200 pb-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Timestamp
                      </label>
                      <p className="text-gray-900">
                        {new Date(selectedAttempt.timestamp).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Status
                      </label>
                      <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">
                        ACCESS DENIED
                      </span>
                    </div>
                  </div>
                </div>
                <div className="border-b border-gray-200 pb-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        User Name
                      </label>
                      <p className="text-gray-900">{selectedAttempt.userName}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        User Role
                      </label>
                      <p className="text-gray-900">{selectedAttempt.userRole}</p>
                    </div>
                  </div>
                </div>
                <div className="border-b border-gray-200 pb-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Attempted Resource
                      </label>
                      <p className="text-gray-900">{selectedAttempt.attemptedResource}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Required Role
                      </label>
                      <p className="text-gray-900">{selectedAttempt.requiredRole}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded p-4">
                  <p className="text-sm text-yellow-800">
                    <strong>Note:</strong> All unauthorized access attempts are logged and monitored for security purposes.
                    If you believe you should have access to this resource, please contact your administrator or submit an access request.
                  </p>
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  data-testid="staffmemberwithout-close"
                  onClick={handleCloseDetails}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
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
