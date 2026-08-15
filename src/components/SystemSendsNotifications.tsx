/**
 * SystemSendsNotifications — Manages and displays notifications for upcoming court dates
 *
 * Features: notification list, delivery status tracking, schedule management, multi-channel notifications, upcoming court date alerts
 *
 * Ticket: SCRUM-897 | Branch: proto/SCRUM-892
 */

import { useState } from 'react'

interface Notification {
  id: string
  caseNumber: string
  caseName: string
  courtDate: string
  daysUntil: number
  notificationType: 'email' | 'sms' | 'both'
  status: 'pending' | 'sent' | 'failed' | 'scheduled'
  recipientName: string
  recipientContact: string
  sentAt?: string
  scheduledFor: string
  priority: 'high' | 'medium' | 'low'
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 'N001',
    caseNumber: 'CASE-2024-001',
    caseName: 'Smith v. Johnson Construction',
    courtDate: '2026-08-20',
    daysUntil: 5,
    notificationType: 'both',
    status: 'scheduled',
    recipientName: 'John Smith',
    recipientContact: 'john.smith@email.com',
    scheduledFor: '2026-08-18 09:00',
    priority: 'high'
  },
  {
    id: 'N002',
    caseNumber: 'CASE-2024-015',
    caseName: 'Estate of Williams v. County Tax Board',
    courtDate: '2026-08-22',
    daysUntil: 7,
    notificationType: 'email',
    status: 'sent',
    recipientName: 'Mary Williams',
    recipientContact: 'mary.williams@email.com',
    sentAt: '2026-08-15 10:30',
    scheduledFor: '2026-08-15 10:00',
    priority: 'medium'
  },
  {
    id: 'N003',
    caseNumber: 'CASE-2024-032',
    caseName: 'Rodriguez v. Metropolitan Transit Authority',
    courtDate: '2026-08-17',
    daysUntil: 2,
    notificationType: 'sms',
    status: 'sent',
    recipientName: 'Carlos Rodriguez',
    recipientContact: '+1-555-0123',
    sentAt: '2026-08-15 08:15',
    scheduledFor: '2026-08-15 08:00',
    priority: 'high'
  },
  {
    id: 'N004',
    caseNumber: 'CASE-2024-048',
    caseName: 'Thompson & Associates v. City Planning Commission',
    courtDate: '2026-08-25',
    daysUntil: 10,
    notificationType: 'both',
    status: 'pending',
    recipientName: 'Sarah Thompson',
    recipientContact: 'sarah.thompson@email.com',
    scheduledFor: '2026-08-23 09:00',
    priority: 'medium'
  },
  {
    id: 'N005',
    caseNumber: 'CASE-2024-059',
    caseName: 'Chen v. Riverside Medical Center',
    courtDate: '2026-08-16',
    daysUntil: 1,
    notificationType: 'both',
    status: 'failed',
    recipientName: 'David Chen',
    recipientContact: 'invalid-email',
    scheduledFor: '2026-08-15 07:00',
    priority: 'high'
  },
  {
    id: 'N006',
    caseNumber: 'CASE-2024-071',
    caseName: 'Anderson Family Trust v. Property Management LLC',
    courtDate: '2026-08-28',
    daysUntil: 13,
    notificationType: 'email',
    status: 'scheduled',
    recipientName: 'Patricia Anderson',
    recipientContact: 'patricia.anderson@email.com',
    scheduledFor: '2026-08-26 10:00',
    priority: 'low'
  },
  {
    id: 'N007',
    caseNumber: 'CASE-2024-083',
    caseName: 'Martinez v. Insurance Corp of America',
    courtDate: '2026-08-19',
    daysUntil: 4,
    notificationType: 'sms',
    status: 'sent',
    recipientName: 'Miguel Martinez',
    recipientContact: '+1-555-0456',
    sentAt: '2026-08-15 11:00',
    scheduledFor: '2026-08-15 11:00',
    priority: 'high'
  }
]

