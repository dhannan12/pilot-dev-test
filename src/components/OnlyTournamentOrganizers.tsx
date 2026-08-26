/**
 * OnlyTournamentOrganizers — Tournament schedule management with role-based access control
 *
 * Features: role validation, schedule editing, organizer-only controls, match list, permission gates
 *
 * Ticket: SCRUM-1218 | Branch: proto/SCRUM-1211
 */

import React, { useState } from 'react'

interface Match {
  id: string
  player1: string
  player2: string
  round: number
  scheduledTime: string
  scheduledDate: string
  venue: string
}

interface User {
  id: string
  name: string
  role: 'organizer' | 'participant'
}

const MOCK_MATCHES: Match[] = [
  {
    id: 'M001',
    player1: 'Magnus Carlsen',
    player2: 'Hikaru Nakamura',
    round: 1,
    scheduledTime: '10:00 AM',
    scheduledDate: '2026-09-15',
    venue: 'Hall A'
  },
  {
    id: 'M002',
    player1: 'Fabiano Caruana',
    player2: 'Ding Liren',
    round: 1,
    scheduledTime: '10:00 AM',
    scheduledDate: '2026-09-15',
    venue: 'Hall B'
  },
  {
    id: 'M003',
    player1: 'Ian Nepomniachtchi',
    player2: 'Alireza Firouzja',
    round: 2,
    scheduledTime: '02:00 PM',
    scheduledDate: '2026-09-16',
    venue: 'Hall A'
  },
  {
    id: 'M004',
    player1: 'Wesley So',
    player2: 'Levon Aronian',
    round: 2,
    scheduledTime: '02:00 PM',
    scheduledDate: '2026-09-16',
    venue: 'Hall C'
  },
  {
    id: 'M005',
    player1: 'Maxime Vachier-Lagrave',
    player2: 'Anish Giri',
    round: 3,
    scheduledTime: '10:00 AM',
    scheduledDate: '2026-09-17',
    venue: 'Hall B'
  },
  {
    id: 'M006',
    player1: 'Shakhriyar Mamedyarov',
    player2: 'Teimour Radjabov',
    round: 3,
    scheduledTime: '10:00 AM',
    scheduledDate: '2026-09-17',
    venue: 'Hall A'
  }
]

const MOCK_USERS: User[] = [
  { id: 'U001', name: 'John Smith', role: 'organizer' },
  { id: 'U002', name: 'Alice Johnson', role: 'participant' }
]

export default function OnlyTournamentOrganizers() {
  const [currentUser, setCurrentUser] = useState<User>(MOCK_USERS[1]) // Start as participant
  const [matches, setMatches] = useState<Match[]>(MOCK_MATCHES)
  const [editingMatchId, setEditingMatchId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<Match | null>(null)

  const isOrganizer = currentUser.role === 'organizer'

  const handleEditClick = (match: Match) => {
    if (!isOrganizer) return
    setEditingMatchId(match.id)
    setEditForm({ ...match })
  }

  const handleSave = () => {
    if (!isOrganizer || !editForm) return
    setMatches(matches.map(m => m.id === editForm.id ? editForm : m))
    setEditingMatchId(null)
    setEditForm(null)
  }

  const handleCancel = () => {
    setEditingMatchId(null)
    setEditForm(null)
  }

  const handleFormChange = (field: keyof Match, value: string) => {
    if (!isOrganizer || !editForm) return
    setEditForm({ ...editForm, [field]: value })
  }

  const toggleUserRole = () => {
    setCurrentUser(currentUser.role === 'organizer' ? MOCK_USERS[1] : MOCK_USERS[0])
    setEditingMatchId(null)
    setEditForm(null)
  }

  return (
    <div data-testid="onlytournamentorganizers" className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Tournament Match Schedule
          </h1>
          
          {/* Current User Info */}
          <div className="flex items-center justify-between bg-gray-100 rounded-lg p-4">
            <div>
              <p className="text-sm text-gray-600">Current User</p>
              <p className="text-lg font-semibold text-gray-900">{currentUser.name}</p>
              <p className="text-sm">
                Role: <span className={`font-medium ${isOrganizer ? 'text-green-600' : 'text-blue-600'}`}>
                  {currentUser.role}
                </span>
              </p>
            </div>
            <button
              data-testid="onlytournamentorganizers-toggle-role"
              onClick={toggleUserRole}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
            >
              Switch to {currentUser.role === 'organizer' ? 'Participant' : 'Organizer'}
            </button>
          </div>

          {/* Permission Notice */}
          {!isOrganizer && (
            <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-yellow-800 text-sm">
                ⚠️ You do not have permission to modify match schedules. Only tournament organizers can edit schedules.
              </p>
            </div>
          )}
        </div>

        {/* Matches List */}
        <div data-testid="onlytournamentorganizers-list" className="space-y-4">
          {matches.map((match) => (
            <div
              key={match.id}
              data-testid="onlytournamentorganizers-item"
              className="bg-white rounded-lg shadow-md p-6"
            >
              {editingMatchId === match.id && editForm ? (
                // Edit Mode (Organizer Only)
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900">
                      Editing Match {match.id}
                    </h3>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                      Round {match.round}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Player 1
                      </label>
                      <input
                        type="text"
                        data-testid="onlytournamentorganizers-player1"
                        value={editForm.player1}
                        onChange={(e) => handleFormChange('player1', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Player 2
                      </label>
                      <input
                        type="text"
                        data-testid="onlytournamentorganizers-player2"
                        value={editForm.player2}
                        onChange={(e) => handleFormChange('player2', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Date
                      </label>
                      <input
                        type="date"
                        data-testid="onlytournamentorganizers-date"
                        value={editForm.scheduledDate}
                        onChange={(e) => handleFormChange('scheduledDate', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Time
                      </label>
                      <input
                        type="text"
                        data-testid="onlytournamentorganizers-time"
                        value={editForm.scheduledTime}
                        onChange={(e) => handleFormChange('scheduledTime', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Venue
                      </label>
                      <input
                        type="text"
                        data-testid="onlytournamentorganizers-venue"
                        value={editForm.venue}
                        onChange={(e) => handleFormChange('venue', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      data-testid="onlytournamentorganizers-save"
                      onClick={handleSave}
                      className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-medium"
                    >
                      Save Changes
                    </button>
                    <button
                      data-testid="onlytournamentorganizers-cancel"
                      onClick={handleCancel}
                      className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors font-medium"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                // View Mode
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900">
                      {match.player1} vs {match.player2}
                    </h3>
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">
                      Round {match.round}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Date</p>
                      <p className="text-lg font-medium text-gray-900">{match.scheduledDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Time</p>
                      <p className="text-lg font-medium text-gray-900">{match.scheduledTime}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Venue</p>
                      <p className="text-lg font-medium text-gray-900">{match.venue}</p>
                    </div>
                  </div>

                  {isOrganizer ? (
                    <button
                      data-testid="onlytournamentorganizers-edit"
                      onClick={() => handleEditClick(match)}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors font-medium"
                    >
                      Edit Schedule
                    </button>
                  ) : (
                    <div className="px-4 py-2 bg-gray-100 text-gray-500 rounded-md inline-block">
                      <span className="text-sm">🔒 Organizer access required to edit</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
