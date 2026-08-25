/**
 * ASpectatorViews — Displays table tennis match schedule and scores for spectators
 *
 * Features: match schedule, live scores, player names, match status, time/date display
 *
 * Ticket: SCRUM-1109 | Branch: proto/SCRUM-1103
 */

import React from 'react'

interface Match {
  id: string
  player1: string
  player2: string
  scheduledTime: string
  status: 'upcoming' | 'in-progress' | 'completed'
  score1: number | null
  score2: number | null
  round: string
}

const MOCK_MATCHES: Match[] = [
  {
    id: '1',
    player1: 'Chen Wei',
    player2: 'Li Na',
    scheduledTime: '2026-08-25T10:00:00',
    status: 'completed',
    score1: 11,
    score2: 7,
    round: 'Round 1'
  },
  {
    id: '2',
    player1: 'Zhang Ming',
    player2: 'Wang Hao',
    scheduledTime: '2026-08-25T10:30:00',
    status: 'completed',
    score1: 8,
    score2: 11,
    round: 'Round 1'
  },
  {
    id: '3',
    player1: 'Liu Yang',
    player2: 'Xu Xin',
    scheduledTime: '2026-08-25T11:00:00',
    status: 'in-progress',
    score1: 9,
    score2: 6,
    round: 'Round 1'
  },
  {
    id: '4',
    player1: 'Ma Long',
    player2: 'Fan Zhendong',
    scheduledTime: '2026-08-25T11:30:00',
    status: 'upcoming',
    score1: null,
    score2: null,
    round: 'Round 1'
  },
  {
    id: '5',
    player1: 'Sun Yingsha',
    player2: 'Chen Meng',
    scheduledTime: '2026-08-25T12:00:00',
    status: 'upcoming',
    score1: null,
    score2: null,
    round: 'Round 2'
  },
  {
    id: '6',
    player1: 'Ding Ning',
    player2: 'Zhu Yuling',
    scheduledTime: '2026-08-25T12:30:00',
    status: 'upcoming',
    score1: null,
    score2: null,
    round: 'Round 2'
  },
  {
    id: '7',
    player1: 'Lin Gaoyuan',
    player2: 'Liang Jingkun',
    scheduledTime: '2026-08-25T13:00:00',
    status: 'upcoming',
    score1: null,
    score2: null,
    round: 'Quarterfinals'
  }
]

export default function ASpectatorViews() {
  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    })
  }

  const getStatusBadgeColor = (status: Match['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-gray-200 text-gray-700'
      case 'in-progress':
        return 'bg-green-100 text-green-700 animate-pulse'
      case 'upcoming':
        return 'bg-blue-100 text-blue-700'
      default:
        return 'bg-gray-100 text-gray-600'
    }
  }

  const getStatusLabel = (status: Match['status']) => {
    switch (status) {
      case 'completed':
        return 'Final'
      case 'in-progress':
        return 'Live'
      case 'upcoming':
        return 'Upcoming'
      default:
        return status
    }
  }

  return (
    <div data-testid="aspectatorviews" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
            <h1 className="text-3xl font-bold mb-2">Match Schedule & Scores</h1>
            <p className="text-blue-100">Table Tennis Tournament 2026</p>
          </div>

          <div data-testid="aspectatorviews-list" className="divide-y divide-gray-200">
            {MOCK_MATCHES.map((match) => (
              <div
                key={match.id}
                data-testid="aspectatorviews-item"
                className="p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-500">
                      {match.round}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadgeColor(
                        match.status
                      )}`}
                    >
                      {getStatusLabel(match.status)}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {formatTime(match.scheduledTime)}
                  </span>
                </div>

                <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
                  <div className="text-right">
                    <div className="text-lg font-semibold text-gray-900">
                      {match.player1}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 px-6">
                    {match.status === 'upcoming' ? (
                      <span className="text-2xl font-bold text-gray-400">VS</span>
                    ) : (
                      <div className="flex items-center gap-3">
                        <span
                          className={`text-2xl font-bold ${
                            match.score1 !== null && match.score2 !== null && match.score1 > match.score2
                              ? 'text-green-600'
                              : 'text-gray-700'
                          }`}
                        >
                          {match.score1}
                        </span>
                        <span className="text-gray-400">-</span>
                        <span
                          className={`text-2xl font-bold ${
                            match.score1 !== null && match.score2 !== null && match.score2 > match.score1
                              ? 'text-green-600'
                              : 'text-gray-700'
                          }`}
                        >
                          {match.score2}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="text-left">
                    <div className="text-lg font-semibold text-gray-900">
                      {match.player2}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Last updated: {new Date().toLocaleString()}</p>
        </div>
      </div>
    </div>
  )
}
