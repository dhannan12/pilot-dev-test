/**
 * Create — Form interface for creating legal cases with client info, documents, and time tracking
 *
 * Features: case creation form, client information input, document checklist setup, time logging fields, form validation
 *
 * Ticket: SCRUM-912 | Branch: proto/SCRUM-903
 */

import React from 'react'

interface CaseType {
  id: string
  name: string
  description: string
}

interface DocumentTemplate {
  id: string
  name: string
  category: string
}

interface AttorneyOption {
  id: string
  name: string
  specialization: string
}

const mockCaseTypes: CaseType[] = [
  { id: '1', name: 'Civil Litigation', description: 'Civil disputes and lawsuits' },
  { id: '2', name: 'Corporate Law', description: 'Business and corporate matters' },
  { id: '3', name: 'Family Law', description: 'Divorce, custody, and family matters' },
  { id: '4', name: 'Criminal Defense', description: 'Criminal cases and defense' },
  { id: '5', name: 'Real Estate', description: 'Property and real estate transactions' },
]

const mockDocumentTemplates: DocumentTemplate[] = [
  { id: '1', name: 'Complaint Filing', category: 'Court Documents' },
  { id: '2', name: 'Client Agreement', category: 'Contracts' },
  { id: '3', name: 'Evidence Submission', category: 'Court Documents' },
  { id: '4', name: 'Discovery Request', category: 'Court Documents' },
  { id: '5', name: 'Retainer Agreement', category: 'Contracts' },
  { id: '6', name: 'Power of Attorney', category: 'Legal Documents' },
]

const mockAttorneys: AttorneyOption[] = [
  { id: '1', name: 'Sarah Johnson', specialization: 'Civil Litigation' },
  { id: '2', name: 'Michael Chen', specialization: 'Corporate Law' },
  { id: '3', name: 'Emily Rodriguez', specialization: 'Family Law' },
  { id: '4', name: 'David Thompson', specialization: 'Criminal Defense' },
  { id: '5', name: 'Lisa Anderson', specialization: 'Real Estate' },
]

