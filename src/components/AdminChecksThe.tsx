/**
 * AdminChecksThe — Admin inbox view for reviewing submitted contact form messages
 *
 * Features: message list, sender details, timestamp display, message status, priority filtering
 *
 * Ticket: SCRUM-833 | Branch: proto/SCRUM-828
 */

import React, { useState } from 'react'

interface Message {
  id: string
  senderName: string
  senderEmail: string
  subject: string
  message: string
  timestamp: string
  status: 'new' | 'read' | 'archived'
  priority: 'low' | 'medium' | 'high'
}

const MOCK_MESSAGES: Message[] = [
  {
    id: 'msg-001',
    senderName: 'Sarah Johnson',
    senderEmail: 'sarah.j@example.com',
    subject: 'Question about product pricing',
    message: 'Hello, I would like to know more about your enterprise pricing plans and volume discounts. Can someone from sales contact me?',
    timestamp: '2026-08-14T09:30:00Z',
    status: 'new',
    priority: 'high'
  },
  {
    id: 'msg-002',
    senderName: 'Michael Chen',
    senderEmail: 'mchen@techcorp.com',
    subject: 'Technical support request',
    message: 'We are experiencing issues with the API integration. The authentication endpoint returns a 401 error consistently.',
    timestamp: '2026-08-14T08:15:00Z',
    status: 'read',
    priority: 'high'
  },
  {
    id: 'msg-003',
    senderName: 'Emily Rodriguez',
    senderEmail: 'emily.r@startup.io',
    subject: 'Partnership opportunity',
    message: 'We are interested in exploring a potential partnership with your company. Would love to schedule a call to discuss mutual benefits.',
    timestamp: '2026-08-13T16:45:00Z',
    status: 'read',
    priority: 'medium'
  },
  {
    id: 'msg-004',
    senderName: 'David Thompson',
    senderEmail: 'david.t@email.com',
    subject: 'Feedback on recent update',
    message: 'Just wanted to share some positive feedback on the latest feature release. The new dashboard is much more intuitive!',
    timestamp: '2026-08-13T14:20:00Z',
    status: 'archived',
    priority: 'low'
  },
  {
    id: 'msg-005',
    senderName: 'Jessica Martinez',
    senderEmail: 'j.martinez@company.com',
    subject: 'Account access issue',
    message: 'I am unable to reset my password. The reset link in the email does not work. Please help me regain access to my account.',
    timestamp: '2026-08-14T10:05:00Z',
    status: 'new',
    priority: 'high'
  },
  {
    id: 'msg-006',
    senderName: 'Robert Kim',
    senderEmail: 'robert.kim@gmail.com',
    subject: 'General inquiry',
    message: 'What are your business hours? I tried calling but got voicemail. Is there a better time to reach someone?',
    timestamp: '2026-08-12T11:30:00Z',
    status: 'archived',
    priority: 'low'
  },
  {
    id: 'msg-007',
    senderName: 'Amanda Foster',
    senderEmail: 'amanda.f@design.studio',
    subject: 'Feature request',
    message: 'It would be great if you could add dark mode support. Many of our team members prefer working in dark mode environments.',
    timestamp: '2026-08-13T13:00:00Z',
    status: 'read',
    priority: 'medium'
  }
]

export default function AdminChecksThe() {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'new' | 'read' | 'archived'>('all')
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)

  const formatTimestamp = (timestamp: string): string => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 60) {
      return `${diffMins}m ago`
    } else if (diffHours < 24) {
      return `${diffHours}h ago`
    } else if (diffDays < 7) {
      return `${diffDays}d ago`
    } else {
      return date.toLocaleDateString()
    }
  }

  const filteredMessages = MOCK_MESSAGES.filter(msg => {
    if (selectedFilter === 'all') return true
    return msg.status === selectedFilter
  })

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800'
      case 'read':
        return 'bg-green-100 text-green-800'
      case 'archived':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: string): string => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'low':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const newCount = MOCK_MESSAGES.filter(m => m.status === 'new').length
  const readCount = MOCK_MESSAGES.filter(m => m.status === 'read').length
  const archivedCount = MOCK_MESSAGES.filter(m => m.status === 'archived').length

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Inbox</h1>
          <p className="text-gray-600">Review and manage submitted contact form messages</p>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-6 py-3 font-medium text-sm ${
                selectedFilter === 'all'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              All Messages ({MOCK_MESSAGES.length})
            </button>
            <button
              onClick={() => setSelectedFilter('new')}
              className={`px-6 py-3 font-medium text-sm ${
                selectedFilter === 'new'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              New ({newCount})
            </button>
            <button
              onClick={() => setSelectedFilter('read')}
              className={`px-6 py-3 font-medium text-sm ${
                selectedFilter === 'read'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Read ({readCount})
            </button>
            <button
              onClick={() => setSelectedFilter('archived')}
              className={`px-6 py-3 font-medium text-sm ${
                selectedFilter === 'archived'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Archived ({archivedCount})
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Message List */}
          <div className="space-y-3">
            {filteredMessages.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <p className="text-gray-500">No messages found</p>
              </div>
            ) : (
              filteredMessages.map(message => (
                <div
                  key={message.id}
                  onClick={() => setSelectedMessage(message)}
                  className={`bg-white rounded-lg shadow p-4 cursor-pointer transition-all hover:shadow-md ${
                    selectedMessage?.id === message.id ? 'ring-2 ring-blue-500' : ''
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{message.subject}</h3>
                      <p className="text-sm text-gray-600">
                        {message.senderName} · {message.senderEmail}
                      </p>
                    </div>
                    <span className="text-xs text-gray-500 ml-2">
                      {formatTimestamp(message.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mb-3 line-clamp-2">{message.message}</p>
                  <div className="flex gap-2">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(message.status)}`}>
                      {message.status.charAt(0).toUpperCase() + message.status.slice(1)}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${getPriorityColor(message.priority)}`}>
                      {message.priority.charAt(0).toUpperCase() + message.priority.slice(1)} Priority
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Message Detail Panel */}
          <div className="lg:sticky lg:top-6 h-fit">
            {selectedMessage ? (
              <div className="bg-white rounded-lg shadow p-6">
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-gray-900">{selectedMessage.subject}</h2>
                    <button
                      onClick={() => setSelectedMessage(null)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="flex gap-2 mb-4">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(selectedMessage.status)}`}>
                      {selectedMessage.status.charAt(0).toUpperCase() + selectedMessage.status.slice(1)}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${getPriorityColor(selectedMessage.priority)}`}>
                      {selectedMessage.priority.charAt(0).toUpperCase() + selectedMessage.priority.slice(1)} Priority
                    </span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4 mb-6">
                  <div className="flex items-center mb-2">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                      {selectedMessage.senderName.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{selectedMessage.senderName}</p>
                      <p className="text-sm text-gray-600">{selectedMessage.senderEmail}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 ml-13">
                    Sent {formatTimestamp(selectedMessage.timestamp)}
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Message</h3>
                  <p className="text-gray-700 leading-relaxed">{selectedMessage.message}</p>
                </div>

                <div className="flex gap-3">
                  <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium transition-colors">
                    Reply
                  </button>
                  <button className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 font-medium transition-colors">
                    Archive
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700 font-medium transition-colors">
                    Mark as Read
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-12 text-center">
                <div className="text-gray-400 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-gray-600 font-medium">Select a message to view details</p>
                <p className="text-sm text-gray-500 mt-2">Click on any message from the list to read and manage it</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
