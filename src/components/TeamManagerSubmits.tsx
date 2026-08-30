/**
 * TeamManagerSubmits — Team manager form for submitting match results
 *
 * Features: match result submission, team selection, score input, date picker, submission history
 *
 * Ticket: SCRUM-1270 | Branch: proto/SCRUM-1265
 */

import React, { useState } from 'react'

interface MatchResult {
  id: string
  homeTeam: string
  awayTeam: string
  homeScore: number
  awayScore: number
  matchDate: string
  submittedBy: string
  submittedAt: string
  status: 'pending' | 'approved' | 'rejected'
}

const mockMatchResults: MatchResult[] = [
  {
    id: '1',
    homeTeam: 'Lions FC',
    awayTeam: 'Tigers United',
    homeScore: 3,
    awayScore: 2,
    matchDate: '2026-08-28',
    submittedBy: 'John Smith',
    submittedAt: '2026-08-28T18:30:00',
    status: 'approved'
  },
  {
    id: '2',
    homeTeam: 'Eagles SC',
    awayTeam: 'Hawks Athletic',
    homeScore: 1,
    awayScore: 1,
    matchDate: '2026-08-27',
    submittedBy: 'Sarah Johnson',
    submittedAt: '2026-08-27T20:15:00',
    status: 'approved'
  },
  {
    id: '3',
    homeTeam: 'Panthers FC',
    awayTeam: 'Wolves United',
    homeScore: 2,
    awayScore: 4,
    matchDate: '2026-08-26',
    submittedBy: 'Mike Davis',
    submittedAt: '2026-08-26T19:45:00',
    status: 'pending'
  },
  {
    id: '4',
    homeTeam: 'Sharks SC',
    awayTeam: 'Dolphins FC',
    homeScore: 0,
    awayScore: 3,
    matchDate: '2026-08-25',
    submittedBy: 'Emily Brown',
    submittedAt: '2026-08-25T17:20:00',
    status: 'approved'
  },
  {
    id: '5',
    homeTeam: 'Bears United',
    awayTeam: 'Foxes Athletic',
    homeScore: 5,
    awayScore: 1,
    matchDate: '2026-08-24',
    submittedBy: 'David Wilson',
    submittedAt: '2026-08-24T21:00:00',
    status: 'rejected'
  },
  {
    id: '6',
    homeTeam: 'Ravens FC',
    awayTeam: 'Falcons SC',
    homeScore: 2,
    awayScore: 2,
    matchDate: '2026-08-23',
    submittedBy: 'Lisa Anderson',
    submittedAt: '2026-08-23T18:45:00',
    status: 'approved'
  }
]

const teams = [
  'Lions FC',
  'Tigers United',
  'Eagles SC',
  'Hawks Athletic',
  'Panthers FC',
  'Wolves United',
  'Sharks SC',
  'Dolphins FC',
  'Bears United',
  'Foxes Athletic',
  'Ravens FC',
  'Falcons SC'
]

