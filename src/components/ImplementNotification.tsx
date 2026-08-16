/**
 * ImplementNotification — Notification and email service management interface
 *
 * Features: notification queue display, email template selection, notification status tracking, delivery analytics, send controls
 *
 * Ticket: SCRUM-950 | Branch: proto/SCRUM-938
 */

import React, { useState } from 'react'

interface Notification {
  id: string
  type: 'email' | 'sms' | 'push'
  recipient: string
  subject: string
  message: string
  status: 'pending' | 'sent' | 'failed' | 'scheduled'
  timestamp: string
  template?: string
}

interface EmailTemplate {
  id: string
  name: string
  subject: string
  body: string
}

const mockNotifications: Notification[] = [
  {
    id: 'N001',
    type: 'email',
    recipient: 'parent@example.com',
    subject: 'Absence Notification',
    message: 'Your child was marked absent today',
    status: 'sent',
    timestamp: '2026-08-16 09:15',
    template: 'absence-alert'
  },
  {
    id: 'N002',
    type: 'sms',
    recipient: '+1234567890',
    subject: 'Reminder',
    message: 'School starts at 8am tomorrow',
    status: 'pending',
    timestamp: '2026-08-16 10:30',
    template: 'general-reminder'
  },
  {
    id: 'N003',
    type: 'email',
    recipient: 'teacher@example.com',
    subject: 'Attendance Report',
    message: 'Daily attendance report attached',
    status: 'sent',
    timestamp: '2026-08-16 08:00',
    template: 'attendance-report'
  },
  {
    id: 'N004',
    type: 'push',
    recipient: 'admin@example.com',
    subject: 'System Alert',
    message: 'Multiple absences detected',
    status: 'failed',
    timestamp: '2026-08-16 11:45',
    template: 'system-alert'
  },
  {
    id: 'N005',
    type: 'email',
    recipient: 'parent2@example.com',
    subject: 'Tardy Notice',
    message: 'Student arrived late to class',
    status: 'scheduled',
    timestamp: '2026-08-16 14:00',
    template: 'tardy-notice'
  },
  {
    id: 'N006',
    type: 'sms',
    recipient: '+9876543210',
    subject: 'Emergency Contact',
    message: 'Please call school immediately',
    status: 'sent',
    timestamp: '2026-08-16 12:20',
    template: 'emergency-contact'
  },
  {
    id: 'N007',
    type: 'email',
    recipient: 'admin2@example.com',
    subject: 'Weekly Summary',
    message: 'Weekly attendance summary ready',
    status: 'pending',
    timestamp: '2026-08-16 15:00',
    template: 'weekly-summary'
  }
]

const mockTemplates: EmailTemplate[] = [
  {
    id: 'T001',
    name: 'Absence Alert',
    subject: 'Student Absence Notification',
    body: 'Dear Parent, your child {student_name} was absent on {date}. Please contact the office if this is an error.'
  },
  {
    id: 'T002',
    name: 'Tardy Notice',
    subject: 'Student Tardy Notice',
    body: 'Your child {student_name} arrived late to school at {time}. Please ensure timely arrival.'
  },
  {
    id: 'T003',
    name: 'Attendance Report',
    subject: 'Daily Attendance Report',
    body: 'Attached is the daily attendance report for {date}. Total present: {present}, Total absent: {absent}.'
  },
  {
    id: 'T004',
    name: 'General Reminder',
    subject: 'School Reminder',
    body: 'This is a reminder about {event_name} on {event_date}. Please make necessary arrangements.'
  },
  {
    id: 'T005',
    name: 'Emergency Contact',
    subject: 'Urgent: Contact Required',
    body: 'This is an urgent message. Please contact the school office at {phone_number} immediately regarding {student_name}.'
  }
]

