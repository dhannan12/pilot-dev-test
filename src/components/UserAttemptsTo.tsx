/**
 * UserAttemptsTo — Displays cases that users attempt to proceed with despite missing scheduled court dates
 *
 * Features: case validation, missing court date warnings, case status display, action blocking, user guidance
 *
 * Ticket: SCRUM-898 | Branch: proto/SCRUM-892
 */

import React, { useState } from 'react'

interface CaseAttempt {
  id: string
  caseNumber: string
  caseName: string
  clientName: string
  status: 'active' | 'pending' | 'review'
  courtDateScheduled: boolean
  lastAttemptDate: string
  attemptReason: string
}

const mockCaseAttempts: CaseAttempt[] = [
  {
    id: '1',
    caseNumber: 'CV-2026-001234',
    caseName: 'Smith v. Johnson Construction LLC',
    clientName: 'Robert Smith',
    status: 'active',
    courtDateScheduled: false,
    lastAttemptDate: '2026-08-10',
    attemptReason: 'Attempted to file motion for summary judgment'
  },
  {
    id: '2',
    caseNumber: 'CR-2026-005678',
    caseName: 'State v. Williams',
    clientName: 'Jennifer Williams',
    status: 'pending',
    courtDateScheduled: false,
    lastAttemptDate: '2026-08-12',
    attemptReason: 'Attempted to submit plea bargain documents'
  },
  {
    id: '3',
    caseNumber: 'CV-2026-002345',
    caseName: 'Martinez v. City Transit Authority',
    clientName: 'Carlos Martinez',
    status: 'active',
    courtDateScheduled: false,
    lastAttemptDate: '2026-08-14',
    attemptReason: 'Attempted to proceed with settlement conference'
  },
  {
    id: '4',
    caseNumber: 'FL-2026-003456',
    caseName: 'Anderson Divorce Proceedings',
    clientName: 'Patricia Anderson',
    status: 'review',
    courtDateScheduled: false,
    lastAttemptDate: '2026-08-13',
    attemptReason: 'Attempted to finalize custody arrangement'
  },
  {
    id: '5',
    caseNumber: 'CV-2026-004567',
    caseName: 'Brown v. Medical Associates Inc',
    clientName: 'Michael Brown',
    status: 'active',
    courtDateScheduled: false,
    lastAttemptDate: '2026-08-11',
    attemptReason: 'Attempted to submit expert witness testimony'
  }
]

export default function UserAttemptsTo() {
  const [selectedCase, setSelectedCase] = useState<string | null>(null)
  const [showScheduleModal, setShowScheduleModal] = useState(false)

  const handleProceedAttempt = (caseId: string) => {
    setSelectedCase(caseId)
    setShowScheduleModal(true)
  }

  const handleScheduleDate = () => {
    setShowScheduleModal(false)
    setSelectedCase(null)
  }

  const handleCancel = () => {
    setShowScheduleModal(false)
    setSelectedCase(null)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'review':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div data-testid="userattemptsto" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Cases Without Scheduled Court Dates
          </h1>
          <p className="text-gray-600">
            The following cases have been blocked from proceeding due to missing court date scheduling
          </p>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Action Required</h3>
              <p className="text-sm text-red-700 mt-1">
                A court date must be scheduled before proceeding with these cases
              </p>
            </div>
          </div>
        </div>

        <div data-testid="userattemptsto-list" className="space-y-4">
          {mockCaseAttempts.map((caseAttempt) => (
            <div
              key={caseAttempt.id}
              data-testid="userattemptsto-item"
              className="bg-white rounded-lg shadow p-6 border border-gray-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-xl font-semibold text-gray-900">
                      {caseAttempt.caseNumber}
                    </h2>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(caseAttempt.status)}`}>
                      {caseAttempt.status}
                    </span>
                  </div>
                  <p className="text-gray-900 font-medium mb-1">{caseAttempt.caseName}</p>
                  <p className="text-gray-600 text-sm">Client: {caseAttempt.clientName}</p>
                </div>
                <div className="flex items-center gap-2 text-red-600">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span className="font-semibold text-sm">No Court Date</span>
                </div>
              </div>

              <div className="bg-gray-50 rounded p-4 mb-4">
                <p className="text-sm text-gray-700 mb-2">
                  <span className="font-semibold">Last Attempt:</span> {caseAttempt.lastAttemptDate}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Reason:</span> {caseAttempt.attemptReason}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  data-testid="userattemptsto-schedule"
                  onClick={() => handleProceedAttempt(caseAttempt.id)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
                >
                  Schedule Court Date
                </button>
                <button
                  data-testid="userattemptsto-view"
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium transition-colors"
                >
                  View Case Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {showScheduleModal && (
          <div data-testid="userattemptsto-modal" className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Schedule Court Date</h2>
              <p className="text-gray-600 mb-6">
                Please schedule a court date before proceeding with this case.
              </p>

              <div className="space-y-4 mb-6">
                <div>
                  <label htmlFor="court-date" className="block text-sm font-medium text-gray-700 mb-2">
                    Court Date
                  </label>
                  <input
                    id="court-date"
                    data-testid="userattemptsto-date"
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="court-time" className="block text-sm font-medium text-gray-700 mb-2">
                    Court Time
                  </label>
                  <input
                    id="court-time"
                    data-testid="userattemptsto-time"
                    type="time"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="courtroom" className="block text-sm font-medium text-gray-700 mb-2">
                    Courtroom
                  </label>
                  <input
                    id="courtroom"
                    data-testid="userattemptsto-courtroom"
                    type="text"
                    placeholder="e.g., Courtroom 3A"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="judge" className="block text-sm font-medium text-gray-700 mb-2">
                    Judge
                  </label>
                  <select
                    id="judge"
                    data-testid="userattemptsto-judge"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select a judge</option>
                    <option value="judge1">Hon. Margaret Chen</option>
                    <option value="judge2">Hon. David Morrison</option>
                    <option value="judge3">Hon. Sarah Thompson</option>
                    <option value="judge4">Hon. Robert Garcia</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  data-testid="userattemptsto-submit"
                  onClick={handleScheduleDate}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
                >
                  Schedule Date
                </button>
                <button
                  data-testid="userattemptsto-cancel"
                  onClick={handleCancel}
                  className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium transition-colors"
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
