/**
 * UserLogsHours — User logs billable hours for legal cases with time tracking
 *
 * Features: hour logging form, case selection, billable hours calculator, time entry history, running total display
 *
 * Ticket: SCRUM-906 | Branch: proto/SCRUM-903
 */

import { useState } from 'react'

interface Case {
  id: string
  caseNumber: string
  clientName: string
  caseType: string
}

interface TimeEntry {
  id: string
  caseId: string
  caseName: string
  date: string
  hours: number
  description: string
  billable: boolean
}

const MOCK_CASES: Case[] = [
  { id: '1', caseNumber: 'CASE-2024-001', clientName: 'Acme Corporation', caseType: 'Contract Dispute' },
  { id: '2', caseNumber: 'CASE-2024-002', clientName: 'Smith & Associates', caseType: 'Employment Law' },
  { id: '3', caseNumber: 'CASE-2024-003', clientName: 'Johnson Industries', caseType: 'Intellectual Property' },
  { id: '4', caseNumber: 'CASE-2024-004', clientName: 'Williams Enterprises', caseType: 'Corporate Litigation' },
  { id: '5', caseNumber: 'CASE-2024-005', clientName: 'Davis & Partners', caseType: 'Real Estate Law' },
]

const MOCK_TIME_ENTRIES: TimeEntry[] = [
  { id: '1', caseId: '1', caseName: 'CASE-2024-001 - Acme Corporation', date: '2024-08-14', hours: 3.5, description: 'Contract review and analysis', billable: true },
  { id: '2', caseId: '2', caseName: 'CASE-2024-002 - Smith & Associates', date: '2024-08-14', hours: 2.0, description: 'Client consultation', billable: true },
  { id: '3', caseId: '1', caseName: 'CASE-2024-001 - Acme Corporation', date: '2024-08-13', hours: 4.0, description: 'Legal research and memo preparation', billable: true },
  { id: '4', caseId: '3', caseName: 'CASE-2024-003 - Johnson Industries', date: '2024-08-13', hours: 1.5, description: 'Internal team meeting', billable: false },
  { id: '5', caseId: '4', caseName: 'CASE-2024-004 - Williams Enterprises', date: '2024-08-12', hours: 5.0, description: 'Court preparation and filing', billable: true },
  { id: '6', caseId: '5', caseName: 'CASE-2024-005 - Davis & Partners', date: '2024-08-12', hours: 2.5, description: 'Document drafting', billable: true },
]

export default function UserLogsHours() {
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>(MOCK_TIME_ENTRIES)
  const [selectedCaseId, setSelectedCaseId] = useState<string>('')
  const [hours, setHours] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [billable, setBillable] = useState<boolean>(true)
  const [filterCaseId, setFilterCaseId] = useState<string>('all')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!selectedCaseId || !hours || !description) {
      alert('Please fill in all required fields')
      return
    }

    const hoursNum = parseFloat(hours)
    if (isNaN(hoursNum) || hoursNum <= 0) {
      alert('Please enter a valid number of hours')
      return
    }

    const selectedCase = MOCK_CASES.find(c => c.id === selectedCaseId)
    if (!selectedCase) return

    const newEntry: TimeEntry = {
      id: Date.now().toString(),
      caseId: selectedCaseId,
      caseName: `${selectedCase.caseNumber} - ${selectedCase.clientName}`,
      date: new Date().toISOString().split('T')[0],
      hours: hoursNum,
      description,
      billable,
    }

    setTimeEntries([newEntry, ...timeEntries])
    
    // Reset form
    setSelectedCaseId('')
    setHours('')
    setDescription('')
    setBillable(true)
  }

  const filteredEntries = filterCaseId === 'all' 
    ? timeEntries 
    : timeEntries.filter(entry => entry.caseId === filterCaseId)

  const totalBillableHours = filteredEntries
    .filter(entry => entry.billable)
    .reduce((sum, entry) => sum + entry.hours, 0)

  const totalNonBillableHours = filteredEntries
    .filter(entry => !entry.billable)
    .reduce((sum, entry) => sum + entry.hours, 0)

  return (
    <div data-testid="userlogshours" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Time Entry & Hour Tracking</h1>

        {/* Log Hours Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Log Hours</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="case-select" className="block text-sm font-medium text-gray-700 mb-1">
                Select Case *
              </label>
              <select
                id="case-select"
                data-testid="userlogshours-case"
                value={selectedCaseId}
                onChange={(e) => setSelectedCaseId(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">-- Choose a case --</option>
                {MOCK_CASES.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.caseNumber} - {c.clientName} ({c.caseType})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="hours-input" className="block text-sm font-medium text-gray-700 mb-1">
                Hours *
              </label>
              <input
                id="hours-input"
                type="number"
                step="0.25"
                min="0"
                data-testid="userlogshours-hours"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                placeholder="e.g., 2.5"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="description-input" className="block text-sm font-medium text-gray-700 mb-1">
                Description *
              </label>
              <textarea
                id="description-input"
                data-testid="userlogshours-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the work performed..."
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex items-center">
              <input
                id="billable-checkbox"
                type="checkbox"
                data-testid="userlogshours-billable"
                checked={billable}
                onChange={(e) => setBillable(e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="billable-checkbox" className="ml-2 text-sm font-medium text-gray-700">
                Billable
              </label>
            </div>

            <button
              type="submit"
              data-testid="userlogshours-submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Log Hours
            </button>
          </form>
        </div>

        {/* Hours Summary */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Hours Summary</h2>
            <div>
              <label htmlFor="filter-case" className="text-sm font-medium text-gray-700 mr-2">
                Filter by Case:
              </label>
              <select
                id="filter-case"
                data-testid="userlogshours-filter"
                value={filterCaseId}
                onChange={(e) => setFilterCaseId(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Cases</option>
                {MOCK_CASES.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.caseNumber} - {c.clientName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="text-sm text-green-600 font-medium mb-1">Total Billable Hours</div>
              <div className="text-3xl font-bold text-green-700">{totalBillableHours.toFixed(2)}</div>
            </div>
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div className="text-sm text-orange-600 font-medium mb-1">Non-Billable Hours</div>
              <div className="text-3xl font-bold text-orange-700">{totalNonBillableHours.toFixed(2)}</div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="text-sm text-blue-600 font-medium mb-1">Total Hours</div>
              <div className="text-3xl font-bold text-blue-700">
                {(totalBillableHours + totalNonBillableHours).toFixed(2)}
              </div>
            </div>
          </div>
        </div>

        {/* Time Entries List */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Time Entries</h2>
          {filteredEntries.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No time entries found. Log your first hours above!</p>
          ) : (
            <div data-testid="userlogshours-list" className="space-y-3">
              {filteredEntries.map(entry => (
                <div
                  key={entry.id}
                  data-testid="userlogshours-item"
                  className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">{entry.caseName}</div>
                      <div className="text-sm text-gray-500 mt-1">{entry.description}</div>
                    </div>
                    <div className="text-right ml-4">
                      <div className="text-lg font-bold text-gray-900">{entry.hours.toFixed(2)} hrs</div>
                      <div className="text-xs text-gray-500">{entry.date}</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span
                      className={`inline-block px-2 py-1 text-xs font-semibold rounded ${
                        entry.billable
                          ? 'bg-green-100 text-green-800'
                          : 'bg-orange-100 text-orange-800'
                      }`}
                    >
                      {entry.billable ? 'Billable' : 'Non-Billable'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
