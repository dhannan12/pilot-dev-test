/**
 * UserMarksDocuments — Document checklist with marking/tracking functionality
 *
 * Features: document checklist, status tracking, mark as complete, filter by status, progress indicator
 *
 * Ticket: SCRUM-911 | Branch: proto/SCRUM-903
 */

import { useState } from 'react'

interface Document {
  id: string
  name: string
  description: string
  category: string
  required: boolean
  marked: boolean
  markedDate?: string
  notes?: string
}

const MOCK_DOCUMENTS: Document[] = [
  {
    id: 'doc-1',
    name: 'Client Intake Form',
    description: 'Initial client information and background',
    category: 'Intake',
    required: true,
    marked: true,
    markedDate: '2026-08-10',
    notes: 'Completed and signed by client'
  },
  {
    id: 'doc-2',
    name: 'Retainer Agreement',
    description: 'Legal services agreement and payment terms',
    category: 'Contracts',
    required: true,
    marked: true,
    markedDate: '2026-08-10'
  },
  {
    id: 'doc-3',
    name: 'Police Report',
    description: 'Official incident report from law enforcement',
    category: 'Evidence',
    required: true,
    marked: false
  },
  {
    id: 'doc-4',
    name: 'Medical Records',
    description: 'Hospital and treatment documentation',
    category: 'Evidence',
    required: true,
    marked: false
  },
  {
    id: 'doc-5',
    name: 'Witness Statements',
    description: 'Sworn statements from witnesses',
    category: 'Evidence',
    required: false,
    marked: false
  },
  {
    id: 'doc-6',
    name: 'Insurance Policy',
    description: 'Copy of relevant insurance coverage',
    category: 'Financial',
    required: true,
    marked: true,
    markedDate: '2026-08-12',
    notes: 'Auto policy with liability coverage'
  },
  {
    id: 'doc-7',
    name: 'Photo Evidence',
    description: 'Photographs of incident scene and damages',
    category: 'Evidence',
    required: false,
    marked: false
  },
  {
    id: 'doc-8',
    name: 'Expert Report',
    description: 'Professional analysis and testimony',
    category: 'Expert',
    required: false,
    marked: false
  }
]

