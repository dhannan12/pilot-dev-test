/**
 * SetupEmail — Email notification service configuration interface
 *
 * Features: SMTP configuration, email templates, test email sending, notification preferences, connection validation
 *
 * Ticket: SCRUM-925 | Branch: proto/SCRUM-914
 */

import { useState } from 'react'

interface EmailProvider {
  id: string
  name: string
  description: string
  defaultPort: number
}

interface EmailTemplate {
  id: string
  name: string
  subject: string
  body: string
  category: string
}

interface NotificationType {
  id: string
  name: string
  description: string
  enabled: boolean
}

const EMAIL_PROVIDERS: EmailProvider[] = [
  { id: 'smtp', name: 'Custom SMTP', description: 'Configure your own SMTP server', defaultPort: 587 },
  { id: 'gmail', name: 'Gmail', description: 'Use Gmail SMTP service', defaultPort: 587 },
  { id: 'sendgrid', name: 'SendGrid', description: 'SendGrid email service', defaultPort: 587 },
  { id: 'mailgun', name: 'Mailgun', description: 'Mailgun transactional email', defaultPort: 587 },
  { id: 'ses', name: 'Amazon SES', description: 'AWS Simple Email Service', defaultPort: 587 }
]

const EMAIL_TEMPLATES: EmailTemplate[] = [
  {
    id: 'booking-confirmation',
    name: 'Booking Confirmation',
    subject: 'Your booking is confirmed - {{bookingId}}',
    body: 'Dear {{customerName}},\n\nYour booking for {{serviceName}} on {{date}} at {{time}} has been confirmed.',
    category: 'Bookings'
  },
  {
    id: 'booking-reminder',
    name: 'Booking Reminder',
    subject: 'Reminder: Upcoming appointment tomorrow',
    body: 'Hi {{customerName}},\n\nThis is a reminder about your appointment for {{serviceName}} tomorrow at {{time}}.',
    category: 'Bookings'
  },
  {
    id: 'equipment-rental',
    name: 'Equipment Rental Confirmation',
    subject: 'Equipment rental confirmed - {{rentalId}}',
    body: 'Hello {{customerName}},\n\nYour equipment rental for {{equipmentName}} from {{startDate}} to {{endDate}} is confirmed.',
    category: 'Rentals'
  },
  {
    id: 'equipment-return',
    name: 'Equipment Return Reminder',
    subject: 'Equipment return due soon',
    body: 'Hi {{customerName}},\n\nYour rented {{equipmentName}} is due for return on {{returnDate}}.',
    category: 'Rentals'
  },
  {
    id: 'payment-receipt',
    name: 'Payment Receipt',
    subject: 'Payment receipt - {{transactionId}}',
    body: 'Dear {{customerName}},\n\nThank you for your payment of {{amount}}. Transaction ID: {{transactionId}}.',
    category: 'Payments'
  },
  {
    id: 'welcome-email',
    name: 'Welcome Email',
    subject: 'Welcome to our platform!',
    body: 'Hello {{customerName}},\n\nWelcome to our platform! We\'re excited to have you on board.',
    category: 'General'
  }
]

const NOTIFICATION_TYPES: NotificationType[] = [
  { id: 'booking-created', name: 'Booking Created', description: 'Send email when new booking is made', enabled: true },
  { id: 'booking-cancelled', name: 'Booking Cancelled', description: 'Send email when booking is cancelled', enabled: true },
  { id: 'booking-reminder', name: 'Booking Reminder', description: 'Send reminder 24 hours before appointment', enabled: true },
  { id: 'rental-confirmed', name: 'Rental Confirmed', description: 'Send email when equipment rental is confirmed', enabled: true },
  { id: 'rental-return', name: 'Return Reminder', description: 'Send reminder before equipment return date', enabled: true },
  { id: 'payment-received', name: 'Payment Received', description: 'Send receipt when payment is processed', enabled: true },
  { id: 'user-registered', name: 'User Registration', description: 'Welcome email for new users', enabled: true }
]

