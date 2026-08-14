/**
 * UserWithoutDelete — Demonstrates user attempting to delete a task without permissions
 *
 * Features: task list display, delete button with permission check, permission error feedback, disabled state handling, user role simulation
 *
 * Ticket: SCRUM-843 | Branch: proto/SCRUM-841
 */

import { useState } from 'react'

interface Task {
  id: string
  title: string
  description: string
  status: 'pending' | 'in-progress' | 'completed'
  assignee: string
}

interface User {
  id: string
  name: string
  email: string
  canDelete: boolean
  role: 'viewer' | 'editor' | 'admin'
}

const MOCK_TASKS: Task[] = [
  {
    id: 'task-1',
    title: 'Design landing page mockup',
    description: 'Create high-fidelity mockups for the new landing page',
    status: 'completed',
    assignee: 'Alice Johnson'
  },
  {
    id: 'task-2',
    title: 'Implement user authentication',
    description: 'Set up OAuth2 authentication flow with Google and GitHub',
    status: 'in-progress',
    assignee: 'Bob Smith'
  },
  {
    id: 'task-3',
    title: 'Write API documentation',
    description: 'Document all REST endpoints with examples and response codes',
    status: 'pending',
    assignee: 'Charlie Davis'
  },
  {
    id: 'task-4',
    title: 'Optimize database queries',
    description: 'Review and optimize slow running queries in production',
    status: 'in-progress',
    assignee: 'Diana Prince'
  },
  {
    id: 'task-5',
    title: 'Set up CI/CD pipeline',
    description: 'Configure automated testing and deployment workflows',
    status: 'completed',
    assignee: 'Ethan Hunt'
  }
]

const MOCK_USERS: User[] = [
  {
    id: 'user-1',
    name: 'John Viewer',
    email: 'john.viewer@example.com',
    canDelete: false,
    role: 'viewer'
  },
  {
    id: 'user-2',
    name: 'Jane Editor',
    email: 'jane.editor@example.com',
    canDelete: false,
    role: 'editor'
  },
  {
    id: 'user-3',
    name: 'Admin User',
    email: 'admin@example.com',
    canDelete: true,
    role: 'admin'
  }
]

export default function UserWithoutDelete() {
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS)
  const [currentUser, setCurrentUser] = useState<User>(MOCK_USERS[0]) // Default to user without delete permission
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [successMessage, setSuccessMessage] = useState<string>('')

  const handleDeleteAttempt = (taskId: string) => {
    setSuccessMessage('')
    
    if (!currentUser.canDelete) {
      setErrorMessage(
        `Permission Denied: User "${currentUser.name}" (${currentUser.role}) does not have permission to delete tasks. Please contact an administrator.`
      )
      
      // Clear error message after 5 seconds
      setTimeout(() => setErrorMessage(''), 5000)
      return
    }

    // If user has permission, delete the task
    setTasks(tasks.filter(task => task.id !== taskId))
    setSuccessMessage(`Task successfully deleted by ${currentUser.name}`)
    setErrorMessage('')
    
    // Clear success message after 3 seconds
    setTimeout(() => setSuccessMessage(''), 3000)
  }

  const handleUserSwitch = (userId: string) => {
    const user = MOCK_USERS.find(u => u.id === userId)
    if (user) {
      setCurrentUser(user)
      setErrorMessage('')
      setSuccessMessage('')
    }
  }

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'in-progress':
        return 'bg-blue-100 text-blue-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Task Management System
          </h1>
          <p className="text-gray-600 mb-6">
            Demonstrating permission-based task deletion
          </p>

          {/* User Selector */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current User:
            </label>
            <div className="flex gap-3 flex-wrap">
              {MOCK_USERS.map(user => (
                <button
                  key={user.id}
                  onClick={() => handleUserSwitch(user.id)}
                  className={`px-4 py-2 rounded-md font-medium transition-colors ${
                    currentUser.id === user.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {user.name} ({user.role})
                </button>
              ))}
            </div>
            <div className="mt-3 text-sm">
              <span className="font-medium">Email:</span> {currentUser.email} |{' '}
              <span className="font-medium">Delete Permission:</span>{' '}
              <span
                className={`font-semibold ${
                  currentUser.canDelete ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {currentUser.canDelete ? 'Granted' : 'Denied'}
              </span>
            </div>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700 font-medium">
                    {errorMessage}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Success Message */}
          {successMessage && (
            <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-green-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-green-700 font-medium">
                    {successMessage}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Task List */}
        <div className="grid gap-4">
          {tasks.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <p className="text-gray-500 text-lg">No tasks available</p>
            </div>
          ) : (
            tasks.map(task => (
              <div
                key={task.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {task.title}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          task.status
                        )}`}
                      >
                        {task.status}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-3">{task.description}</p>
                    <p className="text-sm text-gray-500">
                      <span className="font-medium">Assigned to:</span>{' '}
                      {task.assignee}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeleteAttempt(task.id)}
                    className={`ml-4 px-4 py-2 rounded-md font-medium transition-all ${
                      currentUser.canDelete
                        ? 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800'
                        : 'bg-red-400 text-white hover:bg-red-500 cursor-pointer'
                    }`}
                    title={
                      currentUser.canDelete
                        ? 'Delete this task'
                        : 'You do not have permission to delete tasks'
                    }
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Info Panel */}
        <div className="mt-6 bg-blue-50 rounded-lg p-4 border border-blue-200">
          <h3 className="text-sm font-semibold text-blue-900 mb-2">
            Permission System Information
          </h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>
              • <strong>Viewer Role:</strong> Can view tasks only, cannot delete
            </li>
            <li>
              • <strong>Editor Role:</strong> Can edit tasks but cannot delete
            </li>
            <li>
              • <strong>Admin Role:</strong> Full permissions including delete
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
