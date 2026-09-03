/**
 * SetupEmail — Email notification service configuration for cancellation alerts
 *
 * Features: SMTP config, template management, notification preferences, test email, service status
 *
 * Ticket: SCRUM-1298 | Branch: proto/SCRUM-1288
 */

import React, { useState } from 'react'

interface EmailTemplate {
  id: string
  name: string
  subject: string
  body: string
  type: 'cancellation' | 'confirmation' | 'reminder' | 'update'
  active: boolean
}

interface NotificationPreference {
  id: string
  event: string
  enabled: boolean
  sendToCustomer: boolean
  sendToStaff: boolean
}

interface SMTPConfig {
  host: string
  port: number
  username: string
  password: string
  fromEmail: string
  fromName: string
  secure: boolean
}

const mockEmailTemplates: EmailTemplate[] = [
  {
    id: 'tpl-1',
    name: 'Cancellation Alert - Customer',
    subject: 'Appointment Cancelled',
    body: 'Your appointment on {date} at {time} has been cancelled. Refund will be processed within 3-5 business days.',
    type: 'cancellation',
    active: true
  },
  {
    id: 'tpl-2',
    name: 'Cancellation Alert - Staff',
    subject: 'Appointment Cancellation Notice',
    body: 'Appointment with {customer} on {date} at {time} has been cancelled by {cancelledBy}.',
    type: 'cancellation',
    active: true
  },
  {
    id: 'tpl-3',
    name: 'Booking Confirmation',
    subject: 'Your Appointment is Confirmed',
    body: 'Thank you for booking with us! Your appointment is confirmed for {date} at {time} with {stylist}.',
    type: 'confirmation',
    active: true
  },
  {
    id: 'tpl-4',
    name: 'Appointment Reminder',
    subject: 'Reminder: Upcoming Appointment',
    body: 'This is a reminder about your appointment tomorrow at {time}. See you soon!',
    type: 'reminder',
    active: false
  },
  {
    id: 'tpl-5',
    name: 'Appointment Update',
    subject: 'Appointment Updated',
    body: 'Your appointment has been rescheduled to {date} at {time}. Please contact us if you have questions.',
    type: 'update',
    active: true
  }
]

const mockNotificationPreferences: NotificationPreference[] = [
  { id: 'pref-1', event: 'Appointment Cancelled', enabled: true, sendToCustomer: true, sendToStaff: true },
  { id: 'pref-2', event: 'Appointment Confirmed', enabled: true, sendToCustomer: true, sendToStaff: false },
  { id: 'pref-3', event: 'Appointment Reminder (24h)', enabled: false, sendToCustomer: true, sendToStaff: false },
  { id: 'pref-4', event: 'Appointment Updated', enabled: true, sendToCustomer: true, sendToStaff: true },
  { id: 'pref-5', event: 'Payment Received', enabled: true, sendToCustomer: true, sendToStaff: false }
]

