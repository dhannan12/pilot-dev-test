/**
 * PlayersMustHave — Displays minimum Elo rating requirement for tournament participation
 *
 * Features: Elo requirement display, player eligibility status, visual indicators, filtering by eligibility, minimum rating threshold
 *
 * Ticket: SCRUM-1215 | Branch: proto/SCRUM-1211
 */

import React, { useState } from 'react'

interface Player {
  id: number
  name: string
  eloRating: number
  country: string
  gamesPlayed: number
}

const MOCK_PLAYERS: Player[] = [
  { id: 1, name: 'Magnus Carlsen', eloRating: 2850, country: 'Norway', gamesPlayed: 1245 },
  { id: 2, name: 'Hikaru Nakamura', eloRating: 2785, country: 'USA', gamesPlayed: 1098 },
  { id: 3, name: 'Fabiano Caruana', eloRating: 2795, country: 'USA', gamesPlayed: 987 },
  { id: 4, name: 'Alireza Firouzja', eloRating: 2760, country: 'France', gamesPlayed: 756 },
  { id: 5, name: 'Ding Liren', eloRating: 2780, country: 'China', gamesPlayed: 1156 },
  { id: 6, name: 'Ian Nepomniachtchi', eloRating: 2775, country: 'Russia', gamesPlayed: 1023 },
  { id: 7, name: 'John Smith', eloRating: 1650, country: 'USA', gamesPlayed: 234 },
  { id: 8, name: 'Sarah Johnson', eloRating: 1890, country: 'UK', gamesPlayed: 445 },
]

export default function PlayersMustHave() {
  const [minimumElo, setMinimumElo] = useState<number>(2000)
  const [filterEligible, setFilterEligible] = useState<'all' | 'eligible' | 'ineligible'>('all')

  const isEligible = (player: Player): boolean => player.eloRating >= minimumElo

  const filteredPlayers = MOCK_PLAYERS.filter((player) => {
    if (filterEligible === 'eligible') return isEligible(player)
    if (filterEligible === 'ineligible') return !isEligible(player)
    return true
  })

  const eligibleCount = MOCK_PLAYERS.filter(isEligible).length
  const ineligibleCount = MOCK_PLAYERS.length - eligibleCount

  return (
    <div data-testid="playersmusthave" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Tournament Eligibility Requirements
          </h1>
          <p className="text-gray-600">
            Players must meet the minimum Elo rating to participate in the tournament
          </p>
        </div>

        {/* Minimum Elo Rating Settings */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Minimum Elo Rating Requirement
          </h2>
          <div className="flex items-center gap-4 mb-4">
            <label htmlFor="minimum-elo" className="text-gray-700 font-medium">
              Set Minimum Elo:
            </label>
            <input
              id="minimum-elo"
              type="number"
              data-testid="playersmusthave-minimum-elo"
              value={minimumElo}
              onChange={(e) => setMinimumElo(Number(e.target.value))}
              className="border border-gray-300 rounded-md px-4 py-2 w-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="0"
              max="3000"
            />
            <div className="text-2xl font-bold text-blue-600">{minimumElo}</div>
          </div>
          <div className="flex gap-4 text-sm">
            <div className="bg-green-50 border border-green-200 rounded-md px-4 py-2">
              <span className="font-semibold text-green-800">Eligible Players:</span>{' '}
              <span className="text-green-600">{eligibleCount}</span>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-md px-4 py-2">
              <span className="font-semibold text-red-800">Ineligible Players:</span>{' '}
              <span className="text-red-600">{ineligibleCount}</span>
            </div>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Filter Players</h2>
          <div className="flex gap-3">
            <button
              data-testid="playersmusthave-filter-all"
              onClick={() => setFilterEligible('all')}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                filterEligible === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              All Players ({MOCK_PLAYERS.length})
            </button>
            <button
              data-testid="playersmusthave-filter-eligible"
              onClick={() => setFilterEligible('eligible')}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                filterEligible === 'eligible'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Eligible Only ({eligibleCount})
            </button>
            <button
              data-testid="playersmusthave-filter-ineligible"
              onClick={() => setFilterEligible('ineligible')}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                filterEligible === 'ineligible'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Ineligible Only ({ineligibleCount})
            </button>
          </div>
        </div>

        {/* Players List */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Player Eligibility Status
          </h2>
          <div data-testid="playersmusthave-list" className="space-y-3">
            {filteredPlayers.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                No players match the current filter
              </p>
            ) : (
              filteredPlayers.map((player) => {
                const eligible = isEligible(player)
                return (
                  <div
                    key={player.id}
                    data-testid="playersmusthave-item"
                    className={`border rounded-lg p-4 transition-all ${
                      eligible
                        ? 'border-green-300 bg-green-50'
                        : 'border-red-300 bg-red-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {player.name}
                          </h3>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold ${
                              eligible
                                ? 'bg-green-600 text-white'
                                : 'bg-red-600 text-white'
                            }`}
                          >
                            {eligible ? '✓ ELIGIBLE' : '✗ INELIGIBLE'}
                          </span>
                        </div>
                        <div className="flex gap-4 mt-2 text-sm text-gray-600">
                          <span>
                            <strong>Country:</strong> {player.country}
                          </span>
                          <span>
                            <strong>Games Played:</strong> {player.gamesPlayed}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-gray-900">
                          {player.eloRating}
                        </div>
                        <div className="text-xs text-gray-500">Elo Rating</div>
                        {!eligible && (
                          <div className="text-xs text-red-600 mt-1">
                            Need {minimumElo - player.eloRating} more points
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>

        {/* Summary Footer */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-blue-900 text-center">
            <strong>Tournament Requirement:</strong> Players with Elo rating of{' '}
            <strong className="text-blue-700">{minimumElo}</strong> or higher are eligible
            to participate.
          </p>
        </div>
      </div>
    </div>
  )
}
