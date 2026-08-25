/**
 * ATournamentOrganizer — Tournament bracket creation and management interface
 *
 * Features: participant selection, bracket generation, match scheduling, round progression, winner tracking
 *
 * Ticket: SCRUM-1106 | Branch: proto/SCRUM-1103
 */

import React, { useState } from 'react'

interface Player {
  id: number
  name: string
  rating: number
}

interface Match {
  id: number
  player1: Player | null
  player2: Player | null
  winner: Player | null
  round: number
}

const MOCK_PLAYERS: Player[] = [
  { id: 1, name: 'Alice Chen', rating: 2100 },
  { id: 2, name: 'Bob Martinez', rating: 1950 },
  { id: 3, name: 'Charlie Johnson', rating: 2050 },
  { id: 4, name: 'Diana Wu', rating: 1900 },
  { id: 5, name: 'Erik Larsson', rating: 2200 },
  { id: 6, name: 'Fatima Khan', rating: 1850 },
  { id: 7, name: 'George Park', rating: 2000 },
  { id: 8, name: 'Hannah Lee', rating: 1950 }
]

export default function ATournamentOrganizer() {
  const [tournamentName, setTournamentName] = useState('')
  const [selectedPlayers, setSelectedPlayers] = useState<number[]>([])
  const [bracketCreated, setBracketCreated] = useState(false)
  const [matches, setMatches] = useState<Match[]>([])

  const togglePlayerSelection = (playerId: number) => {
    if (selectedPlayers.includes(playerId)) {
      setSelectedPlayers(selectedPlayers.filter(id => id !== playerId))
    } else {
      setSelectedPlayers([...selectedPlayers, playerId])
    }
  }

  const generateBracket = () => {
    if (selectedPlayers.length < 2) {
      alert('Please select at least 2 players')
      return
    }
    if (!tournamentName.trim()) {
      alert('Please enter a tournament name')
      return
    }

    // Generate first round matches
    const players = MOCK_PLAYERS.filter(p => selectedPlayers.includes(p.id))
    const firstRoundMatches: Match[] = []
    
    for (let i = 0; i < players.length; i += 2) {
      if (i + 1 < players.length) {
        firstRoundMatches.push({
          id: Math.floor(Math.random() * 10000),
          player1: players[i],
          player2: players[i + 1],
          winner: null,
          round: 1
        })
      }
    }

    setMatches(firstRoundMatches)
    setBracketCreated(true)
  }

  const selectWinner = (matchId: number, winner: Player) => {
    const updatedMatches = matches.map(match => {
      if (match.id === matchId) {
        return { ...match, winner }
      }
      return match
    })
    setMatches(updatedMatches)
  }

  const advanceRound = () => {
    const currentRound = Math.max(...matches.map(m => m.round))
    const currentRoundMatches = matches.filter(m => m.round === currentRound)
    
    // Check if all matches have winners
    const allMatchesComplete = currentRoundMatches.every(m => m.winner !== null)
    if (!allMatchesComplete) {
      alert('Please select winners for all matches before advancing')
      return
    }

    // Create next round matches
    const winners = currentRoundMatches.map(m => m.winner!).filter(Boolean)
    if (winners.length < 2) {
      alert('Tournament complete!')
      return
    }

    const nextRoundMatches: Match[] = []
    for (let i = 0; i < winners.length; i += 2) {
      if (i + 1 < winners.length) {
        nextRoundMatches.push({
          id: Math.floor(Math.random() * 10000),
          player1: winners[i],
          player2: winners[i + 1],
          winner: null,
          round: currentRound + 1
        })
      }
    }

    setMatches([...matches, ...nextRoundMatches])
  }

  const resetTournament = () => {
    setTournamentName('')
    setSelectedPlayers([])
    setBracketCreated(false)
    setMatches([])
  }

  const getRoundName = (roundNum: number) => {
    const maxRound = Math.max(...matches.map(m => m.round))
    const matchesInRound = matches.filter(m => m.round === roundNum).length

    if (roundNum === maxRound && matchesInRound === 1) {
      return 'Finals'
    } else if (roundNum === maxRound - 1 && matchesInRound === 2) {
      return 'Semifinals'
    } else if (roundNum === maxRound - 2 && matchesInRound === 4) {
      return 'Quarterfinals'
    }
    return `Round ${roundNum}`
  }

  return (
    <div data-testid="atournamentorganizer" className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          Tournament Bracket Manager
        </h1>

        {!bracketCreated ? (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Create New Tournament</h2>
            
            <div className="mb-6">
              <label htmlFor="tournament-name" className="block text-sm font-medium text-gray-700 mb-2">
                Tournament Name
              </label>
              <input
                id="tournament-name"
                type="text"
                data-testid="atournamentorganizer-name"
                value={tournamentName}
                onChange={(e) => setTournamentName(e.target.value)}
                placeholder="Enter tournament name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-800 mb-4">
                Select Players ({selectedPlayers.length} selected)
              </h3>
              <div data-testid="atournamentorganizer-list" className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {MOCK_PLAYERS.map(player => (
                  <div
                    key={player.id}
                    data-testid="atournamentorganizer-item"
                    onClick={() => togglePlayerSelection(player.id)}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedPlayers.includes(player.id)
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-900">{player.name}</span>
                      <span className="text-sm text-gray-600">Rating: {player.rating}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              data-testid="atournamentorganizer-create"
              onClick={generateBracket}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Create Bracket
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-gray-800">
                  {tournamentName}
                </h2>
                <button
                  data-testid="atournamentorganizer-reset"
                  onClick={resetTournament}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Reset Tournament
                </button>
              </div>
              
              {Array.from(new Set(matches.map(m => m.round))).sort().map(roundNum => (
                <div key={roundNum} className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-700 mb-4 border-b-2 border-gray-200 pb-2">
                    {getRoundName(roundNum)}
                  </h3>
                  <div data-testid="atournamentorganizer-matches" className="space-y-4">
                    {matches
                      .filter(match => match.round === roundNum)
                      .map(match => (
                        <div
                          key={match.id}
                          data-testid="atournamentorganizer-match"
                          className="bg-gray-50 border border-gray-200 rounded-lg p-4"
                        >
                          <div className="space-y-3">
                            <div
                              onClick={() => match.player1 && !match.winner && selectWinner(match.id, match.player1)}
                              className={`p-3 rounded cursor-pointer transition-all ${
                                match.winner?.id === match.player1?.id
                                  ? 'bg-green-100 border-2 border-green-500'
                                  : 'bg-white border border-gray-300 hover:border-blue-400'
                              }`}
                            >
                              <div className="flex justify-between items-center">
                                <span className="font-medium text-gray-900">
                                  {match.player1?.name || 'TBD'}
                                </span>
                                {match.winner?.id === match.player1?.id && (
                                  <span className="text-green-600 font-bold">✓ Winner</span>
                                )}
                              </div>
                            </div>
                            
                            <div className="text-center text-gray-500 text-sm font-semibold">VS</div>
                            
                            <div
                              onClick={() => match.player2 && !match.winner && selectWinner(match.id, match.player2)}
                              className={`p-3 rounded cursor-pointer transition-all ${
                                match.winner?.id === match.player2?.id
                                  ? 'bg-green-100 border-2 border-green-500'
                                  : 'bg-white border border-gray-300 hover:border-blue-400'
                              }`}
                            >
                              <div className="flex justify-between items-center">
                                <span className="font-medium text-gray-900">
                                  {match.player2?.name || 'TBD'}
                                </span>
                                {match.winner?.id === match.player2?.id && (
                                  <span className="text-green-600 font-bold">✓ Winner</span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}

              <button
                data-testid="atournamentorganizer-advance"
                onClick={advanceRound}
                className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors mt-6"
              >
                Advance to Next Round
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
