/**
 * OnlyTeachersCan — Role-based access control for student progress reports
 *
 * Features: Teacher authentication, student list, progress reports, access denial, role switching
 *
 * Ticket: SCRUM-1258 | Branch: proto/SCRUM-1254
 */

import React, { useState } from 'react'

type Role = 'teacher' | 'student' | 'parent'

interface Student {
  id: number
  name: string
  grade: string
  mathScore: number
  readingScore: number
  scienceScore: number
  attendance: number
  assignments: number
  totalAssignments: number
}

const MOCK_STUDENTS: Student[] = [
  {
    id: 1,
    name: 'Emma Thompson',
    grade: '5th Grade',
    mathScore: 92,
    readingScore: 88,
    scienceScore: 95,
    attendance: 98,
    assignments: 24,
    totalAssignments: 25,
  },
  {
    id: 2,
    name: 'Liam Johnson',
    grade: '5th Grade',
    mathScore: 78,
    readingScore: 82,
    scienceScore: 80,
    attendance: 92,
    assignments: 22,
    totalAssignments: 25,
  },
  {
    id: 3,
    name: 'Olivia Martinez',
    grade: '5th Grade',
    mathScore: 95,
    readingScore: 97,
    scienceScore: 93,
    attendance: 100,
    assignments: 25,
    totalAssignments: 25,
  },
  {
    id: 4,
    name: 'Noah Williams',
    grade: '5th Grade',
    mathScore: 85,
    readingScore: 79,
    scienceScore: 88,
    attendance: 95,
    assignments: 23,
    totalAssignments: 25,
  },
  {
    id: 5,
    name: 'Sophia Brown',
    grade: '5th Grade',
    mathScore: 90,
    readingScore: 94,
    scienceScore: 91,
    attendance: 97,
    assignments: 24,
    totalAssignments: 25,
  },
  {
    id: 6,
    name: 'Ethan Davis',
    grade: '5th Grade',
    mathScore: 73,
    readingScore: 75,
    scienceScore: 77,
    attendance: 89,
    assignments: 20,
    totalAssignments: 25,
  },
  {
    id: 7,
    name: 'Ava Garcia',
    grade: '5th Grade',
    mathScore: 88,
    readingScore: 90,
    scienceScore: 86,
    attendance: 96,
    assignments: 24,
    totalAssignments: 25,
  },
]

export default function OnlyTeachersCan() {
  const [currentRole, setCurrentRole] = useState<Role>('student')
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)

  const handleRoleChange = (role: Role) => {
    setCurrentRole(role)
    setSelectedStudent(null)
  }

  const handleStudentSelect = (student: Student) => {
    if (currentRole === 'teacher') {
      setSelectedStudent(student)
    }
  }

  const handleBackToList = () => {
    setSelectedStudent(null)
  }

  return (
    <div data-testid="onlyteacherscan" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Student Progress Reports
          </h1>
          
          {/* Role Selector */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Current Role:
            </label>
            <div className="flex gap-3">
              <button
                data-testid="onlyteacherscan-role-teacher"
                onClick={() => handleRoleChange('teacher')}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  currentRole === 'teacher'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Teacher
              </button>
              <button
                data-testid="onlyteacherscan-role-student"
                onClick={() => handleRoleChange('student')}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  currentRole === 'student'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Student
              </button>
              <button
                data-testid="onlyteacherscan-role-parent"
                onClick={() => handleRoleChange('parent')}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  currentRole === 'parent'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Parent
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        {!selectedStudent ? (
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Student List
            </h2>
            
            {currentRole !== 'teacher' && (
              <div
                data-testid="onlyteacherscan-access-denied"
                className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6"
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-6 w-6 text-red-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">
                      Access Restricted
                    </h3>
                    <p className="mt-2 text-sm text-red-700">
                      Only teachers can access individual student progress reports.
                      Please switch to a Teacher role to view detailed student information.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div data-testid="onlyteacherscan-list" className="grid gap-4">
              {MOCK_STUDENTS.map((student) => (
                <div
                  key={student.id}
                  data-testid="onlyteacherscan-item"
                  onClick={() => handleStudentSelect(student)}
                  className={`bg-white rounded-lg shadow-sm p-5 transition-all ${
                    currentRole === 'teacher'
                      ? 'cursor-pointer hover:shadow-md hover:border-blue-300 border border-transparent'
                      : 'opacity-60 cursor-not-allowed'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {student.name}
                      </h3>
                      <p className="text-sm text-gray-600">{student.grade}</p>
                    </div>
                    {currentRole === 'teacher' && (
                      <button
                        data-testid="onlyteacherscan-view-report"
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                      >
                        View Report
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <button
              data-testid="onlyteacherscan-back"
              onClick={handleBackToList}
              className="mb-6 flex items-center text-blue-600 hover:text-blue-800 font-medium"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Student List
            </button>

            <div
              data-testid="onlyteacherscan-report"
              className="bg-white rounded-lg shadow-md p-8"
            >
              <div className="border-b border-gray-200 pb-6 mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedStudent.name}
                </h2>
                <p className="text-gray-600 mt-1">{selectedStudent.grade}</p>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Academic Performance
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <p className="text-sm text-gray-600 mb-1">Mathematics</p>
                      <p className="text-3xl font-bold text-blue-600">
                        {selectedStudent.mathScore}%
                      </p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4">
                      <p className="text-sm text-gray-600 mb-1">Reading</p>
                      <p className="text-3xl font-bold text-green-600">
                        {selectedStudent.readingScore}%
                      </p>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4">
                      <p className="text-sm text-gray-600 mb-1">Science</p>
                      <p className="text-3xl font-bold text-purple-600">
                        {selectedStudent.scienceScore}%
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Engagement Metrics
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-yellow-50 rounded-lg p-4">
                      <p className="text-sm text-gray-600 mb-1">Attendance</p>
                      <p className="text-3xl font-bold text-yellow-600">
                        {selectedStudent.attendance}%
                      </p>
                    </div>
                    <div className="bg-indigo-50 rounded-lg p-4">
                      <p className="text-sm text-gray-600 mb-1">
                        Assignments Completed
                      </p>
                      <p className="text-3xl font-bold text-indigo-600">
                        {selectedStudent.assignments}/{selectedStudent.totalAssignments}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-800 mb-2">
                      Overall Assessment
                    </h4>
                    <p className="text-gray-700">
                      {selectedStudent.mathScore >= 90 &&
                      selectedStudent.readingScore >= 90 &&
                      selectedStudent.scienceScore >= 90
                        ? 'Excellent performance across all subjects. Student demonstrates strong comprehension and consistent effort.'
                        : selectedStudent.mathScore >= 80 &&
                          selectedStudent.readingScore >= 80 &&
                          selectedStudent.scienceScore >= 80
                        ? 'Good performance with room for growth. Student shows solid understanding of core concepts.'
                        : 'Student would benefit from additional support. Consider scheduling a parent-teacher conference to discuss improvement strategies.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
