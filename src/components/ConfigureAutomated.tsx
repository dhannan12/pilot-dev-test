/**
 * ConfigureAutomated — Configure automated email notification service
 *
 * Features: Email trigger setup, template selection, recipient management, scheduling, preview
 *
 * Ticket: SCRUM-891 | Branch: proto/SCRUM-879
 */

import { useState } from 'react'

interface EmailTemplate {
  id: string
  name: string
  subject: string
  category: string
}

interface EmailTrigger {
  id: string
  name: string
  description: string
  enabled: boolean
}

interface RecipientGroup {
  id: string
  name: string
  count: number
}

const mockTemplates: EmailTemplate[] = [
  { id: 't1', name: 'Welcome Email', subject: 'Welcome to the Team!', category: 'Onboarding' },
  { id: 't2', name: 'Task Assignment', subject: 'New Task Assigned', category: 'Workflow' },
  { id: 't3', name: 'Deadline Reminder', subject: 'Upcoming Deadline', category: 'Reminders' },
  { id: 't4', name: 'Completion Notice', subject: 'Task Completed', category: 'Workflow' },
  { id: 't5', name: 'Weekly Summary', subject: 'Your Weekly Summary', category: 'Reports' },
  { id: 't6', name: 'Password Reset', subject: 'Reset Your Password', category: 'Security' },
  { id: 't7', name: 'Account Verification', subject: 'Verify Your Account', category: 'Security' },
]

const mockTriggers: EmailTrigger[] = [
  { id: 'tr1', name: 'New Employee Added', description: 'Send when a new employee is onboarded', enabled: true },
  { id: 'tr2', name: 'Task Assigned', description: 'Send when a task is assigned to someone', enabled: true },
  { id: 'tr3', name: 'Deadline Approaching', description: 'Send 24 hours before deadline', enabled: true },
  { id: 'tr4', name: 'Task Completed', description: 'Send when task status changes to complete', enabled: false },
  { id: 'tr5', name: 'Weekly Schedule', description: 'Send every Monday at 9 AM', enabled: true },
  { id: 'tr6', name: 'Password Expiry', description: 'Send 7 days before password expires', enabled: false },
]

const mockRecipients: RecipientGroup[] = [
  { id: 'r1', name: 'All Employees', count: 145 },
  { id: 'r2', name: 'Department Managers', count: 12 },
  { id: 'r3', name: 'HR Team', count: 5 },
  { id: 'r4', name: 'IT Support', count: 8 },
  { id: 'r5', name: 'New Hires', count: 23 },
]

