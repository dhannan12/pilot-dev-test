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
  type: 'confirmation' | 'cancellation' | 'reminder';
  enabled: boolean;
}

interface ReservationSettings {
  id: string;
  sendConfirmation: boolean;
  sendReminder: boolean;
  reminderHoursBefore: number;
  fromEmail: string;
  replyToEmail: string;
}

const SetupEmailService: React.FC = () => {
  const [providers, setProviders] = useState<EmailProvider[]>(mockEmailProviders);
  const [templates, setTemplates] = useState<EmailTemplate[]>(mockEmailTemplates);
  const [settings, setSettings] = useState<ReservationSettings>(mockReservationSettings);
  const [selectedProvider, setSelectedProvider] = useState<string>('');
  const [fromEmail, setFromEmail] = useState<string>(settings.fromEmail);
  const [replyToEmail, setReplyToEmail] = useState<string>(settings.replyToEmail);
  const [reminderHours, setReminderHours] = useState<number>(settings.reminderHoursBefore);
  const [successMessage, setSuccessMessage] = useState<string>('');

  const handleProviderSelect = (providerId: string) => {
    setSelectedProvider(providerId);
    setProviders(
      providers.map((p) =>
        p.id === providerId ? { ...p, configured: true } : p
      )
    );
    setSuccessMessage(`${providers.find((p) => p.id === providerId)?.name} configured successfully!`);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleTemplateToggle = (templateId: string) => {
    setTemplates(
      templates.map((t) =>
        t.id === templateId ? { ...t, enabled: !t.enabled } : t
      )
    );
  };

  const handleSettingsSave = () => {
    setSettings({
      ...settings,
      fromEmail,
      replyToEmail,
      reminderHoursBefore: reminderHours,
    });
    setSuccessMessage('Email settings saved successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const configuredProvider = providers.find((p) => p.configured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Mail className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-slate-900">Email Service Setup</h1>
          </div>
          <p className="text-slate-600">Configure email providers and templates for reservation confirmations</p>
        </div>

        {/* Success Alert */}
        {successMessage && (
          <Alert className="bg-green-50 border-green-200">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">{successMessage}</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Email Providers */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-lg">Email Providers</CardTitle>
              <CardDescription>Select and configure your email service</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {providers.map((provider) => (
                <button
                  key={provider.id}
                  onClick={() => handleProviderSelect(provider.id)}
                  className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                    provider.configured
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-slate-900">{provider.name}</p>
                      <p className="text-xs text-slate-500">{provider.description}</p>
                    </div>
                    {provider.configured && <CheckCircle2 className="w-5 h-5 text-blue-600" />}
                  </div>
                </button>
              ))}
            </CardContent>
          </Card>

          {/* Email Templates */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-lg">Email Templates</CardTitle>
              <CardDescription>Enable/disable email types</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {templates.map((template) => (
                <div
                  key={template.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200"
                >
                  <div className="flex-1">
                    <p className="font-medium text-slate-900">{template.name}</p>
                    <p className="text-xs text-slate-500">{template.subject}</p>
                  </div>
                  <button
                    onClick={() => handleTemplateToggle(template.id)}
                    className={`px-3 py-1 rounded text-xs font-medium transition-all ${
                      template.enabled
                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                        : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                    }`}
                  >
                    {template.enabled ? 'Enabled' : 'Disabled'}
                  </button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Settings */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Settings
              </CardTitle>
              <CardDescription>Configure email preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="from-email" className="text-sm font-medium">
                  From Email
                </Label>
                <Input
                  id="from-email"
                  type="email"
                  value={fromEmail}
                  onChange={(e) => setFromEmail(e.target.value)}
                  placeholder="noreply@example.com"
                  className="text-sm"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="reply-email" className="text-sm font-medium">
                  Reply-To Email
                </Label>
                <Input
                  id="reply-email"
                  type="email"
                  value={replyToEmail}
                  onChange={(e) => setReplyToEmail(e.target.value)}
                  placeholder="support@example.com"
                  className="text-sm"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="reminder-hours" className="text-sm font-medium">
                  Reminder Hours Before
                </Label>
                <Input
                  id="reminder-hours"
                  type="number"
                  value={reminderHours}
                  onChange={(e) => setReminderHours(parseInt(e.target.value))}
                  min="1"
                  max="72"
                  className="text-sm"
                />
              </div>

              <Button
                onClick={handleSettingsSave}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                Save Settings
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Status Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Configuration Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                <p className="text-sm text-slate-600 mb-1">Email Provider</p>
                <p className="text-lg font-semibold text-slate-900">
                  {configuredProvider?.name || 'Not configured'}
                </p>
              </div>
              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                <p className="text-sm text-slate-600 mb-1">Active Templates</p>
                <p className="text-lg font-semibold text-slate-900">
                  {templates.filter((t) => t.enabled).length} of {templates.length}
                </p>
              </div>
              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                <p className="text-sm text-slate-600 mb-1">Reminder Timing</p>
                <p className="text-lg font-semibold text-slate-900">{reminderHours} hours before</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SetupEmailService;