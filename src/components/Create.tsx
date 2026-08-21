/**
 * Create — Create and manage absence reports with batch submission support
 *
 * Features: multi-student selection, date range picker, bulk submission, report preview, validation
 *
 * Ticket: SCRUM-1074 | Branch: proto/SCRUM-1070
 */

import { useState } from 'react'

interface Student {
  id: string
  name: string
  grade: string
  studentId: string
}

interface AbsenceType {
  id: string
  label: string
  requiresDoc: boolean
}

interface AbsenceReport {
  id: string
  studentName: string
  startDate: string
  endDate: string
  type: string
  status: 'pending' | 'submitted' | 'approved'
  createdAt: string
}

const MOCK_STUDENTS: Student[] = [
  { id: '1', name: 'Sarah Chen', grade: '10th Grade', studentId: 'STU001' },
  { id: '2', name: 'Marcus Johnson', grade: '9th Grade', studentId: 'STU002' },
  { id: '3', name: 'Emily Rodriguez', grade: '11th Grade', studentId: 'STU003' },
  { id: '4', name: 'James Wilson', grade: '8th Grade', studentId: 'STU004' },
  { id: '5', name: 'Aisha Patel', grade: '12th Grade', studentId: 'STU005' },
]

const ABSENCE_TYPES: AbsenceType[] = [
  { id: 'sick', label: 'Sick Leave', requiresDoc: true },
  { id: 'medical', label: 'Medical Appointment', requiresDoc: true },
  { id: 'family', label: 'Family Emergency', requiresDoc: false },
  { id: 'vacation', label: 'Vacation', requiresDoc: false },
  { id: 'religious', label: 'Religious Holiday', requiresDoc: false },
]

const MOCK_REPORTS: AbsenceReport[] = [
  {
    id: '1',
    studentName: 'Sarah Chen',
    startDate: '2026-08-19',
    endDate: '2026-08-19',
    type: 'Sick Leave',
    status: 'submitted',
    createdAt: '2026-08-19 09:00',
  },
  {
    id: '2',
    studentName: 'Marcus Johnson',
    startDate: '2026-08-18',
    endDate: '2026-08-20',
    type: 'Medical Appointment',
    status: 'approved',
    createdAt: '2026-08-17 14:30',
  },
  {
    id: '3',
    studentName: 'Emily Rodriguez',
    startDate: '2026-08-15',
    endDate: '2026-08-15',
    type: 'Family Emergency',
    status: 'pending',
    createdAt: '2026-08-15 10:15',
  },
  {
    id: '4',
    studentName: 'James Wilson',
    startDate: '2026-08-10',
    endDate: '2026-08-12',
    type: 'Vacation',
    status: 'approved',
    createdAt: '2026-08-05 11:20',
  },
  {
    id: '5',
    studentName: 'Aisha Patel',
    startDate: '2026-08-08',
    endDate: '2026-08-08',
    type: 'Religious Holiday',
    status: 'approved',
    createdAt: '2026-08-07 16:45',
  },
]

