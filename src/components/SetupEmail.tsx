/**
 * SetupEmail — Email notification service configuration for registrations and shift assignments
 *
 * Features: SMTP setup, template management, notification triggers, test email, notification history
 *
 * Ticket: SCRUM-937 | Branch: proto/SCRUM-926
 */

import { useState } from 'react'

interface EmailTemplate {
  id: string
  name: string
  subject: string
  trigger: string
  enabled: boolean
  lastSent?: string
}

interface EmailLog {
  id: string
  recipient: string
  subject: string
  template: string
  status: 'sent' | 'failed' | 'pending'
  timestamp: string
}

const mockTemplates: EmailTemplate[] = [
  {
    id: 'tpl-1',
    name: 'Volunteer Registration Confirmation',
    subject: 'Welcome! Your registration is confirmed',
    trigger: 'volunteer_registration',
    enabled: true,
    lastSent: '2026-08-16 10:30 AM'
  },
  {
    id: 'tpl-2',
    name: 'Shift Assignment Notification',
    subject: 'New shift assigned: {{shift_name}}',
    trigger: 'shift_assigned',
    enabled: true,
    lastSent: '2026-08-16 09:15 AM'
  },
  {
    id: 'tpl-3',
    name: 'Shift Reminder - 24 hours',
    subject: 'Reminder: Shift tomorrow at {{time}}',
    trigger: 'shift_reminder_24h',
    enabled: true,
    lastSent: '2026-08-15 08:00 PM'
  },
  {
    id: 'tpl-4',
    name: 'Shift Cancellation Notice',
    subject: 'Shift cancelled: {{shift_name}}',
    trigger: 'shift_cancelled',
    enabled: false,
    lastSent: '2026-08-14 03:45 PM'
  },
  {
    id: 'tpl-5',
    name: 'Weekly Schedule Summary',
    subject: 'Your shifts for the week of {{week}}',
    trigger: 'weekly_summary',
    enabled: true,
    lastSent: '2026-08-12 06:00 AM'
  }
]

const mockEmailLogs: EmailLog[] = [
  {
    id: 'log-1',
    recipient: 'john.smith@example.com',
    subject: 'Welcome! Your registration is confirmed',
    template: 'Volunteer Registration Confirmation',
    status: 'sent',
    timestamp: '2026-08-16 10:30 AM'
  },
  {
    id: 'log-2',
    recipient: 'sarah.johnson@example.com',
    subject: 'New shift assigned: Food Distribution',
    template: 'Shift Assignment Notification',
    status: 'sent',
    timestamp: '2026-08-16 09:15 AM'
  },
  {
    id: 'log-3',
    recipient: 'mike.williams@example.com',
    subject: 'Reminder: Shift tomorrow at 2:00 PM',
    template: 'Shift Reminder - 24 hours',
    status: 'sent',
    timestamp: '2026-08-15 08:00 PM'
  },
  {
    id: 'log-4',
    recipient: 'emily.davis@example.com',
    subject: 'Your shifts for the week of Aug 12-18',
    template: 'Weekly Schedule Summary',
    status: 'sent',
    timestamp: '2026-08-12 06:00 AM'
  },
  {
    id: 'log-5',
    recipient: 'error@invalid.domain',
    subject: 'Welcome! Your registration is confirmed',
    template: 'Volunteer Registration Confirmation',
    status: 'failed',
    timestamp: '2026-08-11 02:15 PM'
  }
]

