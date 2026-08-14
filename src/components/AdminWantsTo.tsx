/**
 * AdminWantsTo — Admin inbox message management interface
 *
 * Features: message list, status filtering, message preview, bulk actions, search
 *
 * Ticket: SCRUM-834 | Branch: proto/SCRUM-828
 */

import React, { useState } from 'react'

interface Message {
  id: string
  sender: string
  email: string
  subject: string
  preview: string
  timestamp: string
  status: 'unread' | 'read' | 'archived' | 'flagged'
  priority: 'low' | 'normal' | 'high'
}

const MOCK_MESSAGES: Message[] = [
  {
    id: 'msg-001',
    sender: 'John Smith',
    email: 'john.smith@example.com',
    subject: 'Question about pricing',
    preview: 'Hi, I would like to know more about your premium plan pricing and what features are included...',
    timestamp: '2026-08-14 10:30 AM',
    status: 'unread',
    priority: 'high'
  },
  {
    id: 'msg-002',
    sender: 'Sarah Johnson',
    email: 'sarah.j@company.com',
    subject: 'Technical support request',
    preview: 'I am experiencing issues with the login functionality. Every time I try to access my account...',
    timestamp: '2026-08-14 09:15 AM',
    status: 'read',
    priority: 'high'
  },
  {
    id: 'msg-003',
    sender: 'Michael Chen',
    email: 'michael.chen@email.com',
    subject: 'Feature suggestion',
    preview: 'I have been using your product for a few months now and I think it would be great if you could add...',
    timestamp: '2026-08-13 04:20 PM',
    status: 'read',
    priority: 'normal'
  },
  {
    id: 'msg-004',
    sender: 'Emily Davis',
    email: 'emily.davis@mail.com',
    subject: 'Account upgrade inquiry',
    preview: 'Could you please provide information about upgrading my current account to the business tier...',
    timestamp: '2026-08-13 02:45 PM',
    status: 'flagged',
    priority: 'normal'
  },
  {
    id: 'msg-005',
    sender: 'Robert Wilson',
    email: 'r.wilson@domain.com',
    subject: 'Billing question',
    preview: 'I noticed an unexpected charge on my last invoice and would like to get clarification on this...',
    timestamp: '2026-08-13 11:30 AM',
    status: 'archived',
    priority: 'low'
  },
  {
    id: 'msg-006',
    sender: 'Lisa Anderson',
    email: 'lisa.a@example.org',
    subject: 'Partnership opportunity',
    preview: 'We are interested in exploring a potential partnership with your company. We believe our services...',
    timestamp: '2026-08-12 03:15 PM',
    status: 'unread',
    priority: 'normal'
  },
  {
    id: 'msg-007',
    sender: 'David Martinez',
    email: 'david.m@sample.com',
    subject: 'Bug report',
    preview: 'I found a bug in the reporting module. When I try to export data to CSV format, the application...',
    timestamp: '2026-08-12 01:00 PM',
    status: 'read',
    priority: 'high'
  }
]

