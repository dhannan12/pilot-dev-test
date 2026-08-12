/**
 * NotifyMembers — Notification system for members registered to events
 *
 * Features: Event notifications, registration alerts, member messaging, notification history, status tracking
 *
 * Ticket: SCRUM-678 | Branch: proto/SCRUM-674
 */

import React, { useState } from 'react'

interface EventRegistration {
  id: string
  eventName: string
  eventDate: string
  memberName: string
  memberEmail: string
  registeredAt: string
  notificationSent: boolean
  notificationDate?: string
}

interface NotificationMessage {
  id: string
  subject: string
  body: string
  type: 'confirmation' | 'reminder' | 'update' | 'cancellation'
}

const mockRegistrations: EventRegistration[] = [
  {
    id: 'reg-001',
    eventName: 'Annual Tech Conference 2026',
    eventDate: '2026-09-15',
    memberName: 'Alice Johnson',
    memberEmail: 'alice.johnson@example.com',
    registeredAt: '2026-08-01T10:30:00Z',
    notificationSent: true,
    notificationDate: '2026-08-01T10:31:00Z'
  },
  {
    id: 'reg-002',
    eventName: 'Web Development Workshop',
    eventDate: '2026-08-20',
    memberName: 'Bob Smith',
    memberEmail: 'bob.smith@example.com',
    registeredAt: '2026-08-05T14:20:00Z',
    notificationSent: true,
    notificationDate: '2026-08-05T14:21:00Z'
  },
  {
    id: 'reg-003',
    eventName: 'Community Networking Event',
    eventDate: '2026-08-25',
    memberName: 'Carol Williams',
    memberEmail: 'carol.williams@example.com',
    registeredAt: '2026-08-10T09:15:00Z',
    notificationSent: false
  },
  {
    id: 'reg-004',
    eventName: 'Product Launch Celebration',
    eventDate: '2026-09-01',
    memberName: 'David Brown',
    memberEmail: 'david.brown@example.com',
    registeredAt: '2026-08-11T16:45:00Z',
    notificationSent: false
  },
  {
    id: 'reg-005',
    eventName: 'Training Session: Advanced React',
    eventDate: '2026-08-30',
    memberName: 'Emma Davis',
    memberEmail: 'emma.davis@example.com',
    registeredAt: '2026-08-12T11:00:00Z',
    notificationSent: false
  },
  {
    id: 'reg-006',
    eventName: 'Annual Tech Conference 2026',
    eventDate: '2026-09-15',
    memberName: 'Frank Miller',
    memberEmail: 'frank.miller@example.com',
    registeredAt: '2026-08-07T13:30:00Z',
    notificationSent: true,
    notificationDate: '2026-08-07T13:31:00Z'
  },
  {
    id: 'reg-007',
    eventName: 'Charity Fundraiser Gala',
    eventDate: '2026-09-10',
    memberName: 'Grace Wilson',
    memberEmail: 'grace.wilson@example.com',
    registeredAt: '2026-08-08T10:00:00Z',
    notificationSent: true,
    notificationDate: '2026-08-08T10:01:00Z'
  }
]

const mockNotificationTemplates: NotificationMessage[] = [
  {
    id: 'tmpl-001',
    subject: 'Registration Confirmed',
    body: 'Your registration for {{eventName}} on {{eventDate}} has been confirmed. We look forward to seeing you!',
    type: 'confirmation'
  },
  {
    id: 'tmpl-002',
    subject: 'Event Reminder',
    body: 'This is a reminder that {{eventName}} is coming up on {{eventDate}}. Don\'t forget to attend!',
    type: 'reminder'
  },
  {
    id: 'tmpl-003',
    subject: 'Event Update',
    body: 'Important update regarding {{eventName}} scheduled for {{eventDate}}. Please check the latest details.',
    type: 'update'
  },
  {
    id: 'tmpl-004',
    subject: 'Event Cancellation Notice',
    body: 'We regret to inform you that {{eventName}} scheduled for {{eventDate}} has been cancelled.',
    type: 'cancellation'
  },
  {
    id: 'tmpl-005',
    subject: 'Thank You for Registering',
    body: 'Thank you for registering for {{eventName}}! Event details: {{eventDate}}. See you there!',
    type: 'confirmation'
  }
]

