/**
 * NReceive — Employee notification center for application status updates
 *
 * Features: real-time status notifications, unread badge, notification history, mark as read, filter by type
 *
 * Ticket: SCRUM-1012 | Branch: proto/SCRUM-1005
 */

import { useState } from 'react'

type NotificationType = 'application_update' | 'interview_scheduled' | 'offer_received' | 'document_request' | 'general'
type NotificationStatus = 'unread' | 'read'

interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
  timestamp: string
  status: NotificationStatus
  applicationRef?: string
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 'n001',
    type: 'application_update',
    title: 'Application Status Updated',
    message: 'Your application for Senior Software Engineer has been moved to "Under Review"',
    timestamp: '2026-08-17T10:30:00Z',
    status: 'unread',
    applicationRef: 'APP-2024-001'
  },
  {
    id: 'n002',
    type: 'interview_scheduled',
    title: 'Interview Scheduled',
    message: 'Your technical interview has been scheduled for August 25th at 2:00 PM',
    timestamp: '2026-08-17T09:15:00Z',
    status: 'unread',
    applicationRef: 'APP-2024-001'
  },
  {
    id: 'n003',
    type: 'document_request',
    title: 'Additional Documents Requested',
    message: 'Please upload your updated resume and references for Product Manager position',
    timestamp: '2026-08-16T16:45:00Z',
    status: 'read',
    applicationRef: 'APP-2024-002'
  },
  {
    id: 'n004',
    type: 'application_update',
    title: 'Application Received',
    message: 'We have received your application for Product Manager. You will hear from us within 5 business days',
    timestamp: '2026-08-15T14:20:00Z',
    status: 'read',
    applicationRef: 'APP-2024-002'
  },
  {
    id: 'n005',
    type: 'offer_received',
    title: 'Offer Extended',
    message: 'Congratulations! We would like to extend an offer for the UX Designer position',
    timestamp: '2026-08-14T11:00:00Z',
    status: 'read',
    applicationRef: 'APP-2024-003'
  },
  {
    id: 'n006',
    type: 'general',
    title: 'System Maintenance Scheduled',
    message: 'The application portal will be unavailable on August 20th from 2 AM to 4 AM',
    timestamp: '2026-08-13T08:00:00Z',
    status: 'read'
  },
  {
    id: 'n007',
    type: 'application_update',
    title: 'Application Status Updated',
    message: 'Your application for Data Analyst has been moved to "Shortlisted"',
    timestamp: '2026-08-12T13:30:00Z',
    status: 'read',
    applicationRef: 'APP-2024-004'
  }
]

const getNotificationIcon = (type: NotificationType): string => {
  switch (type) {
    case 'application_update':
      return '📋'
    case 'interview_scheduled':
      return '📅'
    case 'offer_received':
      return '🎉'
    case 'document_request':
      return '📄'
    case 'general':
      return 'ℹ️'
  }
}

const getNotificationColor = (type: NotificationType): string => {
  switch (type) {
    case 'application_update':
      return 'bg-blue-50 border-blue-200'
    case 'interview_scheduled':
      return 'bg-purple-50 border-purple-200'
    case 'offer_received':
      return 'bg-green-50 border-green-200'
    case 'document_request':
      return 'bg-orange-50 border-orange-200'
    case 'general':
      return 'bg-gray-50 border-gray-200'
  }
}

const formatTimestamp = (timestamp: string): string => {
  const date = new Date(timestamp)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 60) {
    return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`
  } else if (diffHours < 24) {
    return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`
  } else if (diffDays < 7) {
    return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`
  } else {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }
}

export default function NReceive() {
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS)
  const [filterType, setFilterType] = useState<NotificationType | 'all'>('all')
  const [showUnreadOnly, setShowUnreadOnly] = useState(false)

  const unreadCount = notifications.filter(n => n.status === 'unread').length

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, status: 'read' as NotificationStatus } : n
    ))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, status: 'read' as NotificationStatus })))
  }

  const filteredNotifications = notifications.filter(n => {
    if (showUnreadOnly && n.status === 'read') return false
    if (filterType !== 'all' && n.type !== filterType) return false
    return true
  })

  return (
    <div data-testid="n-receive" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div data-testid="n-receive-header" className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
              <p className="text-gray-600 mt-1">Stay updated on your application progress</p>
            </div>
            {unreadCount > 0 && (
              <div data-testid="n-receive-unread-badge" className="bg-red-500 text-white px-4 py-2 rounded-full font-semibold">
                {unreadCount} unread
              </div>
            )}
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3 items-center">
            <button
              data-testid="n-receive-filter-all"
              onClick={() => setFilterType('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filterType === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            <button
              data-testid="n-receive-filter-application"
              onClick={() => setFilterType('application_update')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filterType === 'application_update'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Applications
            </button>
            <button
              data-testid="n-receive-filter-interview"
              onClick={() => setFilterType('interview_scheduled')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filterType === 'interview_scheduled'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Interviews
            </button>
            <button
              data-testid="n-receive-filter-offer"
              onClick={() => setFilterType('offer_received')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filterType === 'offer_received'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Offers
            </button>
            <button
              data-testid="n-receive-filter-document"
              onClick={() => setFilterType('document_request')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filterType === 'document_request'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Documents
            </button>
            
            <div className="ml-auto flex gap-3">
              <label data-testid="n-receive-unread-toggle" className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showUnreadOnly}
                  onChange={(e) => setShowUnreadOnly(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  data-testid="n-receive-unread-checkbox"
                />
                <span className="text-sm font-medium text-gray-700">Unread only</span>
              </label>
              
              {unreadCount > 0 && (
                <button
                  data-testid="n-receive-mark-all-read"
                  onClick={markAllAsRead}
                  className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline"
                >
                  Mark all as read
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div data-testid="n-receive-list" className="space-y-3">
          {filteredNotifications.length === 0 ? (
            <div data-testid="n-receive-empty" className="bg-white rounded-lg shadow-sm p-12 text-center">
              <div className="text-6xl mb-4">📭</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No notifications</h3>
              <p className="text-gray-500">
                {showUnreadOnly 
                  ? "You're all caught up! No unread notifications."
                  : "You don't have any notifications yet."}
              </p>
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                data-testid="n-receive-item"
                className={`bg-white rounded-lg shadow-sm border-l-4 ${getNotificationColor(notification.type)} p-5 transition-all hover:shadow-md ${
                  notification.status === 'unread' ? 'bg-blue-50/30' : ''
                }`}
              >
                <div className="flex gap-4">
                  <div className="text-3xl flex-shrink-0">
                    {getNotificationIcon(notification.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="font-semibold text-gray-900 text-lg">
                        {notification.title}
                        {notification.status === 'unread' && (
                          <span className="ml-2 inline-block w-2 h-2 bg-red-500 rounded-full"></span>
                        )}
                      </h3>
                      <span className="text-sm text-gray-500 flex-shrink-0">
                        {formatTimestamp(notification.timestamp)}
                      </span>
                    </div>
                    
                    <p className="text-gray-700 mb-3">{notification.message}</p>
                    
                    <div className="flex items-center justify-between">
                      {notification.applicationRef && (
                        <span className="text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                          {notification.applicationRef}
                        </span>
                      )}
                      
                      {notification.status === 'unread' && (
                        <button
                          data-testid="n-receive-mark-read"
                          onClick={() => markAsRead(notification.id)}
                          className="ml-auto text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline"
                        >
                          Mark as read
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
