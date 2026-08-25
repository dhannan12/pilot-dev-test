/**
 * LeagueTableUpdates — Displays league table standings with recent match results and position changes
 *
 * Features: live standings table, recent match results, position change indicators, team statistics, visual movement arrows
 *
 * Ticket: SCRUM-1205 | Branch: proto/SCRUM-1199
 */

import React, { useState } from 'react'

interface Team {
  id: number
  name: string
  played: number
  won: number
  drawn: number
  lost: number
  goalsFor: number
  goalsAgainst: number
  goalDifference: number
  points: number
  position: number
  positionChange: number // positive = moved up, negative = moved down, 0 = no change
}

interface MatchResult {
  id: number
  homeTeam: string
  awayTeam: string
  homeScore: number
  awayScore: number
  date: string
  affectedPositions: string[]
}

const MOCK_TEAMS: Team[] = [
  {
    id: 1,
    name: 'Manchester City',
    played: 10,
    won: 8,
    drawn: 1,
    lost: 1,
    goalsFor: 28,
    goalsAgainst: 10,
    goalDifference: 18,
    points: 25,
    position: 1,
    positionChange: 1,
  },
  {
    id: 2,
    name: 'Arsenal',
    played: 10,
    won: 7,
    drawn: 2,
    lost: 1,
    goalsFor: 24,
    goalsAgainst: 12,
    goalDifference: 12,
    points: 23,
    position: 2,
    positionChange: -1,
  },
  {
    id: 3,
    name: 'Liverpool',
    played: 10,
    won: 7,
    drawn: 1,
    lost: 2,
    goalsFor: 22,
    goalsAgainst: 14,
    goalDifference: 8,
    points: 22,
    position: 3,
    positionChange: 0,
  },
  {
    id: 4,
    name: 'Chelsea',
    played: 10,
    won: 6,
    drawn: 3,
    lost: 1,
    goalsFor: 20,
    goalsAgainst: 11,
    goalDifference: 9,
    points: 21,
    position: 4,
    positionChange: 2,
  },
  {
    id: 5,
    name: 'Newcastle United',
    played: 10,
    won: 6,
    drawn: 2,
    lost: 2,
    goalsFor: 19,
    goalsAgainst: 13,
    goalDifference: 6,
    points: 20,
    position: 5,
    positionChange: -1,
  },
  {
    id: 6,
    name: 'Manchester United',
    played: 10,
    won: 5,
    drawn: 3,
    lost: 2,
    goalsFor: 17,
    goalsAgainst: 14,
    goalDifference: 3,
    points: 18,
    position: 6,
    positionChange: -1,
  },
  {
    id: 7,
    name: 'Tottenham',
    played: 10,
    won: 5,
    drawn: 2,
    lost: 3,
    goalsFor: 18,
    goalsAgainst: 16,
    goalDifference: 2,
    points: 17,
    position: 7,
    positionChange: 0,
  },
  {
    id: 8,
    name: 'Brighton',
    played: 10,
    won: 4,
    drawn: 3,
    lost: 3,
    goalsFor: 15,
    goalsAgainst: 15,
    goalDifference: 0,
    points: 15,
    position: 8,
    positionChange: 1,
  },
]

const MOCK_RECENT_MATCHES: MatchResult[] = [
  {
    id: 1,
    homeTeam: 'Manchester City',
    awayTeam: 'Arsenal',
    homeScore: 3,
    awayScore: 1,
    date: '2026-08-24',
    affectedPositions: ['Manchester City moved up to 1st', 'Arsenal dropped to 2nd'],
  },
  {
    id: 2,
    homeTeam: 'Chelsea',
    awayTeam: 'Newcastle United',
    homeScore: 2,
    awayScore: 0,
    date: '2026-08-24',
    affectedPositions: ['Chelsea moved up to 4th', 'Newcastle dropped to 5th'],
  },
  {
    id: 3,
    homeTeam: 'Liverpool',
    awayTeam: 'Tottenham',
    homeScore: 2,
    awayScore: 2,
    date: '2026-08-23',
    affectedPositions: ['Positions unchanged'],
  },
  {
    id: 4,
    homeTeam: 'Brighton',
    awayTeam: 'Manchester United',
    homeScore: 2,
    awayScore: 1,
    date: '2026-08-23',
    affectedPositions: ['Brighton moved up to 8th', 'Manchester United dropped to 6th'],
  },
  {
    id: 5,
    homeTeam: 'Newcastle United',
    awayTeam: 'Tottenham',
    homeScore: 1,
    awayScore: 0,
    date: '2026-08-22',
    affectedPositions: ['Newcastle moved up to 5th'],
  },
]

