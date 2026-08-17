/**
 * SetupEmail — Email notification service configuration and management interface
 *
 * Features: notification templates, SMTP settings, delivery status, template preview, test email
 *
 * Ticket: SCRUM-1040 | Branch: proto/SCRUM-1028
 */

import { useState } from 'react'

interface EmailTemplate {
  id: string
  name: string
  subject: string
  type: 'welcome' | 'reminder' | 'confirmation' | 'alert' | 'newsletter'
  enabled: boolean
  lastSent: string
  sendCount: number
}

interface SMTPConfig {
  host: string
  port: number
  secure: boolean
  username: string
  fromEmail: string
  fromName: string
}

const mockEmailTemplates: EmailTemplate[] = [
  {
    id: '1',
    name: 'Welcome Email',
    subject: 'Welcome to Fitness Plus Gym!',
    type: 'welcome',
    enabled: true,
    lastSent: '2026-08-17T10:30:00',
    sendCount: 245
  },
  {
    id: '2',
    name: 'Class Reminder',
    subject: 'Your class starts in 1 hour',
    type: 'reminder',
    enabled: true,
    lastSent: '2026-08-17T08:15:00',
    sendCount: 1823
  },
  {
    id: '3',
    name: 'Membership Confirmation',
    subject: 'Your membership is confirmed',
    type: 'confirmation',
    enabled: true,
    lastSent: '2026-08-17T09:45:00',
    sendCount: 567
  },
  {
    id: '4',
    name: 'Payment Failed Alert',
    subject: 'Action Required: Payment Failed',
    type: 'alert',
    enabled: true,
    lastSent: '2026-08-16T14:20:00',
    sendCount: 89
  },
  {
    id: '5',
    name: 'Monthly Newsletter',
    subject: 'This Month at Fitness Plus',
    type: 'newsletter',
    enabled: false,
    lastSent: '2026-08-01T07:00:00',
    sendCount: 3421
  },
  {
    id: '6',
    name: 'Booking Confirmation',
    subject: 'Your session is booked',
    type: 'confirmation',
    enabled: true,
    lastSent: '2026-08-17T11:05:00',
    sendCount: 2103
  },
  {
    id: '7',
    name: 'Cancellation Notice',
    subject: 'Session cancelled',
    type: 'alert',
    enabled: true,
    lastSent: '2026-08-17T07:30:00',
    sendCount: 412
  }
]

const mockSMTPConfig: SMTPConfig = {
  host: 'smtp.fitnessplus.com',
  port: 587,
  secure: true,
  username: 'notifications@fitnessplus.com',
  fromEmail: 'notifications@fitnessplus.com',
  fromName: 'Fitness Plus Gym'
}

