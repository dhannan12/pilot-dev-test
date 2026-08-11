import React, { useState } from 'react'

const MOCK_EMAIL_PROVIDERS = [
  { id: 1, name: 'SendGrid', status: 'connected', apiKey: 'sg_test_****', lastVerified: '2024-01-15' },
  { id: 2, name: 'Mailgun', status: 'disconnected', apiKey: '', lastVerified: null },
  { id: 3, name: 'AWS SES', status: 'disconnected', apiKey: '', lastVerified: null }
]

const MOCK_EMAIL_TEMPLATES = [
  { id: 1, name: 'Reservation Confirmation', subject: 'Your reservation is confirmed', status: 'active' },
  { id: 2, name: 'Reservation Reminder', subject: 'Reminder: Your reservation is tomorrow', status: 'active' },
  { id: 3, name: 'Cancellation Notice', subject: 'Your reservation has been cancelled', status: 'inactive' },
  { id: 4, name: 'Payment Receipt', subject: 'Payment received for your reservation', status: 'active' }
]

const MOCK_TEST_RESULTS = [
  { id: 1, recipient: 'test@example.com', template: 'Reservation Confirmation', sentAt: '2024-01-20 14:32', status: 'delivered' },
  { id: 2, recipient: 'admin@example.com', template: 'Reservation Reminder', sentAt: '2024-01-20 14:15', status: 'delivered' },
  { id: 3, recipient: 'user@example.com', template: 'Payment Receipt', sentAt: '2024-01-20 13:45', status: 'failed' }
]

export default function SetupEmailService() {
  const [activeTab, setActiveTab] = useState('providers')
  const [providers, setProviders] = useState(MOCK_EMAIL_PROVIDERS)
  const [templates, setTemplates] = useState(MOCK_EMAIL_TEMPLATES)
  const [testResults, setTestResults] = useState(MOCK_TEST_RESULTS)
  const [showAddProvider, setShowAddProvider] = useState(false)
  const [selectedProvider, setSelectedProvider] = useState('')
  const [apiKeyInput, setApiKeyInput] = useState('')
  const [testEmail, setTestEmail] = useState('')

  const handleConnectProvider = () => {
    if (selectedProvider && apiKeyInput) {
      setProviders(providers.map(p => 
        p.name === selectedProvider 
          ? { ...p, status: 'connected', apiKey: apiKeyInput.slice(0, -4) + '****', lastVerified: new Date().toISOString().split('T')[0] }
          : p
      ))
      setShowAddProvider(false)
      setSelectedProvider('')
      setApiKeyInput('')
    }
  }

  const handleToggleTemplate = (id: number) => {
    setTemplates(templates.map(t => 
      t.id === id ? { ...t, status: t.status === 'active' ? 'inactive' : 'active' } : t
    ))
  }

  const handleSendTest = () => {
    if (testEmail) {
      const newResult = {
        id: testResults.length + 1,
        recipient: testEmail,
        template: 'Reservation Confirmation',
        sentAt: new Date().toLocaleString(),
        status: Math.random() > 0.3 ? 'delivered' : 'failed'
      }
      setTestResults([newResult, ...testResults])
      setTestEmail('')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Email Service Setup</h1>
          <p className="text-gray-600">Configure email providers and templates for reservation confirmations</p>
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
                onClick={() => setActiveTab('testing')}
                className={`px-6 py-4 font-medium text-sm border-b-2 transition-colors ${
                  activeTab === 'testing'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                Testing
              </button>
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'providers' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Email Providers</h2>
                  <button
                    onClick={() => setShowAddProvider(!showAddProvider)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    {showAddProvider ? 'Cancel' : 'Add Provider'}
                  </button>
                </div>

                {showAddProvider && (
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Select Provider</label>
                        <select
                          value={selectedProvider}
                          onChange={(e) => setSelectedProvider(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Choose a provider...</option>
                          {providers.filter(p => p.status === 'disconnected').map(p => (
                            <option key={p.id} value={p.name}>{p.name}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">API Key</label>
                        <input
                          type="password"
                          value={apiKeyInput}
                          onChange={(e) => setApiKeyInput(e.target.value)}
                          placeholder="Enter your API key"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <button
                        onClick={handleConnectProvider}
                        className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                      >
                        Connect Provider
                      </button>
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  {providers.map(provider => (
                    <div key={provider.id} className="p-4 border border-gray-200 rounded-lg flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{provider.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {provider.status === 'connected' ? `API Key: ${provider.apiKey}` : 'Not connected'}
                        </p>
                        {provider.lastVerified && (
                          <p className="text-xs text-gray-500 mt-1">Last verified: {provider.lastVerified}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          provider.status === 'connected'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {provider.status === 'connected' ? '✓ Connected' : 'Disconnected'}
                        </span>
                        {provider.status === 'connected' && (
                          <button className="text-red-600 hover:text-red-700 text-sm font-medium">Disconnect</button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'templates' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Email Templates</h2>
                <div className="space-y-3">
                  {templates.map(template => (
                    <div key={template.id} className="p-4 border border-gray-200 rounded-lg flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{template.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">Subject: {template.subject}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleToggleTemplate(template.id)}
                          className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                            template.status === 'active'
                              ? 'bg-green-100 text-green-700 hover:bg-green-200'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {template.status === 'active' ? 'Active' : 'Inactive'}
                        </button>
                        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">Edit</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'testing' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Test Email Service</h2>
                
                <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex gap-3">
                    <input
                      type="email"
                      value={testEmail}
                      onChange={(e) => setTestEmail(e.target.value)}
                      placeholder="Enter test email address"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={handleSendTest}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                      Send Test
                    </button>
                  </div>
                </div>

                <h3 className="font-semibold text-gray-900 mb-4">Recent Test Results</h3>
                <div className="space-y-3">
                  {testResults.map(result => (
                    <div key={result.id} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{result.recipient}</p>
                          <p className="text-sm text-gray-600 mt-1">Template: {result.template}</p>
                          <p className="text-xs text-gray-500 mt-1">Sent: {result.sentAt}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          result.status === 'delivered'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {result.status === 'delivered' ? '✓ Delivered' : '✗ Failed'}
                        </span>
                      </div>
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