/**
 * UserUpdatesCase — Auto-saving case notes editor for legal case management
 *
 * Features: case selection, rich text notes editor, auto-save indicator, save history, debounced auto-save
 *
 * Ticket: SCRUM-907 | Branch: proto/SCRUM-903
 */

import { useState, useEffect } from 'react'

interface CaseNote {
  id: string
  caseId: string
  content: string
  lastSaved: string
  author: string
}

interface LegalCase {
  id: string
  caseNumber: string
  clientName: string
  title: string
  status: string
}

interface SaveHistory {
  timestamp: string
  preview: string
}

const MOCK_CASES: LegalCase[] = [
  { id: '1', caseNumber: 'CASE-2024-001', clientName: 'Acme Corp', title: 'Contract Dispute', status: 'Active' },
  { id: '2', caseNumber: 'CASE-2024-002', clientName: 'Smith & Sons', title: 'IP Infringement', status: 'Active' },
  { id: '3', caseNumber: 'CASE-2024-003', clientName: 'Johnson Ltd', title: 'Employment Litigation', status: 'Pending' },
  { id: '4', caseNumber: 'CASE-2024-004', clientName: 'Davis Industries', title: 'Merger Review', status: 'Active' },
  { id: '5', caseNumber: 'CASE-2024-005', clientName: 'Wilson Tech', title: 'Securities Compliance', status: 'Review' },
]

const MOCK_NOTES: CaseNote[] = [
  {
    id: 'n1',
    caseId: '1',
    content: 'Initial consultation completed. Client provided contract documentation. Review scheduled for next week.',
    lastSaved: '2024-08-15T14:30:00Z',
    author: 'Sarah Johnson'
  },
  {
    id: 'n2',
    caseId: '2',
    content: 'Patent review in progress. Found potential prior art that may support our case. Awaiting expert opinion.',
    lastSaved: '2024-08-15T10:15:00Z',
    author: 'Michael Chen'
  },
  {
    id: 'n3',
    caseId: '3',
    content: 'Deposition scheduled for August 20th. Witness list prepared and filed with the court.',
    lastSaved: '2024-08-14T16:45:00Z',
    author: 'Emily Rodriguez'
  },
  {
    id: 'n4',
    caseId: '4',
    content: 'Due diligence documents received. Initial review shows no major red flags. Continuing analysis.',
    lastSaved: '2024-08-15T09:00:00Z',
    author: 'David Park'
  },
  {
    id: 'n5',
    caseId: '5',
    content: 'SEC filing prepared and submitted. Awaiting confirmation. Client briefed on timeline and next steps.',
    lastSaved: '2024-08-13T15:20:00Z',
    author: 'Jennifer Lee'
  },
]

