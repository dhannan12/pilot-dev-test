/**
 * SystemCalculatesThe — Calculates and displays the pending count of tasks
 *
 * Features: task list display, pending count calculation, status filtering, real-time count updates, visual status indicators
 *
 * Ticket: SCRUM-849 | Branch: proto/SCRUM-841
 */

import React from 'react'

interface Task {
  id: number
  title: string
  status: 'pending' | 'completed' | 'in-progress'
  priority: 'low' | 'medium' | 'high'
  dueDate: string
}

const MOCK_TASKS: Task[] = [
  {
    id: 1,
    title: 'Review and approve project proposal',
    status: 'pending',
    priority: 'high',
    dueDate: '2026-08-15'
  },
  {
    id: 2,
    title: 'Update client documentation',
    status: 'pending',
    priority: 'medium',
    dueDate: '2026-08-16'
  },
  {
    id: 3,
    title: 'Fix critical bug in production',
    status: 'completed',
    priority: 'high',
    dueDate: '2026-08-12'
  },
  {
    id: 4,
    title: 'Conduct team code review',
    status: 'in-progress',
    priority: 'medium',
    dueDate: '2026-08-14'
  },
  {
    id: 5,
    title: 'Prepare quarterly presentation',
    status: 'pending',
    priority: 'high',
    dueDate: '2026-08-17'
  },
  {
    id: 6,
    title: 'Update dependencies and packages',
    status: 'pending',
    priority: 'low',
    dueDate: '2026-08-20'
  },
  {
    id: 7,
    title: 'Write unit tests for new features',
    status: 'pending',
    priority: 'medium',
    dueDate: '2026-08-18'
  },
  {
    id: 8,
    title: 'Deploy staging environment',
    status: 'completed',
    priority: 'medium',
    dueDate: '2026-08-13'
  }
]

export default function SystemCalculatesThe() {
  // Calculate pending count
  const pendingCount = MOCK_TASKS.filter(task => task.status === 'pending').length
  const completedCount = MOCK_TASKS.filter(task => task.status === 'completed').length
  const inProgressCount = MOCK_TASKS.filter(task => task.status === 'in-progress').length
  const totalCount = MOCK_TASKS.length

  // Get pending tasks
  const pendingTasks = MOCK_TASKS.filter(task => task.status === 'pending')

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-300'
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 border-blue-300'
    }
  }

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 font-semibold'
      case 'medium':
        return 'text-orange-600 font-medium'
      case 'low':
        return 'text-gray-600'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Task Manager</h1>
          <p className="text-gray-600">System calculates pending task counts automatically</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-gray-400">
            <div className="text-sm text-gray-600 mb-1">Total Tasks</div>
            <div className="text-3xl font-bold text-gray-900">{totalCount}</div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-400">
            <div className="text-sm text-gray-600 mb-1">Pending Tasks</div>
            <div className="text-3xl font-bold text-yellow-600">{pendingCount}</div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-400">
            <div className="text-sm text-gray-600 mb-1">In Progress</div>
            <div className="text-3xl font-bold text-blue-600">{inProgressCount}</div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-400">
            <div className="text-sm text-gray-600 mb-1">Completed</div>
            <div className="text-3xl font-bold text-green-600">{completedCount}</div>
          </div>
        </div>

        {/* Pending Tasks Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Pending Tasks
              <span className="ml-2 px-3 py-1 text-sm bg-yellow-100 text-yellow-800 rounded-full">
                {pendingCount}
              </span>
            </h2>
          </div>

          <div className="space-y-3">
            {pendingTasks.map(task => (
              <div
                key={task.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-medium text-gray-900">{task.title}</h3>
                      <span className={`px-2 py-1 text-xs rounded border ${getStatusColor(task.status)}`}>
                        {task.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <span className={getPriorityColor(task.priority)}>
                        Priority: {task.priority.toUpperCase()}
                      </span>
                      <span className="text-gray-600">
                        Due: {new Date(task.dueDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* All Tasks Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">All Tasks</h2>
          
          <div className="space-y-3">
            {MOCK_TASKS.map(task => (
              <div
                key={task.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-medium text-gray-900">{task.title}</h3>
                      <span className={`px-2 py-1 text-xs rounded border ${getStatusColor(task.status)}`}>
                        {task.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <span className={getPriorityColor(task.priority)}>
                        Priority: {task.priority.toUpperCase()}
                      </span>
                      <span className="text-gray-600">
                        Due: {new Date(task.dueDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
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
