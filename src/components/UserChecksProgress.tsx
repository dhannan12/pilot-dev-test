/**
 * UserChecksProgress — Displays user's progress towards wellness goals with visual indicators
 *
 * Features: Goal tracking dashboard, progress bars, goal cards, achievement stats, visual progress indicators
 *
 * Ticket: SCRUM-1119 | Branch: proto/SCRUM-1115
 */

import React, { useState } from 'react'

interface WellnessGoal {
  id: string
  title: string
  category: 'fitness' | 'nutrition' | 'sleep' | 'mindfulness' | 'hydration'
  target: number
  current: number
  unit: string
  deadline: string
  icon: string
}

const MOCK_GOALS: WellnessGoal[] = [
  {
    id: '1',
    title: 'Daily Steps',
    category: 'fitness',
    target: 10000,
    current: 7543,
    unit: 'steps',
    deadline: '2026-08-31',
    icon: '👟'
  },
  {
    id: '2',
    title: 'Water Intake',
    category: 'hydration',
    target: 8,
    current: 6,
    unit: 'glasses',
    deadline: '2026-08-22',
    icon: '💧'
  },
  {
    id: '3',
    title: 'Sleep Hours',
    category: 'sleep',
    target: 8,
    current: 6.5,
    unit: 'hours',
    deadline: '2026-08-22',
    icon: '😴'
  },
  {
    id: '4',
    title: 'Meditation Minutes',
    category: 'mindfulness',
    target: 30,
    current: 25,
    unit: 'minutes',
    deadline: '2026-08-22',
    icon: '🧘'
  },
  {
    id: '5',
    title: 'Vegetables Servings',
    category: 'nutrition',
    target: 5,
    current: 3,
    unit: 'servings',
    deadline: '2026-08-22',
    icon: '🥗'
  },
  {
    id: '6',
    title: 'Workout Sessions',
    category: 'fitness',
    target: 7,
    current: 4,
    unit: 'sessions',
    deadline: '2026-08-29',
    icon: '💪'
  },
  {
    id: '7',
    title: 'Protein Intake',
    category: 'nutrition',
    target: 120,
    current: 85,
    unit: 'grams',
    deadline: '2026-08-22',
    icon: '🍗'
  }
]

export default function UserChecksProgress() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const filteredGoals = selectedCategory === 'all' 
    ? MOCK_GOALS 
    : MOCK_GOALS.filter(goal => goal.category === selectedCategory)

  const getProgressPercentage = (current: number, target: number): number => {
    return Math.min(Math.round((current / target) * 100), 100)
  }

  const getProgressColor = (percentage: number): string => {
    if (percentage >= 80) return 'bg-green-500'
    if (percentage >= 50) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  const getProgressBarColor = (percentage: number): string => {
    if (percentage >= 80) return 'bg-green-400'
    if (percentage >= 50) return 'bg-yellow-400'
    return 'bg-red-400'
  }

  const totalGoals = MOCK_GOALS.length
  const completedGoals = MOCK_GOALS.filter(goal => getProgressPercentage(goal.current, goal.target) >= 100).length
  const averageProgress = Math.round(
    MOCK_GOALS.reduce((sum, goal) => sum + getProgressPercentage(goal.current, goal.target), 0) / totalGoals
  )

  return (
    <div data-testid="userchecksprogress" className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Wellness Goals Progress</h1>
          <p className="text-gray-600">Track your journey to better health</p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
            <div className="text-sm text-gray-500 uppercase tracking-wide mb-2">Total Goals</div>
            <div className="text-3xl font-bold text-gray-800">{totalGoals}</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
            <div className="text-sm text-gray-500 uppercase tracking-wide mb-2">Completed</div>
            <div className="text-3xl font-bold text-gray-800">{completedGoals}</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500">
            <div className="text-sm text-gray-500 uppercase tracking-wide mb-2">Average Progress</div>
            <div className="text-3xl font-bold text-gray-800">{averageProgress}%</div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <label htmlFor="category-filter" className="block text-sm font-medium text-gray-700 mb-3">
            Filter by Category
          </label>
          <select
            id="category-filter"
            data-testid="userchecksprogress-category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Categories</option>
            <option value="fitness">Fitness</option>
            <option value="nutrition">Nutrition</option>
            <option value="sleep">Sleep</option>
            <option value="mindfulness">Mindfulness</option>
            <option value="hydration">Hydration</option>
          </select>
        </div>

        {/* Goals List */}
        <div data-testid="userchecksprogress-list" className="space-y-4">
          {filteredGoals.map((goal) => {
            const percentage = getProgressPercentage(goal.current, goal.target)
            const progressColor = getProgressColor(percentage)
            const progressBarColor = getProgressBarColor(percentage)
            const isCompleted = percentage >= 100

            return (
              <div
                key={goal.id}
                data-testid="userchecksprogress-item"
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="text-4xl">{goal.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-800 mb-1">{goal.title}</h3>
                      <p className="text-sm text-gray-500 capitalize mb-2">
                        {goal.category} • Deadline: {new Date(goal.deadline).toLocaleDateString()}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-700">
                        <span className="font-medium">
                          {goal.current.toLocaleString()} / {goal.target.toLocaleString()} {goal.unit}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className={`${progressColor} text-white px-3 py-1 rounded-full text-sm font-semibold`}>
                      {percentage}%
                    </div>
                    {isCompleted && (
                      <span className="text-xs text-green-600 font-semibold">✓ Completed</span>
                    )}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`${progressBarColor} h-full rounded-full transition-all duration-500 ease-out`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>

                {/* Action Button */}
                <div className="mt-4 flex justify-end">
                  <button
                    data-testid="userchecksprogress-update"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 text-sm font-medium"
                  >
                    Update Progress
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Empty State */}
        {filteredGoals.length === 0 && (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <div className="text-6xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No goals in this category</h3>
            <p className="text-gray-500">Try selecting a different category</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-8 flex gap-4 justify-center">
          <button
            data-testid="userchecksprogress-addgoal"
            className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 font-medium shadow-md"
          >
            + Add New Goal
          </button>
          <button
            data-testid="userchecksprogress-export"
            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 font-medium shadow-md"
          >
            Export Progress Report
          </button>
        </div>
      </div>
    </div>
  )
}
