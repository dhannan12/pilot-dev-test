/**
 * SolicitorLogsBillable — Allows solicitors to log billable hours for active legal cases
 *
 * Features: time entry form, case selection, activity type categorization, billable hours tracking, time log history
 *
 * Ticket: SCRUM-893 | Branch: proto/SCRUM-892
 */

import { useState } from 'react'

interface TimeEntry {
  id: string
  caseId: string
  caseName: string
  date: string
  hours: number
  activityType: string
  description: string
  rate: number
}

interface Case {
  id: string
  name: string
  client: string
  status: string
}

// Mock data: active cases
const MOCK_CASES: Case[] = [
  { id: 'C001', name: 'Smith v. Jones Corp', client: 'John Smith', status: 'Active' },
  { id: 'C002', name: 'Estate of Williams', client: 'Williams Family', status: 'Active' },
  { id: 'C003', name: 'Johnson Contract Dispute', client: 'Johnson LLC', status: 'Active' },
  { id: 'C004', name: 'Brown Property Litigation', client: 'Sarah Brown', status: 'Active' },
  { id: 'C005', name: 'Davis Employment Case', client: 'Michael Davis', status: 'Active' },
]

// Mock data: activity types
const ACTIVITY_TYPES = [
  'Client Meeting',
  'Court Appearance',
  'Legal Research',
  'Document Drafting',
  'Phone Call',
  'Email Correspondence',
  'Case Review',
  'Filing',
]

// Mock data: existing time entries
const MOCK_TIME_ENTRIES: TimeEntry[] = [
  {
    id: 'T001',
    caseId: 'C001',
    caseName: 'Smith v. Jones Corp',
    date: '2026-08-14',
    hours: 2.5,
    activityType: 'Legal Research',
    description: 'Researched precedent cases for contract breach claims',
    rate: 350,
  },
  {
    id: 'T002',
    caseId: 'C001',
    caseName: 'Smith v. Jones Corp',
    date: '2026-08-13',
    hours: 1.5,
    activityType: 'Client Meeting',
    description: 'Initial consultation with client regarding case strategy',
    rate: 350,
  },
  {
    id: 'T003',
    caseId: 'C002',
    caseName: 'Estate of Williams',
    date: '2026-08-13',
    hours: 3.0,
    activityType: 'Document Drafting',
    description: 'Drafted estate distribution documents',
    rate: 350,
  },
  {
    id: 'T004',
    caseId: 'C003',
    caseName: 'Johnson Contract Dispute',
    date: '2026-08-12',
    hours: 1.0,
    activityType: 'Phone Call',
    description: 'Conference call with opposing counsel',
    rate: 350,
  },
  {
    id: 'T005',
    caseId: 'C004',
    caseName: 'Brown Property Litigation',
    date: '2026-08-12',
    hours: 4.0,
    activityType: 'Court Appearance',
    description: 'Attended preliminary hearing',
    rate: 350,
  },
]

export default function SolicitorLogsBillable() {
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>(MOCK_TIME_ENTRIES)
  const [selectedCaseId, setSelectedCaseId] = useState<string>('')
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0])
  const [hours, setHours] = useState<string>('')
  const [activityType, setActivityType] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [rate] = useState<number>(350) // Fixed hourly rate for simplicity

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedCaseId || !hours || !activityType || !description) {
      alert('Please fill in all required fields')
      return
    }

    const selectedCase = MOCK_CASES.find((c) => c.id === selectedCaseId)
    if (!selectedCase) return

    const newEntry: TimeEntry = {
      id: `T${String(timeEntries.length + 1).padStart(3, '0')}`,
      caseId: selectedCaseId,
      caseName: selectedCase.name,
      date,
      hours: parseFloat(hours),
      activityType,
      description,
      rate,
    }

    setTimeEntries([newEntry, ...timeEntries])

    // Reset form
    setSelectedCaseId('')
    setHours('')
    setActivityType('')
    setDescription('')
    setDate(new Date().toISOString().split('T')[0])

    alert('Time entry logged successfully!')
  }

  const totalHours = timeEntries.reduce((sum, entry) => sum + entry.hours, 0)
  const totalBillable = timeEntries.reduce((sum, entry) => sum + entry.hours * entry.rate, 0)

  return (
    <div data-testid="solicitorlogsbillable" className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Log Billable Hours</h1>
          <p className="text-gray-600">Record time spent on active legal cases</p>
        </div>

        {/* Time Entry Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">New Time Entry</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="case" className="block text-sm font-medium text-gray-700 mb-1">
                  Case *
                </label>
                <select
                  id="case"
                  data-testid="solicitorlogsbillable-case"
                  value={selectedCaseId}
                  onChange={(e) => setSelectedCaseId(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select a case...</option>
                  {MOCK_CASES.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} - {c.client}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                  Date *
                </label>
                <input
                  id="date"
                  type="date"
                  data-testid="solicitorlogsbillable-date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="hours" className="block text-sm font-medium text-gray-700 mb-1">
                  Hours *
                </label>
                <input
                  id="hours"
                  type="number"
                  step="0.25"
                  min="0.25"
                  max="24"
                  data-testid="solicitorlogsbillable-hours"
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                  placeholder="e.g. 2.5"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="activity" className="block text-sm font-medium text-gray-700 mb-1">
                  Activity Type *
                </label>
                <select
                  id="activity"
                  data-testid="solicitorlogsbillable-activity"
                  value={activityType}
                  onChange={(e) => setActivityType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select activity type...</option>
                  {ACTIVITY_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description *
              </label>
              <textarea
                id="description"
                data-testid="solicitorlogsbillable-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                placeholder="Describe the work performed..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="text-sm text-gray-600">
                Hourly Rate: <span className="font-semibold">${rate}</span>
              </div>
              <button
                type="submit"
                data-testid="solicitorlogsbillable-submit"
                className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Log Time
              </button>
            </div>
          </form>
        </div>

        {/* Summary Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-sm font-medium text-gray-600">Total Entries</div>
            <div className="text-3xl font-bold text-gray-900 mt-2">{timeEntries.length}</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-sm font-medium text-gray-600">Total Hours</div>
            <div className="text-3xl font-bold text-gray-900 mt-2">{totalHours.toFixed(2)}</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-sm font-medium text-gray-600">Total Billable</div>
            <div className="text-3xl font-bold text-gray-900 mt-2">
              ${totalBillable.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Time Entries List */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Time Entries</h2>
          <div data-testid="solicitorlogsbillable-list" className="space-y-3">
            {timeEntries.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No time entries logged yet</p>
            ) : (
              timeEntries.map((entry) => (
                <div
                  key={entry.id}
                  data-testid="solicitorlogsbillable-item"
                  className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-gray-900">{entry.caseName}</h3>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                          {entry.activityType}
                        </span>
                      </div>
                      <p className="text-gray-700 mb-2">{entry.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>📅 {entry.date}</span>
                        <span>⏱️ {entry.hours} hours</span>
                        <span>💰 ${entry.rate}/hr</span>
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <div className="text-sm font-medium text-gray-600">Amount</div>
                      <div className="text-xl font-bold text-green-600">
                        ${(entry.hours * entry.rate).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
