/**
 * SystemCalculatesProgress — Displays employee onboarding progress with real-time percentage calculation
 *
 * Features: progress tracking, task completion status, percentage calculation, visual progress bars, multiple employee views
 *
 * Ticket: SCRUM-884 | Branch: proto/SCRUM-879
 */

import React, { useState } from 'react'

interface OnboardingTask {
  id: string
  title: string
  completed: boolean
}

interface Employee {
  id: string
  name: string
  department: string
  startDate: string
  tasks: OnboardingTask[]
}

const MOCK_EMPLOYEES: Employee[] = [
  {
    id: 'emp-001',
    name: 'Alice Johnson',
    department: 'Engineering',
    startDate: '2026-08-01',
    tasks: [
      { id: 'task-001', title: 'Complete HR paperwork', completed: true },
      { id: 'task-002', title: 'Setup workstation', completed: true },
      { id: 'task-003', title: 'IT security training', completed: true },
      { id: 'task-004', title: 'Meet team members', completed: false },
      { id: 'task-005', title: 'Review company handbook', completed: false },
    ],
  },
  {
    id: 'emp-002',
    name: 'Bob Smith',
    department: 'Marketing',
    startDate: '2026-08-05',
    tasks: [
      { id: 'task-006', title: 'Complete HR paperwork', completed: true },
      { id: 'task-007', title: 'Setup workstation', completed: true },
      { id: 'task-008', title: 'IT security training', completed: false },
      { id: 'task-009', title: 'Meet team members', completed: false },
      { id: 'task-010', title: 'Review company handbook', completed: false },
    ],
  },
  {
    id: 'emp-003',
    name: 'Carol Davis',
    department: 'Sales',
    startDate: '2026-08-10',
    tasks: [
      { id: 'task-011', title: 'Complete HR paperwork', completed: true },
      { id: 'task-012', title: 'Setup workstation', completed: false },
      { id: 'task-013', title: 'IT security training', completed: false },
      { id: 'task-014', title: 'Meet team members', completed: false },
      { id: 'task-015', title: 'Review company handbook', completed: false },
    ],
  },
  {
    id: 'emp-004',
    name: 'David Wilson',
    department: 'Finance',
    startDate: '2026-08-12',
    tasks: [
      { id: 'task-016', title: 'Complete HR paperwork', completed: true },
      { id: 'task-017', title: 'Setup workstation', completed: true },
      { id: 'task-018', title: 'IT security training', completed: true },
      { id: 'task-019', title: 'Meet team members', completed: true },
      { id: 'task-020', title: 'Review company handbook', completed: true },
    ],
  },
  {
    id: 'emp-005',
    name: 'Emma Martinez',
    department: 'Operations',
    startDate: '2026-08-14',
    tasks: [
      { id: 'task-021', title: 'Complete HR paperwork', completed: false },
      { id: 'task-022', title: 'Setup workstation', completed: false },
      { id: 'task-023', title: 'IT security training', completed: false },
      { id: 'task-024', title: 'Meet team members', completed: false },
      { id: 'task-025', title: 'Review company handbook', completed: false },
    ],
  },
]

