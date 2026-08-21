/**
 * CreatePost — Submit absence report with real-time validation and status tracking
 *
 * Features: form validation, multi-day absence, documentation upload, status tracking, submission confirmation
 *
 * Ticket: SCRUM-1076 | Branch: proto/SCRUM-1070
 */

import { useState } from 'react'

interface Student {
  id: string
  name: string
  grade: string
  studentId: string
}

interface AbsenceReport {
  id: string
  studentId: string
  studentName: string
  startDate: string
  endDate: string
  absenceType: string
  reason: string
  documentationRequired: boolean
  status: 'draft' | 'submitting' | 'submitted' | 'failed'
  createdAt: string
}

interface ValidationError {
  field: string
  message: string
}

const MOCK_STUDENTS: Student[] = [
  { id: 'STU001', name: 'Olivia Martinez', grade: '10th Grade', studentId: 'STU001' },
  { id: 'STU002', name: 'Ethan Thompson', grade: '9th Grade', studentId: 'STU002' },
  { id: 'STU003', name: 'Sophia Anderson', grade: '11th Grade', studentId: 'STU003' },
  { id: 'STU004', name: 'Liam Foster', grade: '8th Grade', studentId: 'STU004' },
  { id: 'STU005', name: 'Isabella Kim', grade: '12th Grade', studentId: 'STU005' },
]

const ABSENCE_TYPES = [
  { value: 'illness', label: 'Illness', requiresDoc: true },
  { value: 'medical', label: 'Medical Appointment', requiresDoc: true },
  { value: 'family', label: 'Family Emergency', requiresDoc: false },
  { value: 'religious', label: 'Religious Observance', requiresDoc: false },
  { value: 'other', label: 'Other', requiresDoc: false },
]

const MOCK_SUBMITTED_REPORTS: AbsenceReport[] = [
  {
    id: 'REP001',
    studentId: 'STU001',
    studentName: 'Olivia Martinez',
    startDate: '2026-08-20',
    endDate: '2026-08-20',
    absenceType: 'illness',
    reason: 'Flu symptoms',
    documentationRequired: true,
    status: 'submitted',
    createdAt: '2026-08-20T08:30:00Z',
  },
  {
    id: 'REP002',
    studentId: 'STU002',
    studentName: 'Ethan Thompson',
    startDate: '2026-08-19',
    endDate: '2026-08-21',
    absenceType: 'medical',
    reason: 'Dental surgery',
    documentationRequired: true,
    status: 'submitted',
    createdAt: '2026-08-18T14:15:00Z',
  },
  {
    id: 'REP003',
    studentId: 'STU003',
    studentName: 'Sophia Anderson',
    startDate: '2026-08-18',
    endDate: '2026-08-18',
    absenceType: 'family',
    reason: 'Family matter',
    documentationRequired: false,
    status: 'submitted',
    createdAt: '2026-08-18T09:00:00Z',
  },
  {
    id: 'REP004',
    studentId: 'STU004',
    studentName: 'Liam Foster',
    startDate: '2026-08-15',
    endDate: '2026-08-17',
    absenceType: 'religious',
    reason: 'Religious holiday',
    documentationRequired: false,
    status: 'submitted',
    createdAt: '2026-08-14T16:45:00Z',
  },
  {
    id: 'REP005',
    studentId: 'STU005',
    studentName: 'Isabella Kim',
    startDate: '2026-08-12',
    endDate: '2026-08-12',
    absenceType: 'illness',
    reason: 'Stomach flu',
    documentationRequired: true,
    status: 'submitted',
    createdAt: '2026-08-12T07:20:00Z',
  },
]

