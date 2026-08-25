/**
 * UserAttemptsTo — Displays empty state when viewing statistics without recorded matches
 *
 * Features: empty state messaging, call-to-action buttons, helpful guidance, stats placeholder, record match prompt
 *
 * Ticket: SCRUM-1203 | Branch: proto/SCRUM-1199
 */

import React from 'react'

interface MatchResult {
  id: string
  date: string
  opponent: string
  result: 'win' | 'loss' | 'draw'
  score: string
  location: string
}

// Empty mock data - represents user with no recorded matches
const MOCK_MATCHES: MatchResult[] = []

export default function UserAttemptsTo() {
  const hasMatches = MOCK_MATCHES.length > 0

  return (
    <div data-testid="userattemptsto" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Match Statistics</h1>
          <p className="text-gray-600">Track your performance and win percentage</p>
        </div>

        {hasMatches ? (
          // This section would show if matches existed
          <div className="bg-white rounded-lg shadow p-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="text-sm font-medium text-gray-600 mb-1">Total Matches</div>
                <div className="text-3xl font-bold text-gray-900">0</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="text-sm font-medium text-gray-600 mb-1">Wins</div>
                <div className="text-3xl font-bold text-green-600">0</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="text-sm font-medium text-gray-600 mb-1">Losses</div>
                <div className="text-3xl font-bold text-red-600">0</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="text-sm font-medium text-gray-600 mb-1">Draws</div>
                <div className="text-3xl font-bold text-yellow-600">0</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="text-sm font-medium text-gray-600 mb-1">Win %</div>
                <div className="text-3xl font-bold text-blue-600">0%</div>
              </div>
            </div>
          </div>
        ) : (
          // Empty state - no matches recorded
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-12 text-center">
              {/* Empty State Icon */}
              <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <svg
                  className="w-12 h-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>

              {/* Empty State Message */}
              <h2 className="text-2xl font-bold text-gray-900 mb-3">No Statistics Available</h2>
              <p className="text-gray-600 mb-2 max-w-md mx-auto">
                You don't have any recorded matches yet. Start tracking your performance by recording your first match!
              </p>
              <p className="text-sm text-gray-500 mb-8 max-w-md mx-auto">
                Once you add match results, you'll be able to see your win percentage, track your progress over time,
                and analyze your performance statistics.
              </p>

              {/* Call to Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button
                  data-testid="userattemptsto-record"
                  className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                >
                  Record Your First Match
                </button>
                <button
                  data-testid="userattemptsto-learn"
                  className="px-6 py-3 bg-white text-gray-700 font-semibold rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  Learn How It Works
                </button>
              </div>
            </div>

            {/* Info Cards */}
            <div className="border-t border-gray-200 bg-gray-50 px-6 py-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <div className="text-center" data-testid="userattemptsto-card">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg
                      className="w-6 h-6 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Add Matches</h3>
                  <p className="text-sm text-gray-600">
                    Record match results including opponent, score, and location
                  </p>
                </div>

                <div className="text-center" data-testid="userattemptsto-card">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg
                      className="w-6 h-6 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">View Statistics</h3>
                  <p className="text-sm text-gray-600">
                    Track win percentage, performance trends, and match history
                  </p>
                </div>

                <div className="text-center" data-testid="userattemptsto-card">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg
                      className="w-6 h-6 text-purple-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Improve Performance</h3>
                  <p className="text-sm text-gray-600">
                    Analyze your data to identify patterns and improve your game
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Placeholder Stats Cards - Disabled State */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6 opacity-50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Recent Performance</h3>
              <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
            </div>
            <div className="text-3xl font-bold text-gray-300 mb-2">--</div>
            <p className="text-sm text-gray-400">Last 5 matches</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 opacity-50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Best Streak</h3>
              <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
            </div>
            <div className="text-3xl font-bold text-gray-300 mb-2">--</div>
            <p className="text-sm text-gray-400">Consecutive wins</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 opacity-50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Total Goals</h3>
              <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
            </div>
            <div className="text-3xl font-bold text-gray-300 mb-2">--</div>
            <p className="text-sm text-gray-400">Goals scored</p>
          </div>
        </div>
      </div>
    </div>
  )
}
