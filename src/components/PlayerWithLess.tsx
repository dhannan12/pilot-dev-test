/**
 * PlayerWithLess — Handles players with insufficient matches attempting league table inclusion
 *
 * Features: minimum match validation, eligibility status, match history display, warning messages, player statistics
 *
 * Ticket: SCRUM-1167 | Branch: proto/SCRUM-1163
 */

import React, { useState } from 'react'

interface Player {
  id: string
  name: string
  matchesPlayed: number
  wins: number
  losses: number
  draws: number
  points: number
  eligible: boolean
  lastMatchDate?: string
  upcomingMatches: number
}

const mockPlayers: Player[] = [
  {
    id: 'player-001',
    name: 'Alex Thompson',
    matchesPlayed: 2,
    wins: 2,
    losses: 0,
    draws: 0,
    points: 6,
    eligible: false,
    lastMatchDate: '2026-08-20',
    upcomingMatches: 2,
  },
  {
    id: 'player-002',
    name: 'Sarah Martinez',
    matchesPlayed: 1,
    wins: 0,
    losses: 1,
    draws: 0,
    points: 0,
    eligible: false,
    lastMatchDate: '2026-08-18',
    upcomingMatches: 3,
  },
  {
    id: 'player-003',
    name: 'James Wilson',
    matchesPlayed: 2,
    wins: 1,
    losses: 0,
    draws: 1,
    points: 4,
    eligible: false,
    lastMatchDate: '2026-08-22',
    upcomingMatches: 1,
  },
  {
    id: 'player-004',
    name: 'Emma Davis',
    matchesPlayed: 0,
    wins: 0,
    losses: 0,
    draws: 0,
    points: 0,
    eligible: false,
    upcomingMatches: 4,
  },
  {
    id: 'player-005',
    name: 'Michael Chen',
    matchesPlayed: 1,
    wins: 1,
    losses: 0,
    draws: 0,
    points: 3,
    eligible: false,
    lastMatchDate: '2026-08-23',
    upcomingMatches: 2,
  },
  {
    id: 'player-006',
    name: 'Olivia Brown',
    matchesPlayed: 2,
    wins: 0,
    losses: 2,
    draws: 0,
    points: 0,
    eligible: false,
    lastMatchDate: '2026-08-21',
    upcomingMatches: 3,
  },
]

const MINIMUM_MATCHES_REQUIRED = 3

