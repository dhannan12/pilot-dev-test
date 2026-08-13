/**
 * BuildProgressTracking — Displays patient rehabilitation progress with metrics and milestones
 *
 * Features: visual progress bars, milestone tracking, exercise completion stats, goal achievement indicators, timeline view
 *
 * Ticket: SCRUM-730 | Branch: proto/SCRUM-717
 */

import React, { useState } from 'react'

interface ProgressMetric {
  id: string
  category: string
  current: number
  target: number
  unit: string
  trend: 'up' | 'down' | 'stable'
}

interface Milestone {
  id: string
  title: string
  description: string
  completedDate: string | null
  targetDate: string
  status: 'completed' | 'in-progress' | 'pending'
}

interface ExerciseProgress {
  id: string
  exerciseName: string
  completedSessions: number
  totalSessions: number
  lastCompleted: string
  adherenceRate: number
}

const mockProgressMetrics: ProgressMetric[] = [
  {
    id: '1',
    category: 'Range of Motion',
    current: 85,
    target: 100,
    unit: 'degrees',
    trend: 'up'
  },
  {
    id: '2',
    category: 'Strength Level',
    current: 70,
    target: 90,
    unit: '%',
    trend: 'up'
  },
  {
    id: '3',
    category: 'Pain Level',
    current: 3,
    target: 0,
    unit: '/10',
    trend: 'down'
  },
  {
    id: '4',
    category: 'Mobility Score',
    current: 75,
    target: 95,
    unit: 'points',
    trend: 'up'
  },
  {
    id: '5',
    category: 'Balance Score',
    current: 82,
    target: 90,
    unit: 'points',
    trend: 'stable'
  }
]

const mockMilestones: Milestone[] = [
  {
    id: '1',
    title: 'Initial Assessment',
    description: 'Complete baseline evaluation',
    completedDate: '2026-07-01',
    targetDate: '2026-07-01',
    status: 'completed'
  },
  {
    id: '2',
    title: 'Pain Reduction Phase',
    description: 'Reduce pain to manageable levels',
    completedDate: '2026-07-15',
    targetDate: '2026-07-15',
    status: 'completed'
  },
  {
    id: '3',
    title: 'Mobility Restoration',
    description: 'Restore 70% mobility range',
    completedDate: '2026-08-05',
    targetDate: '2026-08-05',
    status: 'completed'
  },
  {
    id: '4',
    title: 'Strength Building',
    description: 'Achieve target strength levels',
    completedDate: null,
    targetDate: '2026-08-25',
    status: 'in-progress'
  },
  {
    id: '5',
    title: 'Full Recovery',
    description: 'Return to normal activities',
    completedDate: null,
    targetDate: '2026-09-15',
    status: 'pending'
  }
]

const mockExerciseProgress: ExerciseProgress[] = [
  {
    id: '1',
    exerciseName: 'Shoulder Rotations',
    completedSessions: 18,
    totalSessions: 20,
    lastCompleted: '2026-08-12',
    adherenceRate: 90
  },
  {
    id: '2',
    exerciseName: 'Wall Push-ups',
    completedSessions: 22,
    totalSessions: 24,
    lastCompleted: '2026-08-13',
    adherenceRate: 92
  },
  {
    id: '3',
    exerciseName: 'Resistance Band Pulls',
    completedSessions: 15,
    totalSessions: 20,
    lastCompleted: '2026-08-11',
    adherenceRate: 75
  },
  {
    id: '4',
    exerciseName: 'Balance Exercises',
    completedSessions: 16,
    totalSessions: 18,
    lastCompleted: '2026-08-12',
    adherenceRate: 89
  },
  {
    id: '5',
    exerciseName: 'Core Strengthening',
    completedSessions: 20,
    totalSessions: 22,
    lastCompleted: '2026-08-13',
    adherenceRate: 91
  }
]