export default function SystemSendsNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS)
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [filterPriority, setFilterPriority] = useState<string>('all')

  const filteredNotifications = notifications.filter(notification => {
    if (filterStatus !== 'all' && notification.status !== filterStatus) return false
    if (filterPriority !== 'all' && notification.priority !== filterPriority) return false
    return true
  })

  const handleResend = (notificationId: string) => {
    setNotifications(prev =>
      prev.map(n =>
        n.id === notificationId
          ? { ...n, status: 'sent' as const, sentAt: new Date().toISOString().slice(0, 16).replace('T', ' ') }
          : n
      )
    )
  }

  const handleCancel = (notificationId: string) => {
    setNotifications(prev =>
      prev.map(n =>
        n.id === notificationId
          ? { ...n, status: 'pending' as const }
          : n
      )
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent':
        return 'bg-green-100 text-green-800 border-green-300'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      case 'scheduled':
        return 'bg-blue-100 text-blue-800 border-blue-300'
      case 'failed':
        return 'bg-red-100 text-red-800 border-red-300'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 font-semibold'
      case 'medium':
        return 'text-orange-600 font-medium'
      case 'low':
        return 'text-gray-600'
      default:
        return 'text-gray-600'
    }
  }

  const stats = {
    total: notifications.length,
    sent: notifications.filter(n => n.status === 'sent').length,
    scheduled: notifications.filter(n => n.status === 'scheduled').length,
    pending: notifications.filter(n => n.status === 'pending').length,
    failed: notifications.filter(n => n.status === 'failed').length
  }

  return (
    <div data-testid="systemsendsnotifications" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Court Date Notifications
          </h1>
          <p className="text-gray-600">
            Automated notification system for upcoming court dates
          </p>
        </div>

        {/* Statistics Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="text-sm text-gray-600 mb-1">Total Notifications</div>
            <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
          </div>
          <div className="bg-green-50 rounded-lg shadow-sm p-4">
            <div className="text-sm text-green-700 mb-1">Sent</div>
            <div className="text-2xl font-bold text-green-900">{stats.sent}</div>
          </div>
          <div className="bg-blue-50 rounded-lg shadow-sm p-4">
            <div className="text-sm text-blue-700 mb-1">Scheduled</div>
            <div className="text-2xl font-bold text-blue-900">{stats.scheduled}</div>
          </div>
          <div className="bg-yellow-50 rounded-lg shadow-sm p-4">
            <div className="text-sm text-yellow-700 mb-1">Pending</div>
            <div className="text-2xl font-bold text-yellow-900">{stats.pending}</div>
          </div>
          <div className="bg-red-50 rounded-lg shadow-sm p-4">
            <div className="text-sm text-red-700 mb-1">Failed</div>
            <div className="text-2xl font-bold text-red-900">{stats.failed}</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Status
              </label>
              <select
                data-testid="systemsendsnotifications-status-filter"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Statuses</option>
                <option value="sent">Sent</option>
                <option value="scheduled">Scheduled</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>
            </div>
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Priority
              </label>
              <select
                data-testid="systemsendsnotifications-priority-filter"
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Priorities</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Notifications ({filteredNotifications.length})
            </h2>
          </div>
          <div data-testid="systemsendsnotifications-list" className="divide-y divide-gray-200">
            {filteredNotifications.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <p className="text-gray-500">No notifications match the selected filters</p>
              </div>
            ) : (
              filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  data-testid="systemsendsnotifications-item"
                  className="px-6 py-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      {/* Case Info */}
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {notification.caseName}
                        </h3>
                        <span className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(notification.status)}`}>
                          {notification.status.toUpperCase()}
                        </span>
                        <span className={`text-sm uppercase ${getPriorityColor(notification.priority)}`}>
                          {notification.priority} Priority
                        </span>
                      </div>

                      {/* Case Number & Court Date */}
                      <div className="flex flex-wrap gap-4 mb-3 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">Case:</span> {notification.caseNumber}
                        </div>
                        <div>
                          <span className="font-medium">Court Date:</span> {notification.courtDate}
                        </div>
                        <div className={notification.daysUntil <= 3 ? 'text-red-600 font-semibold' : ''}>
                          <span className="font-medium">Days Until:</span> {notification.daysUntil} days
                        </div>
                      </div>

                      {/* Recipient Info */}
                      <div className="flex flex-wrap gap-4 mb-3 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">Recipient:</span> {notification.recipientName}
                        </div>
                        <div>
                          <span className="font-medium">Contact:</span> {notification.recipientContact}
                        </div>
                        <div>
                          <span className="font-medium">Method:</span>{' '}
                          <span className="uppercase">{notification.notificationType}</span>
                        </div>
                      </div>

                      {/* Schedule & Delivery Info */}
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">Scheduled For:</span> {notification.scheduledFor}
                        </div>
                        {notification.sentAt && (
                          <div className="text-green-700">
                            <span className="font-medium">Sent At:</span> {notification.sentAt}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 ml-4">
                      {notification.status === 'failed' && (
                        <button
                          data-testid="systemsendsnotifications-resend"
                          onClick={() => handleResend(notification.id)}
                          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Resend
                        </button>
                      )}
                      {notification.status === 'scheduled' && (
                        <button
                          data-testid="systemsendsnotifications-cancel"
                          onClick={() => handleCancel(notification.id)}
                          className="px-4 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-300 transition-colors"
                        >
                          Cancel
                        </button>
                      )}
                      {notification.status === 'pending' && (
                        <button
                          data-testid="systemsendsnotifications-schedule"
                          onClick={() => handleResend(notification.id)}
                          className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
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
    </div>
  )
}
