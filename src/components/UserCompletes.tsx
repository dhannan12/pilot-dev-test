/**
 * UserCompletes — Tracks design tasks completed by users and their feedback submission status
 *
 * Features: 7-day feedback deadline tracking, visual feedback status indicators, overdue warnings, completion timeline display, automatic feedback requirement enforcement
 *
 * Ticket: SCRUM-741 | Branch: proto/SCRUM-733
 */

import React, { useState } from 'react'

interface DesignTask {
  id: number
  title: string
  description: string
  completedDate: string
  feedbackSubmittedDate: string | null
  feedbackRequired: boolean
  designer: string
  category: string
}

const MOCK_DESIGN_TASKS: DesignTask[] = [
  {
    id: 1,
    title: 'Homepage Hero Section Redesign',
    description: 'Modern hero section with improved call-to-action buttons',
    completedDate: '2026-08-01',
    feedbackSubmittedDate: null,
    feedbackRequired: true,
    designer: 'Sarah Chen',
    category: 'Web Design'
  },
  {
    id: 2,
    title: 'Mobile App Navigation Update',
    description: 'Streamlined navigation menu for better user experience',
    completedDate: '2026-08-06',
    feedbackSubmittedDate: '2026-08-10',
    feedbackRequired: true,
    designer: 'Michael Torres',
    category: 'Mobile Design'
  },
  {
    id: 3,
    title: 'Dashboard Analytics Widget',
    description: 'Interactive data visualization for user metrics',
    completedDate: '2026-08-09',
    feedbackSubmittedDate: null,
    feedbackRequired: true,
    designer: 'Emily Johnson',
    category: 'UI Design'
  },
  {
    id: 4,
    title: 'Login Page Accessibility Improvements',
    description: 'Enhanced accessibility features for login experience',
    completedDate: '2026-08-11',
    feedbackSubmittedDate: '2026-08-12',
    feedbackRequired: true,
    designer: 'David Kim',
    category: 'Web Design'
  },
  {
    id: 5,
    title: 'Product Card Component Redesign',
    description: 'Modernized product cards with hover effects',
    completedDate: '2026-08-05',
    feedbackSubmittedDate: null,
    feedbackRequired: true,
    designer: 'Alex Rivera',
    category: 'UI Design'
  },
  {
    id: 6,
    title: 'Email Template Design',
    description: 'Responsive email templates for marketing campaigns',
    completedDate: '2026-08-12',
    feedbackSubmittedDate: null,
    feedbackRequired: true,
    designer: 'Jessica Park',
    category: 'Email Design'
  },
  {
    id: 7,
    title: 'Checkout Flow Optimization',
    description: 'Simplified checkout process with progress indicators',
    completedDate: '2026-08-03',
    feedbackSubmittedDate: '2026-08-07',
    feedbackRequired: true,
    designer: 'Robert Martinez',
    category: 'UX Design'
  },
  {
    id: 8,
    title: 'Dark Mode Implementation',
    description: 'Complete dark mode theme for entire application',
    completedDate: '2026-08-10',
    feedbackSubmittedDate: null,
    feedbackRequired: true,
    designer: 'Olivia Thompson',
    category: 'UI Design'
  }
]

