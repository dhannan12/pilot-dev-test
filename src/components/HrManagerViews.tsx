/**
 * HrManagerViews — HR Manager dashboard to view and track new employee onboarding progress
 *
 * Features: employee list, progress tracking, task completion status, timeline visualization, filtering
 *
 * Ticket: SCRUM-887 | Branch: proto/SCRUM-879
 */

import { useState } from 'react'

interface OnboardingTask {
  id: string
  name: string
  completed: boolean
  dueDate: string
}

interface Employee {
  id: string
  name: string
  position: string
  department: string
  startDate: string
  overallProgress: number
  tasks: OnboardingTask[]
  status: 'on-track' | 'at-risk' | 'delayed'
}

const MOCK_EMPLOYEES: Employee[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    position: 'Senior Software Engineer',
    department: 'Engineering',
    startDate: '2026-08-01',
    overallProgress: 85,
    status: 'on-track',
    tasks: [
      { id: 't1', name: 'Complete HR paperwork', completed: true, dueDate: '2026-08-02' },
      { id: 't2', name: 'Setup workstation', completed: true, dueDate: '2026-08-01' },
      { id: 't3', name: 'Security training', completed: true, dueDate: '2026-08-05' },
      { id: 't4', name: 'Team introductions', completed: true, dueDate: '2026-08-03' },
      { id: 't5', name: 'Complete first project', completed: false, dueDate: '2026-08-20' },
    ],
  },
  {
    id: '2',
    name: 'Michael Chen',
    position: 'Product Manager',
    department: 'Product',
    startDate: '2026-08-05',
    overallProgress: 60,
    status: 'on-track',
    tasks: [
      { id: 't6', name: 'Complete HR paperwork', completed: true, dueDate: '2026-08-06' },
      { id: 't7', name: 'Setup workstation', completed: true, dueDate: '2026-08-05' },
      { id: 't8', name: 'Product training', completed: true, dueDate: '2026-08-10' },
      { id: 't9', name: 'Meet stakeholders', completed: false, dueDate: '2026-08-15' },
      { id: 't10', name: 'Shadow senior PM', completed: false, dueDate: '2026-08-18' },
    ],
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    position: 'UX Designer',
    department: 'Design',
    startDate: '2026-07-28',
    overallProgress: 40,
    status: 'at-risk',
    tasks: [
      { id: 't11', name: 'Complete HR paperwork', completed: true, dueDate: '2026-07-29' },
      { id: 't12', name: 'Setup workstation', completed: true, dueDate: '2026-07-28' },
      { id: 't13', name: 'Design tools training', completed: false, dueDate: '2026-08-05' },
      { id: 't14', name: 'Review design system', completed: false, dueDate: '2026-08-08' },
      { id: 't15', name: 'First design review', completed: false, dueDate: '2026-08-12' },
    ],
  },
  {
    id: '4',
    name: 'David Park',
    position: 'Data Analyst',
    department: 'Analytics',
    startDate: '2026-08-10',
    overallProgress: 95,
    status: 'on-track',
    tasks: [
      { id: 't16', name: 'Complete HR paperwork', completed: true, dueDate: '2026-08-11' },
      { id: 't17', name: 'Setup workstation', completed: true, dueDate: '2026-08-10' },
      { id: 't18', name: 'Database access setup', completed: true, dueDate: '2026-08-11' },
      { id: 't19', name: 'Analytics tools training', completed: true, dueDate: '2026-08-13' },
      { id: 't20', name: 'First analysis project', completed: true, dueDate: '2026-08-15' },
    ],
  },
  {
    id: '5',
    name: 'Jessica Martinez',
    position: 'Marketing Specialist',
    department: 'Marketing',
    startDate: '2026-07-25',
    overallProgress: 30,
    status: 'delayed',
    tasks: [
      { id: 't21', name: 'Complete HR paperwork', completed: true, dueDate: '2026-07-26' },
      { id: 't22', name: 'Setup workstation', completed: false, dueDate: '2026-07-25' },
      { id: 't23', name: 'Brand guidelines review', completed: false, dueDate: '2026-08-01' },
      { id: 't24', name: 'Marketing tools training', completed: false, dueDate: '2026-08-05' },
      { id: 't25', name: 'Campaign planning session', completed: true, dueDate: '2026-08-08' },
    ],
  },
  {
    id: '6',
    name: 'Robert Kim',
    position: 'DevOps Engineer',
    department: 'Engineering',
    startDate: '2026-08-12',
    overallProgress: 75,
    status: 'on-track',
    tasks: [
      { id: 't26', name: 'Complete HR paperwork', completed: true, dueDate: '2026-08-13' },
      { id: 't27', name: 'Setup workstation', completed: true, dueDate: '2026-08-12' },
      { id: 't28', name: 'Infrastructure access', completed: true, dueDate: '2026-08-13' },
      { id: 't29', name: 'CI/CD pipeline training', completed: true, dueDate: '2026-08-15' },
      { id: 't30', name: 'Deploy first service', completed: false, dueDate: '2026-08-20' },
    ],
  },
]

