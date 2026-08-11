import React, { useState } from 'react'

const MOCK_EMAIL_PROVIDERS = [
  { id: 1, name: 'SendGrid', status: 'connected', apiKey: 'sg_test_****' },
  { id: 2, name: 'Mailgun', status: 'disconnected', apiKey: '' },
  { id: 3, name: 'AWS SES', status: 'disconnected', apiKey: '' },
]

const MOCK_EMAIL_TEMPLATES = [
  { id: 1, name: 'Reservation Confirmation', subject: 'Your reservation is confirmed', status: 'active' },
  { id: 2, name: 'Cancellation Notice', subject: 'Your reservation has been cancelled', status: 'active' },
  { id: 3, name: 'Reminder Email', subject: 'Reminder: Your reservation is coming up', status: 'inactive' },
]

const MOCK_TEST_EMAILS = [
  { id: 1, recipient: 'test@example.com', template: 'Reservation Confirmation', sentAt: '2024-01-15 10:30 AM', status: 'delivered' },
  { id: 2, recipient: 'user@test.com', template: 'Cancellation Notice', sentAt: '2024-01-14 02:15 PM', status: 'delivered' },
]

export default function SetupEmailService() {
  const [activeTab, setActiveTab] = useState<'providers' | 'templates' | 'test'>('providers')
  const [providers, setProviders] = useState(MOCK_EMAIL_PROVIDERS)
  const [templates, setTemplates] = useState(MOCK_EMAIL_TEMPLATES)
  const [testEmails, setTestEmails] = useState(MOCK_TEST_EMAILS)
  const [showAddProvider, setShowAddProvider] = useState(false)
  const [testEmail, setTestEmail] = useState('')
  const [selectedTemplate, setSelectedTemplate] = useState('Reservation Confirmation')

  const handleConnectProvider = (id: number) => {
    setProviders(providers.map(p => p.id === id ? { ...p, status: 'connected', apiKey: 'sg_test_****' } : p))
  }

  const handleDisconnectProvider = (id: number) => {
    setProviders(providers.map(p => p.id === id ? { ...p, status: 'disconnected', apiKey: '' } : p))
  }

  const handleToggleTemplate = (id: number) => {
    setTemplates(templates.map(t => t.id === id ? { ...t, status: t.status === 'active' ? 'inactive' : 'active' } : t))
  }

  const handleSendTestEmail = () => {
    if (testEmail && selectedTemplate) {
      const newTestEmail = {
        id: testEmails.length + 1,
        recipient: testEmail,
        template: selectedTemplate,
        sentAt: new Date().toLocaleString(),
        status: 'delivered'
      }
      setTestEmails([newTestEmail, ...testEmails])
      setTestEmail('')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Email Service Setup</h1>
          <p className="text-gray-600">Configure email providers and manage reservation confirmation templates</p>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                onClick={() => setActiveTab('providers')}
                className={`px-6 py-4 font-medium text-sm border-b-2 transition-colors ${
                  activeTab === 'providers'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                Email Providers
              </button>
              <button
                onClick={() => setActiveTab('templates')}
                className={`px-6 py-4 font-medium text-sm border-b-2 transition-colors ${
                  activeTab === 'templates'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                Email Templates
              </button>
              <button
                onClick={() => setActiveTab('test')}
                className={`px-6 py-4 font-medium text-sm border-b-2 transition-colors ${
                  activeTab === 'test'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                Test Emails
              </button>
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'providers' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold text-gray-900">Email Providers</h2>
                  <button
                    onClick={() => setShowAddProvider(!showAddProvider)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    {showAddProvider ? 'Cancel' : 'Add Provider'}
                  </button>
                </div>

                {showAddProvider && (
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Provider Name</label>
                        <input type="text" placeholder="e.g., SendGrid" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">API Key</label>
                        <input type="password" placeholder="Enter your API key" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      </div>
                      <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
                        Save Provider
                      </button>
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  {providers.map(provider => (
                    <div key={provider.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{provider.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">API Key: {provider.apiKey || 'Not configured'}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          provider.status === 'connected'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {provider.status === 'connected' ? '✓ Connected' : 'Disconnected'}
                        </span>
                        {provider.status === 'connected' ? (
                          <button
                            onClick={() => handleDisconnectProvider(provider.id)}
                            className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
                          >
                            Disconnect
                          </button>
                        ) : (
                          <button
                            onClick={() => handleConnectProvider(provider.id)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                          >
                            Connect
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'templates' && (
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Email Templates</h2>
                <div className="space-y-4">
                  {templates.map(template => (
                    <div key={template.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{template.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">Subject: {template.subject}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          template.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {template.status === 'active' ? '✓ Active' : 'Inactive'}
                        </span>
                        <button
                          onClick={() => handleToggleTemplate(template.id)}
                          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                        >
                          {template.status === 'active' ? 'Disable' : 'Enable'}
                        </button>
                        <button className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium">
                          Edit
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'test' && (
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Send Test Email</h2>
                <div className="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Recipient Email</label>
                      <input
                        type="email"
                        value={testEmail}
                        onChange={(e) => setTestEmail(e.target.value)}
                        placeholder="test@example.com"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Template</label>
                      <select
                        value={selectedTemplate}
                        onChange={(e) => setSelectedTemplate(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {templates.map(t => (
                          <option key={t.id} value={t.name}>{t.name}</option>
                        ))}
                      </select>
                    </div>
                    <button
                      onClick={handleSendTestEmail}
                      className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                      Send Test Email
                    </button>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-4">Test Email History</h3>
                <div className="space-y-4">
                  {testEmails.map(email => (
                    <div key={email.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{email.recipient}</p>
                        <p className="text-sm text-gray-600 mt-1">Template: {email.template}</p>
                        <p className="text-sm text-gray-500 mt-1">Sent: {email.sentAt}</p>
                      </div>
                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        ✓ {email.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}