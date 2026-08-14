/**
 * SystemCalculatesThe — Calculates and displays the completed count of tasks
 *
 * Features: task list display, completion status tracking, automatic count calculation, visual status indicators, progress summary
 *
 * Ticket: SCRUM-845 | Branch: proto/SCRUM-841
 */

import React from 'react'

interface Task {
  id: number
  title: string
  description: string
  completed: boolean
  dueDate: string
}

const MOCK_TASKS: Task[] = [
  {
    id: 1,
    title: 'Design landing page mockup',
    description: 'Create wireframes and high-fidelity mockups for the new landing page',
    completed: true,
    dueDate: '2026-08-10'
  },
  {
    id: 2,
    title: 'Implement user authentication',
    description: 'Set up JWT-based authentication with refresh token support',
    completed: true,
    dueDate: '2026-08-12'
  },
  {
    id: 3,
    title: 'Write API documentation',
    description: 'Document all REST endpoints with examples and response schemas',
    completed: false,
    dueDate: '2026-08-15'
  },
  {
    id: 4,
    title: 'Configure CI/CD pipeline',
    description: 'Set up automated testing and deployment workflows',
    completed: true,
    dueDate: '2026-08-11'
  },
  {
    id: 5,
    title: 'Database optimization',
    description: 'Add indexes and optimize slow queries identified in monitoring',
    completed: false,
    dueDate: '2026-08-16'
  },
  {
    id: 6,
    title: 'User feedback survey',
    description: 'Create and distribute survey to gather user satisfaction metrics',
    completed: true,
    dueDate: '2026-08-13'
  },
  {
    id: 7,
    title: 'Security audit',
    description: 'Conduct comprehensive security review of authentication and authorization',
    completed: false,
    dueDate: '2026-08-18'
  },
  {
    id: 8,
    title: 'Performance testing',
    description: 'Run load tests and identify bottlenecks under high traffic',
    completed: true,
    dueDate: '2026-08-09'
  }
]

export default function SystemCalculatesThe() {
  const completedCount = MOCK_TASKS.filter(task => task.completed).length
  const totalCount = MOCK_TASKS.length
  const completionPercentage = Math.round((completedCount / totalCount) * 100)

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Task Manager</h1>
          <p className="text-gray-600 mb-6">Track your tasks and monitor completion progress</p>
          
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-semibold text-gray-800">Completion Summary</h2>
              <span className="text-3xl font-bold text-blue-600">{completedCount}/{totalCount}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
              <div 
                className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-700">
              <span className="font-semibold">{completionPercentage}%</span> of tasks completed
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 bg-gray-100 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">All Tasks</h2>
          </div>
          
          <div className="divide-y divide-gray-200">
            {MOCK_TASKS.map(task => (
              <div 
                key={task.id}
                className={`p-6 transition-colors hover:bg-gray-50 ${
                  task.completed ? 'bg-green-50' : ''
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    {task.completed ? (
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    ) : (
                      <div className="w-6 h-6 border-2 border-gray-300 rounded-full"></div>
                    )}
                  </div>
                  
                  <div className="flex-grow">
                    <div className="flex items-start justify-between">
                      <h3 className={`text-lg font-medium ${
                        task.completed ? 'text-gray-500 line-through' : 'text-gray-800'
                      }`}>
                        {task.title}
                      </h3>
                      <span className={`ml-4 flex-shrink-0 px-3 py-1 text-xs font-medium rounded-full ${
                        task.completed 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {task.completed ? 'Completed' : 'Pending'}
                      </span>
                    </div>
                    <p className={`mt-1 text-sm ${
                      task.completed ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {task.description}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-sm text-gray-500">Due: {task.dueDate}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Statistics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Total Tasks</p>
              <p className="text-2xl font-bold text-blue-600">{totalCount}</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Completed</p>
              <p className="text-2xl font-bold text-green-600">{completedCount}</p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Remaining</p>
              <p className="text-2xl font-bold text-yellow-600">{totalCount - completedCount}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