export default function UserUpdatesCase() {
  const [selectedCaseId, setSelectedCaseId] = useState<string>(MOCK_CASES[0].id)
  const [notes, setNotes] = useState<string>('')
  const [isSaving, setIsSaving] = useState<boolean>(false)
  const [lastSavedTime, setLastSavedTime] = useState<string>('')
  const [saveHistory, setSaveHistory] = useState<SaveHistory[]>([])
  const [saveTimeout, setSaveTimeout] = useState<ReturnType<typeof setTimeout> | null>(null)

  // Load notes when case selection changes
  useEffect(() => {
    const caseNote = MOCK_NOTES.find(note => note.caseId === selectedCaseId)
    if (caseNote) {
      setNotes(caseNote.content)
      setLastSavedTime(formatTimestamp(caseNote.lastSaved))
    } else {
      setNotes('')
      setLastSavedTime('')
    }
  }, [selectedCaseId])

  // Auto-save functionality with debouncing
  useEffect(() => {
    if (notes.trim() === '') return

    // Clear existing timeout
    if (saveTimeout) {
      clearTimeout(saveTimeout)
    }

    // Set new timeout for auto-save (2 second debounce)
    const timeout = setTimeout(() => {
      handleAutoSave()
    }, 2000)

    setSaveTimeout(timeout)

    // Cleanup
    return () => {
      if (timeout) {
        clearTimeout(timeout)
      }
    }
  }, [notes])

  const handleAutoSave = () => {
    setIsSaving(true)

    // Simulate save operation
    setTimeout(() => {
      const now = new Date().toISOString()
      setLastSavedTime(formatTimestamp(now))
      setIsSaving(false)

      // Add to save history
      const preview = notes.substring(0, 50) + (notes.length > 50 ? '...' : '')
      setSaveHistory(prev => [
        { timestamp: formatTimestamp(now), preview },
        ...prev.slice(0, 4) // Keep last 5 saves
      ])
    }, 500)
  }

  const formatTimestamp = (isoString: string): string => {
    const date = new Date(isoString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)

    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`
    
    const diffHours = Math.floor(diffMins / 60)
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`

    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  const handleManualSave = () => {
    if (saveTimeout) {
      clearTimeout(saveTimeout)
    }
    handleAutoSave()
  }

  const selectedCase = MOCK_CASES.find(c => c.id === selectedCaseId)

  return (
    <div data-testid="userupdatescase" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Case Notes</h1>
          <p className="text-gray-600">Update case notes with automatic saving</p>
        </div>

        {/* Case Selection and Status Bar */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="case-select" className="block text-sm font-medium text-gray-700 mb-2">
                Select Case
              </label>
              <select
                id="case-select"
                data-testid="userupdatescase-case"
                value={selectedCaseId}
                onChange={(e) => setSelectedCaseId(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {MOCK_CASES.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.caseNumber} - {c.clientName}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col justify-end">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {isSaving ? (
                    <>
                      <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-sm text-gray-600">Saving...</span>
                    </>
                  ) : lastSavedTime ? (
                    <>
                      <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">Saved {lastSavedTime}</span>
                    </>
                  ) : (
                    <span className="text-sm text-gray-400">No changes yet</span>
                  )}
                </div>
                <button
                  data-testid="userupdatescase-save"
                  onClick={handleManualSave}
                  disabled={notes.trim() === '' || isSaving}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  Save Now
                </button>
              </div>
            </div>
          </div>

          {/* Case Details */}
          {selectedCase && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Case Number:</span>
                  <p className="font-medium text-gray-900">{selectedCase.caseNumber}</p>
                </div>
                <div>
                  <span className="text-gray-500">Client:</span>
                  <p className="font-medium text-gray-900">{selectedCase.clientName}</p>
                </div>
                <div>
                  <span className="text-gray-500">Title:</span>
                  <p className="font-medium text-gray-900">{selectedCase.title}</p>
                </div>
                <div>
                  <span className="text-gray-500">Status:</span>
                  <p className="font-medium">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      selectedCase.status === 'Active' ? 'bg-green-100 text-green-800' :
                      selectedCase.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {selectedCase.status}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Notes Editor */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
            <div className="mb-4">
              <label htmlFor="notes-editor" className="block text-lg font-semibold text-gray-900 mb-2">
                Case Notes
              </label>
              <p className="text-sm text-gray-600 mb-4">
                Your notes will be automatically saved as you type
              </p>
            </div>
            
            <textarea
              id="notes-editor"
              data-testid="userupdatescase-notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Enter case notes here... Changes are saved automatically after you stop typing."
              className="w-full h-96 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono text-sm"
            />

            <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
              <span>{notes.length} characters</span>
              <span>Auto-saves 2 seconds after you stop typing</span>
            </div>
          </div>

          {/* Save History Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Save History</h2>
              
              {saveHistory.length === 0 ? (
                <p className="text-sm text-gray-500 italic">No saves yet</p>
              ) : (
                <ul data-testid="userupdatescase-history-list" className="space-y-3">
                  {saveHistory.map((save, index) => (
                    <li 
                      key={index}
                      data-testid="userupdatescase-history-item"
                      className="p-3 bg-gray-50 rounded-lg border border-gray-200"
                    >
                      <div className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-gray-900 mb-1">{save.timestamp}</p>
                          <p className="text-xs text-gray-600 truncate">{save.preview}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Tips */}
            <div className="bg-blue-50 rounded-lg p-4 mt-6">
              <h3 className="text-sm font-semibold text-blue-900 mb-2">💡 Tips</h3>
              <ul className="text-xs text-blue-800 space-y-1">
                <li>• Notes save automatically after 2 seconds</li>
                <li>• Click "Save Now" for immediate save</li>
                <li>• Switch cases to view different notes</li>
                <li>• All changes are tracked in history</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
