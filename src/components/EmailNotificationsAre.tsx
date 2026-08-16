/**
 * EmailNotificationsAre — Displays email notifications sent on insurance claim status changes
 *
 * Features: Status change tracking, email notification log, timestamp display, recipient info, notification templates
 *
 * Ticket: SCRUM-968 | Branch: proto/SCRUM-963
 */

import React, { useState } from 'react'

interface EmailNotification {
  id: string
  claimId: string
  recipient: string
  subject: string
  statusChange: {
    from: string
    to: string
  }
  sentAt: string
  emailContent: string
  delivered: boolean
}

const mockNotifications: EmailNotification[] = [
  {
    id: 'email-001',
    claimId: 'CLM-2024-1001',
    recipient: 'john.smith@email.com',
    subject: 'Your claim has been approved',
    statusChange: {
      from: 'Under Review',
      to: 'Approved'
    },
    sentAt: '2024-08-15T14:30:00Z',
    emailContent: 'Dear John Smith, We are pleased to inform you that your insurance claim CLM-2024-1001 has been approved. The payment will be processed within 3-5 business days.',
    delivered: true
  },
  {
    id: 'email-002',
    claimId: 'CLM-2024-1002',
    recipient: 'sarah.jones@email.com',
    subject: 'Additional information required for your claim',
    statusChange: {
      from: 'Submitted',
      to: 'Pending Information'
    },
    sentAt: '2024-08-15T13:15:00Z',
    emailContent: 'Dear Sarah Jones, We need additional documentation to process your claim CLM-2024-1002. Please upload the requested photos of the vehicle damage.',
    delivered: true
  },
  {
    id: 'email-003',
    claimId: 'CLM-2024-1003',
    recipient: 'mike.brown@email.com',
    subject: 'Your claim is under review',
    statusChange: {
      from: 'Submitted',
      to: 'Under Review'
    },
    sentAt: '2024-08-15T11:45:00Z',
    emailContent: 'Dear Mike Brown, Your insurance claim CLM-2024-1003 is now under review by our claims team. We will contact you within 2 business days with an update.',
    delivered: true
  },
  {
    id: 'email-004',
    claimId: 'CLM-2024-1004',
    recipient: 'emily.davis@email.com',
    subject: 'Your claim has been rejected',
    statusChange: {
      from: 'Under Review',
      to: 'Rejected'
    },
    sentAt: '2024-08-15T10:20:00Z',
    emailContent: 'Dear Emily Davis, Unfortunately, your claim CLM-2024-1004 has been rejected due to policy exclusions. Please review the detailed explanation in your account portal.',
    delivered: true
  },
  {
    id: 'email-005',
    claimId: 'CLM-2024-1005',
    recipient: 'david.wilson@email.com',
    subject: 'Payment processed for your claim',
    statusChange: {
      from: 'Approved',
      to: 'Paid'
    },
    sentAt: '2024-08-15T09:00:00Z',
    emailContent: 'Dear David Wilson, The payment for your claim CLM-2024-1005 has been processed. You should receive the funds in your account within 1-2 business days.',
    delivered: true
  },
  {
    id: 'email-006',
    claimId: 'CLM-2024-1006',
    recipient: 'lisa.martinez@email.com',
    subject: 'Your claim has been closed',
    statusChange: {
      from: 'Paid',
      to: 'Closed'
    },
    sentAt: '2024-08-14T16:30:00Z',
    emailContent: 'Dear Lisa Martinez, Your claim CLM-2024-1006 has been successfully closed. Thank you for your patience throughout the process.',
    delivered: true
  },
  {
    id: 'email-007',
    claimId: 'CLM-2024-1007',
    recipient: 'robert.taylor@email.com',
    subject: 'Your claim status has been updated',
    statusChange: {
      from: 'Pending Information',
      to: 'Under Review'
    },
    sentAt: '2024-08-14T14:00:00Z',
    emailContent: 'Dear Robert Taylor, Thank you for providing the additional information. Your claim CLM-2024-1007 is now back under review.',
    delivered: true
  }
]

const statusColors: Record<string, string> = {
  'Submitted': 'bg-blue-100 text-blue-800',
  'Under Review': 'bg-yellow-100 text-yellow-800',
  'Pending Information': 'bg-orange-100 text-orange-800',
  'Approved': 'bg-green-100 text-green-800',
  'Rejected': 'bg-red-100 text-red-800',
  'Paid': 'bg-purple-100 text-purple-800',
  'Closed': 'bg-gray-100 text-gray-800'
}