export default function CreatePost() {
  const [studentId, setStudentId] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [absenceType, setAbsenceType] = useState('')
  const [reason, setReason] = useState('')
  const [hasDocumentation, setHasDocumentation] = useState(false)
  const [errors, setErrors] = useState<ValidationError[]>([])
  const [submittedReports, setSubmittedReports] = useState<AbsenceReport[]>(MOCK_SUBMITTED_REPORTS)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const selectedStudent = MOCK_STUDENTS.find((s) => s.id === studentId)
  const selectedAbsenceType = ABSENCE_TYPES.find((t) => t.value === absenceType)

  const validateForm = (): ValidationError[] => {
    const newErrors: ValidationError[] = []

    if (!studentId) {
      newErrors.push({ field: 'studentId', message: 'Please select a student' })
    }

    if (!startDate) {
      newErrors.push({ field: 'startDate', message: 'Start date is required' })
    }

    if (!absenceType) {
      newErrors.push({ field: 'absenceType', message: 'Please select an absence type' })
    }

    if (!reason.trim()) {
      newErrors.push({ field: 'reason', message: 'Please provide a reason' })
    } else if (reason.trim().length < 10) {
      newErrors.push({ field: 'reason', message: 'Reason must be at least 10 characters' })
    }

    if (endDate && startDate && new Date(endDate) < new Date(startDate)) {
      newErrors.push({ field: 'endDate', message: 'End date must be after start date' })
    }

    if (selectedAbsenceType?.requiresDoc && !hasDocumentation) {
      newErrors.push({
        field: 'documentation',
        message: 'Documentation is required for this absence type',
      })
    }

    return newErrors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const validationErrors = validateForm()
    if (validationErrors.length > 0) {
      setErrors(validationErrors)
      return
    }

    setErrors([])
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      const newReport: AbsenceReport = {
        id: `REP${Date.now()}`,
        studentId,
        studentName: selectedStudent?.name || '',
        startDate,
        endDate: endDate || startDate,
        absenceType,
        reason,
        documentationRequired: selectedAbsenceType?.requiresDoc || false,
        status: 'submitted',
        createdAt: new Date().toISOString(),
      }

      setSubmittedReports([newReport, ...submittedReports])
      setShowSuccess(true)
      setIsSubmitting(false)

      // Reset form after success
      setTimeout(() => {
        setStudentId('')
        setStartDate('')
        setEndDate('')
        setAbsenceType('')
        setReason('')
        setHasDocumentation(false)
        setShowSuccess(false)
      }, 3000)
    }, 1500)
  }

  const getErrorForField = (field: string): string | undefined => {
    return errors.find((e) => e.field === field)?.message
  }

  const calculateDaysAbsent = (): number => {
    if (!startDate) return 0
    const start = new Date(startDate)
    const end = endDate ? new Date(endDate) : new Date(startDate)
    const diffTime = Math.abs(end.getTime() - start.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays + 1
  }

  return (
    <div data-testid="createpost" className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Post Absence Report
          </h1>
          <p className="text-gray-600">
            Submit a new absence report to the school administration
          </p>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div
            data-testid="createpost-success"
            className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded-lg animate-pulse"
          >
            <div className="flex items-center">
              <span className="text-2xl mr-3">✓</span>
              <div>
                <p className="font-semibold text-green-800">Report Submitted Successfully!</p>
                <p className="text-sm text-green-700 mt-1">
                  Your absence report for {selectedStudent?.name} has been posted.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Form */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Student Selection */}
            <div>
              <label
                htmlFor="student"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Student <span className="text-red-500">*</span>
              </label>
              <select
                id="student"
                data-testid="createpost-student"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  getErrorForField('studentId') ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">-- Select a student --</option>
                {MOCK_STUDENTS.map((student) => (
                  <option key={student.id} value={student.id}>
                    {student.name} ({student.grade} • {student.studentId})
                  </option>
                ))}
              </select>
              {getErrorForField('studentId') && (
                <p className="mt-1 text-sm text-red-600">{getErrorForField('studentId')}</p>
              )}
            </div>

            {/* Date Range */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="start-date"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Start Date <span className="text-red-500">*</span>
                </label>
                <input
                  id="start-date"
                  type="date"
                  data-testid="createpost-start-date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                    getErrorForField('startDate') ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {getErrorForField('startDate') && (
                  <p className="mt-1 text-sm text-red-600">{getErrorForField('startDate')}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="end-date"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  End Date (Optional)
                </label>
                <input
                  id="end-date"
                  type="date"
                  data-testid="createpost-end-date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  min={startDate}
                  className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                    getErrorForField('endDate') ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {getErrorForField('endDate') && (
                  <p className="mt-1 text-sm text-red-600">{getErrorForField('endDate')}</p>
                )}
              </div>
            </div>

            {/* Days Counter */}
            {startDate && (
              <div data-testid="createpost-days-counter" className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                <p className="text-sm font-medium text-purple-900">
                  Total Days: <span className="text-xl font-bold">{calculateDaysAbsent()}</span>
                </p>
              </div>
            )}

            {/* Absence Type */}
            <div>
              <label
                htmlFor="absence-type"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Absence Type <span className="text-red-500">*</span>
              </label>
              <select
                id="absence-type"
                data-testid="createpost-absence-type"
                value={absenceType}
                onChange={(e) => setAbsenceType(e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  getErrorForField('absenceType') ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">-- Select absence type --</option>
                {ABSENCE_TYPES.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label} {type.requiresDoc ? '(Documentation Required)' : ''}
                  </option>
                ))}
              </select>
              {getErrorForField('absenceType') && (
                <p className="mt-1 text-sm text-red-600">{getErrorForField('absenceType')}</p>
              )}
            </div>

            {/* Reason */}
            <div>
              <label
                htmlFor="reason"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Reason for Absence <span className="text-red-500">*</span>
              </label>
              <textarea
                id="reason"
                data-testid="createpost-reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={4}
                placeholder="Please provide detailed information about the absence (minimum 10 characters)"
                className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  getErrorForField('reason') ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              <div className="flex justify-between items-center mt-1">
                {getErrorForField('reason') ? (
                  <p className="text-sm text-red-600">{getErrorForField('reason')}</p>
                ) : (
                  <p className="text-sm text-gray-500">
                    {reason.length} characters (minimum 10)
                  </p>
                )}
              </div>
            </div>

            {/* Documentation Checkbox */}
            {selectedAbsenceType?.requiresDoc && (
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <label className="flex items-start cursor-pointer">
                  <input
                    type="checkbox"
                    data-testid="createpost-documentation"
                    checked={hasDocumentation}
                    onChange={(e) => setHasDocumentation(e.target.checked)}
                    className="mt-1 w-5 h-5 text-purple-600 rounded focus:ring-2 focus:ring-purple-500"
                  />
                  <div className="ml-3">
                    <p className="font-medium text-gray-900">
                      I have the required documentation
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Medical documentation must be submitted within 48 hours
                    </p>
                  </div>
                </label>
                {getErrorForField('documentation') && (
                  <p className="mt-2 text-sm text-red-600">{getErrorForField('documentation')}</p>
                )}
              </div>
            )}

            {/* Error Summary */}
            {errors.length > 0 && (
              <div data-testid="createpost-errors" className="p-4 bg-red-50 border-l-4 border-red-500 rounded">
                <p className="font-medium text-red-800 mb-2">
                  Please correct the following errors:
                </p>
                <ul className="list-disc list-inside space-y-1">
                  {errors.map((error, idx) => (
                    <li key={idx} className="text-sm text-red-700">
                      {error.message}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                data-testid="createpost-submit"
                disabled={isSubmitting}
                className="flex-1 bg-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Report'}
              </button>
              <button
                type="button"
                data-testid="createpost-clear"
                onClick={() => {
                  setStudentId('')
                  setStartDate('')
                  setEndDate('')
                  setAbsenceType('')
                  setReason('')
                  setHasDocumentation(false)
                  setErrors([])
                }}
                disabled={isSubmitting}
                className="px-6 bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Clear Form
              </button>
            </div>
          </form>
        </div>

        {/* Submitted Reports */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Recent Submissions
          </h2>
          <div data-testid="createpost-list" className="space-y-3">
            {submittedReports.map((report) => (
              <div
                key={report.id}
                data-testid="createpost-item"
                className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-gray-900">{report.studentName}</h3>
                      <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">
                        {report.status.toUpperCase()}
                      </span>
                      {report.documentationRequired && (
                        <span className="px-2 py-1 text-xs font-medium bg-amber-100 text-amber-700 rounded-full">
                          DOC REQUIRED
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-700 font-medium">
                      {ABSENCE_TYPES.find((t) => t.value === report.absenceType)?.label}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      {report.startDate}
                      {report.endDate !== report.startDate && ` to ${report.endDate}`}
                    </p>
                    <p className="text-sm text-gray-500 mt-1 italic">{report.reason}</p>
                    <p className="text-xs text-gray-400 mt-2">
                      Submitted: {new Date(report.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <button
                    type="button"
                    data-testid="createpost-view"
                    className="text-sm text-purple-600 hover:text-purple-700 font-medium"
                  >
                    View →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
