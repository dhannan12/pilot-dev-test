/**
 * UserAttemptsTo — User attempts to delete a task without confirming
 *
 * Features: task list display, delete button, confirmation modal, cancel action, warning message
 *
 * Ticket: SCRUM-848 | Branch: proto/SCRUM-841
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
  },
  {
    id: '6',
    title: 'Refactor authentication module',
    priority: 'medium',
    status: 'pending',
    createdAt: '2026-08-13'
  },
  {
    id: '7',
    title: 'Update API documentation',
    priority: 'low',
    status: 'pending',
    createdAt: '2026-08-12'
  }
]

export default function UserAttemptsTo() {
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS)
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [warningMessage, setWarningMessage] = useState<string | null>(null)

  const handleDeleteAttempt = (task: Task) => {
    setTaskToDelete(task)
    setShowConfirmation(true)
    setWarningMessage('Please confirm deletion by clicking the Confirm Delete button.')
  }

  const handleConfirmDelete = () => {
    if (taskToDelete) {
      setTasks(tasks.filter(t => t.id !== taskToDelete.id))
      setShowConfirmation(false)
      setTaskToDelete(null)
      setWarningMessage(null)
    }
  }

  const handleCancelDelete = () => {
    setShowConfirmation(false)
    setTaskToDelete(null)
    setWarningMessage(null)
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
          Task Manager - Delete Confirmation
        </h1>

        {/* Warning Message */}
        {warningMessage && (
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-md mb-6">
            <div className="flex items-center">
              <span className="text-2xl mr-3">⚠️</span>
              <p className="font-medium">{warningMessage}</p>
            </div>
          </div>
        )}

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
                  <button
                    onClick={() => handleDeleteAttempt(task)}
                    className="ml-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Confirmation Modal */}
        {showConfirmation && taskToDelete && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Confirm Delete
              </h3>
              <p className="text-gray-700 mb-2">
                Are you sure you want to delete this task?
              </p>
              <div className="bg-gray-50 border border-gray-200 rounded-md p-3 mb-6">
                <p className="font-medium text-gray-900">{taskToDelete.title}</p>
                <p className="text-sm text-gray-600 mt-1">
                  Priority: {taskToDelete.priority} | Status: {taskToDelete.status}
                </p>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-6">
                <p className="text-sm text-red-800">
                  <span className="font-semibold">Warning:</span> This action cannot be undone.
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleCancelDelete}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors font-medium"
                >
                  Confirm Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Information Box */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-2">Delete Task Feature:</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Click the Delete button on any task to attempt deletion</li>
            <li>• A warning message will appear requiring confirmation</li>
            <li>• Confirm the deletion in the modal or cancel to keep the task</li>
            <li>• This prevents accidental task deletion</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
