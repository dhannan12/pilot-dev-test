/**
 * EloRatingsAre — Displays Elo rating updates based on match results
 *
 * Features: player rankings, match history, rating changes, Elo calculation display, interactive match simulator
 *
 * Ticket: SCRUM-1214 | Branch: proto/SCRUM-1211
 */

import React, { useState } from 'react'

interface Player {
  id: number
  name: string
  currentRating: number
  gamesPlayed: number
}

interface Match {
  id: number
  player1Id: number
  player2Id: number
  player1Name: string
  player2Name: string
  player1RatingBefore: number
  player2RatingBefore: number
  player1RatingAfter: number
  player2RatingAfter: number
  winner: number
  date: string
}

const MOCK_PLAYERS: Player[] = [
  { id: 1, name: 'Magnus Carlsen', currentRating: 2850, gamesPlayed: 150 },
  { id: 2, name: 'Hikaru Nakamura', currentRating: 2805, gamesPlayed: 142 },
  { id: 3, name: 'Fabiano Caruana', currentRating: 2790, gamesPlayed: 138 },
  { id: 4, name: 'Ding Liren', currentRating: 2780, gamesPlayed: 125 },
  { id: 5, name: 'Ian Nepomniachtchi', currentRating: 2775, gamesPlayed: 130 },
  { id: 6, name: 'Alireza Firouzja', currentRating: 2760, gamesPlayed: 98 },
  { id: 7, name: 'Wesley So', currentRating: 2755, gamesPlayed: 112 }
]

const MOCK_MATCHES: Match[] = [
  {
    id: 1,
    player1Id: 1,
    player2Id: 2,
    player1Name: 'Magnus Carlsen',
    player2Name: 'Hikaru Nakamura',
    player1RatingBefore: 2845,
    player2RatingBefore: 2800,
    player1RatingAfter: 2850,
    player2RatingAfter: 2795,
    winner: 1,
    date: '2026-08-25'
  },
  {
    id: 2,
    player1Id: 3,
    player2Id: 4,
    player1Name: 'Fabiano Caruana',
    player2Name: 'Ding Liren',
    player1RatingBefore: 2785,
    player2RatingBefore: 2775,
    player1RatingAfter: 2790,
    player2RatingAfter: 2770,
    winner: 3,
    date: '2026-08-24'
  },
  {
    id: 3,
    player1Id: 5,
    player2Id: 6,
    player1Name: 'Ian Nepomniachtchi',
    player2Name: 'Alireza Firouzja',
    player1RatingBefore: 2770,
    player2RatingBefore: 2755,
    player1RatingAfter: 2775,
    player2RatingAfter: 2750,
    winner: 5,
    date: '2026-08-23'
  },
  {
    id: 4,
    player1Id: 7,
    player2Id: 1,
    player1Name: 'Wesley So',
    player2Name: 'Magnus Carlsen',
    player1RatingBefore: 2750,
    player2RatingBefore: 2850,
    player1RatingAfter: 2755,
    player2RatingAfter: 2845,
    winner: 7,
    date: '2026-08-22'
  },
  {
    id: 5,
    player1Id: 2,
    player2Id: 3,
    player1Name: 'Hikaru Nakamura',
    player2Name: 'Fabiano Caruana',
    player1RatingBefore: 2800,
    player2RatingBefore: 2790,
    player1RatingAfter: 2805,
    player2RatingAfter: 2785,
    winner: 2,
    date: '2026-08-21'
  },
  {
    id: 6,
    player1Id: 4,
    player2Id: 6,
    player1Name: 'Ding Liren',
    player2Name: 'Alireza Firouzja',
    player1RatingBefore: 2775,
    player2RatingBefore: 2760,
    player1RatingAfter: 2780,
    player2RatingAfter: 2755,
    winner: 4,
    date: '2026-08-20'
  }
]