export default function UserCompletes() {
  const [tasks] = useState<DesignTask[]>(MOCK_DESIGN_TASKS)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const calculateDaysSinceCompletion = (completedDate: string): number => {
    const today = new Date('2026-08-13') // Current date from system
    const completed = new Date(completedDate)
    const diffTime = today.getTime() - completed.getTime()
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const getFeedbackStatus = (task: DesignTask): {
    status: 'submitted' | 'pending' | 'overdue'
    daysRemaining: number
    message: string
  } => {
    if (task.feedbackSubmittedDate) {
      return {
        status: 'submitted',
        daysRemaining: 0,
        message: 'Feedback submitted'
      }
    }

    const daysSinceCompletion = calculateDaysSinceCompletion(task.completedDate)
    const daysRemaining = 7 - daysSinceCompletion

    if (daysRemaining <= 0) {
      return {
        status: 'overdue',
        daysRemaining: Math.abs(daysRemaining),
        message: `Overdue by ${Math.abs(daysRemaining)} day${Math.abs(daysRemaining) !== 1 ? 's' : ''}`
      }
    }

    return {
      status: 'pending',
      daysRemaining,
      message: `${daysRemaining} day${daysRemaining !== 1 ? 's' : ''} remaining`
    }
  }

  const getStatusColor = (status: 'submitted' | 'pending' | 'overdue'): string => {
    switch (status) {
      case 'submitted':
        return 'bg-green-100 text-green-800 border-green-300'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      case 'overdue':
        return 'bg-red-100 text-red-800 border-red-300'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  const categories = ['all', ...Array.from(new Set(tasks.map(t => t.category)))]

  const filteredTasks = selectedCategory === 'all'
    ? tasks
    : tasks.filter(t => t.category === selectedCategory)

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    const statusA = getFeedbackStatus(a)
    const statusB = getFeedbackStatus(b)

    // Sort by status: overdue first, then pending, then submitted
    const statusOrder = { overdue: 1, pending: 2, submitted: 3 }
    const statusDiff = statusOrder[statusA.status] - statusOrder[statusB.status]
    if (statusDiff !== 0) return statusDiff

    // Within same status, sort by completion date (most recent first for pending/overdue)
    if (statusA.status !== 'submitted') {
      return new Date(b.completedDate).getTime() - new Date(a.completedDate).getTime()
    }
    return new Date(b.completedDate).getTime() - new Date(a.completedDate).getTime()
  })

  const overdueCount = tasks.filter(t => getFeedbackStatus(t).status === 'overdue').length
  const pendingCount = tasks.filter(t => getFeedbackStatus(t).status === 'pending').length
  const submittedCount = tasks.filter(t => getFeedbackStatus(t).status === 'submitted').length

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Design Task Feedback Tracker</h1>
          <p className="text-gray-600 mb-4">
            Track completed design tasks and ensure feedback is submitted within 7 days.
          </p>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
            <h2 className="font-semibold text-amber-900 mb-2 flex items-center gap-2">
              <span className="text-xl">⚠️</span>
              Feedback Policy
            </h2>
            <p className="text-sm text-amber-800">
              All completed design tasks require user feedback within <strong>7 days</strong> of task completion.
              Overdue tasks are highlighted and require immediate attention.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
              <div className="text-3xl font-bold text-red-700">{overdueCount}</div>
              <div className="text-sm text-red-600 font-medium">Overdue Tasks</div>
            </div>
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4">
              <div className="text-3xl font-bold text-yellow-700">{pendingCount}</div>
              <div className="text-sm text-yellow-600 font-medium">Pending Feedback</div>
            </div>
            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
              <div className="text-3xl font-bold text-green-700">{submittedCount}</div>
              <div className="text-sm text-green-600 font-medium">Feedback Submitted</div>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <label className="text-sm font-medium text-gray-700">Filter by category:</label>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {category === 'all' ? 'All Tasks' : category}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {sortedTasks.map(task => {
            const feedbackStatus = getFeedbackStatus(task)
            const daysSinceCompletion = calculateDaysSinceCompletion(task.completedDate)

            return (
              <div
                key={task.id}
                className={`bg-white rounded-lg border-2 p-5 shadow-sm transition-all ${
                  feedbackStatus.status === 'overdue'
                    ? 'border-red-300 shadow-red-100'
                    : feedbackStatus.status === 'pending'
                    ? 'border-yellow-300'
                    : 'border-green-300 opacity-75'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
                      <span className="px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700">
                        {task.category}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>Designer: <strong>{task.designer}</strong></span>
                      <span>•</span>
                      <span>Completed: <strong>{task.completedDate}</strong></span>
                      <span>•</span>
                      <span>{daysSinceCompletion} day{daysSinceCompletion !== 1 ? 's' : ''} ago</span>
                    </div>
                    {task.feedbackSubmittedDate && (
                      <div className="text-xs text-green-600 mt-1">
                        Feedback submitted on: <strong>{task.feedbackSubmittedDate}</strong>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <span className={`px-4 py-2 rounded-full text-sm font-semibold border-2 whitespace-nowrap ${getStatusColor(feedbackStatus.status)}`}>
                      {feedbackStatus.message}
                    </span>
                    {feedbackStatus.status === 'overdue' && (
                      <button className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors">
                        Submit Feedback Now
                      </button>
                    )}
                    {feedbackStatus.status === 'pending' && feedbackStatus.daysRemaining <= 2 && (
                      <button className="px-4 py-2 bg-yellow-600 text-white text-sm font-medium rounded-lg hover:bg-yellow-700 transition-colors">
                        Submit Feedback
                      </button>
                    )}
                    {feedbackStatus.status === 'submitted' && (
                      <span className="text-xs text-green-600 font-medium flex items-center gap-1">
                        <span className="text-lg">✓</span> Complete
                      </span>
                    )}
                  </div>
                </div>

                {feedbackStatus.status !== 'submitted' && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`absolute left-0 top-0 h-full transition-all ${
                          feedbackStatus.status === 'overdue'
                            ? 'bg-red-500 w-full'
                            : 'bg-yellow-500'
                        }`}
                        style={{
                          width: feedbackStatus.status === 'pending'
                            ? `${((7 - feedbackStatus.daysRemaining) / 7) * 100}%`
                            : '100%'
                        }}
                      />
                    </div>
                    <div className="text-xs text-gray-500 mt-1 text-right">
                      {feedbackStatus.status === 'pending'
                        ? `Day ${daysSinceCompletion} of 7`
                        : `${daysSinceCompletion} days since completion`}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {sortedTasks.length === 0 && (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="text-gray-400 text-5xl mb-4">📋</div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">No tasks found</h3>
            <p className="text-sm text-gray-500">Try selecting a different category filter.</p>
          </div>
        )}
      </div>
    </div>
  )
}
