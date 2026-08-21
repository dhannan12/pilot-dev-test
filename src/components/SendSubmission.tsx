/**
 * SendSubmission — Send submission confirmation emails for absence reports
 *
 * Features: email composition, recipient list, template selection, send confirmation, email history
 *
 * Ticket: SCRUM-1081 | Branch: proto/SCRUM-1070
 */

import { useState } from 'react'

interface EmailRecipient {
  id: string
  name: string
  email: string
  role: string
}

interface EmailTemplate {
  id: string
  name: string
  subject: string
  body: string
}

interface SentEmail {
  id: string
  recipient: string
  subject: string
  sentAt: string
  status: 'sent' | 'pending' | 'failed'
}

const MOCK_RECIPIENTS: EmailRecipient[] = [
  { id: '1', name: 'Sarah Johnson', email: 'sarah.johnson@school.edu', role: 'Parent' },
  { id: '2', name: 'Michael Smith', email: 'michael.smith@school.edu', role: 'Parent' },
  { id: '3', name: 'Jennifer Williams', email: 'jennifer.williams@school.edu', role: 'Parent' },
  { id: '4', name: 'David Brown', email: 'david.brown@school.edu', role: 'Parent' },
  { id: '5', name: 'Emily Davis', email: 'emily.davis@school.edu', role: 'Parent' },
]

const EMAIL_TEMPLATES: EmailTemplate[] = [
  {
    id: '1',
    name: 'Standard Confirmation',
    subject: 'Absence Report Confirmation',
    body: 'Your absence report has been received and is being processed. We will contact you if additional information is needed.',
  },
  {
    id: '2',
    name: 'Approved Notification',
    subject: 'Absence Report Approved',
    body: 'Your absence report has been approved. Thank you for notifying us promptly.',
  },
  {
    id: '3',
    name: 'Pending Review',
    subject: 'Absence Report Under Review',
    body: 'Your absence report is currently under review. Please allow 24-48 hours for processing.',
  },
  {
    id: '4',
    name: 'Documentation Required',
    subject: 'Additional Documentation Required',
    body: 'Please provide additional documentation to support the absence report. Contact the office for details.',
  },
  {
    id: '5',
    name: 'Thank You',
    subject: 'Thank You for Your Report',
    body: 'Thank you for submitting your absence report. This helps us maintain accurate attendance records.',
  },
]

const MOCK_SENT_EMAILS: SentEmail[] = [
  {
    id: '1',
    recipient: 'sarah.johnson@school.edu',
    subject: 'Absence Report Confirmation',
    sentAt: '2026-08-21 09:15',
    status: 'sent',
  },
  {
    id: '2',
    recipient: 'michael.smith@school.edu',
    subject: 'Absence Report Approved',
    sentAt: '2026-08-21 09:10',
    status: 'sent',
  },
  {
    id: '3',
    recipient: 'jennifer.williams@school.edu',
    subject: 'Absence Report Under Review',
    sentAt: '2026-08-21 08:45',
    status: 'sent',
  },
  {
    id: '4',
    recipient: 'david.brown@school.edu',
    subject: 'Additional Documentation Required',
    sentAt: '2026-08-21 08:30',
    status: 'pending',
  },
  {
    id: '5',
    recipient: 'emily.davis@school.edu',
    subject: 'Thank You for Your Report',
    sentAt: '2026-08-21 08:00',
    status: 'sent',
  },
]

export default function SendSubmission() {
  const [selectedRecipient, setSelectedRecipient] = useState('')
  const [selectedTemplate, setSelectedTemplate] = useState('')
  const [customSubject, setCustomSubject] = useState('')
  const [customBody, setCustomBody] = useState('')
  const [sentEmails, setSentEmails] = useState<SentEmail[]>(MOCK_SENT_EMAILS)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleTemplateChange = (templateId: string) => {
    setSelectedTemplate(templateId)
    const template = EMAIL_TEMPLATES.find((t) => t.id === templateId)
    if (template) {
      setCustomSubject(template.subject)
      setCustomBody(template.body)
    }
  }

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedRecipient || !customSubject || !customBody) {
      alert('Please fill in all required fields')
      return
    }

    const recipient = MOCK_RECIPIENTS.find((r) => r.id === selectedRecipient)
    if (!recipient) return

    const newEmail: SentEmail = {
      id: Date.now().toString(),
      recipient: recipient.email,
      subject: customSubject,
      sentAt: new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      }),
      status: 'sent',
    }

    setSentEmails([newEmail, ...sentEmails])
    setShowSuccess(true)

    // Reset form
    setTimeout(() => {
      setSelectedRecipient('')
      setSelectedTemplate('')
      setCustomSubject('')
      setCustomBody('')
      setShowSuccess(false)
    }, 2000)
  }

  return (
    <div data-testid="sendsubmission" className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Send Submission Confirmation Emails
          </h1>
          <p className="text-gray-600 mb-6">
            Send confirmation emails to parents regarding their absence report submissions
          </p>

          {showSuccess && (
            <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
              ✓ Email sent successfully!
            </div>
          )}

          <form onSubmit={handleSendEmail} className="space-y-6">
            {/* Recipient Selection */}
            <div>
              <label
                htmlFor="recipient"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Select Recipient <span className="text-red-500">*</span>
              </label>
              <select
                id="recipient"
                data-testid="sendsubmission-recipient"
                value={selectedRecipient}
                onChange={(e) => setSelectedRecipient(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">-- Select a recipient --</option>
                {MOCK_RECIPIENTS.map((recipient) => (
                  <option key={recipient.id} value={recipient.id}>
                    {recipient.name} ({recipient.email}) - {recipient.role}
                  </option>
                ))}
              </select>
            </div>

            {/* Template Selection */}
            <div>
              <label
                htmlFor="template"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Template
              </label>
              <select
                id="template"
                data-testid="sendsubmission-template"
                value={selectedTemplate}
                onChange={(e) => handleTemplateChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">-- Select a template (optional) --</option>
                {EMAIL_TEMPLATES.map((template) => (
                  <option key={template.id} value={template.id}>
                    {template.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Custom Subject */}
            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Subject <span className="text-red-500">*</span>
              </label>
              <input
                id="subject"
                type="text"
                data-testid="sendsubmission-subject"
                value={customSubject}
                onChange={(e) => setCustomSubject(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter email subject"
                required
              />
            </div>

            {/* Custom Body */}
            <div>
              <label
                htmlFor="body"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Body <span className="text-red-500">*</span>
              </label>
              <textarea
                id="body"
                data-testid="sendsubmission-body"
                value={customBody}
                onChange={(e) => setCustomBody(e.target.value)}
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter email body content"
                required
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                type="submit"
                data-testid="sendsubmission-submit"
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Send Email
              </button>
              <button
                type="button"
                data-testid="sendsubmission-clear"
                onClick={() => {
                  setSelectedRecipient('')
                  setSelectedTemplate('')
                  setCustomSubject('')
                  setCustomBody('')
                }}
                className="px-6 bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
              >
                Clear
              </button>
            </div>
          </form>

          {/* Sent Emails History */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Email History
            </h2>
            <div data-testid="sendsubmission-list" className="space-y-3">
              {sentEmails.map((email) => (
                <div
                  key={email.id}
                  data-testid="sendsubmission-item"
                  className="p-4 bg-gray-50 rounded-md border border-gray-200"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">
                        {email.subject}
                      </p>
                      <p className="text-sm text-gray-600">
                        To: {email.recipient}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded ${
                        email.status === 'sent'
                          ? 'bg-green-100 text-green-800'
                          : email.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {email.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">{email.sentAt}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
