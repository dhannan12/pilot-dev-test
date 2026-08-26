/**
 * WillBe — Displays chess tournament tie-breaker rules and rankings
 *
 * Features: player standings, tie-breaker rules, score comparison, ranked list, rule explanations
 *
 * Ticket: SCRUM-1219 | Branch: proto/SCRUM-1211
 */

import React from 'react'

interface Player {
  id: number
  name: string
  score: number
  tiebreaker1: number // Buchholz score
  tiebreaker2: number // Sonneborn-Berger
  rank: number
}

const mockPlayers: Player[] = [
  { id: 1, name: 'Alexandra Chen', score: 7.5, tiebreaker1: 42.5, tiebreaker2: 38.25, rank: 1 },
  { id: 2, name: 'Boris Ivanov', score: 7.5, tiebreaker1: 41.0, tiebreaker2: 37.50, rank: 2 },
  { id: 3, name: 'Carlos Martinez', score: 7.0, tiebreaker1: 43.0, tiebreaker2: 36.75, rank: 3 },
  { id: 4, name: 'Diana Petrov', score: 7.0, tiebreaker1: 40.5, tiebreaker2: 35.50, rank: 4 },
  { id: 5, name: 'Emil Schmidt', score: 6.5, tiebreaker1: 39.0, tiebreaker2: 34.25, rank: 5 },
  { id: 6, name: 'Fatima Ahmed', score: 6.5, tiebreaker1: 38.5, tiebreaker2: 33.75, rank: 6 },
  { id: 7, name: 'Georg Mueller', score: 6.0, tiebreaker1: 37.5, tiebreaker2: 32.50, rank: 7 }
]

const tieBreakRules = [
  { id: 1, order: '1st', name: 'Buchholz Score', description: 'Sum of opponents\' scores' },
  { id: 2, order: '2nd', name: 'Sonneborn-Berger', description: 'Weighted score based on defeated opponents' },
  { id: 3, order: '3rd', name: 'Direct Encounter', description: 'Result of head-to-head game if applicable' }
]

export default function WillBe() {
  return (
    <section data-testid="willbe" className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
            Tournament Standings
          </h1>
          <p className="text-slate-300 text-lg">
            Tie-breakers are applied automatically when players have equal scores
          </p>
        </div>

        {/* Tie-breaker Rules Section */}
        <div className="bg-slate-800/50 backdrop-blur rounded-lg p-6 mb-8 border border-slate-700">
          <h2 className="text-2xl font-semibold mb-4 text-amber-400">Tie-Breaker Rules</h2>
          <ul data-testid="willbe-list" className="space-y-3">
            {tieBreakRules.map((rule) => (
              <li
                key={rule.id}
                data-testid="willbe-item"
                className="flex items-start gap-4 p-4 bg-slate-700/30 rounded-lg border border-slate-600/50 hover:border-amber-500/50 transition-colors"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center font-bold text-lg">
                  {rule.order}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-amber-300">{rule.name}</h3>
                  <p className="text-slate-400 text-sm">{rule.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Player Rankings Table */}
        <div className="bg-slate-800/50 backdrop-blur rounded-lg p-6 border border-slate-700">
          <h2 className="text-2xl font-semibold mb-4 text-amber-400">Final Rankings</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-amber-500">
                  <th className="text-left py-3 px-4 font-semibold text-amber-300">Rank</th>
                  <th className="text-left py-3 px-4 font-semibold text-amber-300">Player</th>
                  <th className="text-center py-3 px-4 font-semibold text-amber-300">Score</th>
                  <th className="text-center py-3 px-4 font-semibold text-amber-300">Buchholz</th>
                  <th className="text-center py-3 px-4 font-semibold text-amber-300">S-B</th>
                </tr>
              </thead>
              <tbody data-testid="willbe-rankings-list">
                {mockPlayers.map((player, index) => {
                  const hasTie = mockPlayers.some((p, i) => i !== index && p.score === player.score)
                  return (
                    <tr
                      key={player.id}
                      data-testid="willbe-ranking-item"
                      className={`border-b border-slate-700 hover:bg-slate-700/30 transition-colors ${
                        hasTie ? 'bg-amber-900/10' : ''
                      }`}
                    >
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-bold ${
                          player.rank <= 3 ? 'bg-gradient-to-br from-amber-500 to-orange-600 text-white' : 'bg-slate-700 text-slate-300'
                        }`}>
                          {player.rank}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{player.name}</span>
                          {hasTie && (
                            <span className="text-xs bg-amber-500/20 text-amber-400 px-2 py-1 rounded-full border border-amber-500/30">
                              Tie-breaker applied
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center font-semibold text-lg">{player.score}</td>
                      <td className="py-3 px-4 text-center text-slate-300">{player.tiebreaker1}</td>
                      <td className="py-3 px-4 text-center text-slate-300">{player.tiebreaker2}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Info Footer */}
        <div className="mt-6 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
          <p className="text-sm text-blue-300">
            <span className="font-semibold">Note:</span> When two or more players finish with the same score, 
            tie-breakers are applied in order (Buchholz → Sonneborn-Berger → Direct Encounter) to determine final rankings.
          </p>
        </div>
      </div>
    </section>
  )
}
