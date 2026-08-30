/**
 * UserCanTrack — Dashboard for tracking student progress in maths learning
 *
 * Features: student list, progress metrics, completion tracking, topic performance, search filter
 *
 * Ticket: SCRUM-1255 | Branch: proto/SCRUM-1254
 */

import React, { useState } from 'react'

interface StudentProgress {
  id: number
  name: string
  email: string
  overallProgress: number
  assignmentsCompleted: number
  totalAssignments: number
  topicsCompleted: number
  totalTopics: number
  lastActive: string
  currentTopic: string
  score: number
}

const mockStudentData: StudentProgress[] = [
  {
    id: 1,
    name: 'Emma Wilson',
    email: 'emma.wilson@school.edu',
    overallProgress: 85,
    assignmentsCompleted: 17,
    totalAssignments: 20,
    topicsCompleted: 8,
    totalTopics: 10,
    lastActive: '2026-08-30',
    currentTopic: 'Quadratic Equations',
    score: 92
  },
  {
    id: 2,
    name: 'Liam Johnson',
    email: 'liam.johnson@school.edu',
    overallProgress: 62,
    assignmentsCompleted: 12,
    totalAssignments: 20,
    topicsCompleted: 5,
    totalTopics: 10,
    lastActive: '2026-08-29',
    currentTopic: 'Fractions & Decimals',
    score: 78
  },
  {
    id: 3,
    name: 'Olivia Brown',
    email: 'olivia.brown@school.edu',
    overallProgress: 95,
    assignmentsCompleted: 19,
    totalAssignments: 20,
    topicsCompleted: 10,
    totalTopics: 10,
    lastActive: '2026-08-30',
    currentTopic: 'Trigonometry',
    score: 97
  },
  {
    id: 4,
    name: 'Noah Davis',
    email: 'noah.davis@school.edu',
    overallProgress: 45,
    assignmentsCompleted: 9,
    totalAssignments: 20,
    topicsCompleted: 4,
    totalTopics: 10,
    lastActive: '2026-08-27',
    currentTopic: 'Basic Algebra',
    score: 68
  },
  {
    id: 5,
    name: 'Ava Martinez',
    email: 'ava.martinez@school.edu',
    overallProgress: 78,
    assignmentsCompleted: 15,
    totalAssignments: 20,
    topicsCompleted: 7,
    totalTopics: 10,
    lastActive: '2026-08-30',
    currentTopic: 'Geometry Basics',
    score: 85
  },
  {
    id: 6,
    name: 'Ethan Garcia',
    email: 'ethan.garcia@school.edu',
    overallProgress: 52,
    assignmentsCompleted: 10,
    totalAssignments: 20,
    topicsCompleted: 5,
    totalTopics: 10,
    lastActive: '2026-08-28',
    currentTopic: 'Percentages',
    score: 72
  }
]

