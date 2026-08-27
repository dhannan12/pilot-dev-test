/**
 * SubmittingAHistorical — Form for submitting historical documents without requiring keywords
 *
 * Features: document title input, description field, type selection, date picker, submission tracking
 *
 * Ticket: SCRUM-1241 | Branch: proto/SCRUM-1233
 */

import React, { useState } from 'react'

interface HistoricalDocument {
  id: string
  title: string
  description: string
  documentType: string
  historicalDate: string
  submittedDate: string
  status: string
}

const mockDocuments: HistoricalDocument[] = [
  {
    id: 'DOC-001',
    title: 'Treaty of Versailles Original Draft',
    description: 'First draft of the peace treaty ending World War I',
    documentType: 'Treaty',
    historicalDate: '1919-06-28',
    submittedDate: '2024-01-15',
    status: 'Processed'
  },
  {
    id: 'DOC-002',
    title: 'Declaration of Independence Manuscript',
    description: 'Handwritten manuscript of the American Declaration of Independence',
    documentType: 'Manuscript',
    historicalDate: '1776-07-04',
    submittedDate: '2024-02-20',
    status: 'Processed'
  },
  {
    id: 'DOC-003',
    title: 'Magna Carta Charter',
    description: 'Medieval charter limiting royal power in England',
    documentType: 'Charter',
    historicalDate: '1215-06-15',
    submittedDate: '2024-03-10',
    status: 'Under Review'
  },
  {
    id: 'DOC-004',
    title: 'Emancipation Proclamation',
    description: 'Presidential proclamation freeing enslaved people in Confederate states',
    documentType: 'Proclamation',
    historicalDate: '1863-01-01',
    submittedDate: '2024-04-05',
    status: 'Processed'
  },
  {
    id: 'DOC-005',
    title: 'United Nations Charter',
    description: 'Founding document of the United Nations organization',
    documentType: 'Charter',
    historicalDate: '1945-06-26',
    submittedDate: '2024-05-12',
    status: 'Processed'
  }
]

export default function SubmittingAHistorical() {
  const [documents] = useState<HistoricalDocument[]>(mockDocuments)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    documentType: '',
    historicalDate: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({
        title: '',
        description: '',
        documentType: '',
        historicalDate: ''
      })
    }, 2000)
  }

  return (
    <div data-testid="submittingahistorical" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Submit Historical Document
          </h1>
          <p className="text-gray-600 mb-6">
            Submit your historical documents without the need for manual keyword tagging
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Document Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                data-testid="submittingahistorical-title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter the document title"
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Document Description *
              </label>
              <textarea
                id="description"
                name="description"
                data-testid="submittingahistorical-description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Provide a brief description of the document"
              />
            </div>

            <div>
              <label
                htmlFor="documentType"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Document Type *
              </label>
              <select
                id="documentType"
                name="documentType"
                data-testid="submittingahistorical-documenttype"
                value={formData.documentType}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select a document type</option>
                <option value="Treaty">Treaty</option>
                <option value="Manuscript">Manuscript</option>
                <option value="Charter">Charter</option>
                <option value="Proclamation">Proclamation</option>
                <option value="Letter">Letter</option>
                <option value="Diary">Diary</option>
                <option value="Report">Report</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="historicalDate"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Historical Date *
              </label>
              <input
                type="date"
                id="historicalDate"
                name="historicalDate"
                data-testid="submittingahistorical-historicaldate"
                value={formData.historicalDate}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {submitted && (
              <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-md">
                Document submitted successfully! Keywords will be automatically generated.
              </div>
            )}

            <button
              type="submit"
              data-testid="submittingahistorical-submit"
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-md font-medium hover:bg-blue-700 transition-colors"
            >
              Submit Document
            </button>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Recently Submitted Documents
          </h2>
          <div data-testid="submittingahistorical-list" className="space-y-4">
            {documents.map((doc) => (
              <div
                key={doc.id}
                data-testid="submittingahistorical-item"
                className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {doc.title}
                  </h3>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      doc.status === 'Processed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {doc.status}
                  </span>
                </div>
                <p className="text-gray-600 mb-3">{doc.description}</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">ID:</span>
                    <span className="ml-2 font-medium text-gray-900">{doc.id}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Type:</span>
                    <span className="ml-2 font-medium text-gray-900">{doc.documentType}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Date:</span>
                    <span className="ml-2 font-medium text-gray-900">{doc.historicalDate}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Submitted:</span>
                    <span className="ml-2 font-medium text-gray-900">{doc.submittedDate}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
