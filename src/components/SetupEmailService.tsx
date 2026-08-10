import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle2, AlertCircle, Mail, Settings } from 'lucide-react';
import { mockEmailProviders, mockEmailTemplates, mockReservationSettings } from './SetupEmailService.mock';

interface EmailProvider {
  id: string;
  name: string;
  description: string;
  configured: boolean;
}

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  type: 'confirmation' | 'reminder' | 'cancellation';
  enabled: boolean;
}

interface ReservationSettings {
  id: string;
  setting: string;
  value: string;
  description: string;
}

const SetupEmailService: React.FC = () => {
  const [selectedProvider, setSelectedProvider] = useState<string>('');
  const [apiKey, setApiKey] = useState<string>('');
  const [senderEmail, setSenderEmail] = useState<string>('');
  const [providers] = useState<EmailProvider[]>(mockEmailProviders);
  const [templates] = useState<EmailTemplate[]>(mockEmailTemplates);
  const [settings] = useState<ReservationSettings[]>(mockReservationSettings);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'provider' | 'templates' | 'settings'>('provider');

  const handleSaveProvider = () => {
    if (selectedProvider && apiKey && senderEmail) {
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    }
  };

  const configuredProvider = providers.find(p => p.configured);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Email Service Setup</h1>
        <p className="text-gray-600">Configure email provider for reservation confirmations</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 border-b">
        <button
          onClick={() => setActiveTab('provider')}
          className={`px-4 py-2 font-medium border-b-2 transition-colors ${
            activeTab === 'provider'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          <Mail className="inline mr-2 h-4 w-4" />
          Provider
        </button>
        <button
          onClick={() => setActiveTab('templates')}
          className={`px-4 py-2 font-medium border-b-2 transition-colors ${
            activeTab === 'templates'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          Templates
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`px-4 py-2 font-medium border-b-2 transition-colors ${
            activeTab === 'settings'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          <Settings className="inline mr-2 h-4 w-4" />
          Settings
        </button>
      </div>

      {/* Provider Configuration */}
      {activeTab === 'provider' && (
        <Card>
          <CardHeader>
            <CardTitle>Email Provider Configuration</CardTitle>
            <CardDescription>Select and configure your email service provider</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {configuredProvider && (
              <Alert className="border-green-200 bg-green-50">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  {configuredProvider.name} is currently configured
                </AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="provider-select">Email Provider</Label>
              <Select value={selectedProvider} onValueChange={setSelectedProvider}>
                <SelectTrigger id="provider-select">
                  <SelectValue placeholder="Select an email provider" />
                </SelectTrigger>
                <SelectContent>
                  {providers.map(provider => (
                    <SelectItem key={provider.id} value={provider.id}>
                      {provider.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-sm text-gray-500">
                {providers.find(p => p.id === selectedProvider)?.description}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="sender-email">Sender Email Address</Label>
              <Input
                id="sender-email"
                type="email"
                placeholder="noreply@reservations.com"
                value={senderEmail}
                onChange={e => setSenderEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="api-key">API Key</Label>
              <Input
                id="api-key"
                type="password"
                placeholder="Enter your API key"
                value={apiKey}
                onChange={e => setApiKey(e.target.value)}
              />
              <p className="text-sm text-gray-500">Your API key is encrypted and stored securely</p>
            </div>

            {savedSuccess && (
              <Alert className="border-green-200 bg-green-50">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  Configuration saved successfully
                </AlertDescription>
              </Alert>
            )}

            <Button onClick={handleSaveProvider} className="w-full">Save Configuration</Button>
          </CardContent>
        </Card>
      )}

      {/* Email Templates */}
      {activeTab === 'templates' && (
        <Card>
          <CardHeader>
            <CardTitle>Email Templates</CardTitle>
            <CardDescription>Manage email templates for reservation communications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {templates.map(template => (
                <div key={template.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold">{template.name}</h3>
                      <p className="text-sm text-gray-600">Subject: {template.subject}</p>
                      <span className="inline-block mt-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                        {template.type}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {template.enabled ? (
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Edit Template</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Reservation Settings */}
      {activeTab === 'settings' && (
        <Card>
          <CardHeader>
            <CardTitle>Reservation Settings</CardTitle>
            <CardDescription>Configure email behavior for reservations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {settings.map(setting => (
                <div key={setting.id} className="border rounded-lg p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{setting.setting}</h3>
                      <p className="text-sm text-gray-600">{setting.description}</p>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-2 rounded text-sm font-mono text-gray-700">
                    {setting.value}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SetupEmailService;