export default function Create() {
  const [selectedStudents, setSelectedStudents] = useState<string[]>([])
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [absenceType, setAbsenceType] = useState('')
  const [description, setDescription] = useState('')
  const [showPreview, setShowPreview] = useState(false)
  const [reports, setReports] = useState<AbsenceReport[]>(MOCK_REPORTS)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleStudentToggle = (studentId: string) => {
    setSelectedStudents((prev) =>
      prev.includes(studentId)
        ? prev.filter((id) => id !== studentId)
        : [...prev, studentId]
    )
  }

  const handleSelectAll = () => {
    if (selectedStudents.length === MOCK_STUDENTS.length) {
      setSelectedStudents([])
    } else {
      setSelectedStudents(MOCK_STUDENTS.map((s) => s.id))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (selectedStudents.length === 0 || !startDate || !absenceType) {
      alert('Please select at least one student, start date, and absence type')
      return
    }

    // Create new reports for each selected student
    const newReports: AbsenceReport[] = selectedStudents.map((studentId, idx) => {
      const student = MOCK_STUDENTS.find((s) => s.id === studentId)
      const type = ABSENCE_TYPES.find((t) => t.id === absenceType)
      return {
        id: `new-${Date.now()}-${idx}`,
        studentName: student?.name || '',
        startDate,
        endDate: endDate || startDate,
        type: type?.label || '',
        status: 'submitted' as const,
        createdAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
      }
    })

    setReports([...newReports, ...reports])
    setSubmitSuccess(true)

    // Reset form
    setTimeout(() => {
      setSelectedStudents([])
      setStartDate('')
      setEndDate('')
      setAbsenceType('')
      setDescription('')
      setShowPreview(false)
      setSubmitSuccess(false)
    }, 2000)
  }

  const selectedType = ABSENCE_TYPES.find((t) => t.id === absenceType)

  return (
    <div data-testid="create" className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Create Absence Report
              </h1>
              <p className="text-gray-600 mt-1">
                Submit absence reports for one or multiple students
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Selected Students</p>
              <p className="text-2xl font-bold text-blue-600">
                {selectedStudents.length}
              </p>
            </div>
          </div>

          {submitSuccess && (
            <div
              data-testid="create-success"
              className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 text-green-800 rounded"
            >
              <p className="font-medium">✓ Reports created successfully!</p>
              <p className="text-sm mt-1">
                {selectedStudents.length} absence report(s) have been submitted.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Student Selection */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-medium text-gray-700">
                  Select Students <span className="text-red-500">*</span>
                </label>
                <button
                  type="button"
                  data-testid="create-select-all"
                  onClick={handleSelectAll}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  {selectedStudents.length === MOCK_STUDENTS.length
                    ? 'Deselect All'
                    : 'Select All'}
                </button>
              </div>
              <div
                data-testid="create-student-list"
                className="grid grid-cols-1 md:grid-cols-2 gap-3"
              >
                {MOCK_STUDENTS.map((student) => (
                  <label
                    key={student.id}
                    data-testid="create-student-item"
                    className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedStudents.includes(student.id)
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      data-testid={`create-student-checkbox-${student.id}`}
                      checked={selectedStudents.includes(student.id)}
                      onChange={() => handleStudentToggle(student.id)}
                      className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="ml-3">
                      <p className="font-medium text-gray-900">{student.name}</p>
                      <p className="text-sm text-gray-500">
                        {student.grade} • {student.studentId}
                      </p>
                    </div>
                  </label>
                ))}
              </div>
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
                  data-testid="create-start-date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
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
                  data-testid="create-end-date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  min={startDate}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

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
                data-testid="create-absence-type"
                value={absenceType}
                onChange={(e) => setAbsenceType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">-- Select absence type --</option>
                {ABSENCE_TYPES.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.label}
                    {type.requiresDoc ? ' (Documentation Required)' : ''}
                  </option>
                ))}
              </select>
              {selectedType?.requiresDoc && (
                <p className="mt-2 text-sm text-amber-600">
                  ⚠ This absence type requires medical documentation
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Additional Details
              </label>
              <textarea
                id="description"
                data-testid="create-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Add any relevant information about the absence..."
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                data-testid="create-submit"
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors shadow-md"
              >
                Create Report{selectedStudents.length > 1 ? 's' : ''}
              </button>
              <button
                type="button"
                data-testid="create-preview"
                onClick={() => setShowPreview(!showPreview)}
                disabled={selectedStudents.length === 0 || !startDate || !absenceType}
                className="px-6 bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {showPreview ? 'Hide Preview' : 'Preview'}
              </button>
              <button
                type="button"
                data-testid="create-clear"
                onClick={() => {
                  setSelectedStudents([])
                  setStartDate('')
                  setEndDate('')
                  setAbsenceType('')
                  setDescription('')
                  setShowPreview(false)
                }}
                className="px-6 bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
              >
                Clear
              </button>
            </div>
          </form>

          {/* Preview Section */}
          {showPreview && selectedStudents.length > 0 && startDate && absenceType && (
            <div data-testid="create-preview-section" className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Preview: {selectedStudents.length} Report{selectedStudents.length > 1 ? 's' : ''}
              </h3>
              <div className="space-y-2">
                {selectedStudents.map((studentId) => {
                  const student = MOCK_STUDENTS.find((s) => s.id === studentId)
                  const type = ABSENCE_TYPES.find((t) => t.id === absenceType)
                  return (
                    <div
                      key={studentId}
                      data-testid="create-preview-item"
                      className="p-3 bg-white rounded border border-blue-100"
                    >
                      <p className="font-medium text-gray-900">{student?.name}</p>
                      <p className="text-sm text-gray-600">
                        {startDate} {endDate && endDate !== startDate && `to ${endDate}`} • {type?.label}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        {/* Recent Reports */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Recent Absence Reports
          </h2>
          <div data-testid="create-reports-list" className="space-y-3">
            {reports.map((report) => (
              <div
                key={report.id}
                data-testid="create-report-item"
                className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-gray-900">
                        {report.studentName}
                      </h3>
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          report.status === 'approved'
                            ? 'bg-green-100 text-green-700'
                            : report.status === 'submitted'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {report.status.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {report.type} • {report.startDate}
                      {report.endDate !== report.startDate && ` - ${report.endDate}`}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Created: {report.createdAt}
                    </p>
                  </div>
                  <button
                    type="button"
                    data-testid="create-view-report"
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
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
