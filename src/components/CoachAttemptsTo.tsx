/**
 * CoachAttemptsTo — Coach interface for accessing and viewing player statistics
 *
 * Features: player list, statistics dashboard, filter by team/position, performance metrics, season comparison
 *
 * Ticket: SCRUM-1168 | Branch: proto/SCRUM-1163
 */

import React, { useState } from 'react'

interface PlayerStatistic {
  id: string
  name: string
  team: string
  position: string
  gamesPlayed: number
  points: number
  assists: number
  rebounds: number
  fieldGoalPercentage: number
  threePointPercentage: number
  freeThrowPercentage: number
  averageMinutes: number
}

const mockPlayerStats: PlayerStatistic[] = [
  {
    id: 'p1',
    name: 'Marcus Johnson',
    team: 'Eagles',
    position: 'Point Guard',
    gamesPlayed: 28,
    points: 18.5,
    assists: 7.2,
    rebounds: 4.1,
    fieldGoalPercentage: 45.3,
    threePointPercentage: 38.7,
    freeThrowPercentage: 87.5,
    averageMinutes: 32.4
  },
  {
    id: 'p2',
    name: 'David Thompson',
    team: 'Eagles',
    position: 'Shooting Guard',
    gamesPlayed: 30,
    points: 22.8,
    assists: 3.5,
    rebounds: 5.2,
    fieldGoalPercentage: 48.2,
    threePointPercentage: 41.2,
    freeThrowPercentage: 89.3,
    averageMinutes: 35.6
  },
  {
    id: 'p3',
    name: 'Tyler Anderson',
    team: 'Hawks',
    position: 'Small Forward',
    gamesPlayed: 27,
    points: 16.3,
    assists: 4.8,
    rebounds: 7.9,
    fieldGoalPercentage: 43.8,
    threePointPercentage: 35.4,
    freeThrowPercentage: 76.8,
    averageMinutes: 30.2
  },
  {
    id: 'p4',
    name: 'Brandon Williams',
    team: 'Hawks',
    position: 'Power Forward',
    gamesPlayed: 29,
    points: 14.7,
    assists: 2.1,
    rebounds: 9.5,
    fieldGoalPercentage: 51.6,
    threePointPercentage: 28.3,
    freeThrowPercentage: 72.4,
    averageMinutes: 28.9
  },
  {
    id: 'p5',
    name: 'Chris Mitchell',
    team: 'Eagles',
    position: 'Center',
    gamesPlayed: 26,
    points: 12.4,
    assists: 1.8,
    rebounds: 11.2,
    fieldGoalPercentage: 56.7,
    threePointPercentage: 0,
    freeThrowPercentage: 68.9,
    averageMinutes: 26.5
  },
  {
    id: 'p6',
    name: 'Kevin Roberts',
    team: 'Falcons',
    position: 'Point Guard',
    gamesPlayed: 31,
    points: 20.1,
    assists: 8.9,
    rebounds: 3.7,
    fieldGoalPercentage: 46.9,
    threePointPercentage: 39.2,
    freeThrowPercentage: 85.7,
    averageMinutes: 34.8
  },
  {
    id: 'p7',
    name: 'James Parker',
    team: 'Falcons',
    position: 'Shooting Guard',
    gamesPlayed: 28,
    points: 19.6,
    assists: 4.2,
    rebounds: 4.8,
    fieldGoalPercentage: 44.5,
    threePointPercentage: 37.8,
    freeThrowPercentage: 82.1,
    averageMinutes: 31.7
  }
]

