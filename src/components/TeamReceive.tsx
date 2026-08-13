/**
 * TeamReceive — Team member task reminders and completion management
 *
 * Features: Task reminders, assignment validation, completion control, notification alerts, task filtering
 *
 * Ticket: SCRUM-739 | Branch: proto/SCRUM-733
 */

import { useState } from 'react'

interface Task {
  id: string
  title: string
  description: string
  assignedTo: string
  dueDate: string
  priority: 'Low' | 'Medium' | 'High'
  status: 'Pending' | 'In Progress' | 'Completed'
  reminderSent: boolean
}

interface Reminder {
  id: string
  taskId: string
  message: string
  timestamp: string
  read: boolean
}

const MOCK_CURRENT_USER = 'john.doe@company.com'

const MOCK_TASKS: Task[] = [
  {
    id: 'task-1',
    title: 'Update user authentication flow',
    description: 'Refactor the login component to use new OAuth provider',
    assignedTo: 'john.doe@company.com',
    dueDate: '2026-08-15',
    priority: 'High',
    status: 'In Progress',
    reminderSent: true
  },
  {
    id: 'task-2',
    title: 'Review pull request #342',
    description: 'Code review for the new dashboard feature',
    assignedTo: 'john.doe@company.com',
    dueDate: '2026-08-14',
    priority: 'Medium',
    status: 'Pending',
    reminderSent: true
  },
  {
    id: 'task-3',
    title: 'Write API documentation',
    description: 'Document the new REST endpoints for the mobile app',
    assignedTo: 'jane.smith@company.com',
    dueDate: '2026-08-16',
    priority: 'Medium',
    status: 'In Progress',
    reminderSent: false
  },
  {
    id: 'task-4',
    title: 'Fix production bug #567',
    description: 'Critical bug causing payment failures on checkout',
    assignedTo: 'john.doe@company.com',
    dueDate: '2026-08-13',
    priority: 'High',
    status: 'Pending',
    reminderSent: true
  },
  {
    id: 'task-5',
    title: 'Deploy staging environment',
    description: 'Set up staging server with latest build',
    assignedTo: 'mike.wilson@company.com',
    dueDate: '2026-08-17',
    priority: 'Low',
    status: 'Pending',
    reminderSent: false
  },
  {
    id: 'task-6',
    title: 'Update database schema',
    description: 'Add new fields for user preferences',
    assignedTo: 'john.doe@company.com',
    dueDate: '2026-08-18',
    priority: 'Low',
    status: 'Pending',
    reminderSent: false
  }
]

const MOCK_REMINDERS: Reminder[] = [
  {
    id: 'rem-1',
    taskId: 'task-1',
    message: 'Task "Update user authentication flow" is due soon (2026-08-15)',
    timestamp: '2026-08-13T09:00:00',
    read: false
  },
  {
    id: 'rem-2',
    taskId: 'task-2',
    message: 'Task "Review pull request #342" is due tomorrow!',
    timestamp: '2026-08-13T08:30:00',
    read: false
  },
  {
    id: 'rem-3',
    taskId: 'task-4',
    message: 'URGENT: Task "Fix production bug #567" is due today!',
    timestamp: '2026-08-13T07:00:00',
    read: true
  }
]

