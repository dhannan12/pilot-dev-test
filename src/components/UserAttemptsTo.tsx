/**
 * UserAttemptsTo — Demonstrates task creation with invalid priority validation
 *
 * Features: task form, priority validation, error messaging, mock task list, invalid input handling
 *
 * Ticket: SCRUM-846 | Branch: proto/SCRUM-841
 */

import { useState } from 'react'

type Priority = 'low' | 'medium' | 'high' | 'urgent'

interface Task {
  id: string
  title: string
  priority: Priority
  status: 'pending' | 'completed'
  createdAt: string
}

const MOCK_TASKS: Task[] = [
  {
    id: '1',
    title: 'Review project documentation',
    priority: 'high',
    status: 'pending',
    createdAt: '2026-08-10'
  },
  {
    id: '2',
    title: 'Update dependencies',
    priority: 'medium',
    status: 'completed',
    createdAt: '2026-08-11'
  },
  {
    id: '3',
    title: 'Fix navigation bug',
    priority: 'urgent',
    status: 'pending',
    createdAt: '2026-08-12'
  },
  {
    id: '4',
    title: 'Write unit tests',
    priority: 'high',
    status: 'pending',
    createdAt: '2026-08-13'
  },
  {
    id: '5',
    title: 'Clean up code comments',
    priority: 'low',
    status: 'completed',
    createdAt: '2026-08-14'
  }
]

const VALID_PRIORITIES: Priority[] = ['low', 'medium', 'high', 'urgent']

export default function UserAttemptsTo() {
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS)
  const [taskTitle, setTaskTitle] = useState('')
  const [priorityInput, setPriorityInput] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const validatePriority = (priority: string): priority is Priority => {
    return VALID_PRIORITIES.includes(priority as Priority)
  }

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccessMessage(null)

    if (!taskTitle.trim()) {
      setError('Task title is required')
      return
    }

    const normalizedPriority = priorityInput.toLowerCase().trim()

    if (!normalizedPriority) {
      setError('Priority is required')
      return
    }

    if (!validatePriority(normalizedPriority)) {
      setError(
        `Invalid priority level: "${priorityInput}". Valid priorities are: ${VALID_PRIORITIES.join(', ')}`
      )
      return
    }

    const newTask: Task = {
      id: String(Date.now()),
      title: taskTitle,
      priority: normalizedPriority,
      status: 'pending',
      createdAt: new Date().toISOString().split('T')[0]
    }

    setTasks([newTask, ...tasks])
    setSuccessMessage(`Task "${taskTitle}" created successfully with ${normalizedPriority} priority`)
    setTaskTitle('')
    setPriorityInput('')
  }

  const getPriorityColor = (priority: Priority) => {
    const colors = {
      low: 'bg-blue-100 text-blue-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-orange-100 text-orange-800',
      urgent: 'bg-red-100 text-red-800'
    }
    return colors[priority]
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Task Manager - Priority Validation
        </h1>

        {/* Task Creation Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Create New Task</h2>
          
          <form onSubmit={handleCreateTask} className="space-y-4">
            <div>
              <label htmlFor="taskTitle" className="block text-sm font-medium text-gray-700 mb-2">
                Task Title
              </label>
              <input
                id="taskTitle"
                type="text"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter task title"
              />
            </div>

            <div>
              <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-2">
                Priority
              </label>
              <input
                id="priority"
                type="text"
                value={priorityInput}
                onChange={(e) => setPriorityInput(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter priority (low, medium, high, urgent)"
              />
              <p className="mt-1 text-sm text-gray-500">
                Valid priorities: {VALID_PRIORITIES.join(', ')}
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                <p className="font-medium">Error:</p>
                <p>{error}</p>
              </div>
            )}

            {successMessage && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md">
                <p>{successMessage}</p>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
            >
              Create Task
            </button>
          </form>
        </div>

        {/* Task List */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Tasks ({tasks.length})
          </h2>
          
          <div className="space-y-3">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 mb-2">{task.title}</h3>
                    <div className="flex items-center gap-3 text-sm">
                      <span
                        className={`px-2 py-1 rounded-full font-medium ${getPriorityColor(
                          task.priority
                        )}`}
                      >
                        {task.priority}
                      </span>
                      <span className="text-gray-500">
                        {task.status === 'completed' ? '✓ Completed' : '○ Pending'}
                      </span>
                      <span className="text-gray-400">{task.createdAt}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Information Box */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-2">Try These Examples:</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Valid: "low", "medium", "high", "urgent"</li>
            <li>• Invalid: "critical", "normal", "1", "highest"</li>
            <li>• The system will validate and show an error for invalid priorities</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