export default function Create() {
  const [formStep, setFormStep] = React.useState<number>(1)
  const [selectedCaseType, setSelectedCaseType] = React.useState<string>('')
  const [selectedDocuments, setSelectedDocuments] = React.useState<string[]>([])
  const [caseNumber, setCaseNumber] = React.useState<string>('')
  const [clientName, setClientName] = React.useState<string>('')
  const [clientEmail, setClientEmail] = React.useState<string>('')
  const [clientPhone, setClientPhone] = React.useState<string>('')
  const [caseDescription, setCaseDescription] = React.useState<string>('')
  const [assignedAttorney, setAssignedAttorney] = React.useState<string>('')
  const [estimatedHours, setEstimatedHours] = React.useState<string>('')
  const [hourlyRate, setHourlyRate] = React.useState<string>('')

  const handleDocumentToggle = (docId: string) => {
    setSelectedDocuments((prev) =>
      prev.includes(docId) ? prev.filter((id) => id !== docId) : [...prev, docId]
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Form submission logic would go here
    console.log('Case created successfully')
  }

  const handleNextStep = () => {
    if (formStep < 4) setFormStep(formStep + 1)
  }

  const handlePrevStep = () => {
    if (formStep > 1) setFormStep(formStep - 1)
  }

  return (
    <div data-testid="create" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Legal Case</h1>
          <p className="text-gray-600">Set up a new case with client information, documents, and time tracking</p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8 bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4].map((step) => (
              <React.Fragment key={step}>
                <div className="flex items-center">
                  <div
                    data-testid={`create-step-${step}`}
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      formStep >= step
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {step}
                  </div>
                  <span className="ml-3 text-sm font-medium text-gray-700 hidden sm:inline">
                    {step === 1 && 'Case Info'}
                    {step === 2 && 'Client Details'}
                    {step === 3 && 'Documents'}
                    {step === 4 && 'Time Tracking'}
                  </span>
                </div>
                {step < 4 && (
                  <div
                    className={`flex-1 h-1 mx-4 ${
                      formStep > step ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  ></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
          {/* Step 1: Case Information */}
          {formStep === 1 && (
            <div data-testid="create-step1" className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Case Information</h2>
              
              <div>
                <label htmlFor="caseNumber" className="block text-sm font-medium text-gray-700 mb-2">
                  Case Number *
                </label>
                <input
                  id="caseNumber"
                  data-testid="create-casenumber"
                  type="text"
                  value={caseNumber}
                  onChange={(e) => setCaseNumber(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="CASE-2024-XXX"
                />
              </div>

              <div>
                <label htmlFor="caseType" className="block text-sm font-medium text-gray-700 mb-2">
                  Case Type *
                </label>
                <select
                  id="caseType"
                  data-testid="create-casetype"
                  value={selectedCaseType}
                  onChange={(e) => setSelectedCaseType(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select a case type</option>
                  {mockCaseTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name} - {type.description}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="assignedAttorney" className="block text-sm font-medium text-gray-700 mb-2">
                  Assigned Attorney *
                </label>
                <select
                  id="assignedAttorney"
                  data-testid="create-attorney"
                  value={assignedAttorney}
                  onChange={(e) => setAssignedAttorney(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select an attorney</option>
                  {mockAttorneys.map((attorney) => (
                    <option key={attorney.id} value={attorney.id}>
                      {attorney.name} - {attorney.specialization}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="caseDescription" className="block text-sm font-medium text-gray-700 mb-2">
                  Case Description *
                </label>
                <textarea
                  id="caseDescription"
                  data-testid="create-description"
                  value={caseDescription}
                  onChange={(e) => setCaseDescription(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Brief description of the case..."
                ></textarea>
              </div>
            </div>
          )}

          {/* Step 2: Client Information */}
          {formStep === 2 && (
            <div data-testid="create-step2" className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Client Information</h2>
              
              <div>
                <label htmlFor="clientName" className="block text-sm font-medium text-gray-700 mb-2">
                  Client Full Name *
                </label>
                <input
                  id="clientName"
                  data-testid="create-clientname"
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="clientEmail" className="block text-sm font-medium text-gray-700 mb-2">
                  Client Email *
                </label>
                <input
                  id="clientEmail"
                  data-testid="create-clientemail"
                  type="email"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="client@example.com"
                />
              </div>

              <div>
                <label htmlFor="clientPhone" className="block text-sm font-medium text-gray-700 mb-2">
                  Client Phone *
                </label>
                <input
                  id="clientPhone"
                  data-testid="create-clientphone"
                  type="tel"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-medium text-blue-900 mb-2">Client Information Guidelines</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Verify all contact information for accuracy</li>
                  <li>• Ensure client consent for data collection</li>
                  <li>• All fields marked with * are required</li>
                </ul>
              </div>
            </div>
          )}

          {/* Step 3: Document Checklist */}
          {formStep === 3 && (
            <div data-testid="create-step3" className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Document Checklist</h2>
              <p className="text-gray-600 mb-4">
                Select the documents required for this case. These will be added to the case checklist.
              </p>

              <div data-testid="create-documentlist" className="space-y-3">
                {mockDocumentTemplates.map((doc) => (
                  <div
                    key={doc.id}
                    data-testid="create-documentitem"
                    className="flex items-center justify-between p-4 border border-gray-300 rounded-lg hover:border-blue-500 transition-colors"
                  >
                    <div className="flex items-center">
                      <input
                        data-testid={`create-document-${doc.id}`}
                        type="checkbox"
                        checked={selectedDocuments.includes(doc.id)}
                        onChange={() => handleDocumentToggle(doc.id)}
                        className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                      />
                      <div className="ml-4">
                        <div className="font-medium text-gray-900">{doc.name}</div>
                        <div className="text-sm text-gray-500">{doc.category}</div>
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        selectedDocuments.includes(doc.id)
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {selectedDocuments.includes(doc.id) ? 'Selected' : 'Not Selected'}
                    </span>
                  </div>
                ))}
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="font-medium text-green-900">
                  {selectedDocuments.length} document{selectedDocuments.length !== 1 ? 's' : ''} selected
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Time Logging Setup */}
          {formStep === 4 && (
            <div data-testid="create-step4" className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Time Tracking Setup</h2>
              
              <div>
                <label htmlFor="estimatedHours" className="block text-sm font-medium text-gray-700 mb-2">
                  Estimated Hours *
                </label>
                <input
                  id="estimatedHours"
                  data-testid="create-estimatedhours"
                  type="number"
                  value={estimatedHours}
                  onChange={(e) => setEstimatedHours(e.target.value)}
                  min="0"
                  step="0.5"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="40"
                />
              </div>

              <div>
                <label htmlFor="hourlyRate" className="block text-sm font-medium text-gray-700 mb-2">
                  Hourly Rate ($) *
                </label>
                <input
                  id="hourlyRate"
                  data-testid="create-hourlyrate"
                  type="number"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(e.target.value)}
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="250.00"
                />
              </div>

              {estimatedHours && hourlyRate && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-medium text-blue-900 mb-2">Estimated Case Value</h3>
                  <div className="text-2xl font-bold text-blue-900">
                    ${(parseFloat(estimatedHours) * parseFloat(hourlyRate)).toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </div>
                  <p className="text-sm text-blue-800 mt-1">
                    Based on {estimatedHours} hours at ${hourlyRate}/hour
                  </p>
                </div>
              )}

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h3 className="font-medium text-yellow-900 mb-2">Time Tracking Guidelines</h3>
                <ul className="text-sm text-yellow-800 space-y-1">
                  <li>• Time entries should be logged in 0.5 hour increments</li>
                  <li>• All billable hours must include activity descriptions</li>
                  <li>• Review and approve time entries weekly</li>
                </ul>
              </div>

              <div className="border-t pt-6 mt-6">
                <h3 className="font-medium text-gray-900 mb-3">Review Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Case Number:</span>
                    <span className="font-medium text-gray-900">{caseNumber || 'Not set'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Client Name:</span>
                    <span className="font-medium text-gray-900">{clientName || 'Not set'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Documents Selected:</span>
                    <span className="font-medium text-gray-900">{selectedDocuments.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Estimated Hours:</span>
                    <span className="font-medium text-gray-900">{estimatedHours || 'Not set'}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t">
            <button
              type="button"
              data-testid="create-back"
              onClick={handlePrevStep}
              disabled={formStep === 1}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                formStep === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              Back
            </button>

            <div className="flex gap-3">
              <button
                type="button"
                data-testid="create-cancel"
                className="px-6 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>

              {formStep < 4 ? (
                <button
                  type="button"
                  data-testid="create-next"
                  onClick={handleNextStep}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Next Step
                </button>
              ) : (
                <button
                  type="submit"
                  data-testid="create-submit"
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  Create Case
                </button>
              )}
            </div>
          </div>
        </form>

        {/* Quick Actions */}
        <div className="mt-6 bg-white rounded-lg shadow p-6">
          <h3 className="font-medium text-gray-900 mb-4">Need Help?</h3>
          <div className="flex gap-3">
            <button
              data-testid="create-help"
              className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors font-medium text-sm"
            >
              View Guidelines
            </button>
            <button
              data-testid="create-template"
              className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors font-medium text-sm"
            >
              Load Template
            </button>
            <button
              data-testid="create-save"
              className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors font-medium text-sm"
            >
              Save Draft
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