export default function UserCanTrack() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStudent, setSelectedStudent] = useState<StudentProgress | null>(null)
  const [sortBy, setSortBy] = useState<'name' | 'progress' | 'score'>('name')

  const filteredStudents = mockStudentData
    .filter(student => 
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name)
        case 'progress':
          return b.overallProgress - a.overallProgress
        case 'score':
          return b.score - a.score
        default:
          return 0
      }
    })

  const getProgressColor = (progress: number): string => {
    if (progress >= 80) return 'bg-green-500'
    if (progress >= 60) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  const averageProgress = filteredStudents.length > 0
    ? Math.round(filteredStudents.reduce((sum, s) => sum + s.overallProgress, 0) / filteredStudents.length)
    : 0

  const averageScore = filteredStudents.length > 0
    ? Math.round(filteredStudents.reduce((sum, s) => sum + s.score, 0) / filteredStudents.length)
    : 0

  return (
    <div data-testid="usercantrack" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Student Progress Tracker</h1>
          <p className="text-gray-600">Monitor and track your students' learning journey</p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-1">Total Students</div>
            <div className="text-3xl font-bold text-gray-900">{filteredStudents.length}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-1">Average Progress</div>
            <div className="text-3xl font-bold text-blue-600">{averageProgress}%</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-1">Average Score</div>
            <div className="text-3xl font-bold text-green-600">{averageScore}%</div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                Search Students
              </label>
              <input
                id="search"
                type="text"
                data-testid="usercantrack-search"
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-2">
                Sort By
              </label>
              <select
                id="sort"
                data-testid="usercantrack-sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'name' | 'progress' | 'score')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="name">Name (A-Z)</option>
                <option value="progress">Progress (High to Low)</option>
                <option value="score">Score (High to Low)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Student List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Students ({filteredStudents.length})</h2>
          </div>
          <ul data-testid="usercantrack-list" className="divide-y divide-gray-200">
            {filteredStudents.map((student) => (
              <li
                key={student.id}
                data-testid="usercantrack-item"
                className="p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 mr-3">{student.name}</h3>
                      <span className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                        Score: {student.score}%
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{student.email}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                      <div>
                        <div className="text-xs text-gray-500">Overall Progress</div>
                        <div className="text-sm font-semibold text-gray-900">{student.overallProgress}%</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Assignments</div>
                        <div className="text-sm font-semibold text-gray-900">
                          {student.assignmentsCompleted}/{student.totalAssignments}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Topics</div>
                        <div className="text-sm font-semibold text-gray-900">
                          {student.topicsCompleted}/{student.totalTopics}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Last Active</div>
                        <div className="text-sm font-semibold text-gray-900">{student.lastActive}</div>
                      </div>
                    </div>

                    <div className="mb-3">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-gray-500">Progress</span>
                        <span className="text-xs font-medium text-gray-900">{student.overallProgress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`${getProgressColor(student.overallProgress)} h-2 rounded-full transition-all`}
                          style={{ width: `${student.overallProgress}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex items-center text-sm text-gray-600">
                      <span className="font-medium">Current Topic:</span>
                      <span className="ml-2">{student.currentTopic}</span>
                    </div>
                  </div>

                  <button
                    data-testid="usercantrack-view-details"
                    onClick={() => setSelectedStudent(student)}
                    className="ml-4 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </li>
            ))}
          </ul>
          
          {filteredStudents.length === 0 && (
            <div className="p-12 text-center text-gray-500">
              No students found matching your search.
            </div>
          )}
        </div>

        {/* Student Detail Modal */}
        {selectedStudent && (
          <div 
            data-testid="usercantrack-modal"
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedStudent(null)}
          >
            <div 
              className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">{selectedStudent.name}</h2>
                  <p className="text-gray-600">{selectedStudent.email}</p>
                </div>
                <button
                  data-testid="usercantrack-close-modal"
                  onClick={() => setSelectedStudent(null)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Performance Overview</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-2xl font-bold text-gray-900">{selectedStudent.overallProgress}%</div>
                      <div className="text-sm text-gray-600">Overall Progress</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-2xl font-bold text-green-600">{selectedStudent.score}%</div>
                      <div className="text-sm text-gray-600">Average Score</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Completion Metrics</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Assignments</span>
                        <span className="font-medium text-gray-900">
                          {selectedStudent.assignmentsCompleted} of {selectedStudent.totalAssignments}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${(selectedStudent.assignmentsCompleted / selectedStudent.totalAssignments) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Topics Mastered</span>
                        <span className="font-medium text-gray-900">
                          {selectedStudent.topicsCompleted} of {selectedStudent.totalTopics}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${(selectedStudent.topicsCompleted / selectedStudent.totalTopics) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Current Focus</h3>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="text-lg font-semibold text-blue-900">{selectedStudent.currentTopic}</div>
                    <div className="text-sm text-blue-700 mt-1">Last active: {selectedStudent.lastActive}</div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  data-testid="usercantrack-close"
                  onClick={() => setSelectedStudent(null)}
                  className="px-6 py-2 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
