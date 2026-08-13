/**
 * TaskIs — Displays tasks due within 24-48 hours with notification alerts
 *
 * Features: task notifications, due date tracking, 24-hour alerts, 48-hour warnings, priority indicators
 *
 * Ticket: SCRUM-735 | Branch: proto/SCRUM-733
 */

import React, { useState } from 'react'

interface Task {
  id: string
  title: string
  description: string
  dueDate: Date
  priority: 'high' | 'medium' | 'low'
  assignee: string
  status: 'pending' | 'in-progress' | 'completed'
}

const MOCK_TASKS: Task[] = [
  {
    id: '1',
    title: 'Complete quarterly financial report',
    description: 'Finalize Q3 financial statements and submit to stakeholders',
    dueDate: new Date(Date.now() + 20 * 60 * 60 * 1000), // Due in 20 hours
    priority: 'high',
    assignee: 'Sarah Chen',
    status: 'in-progress'
  },
  {
    id: '2',
    title: 'Update customer database',
    description: 'Import new customer records and verify data integrity',
    dueDate: new Date(Date.now() + 36 * 60 * 60 * 1000), // Due in 36 hours
    priority: 'medium',
    assignee: 'Mike Johnson',
    status: 'pending'
  },
  {
    id: '3',
    title: 'Deploy security patches',
    description: 'Apply critical security updates to production servers',
    dueDate: new Date(Date.now() + 18 * 60 * 60 * 1000), // Due in 18 hours
    priority: 'high',
    assignee: 'Alex Rodriguez',
    status: 'in-progress'
  },
  {
    id: '4',
    title: 'Prepare team presentation',
    description: 'Create slides for weekly team sync meeting',
    dueDate: new Date(Date.now() + 44 * 60 * 60 * 1000), // Due in 44 hours
    priority: 'low',
    assignee: 'Emily Davis',
    status: 'pending'
  },
  {
    id: '5',
    title: 'Review code pull requests',
    description: 'Review and approve pending PRs from development team',
    dueDate: new Date(Date.now() + 28 * 60 * 60 * 1000), // Due in 28 hours
    priority: 'medium',
    assignee: 'Chris Park',
    status: 'in-progress'
  },
  {
    id: '6',
    title: 'Client onboarding call',
    description: 'Schedule and conduct onboarding session with new client',
    dueDate: new Date(Date.now() + 22 * 60 * 60 * 1000), // Due in 22 hours
    priority: 'high',
    assignee: 'Jennifer Lee',
    status: 'pending'
  },
  {
    id: '7',
    title: 'Backup production database',
    description: 'Perform scheduled backup of all production databases',
    dueDate: new Date(Date.now() + 46 * 60 * 60 * 1000), // Due in 46 hours
    priority: 'medium',
    assignee: 'David Kumar',
    status: 'pending'
  }
]

