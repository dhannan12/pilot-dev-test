/**
 * SystemIdentifiesTop — Identifies and displays top contributors based on logged volunteer hours
 *
 * Features: ranked contributor list, hours tracking, badge awards, contribution metrics, visual ranking
 *
 * Ticket: SCRUM-934 | Branch: proto/SCRUM-926
 */

import React, { useState } from 'react'

interface Contributor {
  id: string
  name: string
  email: string
  totalHours: number
  projectsCount: number
  lastActivity: string
  rank: number
  badge: 'gold' | 'silver' | 'bronze' | 'contributor'
}

const mockContributors: Contributor[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    totalHours: 245,
    projectsCount: 12,
    lastActivity: '2026-08-15',
    rank: 1,
    badge: 'gold'
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael.chen@example.com',
    totalHours: 198,
    projectsCount: 9,
    lastActivity: '2026-08-14',
    rank: 2,
    badge: 'silver'
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@example.com',
    totalHours: 167,
    projectsCount: 8,
    lastActivity: '2026-08-16',
    rank: 3,
    badge: 'bronze'
  },
  {
    id: '4',
    name: 'David Thompson',
    email: 'david.thompson@example.com',
    totalHours: 134,
    projectsCount: 7,
    lastActivity: '2026-08-13',
    rank: 4,
    badge: 'contributor'
  },
  {
    id: '5',
    name: 'Jessica Williams',
    email: 'jessica.williams@example.com',
    totalHours: 112,
    projectsCount: 6,
    lastActivity: '2026-08-12',
    rank: 5,
    badge: 'contributor'
  },
  {
    id: '6',
    name: 'Robert Martinez',
    email: 'robert.martinez@example.com',
    totalHours: 98,
    projectsCount: 5,
    lastActivity: '2026-08-11',
    rank: 6,
    badge: 'contributor'
  },
  {
    id: '7',
    name: 'Amanda Lee',
    email: 'amanda.lee@example.com',
    totalHours: 87,
    projectsCount: 5,
    lastActivity: '2026-08-10',
    rank: 7,
    badge: 'contributor'
  }
]

export default function SystemIdentifiesTop() {
  const [contributors] = useState<Contributor[]>(mockContributors)
  const [timeRange, setTimeRange] = useState<'month' | 'quarter' | 'year'>('month')
  const [minHours, setMinHours] = useState<number>(0)

  const filteredContributors = contributors.filter(c => c.totalHours >= minHours)

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'gold':
        return 'bg-yellow-400 text-yellow-900'
      case 'silver':
        return 'bg-gray-300 text-gray-800'
      case 'bronze':
        return 'bg-amber-600 text-white'
      default:
        return 'bg-blue-500 text-white'
    }
  }

  const getBadgeIcon = (badge: string) => {
    switch (badge) {
      case 'gold':
        return '🥇'
      case 'silver':
        return '🥈'
      case 'bronze':
        return '🥉'
      default:
        return '⭐'
    }
  }

  const totalHours = contributors.reduce((sum, c) => sum + c.totalHours, 0)
  const averageHours = Math.round(totalHours / contributors.length)

  return (
    <section data-testid="systemidentifiestop" className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Top Contributors</h1>
        <p className="text-gray-600 mb-6">
          Recognizing our most dedicated volunteers based on logged hours
        </p>

        {/* Statistics Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <div className="text-sm text-blue-600 font-semibold mb-1">Total Hours</div>
            <div className="text-2xl font-bold text-blue-900">{totalHours}</div>
          </div>
          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <div className="text-sm text-green-600 font-semibold mb-1">Average Hours</div>
            <div className="text-2xl font-bold text-green-900">{averageHours}</div>
          </div>
          <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
            <div className="text-sm text-purple-600 font-semibold mb-1">Contributors</div>
            <div className="text-2xl font-bold text-purple-900">{contributors.length}</div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6 pb-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <label htmlFor="timeRange" className="text-sm font-medium text-gray-700">
              Time Range:
            </label>
            <select
              id="timeRange"
              data-testid="systemidentifiestop-timerange"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value as 'month' | 'quarter' | 'year')}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="minHours" className="text-sm font-medium text-gray-700">
              Min Hours:
            </label>
            <input
              type="number"
              id="minHours"
              data-testid="systemidentifiestop-minhours"
              value={minHours}
              onChange={(e) => setMinHours(Number(e.target.value))}
              min="0"
              className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            data-testid="systemidentifiestop-reset"
            onClick={() => {
              setTimeRange('month')
              setMinHours(0)
            }}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
          >
            Reset Filters
          </button>
        </div>

        {/* Contributors List */}
        <div data-testid="systemidentifiestop-list" className="space-y-3">
          {filteredContributors.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No contributors found matching the criteria.
            </div>
          ) : (
            filteredContributors.map((contributor) => (
              <div
                key={contributor.id}
                data-testid="systemidentifiestop-item"
                className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    {/* Rank Badge */}
                    <div className="flex flex-col items-center">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold ${
                        contributor.rank === 1 ? 'bg-yellow-100 text-yellow-700' :
                        contributor.rank === 2 ? 'bg-gray-100 text-gray-700' :
                        contributor.rank === 3 ? 'bg-amber-100 text-amber-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        #{contributor.rank}
                      </div>
                    </div>

                    {/* Contributor Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {contributor.name}
                        </h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getBadgeColor(contributor.badge)}`}>
                          {getBadgeIcon(contributor.badge)} {contributor.badge.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{contributor.email}</p>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-700">
                        <div className="flex items-center gap-1">
                          <span className="font-semibold">{contributor.totalHours}</span>
                          <span className="text-gray-500">hours logged</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="font-semibold">{contributor.projectsCount}</span>
                          <span className="text-gray-500">projects</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-gray-500">Last active:</span>
                          <span className="font-semibold">{contributor.lastActivity}</span>
                        </div>
                      </div>
                    </div>

                    {/* Hours Progress Bar */}
                    <div className="hidden md:block w-32">
                      <div className="text-xs text-gray-600 mb-1">Progress</div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${Math.min((contributor.totalHours / 250) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button
                    data-testid="systemidentifiestop-view"
                    className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Export Button */}
        <div className="mt-6 pt-6 border-t border-gray-200 flex justify-end">
          <button
            data-testid="systemidentifiestop-export"
            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-medium"
          >
            Export Report
          </button>
        </div>
      </div>
    </section>
  )
}