export default function SetupEmail() {
  const [activeTab, setActiveTab] = useState<'config' | 'templates' | 'notifications'>('config')
  const [selectedProvider, setSelectedProvider] = useState('smtp')
  const [smtpHost, setSmtpHost] = useState('')
  const [smtpPort, setSmtpPort] = useState('587')
  const [smtpUsername, setSmtpUsername] = useState('')
  const [smtpPassword, setSmtpPassword] = useState('')
  const [fromEmail, setFromEmail] = useState('')
  const [fromName, setFromName] = useState('')
  const [testEmail, setTestEmail] = useState('')
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle')
  const [notificationSettings, setNotificationSettings] = useState(NOTIFICATION_TYPES)

  const handleTestConnection = () => {
    setConnectionStatus('testing')
    setTimeout(() => {
      setConnectionStatus('success')
      setTimeout(() => setConnectionStatus('idle'), 3000)
    }, 1500)
  }

  const handleSendTestEmail = () => {
    if (!testEmail) return
    alert(`Test email would be sent to: ${testEmail}`)
  }

  const handleToggleNotification = (id: string) => {
    setNotificationSettings(prev =>
      prev.map(n => n.id === id ? { ...n, enabled: !n.enabled } : n)
    )
  }

  const handleSaveConfig = () => {
    alert('Email configuration saved successfully!')
  }

  return (
    <div data-testid="setupemail" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Email Notification Service</h1>
          <p className="text-gray-600">Configure SMTP settings, email templates, and notification preferences</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <div className="flex space-x-1 p-2">
              <button
                data-testid="setupemail-tab-config"
                onClick={() => setActiveTab('config')}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === 'config'
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                SMTP Configuration
              </button>
              <button
                data-testid="setupemail-tab-templates"
                onClick={() => setActiveTab('templates')}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === 'templates'
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                Email Templates
              </button>
              <button
                data-testid="setupemail-tab-notifications"
                onClick={() => setActiveTab('notifications')}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === 'notifications'
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                Notification Settings
              </button>
            </div>
          </div>

          {/* SMTP Configuration Tab */}
          {activeTab === 'config' && (
            <div className="p-6 space-y-6">
              {/* Provider Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Email Provider</label>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {EMAIL_PROVIDERS.map((provider) => (
                    <button
                      key={provider.id}
                      data-testid={`setupemail-provider-${provider.id}`}
                      onClick={() => {
                        setSelectedProvider(provider.id)
                        setSmtpPort(provider.defaultPort.toString())
                      }}
                      className={`p-4 rounded-lg border-2 text-left transition-all ${
                        selectedProvider === provider.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      <div className="font-semibold text-gray-900">{provider.name}</div>
                      <div className="text-sm text-gray-600 mt-1">{provider.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* SMTP Settings */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="smtp-host" className="block text-sm font-medium text-gray-700 mb-2">
                    SMTP Host
                  </label>
                  <input
                    id="smtp-host"
                    data-testid="setupemail-smtp-host"
                    type="text"
                    value={smtpHost}
                    onChange={(e) => setSmtpHost(e.target.value)}
                    placeholder="smtp.example.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="smtp-port" className="block text-sm font-medium text-gray-700 mb-2">
                    SMTP Port
                  </label>
                  <input
                    id="smtp-port"
                    data-testid="setupemail-smtp-port"
                    type="number"
                    value={smtpPort}
                    onChange={(e) => setSmtpPort(e.target.value)}
                    placeholder="587"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="smtp-username" className="block text-sm font-medium text-gray-700 mb-2">
                    Username
                  </label>
                  <input
                    id="smtp-username"
                    data-testid="setupemail-smtp-username"
                    type="text"
                    value={smtpUsername}
                    onChange={(e) => setSmtpUsername(e.target.value)}
                    placeholder="username@example.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="smtp-password" className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    id="smtp-password"
                    data-testid="setupemail-smtp-password"
                    type="password"
                    value={smtpPassword}
                    onChange={(e) => setSmtpPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="from-email" className="block text-sm font-medium text-gray-700 mb-2">
                    From Email
                  </label>
                  <input
                    id="from-email"
                    data-testid="setupemail-from-email"
                    type="email"
                    value={fromEmail}
                    onChange={(e) => setFromEmail(e.target.value)}
                    placeholder="noreply@example.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="from-name" className="block text-sm font-medium text-gray-700 mb-2">
                    From Name
                  </label>
                  <input
                    id="from-name"
                    data-testid="setupemail-from-name"
                    type="text"
                    value={fromName}
                    onChange={(e) => setFromName(e.target.value)}
                    placeholder="Your Company Name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Connection Test */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Test Connection</h3>
                <div className="flex items-center gap-4">
                  <button
                    data-testid="setupemail-test-connection"
                    onClick={handleTestConnection}
                    disabled={connectionStatus === 'testing'}
                    className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {connectionStatus === 'testing' ? 'Testing...' : 'Test Connection'}
                  </button>
                  {connectionStatus === 'success' && (
                    <span className="text-green-600 font-medium">✓ Connection successful</span>
                  )}
                  {connectionStatus === 'error' && (
                    <span className="text-red-600 font-medium">✗ Connection failed</span>
                  )}
                </div>
              </div>

              {/* Send Test Email */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Send Test Email</h3>
                <div className="flex gap-4">
                  <input
                    data-testid="setupemail-test-email"
                    type="email"
                    value={testEmail}
                    onChange={(e) => setTestEmail(e.target.value)}
                    placeholder="recipient@example.com"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    data-testid="setupemail-send-test"
                    onClick={handleSendTestEmail}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                  >
                    Send Test
                  </button>
                </div>
              </div>

              {/* Save Button */}
              <div className="border-t pt-6 flex justify-end">
                <button
                  data-testid="setupemail-save-config"
                  onClick={handleSaveConfig}
                  className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium shadow-sm"
                >
                  Save Configuration
                </button>
              </div>
            </div>
          )}

          {/* Email Templates Tab */}
          {activeTab === 'templates' && (
            <div className="p-6">
              <div className="mb-6 flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-900">Email Templates</h3>
                <button
                  data-testid="setupemail-create-template"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                >
                  Create Template
                </button>
              </div>

              <div data-testid="setupemail-templates-list" className="space-y-4">
                {EMAIL_TEMPLATES.map((template) => (
                  <div
                    key={template.id}
                    data-testid="setupemail-template-item"
                    className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow bg-white"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">{template.name}</h4>
                        <span className="inline-block mt-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                          {template.category}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          data-testid={`setupemail-edit-template-${template.id}`}
                          className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium"
                        >
                          Edit
                        </button>
                        <button
                          data-testid={`setupemail-delete-template-${template.id}`}
                          className="px-4 py-2 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100 font-medium"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <span className="text-sm font-medium text-gray-600">Subject: </span>
                        <span className="text-sm text-gray-900">{template.subject}</span>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-600">Body: </span>
                        <p className="text-sm text-gray-700 mt-1 whitespace-pre-line">{template.body}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Notification Settings Tab */}
          {activeTab === 'notifications' && (
            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Notification Settings</h3>
                <p className="text-gray-600 mt-1">Enable or disable email notifications for different events</p>
              </div>

              <div data-testid="setupemail-notifications-list" className="space-y-3">
                {notificationSettings.map((notification) => (
                  <div
                    key={notification.id}
                    data-testid="setupemail-notification-item"
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-white hover:shadow-sm transition-shadow"
                  >
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{notification.name}</h4>
                      <p className="text-sm text-gray-600 mt-1">{notification.description}</p>
                    </div>
                    <button
                      data-testid={`setupemail-toggle-${notification.id}`}
                      onClick={() => handleToggleNotification(notification.id)}
                      className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors ${
                        notification.enabled ? 'bg-green-600' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                          notification.enabled ? 'translate-x-8' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t flex justify-end">
                <button
                  data-testid="setupemail-save-notifications"
                  onClick={() => alert('Notification settings saved!')}
                  className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium shadow-sm"
                >
                  Save Settings
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
