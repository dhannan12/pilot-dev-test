/**
 * APlayerAttempts — Registration form showing a player attempting to register after the deadline
 *
 * Features: deadline validation, disabled form state, error messaging, tournament info display, late registration handling
 *
 * Ticket: SCRUM-1105 | Branch: proto/SCRUM-1103
 */

import React, { useState } from 'react'

interface Tournament {
  id: string
  name: string
  deadline: string
  date: string
  location: string
  registrationOpen: boolean
}

const mockTournaments: Tournament[] = [
  {
    id: 'T001',
    name: 'Spring Championship 2026',
    deadline: '2026-08-20',
    date: '2026-08-30',
    location: 'City Sports Center',
    registrationOpen: false,
  },
  {
    id: 'T002',
    name: 'Summer Open Tournament',
    deadline: '2026-08-15',
    date: '2026-08-28',
    location: 'Downtown Arena',
    registrationOpen: false,
  },
  {
    id: 'T003',
    name: 'Regional Qualifier',
    deadline: '2026-08-18',
    date: '2026-09-01',
    location: 'Recreation Complex',
    registrationOpen: false,
  },
  {
    id: 'T004',
    name: 'Youth Division Finals',
    deadline: '2026-08-22',
    date: '2026-09-05',
    location: 'University Gym',
    registrationOpen: false,
  },
  {
    id: 'T005',
    name: 'Mixed Doubles Classic',
    deadline: '2026-08-19',
    date: '2026-08-29',
    location: 'Metro Sports Hall',
    registrationOpen: false,
  },
]

export default function APlayerAttempts() {
  const [selectedTournament, setSelectedTournament] = useState<string>(mockTournaments[0].id)
  const [playerName, setPlayerName] = useState('')
  const [email, setEmail] = useState('')
  const [showError, setShowError] = useState(false)

  const currentTournament = mockTournaments.find(t => t.id === selectedTournament)
  const today = new Date('2026-08-25')
  const deadline = currentTournament ? new Date(currentTournament.deadline) : new Date()
  const isPastDeadline = today > deadline

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isPastDeadline) {
      setShowError(true)
    }
  }

  const daysOverdue = Math.floor((today.getTime() - deadline.getTime()) / (1000 * 60 * 60 * 24))

  return (
    <div data-testid="aplayerattempts" className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Tournament Registration</h1>
          <p className="text-gray-600 mb-6">Register for upcoming table tennis tournaments</p>

          {/* Tournament Selection */}
          <div className="mb-6">
            <label htmlFor="tournament-select" className="block text-sm font-medium text-gray-700 mb-2">
              Select Tournament
            </label>
            <select
              id="tournament-select"
              data-testid="aplayerattempts-tournament"
              value={selectedTournament}
              onChange={(e) => {
                setSelectedTournament(e.target.value)
                setShowError(false)
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {mockTournaments.map((tournament) => (
                <option key={tournament.id} value={tournament.id}>
                  {tournament.name}
                </option>
              ))}
            </select>
          </div>

          {/* Tournament Details */}
          {currentTournament && (
            <div data-testid="aplayerattempts-tournament-info" className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h2 className="font-semibold text-blue-900 mb-3">Tournament Details</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Tournament Date:</span>
                  <span className="font-medium text-gray-900">{currentTournament.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Location:</span>
                  <span className="font-medium text-gray-900">{currentTournament.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Registration Deadline:</span>
                  <span className={`font-medium ${isPastDeadline ? 'text-red-600' : 'text-gray-900'}`}>
                    {currentTournament.deadline}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className={`font-semibold ${isPastDeadline ? 'text-red-600' : 'text-green-600'}`}>
                    {isPastDeadline ? 'Registration Closed' : 'Registration Open'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Deadline Passed Error */}
          {isPastDeadline && (
            <div data-testid="aplayerattempts-error" className="bg-red-50 border border-red-300 rounded-lg p-4 mb-6">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <div>
                  <h3 className="text-sm font-semibold text-red-800 mb-1">Registration Deadline Passed</h3>
                  <p className="text-sm text-red-700">
                    The registration deadline for this tournament was {currentTournament?.deadline}.
                    The deadline passed {daysOverdue} {daysOverdue === 1 ? 'day' : 'days'} ago.
                    Registration is no longer available.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Registration Attempt Error (shown after submit attempt) */}
          {showError && (
            <div data-testid="aplayerattempts-submit-error" className="bg-orange-50 border border-orange-300 rounded-lg p-4 mb-6">
              <p className="text-sm font-medium text-orange-800">
                ⚠ Unable to process registration. The tournament registration period has ended.
              </p>
            </div>
          )}

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="player-name" className="block text-sm font-medium text-gray-700 mb-2">
                Player Name
              </label>
              <input
                id="player-name"
                type="text"
                data-testid="aplayerattempts-name"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                disabled={isPastDeadline}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  isPastDeadline ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'border-gray-300'
                }`}
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label htmlFor="player-email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="player-email"
                type="email"
                data-testid="aplayerattempts-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isPastDeadline}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  isPastDeadline ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'border-gray-300'
                }`}
                placeholder="your.email@example.com"
              />
            </div>

            <button
              type="submit"
              data-testid="aplayerattempts-submit"
              disabled={isPastDeadline}
              className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
                isPastDeadline
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isPastDeadline ? 'Registration Closed' : 'Register for Tournament'}
            </button>
          </form>
        </div>

        {/* All Tournaments List */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">All Tournaments</h2>
          <div data-testid="aplayerattempts-list" className="space-y-3">
            {mockTournaments.map((tournament) => {
              const tournamentDeadline = new Date(tournament.deadline)
              const isDeadlinePassed = today > tournamentDeadline
              
              return (
                <div
                  key={tournament.id}
                  data-testid="aplayerattempts-item"
                  className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900">{tournament.name}</h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        isDeadlinePassed
                          ? 'bg-red-100 text-red-700'
                          : 'bg-green-100 text-green-700'
                      }`}
                    >
                      {isDeadlinePassed ? 'Closed' : 'Open'}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>📍 {tournament.location}</p>
                    <p>📅 Tournament: {tournament.date}</p>
                    <p className={isDeadlinePassed ? 'text-red-600 font-medium' : ''}>
                      ⏰ Deadline: {tournament.deadline}
                    </p>
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