export default function EmailNotificationsAre() {
  const [notifications] = useState<EmailNotification[]>(mockNotifications)
  const [selectedNotification, setSelectedNotification] = useState<EmailNotification | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>('all')

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const filteredNotifications = filterStatus === 'all'
    ? notifications
    : notifications.filter(n => n.statusChange.to === filterStatus)

  const uniqueStatuses = Array.from(new Set(notifications.map(n => n.statusChange.to)))

  return (
    <div data-testid="emailnotificationsare" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Email Notification Center
          </h1>
          <p className="text-gray-600">
            Track all email notifications sent on claim status changes
          </p>
        </div>

        {/* Summary Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm text-gray-500 mb-1">Total Notifications</div>
            <div className="text-2xl font-bold text-gray-900">{notifications.length}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm text-gray-500 mb-1">Delivered</div>
            <div className="text-2xl font-bold text-green-600">
              {notifications.filter(n => n.delivered).length}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm text-gray-500 mb-1">Failed</div>
            <div className="text-2xl font-bold text-red-600">
              {notifications.filter(n => !n.delivered).length}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm text-gray-500 mb-1">Unique Recipients</div>
            <div className="text-2xl font-bold text-blue-600">
              {new Set(notifications.map(n => n.recipient)).size}
            </div>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex items-center gap-4">
            <label htmlFor="status-filter" className="text-sm font-medium text-gray-700">
              Filter by status:
            </label>
            <select
              id="status-filter"
              data-testid="emailnotificationsare-status-filter"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Statuses</option>
              {uniqueStatuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
            <button
              data-testid="emailnotificationsare-refresh"
              className="ml-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Refresh
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Notifications List */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                Email Notifications ({filteredNotifications.length})
              </h2>
            </div>
            <div data-testid="emailnotificationsare-list" className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
              {filteredNotifications.map(notification => (
                <div
                  key={notification.id}
                  data-testid="emailnotificationsare-item"
                  className={`p-4 hover:bg-gray-50 cursor-pointer transition ${
                    selectedNotification?.id === notification.id ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => setSelectedNotification(notification)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 mb-1">
                        {notification.subject}
                      </div>
                      <div className="text-sm text-gray-600 mb-2">
                        To: {notification.recipient}
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${statusColors[notification.statusChange.from] || 'bg-gray-100 text-gray-800'}`}>
                          {notification.statusChange.from}
                        </span>
                        <span className="text-gray-400">→</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${statusColors[notification.statusChange.to] || 'bg-gray-100 text-gray-800'}`}>
                          {notification.statusChange.to}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500">
                        {formatDate(notification.sentAt)}
                      </div>
                    </div>
                    <div className="ml-4">
                      {notification.delivered ? (
                        <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                          ✓ Delivered
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded">
                          ✗ Failed
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">
                    Claim ID: {notification.claimId}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Email Preview */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Email Preview</h2>
            </div>
            <div className="p-6">
              {selectedNotification ? (
                <div data-testid="emailnotificationsare-preview">
                  <div className="mb-6 pb-4 border-b border-gray-200">
                    <div className="mb-3">
                      <div className="text-xs text-gray-500 mb-1">From:</div>
                      <div className="text-sm font-medium">noreply@insuranceportal.com</div>
                    </div>
                    <div className="mb-3">
                      <div className="text-xs text-gray-500 mb-1">To:</div>
                      <div className="text-sm font-medium">{selectedNotification.recipient}</div>
                    </div>
                    <div className="mb-3">
                      <div className="text-xs text-gray-500 mb-1">Subject:</div>
                      <div className="text-sm font-medium">{selectedNotification.subject}</div>
                    </div>
                    <div className="mb-3">
                      <div className="text-xs text-gray-500 mb-1">Date:</div>
                      <div className="text-sm">{formatDate(selectedNotification.sentAt)}</div>
                    </div>
                    <div className="mb-3">
                      <div className="text-xs text-gray-500 mb-1">Status Change:</div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${statusColors[selectedNotification.statusChange.from]}`}>
                          {selectedNotification.statusChange.from}
                        </span>
                        <span className="text-gray-400">→</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${statusColors[selectedNotification.statusChange.to]}`}>
                          {selectedNotification.statusChange.to}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="prose prose-sm max-w-none">
                    <div className="whitespace-pre-wrap text-sm text-gray-700">
                      {selectedNotification.emailContent}
                    </div>
                  </div>
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <button
                      data-testid="emailnotificationsare-resend"
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition mr-2"
                    >
                      Resend Email
                    </button>
                    <button
                      data-testid="emailnotificationsare-view-claim"
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                    >
                      View Claim
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-2">
                    <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-gray-500">Select a notification to preview</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
