import React, { useState } from 'react';

const MOCK_EMAIL_PROVIDERS = [
  { id: 1, name: 'SendGrid', status: 'connected', apiKey: 'sg_test_***', lastVerified: '2024-01-15' },
  { id: 2, name: 'Mailgun', status: 'disconnected', apiKey: '', lastVerified: null },
  { id: 3, name: 'AWS SES', status: 'disconnected', apiKey: '', lastVerified: null },
];

const MOCK_EMAIL_TEMPLATES = [
  { id: 1, name: 'Reservation Confirmation', subject: 'Your reservation is confirmed', status: 'active' },
  { id: 2, name: 'Reservation Reminder', subject: 'Reminder: Your reservation is tomorrow', status: 'active' },
  { id: 3, name: 'Cancellation Notice', subject: 'Your reservation has been cancelled', status: 'inactive' },
  { id: 4, name: 'Payment Receipt', subject: 'Payment receipt for your reservation', status: 'active' },
];

const MOCK_TEST_RESULTS = [
  { id: 1, timestamp: '2024-01-15 14:30', recipient: 'test@example.com', status: 'success', template: 'Reservation Confirmation' },
  { id: 2, timestamp: '2024-01-15 14:25', recipient: 'admin@example.com', status: 'success', template: 'Reservation Reminder' },
  { id: 3, timestamp: '2024-01-15 14:20', recipient: 'user@example.com', status: 'failed', template: 'Payment Receipt' },
];

export default function SetupEmailService() {
  const [activeTab, setActiveTab] = useState<'providers' | 'templates' | 'test'>('providers');
  const [providers, setProviders] = useState(MOCK_EMAIL_PROVIDERS);
  const [templates, setTemplates] = useState(MOCK_EMAIL_TEMPLATES);
  const [testResults, setTestResults] = useState(MOCK_TEST_RESULTS);
  const [showApiKeyForm, setShowApiKeyForm] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<number | null>(null);
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [testEmail, setTestEmail] = useState('');
  const [testTemplate, setTestTemplate] = useState('Reservation Confirmation');

  const handleConnectProvider = (providerId: number) => {
    setSelectedProvider(providerId);
    setShowApiKeyForm(true);
  };

  const handleSaveApiKey = () => {
    if (selectedProvider && apiKeyInput) {
      setProviders(providers.map(p => 
        p.id === selectedProvider 
          ? { ...p, status: 'connected', apiKey: apiKeyInput.slice(0, 3) + '_***', lastVerified: new Date().toISOString().split('T')[0] }
          : p
      ));
      setShowApiKeyForm(false);
      setApiKeyInput('');
      setSelectedProvider(null);
    }
  };

  const handleToggleTemplate = (templateId: number) => {
    setTemplates(templates.map(t =>
      t.id === templateId
        ? { ...t, status: t.status === 'active' ? 'inactive' : 'active' }
        : t
    ));
  };

  const handleSendTest = () => {
    if (testEmail && testTemplate) {
      const newResult = {
        id: testResults.length + 1,
        timestamp: new Date().toLocaleString(),
        recipient: testEmail,
        status: Math.random() > 0.3 ? 'success' : 'failed',
        template: testTemplate,
      };
      setTestResults([newResult, ...testResults]);
      setTestEmail('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Email Service Setup</h1>
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
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Email Providers</h2>
                <div className="space-y-4">
                  {providers.map(provider => (
                    <div key={provider.id} className="border border-gray-200 rounded-lg p-4 flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{provider.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">API Key: {provider.apiKey || 'Not configured'}</p>
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
                        <button
                          onClick={() => handleConnectProvider(provider.id)}
                          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm font-medium"
                        >
                          {provider.status === 'connected' ? 'Update' : 'Connect'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {showApiKeyForm && (
                  <div className="mt-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h3 className="font-semibold text-gray-900 mb-4">Configure API Key</h3>
                    <div className="space-y-4">
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
                      <div className="flex gap-2">
                        <button
                          onClick={handleSaveApiKey}
                          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-sm font-medium"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => {
                            setShowApiKeyForm(false);
                            setApiKeyInput('');
                            setSelectedProvider(null);
                          }}
                          className="px-4 py-2 bg-gray-300 text-gray-900 rounded hover:bg-gray-400 transition-colors text-sm font-medium"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'templates' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Email Templates</h2>
                <div className="space-y-3">
                  {templates.map(template => (
                    <div key={template.id} className="border border-gray-200 rounded-lg p-4 flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{template.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">Subject: {template.subject}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleToggleTemplate(template.id)}
                          className={`px-4 py-2 rounded transition-colors text-sm font-medium ${
                            template.status === 'active'
                              ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {template.status === 'active' ? 'Disable' : 'Enable'}
                        </button>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          template.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {template.status === 'active' ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'test' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Test Email Service</h2>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
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
                        value={testTemplate}
                        onChange={(e) => setTestTemplate(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {templates.filter(t => t.status === 'active').map(t => (
                          <option key={t.id} value={t.name}>{t.name}</option>
                        ))}
                      </select>
                    </div>
                    <button
                      onClick={handleSendTest}
                      className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors font-medium"
                    >
                      Send Test Email
                    </button>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-3">Test Results</h3>
                <div className="space-y-3">
                  {testResults.map(result => (
                    <div key={result.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{result.template}</p>
                          <p className="text-sm text-gray-600 mt-1">To: {result.recipient}</p>
                          <p className="text-xs text-gray-500 mt-1">{result.timestamp}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          result.status === 'success'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {result.status === 'success' ? '✓ Success' : '✗ Failed'}
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
  );
}