import React, { useState } from 'react'

const MOCK_EMAIL_PROVIDERS = [
  { id: 1, name: 'SendGrid', status: 'connected', apiKey: 'sg_***' },
  { id: 2, name: 'Mailgun', status: 'disconnected', apiKey: '' },
  { id: 3, name: 'AWS SES', status: 'disconnected', apiKey: '' },
]

const MOCK_EMAIL_TEMPLATES = [
  { id: 1, name: 'Reservation Confirmation', subject: 'Your reservation is confirmed', enabled: true },
  { id: 2, name: 'Cancellation Notice', subject: 'Your reservation has been cancelled', enabled: true },
  { id: 3, name: 'Reminder Email', subject: 'Reminder: Your reservation is coming up', enabled: false },
]

const MOCK_TEST_RECIPIENTS = [
  { id: 1, email: 'admin@example.com', lastTest: '2024-01-15' },
  { id: 2, email: 'support@example.com', lastTest: '2024-01-14' },
]

export default function SetupEmailService() {
  const [providers, setProviders] = useState(MOCK_EMAIL_PROVIDERS)
  const [templates, setTemplates] = useState(MOCK_EMAIL_TEMPLATES)
  const [activeTab, setActiveTab] = useState('providers')
  const [showApiModal, setShowApiModal] = useState(false)
  const [selectedProvider, setSelectedProvider] = useState<number | null>(null)
  const [apiKeyInput, setApiKeyInput] = useState('')
  const [testEmail, setTestEmail] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const handleConnectProvider = (providerId: number) => {
    setSelectedProvider(providerId)
    setShowApiModal(true)
  }

  const handleSaveApiKey = () => {
    if (!apiKeyInput.trim()) return
    setProviders(providers.map(p => 
      p.id === selectedProvider 
        ? { ...p, status: 'connected', apiKey: apiKeyInput.substring(0, 3) + '***' }
        : p
    ))
    setSuccessMessage('API key saved successfully!')
    setTimeout(() => setSuccessMessage(''), 3000)
    setShowApiModal(false)
    setApiKeyInput('')
    setSelectedProvider(null)
  }

  const handleToggleTemplate = (templateId: number) => {
    setTemplates(templates.map(t =>
      t.id === templateId ? { ...t, enabled: !t.enabled } : t
    ))
  }

  const handleSendTestEmail = () => {
    if (!testEmail.trim()) return
    setSuccessMessage(`Test email sent to ${testEmail}`)
    setTimeout(() => setSuccessMessage(''), 3000)
    setTestEmail('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Email Service Setup</h1>
          <p className="text-slate-600">Configure email providers and templates for reservation confirmations</p>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800 font-medium">{successMessage}</p>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-8 border-b border-slate-200">
          <button
            onClick={() => setActiveTab('providers')}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === 'providers'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Email Providers
          </button>
          <button
            onClick={() => setActiveTab('templates')}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === 'templates'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Email Templates
          </button>
          <button
            onClick={() => setActiveTab('test')}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === 'test'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Test Email
          </button>
        </div>

        {/* Providers Tab */}
        {activeTab === 'providers' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Email Providers</h2>
            {providers.map(provider => (
              <div key={provider.id} className="bg-white rounded-lg shadow p-6 flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-slate-900">{provider.name}</h3>
                  <p className="text-sm text-slate-600 mt-1">API Key: {provider.apiKey}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    provider.status === 'connected'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-slate-100 text-slate-800'
                  }`}>
                    {provider.status === 'connected' ? '✓ Connected' : 'Disconnected'}
                  </span>
                  {provider.status === 'disconnected' && (
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
        )}

        {/* Templates Tab */}
        {activeTab === 'templates' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Email Templates</h2>
            {templates.map(template => (
              <div key={template.id} className="bg-white rounded-lg shadow p-6 flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-slate-900">{template.name}</h3>
                  <p className="text-sm text-slate-600 mt-1">Subject: {template.subject}</p>
                </div>
                <button
                  onClick={() => handleToggleTemplate(template.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    template.enabled
                      ? 'bg-green-100 text-green-800 hover:bg-green-200'
                      : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                  }`}
                >
                  {template.enabled ? 'Enabled' : 'Disabled'}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Test Email Tab */}
        {activeTab === 'test' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Send Test Email</h2>
            <div className="bg-white rounded-lg shadow p-8">
              <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-900 mb-2">Recipient Email</label>
                <input
                  type="email"
                  value={testEmail}
                  onChange={(e) => setTestEmail(e.target.value)}
                  placeholder="Enter email address"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                onClick={handleSendTestEmail}
                disabled={!testEmail.trim()}
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-slate-300 transition-colors font-semibold"
              >
                Send Test Email
              </button>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Test Recipients</h3>
              <div className="space-y-3">
                {MOCK_TEST_RECIPIENTS.map(recipient => (
                  <div key={recipient.id} className="flex justify-between items-center p-3 bg-slate-50 rounded">
                    <span className="text-slate-700">{recipient.email}</span>
                    <span className="text-sm text-slate-500">Last: {recipient.lastTest}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* API Key Modal */}
      {showApiModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Enter API Key</h2>
            <input
              type="password"
              value={apiKeyInput}
              onChange={(e) => setApiKeyInput(e.target.value)}
              placeholder="Paste your API key here"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
            />
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowApiModal(false)
                  setApiKeyInput('')
                  setSelectedProvider(null)
                }}
                className="flex-1 px-4 py-2 border border-slate-300 text-slate-900 rounded-lg hover:bg-slate-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveApiKey}
                disabled={!apiKeyInput.trim()}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-slate-300 transition-colors font-medium"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}