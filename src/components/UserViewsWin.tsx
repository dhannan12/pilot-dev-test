/**
 * UserViewsWin — Displays match results and calculates win percentage statistics
 *
 * Features: match history table, win/loss statistics, percentage calculation, match details, visual stats summary
 *
 * Ticket: SCRUM-1202 | Branch: proto/SCRUM-1199
 */

import React, { useMemo } from 'react'

interface MatchResult {
  id: string
  date: string
  opponent: string
  result: 'win' | 'loss' | 'draw'
  score: string
  location: string
}

const MOCK_MATCHES: MatchResult[] = [
  {
    id: '1',
    date: '2026-08-20',
    opponent: 'Team Alpha',
    result: 'win',
    score: '3-1',
    location: 'Home'
  },
  {
    id: '2',
    date: '2026-08-18',
    opponent: 'Team Beta',
    result: 'win',
    score: '2-0',
    location: 'Away'
  },
  {
    id: '3',
    date: '2026-08-15',
    opponent: 'Team Gamma',
    result: 'loss',
    score: '1-2',
    location: 'Home'
  },
  {
    id: '4',
    date: '2026-08-12',
    opponent: 'Team Delta',
    result: 'win',
    score: '4-2',
    location: 'Away'
  },
  {
    id: '5',
    date: '2026-08-10',
    opponent: 'Team Epsilon',
    result: 'draw',
    score: '2-2',
    location: 'Home'
  },
  {
    id: '6',
    date: '2026-08-08',
    opponent: 'Team Zeta',
    result: 'win',
    score: '3-0',
    location: 'Away'
  },
  {
    id: '7',
    date: '2026-08-05',
    opponent: 'Team Theta',
    result: 'loss',
    score: '0-1',
    location: 'Home'
  }
]

export default function UserViewsWin() {
  const stats = useMemo(() => {
    const totalMatches = MOCK_MATCHES.length
    const wins = MOCK_MATCHES.filter(m => m.result === 'win').length
    const losses = MOCK_MATCHES.filter(m => m.result === 'loss').length
    const draws = MOCK_MATCHES.filter(m => m.result === 'draw').length
    const winPercentage = totalMatches > 0 ? ((wins / totalMatches) * 100).toFixed(1) : '0.0'
    
    return { totalMatches, wins, losses, draws, winPercentage }
  }, [])

  const getResultColor = (result: string) => {
    switch (result) {
      case 'win':
        return 'bg-green-100 text-green-800'
      case 'loss':
        return 'bg-red-100 text-red-800'
      case 'draw':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getResultBadge = (result: string) => {
    switch (result) {
      case 'win':
        return 'W'
      case 'loss':
        return 'L'
      case 'draw':
        return 'D'
      default:
        return '-'
    }
  }

  return (
    <div data-testid="userviewswin" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Match Results</h1>
          <p className="text-gray-600">Track your performance and win percentage</p>
        </div>

        {/* Stats Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-600 mb-1">Total Matches</div>
            <div className="text-3xl font-bold text-gray-900">{stats.totalMatches}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-600 mb-1">Wins</div>
            <div className="text-3xl font-bold text-green-600">{stats.wins}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-600 mb-1">Losses</div>
            <div className="text-3xl font-bold text-red-600">{stats.losses}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-600 mb-1">Draws</div>
            <div className="text-3xl font-bold text-yellow-600">{stats.draws}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border-2 border-blue-500">
            <div className="text-sm font-medium text-gray-600 mb-1">Win %</div>
            <div className="text-3xl font-bold text-blue-600">{stats.winPercentage}%</div>
          </div>
        </div>

        {/* Visual Win Percentage Bar */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Win Percentage Breakdown</h2>
          <div className="relative w-full h-8 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-green-500 transition-all duration-500"
              style={{ width: `${(stats.wins / stats.totalMatches) * 100}%` }}
            />
            <div
              className="absolute top-0 h-full bg-yellow-500 transition-all duration-500"
              style={{
                left: `${(stats.wins / stats.totalMatches) * 100}%`,
                width: `${(stats.draws / stats.totalMatches) * 100}%`
              }}
            />
            <div
              className="absolute top-0 h-full bg-red-500 transition-all duration-500"
              style={{
                left: `${((stats.wins + stats.draws) / stats.totalMatches) * 100}%`,
                width: `${(stats.losses / stats.totalMatches) * 100}%`
              }}
            />
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span className="flex items-center">
              <span className="w-3 h-3 bg-green-500 rounded-full mr-1"></span>
              Wins ({stats.wins})
            </span>
            <span className="flex items-center">
              <span className="w-3 h-3 bg-yellow-500 rounded-full mr-1"></span>
              Draws ({stats.draws})
            </span>
            <span className="flex items-center">
              <span className="w-3 h-3 bg-red-500 rounded-full mr-1"></span>
              Losses ({stats.losses})
            </span>
          </div>
        </div>

        {/* Match Results Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Recent Matches</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full" data-testid="userviewswin-list">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Opponent
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Score
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Result
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {MOCK_MATCHES.map((match) => (
                  <tr
                    key={match.id}
                    data-testid="userviewswin-item"
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(match.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {match.opponent}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {match.score}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {match.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getResultColor(
                          match.result
                        )}`}
                      >
                        {getResultBadge(match.result)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
