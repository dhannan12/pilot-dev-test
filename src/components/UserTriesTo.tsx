/**
 * UserTriesTo — Demonstrates validation when saving case without completing Document Checklist
 *
 * Features: incomplete checklist detection, validation error display, document status tracking, save attempt handling, visual feedback
 *
 * Ticket: SCRUM-905 | Branch: proto/SCRUM-903
 */

import { useState } from 'react'

interface Document {
  id: string
  name: string
  required: boolean
  completed: boolean
}

interface CaseData {
  id: string
  caseNumber: string
  clientName: string
  caseType: string
  documents: Document[]
}

const mockCases: CaseData[] = [
  {
    id: '1',
    caseNumber: 'CASE-2024-001',
    clientName: 'John Smith vs. ABC Corp',
    caseType: 'Personal Injury',
    documents: [
      { id: 'd1', name: 'Client Intake Form', required: true, completed: true },
      { id: 'd2', name: 'Medical Records', required: true, completed: false },
      { id: 'd3', name: 'Police Report', required: true, completed: false },
      { id: 'd4', name: 'Insurance Documents', required: true, completed: true },
      { id: 'd5', name: 'Witness Statements', required: false, completed: false }
    ]
  },
  {
    id: '2',
    caseNumber: 'CASE-2024-002',
    clientName: 'Sarah Johnson Estate',
    caseType: 'Estate Planning',
    documents: [
      { id: 'd6', name: 'Will Draft', required: true, completed: false },
      { id: 'd7', name: 'Asset Inventory', required: true, completed: false },
      { id: 'd8', name: 'Trust Documents', required: true, completed: true },
      { id: 'd9', name: 'Power of Attorney', required: true, completed: false },
      { id: 'd10', name: 'Healthcare Directive', required: false, completed: true }
    ]
  },
  {
    id: '3',
    caseNumber: 'CASE-2024-003',
    clientName: 'Tech Startup LLC Formation',
    caseType: 'Business Law',
    documents: [
      { id: 'd11', name: 'Articles of Incorporation', required: true, completed: true },
      { id: 'd12', name: 'Operating Agreement', required: true, completed: false },
      { id: 'd13', name: 'EIN Application', required: true, completed: true },
      { id: 'd14', name: 'Business License', required: true, completed: false },
      { id: 'd15', name: 'Trademark Application', required: false, completed: false }
    ]
  },
  {
    id: '4',
    caseNumber: 'CASE-2024-004',
    clientName: 'Martinez Family Immigration',
    caseType: 'Immigration Law',
    documents: [
      { id: 'd16', name: 'Visa Application', required: true, completed: false },
      { id: 'd17', name: 'Birth Certificates', required: true, completed: true },
      { id: 'd18', name: 'Marriage Certificate', required: true, completed: false },
      { id: 'd19', name: 'Employment Verification', required: true, completed: false },
      { id: 'd20', name: 'Financial Statements', required: true, completed: true }
    ]
  },
  {
    id: '5',
    caseNumber: 'CASE-2024-005',
    clientName: 'Green Energy Corp Contract Dispute',
    caseType: 'Contract Law',
    documents: [
      { id: 'd21', name: 'Original Contract', required: true, completed: true },
      { id: 'd22', name: 'Amendment Documents', required: true, completed: true },
      { id: 'd23', name: 'Email Correspondence', required: true, completed: false },
      { id: 'd24', name: 'Payment Records', required: true, completed: false },
      { id: 'd25', name: 'Delivery Receipts', required: false, completed: true }
    ]
  }
]

