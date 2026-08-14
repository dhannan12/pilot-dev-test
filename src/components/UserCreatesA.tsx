/**
 * UserCreatesA — Task creation interface with successful submission flow
 *
 * Features: task form, priority selection, status tracking, success feedback, task list display
 *
 * Ticket: SCRUM-847 | Branch: proto/SCRUM-841
 */

import { useState } from 'react'

type Priority = 'low' | 'medium' | 'high' | 'urgent'
type Status = 'pending' | 'in-progress' | 'completed'

interface Task {
  id: string
  title: string
  description: string
  priority: Priority
  status: Status
  createdAt: string
}

const MOCK_TASKS: Task[] = [
  {
    id: '1',
    title: 'Design new landing page',
    description: 'Create mockups for the new landing page layout',
    priority: 'high',
    status: 'in-progress',
    createdAt: '2026-08-10'
  },
  {
    id: '2',
    title: 'Set up CI/CD pipeline',
    description: 'Configure automated testing and deployment',
    priority: 'urgent',
    status: 'pending',
    createdAt: '2026-08-11'
  },
  {
    id: '3',
    title: 'Update API documentation',
    description: 'Add examples and usage guidelines',
    priority: 'medium',
    status: 'completed',
    createdAt: '2026-08-12'
  },
  {
    id: '4',
    title: 'Refactor authentication module',
    description: 'Improve security and code structure',
    priority: 'high',
    status: 'pending',
    createdAt: '2026-08-13'
  },
  {
    id: '5',
    title: 'Optimize database queries',
    description: 'Reduce query execution time by indexing',
    priority: 'low',
    status: 'completed',
    createdAt: '2026-08-14'
  }
]

export default function UserCreatesA() {
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState<Priority>('medium')
  const [showSuccess, setShowSuccess] = useState(false)
  const [lastCreatedTask, setLastCreatedTask] = useState<string>('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim()) {
      return
    }

    const newTask: Task = {
      id: String(Date.now()),
      title: title.trim(),
      description: description.trim(),
      priority,
      status: 'pending',
      createdAt: new Date().toISOString().split('T')[0]
    }

    setTasks([newTask, ...tasks])
    setLastCreatedTask(title)
    setShowSuccess(true)

    // Reset form
    setTitle('')
    setDescription('')
    setPriority('medium')

    // Hide success message after 3 seconds
    setTimeout(() => {
      setShowSuccess(false)
    }, 3000)
  }

  const getPriorityColor = (priority: Priority) => {
    const colors = {
      low: 'bg-blue-100 text-blue-700 border-blue-200',
      medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      high: 'bg-orange-100 text-orange-700 border-orange-200',
      urgent: 'bg-red-100 text-red-700 border-red-200'
    }
    return colors[priority]
  }

  const getStatusColor = (status: Status) => {
    const colors = {
      pending: 'text-gray-600',
      'in-progress': 'text-blue-600',
      completed: 'text-green-600'
    }
    return colors[status]
  }

  const getStatusIcon = (status: Status) => {
    const icons = {
      pending: '○',
      'in-progress': '◐',
      completed: '●'
    }
    return icons[status]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Task Manager</h1>
          <p className="text-gray-600">Create and organize your tasks efficiently</p>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="mb-6 bg-green-50 border-2 border-green-300 rounded-lg p-4 animate-pulse">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xl">✓</span>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-green-800">Task Created Successfully!</h3>
                <p className="text-green-700 text-sm">"{lastCreatedTask}" has been added to your task list</p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Create Task Form */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <span className="text-2xl">➕</span>
              Create New Task
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Task Title *
                </label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter task title..."
                  required
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  placeholder="Add task description..."
                  rows={3}
                />
              </div>

              <div>
                <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-2">
                  Priority Level
                </label>
                <select
                  id="priority"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as Priority)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors font-semibold text-lg shadow-md hover:shadow-lg"
              >
                Create Task
              </button>
            </form>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-600 flex items-start gap-2">
                <span className="text-blue-500 font-bold">ℹ</span>
                <span>Fill in the task details and click "Create Task" to add it to your list. Tasks are automatically set to "pending" status.</span>
              </p>
            </div>
          </div>

          {/* Task List */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                Task List
              </h2>
              <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                {tasks.length} {tasks.length === 1 ? 'Task' : 'Tasks'}
              </div>
            </div>

            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="border-2 border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 text-lg flex-1">
                      {task.title}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold border ${getPriorityColor(
                        task.priority
                      )}`}
                    >
                      {task.priority.toUpperCase()}
                    </span>
                  </div>

                  {task.description && (
                    <p className="text-gray-600 text-sm mb-3">{task.description}</p>
                  )}

                  <div className="flex items-center gap-4 text-sm">
                    <div className={`flex items-center gap-1 font-medium ${getStatusColor(task.status)}`}>
                      <span>{getStatusIcon(task.status)}</span>
                      <span>{task.status.replace('-', ' ')}</span>
                    </div>
                    <div className="text-gray-400 flex items-center gap-1">
                      <span>📅</span>
                      <span>{task.createdAt}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <div className="text-2xl font-bold text-gray-900">{tasks.length}</div>
            <div className="text-sm text-gray-600">Total Tasks</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <div className="text-2xl font-bold text-gray-600">
              {tasks.filter(t => t.status === 'pending').length}
            </div>
            <div className="text-sm text-gray-600">Pending</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {tasks.filter(t => t.status === 'in-progress').length}
            </div>
            <div className="text-sm text-gray-600">In Progress</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {tasks.filter(t => t.status === 'completed').length}
            </div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
        </div>
      </div>
    </div>
  )
}
