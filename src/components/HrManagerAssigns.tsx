/**
 * HrManagerAssigns — HR Manager assigns tasks without requiring a due date
 *
 * Features: task creation form, assignee selection, optional due date, priority levels, task list display
 *
 * Ticket: SCRUM-883 | Branch: proto/SCRUM-879
 */

import { useState } from 'react'

interface Task {
  id: string
  title: string
  description: string
  assignee: string
  priority: 'Low' | 'Medium' | 'High'
  dueDate?: string
  status: 'Assigned' | 'In Progress' | 'Completed'
  createdAt: string
}

const MOCK_EMPLOYEES = [
  'John Smith',
  'Sarah Johnson',
  'Michael Chen',
  'Emily Davis',
  'David Wilson',
  'Lisa Anderson',
  'James Martinez'
]

const MOCK_TASKS: Task[] = [
  {
    id: '1',
    title: 'Complete employee handbook review',
    description: 'Review and sign the updated employee handbook',
    assignee: 'John Smith',
    priority: 'High',
    status: 'Assigned',
    createdAt: '2026-08-14'
  },
  {
    id: '2',
    title: 'Set up workstation',
    description: 'Configure laptop and access credentials',
    assignee: 'Sarah Johnson',
    priority: 'Medium',
    dueDate: '2026-08-20',
    status: 'In Progress',
    createdAt: '2026-08-13'
  },
  {
    id: '3',
    title: 'Schedule orientation meeting',
    description: 'Meet with HR for orientation session',
    assignee: 'Michael Chen',
    priority: 'High',
    dueDate: '2026-08-16',
    status: 'Assigned',
    createdAt: '2026-08-12'
  },
  {
    id: '4',
    title: 'Complete safety training',
    description: 'Complete online safety training modules',
    assignee: 'Emily Davis',
    priority: 'Medium',
    status: 'Assigned',
    createdAt: '2026-08-11'
  },
  {
    id: '5',
    title: 'Submit tax documents',
    description: 'Submit W-4 and state tax forms',
    assignee: 'David Wilson',
    priority: 'Low',
    dueDate: '2026-08-25',
    status: 'Completed',
    createdAt: '2026-08-10'
  }
]

export default function HrManagerAssigns() {
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    assignee: '',
    priority: 'Medium' as 'Low' | 'Medium' | 'High',
    dueDate: ''
  })

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.title || !formData.assignee) {
      alert('Please fill in required fields (Title and Assignee)')
      return
    }

    const newTask: Task = {
      id: String(Date.now()),
      title: formData.title,
      description: formData.description,
      assignee: formData.assignee,
      priority: formData.priority,
      dueDate: formData.dueDate || undefined,
      status: 'Assigned',
      createdAt: new Date().toISOString().split('T')[0]
    }

    setTasks(prev => [newTask, ...prev])
    setFormData({
      title: '',
      description: '',
      assignee: '',
      priority: 'Medium',
      dueDate: ''
    })
    setShowForm(false)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'text-red-600 bg-red-50'
      case 'Medium': return 'text-yellow-600 bg-yellow-50'
      case 'Low': return 'text-green-600 bg-green-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'text-green-600 bg-green-50'
      case 'In Progress': return 'text-blue-600 bg-blue-50'
      case 'Assigned': return 'text-gray-600 bg-gray-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  return (
    <div data-testid="hrmanagerassigns" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Task Assignment</h1>
              <p className="text-gray-600 mt-1">Assign tasks to employees for onboarding</p>
            </div>
            <button
              data-testid="hrmanagerassigns-create"
              onClick={() => setShowForm(!showForm)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              {showForm ? 'Cancel' : 'Assign New Task'}
            </button>
          </div>
        </div>

        {/* Task Assignment Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Create New Task Assignment</h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Task Title */}
                <div className="md:col-span-2">
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                    Task Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    data-testid="hrmanagerassigns-title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter task title"
                  />
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    data-testid="hrmanagerassigns-description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter task description"
                  />
                </div>

                {/* Assignee */}
                <div>
                  <label htmlFor="assignee" className="block text-sm font-medium text-gray-700 mb-2">
                    Assign To <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="assignee"
                    name="assignee"
                    data-testid="hrmanagerassigns-assignee"
                    value={formData.assignee}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select an employee</option>
                    {MOCK_EMPLOYEES.map(employee => (
                      <option key={employee} value={employee}>
                        {employee}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Priority */}
                <div>
                  <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-2">
                    Priority
                  </label>
                  <select
                    id="priority"
                    name="priority"
                    data-testid="hrmanagerassigns-priority"
                    value={formData.priority}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>

                {/* Due Date (Optional) */}
                <div>
                  <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-2">
                    Due Date <span className="text-gray-500 text-xs">(Optional)</span>
                  </label>
                  <input
                    type="date"
                    id="dueDate"
                    name="dueDate"
                    data-testid="hrmanagerassigns-duedate"
                    value={formData.dueDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  data-testid="hrmanagerassigns-cancel"
                  onClick={() => setShowForm(false)}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  data-testid="hrmanagerassigns-submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Assign Task
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Task List */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Assigned Tasks</h2>
          <div data-testid="hrmanagerassigns-list" className="space-y-4">
            {tasks.map(task => (
              <div
                key={task.id}
                data-testid="hrmanagerassigns-item"
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
                    {task.description && (
                      <p className="text-gray-600 mt-1">{task.description}</p>
                    )}
                  </div>
                  <div className="flex gap-2 ml-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                      {task.status}
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-3">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Assigned to:</span>
                    <span>{task.assignee}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Created:</span>
                    <span>{task.createdAt}</span>
                  </div>
                  {task.dueDate && (
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Due:</span>
                      <span>{task.dueDate}</span>
                    </div>
                  )}
                  {!task.dueDate && (
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-500">No due date set</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
