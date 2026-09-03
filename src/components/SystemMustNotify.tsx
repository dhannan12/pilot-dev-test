/**
 * SystemMustNotify — Email notification system for cancelled bookings
 *
 * Features: cancellation email queue, delivery status tracking, notification history, email preview, retry mechanism
 *
 * Ticket: SCRUM-1295 | Branch: proto/SCRUM-1288
 */

import React, { useState } from 'react'

interface EmailNotification {
  id: string
  bookingId: string
  customerName: string
  customerEmail: string
  serviceName: string
  appointmentDate: string
  appointmentTime: string
  cancelledAt: string
  cancelledBy: string
  status: 'pending' | 'sent' | 'failed' | 'retrying'
  sentAt?: string
  failureReason?: string
  retryCount: number
}

const MOCK_NOTIFICATIONS: EmailNotification[] = [
  {
    id: 'notif-001',
    bookingId: 'BK-2026-1045',
    customerName: 'Sarah Johnson',
    customerEmail: 'sarah.johnson@email.com',
    serviceName: 'Haircut & Style',
    appointmentDate: '2026-09-15',
    appointmentTime: '10:00 AM',
    cancelledAt: '2026-09-03 14:23:00',
    cancelledBy: 'Customer',
    status: 'sent',
    sentAt: '2026-09-03 14:23:05',
    retryCount: 0
  },
  {
    id: 'notif-002',
    bookingId: 'BK-2026-1089',
    customerName: 'Michael Chen',
    customerEmail: 'michael.chen@email.com',
    serviceName: 'Color Treatment',
    appointmentDate: '2026-09-18',
    appointmentTime: '2:30 PM',
    cancelledAt: '2026-09-03 15:10:00',
    cancelledBy: 'Salon',
    status: 'pending',
    retryCount: 0
  },
  {
    id: 'notif-003',
    bookingId: 'BK-2026-1102',
    customerName: 'Emily Rodriguez',
    customerEmail: 'emily.rodriguez@email.com',
    serviceName: 'Manicure & Pedicure',
    appointmentDate: '2026-09-12',
    appointmentTime: '11:30 AM',
    cancelledAt: '2026-09-03 13:45:00',
    cancelledBy: 'Customer',
    status: 'failed',
    failureReason: 'Invalid email address',
    retryCount: 2
  },
  {
    id: 'notif-004',
    bookingId: 'BK-2026-1115',
    customerName: 'David Thompson',
    customerEmail: 'david.thompson@email.com',
    serviceName: 'Beard Trim',
    appointmentDate: '2026-09-20',
    appointmentTime: '9:00 AM',
    cancelledAt: '2026-09-03 16:05:00',
    cancelledBy: 'System',
    status: 'retrying',
    failureReason: 'SMTP timeout',
    retryCount: 1
  },
  {
    id: 'notif-005',
    bookingId: 'BK-2026-1128',
    customerName: 'Jessica Williams',
    customerEmail: 'jessica.williams@email.com',
    serviceName: 'Hair Extension',
    appointmentDate: '2026-09-22',
    appointmentTime: '1:00 PM',
    cancelledAt: '2026-09-03 12:30:00',
    cancelledBy: 'Salon',
    status: 'sent',
    sentAt: '2026-09-03 12:30:03',
    retryCount: 0
  },
  {
    id: 'notif-006',
    bookingId: 'BK-2026-1134',
    customerName: 'Robert Martinez',
    customerEmail: 'robert.martinez@email.com',
    serviceName: 'Deep Conditioning',
    appointmentDate: '2026-09-25',
    appointmentTime: '3:30 PM',
    cancelledAt: '2026-09-03 10:15:00',
    cancelledBy: 'Customer',
    status: 'sent',
    sentAt: '2026-09-03 10:15:02',
    retryCount: 0
  },
  {
    id: 'notif-007',
    bookingId: 'BK-2026-1147',
    customerName: 'Amanda Davis',
    customerEmail: 'amanda.davis@email.com',
    serviceName: 'Balayage',
    appointmentDate: '2026-09-28',
    appointmentTime: '11:00 AM',
    cancelledAt: '2026-09-03 17:20:00',
    cancelledBy: 'Salon',
    status: 'pending',
    retryCount: 0
  }
]