export default function EloRatingsAre() {
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null)
  const [showCalculation, setShowCalculation] = useState(false)

  const calculateExpectedScore = (ratingA: number, ratingB: number): number => {
    return 1 / (1 + Math.pow(10, (ratingB - ratingA) / 400))
  }

  const getRatingChange = (match: Match, playerId: number): number => {
    if (playerId === match.player1Id) {
      return match.player1RatingAfter - match.player1RatingBefore
    } else {
      return match.player2RatingAfter - match.player2RatingBefore
    }
  }

  return (
    <div data-testid="eloratingsare" className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            Elo Rating System
          </h1>
          <p className="text-slate-300 text-lg">
            Track how player ratings update based on match results
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Current Rankings */}
          <div className="bg-slate-800 rounded-xl shadow-2xl p-6 border border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <span className="text-yellow-400 mr-2">🏆</span>
              Current Rankings
            </h2>
            <div data-testid="eloratingsare-list" className="space-y-3">
              {MOCK_PLAYERS.map((player, index) => (
                <div
                  key={player.id}
                  data-testid="eloratingsare-item"
                  className="bg-slate-700 rounded-lg p-4 hover:bg-slate-600 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="text-2xl font-bold text-slate-400 w-8">
                        #{index + 1}
                      </div>
                      <div>
                        <div className="text-white font-semibold">
                          {player.name}
                        </div>
                        <div className="text-slate-400 text-sm">
                          {player.gamesPlayed} games played
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-yellow-400">
                        {player.currentRating}
                      </div>
                      <div className="text-slate-400 text-sm">
                        rating
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Matches */}
          <div className="bg-slate-800 rounded-xl shadow-2xl p-6 border border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <span className="text-blue-400 mr-2">⚔️</span>
              Recent Matches
            </h2>
            <div data-testid="eloratingsare-matches-list" className="space-y-3">
              {MOCK_MATCHES.map((match) => {
                const player1Change = getRatingChange(match, match.player1Id)
                const player2Change = getRatingChange(match, match.player2Id)
                
                return (
                  <button
                    key={match.id}
                    data-testid="eloratingsare-match-item"
                    onClick={() => {
                      setSelectedMatch(match)
                      setShowCalculation(true)
                    }}
                    className="w-full bg-slate-700 rounded-lg p-4 hover:bg-slate-600 transition-colors text-left"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-slate-400 text-sm">
                        {match.date}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className={`font-semibold ${match.winner === match.player1Id ? 'text-green-400' : 'text-slate-300'}`}>
                          {match.player1Name}
                          {match.winner === match.player1Id && ' ✓'}
                        </span>
                        <span className={`text-sm ${player1Change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {player1Change >= 0 ? '+' : ''}{player1Change}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={`font-semibold ${match.winner === match.player2Id ? 'text-green-400' : 'text-slate-300'}`}>
                          {match.player2Name}
                          {match.winner === match.player2Id && ' ✓'}
                        </span>
                        <span className={`text-sm ${player2Change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {player2Change >= 0 ? '+' : ''}{player2Change}
                        </span>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Elo Calculation Explanation */}
        <div className="bg-slate-800 rounded-xl shadow-2xl p-6 border border-slate-700 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            How Elo Ratings Work
          </h2>
          <div className="text-slate-300 space-y-3">
            <p>
              The Elo rating system calculates the relative skill levels of players. After each match, ratings are updated based on:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>The rating difference between players</li>
              <li>The match result (win/loss)</li>
              <li>A K-factor (typically 32 for chess)</li>
            </ul>
            <div className="bg-slate-900 rounded-lg p-4 mt-4 font-mono text-sm">
              <div className="text-yellow-400 mb-2">Formula:</div>
              <div className="text-green-400">Expected Score = 1 / (1 + 10^((Rating_B - Rating_A) / 400))</div>
              <div className="text-blue-400 mt-2">New Rating = Old Rating + K × (Actual Score - Expected Score)</div>
            </div>
          </div>
        </div>

        {/* Match Details Modal */}
        {showCalculation && selectedMatch && (
          <div 
            data-testid="eloratingsare-modal"
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50"
            onClick={() => setShowCalculation(false)}
          >
            <div 
              className="bg-slate-800 rounded-xl shadow-2xl p-8 max-w-2xl w-full border border-slate-700"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-bold text-white">
                  Match Details
                </h3>
                <button
                  data-testid="eloratingsare-close"
                  onClick={() => setShowCalculation(false)}
                  className="text-slate-400 hover:text-white text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-6">
                <div className="bg-slate-900 rounded-lg p-6">
                  <div className="text-slate-400 text-sm mb-4">{selectedMatch.date}</div>
                  
                  {/* Player 1 */}
                  <div className="mb-6">
                    <div className={`text-xl font-bold mb-2 ${selectedMatch.winner === selectedMatch.player1Id ? 'text-green-400' : 'text-white'}`}>
                      {selectedMatch.player1Name}
                      {selectedMatch.winner === selectedMatch.player1Id && ' (Winner)'}
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-slate-400 text-sm">Before</div>
                        <div className="text-2xl font-bold text-yellow-400">
                          {selectedMatch.player1RatingBefore}
                        </div>
                      </div>
                      <div>
                        <div className="text-slate-400 text-sm">Change</div>
                        <div className={`text-2xl font-bold ${getRatingChange(selectedMatch, selectedMatch.player1Id) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {getRatingChange(selectedMatch, selectedMatch.player1Id) >= 0 ? '+' : ''}
                          {getRatingChange(selectedMatch, selectedMatch.player1Id)}
                        </div>
                      </div>
                      <div>
                        <div className="text-slate-400 text-sm">After</div>
                        <div className="text-2xl font-bold text-yellow-400">
                          {selectedMatch.player1RatingAfter}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-slate-700 my-4"></div>

                  {/* Player 2 */}
                  <div>
                    <div className={`text-xl font-bold mb-2 ${selectedMatch.winner === selectedMatch.player2Id ? 'text-green-400' : 'text-white'}`}>
                      {selectedMatch.player2Name}
                      {selectedMatch.winner === selectedMatch.player2Id && ' (Winner)'}
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-slate-400 text-sm">Before</div>
                        <div className="text-2xl font-bold text-yellow-400">
                          {selectedMatch.player2RatingBefore}
                        </div>
                      </div>
                      <div>
                        <div className="text-slate-400 text-sm">Change</div>
                        <div className={`text-2xl font-bold ${getRatingChange(selectedMatch, selectedMatch.player2Id) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {getRatingChange(selectedMatch, selectedMatch.player2Id) >= 0 ? '+' : ''}
                          {getRatingChange(selectedMatch, selectedMatch.player2Id)}
                        </div>
                      </div>
                      <div>
                        <div className="text-slate-400 text-sm">After</div>
                        <div className="text-2xl font-bold text-yellow-400">
                          {selectedMatch.player2RatingAfter}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Calculation Breakdown */}
                <div className="bg-slate-900 rounded-lg p-6">
                  <h4 className="text-lg font-bold text-white mb-3">
                    Calculation Breakdown
                  </h4>
                  <div className="space-y-2 text-sm font-mono">
                    <div className="text-slate-300">
                      Expected score for {selectedMatch.player1Name}:
                    </div>
                    <div className="text-green-400 ml-4">
                      {calculateExpectedScore(selectedMatch.player1RatingBefore, selectedMatch.player2RatingBefore).toFixed(3)}
                    </div>
                    <div className="text-slate-300 mt-3">
                      Expected score for {selectedMatch.player2Name}:
                    </div>
                    <div className="text-green-400 ml-4">
                      {calculateExpectedScore(selectedMatch.player2RatingBefore, selectedMatch.player1RatingBefore).toFixed(3)}
                    </div>
                  </div>
                </div>

                <button
                  data-testid="eloratingsare-understand"
                  onClick={() => setShowCalculation(false)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
                >
                  Got it!
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
