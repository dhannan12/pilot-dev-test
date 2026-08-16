/**
 * CalculateAttendancePercentage — Calculate and display attendance percentage for students
 *
 * Features: student selection, attendance tracking, percentage calculation, visual stats, color-coded status
 *
 * Ticket: SCRUM-947 | Branch: proto/SCRUM-938
 */

import { useState } from 'react'

interface AttendanceRecord {
  id: string
  studentName: string
  totalDays: number
  presentDays: number
  absentDays: number
  grade: string
  semester: string
}

const MOCK_ATTENDANCE: AttendanceRecord[] = [
  {
    id: '1',
    studentName: 'Emily Johnson',
    totalDays: 180,
    presentDays: 172,
    absentDays: 8,
    grade: '10th Grade',
    semester: 'Fall 2026',
  },
  {
    id: '2',
    studentName: 'Michael Chen',
    totalDays: 180,
    presentDays: 165,
    absentDays: 15,
    grade: '11th Grade',
    semester: 'Fall 2026',
  },
  {
    id: '3',
    studentName: 'Sarah Williams',
    totalDays: 180,
    presentDays: 180,
    absentDays: 0,
    grade: '9th Grade',
    semester: 'Fall 2026',
  },
  {
    id: '4',
    studentName: 'David Martinez',
    totalDays: 180,
    presentDays: 158,
    absentDays: 22,
    grade: '12th Grade',
    semester: 'Fall 2026',
  },
  {
    id: '5',
    studentName: 'Jessica Anderson',
    totalDays: 180,
    presentDays: 175,
    absentDays: 5,
    grade: '10th Grade',
    semester: 'Fall 2026',
  },
  {
    id: '6',
    studentName: 'James Thompson',
    totalDays: 180,
    presentDays: 150,
    absentDays: 30,
    grade: '11th Grade',
    semester: 'Fall 2026',
  },
]

export default function CalculateAttendancePercentage() {
  const [selectedStudentId, setSelectedStudentId] = useState<string>('')
  const [customTotalDays, setCustomTotalDays] = useState<string>('')
  const [customPresentDays, setCustomPresentDays] = useState<string>('')

  const selectedStudent = MOCK_ATTENDANCE.find((s) => s.id === selectedStudentId)

  const calculatePercentage = (present: number, total: number): number => {
    if (total === 0) return 0
    return Math.round((present / total) * 100 * 100) / 100
  }

  const getStatusColor = (percentage: number): string => {
    if (percentage >= 95) return 'text-green-600 bg-green-50'
    if (percentage >= 85) return 'text-blue-600 bg-blue-50'
    if (percentage >= 75) return 'text-yellow-600 bg-yellow-50'
    return 'text-red-600 bg-red-50'
  }

  const getStatusLabel = (percentage: number): string => {
    if (percentage >= 95) return 'Excellent'
    if (percentage >= 85) return 'Good'
    if (percentage >= 75) return 'Fair'
    return 'Needs Improvement'
  }

  const customTotal = parseInt(customTotalDays) || 0
  const customPresent = parseInt(customPresentDays) || 0
  const customPercentage = customTotal > 0 ? calculatePercentage(customPresent, customTotal) : null

  return (
    <div data-testid="calculateattendancepercentage" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Attendance Percentage Calculator
          </h1>
          <p className="text-gray-600 mb-6">
            Calculate and track student attendance percentages
          </p>

          {/* Student Selection */}
          <div className="mb-6">
            <label
              htmlFor="student-select"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Select Student
            </label>
            <select
              id="student-select"
              data-testid="calculateattendancepercentage-student"
              value={selectedStudentId}
              onChange={(e) => setSelectedStudentId(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">-- Choose a student --</option>
              {MOCK_ATTENDANCE.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.studentName} - {student.grade}
                </option>
              ))}
            </select>
          </div>

          {/* Selected Student Details */}
          {selectedStudent && (
            <div
              data-testid="calculateattendancepercentage-details"
              className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {selectedStudent.studentName}
              </h2>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600">Grade</p>
                  <p className="text-lg font-medium text-gray-900">
                    {selectedStudent.grade}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Semester</p>
                  <p className="text-lg font-medium text-gray-900">
                    {selectedStudent.semester}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Days</p>
                  <p className="text-lg font-medium text-gray-900">
                    {selectedStudent.totalDays}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Present Days</p>
                  <p className="text-lg font-medium text-gray-900">
                    {selectedStudent.presentDays}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Absent Days</p>
                  <p className="text-lg font-medium text-gray-900">
                    {selectedStudent.absentDays}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-blue-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Attendance Percentage</p>
                    <p className="text-4xl font-bold text-blue-600">
                      {calculatePercentage(
                        selectedStudent.presentDays,
                        selectedStudent.totalDays
                      )}
                      %
                    </p>
                  </div>
                  <div
                    className={`px-4 py-2 rounded-lg font-semibold ${getStatusColor(
                      calculatePercentage(selectedStudent.presentDays, selectedStudent.totalDays)
                    )}`}
                  >
                    {getStatusLabel(
                      calculatePercentage(selectedStudent.presentDays, selectedStudent.totalDays)
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Custom Calculation */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Custom Calculation
            </h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label
                  htmlFor="total-days"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Total Days
                </label>
                <input
                  id="total-days"
                  type="number"
                  data-testid="calculateattendancepercentage-totaldays"
                  value={customTotalDays}
                  onChange={(e) => setCustomTotalDays(e.target.value)}
                  placeholder="Enter total days"
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label
                  htmlFor="present-days"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Present Days
                </label>
                <input
                  id="present-days"
                  type="number"
                  data-testid="calculateattendancepercentage-presentdays"
                  value={customPresentDays}
                  onChange={(e) => setCustomPresentDays(e.target.value)}
                  placeholder="Enter present days"
                  min="0"
                  max={customTotalDays}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {customPercentage !== null && customTotal > 0 && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Calculated Percentage</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {customPercentage}%
                    </p>
                  </div>
                  <div
                    className={`px-4 py-2 rounded-lg font-semibold ${getStatusColor(
                      customPercentage
                    )}`}
                  >
                    {getStatusLabel(customPercentage)}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* All Students List */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            All Students Attendance
          </h2>
          <div data-testid="calculateattendancepercentage-list" className="space-y-3">
            {MOCK_ATTENDANCE.map((student) => {
              const percentage = calculatePercentage(student.presentDays, student.totalDays)
              return (
                <div
                  key={student.id}
                  data-testid="calculateattendancepercentage-item"
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">
                        {student.studentName}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {student.grade} • {student.semester}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {student.presentDays} / {student.totalDays} days present
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900">
                        {percentage}%
                      </p>
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                          percentage
                        )}`}
                      >
                        {getStatusLabel(percentage)}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
