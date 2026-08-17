/**
 * SetupEmail — Email notification system for application status changes
 *
 * Features: Template configuration, trigger setup, recipient management, preview mode, notification history
 *
 * Ticket: SCRUM-1002 | Branch: proto/SCRUM-993
 */

import { useState } from 'react'

interface NotificationTemplate {
  id: string
  name: string
  subject: string
  body: string
  trigger: string
  active: boolean
}

interface NotificationHistory {
  id: string
  templateName: string
  recipient: string
  timestamp: string
  status: 'sent' | 'failed' | 'pending'
}

const MOCK_TEMPLATES: NotificationTemplate[] = [
  {
    id: '1',
    name: 'Application Received',
    subject: 'Your application has been received',
    body: 'Dear {candidate_name}, Thank you for applying to {job_title}. We have received your application and will review it shortly.',
    trigger: 'application_submitted',
    active: true
  },
  {
    id: '2',
    name: 'Application Under Review',
    subject: 'Your application is under review',
    body: 'Dear {candidate_name}, Your application for {job_title} is currently being reviewed by our hiring team.',
    trigger: 'review_started',
    active: true
  },
  {
    id: '3',
    name: 'Interview Scheduled',
    subject: 'Interview scheduled for {job_title}',
    body: 'Dear {candidate_name}, We would like to invite you for an interview on {interview_date} at {interview_time}.',
    trigger: 'interview_scheduled',
    active: true
  },
  {
    id: '4',
    name: 'Application Approved',
    subject: 'Congratulations! Your application has been approved',
    body: 'Dear {candidate_name}, We are pleased to inform you that your application for {job_title} has been approved.',
    trigger: 'application_approved',
    active: false
  },
  {
    id: '5',
    name: 'Application Rejected',
    subject: 'Update on your application',
    body: 'Dear {candidate_name}, Thank you for your interest in {job_title}. Unfortunately, we have decided to move forward with other candidates.',
    trigger: 'application_rejected',
    active: false
  }
]

const MOCK_HISTORY: NotificationHistory[] = [
  {
    id: 'h1',
    templateName: 'Application Received',
    recipient: 'john.smith@email.com',
    timestamp: '2026-08-17 10:30:00',
    status: 'sent'
  },
  {
    id: 'h2',
    templateName: 'Application Under Review',
    recipient: 'jane.doe@email.com',
    timestamp: '2026-08-17 09:15:00',
    status: 'sent'
  },
  {
    id: 'h3',
    templateName: 'Interview Scheduled',
    recipient: 'mike.jones@email.com',
    timestamp: '2026-08-17 08:45:00',
    status: 'sent'
  },
  {
    id: 'h4',
    templateName: 'Application Received',
    recipient: 'sarah.wilson@email.com',
    timestamp: '2026-08-17 08:00:00',
    status: 'failed'
  },
  {
    id: 'h5',
    templateName: 'Application Approved',
    recipient: 'david.brown@email.com',
    timestamp: '2026-08-17 07:30:00',
    status: 'pending'
  }
]