export default function ConfigureAutomated() {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('')
  const [selectedTrigger, setSelectedTrigger] = useState<string>('')
  const [selectedRecipients, setSelectedRecipients] = useState<string[]>([])
  const [emailSubject, setEmailSubject] = useState<string>('')
  const [emailBody, setEmailBody] = useState<string>('')
  const [sendTime, setSendTime] = useState<string>('immediate')
  const [customTime, setCustomTime] = useState<string>('09:00')

  const handleTemplateChange = (templateId: string) => {
    setSelectedTemplate(templateId)
    const template = mockTemplates.find(t => t.id === templateId)
    if (template) {
      setEmailSubject(template.subject)
      setEmailBody(`This is the ${template.name} template content.`)
    }
  }

  const toggleRecipient = (recipientId: string) => {
    setSelectedRecipients(prev =>
      prev.includes(recipientId)
        ? prev.filter(id => id !== recipientId)
        : [...prev, recipientId]
    )
  }

  const handleSave = () => {
    console.log('Saving email configuration:', {
      template: selectedTemplate,
      trigger: selectedTrigger,
      recipients: selectedRecipients,
      subject: emailSubject,
      sendTime,
    })
  }

  const totalRecipients = selectedRecipients.reduce((sum, id) => {
    const group = mockRecipients.find(r => r.id === id)
    return sum + (group?.count || 0)
  }, 0)

  return (
    <div data-testid="configureautomated" className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Configure Automated Email Notifications
          </h1>
          <p className="text-gray-600 mb-8">
            Set up automated email triggers, templates, and recipients
          </p>

          {/* Trigger Selection */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Select Email Trigger
            </label>
            <select
              data-testid="configureautomated-trigger"
              value={selectedTrigger}
              onChange={(e) => setSelectedTrigger(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Choose a trigger event...</option>
              {mockTriggers.map(trigger => (
                <option key={trigger.id} value={trigger.id}>
                  {trigger.name} - {trigger.description}
                </option>
              ))}
            </select>
          </div>

          {/* Active Triggers List */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Active Triggers</h2>
            <div data-testid="configureautomated-trigger-list" className="space-y-2">
              {mockTriggers.map(trigger => (
                <div
                  key={trigger.id}
                  data-testid="configureautomated-trigger-item"
                  className={`p-4 rounded-lg border ${
                    trigger.enabled
                      ? 'bg-green-50 border-green-200'
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">{trigger.name}</h3>
                      <p className="text-sm text-gray-600">{trigger.description}</p>
                    </div>
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${
                        trigger.enabled
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {trigger.enabled ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Template Selection */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Select Email Template
            </label>
            <select
              data-testid="configureautomated-template"
              value={selectedTemplate}
              onChange={(e) => handleTemplateChange(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Choose a template...</option>
              {mockTemplates.map(template => (
                <option key={template.id} value={template.id}>
                  {template.name} ({template.category})
                </option>
              ))}
            </select>
          </div>

          {/* Email Configuration */}
          {selectedTemplate && (
            <div className="mb-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Email Configuration</h2>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject Line
                </label>
                <input
                  type="text"
                  data-testid="configureautomated-subject"
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter email subject..."
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Body
                </label>
                <textarea
                  data-testid="configureautomated-body"
                  value={emailBody}
                  onChange={(e) => setEmailBody(e.target.value)}
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter email body content..."
                />
              </div>
            </div>
          )}

          {/* Recipient Selection */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Select Recipients
              {totalRecipients > 0 && (
                <span className="ml-2 text-sm font-normal text-gray-600">
                  ({totalRecipients} total recipients)
                </span>
              )}
            </h2>
            <div data-testid="configureautomated-recipient-list" className="space-y-2">
              {mockRecipients.map(recipient => (
                <label
                  key={recipient.id}
                  data-testid="configureautomated-recipient-item"
                  className="flex items-center p-4 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    data-testid={`configureautomated-recipient-${recipient.id}`}
                    checked={selectedRecipients.includes(recipient.id)}
                    onChange={() => toggleRecipient(recipient.id)}
                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="ml-4 flex-1">
                    <span className="font-medium text-gray-900">{recipient.name}</span>
                    <span className="ml-2 text-sm text-gray-500">({recipient.count} members)</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Send Time Configuration */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              When to Send
            </label>
            <select
              data-testid="configureautomated-sendtime"
              value={sendTime}
              onChange={(e) => setSendTime(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
            >
              <option value="immediate">Immediately on trigger</option>
              <option value="delayed">Delayed (1 hour after trigger)</option>
              <option value="scheduled">Scheduled time</option>
              <option value="custom">Custom time</option>
            </select>

            {sendTime === 'custom' && (
              <input
                type="time"
                data-testid="configureautomated-customtime"
                value={customTime}
                onChange={(e) => setCustomTime(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            )}
          </div>

          {/* Preview Section */}
          {selectedTemplate && selectedRecipients.length > 0 && (
            <div className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Preview Configuration</h2>
              <div className="space-y-2 text-sm">
                <div className="flex">
                  <span className="font-medium text-gray-700 w-32">Template:</span>
                  <span className="text-gray-600">
                    {mockTemplates.find(t => t.id === selectedTemplate)?.name}
                  </span>
                </div>
                <div className="flex">
                  <span className="font-medium text-gray-700 w-32">Trigger:</span>
                  <span className="text-gray-600">
                    {selectedTrigger
                      ? mockTriggers.find(t => t.id === selectedTrigger)?.name
                      : 'Not selected'}
                  </span>
                </div>
                <div className="flex">
                  <span className="font-medium text-gray-700 w-32">Recipients:</span>
                  <span className="text-gray-600">{totalRecipients} people</span>
                </div>
                <div className="flex">
                  <span className="font-medium text-gray-700 w-32">Send Time:</span>
                  <span className="text-gray-600 capitalize">{sendTime}</span>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              data-testid="configureautomated-save"
              onClick={handleSave}
              disabled={!selectedTemplate || selectedRecipients.length === 0}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              Save Configuration
            </button>
            <button
              data-testid="configureautomated-preview"
              disabled={!selectedTemplate}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
            >
              Preview Email
            </button>
            <button
              data-testid="configureautomated-test"
              disabled={!selectedTemplate || selectedRecipients.length === 0}
              className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              Send Test Email
            </button>
            <button
              data-testid="configureautomated-cancel"
              className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>

        {/* Configuration History */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Configurations</h2>
          <div data-testid="configureautomated-history-list" className="space-y-3">
            {[
              { id: 1, trigger: 'New Employee Added', template: 'Welcome Email', recipients: 23, date: '2026-08-14' },
              { id: 2, trigger: 'Task Assigned', template: 'Task Assignment', recipients: 145, date: '2026-08-13' },
              { id: 3, trigger: 'Deadline Approaching', template: 'Deadline Reminder', recipients: 87, date: '2026-08-12' },
              { id: 4, trigger: 'Weekly Schedule', template: 'Weekly Summary', recipients: 145, date: '2026-08-11' },
              { id: 5, trigger: 'Task Completed', template: 'Completion Notice', recipients: 145, date: '2026-08-10' },
            ].map(config => (
              <div
                key={config.id}
                data-testid="configureautomated-history-item"
                className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:bg-gray-50"
              >
                <div>
                  <h3 className="font-medium text-gray-900">{config.template}</h3>
                  <p className="text-sm text-gray-600">
                    Trigger: {config.trigger} • {config.recipients} recipients
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">{config.date}</p>
                  <button
                    data-testid="configureautomated-edit"
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
