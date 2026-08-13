/**
 * BuildTaskDetails — Displays detailed task information with status, assignee, priority, and activity history
 *
 * Features: task metadata display, status indicator, priority badges, assignee info, activity timeline
 *
 * Ticket: SCRUM-744 | Branch: proto/SCRUM-733
 */

import React, { useState } from 'react'

interface Task {
  id: string
  title: string
  description: string
  status: 'todo' | 'in-progress' | 'review' | 'done'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  assignee: {
    name: string
    email: string
    avatar: string
  }
  reporter: {
    name: string
    email: string
  }
  createdAt: string
  updatedAt: string
  dueDate: string
  tags: string[]
  estimatedHours: number
  actualHours: number
}

interface Activity {
  id: string
  user: string
  action: string
  timestamp: string
  details?: string
}

const MOCK_TASK: Task = {
  id: 'TSK-1001',
  title: 'Implement user authentication system',
  description: 'Create a secure authentication system with JWT tokens, password hashing, and session management. Include login, logout, and password reset functionality. Ensure proper error handling and validation.',
  status: 'in-progress',
  priority: 'high',
  assignee: {
    name: 'Sarah Johnson',
    email: 'sarah.j@company.com',
    avatar: 'SJ'
  },
  reporter: {
    name: 'Michael Chen',
    email: 'michael.c@company.com'
  },
  createdAt: '2026-08-01T09:00:00Z',
  updatedAt: '2026-08-13T14:30:00Z',
  dueDate: '2026-08-20T17:00:00Z',
  tags: ['backend', 'security', 'authentication'],
  estimatedHours: 16,
  actualHours: 10
}

const MOCK_ACTIVITIES: Activity[] = [
  {
    id: 'act-1',
    user: 'Sarah Johnson',
    action: 'Status changed',
    timestamp: '2026-08-13T14:30:00Z',
    details: 'from "To Do" to "In Progress"'
  },
  {
    id: 'act-2',
    user: 'Michael Chen',
    action: 'Comment added',
    timestamp: '2026-08-13T10:15:00Z',
    details: 'Please prioritize the password reset flow first'
  },
  {
    id: 'act-3',
    user: 'Sarah Johnson',
    action: 'Assigned to',
    timestamp: '2026-08-12T16:45:00Z',
    details: 'Sarah Johnson'
  },
  {
    id: 'act-4',
    user: 'Michael Chen',
    action: 'Priority changed',
    timestamp: '2026-08-11T11:20:00Z',
    details: 'from "Medium" to "High"'
  },
  {
    id: 'act-5',
    user: 'Michael Chen',
    action: 'Task created',
    timestamp: '2026-08-01T09:00:00Z',
    details: 'Initial task setup'
  }
]

