/**
 * UserRequestsScore — Handles user requests for score updates on inactive matches
 *
 * Features: inactive match detection, score update requests, request status tracking, match history display, error messaging
 *
 * Ticket: SCRUM-1170 | Branch: proto/SCRUM-1163
 */

import React, { useState } from 'react'

interface Match {
  id: string
  homeTeam: string
  awayTeam: string
  currentScore: string
  status: 'active' | 'inactive' | 'completed'
  lastUpdated: string
  sport: string
}

interface ScoreUpdateRequest {
  id: string
  matchId: string
  requestedBy: string
  timestamp: string
  status: 'pending' | 'fulfilled' | 'rejected'
  reason?: string
}

const MOCK_MATCHES: Match[] = [
  {
    id: 'm1',
    homeTeam: 'Lakers',
    awayTeam: 'Warriors',
    currentScore: '98-95',
    status: 'inactive',
    lastUpdated: '2026-08-24 20:45',
    sport: 'Basketball'
  },
  {
    id: 'm2',
    homeTeam: 'Red Sox',
    awayTeam: 'Yankees',
    currentScore: '4-3',
    status: 'inactive',
    lastUpdated: '2026-08-24 19:30',
    sport: 'Baseball'
  },
  {
    id: 'm3',
    homeTeam: 'Manchester United',
    awayTeam: 'Liverpool',
    currentScore: '2-2',
    status: 'completed',
    lastUpdated: '2026-08-24 18:00',
    sport: 'Soccer'
  },
  {
    id: 'm4',
    homeTeam: 'Celtics',
    awayTeam: 'Heat',
    currentScore: '105-102',
    status: 'inactive',
    lastUpdated: '2026-08-24 21:15',
    sport: 'Basketball'
  },
  {
    id: 'm5',
    homeTeam: 'Chiefs',
    awayTeam: 'Bills',
    currentScore: '24-21',
    status: 'inactive',
    lastUpdated: '2026-08-24 17:45',
    sport: 'Football'
  }
]

const MOCK_REQUESTS: ScoreUpdateRequest[] = [
  {
    id: 'r1',
    matchId: 'm1',
    requestedBy: 'user@example.com',
    timestamp: '2026-08-25 09:15',
    status: 'pending'
  },
  {
    id: 'r2',
    matchId: 'm2',
    requestedBy: 'fan@example.com',
    timestamp: '2026-08-25 08:30',
    status: 'fulfilled'
  },
  {
    id: 'r3',
    matchId: 'm4',
    requestedBy: 'sports@example.com',
    timestamp: '2026-08-25 07:45',
    status: 'rejected',
    reason: 'Match data source unavailable'
  }
]

export default function UserRequestsScore() {
  const [matches] = useState<Match[]>(MOCK_MATCHES)
  const [requests, setRequests] = useState<ScoreUpdateRequest[]>(MOCK_REQUESTS)
  const [selectedMatchId, setSelectedMatchId] = useState<string>('')
  const [userEmail, setUserEmail] = useState<string>('')
  const [showSuccess, setShowSuccess] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

  const handleRequestUpdate = () => {
    setErrorMessage('')
    setShowSuccess(false)

    if (!selectedMatchId) {
      setErrorMessage('Please select a match')
      return
    }

    if (!userEmail) {
      setErrorMessage('Please enter your email address')
      return
    }

    const selectedMatch = matches.find(m => m.id === selectedMatchId)
    
    if (!selectedMatch) {
      setErrorMessage('Selected match not found')
      return
    }

    if (selectedMatch.status === 'active') {
      setErrorMessage('Cannot request updates for an active match. The match is already being tracked.')
      return
    }

    // Check if there's already a pending request for this match
    const existingRequest = requests.find(
      r => r.matchId === selectedMatchId && r.status === 'pending'
    )

    if (existingRequest) {
      setErrorMessage('A score update request is already pending for this match')
      return
    }

    // Create new request
    const newRequest: ScoreUpdateRequest = {
      id: `r${requests.length + 1}`,
      matchId: selectedMatchId,
      requestedBy: userEmail,
      timestamp: new Date().toISOString().slice(0, 16).replace('T', ' '),
      status: 'pending'
    }

    setRequests([newRequest, ...requests])
    setShowSuccess(true)
    setSelectedMatchId('')
    setUserEmail('')

    // Auto-hide success message after 3 seconds
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const inactiveMatches = matches.filter(m => m.status !== 'active')

  return (
    <div data-testid="userrequestsscore" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Request Score Updates
          </h1>
          <p className="text-gray-600">
            Request score updates for matches that are currently inactive or completed
          </p>
        </header>

        {/* Request Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Submit Update Request
          </h2>

          {errorMessage && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 text-sm font-medium">{errorMessage}</p>
            </div>
          )}

          {showSuccess && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800 text-sm font-medium">
                Score update request submitted successfully!
              </p>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="match-select" className="block text-sm font-medium text-gray-700 mb-2">
                Select Inactive Match
              </label>
              <select
                id="match-select"
                data-testid="userrequestsscore-match"
                value={selectedMatchId}
                onChange={(e) => setSelectedMatchId(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">-- Choose a match --</option>
                {inactiveMatches.map(match => (
                  <option key={match.id} value={match.id}>
                    {match.homeTeam} vs {match.awayTeam} ({match.currentScore}) - {match.status}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="email-input" className="block text-sm font-medium text-gray-700 mb-2">
                Your Email Address
              </label>
              <input
                id="email-input"
                type="email"
                data-testid="userrequestsscore-email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                placeholder="your.email@example.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <button
              data-testid="userrequestsscore-submit"
              onClick={handleRequestUpdate}
              className="w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Request Score Update
            </button>
          </div>
        </div>

        {/* Inactive Matches List */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Inactive Matches
          </h2>
          <div data-testid="userrequestsscore-list" className="space-y-3">
            {inactiveMatches.map(match => (
              <div
                key={match.id}
                data-testid="userrequestsscore-item"
                className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {match.homeTeam} vs {match.awayTeam}
                      </h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        match.status === 'completed' 
                          ? 'bg-gray-200 text-gray-700'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {match.status}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p><span className="font-medium">Sport:</span> {match.sport}</p>
                      <p><span className="font-medium">Current Score:</span> {match.currentScore}</p>
                      <p><span className="font-medium">Last Updated:</span> {match.lastUpdated}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Requests */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Recent Update Requests
          </h2>
          <div data-testid="userrequestsscore-requests-list" className="space-y-3">
            {requests.map(request => {
              const match = matches.find(m => m.id === request.matchId)
              return (
                <div
                  key={request.id}
                  data-testid="userrequestsscore-request-item"
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-md font-medium text-gray-900">
                          {match ? `${match.homeTeam} vs ${match.awayTeam}` : 'Unknown Match'}
                        </h4>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          request.status === 'pending' 
                            ? 'bg-blue-100 text-blue-800'
                            : request.status === 'fulfilled'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {request.status}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p><span className="font-medium">Requested by:</span> {request.requestedBy}</p>
                        <p><span className="font-medium">Time:</span> {request.timestamp}</p>
                        {request.reason && (
                          <p className="text-red-600"><span className="font-medium">Reason:</span> {request.reason}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
