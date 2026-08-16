/**
 * UserSelectsA — Display and select a case from the legal case list
 *
 * Features: case list display, case selection, case details preview, status indicators, search filtering
 *
 * Ticket: SCRUM-910 | Branch: proto/SCRUM-903
 */

import { useState } from 'react'

interface LegalCase {
  id: string
  caseNumber: string
  clientName: string
  caseType: string
  status: 'Open' | 'Pending' | 'Closed' | 'In Progress'
  assignedAttorney: string
  filingDate: string
  nextHearing: string | null
  priority: 'High' | 'Medium' | 'Low'
}

const MOCK_CASES: LegalCase[] = [
  {
    id: '1',
    caseNumber: 'CASE-2024-001',
    clientName: 'Johnson & Associates LLC',
    caseType: 'Corporate Law',
    status: 'In Progress',
    assignedAttorney: 'Sarah Williams',
    filingDate: '2024-01-15',
    nextHearing: '2024-09-20',
    priority: 'High'
  },
  {
    id: '2',
    caseNumber: 'CASE-2024-002',
    clientName: 'Maria Rodriguez',
    caseType: 'Family Law',
    status: 'Open',
    assignedAttorney: 'James Chen',
    filingDate: '2024-02-10',
    nextHearing: '2024-09-15',
    priority: 'Medium'
  },
  {
    id: '3',
    caseNumber: 'CASE-2024-003',
    clientName: 'Tech Innovations Inc.',
    caseType: 'Intellectual Property',
    status: 'Pending',
    assignedAttorney: 'Emily Thompson',
    filingDate: '2024-03-05',
    nextHearing: null,
    priority: 'High'
  },
  {
    id: '4',
    caseNumber: 'CASE-2024-004',
    clientName: 'Robert Smith',
    caseType: 'Criminal Defense',
    status: 'In Progress',
    assignedAttorney: 'Michael Davis',
    filingDate: '2024-01-20',
    nextHearing: '2024-08-25',
    priority: 'High'
  },
  {
    id: '5',
    caseNumber: 'CASE-2024-005',
    clientName: 'Green Earth Foundation',
    caseType: 'Environmental Law',
    status: 'Closed',
    assignedAttorney: 'Sarah Williams',
    filingDate: '2023-11-30',
    nextHearing: null,
    priority: 'Low'
  },
  {
    id: '6',
    caseNumber: 'CASE-2024-006',
    clientName: 'Downtown Properties LLC',
    caseType: 'Real Estate',
    status: 'Open',
    assignedAttorney: 'David Martinez',
    filingDate: '2024-04-12',
    nextHearing: '2024-09-10',
    priority: 'Medium'
  },
  {
    id: '7',
    caseNumber: 'CASE-2024-007',
    clientName: 'Patricia Anderson',
    caseType: 'Personal Injury',
    status: 'In Progress',
    assignedAttorney: 'James Chen',
    filingDate: '2024-02-28',
    nextHearing: '2024-09-05',
    priority: 'High'
  }
]

export default function UserSelectsA() {
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredCases = MOCK_CASES.filter(
    c =>
      c.caseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.caseType.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const selectedCase = MOCK_CASES.find(c => c.id === selectedCaseId)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open':
        return 'bg-blue-100 text-blue-800'
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-800'
      case 'Pending':
        return 'bg-orange-100 text-orange-800'
      case 'Closed':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'text-red-600 font-semibold'
      case 'Medium':
        return 'text-yellow-600 font-medium'
      case 'Low':
        return 'text-green-600'
      default:
        return 'text-gray-600'
    }
  }

  return (
    <div data-testid="userselectsa" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Legal Case Tracker</h1>
          <p className="text-gray-600">Select a case to view details</p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            data-testid="userselectsa-search"
            placeholder="Search by case number, client name, or case type..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Case List */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Cases ({filteredCases.length})
            </h2>
            <div data-testid="userselectsa-list" className="space-y-3 max-h-[600px] overflow-y-auto">
              {filteredCases.map(caseItem => (
                <div
                  key={caseItem.id}
                  data-testid="userselectsa-item"
                  onClick={() => setSelectedCaseId(caseItem.id)}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    selectedCaseId === caseItem.id
                      ? 'border-blue-500 bg-blue-50 shadow-md'
                      : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">{caseItem.caseNumber}</h3>
                      <p className="text-sm text-gray-600">{caseItem.clientName}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(caseItem.status)}`}>
                      {caseItem.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">{caseItem.caseType}</span>
                    <span className={`text-sm ${getPriorityColor(caseItem.priority)}`}>
                      {caseItem.priority} Priority
                    </span>
                  </div>
                </div>
              ))}
              {filteredCases.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No cases found matching your search.
                </div>
              )}
            </div>
          </div>

          {/* Case Details */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Case Details</h2>
            {selectedCase ? (
              <div data-testid="userselectsa-details" className="space-y-4">
                <div className="pb-4 border-b border-gray-200">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-2xl font-bold text-gray-900">{selectedCase.caseNumber}</h3>
                    <span className={`px-3 py-1 text-sm rounded-full ${getStatusColor(selectedCase.status)}`}>
                      {selectedCase.status}
                    </span>
                  </div>
                  <p className="text-lg text-gray-700">{selectedCase.clientName}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Case Type</p>
                    <p className="text-base text-gray-900 mt-1">{selectedCase.caseType}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Priority</p>
                    <p className={`text-base mt-1 ${getPriorityColor(selectedCase.priority)}`}>
                      {selectedCase.priority}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Assigned Attorney</p>
                    <p className="text-base text-gray-900 mt-1">{selectedCase.assignedAttorney}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Filing Date</p>
                    <p className="text-base text-gray-900 mt-1">
                      {new Date(selectedCase.filingDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm font-medium text-gray-500">Next Hearing</p>
                    <p className="text-base text-gray-900 mt-1">
                      {selectedCase.nextHearing
                        ? new Date(selectedCase.nextHearing).toLocaleDateString()
                        : 'Not scheduled'}
                    </p>
                  </div>
                </div>

                <div className="pt-4 flex gap-3">
                  <button
                    data-testid="userselectsa-view"
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    View Full Case
                  </button>
                  <button
                    data-testid="userselectsa-edit"
                    className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Edit Case
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 text-gray-500">
                <div className="text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400 mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <p>Select a case from the list to view details</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
