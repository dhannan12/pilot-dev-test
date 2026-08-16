/**
 * UserSubmitsA — User submits a valid absence report
 *
 * Features: absence form, student selection, date/time pickers, reason dropdown, submission history
 *
 * Ticket: SCRUM-939 | Branch: proto/SCRUM-938
 */

import { useState } from 'react'

interface AbsenceReport {
  id: string
  studentName: string
  date: string
  startTime: string
  endTime: string
  reason: string
  notes: string
  status: 'pending' | 'approved' | 'rejected'
  submittedAt: string
}

const mockStudents = [
  { id: 's1', name: 'Emma Johnson' },
  { id: 's2', name: 'Liam Smith' },
  { id: 's3', name: 'Olivia Williams' },
  { id: 's4', name: 'Noah Brown' },
  { id: 's5', name: 'Ava Davis' }
]

const mockReasons = [
  'Illness',
  'Medical Appointment',
  'Family Emergency',
  'Religious Observance',
  'School Event',
  'Other'
]

const initialMockReports: AbsenceReport[] = [
  {
    id: 'r1',
    studentName: 'Emma Johnson',
    date: '2026-08-15',
    startTime: '09:00',
    endTime: '12:00',
    reason: 'Medical Appointment',
    notes: 'Doctor appointment for annual checkup',
    status: 'approved',
    submittedAt: '2026-08-14T10:30:00'
  },
  {
    id: 'r2',
    studentName: 'Liam Smith',
    date: '2026-08-14',
    startTime: '08:00',
    endTime: '16:00',
    reason: 'Illness',
    notes: 'Flu symptoms, staying home to recover',
    status: 'approved',
    submittedAt: '2026-08-13T18:45:00'
  },
  {
    id: 'r3',
    studentName: 'Olivia Williams',
    date: '2026-08-13',
    startTime: '13:00',
    endTime: '16:00',
    reason: 'Family Emergency',
    notes: 'Had to leave early for family matter',
    status: 'pending',
    submittedAt: '2026-08-13T12:00:00'
  },
  {
    id: 'r4',
    studentName: 'Noah Brown',
    date: '2026-08-12',
    startTime: '08:00',
    endTime: '10:00',
    reason: 'Religious Observance',
    notes: 'Attending religious ceremony',
    status: 'approved',
    submittedAt: '2026-08-11T15:20:00'
  },
  {
    id: 'r5',
    studentName: 'Ava Davis',
    date: '2026-08-10',
    startTime: '14:00',
    endTime: '16:00',
    reason: 'School Event',
    notes: 'Participating in regional science fair',
    status: 'approved',
    submittedAt: '2026-08-09T09:15:00'
  }
]

export default function UserSubmitsA() {
  const [studentId, setStudentId] = useState('')
  const [date, setDate] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [reason, setReason] = useState('')
  const [notes, setNotes] = useState('')
  const [reports, setReports] = useState<AbsenceReport[]>(initialMockReports)
  const [successMessage, setSuccessMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const student = mockStudents.find(s => s.id === studentId)
    if (!student) return

    const newReport: AbsenceReport = {
      id: `r${reports.length + 1}`,
      studentName: student.name,
      date,
      startTime,
      endTime,
      reason,
      notes,
      status: 'pending',
      submittedAt: new Date().toISOString()
    }

    setReports([newReport, ...reports])
    setSuccessMessage(`Absence report submitted successfully for ${student.name}`)

    // Reset form
    setStudentId('')
    setDate('')
    setStartTime('')
    setEndTime('')
    setReason('')
    setNotes('')

    setTimeout(() => setSuccessMessage(''), 5000)
  }

  const getStatusColor = (status: AbsenceReport['status']) => {
    switch (status) {
      case 'approved': return 'text-green-700 bg-green-50'
      case 'rejected': return 'text-red-700 bg-red-50'
      default: return 'text-yellow-700 bg-yellow-50'
    }
  }

  return (
    <div data-testid="usersubmitsa" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Submit Absence Report</h1>

        {successMessage && (
          <div data-testid="usersubmitsa-success" className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="student" className="block text-sm font-medium text-gray-700 mb-2">
                Student Name *
              </label>
              <select
                id="student"
                data-testid="usersubmitsa-student"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a student</option>
                {mockStudents.map(student => (
                  <option key={student.id} value={student.id}>{student.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                Absence Date *
              </label>
              <input
                id="date"
                type="date"
                data-testid="usersubmitsa-date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 mb-2">
                Start Time *
              </label>
              <input
                id="startTime"
                type="time"
                data-testid="usersubmitsa-starttime"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 mb-2">
                End Time *
              </label>
              <input
                id="endTime"
                type="time"
                data-testid="usersubmitsa-endtime"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-2">
                Reason for Absence *
              </label>
              <select
                id="reason"
                data-testid="usersubmitsa-reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a reason</option>
                {mockReasons.map(r => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
                Additional Notes
              </label>
              <textarea
                id="notes"
                data-testid="usersubmitsa-notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Provide any additional details about the absence..."
              />
            </div>
          </div>

          <div className="mt-6 flex gap-4">
            <button
              type="submit"
              data-testid="usersubmitsa-submit"
              className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
            >
              Submit Report
            </button>
            <button
              type="button"
              data-testid="usersubmitsa-reset"
              onClick={() => {
                setStudentId('')
                setDate('')
                setStartTime('')
                setEndTime('')
                setReason('')
                setNotes('')
              }}
              className="px-6 py-2 bg-gray-200 text-gray-700 font-medium rounded-md hover:bg-gray-300 transition-colors"
            >
              Reset Form
            </button>
          </div>
        </form>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Submission History</h2>
          <div data-testid="usersubmitsa-list" className="space-y-4">
            {reports.map(report => (
              <div
                key={report.id}
                data-testid="usersubmitsa-item"
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{report.studentName}</h3>
                    <p className="text-sm text-gray-600">
                      {new Date(report.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(report.status)}`}>
                    {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-700 mb-2">
                  <p><span className="font-medium">Time:</span> {report.startTime} - {report.endTime}</p>
                  <p><span className="font-medium">Reason:</span> {report.reason}</p>
                </div>
                {report.notes && (
                  <p className="text-sm text-gray-600 mb-2">
                    <span className="font-medium">Notes:</span> {report.notes}
                  </p>
                )}
                <p className="text-xs text-gray-500">
                  Submitted: {new Date(report.submittedAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
