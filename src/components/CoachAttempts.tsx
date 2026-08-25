/**
 * CoachAttempts — Access control for player statistics viewing
 *
 * Features: Coach authentication, player statistics display, match analysis reports, access attempt logging, role-based permissions
 *
 * Ticket: SCRUM-1191 | Branch: proto/SCRUM-1186
 */

import React, { useState } from 'react'

interface Player {
  id: string
  name: string
  rank: number
  matchesPlayed: number
  winRate: number
  averageScore: number
}

interface AccessAttempt {
  id: string
  userId: string
  userName: string
  userRole: 'coach' | 'player' | 'viewer'
  playerId: string
  playerName: string
  timestamp: string
  status: 'granted' | 'denied'
  reason?: string
}

interface MatchAnalysis {
  id: string
  playerId: string
  matchDate: string
  opponent: string
  result: 'win' | 'loss'
  score: string
  notes: string
}

const MOCK_PLAYERS: Player[] = [
  { id: 'p1', name: 'Rafael Nadal', rank: 1, matchesPlayed: 45, winRate: 87.5, averageScore: 6.2 },
  { id: 'p2', name: 'Novak Djokovic', rank: 2, matchesPlayed: 42, winRate: 85.3, averageScore: 6.1 },
  { id: 'p3', name: 'Roger Federer', rank: 3, matchesPlayed: 38, winRate: 82.1, averageScore: 5.9 },
  { id: 'p4', name: 'Serena Williams', rank: 4, matchesPlayed: 40, winRate: 89.2, averageScore: 6.4 },
  { id: 'p5', name: 'Venus Williams', rank: 5, matchesPlayed: 36, winRate: 78.5, averageScore: 5.7 }
]

const MOCK_ACCESS_ATTEMPTS: AccessAttempt[] = [
  {
    id: 'a1',
    userId: 'u1',
    userName: 'John Smith',
    userRole: 'coach',
    playerId: 'p1',
    playerName: 'Rafael Nadal',
    timestamp: '2026-08-25T10:30:00',
    status: 'granted'
  },
  {
    id: 'a2',
    userId: 'u2',
    userName: 'Jane Doe',
    userRole: 'player',
    playerId: 'p2',
    playerName: 'Novak Djokovic',
    timestamp: '2026-08-25T11:15:00',
    status: 'denied',
    reason: 'Insufficient permissions - Coach access required'
  },
  {
    id: 'a3',
    userId: 'u3',
    userName: 'Mike Johnson',
    userRole: 'coach',
    playerId: 'p3',
    playerName: 'Roger Federer',
    timestamp: '2026-08-25T12:00:00',
    status: 'granted'
  },
  {
    id: 'a4',
    userId: 'u4',
    userName: 'Sarah Connor',
    userRole: 'viewer',
    playerId: 'p4',
    playerName: 'Serena Williams',
    timestamp: '2026-08-25T13:45:00',
    status: 'denied',
    reason: 'Insufficient permissions - Coach access required'
  },
  {
    id: 'a5',
    userId: 'u1',
    userName: 'John Smith',
    userRole: 'coach',
    playerId: 'p5',
    playerName: 'Venus Williams',
    timestamp: '2026-08-25T14:20:00',
    status: 'granted'
  }
]

const MOCK_MATCH_ANALYSES: MatchAnalysis[] = [
  {
    id: 'm1',
    playerId: 'p1',
    matchDate: '2026-08-20',
    opponent: 'Andy Murray',
    result: 'win',
    score: '6-4, 6-3',
    notes: 'Strong serve, excellent baseline play'
  },
  {
    id: 'm2',
    playerId: 'p2',
    matchDate: '2026-08-21',
    opponent: 'Stan Wawrinka',
    result: 'win',
    score: '7-6, 6-4',
    notes: 'Great return game, consistent performance'
  },
  {
    id: 'm3',
    playerId: 'p3',
    matchDate: '2026-08-22',
    opponent: 'Juan Del Potro',
    result: 'loss',
    score: '4-6, 5-7',
    notes: 'Struggled with first serve percentage'
  },
  {
    id: 'm4',
    playerId: 'p4',
    matchDate: '2026-08-23',
    opponent: 'Maria Sharapova',
    result: 'win',
    score: '6-2, 6-1',
    notes: 'Dominant performance, aggressive play'
  },
  {
    id: 'm5',
    playerId: 'p5',
    matchDate: '2026-08-24',
    opponent: 'Victoria Azarenka',
    result: 'win',
    score: '6-3, 7-5',
    notes: 'Strong mental game, clutch points'
  }
]

