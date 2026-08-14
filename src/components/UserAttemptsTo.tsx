/**
 * UserAttemptsTo — Task creation form with validation for empty title
 *
 * Features: title validation, error messaging, task list display, form reset, inline feedback
 *
 * Ticket: SCRUM-842 | Branch: proto/SCRUM-841
 */

import { useState } from 'react'

interface Task {
  id: number
  title: string
  description: string
  status: 'pending' | 'in-progress' | 'completed'
  createdAt: string
}

const mockTasks: Task[] = [
  {
    id: 1,
    title: 'Review quarterly budget report',
    description: 'Analyze spending patterns and prepare summary',
    status: 'in-progress',
    createdAt: '2026-08-10'
  },
  {
    id: 2,
    title: 'Update team documentation',
    description: 'Add new API endpoints to developer guide',
    status: 'pending',
    createdAt: '2026-08-11'
  },
  {
    id: 3,
    title: 'Schedule client meeting',
    description: 'Coordinate with stakeholders for Q3 review',
    status: 'completed',
    createdAt: '2026-08-09'
  },
  {
    id: 4,
    title: 'Fix production bug #547',
    description: 'Resolve login redirect issue on mobile devices',
    status: 'in-progress',
    createdAt: '2026-08-12'
  },
  {
    id: 5,
    title: 'Onboard new team members',
    description: 'Prepare training materials and schedule orientation',
    status: 'pending',
    createdAt: '2026-08-13'
  }
]

export default function UserAttemptsTo() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState('')
  const [attemptedSubmit, setAttemptedSubmit] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setAttemptedSubmit(true)

    if (!title.trim()) {
      setError('Title is required. Please enter a task title.')
      return
    }

    // Create new task
    const newTask: Task = {
      id: tasks.length + 1,
      title: title.trim(),
      description: description.trim(),
      status: 'pending',
      createdAt: new Date().toISOString().split('T')[0]
    }

    setTasks([newTask, ...tasks])
    setTitle('')
    setDescription('')
    setError('')
    setAttemptedSubmit(false)
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
    if (attemptedSubmit && e.target.value.trim()) {
      setError('')
    }
  }

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'in-progress':
        return 'bg-blue-100 text-blue-800'
      case 'pending':
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Task Manager</h1>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Task Title <span className="text-red-500">*</span>
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={handleTitleChange}
                placeholder="Enter task title"
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  error
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-blue-500'
                }`}
              />
              {error && (
                <div className="mt-2 flex items-start gap-2 text-red-600 text-sm">
                  <svg
                    className="w-5 h-5 flex-shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{error}</span>
                </div>
              )}
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter task description (optional)"
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
            >
              Create Task
            </button>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Tasks ({tasks.length})
          </h2>
          
          <div className="space-y-3">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-medium text-gray-900">{task.title}</h3>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                      task.status
                    )}`}
                  >
                    {task.status.replace('-', ' ')}
                  </span>
                </div>
                
                {task.description && (
                  <p className="text-gray-600 text-sm mb-2">{task.description}</p>
                )}
                
                <p className="text-gray-400 text-xs">Created: {task.createdAt}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
