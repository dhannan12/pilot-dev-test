/**
 * APlayerAttempts — Displays a player attempting to get seeded with insufficient matches
 *
 * Features: match count tracking, seeding eligibility check, error messaging, player stats display, attempt validation
 *
 * Ticket: SCRUM-1108 | Branch: proto/SCRUM-1103
 */

import React, { useState } from 'react'

interface Player {
  id: number
  name: string
  matchesPlayed: number
  wins: number
  losses: number
  rank: number | null
}

const mockPlayers: Player[] = [
  {
    id: 1,
    name: 'Alex Chen',
    matchesPlayed: 3,
    wins: 2,
    losses: 1,
    rank: null,
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    matchesPlayed: 2,
    wins: 1,
    losses: 1,
    rank: null,
  },
  {
    id: 3,
    name: 'Mike Rodriguez',
    matchesPlayed: 4,
    wins: 3,
    losses: 1,
    rank: null,
  },
  {
    id: 4,
    name: 'Emily Watson',
    matchesPlayed: 1,
    wins: 0,
    losses: 1,
    rank: null,
  },
  {
    id: 5,
    name: 'David Kim',
    matchesPlayed: 0,
    wins: 0,
    losses: 0,
    rank: null,
  },
]

const MINIMUM_MATCHES_REQUIRED = 5

export default function APlayerAttempts() {
  const [selectedPlayerId, setSelectedPlayerId] = useState<number>(mockPlayers[0].id)
  const [attemptMessage, setAttemptMessage] = useState<string>('')
  const [messageType, setMessageType] = useState<'error' | 'success' | ''>('')

  const selectedPlayer = mockPlayers.find((p) => p.id === selectedPlayerId)

  const handleSeedingAttempt = () => {
    if (!selectedPlayer) return

    if (selectedPlayer.matchesPlayed < MINIMUM_MATCHES_REQUIRED) {
      const remaining = MINIMUM_MATCHES_REQUIRED - selectedPlayer.matchesPlayed
      setAttemptMessage(
        `Cannot seed ${selectedPlayer.name}. Insufficient matches played. ` +
        `${selectedPlayer.matchesPlayed}/${MINIMUM_MATCHES_REQUIRED} matches completed. ` +
        `${remaining} more match${remaining === 1 ? '' : 'es'} required.`
      )
      setMessageType('error')
    } else {
      setAttemptMessage(
        `${selectedPlayer.name} is eligible for seeding with ${selectedPlayer.matchesPlayed} matches played.`
      )
      setMessageType('success')
    }
  }

  const handleReset = () => {
    setAttemptMessage('')
    setMessageType('')
  }

  return (
    <div data-testid="aplayerattempts" className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Tournament Seeding Request
          </h1>
          <p className="text-gray-600 mb-6">
            Players must complete at least {MINIMUM_MATCHES_REQUIRED} matches to be eligible for seeding
          </p>

          <div className="mb-6">
            <label
              htmlFor="player-select"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Select Player
            </label>
            <select
              id="player-select"
              data-testid="aplayerattempts-player-select"
              value={selectedPlayerId}
              onChange={(e) => {
                setSelectedPlayerId(Number(e.target.value))
                handleReset()
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {mockPlayers.map((player) => (
                <option key={player.id} value={player.id}>
                  {player.name}
                </option>
              ))}
            </select>
          </div>

          {selectedPlayer && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Player Statistics
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Name</p>
                  <p className="text-lg font-medium text-gray-900">
                    {selectedPlayer.name}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Matches Played</p>
                  <p className="text-lg font-medium text-gray-900">
                    {selectedPlayer.matchesPlayed}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Wins</p>
                  <p className="text-lg font-medium text-green-600">
                    {selectedPlayer.wins}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Losses</p>
                  <p className="text-lg font-medium text-red-600">
                    {selectedPlayer.losses}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    Seeding Eligibility
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      selectedPlayer.matchesPlayed >= MINIMUM_MATCHES_REQUIRED
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {selectedPlayer.matchesPlayed >= MINIMUM_MATCHES_REQUIRED
                      ? 'Eligible'
                      : 'Ineligible'}
                  </span>
                </div>
                <div className="mt-2">
                  <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                    <span>Progress</span>
                    <span>
                      {selectedPlayer.matchesPlayed}/{MINIMUM_MATCHES_REQUIRED}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        selectedPlayer.matchesPlayed >= MINIMUM_MATCHES_REQUIRED
                          ? 'bg-green-500'
                          : 'bg-red-500'
                      }`}
                      style={{
                        width: `${Math.min(
                          (selectedPlayer.matchesPlayed / MINIMUM_MATCHES_REQUIRED) * 100,
                          100
                        )}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-4">
            <button
              data-testid="aplayerattempts-submit"
              onClick={handleSeedingAttempt}
              className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Request Seeding
            </button>
            {attemptMessage && (
              <button
                data-testid="aplayerattempts-reset"
                onClick={handleReset}
                className="px-6 py-3 border border-gray-300 rounded-md font-medium text-gray-700 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Reset
              </button>
            )}
          </div>

          {attemptMessage && (
            <div
              data-testid="aplayerattempts-message"
              className={`mt-6 p-4 rounded-md ${
                messageType === 'error'
                  ? 'bg-red-50 border border-red-200'
                  : 'bg-green-50 border border-green-200'
              }`}
            >
              <div className="flex">
                <div className="flex-shrink-0">
                  {messageType === 'error' ? (
                    <svg
                      className="h-5 w-5 text-red-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="h-5 w-5 text-green-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
                <div className="ml-3">
                  <p
                    className={`text-sm font-medium ${
                      messageType === 'error' ? 'text-red-800' : 'text-green-800'
                    }`}
                  >
                    {attemptMessage}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              All Players
            </h3>
            <div data-testid="aplayerattempts-list" className="space-y-2">
              {mockPlayers.map((player) => (
                <div
                  key={player.id}
                  data-testid="aplayerattempts-item"
                  className={`flex items-center justify-between p-3 rounded-md border ${
                    player.id === selectedPlayerId
                      ? 'border-blue-300 bg-blue-50'
                      : 'border-gray-200 bg-white'
                  }`}
                >
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{player.name}</p>
                    <p className="text-sm text-gray-600">
                      {player.wins}W - {player.losses}L
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {player.matchesPlayed} matches
                    </p>
                    <p
                      className={`text-xs ${
                        player.matchesPlayed >= MINIMUM_MATCHES_REQUIRED
                          ? 'text-green-600'
                          : 'text-red-600'
                      }`}
                    >
                      {player.matchesPlayed >= MINIMUM_MATCHES_REQUIRED
                        ? 'Eligible'
                        : `${MINIMUM_MATCHES_REQUIRED - player.matchesPlayed} needed`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
