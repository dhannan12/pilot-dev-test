/**
 * UpdateLeagueStandings — Updates league standings after match result submission
 *
 * Features: league table display, match result form, automatic points calculation, goal difference tracking, live standings update
 *
 * Ticket: SCRUM-1273 | Branch: proto/SCRUM-1265
 */

import React, { useState } from 'react'

interface Team {
  id: string
  name: string
  played: number
  won: number
  drawn: number
  lost: number
  goalsFor: number
  goalsAgainst: number
  goalDifference: number
  points: number
}

interface MatchResult {
  homeTeamId: string
  awayTeamId: string
  homeScore: number
  awayScore: number
}

const initialStandings: Team[] = [
  {
    id: '1',
    name: 'Thunder FC',
    played: 10,
    won: 8,
    drawn: 1,
    lost: 1,
    goalsFor: 24,
    goalsAgainst: 8,
    goalDifference: 16,
    points: 25
  },
  {
    id: '2',
    name: 'Lightning United',
    played: 10,
    won: 7,
    drawn: 2,
    lost: 1,
    goalsFor: 22,
    goalsAgainst: 10,
    goalDifference: 12,
    points: 23
  },
  {
    id: '3',
    name: 'Storm City',
    played: 10,
    won: 5,
    drawn: 3,
    lost: 2,
    goalsFor: 18,
    goalsAgainst: 12,
    goalDifference: 6,
    points: 18
  },
  {
    id: '4',
    name: 'Rapids Athletic',
    played: 10,
    won: 4,
    drawn: 2,
    lost: 4,
    goalsFor: 14,
    goalsAgainst: 16,
    goalDifference: -2,
    points: 14
  },
  {
    id: '5',
    name: 'Blaze SC',
    played: 10,
    won: 3,
    drawn: 3,
    lost: 4,
    goalsFor: 12,
    goalsAgainst: 15,
    goalDifference: -3,
    points: 12
  },
  {
    id: '6',
    name: 'Tornado FC',
    played: 10,
    won: 2,
    drawn: 1,
    lost: 7,
    goalsFor: 9,
    goalsAgainst: 20,
    goalDifference: -11,
    points: 7
  },
  {
    id: '7',
    name: 'Cyclone Rangers',
    played: 10,
    won: 1,
    drawn: 2,
    lost: 7,
    goalsFor: 7,
    goalsAgainst: 25,
    goalDifference: -18,
    points: 5
  }
]

