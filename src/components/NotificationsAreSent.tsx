/**
 * NotificationsAreSent — Displays milestones and notifications sent upon completion
 *
 * Features: milestone tracking, notification history, completion status, auto-send alerts, timestamp display
 *
 * Ticket: SCRUM-1261 | Branch: proto/SCRUM-1254
 */

import React, { useState } from 'react'

interface Milestone {
  id: string
  title: string
  description: string
  completed: boolean
  completedAt?: string
}

interface Notification {
  id: string
  milestoneId: string
  recipient: string
  message: string
  sentAt: string
  status: 'sent' | 'pending' | 'failed'
}

const INITIAL_MILESTONES: Milestone[] = [
  {
    id: '1',
    title: 'Complete 10 Addition Problems',
    description: 'Master basic addition with numbers 1-20',
    completed: true,
    completedAt: '2026-08-29T10:30:00Z'
  },
  {
    id: '2',
    title: 'Perfect Score on Subtraction Quiz',
    description: 'Achieve 100% on the subtraction assessment',
    completed: true,
    completedAt: '2026-08-29T14:15:00Z'
  },
  {
    id: '3',
    title: 'Learn Multiplication Tables 1-5',
    description: 'Memorize and practice multiplication basics',
    completed: true,
    completedAt: '2026-08-30T09:00:00Z'
  },
  {
    id: '4',
    title: 'Complete 20 Division Problems',
    description: 'Practice division with single-digit divisors',
    completed: false
  },
  {
    id: '5',
    title: 'Fraction Fundamentals',
    description: 'Understand halves, thirds, and quarters',
    completed: false
  },
  {
    id: '6',
    title: 'Geometry Basics - Shapes',
    description: 'Identify and name common geometric shapes',
    completed: true,
    completedAt: '2026-08-28T16:45:00Z'
  },
  {
    id: '7',
    title: 'Word Problems Master',
    description: 'Solve 15 real-world math word problems',
    completed: false
  }
]

const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: 'n1',
    milestoneId: '1',
    recipient: 'parent@example.com',
    message: 'Congratulations! Your child completed "Complete 10 Addition Problems"',
    sentAt: '2026-08-29T10:31:00Z',
    status: 'sent'
  },
  {
    id: 'n2',
    milestoneId: '2',
    recipient: 'parent@example.com',
    message: 'Amazing! Your child achieved "Perfect Score on Subtraction Quiz"',
    sentAt: '2026-08-29T14:16:00Z',
    status: 'sent'
  },
  {
    id: 'n3',
    milestoneId: '3',
    recipient: 'parent@example.com',
    message: 'Well done! Your child completed "Learn Multiplication Tables 1-5"',
    sentAt: '2026-08-30T09:01:00Z',
    status: 'sent'
  },
  {
    id: 'n4',
    milestoneId: '6',
    recipient: 'parent@example.com',
    message: 'Fantastic! Your child completed "Geometry Basics - Shapes"',
    sentAt: '2026-08-28T16:46:00Z',
    status: 'sent'
  },
  {
    id: 'n5',
    milestoneId: '1',
    recipient: 'teacher@example.com',
    message: 'Student milestone achieved: Complete 10 Addition Problems',
    sentAt: '2026-08-29T10:31:00Z',
    status: 'sent'
  }
]

export default function NotificationsAreSent() {
  const [milestones, setMilestones] = useState<Milestone[]>(INITIAL_MILESTONES)
  const [notifications, setNotifications] = useState<Notification[]>(INITIAL_NOTIFICATIONS)
  const [filterStatus, setFilterStatus] = useState<'all' | 'completed' | 'pending'>('all')

  const completeMilestone = (milestoneId: string) => {
    const milestone = milestones.find(m => m.id === milestoneId)
    if (!milestone || milestone.completed) return

    const now = new Date().toISOString()
    
    // Update milestone
    setMilestones(milestones.map(m =>
      m.id === milestoneId
        ? { ...m, completed: true, completedAt: now }
        : m
    ))

    // Create notifications
    const newNotifications: Notification[] = [
      {
        id: `n${Date.now()}-1`,
        milestoneId,
        recipient: 'parent@example.com',
        message: `Congratulations! Your child completed "${milestone.title}"`,
        sentAt: now,
        status: 'sent'
      },
      {
        id: `n${Date.now()}-2`,
        milestoneId,
        recipient: 'teacher@example.com',
        message: `Student milestone achieved: ${milestone.title}`,
        sentAt: now,
        status: 'sent'
      }
    ]

    setNotifications([...newNotifications, ...notifications])
  }

  const filteredMilestones = milestones.filter(m => {
    if (filterStatus === 'completed') return m.completed
    if (filterStatus === 'pending') return !m.completed
    return true
  })

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div data-testid="notificationsaresent" className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Milestone Notifications
          </h1>
          <p className="text-gray-600">
            Automatic notifications are sent to parents and teachers when milestones are completed
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Milestones Section */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">Milestones</h2>
              <select
                data-testid="notificationsaresent-filter"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as 'all' | 'completed' | 'pending')}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
              </select>
            </div>

            <ul data-testid="notificationsaresent-list" className="space-y-4">
              {filteredMilestones.map(milestone => (
                <li
                  key={milestone.id}
                  data-testid="notificationsaresent-item"
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {milestone.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {milestone.description}
                      </p>
                      {milestone.completed && milestone.completedAt && (
                        <p className="text-xs text-green-600">
                          ✓ Completed: {formatDate(milestone.completedAt)}
                        </p>
                      )}
                    </div>
                    <div className="ml-4">
                      {milestone.completed ? (
                        <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                          Complete
                        </span>
                      ) : (
                        <button
                          data-testid="notificationsaresent-complete"
                          onClick={() => completeMilestone(milestone.id)}
                          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
                        >
                          Mark Complete
                        </button>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {filteredMilestones.length === 0 && (
              <p className="text-center text-gray-500 py-8">
                No milestones found
              </p>
            )}
          </section>

          {/* Notifications Section */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Sent Notifications
              </h2>
              <p className="text-sm text-gray-600">
                {notifications.length} notification{notifications.length !== 1 ? 's' : ''} sent
              </p>
            </div>

            <ul data-testid="notificationsaresent-notification-list" className="space-y-3">
              {notifications.map(notification => {
                const milestone = milestones.find(m => m.id === notification.milestoneId)
                return (
                  <li
                    key={notification.id}
                    data-testid="notificationsaresent-notification-item"
                    className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded-r-lg"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-xs font-medium text-blue-700 uppercase">
                        {notification.status}
                      </span>
                      <span className="text-xs text-gray-500">
                        {formatDate(notification.sentAt)}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-gray-900 mb-1">
                      To: {notification.recipient}
                    </p>
                    <p className="text-sm text-gray-700 mb-2">
                      {notification.message}
                    </p>
                    {milestone && (
                      <p className="text-xs text-gray-500">
                        Related: {milestone.title}
                      </p>
                    )}
                  </li>
                )
              })}
            </ul>

            {notifications.length === 0 && (
              <p className="text-center text-gray-500 py-8">
                No notifications sent yet
              </p>
            )}
          </section>
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 mb-2">
            🔔 How Notifications Work
          </h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Notifications are automatically sent when a milestone is marked complete</li>
            <li>• Parents receive congratulatory messages via email</li>
            <li>• Teachers receive achievement updates for tracking</li>
            <li>• All notifications are logged with timestamps</li>
            <li>• Try clicking "Mark Complete" on a pending milestone to see it in action!</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
