/**
 * HrManagerAssigns — HR Manager assigns onboarding tasks to a new employee
 *
 * Features: employee selection, task assignment, task list display, status tracking, bulk task management
 *
 * Ticket: SCRUM-880 | Branch: proto/SCRUM-879
 */

import { useState } from 'react'

interface Employee {
  id: number
  name: string
  position: string
  department: string
  startDate: string
}

interface OnboardingTask {
  id: number
  title: string
  description: string
  category: string
  estimatedDays: number
}

interface AssignedTask {
  id: number
  taskId: number
  taskTitle: string
  employeeId: number
  employeeName: string
  dueDate: string
  status: 'pending' | 'in-progress' | 'completed'
  priority: 'low' | 'medium' | 'high'
}

const MOCK_EMPLOYEES: Employee[] = [
  { id: 1, name: 'Sarah Johnson', position: 'Software Engineer', department: 'Engineering', startDate: '2026-09-01' },
  { id: 2, name: 'Michael Chen', position: 'Product Manager', department: 'Product', startDate: '2026-09-05' },
  { id: 3, name: 'Emily Rodriguez', position: 'UX Designer', department: 'Design', startDate: '2026-08-25' },
  { id: 4, name: 'James Wilson', position: 'Data Analyst', department: 'Analytics', startDate: '2026-09-10' },
  { id: 5, name: 'Lisa Thompson', position: 'Marketing Manager', department: 'Marketing', startDate: '2026-08-30' },
]

const MOCK_TASKS: OnboardingTask[] = [
  { id: 1, title: 'Complete I-9 Form', description: 'Fill out employment eligibility verification', category: 'HR Compliance', estimatedDays: 1 },
  { id: 2, title: 'Setup Company Email', description: 'Create and configure corporate email account', category: 'IT Setup', estimatedDays: 1 },
  { id: 3, title: 'Review Employee Handbook', description: 'Read and acknowledge company policies', category: 'HR Compliance', estimatedDays: 2 },
  { id: 4, title: 'Complete Benefits Enrollment', description: 'Select health insurance and retirement plans', category: 'Benefits', estimatedDays: 3 },
  { id: 5, title: 'Attend Security Training', description: 'Complete mandatory cybersecurity training', category: 'Training', estimatedDays: 1 },
  { id: 6, title: 'Setup Development Environment', description: 'Install required software and tools', category: 'IT Setup', estimatedDays: 2 },
  { id: 7, title: 'Meet with Direct Manager', description: 'Initial one-on-one meeting with supervisor', category: 'Management', estimatedDays: 1 },
  { id: 8, title: 'Complete Tax Withholding Forms', description: 'Fill out W-4 and state tax forms', category: 'HR Compliance', estimatedDays: 1 },
]

const MOCK_ASSIGNED_TASKS: AssignedTask[] = [
  { id: 1, taskId: 1, taskTitle: 'Complete I-9 Form', employeeId: 1, employeeName: 'Sarah Johnson', dueDate: '2026-09-02', status: 'completed', priority: 'high' },
  { id: 2, taskId: 2, taskTitle: 'Setup Company Email', employeeId: 1, employeeName: 'Sarah Johnson', dueDate: '2026-09-01', status: 'completed', priority: 'high' },
  { id: 3, taskId: 3, taskTitle: 'Review Employee Handbook', employeeId: 1, employeeName: 'Sarah Johnson', dueDate: '2026-09-03', status: 'in-progress', priority: 'medium' },
  { id: 4, taskId: 4, taskTitle: 'Complete Benefits Enrollment', employeeId: 2, employeeName: 'Michael Chen', dueDate: '2026-09-08', status: 'pending', priority: 'high' },
  { id: 5, taskId: 5, taskTitle: 'Attend Security Training', employeeId: 3, employeeName: 'Emily Rodriguez', dueDate: '2026-08-26', status: 'completed', priority: 'medium' },
]

