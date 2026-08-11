import React, { useState } from 'react';

const MOCK_EMAIL_PROVIDERS = [
  { id: 1, name: 'SendGrid', status: 'connected', apiKey: 'sg_test_****' },
  { id: 2, name: 'Mailgun', status: 'disconnected', apiKey: '' },
  { id: 3, name: 'AWS SES', status: 'disconnected', apiKey: '' },
];

const MOCK_EMAIL_TEMPLATES = [
  { id: 1, name: 'Reservation Confirmation', subject: 'Your reservation is confirmed', status: 'active' },
  { id: 2, name: 'Reservation Reminder', subject: 'Reminder: Your reservation is tomorrow', status: 'active' },
  { id: 3, name: 'Cancellation Notice', subject: 'Your reservation has been cancelled', status: 'inactive' },
];

const MOCK_TEST_EMAILS = [
  { id: 1, recipient: 'customer@example.com', template: 'Reservation Confirmation', sentAt: '2024-01-15 10:30 AM', status: 'delivered' },
  { id: 2, recipient: 'user@test.com', template: 'Reservation Reminder', sentAt: '2024-01-14 09:15 AM', status: 'delivered' },
  { id: 3, recipient: 'admin@company.com', template: 'Cancellation Notice', sentAt: '2024-01-13 02:45 PM', status: 'failed' },
];

export default function SetupEmailService() {
  const [activeTab, setActiveTab] = useState<'providers' | 'templates' | 'test'>('providers');
  const [providers, setProviders] = useState(MOCK_EMAIL_PROVIDERS);
  const [templates, setTemplates] = useState(MOCK_EMAIL_TEMPLATES);
  const [testEmails, setTestEmails] = useState(MOCK_TEST_EMAILS);
  const [showAddProvider, setShowAddProvider] = useState(false);
  const [newProviderName, setNewProviderName] = useState('');
  const [testEmailAddress, setTestEmailAddress] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');

  const handleConnectProvider = (id: number) => {
    setProviders(providers.map(p => p.id === id ? { ...p, status: 'connected', apiKey: 'sg_test_****' } : p));
  };

  const handleToggleTemplate = (id: number) => {
    setTemplates(templates.map(t => t.id === id ? { ...t, status: t.status === 'active' ? 'inactive' : 'active' } : t));
  };

  const handleSendTestEmail = () => {
    if (testEmailAddress && selectedTemplate) {
      const newTest = {
        id: testEmails.length + 1,
        recipient: testEmailAddress,
        template: selectedTemplate,
        sentAt: new Date().toLocaleString(),
        status: 'delivered',
      };
      setTestEmails([newTest, ...testEmails]);
      setTestEmailAddress('');
      setSelectedTemplate('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Email Service Setup</h1>
          <p className="text-lg text-slate-600">Configure email providers and templates for reservation confirmations</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-8 border-b border-slate-200">
          <button
            onClick={() => setActiveTab('providers')}
            className={`px-6 py-3 font-semibold transition-all ${
              activeTab === 'providers'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Email Providers
          </button>
          <button
            onClick={() => setActiveTab('templates')}
            className={`px-6 py-3 font-semibold transition-all ${
              activeTab === 'templates'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Email Templates
          </button>
          <button
            onClick={() => setActiveTab('test')}
            className={`px-6 py-3 font-semibold transition-all ${
              activeTab === 'test'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Test Emails
          </button>
        </div>

        {/* Providers Tab */}
        {activeTab === 'providers' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-slate-900">Email Providers</h2>
              <button
                onClick={() => setShowAddProvider(!showAddProvider)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                {showAddProvider ? 'Cancel' : '+ Add Provider'}
              </button>
            </div>

            {showAddProvider && (
              <div className="bg-white rounded-lg shadow-md p-6 border border-slate-200">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Provider Name</label>
                    <input
                      type="text"
                      value={newProviderName}
                      onChange={(e) => setNewProviderName(e.target.value)}
                      placeholder="e.g., SendGrid, Mailgun"
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold">
                    Add Provider
                  </button>
                </div>
              </div>
            )}

            <div className="grid gap-4">
              {providers.map((provider) => (
                <div key={provider.id} className="bg-white rounded-lg shadow-md p-6 border border-slate-200 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-slate-900">{provider.name}</h3>
                      <p className="text-sm text-slate-600 mt-1">API Key: {provider.apiKey}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        provider.status === 'connected'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {provider.status === 'connected' ? '✓ Connected' : 'Disconnected'}
                      </span>
                      {provider.status === 'disconnected' && (
                        <button
                          onClick={() => handleConnectProvider(provider.id)}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                        >
                          Connect
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Templates Tab */}
        {activeTab === 'templates' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">Email Templates</h2>
            <div className="grid gap-4">
              {templates.map((template) => (
                <div key={template.id} className="bg-white rounded-lg shadow-md p-6 border border-slate-200 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-slate-900">{template.name}</h3>
                      <p className="text-sm text-slate-600 mt-1">Subject: {template.subject}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        template.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {template.status === 'active' ? '✓ Active' : 'Inactive'}
                      </span>
                      <button
                        onClick={() => handleToggleTemplate(template.id)}
                        className={`px-4 py-2 rounded-lg transition-colors font-semibold ${
                          template.status === 'active'
                            ? 'bg-red-600 text-white hover:bg-red-700'
                            : 'bg-green-600 text-white hover:bg-green-700'
                        }`}
                      >
                        {template.status === 'active' ? 'Disable' : 'Enable'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Test Emails Tab */}
        {activeTab === 'test' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">Send Test Email</h2>
            
            <div className="bg-white rounded-lg shadow-md p-6 border border-slate-200">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    value={testEmailAddress}
                    onChange={(e) => setTestEmailAddress(e.target.value)}
                    placeholder="test@example.com"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Template</label>
                  <select
                    value={selectedTemplate}
                    onChange={(e) => setSelectedTemplate(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select a template</option>
                    {templates.map((t) => (
                      <option key={t.id} value={t.name}>
                        {t.name}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  onClick={handleSendTestEmail}
                  disabled={!testEmailAddress || !selectedTemplate}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold disabled:bg-slate-400 disabled:cursor-not-allowed"
                >
                  Send Test Email
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Test Email History</h3>
              <div className="grid gap-4">
                {testEmails.map((email) => (
                  <div key={email.id} className="bg-white rounded-lg shadow-md p-6 border border-slate-200">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="font-semibold text-slate-900">{email.recipient}</p>
                        <p className="text-sm text-slate-600 mt-1">Template: {email.template}</p>
                        <p className="text-sm text-slate-500 mt-1">Sent: {email.sentAt}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        email.status === 'delivered'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {email.status === 'delivered' ? '✓ Delivered' : '✗ Failed'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}