export default function LeagueTableUpdates() {
  const [selectedMatch, setSelectedMatch] = useState<number | null>(null)

  const getPositionChangeIcon = (change: number) => {
    if (change > 0) {
      return <span className="text-green-600 font-bold">↑{change}</span>
    } else if (change < 0) {
      return <span className="text-red-600 font-bold">↓{Math.abs(change)}</span>
    }
    return <span className="text-gray-400">−</span>
  }

  const getResultClass = (homeScore: number, awayScore: number, isHome: boolean) => {
    if (homeScore === awayScore) return 'bg-yellow-100 text-yellow-800'
    if ((isHome && homeScore > awayScore) || (!isHome && awayScore > homeScore)) {
      return 'bg-green-100 text-green-800'
    }
    return 'bg-red-100 text-red-800'
  }

  return (
    <div data-testid="leaguetableupdates" className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">League Table Updates</h1>
        <p className="text-gray-600">Live standings updated after each match result</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Match Results */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Results</h2>
            <div data-testid="leaguetableupdates-matches-list" className="space-y-3">
              {MOCK_RECENT_MATCHES.map((match) => (
                <div
                  key={match.id}
                  data-testid="leaguetableupdates-match-item"
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedMatch === match.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedMatch(selectedMatch === match.id ? null : match.id)}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-gray-900">{match.homeTeam}</span>
                    <span className="text-lg font-bold text-gray-900">{match.homeScore}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-gray-900">{match.awayTeam}</span>
                    <span className="text-lg font-bold text-gray-900">{match.awayScore}</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-2">{match.date}</div>
                  {selectedMatch === match.id && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <div className="text-xs font-semibold text-gray-700 mb-1">Position Changes:</div>
                      {match.affectedPositions.map((change, idx) => (
                        <div key={idx} className="text-xs text-gray-600">
                          • {change}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* League Table */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6 bg-gradient-to-r from-blue-600 to-blue-700">
              <h2 className="text-2xl font-bold text-white">Current Standings</h2>
              <p className="text-blue-100 text-sm mt-1">Updated after latest matches</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full" data-testid="leaguetableupdates-table">
                <thead className="bg-gray-100 border-b-2 border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Pos
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Team
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Pl
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      W
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      D
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      L
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      GF
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      GA
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      GD
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Pts
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Change
                    </th>
                  </tr>
                </thead>
                <tbody data-testid="leaguetableupdates-table-body" className="divide-y divide-gray-200">
                  {MOCK_TEAMS.map((team, idx) => (
                    <tr
                      key={team.id}
                      data-testid="leaguetableupdates-table-row"
                      className={`hover:bg-gray-50 transition-colors ${
                        team.positionChange !== 0 ? 'bg-blue-50' : ''
                      }`}
                    >
                      <td className="px-4 py-3 text-sm font-bold text-gray-900">{team.position}</td>
                      <td className="px-4 py-3 text-sm font-semibold text-gray-900">{team.name}</td>
                      <td className="px-4 py-3 text-sm text-center text-gray-700">{team.played}</td>
                      <td className="px-4 py-3 text-sm text-center text-gray-700">{team.won}</td>
                      <td className="px-4 py-3 text-sm text-center text-gray-700">{team.drawn}</td>
                      <td className="px-4 py-3 text-sm text-center text-gray-700">{team.lost}</td>
                      <td className="px-4 py-3 text-sm text-center text-gray-700">{team.goalsFor}</td>
                      <td className="px-4 py-3 text-sm text-center text-gray-700">{team.goalsAgainst}</td>
                      <td className="px-4 py-3 text-sm text-center font-semibold text-gray-900">
                        {team.goalDifference > 0 ? `+${team.goalDifference}` : team.goalDifference}
                      </td>
                      <td className="px-4 py-3 text-sm text-center font-bold text-gray-900">{team.points}</td>
                      <td className="px-4 py-3 text-sm text-center">{getPositionChangeIcon(team.positionChange)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Legend */}
          <div className="mt-4 bg-white rounded-lg shadow p-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Legend</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-700">Pl:</span>
                <span className="text-gray-600">Played</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-700">W:</span>
                <span className="text-gray-600">Won</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-700">D:</span>
                <span className="text-gray-600">Drawn</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-700">L:</span>
                <span className="text-gray-600">Lost</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-700">GF:</span>
                <span className="text-gray-600">Goals For</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-700">GA:</span>
                <span className="text-gray-600">Goals Against</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-700">GD:</span>
                <span className="text-gray-600">Goal Difference</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-700">Pts:</span>
                <span className="text-gray-600">Points</span>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-200 flex items-center gap-4 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-green-600 font-bold">↑</span>
                <span className="text-gray-600">Position improved</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-red-600 font-bold">↓</span>
                <span className="text-gray-600">Position dropped</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-400">−</span>
                <span className="text-gray-600">No change</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
