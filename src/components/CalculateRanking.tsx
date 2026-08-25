/**
 * CalculateRanking — Calculate player ranking based on match wins and losses
 *
 * Features: ranking calculation, win/loss tracking, points system, player comparison, leaderboard display
 *
 * Ticket: SCRUM-1189 | Branch: proto/SCRUM-1186
 */

import React, { useState } from 'react'

interface Player {
  id: number
  name: string
  wins: number
  losses: number
  points: number
  ranking: number
}

// Mock data: players with their current wins and losses
const mockPlayers: Player[] = [
  { id: 1, name: 'Rafael Nadal', wins: 1080, losses: 220, points: 0, ranking: 0 },
  { id: 2, name: 'Roger Federer', wins: 1251, losses: 275, points: 0, ranking: 0 },
  { id: 3, name: 'Novak Djokovic', wins: 1052, losses: 210, points: 0, ranking: 0 },
  { id: 4, name: 'Andy Murray', wins: 739, losses: 215, points: 0, ranking: 0 },
  { id: 5, name: 'Stan Wawrinka', wins: 583, losses: 286, points: 0, ranking: 0 },
  { id: 6, name: 'Daniil Medvedev', wins: 425, losses: 152, points: 0, ranking: 0 },
  { id: 7, name: 'Alexander Zverev', wins: 392, losses: 168, points: 0, ranking: 0 },
  { id: 8, name: 'Stefanos Tsitsipas', wins: 318, losses: 142, points: 0, ranking: 0 }
]

