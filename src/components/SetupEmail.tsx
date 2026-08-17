/**
 * SetupEmail — Email service configuration for application status alerts
 *
 * Features: SMTP settings, email templates, test email, notification preferences, queue status
 *
 * Ticket: SCRUM-1015 | Branch: proto/SCRUM-1015
 */

import { useState } from 'react'

interface EmailTemplate {
  id: string
  name: string
  subject: string
  preview: string
  status: 'active' | 'draft'
}

interface SMTPConfig {
  host: string
  port: number
  secure: boolean
  username: string
  password: string
}

interface QueueStats {
  pending: number
  processing: number
  completed: number
  failed: number
}

export default function SetupEmail() {
  const [activeTab, setActiveTab] = useState<'smtp' | 'templates' | 'preferences' | 'queue'>('smtp')
  const [testEmailSent, setTestEmailSent] = useState(false)
  
  const [smtpConfig, setSmtpConfig] = useState<SMTPConfig>({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    username: 'notifications@company.com',
    password: '••••••••'
  })

  const emailTemplates: EmailTemplate[] = [
    {
      id: 'tpl-1',
      name: 'Application Submitted',
      subject: 'Your application for {{vacancy_title}} has been received',
      preview: 'Thank you for applying! We have received your application and will review it shortly.',
      status: 'active'
    },
    {
      id: 'tpl-2',
      name: 'Application Under Review',
      subject: 'Your application for {{vacancy_title}} is under review',
      preview: 'Good news! Our hiring team is currently reviewing your application.',
      status: 'active'
    },
    {
      id: 'tpl-3',
      name: 'Interview Scheduled',
      subject: 'Interview scheduled for {{vacancy_title}}',
      preview: 'Congratulations! We would like to invite you for an interview.',
      status: 'active'
    },
    {
      id: 'tpl-4',
      name: 'Application Approved',
      subject: 'Congratulations! Your application for {{vacancy_title}} has been approved',
      preview: 'We are pleased to inform you that your application has been approved.',
      status: 'active'
    },
    {
      id: 'tpl-5',
      name: 'Application Rejected',
      subject: 'Update on your application for {{vacancy_title}}',
      preview: 'Thank you for your interest. After careful consideration, we have decided to move forward with other candidates.',
      status: 'active'
    },
    {
      id: 'tpl-6',
      name: 'Welcome Email',
      subject: 'Welcome to {{company_name}}!',
      preview: 'Welcome aboard! We are excited to have you join our team.',
      status: 'draft'
    }
  ]

  const queueStats: QueueStats = {
    pending: 12,
    processing: 3,
    completed: 1847,
    failed: 5
  }

  const notificationPreferences = [
    { id: 'pref-1', event: 'Application Submitted', enabled: true, delay: '0 minutes' },
    { id: 'pref-2', event: 'Application Under Review', enabled: true, delay: '5 minutes' },
    { id: 'pref-3', event: 'Interview Scheduled', enabled: true, delay: '0 minutes' },
    { id: 'pref-4', event: 'Application Approved', enabled: true, delay: '0 minutes' },
    { id: 'pref-5', event: 'Application Rejected', enabled: true, delay: '10 minutes' },
    { id: 'pref-6', event: 'Reminder - Missing Documents', enabled: false, delay: '1 day' }
  ]

  const handleTestEmail = () => {
    setTestEmailSent(true)
    setTimeout(() => setTestEmailSent(false), 3000)
  }

  const handleSaveSMTP = () => {
    alert('SMTP configuration saved successfully!')
  }

  return (
    <section data-testid="setup-email" className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Email Service Setup</h1>
          <p className="text-gray-600">
            Configure email notifications for application status changes
          </p>
        </div>

        {/* Status Banner */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-start">
          <div className="flex-shrink-0">
            <svg className="w-5 h-5 text-green-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-green-800">Email service is active</h3>
            <p className="text-sm text-green-700 mt-1">
              Nodemailer + Bull queue configured. Processing emails asynchronously.
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px" data-testid="setup-email-tabs">
              <button
                data-testid="setup-email-tab-smtp"
                onClick={() => setActiveTab('smtp')}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'smtp'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                SMTP Configuration
              </button>
              <button
                data-testid="setup-email-tab-templates"
                onClick={() => setActiveTab('templates')}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'templates'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Email Templates
              </button>
              <button
                data-testid="setup-email-tab-preferences"
                onClick={() => setActiveTab('preferences')}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'preferences'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Notification Preferences
              </button>
              <button
                data-testid="setup-email-tab-queue"
                onClick={() => setActiveTab('queue')}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'queue'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Queue Status
              </button>
            </nav>
          </div>

          <div className="p-6">
            {/* SMTP Configuration Tab */}
            {activeTab === 'smtp' && (
              <div data-testid="setup-email-smtp-panel">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">SMTP Server Settings</h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="smtp-host" className="block text-sm font-medium text-gray-700 mb-1">
                      SMTP Host
                    </label>
                    <input
                      id="smtp-host"
                      data-testid="setup-email-smtp-host"
                      type="text"
                      value={smtpConfig.host}
                      onChange={(e) => setSmtpConfig({ ...smtpConfig, host: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="smtp-port" className="block text-sm font-medium text-gray-700 mb-1">
                        Port
                      </label>
                      <input
                        id="smtp-port"
                        data-testid="setup-email-smtp-port"
                        type="number"
                        value={smtpConfig.port}
                        onChange={(e) => setSmtpConfig({ ...smtpConfig, port: parseInt(e.target.value) })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label htmlFor="smtp-secure" className="block text-sm font-medium text-gray-700 mb-1">
                        Use SSL/TLS
                      </label>
                      <select
                        id="smtp-secure"
                        data-testid="setup-email-smtp-secure"
                        value={smtpConfig.secure ? 'true' : 'false'}
                        onChange={(e) => setSmtpConfig({ ...smtpConfig, secure: e.target.value === 'true' })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="false">No (STARTTLS)</option>
                        <option value="true">Yes (SSL/TLS)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="smtp-username" className="block text-sm font-medium text-gray-700 mb-1">
                      Username
                    </label>
                    <input
                      id="smtp-username"
                      data-testid="setup-email-smtp-username"
                      type="text"
                      value={smtpConfig.username}
                      onChange={(e) => setSmtpConfig({ ...smtpConfig, username: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label htmlFor="smtp-password" className="block text-sm font-medium text-gray-700 mb-1">
                      Password
                    </label>
                    <input
                      id="smtp-password"
                      data-testid="setup-email-smtp-password"
                      type="password"
                      value={smtpConfig.password}
                      onChange={(e) => setSmtpConfig({ ...smtpConfig, password: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      data-testid="setup-email-save-smtp"
                      onClick={handleSaveSMTP}
                      className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Save Configuration
                    </button>
                    <button
                      data-testid="setup-email-test-connection"
                      onClick={handleTestEmail}
                      className="px-6 py-2 bg-gray-100 text-gray-700 font-medium rounded-md hover:bg-gray-200 transition-colors"
                    >
                      {testEmailSent ? 'Test Email Sent!' : 'Send Test Email'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Email Templates Tab */}
            {activeTab === 'templates' && (
              <div data-testid="setup-email-templates-panel">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">Email Templates</h2>
                  <button
                    data-testid="setup-email-create-template"
                    className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
                  >
                    + Create Template
                  </button>
                </div>
                
                <div className="space-y-3" data-testid="setup-email-templates-list">
                  {emailTemplates.map((template) => (
                    <div
                      key={template.id}
                      data-testid="setup-email-template-item"
                      className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-gray-900">{template.name}</h3>
                            <span
                              className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                                template.status === 'active'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-gray-100 text-gray-800'
                              }`}
                            >
                              {template.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            <strong>Subject:</strong> {template.subject}
                          </p>
                          <p className="text-sm text-gray-500">{template.preview}</p>
                        </div>
                        <button
                          data-testid="setup-email-edit-template"
                          className="ml-4 px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Notification Preferences Tab */}
            {activeTab === 'preferences' && (
              <div data-testid="setup-email-preferences-panel">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Notification Preferences</h2>
                <p className="text-sm text-gray-600 mb-6">
                  Configure which events trigger email notifications and their delivery timing.
                </p>
                
                <div className="space-y-2" data-testid="setup-email-preferences-list">
                  {notificationPreferences.map((pref) => (
                    <div
                      key={pref.id}
                      data-testid="setup-email-preference-item"
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <input
                          type="checkbox"
                          data-testid="setup-email-preference-toggle"
                          checked={pref.enabled}
                          readOnly
                          className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                        />
                        <div>
                          <h3 className="font-medium text-gray-900">{pref.event}</h3>
                          <p className="text-sm text-gray-500">Delivery delay: {pref.delay}</p>
                        </div>
                      </div>
                      <button
                        data-testid="setup-email-edit-preference"
                        className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                      >
                        Configure
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Queue Status Tab */}
            {activeTab === 'queue' && (
              <div data-testid="setup-email-queue-panel">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Email Queue Status</h2>
                <p className="text-sm text-gray-600 mb-6">
                  Real-time status of the Bull email processing queue.
                </p>

                <div className="grid grid-cols-4 gap-4 mb-6">
                  <div data-testid="setup-email-queue-pending" className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="text-3xl font-bold text-yellow-900">{queueStats.pending}</div>
                    <div className="text-sm text-yellow-700 font-medium mt-1">Pending</div>
                  </div>
                  <div data-testid="setup-email-queue-processing" className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="text-3xl font-bold text-blue-900">{queueStats.processing}</div>
                    <div className="text-sm text-blue-700 font-medium mt-1">Processing</div>
                  </div>
                  <div data-testid="setup-email-queue-completed" className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="text-3xl font-bold text-green-900">{queueStats.completed}</div>
                    <div className="text-sm text-green-700 font-medium mt-1">Completed</div>
                  </div>
                  <div data-testid="setup-email-queue-failed" className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="text-3xl font-bold text-red-900">{queueStats.failed}</div>
                    <div className="text-sm text-red-700 font-medium mt-1">Failed</div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg">
                  <div className="px-4 py-3 border-b border-gray-200">
                    <h3 className="font-semibold text-gray-900">Recent Jobs</h3>
                  </div>
                  <div className="divide-y divide-gray-200" data-testid="setup-email-queue-jobs">
                    <div data-testid="setup-email-queue-job" className="px-4 py-3 flex justify-between items-center">
                      <div>
                        <div className="font-medium text-gray-900">Application Under Review</div>
                        <div className="text-sm text-gray-500">to: john.doe@example.com</div>
                      </div>
                      <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">Processing</span>
                    </div>
                    <div data-testid="setup-email-queue-job" className="px-4 py-3 flex justify-between items-center">
                      <div>
                        <div className="font-medium text-gray-900">Interview Scheduled</div>
                        <div className="text-sm text-gray-500">to: jane.smith@example.com</div>
                      </div>
                      <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded">Completed</span>
                    </div>
                    <div data-testid="setup-email-queue-job" className="px-4 py-3 flex justify-between items-center">
                      <div>
                        <div className="font-medium text-gray-900">Application Submitted</div>
                        <div className="text-sm text-gray-500">to: mike.johnson@example.com</div>
                      </div>
                      <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded">Completed</span>
                    </div>
                    <div data-testid="setup-email-queue-job" className="px-4 py-3 flex justify-between items-center">
                      <div>
                        <div className="font-medium text-gray-900">Application Approved</div>
                        <div className="text-sm text-gray-500">to: sarah.williams@example.com</div>
                      </div>
                      <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded">Pending</span>
                    </div>
                    <div data-testid="setup-email-queue-job" className="px-4 py-3 flex justify-between items-center">
                      <div>
                        <div className="font-medium text-gray-900">Welcome Email</div>
                        <div className="text-sm text-gray-500">to: invalid@email</div>
                      </div>
                      <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded">Failed</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex gap-3">
                  <button
                    data-testid="setup-email-retry-failed"
                    className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Retry Failed Jobs
                  </button>
                  <button
                    data-testid="setup-email-clear-completed"
                    className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-200 transition-colors"
                  >
                    Clear Completed
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
