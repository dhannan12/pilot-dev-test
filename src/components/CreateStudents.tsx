/**
 * CreateStudents — Database schema visualization and management for students and parents tables
 *
 * Features: student records management, parent relationships, database schema display, relationship mapping, CRUD operations
 *
 * Ticket: SCRUM-1075 | Branch: proto/SCRUM-1070
 */

import { useState } from 'react'

interface Parent {
  id: number
  firstName: string
  lastName: string
  email: string
  phone: string
}

interface Student {
  id: number
  firstName: string
  lastName: string
  grade: number
  parentIds: number[]
}

const mockParents: Parent[] = [
  { id: 1, firstName: 'John', lastName: 'Smith', email: 'john.smith@email.com', phone: '555-0101' },
  { id: 2, firstName: 'Mary', lastName: 'Smith', email: 'mary.smith@email.com', phone: '555-0102' },
  { id: 3, firstName: 'Robert', lastName: 'Johnson', email: 'robert.johnson@email.com', phone: '555-0103' },
  { id: 4, firstName: 'Patricia', lastName: 'Williams', email: 'patricia.williams@email.com', phone: '555-0104' },
  { id: 5, firstName: 'Michael', lastName: 'Brown', email: 'michael.brown@email.com', phone: '555-0105' },
  { id: 6, firstName: 'Linda', lastName: 'Brown', email: 'linda.brown@email.com', phone: '555-0106' },
  { id: 7, firstName: 'David', lastName: 'Davis', email: 'david.davis@email.com', phone: '555-0107' },
]

const mockStudents: Student[] = [
  { id: 1, firstName: 'Emma', lastName: 'Smith', grade: 5, parentIds: [1, 2] },
  { id: 2, firstName: 'Oliver', lastName: 'Smith', grade: 3, parentIds: [1, 2] },
  { id: 3, firstName: 'Sophia', lastName: 'Johnson', grade: 7, parentIds: [3] },
  { id: 4, firstName: 'Liam', lastName: 'Williams', grade: 6, parentIds: [4] },
  { id: 5, firstName: 'Ava', lastName: 'Brown', grade: 4, parentIds: [5, 6] },
  { id: 6, firstName: 'Noah', lastName: 'Davis', grade: 8, parentIds: [7] },
]