export default function HrManagerAssigns() {
  const [selectedEmployee, setSelectedEmployee] = useState<number>(0)
  const [selectedTasks, setSelectedTasks] = useState<number[]>([])
  const [assignedTasks, setAssignedTasks] = useState<AssignedTask[]>(MOCK_ASSIGNED_TASKS)
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium')
  const [daysOffset, setDaysOffset] = useState<number>(7)
  const [filterEmployee, setFilterEmployee] = useState<number>(0)

  const handleTaskToggle = (taskId: number) => {
    setSelectedTasks(prev =>
      prev.includes(taskId)
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    )
  }

  const handleAssignTasks = () => {
    if (selectedEmployee === 0 || selectedTasks.length === 0) {
      return
    }

    const employee = MOCK_EMPLOYEES.find(e => e.id === selectedEmployee)
    if (!employee) return

    const newAssignments: AssignedTask[] = selectedTasks.map(taskId => {
      const task = MOCK_TASKS.find(t => t.id === taskId)
      if (!task) return null
      
      const dueDate = new Date()
      dueDate.setDate(dueDate.getDate() + daysOffset)

      return {
        id: assignedTasks.length + taskId,
        taskId: task.id,
        taskTitle: task.title,
        employeeId: employee.id,
        employeeName: employee.name,
        dueDate: dueDate.toISOString().split('T')[0],
        status: 'pending' as const,
        priority: priority,
      }
    }).filter(Boolean) as AssignedTask[]

    setAssignedTasks([...assignedTasks, ...newAssignments])
    setSelectedTasks([])
    setSelectedEmployee(0)
  }

  const handleRemoveAssignment = (assignmentId: number) => {
    setAssignedTasks(prev => prev.filter(a => a.id !== assignmentId))
  }

  const filteredAssignedTasks = filterEmployee === 0
    ? assignedTasks
    : assignedTasks.filter(a => a.employeeId === filterEmployee)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'in-progress': return 'bg-blue-100 text-blue-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-orange-100 text-orange-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div data-testid="hrmanagerassigns" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Assign Onboarding Tasks</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Assignment Form */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Create Task Assignment</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Employee
                </label>
                <select
                  data-testid="hrmanagerassigns-employee"
                  value={selectedEmployee}
                  onChange={(e) => setSelectedEmployee(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={0}>-- Choose an employee --</option>
                  {MOCK_EMPLOYEES.map(emp => (
                    <option key={emp.id} value={emp.id}>
                      {emp.name} - {emp.position} ({emp.department})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priority
                  </label>
                  <select
                    data-testid="hrmanagerassigns-priority"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Due in (days)
                  </label>
                  <input
                    data-testid="hrmanagerassigns-days"
                    type="number"
                    value={daysOffset}
                    onChange={(e) => setDaysOffset(Number(e.target.value))}
                    min="1"
                    max="90"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Tasks ({selectedTasks.length} selected)
                </label>
                <div data-testid="hrmanagerassigns-tasklist" className="border border-gray-300 rounded-md max-h-64 overflow-y-auto">
                  {MOCK_TASKS.map(task => (
                    <label
                      key={task.id}
                      data-testid="hrmanagerassigns-taskitem"
                      className="flex items-start p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-200 last:border-b-0"
                    >
                      <input
                        data-testid={`hrmanagerassigns-task-${task.id}`}
                        type="checkbox"
                        checked={selectedTasks.includes(task.id)}
                        onChange={() => handleTaskToggle(task.id)}
                        className="mt-1 mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{task.title}</div>
                        <div className="text-sm text-gray-600">{task.description}</div>
                        <div className="flex gap-2 mt-1">
                          <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">
                            {task.category}
                          </span>
                          <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">
                            {task.estimatedDays} day(s)
                          </span>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <button
                data-testid="hrmanagerassigns-submit"
                onClick={handleAssignTasks}
                disabled={selectedEmployee === 0 || selectedTasks.length === 0}
                className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Assign Tasks to Employee
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Assignment Overview</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{assignedTasks.length}</div>
                <div className="text-sm text-gray-600">Total Assignments</div>
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">
                  {assignedTasks.filter(a => a.status === 'pending').length}
                </div>
                <div className="text-sm text-gray-600">Pending Tasks</div>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {assignedTasks.filter(a => a.status === 'completed').length}
                </div>
                <div className="text-sm text-gray-600">Completed Tasks</div>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  {assignedTasks.filter(a => a.status === 'in-progress').length}
                </div>
                <div className="text-sm text-gray-600">In Progress</div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="font-medium text-gray-900 mb-2">Active Employees</h3>
              <div className="space-y-2">
                {MOCK_EMPLOYEES.slice(0, 5).map(emp => {
                  const empTasks = assignedTasks.filter(a => a.employeeId === emp.id)
                  return (
                    <div key={emp.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <div>
                        <div className="font-medium text-sm text-gray-900">{emp.name}</div>
                        <div className="text-xs text-gray-500">{emp.position}</div>
                      </div>
                      <div className="text-sm font-medium text-blue-600">
                        {empTasks.length} task{empTasks.length !== 1 ? 's' : ''}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Assigned Tasks List */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Assigned Tasks</h2>
            <select
              data-testid="hrmanagerassigns-filter"
              value={filterEmployee}
              onChange={(e) => setFilterEmployee(Number(e.target.value))}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value={0}>All Employees</option>
              {MOCK_EMPLOYEES.map(emp => (
                <option key={emp.id} value={emp.id}>{emp.name}</option>
              ))}
            </select>
          </div>

          <div data-testid="hrmanagerassigns-list" className="space-y-3">
            {filteredAssignedTasks.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No assigned tasks yet. Create your first assignment above.
              </div>
            ) : (
              filteredAssignedTasks.map(assignment => (
                <div
                  key={assignment.id}
                  data-testid="hrmanagerassigns-item"
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900">{assignment.taskTitle}</h3>
                      <span className={`text-xs px-2 py-1 rounded ${getStatusColor(assignment.status)}`}>
                        {assignment.status.replace('-', ' ')}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded ${getPriorityColor(assignment.priority)}`}>
                        {assignment.priority} priority
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      Assigned to: <span className="font-medium">{assignment.employeeName}</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      Due: {assignment.dueDate}
                    </div>
                  </div>
                  <button
                    data-testid="hrmanagerassigns-remove"
                    onClick={() => handleRemoveAssignment(assignment.id)}
                    className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
                  >
                    Remove
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