export default function ImplementNotification() {
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [selectedType, setSelectedType] = useState<string>('all')
  const [selectedTemplate, setSelectedTemplate] = useState<string>('')
  const [recipientEmail, setRecipientEmail] = useState<string>('')
  const [emailSubject, setEmailSubject] = useState<string>('')
  const [emailMessage, setEmailMessage] = useState<string>('')

  const filteredNotifications = mockNotifications.filter(notif => {
    const statusMatch = selectedStatus === 'all' || notif.status === selectedStatus
    const typeMatch = selectedType === 'all' || notif.type === selectedType
    return statusMatch && typeMatch
  })

  const handleSendNotification = () => {
    if (!recipientEmail || !emailSubject || !emailMessage) {
      alert('Please fill in all fields')
      return
    }
    alert(`Notification sent to ${recipientEmail}`)
    // Reset form
    setRecipientEmail('')
    setEmailSubject('')
    setEmailMessage('')
    setSelectedTemplate('')
  }

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId)
    const template = mockTemplates.find(t => t.id === templateId)
    if (template) {
      setEmailSubject(template.subject)
      setEmailMessage(template.body)
    }
  }

  const handleRetryNotification = (notificationId: string) => {
    alert(`Retrying notification ${notificationId}`)
  }

  const statusCounts = {
    sent: mockNotifications.filter(n => n.status === 'sent').length,
    pending: mockNotifications.filter(n => n.status === 'pending').length,
    failed: mockNotifications.filter(n => n.status === 'failed').length,
    scheduled: mockNotifications.filter(n => n.status === 'scheduled').length
  }

  return (
    <div data-testid="implementnotification" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Notification & Email Service
          </h1>
          <p className="text-gray-600">
            Manage and send notifications, emails, and alerts to students and parents
          </p>
        </div>

        {/* Statistics Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-1">Sent</div>
            <div className="text-3xl font-bold text-green-600">{statusCounts.sent}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-1">Pending</div>
            <div className="text-3xl font-bold text-yellow-600">{statusCounts.pending}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-1">Failed</div>
            <div className="text-3xl font-bold text-red-600">{statusCounts.failed}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-1">Scheduled</div>
            <div className="text-3xl font-bold text-blue-600">{statusCounts.scheduled}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Notification Queue */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Notification Queue
              </h2>
              
              {/* Filters */}
              <div className="flex gap-4 mb-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    data-testid="implementnotification-status-filter"
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Status</option>
                    <option value="sent">Sent</option>
                    <option value="pending">Pending</option>
                    <option value="failed">Failed</option>
                    <option value="scheduled">Scheduled</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type
                  </label>
                  <select
                    data-testid="implementnotification-type-filter"
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Types</option>
                    <option value="email">Email</option>
                    <option value="sms">SMS</option>
                    <option value="push">Push</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Notification List */}
            <div data-testid="implementnotification-list" className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
              {filteredNotifications.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                  No notifications found
                </div>
              ) : (
                filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    data-testid="implementnotification-item"
                    className="p-4 hover:bg-gray-50"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`
                            px-2 py-1 text-xs font-semibold rounded-full
                            ${notification.type === 'email' ? 'bg-blue-100 text-blue-800' : ''}
                            ${notification.type === 'sms' ? 'bg-purple-100 text-purple-800' : ''}
                            ${notification.type === 'push' ? 'bg-green-100 text-green-800' : ''}
                          `}>
                            {notification.type.toUpperCase()}
                          </span>
                          <span className={`
                            px-2 py-1 text-xs font-semibold rounded-full
                            ${notification.status === 'sent' ? 'bg-green-100 text-green-800' : ''}
                            ${notification.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                            ${notification.status === 'failed' ? 'bg-red-100 text-red-800' : ''}
                            ${notification.status === 'scheduled' ? 'bg-blue-100 text-blue-800' : ''}
                          `}>
                            {notification.status}
                          </span>
                        </div>
                        <div className="font-semibold text-gray-900 mb-1">
                          {notification.subject}
                        </div>
                        <div className="text-sm text-gray-600 mb-1">
                          To: {notification.recipient}
                        </div>
                        <div className="text-sm text-gray-500 mb-1">
                          {notification.message}
                        </div>
                        <div className="text-xs text-gray-400">
                          {notification.timestamp}
                        </div>
                      </div>
                      {notification.status === 'failed' && (
                        <button
                          data-testid="implementnotification-retry"
                          onClick={() => handleRetryNotification(notification.id)}
                          className="ml-4 px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200"
                        >
                          Retry
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Send New Notification */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                Send New Notification
              </h2>
            </div>
            <div className="p-6">
              {/* Template Selection */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Template
                </label>
                <select
                  data-testid="implementnotification-template"
                  value={selectedTemplate}
                  onChange={(e) => handleTemplateSelect(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a template (optional)</option>
                  {mockTemplates.map((template) => (
                    <option key={template.id} value={template.id}>
                      {template.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Recipient Email */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Recipient Email *
                </label>
                <input
                  data-testid="implementnotification-recipient"
                  type="email"
                  value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                  placeholder="recipient@example.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Subject */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject *
                </label>
                <input
                  data-testid="implementnotification-subject"
                  type="text"
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  placeholder="Email subject"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Message */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message *
                </label>
                <textarea
                  data-testid="implementnotification-message"
                  value={emailMessage}
                  onChange={(e) => setEmailMessage(e.target.value)}
                  placeholder="Email message content"
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  data-testid="implementnotification-send"
                  onClick={handleSendNotification}
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 font-medium"
                >
                  Send Notification
                </button>
                <button
                  data-testid="implementnotification-clear"
                  onClick={() => {
                    setRecipientEmail('')
                    setEmailSubject('')
                    setEmailMessage('')
                    setSelectedTemplate('')
                  }}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 font-medium"
                >
                  Clear
                </button>
              </div>

              {/* Template Preview */}
              {selectedTemplate && (
                <div className="mt-6 p-4 bg-gray-50 rounded-md">
                  <div className="text-sm font-medium text-gray-700 mb-2">
                    Template Variables:
                  </div>
                  <div className="text-xs text-gray-600 space-y-1">
                    <div>• {'{student_name}'} - Student's name</div>
                    <div>• {'{date}'} - Date</div>
                    <div>• {'{time}'} - Time</div>
                    <div>• {'{phone_number}'} - Contact phone</div>
                    <div>• {'{event_name}'} - Event name</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