export default function TaskIs() {
  const [selectedFilter, setSelectedFilter] = useState<'all' | '24h' | '48h'>('all')
  const [dismissedNotifications, setDismissedNotifications] = useState<Set<string>>(new Set())

  const getHoursUntilDue = (dueDate: Date): number => {
    const now = new Date()
    const diff = dueDate.getTime() - now.getTime()
    return Math.floor(diff / (1000 * 60 * 60))
  }

  const getTasksWithinTimeframe = () => {
    return MOCK_TASKS.filter(task => {
      const hours = getHoursUntilDue(task.dueDate)
      if (selectedFilter === '24h') {
        return hours >= 0 && hours <= 24
      } else if (selectedFilter === '48h') {
        return hours > 24 && hours <= 48
      }
      return hours >= 0 && hours <= 48
    })
  }

  const getDueDateColor = (hours: number): string => {
    if (hours <= 24) return 'text-red-600 bg-red-50 border-red-200'
    if (hours <= 48) return 'text-orange-600 bg-orange-50 border-orange-200'
    return 'text-gray-600 bg-gray-50 border-gray-200'
  }

  const getPriorityColor = (priority: string): string => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-300'
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      case 'low': return 'bg-green-100 text-green-800 border-green-300'
      default: return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'in-progress': return 'bg-blue-100 text-blue-800'
      case 'pending': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDueDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const dismissNotification = (taskId: string) => {
    setDismissedNotifications(prev => new Set(prev).add(taskId))
  }

  const filteredTasks = getTasksWithinTimeframe()
  const urgentTasksCount = MOCK_TASKS.filter(t => getHoursUntilDue(t.dueDate) <= 24 && getHoursUntilDue(t.dueDate) >= 0).length
  const warningTasksCount = MOCK_TASKS.filter(t => {
    const hours = getHoursUntilDue(t.dueDate)
    return hours > 24 && hours <= 48
  }).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Task Notifications</h1>
              <p className="text-gray-600 mt-1">Tasks due within the next 48 hours</p>
            </div>
            <div className="flex gap-3">
              <div className="text-center px-4 py-2 bg-red-50 border-2 border-red-200 rounded-lg">
                <div className="text-2xl font-bold text-red-600">{urgentTasksCount}</div>
                <div className="text-xs text-red-600 font-medium">Due in 24h</div>
              </div>
              <div className="text-center px-4 py-2 bg-orange-50 border-2 border-orange-200 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">{warningTasksCount}</div>
                <div className="text-xs text-orange-600 font-medium">Due in 48h</div>
              </div>
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedFilter === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Tasks ({MOCK_TASKS.filter(t => {
                const h = getHoursUntilDue(t.dueDate)
                return h >= 0 && h <= 48
              }).length})
            </button>
            <button
              onClick={() => setSelectedFilter('24h')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedFilter === '24h'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Due in 24h ({urgentTasksCount})
            </button>
            <button
              onClick={() => setSelectedFilter('48h')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedFilter === '48h'
                  ? 'bg-orange-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Due in 48h ({warningTasksCount})
            </button>
          </div>
        </div>

        {/* Global Notifications Banner */}
        {urgentTasksCount > 0 && !dismissedNotifications.has('global-alert') && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-lg shadow-sm">
            <div className="flex items-start justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Urgent: {urgentTasksCount} task{urgentTasksCount !== 1 ? 's' : ''} due within 24 hours</h3>
                  <p className="text-sm text-red-700 mt-1">Please review and prioritize these tasks immediately.</p>
                </div>
              </div>
              <button
                onClick={() => dismissNotification('global-alert')}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Tasks List */}
        <div className="space-y-4">
          {filteredTasks.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">No tasks found</h3>
              <p className="mt-1 text-gray-500">No tasks match the selected filter criteria.</p>
            </div>
          ) : (
            filteredTasks.map(task => {
              const hoursUntilDue = getHoursUntilDue(task.dueDate)
              const isDismissed = dismissedNotifications.has(task.id)

              return (
                <div
                  key={task.id}
                  className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow ${
                    hoursUntilDue <= 24 ? 'border-l-4 border-red-500' : 'border-l-4 border-orange-500'
                  }`}
                >
                  {/* Task Notification Banner */}
                  {!isDismissed && hoursUntilDue <= 24 && (
                    <div className="bg-red-50 px-6 py-2 flex items-center justify-between border-b border-red-100">
                      <div className="flex items-center gap-2 text-red-700 text-sm font-medium">
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        <span>⚠️ Due in {hoursUntilDue} hours - Immediate action required</span>
                      </div>
                      <button
                        onClick={() => dismissNotification(task.id)}
                        className="text-red-500 hover:text-red-700 text-xs"
                      >
                        Dismiss
                      </button>
                    </div>
                  )}
                  {!isDismissed && hoursUntilDue > 24 && hoursUntilDue <= 48 && (
                    <div className="bg-orange-50 px-6 py-2 flex items-center justify-between border-b border-orange-100">
                      <div className="flex items-center gap-2 text-orange-700 text-sm font-medium">
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        <span>⏰ Due in {hoursUntilDue} hours - Plan accordingly</span>
                      </div>
                      <button
                        onClick={() => dismissNotification(task.id)}
                        className="text-orange-500 hover:text-orange-700 text-xs"
                      >
                        Dismiss
                      </button>
                    </div>
                  )}

                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-1">{task.title}</h3>
                        <p className="text-gray-600 text-sm">{task.description}</p>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getPriorityColor(task.priority)}`}>
                          {task.priority.toUpperCase()}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(task.status)}`}>
                          {task.status.replace('-', ' ').toUpperCase()}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                          </svg>
                          <span className="text-sm text-gray-700 font-medium">{task.assignee}</span>
                        </div>
                        <div className={`flex items-center gap-2 px-3 py-1 rounded-lg border ${getDueDateColor(hoursUntilDue)}`}>
                          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                          </svg>
                          <span className="text-xs font-bold">
                            {formatDueDate(task.dueDate)} ({hoursUntilDue}h remaining)
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                          View Details
                        </button>
                        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                          Mark Complete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>

        {/* Summary Footer */}
        <div className="mt-6 bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">
              Showing {filteredTasks.length} of {MOCK_TASKS.filter(t => {
                const h = getHoursUntilDue(t.dueDate)
                return h >= 0 && h <= 48
              }).length} tasks due within 48 hours
            </span>
            <span className="text-gray-500">
              Last updated: {new Date().toLocaleTimeString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
