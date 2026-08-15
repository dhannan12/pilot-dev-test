/**
 * DepartmentManagerApproves — Department Manager approves training completion for new employees
 *
 * Features: employee list, training status, approval workflow, completion tracking, manager actions
 *
 * Ticket: SCRUM-881 | Branch: proto/SCRUM-879
 */

import React, { useState } from 'react'

interface Employee {
  id: number
  name: string
  position: string
  department: string
  hireDate: string
  trainingModules: TrainingModule[]
  overallStatus: 'pending' | 'approved' | 'rejected'
}

interface TrainingModule {
  id: number
  moduleName: string
  completed: boolean
  completionDate?: string
  score?: number
}

const MOCK_EMPLOYEES: Employee[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    position: 'Software Engineer',
    department: 'Engineering',
    hireDate: '2026-08-01',
    overallStatus: 'pending',
    trainingModules: [
      { id: 1, moduleName: 'Company Policies', completed: true, completionDate: '2026-08-05', score: 95 },
      { id: 2, moduleName: 'Security Protocols', completed: true, completionDate: '2026-08-07', score: 88 },
      { id: 3, moduleName: 'Engineering Best Practices', completed: true, completionDate: '2026-08-10', score: 92 },
      { id: 4, moduleName: 'Code Review Guidelines', completed: true, completionDate: '2026-08-12', score: 90 },
    ],
  },
  {
    id: 2,
    name: 'Michael Chen',
    position: 'Product Designer',
    department: 'Design',
    hireDate: '2026-08-03',
    overallStatus: 'pending',
    trainingModules: [
      { id: 1, moduleName: 'Company Policies', completed: true, completionDate: '2026-08-06', score: 100 },
      { id: 2, moduleName: 'Security Protocols', completed: true, completionDate: '2026-08-08', score: 85 },
      { id: 3, moduleName: 'Design System Overview', completed: true, completionDate: '2026-08-11', score: 94 },
      { id: 4, moduleName: 'User Research Methods', completed: true, completionDate: '2026-08-13', score: 89 },
    ],
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    position: 'Marketing Specialist',
    department: 'Marketing',
    hireDate: '2026-08-05',
    overallStatus: 'pending',
    trainingModules: [
      { id: 1, moduleName: 'Company Policies', completed: true, completionDate: '2026-08-08', score: 92 },
      { id: 2, moduleName: 'Security Protocols', completed: true, completionDate: '2026-08-10', score: 90 },
      { id: 3, moduleName: 'Brand Guidelines', completed: true, completionDate: '2026-08-12', score: 96 },
      { id: 4, moduleName: 'Marketing Tools Training', completed: true, completionDate: '2026-08-14', score: 88 },
    ],
  },
  {
    id: 4,
    name: 'David Kim',
    position: 'Data Analyst',
    department: 'Analytics',
    hireDate: '2026-08-07',
    overallStatus: 'approved',
    trainingModules: [
      { id: 1, moduleName: 'Company Policies', completed: true, completionDate: '2026-08-09', score: 98 },
      { id: 2, moduleName: 'Security Protocols', completed: true, completionDate: '2026-08-11', score: 93 },
      { id: 3, moduleName: 'Data Privacy & Compliance', completed: true, completionDate: '2026-08-13', score: 97 },
      { id: 4, moduleName: 'Analytics Platform Overview', completed: true, completionDate: '2026-08-14', score: 91 },
    ],
  },
  {
    id: 5,
    name: 'Jessica Martinez',
    position: 'Customer Success Manager',
    department: 'Customer Support',
    hireDate: '2026-08-09',
    overallStatus: 'pending',
    trainingModules: [
      { id: 1, moduleName: 'Company Policies', completed: true, completionDate: '2026-08-11', score: 87 },
      { id: 2, moduleName: 'Security Protocols', completed: true, completionDate: '2026-08-13', score: 91 },
      { id: 3, moduleName: 'Customer Support Systems', completed: true, completionDate: '2026-08-14', score: 93 },
      { id: 4, moduleName: 'Conflict Resolution', completed: true, completionDate: '2026-08-15', score: 89 },
    ],
  },
]

