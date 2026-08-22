/**
 * UserChecksTheir — Displays user engagement level based on health metric logging activity
 *
 * Features: Engagement score calculation, logging streaks, metric breakdown, activity history, engagement trends
 *
 * Ticket: SCRUM-1123 | Branch: proto/SCRUM-1115
 */

import React, { useState } from 'react'

interface HealthMetric {
  id: string
  metricType: 'weight' | 'blood_pressure' | 'heart_rate' | 'glucose' | 'steps' | 'sleep' | 'mood'
  value: string
  timestamp: string
  icon: string
}

interface EngagementStats {
  currentStreak: number
  longestStreak: number
  totalLogs: number
  thisWeekLogs: number
  lastLogDate: string
  engagementScore: number
}

const MOCK_HEALTH_LOGS: HealthMetric[] = [
  {
    id: '1',
    metricType: 'weight',
    value: '185 lbs',
    timestamp: '2026-08-22T08:30:00',
    icon: '⚖️'
  },
  {
    id: '2',
    metricType: 'blood_pressure',
    value: '120/80 mmHg',
    timestamp: '2026-08-22T09:15:00',
    icon: '💉'
  },
  {
    id: '3',
    metricType: 'heart_rate',
    value: '72 bpm',
    timestamp: '2026-08-21T07:45:00',
    icon: '❤️'
  },
  {
    id: '4',
    metricType: 'glucose',
    value: '95 mg/dL',
    timestamp: '2026-08-21T12:00:00',
    icon: '🩸'
  },
  {
    id: '5',
    metricType: 'steps',
    value: '8,543 steps',
    timestamp: '2026-08-20T22:00:00',
    icon: '👟'
  },
  {
    id: '6',
    metricType: 'sleep',
    value: '7.5 hours',
    timestamp: '2026-08-20T08:00:00',
    icon: '😴'
  },
  {
    id: '7',
    metricType: 'mood',
    value: 'Positive',
    timestamp: '2026-08-19T18:30:00',
    icon: '😊'
  },
  {
    id: '8',
    metricType: 'weight',
    value: '186 lbs',
    timestamp: '2026-08-19T08:00:00',
    icon: '⚖️'
  }
]

const MOCK_ENGAGEMENT_STATS: EngagementStats = {
  currentStreak: 12,
  longestStreak: 18,
  totalLogs: 156,
  thisWeekLogs: 14,
  lastLogDate: '2026-08-22T09:15:00',
  engagementScore: 87
}

