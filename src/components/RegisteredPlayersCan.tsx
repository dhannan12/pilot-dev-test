/**
 * RegisteredPlayersCan — Displays match schedules and league standings for registered players
 *
 * Features: match schedule view, league standings table, player rankings, upcoming matches, tournament tracking
 *
 * Ticket: SCRUM-1212 | Branch: proto/SCRUM-1211
 */

import React, { useState } from 'react'

interface Match {
  id: string
  date: string
  time: string
  player1: string
  player2: string
  round: string
  status: 'scheduled' | 'in-progress' | 'completed'
  result?: string
}

interface Standing {
  rank: number
  playerId: string
  playerName: string
  wins: number
  losses: number
  draws: number
  points: number
}

const mockMatches: Match[] = [
  {
    id: 'm1',
    date: '2026-09-01',
    time: '14:00',
    player1: 'Magnus Carlsen',
    player2: 'Hikaru Nakamura',
    round: 'Round 1',
    status: 'scheduled'
  },
  {
    id: 'm2',
    date: '2026-09-01',
    time: '16:30',
    player1: 'Fabiano Caruana',
    player2: 'Ding Liren',
    round: 'Round 1',
    status: 'scheduled'
  },
  {
    id: 'm3',
    date: '2026-09-02',
    time: '10:00',
    player1: 'Ian Nepomniachtchi',
    player2: 'Wesley So',
    round: 'Round 2',
    status: 'scheduled'
  },
  {
    id: 'm4',
    date: '2026-08-25',
    time: '14:00',
    player1: 'Magnus Carlsen',
    player2: 'Fabiano Caruana',
    round: 'Round 0',
    status: 'completed',
    result: 'Magnus Carlsen wins'
  },
  {
    id: 'm5',
    date: '2026-08-25',
    time: '16:30',
    player1: 'Hikaru Nakamura',
    player2: 'Ding Liren',
    round: 'Round 0',
    status: 'completed',
    result: 'Draw'
  },
  {
    id: 'm6',
    date: '2026-09-03',
    time: '12:00',
    player1: 'Wesley So',
    player2: 'Hikaru Nakamura',
    round: 'Round 3',
    status: 'scheduled'
  },
  {
    id: 'm7',
    date: '2026-09-03',
    time: '15:00',
    player1: 'Magnus Carlsen',
    player2: 'Ian Nepomniachtchi',
    round: 'Round 3',
    status: 'scheduled'
  }
]

const mockStandings: Standing[] = [
  {
    rank: 1,
    playerId: 'p1',
    playerName: 'Magnus Carlsen',
    wins: 5,
    losses: 0,
    draws: 2,
    points: 12
  },
  {
    rank: 2,
    playerId: 'p2',
    playerName: 'Hikaru Nakamura',
    wins: 4,
    losses: 1,
    draws: 2,
    points: 10
  },
  {
    rank: 3,
    playerId: 'p3',
    playerName: 'Fabiano Caruana',
    wins: 3,
    losses: 1,
    draws: 3,
    points: 9
  },
  {
    rank: 4,
    playerId: 'p4',
    playerName: 'Ding Liren',
    wins: 3,
    losses: 2,
    draws: 2,
    points: 8
  },
  {
    rank: 5,
    playerId: 'p5',
    playerName: 'Ian Nepomniachtchi',
    wins: 2,
    losses: 3,
    draws: 2,
    points: 6
  },
  {
    rank: 6,
    playerId: 'p6',
    playerName: 'Wesley So',
    wins: 1,
    losses: 4,
    draws: 2,
    points: 4
  }
]

export default function RegisteredPlayersCan() {
  const [activeTab, setActiveTab] = useState<'schedule' | 'standings'>('schedule')

  const upcomingMatches = mockMatches.filter(m => m.status === 'scheduled')
  const completedMatches = mockMatches.filter(m => m.status === 'completed')

  return (
    <div data-testid="registeredplayerscan" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Chess Tournament Dashboard</h1>
          <p className="text-gray-600">View match schedules and league standings</p>
        </header>

        {/* Tab Navigation */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="flex space-x-8" data-testid="registeredplayerscan-tabs">
            <button
              data-testid="registeredplayerscan-schedule-tab"
              onClick={() => setActiveTab('schedule')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'schedule'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Match Schedule
            </button>
            <button
              data-testid="registeredplayerscan-standings-tab"
              onClick={() => setActiveTab('standings')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'standings'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              League Standings
            </button>
          </nav>
        </div>

        {/* Schedule Tab Content */}
        {activeTab === 'schedule' && (
          <div data-testid="registeredplayerscan-schedule-section">
            {/* Upcoming Matches */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Upcoming Matches</h2>
              <div data-testid="registeredplayerscan-upcoming-list" className="space-y-4">
                {upcomingMatches.map(match => (
                  <div
                    key={match.id}
                    data-testid="registeredplayerscan-match-item"
                    className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-2">
                          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm font-semibold rounded">
                            {match.round}
                          </span>
                          <span className="text-gray-600 text-sm">{match.date}</span>
                          <span className="text-gray-600 text-sm">{match.time}</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className="text-lg font-semibold text-gray-900">{match.player1}</span>
                          <span className="text-gray-400 font-bold">vs</span>
                          <span className="text-lg font-semibold text-gray-900">{match.player2}</span>
                        </div>
                      </div>
                      <button
                        data-testid="registeredplayerscan-view-match"
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Completed Matches */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Recent Results</h2>
              <div data-testid="registeredplayerscan-completed-list" className="space-y-4">
                {completedMatches.map(match => (
                  <div
                    key={match.id}
                    data-testid="registeredplayerscan-result-item"
                    className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-2">
                          <span className="inline-block px-3 py-1 bg-gray-100 text-gray-800 text-sm font-semibold rounded">
                            {match.round}
                          </span>
                          <span className="text-gray-600 text-sm">{match.date}</span>
                          <span className="text-gray-600 text-sm">{match.time}</span>
                        </div>
                        <div className="flex items-center space-x-4 mb-2">
                          <span className="text-lg font-semibold text-gray-900">{match.player1}</span>
                          <span className="text-gray-400 font-bold">vs</span>
                          <span className="text-lg font-semibold text-gray-900">{match.player2}</span>
                        </div>
                        <div className="text-green-600 font-semibold">{match.result}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* Standings Tab Content */}
        {activeTab === 'standings' && (
          <div data-testid="registeredplayerscan-standings-section">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">League Standings</h2>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200" data-testid="registeredplayerscan-standings-table">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rank
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Player
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Wins
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Losses
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Draws
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Points
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200" data-testid="registeredplayerscan-standings-list">
                  {mockStandings.map(standing => (
                    <tr
                      key={standing.playerId}
                      data-testid="registeredplayerscan-standing-item"
                      className="hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span
                            className={`text-lg font-bold ${
                              standing.rank === 1
                                ? 'text-yellow-500'
                                : standing.rank === 2
                                ? 'text-gray-400'
                                : standing.rank === 3
                                ? 'text-orange-600'
                                : 'text-gray-700'
                            }`}
                          >
                            {standing.rank}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{standing.playerName}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-green-600 font-semibold">{standing.wins}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-red-600 font-semibold">{standing.losses}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-600">{standing.draws}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-bold text-blue-600">{standing.points}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