export default function PlayerWithLess() {
  const [players] = useState<Player[]>(mockPlayers)
  const [searchTerm, setSearchTerm] = useState('')
  const [showOnlyIneligible, setShowOnlyIneligible] = useState(true)

  const filteredPlayers = players.filter(player => {
    const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = showOnlyIneligible ? player.matchesPlayed < MINIMUM_MATCHES_REQUIRED : true
    return matchesSearch && matchesFilter
  })

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  const getMatchesRemaining = (played: number) => {
    return Math.max(0, MINIMUM_MATCHES_REQUIRED - played)
  }

  const getEligibilityStatus = (matchesPlayed: number) => {
    const remaining = getMatchesRemaining(matchesPlayed)
    if (remaining === 0) {
      return { text: 'Eligible', color: 'bg-green-100 text-green-800 border-green-200' }
    } else if (remaining === 1) {
      return { text: '1 match needed', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' }
    } else {
      return { text: `${remaining} matches needed`, color: 'bg-red-100 text-red-800 border-red-200' }
    }
  }

  const handleAttemptInclusion = (player: Player) => {
    // This would normally trigger an API call or validation flow
    alert(`${player.name} cannot be included in the league table. ${getMatchesRemaining(player.matchesPlayed)} more match(es) required.`)
  }

  return (
    <section data-testid="playerwithless" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            League Table Eligibility Status
          </h1>
          <p className="text-gray-600 mb-4">
            Players must complete at least {MINIMUM_MATCHES_REQUIRED} matches to be included in the league table
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <span className="text-2xl">ℹ️</span>
              <div>
                <h3 className="font-semibold text-blue-900 mb-1">Eligibility Requirements</h3>
                <p className="text-sm text-blue-800">
                  To ensure fair rankings, players need a minimum of {MINIMUM_MATCHES_REQUIRED} completed matches.
                  This prevents premature rankings based on insufficient data.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <input
                type="text"
                data-testid="playerwithless-search"
                placeholder="Search by player name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                data-testid="playerwithless-filter-ineligible"
                id="ineligible-filter"
                checked={showOnlyIneligible}
                onChange={(e) => setShowOnlyIneligible(e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="ineligible-filter" className="text-sm font-medium text-gray-700">
                Show only ineligible players
              </label>
            </div>
          </div>

          <div className="text-sm text-gray-600">
            Showing {filteredPlayers.length} player{filteredPlayers.length !== 1 ? 's' : ''}
          </div>
        </div>

        <div data-testid="playerwithless-list" className="space-y-4">
          {filteredPlayers.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center text-gray-500">
              No players found matching your criteria
            </div>
          ) : (
            filteredPlayers.map((player) => {
              const status = getEligibilityStatus(player.matchesPlayed)
              const matchesNeeded = getMatchesRemaining(player.matchesPlayed)

              return (
                <div
                  key={player.id}
                  data-testid="playerwithless-item"
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <h2 className="text-xl font-bold text-gray-900">{player.name}</h2>
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${status.color}`}
                        >
                          {status.text}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div className="bg-gray-50 rounded-lg p-3">
                          <div className="text-xs text-gray-600 mb-1">Matches Played</div>
                          <div className="text-2xl font-bold text-gray-900">{player.matchesPlayed}</div>
                          <div className="text-xs text-red-600 mt-1">
                            {matchesNeeded > 0 && `Need ${matchesNeeded} more`}
                          </div>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-3">
                          <div className="text-xs text-gray-600 mb-1">Record</div>
                          <div className="text-sm font-semibold text-gray-900">
                            {player.wins}W - {player.losses}L - {player.draws}D
                          </div>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-3">
                          <div className="text-xs text-gray-600 mb-1">Points</div>
                          <div className="text-2xl font-bold text-blue-600">{player.points}</div>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-3">
                          <div className="text-xs text-gray-600 mb-1">Upcoming</div>
                          <div className="text-2xl font-bold text-green-600">{player.upcomingMatches}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>
                          <span className="font-semibold">Last Match:</span> {formatDate(player.lastMatchDate)}
                        </span>
                        <span>
                          <span className="font-semibold">ID:</span> {player.id}
                        </span>
                      </div>

                      {matchesNeeded > 0 && (
                        <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                          <div className="flex items-start gap-2">
                            <span className="text-lg">⚠️</span>
                            <p className="text-sm text-yellow-800">
                              <span className="font-semibold">Not eligible for league table.</span>{' '}
                              This player needs to complete {matchesNeeded} more match{matchesNeeded !== 1 ? 'es' : ''} before
                              being included in official rankings.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col gap-2 lg:w-48">
                      <button
                        data-testid="playerwithless-attempt-inclusion"
                        onClick={() => handleAttemptInclusion(player)}
                        disabled={player.matchesPlayed >= MINIMUM_MATCHES_REQUIRED}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                          player.matchesPlayed >= MINIMUM_MATCHES_REQUIRED
                            ? 'bg-green-600 text-white hover:bg-green-700'
                            : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                        }`}
                      >
                        {player.matchesPlayed >= MINIMUM_MATCHES_REQUIRED
                          ? 'Add to Table'
                          : 'Attempt Inclusion'}
                      </button>
                      <button
                        data-testid="playerwithless-view-profile"
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                      >
                        View Profile
                      </button>
                      <button
                        data-testid="playerwithless-view-matches"
                        className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
                      >
                        View Matches
                      </button>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
    </section>
  )
}