export default function TeamReceive() {
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS)
  const [reminders, setReminders] = useState<Reminder[]>(MOCK_REMINDERS)
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'my-tasks' | 'reminders'>('my-tasks')
  const [errorMessage, setErrorMessage] = useState<string>('')

  const currentUserTasks = tasks.filter(task => task.assignedTo === MOCK_CURRENT_USER)
  const unreadRemindersCount = reminders.filter(r => !r.read).length

  const handleCompleteTask = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId)
    
    if (!task) {
      setErrorMessage('Task not found')
      setTimeout(() => setErrorMessage(''), 3000)
      return
    }

    if (task.assignedTo !== MOCK_CURRENT_USER) {
      setErrorMessage('You cannot mark this task as complete. Only assigned team members can complete tasks.')
      setTimeout(() => setErrorMessage(''), 3000)
      return
    }

    setTasks(tasks.map(t => 
      t.id === taskId ? { ...t, status: 'Completed' } : t
    ))
    setErrorMessage('')
  }

  const handleMarkReminderAsRead = (reminderId: string) => {
    setReminders(reminders.map(r =>
      r.id === reminderId ? { ...r, read: true } : r
    ))
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'text-red-600 bg-red-50 border-red-200'
      case 'Medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'Low': return 'text-green-600 bg-green-50 border-green-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'text-green-700 bg-green-100'
      case 'In Progress': return 'text-blue-700 bg-blue-100'
      case 'Pending': return 'text-gray-700 bg-gray-100'
      default: return 'text-gray-700 bg-gray-100'
    }
  }

  const displayedTasks = selectedFilter === 'my-tasks' 
    ? currentUserTasks 
    : selectedFilter === 'all' 
    ? tasks 
    : currentUserTasks.filter(t => t.reminderSent)

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Team Task Manager</h1>
          <p className="text-gray-600">Manage your tasks and reminders</p>
          <div className="mt-4 flex items-center gap-2">
            <span className="text-sm text-gray-500">Logged in as:</span>
            <span className="text-sm font-medium text-gray-900">{MOCK_CURRENT_USER}</span>
          </div>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">{errorMessage}</span>
            </div>
          </div>
        )}

        {/* Reminders Section */}
        {unreadRemindersCount > 0 && (
          <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-blue-900 flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                </svg>
                Active Reminders
                <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {unreadRemindersCount}
                </span>
              </h2>
            </div>
            <div className="space-y-2">
              {reminders.filter(r => !r.read).map(reminder => {
                const task = tasks.find(t => t.id === reminder.taskId)
                return (
                  <div key={reminder.id} className="bg-white border border-blue-200 rounded p-3 flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm text-gray-800">{reminder.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{new Date(reminder.timestamp).toLocaleString()}</p>
                    </div>
                    <button
                      onClick={() => handleMarkReminderAsRead(reminder.id)}
                      className="ml-4 text-xs text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Mark Read
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Filter Tabs */}
        <div className="mb-6 flex gap-2 border-b border-gray-200">
          <button
            onClick={() => setSelectedFilter('my-tasks')}
            className={`px-4 py-2 font-medium text-sm transition-colors ${
              selectedFilter === 'my-tasks'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            My Tasks ({currentUserTasks.length})
          </button>
          <button
            onClick={() => setSelectedFilter('reminders')}
            className={`px-4 py-2 font-medium text-sm transition-colors ${
              selectedFilter === 'reminders'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Tasks with Reminders
          </button>
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-4 py-2 font-medium text-sm transition-colors ${
              selectedFilter === 'all'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            All Tasks ({tasks.length})
          </button>
        </div>

        {/* Tasks List */}
        <div className="space-y-4">
          {displayedTasks.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
              <p className="text-gray-500">No tasks to display</p>
            </div>
          ) : (
            displayedTasks.map(task => (
              <div
                key={task.id}
                className={`bg-white rounded-lg border shadow-sm p-5 transition-all hover:shadow-md ${
                  task.assignedTo === MOCK_CURRENT_USER ? 'border-blue-200' : 'border-gray-200'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(task.status)}`}>
                        {task.status}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded border font-medium ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>Assigned to: <span className="font-medium">{task.assignedTo}</span></span>
                      <span>Due: <span className="font-medium">{task.dueDate}</span></span>
                      {task.reminderSent && (
                        <span className="flex items-center gap-1 text-blue-600">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                          </svg>
                          Reminder sent
                        </span>
                      )}
                    </div>
                  </div>
                  {task.status !== 'Completed' && (
                    <button
                      onClick={() => handleCompleteTask(task.id)}
                      disabled={task.assignedTo !== MOCK_CURRENT_USER}
                      className={`ml-4 px-4 py-2 rounded font-medium text-sm transition-colors ${
                        task.assignedTo === MOCK_CURRENT_USER
                          ? 'bg-green-600 text-white hover:bg-green-700'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                      title={task.assignedTo !== MOCK_CURRENT_USER ? 'Only assigned team members can complete tasks' : 'Mark as complete'}
                    >
                      Mark Complete
                    </button>
                  )}
                  {task.status === 'Completed' && (
                    <div className="ml-4 flex items-center gap-2 text-green-600">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm font-medium">Completed</span>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
