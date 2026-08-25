/**
 * CalculateAverage — Calculate and display average scores for tennis players
 *
 * Features: player score tracking, average calculation, match history display, real-time updates, performance metrics
 *
 * Ticket: SCRUM-1194 | Branch: proto/SCRUM-1186
 */

import React, { useState } from 'react'

interface PlayerMatch {
  id: number
  playerName: string
  score: number
  matchDate: string
  opponent: string
}

interface PlayerStats {
  playerName: string
  totalScore: number
  matchCount: number
  averageScore: number
}

const MOCK_MATCHES: PlayerMatch[] = [
  { id: 1, playerName: 'Roger Federer', score: 85, matchDate: '2024-08-20', opponent: 'Rafael Nadal' },
  { id: 2, playerName: 'Roger Federer', score: 92, matchDate: '2024-08-18', opponent: 'Novak Djokovic' },
  { id: 3, playerName: 'Roger Federer', score: 78, matchDate: '2024-08-15', opponent: 'Andy Murray' },
  { id: 4, playerName: 'Serena Williams', score: 95, matchDate: '2024-08-22', opponent: 'Venus Williams' },
  { id: 5, playerName: 'Serena Williams', score: 88, matchDate: '2024-08-19', opponent: 'Naomi Osaka' },
  { id: 6, playerName: 'Serena Williams', score: 91, matchDate: '2024-08-16', opponent: 'Maria Sharapova' },
  { id: 7, playerName: 'Rafael Nadal', score: 87, matchDate: '2024-08-21', opponent: 'Novak Djokovic' },
  { id: 8, playerName: 'Rafael Nadal', score: 83, matchDate: '2024-08-17', opponent: 'Roger Federer' },
]