export default function AdminWantsTo() {
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES)
  const [selectedFilter, setSelectedFilter] = useState<'all' | Message['status']>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedMessages, setSelectedMessages] = useState<Set<string>>(new Set())
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)

  const filteredMessages = messages.filter(msg => {
    const matchesFilter = selectedFilter === 'all' || msg.status === selectedFilter
    const matchesSearch = searchTerm === '' || 
      msg.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.preview.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const handleSelectMessage = (id: string) => {
    const newSelected = new Set(selectedMessages)
    if (newSelected.has(id)) {
      newSelected.delete(id)
    } else {
      newSelected.add(id)
    }
    setSelectedMessages(newSelected)
  }

  const handleSelectAll = () => {
    if (selectedMessages.size === filteredMessages.length) {
      setSelectedMessages(new Set())
    } else {
      setSelectedMessages(new Set(filteredMessages.map(m => m.id)))
    }
  }

  const handleBulkAction = (action: 'read' | 'unread' | 'archive' | 'delete') => {
    if (action === 'delete') {
      setMessages(messages.filter(msg => !selectedMessages.has(msg.id)))
    } else {
      const statusMap: Record<string, Message['status']> = {
        read: 'read',
        unread: 'unread',
        archive: 'archived'
      }
      setMessages(messages.map(msg => 
        selectedMessages.has(msg.id) ? { ...msg, status: statusMap[action] } : msg
      ))
    }
    setSelectedMessages(new Set())
  }

  const handleStatusChange = (id: string, status: Message['status']) => {
    setMessages(messages.map(msg => 
      msg.id === id ? { ...msg, status } : msg
    ))
  }

  const getStatusBadgeColor = (status: Message['status']) => {
    switch (status) {
      case 'unread': return 'bg-blue-100 text-blue-800'
      case 'read': return 'bg-gray-100 text-gray-800'
      case 'archived': return 'bg-green-100 text-green-800'
      case 'flagged': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityBadgeColor = (priority: Message['priority']) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'normal': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const statusCounts = {
    all: messages.length,
    unread: messages.filter(m => m.status === 'unread').length,
    read: messages.filter(m => m.status === 'read').length,
    archived: messages.filter(m => m.status === 'archived').length,
    flagged: messages.filter(m => m.status === 'flagged').length
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Inbox</h1>
          <p className="text-gray-600">Manage and organize incoming messages</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
              <h2 className="font-semibold text-gray-900 mb-3">Filters</h2>
              <div className="space-y-2">
                {(['all', 'unread', 'read', 'flagged', 'archived'] as const).map(filter => (
                  <button
                    key={filter}
                    onClick={() => setSelectedFilter(filter)}
                    className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between transition-colors ${
                      selectedFilter === filter
                        ? 'bg-blue-50 text-blue-700 font-medium'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <span className="capitalize">{filter}</span>
                    <span className="text-sm bg-gray-100 px-2 py-1 rounded-full">
                      {statusCounts[filter]}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {selectedMessage && (
              <div className="bg-white rounded-lg shadow-sm p-4">
                <h2 className="font-semibold text-gray-900 mb-3">Message Details</h2>
                <div className="space-y-3">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">From</div>
                    <div className="font-medium text-gray-900">{selectedMessage.sender}</div>
                    <div className="text-sm text-gray-600">{selectedMessage.email}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Subject</div>
                    <div className="font-medium text-gray-900">{selectedMessage.subject}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Status</div>
                    <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${getStatusBadgeColor(selectedMessage.status)}`}>
                      {selectedMessage.status}
                    </span>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Priority</div>
                    <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${getPriorityBadgeColor(selectedMessage.priority)}`}>
                      {selectedMessage.priority}
                    </span>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Message</div>
                    <div className="text-sm text-gray-700 bg-gray-50 p-3 rounded">
                      {selectedMessage.preview}
                    </div>
                  </div>
                  <div className="pt-2 space-y-2">
                    <select
                      value={selectedMessage.status}
                      onChange={(e) => handleStatusChange(selectedMessage.id, e.target.value as Message['status'])}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="unread">Mark as Unread</option>
                      <option value="read">Mark as Read</option>
                      <option value="flagged">Flag</option>
                      <option value="archived">Archive</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Main content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              {/* Search and bulk actions */}
              <div className="p-4 border-b border-gray-200">
                <div className="flex flex-col sm:flex-row gap-3 mb-3">
                  <input
                    type="text"
                    placeholder="Search messages..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {selectedMessages.size > 0 && (
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm text-gray-600">
                      {selectedMessages.size} selected
                    </span>
                    <button
                      onClick={() => handleBulkAction('read')}
                      className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                    >
                      Mark Read
                    </button>
                    <button
                      onClick={() => handleBulkAction('unread')}
                      className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                    >
                      Mark Unread
                    </button>
                    <button
                      onClick={() => handleBulkAction('archive')}
                      className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors"
                    >
                      Archive
                    </button>
                    <button
                      onClick={() => handleBulkAction('delete')}
                      className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>

              {/* Message list */}
              <div className="divide-y divide-gray-200">
                {/* Select all header */}
                <div className="p-4 bg-gray-50 flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={selectedMessages.size === filteredMessages.length && filteredMessages.length > 0}
                    onChange={handleSelectAll}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    aria-label="Select All"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Select All ({filteredMessages.length})
                  </span>
                </div>

                {filteredMessages.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    No messages found
                  </div>
                ) : (
                  filteredMessages.map(message => (
                    <div
                      key={message.id}
                      className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer ${
                        message.status === 'unread' ? 'bg-blue-50' : ''
                      } ${selectedMessage?.id === message.id ? 'bg-blue-100' : ''}`}
                      onClick={() => setSelectedMessage(message)}
                    >
                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          checked={selectedMessages.has(message.id)}
                          onChange={(e) => {
                            e.stopPropagation()
                            handleSelectMessage(message.id)
                          }}
                          onClick={(e) => e.stopPropagation()}
                          className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <div className="flex-1 min-w-0">
                              <div className={`font-medium text-gray-900 ${message.status === 'unread' ? 'font-bold' : ''}`}>
                                {message.sender}
                              </div>
                              <div className="text-sm text-gray-600">{message.email}</div>
                            </div>
                            <div className="flex items-center gap-2 flex-shrink-0">
                              <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityBadgeColor(message.priority)}`}>
                                {message.priority}
                              </span>
                              <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusBadgeColor(message.status)}`}>
                                {message.status}
                              </span>
                            </div>
                          </div>
                          <div className={`text-sm mb-1 ${message.status === 'unread' ? 'font-semibold text-gray-900' : 'text-gray-900'}`}>
                            {message.subject}
                          </div>
                          <div className="text-sm text-gray-600 truncate">
                            {message.preview}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {message.timestamp}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
