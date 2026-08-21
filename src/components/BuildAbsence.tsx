/**
 * BuildAbsence — School absence reporting form for parents and guardians
 *
 * Features: student selection, absence date picker, reason selection, supporting notes, submission confirmation
 *
 * Ticket: SCRUM-1078 | Branch: proto/SCRUM-1070
 */

import React, { useState } from 'react'

interface Student {
  id: string
  name: string
  grade: string
}

interface AbsenceReason {
  id: string
  label: string
}

interface AbsenceReport {
  id: string
  studentName: string
  date: string
  reason: string
  notes: string
  submittedAt: string
}

const MOCK_STUDENTS: Student[] = [
  { id: 's1', name: 'Emma Johnson', grade: '5th Grade' },
  { id: 's2', name: 'Liam Smith', grade: '3rd Grade' },
  { id: 's3', name: 'Olivia Williams', grade: '7th Grade' },
  { id: 's4', name: 'Noah Brown', grade: '4th Grade' },
  { id: 's5', name: 'Sophia Davis', grade: '6th Grade' },
]

const ABSENCE_REASONS: AbsenceReason[] = [
  { id: 'r1', label: 'Illness' },
  { id: 'r2', label: 'Medical Appointment' },
  { id: 'r3', label: 'Family Emergency' },
  { id: 'r4', label: 'Bereavement' },
  { id: 'r5', label: 'Religious Observance' },
  { id: 'r6', label: 'School-Approved Activity' },
  { id: 'r7', label: 'Other' },
]

const MOCK_SUBMITTED_REPORTS: AbsenceReport[] = [
  {
    id: 'ar1',
    studentName: 'Emma Johnson',
    date: '2026-08-20',
    reason: 'Illness',
    notes: 'Flu symptoms, staying home to rest',
    submittedAt: '2026-08-19 09:15 AM',
  },
  {
    id: 'ar2',
    studentName: 'Liam Smith',
    date: '2026-08-18',
    reason: 'Medical Appointment',
    notes: 'Dentist appointment at 10 AM',
    submittedAt: '2026-08-17 02:30 PM',
  },
  {
    id: 'ar3',
    studentName: 'Olivia Williams',
    date: '2026-08-15',
    reason: 'Family Emergency',
    notes: 'Family matter requiring immediate attention',
    submittedAt: '2026-08-15 07:45 AM',
  },
  {
    id: 'ar4',
    studentName: 'Noah Brown',
    date: '2026-08-12',
    reason: 'Illness',
    notes: 'Stomach bug, fever present',
    submittedAt: '2026-08-11 08:20 PM',
  },
  {
    id: 'ar5',
    studentName: 'Sophia Davis',
    date: '2026-08-10',
    reason: 'Religious Observance',
    notes: 'Religious holiday celebration',
    submittedAt: '2026-08-08 11:00 AM',
  },
]

export default function BuildAbsence() {
  const [selectedStudent, setSelectedStudent] = useState('')
  const [absenceDate, setAbsenceDate] = useState('')
  const [selectedReason, setSelectedReason] = useState('')
  const [notes, setNotes] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)
  const [submittedReports, setSubmittedReports] = useState<AbsenceReport[]>(MOCK_SUBMITTED_REPORTS)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedStudent || !absenceDate || !selectedReason) {
      return
    }

    const student = MOCK_STUDENTS.find(s => s.id === selectedStudent)
    const reason = ABSENCE_REASONS.find(r => r.id === selectedReason)

    if (student && reason) {
      const newReport: AbsenceReport = {
        id: `ar${Date.now()}`,
        studentName: student.name,
        date: absenceDate,
        reason: reason.label,
        notes: notes,
        submittedAt: new Date().toLocaleString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        }),
      }

      setSubmittedReports([newReport, ...submittedReports])
      setShowSuccess(true)
      
      // Reset form
      setSelectedStudent('')
      setAbsenceDate('')
      setSelectedReason('')
      setNotes('')

      // Hide success message after 3 seconds
      setTimeout(() => setShowSuccess(false), 3000)
    }
  }

  const handleReset = () => {
    setSelectedStudent('')
    setAbsenceDate('')
    setSelectedReason('')
    setNotes('')
    setShowSuccess(false)
  }

  return (
    <div data-testid="buildabsence" className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Report Student Absence</h1>
            <p className="text-gray-600">
              Please complete the form below to report your child's absence from school.
            </p>
          </div>

          {showSuccess && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800 font-medium">
                ✓ Absence report submitted successfully!
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="student" className="block text-sm font-semibold text-gray-700 mb-2">
                Select Student <span className="text-red-500">*</span>
              </label>
              <select
                id="student"
                data-testid="buildabsence-student"
                value={selectedStudent}
                onChange={(e) => setSelectedStudent(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                required
              >
                <option value="">-- Choose a student --</option>
                {MOCK_STUDENTS.map((student) => (
                  <option key={student.id} value={student.id}>
                    {student.name} ({student.grade})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="date" className="block text-sm font-semibold text-gray-700 mb-2">
                Absence Date <span className="text-red-500">*</span>
              </label>
              <input
                id="date"
                type="date"
                data-testid="buildabsence-date"
                value={absenceDate}
                onChange={(e) => setAbsenceDate(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="reason" className="block text-sm font-semibold text-gray-700 mb-2">
                Reason for Absence <span className="text-red-500">*</span>
              </label>
              <select
                id="reason"
                data-testid="buildabsence-reason"
                value={selectedReason}
                onChange={(e) => setSelectedReason(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                required
              >
                <option value="">-- Select a reason --</option>
                {ABSENCE_REASONS.map((reason) => (
                  <option key={reason.id} value={reason.id}>
                    {reason.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="notes" className="block text-sm font-semibold text-gray-700 mb-2">
                Additional Notes (Optional)
              </label>
              <textarea
                id="notes"
                data-testid="buildabsence-notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                placeholder="Provide any additional details about the absence..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                data-testid="buildabsence-submit"
                className="flex-1 bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-md"
              >
                Submit Absence Report
              </button>
              <button
                type="button"
                data-testid="buildabsence-reset"
                onClick={handleReset}
                className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Reset Form
              </button>
            </div>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Absence Reports</h2>
          <div data-testid="buildabsence-list" className="space-y-4">
            {submittedReports.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No absence reports submitted yet.</p>
            ) : (
              submittedReports.map((report) => (
                <div
                  key={report.id}
                  data-testid="buildabsence-item"
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-800 text-lg">{report.studentName}</h3>
                      <p className="text-sm text-gray-500">Submitted: {report.submittedAt}</p>
                    </div>
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-sm font-medium rounded-full">
                      {report.reason}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-700">
                      <span className="font-medium">Absence Date:</span> {report.date}
                    </p>
                    {report.notes && (
                      <p className="text-gray-700">
                        <span className="font-medium">Notes:</span> {report.notes}
                      </p>
                    )}
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
