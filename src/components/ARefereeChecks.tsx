/**
 * ARefereeChecks — Real-time match score display for referees
 *
 * Features: live score tracking, match status updates, player information, court assignments, set-by-set scores
 *
 * Ticket: SCRUM-1110 | Branch: proto/SCRUM-1103
 */

import React, { useState } from 'react'

interface Match {
  id: string
  courtNumber: number
  player1: string
  player2: string
  sets: {
    set1: { p1: number; p2: number }
    set2: { p1: number; p2: number }
    set3: { p1: number; p2: number } | null
  }
  currentSet: number
  status: 'in-progress' | 'completed' | 'paused'
  startTime: string
  duration: string
}

const MOCK_MATCHES: Match[] = [
  {
    id: 'match-001',
    courtNumber: 1,
    player1: 'Zhang Wei',
    player2: 'Li Ming',
    sets: {
      set1: { p1: 11, p2: 9 },
      set2: { p1: 8, p2: 11 },
      set3: { p1: 7, p2: 5 },
    },
    currentSet: 3,
    status: 'in-progress',
    startTime: '14:30',
    duration: '32 min',
  },
  {
    id: 'match-002',
    courtNumber: 2,
    player1: 'Wang Fang',
    player2: 'Chen Yue',
    sets: {
      set1: { p1: 11, p2: 7 },
      set2: { p1: 9, p2: 11 },
      set3: null,
    },
    currentSet: 2,
    status: 'paused',
    startTime: '14:15',
    duration: '28 min',
  },
  {
    id: 'match-003',
    courtNumber: 3,
    player1: 'Liu Xiang',
    player2: 'Zhao Yang',
    sets: {
      set1: { p1: 11, p2: 6 },
      set2: { p1: 11, p2: 8 },
      set3: null,
    },
    currentSet: 2,
    status: 'completed',
    startTime: '14:00',
    duration: '25 min',
  },
  {
    id: 'match-004',
    courtNumber: 4,
    player1: 'Sun Jian',
    player2: 'Ma Long',
    sets: {
      set1: { p1: 12, p2: 10 },
      set2: { p1: 5, p2: 8 },
      set3: null,
    },
    currentSet: 2,
    status: 'in-progress',
    startTime: '14:45',
    duration: '18 min',
  },
  {
    id: 'match-005',
    courtNumber: 5,
    player1: 'Ding Ning',
    player2: 'Xu Xin',
    sets: {
      set1: { p1: 11, p2: 13 },
      set2: { p1: 11, p2: 9 },
      set3: { p1: 3, p2: 2 },
    },
    currentSet: 3,
    status: 'in-progress',
    startTime: '14:20',
    duration: '38 min',
  },
]

