/**
 * SubmitAnAbsence — Submit an absence report and check routing
 *
 * Features: absence form submission, student selection, date range picker, reason entry, routing status display
 *
 * Ticket: SCRUM-942 | Branch: proto/SCRUM-938
 */

import { useState } from 'react'

interface Student {
  id: string
  name: string
  grade: string
  studentId: string
}

interface AbsenceRoute {
  id: string
  step: number
  role: string
  status: 'pending' | 'approved' | 'rejected' | 'notified'
  timestamp?: string
}

const MOCK_STUDENTS: Student[] = [
  { id: '1', name: 'Emma Johnson', grade: '9th Grade', studentId: 'S2024001' },
  { id: '2', name: 'Liam Smith', grade: '10th Grade', studentId: 'S2024002' },
  { id: '3', name: 'Olivia Williams', grade: '11th Grade', studentId: 'S2024003' },
  { id: '4', name: 'Noah Brown', grade: '12th Grade', studentId: 'S2024004' },
  { id: '5', name: 'Ava Davis', grade: '9th Grade', studentId: 'S2024005' },
  { id: '6', name: 'Ethan Miller', grade: '10th Grade', studentId: 'S2024006' },
  { id: '7', name: 'Sophia Wilson', grade: '11th Grade', studentId: 'S2024007' }
]

const ABSENCE_REASONS = [
  'Illness',
  'Medical Appointment',
  'Family Emergency',
  'Religious Observance',
  'School Activity',
  'Other'
]

const MOCK_ROUTING_STEPS: AbsenceRoute[] = [
  { id: 'r1', step: 1, role: 'Teacher', status: 'notified', timestamp: '2026-08-16 09:00 AM' },
  { id: 'r2', step: 2, role: 'Attendance Office', status: 'pending' },
  { id: 'r3', step: 3, role: 'Vice Principal', status: 'pending' },
  { id: 'r4', step: 4, role: 'Parent Notification', status: 'pending' }
]

export default function SubmitAnAbsence() {
  const [selectedStudent, setSelectedStudent] = useState<string>('')
  const [startDate, setStartDate] = useState<string>('')
  const [endDate, setEndDate] = useState<string>('')
  const [reason, setReason] = useState<string>('')
  const [notes, setNotes] = useState<string>('')
  const [showRouting, setShowRouting] = useState<boolean>(false)
  const [submitted, setSubmitted] = useState<boolean>(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setShowRouting(true)
  }

  const handleReset = () => {
    setSelectedStudent('')
    setStartDate('')
    setEndDate('')
    setReason('')
    setNotes('')
    setSubmitted(false)
    setShowRouting(false)
  }

  return (
    <div data-testid="submitanabsence" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Submit Absence Report</h1>
          <p className="text-gray-600 mb-8">Report a student absence and track approval routing</p>

          {submitted ? (
            <div className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <div className="flex items-center mb-2">
                  <svg className="w-6 h-6 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <h2 className="text-xl font-semibold text-green-900">Absence Report Submitted</h2>
                </div>
                <p className="text-green-700">
                  Your absence report has been submitted and is being routed for approval.
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Routing Status</h3>
                <ul data-testid="submitanabsence-list" className="space-y-4">
                  {MOCK_ROUTING_STEPS.map((route) => (
                    <li 
                      key={route.id} 
                      data-testid="submitanabsence-item"
                      className="flex items-center justify-between border-b border-blue-100 pb-3 last:border-0"
                    >
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white text-sm font-bold">
                          {route.step}
                        </span>
                        <div>
                          <p className="font-medium text-gray-900">{route.role}</p>
                          {route.timestamp && (
                            <p className="text-sm text-gray-500">{route.timestamp}</p>
                          )}
                        </div>
                      </div>
                      <div>
                        {route.status === 'approved' && (
                          <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                            Approved
                          </span>
                        )}
                        {route.status === 'pending' && (
                          <span className="px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                            Pending
                          </span>
                        )}
                        {route.status === 'rejected' && (
                          <span className="px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                            Rejected
                          </span>
                        )}
                        {route.status === 'notified' && (
                          <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                            Notified
                          </span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex justify-between">
                <button
                  data-testid="submitanabsence-new"
                  onClick={handleReset}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Submit Another Absence
                </button>
                <button
                  data-testid="submitanabsence-print"
                  onClick={() => window.print()}
                  className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Print Report
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="student" className="block text-sm font-medium text-gray-700 mb-2">
                  Select Student *
                </label>
                <select
                  id="student"
                  data-testid="submitanabsence-student"
                  value={selectedStudent}
                  onChange={(e) => setSelectedStudent(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">-- Choose a student --</option>
                  {MOCK_STUDENTS.map((student) => (
                    <option key={student.id} value={student.id}>
                      {student.name} - {student.grade} ({student.studentId})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date *
                  </label>
                  <input
                    id="startDate"
                    type="date"
                    data-testid="submitanabsence-startdate"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-2">
                    End Date *
                  </label>
                  <input
                    id="endDate"
                    type="date"
                    data-testid="submitanabsence-enddate"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-2">
                  Reason for Absence *
                </label>
                <select
                  id="reason"
                  data-testid="submitanabsence-reason"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">-- Select a reason --</option>
                  {ABSENCE_REASONS.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Notes
                </label>
                <textarea
                  id="notes"
                  data-testid="submitanabsence-notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                  placeholder="Provide any additional details about the absence..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex items-center space-x-4 pt-4">
                <button
                  type="submit"
                  data-testid="submitanabsence-submit"
                  className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Submit Absence Report
                </button>
                <button
                  type="button"
                  data-testid="submitanabsence-cancel"
                  onClick={handleReset}
                  className="px-8 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>

        <div className="mt-6 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Absence Reports</h2>
          <ul className="space-y-3">
            {MOCK_STUDENTS.slice(0, 5).map((student) => (
              <li 
                key={student.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div>
                  <p className="font-medium text-gray-900">{student.name}</p>
                  <p className="text-sm text-gray-500">{student.grade} • {student.studentId}</p>
                </div>
                <button
                  data-testid="submitanabsence-view"
                  onClick={() => setShowRouting(!showRouting)}
                  className="px-4 py-2 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  View Status
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
