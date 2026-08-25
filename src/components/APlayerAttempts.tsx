/**
 * APlayerAttempts — Player tournament registration form for table tennis events
 *
 * Features: tournament selection, skill level picker, player info capture, registration validation, status feedback
 *
 * Ticket: SCRUM-1104 | Branch: proto/SCRUM-1103
 */

import React, { useState } from 'react'

interface Tournament {
  id: string
  name: string
  date: string
  location: string
  maxPlayers: number
  registeredPlayers: number
}

const mockTournaments: Tournament[] = [
  {
    id: '1',
    name: 'Spring Championship 2026',
    date: '2026-09-15',
    location: 'Downtown Sports Center',
    maxPlayers: 32,
    registeredPlayers: 18
  },
  {
    id: '2',
    name: 'City Open Series',
    date: '2026-10-01',
    location: 'Metro Recreation Hall',
    maxPlayers: 64,
    registeredPlayers: 45
  },
  {
    id: '3',
    name: 'Autumn Invitational',
    date: '2026-10-20',
    location: 'University Sports Complex',
    maxPlayers: 24,
    registeredPlayers: 24
  },
  {
    id: '4',
    name: 'Regional Masters Cup',
    date: '2026-11-05',
    location: 'State Athletic Arena',
    maxPlayers: 48,
    registeredPlayers: 12
  },
  {
    id: '5',
    name: 'Winter Classic Tournament',
    date: '2026-12-10',
    location: 'Community Sports Hub',
    maxPlayers: 40,
    registeredPlayers: 5
  }
]

export default function APlayerAttempts() {
  const [playerName, setPlayerName] = useState('')
  const [email, setEmail] = useState('')
  const [skillLevel, setSkillLevel] = useState('')
  const [selectedTournament, setSelectedTournament] = useState('')
  const [registrationStatus, setRegistrationStatus] = useState<'idle' | 'success' | 'full' | 'error'>('idle')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!playerName || !email || !skillLevel || !selectedTournament) {
      setRegistrationStatus('error')
      return
    }

    const tournament = mockTournaments.find(t => t.id === selectedTournament)
    if (tournament && tournament.registeredPlayers >= tournament.maxPlayers) {
      setRegistrationStatus('full')
      return
    }

    setRegistrationStatus('success')
    
    // Reset form after successful registration
    setTimeout(() => {
      setPlayerName('')
      setEmail('')
      setSkillLevel('')
      setSelectedTournament('')
      setRegistrationStatus('idle')
    }, 3000)
  }

  return (
    <div data-testid="aplayerattempts" className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Tournament Registration</h1>
          <p className="text-gray-600 mb-6">Register for an upcoming table tennis tournament</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Player Name */}
            <div>
              <label htmlFor="playerName" className="block text-sm font-medium text-gray-700 mb-2">
                Player Name *
              </label>
              <input
                id="playerName"
                type="text"
                data-testid="aplayerattempts-name"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your full name"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                id="email"
                type="email"
                data-testid="aplayerattempts-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="your.email@example.com"
              />
            </div>

            {/* Skill Level */}
            <div>
              <label htmlFor="skillLevel" className="block text-sm font-medium text-gray-700 mb-2">
                Skill Level *
              </label>
              <select
                id="skillLevel"
                data-testid="aplayerattempts-skilllevel"
                value={skillLevel}
                onChange={(e) => setSkillLevel(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select your skill level</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
                <option value="expert">Expert</option>
              </select>
            </div>

            {/* Tournament Selection */}
            <div>
              <label htmlFor="tournament" className="block text-sm font-medium text-gray-700 mb-2">
                Select Tournament *
              </label>
              <div data-testid="aplayerattempts-list" className="space-y-3">
                {mockTournaments.map((tournament) => {
                  const isFull = tournament.registeredPlayers >= tournament.maxPlayers
                  const spotsLeft = tournament.maxPlayers - tournament.registeredPlayers
                  
                  return (
                    <div
                      key={tournament.id}
                      data-testid="aplayerattempts-item"
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${
                        selectedTournament === tournament.id
                          ? 'border-indigo-600 bg-indigo-50'
                          : 'border-gray-300 hover:border-indigo-400'
                      } ${isFull ? 'opacity-50 cursor-not-allowed' : ''}`}
                      onClick={() => !isFull && setSelectedTournament(tournament.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800">{tournament.name}</h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {tournament.date} • {tournament.location}
                          </p>
                          <div className="mt-2">
                            {isFull ? (
                              <span className="inline-block px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded">
                                FULL
                              </span>
                            ) : (
                              <span className="inline-block px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded">
                                {spotsLeft} spots left
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="ml-4">
                          <input
                            type="radio"
                            name="tournament"
                            value={tournament.id}
                            checked={selectedTournament === tournament.id}
                            onChange={() => !isFull && setSelectedTournament(tournament.id)}
                            disabled={isFull}
                            className="w-5 h-5 text-indigo-600"
                          />
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Status Messages */}
            {registrationStatus === 'success' && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-md">
                <p className="text-green-800 font-medium">
                  Registration successful! You'll receive a confirmation email shortly.
                </p>
              </div>
            )}

            {registrationStatus === 'full' && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-800 font-medium">
                  Sorry, this tournament is full. Please select another tournament.
                </p>
              </div>
            )}

            {registrationStatus === 'error' && (
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                <p className="text-yellow-800 font-medium">
                  Please fill in all required fields.
                </p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              data-testid="aplayerattempts-submit"
              className="w-full bg-indigo-600 text-white py-3 px-6 rounded-md font-semibold hover:bg-indigo-700 transition-colors focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Register for Tournament
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
