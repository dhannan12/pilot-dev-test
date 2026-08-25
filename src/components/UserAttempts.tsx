/**
 * UserAttempts — Access control for match details requiring authentication
 *
 * Features: Login status verification, match detail access control, redirect to schedule on unauthorized access, access attempt logging, authentication prompts
 *
 * Ticket: SCRUM-1192 | Branch: proto/SCRUM-1186
 */

import React, { useState } from 'react'

interface Match {
  id: string
  playerOne: string
  playerTwo: string
  date: string
  court: string
  time: string
  status: 'scheduled' | 'in-progress' | 'completed'
  score?: string
}

interface User {
  id: string
  username: string
  email: string
  isLoggedIn: boolean
}

interface AccessAttempt {
  id: string
  matchId: string
  matchTitle: string
  timestamp: string
  userStatus: 'logged-in' | 'not-logged-in'
  outcome: 'granted' | 'redirected'
  redirectedTo?: string
}

const MOCK_MATCHES: Match[] = [
  {
    id: 'm1',
    playerOne: 'Rafael Nadal',
    playerTwo: 'Novak Djokovic',
    date: '2026-08-26',
    court: 'Center Court',
    time: '14:00',
    status: 'scheduled'
  },
  {
    id: 'm2',
    playerOne: 'Roger Federer',
    playerTwo: 'Andy Murray',
    date: '2026-08-26',
    court: 'Court 1',
    time: '16:00',
    status: 'scheduled'
  },
  {
    id: 'm3',
    playerOne: 'Serena Williams',
    playerTwo: 'Venus Williams',
    date: '2026-08-25',
    court: 'Center Court',
    time: '13:00',
    status: 'completed',
    score: '6-4, 6-3'
  },
  {
    id: 'm4',
    playerOne: 'Stan Wawrinka',
    playerTwo: 'Juan Del Potro',
    date: '2026-08-25',
    court: 'Court 2',
    time: '11:00',
    status: 'completed',
    score: '7-6, 6-4'
  },
  {
    id: 'm5',
    playerOne: 'Daniil Medvedev',
    playerTwo: 'Alexander Zverev',
    date: '2026-08-26',
    court: 'Court 3',
    time: '18:00',
    status: 'scheduled'
  }
]

const MOCK_ACCESS_ATTEMPTS: AccessAttempt[] = [
  {
    id: 'a1',
    matchId: 'm1',
    matchTitle: 'Rafael Nadal vs Novak Djokovic',
    timestamp: '2026-08-25T10:30:00',
    userStatus: 'not-logged-in',
    outcome: 'redirected',
    redirectedTo: 'Match Schedule'
  },
  {
    id: 'a2',
    matchId: 'm2',
    matchTitle: 'Roger Federer vs Andy Murray',
    timestamp: '2026-08-25T11:15:00',
    userStatus: 'logged-in',
    outcome: 'granted'
  },
  {
    id: 'a3',
    matchId: 'm3',
    matchTitle: 'Serena Williams vs Venus Williams',
    timestamp: '2026-08-25T12:00:00',
    userStatus: 'not-logged-in',
    outcome: 'redirected',
    redirectedTo: 'Match Schedule'
  },
  {
    id: 'a4',
    matchId: 'm4',
    matchTitle: 'Stan Wawrinka vs Juan Del Potro',
    timestamp: '2026-08-25T13:45:00',
    userStatus: 'logged-in',
    outcome: 'granted'
  },
  {
    id: 'a5',
    matchId: 'm5',
    matchTitle: 'Daniil Medvedev vs Alexander Zverev',
    timestamp: '2026-08-25T14:20:00',
    userStatus: 'not-logged-in',
    outcome: 'redirected',
    redirectedTo: 'Match Schedule'
  }
]

