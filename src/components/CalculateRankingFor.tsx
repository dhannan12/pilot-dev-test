/**
 * CalculateRankingFor — Calculates and displays player rankings based on wins and losses
 *
 * Features: win/loss tracking, ranking calculation, win rate percentage, leaderboard display, performance metrics
 *
 * Ticket: SCRUM-1166 | Branch: proto/SCRUM-1163
 */

import React, { useState } from 'react'

interface Player {
  id: number
  name: string
  wins: number
  losses: number
}

const mockPlayers: Player[] = [
  { id: 1, name: 'Alex Martinez', wins: 45, losses: 12 },
  { id: 2, name: 'Jordan Lee', wins: 38, losses: 19 },
  { id: 3, name: 'Taylor Smith', wins: 52, losses: 8 },
  { id: 4, name: 'Casey Johnson', wins: 31, losses: 26 },
  { id: 5, name: 'Morgan Davis', wins: 44, losses: 15 },
  { id: 6, name: 'Riley Brown', wins: 29, losses: 28 },
  { id: 7, name: 'Jamie Wilson', wins: 41, losses: 17 },
]

export default function CalculateRankingFor() {
  const [players] = useState<Player[]>(mockPlayers)
  const [selectedPlayer, setSelectedPlayer] = useState<number | null>(null)

  // Calculate win rate percentage
  const calculateWinRate = (wins: number, losses: number): number => {
    const total = wins + losses
    if (total === 0) return 0
    return (wins / total) * 100
  }

  // Calculate ranking score (wins - losses) + win rate factor
  const calculateRankingScore = (wins: number, losses: number): number => {
    const netWins = wins - losses
    const winRate = calculateWinRate(wins, losses)
    return netWins * 10 + winRate
  }

  // Sort players by ranking score
  const rankedPlayers = [...players]
    .map((player) => ({
      ...player,
      winRate: calculateWinRate(player.wins, player.losses),
      rankingScore: calculateRankingScore(player.wins, player.losses),
    }))
    .sort((a, b) => b.rankingScore - a.rankingScore)
    .map((player, index) => ({
      ...player,
      rank: index + 1,
    }))

  const selectedPlayerData = selectedPlayer
    ? rankedPlayers.find((p) => p.id === selectedPlayer)
    : null

  return (
    <div data-testid="calculaterankingfor" className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Player Rankings</h1>
          <p className="text-gray-600">Calculate rankings based on wins and losses</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Leaderboard */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Leaderboard</h2>
            <div data-testid="calculaterankingfor-list" className="space-y-3">
              {rankedPlayers.map((player) => (
                <div
                  key={player.id}
                  data-testid="calculaterankingfor-item"
                  onClick={() => setSelectedPlayer(player.id)}
                  className={`flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedPlayer === player.id
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold">
                      {player.rank}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{player.name}</h3>
                      <div className="flex gap-4 text-sm text-gray-600">
                        <span className="text-green-600 font-medium">{player.wins}W</span>
                        <span className="text-red-600 font-medium">{player.losses}L</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-indigo-600">
                      {player.winRate.toFixed(1)}%
                    </div>
                    <div className="text-xs text-gray-500">Win Rate</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Player Details Panel */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Player Details</h2>
            {selectedPlayerData ? (
              <div className="space-y-4">
                <div className="text-center pb-4 border-b border-gray-200">
                  <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-3xl font-bold text-white">
                    #{selectedPlayerData.rank}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">
                    {selectedPlayerData.name}
                  </h3>
                  <p className="text-sm text-gray-500">Current Ranking</p>
                </div>

                <div className="space-y-3">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">Total Matches</div>
                    <div className="text-2xl font-bold text-gray-800">
                      {selectedPlayerData.wins + selectedPlayerData.losses}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="text-sm text-green-600 mb-1">Wins</div>
                      <div className="text-2xl font-bold text-green-700">
                        {selectedPlayerData.wins}
                      </div>
                    </div>
                    <div className="bg-red-50 rounded-lg p-4">
                      <div className="text-sm text-red-600 mb-1">Losses</div>
                      <div className="text-2xl font-bold text-red-700">
                        {selectedPlayerData.losses}
                      </div>
                    </div>
                  </div>

                  <div className="bg-indigo-50 rounded-lg p-4">
                    <div className="text-sm text-indigo-600 mb-1">Win Rate</div>
                    <div className="text-2xl font-bold text-indigo-700">
                      {selectedPlayerData.winRate.toFixed(1)}%
                    </div>
                  </div>

                  <div className="bg-purple-50 rounded-lg p-4">
                    <div className="text-sm text-purple-600 mb-1">Ranking Score</div>
                    <div className="text-2xl font-bold text-purple-700">
                      {selectedPlayerData.rankingScore.toFixed(1)}
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">Net Wins</div>
                    <div className={`text-2xl font-bold ${
                      selectedPlayerData.wins - selectedPlayerData.losses > 0
                        ? 'text-green-600'
                        : 'text-gray-800'
                    }`}>
                      +{selectedPlayerData.wins - selectedPlayerData.losses}
                    </div>
                  </div>
                </div>

                <button
                  data-testid="calculaterankingfor-clear"
                  onClick={() => setSelectedPlayer(null)}
                  className="w-full mt-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg transition-colors"
                >
                  Clear Selection
                </button>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-400">
                <svg
                  className="w-16 h-16 mx-auto mb-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <p>Select a player to view details</p>
              </div>
            )}
          </div>
        </div>

        {/* Statistics Summary */}
        <div className="mt-6 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Statistics</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <div className="text-sm text-blue-600 mb-1">Total Players</div>
              <div className="text-3xl font-bold text-blue-700">{players.length}</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <div className="text-sm text-green-600 mb-1">Total Wins</div>
              <div className="text-3xl font-bold text-green-700">
                {players.reduce((sum, p) => sum + p.wins, 0)}
              </div>
            </div>
            <div className="bg-red-50 rounded-lg p-4 text-center">
              <div className="text-sm text-red-600 mb-1">Total Losses</div>
              <div className="text-3xl font-bold text-red-700">
                {players.reduce((sum, p) => sum + p.losses, 0)}
              </div>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 text-center">
              <div className="text-sm text-purple-600 mb-1">Avg Win Rate</div>
              <div className="text-3xl font-bold text-purple-700">
                {(
                  players.reduce((sum, p) => sum + calculateWinRate(p.wins, p.losses), 0) /
                  players.length
                ).toFixed(1)}
                %
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