export default function CreateStudents() {
  const [activeTab, setActiveTab] = useState<'students' | 'parents' | 'relationships'>('students')
  const [students, setStudents] = useState<Student[]>(mockStudents)
  const [parents, setParents] = useState<Parent[]>(mockParents)
  const [selectedStudentId, setSelectedStudentId] = useState<number | null>(null)

  const getParentsByIds = (parentIds: number[]): Parent[] => {
    return parents.filter(p => parentIds.includes(p.id))
  }

  const getStudentsByParentId = (parentId: number): Student[] => {
    return students.filter(s => s.parentIds.includes(parentId))
  }

  return (
    <div data-testid="createstudents" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Students & Parents Database
          </h1>
          <p className="text-gray-600">
            Manage student records and parent relationships
          </p>
        </div>

        {/* Database Schema Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h2 className="text-lg font-semibold text-blue-900 mb-2">Database Schema</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white rounded p-3 border border-blue-300">
              <h3 className="font-semibold text-blue-800 mb-2">Students Table</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• id (Primary Key)</li>
                <li>• firstName</li>
                <li>• lastName</li>
                <li>• grade</li>
                <li>• parentIds (Foreign Keys → Parents)</li>
              </ul>
            </div>
            <div className="bg-white rounded p-3 border border-blue-300">
              <h3 className="font-semibold text-blue-800 mb-2">Parents Table</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• id (Primary Key)</li>
                <li>• firstName</li>
                <li>• lastName</li>
                <li>• email</li>
                <li>• phone</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-4 px-6" aria-label="Tabs">
              <button
                data-testid="createstudents-tab-students"
                onClick={() => setActiveTab('students')}
                className={`py-4 px-3 font-medium text-sm border-b-2 transition-colors ${
                  activeTab === 'students'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Students ({students.length})
              </button>
              <button
                data-testid="createstudents-tab-parents"
                onClick={() => setActiveTab('parents')}
                className={`py-4 px-3 font-medium text-sm border-b-2 transition-colors ${
                  activeTab === 'parents'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Parents ({parents.length})
              </button>
              <button
                data-testid="createstudents-tab-relationships"
                onClick={() => setActiveTab('relationships')}
                className={`py-4 px-3 font-medium text-sm border-b-2 transition-colors ${
                  activeTab === 'relationships'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Relationships
              </button>
            </nav>
          </div>

          {/* Students Tab */}
          {activeTab === 'students' && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Student Records</h2>
                <button
                  data-testid="createstudents-add-student"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add Student
                </button>
              </div>
              <div data-testid="createstudents-list" className="space-y-3">
                {students.map((student) => (
                  <div
                    key={student.id}
                    data-testid="createstudents-item"
                    className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-blue-300 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">
                          {student.firstName} {student.lastName}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          Grade {student.grade} • Student ID: {student.id}
                        </p>
                        <div className="mt-2">
                          <span className="text-sm font-medium text-gray-700">Parents: </span>
                          <span className="text-sm text-gray-600">
                            {getParentsByIds(student.parentIds)
                              .map((p) => `${p.firstName} ${p.lastName}`)
                              .join(', ')}
                          </span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          data-testid="createstudents-edit"
                          className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          data-testid="createstudents-delete"
                          className="px-3 py-1 text-sm bg-white border border-red-300 text-red-600 rounded hover:bg-red-50 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Parents Tab */}
          {activeTab === 'parents' && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Parent Records</h2>
                <button
                  data-testid="createstudents-add-parent"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add Parent
                </button>
              </div>
              <div data-testid="createstudents-parents-list" className="space-y-3">
                {parents.map((parent) => (
                  <div
                    key={parent.id}
                    data-testid="createstudents-parent-item"
                    className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-blue-300 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">
                          {parent.firstName} {parent.lastName}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          Parent ID: {parent.id}
                        </p>
                        <div className="mt-2 space-y-1">
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Email:</span> {parent.email}
                          </p>
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Phone:</span> {parent.phone}
                          </p>
                        </div>
                        <div className="mt-2">
                          <span className="text-sm font-medium text-gray-700">Children: </span>
                          <span className="text-sm text-gray-600">
                            {getStudentsByParentId(parent.id)
                              .map((s) => `${s.firstName} ${s.lastName}`)
                              .join(', ') || 'None'}
                          </span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          data-testid="createstudents-edit-parent"
                          className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          data-testid="createstudents-delete-parent"
                          className="px-3 py-1 text-sm bg-white border border-red-300 text-red-600 rounded hover:bg-red-50 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Relationships Tab */}
          {activeTab === 'relationships' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Parent-Student Relationships</h2>
              <div className="space-y-4">
                {students.map((student) => {
                  const studentParents = getParentsByIds(student.parentIds)
                  return (
                    <div
                      key={student.id}
                      data-testid="createstudents-relationship-item"
                      className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="flex-1">
                          <div className="bg-blue-100 rounded-lg p-3 mb-3">
                            <h3 className="font-semibold text-blue-900">
                              Student: {student.firstName} {student.lastName}
                            </h3>
                            <p className="text-sm text-blue-700">Grade {student.grade}</p>
                          </div>
                          <div className="pl-4 border-l-2 border-blue-300">
                            <p className="text-sm font-medium text-gray-700 mb-2">
                              Connected Parents ({studentParents.length}):
                            </p>
                            <div className="space-y-2">
                              {studentParents.map((parent) => (
                                <div
                                  key={parent.id}
                                  className="bg-green-50 rounded p-2 border border-green-200"
                                >
                                  <p className="font-medium text-green-900 text-sm">
                                    {parent.firstName} {parent.lastName}
                                  </p>
                                  <p className="text-xs text-green-700">{parent.email}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        <button
                          data-testid="createstudents-manage-relationships"
                          className="px-3 py-2 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                        >
                          Manage
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        {/* Statistics Footer */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="font-semibold text-gray-900 mb-3">Database Statistics</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-blue-600">{students.length}</p>
              <p className="text-sm text-gray-600 mt-1">Total Students</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-green-600">{parents.length}</p>
              <p className="text-sm text-gray-600 mt-1">Total Parents</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-purple-600">
                {students.reduce((acc, s) => acc + s.parentIds.length, 0)}
              </p>
              <p className="text-sm text-gray-600 mt-1">Total Relationships</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
