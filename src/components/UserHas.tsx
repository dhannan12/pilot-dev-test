/**
 * UserHas — Displays user tasks organized by priority level (high, medium, low)
 *
 * Features: priority-based task ordering, task completion tracking, visual priority indicators, completion status display, task filtering by priority
 *
 * Ticket: SCRUM-740 | Branch: proto/SCRUM-733
 */

import React, { useState } from 'react'

interface Task {
  id: number
  title: string
  description: string
  priority: 'high' | 'medium' | 'low'
  completed: boolean
  dueDate: string
}

const MOCK_TASKS: Task[] = [
  {
    id: 1,
    title: 'Fix critical production bug',
    description: 'Memory leak causing server crashes',
    priority: 'high',
    completed: false,
    dueDate: '2026-08-14'
  },
  {
    id: 2,
    title: 'Security vulnerability patch',
    description: 'Update dependencies to address CVE-2026-1234',
    priority: 'high',
    completed: false,
    dueDate: '2026-08-15'
  },
  {
    id: 3,
    title: 'Complete user authentication refactor',
    description: 'Migrate to OAuth 2.0 authentication system',
    priority: 'high',
    completed: true,
    dueDate: '2026-08-13'
  },
  {
    id: 4,
    title: 'Update API documentation',
    description: 'Document new endpoints and response formats',
    priority: 'medium',
    completed: false,
    dueDate: '2026-08-18'
  },
  {
    id: 5,
    title: 'Optimize database queries',
    description: 'Add indexes and refactor slow queries',
    priority: 'medium',
    completed: false,
    dueDate: '2026-08-20'
  },
  {
    id: 6,
    title: 'Implement dark mode',
    description: 'Add dark theme support across application',
    priority: 'low',
    completed: false,
    dueDate: '2026-08-25'
  },
  {
    id: 7,
    title: 'Update README file',
    description: 'Add installation instructions and examples',
    priority: 'low',
    completed: true,
    dueDate: '2026-08-12'
  },
  {
    id: 8,
    title: 'Refactor CSS styles',
    description: 'Consolidate duplicate styles and improve organization',
    priority: 'low',
    completed: false,
    dueDate: '2026-08-30'
  }
]

export default function UserHas() {
  const [tasks] = useState<Task[]>(MOCK_TASKS)

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

  const getPriorityOrder = (priority: string): number => {
    switch (priority) {
      case 'high':
        return 1
      case 'medium':
        return 2
      case 'low':
        return 3
      default:
        return 4
    }
  }

  // Sort tasks: high priority first, then medium, then low
  // Within each priority, incomplete tasks come before completed tasks
  const sortedTasks = [...tasks].sort((a, b) => {
    const priorityDiff = getPriorityOrder(a.priority) - getPriorityOrder(b.priority)
    if (priorityDiff !== 0) return priorityDiff
    
    // Within same priority, incomplete tasks first
    if (a.completed === b.completed) return 0
    return a.completed ? 1 : -1
  })

  const highPriorityTasks = sortedTasks.filter(t => t.priority === 'high')
  const mediumPriorityTasks = sortedTasks.filter(t => t.priority === 'medium')
  const lowPriorityTasks = sortedTasks.filter(t => t.priority === 'low')

  const highPriorityIncomplete = highPriorityTasks.filter(t => !t.completed).length

  const renderTaskList = (taskList: Task[], priority: 'high' | 'medium' | 'low') => {
    const isBlocked = priority !== 'high' && highPriorityIncomplete > 0

    return (
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold capitalize flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getPriorityColor(priority)}`}>
              {priority}
            </span>
            <span className="text-gray-600">Priority ({taskList.length})</span>
          </h3>
          {isBlocked && (
            <span className="text-sm text-red-600 font-medium bg-red-50 px-3 py-1 rounded-full border border-red-200">
              ⚠ Blocked by {highPriorityIncomplete} high priority task{highPriorityIncomplete !== 1 ? 's' : ''}
            </span>
          )}
        </div>
        
        <div className="space-y-3">
          {taskList.map(task => (
            <div
              key={task.id}
              className={`p-4 rounded-lg border-2 transition-all ${
                task.completed
                  ? 'bg-gray-50 border-gray-200 opacity-60'
                  : isBlocked
                  ? 'bg-gray-100 border-gray-300'
                  : 'bg-white border-gray-200 shadow-sm hover:shadow-md'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    disabled
                    className="mt-1 h-5 w-5 rounded border-gray-300"
                  />
                  <div className="flex-1">
                    <h4 className={`font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                      {task.title}
                    </h4>
                    <p className={`text-sm mt-1 ${task.completed ? 'text-gray-400' : 'text-gray-600'}`}>
                      {task.description}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                      <span>Due: {task.dueDate}</span>
                      {task.completed && <span className="text-green-600 font-medium">✓ Completed</span>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Tasks</h1>
          <p className="text-gray-600 mb-4">
            Priority-based task management. High priority tasks must be completed before medium or low priority tasks.
          </p>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h2 className="font-semibold text-blue-900 mb-2">Task Priority Rules</h2>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• <strong>High Priority:</strong> Critical tasks that must be completed first</li>
              <li>• <strong>Medium Priority:</strong> Important tasks, blocked until high priority tasks are done</li>
              <li>• <strong>Low Priority:</strong> Nice-to-have tasks, blocked until high priority tasks are done</li>
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          {renderTaskList(highPriorityTasks, 'high')}
          {renderTaskList(mediumPriorityTasks, 'medium')}
          {renderTaskList(lowPriorityTasks, 'low')}
        </div>
      </div>
    </div>
  )
}
