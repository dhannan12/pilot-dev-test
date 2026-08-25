/**
 * PlayerWith — League table displaying players with at least 3 matches recorded
 *
 * Features: player filtering by match count, ranking display, match statistics, win percentage calculation, eligibility status
 *
 * Ticket: SCRUM-1190 | Branch: proto/SCRUM-1186
 */

import React from 'react'

interface Player {
  id: number
  name: string
  matchesPlayed: number
  wins: number
  losses: number
  rank: number
}

const MOCK_PLAYERS: Player[] = [
  { id: 1, name: 'Emma Thompson', matchesPlayed: 12, wins: 9, losses: 3, rank: 1 },
  { id: 2, name: 'James Wilson', matchesPlayed: 8, wins: 6, losses: 2, rank: 2 },
  { id: 3, name: 'Sarah Chen', matchesPlayed: 2, wins: 1, losses: 1, rank: 0 },
  { id: 4, name: 'Michael Rodriguez', matchesPlayed: 10, wins: 5, losses: 5, rank: 3 },
  { id: 5, name: 'Olivia Martinez', matchesPlayed: 1, wins: 0, losses: 1, rank: 0 },
  { id: 6, name: 'David Kumar', matchesPlayed: 7, wins: 4, losses: 3, rank: 4 },
  { id: 7, name: 'Lisa Anderson', matchesPlayed: 15, wins: 11, losses: 4, rank: 5 },
  { id: 8, name: 'Robert Taylor', matchesPlayed: 3, wins: 2, losses: 1, rank: 6 },
]

export default function PlayerWith() {
  const [minMatches, setMinMatches] = React.useState<number>(3)
  
  // Filter players who meet the minimum match requirement
  const eligiblePlayers = MOCK_PLAYERS.filter(player => player.matchesPlayed >= minMatches)
  const ineligiblePlayers = MOCK_PLAYERS.filter(player => player.matchesPlayed < minMatches)
  
  const calculateWinPercentage = (wins: number, matchesPlayed: number): number => {
    if (matchesPlayed === 0) return 0
    return Math.round((wins / matchesPlayed) * 100)
  }

  return (
    <div data-testid="playerwith" className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Tennis League Table</h1>
          <p className="text-slate-600 text-lg">
            Players with at least {minMatches} matches recorded
          </p>
        </header>

        {/* Filter Control */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <label htmlFor="min-matches" className="block text-sm font-medium text-slate-700 mb-2">
            Minimum Matches Required
          </label>
          <input
            id="min-matches"
            type="number"
            min="0"
            max="20"
            value={minMatches}
            onChange={(e) => setMinMatches(Number(e.target.value))}
            data-testid="playerwith-min-matches"
            className="w-32 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <p className="mt-2 text-sm text-slate-500">
            {eligiblePlayers.length} eligible players, {ineligiblePlayers.length} ineligible
          </p>
        </div>

        {/* Eligible Players Table */}
        <section className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4">
            <h2 className="text-2xl font-bold text-white">
              Eligible Players ({eligiblePlayers.length})
            </h2>
          </div>
          
          {eligiblePlayers.length > 0 ? (
            <div className="overflow-x-auto" data-testid="playerwith-list">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                      Rank
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                      Player Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                      Matches
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                      Wins
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                      Losses
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                      Win %
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {eligiblePlayers.map((player, index) => (
                    <tr 
                      key={player.id} 
                      data-testid="playerwith-item"
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-800 font-semibold text-sm">
                          {index + 1}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-slate-900">{player.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {player.matchesPlayed}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                        {player.wins}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                        {player.losses}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                        {calculateWinPercentage(player.wins, player.matchesPlayed)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="px-6 py-12 text-center text-slate-500">
              No players meet the minimum match requirement
            </div>
          )}
        </section>

        {/* Ineligible Players Table */}
        {ineligiblePlayers.length > 0 && (
          <section className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-gradient-to-r from-amber-600 to-amber-700 px-6 py-4">
              <h2 className="text-2xl font-bold text-white">
                Ineligible Players ({ineligiblePlayers.length})
              </h2>
              <p className="text-amber-100 text-sm mt-1">
                Players need {minMatches - Math.max(...ineligiblePlayers.map(p => p.matchesPlayed))} to {minMatches - Math.min(...ineligiblePlayers.map(p => p.matchesPlayed))} more matches
              </p>
            </div>
            
            <div className="overflow-x-auto" data-testid="playerwith-ineligible-list">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                      Player Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                      Matches
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                      Matches Needed
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {ineligiblePlayers.map((player) => (
                    <tr 
                      key={player.id} 
                      data-testid="playerwith-ineligible-item"
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-slate-900">{player.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full bg-slate-100 text-slate-600">
                          {player.matchesPlayed}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-amber-600 font-medium">
                          {minMatches - player.matchesPlayed} more
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-amber-100 text-amber-800">
                          Not Eligible
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Summary Stats */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-sm text-slate-600 mb-1">Total Players</div>
            <div className="text-3xl font-bold text-slate-900">{MOCK_PLAYERS.length}</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-sm text-slate-600 mb-1">Eligible Players</div>
            <div className="text-3xl font-bold text-green-600">{eligiblePlayers.length}</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-sm text-slate-600 mb-1">Ineligible Players</div>
            <div className="text-3xl font-bold text-amber-600">{ineligiblePlayers.length}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