export default function SetupEmail() {
  const [activeTab, setActiveTab] = useState<'smtp' | 'templates' | 'preferences' | 'test'>('smtp')
  const [templates] = useState<EmailTemplate[]>(mockEmailTemplates)
  const [preferences, setPreferences] = useState<NotificationPreference[]>(mockNotificationPreferences)
  const [smtpConfig, setSMTPConfig] = useState<SMTPConfig>({
    host: 'smtp.gmail.com',
    port: 587,
    username: 'notifications@beautysalon.com',
    password: '••••••••',
    fromEmail: 'notifications@beautysalon.com',
    fromName: 'Beauty Salon Booking',
    secure: true
  })
  const [testEmail, setTestEmail] = useState('')
  const [serviceStatus, setServiceStatus] = useState<'connected' | 'disconnected' | 'testing'>('connected')
  const [selectedTemplate, setSelectedTemplate] = useState<string>('tpl-1')

  const handleSMTPSave = () => {
    setServiceStatus('testing')
    setTimeout(() => setServiceStatus('connected'), 1500)
  }

  const handleTestEmail = () => {
    if (testEmail) {
      setServiceStatus('testing')
      setTimeout(() => setServiceStatus('connected'), 2000)
    }
  }

  const togglePreference = (id: string, field: 'enabled' | 'sendToCustomer' | 'sendToStaff') => {
    setPreferences(preferences.map(pref =>
      pref.id === id ? { ...pref, [field]: !pref[field] } : pref
    ))
  }

  return (
    <div data-testid="setupemail" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Email Notification Setup</h1>
              <p className="text-gray-600 mt-1">Configure email service for cancellation alerts and notifications</p>
            </div>
            <div className="flex items-center gap-3">
              <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                serviceStatus === 'connected' ? 'bg-green-100 text-green-800' :
                serviceStatus === 'testing' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                <div className={`w-2 h-2 rounded-full ${
                  serviceStatus === 'connected' ? 'bg-green-500' :
                  serviceStatus === 'testing' ? 'bg-yellow-500' :
                  'bg-red-500'
                }`}></div>
                <span className="font-medium text-sm">
                  {serviceStatus === 'connected' ? 'Connected' :
                   serviceStatus === 'testing' ? 'Testing...' :
                   'Disconnected'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                data-testid="setupemail-tab-smtp"
                onClick={() => setActiveTab('smtp')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
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
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'templates'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Email Templates ({templates.filter(t => t.active).length})
              </button>
              <button
                data-testid="setupemail-tab-preferences"
                onClick={() => setActiveTab('preferences')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'preferences'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Notification Preferences
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

          <div className="p-6">
            {/* SMTP Configuration Tab */}
            {activeTab === 'smtp' && (
              <div data-testid="setupemail-smtp-panel">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">SMTP Server Configuration</h2>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Host</label>
                    <input
                      data-testid="setupemail-host"
                      type="text"
                      value={smtpConfig.host}
                      onChange={(e) => setSMTPConfig({ ...smtpConfig, host: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Port</label>
                    <input
                      data-testid="setupemail-port"
                      type="number"
                      value={smtpConfig.port}
                      onChange={(e) => setSMTPConfig({ ...smtpConfig, port: parseInt(e.target.value) })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                    <input
                      data-testid="setupemail-username"
                      type="text"
                      value={smtpConfig.username}
                      onChange={(e) => setSMTPConfig({ ...smtpConfig, username: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                    <input
                      data-testid="setupemail-password"
                      type="password"
                      value={smtpConfig.password}
                      onChange={(e) => setSMTPConfig({ ...smtpConfig, password: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">From Email</label>
                    <input
                      data-testid="setupemail-fromemail"
                      type="email"
                      value={smtpConfig.fromEmail}
                      onChange={(e) => setSMTPConfig({ ...smtpConfig, fromEmail: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">From Name</label>
                    <input
                      data-testid="setupemail-fromname"
                      type="text"
                      value={smtpConfig.fromName}
                      onChange={(e) => setSMTPConfig({ ...smtpConfig, fromName: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="mt-6 flex items-center gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      data-testid="setupemail-secure"
                      type="checkbox"
                      checked={smtpConfig.secure}
                      onChange={(e) => setSMTPConfig({ ...smtpConfig, secure: e.target.checked })}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">Use secure connection (TLS)</span>
                  </label>
                </div>
                <div className="mt-6 flex gap-3">
                  <button
                    data-testid="setupemail-save"
                    onClick={handleSMTPSave}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Save Configuration
                  </button>
                  <button
                    data-testid="setupemail-reset"
                    className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                  >
                    Reset to Defaults
                  </button>
                </div>
              </div>
            )}

            {/* Email Templates Tab */}
            {activeTab === 'templates' && (
              <div data-testid="setupemail-templates-panel">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Email Templates</h2>
                <div data-testid="setupemail-list" className="space-y-4">
                  {templates.map((template) => (
                    <div
                      key={template.id}
                      data-testid="setupemail-item"
                      className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-gray-900">{template.name}</h3>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              template.type === 'cancellation' ? 'bg-red-100 text-red-700' :
                              template.type === 'confirmation' ? 'bg-green-100 text-green-700' :
                              template.type === 'reminder' ? 'bg-blue-100 text-blue-700' :
                              'bg-purple-100 text-purple-700'
                            }`}>
                              {template.type}
                            </span>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              template.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                            }`}>
                              {template.active ? 'Active' : 'Inactive'}
                            </span>
                          </div>
                          <p className="text-sm font-medium text-gray-700 mb-1">Subject: {template.subject}</p>
                          <p className="text-sm text-gray-600">{template.body}</p>
                        </div>
                        <button
                          data-testid="setupemail-edit"
                          className="ml-4 px-4 py-2 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors font-medium"
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  data-testid="setupemail-addtemplate"
                  className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  + Add New Template
                </button>
              </div>
            )}

            {/* Notification Preferences Tab */}
            {activeTab === 'preferences' && (
              <div data-testid="setupemail-preferences-panel">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Notification Preferences</h2>
                <p className="text-gray-600 mb-6">Configure which events trigger email notifications and who receives them</p>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Event</th>
                        <th className="text-center py-3 px-4 font-semibold text-gray-700">Enabled</th>
                        <th className="text-center py-3 px-4 font-semibold text-gray-700">Send to Customer</th>
                        <th className="text-center py-3 px-4 font-semibold text-gray-700">Send to Staff</th>
                      </tr>
                    </thead>
                    <tbody data-testid="setupemail-preferences-list">
                      {preferences.map((pref) => (
                        <tr key={pref.id} data-testid="setupemail-preference-item" className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-4 px-4 font-medium text-gray-900">{pref.event}</td>
                          <td className="py-4 px-4 text-center">
                            <input
                              data-testid="setupemail-toggle-enabled"
                              type="checkbox"
                              checked={pref.enabled}
                              onChange={() => togglePreference(pref.id, 'enabled')}
                              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                          </td>
                          <td className="py-4 px-4 text-center">
                            <input
                              data-testid="setupemail-toggle-customer"
                              type="checkbox"
                              checked={pref.sendToCustomer}
                              onChange={() => togglePreference(pref.id, 'sendToCustomer')}
                              disabled={!pref.enabled}
                              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 disabled:opacity-50"
                            />
                          </td>
                          <td className="py-4 px-4 text-center">
                            <input
                              data-testid="setupemail-toggle-staff"
                              type="checkbox"
                              checked={pref.sendToStaff}
                              onChange={() => togglePreference(pref.id, 'sendToStaff')}
                              disabled={!pref.enabled}
                              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 disabled:opacity-50"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <button
                  data-testid="setupemail-savepreferences"
                  className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Save Preferences
                </button>
              </div>
            )}

            {/* Test Email Tab */}
            {activeTab === 'test' && (
              <div data-testid="setupemail-test-panel">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Send Test Email</h2>
                <p className="text-gray-600 mb-6">Test your email configuration by sending a test notification</p>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Template</label>
                    <select
                      data-testid="setupemail-templateselect"
                      value={selectedTemplate}
                      onChange={(e) => setSelectedTemplate(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {templates.map((template) => (
                        <option key={template.id} value={template.id}>
                          {template.name} - {template.subject}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Recipient Email</label>
                    <input
                      data-testid="setupemail-testemail"
                      type="email"
                      value={testEmail}
                      onChange={(e) => setTestEmail(e.target.value)}
                      placeholder="test@example.com"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Preview</h3>
                    {templates.find(t => t.id === selectedTemplate) && (
                      <>
                        <p className="text-sm text-gray-600 mb-1">
                          <span className="font-medium">Subject:</span> {templates.find(t => t.id === selectedTemplate)?.subject}
                        </p>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Body:</span> {templates.find(t => t.id === selectedTemplate)?.body}
                        </p>
                      </>
                    )}
                  </div>
                  <button
                    data-testid="setupemail-send"
                    onClick={handleTestEmail}
                    disabled={!testEmail}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    Send Test Email
                  </button>
                  {serviceStatus === 'testing' && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <p className="text-sm text-yellow-800">Sending test email...</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-sm text-gray-600 mb-1">Active Templates</div>
            <div className="text-3xl font-bold text-gray-900">{templates.filter(t => t.active).length}</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-sm text-gray-600 mb-1">Enabled Notifications</div>
            <div className="text-3xl font-bold text-gray-900">{preferences.filter(p => p.enabled).length}</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-sm text-gray-600 mb-1">Cancellation Alerts</div>
            <div className="text-3xl font-bold text-gray-900">{templates.filter(t => t.type === 'cancellation' && t.active).length}</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-sm text-gray-600 mb-1">Service Status</div>
            <div className={`text-xl font-bold ${serviceStatus === 'connected' ? 'text-green-600' : serviceStatus === 'testing' ? 'text-yellow-600' : 'text-red-600'}`}>
              {serviceStatus === 'connected' ? 'Online' : serviceStatus === 'testing' ? 'Testing' : 'Offline'}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
