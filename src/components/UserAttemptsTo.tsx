/**
 * UserAttemptsTo — Displays restricted access prompt when user tries to view match details without logging in
 *
 * Features: login prompt, match preview, authentication gate, redirect actions, guest mode indicator
 *
 * Ticket: SCRUM-1169 | Branch: proto/SCRUM-1163
 */

import React, { useState } from 'react'

interface Match {
  id: string
  homeTeam: string
  awayTeam: string
  date: string
  venue: string
  competition: string
  status: string
}

const MOCK_MATCHES: Match[] = [
  {
    id: 'match-001',
    homeTeam: 'Manchester United',
    awayTeam: 'Liverpool',
    date: '2026-08-30',
    venue: 'Old Trafford',
    competition: 'Premier League',
    status: 'upcoming'
  },
  {
    id: 'match-002',
    homeTeam: 'Barcelona',
    awayTeam: 'Real Madrid',
    date: '2026-08-28',
    venue: 'Camp Nou',
    competition: 'La Liga',
    status: 'upcoming'
  },
  {
    id: 'match-003',
    homeTeam: 'Bayern Munich',
    awayTeam: 'Borussia Dortmund',
    date: '2026-09-02',
    venue: 'Allianz Arena',
    competition: 'Bundesliga',
    status: 'upcoming'
  },
  {
    id: 'match-004',
    homeTeam: 'Paris Saint-Germain',
    awayTeam: 'Marseille',
    date: '2026-09-05',
    venue: 'Parc des Princes',
    competition: 'Ligue 1',
    status: 'upcoming'
  },
  {
    id: 'match-005',
    homeTeam: 'AC Milan',
    awayTeam: 'Inter Milan',
    date: '2026-09-08',
    venue: 'San Siro',
    competition: 'Serie A',
    status: 'upcoming'
  }
]

export default function UserAttemptsTo() {
  const [selectedMatch, setSelectedMatch] = useState<Match>(MOCK_MATCHES[0])
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)

  const handleMatchSelect = (match: Match) => {
    setSelectedMatch(match)
    setShowLoginPrompt(false)
  }

  const handleAccessAttempt = () => {
    setShowLoginPrompt(true)
  }

  const handleLogin = () => {
    alert('Redirecting to login page...')
  }

  const handleSignup = () => {
    alert('Redirecting to signup page...')
  }

  const handleCancel = () => {
    setShowLoginPrompt(false)
  }

  return (
    <div data-testid="userattemptsto" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Match Center</h1>
          <p className="text-gray-600">
            Select a match to view detailed information
          </p>
          <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-md p-4">
            <p className="text-sm text-yellow-800 flex items-center">
              <span className="mr-2">⚠️</span>
              You are browsing as a guest. Some features require authentication.
            </p>
          </div>
        </div>

        {/* Match List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Available Matches
            </h2>
            <div data-testid="userattemptsto-list" className="space-y-3">
              {MOCK_MATCHES.map((match) => (
                <div
                  key={match.id}
                  data-testid="userattemptsto-item"
                  onClick={() => handleMatchSelect(match)}
                  className={`bg-white rounded-lg shadow-sm p-4 cursor-pointer transition-all hover:shadow-md ${
                    selectedMatch.id === match.id
                      ? 'ring-2 ring-blue-500'
                      : 'hover:ring-2 hover:ring-gray-300'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                      {match.competition}
                    </span>
                    <span className="text-xs text-gray-500">{match.date}</span>
                  </div>
                  <div className="text-center py-2">
                    <div className="font-semibold text-gray-900">
                      {match.homeTeam}
                    </div>
                    <div className="text-sm text-gray-500 my-1">vs</div>
                    <div className="font-semibold text-gray-900">
                      {match.awayTeam}
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 text-center mt-2">
                    📍 {match.venue}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Match Preview */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Match Details
            </h2>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="mb-4">
                <span className="inline-block text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded">
                  {selectedMatch.competition}
                </span>
              </div>

              <div className="text-center py-6 border-b border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {selectedMatch.homeTeam}
                </h3>
                <div className="text-xl text-gray-500 font-medium my-3">vs</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {selectedMatch.awayTeam}
                </h3>
                <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
                  <span>📅 {selectedMatch.date}</span>
                  <span>📍 {selectedMatch.venue}</span>
                </div>
              </div>

              {/* Locked Content Preview */}
              <div className="mt-6 space-y-3">
                <div className="bg-gray-50 rounded-lg p-4 relative overflow-hidden">
                  <div className="blur-sm select-none">
                    <h4 className="font-semibold text-gray-900 mb-2">Team Statistics</h4>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>Home Win: 45%</div>
                      <div>Away Win: 35%</div>
                      <div>Draw: 20%</div>
                      <div>Goals/Match: 2.8</div>
                    </div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-900/10">
                    <div className="text-center">
                      <div className="text-4xl mb-2">🔒</div>
                      <p className="text-sm font-medium text-gray-700">
                        Login to view details
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 relative overflow-hidden">
                  <div className="blur-sm select-none">
                    <h4 className="font-semibold text-gray-900 mb-2">Head-to-Head</h4>
                    <div className="text-sm text-gray-600">
                      Last 5 meetings: 3W - 1D - 1L
                    </div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-900/10">
                    <div className="text-center">
                      <div className="text-4xl mb-2">🔒</div>
                      <p className="text-sm font-medium text-gray-700">
                        Login to view details
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  data-testid="userattemptsto-access"
                  onClick={handleAccessAttempt}
                  className="w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  View Full Match Details
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Login Prompt Modal */}
        {showLoginPrompt && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div
              data-testid="userattemptsto-modal"
              className="bg-white rounded-lg shadow-xl max-w-md w-full p-6"
            >
              <div className="text-center mb-6">
                <div className="text-5xl mb-4">🔐</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Authentication Required
                </h3>
                <p className="text-gray-600">
                  Please log in or create an account to access full match details,
                  statistics, and exclusive content.
                </p>
              </div>

              <div className="space-y-3">
                <button
                  data-testid="userattemptsto-login"
                  onClick={handleLogin}
                  className="w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Log In
                </button>
                <button
                  data-testid="userattemptsto-signup"
                  onClick={handleSignup}
                  className="w-full bg-green-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Create Account
                </button>
                <button
                  data-testid="userattemptsto-cancel"
                  onClick={handleCancel}
                  className="w-full bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Continue as Guest
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-xs text-gray-500 text-center">
                  By logging in, you'll get access to live scores, detailed statistics,
                  player ratings, and personalized match recommendations.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
