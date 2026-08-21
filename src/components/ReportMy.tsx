/**
 * ReportMy — Student self-reporting absence form
 *
 * Features: absence date picker, reason selector, note field, form validation, submission history
 *
 * Ticket: SCRUM-1072 | Branch: proto/SCRUM-1070
 */

import { useState } from 'react'

interface AbsenceReason {
  id: string
  label: string
}

interface AbsenceRecord {
  id: string
  date: string
  reason: string
  status: string
}

const ABSENCE_REASONS: AbsenceReason[] = [
  { id: 'illness', label: 'Illness' },
  { id: 'medical', label: 'Medical Appointment' },
  { id: 'family', label: 'Family Emergency' },
  { id: 'religious', label: 'Religious Observance' },
  { id: 'personal', label: 'Personal Reasons' },
  { id: 'other', label: 'Other' },
]

const MOCK_ABSENCE_RECORDS: AbsenceRecord[] = [
  {
    id: '1',
    date: '2026-08-18',
    reason: 'Illness',
    status: 'Approved',
  },
  {
    id: '2',
    date: '2026-08-12',
    reason: 'Medical Appointment',
    status: 'Approved',
  },
  {
    id: '3',
    date: '2026-08-05',
    reason: 'Personal Reasons',
    status: 'Pending',
  },
  {
    id: '4',
    date: '2026-07-28',
    reason: 'Family Emergency',
    status: 'Approved',
  },
  {
    id: '5',
    date: '2026-07-20',
    reason: 'Religious Observance',
    status: 'Approved',
  },
]

export default function ReportMy() {
  const [absenceDate, setAbsenceDate] = useState('')
  const [reason, setReason] = useState('')
  const [notes, setNotes] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [records] = useState<AbsenceRecord[]>(MOCK_ABSENCE_RECORDS)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!absenceDate || !reason) {
      alert('Please fill in all required fields')
      return
    }

    setSubmitted(true)
    
    // Reset form after 2 seconds
    setTimeout(() => {
      setAbsenceDate('')
      setReason('')
      setNotes('')
      setSubmitted(false)
    }, 2000)
  }

  const handleClear = () => {
    setAbsenceDate('')
    setReason('')
    setNotes('')
  }

  return (
    <div data-testid="reportmy" className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Report My Absence
          </h1>
          <p className="text-gray-600 mb-6">
            Use this form to notify the school administration about your absence
          </p>

          {submitted && (
            <div
              data-testid="reportmy-success"
              className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded"
            >
              Your absence report has been submitted successfully! You will receive confirmation once reviewed.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Absence Date */}
            <div>
              <label
                htmlFor="absence-date"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Absence Date <span className="text-red-500">*</span>
              </label>
              <input
                id="absence-date"
                type="date"
                data-testid="reportmy-date"
                value={absenceDate}
                onChange={(e) => setAbsenceDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {/* Reason for Absence */}
            <div>
              <label
                htmlFor="reason-select"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Reason for Absence <span className="text-red-500">*</span>
              </label>
              <select
                id="reason-select"
                data-testid="reportmy-reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">-- Select a reason --</option>
                {ABSENCE_REASONS.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Additional Notes */}
            <div>
              <label
                htmlFor="notes"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Additional Notes (Optional)
              </label>
              <textarea
                id="notes"
                data-testid="reportmy-notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Provide any additional details about your absence..."
              />
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-3">
              <button
                type="submit"
                data-testid="reportmy-submit"
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Submit Report
              </button>
              <button
                type="button"
                data-testid="reportmy-clear"
                onClick={handleClear}
                className="px-6 bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
              >
                Clear
              </button>
            </div>
          </form>

          {/* My Absence History */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              My Absence History
            </h2>
            <div data-testid="reportmy-list" className="space-y-3">
              {records.map((record) => (
                <div
                  key={record.id}
                  data-testid="reportmy-item"
                  className="p-4 bg-gray-50 rounded-md border border-gray-200"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-900">
                        {record.date}
                      </p>
                      <p className="text-sm text-gray-600">
                        {record.reason}
                      </p>
                    </div>
                    <span
                      className={`text-sm px-3 py-1 rounded-full ${
                        record.status === 'Approved'
                          ? 'bg-green-100 text-green-800'
                          : record.status === 'Pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {record.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