export default function UpdateLeagueStandings() {
  const [standings, setStandings] = useState<Team[]>(initialStandings)
  const [homeTeamId, setHomeTeamId] = useState<string>('')
  const [awayTeamId, setAwayTeamId] = useState<string>('')
  const [homeScore, setHomeScore] = useState<string>('')
  const [awayScore, setAwayScore] = useState<string>('')
  const [message, setMessage] = useState<string>('')

  const handleSubmitResult = (e: React.FormEvent) => {
    e.preventDefault()

    if (!homeTeamId || !awayTeamId || homeScore === '' || awayScore === '') {
      setMessage('Please fill in all fields')
      return
    }

    if (homeTeamId === awayTeamId) {
      setMessage('Home and away teams must be different')
      return
    }

    const homeScoreNum = parseInt(homeScore, 10)
    const awayScoreNum = parseInt(awayScore, 10)

    if (isNaN(homeScoreNum) || isNaN(awayScoreNum) || homeScoreNum < 0 || awayScoreNum < 0) {
      setMessage('Please enter valid scores')
      return
    }

    const updatedStandings = standings.map((team) => {
      const newTeam = { ...team }

      if (team.id === homeTeamId) {
        newTeam.played += 1
        newTeam.goalsFor += homeScoreNum
        newTeam.goalsAgainst += awayScoreNum

        if (homeScoreNum > awayScoreNum) {
          newTeam.won += 1
          newTeam.points += 3
        } else if (homeScoreNum === awayScoreNum) {
          newTeam.drawn += 1
          newTeam.points += 1
        } else {
          newTeam.lost += 1
        }

        newTeam.goalDifference = newTeam.goalsFor - newTeam.goalsAgainst
      }

      if (team.id === awayTeamId) {
        newTeam.played += 1
        newTeam.goalsFor += awayScoreNum
        newTeam.goalsAgainst += homeScoreNum

        if (awayScoreNum > homeScoreNum) {
          newTeam.won += 1
          newTeam.points += 3
        } else if (awayScoreNum === homeScoreNum) {
          newTeam.drawn += 1
          newTeam.points += 1
        } else {
          newTeam.lost += 1
        }

        newTeam.goalDifference = newTeam.goalsFor - newTeam.goalsAgainst
      }

      return newTeam
    })

    // Sort by points (descending), then goal difference (descending)
    updatedStandings.sort((a, b) => {
      if (b.points !== a.points) {
        return b.points - a.points
      }
      return b.goalDifference - a.goalDifference
    })

    setStandings(updatedStandings)

    const homeTeamName = standings.find((t) => t.id === homeTeamId)?.name
    const awayTeamName = standings.find((t) => t.id === awayTeamId)?.name

    setMessage(`Match result recorded: ${homeTeamName} ${homeScore} - ${awayScore} ${awayTeamName}`)
    
    // Reset form
    setHomeTeamId('')
    setAwayTeamId('')
    setHomeScore('')
    setAwayScore('')
  }

  const handleReset = () => {
    setStandings(initialStandings)
    setHomeTeamId('')
    setAwayTeamId('')
    setHomeScore('')
    setAwayScore('')
    setMessage('Standings reset to initial values')
  }

  return (
    <div data-testid="updateleaguestandings" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">League Standings</h1>

        {/* Match Result Submission Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Submit Match Result</h2>
          
          <form onSubmit={handleSubmitResult} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="home-team" className="block text-sm font-medium text-gray-700 mb-1">
                  Home Team
                </label>
                <select
                  id="home-team"
                  data-testid="updateleaguestandings-hometeam"
                  value={homeTeamId}
                  onChange={(e) => setHomeTeamId(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select home team</option>
                  {standings.map((team) => (
                    <option key={team.id} value={team.id}>
                      {team.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="away-team" className="block text-sm font-medium text-gray-700 mb-1">
                  Away Team
                </label>
                <select
                  id="away-team"
                  data-testid="updateleaguestandings-awayteam"
                  value={awayTeamId}
                  onChange={(e) => setAwayTeamId(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select away team</option>
                  {standings.map((team) => (
                    <option key={team.id} value={team.id}>
                      {team.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="home-score" className="block text-sm font-medium text-gray-700 mb-1">
                  Home Score
                </label>
                <input
                  id="home-score"
                  type="number"
                  data-testid="updateleaguestandings-homescore"
                  value={homeScore}
                  onChange={(e) => setHomeScore(e.target.value)}
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0"
                />
              </div>

              <div>
                <label htmlFor="away-score" className="block text-sm font-medium text-gray-700 mb-1">
                  Away Score
                </label>
                <input
                  id="away-score"
                  type="number"
                  data-testid="updateleaguestandings-awayscore"
                  value={awayScore}
                  onChange={(e) => setAwayScore(e.target.value)}
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                data-testid="updateleaguestandings-submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Submit Result
              </button>
              <button
                type="button"
                data-testid="updateleaguestandings-reset"
                onClick={handleReset}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
              >
                Reset Standings
              </button>
            </div>

            {message && (
              <div className={`p-3 rounded-md ${message.includes('Please') || message.includes('must') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
                {message}
              </div>
            )}
          </form>
        </div>

        {/* Standings Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full" data-testid="updateleaguestandings-list">
              <thead className="bg-gray-100 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Pos
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Team
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    P
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
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {standings.map((team, index) => (
                  <tr
                    key={team.id}
                    data-testid="updateleaguestandings-item"
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">
                      {index + 1}
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">
                      {team.name}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 text-center">
                      {team.played}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 text-center">
                      {team.won}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 text-center">
                      {team.drawn}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 text-center">
                      {team.lost}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 text-center">
                      {team.goalsFor}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 text-center">
                      {team.goalsAgainst}
                    </td>
                    <td className={`px-4 py-3 text-sm text-center font-medium ${
                      team.goalDifference > 0 ? 'text-green-600' : team.goalDifference < 0 ? 'text-red-600' : 'text-gray-700'
                    }`}>
                      {team.goalDifference > 0 ? '+' : ''}{team.goalDifference}
                    </td>
                    <td className="px-4 py-3 text-sm font-bold text-gray-900 text-center">
                      {team.points}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-4 text-sm text-gray-600">
          <p>P = Played, W = Won, D = Drawn, L = Lost</p>
          <p>GF = Goals For, GA = Goals Against, GD = Goal Difference, Pts = Points</p>
        </div>
      </div>
    </div>
  )
}