export default function UserAttempts() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [selectedMatchId, setSelectedMatchId] = useState<string>('')
  const [showMatchDetails, setShowMatchDetails] = useState(false)
  const [showSchedule, setShowSchedule] = useState(false)
  const [accessAttempts, setAccessAttempts] = useState<AccessAttempt[]>(MOCK_ACCESS_ATTEMPTS)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')

  const selectedMatch = MOCK_MATCHES.find(m => m.id === selectedMatchId)

  const handleLogin = () => {
    if (!username || !email) {
      alert('Please enter username and email')
      return
    }

    const user: User = {
      id: `u${Date.now()}`,
      username,
      email,
      isLoggedIn: true
    }

    setCurrentUser(user)
    setIsLoggedIn(true)
    setShowSchedule(false)
    alert(`Welcome, ${username}! You are now logged in.`)
  }

  const handleLogout = () => {
    setCurrentUser(null)
    setIsLoggedIn(false)
    setShowMatchDetails(false)
    setUsername('')
    setEmail('')
  }

  const handleAccessMatchDetails = () => {
    if (!selectedMatchId) {
      alert('Please select a match first')
      return
    }

    const match = MOCK_MATCHES.find(m => m.id === selectedMatchId)
    if (!match) return

    const newAttempt: AccessAttempt = {
      id: `a${Date.now()}`,
      matchId: selectedMatchId,
      matchTitle: `${match.playerOne} vs ${match.playerTwo}`,
      timestamp: new Date().toISOString(),
      userStatus: isLoggedIn ? 'logged-in' : 'not-logged-in',
      outcome: isLoggedIn ? 'granted' : 'redirected',
      redirectedTo: isLoggedIn ? undefined : 'Match Schedule'
    }

    setAccessAttempts([newAttempt, ...accessAttempts])

    if (isLoggedIn) {
      setShowMatchDetails(true)
      setShowSchedule(false)
    } else {
      setShowMatchDetails(false)
      setShowSchedule(true)
      alert('Access Denied: You must be logged in to view match details. Redirecting to Match Schedule...')
    }
  }

  return (
    <div data-testid="userattempts" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Match Details Access Control
          </h1>
          <p className="text-gray-600">
            Users must be logged in to access match details. Unauthorized access redirects to the match schedule.
          </p>
        </header>

        {/* Login Status */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Authentication Status</h2>
            <span
              className={`px-4 py-2 rounded-full text-sm font-semibold ${
                isLoggedIn
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {isLoggedIn ? 'Logged In' : 'Not Logged In'}
            </span>
          </div>

          {!isLoggedIn ? (
            <div>
              <p className="text-gray-600 mb-4">Please log in to access match details</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                    Username
                  </label>
                  <input
                    id="username"
                    type="text"
                    data-testid="userattempts-username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter username"
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    data-testid="userattempts-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email"
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <button
                data-testid="userattempts-login"
                onClick={handleLogin}
                className="bg-blue-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-700"
              >
                Log In
              </button>
            </div>
          ) : (
            <div>
              <p className="text-gray-700 mb-2">
                Welcome, <span className="font-semibold text-blue-600">{currentUser?.username}</span>
              </p>
              <p className="text-sm text-gray-600 mb-4">{currentUser?.email}</p>
              <button
                data-testid="userattempts-logout"
                onClick={handleLogout}
                className="bg-gray-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-gray-700"
              >
                Log Out
              </button>
            </div>
          )}
        </div>

        {/* Match Selection */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Select Match</h2>
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <label htmlFor="match-select" className="block text-sm font-medium text-gray-700 mb-2">
                Choose a match to view details
              </label>
              <select
                id="match-select"
                data-testid="userattempts-match-select"
                value={selectedMatchId}
                onChange={(e) => {
                  setSelectedMatchId(e.target.value)
                  setShowMatchDetails(false)
                  setShowSchedule(false)
                }}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">-- Select a match --</option>
                {MOCK_MATCHES.map(match => (
                  <option key={match.id} value={match.id}>
                    {match.playerOne} vs {match.playerTwo} ({match.date} at {match.time})
                  </option>
                ))}
              </select>
            </div>
            <button
              data-testid="userattempts-access-details"
              onClick={handleAccessMatchDetails}
              disabled={!selectedMatchId}
              className={`px-6 py-2 rounded-md font-semibold ${
                selectedMatchId
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              View Details
            </button>
          </div>
        </div>

        {/* Match Details (Visible only when logged in) */}
        {showMatchDetails && selectedMatch && isLoggedIn && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Match Details</h2>
              <span className="bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full">
                Access Granted
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Players</h3>
                <div className="bg-blue-50 rounded-lg p-4 mb-2">
                  <p className="text-sm text-gray-600">Player 1</p>
                  <p className="text-xl font-bold text-blue-700">{selectedMatch.playerOne}</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">Player 2</p>
                  <p className="text-xl font-bold text-green-700">{selectedMatch.playerTwo}</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Match Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-semibold text-gray-900">{selectedMatch.date}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Time:</span>
                    <span className="font-semibold text-gray-900">{selectedMatch.time}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Court:</span>
                    <span className="font-semibold text-gray-900">{selectedMatch.court}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Status:</span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        selectedMatch.status === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : selectedMatch.status === 'in-progress'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {selectedMatch.status}
                    </span>
                  </div>
                  {selectedMatch.score && (
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-gray-600">Score:</span>
                      <span className="font-semibold text-gray-900">{selectedMatch.score}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Match Schedule (Shown when access is denied) */}
        {showSchedule && !isLoggedIn && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded-lg p-6 mb-6">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                  Redirected to Match Schedule
                </h3>
                <p className="text-yellow-700 mb-4">
                  You attempted to access match details without logging in. Please log in to view detailed information.
                </p>
                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Match Schedule (Public View)</h4>
                  <div data-testid="userattempts-schedule-list" className="space-y-2">
                    {MOCK_MATCHES.map(match => (
                      <div
                        key={match.id}
                        data-testid="userattempts-schedule-item"
                        className="flex justify-between items-center border-b pb-2"
                      >
                        <div>
                          <p className="font-semibold text-gray-900">
                            {match.playerOne} vs {match.playerTwo}
                          </p>
                          <p className="text-sm text-gray-600">
                            {match.date} at {match.time} - {match.court}
                          </p>
                        </div>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            match.status === 'completed'
                              ? 'bg-green-100 text-green-800'
                              : match.status === 'in-progress'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {match.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Access Attempt Log */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Access Attempt Log</h2>
          <p className="text-sm text-gray-600 mb-4">
            Track all attempts to access match details, including redirects for unauthorized users
          </p>
          <div data-testid="userattempts-list" className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Match
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Timestamp
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Outcome
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Redirected To
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {accessAttempts.map(attempt => (
                  <tr key={attempt.id} data-testid="userattempts-item" className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {attempt.matchTitle}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                      {new Date(attempt.timestamp).toLocaleString()}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          attempt.userStatus === 'logged-in'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {attempt.userStatus}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          attempt.outcome === 'granted'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {attempt.outcome}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {attempt.redirectedTo || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
