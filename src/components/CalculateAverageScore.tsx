/**
 * CalculateAverageScore — Calculate average score for a player with total scores and matches
 *
 * Features: player scoring, average calculation, match statistics, performance tracking, score analytics
 *
 * Ticket: SCRUM-1171 | Branch: proto/SCRUM-1163
 */

import React, { useState } from 'react'

interface Player {
  id: number
  name: string
  totalScore: number
  matchesPlayed: number
  average: number
}

const MOCK_PLAYERS: Player[] = [
  { id: 1, name: 'Alex Johnson', totalScore: 450, matchesPlayed: 15, average: 30.0 },
  { id: 2, name: 'Sarah Williams', totalScore: 680, matchesPlayed: 20, average: 34.0 },
  { id: 3, name: 'Marcus Chen', totalScore: 525, matchesPlayed: 14, average: 37.5 },
  { id: 4, name: 'Emma Davis', totalScore: 790, matchesPlayed: 22, average: 35.9 },
  { id: 5, name: 'Jordan Lee', totalScore: 420, matchesPlayed: 12, average: 35.0 },
  { id: 6, name: 'Taylor Brooks', totalScore: 550, matchesPlayed: 16, average: 34.4 },
  { id: 7, name: 'Chris Martinez', totalScore: 630, matchesPlayed: 18, average: 35.0 },
]