export default function SetupEmail() {
  const [templates, setTemplates] = useState<NotificationTemplate[]>(MOCK_TEMPLATES)
  const [selectedTemplate, setSelectedTemplate] = useState<NotificationTemplate | null>(null)
  const [activeTab, setActiveTab] = useState<'templates' | 'history'>('templates')
  const [showPreview, setShowPreview] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    body: '',
    trigger: 'application_submitted'
  })

  const handleTemplateClick = (template: NotificationTemplate) => {
    setSelectedTemplate(template)
    setFormData({
      name: template.name,
      subject: template.subject,
      body: template.body,
      trigger: template.trigger
    })
    setEditMode(true)
  }

  const handleToggleActive = (templateId: string) => {
    setTemplates(templates.map(t => 
      t.id === templateId ? { ...t, active: !t.active } : t
    ))
  }

  const handleSaveTemplate = () => {
    if (selectedTemplate) {
      setTemplates(templates.map(t =>
        t.id === selectedTemplate.id
          ? { ...t, ...formData }
          : t
      ))
    }
    setEditMode(false)
    setSelectedTemplate(null)
    setFormData({ name: '', subject: '', body: '', trigger: 'application_submitted' })
  }

  const handleCancel = () => {
    setEditMode(false)
    setSelectedTemplate(null)
    setFormData({ name: '', subject: '', body: '', trigger: 'application_submitted' })
  }

  const handlePreview = () => {
    setShowPreview(!showPreview)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent':
        return 'text-green-600 bg-green-50'
      case 'failed':
        return 'text-red-600 bg-red-50'
      case 'pending':
        return 'text-yellow-600 bg-yellow-50'
      default:
        return 'text-gray-600 bg-gray-50'
    }
  }

  return (
    <div data-testid="setupemail" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Email Notification System
          </h1>
          <p className="text-gray-600">
            Configure email templates for application status changes
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="flex space-x-8">
            <button
              data-testid="setupemail-templates-tab"
              onClick={() => setActiveTab('templates')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'templates'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Templates
            </button>
            <button
              data-testid="setupemail-history-tab"
              onClick={() => setActiveTab('history')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'history'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Notification History
            </button>
          </nav>
        </div>

        {/* Templates Tab */}
        {activeTab === 'templates' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Template List */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Email Templates</h2>
              <div data-testid="setupemail-list" className="space-y-3">
                {templates.map((template) => (
                  <div
                    key={template.id}
                    data-testid="setupemail-item"
                    className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <button
                          data-testid={`setupemail-select-${template.id}`}
                          onClick={() => handleTemplateClick(template)}
                          className="text-left w-full"
                        >
                          <h3 className="font-semibold text-gray-900 mb-1">
                            {template.name}
                          </h3>
                          <p className="text-sm text-gray-600 mb-2">
                            {template.subject}
                          </p>
                          <span className="inline-block text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                            {template.trigger.replace(/_/g, ' ')}
                          </span>
                        </button>
                      </div>
                      <div className="ml-4">
                        <button
                          data-testid={`setupemail-toggle-${template.id}`}
                          onClick={() => handleToggleActive(template.id)}
                          className={`px-3 py-1 rounded text-xs font-medium ${
                            template.active
                              ? 'bg-green-100 text-green-700'
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {template.active ? 'Active' : 'Inactive'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Template Editor */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">
                {editMode ? 'Edit Template' : 'Template Details'}
              </h2>
              
              {editMode ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Template Name
                    </label>
                    <input
                      data-testid="setupemail-name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Trigger Event
                    </label>
                    <select
                      data-testid="setupemail-trigger"
                      value={formData.trigger}
                      onChange={(e) => setFormData({ ...formData, trigger: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="application_submitted">Application Submitted</option>
                      <option value="review_started">Review Started</option>
                      <option value="interview_scheduled">Interview Scheduled</option>
                      <option value="application_approved">Application Approved</option>
                      <option value="application_rejected">Application Rejected</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Subject
                    </label>
                    <input
                      data-testid="setupemail-subject"
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Body
                    </label>
                    <textarea
                      data-testid="setupemail-body"
                      value={formData.body}
                      onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Use placeholders: {'{candidate_name}'}, {'{job_title}'}, {'{interview_date}'}, {'{interview_time}'}
                    </p>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      data-testid="setupemail-preview"
                      onClick={handlePreview}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 font-medium"
                    >
                      {showPreview ? 'Hide Preview' : 'Show Preview'}
                    </button>
                    <button
                      data-testid="setupemail-save"
                      onClick={handleSaveTemplate}
                      className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
                    >
                      Save Template
                    </button>
                    <button
                      data-testid="setupemail-cancel"
                      onClick={handleCancel}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 font-medium"
                    >
                      Cancel
                    </button>
                  </div>

                  {/* Preview */}
                  {showPreview && (
                    <div data-testid="setupemail-preview-box" className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-md">
                      <h3 className="font-semibold text-sm text-gray-700 mb-2">Preview</h3>
                      <div className="bg-white p-4 rounded border border-gray-200">
                        <p className="text-sm font-semibold mb-2">Subject: {formData.subject}</p>
                        <div className="text-sm text-gray-700 whitespace-pre-wrap">
                          {formData.body}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <p>Select a template to edit</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* History Tab */}
        {activeTab === 'history' && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Notification History</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                        Template
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                        Recipient
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                        Timestamp
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody data-testid="setupemail-history-list">
                    {MOCK_HISTORY.map((item) => (
                      <tr
                        key={item.id}
                        data-testid="setupemail-history-item"
                        className="border-b border-gray-100 hover:bg-gray-50"
                      >
                        <td className="py-3 px-4 text-sm text-gray-900">
                          {item.templateName}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-700">
                          {item.recipient}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">
                          {item.timestamp}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`inline-block px-2 py-1 text-xs font-medium rounded ${getStatusColor(item.status)}`}>
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
