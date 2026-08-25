/**
 * RegisteredUser — Access control component for player profiles and statistics
 *
 * Features: user authentication check, player profile access, statistics display, registration prompt, access control
 *
 * Ticket: SCRUM-1187 | Branch: proto/SCRUM-1186
 */

import React, { useState } from 'react'

interface Player {
  id: number
  name: string
  ranking: number
  matchesWon: number
  matchesLost: number
  winPercentage: number
  preferredSurface: string
}

interface User {
  id: number
  email: string
  registered: boolean
}

const mockPlayers: Player[] = [
  {
    id: 1,
    name: 'Rafael Nadal',
    ranking: 1,
    matchesWon: 1080,
    matchesLost: 220,
    winPercentage: 83.1,
    preferredSurface: 'Clay'
  },
  {
    id: 2,
    name: 'Roger Federer',
    ranking: 2,
    matchesWon: 1251,
    matchesLost: 275,
    winPercentage: 82.0,
    preferredSurface: 'Grass'
  },
  {
    id: 3,
    name: 'Novak Djokovic',
    ranking: 3,
    matchesWon: 1052,
    matchesLost: 203,
    winPercentage: 83.8,
    preferredSurface: 'Hard Court'
  },
  {
    id: 4,
    name: 'Serena Williams',
    ranking: 4,
    matchesWon: 858,
    matchesLost: 156,
    winPercentage: 84.6,
    preferredSurface: 'Hard Court'
  },
  {
    id: 5,
    name: 'Andy Murray',
    ranking: 5,
    matchesWon: 693,
    matchesLost: 213,
    winPercentage: 76.5,
    preferredSurface: 'Hard Court'
  }
]

const mockUsers: User[] = [
  { id: 1, email: 'user1@example.com', registered: true },
  { id: 2, email: 'user2@example.com', registered: true },
  { id: 3, email: 'user3@example.com', registered: false },
  { id: 4, email: 'user4@example.com', registered: true },
  { id: 5, email: 'user5@example.com', registered: false }
]

export default function RegisteredUser() {
  const [currentUser, setCurrentUser] = useState<User | null>(mockUsers[0])
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null)
  const [attemptedAccess, setAttemptedAccess] = useState(false)

  const handlePlayerSelect = (player: Player) => {
    setAttemptedAccess(true)
    if (currentUser && currentUser.registered) {
      setSelectedPlayer(player)
    }
  }

  const handleUserSwitch = (user: User) => {
    setCurrentUser(user)
    setSelectedPlayer(null)
    setAttemptedAccess(false)
  }

  const handleRegister = () => {
    if (currentUser) {
      setCurrentUser({ ...currentUser, registered: true })
      setAttemptedAccess(false)
    }
  }

  const handleLogout = () => {
    setCurrentUser(null)
    setSelectedPlayer(null)
    setAttemptedAccess(false)
  }

  const handleLogin = () => {
    setCurrentUser(mockUsers[0])
    setAttemptedAccess(false)
  }

  return (
    <div data-testid="registereduser" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="bg-white shadow rounded-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Tennis Player Profiles</h1>
          
          {/* User Status */}
          <div className="flex items-center justify-between border-t pt-4">
            <div>
              {currentUser ? (
                <div>
                  <p className="text-sm text-gray-600">Logged in as:</p>
                  <p className="font-medium text-gray-900">{currentUser.email}</p>
                  <p className="text-sm">
                    Status: {' '}
                    <span className={currentUser.registered ? 'text-green-600 font-medium' : 'text-orange-600 font-medium'}>
                      {currentUser.registered ? 'Registered User' : 'Unregistered User'}
                    </span>
                  </p>
                </div>
              ) : (
                <p className="text-gray-600">Not logged in</p>
              )}
            </div>
            <div className="flex gap-2">
              {currentUser ? (
                <button
                  data-testid="registereduser-logout"
                  onClick={handleLogout}
                  className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                >
                  Logout
                </button>
              ) : (
                <button
                  data-testid="registereduser-login"
                  onClick={handleLogin}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Login
                </button>
              )}
            </div>
          </div>

          {/* Test User Switcher */}
          {currentUser && (
            <div className="mt-4 border-t pt-4">
              <p className="text-sm text-gray-600 mb-2">Switch Test User:</p>
              <div className="flex gap-2 flex-wrap">
                {mockUsers.map((user) => (
                  <button
                    key={user.id}
                    data-testid="registereduser-switch-user"
                    onClick={() => handleUserSwitch(user)}
                    className={`px-3 py-1 text-sm rounded ${
                      currentUser.id === user.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {user.email.split('@')[0]} ({user.registered ? 'Reg' : 'Unreg'})
                  </button>
                ))}
              </div>
            </div>
          )}
        </header>

        {/* Access Denied Message */}
        {attemptedAccess && currentUser && !currentUser.registered && (
          <div data-testid="registereduser-access-denied" className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <h3 className="text-red-800 font-semibold mb-2">Access Denied</h3>
            <p className="text-red-700 mb-3">
              You must be a registered user to access player profiles and statistics.
            </p>
            <button
              data-testid="registereduser-register"
              onClick={handleRegister}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Register Now
            </button>
          </div>
        )}

        {/* Player List */}
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Player Rankings</h2>
          <div data-testid="registereduser-list" className="space-y-2">
            {mockPlayers.map((player) => (
              <div
                key={player.id}
                data-testid="registereduser-item"
                className="flex items-center justify-between p-4 border border-gray-200 rounded hover:bg-gray-50"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    {player.ranking}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{player.name}</h3>
                    <p className="text-sm text-gray-600">Win Rate: {player.winPercentage}%</p>
                  </div>
                </div>
                <button
                  data-testid="registereduser-view-profile"
                  onClick={() => handlePlayerSelect(player)}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  View Profile
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Player Profile Details (Only for Registered Users) */}
        {selectedPlayer && currentUser && currentUser.registered && (
          <div data-testid="registereduser-profile-details" className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Player Profile</h2>
              <button
                data-testid="registereduser-close-profile"
                onClick={() => setSelectedPlayer(null)}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
              >
                Close
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{selectedPlayer.name}</h3>
                <div className="space-y-3">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Ranking:</span>
                    <span className="font-semibold text-gray-900">#{selectedPlayer.ranking}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Preferred Surface:</span>
                    <span className="font-semibold text-gray-900">{selectedPlayer.preferredSurface}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Win Percentage:</span>
                    <span className="font-semibold text-green-600">{selectedPlayer.winPercentage}%</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Match Statistics</h3>
                <div className="space-y-3">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Matches Won:</span>
                    <span className="font-semibold text-green-600">{selectedPlayer.matchesWon}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Matches Lost:</span>
                    <span className="font-semibold text-red-600">{selectedPlayer.matchesLost}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Total Matches:</span>
                    <span className="font-semibold text-gray-900">
                      {selectedPlayer.matchesWon + selectedPlayer.matchesLost}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-blue-50 border border-blue-200 rounded p-4">
              <p className="text-blue-800 text-sm">
                ✓ You have access to this profile as a registered user
              </p>
            </div>
          </div>
        )}

        {/* No User Logged In */}
        {!currentUser && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
            <h3 className="text-yellow-800 font-semibold mb-2">Please Log In</h3>
            <p className="text-yellow-700 mb-3">
              You must log in to view player profiles and statistics.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
