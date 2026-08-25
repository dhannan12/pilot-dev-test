/**
 * BuildPlayerPerformance — Player performance analysis screen with stats, match history, and trends
 *
 * Features: performance metrics, match history, skill radar chart, trend graphs, comparative analysis
 *
 * Ticket: SCRUM-1198 | Branch: proto/SCRUM-1186
 */

import React, { useState } from 'react'

interface PerformanceMetric {
  id: string
  label: string
  value: number
  unit: string
  change: number
  trend: 'up' | 'down' | 'stable'
}

interface MatchHistory {
  id: string
  date: string
  opponent: string
  result: 'win' | 'loss'
  score: string
  duration: string
  surface: string
}

interface SkillRating {
  skill: string
  rating: number
  maxRating: number
}

interface TrendData {
  period: string
  wins: number
  losses: number
  winRate: number
}

const PERFORMANCE_METRICS: PerformanceMetric[] = [
  { id: '1', label: 'Win Rate', value: 68, unit: '%', change: 5.2, trend: 'up' },
  { id: '2', label: 'Avg Match Duration', value: 92, unit: 'min', change: -3.5, trend: 'down' },
  { id: '3', label: 'Service Accuracy', value: 75, unit: '%', change: 2.1, trend: 'up' },
  { id: '4', label: 'Break Points Won', value: 58, unit: '%', change: 0.8, trend: 'stable' },
  { id: '5', label: 'First Serve %', value: 72, unit: '%', change: 4.3, trend: 'up' },
  { id: '6', label: 'Unforced Errors', value: 18, unit: 'per match', change: -2.5, trend: 'down' }
]

const MATCH_HISTORY: MatchHistory[] = [
  { id: '1', date: '2026-08-20', opponent: 'Maria Santos', result: 'win', score: '6-3, 7-5', duration: '95 min', surface: 'Hard' },
  { id: '2', date: '2026-08-18', opponent: 'Chen Wei', result: 'win', score: '6-4, 6-2', duration: '78 min', surface: 'Clay' },
  { id: '3', date: '2026-08-15', opponent: 'Emma Johnson', result: 'loss', score: '4-6, 6-7', duration: '112 min', surface: 'Grass' },
  { id: '4', date: '2026-08-12', opponent: 'Sofia Rodriguez', result: 'win', score: '6-2, 6-3', duration: '85 min', surface: 'Hard' },
  { id: '5', date: '2026-08-10', opponent: 'Yuki Tanaka', result: 'win', score: '7-6, 6-4', duration: '102 min', surface: 'Hard' },
  { id: '6', date: '2026-08-07', opponent: 'Anna Mueller', result: 'loss', score: '3-6, 5-7', duration: '98 min', surface: 'Clay' },
  { id: '7', date: '2026-08-05', opponent: 'Lisa Anderson', result: 'win', score: '6-1, 6-4', duration: '72 min', surface: 'Grass' }
]

const SKILL_RATINGS: SkillRating[] = [
  { skill: 'Serve', rating: 85, maxRating: 100 },
  { skill: 'Forehand', rating: 78, maxRating: 100 },
  { skill: 'Backhand', rating: 72, maxRating: 100 },
  { skill: 'Volley', rating: 68, maxRating: 100 },
  { skill: 'Speed', rating: 82, maxRating: 100 },
  { skill: 'Endurance', rating: 88, maxRating: 100 }
]

const TREND_DATA: TrendData[] = [
  { period: 'Jan', wins: 8, losses: 3, winRate: 72.7 },
  { period: 'Feb', wins: 7, losses: 4, winRate: 63.6 },
  { period: 'Mar', wins: 9, losses: 2, winRate: 81.8 },
  { period: 'Apr', wins: 10, losses: 3, winRate: 76.9 },
  { period: 'May', wins: 8, losses: 5, winRate: 61.5 },
  { period: 'Jun', wins: 11, losses: 2, winRate: 84.6 },
  { period: 'Jul', wins: 9, losses: 3, winRate: 75.0 },
  { period: 'Aug', wins: 12, losses: 4, winRate: 75.0 }
]