export default function BuildTaskDetails() {
  const [activeTab, setActiveTab] = useState<'details' | 'activity'>('details')

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'todo':
        return 'bg-gray-100 text-gray-700 border-gray-300'
      case 'in-progress':
        return 'bg-blue-100 text-blue-700 border-blue-300'
      case 'review':
        return 'bg-purple-100 text-purple-700 border-purple-300'
      case 'done':
        return 'bg-green-100 text-green-700 border-green-300'
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low':
        return 'bg-gray-100 text-gray-600 border-gray-300'
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300'
      case 'high':
        return 'bg-orange-100 text-orange-700 border-orange-300'
      case 'urgent':
        return 'bg-red-100 text-red-700 border-red-300'
      default:
        return 'bg-gray-100 text-gray-600 border-gray-300'
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMins / 60)
    const diffDays = Math.floor(diffHours / 24)

    if (diffMins < 60) return `${diffMins} minutes ago`
    if (diffHours < 24) return `${diffHours} hours ago`
    return `${diffDays} days ago`
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-sm font-medium text-gray-500">{MOCK_TASK.id}</span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(MOCK_TASK.status)}`}>
                  {MOCK_TASK.status.replace('-', ' ').toUpperCase()}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(MOCK_TASK.priority)}`}>
                  {MOCK_TASK.priority.toUpperCase()}
                </span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{MOCK_TASK.title}</h1>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span>Created {formatDate(MOCK_TASK.createdAt)}</span>
                <span>•</span>
                <span>Updated {getTimeAgo(MOCK_TASK.updatedAt)}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm">
                Edit Task
              </button>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium text-sm">
                Delete
              </button>
            </div>
          </div>

          {/* Tags */}
          <div className="flex gap-2 flex-wrap">
            {MOCK_TASK.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-md text-xs font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-3 gap-6">
          {/* Left Column - Details */}
          <div className="col-span-2 space-y-6">
            {/* Tabs */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="border-b border-gray-200">
                <div className="flex">
                  <button
                    onClick={() => setActiveTab('details')}
                    className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
                      activeTab === 'details'
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Details
                  </button>
                  <button
                    onClick={() => setActiveTab('activity')}
                    className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
                      activeTab === 'activity'
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Activity
                  </button>
                </div>
              </div>

              <div className="p-6">
                {activeTab === 'details' ? (
                  <div className="space-y-6">
                    {/* Description */}
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-2">Description</h3>
                      <p className="text-gray-700 leading-relaxed">{MOCK_TASK.description}</p>
                    </div>

                    {/* Time Tracking */}
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-3">Time Tracking</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Estimated</span>
                          <span className="font-medium text-gray-900">{MOCK_TASK.estimatedHours}h</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Logged</span>
                          <span className="font-medium text-gray-900">{MOCK_TASK.actualHours}h</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Remaining</span>
                          <span className="font-medium text-gray-900">
                            {MOCK_TASK.estimatedHours - MOCK_TASK.actualHours}h
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{
                              width: `${Math.min((MOCK_TASK.actualHours / MOCK_TASK.estimatedHours) * 100, 100)}%`
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    {/* Comments Section */}
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-3">Comments</h3>
                      <textarea
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        rows={4}
                        placeholder="Add a comment..."
                      ></textarea>
                      <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm">
                        Add Comment
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {MOCK_ACTIVITIES.map((activity, index) => (
                      <div key={activity.id} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-medium">
                            {activity.user.split(' ').map((n) => n[0]).join('')}
                          </div>
                          {index < MOCK_ACTIVITIES.length - 1 && (
                            <div className="w-0.5 h-full bg-gray-200 mt-2"></div>
                          )}
                        </div>
                        <div className="flex-1 pb-4">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-gray-900">{activity.user}</span>
                            <span className="text-gray-600 text-sm">{activity.action}</span>
                          </div>
                          {activity.details && (
                            <p className="text-sm text-gray-600 mb-1">{activity.details}</p>
                          )}
                          <span className="text-xs text-gray-500">{getTimeAgo(activity.timestamp)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Assignee */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Assignee</h3>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-medium">
                  {MOCK_TASK.assignee.avatar}
                </div>
                <div>
                  <div className="font-medium text-gray-900">{MOCK_TASK.assignee.name}</div>
                  <div className="text-sm text-gray-600">{MOCK_TASK.assignee.email}</div>
                </div>
              </div>
            </div>

            {/* Reporter */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Reporter</h3>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-medium">
                  {MOCK_TASK.reporter.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <div className="font-medium text-gray-900">{MOCK_TASK.reporter.name}</div>
                  <div className="text-sm text-gray-600">{MOCK_TASK.reporter.email}</div>
                </div>
              </div>
            </div>

            {/* Dates */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Dates</h3>
              <div className="space-y-3">
                <div>
                  <div className="text-xs text-gray-600 mb-1">Created</div>
                  <div className="text-sm font-medium text-gray-900">{formatDate(MOCK_TASK.createdAt)}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-600 mb-1">Due Date</div>
                  <div className="text-sm font-medium text-orange-600">{formatDate(MOCK_TASK.dueDate)}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-600 mb-1">Last Updated</div>
                  <div className="text-sm font-medium text-gray-900">{formatDate(MOCK_TASK.updatedAt)}</div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium text-sm text-left">
                  Change Status
                </button>
                <button className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium text-sm text-left">
                  Update Priority
                </button>
                <button className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium text-sm text-left">
                  Reassign Task
                </button>
                <button className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium text-sm text-left">
                  Log Time
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