export default function CalculateRanking() {
  const [players, setPlayers] = useState<Player[]>(() => calculateRankings(mockPlayers))
  const [selectedPlayer, setSelectedPlayer] = useState<number | null>(null)
  const [newWins, setNewWins] = useState<string>('')
  const [newLosses, setNewLosses] = useState<string>('')

  // Calculate ranking points based on wins and losses
  // Formula: (wins * 10) - (losses * 5) + (win percentage * 100)
  function calculateRankings(playerList: Player[]): Player[] {
    const playersWithPoints = playerList.map(player => {
      const totalMatches = player.wins + player.losses
      const winPercentage = totalMatches > 0 ? (player.wins / totalMatches) * 100 : 0
      const points = Math.round((player.wins * 10) - (player.losses * 5) + winPercentage)
      return { ...player, points }
    })

    // Sort by points descending
    const sortedPlayers = [...playersWithPoints].sort((a, b) => b.points - a.points)
    
    // Assign rankings
    return sortedPlayers.map((player, index) => ({
      ...player,
      ranking: index + 1
    }))
  }

  const handleRecalculate = () => {
    if (selectedPlayer === null) return

    const wins = parseInt(newWins) || 0
    const losses = parseInt(newLosses) || 0

    const updatedPlayers = players.map(player => {
      if (player.id === selectedPlayer) {
        return {
          ...player,
          wins: player.wins + wins,
          losses: player.losses + losses
        }
      }
      return player
    })

    setPlayers(calculateRankings(updatedPlayers))
    setNewWins('')
    setNewLosses('')
    setSelectedPlayer(null)
  }

  const handleReset = () => {
    setPlayers(calculateRankings(mockPlayers))
    setSelectedPlayer(null)
    setNewWins('')
    setNewLosses('')
  }

  const selectedPlayerData = players.find(p => p.id === selectedPlayer)

  return (
    <div data-testid="calculateranking" className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Player Ranking Calculator
          </h1>
          <p className="text-gray-600">
            Calculate player rankings based on match wins and losses
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Ranking Formula Card */}
          <div className="bg-white rounded-lg shadow-md p-6 lg:col-span-3">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              Ranking Formula
            </h2>
            <div className="bg-indigo-50 rounded p-4 font-mono text-sm">
              <p className="text-gray-700">
                <span className="font-bold">Points</span> = (Wins × 10) - (Losses × 5) + Win%
              </p>
              <p className="text-gray-600 text-xs mt-2">
                Win% = (Wins / Total Matches) × 100
              </p>
            </div>
          </div>

          {/* Player Selection Card */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Update Player Stats
            </h2>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="player-select" className="block text-sm font-medium text-gray-700 mb-2">
                  Select Player
                </label>
                <select
                  id="player-select"
                  data-testid="calculateranking-player"
                  value={selectedPlayer || ''}
                  onChange={(e) => setSelectedPlayer(Number(e.target.value) || null)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Choose a player...</option>
                  {players.map(player => (
                    <option key={player.id} value={player.id}>
                      {player.name} (Rank #{player.ranking})
                    </option>
                  ))}
                </select>
              </div>

              {selectedPlayerData && (
                <div className="bg-gray-50 rounded p-3 text-sm">
                  <p className="font-medium text-gray-800">{selectedPlayerData.name}</p>
                  <p className="text-gray-600">Current: {selectedPlayerData.wins}W - {selectedPlayerData.losses}L</p>
                  <p className="text-gray-600">Rank: #{selectedPlayerData.ranking} ({selectedPlayerData.points} pts)</p>
                </div>
              )}

              <div>
                <label htmlFor="wins-input" className="block text-sm font-medium text-gray-700 mb-2">
                  Add Wins
                </label>
                <input
                  id="wins-input"
                  data-testid="calculateranking-wins"
                  type="number"
                  min="0"
                  value={newWins}
                  onChange={(e) => setNewWins(e.target.value)}
                  placeholder="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label htmlFor="losses-input" className="block text-sm font-medium text-gray-700 mb-2">
                  Add Losses
                </label>
                <input
                  id="losses-input"
                  data-testid="calculateranking-losses"
                  type="number"
                  min="0"
                  value={newLosses}
                  onChange={(e) => setNewLosses(e.target.value)}
                  placeholder="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex gap-2">
                <button
                  data-testid="calculateranking-recalculate"
                  onClick={handleRecalculate}
                  disabled={selectedPlayer === null || (!newWins && !newLosses)}
                  className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
                >
                  Recalculate
                </button>
                <button
                  data-testid="calculateranking-reset"
                  onClick={handleReset}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors font-medium"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          {/* Rankings Leaderboard */}
          <div className="bg-white rounded-lg shadow-md p-6 lg:col-span-2">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Current Rankings
            </h2>
            
            <div data-testid="calculateranking-list" className="space-y-2">
              {players.map((player, index) => {
                const totalMatches = player.wins + player.losses
                const winPercentage = totalMatches > 0 
                  ? ((player.wins / totalMatches) * 100).toFixed(1)
                  : '0.0'

                return (
                  <div
                    key={player.id}
                    data-testid="calculateranking-item"
                    className={`flex items-center justify-between p-4 rounded-lg transition-colors ${
                      player.id === selectedPlayer
                        ? 'bg-indigo-100 border-2 border-indigo-400'
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-600 text-white font-bold">
                        {player.ranking}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{player.name}</h3>
                        <p className="text-sm text-gray-600">
                          {player.wins}W - {player.losses}L ({winPercentage}% win rate)
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-indigo-600">{player.points}</p>
                      <p className="text-xs text-gray-500">points</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Statistics Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-sm font-medium text-gray-600 mb-1">Total Players</h3>
            <p className="text-3xl font-bold text-gray-900">{players.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-sm font-medium text-gray-600 mb-1">Total Matches</h3>
            <p className="text-3xl font-bold text-gray-900">
              {players.reduce((sum, p) => sum + p.wins + p.losses, 0)}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-sm font-medium text-gray-600 mb-1">Top Player</h3>
            <p className="text-xl font-bold text-indigo-600">{players[0]?.name}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-sm font-medium text-gray-600 mb-1">Top Score</h3>
            <p className="text-3xl font-bold text-indigo-600">{players[0]?.points}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