export default function SetupEmail() {
  const [activeTab, setActiveTab] = useState<'smtp' | 'templates' | 'logs'>('smtp')
  const [smtpHost, setSmtpHost] = useState('smtp.gmail.com')
  const [smtpPort, setSmtpPort] = useState('587')
  const [smtpUser, setSmtpUser] = useState('notifications@volunteer-portal.org')
  const [smtpPassword, setSmtpPassword] = useState('••••••••')
  const [fromEmail, setFromEmail] = useState('notifications@volunteer-portal.org')
  const [fromName, setFromName] = useState('Volunteer Portal')
  const [testEmail, setTestEmail] = useState('')
  const [templates, setTemplates] = useState<EmailTemplate[]>(mockTemplates)
  const [emailLogs] = useState<EmailLog[]>(mockEmailLogs)

  const handleToggleTemplate = (id: string) => {
    setTemplates(templates.map(t => 
      t.id === id ? { ...t, enabled: !t.enabled } : t
    ))
  }

  const handleSendTestEmail = () => {
    if (testEmail) {
      alert(`Test email sent to ${testEmail}`)
      setTestEmail('')
    }
  }

  return (
    <div data-testid="setupemail" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Email Notification Setup</h1>
          <p className="text-gray-600">Configure email service for volunteer registrations and shift assignments</p>
        </header>

        {/* Tab Navigation */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="flex space-x-8" data-testid="setupemail-tabs">
            <button
              data-testid="setupemail-tab-smtp"
              onClick={() => setActiveTab('smtp')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'smtp'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              SMTP Configuration
            </button>
            <button
              data-testid="setupemail-tab-templates"
              onClick={() => setActiveTab('templates')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'templates'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Email Templates
            </button>
            <button
              data-testid="setupemail-tab-logs"
              onClick={() => setActiveTab('logs')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'logs'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Email Logs
            </button>
          </nav>
        </div>

        {/* SMTP Configuration Tab */}
        {activeTab === 'smtp' && (
          <div data-testid="setupemail-smtp-section" className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">SMTP Server Settings</h2>
            
            <div className="space-y-4 mb-8">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    SMTP Host
                  </label>
                  <input
                    data-testid="setupemail-smtp-host"
                    type="text"
                    value={smtpHost}
                    onChange={(e) => setSmtpHost(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    SMTP Port
                  </label>
                  <input
                    data-testid="setupemail-smtp-port"
                    type="text"
                    value={smtpPort}
                    onChange={(e) => setSmtpPort(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  SMTP Username
                </label>
                <input
                  data-testid="setupemail-smtp-user"
                  type="text"
                  value={smtpUser}
                  onChange={(e) => setSmtpUser(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  SMTP Password
                </label>
                <input
                  data-testid="setupemail-smtp-password"
                  type="password"
                  value={smtpPassword}
                  onChange={(e) => setSmtpPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    From Email Address
                  </label>
                  <input
                    data-testid="setupemail-from-email"
                    type="email"
                    value={fromEmail}
                    onChange={(e) => setFromEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    From Name
                  </label>
                  <input
                    data-testid="setupemail-from-name"
                    type="text"
                    value={fromName}
                    onChange={(e) => setFromName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Test Email Connection</h3>
              <div className="flex gap-4">
                <input
                  data-testid="setupemail-test-email"
                  type="email"
                  value={testEmail}
                  onChange={(e) => setTestEmail(e.target.value)}
                  placeholder="Enter email to send test"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  data-testid="setupemail-send-test"
                  onClick={handleSendTestEmail}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Send Test
                </button>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-4">
              <button
                data-testid="setupemail-cancel"
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                data-testid="setupemail-save-smtp"
                className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Save Settings
              </button>
            </div>
          </div>
        )}

        {/* Email Templates Tab */}
        {activeTab === 'templates' && (
          <div data-testid="setupemail-templates-section" className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">Email Templates</h2>
                <button
                  data-testid="setupemail-add-template"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Add Template
                </button>
              </div>
            </div>

            <ul data-testid="setupemail-list" className="divide-y divide-gray-200">
              {templates.map((template) => (
                <li
                  key={template.id}
                  data-testid="setupemail-item"
                  className="p-6 hover:bg-gray-50"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-medium text-gray-900">{template.name}</h3>
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded ${
                            template.enabled
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {template.enabled ? 'Enabled' : 'Disabled'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">
                        <strong>Subject:</strong> {template.subject}
                      </p>
                      <p className="text-sm text-gray-500">
                        <strong>Trigger:</strong> {template.trigger}
                      </p>
                      {template.lastSent && (
                        <p className="text-xs text-gray-400 mt-2">
                          Last sent: {template.lastSent}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button
                        data-testid="setupemail-toggle-template"
                        onClick={() => handleToggleTemplate(template.id)}
                        className={`px-4 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 ${
                          template.enabled
                            ? 'bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-500'
                            : 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500'
                        }`}
                      >
                        {template.enabled ? 'Disable' : 'Enable'}
                      </button>
                      <button
                        data-testid="setupemail-edit-template"
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Email Logs Tab */}
        {activeTab === 'logs' && (
          <div data-testid="setupemail-logs-section" className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Email Notification History</h2>
              <p className="text-sm text-gray-600 mt-1">Recent email notifications sent by the system</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Recipient
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Subject
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Template
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Timestamp
                    </th>
                  </tr>
                </thead>
                <tbody data-testid="setupemail-logs-list" className="bg-white divide-y divide-gray-200">
                  {emailLogs.map((log) => (
                    <tr key={log.id} data-testid="setupemail-log-item" className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {log.recipient}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {log.subject}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {log.template}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded ${
                            log.status === 'sent'
                              ? 'bg-green-100 text-green-800'
                              : log.status === 'failed'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {log.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {log.timestamp}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