export default function TeamManagerSubmits() {
  const [homeTeam, setHomeTeam] = useState('')
  const [awayTeam, setAwayTeam] = useState('')
  const [homeScore, setHomeScore] = useState('')
  const [awayScore, setAwayScore] = useState('')
  const [matchDate, setMatchDate] = useState('')
  const [managerName, setManagerName] = useState('')
  const [notes, setNotes] = useState('')
  const [submittedResults, setSubmittedResults] = useState<MatchResult[]>(mockMatchResults)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!homeTeam || !awayTeam || !homeScore || !awayScore || !matchDate || !managerName) {
      alert('Please fill in all required fields')
      return
    }

    const newResult: MatchResult = {
      id: Date.now().toString(),
      homeTeam,
      awayTeam,
      homeScore: parseInt(homeScore),
      awayScore: parseInt(awayScore),
      matchDate,
      submittedBy: managerName,
      submittedAt: new Date().toISOString(),
      status: 'pending'
    }

    setSubmittedResults([newResult, ...submittedResults])
    
    // Reset form
    setHomeTeam('')
    setAwayTeam('')
    setHomeScore('')
    setAwayScore('')
    setMatchDate('')
    setNotes('')
    
    alert('Match result submitted successfully!')
  }

  const handleReset = () => {
    setHomeTeam('')
    setAwayTeam('')
    setHomeScore('')
    setAwayScore('')
    setMatchDate('')
    setNotes('')
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'text-green-600 bg-green-50'
      case 'rejected':
        return 'text-red-600 bg-red-50'
      case 'pending':
        return 'text-yellow-600 bg-yellow-50'
      default:
        return 'text-gray-600 bg-gray-50'
    }
  }

  return (
    <div data-testid="teammanagersubmits" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Submit Match Result</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Submission Form */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Match Details</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="manager-name" className="block text-sm font-medium text-gray-700 mb-1">
                  Manager Name *
                </label>
                <input
                  id="manager-name"
                  type="text"
                  data-testid="teammanagersubmits-manager"
                  value={managerName}
                  onChange={(e) => setManagerName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div>
                <label htmlFor="match-date" className="block text-sm font-medium text-gray-700 mb-1">
                  Match Date *
                </label>
                <input
                  id="match-date"
                  type="date"
                  data-testid="teammanagersubmits-date"
                  value={matchDate}
                  onChange={(e) => setMatchDate(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="home-team" className="block text-sm font-medium text-gray-700 mb-1">
                    Home Team *
                  </label>
                  <select
                    id="home-team"
                    data-testid="teammanagersubmits-hometeam"
                    value={homeTeam}
                    onChange={(e) => setHomeTeam(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select team</option>
                    {teams.map((team) => (
                      <option key={team} value={team}>
                        {team}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="home-score" className="block text-sm font-medium text-gray-700 mb-1">
                    Home Score *
                  </label>
                  <input
                    id="home-score"
                    type="number"
                    data-testid="teammanagersubmits-homescore"
                    value={homeScore}
                    onChange={(e) => setHomeScore(e.target.value)}
                    min="0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="away-team" className="block text-sm font-medium text-gray-700 mb-1">
                    Away Team *
                  </label>
                  <select
                    id="away-team"
                    data-testid="teammanagersubmits-awayteam"
                    value={awayTeam}
                    onChange={(e) => setAwayTeam(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select team</option>
                    {teams.map((team) => (
                      <option key={team} value={team}>
                        {team}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="away-score" className="block text-sm font-medium text-gray-700 mb-1">
                    Away Score *
                  </label>
                  <input
                    id="away-score"
                    type="number"
                    data-testid="teammanagersubmits-awayscore"
                    value={awayScore}
                    onChange={(e) => setAwayScore(e.target.value)}
                    min="0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                  Additional Notes
                </label>
                <textarea
                  id="notes"
                  data-testid="teammanagersubmits-notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Any additional comments about the match..."
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  data-testid="teammanagersubmits-submit"
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
                >
                  Submit Result
                </button>
                <button
                  type="button"
                  data-testid="teammanagersubmits-reset"
                  onClick={handleReset}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors font-medium"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>

          {/* Submission History */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Recent Submissions</h2>
            
            <div data-testid="teammanagersubmits-list" className="space-y-4 max-h-[600px] overflow-y-auto">
              {submittedResults.map((result) => (
                <div
                  key={result.id}
                  data-testid="teammanagersubmits-item"
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="text-sm text-gray-500">
                      {new Date(result.matchDate).toLocaleDateString('en-US', {
                        weekday: 'short',
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(result.status)}`}>
                      {result.status.charAt(0).toUpperCase() + result.status.slice(1)}
                    </span>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-900">{result.homeTeam}</span>
                      <span className="text-2xl font-bold text-blue-600">{result.homeScore}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-900">{result.awayTeam}</span>
                      <span className="text-2xl font-bold text-blue-600">{result.awayScore}</span>
                    </div>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-gray-100 text-xs text-gray-500">
                    Submitted by {result.submittedBy} on{' '}
                    {new Date(result.submittedAt).toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