export default function SystemCalculatesProgress() {
  const [employees, setEmployees] = useState<Employee[]>(MOCK_EMPLOYEES)
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>(MOCK_EMPLOYEES[0].id)

  const calculateProgress = (tasks: OnboardingTask[]): number => {
    if (tasks.length === 0) return 0
    const completedTasks = tasks.filter((task) => task.completed).length
    return Math.round((completedTasks / tasks.length) * 100)
  }

  const toggleTaskCompletion = (employeeId: string, taskId: string) => {
    setEmployees((prevEmployees) =>
      prevEmployees.map((employee) => {
        if (employee.id === employeeId) {
          return {
            ...employee,
            tasks: employee.tasks.map((task) =>
              task.id === taskId ? { ...task, completed: !task.completed } : task
            ),
          }
        }
        return employee
      })
    )
  }

  const selectedEmployee = employees.find((emp) => emp.id === selectedEmployeeId)

  return (
    <div data-testid="systemcalculatesprogress" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Employee Onboarding Progress</h1>
          <p className="text-gray-600">Track and manage onboarding task completion</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Employee List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">New Employees</h2>
              <div data-testid="systemcalculatesprogress-list" className="space-y-3">
                {employees.map((employee) => {
                  const progress = calculateProgress(employee.tasks)
                  const isSelected = employee.id === selectedEmployeeId

                  return (
                    <div
                      key={employee.id}
                      data-testid="systemcalculatesprogress-item"
                      onClick={() => setSelectedEmployeeId(employee.id)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        isSelected
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <div className="mb-2">
                        <h3 className="font-semibold text-gray-900">{employee.name}</h3>
                        <p className="text-sm text-gray-600">{employee.department}</p>
                      </div>
                      <div className="mb-2">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs text-gray-500">Progress</span>
                          <span className="text-sm font-semibold text-gray-900">{progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all ${
                              progress === 100
                                ? 'bg-green-500'
                                : progress >= 50
                                ? 'bg-blue-500'
                                : 'bg-yellow-500'
                            }`}
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500">Start: {employee.startDate}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Task Details */}
          <div className="lg:col-span-2">
            {selectedEmployee && (
              <div className="bg-white rounded-lg shadow p-6">
                <div className="mb-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        {selectedEmployee.name}
                      </h2>
                      <p className="text-gray-600">{selectedEmployee.department}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        Start Date: {selectedEmployee.startDate}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-4xl font-bold text-blue-600">
                        {calculateProgress(selectedEmployee.tasks)}%
                      </div>
                      <div className="text-sm text-gray-600">Complete</div>
                    </div>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
                    <div
                      className={`h-4 rounded-full transition-all ${
                        calculateProgress(selectedEmployee.tasks) === 100
                          ? 'bg-green-500'
                          : calculateProgress(selectedEmployee.tasks) >= 50
                          ? 'bg-blue-500'
                          : 'bg-yellow-500'
                      }`}
                      style={{ width: `${calculateProgress(selectedEmployee.tasks)}%` }}
                    ></div>
                  </div>

                  <div className="flex justify-between text-sm text-gray-600">
                    <span>
                      {selectedEmployee.tasks.filter((t) => t.completed).length} of{' '}
                      {selectedEmployee.tasks.length} tasks completed
                    </span>
                    <span>
                      {selectedEmployee.tasks.filter((t) => !t.completed).length} remaining
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Onboarding Tasks</h3>
                  <div className="space-y-3">
                    {selectedEmployee.tasks.map((task) => (
                      <div
                        key={task.id}
                        data-testid="systemcalculatesprogress-task"
                        className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-all ${
                          task.completed
                            ? 'border-green-200 bg-green-50'
                            : 'border-gray-200 bg-white'
                        }`}
                      >
                        <input
                          type="checkbox"
                          data-testid="systemcalculatesprogress-checkbox"
                          checked={task.completed}
                          onChange={() => toggleTaskCompletion(selectedEmployee.id, task.id)}
                          className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                        />
                        <span
                          className={`flex-1 ${
                            task.completed
                              ? 'text-gray-500 line-through'
                              : 'text-gray-900 font-medium'
                          }`}
                        >
                          {task.title}
                        </span>
                        {task.completed && (
                          <span className="px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full">
                            Complete
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <button
                    data-testid="systemcalculatesprogress-refresh"
                    onClick={() => {
                      const progress = calculateProgress(selectedEmployee.tasks)
                      alert(`Current progress: ${progress}% (${selectedEmployee.tasks.filter((t) => t.completed).length}/${selectedEmployee.tasks.length} tasks completed)`)
                    }}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    View Progress Report
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Summary Statistics */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm text-gray-600 mb-1">Total Employees</div>
            <div className="text-3xl font-bold text-gray-900">{employees.length}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm text-gray-600 mb-1">Avg Progress</div>
            <div className="text-3xl font-bold text-blue-600">
              {Math.round(
                employees.reduce((sum, emp) => sum + calculateProgress(emp.tasks), 0) /
                  employees.length
              )}
              %
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm text-gray-600 mb-1">Completed</div>
            <div className="text-3xl font-bold text-green-600">
              {employees.filter((emp) => calculateProgress(emp.tasks) === 100).length}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm text-gray-600 mb-1">In Progress</div>
            <div className="text-3xl font-bold text-yellow-600">
              {employees.filter((emp) => {
                const progress = calculateProgress(emp.tasks)
                return progress > 0 && progress < 100
              }).length}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