export default function UserTriesTo() {
  const [selectedCase, setSelectedCase] = useState<CaseData>(mockCases[0])
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [saveAttempts, setSaveAttempts] = useState(0)

  const getIncompleteRequiredDocuments = () => {
    return selectedCase.documents.filter(doc => doc.required && !doc.completed)
  }

  const handleSaveCase = () => {
    setSaveAttempts(prev => prev + 1)
    const incompleteRequired = getIncompleteRequiredDocuments()
    
    if (incompleteRequired.length > 0) {
      setShowError(true)
      setErrorMessage(
        `Cannot save case. Please complete the following required documents: ${incompleteRequired.map(d => d.name).join(', ')}`
      )
    } else {
      setShowError(false)
      setErrorMessage('Case saved successfully!')
      setTimeout(() => setErrorMessage(''), 3000)
    }
  }

  const toggleDocumentStatus = (docId: string) => {
    setSelectedCase(prev => ({
      ...prev,
      documents: prev.documents.map(doc =>
        doc.id === docId ? { ...doc, completed: !doc.completed } : doc
      )
    }))
    setShowError(false)
  }

  const requiredCompleted = selectedCase.documents.filter(d => d.required && d.completed).length
  const requiredTotal = selectedCase.documents.filter(d => d.required).length
  const completionPercentage = Math.round((requiredCompleted / requiredTotal) * 100)

  return (
    <div data-testid="usertriesto" className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Legal Case Document Tracker
          </h1>
          <p className="text-gray-600">
            Attempt to save case without completing required documents
          </p>
        </div>

        {/* Case Selection */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <label htmlFor="case-select" className="block text-sm font-semibold text-gray-700 mb-2">
            Select Case
          </label>
          <select
            id="case-select"
            data-testid="usertriesto-case-select"
            value={selectedCase.id}
            onChange={(e) => {
              const caseData = mockCases.find(c => c.id === e.target.value)
              if (caseData) {
                setSelectedCase(caseData)
                setShowError(false)
                setErrorMessage('')
              }
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {mockCases.map(caseItem => (
              <option key={caseItem.id} value={caseItem.id}>
                {caseItem.caseNumber} - {caseItem.clientName}
              </option>
            ))}
          </select>
        </div>

        {/* Case Details */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Case Information</h2>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <span className="text-sm font-semibold text-gray-600">Case Number:</span>
              <p className="text-gray-900">{selectedCase.caseNumber}</p>
            </div>
            <div>
              <span className="text-sm font-semibold text-gray-600">Case Type:</span>
              <p className="text-gray-900">{selectedCase.caseType}</p>
            </div>
            <div className="col-span-2">
              <span className="text-sm font-semibold text-gray-600">Client:</span>
              <p className="text-gray-900">{selectedCase.clientName}</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span className="font-semibold text-gray-700">
                Required Documents Progress
              </span>
              <span className="text-gray-600">
                {requiredCompleted} / {requiredTotal} ({completionPercentage}%)
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className={`h-3 rounded-full transition-all duration-300 ${
                  completionPercentage === 100 ? 'bg-green-500' : 'bg-blue-500'
                }`}
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Document Checklist */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Document Checklist</h2>
          <div data-testid="usertriesto-list" className="space-y-3">
            {selectedCase.documents.map(doc => (
              <div
                key={doc.id}
                data-testid="usertriesto-item"
                className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all ${
                  doc.completed
                    ? 'border-green-300 bg-green-50'
                    : doc.required
                    ? 'border-red-300 bg-red-50'
                    : 'border-gray-300 bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    data-testid={`usertriesto-checkbox-${doc.id}`}
                    checked={doc.completed}
                    onChange={() => toggleDocumentStatus(doc.id)}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <div>
                    <p className={`font-medium ${doc.completed ? 'text-green-900' : 'text-gray-900'}`}>
                      {doc.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      {doc.required ? (
                        <span className="text-red-600 font-semibold">Required</span>
                      ) : (
                        <span className="text-gray-500">Optional</span>
                      )}
                    </p>
                  </div>
                </div>
                <div>
                  {doc.completed ? (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      ✓ Complete
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                      Incomplete
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Error/Success Message */}
        {errorMessage && (
          <div
            data-testid="usertriesto-message"
            className={`rounded-lg p-4 mb-6 ${
              showError
                ? 'bg-red-50 border-2 border-red-300'
                : 'bg-green-50 border-2 border-green-300'
            }`}
          >
            <p className={`font-semibold ${showError ? 'text-red-800' : 'text-green-800'}`}>
              {showError ? '⚠️ Validation Error' : '✓ Success'}
            </p>
            <p className={`text-sm mt-1 ${showError ? 'text-red-700' : 'text-green-700'}`}>
              {errorMessage}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex gap-4">
            <button
              data-testid="usertriesto-save"
              onClick={handleSaveCase}
              className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors focus:ring-4 focus:ring-blue-300"
            >
              Save Case
            </button>
            <button
              data-testid="usertriesto-reset"
              onClick={() => {
                setSelectedCase(mockCases[0])
                setShowError(false)
                setErrorMessage('')
                setSaveAttempts(0)
              }}
              className="px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors focus:ring-4 focus:ring-gray-200"
            >
              Reset
            </button>
          </div>
          <div className="mt-4 text-center text-sm text-gray-600">
            Save attempts: <span className="font-semibold">{saveAttempts}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
