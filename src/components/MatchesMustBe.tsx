/**
 * MatchesMustBe — Displays match scheduling interface with 24-hour advance requirement
 *
 * Features: match scheduling form, 24-hour validation, upcoming matches list, scheduling status indicators, time-to-match countdown
 *
 * Ticket: SCRUM-1217 | Branch: proto/SCRUM-1211
 */

import React, { useState } from 'react'

interface Match {
  id: string
  player1: string
  player2: string
  scheduledDate: string
  scheduledTime: string
  status: 'valid' | 'invalid' | 'pending'
  hoursUntilMatch: number
}

const mockMatches: Match[] = [
  {
    id: 'M001',
    player1: 'Magnus Carlsen',
    player2: 'Hikaru Nakamura',
    scheduledDate: '2026-08-28',
    scheduledTime: '14:00',
    status: 'valid',
    hoursUntilMatch: 50
  },
  {
    id: 'M002',
    player1: 'Fabiano Caruana',
    player2: 'Ding Liren',
    scheduledDate: '2026-08-29',
    scheduledTime: '10:00',
    status: 'valid',
    hoursUntilMatch: 68
  },
  {
    id: 'M003',
    player1: 'Alireza Firouzja',
    player2: 'Ian Nepomniachtchi',
    scheduledDate: '2026-08-27',
    scheduledTime: '16:00',
    status: 'valid',
    hoursUntilMatch: 38
  },
  {
    id: 'M004',
    player1: 'Wesley So',
    player2: 'Levon Aronian',
    scheduledDate: '2026-08-30',
    scheduledTime: '12:00',
    status: 'valid',
    hoursUntilMatch: 82
  },
  {
    id: 'M005',
    player1: 'Anish Giri',
    player2: 'Maxime Vachier-Lagrave',
    scheduledDate: '2026-09-01',
    scheduledTime: '15:00',
    status: 'valid',
    hoursUntilMatch: 135
  }
]

export default function MatchesMustBe() {
  const [player1, setPlayer1] = useState('')
  const [player2, setPlayer2] = useState('')
  const [matchDate, setMatchDate] = useState('')
  const [matchTime, setMatchTime] = useState('')
  const [validationMessage, setValidationMessage] = useState('')
  const [matches] = useState<Match[]>(mockMatches)

  const validateScheduling = () => {
    if (!player1 || !player2 || !matchDate || !matchTime) {
      setValidationMessage('Please fill in all fields')
      return
    }

    const scheduledDateTime = new Date(`${matchDate}T${matchTime}`)
    const now = new Date()
    const hoursUntilMatch = (scheduledDateTime.getTime() - now.getTime()) / (1000 * 60 * 60)

    if (hoursUntilMatch < 24) {
      setValidationMessage('❌ Error: Matches must be scheduled at least 24 hours in advance')
    } else {
      setValidationMessage(`✓ Valid: Match scheduled ${Math.floor(hoursUntilMatch)} hours in advance`)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    validateScheduling()
  }

  return (
    <div data-testid="matchesmustbe" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Match Scheduling
          </h1>
          <p className="text-gray-600">
            All matches must be scheduled at least 24 hours in advance
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Scheduling Form */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Schedule New Match
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Player 1
                </label>
                <input
                  data-testid="matchesmustbe-player1"
                  type="text"
                  value={player1}
                  onChange={(e) => setPlayer1(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter player name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Player 2
                </label>
                <input
                  data-testid="matchesmustbe-player2"
                  type="text"
                  value={player2}
                  onChange={(e) => setPlayer2(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter player name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Match Date
                </label>
                <input
                  data-testid="matchesmustbe-date"
                  type="date"
                  value={matchDate}
                  onChange={(e) => setMatchDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Match Time
                </label>
                <input
                  data-testid="matchesmustbe-time"
                  type="time"
                  value={matchTime}
                  onChange={(e) => setMatchTime(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                data-testid="matchesmustbe-submit"
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
              >
                Validate Schedule
              </button>

              {validationMessage && (
                <div
                  data-testid="matchesmustbe-validation"
                  className={`p-3 rounded-md ${
                    validationMessage.includes('Error')
                      ? 'bg-red-50 text-red-800 border border-red-200'
                      : validationMessage.includes('Valid')
                      ? 'bg-green-50 text-green-800 border border-green-200'
                      : 'bg-yellow-50 text-yellow-800 border border-yellow-200'
                  }`}
                >
                  {validationMessage}
                </div>
              )}
            </form>

            {/* Policy Info */}
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
              <h3 className="text-sm font-semibold text-blue-900 mb-2">
                Scheduling Policy
              </h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Minimum 24 hours advance notice required</li>
                <li>• Both players must confirm availability</li>
                <li>• Late scheduling may result in match cancellation</li>
              </ul>
            </div>
          </div>

          {/* Upcoming Matches List */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Upcoming Matches
            </h2>
            <div data-testid="matchesmustbe-list" className="space-y-3">
              {matches.map((match) => (
                <div
                  key={match.id}
                  data-testid="matchesmustbe-item"
                  className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">
                        {match.player1} vs {match.player2}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        {match.scheduledDate} at {match.scheduledTime}
                      </div>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        match.status === 'valid'
                          ? 'bg-green-100 text-green-800'
                          : match.status === 'invalid'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {match.status.charAt(0).toUpperCase() + match.status.slice(1)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
                    <span className="text-sm text-gray-500">
                      Match ID: {match.id}
                    </span>
                    <span className="text-sm font-medium text-blue-600">
                      {match.hoursUntilMatch}h until match
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 p-3 bg-gray-50 rounded-md">
              <div className="text-sm text-gray-600">
                <strong>Total Matches:</strong> {matches.length}
              </div>
              <div className="text-sm text-gray-600 mt-1">
                All matches comply with 24-hour advance scheduling policy
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