export default function HrManagerViews() {
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>('all')

  const filteredEmployees = MOCK_EMPLOYEES.filter((emp) => {
    if (filterStatus === 'all') return true
    return emp.status === filterStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-track':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'at-risk':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'delayed':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500'
    if (progress >= 50) return 'bg-blue-500'
    if (progress >= 30) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  return (
    <div data-testid="hrmanagerviews" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Employee Onboarding Dashboard
          </h1>
          <p className="text-gray-600">
            Track and monitor new employee onboarding progress
          </p>
        </div>

        {/* Filter Controls */}
        <div className="mb-6 bg-white rounded-lg shadow p-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Status
          </label>
          <select
            data-testid="hrmanagerviews-filter"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Employees</option>
            <option value="on-track">On Track</option>
            <option value="at-risk">At Risk</option>
            <option value="delayed">Delayed</option>
          </select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Employee List */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                New Employees ({filteredEmployees.length})
              </h2>
            </div>
            <div data-testid="hrmanagerviews-list" className="divide-y divide-gray-200">
              {filteredEmployees.map((employee) => (
                <div
                  key={employee.id}
                  data-testid="hrmanagerviews-item"
                  onClick={() => setSelectedEmployee(employee)}
                  className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedEmployee?.id === employee.id ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {employee.name}
                      </h3>
                      <p className="text-sm text-gray-600">{employee.position}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {employee.department} • Started {employee.startDate}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                        employee.status
                      )}`}
                    >
                      {employee.status.replace('-', ' ')}
                    </span>
                  </div>
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-semibold text-gray-900">
                        {employee.overallProgress}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${getProgressColor(
                          employee.overallProgress
                        )}`}
                        style={{ width: `${employee.overallProgress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Employee Detail View */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                Employee Details
              </h2>
            </div>
            {selectedEmployee ? (
              <div className="p-6">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {selectedEmployee.name}
                  </h3>
                  <p className="text-gray-600 mb-1">{selectedEmployee.position}</p>
                  <p className="text-sm text-gray-500">
                    {selectedEmployee.department} Department
                  </p>
                  <div className="mt-4 flex items-center gap-4">
                    <div>
                      <p className="text-xs text-gray-500">Start Date</p>
                      <p className="text-sm font-medium text-gray-900">
                        {selectedEmployee.startDate}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Status</p>
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                          selectedEmployee.status
                        )}`}
                      >
                        {selectedEmployee.status.replace('-', ' ')}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">
                      Overall Progress
                    </h4>
                    <span className="text-2xl font-bold text-gray-900">
                      {selectedEmployee.overallProgress}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full ${getProgressColor(
                        selectedEmployee.overallProgress
                      )}`}
                      style={{ width: `${selectedEmployee.overallProgress}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">
                    Onboarding Tasks (
                    {selectedEmployee.tasks.filter((t) => t.completed).length}/
                    {selectedEmployee.tasks.length})
                  </h4>
                  <div data-testid="hrmanagerviews-tasks" className="space-y-3">
                    {selectedEmployee.tasks.map((task) => (
                      <div
                        key={task.id}
                        data-testid="hrmanagerviews-task-item"
                        className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="mt-1">
                          {task.completed ? (
                            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                              <svg
                                className="w-3 h-3 text-white"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path d="M5 13l4 4L19 7"></path>
                              </svg>
                            </div>
                          ) : (
                            <div className="w-5 h-5 border-2 border-gray-300 rounded-full"></div>
                          )}
                        </div>
                        <div className="flex-1">
                          <p
                            className={`font-medium ${
                              task.completed
                                ? 'text-gray-500 line-through'
                                : 'text-gray-900'
                            }`}
                          >
                            {task.name}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            Due: {task.dueDate}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex gap-3">
                  <button
                    data-testid="hrmanagerviews-send-reminder"
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Send Reminder
                  </button>
                  <button
                    data-testid="hrmanagerviews-view-report"
                    className="flex-1 px-4 py-2 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                  >
                    View Full Report
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-6 text-center text-gray-500">
                <svg
                  className="w-16 h-16 mx-auto mb-4 text-gray-300"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
                <p className="text-lg font-medium">Select an employee</p>
                <p className="text-sm mt-1">
                  Click on an employee from the list to view their onboarding progress
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