export default function CalculateAverageScore() {
  const [players, setPlayers] = useState<Player[]>(MOCK_PLAYERS)
  const [newPlayerName, setNewPlayerName] = useState('')
  const [totalScore, setTotalScore] = useState('')
  const [matchesPlayed, setMatchesPlayed] = useState('')
  const [selectedPlayerId, setSelectedPlayerId] = useState<number | null>(null)
  const [editMode, setEditMode] = useState(false)

  const calculateAverage = (score: number, matches: number): number => {
    if (matches === 0) return 0
    return Math.round((score / matches) * 10) / 10
  }

  const handleAddPlayer = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newPlayerName.trim() || !totalScore || !matchesPlayed) return

    const score = parseInt(totalScore, 10)
    const matches = parseInt(matchesPlayed, 10)

    if (isNaN(score) || isNaN(matches) || matches < 0 || score < 0) return

    const newPlayer: Player = {
      id: Math.max(...players.map(p => p.id), 0) + 1,
      name: newPlayerName.trim(),
      totalScore: score,
      matchesPlayed: matches,
      average: calculateAverage(score, matches),
    }

    setPlayers([...players, newPlayer])
    resetForm()
  }

  const handleUpdatePlayer = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedPlayerId === null || !totalScore || !matchesPlayed) return

    const score = parseInt(totalScore, 10)
    const matches = parseInt(matchesPlayed, 10)

    if (isNaN(score) || isNaN(matches) || matches < 0 || score < 0) return

    setPlayers(
      players.map(player =>
        player.id === selectedPlayerId
          ? {
              ...player,
              totalScore: score,
              matchesPlayed: matches,
              average: calculateAverage(score, matches),
            }
          : player
      )
    )
    resetForm()
  }

  const handleEditPlayer = (player: Player) => {
    setSelectedPlayerId(player.id)
    setNewPlayerName(player.name)
    setTotalScore(player.totalScore.toString())
    setMatchesPlayed(player.matchesPlayed.toString())
    setEditMode(true)
  }

  const handleDeletePlayer = (id: number) => {
    setPlayers(players.filter(player => player.id !== id))
  }

  const resetForm = () => {
    setNewPlayerName('')
    setTotalScore('')
    setMatchesPlayed('')
    setSelectedPlayerId(null)
    setEditMode(false)
  }

  const overallStats = {
    totalPlayers: players.length,
    totalMatches: players.reduce((sum, p) => sum + p.matchesPlayed, 0),
    totalScore: players.reduce((sum, p) => sum + p.totalScore, 0),
    averageScore:
      players.length > 0
        ? calculateAverage(
            players.reduce((sum, p) => sum + p.totalScore, 0),
            players.reduce((sum, p) => sum + p.matchesPlayed, 0)
          )
        : 0,
  }

  return (
    <div data-testid="calculateaveragescore" className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Player Average Score Calculator</h1>
          <p className="text-gray-600">Track player performance and calculate average scores</p>
        </div>

        {/* Overall Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-sm font-medium text-gray-500 mb-1">Total Players</div>
            <div className="text-3xl font-bold text-indigo-600">{overallStats.totalPlayers}</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-sm font-medium text-gray-500 mb-1">Total Matches</div>
            <div className="text-3xl font-bold text-blue-600">{overallStats.totalMatches}</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-sm font-medium text-gray-500 mb-1">Total Score</div>
            <div className="text-3xl font-bold text-green-600">{overallStats.totalScore}</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-sm font-medium text-gray-500 mb-1">Overall Average</div>
            <div className="text-3xl font-bold text-purple-600">{overallStats.averageScore}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Add/Edit Player Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {editMode ? 'Edit Player' : 'Add New Player'}
              </h2>
              <form onSubmit={editMode ? handleUpdatePlayer : handleAddPlayer}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="playerName" className="block text-sm font-medium text-gray-700 mb-1">
                      Player Name
                    </label>
                    <input
                      id="playerName"
                      type="text"
                      data-testid="calculateaveragescore-name"
                      value={newPlayerName}
                      onChange={(e) => setNewPlayerName(e.target.value)}
                      disabled={editMode}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-100"
                      placeholder="Enter player name"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="totalScore" className="block text-sm font-medium text-gray-700 mb-1">
                      Total Score
                    </label>
                    <input
                      id="totalScore"
                      type="number"
                      data-testid="calculateaveragescore-score"
                      value={totalScore}
                      onChange={(e) => setTotalScore(e.target.value)}
                      min="0"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Enter total score"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="matchesPlayed" className="block text-sm font-medium text-gray-700 mb-1">
                      Matches Played
                    </label>
                    <input
                      id="matchesPlayed"
                      type="number"
                      data-testid="calculateaveragescore-matches"
                      value={matchesPlayed}
                      onChange={(e) => setMatchesPlayed(e.target.value)}
                      min="0"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Enter matches played"
                      required
                    />
                  </div>

                  {totalScore && matchesPlayed && parseInt(matchesPlayed, 10) > 0 && (
                    <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                      <div className="text-sm font-medium text-gray-700 mb-1">Calculated Average</div>
                      <div className="text-2xl font-bold text-indigo-600">
                        {calculateAverage(parseInt(totalScore, 10), parseInt(matchesPlayed, 10))}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <button
                      type="submit"
                      data-testid="calculateaveragescore-submit"
                      className="flex-1 bg-indigo-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      {editMode ? 'Update Player' : 'Add Player'}
                    </button>
                    {editMode && (
                      <button
                        type="button"
                        data-testid="calculateaveragescore-cancel"
                        onClick={resetForm}
                        className="flex-1 bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Players List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Players & Averages</h2>
              
              {players.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <p className="text-lg">No players added yet</p>
                  <p className="text-sm">Add your first player to start calculating averages</p>
                </div>
              ) : (
                <div data-testid="calculateaveragescore-list" className="space-y-3">
                  {players.map((player) => (
                    <div
                      key={player.id}
                      data-testid="calculateaveragescore-item"
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{player.name}</h3>
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <span className="text-gray-500">Total Score:</span>
                              <span className="ml-2 font-semibold text-green-600">{player.totalScore}</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Matches:</span>
                              <span className="ml-2 font-semibold text-blue-600">{player.matchesPlayed}</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Average:</span>
                              <span className="ml-2 font-bold text-indigo-600 text-base">
                                {player.average}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <button
                            data-testid="calculateaveragescore-edit"
                            onClick={() => handleEditPlayer(player)}
                            className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            data-testid="calculateaveragescore-delete"
                            onClick={() => handleDeletePlayer(player.id)}
                            className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