export default function NotifyMembers() {
  const [registrations, setRegistrations] = useState<EventRegistration[]>(mockRegistrations)
  const [selectedTemplate, setSelectedTemplate] = useState<NotificationMessage>(mockNotificationTemplates[0])
  const [selectedRegistrations, setSelectedRegistrations] = useState<Set<string>>(new Set())
  const [filterStatus, setFilterStatus] = useState<'all' | 'sent' | 'pending'>('all')

  const filteredRegistrations = registrations.filter(reg => {
    if (filterStatus === 'sent') return reg.notificationSent
    if (filterStatus === 'pending') return !reg.notificationSent
    return true
  })

  const handleSelectRegistration = (id: string) => {
    const newSelected = new Set(selectedRegistrations)
    if (newSelected.has(id)) {
      newSelected.delete(id)
    } else {
      newSelected.add(id)
    }
    setSelectedRegistrations(newSelected)
  }

  const handleSelectAll = () => {
    if (selectedRegistrations.size === filteredRegistrations.filter(r => !r.notificationSent).length) {
      setSelectedRegistrations(new Set())
    } else {
      const pendingIds = filteredRegistrations.filter(r => !r.notificationSent).map(r => r.id)
      setSelectedRegistrations(new Set(pendingIds))
    }
  }

  const handleSendNotifications = () => {
    if (selectedRegistrations.size === 0) return

    const updatedRegistrations = registrations.map(reg => {
      if (selectedRegistrations.has(reg.id)) {
        return {
          ...reg,
          notificationSent: true,
          notificationDate: new Date().toISOString()
        }
      }
      return reg
    })

    setRegistrations(updatedRegistrations)
    setSelectedRegistrations(new Set())
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
  }

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const pendingCount = registrations.filter(r => !r.notificationSent).length
  const sentCount = registrations.filter(r => r.notificationSent).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Notify Members</h1>
          <p className="text-gray-600">Send notifications to members registered for events</p>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-blue-600">{registrations.length}</div>
              <div className="text-sm text-gray-600">Total Registrations</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-600">{sentCount}</div>
              <div className="text-sm text-gray-600">Notifications Sent</div>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-yellow-600">{pendingCount}</div>
              <div className="text-sm text-gray-600">Pending Notifications</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Notification Template Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Notification Template</h2>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Template
                </label>
                <select
                  value={selectedTemplate.id}
                  onChange={(e) => {
                    const template = mockNotificationTemplates.find(t => t.id === e.target.value)
                    if (template) setSelectedTemplate(template)
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {mockNotificationTemplates.map(template => (
                    <option key={template.id} value={template.id}>
                      {template.subject}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <div className="text-sm font-medium text-gray-700 mb-1">Type</div>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                  selectedTemplate.type === 'confirmation' ? 'bg-green-100 text-green-800' :
                  selectedTemplate.type === 'reminder' ? 'bg-blue-100 text-blue-800' :
                  selectedTemplate.type === 'update' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {selectedTemplate.type.toUpperCase()}
                </span>
              </div>

              <div className="mb-4">
                <div className="text-sm font-medium text-gray-700 mb-2">Preview</div>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="font-semibold text-gray-800 mb-2">{selectedTemplate.subject}</div>
                  <div className="text-sm text-gray-600">{selectedTemplate.body}</div>
                </div>
              </div>

              <button
                onClick={handleSendNotifications}
                disabled={selectedRegistrations.size === 0}
                className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
                  selectedRegistrations.size === 0
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                Send to {selectedRegistrations.size} Member{selectedRegistrations.size !== 1 ? 's' : ''}
              </button>
            </div>
          </div>

          {/* Registrations List Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Event Registrations</h2>
                
                {/* Filter Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setFilterStatus('all')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      filterStatus === 'all'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setFilterStatus('sent')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      filterStatus === 'sent'
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Sent
                  </button>
                  <button
                    onClick={() => setFilterStatus('pending')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      filterStatus === 'pending'
                        ? 'bg-yellow-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Pending
                  </button>
                </div>
              </div>

              {filteredRegistrations.filter(r => !r.notificationSent).length > 0 && (
                <div className="mb-4 flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedRegistrations.size === filteredRegistrations.filter(r => !r.notificationSent).length && filteredRegistrations.filter(r => !r.notificationSent).length > 0}
                    onChange={handleSelectAll}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label className="ml-2 text-sm font-medium text-gray-700">
                    Select All Pending
                  </label>
                </div>
              )}

              <div className="space-y-3 max-h-[600px] overflow-y-auto">
                {filteredRegistrations.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    No registrations found for this filter.
                  </div>
                ) : (
                  filteredRegistrations.map(registration => (
                    <div
                      key={registration.id}
                      className={`border rounded-lg p-4 transition-all ${
                        selectedRegistrations.has(registration.id)
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      } ${registration.notificationSent ? 'opacity-75' : ''}`}
                    >
                      <div className="flex items-start gap-3">
                        {!registration.notificationSent && (
                          <input
                            type="checkbox"
                            checked={selectedRegistrations.has(registration.id)}
                            onChange={() => handleSelectRegistration(registration.id)}
                            className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                        )}
                        
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-semibold text-gray-800">{registration.eventName}</h3>
                              <p className="text-sm text-gray-600">Event Date: {formatDate(registration.eventDate)}</p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              registration.notificationSent
                                ? 'bg-green-100 text-green-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {registration.notificationSent ? 'Sent' : 'Pending'}
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                            <div>
                              <span className="text-gray-600">Member:</span>
                              <span className="ml-2 font-medium text-gray-800">{registration.memberName}</span>
                            </div>
                            <div>
                              <span className="text-gray-600">Email:</span>
                              <span className="ml-2 font-medium text-gray-800">{registration.memberEmail}</span>
                            </div>
                            <div>
                              <span className="text-gray-600">Registered:</span>
                              <span className="ml-2 text-gray-800">{formatDateTime(registration.registeredAt)}</span>
                            </div>
                            {registration.notificationSent && registration.notificationDate && (
                              <div>
                                <span className="text-gray-600">Notified:</span>
                                <span className="ml-2 text-gray-800">{formatDateTime(registration.notificationDate)}</span>
                              </div>
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
        </div>
      </div>
    </div>
  )
}