export default function SetupEmail() {
  const [templates, setTemplates] = useState<EmailTemplate[]>(mockEmailTemplates)
  const [smtpConfig, setSMTPConfig] = useState<SMTPConfig>(mockSMTPConfig)
  const [activeTab, setActiveTab] = useState<'templates' | 'smtp' | 'test'>('templates')
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [testEmailAddress, setTestEmailAddress] = useState('')
  const [testEmailSent, setTestEmailSent] = useState(false)

  const handleToggleTemplate = (id: string) => {
    setTemplates(templates.map(t => 
      t.id === id ? { ...t, enabled: !t.enabled } : t
    ))
  }

  const handleSMTPChange = (field: keyof SMTPConfig, value: string | number | boolean) => {
    setSMTPConfig({ ...smtpConfig, [field]: value })
  }

  const handleSendTestEmail = () => {
    if (testEmailAddress) {
      setTestEmailSent(true)
      setTimeout(() => setTestEmailSent(false), 3000)
    }
  }

  const getTypeColor = (type: EmailTemplate['type']) => {
    switch (type) {
      case 'welcome': return 'bg-green-100 text-green-800'
      case 'reminder': return 'bg-blue-100 text-blue-800'
      case 'confirmation': return 'bg-purple-100 text-purple-800'
      case 'alert': return 'bg-red-100 text-red-800'
      case 'newsletter': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div data-testid="setupemail" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Email Notification Service
          </h1>
          <p className="text-gray-600">
            Configure email templates, SMTP settings, and test notifications
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px" data-testid="setupemail-nav">
              <button
                data-testid="setupemail-tab-templates"
                onClick={() => setActiveTab('templates')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'templates'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Email Templates
              </button>
              <button
                data-testid="setupemail-tab-smtp"
                onClick={() => setActiveTab('smtp')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'smtp'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                SMTP Settings
              </button>
              <button
                data-testid="setupemail-tab-test"
                onClick={() => setActiveTab('test')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'test'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Test Email
              </button>
            </nav>
          </div>
        </div>

        {/* Templates Tab */}
        {activeTab === 'templates' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Email Templates
              </h2>
              <p className="text-sm text-gray-600">
                Manage and configure automated email notifications
              </p>
            </div>

            <div data-testid="setupemail-list" className="space-y-4">
              {templates.map((template) => (
                <div
                  key={template.id}
                  data-testid="setupemail-item"
                  className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-medium text-gray-900">
                          {template.name}
                        </h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(template.type)}`}>
                          {template.type}
                        </span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          template.enabled 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {template.enabled ? 'Active' : 'Disabled'}
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-3">
                        Subject: <span className="font-medium">{template.subject}</span>
                      </p>

                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>Last sent: {new Date(template.lastSent).toLocaleString()}</span>
                        <span>•</span>
                        <span>Total sent: {template.sendCount.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 ml-4">
                      <button
                        data-testid="setupemail-preview"
                        onClick={() => setSelectedTemplate(template.id)}
                        className="px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                      >
                        Preview
                      </button>
                      <button
                        data-testid="setupemail-toggle"
                        onClick={() => handleToggleTemplate(template.id)}
                        className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                          template.enabled
                            ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                      >
                        {template.enabled ? 'Disable' : 'Enable'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SMTP Settings Tab */}
        {activeTab === 'smtp' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                SMTP Configuration
              </h2>
              <p className="text-sm text-gray-600">
                Configure your email server settings
              </p>
            </div>

            <div className="space-y-4 max-w-2xl">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  SMTP Host
                </label>
                <input
                  type="text"
                  data-testid="setupemail-host"
                  value={smtpConfig.host}
                  onChange={(e) => handleSMTPChange('host', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="smtp.example.com"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Port
                  </label>
                  <input
                    type="number"
                    data-testid="setupemail-port"
                    value={smtpConfig.port}
                    onChange={(e) => handleSMTPChange('port', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="587"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Secure Connection
                  </label>
                  <select
                    data-testid="setupemail-secure"
                    value={smtpConfig.secure.toString()}
                    onChange={(e) => handleSMTPChange('secure', e.target.value === 'true')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="true">Yes (TLS/SSL)</option>
                    <option value="false">No</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  data-testid="setupemail-username"
                  value={smtpConfig.username}
                  onChange={(e) => handleSMTPChange('username', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="username@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  From Email
                </label>
                <input
                  type="email"
                  data-testid="setupemail-fromemail"
                  value={smtpConfig.fromEmail}
                  onChange={(e) => handleSMTPChange('fromEmail', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="noreply@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  From Name
                </label>
                <input
                  type="text"
                  data-testid="setupemail-fromname"
                  value={smtpConfig.fromName}
                  onChange={(e) => handleSMTPChange('fromName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Company Name"
                />
              </div>

              <div className="pt-4">
                <button
                  data-testid="setupemail-save"
                  className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
                >
                  Save Configuration
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Test Email Tab */}
        {activeTab === 'test' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Test Email Delivery
              </h2>
              <p className="text-sm text-gray-600">
                Send a test email to verify your configuration
              </p>
            </div>

            <div className="max-w-2xl space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Template
                </label>
                <select
                  data-testid="setupemail-template"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a template...</option>
                  {templates.map((template) => (
                    <option key={template.id} value={template.id}>
                      {template.name} - {template.subject}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Recipient Email
                </label>
                <input
                  type="email"
                  data-testid="setupemail-recipient"
                  value={testEmailAddress}
                  onChange={(e) => setTestEmailAddress(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="recipient@example.com"
                />
              </div>

              <div className="pt-4">
                <button
                  data-testid="setupemail-send"
                  onClick={handleSendTestEmail}
                  disabled={!testEmailAddress}
                  className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Send Test Email
                </button>
              </div>

              {testEmailSent && (
                <div data-testid="setupemail-success" className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md">
                  <p className="text-sm text-green-800">
                    ✓ Test email sent successfully to {testEmailAddress}
                  </p>
                </div>
              )}

              <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-md">
                <h3 className="text-sm font-medium text-blue-900 mb-2">
                  Current SMTP Configuration
                </h3>
                <dl className="space-y-1 text-sm text-blue-800">
                  <div className="flex">
                    <dt className="font-medium w-32">Host:</dt>
                    <dd>{smtpConfig.host}</dd>
                  </div>
                  <div className="flex">
                    <dt className="font-medium w-32">Port:</dt>
                    <dd>{smtpConfig.port}</dd>
                  </div>
                  <div className="flex">
                    <dt className="font-medium w-32">From:</dt>
                    <dd>{smtpConfig.fromName} &lt;{smtpConfig.fromEmail}&gt;</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
