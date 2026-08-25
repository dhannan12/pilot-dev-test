/**
 * APlayerIs — Displays player seeding based on tournament performance
 *
 * Features: performance metrics, seed ranking, win/loss records, sorted leaderboard, player statistics
 *
 * Ticket: SCRUM-1107 | Branch: proto/SCRUM-1103
 */

import React, { useState } from 'react'

interface Player {
  id: number
  name: string
  seed: number
  wins: number
  losses: number
  points: number
  winRate: number
}

const MOCK_PLAYERS: Player[] = [
  { id: 1, name: 'Chen Wei', seed: 1, wins: 24, losses: 3, points: 1850, winRate: 88.9 },
  { id: 2, name: 'Maria Santos', seed: 2, wins: 22, losses: 5, points: 1720, winRate: 81.5 },
  { id: 3, name: 'James Cooper', seed: 3, wins: 19, losses: 8, points: 1580, winRate: 70.4 },
  { id: 4, name: 'Li Xiao', seed: 4, wins: 17, losses: 10, points: 1450, winRate: 63.0 },
  { id: 5, name: 'Anna Kowalski', seed: 5, wins: 15, losses: 12, points: 1320, winRate: 55.6 },
  { id: 6, name: 'David Kim', seed: 6, wins: 13, losses: 14, points: 1190, winRate: 48.1 },
  { id: 7, name: 'Sarah Johnson', seed: 7, wins: 11, losses: 16, points: 1050, winRate: 40.7 },
  { id: 8, name: 'Roberto Garcia', seed: 8, wins: 9, losses: 18, points: 920, winRate: 33.3 }
]

type SortField = 'seed' | 'wins' | 'points' | 'winRate'

export default function APlayerIs() {
  const [sortBy, setSortBy] = useState<SortField>('seed')
  const [sortAsc, setSortAsc] = useState<boolean>(true)

  const sortedPlayers = [...MOCK_PLAYERS].sort((a, b) => {
    const aVal = a[sortBy]
    const bVal = b[sortBy]
    return sortAsc ? aVal - bVal : bVal - aVal
  })

  const handleSort = (field: SortField) => {
    if (sortBy === field) {
      setSortAsc(!sortAsc)
    } else {
      setSortBy(field)
      setSortAsc(field === 'seed')
    }
  }

  const getSeedBadgeColor = (seed: number): string => {
    if (seed === 1) return 'bg-yellow-500 text-white'
    if (seed === 2) return 'bg-gray-400 text-white'
    if (seed === 3) return 'bg-amber-700 text-white'
    if (seed <= 5) return 'bg-blue-500 text-white'
    return 'bg-gray-600 text-white'
  }

  const getWinRateColor = (winRate: number): string => {
    if (winRate >= 80) return 'text-green-600 font-bold'
    if (winRate >= 60) return 'text-green-500'
    if (winRate >= 50) return 'text-yellow-600'
    return 'text-red-500'
  }

  return (
    <section data-testid="aplayeris" className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Player Seeding</h1>
          <p className="text-gray-600">
            Players are seeded based on their tournament performance metrics
          </p>
        </div>

        {/* Sort Controls */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-semibold text-gray-700">Sort by:</span>
            <button
              data-testid="aplayeris-sort-seed"
              onClick={() => handleSort('seed')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                sortBy === 'seed'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Seed {sortBy === 'seed' && (sortAsc ? '↑' : '↓')}
            </button>
            <button
              data-testid="aplayeris-sort-wins"
              onClick={() => handleSort('wins')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                sortBy === 'wins'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Wins {sortBy === 'wins' && (sortAsc ? '↑' : '↓')}
            </button>
            <button
              data-testid="aplayeris-sort-points"
              onClick={() => handleSort('points')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                sortBy === 'points'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Points {sortBy === 'points' && (sortAsc ? '↑' : '↓')}
            </button>
            <button
              data-testid="aplayeris-sort-winrate"
              onClick={() => handleSort('winRate')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                sortBy === 'winRate'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Win Rate {sortBy === 'winRate' && (sortAsc ? '↑' : '↓')}
            </button>
          </div>
        </div>

        {/* Players List */}
        <div data-testid="aplayeris-list" className="space-y-4">
          {sortedPlayers.map((player) => (
            <div
              key={player.id}
              data-testid="aplayeris-item"
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition"
            >
              <div className="flex items-center justify-between flex-wrap gap-4">
                {/* Left: Seed and Name */}
                <div className="flex items-center gap-4">
                  <div
                    className={`${getSeedBadgeColor(
                      player.seed
                    )} w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg`}
                  >
                    {player.seed}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">{player.name}</h2>
                    <p className="text-sm text-gray-500">Seed #{player.seed}</p>
                  </div>
                </div>

                {/* Right: Performance Stats */}
                <div className="flex gap-6 flex-wrap">
                  {/* Win/Loss Record */}
                  <div className="text-center">
                    <p className="text-sm text-gray-500 mb-1">Record</p>
                    <p className="text-lg font-semibold text-gray-800">
                      {player.wins}W - {player.losses}L
                    </p>
                  </div>

                  {/* Win Rate */}
                  <div className="text-center">
                    <p className="text-sm text-gray-500 mb-1">Win Rate</p>
                    <p className={`text-lg font-semibold ${getWinRateColor(player.winRate)}`}>
                      {player.winRate.toFixed(1)}%
                    </p>
                  </div>

                  {/* Points */}
                  <div className="text-center">
                    <p className="text-sm text-gray-500 mb-1">Points</p>
                    <p className="text-lg font-semibold text-indigo-600">{player.points}</p>
                  </div>
                </div>
              </div>

              {/* Performance Bar */}
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all"
                    style={{ width: `${(player.points / 2000) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Seeding Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-600">Total Players</p>
              <p className="text-2xl font-bold text-indigo-600">{MOCK_PLAYERS.length}</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-gray-600">Avg Win Rate</p>
              <p className="text-2xl font-bold text-green-600">
                {(MOCK_PLAYERS.reduce((sum, p) => sum + p.winRate, 0) / MOCK_PLAYERS.length).toFixed(1)}%
              </p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="text-sm text-gray-600">Total Matches</p>
              <p className="text-2xl font-bold text-purple-600">
                {MOCK_PLAYERS.reduce((sum, p) => sum + p.wins + p.losses, 0)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