export default function DepartmentManagerApproves() {
  const [employees, setEmployees] = useState<Employee[]>(MOCK_EMPLOYEES)
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [comments, setComments] = useState<string>('')

  const handleApprove = (employeeId: number) => {
    setEmployees(prev =>
      prev.map(emp =>
        emp.id === employeeId ? { ...emp, overallStatus: 'approved' } : emp
      )
    )
    setSelectedEmployee(null)
    setComments('')
  }

  const handleReject = (employeeId: number) => {
    if (!comments.trim()) {
      alert('Please provide comments for rejection')
      return
    }
    setEmployees(prev =>
      prev.map(emp =>
        emp.id === employeeId ? { ...emp, overallStatus: 'rejected' } : emp
      )
    )
    setSelectedEmployee(null)
    setComments('')
  }

  const filteredEmployees = employees.filter(emp => {
    if (filterStatus === 'all') return true
    return emp.overallStatus === filterStatus
  })

  const calculateCompletionRate = (modules: TrainingModule[]) => {
    if (modules.length === 0) return 0
    const completed = modules.filter(m => m.completed).length
    return Math.round((completed / modules.length) * 100)
  }

  const calculateAverageScore = (modules: TrainingModule[]) => {
    const modulesWithScores = modules.filter(m => m.score !== undefined)
    if (modulesWithScores.length === 0) return 0
    const sum = modulesWithScores.reduce((acc, m) => acc + (m.score || 0), 0)
    return Math.round(sum / modulesWithScores.length)
  }

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div data-testid="departmentmanagerapproves" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Training Approval Dashboard
          </h1>
          <p className="text-gray-600">
            Review and approve new employee training completion
          </p>
        </header>

        {/* Filter Controls */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Status
          </label>
          <select
            id="status-filter"
            data-testid="departmentmanagerapproves-status-filter"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Employees</option>
            <option value="pending">Pending Approval</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        {/* Employee List */}
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">Employees ({filteredEmployees.length})</h2>
            <div data-testid="departmentmanagerapproves-list" className="space-y-3">
              {filteredEmployees.map(employee => (
                <div
                  key={employee.id}
                  data-testid="departmentmanagerapproves-item"
                  onClick={() => setSelectedEmployee(employee)}
                  className={`bg-white rounded-lg shadow-sm p-4 cursor-pointer transition-all hover:shadow-md ${
                    selectedEmployee?.id === employee.id ? 'ring-2 ring-blue-500' : ''
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">{employee.name}</h3>
                      <p className="text-sm text-gray-600">{employee.position}</p>
                      <p className="text-xs text-gray-500">{employee.department}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(
                        employee.overallStatus
                      )}`}
                    >
                      {employee.overallStatus.charAt(0).toUpperCase() + employee.overallStatus.slice(1)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                    <div className="text-sm">
                      <span className="text-gray-600">Completion: </span>
                      <span className="font-medium text-gray-900">
                        {calculateCompletionRate(employee.trainingModules)}%
                      </span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Avg Score: </span>
                      <span className="font-medium text-gray-900">
                        {calculateAverageScore(employee.trainingModules)}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Hired: {employee.hireDate}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Employee Details & Approval Panel */}
          <div className="lg:sticky lg:top-6 h-fit">
            {selectedEmployee ? (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">
                    {selectedEmployee.name}
                  </h2>
                  <p className="text-gray-600">{selectedEmployee.position}</p>
                  <p className="text-sm text-gray-500">{selectedEmployee.department}</p>
                </div>

                {/* Training Modules */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Training Modules
                  </h3>
                  <div className="space-y-2">
                    {selectedEmployee.trainingModules.map(module => (
                      <div
                        key={module.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{module.moduleName}</p>
                          {module.completionDate && (
                            <p className="text-xs text-gray-500">
                              Completed: {module.completionDate}
                            </p>
                          )}
                        </div>
                        <div className="text-right">
                          {module.completed && (
                            <>
                              <span className="text-green-600 font-medium">✓</span>
                              {module.score && (
                                <p className="text-sm text-gray-700 font-medium">
                                  Score: {module.score}
                                </p>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Summary Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-blue-50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600">Completion Rate</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {calculateCompletionRate(selectedEmployee.trainingModules)}%
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Average Score</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {calculateAverageScore(selectedEmployee.trainingModules)}
                    </p>
                  </div>
                </div>

                {/* Comments */}
                {selectedEmployee.overallStatus === 'pending' && (
                  <div className="mb-6">
                    <label
                      htmlFor="approval-comments"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Comments (Optional for approval, required for rejection)
                    </label>
                    <textarea
                      id="approval-comments"
                      data-testid="departmentmanagerapproves-comments"
                      value={comments}
                      onChange={(e) => setComments(e.target.value)}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Add your comments here..."
                    />
                  </div>
                )}

                {/* Action Buttons */}
                {selectedEmployee.overallStatus === 'pending' ? (
                  <div className="flex gap-3">
                    <button
                      data-testid="departmentmanagerapproves-approve"
                      onClick={() => handleApprove(selectedEmployee.id)}
                      className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
                    >
                      Approve Training
                    </button>
                    <button
                      data-testid="departmentmanagerapproves-reject"
                      onClick={() => handleReject(selectedEmployee.id)}
                      className="flex-1 bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors"
                    >
                      Reject
                    </button>
                  </div>
                ) : (
                  <div className="text-center p-4 bg-gray-100 rounded-lg">
                    <p className="text-gray-700 font-medium">
                      Status:{' '}
                      <span
                        className={`${
                          selectedEmployee.overallStatus === 'approved'
                            ? 'text-green-600'
                            : 'text-red-600'
                        }`}
                      >
                        {selectedEmployee.overallStatus.charAt(0).toUpperCase() +
                          selectedEmployee.overallStatus.slice(1)}
                      </span>
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <div className="text-gray-400 mb-4">
                  <svg
                    className="mx-auto h-16 w-16"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <p className="text-gray-600">Select an employee to review their training details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
