/**
 * TeamReceive — Task reminder interface for team members to view their assigned tasks
 *
 * Features: task list display, priority indicators, due date reminders, assignment status, task filtering
 *
 * Ticket: SCRUM-737 | Branch: proto/SCRUM-733
 */

import React, { useState } from 'react'

interface Task {
  id: string
  title: string
  description: string
  assignedTo: string
  priority: 'high' | 'medium' | 'low'
  dueDate: string
  status: 'active' | 'pending' | 'completed'
  reminderSent: boolean
  createdAt: string
}

const MOCK_TASKS: Task[] = [
  {
    id: 'task-001',
    title: 'Complete quarterly report',
    description: 'Prepare and submit Q3 performance metrics and analysis',
    assignedTo: 'Sarah Johnson',
    priority: 'high',
    dueDate: '2026-08-15',
    status: 'active',
    reminderSent: true,
    createdAt: '2026-08-01'
  },
  {
    id: 'task-002',
    title: 'Review pull requests',
    description: 'Review and approve pending code changes in the repository',
    assignedTo: 'Sarah Johnson',
    priority: 'medium',
    dueDate: '2026-08-14',
    status: 'active',
    reminderSent: true,
    createdAt: '2026-08-05'
  },
  {
    id: 'task-003',
    title: 'Update documentation',
    description: 'Update API documentation with latest endpoint changes',
    assignedTo: 'Sarah Johnson',
    priority: 'low',
    dueDate: '2026-08-20',
    status: 'active',
    reminderSent: false,
    createdAt: '2026-08-08'
  },
  {
    id: 'task-004',
    title: 'Client meeting preparation',
    description: 'Prepare presentation and demo materials for client showcase',
    assignedTo: 'Sarah Johnson',
    priority: 'high',
    dueDate: '2026-08-13',
    status: 'active',
    reminderSent: true,
    createdAt: '2026-08-10'
  },
  {
    id: 'task-005',
    title: 'Bug fixes for production',
    description: 'Address critical bugs reported in production environment',
    assignedTo: 'Sarah Johnson',
    priority: 'high',
    dueDate: '2026-08-13',
    status: 'active',
    reminderSent: true,
    createdAt: '2026-08-11'
  },
  {
    id: 'task-006',
    title: 'Team standup notes',
    description: 'Document action items from daily standup meetings',
    assignedTo: 'Sarah Johnson',
    priority: 'low',
    dueDate: '2026-08-16',
    status: 'active',
    reminderSent: false,
    createdAt: '2026-08-12'
  }
]

export default function TeamReceive() {
  const [filterPriority, setFilterPriority] = useState<string>('all')
  const [filterReminder, setFilterReminder] = useState<boolean>(false)

  const filteredTasks = MOCK_TASKS.filter(task => {
    const matchesPriority = filterPriority === 'all' || task.priority === filterPriority
    const matchesReminder = !filterReminder || task.reminderSent
    return task.status === 'active' && matchesPriority && matchesReminder
  })

  const getDaysUntilDue = (dueDate: string): number => {
    const today = new Date('2026-08-13')
    const due = new Date(dueDate)
    const diffTime = due.getTime() - today.getTime()
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  const getPriorityColor = (priority: string): string => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-300'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      case 'low':
        return 'bg-green-100 text-green-800 border-green-300'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  const getDueDateColor = (daysUntil: number): string => {
    if (daysUntil < 0) return 'text-red-600 font-semibold'
    if (daysUntil === 0) return 'text-orange-600 font-semibold'
    if (daysUntil <= 2) return 'text-yellow-600 font-medium'
    return 'text-gray-600'
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Task Reminders</h1>
          <p className="text-gray-600">Stay on top of your assigned tasks and deadlines</p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-500">
            <div className="text-2xl font-bold text-gray-900">{filteredTasks.length}</div>
            <div className="text-sm text-gray-600">Active Tasks</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 border-l-4 border-red-500">
            <div className="text-2xl font-bold text-gray-900">
              {filteredTasks.filter(t => t.priority === 'high').length}
            </div>
            <div className="text-sm text-gray-600">High Priority</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 border-l-4 border-yellow-500">
            <div className="text-2xl font-bold text-gray-900">
              {filteredTasks.filter(t => getDaysUntilDue(t.dueDate) <= 2).length}
            </div>
            <div className="text-sm text-gray-600">Due Soon</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 border-l-4 border-green-500">
            <div className="text-2xl font-bold text-gray-900">
              {filteredTasks.filter(t => t.reminderSent).length}
            </div>
            <div className="text-sm text-gray-600">Reminders Sent</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">Priority:</label>
              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={filterReminder}
                  onChange={(e) => setFilterReminder(e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Show only reminded tasks</span>
              </label>
            </div>
          </div>
        </div>

        {/* Task List */}
        <div className="space-y-4">
          {filteredTasks.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <div className="text-gray-400 text-lg">No tasks match your filters</div>
            </div>
          ) : (
            filteredTasks.map((task) => {
              const daysUntil = getDaysUntilDue(task.dueDate)
              return (
                <div
                  key={task.id}
                  className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6 border border-gray-200"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start gap-3 mb-2">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {task.title}
                          </h3>
                          <p className="text-gray-600 text-sm">{task.description}</p>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-3 mt-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(task.priority)}`}>
                          {task.priority.toUpperCase()}
                        </span>
                        
                        {task.reminderSent && (
                          <span className="flex items-center gap-1 text-xs text-blue-600">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                            </svg>
                            Reminder sent
                          </span>
                        )}
                        
                        <span className="text-xs text-gray-500">
                          Assigned to: <span className="font-medium">{task.assignedTo}</span>
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end gap-2 min-w-[140px]">
                      <div className={`text-sm ${getDueDateColor(daysUntil)}`}>
                        {daysUntil < 0 ? (
                          <span>Overdue by {Math.abs(daysUntil)} days</span>
                        ) : daysUntil === 0 ? (
                          <span>Due today</span>
                        ) : daysUntil === 1 ? (
                          <span>Due tomorrow</span>
                        ) : (
                          <span>Due in {daysUntil} days</span>
                        )}
                      </div>
                      <div className="text-xs text-gray-500">{task.dueDate}</div>
                      <button className="mt-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition-colors">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