export default function CoachAttemptsTo() {
  const [selectedTeam, setSelectedTeam] = useState<string>('all')
  const [selectedPosition, setSelectedPosition] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerStatistic | null>(null)

  const teams = ['all', ...Array.from(new Set(mockPlayerStats.map(p => p.team)))]
  const positions = ['all', ...Array.from(new Set(mockPlayerStats.map(p => p.position)))]

  const filteredPlayers = mockPlayerStats.filter(player => {
    const matchesTeam = selectedTeam === 'all' || player.team === selectedTeam
    const matchesPosition = selectedPosition === 'all' || player.position === selectedPosition
    const matchesSearch = player.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesTeam && matchesPosition && matchesSearch
  })

  return (
    <div data-testid="coachattemptsto" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Player Statistics Dashboard</h1>
          <p className="text-gray-600">Access and analyze player performance data</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Filters</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                Search Player
              </label>
              <input
                id="search"
                type="text"
                data-testid="coachattemptsto-search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter player name..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="team" className="block text-sm font-medium text-gray-700 mb-2">
                Team
              </label>
              <select
                id="team"
                data-testid="coachattemptsto-team"
                value={selectedTeam}
                onChange={(e) => setSelectedTeam(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {teams.map(team => (
                  <option key={team} value={team}>
                    {team === 'all' ? 'All Teams' : team}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-2">
                Position
              </label>
              <select
                id="position"
                data-testid="coachattemptsto-position"
                value={selectedPosition}
                onChange={(e) => setSelectedPosition(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {positions.map(pos => (
                  <option key={pos} value={pos}>
                    {pos === 'all' ? 'All Positions' : pos}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4 flex gap-3">
            <button
              data-testid="coachattemptsto-reset"
              onClick={() => {
                setSelectedTeam('all')
                setSelectedPosition('all')
                setSearchQuery('')
              }}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Reset Filters
            </button>
            <button
              data-testid="coachattemptsto-export"
              onClick={() => alert('Export functionality would be implemented here')}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Export Statistics
            </button>
          </div>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Player List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Players ({filteredPlayers.length})
              </h2>
              <div data-testid="coachattemptsto-list" className="space-y-2 max-h-[600px] overflow-y-auto">
                {filteredPlayers.map(player => (
                  <div
                    key={player.id}
                    data-testid="coachattemptsto-item"
                    onClick={() => setSelectedPlayer(player)}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      selectedPlayer?.id === player.id
                        ? 'bg-blue-50 border-blue-500'
                        : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    <div className="font-semibold text-gray-900">{player.name}</div>
                    <div className="text-sm text-gray-600">{player.position}</div>
                    <div className="text-sm text-gray-500">{player.team}</div>
                    <div className="mt-2 flex gap-4 text-xs text-gray-600">
                      <span>{player.points} PPG</span>
                      <span>{player.assists} APG</span>
                      <span>{player.rebounds} RPG</span>
                    </div>
                  </div>
                ))}
                {filteredPlayers.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No players found matching your filters
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Detailed Statistics */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              {selectedPlayer ? (
                <>
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">{selectedPlayer.name}</h2>
                    <div className="flex gap-4 mt-2 text-sm text-gray-600">
                      <span>{selectedPlayer.team}</span>
                      <span>•</span>
                      <span>{selectedPlayer.position}</span>
                      <span>•</span>
                      <span>{selectedPlayer.gamesPlayed} Games Played</span>
                    </div>
                  </div>

                  {/* Key Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="text-sm text-blue-600 font-medium mb-1">Points Per Game</div>
                      <div className="text-3xl font-bold text-blue-900">{selectedPlayer.points}</div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="text-sm text-green-600 font-medium mb-1">Assists Per Game</div>
                      <div className="text-3xl font-bold text-green-900">{selectedPlayer.assists}</div>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4">
                      <div className="text-sm text-purple-600 font-medium mb-1">Rebounds Per Game</div>
                      <div className="text-3xl font-bold text-purple-900">{selectedPlayer.rebounds}</div>
                    </div>
                  </div>

                  {/* Shooting Stats */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Shooting Statistics</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">Field Goal %</span>
                          <span className="text-sm font-bold text-gray-900">{selectedPlayer.fieldGoalPercentage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${selectedPlayer.fieldGoalPercentage}%` }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">Three Point %</span>
                          <span className="text-sm font-bold text-gray-900">{selectedPlayer.threePointPercentage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-600 h-2 rounded-full"
                            style={{ width: `${selectedPlayer.threePointPercentage}%` }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">Free Throw %</span>
                          <span className="text-sm font-bold text-gray-900">{selectedPlayer.freeThrowPercentage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-purple-600 h-2 rounded-full"
                            style={{ width: `${selectedPlayer.freeThrowPercentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Additional Stats */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="border border-gray-200 rounded-lg p-4">
                        <div className="text-sm text-gray-600 mb-1">Average Minutes</div>
                        <div className="text-xl font-bold text-gray-900">{selectedPlayer.averageMinutes}</div>
                      </div>
                      <div className="border border-gray-200 rounded-lg p-4">
                        <div className="text-sm text-gray-600 mb-1">Games Played</div>
                        <div className="text-xl font-bold text-gray-900">{selectedPlayer.gamesPlayed}</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex gap-3">
                    <button
                      data-testid="coachattemptsto-compare"
                      onClick={() => alert('Compare functionality would be implemented here')}
                      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Compare Players
                    </button>
                    <button
                      data-testid="coachattemptsto-details"
                      onClick={() => alert('View full player profile')}
                      className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      View Full Profile
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center py-16">
                  <div className="text-gray-400 mb-2">
                    <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Player Selected</h3>
                  <p className="text-gray-600">Select a player from the list to view detailed statistics</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