export default function SystemMustNotify() {
  const [notifications, setNotifications] = useState<EmailNotification[]>(MOCK_NOTIFICATIONS)
  const [selectedNotification, setSelectedNotification] = useState<EmailNotification | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>('all')

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'failed':
        return 'bg-red-100 text-red-800'
      case 'retrying':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const handleRetry = (id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id
          ? { ...notif, status: 'retrying' as const, retryCount: notif.retryCount + 1 }
          : notif
      )
    )
  }

  const handleResend = (id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id
          ? { ...notif, status: 'sent' as const, sentAt: new Date().toISOString(), retryCount: 0 }
          : notif
      )
    )
  }

  const handleViewDetails = (notification: EmailNotification) => {
    setSelectedNotification(notification)
  }

  const handleClosePreview = () => {
    setSelectedNotification(null)
  }

  const filteredNotifications = filterStatus === 'all'
    ? notifications
    : notifications.filter(n => n.status === filterStatus)

  const statusCounts = {
    total: notifications.length,
    sent: notifications.filter(n => n.status === 'sent').length,
    pending: notifications.filter(n => n.status === 'pending').length,
    failed: notifications.filter(n => n.status === 'failed').length,
    retrying: notifications.filter(n => n.status === 'retrying').length
  }

  return (
    <div data-testid="systemmustnotify" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Cancellation Email Notifications
          </h1>
          <p className="text-gray-600">
            System automatically notifies customers via email when bookings are cancelled
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-5 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="text-2xl font-bold text-gray-900">{statusCounts.total}</div>
            <div className="text-sm text-gray-600">Total Notifications</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="text-2xl font-bold text-green-600">{statusCounts.sent}</div>
            <div className="text-sm text-gray-600">Sent</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="text-2xl font-bold text-yellow-600">{statusCounts.pending}</div>
            <div className="text-sm text-gray-600">Pending</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="text-2xl font-bold text-blue-600">{statusCounts.retrying}</div>
            <div className="text-sm text-gray-600">Retrying</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="text-2xl font-bold text-red-600">{statusCounts.failed}</div>
            <div className="text-sm text-gray-600">Failed</div>
          </div>
        </div>

        {/* Filter */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Status
          </label>
          <select
            id="status-filter"
            data-testid="systemmustnotify-status-filter"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Notifications</option>
            <option value="sent">Sent</option>
            <option value="pending">Pending</option>
            <option value="retrying">Retrying</option>
            <option value="failed">Failed</option>
          </select>
        </div>

        {/* Notifications List */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Email Notification Queue ({filteredNotifications.length})
            </h2>
          </div>

          <div data-testid="systemmustnotify-list" className="divide-y divide-gray-200">
            {filteredNotifications.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                No notifications found for the selected filter
              </div>
            ) : (
              filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  data-testid="systemmustnotify-item"
                  className="p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {notification.customerName}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(notification.status)}`}>
                          {notification.status.toUpperCase()}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                        <div>
                          <span className="text-gray-600">Email:</span>{' '}
                          <span className="text-gray-900 font-medium">{notification.customerEmail}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Booking ID:</span>{' '}
                          <span className="text-gray-900 font-medium">{notification.bookingId}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Service:</span>{' '}
                          <span className="text-gray-900">{notification.serviceName}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Appointment:</span>{' '}
                          <span className="text-gray-900">
                            {notification.appointmentDate} at {notification.appointmentTime}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600">Cancelled At:</span>{' '}
                          <span className="text-gray-900">{notification.cancelledAt}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Cancelled By:</span>{' '}
                          <span className="text-gray-900">{notification.cancelledBy}</span>
                        </div>
                      </div>

                      {notification.sentAt && (
                        <div className="text-sm text-green-600 mb-2">
                          ✓ Email sent at {notification.sentAt}
                        </div>
                      )}

                      {notification.failureReason && (
                        <div className="text-sm text-red-600 mb-2">
                          ✗ Failed: {notification.failureReason} (Retry count: {notification.retryCount})
                        </div>
                      )}

                      {notification.status === 'retrying' && (
                        <div className="text-sm text-blue-600 mb-2">
                          ↻ Retrying delivery... (Attempt {notification.retryCount})
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2 ml-4">
                      <button
                        data-testid="systemmustnotify-view"
                        onClick={() => handleViewDetails(notification)}
                        className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        View Email
                      </button>
                      {(notification.status === 'failed' || notification.status === 'retrying') && (
                        <button
                          data-testid="systemmustnotify-retry"
                          onClick={() => handleRetry(notification.id)}
                          className="px-4 py-2 bg-yellow-600 text-white text-sm rounded-lg hover:bg-yellow-700 transition-colors"
                        >
                          Retry
                        </button>
                      )}
                      {notification.status === 'pending' && (
                        <button
                          data-testid="systemmustnotify-send"
                          onClick={() => handleResend(notification.id)}
                          className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
                        >
                          Send Now
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Email Preview Modal */}
      {selectedNotification && (
        <div 
          data-testid="systemmustnotify-modal"
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-6 z-50"
          onClick={handleClosePreview}
        >
          <div
            className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-gray-900">Email Preview</h2>
              <button
                data-testid="systemmustnotify-close"
                onClick={handleClosePreview}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
              >
                ×
              </button>
            </div>

            <div className="p-6 bg-gray-50">
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                {/* Email Header */}
                <div className="mb-6 pb-4 border-b border-gray-200">
                  <div className="text-sm text-gray-600 mb-1">To: {selectedNotification.customerEmail}</div>
                  <div className="text-sm text-gray-600 mb-1">From: bookings@salon.com</div>
                  <div className="text-sm text-gray-600">Subject: Your Booking Has Been Cancelled</div>
                </div>

                {/* Email Body */}
                <div className="space-y-4">
                  <p className="text-gray-900">Dear {selectedNotification.customerName},</p>

                  <p className="text-gray-900">
                    We regret to inform you that your booking has been cancelled.
                  </p>

                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-2">Booking Details:</h3>
                    <div className="space-y-1 text-sm">
                      <div><span className="font-medium">Booking ID:</span> {selectedNotification.bookingId}</div>
                      <div><span className="font-medium">Service:</span> {selectedNotification.serviceName}</div>
                      <div><span className="font-medium">Date:</span> {selectedNotification.appointmentDate}</div>
                      <div><span className="font-medium">Time:</span> {selectedNotification.appointmentTime}</div>
                      <div><span className="font-medium">Cancelled By:</span> {selectedNotification.cancelledBy}</div>
                      <div><span className="font-medium">Cancelled At:</span> {selectedNotification.cancelledAt}</div>
                    </div>
                  </div>

                  <p className="text-gray-900">
                    If you did not request this cancellation or have any questions, please contact us at (555) 123-4567 or reply to this email.
                  </p>

                  <p className="text-gray-900">
                    We apologize for any inconvenience and look forward to serving you in the future.
                  </p>

                  <p className="text-gray-900">
                    Best regards,<br />
                    The Salon Team
                  </p>
                </div>

                {/* Email Footer */}
                <div className="mt-6 pt-4 border-t border-gray-200 text-xs text-gray-500">
                  <p>This is an automated notification. Please do not reply directly to this email.</p>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end">
              <button
                data-testid="systemmustnotify-close-modal"
                onClick={handleClosePreview}
                className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
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