export default function ARefereeChecks() {
  const [selectedMatch, setSelectedMatch] = useState<string | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>('all')

  const filteredMatches = MOCK_MATCHES.filter((match) => {
    if (filterStatus === 'all') return true
    return match.status === filterStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-progress':
        return 'bg-green-100 text-green-800 border-green-300'
      case 'completed':
        return 'bg-gray-100 text-gray-800 border-gray-300'
      case 'paused':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'in-progress':
        return 'Live'
      case 'completed':
        return 'Finished'
      case 'paused':
        return 'Paused'
      default:
        return status
    }
  }

  return (
    <div data-testid="arefereechecks" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Referee Score Dashboard
          </h1>
          <p className="text-gray-600">
            Real-time match scores and status monitoring
          </p>
        </div>

        {/* Filter Controls */}
        <div className="mb-6 flex gap-4 items-center flex-wrap">
          <label htmlFor="status-filter" className="font-medium text-gray-700">
            Filter by Status:
          </label>
          <select
            id="status-filter"
            data-testid="arefereechecks-filter"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Matches</option>
            <option value="in-progress">Live Only</option>
            <option value="paused">Paused</option>
            <option value="completed">Completed</option>
          </select>

          <button
            data-testid="arefereechecks-refresh"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors ml-auto"
          >
            Refresh Scores
          </button>
        </div>

        {/* Matches Grid */}
        <div data-testid="arefereechecks-list" className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredMatches.map((match) => (
            <div
              key={match.id}
              data-testid="arefereechecks-item"
              className={`bg-white rounded-lg shadow-md border-2 transition-all ${
                selectedMatch === match.id
                  ? 'border-blue-500 ring-2 ring-blue-200'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {/* Card Header */}
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-bold text-gray-900">
                    Court {match.courtNumber}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                      match.status
                    )}`}
                  >
                    {getStatusLabel(match.status)}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <span>🕐 {match.startTime}</span>
                  <span>⏱️ {match.duration}</span>
                </div>
              </div>

              {/* Players and Scores */}
              <div className="p-4">
                {/* Player 1 */}
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-900">
                      {match.player1}
                    </span>
                    <div className="flex gap-2">
                      <span className="w-8 h-8 flex items-center justify-center bg-blue-100 text-blue-900 rounded font-bold text-sm">
                        {match.sets.set1.p1}
                      </span>
                      <span className="w-8 h-8 flex items-center justify-center bg-blue-100 text-blue-900 rounded font-bold text-sm">
                        {match.sets.set2.p1}
                      </span>
                      {match.sets.set3 && (
                        <span className="w-8 h-8 flex items-center justify-center bg-blue-100 text-blue-900 rounded font-bold text-sm">
                          {match.sets.set3.p1}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* VS Divider */}
                <div className="text-center text-xs font-semibold text-gray-400 mb-3">
                  VS
                </div>

                {/* Player 2 */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-900">
                      {match.player2}
                    </span>
                    <div className="flex gap-2">
                      <span className="w-8 h-8 flex items-center justify-center bg-red-100 text-red-900 rounded font-bold text-sm">
                        {match.sets.set1.p2}
                      </span>
                      <span className="w-8 h-8 flex items-center justify-center bg-red-100 text-red-900 rounded font-bold text-sm">
                        {match.sets.set2.p2}
                      </span>
                      {match.sets.set3 && (
                        <span className="w-8 h-8 flex items-center justify-center bg-red-100 text-red-900 rounded font-bold text-sm">
                          {match.sets.set3.p2}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Set Labels */}
                <div className="flex justify-end gap-2 mb-4">
                  <span className="w-8 text-center text-xs text-gray-500">
                    Set 1
                  </span>
                  <span className="w-8 text-center text-xs text-gray-500">
                    Set 2
                  </span>
                  {match.sets.set3 && (
                    <span className="w-8 text-center text-xs text-gray-500">
                      Set 3
                    </span>
                  )}
                </div>

                {/* Current Set Indicator */}
                {match.status === 'in-progress' && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 mb-3">
                    <p className="text-xs text-blue-800 text-center font-medium">
                      📍 Currently in Set {match.currentSet}
                    </p>
                  </div>
                )}

                {/* Action Button */}
                <button
                  data-testid="arefereechecks-view"
                  onClick={() =>
                    setSelectedMatch(
                      selectedMatch === match.id ? null : match.id
                    )
                  }
                  className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm"
                >
                  {selectedMatch === match.id ? 'Deselect' : 'View Details'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results Message */}
        {filteredMatches.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No matches found with the selected filter.
            </p>
          </div>
        )}

        {/* Summary Footer */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Match Summary
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-700">
                {MOCK_MATCHES.filter((m) => m.status === 'in-progress').length}
              </p>
              <p className="text-sm text-gray-600">Live Matches</p>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <p className="text-2xl font-bold text-yellow-700">
                {MOCK_MATCHES.filter((m) => m.status === 'paused').length}
              </p>
              <p className="text-sm text-gray-600">Paused</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-gray-700">
                {MOCK_MATCHES.filter((m) => m.status === 'completed').length}
              </p>
              <p className="text-sm text-gray-600">Completed</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-700">
                {MOCK_MATCHES.length}
              </p>
              <p className="text-sm text-gray-600">Total Matches</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
