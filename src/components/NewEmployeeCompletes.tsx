/**
 * NewEmployeeCompletes — Onboarding checklist tracker for new employees
 *
 * Features: checklist progress tracking, task completion, deadline monitoring, status indicators, progress visualization
 *
 * Ticket: SCRUM-882 | Branch: proto/SCRUM-879
 */

import React, { useState } from 'react'

interface ChecklistItem {
  id: string
  title: string
  description: string
  dueDate: string
  completed: boolean
  category: 'paperwork' | 'training' | 'setup' | 'orientation'
}

const MOCK_CHECKLIST: ChecklistItem[] = [
  {
    id: '1',
    title: 'Complete Tax Forms (W-4, I-9)',
    description: 'Submit federal and state tax withholding forms',
    dueDate: '2026-08-18',
    completed: true,
    category: 'paperwork'
  },
  {
    id: '2',
    title: 'Set Up Direct Deposit',
    description: 'Provide banking information for payroll',
    dueDate: '2026-08-20',
    completed: true,
    category: 'paperwork'
  },
  {
    id: '3',
    title: 'Complete Workplace Safety Training',
    description: 'Watch safety videos and pass the quiz',
    dueDate: '2026-08-22',
    completed: true,
    category: 'training'
  },
  {
    id: '4',
    title: 'Attend HR Orientation',
    description: 'Meet with HR to review policies and benefits',
    dueDate: '2026-08-25',
    completed: false,
    category: 'orientation'
  },
  {
    id: '5',
    title: 'Set Up Email and System Access',
    description: 'Configure email, VPN, and necessary software',
    dueDate: '2026-08-28',
    completed: false,
    category: 'setup'
  },
  {
    id: '6',
    title: 'Complete Benefits Enrollment',
    description: 'Select health, dental, and retirement plans',
    dueDate: '2026-09-01',
    completed: false,
    category: 'paperwork'
  },
  {
    id: '7',
    title: 'Meet Your Team',
    description: 'Schedule 1-on-1s with team members',
    dueDate: '2026-09-05',
    completed: false,
    category: 'orientation'
  },
  {
    id: '8',
    title: 'Complete Security Training',
    description: 'Learn about data security and privacy policies',
    dueDate: '2026-09-08',
    completed: false,
    category: 'training'
  }
]

export default function NewEmployeeCompletes() {
  const [checklist, setChecklist] = useState<ChecklistItem[]>(MOCK_CHECKLIST)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const toggleComplete = (id: string) => {
    setChecklist(prev =>
      prev.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    )
  }

  const completedCount = checklist.filter(item => item.completed).length
  const totalCount = checklist.length
  const progressPercentage = Math.round((completedCount / totalCount) * 100)

  const filteredChecklist = selectedCategory === 'all'
    ? checklist
    : checklist.filter(item => item.category === selectedCategory)

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'paperwork': return 'bg-blue-100 text-blue-800'
      case 'training': return 'bg-purple-100 text-purple-800'
      case 'setup': return 'bg-green-100 text-green-800'
      case 'orientation': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const isOverdue = (dueDate: string, completed: boolean) => {
    if (completed) return false
    return new Date(dueDate) < new Date()
  }

  return (
    <div data-testid="newemployeecompletes" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome to Your Onboarding Journey!
          </h1>
          <p className="text-gray-600 mb-4">
            Complete all tasks within your first month to ensure a smooth start
          </p>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progress</span>
              <span className="font-semibold">{completedCount} of {totalCount} completed</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-green-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <div className="text-right text-sm font-semibold text-gray-700 mt-1">
              {progressPercentage}%
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            <button
              data-testid="newemployeecompletes-filter-all"
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Tasks
            </button>
            <button
              data-testid="newemployeecompletes-filter-paperwork"
              onClick={() => setSelectedCategory('paperwork')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === 'paperwork'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Paperwork
            </button>
            <button
              data-testid="newemployeecompletes-filter-training"
              onClick={() => setSelectedCategory('training')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === 'training'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Training
            </button>
            <button
              data-testid="newemployeecompletes-filter-setup"
              onClick={() => setSelectedCategory('setup')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === 'setup'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Setup
            </button>
            <button
              data-testid="newemployeecompletes-filter-orientation"
              onClick={() => setSelectedCategory('orientation')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === 'orientation'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Orientation
            </button>
          </div>
        </div>

        {/* Checklist */}
        <div data-testid="newemployeecompletes-list" className="space-y-4">
          {filteredChecklist.map(item => (
            <div
              key={item.id}
              data-testid="newemployeecompletes-item"
              className={`bg-white rounded-lg shadow-sm p-5 transition-all ${
                item.completed ? 'opacity-75' : ''
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Checkbox */}
                <input
                  type="checkbox"
                  data-testid={`newemployeecompletes-checkbox-${item.id}`}
                  checked={item.completed}
                  onChange={() => toggleComplete(item.id)}
                  className="mt-1 w-5 h-5 text-green-600 rounded focus:ring-2 focus:ring-green-500 cursor-pointer"
                />

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className={`text-lg font-semibold ${
                      item.completed ? 'line-through text-gray-500' : 'text-gray-900'
                    }`}>
                      {item.title}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      getCategoryColor(item.category)
                    }`}>
                      {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                    </span>
                  </div>

                  <p className="text-gray-600 mb-3">{item.description}</p>

                  <div className="flex items-center gap-4 text-sm">
                    <span className={`font-medium ${
                      isOverdue(item.dueDate, item.completed)
                        ? 'text-red-600'
                        : item.completed
                        ? 'text-gray-500'
                        : 'text-gray-700'
                    }`}>
                      Due: {new Date(item.dueDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>

                    {isOverdue(item.dueDate, item.completed) && (
                      <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs font-semibold">
                        OVERDUE
                      </span>
                    )}

                    {item.completed && (
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-semibold">
                        ✓ COMPLETED
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredChecklist.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <p className="text-gray-500 text-lg">No tasks in this category</p>
          </div>
        )}

        {/* Summary Footer */}
        {completedCount === totalCount && (
          <div className="mt-6 bg-green-50 border-2 border-green-200 rounded-lg p-6 text-center">
            <h2 className="text-2xl font-bold text-green-800 mb-2">
              🎉 Congratulations!
            </h2>
            <p className="text-green-700">
              You've completed all onboarding tasks. Welcome to the team!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
