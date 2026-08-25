/**
 * UserRequests — Handles user requests for score updates on inactive matches
 *
 * Features: match status display, score update requests, inactive match warnings, request history, real-time availability notifications
 *
 * Ticket: SCRUM-1193 | Branch: proto/SCRUM-1186
 */

import React, { useState } from 'react'

interface Match {
  id: string
  player1: string
  player2: string
  status: 'active' | 'scheduled' | 'completed'
  currentScore?: string
  scheduledTime?: string
  court?: string
}

interface ScoreRequest {
  id: string
  matchId: string
  matchName: string
  timestamp: string
  status: 'pending' | 'fulfilled' | 'rejected'
  message: string
}

const MOCK_MATCHES: Match[] = [
  {
    id: 'M001',
    player1: 'Novak Djokovic',
    player2: 'Carlos Alcaraz',
    status: 'active',
    currentScore: '6-4, 3-2',
    court: 'Center Court'
  },
  {
    id: 'M002',
    player1: 'Iga Swiatek',
    player2: 'Aryna Sabalenka',
    status: 'scheduled',
    scheduledTime: '14:00',
    court: 'Court 1'
  },
  {
    id: 'M003',
    player1: 'Rafael Nadal',
    player2: 'Daniil Medvedev',
    status: 'completed',
    currentScore: '7-6, 6-4, 6-3',
    court: 'Center Court'
  },
  {
    id: 'M004',
    player1: 'Elena Rybakina',
    player2: 'Jessica Pegula',
    status: 'scheduled',
    scheduledTime: '16:30',
    court: 'Court 2'
  },
  {
    id: 'M005',
    player1: 'Jannik Sinner',
    player2: 'Holger Rune',
    status: 'completed',
    currentScore: '6-2, 3-6, 7-5',
    court: 'Court 3'
  }
]

export default function UserRequests() {
  const [selectedMatch, setSelectedMatch] = useState<string>('')
  const [requests, setRequests] = useState<ScoreRequest[]>([])
  const [showMessage, setShowMessage] = useState<string>('')

  const handleRequestScore = () => {
    if (!selectedMatch) {
      setShowMessage('Please select a match first')
      setTimeout(() => setShowMessage(''), 3000)
      return
    }

    const match = MOCK_MATCHES.find(m => m.id === selectedMatch)
    if (!match) return

    const matchName = `${match.player1} vs ${match.player2}`

    if (match.status === 'active') {
      // Active match - provide real-time updates
      const newRequest: ScoreRequest = {
        id: `REQ${Date.now()}`,
        matchId: match.id,
        matchName,
        timestamp: new Date().toLocaleTimeString(),
        status: 'fulfilled',
        message: 'Real-time score updates are now active for this match'
      }
      setRequests([newRequest, ...requests])
      setShowMessage('✓ Real-time updates enabled!')
    } else {
      // Inactive match - reject with explanation
      const newRequest: ScoreRequest = {
        id: `REQ${Date.now()}`,
        matchId: match.id,
        matchName,
        timestamp: new Date().toLocaleTimeString(),
        status: 'rejected',
        message: match.status === 'scheduled'
          ? 'Real-time score updates will only be available during active matches. This match is scheduled for ' + match.scheduledTime
          : 'Real-time score updates will only be available during active matches. This match has been completed with final score: ' + match.currentScore
      }
      setRequests([newRequest, ...requests])
      setShowMessage('⚠ Real-time updates only available for active matches')
    }

    setTimeout(() => setShowMessage(''), 5000)
  }

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-300'
      case 'scheduled':
        return 'bg-blue-100 text-blue-800 border-blue-300'
      case 'completed':
        return 'bg-gray-100 text-gray-800 border-gray-300'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  const getRequestStatusClass = (status: string) => {
    switch (status) {
      case 'fulfilled':
        return 'bg-green-50 border-green-300 text-green-900'
      case 'rejected':
        return 'bg-red-50 border-red-300 text-red-900'
      case 'pending':
        return 'bg-yellow-50 border-yellow-300 text-yellow-900'
      default:
        return 'bg-gray-50 border-gray-300 text-gray-900'
    }
  }

  return (
    <div data-testid="userrequests" className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Score Update Requests</h1>
          <p className="text-gray-600 mb-6">
            Request real-time score updates for tennis matches. Note: Real-time updates are only available during active matches.
          </p>

          {/* Match Selection */}
          <div className="mb-6">
            <label htmlFor="match-select" className="block text-sm font-medium text-gray-700 mb-2">
              Select Match
            </label>
            <select
              id="match-select"
              data-testid="userrequests-match"
              value={selectedMatch}
              onChange={(e) => setSelectedMatch(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">-- Choose a match --</option>
              {MOCK_MATCHES.map((match) => (
                <option key={match.id} value={match.id}>
                  {match.player1} vs {match.player2} - {match.status.toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          {/* Selected Match Details */}
          {selectedMatch && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              {(() => {
                const match = MOCK_MATCHES.find(m => m.id === selectedMatch)
                if (!match) return null
                return (
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {match.player1} vs {match.player2}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusBadgeClass(match.status)}`}>
                        {match.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p><span className="font-medium">Court:</span> {match.court}</p>
                      {match.status === 'active' && (
                        <p><span className="font-medium">Current Score:</span> {match.currentScore}</p>
                      )}
                      {match.status === 'scheduled' && (
                        <p><span className="font-medium">Scheduled Time:</span> {match.scheduledTime}</p>
                      )}
                      {match.status === 'completed' && (
                        <p><span className="font-medium">Final Score:</span> {match.currentScore}</p>
                      )}
                    </div>
                  </div>
                )
              })()}
            </div>
          )}

          {/* Request Button */}
          <button
            data-testid="userrequests-request"
            onClick={handleRequestScore}
            disabled={!selectedMatch}
            className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-colors ${
              selectedMatch
                ? 'bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            Request Score Updates
          </button>

          {/* Status Message */}
          {showMessage && (
            <div
              data-testid="userrequests-message"
              className={`mt-4 p-3 rounded-lg text-sm font-medium ${
                showMessage.includes('✓')
                  ? 'bg-green-100 text-green-800 border border-green-300'
                  : 'bg-yellow-100 text-yellow-800 border border-yellow-300'
              }`}
            >
              {showMessage}
            </div>
          )}
        </div>

        {/* Request History */}
        {requests.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Request History</h2>
            <ul data-testid="userrequests-list" className="space-y-3">
              {requests.map((request) => (
                <li
                  key={request.id}
                  data-testid="userrequests-item"
                  className={`p-4 rounded-lg border-2 ${getRequestStatusClass(request.status)}`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-semibold text-base">{request.matchName}</h3>
                      <p className="text-xs mt-1 opacity-75">{request.timestamp}</p>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${
                      request.status === 'fulfilled'
                        ? 'bg-green-200 text-green-900'
                        : request.status === 'rejected'
                        ? 'bg-red-200 text-red-900'
                        : 'bg-yellow-200 text-yellow-900'
                    }`}>
                      {request.status}
                    </span>
                  </div>
                  <p className="text-sm mt-2">{request.message}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Information Panel */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">ℹ️ Real-time Updates Information</h3>
          <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
            <li>Real-time score updates are only available during <strong>active matches</strong></li>
            <li>Scheduled matches will have updates available once they start</li>
            <li>Completed matches have final scores available but no real-time updates</li>
            <li>Check back when your match becomes active to enable live updates</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
