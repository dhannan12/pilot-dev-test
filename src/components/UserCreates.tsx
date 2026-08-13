/**
 * UserCreates — Task creation form with mandatory deadline validation
 *
 * Features: Task input form, deadline requirement validation, task preview, error messaging, submission handling
 *
 * Ticket: SCRUM-734 | Branch: proto/SCRUM-733
 */

import { useState } from 'react'

interface Task {
  id: string
  title: string
  description: string
  deadline: string
  createdAt: string
  status: 'pending' | 'in-progress' | 'completed'
}

const MOCK_EXISTING_TASKS: Task[] = [
  {
    id: '1',
    title: 'Complete project documentation',
    description: 'Write comprehensive documentation for the new feature',
    deadline: '2026-08-20',
    createdAt: '2026-08-10',
    status: 'in-progress'
  },
  {
    id: '2',
    title: 'Review pull requests',
    description: 'Review and approve pending pull requests from team members',
    deadline: '2026-08-15',
    createdAt: '2026-08-09',
    status: 'pending'
  },
  {
    id: '3',
    title: 'Update dependencies',
    description: 'Update all project dependencies to latest stable versions',
    deadline: '2026-08-18',
    createdAt: '2026-08-11',
    status: 'pending'
  },
  {
    id: '4',
    title: 'Fix critical bug in authentication',
    description: 'Resolve the login issue reported by users',
    deadline: '2026-08-14',
    createdAt: '2026-08-12',
    status: 'completed'
  },
  {
    id: '5',
    title: 'Prepare sprint demo',
    description: 'Create presentation slides for the upcoming sprint review',
    deadline: '2026-08-16',
    createdAt: '2026-08-11',
    status: 'in-progress'
  }
]

export default function UserCreates() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [deadline, setDeadline] = useState('')
  const [error, setError] = useState('')
  const [tasks, setTasks] = useState<Task[]>(MOCK_EXISTING_TASKS)
  const [attemptedSubmit, setAttemptedSubmit] = useState(false)

  const getTodayDate = () => {
    return new Date().toISOString().split('T')[0]
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setAttemptedSubmit(true)
    setError('')

    // Validate required fields
    if (!title.trim()) {
      setError('Task title is required')
      return
    }

    if (!deadline) {
      setError('Deadline is required - Each task must have a defined deadline to ensure timely completion')
      return
    }

    if (new Date(deadline) < new Date(getTodayDate())) {
      setError('Deadline cannot be in the past')
      return
    }

    // Create new task
    const newTask: Task = {
      id: String(tasks.length + 1),
      title: title.trim(),
      description: description.trim(),
      deadline,
      createdAt: getTodayDate(),
      status: 'pending'
    }

    setTasks([newTask, ...tasks])
    
    // Reset form
    setTitle('')
    setDescription('')
    setDeadline('')
    setAttemptedSubmit(false)
    setError('')
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'in-progress':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const isOverdue = (deadline: string, status: string) => {
    if (status === 'completed') return false
    return new Date(deadline) < new Date()
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Task Management</h1>
          <p className="text-gray-600 mb-6">Create and manage your tasks with mandatory deadlines</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Task Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  attemptedSubmit && !title.trim() ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter task title"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter task description (optional)"
              />
            </div>

            <div>
              <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 mb-1">
                Deadline <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="deadline"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                min={getTodayDate()}
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  attemptedSubmit && !deadline ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              <p className="text-sm text-gray-500 mt-1">
                Each task must have a defined deadline to ensure timely completion
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Create Task
            </button>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Tasks ({tasks.length})</h2>
          
          <div className="space-y-3">
            {tasks.map((task) => (
              <div
                key={task.id}
                className={`border rounded-lg p-4 transition-shadow hover:shadow-md ${
                  isOverdue(task.deadline, task.status) ? 'border-red-300 bg-red-50' : 'border-gray-200'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                    {task.status}
                  </span>
                </div>
                
                {task.description && (
                  <p className="text-gray-600 text-sm mb-3">{task.description}</p>
                )}
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4">
                    <span className="text-gray-500">
                      Created: {new Date(task.createdAt).toLocaleDateString()}
                    </span>
                    <span className={`font-medium ${
                      isOverdue(task.deadline, task.status) ? 'text-red-600' : 'text-gray-700'
                    }`}>
                      Deadline: {new Date(task.deadline).toLocaleDateString()}
                      {isOverdue(task.deadline, task.status) && ' (Overdue!)'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
