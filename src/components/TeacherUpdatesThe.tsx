/**
 * TeacherUpdatesThe — Class register update interface for teachers after lessons
 *
 * Features: attendance marking, student notes, absence reasons, bulk actions, save changes
 *
 * Ticket: SCRUM-945 | Branch: proto/SCRUM-938
 */

import { useState } from 'react'

interface Student {
  id: string
  name: string
  attendance: 'present' | 'absent' | 'late'
  notes: string
  absenceReason?: string
}

const MOCK_STUDENTS: Student[] = [
  {
    id: 'S001',
    name: 'Emma Thompson',
    attendance: 'present',
    notes: '',
  },
  {
    id: 'S002',
    name: 'Liam Johnson',
    attendance: 'present',
    notes: '',
  },
  {
    id: 'S003',
    name: 'Olivia Martinez',
    attendance: 'absent',
    notes: '',
    absenceReason: 'Sick',
  },
  {
    id: 'S004',
    name: 'Noah Brown',
    attendance: 'late',
    notes: 'Arrived 15 minutes late',
  },
  {
    id: 'S005',
    name: 'Ava Davis',
    attendance: 'present',
    notes: '',
  },
  {
    id: 'S006',
    name: 'Ethan Wilson',
    attendance: 'present',
    notes: 'Excellent participation',
  },
  {
    id: 'S007',
    name: 'Sophia Garcia',
    attendance: 'absent',
    notes: '',
    absenceReason: 'Family emergency',
  },
]

export default function TeacherUpdatesThe() {
  const [students, setStudents] = useState<Student[]>(MOCK_STUDENTS)
  const [lessonDate, setLessonDate] = useState<string>(new Date().toISOString().split('T')[0])
  const [lessonSubject] = useState<string>('Mathematics')
  const [lessonPeriod] = useState<string>('Period 3')
  const [saveStatus, setSaveStatus] = useState<string>('')

  const handleAttendanceChange = (studentId: string, attendance: 'present' | 'absent' | 'late') => {
    setStudents(students.map(student => 
      student.id === studentId 
        ? { ...student, attendance, absenceReason: attendance === 'absent' ? student.absenceReason || '' : undefined }
        : student
    ))
  }

  const handleNotesChange = (studentId: string, notes: string) => {
    setStudents(students.map(student =>
      student.id === studentId ? { ...student, notes } : student
    ))
  }

  const handleAbsenceReasonChange = (studentId: string, reason: string) => {
    setStudents(students.map(student =>
      student.id === studentId ? { ...student, absenceReason: reason } : student
    ))
  }

  const handleMarkAllPresent = () => {
    setStudents(students.map(student => ({
      ...student,
      attendance: 'present',
      absenceReason: undefined,
    })))
  }

  const handleSaveRegister = () => {
    setSaveStatus('Saving...')
    setTimeout(() => {
      setSaveStatus('Register saved successfully!')
      setTimeout(() => setSaveStatus(''), 3000)
    }, 500)
  }

  const presentCount = students.filter(s => s.attendance === 'present').length
  const absentCount = students.filter(s => s.attendance === 'absent').length
  const lateCount = students.filter(s => s.attendance === 'late').length

  return (
    <div data-testid="teacherupdatesthe" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Update Class Register</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Lesson Date
              </label>
              <input
                type="date"
                data-testid="teacherupdatesthe-date"
                value={lessonDate}
                onChange={(e) => setLessonDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subject
              </label>
              <input
                type="text"
                data-testid="teacherupdatesthe-subject"
                value={lessonSubject}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Period
              </label>
              <input
                type="text"
                data-testid="teacherupdatesthe-period"
                value={lessonPeriod}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
              />
            </div>
          </div>

          {/* Summary Stats */}
          <div className="flex gap-6 text-sm">
            <div className="flex items-center gap-2">
              <span className="font-medium">Total:</span>
              <span className="px-2 py-1 bg-gray-100 rounded">{students.length}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-green-700">Present:</span>
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded">{presentCount}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-red-700">Absent:</span>
              <span className="px-2 py-1 bg-red-100 text-red-700 rounded">{absentCount}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-yellow-700">Late:</span>
              <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded">{lateCount}</span>
            </div>
          </div>
        </div>

        {/* Bulk Actions */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
            <button
              data-testid="teacherupdatesthe-mark-all-present"
              onClick={handleMarkAllPresent}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              Mark All Present
            </button>
          </div>
        </div>

        {/* Student List */}
        <div data-testid="teacherupdatesthe-list" className="bg-white rounded-lg shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Student Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Attendance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Absence Reason
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Notes
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {students.map((student) => (
                <tr key={student.id} data-testid="teacherupdatesthe-item" className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="text-sm font-medium text-gray-900">{student.name}</div>
                      <div className="ml-2 text-xs text-gray-500">({student.id})</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      data-testid={`teacherupdatesthe-attendance-${student.id}`}
                      value={student.attendance}
                      onChange={(e) => handleAttendanceChange(student.id, e.target.value as 'present' | 'absent' | 'late')}
                      className={`px-3 py-1 rounded-md text-sm font-medium border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        student.attendance === 'present'
                          ? 'bg-green-100 text-green-800 border-green-300'
                          : student.attendance === 'absent'
                          ? 'bg-red-100 text-red-800 border-red-300'
                          : 'bg-yellow-100 text-yellow-800 border-yellow-300'
                      }`}
                    >
                      <option value="present">Present</option>
                      <option value="absent">Absent</option>
                      <option value="late">Late</option>
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    {student.attendance === 'absent' ? (
                      <input
                        type="text"
                        data-testid={`teacherupdatesthe-reason-${student.id}`}
                        value={student.absenceReason || ''}
                        onChange={(e) => handleAbsenceReasonChange(student.id, e.target.value)}
                        placeholder="Enter reason..."
                        className="w-full px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <span className="text-sm text-gray-400">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <input
                      type="text"
                      data-testid={`teacherupdatesthe-notes-${student.id}`}
                      value={student.notes}
                      onChange={(e) => handleNotesChange(student.id, e.target.value)}
                      placeholder="Add notes..."
                      className="w-full px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Save Button */}
        <div className="mt-6 flex items-center justify-between">
          <div>
            {saveStatus && (
              <p className={`text-sm font-medium ${
                saveStatus.includes('successfully') ? 'text-green-600' : 'text-blue-600'
              }`}>
                {saveStatus}
              </p>
            )}
          </div>
          <button
            data-testid="teacherupdatesthe-save"
            onClick={handleSaveRegister}
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors shadow-sm"
          >
            Save Register
          </button>
        </div>
      </div>
    </div>
  )
}