export default function UserChecksTheir() {
  const [selectedPeriod, setSelectedPeriod] = useState<string>('week')
  const [selectedMetric, setSelectedMetric] = useState<string>('all')

  const stats = MOCK_ENGAGEMENT_STATS

  const getEngagementLevel = (score: number): { level: string; color: string; description: string } => {
    if (score >= 80) return { 
      level: 'Excellent', 
      color: 'text-green-600 bg-green-100', 
      description: 'Outstanding commitment to your health!' 
    }
    if (score >= 60) return { 
      level: 'Good', 
      color: 'text-blue-600 bg-blue-100', 
      description: 'You\'re doing great, keep it up!' 
    }
    if (score >= 40) return { 
      level: 'Fair', 
      color: 'text-yellow-600 bg-yellow-100', 
      description: 'Room for improvement, you can do it!' 
    }
    return { 
      level: 'Needs Attention', 
      color: 'text-red-600 bg-red-100', 
      description: 'Let\'s get back on track together!' 
    }
  }

  const engagement = getEngagementLevel(stats.engagementScore)

  const filteredLogs = selectedMetric === 'all' 
    ? MOCK_HEALTH_LOGS 
    : MOCK_HEALTH_LOGS.filter(log => log.metricType === selectedMetric)

  const formatTimestamp = (timestamp: string): string => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 60) return `${diffMins} minutes ago`
    if (diffHours < 24) return `${diffHours} hours ago`
    if (diffDays === 1) return 'Yesterday'
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  const getScoreColor = (score: number): string => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-blue-600'
    if (score >= 40) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getMetricTypeCount = (): { [key: string]: number } => {
    const counts: { [key: string]: number } = {}
    MOCK_HEALTH_LOGS.forEach(log => {
      counts[log.metricType] = (counts[log.metricType] || 0) + 1
    })
    return counts
  }

  const metricCounts = getMetricTypeCount()

  return (
    <div data-testid="usercheckstheir" className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">My Health Engagement</h1>
          <p className="text-gray-600">Track your commitment to logging health metrics</p>
        </div>

        {/* Engagement Score Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border-2 border-purple-200">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <div className="text-sm text-gray-500 uppercase tracking-wide mb-2">Engagement Score</div>
              <div className={`text-6xl font-bold ${getScoreColor(stats.engagementScore)} mb-3`}>
                {stats.engagementScore}
                <span className="text-2xl text-gray-400">/100</span>
              </div>
              <div className={`inline-block px-4 py-2 rounded-full font-semibold text-lg ${engagement.color} mb-2`}>
                {engagement.level}
              </div>
              <p className="text-gray-600 text-sm mt-2">{engagement.description}</p>
            </div>
            
            <div className="w-full md:w-auto">
              <svg className="w-48 h-48" viewBox="0 0 200 200">
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="20"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke={stats.engagementScore >= 80 ? '#10b981' : stats.engagementScore >= 60 ? '#3b82f6' : stats.engagementScore >= 40 ? '#f59e0b' : '#ef4444'}
                  strokeWidth="20"
                  strokeDasharray={`${(stats.engagementScore / 100) * 502.4} 502.4`}
                  strokeLinecap="round"
                  transform="rotate(-90 100 100)"
                />
                <text x="100" y="105" textAnchor="middle" fontSize="32" fontWeight="bold" fill="#374151">
                  {stats.engagementScore}%
                </text>
              </svg>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-orange-500">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-gray-500 uppercase tracking-wide">Current Streak</div>
              <span className="text-2xl">🔥</span>
            </div>
            <div className="text-3xl font-bold text-gray-800">{stats.currentStreak} days</div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-gray-500 uppercase tracking-wide">Longest Streak</div>
              <span className="text-2xl">🏆</span>
            </div>
            <div className="text-3xl font-bold text-gray-800">{stats.longestStreak} days</div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-gray-500 uppercase tracking-wide">This Week</div>
              <span className="text-2xl">📊</span>
            </div>
            <div className="text-3xl font-bold text-gray-800">{stats.thisWeekLogs} logs</div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-gray-500 uppercase tracking-wide">Total Logs</div>
              <span className="text-2xl">📝</span>
            </div>
            <div className="text-3xl font-bold text-gray-800">{stats.totalLogs}</div>
          </div>
        </div>

        {/* Metric Breakdown */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Metrics Logged</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(metricCounts).map(([metric, count]) => {
              const log = MOCK_HEALTH_LOGS.find(l => l.metricType === metric)
              return (
                <div key={metric} className="bg-gray-50 rounded-lg p-4 text-center hover:bg-gray-100 transition-colors">
                  <div className="text-3xl mb-2">{log?.icon}</div>
                  <div className="text-sm text-gray-600 capitalize mb-1">{metric.replace('_', ' ')}</div>
                  <div className="text-xl font-bold text-gray-800">{count}</div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="period-filter" className="block text-sm font-medium text-gray-700 mb-2">
                Time Period
              </label>
              <select
                id="period-filter"
                data-testid="usercheckstheir-period"
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="all">All Time</option>
              </select>
            </div>

            <div>
              <label htmlFor="metric-filter" className="block text-sm font-medium text-gray-700 mb-2">
                Metric Type
              </label>
              <select
                id="metric-filter"
                data-testid="usercheckstheir-metric"
                value={selectedMetric}
                onChange={(e) => setSelectedMetric(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="all">All Metrics</option>
                <option value="weight">Weight</option>
                <option value="blood_pressure">Blood Pressure</option>
                <option value="heart_rate">Heart Rate</option>
                <option value="glucose">Glucose</option>
                <option value="steps">Steps</option>
                <option value="sleep">Sleep</option>
                <option value="mood">Mood</option>
              </select>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
          <div data-testid="usercheckstheir-list" className="space-y-3">
            {filteredLogs.map((log) => (
              <div
                key={log.id}
                data-testid="usercheckstheir-item"
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="text-3xl">{log.icon}</div>
                  <div>
                    <div className="font-semibold text-gray-800 capitalize">
                      {log.metricType.replace('_', ' ')}
                    </div>
                    <div className="text-sm text-gray-500">{formatTimestamp(log.timestamp)}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-gray-800">{log.value}</div>
                </div>
              </div>
            ))}
          </div>

          {filteredLogs.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📋</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No logs found</h3>
              <p className="text-gray-500">Try selecting a different metric type</p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <button
            data-testid="usercheckstheir-logmetric"
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 font-medium shadow-md"
          >
            + Log New Metric
          </button>
          <button
            data-testid="usercheckstheir-viewtrends"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium shadow-md"
          >
            View Trends
          </button>
          <button
            data-testid="usercheckstheir-export"
            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 font-medium shadow-md"
          >
            Export Report
          </button>
        </div>
      </div>
    </div>
  )
}
