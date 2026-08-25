/**
 * DoublesTeamLogs — Displays match results logged separately for each doubles team
 *
 * Features: Team roster display, match result logging, result history, win/loss tracking, separate team logs
 *
 * Ticket: SCRUM-1206 | Branch: proto/SCRUM-1199
 */

import React, { useState } from 'react'

interface DoublesTeam {
  id: string
  player1: string
  player2: string
  name: string
}

interface MatchResult {
  id: string
  teamId: string
  opponent: string
  score: string
  result: 'win' | 'loss'
  date: string
  notes: string
}

const MOCK_TEAMS: DoublesTeam[] = [
  { id: 't1', player1: 'Sarah Chen', player2: 'Mike Johnson', name: 'Team Thunder' },
  { id: 't2', player1: 'Emma Davis', player2: 'Ryan Martinez', name: 'Team Lightning' },
  { id: 't3', player1: 'Lisa Anderson', player2: 'Tom Wilson', name: 'Team Phoenix' },
  { id: 't4', player1: 'Alex Brown', player2: 'Jordan Lee', name: 'Team Blaze' },
  { id: 't5', player1: 'Chris Taylor', player2: 'Sam Morgan', name: 'Team Storm' }
]

const MOCK_RESULTS: MatchResult[] = [
  {
    id: 'r1',
    teamId: 't1',
    opponent: 'Team Ace',
    score: '6-4, 6-3',
    result: 'win',
    date: '2026-08-20',
    notes: 'Great teamwork in second set'
  },
  {
    id: 'r2',
    teamId: 't1',
    opponent: 'Team Force',
    score: '4-6, 6-7',
    result: 'loss',
    date: '2026-08-18',
    notes: 'Close match, better luck next time'
  },
  {
    id: 'r3',
    teamId: 't2',
    opponent: 'Team Swift',
    score: '6-2, 6-1',
    result: 'win',
    date: '2026-08-22',
    notes: 'Dominant performance'
  },
  {
    id: 'r4',
    teamId: 't3',
    opponent: 'Team Spark',
    score: '7-6, 3-6, 6-4',
    result: 'win',
    date: '2026-08-19',
    notes: 'Three-set thriller'
  },
  {
    id: 'r5',
    teamId: 't2',
    opponent: 'Team Elite',
    score: '6-3, 6-4',
    result: 'win',
    date: '2026-08-21',
    notes: 'Solid win against tough opponents'
  },
  {
    id: 'r6',
    teamId: 't4',
    opponent: 'Team Fusion',
    score: '5-7, 4-6',
    result: 'loss',
    date: '2026-08-23',
    notes: 'Need to work on serves'
  },
  {
    id: 'r7',
    teamId: 't5',
    opponent: 'Team Victory',
    score: '6-4, 7-5',
    result: 'win',
    date: '2026-08-24',
    notes: 'Excellent coordination'
  }
]

export default function DoublesTeamLogs() {
  const [selectedTeam, setSelectedTeam] = useState<string>('')
  const [opponent, setOpponent] = useState<string>('')
  const [score, setScore] = useState<string>('')
  const [result, setResult] = useState<'win' | 'loss'>('win')
  const [notes, setNotes] = useState<string>('')
  const [matchResults, setMatchResults] = useState<MatchResult[]>(MOCK_RESULTS)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!selectedTeam || !opponent || !score) {
      return
    }

    const newResult: MatchResult = {
      id: `r${Date.now()}`,
      teamId: selectedTeam,
      opponent,
      score,
      result,
      date: new Date().toISOString().split('T')[0],
      notes
    }

    setMatchResults([newResult, ...matchResults])
    
    // Reset form
    setOpponent('')
    setScore('')
    setNotes('')
  }

  const getTeamResults = (teamId: string) => {
    return matchResults.filter(r => r.teamId === teamId)
  }

  const getTeamStats = (teamId: string) => {
    const results = getTeamResults(teamId)
    const wins = results.filter(r => r.result === 'win').length
    const losses = results.filter(r => r.result === 'loss').length
    return { wins, losses, total: results.length }
  }

  return (
    <section data-testid="doublesteamlogs" className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Doubles Team Match Logs</h1>
        <p className="text-gray-600 mb-8">Track and log match results separately for each doubles team</p>

        {/* Team Selection and Log Entry Form */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Log Match Result</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Team
              </label>
              <select
                data-testid="doublesteamlogs-team"
                value={selectedTeam}
                onChange={(e) => setSelectedTeam(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">-- Choose a team --</option>
                {MOCK_TEAMS.map(team => (
                  <option key={team.id} value={team.id}>
                    {team.name} ({team.player1} & {team.player2})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Opponent Team
                </label>
                <input
                  data-testid="doublesteamlogs-opponent"
                  type="text"
                  value={opponent}
                  onChange={(e) => setOpponent(e.target.value)}
                  placeholder="e.g., Team Ace"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Score
                </label>
                <input
                  data-testid="doublesteamlogs-score"
                  type="text"
                  value={score}
                  onChange={(e) => setScore(e.target.value)}
                  placeholder="e.g., 6-4, 6-3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Result
              </label>
              <select
                data-testid="doublesteamlogs-result"
                value={result}
                onChange={(e) => setResult(e.target.value as 'win' | 'loss')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="win">Win</option>
                <option value="loss">Loss</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes (Optional)
              </label>
              <textarea
                data-testid="doublesteamlogs-notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add any notes about the match..."
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <button
              data-testid="doublesteamlogs-submit"
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Log Match Result
            </button>
          </form>
        </div>

        {/* Team Results Display */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800">Team Match Logs</h2>
          
          <div data-testid="doublesteamlogs-list" className="grid grid-cols-1 gap-6">
            {MOCK_TEAMS.map(team => {
              const stats = getTeamStats(team.id)
              const teamResults = getTeamResults(team.id)
              
              return (
                <div
                  key={team.id}
                  data-testid="doublesteamlogs-item"
                  className="bg-white rounded-lg shadow-lg p-6"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{team.name}</h3>
                      <p className="text-gray-600">
                        {team.player1} & {team.player2}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">
                        {stats.wins}W - {stats.losses}L
                      </div>
                      <div className="text-sm text-gray-500">
                        {stats.total} {stats.total === 1 ? 'match' : 'matches'}
                      </div>
                    </div>
                  </div>

                  {teamResults.length > 0 ? (
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-700 border-b pb-2">Recent Matches</h4>
                      {teamResults.map(match => (
                        <div
                          key={match.id}
                          className={`p-4 rounded-lg border-l-4 ${
                            match.result === 'win'
                              ? 'bg-green-50 border-green-500'
                              : 'bg-red-50 border-red-500'
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-1">
                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                  match.result === 'win'
                                    ? 'bg-green-600 text-white'
                                    : 'bg-red-600 text-white'
                                }`}>
                                  {match.result.toUpperCase()}
                                </span>
                                <span className="font-semibold text-gray-900">
                                  vs {match.opponent}
                                </span>
                              </div>
                              <div className="text-sm text-gray-600 mb-1">
                                Score: {match.score}
                              </div>
                              {match.notes && (
                                <div className="text-sm text-gray-500 italic">
                                  {match.notes}
                                </div>
                              )}
                            </div>
                            <div className="text-sm text-gray-500 ml-4">
                              {new Date(match.date).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      No matches logged yet for this team
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