export default function BuildPlayerPerformance() {
  const [selectedPeriod, setSelectedPeriod] = useState<string>('all')
  const [selectedSurface, setSelectedSurface] = useState<string>('all')
  const [viewMode, setViewMode] = useState<'overview' | 'detailed'>('overview')

  const filteredMatches = MATCH_HISTORY.filter(match => {
    if (selectedSurface === 'all') return true
    return match.surface.toLowerCase() === selectedSurface.toLowerCase()
  })

  return (
    <div data-testid="buildplayerperformance" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Player Performance Analysis</h1>
          <p className="text-gray-600">Comprehensive performance metrics and match analytics</p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-wrap gap-4 items-center">
            <div>
              <label htmlFor="period-select" className="block text-sm font-medium text-gray-700 mb-1">
                Time Period
              </label>
              <select
                id="period-select"
                data-testid="buildplayerperformance-period"
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Time</option>
                <option value="month">Last Month</option>
                <option value="quarter">Last Quarter</option>
                <option value="year">Last Year</option>
              </select>
            </div>

            <div>
              <label htmlFor="surface-select" className="block text-sm font-medium text-gray-700 mb-1">
                Court Surface
              </label>
              <select
                id="surface-select"
                data-testid="buildplayerperformance-surface"
                value={selectedSurface}
                onChange={(e) => setSelectedSurface(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Surfaces</option>
                <option value="hard">Hard</option>
                <option value="clay">Clay</option>
                <option value="grass">Grass</option>
              </select>
            </div>

            <div className="ml-auto flex gap-2">
              <button
                data-testid="buildplayerperformance-overview"
                onClick={() => setViewMode('overview')}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  viewMode === 'overview'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Overview
              </button>
              <button
                data-testid="buildplayerperformance-detailed"
                onClick={() => setViewMode('detailed')}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  viewMode === 'detailed'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Detailed
              </button>
            </div>
          </div>
        </div>

        {/* Performance Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {PERFORMANCE_METRICS.map((metric) => (
            <div
              key={metric.id}
              data-testid="buildplayerperformance-metric-card"
              className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-sm font-medium text-gray-600">{metric.label}</h3>
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded ${
                    metric.trend === 'up'
                      ? 'bg-green-100 text-green-800'
                      : metric.trend === 'down'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {metric.change > 0 ? '+' : ''}{metric.change}%
                </span>
              </div>
              <div className="flex items-baseline">
                <span className="text-3xl font-bold text-gray-900">{metric.value}</span>
                <span className="ml-2 text-sm text-gray-600">{metric.unit}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Skill Ratings Radar */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Skill Ratings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SKILL_RATINGS.map((skill) => (
              <div key={skill.skill} data-testid="buildplayerperformance-skill-item">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">{skill.skill}</span>
                  <span className="text-sm font-bold text-gray-900">
                    {skill.rating}/{skill.maxRating}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-blue-600 h-3 rounded-full transition-all"
                    style={{ width: `${(skill.rating / skill.maxRating) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Trend Chart */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Performance Trend (2026)</h2>
          <div className="h-64 flex items-end justify-between gap-2">
            {TREND_DATA.map((data) => {
              const maxWins = Math.max(...TREND_DATA.map(d => d.wins))
              const winHeight = (data.wins / maxWins) * 100
              const lossHeight = (data.losses / maxWins) * 100

              return (
                <div key={data.period} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full flex gap-1 h-48 items-end">
                    <div
                      data-testid="buildplayerperformance-trend-bar"
                      className="flex-1 bg-green-500 rounded-t transition-all hover:bg-green-600"
                      style={{ height: `${winHeight}%` }}
                      title={`${data.wins} wins`}
                    />
                    <div
                      className="flex-1 bg-red-400 rounded-t transition-all hover:bg-red-500"
                      style={{ height: `${lossHeight}%` }}
                      title={`${data.losses} losses`}
                    />
                  </div>
                  <div className="text-center">
                    <div className="text-xs font-medium text-gray-900">{data.period}</div>
                    <div className="text-xs text-gray-500">{data.winRate.toFixed(1)}%</div>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="flex justify-center gap-6 mt-6">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded" />
              <span className="text-sm text-gray-700">Wins</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-400 rounded" />
              <span className="text-sm text-gray-700">Losses</span>
            </div>
          </div>
        </div>

        {/* Match History */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recent Match History</h2>
            <button
              data-testid="buildplayerperformance-export"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
            >
              Export Report
            </button>
          </div>

          <div data-testid="buildplayerperformance-list" className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Date</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Opponent</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Result</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Score</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Duration</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Surface</th>
                </tr>
              </thead>
              <tbody>
                {filteredMatches.map((match) => (
                  <tr
                    key={match.id}
                    data-testid="buildplayerperformance-item"
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-3 px-4 text-sm text-gray-900">{match.date}</td>
                    <td className="py-3 px-4 text-sm text-gray-900 font-medium">{match.opponent}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                          match.result === 'win'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {match.result.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-900">{match.score}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{match.duration}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{match.surface}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredMatches.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No matches found for the selected filters
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex gap-4 justify-end">
          <button
            data-testid="buildplayerperformance-refresh"
            className="px-6 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors font-medium"
          >
            Refresh Data
          </button>
          <button
            data-testid="buildplayerperformance-compare"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
          >
            Compare Players
          </button>
        </div>
      </div>
    </div>
  )
}
