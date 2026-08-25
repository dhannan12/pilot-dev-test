/**
 * TrainerAccessesPlayer — Allows trainers to view and access player performance data
 *
 * Features: player roster display, performance metrics, search/filter, detailed stats view, fitness tracking
 *
 * Ticket: SCRUM-1204 | Branch: proto/SCRUM-1199
 */

import React, { useState } from 'react'

interface PlayerPerformance {
  id: number
  name: string
  position: string
  goals: number
  assists: number
  trainingSessions: number
  fitnessLevel: number
  minutesPlayed: number
  lastUpdated: string
}

const mockPlayers: PlayerPerformance[] = [
  {
    id: 1,
    name: 'Marcus Silva',
    position: 'Forward',
    goals: 15,
    assists: 8,
    trainingSessions: 42,
    fitnessLevel: 92,
    minutesPlayed: 1850,
    lastUpdated: '2026-08-24'
  },
  {
    id: 2,
    name: 'Emily Rodriguez',
    position: 'Midfielder',
    goals: 7,
    assists: 14,
    trainingSessions: 45,
    fitnessLevel: 88,
    minutesPlayed: 2100,
    lastUpdated: '2026-08-24'
  },
  {
    id: 3,
    name: 'James Chen',
    position: 'Defender',
    goals: 2,
    assists: 5,
    trainingSessions: 40,
    fitnessLevel: 85,
    minutesPlayed: 1920,
    lastUpdated: '2026-08-23'
  },
  {
    id: 4,
    name: 'Sarah Johnson',
    position: 'Goalkeeper',
    goals: 0,
    assists: 1,
    trainingSessions: 43,
    fitnessLevel: 90,
    minutesPlayed: 2250,
    lastUpdated: '2026-08-24'
  },
  {
    id: 5,
    name: 'David Martinez',
    position: 'Midfielder',
    goals: 10,
    assists: 12,
    trainingSessions: 38,
    fitnessLevel: 87,
    minutesPlayed: 1680,
    lastUpdated: '2026-08-22'
  },
  {
    id: 6,
    name: 'Lisa Thompson',
    position: 'Forward',
    goals: 18,
    assists: 6,
    trainingSessions: 44,
    fitnessLevel: 94,
    minutesPlayed: 2020,
    lastUpdated: '2026-08-24'
  },
  {
    id: 7,
    name: 'Alex Kumar',
    position: 'Defender',
    goals: 3,
    assists: 4,
    trainingSessions: 41,
    fitnessLevel: 89,
    minutesPlayed: 1950,
    lastUpdated: '2026-08-23'
  }
]

export default function TrainerAccessesPlayer() {
  const [searchTerm, setSearchTerm] = useState('')
  const [positionFilter, setPositionFilter] = useState('All')
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerPerformance | null>(null)

  const positions = ['All', 'Forward', 'Midfielder', 'Defender', 'Goalkeeper']

  const filteredPlayers = mockPlayers.filter(player => {
    const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPosition = positionFilter === 'All' || player.position === positionFilter
    return matchesSearch && matchesPosition
  })

  return (
    <section data-testid="traineraccessesplayer" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Player Performance Dashboard</h1>

        {/* Search and Filter Controls */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                Search Players
              </label>
              <input
                id="search"
                type="text"
                data-testid="traineraccessesplayer-search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Position
              </label>
              <select
                id="position"
                data-testid="traineraccessesplayer-position"
                value={positionFilter}
                onChange={(e) => setPositionFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {positions.map(pos => (
                  <option key={pos} value={pos}>{pos}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Player List */}
        <div className="grid grid-cols-1 gap-4 mb-6" data-testid="traineraccessesplayer-list">
          {filteredPlayers.map(player => (
            <div
              key={player.id}
              data-testid="traineraccessesplayer-item"
              className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div className="flex-1 mb-4 md:mb-0">
                  <h3 className="text-xl font-semibold text-gray-900">{player.name}</h3>
                  <p className="text-gray-600">{player.position}</p>
                  <p className="text-sm text-gray-500 mt-1">Last updated: {player.lastUpdated}</p>
                </div>
                
                <div className="grid grid-cols-3 md:grid-cols-6 gap-4 flex-1">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">{player.goals}</p>
                    <p className="text-xs text-gray-600">Goals</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">{player.assists}</p>
                    <p className="text-xs text-gray-600">Assists</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-600">{player.trainingSessions}</p>
                    <p className="text-xs text-gray-600">Sessions</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-orange-600">{player.fitnessLevel}%</p>
                    <p className="text-xs text-gray-600">Fitness</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-indigo-600">{player.minutesPlayed}</p>
                    <p className="text-xs text-gray-600">Minutes</p>
                  </div>
                  <div className="text-center flex items-center justify-center">
                    <button
                      data-testid="traineraccessesplayer-view-detail"
                      onClick={() => setSelectedPlayer(player)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPlayers.length === 0 && (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-600">No players found matching your criteria.</p>
          </div>
        )}

        {/* Detailed View Modal */}
        {selectedPlayer && (
          <div 
            data-testid="traineraccessesplayer-modal"
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedPlayer(null)}
          >
            <div 
              className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedPlayer.name}</h2>
                  <p className="text-gray-600">{selectedPlayer.position}</p>
                </div>
                <button
                  data-testid="traineraccessesplayer-close-modal"
                  onClick={() => setSelectedPlayer(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                >
                  ×
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Goals Scored</p>
                  <p className="text-3xl font-bold text-blue-600">{selectedPlayer.goals}</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Assists</p>
                  <p className="text-3xl font-bold text-green-600">{selectedPlayer.assists}</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Training Sessions</p>
                  <p className="text-3xl font-bold text-purple-600">{selectedPlayer.trainingSessions}</p>
                </div>
                <div className="bg-orange-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Fitness Level</p>
                  <p className="text-3xl font-bold text-orange-600">{selectedPlayer.fitnessLevel}%</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <p className="text-sm text-gray-600 mb-1">Total Minutes Played</p>
                <p className="text-2xl font-bold text-gray-900">{selectedPlayer.minutesPlayed} minutes</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Last Performance Update</p>
                <p className="text-lg font-semibold text-gray-900">{selectedPlayer.lastUpdated}</p>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  data-testid="traineraccessesplayer-export"
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Export Data
                </button>
                <button
                  data-testid="traineraccessesplayer-close"
                  onClick={() => setSelectedPlayer(null)}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