export default function CalculateAverage() {
  const [matches] = useState<PlayerMatch[]>(MOCK_MATCHES)
  const [selectedPlayer, setSelectedPlayer] = useState<string>('')
  const [newScore, setNewScore] = useState<string>('')
  const [newOpponent, setNewOpponent] = useState<string>('')
  const [localMatches, setLocalMatches] = useState<PlayerMatch[]>(MOCK_MATCHES)

  // Get unique player names
  const uniquePlayers = Array.from(new Set(localMatches.map(m => m.playerName)))

  // Calculate stats for all players
  const calculatePlayerStats = (): PlayerStats[] => {
    const statsMap = new Map<string, { totalScore: number; matchCount: number }>()

    localMatches.forEach(match => {
      const existing = statsMap.get(match.playerName) || { totalScore: 0, matchCount: 0 }
      statsMap.set(match.playerName, {
        totalScore: existing.totalScore + match.score,
        matchCount: existing.matchCount + 1,
      })
    })

    return Array.from(statsMap.entries()).map(([playerName, data]) => ({
      playerName,
      totalScore: data.totalScore,
      matchCount: data.matchCount,
      averageScore: Math.round((data.totalScore / data.matchCount) * 100) / 100,
    }))
  }

  const playerStats = calculatePlayerStats()

  // Get stats for selected player
  const selectedPlayerStats = selectedPlayer
    ? playerStats.find(s => s.playerName === selectedPlayer)
    : null

  // Get matches for selected player
  const selectedPlayerMatches = selectedPlayer
    ? localMatches.filter(m => m.playerName === selectedPlayer)
    : []

  // Add new match score
  const handleAddScore = () => {
    if (!selectedPlayer || !newScore || !newOpponent) {
      return
    }

    const scoreNum = parseFloat(newScore)
    if (isNaN(scoreNum) || scoreNum < 0 || scoreNum > 100) {
      return
    }

    const newMatch: PlayerMatch = {
      id: Math.max(...localMatches.map(m => m.id), 0) + 1,
      playerName: selectedPlayer,
      score: scoreNum,
      matchDate: new Date().toISOString().split('T')[0],
      opponent: newOpponent,
    }

    setLocalMatches([...localMatches, newMatch])
    setNewScore('')
    setNewOpponent('')
  }

  return (
    <section data-testid="calculateaverage" className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Player Average Score Calculator</h1>
          <p className="text-gray-600 mb-6">Calculate and track average scores for tennis players</p>

          {/* Player Selection */}
          <div className="mb-8">
            <label htmlFor="player-select" className="block text-sm font-semibold text-gray-700 mb-2">
              Select Player
            </label>
            <select
              id="player-select"
              data-testid="calculateaverage-player"
              value={selectedPlayer}
              onChange={(e) => setSelectedPlayer(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value="">-- Choose a player --</option>
              {uniquePlayers.map(player => (
                <option key={player} value={player}>
                  {player}
                </option>
              ))}
            </select>
          </div>

          {/* Selected Player Stats */}
          {selectedPlayerStats && (
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-6 mb-8 text-white">
              <h2 className="text-2xl font-bold mb-4">{selectedPlayerStats.playerName}</h2>
              <div className="grid grid-cols-3 gap-6">
                <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                  <p className="text-sm opacity-90 mb-1">Total Score</p>
                  <p className="text-3xl font-bold">{selectedPlayerStats.totalScore}</p>
                </div>
                <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                  <p className="text-sm opacity-90 mb-1">Matches Played</p>
                  <p className="text-3xl font-bold">{selectedPlayerStats.matchCount}</p>
                </div>
                <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                  <p className="text-sm opacity-90 mb-1">Average Score</p>
                  <p className="text-3xl font-bold">{selectedPlayerStats.averageScore}</p>
                </div>
              </div>
            </div>
          )}

          {/* Add New Score */}
          {selectedPlayer && (
            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Add New Match Score</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="score-input" className="block text-sm font-semibold text-gray-700 mb-2">
                    Score (0-100)
                  </label>
                  <input
                    id="score-input"
                    type="number"
                    data-testid="calculateaverage-score"
                    value={newScore}
                    onChange={(e) => setNewScore(e.target.value)}
                    min="0"
                    max="100"
                    placeholder="Enter score"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="opponent-input" className="block text-sm font-semibold text-gray-700 mb-2">
                    Opponent
                  </label>
                  <input
                    id="opponent-input"
                    type="text"
                    data-testid="calculateaverage-opponent"
                    value={newOpponent}
                    onChange={(e) => setNewOpponent(e.target.value)}
                    placeholder="Enter opponent name"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    data-testid="calculateaverage-submit"
                    onClick={handleAddScore}
                    className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                    disabled={!selectedPlayer || !newScore || !newOpponent}
                  >
                    Add Score
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Match History for Selected Player */}
          {selectedPlayer && selectedPlayerMatches.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Match History</h3>
              <div data-testid="calculateaverage-list" className="space-y-3">
                {selectedPlayerMatches.map(match => (
                  <div
                    key={match.id}
                    data-testid="calculateaverage-item"
                    className="bg-white border-2 border-gray-200 rounded-lg p-4 hover:border-blue-400 transition-colors"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold text-gray-800">vs {match.opponent}</p>
                        <p className="text-sm text-gray-600">{match.matchDate}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-blue-600">{match.score}</p>
                        <p className="text-xs text-gray-500">points</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* All Players Stats Table */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">All Players Statistics</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100 border-b-2 border-gray-300">
                  <th className="px-6 py-3 text-left text-sm font-bold text-gray-700">Player Name</th>
                  <th className="px-6 py-3 text-center text-sm font-bold text-gray-700">Matches</th>
                  <th className="px-6 py-3 text-center text-sm font-bold text-gray-700">Total Score</th>
                  <th className="px-6 py-3 text-center text-sm font-bold text-gray-700">Average Score</th>
                </tr>
              </thead>
              <tbody data-testid="calculateaverage-stats-list">
                {playerStats.map(stat => (
                  <tr
                    key={stat.playerName}
                    data-testid="calculateaverage-stats-item"
                    className="border-b border-gray-200 hover:bg-blue-50 transition-colors"
                  >
                    <td className="px-6 py-4 font-semibold text-gray-800">{stat.playerName}</td>
                    <td className="px-6 py-4 text-center text-gray-700">{stat.matchCount}</td>
                    <td className="px-6 py-4 text-center text-gray-700">{stat.totalScore}</td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-block bg-blue-100 text-blue-800 font-bold px-3 py-1 rounded-full">
                        {stat.averageScore}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}
