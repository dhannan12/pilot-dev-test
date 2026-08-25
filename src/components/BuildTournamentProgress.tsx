/**
 * BuildTournamentProgress — Displays real-time tournament progress updates with match results and schedules
 *
 * Features: live match updates, score tracking, round progression, player standings, match schedule
 *
 * Ticket: SCRUM-1197 | Branch: proto/SCRUM-1186
 */

import React, { useState } from 'react'

interface Match {
  id: string
  player1: string
  player2: string
  score: string
  round: string
  court: string
  status: 'completed' | 'in-progress' | 'scheduled'
  time: string
}

interface TournamentUpdate {
  id: string
  type: 'match_complete' | 'match_start' | 'upset' | 'milestone'
  message: string
  timestamp: string
  matchId?: string
}

const mockMatches: Match[] = [
  {
    id: 'M1',
    player1: 'Rafael Nadal',
    player2: 'Novak Djokovic',
    score: '6-4, 7-6, 6-3',
    round: 'Final',
    court: 'Center Court',
    status: 'completed',
    time: '14:30'
  },
  {
    id: 'M2',
    player1: 'Roger Federer',
    player2: 'Andy Murray',
    score: '4-6, 6-4, 5-4',
    round: 'Semi-Final',
    court: 'Court 1',
    status: 'in-progress',
    time: '16:00'
  },
  {
    id: 'M3',
    player1: 'Carlos Alcaraz',
    player2: 'Daniil Medvedev',
    score: '6-2, 6-7, 7-5',
    round: 'Semi-Final',
    court: 'Center Court',
    status: 'completed',
    time: '12:00'
  },
  {
    id: 'M4',
    player1: 'Stefanos Tsitsipas',
    player2: 'Alexander Zverev',
    score: 'vs',
    round: 'Quarter-Final',
    court: 'Court 2',
    status: 'scheduled',
    time: '18:30'
  },
  {
    id: 'M5',
    player1: 'Jannik Sinner',
    player2: 'Holger Rune',
    score: 'vs',
    round: 'Quarter-Final',
    court: 'Court 1',
    status: 'scheduled',
    time: '20:00'
  }
]

const mockUpdates: TournamentUpdate[] = [
  {
    id: 'U1',
    type: 'match_complete',
    message: 'Rafael Nadal defeats Novak Djokovic 6-4, 7-6, 6-3 in an epic Final!',
    timestamp: '2 minutes ago',
    matchId: 'M1'
  },
  {
    id: 'U2',
    type: 'match_start',
    message: 'Roger Federer vs Andy Murray Semi-Final match has started on Court 1',
    timestamp: '15 minutes ago',
    matchId: 'M2'
  },
  {
    id: 'U3',
    type: 'upset',
    message: 'Carlos Alcaraz pulls off an upset victory over Daniil Medvedev!',
    timestamp: '1 hour ago',
    matchId: 'M3'
  },
  {
    id: 'U4',
    type: 'milestone',
    message: 'Rafael Nadal reaches career Grand Slam title #23',
    timestamp: '3 minutes ago'
  },
  {
    id: 'U5',
    type: 'match_start',
    message: 'Quarter-Final matches scheduled for 18:30 on Court 2',
    timestamp: '2 hours ago',
    matchId: 'M4'
  }
]