export default function UserMarksDocuments() {
  const [documents, setDocuments] = useState<Document[]>(MOCK_DOCUMENTS)
  const [filterStatus, setFilterStatus] = useState<'all' | 'marked' | 'unmarked'>('all')
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null)
  const [notes, setNotes] = useState<string>('')

  const filteredDocuments = documents.filter(doc => {
    if (filterStatus === 'marked') return doc.marked
    if (filterStatus === 'unmarked') return !doc.marked
    return true
  })

  const totalDocs = documents.length
  const markedDocs = documents.filter(d => d.marked).length
  const requiredDocs = documents.filter(d => d.required).length
  const markedRequiredDocs = documents.filter(d => d.required && d.marked).length
  const progressPercent = Math.round((markedDocs / totalDocs) * 100)

  const handleToggleMark = (docId: string) => {
    setDocuments(docs =>
      docs.map(doc =>
        doc.id === docId
          ? {
              ...doc,
              marked: !doc.marked,
              markedDate: !doc.marked ? new Date().toISOString().split('T')[0] : undefined,
              notes: !doc.marked ? doc.notes : undefined
            }
          : doc
      )
    )
    if (selectedDoc === docId && documents.find(d => d.id === docId)?.marked) {
      setSelectedDoc(null)
      setNotes('')
    }
  }

  const handleAddNote = (docId: string) => {
    if (!notes.trim()) return
    setDocuments(docs =>
      docs.map(doc =>
        doc.id === docId
          ? { ...doc, notes: notes.trim() }
          : doc
      )
    )
    setNotes('')
    setSelectedDoc(null)
  }

  const handleOpenNoteDialog = (docId: string) => {
    const doc = documents.find(d => d.id === docId)
    if (doc) {
      setSelectedDoc(docId)
      setNotes(doc.notes || '')
    }
  }

  return (
    <div data-testid="usermarksdocuments" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Document Checklist</h1>
          <p className="text-gray-600">Track and manage required case documents</p>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">
                Overall Progress: {markedDocs} of {totalDocs} documents
              </span>
              <span className="text-sm font-medium text-blue-600">{progressPercent}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="mt-2 text-sm text-gray-600">
              Required: {markedRequiredDocs} of {requiredDocs} completed
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-3 mt-6">
            <button
              data-testid="usermarksdocuments-filter-all"
              onClick={() => setFilterStatus('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filterStatus === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All ({totalDocs})
            </button>
            <button
              data-testid="usermarksdocuments-filter-marked"
              onClick={() => setFilterStatus('marked')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filterStatus === 'marked'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Marked ({markedDocs})
            </button>
            <button
              data-testid="usermarksdocuments-filter-unmarked"
              onClick={() => setFilterStatus('unmarked')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filterStatus === 'unmarked'
                  ? 'bg-orange-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Unmarked ({totalDocs - markedDocs})
            </button>
          </div>
        </div>

        {/* Document List */}
        <div data-testid="usermarksdocuments-list" className="space-y-4">
          {filteredDocuments.map(doc => (
            <div
              key={doc.id}
              data-testid="usermarksdocuments-item"
              className={`bg-white rounded-lg shadow-sm p-6 transition-all ${
                doc.marked ? 'border-l-4 border-green-500' : 'border-l-4 border-gray-300'
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Checkbox */}
                <div className="flex-shrink-0 pt-1">
                  <input
                    type="checkbox"
                    data-testid={`usermarksdocuments-checkbox-${doc.id}`}
                    checked={doc.marked}
                    onChange={() => handleToggleMark(doc.id)}
                    className="w-6 h-6 text-green-600 border-gray-300 rounded focus:ring-2 focus:ring-green-500 cursor-pointer"
                  />
                </div>

                {/* Document Info */}
                <div className="flex-grow">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className={`text-lg font-semibold ${doc.marked ? 'text-gray-900' : 'text-gray-700'}`}>
                          {doc.name}
                        </h3>
                        {doc.required && (
                          <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-700 rounded">
                            Required
                          </span>
                        )}
                        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded">
                          {doc.category}
                        </span>
                      </div>
                      <p className="text-gray-600 mt-1">{doc.description}</p>
                      
                      {doc.marked && doc.markedDate && (
                        <div className="mt-2 flex items-center gap-2 text-sm text-green-700">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Marked on {doc.markedDate}
                        </div>
                      )}

                      {doc.notes && (
                        <div className="mt-2 p-3 bg-gray-50 rounded border border-gray-200">
                          <p className="text-sm text-gray-700">
                            <span className="font-medium">Notes:</span> {doc.notes}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 mt-4">
                    {doc.marked && (
                      <button
                        data-testid={`usermarksdocuments-add-note-${doc.id}`}
                        onClick={() => handleOpenNoteDialog(doc.id)}
                        className="px-3 py-1.5 text-sm font-medium text-blue-700 bg-blue-50 rounded hover:bg-blue-100 transition-colors"
                      >
                        {doc.notes ? 'Edit Note' : 'Add Note'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filteredDocuments.length === 0 && (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <p className="text-gray-500 text-lg">No documents found for this filter</p>
            </div>
          )}
        </div>

        {/* Note Dialog */}
        {selectedDoc && (
          <div
            data-testid="usermarksdocuments-modal"
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => {
              setSelectedDoc(null)
              setNotes('')
            }}
          >
            <div
              className="bg-white rounded-lg shadow-xl max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">Add Document Note</h3>
              <textarea
                data-testid="usermarksdocuments-note"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Enter notes about this document..."
                className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
              <div className="flex gap-3 mt-4">
                <button
                  data-testid="usermarksdocuments-save-note"
                  onClick={() => handleAddNote(selectedDoc)}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Save Note
                </button>
                <button
                  data-testid="usermarksdocuments-cancel"
                  onClick={() => {
                    setSelectedDoc(null)
                    setNotes('')
                  }}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
