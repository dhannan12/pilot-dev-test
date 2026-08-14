/**
 * UserWantsTo — Displays the status of submitted messages with visual indicators
 *
 * Features: message tracking, status badges, timestamp display, submission details, status filtering
 *
 * Ticket: SCRUM-835 | Branch: proto/SCRUM-828
 */

import React, { useState } from 'react'

interface MessageStatus {
  id: string
  subject: string
  submittedAt: string
  status: 'pending' | 'received' | 'in_progress' | 'resolved' | 'closed'
  priority: 'low' | 'medium' | 'high'
  category: string
  lastUpdate: string
  assignedTo?: string
}

const MOCK_MESSAGES: MessageStatus[] = [
  {
    id: 'MSG-001',
    subject: 'Issue with login authentication',
    submittedAt: '2026-08-10 14:30:00',
    status: 'in_progress',
    priority: 'high',
    category: 'Technical Support',
    lastUpdate: '2026-08-14 09:15:00',
    assignedTo: 'Sarah Johnson',
  },
  {
    id: 'MSG-002',
    subject: 'Billing inquiry for invoice #12345',
    submittedAt: '2026-08-12 10:45:00',
    status: 'resolved',
    priority: 'medium',
    category: 'Billing',
    lastUpdate: '2026-08-13 16:20:00',
    assignedTo: 'Michael Chen',
  },
  {
    id: 'MSG-003',
    subject: 'Feature request: Dark mode support',
    submittedAt: '2026-08-13 16:20:00',
    status: 'received',
    priority: 'low',
    category: 'Feature Request',
    lastUpdate: '2026-08-13 16:20:00',
  },
  {
    id: 'MSG-004',
    subject: 'Password reset not working',
    submittedAt: '2026-08-14 08:00:00',
    status: 'pending',
    priority: 'high',
    category: 'Technical Support',
    lastUpdate: '2026-08-14 08:00:00',
  },
  {
    id: 'MSG-005',
    subject: 'Account upgrade confirmation',
    submittedAt: '2026-08-11 13:15:00',
    status: 'closed',
    priority: 'medium',
    category: 'Account Management',
    lastUpdate: '2026-08-12 11:30:00',
    assignedTo: 'Emily Rodriguez',
  },
  {
    id: 'MSG-006',
    subject: 'Data export request for GDPR compliance',
    submittedAt: '2026-08-09 11:00:00',
    status: 'in_progress',
    priority: 'high',
    category: 'Privacy & Security',
    lastUpdate: '2026-08-14 10:45:00',
    assignedTo: 'David Kim',
  },
  {
    id: 'MSG-007',
    subject: 'Question about API integration',
    submittedAt: '2026-08-08 15:30:00',
    status: 'resolved',
    priority: 'low',
    category: 'Technical Support',
    lastUpdate: '2026-08-10 14:00:00',
    assignedTo: 'Sarah Johnson',
  },
]

export default function UserWantsTo() {
  const [selectedFilter, setSelectedFilter] = useState<string>('all')

  const getStatusColor = (status: MessageStatus['status']): string => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      received: 'bg-blue-100 text-blue-800 border-blue-300',
      in_progress: 'bg-purple-100 text-purple-800 border-purple-300',
      resolved: 'bg-green-100 text-green-800 border-green-300',
      closed: 'bg-gray-100 text-gray-800 border-gray-300',
    }
    return colors[status]
  }

  const getPriorityColor = (priority: MessageStatus['priority']): string => {
    const colors = {
      low: 'bg-slate-100 text-slate-700',
      medium: 'bg-orange-100 text-orange-700',
      high: 'bg-red-100 text-red-700',
    }
    return colors[priority]
  }

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 60) return `${diffMins} minutes ago`
    if (diffHours < 24) return `${diffHours} hours ago`
    if (diffDays < 7) return `${diffDays} days ago`
    return date.toLocaleDateString()
  }

  const filteredMessages = selectedFilter === 'all' 
    ? MOCK_MESSAGES 
    : MOCK_MESSAGES.filter(msg => msg.status === selectedFilter)

  const statusCounts = {
    all: MOCK_MESSAGES.length,
    pending: MOCK_MESSAGES.filter(m => m.status === 'pending').length,
    received: MOCK_MESSAGES.filter(m => m.status === 'received').length,
    in_progress: MOCK_MESSAGES.filter(m => m.status === 'in_progress').length,
    resolved: MOCK_MESSAGES.filter(m => m.status === 'resolved').length,
    closed: MOCK_MESSAGES.filter(m => m.status === 'closed').length,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Message Status Tracker</h1>
          <p className="text-slate-600">Track the status of your submitted messages and inquiries</p>
        </div>

        {/* Status Filters */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedFilter === 'all'
                  ? 'bg-slate-700 text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All ({statusCounts.all})
            </button>
            <button
              onClick={() => setSelectedFilter('pending')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedFilter === 'pending'
                  ? 'bg-yellow-600 text-white shadow-md'
                  : 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100'
              }`}
            >
              Pending ({statusCounts.pending})
            </button>
            <button
              onClick={() => setSelectedFilter('received')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedFilter === 'received'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
              }`}
            >
              Received ({statusCounts.received})
            </button>
            <button
              onClick={() => setSelectedFilter('in_progress')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedFilter === 'in_progress'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
              }`}
            >
              In Progress ({statusCounts.in_progress})
            </button>
            <button
              onClick={() => setSelectedFilter('resolved')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedFilter === 'resolved'
                  ? 'bg-green-600 text-white shadow-md'
                  : 'bg-green-50 text-green-700 hover:bg-green-100'
              }`}
            >
              Resolved ({statusCounts.resolved})
            </button>
            <button
              onClick={() => setSelectedFilter('closed')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedFilter === 'closed'
                  ? 'bg-gray-600 text-white shadow-md'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            >
              Closed ({statusCounts.closed})
            </button>
          </div>
        </div>

        {/* Messages List */}
        <div className="space-y-4">
          {filteredMessages.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <p className="text-slate-500 text-lg">No messages found with this status</p>
            </div>
          ) : (
            filteredMessages.map((message) => (
              <div
                key={message.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-3">
                      <span className="font-mono text-sm text-slate-500 bg-slate-100 px-2 py-1 rounded">
                        {message.id}
                      </span>
                      <span className={`text-xs font-semibold px-2 py-1 rounded ${getPriorityColor(message.priority)}`}>
                        {message.priority.toUpperCase()}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-slate-800 mb-2">
                      {message.subject}
                    </h3>
                    <div className="flex flex-wrap gap-4 text-sm text-slate-600 mb-3">
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                        {message.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Submitted {formatDate(message.submittedAt)}
                      </span>
                      {message.assignedTo && (
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          Assigned to {message.assignedTo}
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-slate-500">
                      Last updated: {formatDate(message.lastUpdate)}
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold border-2 ${getStatusColor(message.status)}`}>
                      {message.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Summary Footer */}
        <div className="mt-6 bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold text-slate-700">{statusCounts.pending + statusCounts.received}</div>
              <div className="text-sm text-slate-500">Awaiting Response</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600">{statusCounts.in_progress}</div>
              <div className="text-sm text-slate-500">Being Processed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">{statusCounts.resolved + statusCounts.closed}</div>
              <div className="text-sm text-slate-500">Completed</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