export default function BuildTournamentProgress() {
  const [selectedRound, setSelectedRound] = useState<string>('all')

  const filteredMatches = selectedRound === 'all' 
    ? mockMatches 
    : mockMatches.filter(m => m.round === selectedRound)

  const getStatusColor = (status: Match['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'scheduled':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getUpdateTypeColor = (type: TournamentUpdate['type']) => {
    switch (type) {
      case 'match_complete':
        return 'bg-green-50 border-green-200'
      case 'match_start':
        return 'bg-blue-50 border-blue-200'
      case 'upset':
        return 'bg-orange-50 border-orange-200'
      case 'milestone':
        return 'bg-purple-50 border-purple-200'
      default:
        return 'bg-gray-50 border-gray-200'
    }
  }

  const getUpdateIcon = (type: TournamentUpdate['type']) => {
    switch (type) {
      case 'match_complete':
        return '✓'
      case 'match_start':
        return '▶'
      case 'upset':
        return '⚡'
      case 'milestone':
        return '★'
      default:
        return '•'
    }
  }

  return (
    <div data-testid="buildtournamentprogress" className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Tournament Progress</h1>
          <p className="text-slate-600">Live updates and match results</p>
        </div>

        {/* Round Filter */}
        <div className="mb-6">
          <label htmlFor="round-filter" className="block text-sm font-medium text-slate-700 mb-2">
            Filter by Round
          </label>
          <select
            id="round-filter"
            data-testid="buildtournamentprogress-round-filter"
            value={selectedRound}
            onChange={(e) => setSelectedRound(e.target.value)}
            className="w-full md:w-64 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
          >
            <option value="all">All Rounds</option>
            <option value="Final">Final</option>
            <option value="Semi-Final">Semi-Final</option>
            <option value="Quarter-Final">Quarter-Final</option>
          </select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Live Updates Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></span>
                Live Updates
              </h2>
              <div data-testid="buildtournamentprogress-updates-list" className="space-y-3">
                {mockUpdates.map((update) => (
                  <div
                    key={update.id}
                    data-testid="buildtournamentprogress-update-item"
                    className={`p-4 rounded-lg border-2 ${getUpdateTypeColor(update.type)} transition-all hover:shadow-md`}
                  >
                    <div className="flex items-start">
                      <span className="text-2xl mr-3">{getUpdateIcon(update.type)}</span>
                      <div className="flex-1">
                        <p className="text-slate-900 font-medium">{update.message}</p>
                        <p className="text-slate-500 text-sm mt-1">{update.timestamp}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Matches Section */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Matches</h2>
              <div data-testid="buildtournamentprogress-matches-list" className="space-y-4">
                {filteredMatches.map((match) => (
                  <div
                    key={match.id}
                    data-testid="buildtournamentprogress-match-item"
                    className="border-2 border-slate-200 rounded-lg p-5 hover:shadow-lg transition-all"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <span className="text-sm font-semibold text-slate-600 uppercase tracking-wide">
                          {match.round}
                        </span>
                        <p className="text-xs text-slate-500 mt-1">
                          {match.court} • {match.time}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold border-2 ${getStatusColor(match.status)}`}
                      >
                        {match.status === 'in-progress' ? 'LIVE' : match.status.toUpperCase()}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold text-slate-900">{match.player1}</span>
                        {match.status !== 'scheduled' && (
                          <span className="text-sm font-mono text-slate-600">
                            {match.score.split(',')[0]}
                          </span>
                        )}
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold text-slate-900">{match.player2}</span>
                        {match.status !== 'scheduled' && match.score !== 'vs' && (
                          <span className="text-sm font-mono text-slate-600">
                            {match.score.split(',').length > 1 ? match.score.split(',').slice(1).join(',').trim() : ''}
                          </span>
                        )}
                      </div>
                    </div>

                    {match.status === 'completed' && (
                      <div className="mt-3 pt-3 border-t border-slate-200">
                        <p className="text-sm text-slate-600">Final Score: {match.score}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {filteredMatches.length === 0 && (
                <div className="text-center py-8 text-slate-500">
                  No matches found for the selected round.
                </div>
              )}
            </div>
          </div>

          {/* Statistics Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Statistics</h2>
              
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
                  <p className="text-sm text-green-700 font-medium">Completed</p>
                  <p className="text-3xl font-bold text-green-900">
                    {mockMatches.filter(m => m.status === 'completed').length}
                  </p>
                </div>

                <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-4 rounded-lg border border-yellow-200">
                  <p className="text-sm text-yellow-700 font-medium">In Progress</p>
                  <p className="text-3xl font-bold text-yellow-900">
                    {mockMatches.filter(m => m.status === 'in-progress').length}
                  </p>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-700 font-medium">Scheduled</p>
                  <p className="text-3xl font-bold text-blue-900">
                    {mockMatches.filter(m => m.status === 'scheduled').length}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-3">Quick Actions</h3>
                <div className="space-y-2">
                  <button
                    data-testid="buildtournamentprogress-refresh"
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Refresh Updates
                  </button>
                  <button
                    data-testid="buildtournamentprogress-schedule"
                    className="w-full px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors font-medium"
                  >
                    View Schedule
                  </button>
                  <button
                    data-testid="buildtournamentprogress-standings"
                    className="w-full px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors font-medium"
                  >
                    View Standings
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