export default function CoachAttempts() {
  const [currentUserRole, setCurrentUserRole] = useState<'coach' | 'player' | 'viewer'>('viewer')
  const [selectedPlayerId, setSelectedPlayerId] = useState<string>('')
  const [accessAttempts] = useState<AccessAttempt[]>(MOCK_ACCESS_ATTEMPTS)
  const [showStatistics, setShowStatistics] = useState(false)

  const selectedPlayer = MOCK_PLAYERS.find(p => p.id === selectedPlayerId)
  const playerAnalyses = MOCK_MATCH_ANALYSES.filter(m => m.playerId === selectedPlayerId)

  const handleAccessRequest = () => {
    if (!selectedPlayerId) {
      return
    }

    if (currentUserRole === 'coach') {
      setShowStatistics(true)
    } else {
      setShowStatistics(false)
      alert(`Access Denied: Only coaches can access detailed player statistics.\nYour role: ${currentUserRole}`)
    }
  }

  return (
    <div data-testid="coachattempts" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Player Statistics Access Control
          </h1>
          <p className="text-gray-600">
            Only coaches can access detailed player statistics and match analysis reports
          </p>
        </header>

        {/* Role Selector */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Current User Role</h2>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                data-testid="coachattempts-role-coach"
                name="role"
                value="coach"
                checked={currentUserRole === 'coach'}
                onChange={(e) => {
                  setCurrentUserRole(e.target.value as 'coach')
                  setShowStatistics(false)
                }}
                className="mr-2"
              />
              <span className="text-gray-700">Coach</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                data-testid="coachattempts-role-player"
                name="role"
                value="player"
                checked={currentUserRole === 'player'}
                onChange={(e) => {
                  setCurrentUserRole(e.target.value as 'player')
                  setShowStatistics(false)
                }}
                className="mr-2"
              />
              <span className="text-gray-700">Player</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                data-testid="coachattempts-role-viewer"
                name="role"
                value="viewer"
                checked={currentUserRole === 'viewer'}
                onChange={(e) => {
                  setCurrentUserRole(e.target.value as 'viewer')
                  setShowStatistics(false)
                }}
                className="mr-2"
              />
              <span className="text-gray-700">Viewer</span>
            </label>
          </div>
          <p className="mt-3 text-sm text-gray-600">
            Selected role: <span className="font-semibold text-blue-600">{currentUserRole}</span>
          </p>
        </div>

        {/* Player Selection */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Select Player</h2>
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <label htmlFor="player-select" className="block text-sm font-medium text-gray-700 mb-2">
                Choose a player to view statistics
              </label>
              <select
                id="player-select"
                data-testid="coachattempts-player-select"
                value={selectedPlayerId}
                onChange={(e) => {
                  setSelectedPlayerId(e.target.value)
                  setShowStatistics(false)
                }}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">-- Select a player --</option>
                {MOCK_PLAYERS.map(player => (
                  <option key={player.id} value={player.id}>
                    {player.name} (Rank #{player.rank})
                  </option>
                ))}
              </select>
            </div>
            <button
              data-testid="coachattempts-request-access"
              onClick={handleAccessRequest}
              disabled={!selectedPlayerId}
              className={`px-6 py-2 rounded-md font-semibold ${
                selectedPlayerId
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Request Access
            </button>
          </div>
        </div>

        {/* Player Statistics (Visible only to coaches) */}
        {showStatistics && selectedPlayer && currentUserRole === 'coach' && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Player Statistics: {selectedPlayer.name}
              </h2>
              <span className="bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full">
                Access Granted
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Rank</p>
                <p className="text-2xl font-bold text-blue-700">#{selectedPlayer.rank}</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Matches Played</p>
                <p className="text-2xl font-bold text-green-700">{selectedPlayer.matchesPlayed}</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Win Rate</p>
                <p className="text-2xl font-bold text-purple-700">{selectedPlayer.winRate}%</p>
              </div>
              <div className="bg-orange-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Average Score</p>
                <p className="text-2xl font-bold text-orange-700">{selectedPlayer.averageScore}</p>
              </div>
            </div>

            {/* Match Analysis Reports */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Match Analysis Reports</h3>
              <div data-testid="coachattempts-analysis-list" className="space-y-3">
                {playerAnalyses.map(analysis => (
                  <div
                    key={analysis.id}
                    data-testid="coachattempts-analysis-item"
                    className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-semibold text-gray-900">
                          vs {analysis.opponent}
                        </p>
                        <p className="text-sm text-gray-600">{analysis.matchDate}</p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          analysis.result === 'win'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {analysis.result.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">
                      Score: <span className="font-semibold">{analysis.score}</span>
                    </p>
                    <p className="text-sm text-gray-600 italic">{analysis.notes}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Access Attempt Log */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Access Attempt Log</h2>
          <div data-testid="coachattempts-list" className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Player
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Timestamp
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Reason
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {accessAttempts.map(attempt => (
                  <tr key={attempt.id} data-testid="coachattempts-item" className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      {attempt.userName}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          attempt.userRole === 'coach'
                            ? 'bg-blue-100 text-blue-800'
                            : attempt.userRole === 'player'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {attempt.userRole}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      {attempt.playerName}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                      {new Date(attempt.timestamp).toLocaleString()}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          attempt.status === 'granted'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {attempt.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {attempt.reason || '-'}
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