export default function BuildProgressTracking() {
  const [activeTab, setActiveTab] = useState<'metrics' | 'milestones' | 'exercises'>('metrics')

  const calculateProgress = (current: number, target: number): number => {
    if (target === 0) return 0
    return Math.min(100, (current / target) * 100)
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return '↑'
      case 'down':
        return '↓'
      default:
        return '→'
    }
  }

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'completed':
        return 'bg-green-500'
      case 'in-progress':
        return 'bg-blue-500'
      default:
        return 'bg-gray-300'
    }
  }

  const getAdherenceColor = (rate: number): string => {
    if (rate >= 90) return 'text-green-600'
    if (rate >= 75) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Progress Tracking</h1>
          <p className="text-gray-600">Monitor your rehabilitation journey and achievements</p>
        </div>

        {/* Overall Progress Summary */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Overall Progress</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">Treatment Progress</div>
              <div className="text-3xl font-bold text-blue-600">68%</div>
              <div className="text-xs text-gray-500 mt-1">On track</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">Exercise Adherence</div>
              <div className="text-3xl font-bold text-green-600">87%</div>
              <div className="text-xs text-gray-500 mt-1">Excellent</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">Goals Achieved</div>
              <div className="text-3xl font-bold text-purple-600">3/5</div>
              <div className="text-xs text-gray-500 mt-1">60% complete</div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-md mb-6">
          <div className="border-b border-gray-200">
            <div className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('metrics')}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'metrics'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Progress Metrics
              </button>
              <button
                onClick={() => setActiveTab('milestones')}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'milestones'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Milestones
              </button>
              <button
                onClick={() => setActiveTab('exercises')}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'exercises'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Exercise Progress
              </button>
            </div>
          </div>

          <div className="p-6">
            {/* Progress Metrics Tab */}
            {activeTab === 'metrics' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
                {mockProgressMetrics.map((metric) => {
                  const progress = calculateProgress(metric.current, metric.target)
                  return (
                    <div key={metric.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-semibold text-gray-900">{metric.category}</h4>
                          <span className="text-sm text-gray-500">
                            {getTrendIcon(metric.trend)}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {metric.current} / {metric.target} {metric.unit}
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                        <div
                          className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-500">{Math.round(progress)}% of target</div>
                    </div>
                  )
                })}
              </div>
            )}

            {/* Milestones Tab */}
            {activeTab === 'milestones' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Treatment Milestones</h3>
                <div className="relative">
                  {mockMilestones.map((milestone, index) => (
                    <div key={milestone.id} className="flex gap-4 mb-6 last:mb-0">
                      {/* Timeline indicator */}
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-4 h-4 rounded-full ${getStatusColor(milestone.status)}`}
                        ></div>
                        {index < mockMilestones.length - 1 && (
                          <div className="w-0.5 h-full bg-gray-300 mt-2"></div>
                        )}
                      </div>

                      {/* Milestone content */}
                      <div className="flex-1 pb-6">
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-semibold text-gray-900">{milestone.title}</h4>
                            <span
                              className={`text-xs px-2 py-1 rounded-full ${
                                milestone.status === 'completed'
                                  ? 'bg-green-100 text-green-800'
                                  : milestone.status === 'in-progress'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-gray-200 text-gray-700'
                              }`}
                            >
                              {milestone.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{milestone.description}</p>
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>Target: {milestone.targetDate}</span>
                            {milestone.completedDate && (
                              <span className="text-green-600">
                                Completed: {milestone.completedDate}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Exercise Progress Tab */}
            {activeTab === 'exercises' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Exercise Completion</h3>
                {mockExerciseProgress.map((exercise) => {
                  const completionRate = (exercise.completedSessions / exercise.totalSessions) * 100
                  return (
                    <div key={exercise.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-semibold text-gray-900">{exercise.exerciseName}</h4>
                          <p className="text-xs text-gray-500 mt-1">
                            Last completed: {exercise.lastCompleted}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-gray-900">
                            {exercise.completedSessions}/{exercise.totalSessions}
                          </div>
                          <div
                            className={`text-xs font-semibold ${getAdherenceColor(
                              exercise.adherenceRate
                            )}`}
                          >
                            {exercise.adherenceRate}% adherence
                          </div>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${completionRate}%` }}
                        ></div>
                      </div>
                    </div>
                  )
                })}

                <div className="mt-6 bg-blue-50 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">💪</div>
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-1">Keep up the great work!</h4>
                      <p className="text-sm text-blue-700">
                        You're maintaining excellent exercise adherence. Consistency is key to
                        recovery.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
