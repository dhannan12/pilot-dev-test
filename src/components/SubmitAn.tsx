/**
 * SubmitAn — School absence report submission form for parents
 *
 * Features: child selection, absence date picker, reason selector, note field, form validation
 *
 * Ticket: SCRUM-1071 | Branch: proto/SCRUM-1070
 */

import { useState } from 'react'

interface Child {
  id: string
  name: string
  grade: string
}

interface AbsenceReason {
  id: string
  label: string
}

const MOCK_CHILDREN: Child[] = [
  { id: '1', name: 'Emma Johnson', grade: '5th Grade' },
  { id: '2', name: 'Liam Smith', grade: '3rd Grade' },
  { id: '3', name: 'Olivia Williams', grade: '8th Grade' },
  { id: '4', name: 'Noah Brown', grade: '6th Grade' },
  { id: '5', name: 'Ava Davis', grade: '4th Grade' },
]

const ABSENCE_REASONS: AbsenceReason[] = [
  { id: 'illness', label: 'Illness' },
  { id: 'medical', label: 'Medical Appointment' },
  { id: 'family', label: 'Family Emergency' },
  { id: 'religious', label: 'Religious Observance' },
  { id: 'other', label: 'Other' },
]

export default function SubmitAn() {
  const [selectedChild, setSelectedChild] = useState('')
  const [absenceDate, setAbsenceDate] = useState('')
  const [reason, setReason] = useState('')
  const [notes, setNotes] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!selectedChild || !absenceDate || !reason) {
      alert('Please fill in all required fields')
      return
    }

    setSubmitted(true)
    
    // Reset form after 2 seconds
    setTimeout(() => {
      setSelectedChild('')
      setAbsenceDate('')
      setReason('')
      setNotes('')
      setSubmitted(false)
    }, 2000)
  }

  return (
    <div data-testid="submitan" className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Submit Absence Report
          </h1>
          <p className="text-gray-600 mb-6">
            Complete this form to notify the school of your child's absence
          </p>

          {submitted && (
            <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
              Absence report submitted successfully!
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Child Selection */}
            <div>
              <label
                htmlFor="child-select"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Select Child <span className="text-red-500">*</span>
              </label>
              <select
                id="child-select"
                data-testid="submitan-child"
                value={selectedChild}
                onChange={(e) => setSelectedChild(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">-- Select a child --</option>
                {MOCK_CHILDREN.map((child) => (
                  <option key={child.id} value={child.id}>
                    {child.name} ({child.grade})
                  </option>
                ))}
              </select>
            </div>

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
                data-testid="submitan-date"
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
                data-testid="submitan-reason"
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
                data-testid="submitan-notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Provide any additional details about the absence..."
              />
            </div>

            {/* Submit Button */}
            <div className="flex gap-3">
              <button
                type="submit"
                data-testid="submitan-submit"
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Submit Report
              </button>
              <button
                type="button"
                data-testid="submitan-cancel"
                onClick={() => {
                  setSelectedChild('')
                  setAbsenceDate('')
                  setReason('')
                  setNotes('')
                }}
                className="px-6 bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
              >
                Clear
              </button>
            </div>
          </form>

          {/* Recent Submissions */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Recent Submissions
            </h2>
            <div data-testid="submitan-list" className="space-y-3">
              {[
                {
                  id: '1',
                  child: 'Emma Johnson',
                  date: '2026-08-18',
                  reason: 'Illness',
                },
                {
                  id: '2',
                  child: 'Liam Smith',
                  date: '2026-08-15',
                  reason: 'Medical Appointment',
                },
                {
                  id: '3',
                  child: 'Olivia Williams',
                  date: '2026-08-10',
                  reason: 'Family Emergency',
                },
                {
                  id: '4',
                  child: 'Noah Brown',
                  date: '2026-08-08',
                  reason: 'Religious Observance',
                },
                {
                  id: '5',
                  child: 'Ava Davis',
                  date: '2026-08-05',
                  reason: 'Other',
                },
              ].map((submission) => (
                <div
                  key={submission.id}
                  data-testid="submitan-item"
                  className="p-4 bg-gray-50 rounded-md border border-gray-200"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-900">
                        {submission.child}
                      </p>
                      <p className="text-sm text-gray-600">
                        {submission.reason}
                      </p>
                    </div>
                    <p className="text-sm text-gray-500">{submission.date}</p>
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
