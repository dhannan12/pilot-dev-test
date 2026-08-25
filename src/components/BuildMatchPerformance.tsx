/**
 * BuildMatchPerformance — Match Performance Tracking screen for tennis players
 *
 * Features: match history display, performance statistics, win/loss tracking, detailed match analytics, performance trends
 *
 * Ticket: SCRUM-1196 | Branch: proto/SCRUM-1186
 */

import React, { useState } from 'react'

interface MatchPerformance {
  id: string
  date: string
  opponent: string
  result: 'Win' | 'Loss'
  score: string
  tournament: string
  surface: 'Hard' | 'Clay' | 'Grass'
  duration: string
  aces: number
  doubleFaults: number
  firstServePercentage: number
  breakPointsConverted: string
  winnersUnforcedErrors: string
}

interface PerformanceStats {
  totalMatches: number
  wins: number
  losses: number
  winPercentage: number
  averageAces: number
  averageDoubleFaults: number
  averageFirstServePercentage: number
}

const mockMatches: MatchPerformance[] = [
  {
    id: '1',
    date: '2026-08-20',
    opponent: 'Carlos Martinez',
    result: 'Win',
    score: '6-4, 6-3',
    tournament: 'Summer Open 2026',
    surface: 'Hard',
    duration: '1h 45m',
    aces: 8,
    doubleFaults: 2,
    firstServePercentage: 68,
    breakPointsConverted: '4/7',
    winnersUnforcedErrors: '32/18'
  },
  {
    id: '2',
    date: '2026-08-18',
    opponent: 'James Anderson',
    result: 'Loss',
    score: '4-6, 6-7',
    tournament: 'Summer Open 2026',
    surface: 'Hard',
    duration: '2h 10m',
    aces: 5,
    doubleFaults: 4,
    firstServePercentage: 61,
    breakPointsConverted: '2/5',
    winnersUnforcedErrors: '28/24'
  },
  {
    id: '3',
    date: '2026-08-15',
    opponent: 'Michael Chen',
    result: 'Win',
    score: '7-6, 6-4',
    tournament: 'Regional Championship',
    surface: 'Clay',
    duration: '2h 30m',
    aces: 6,
    doubleFaults: 3,
    firstServePercentage: 65,
    breakPointsConverted: '3/6',
    winnersUnforcedErrors: '35/22'
  },
  {
    id: '4',
    date: '2026-08-12',
    opponent: 'David Thompson',
    result: 'Win',
    score: '6-3, 6-2',
    tournament: 'Regional Championship',
    surface: 'Clay',
    duration: '1h 38m',
    aces: 10,
    doubleFaults: 1,
    firstServePercentage: 72,
    breakPointsConverted: '5/8',
    winnersUnforcedErrors: '38/15'
  },
  {
    id: '5',
    date: '2026-08-08',
    opponent: 'Robert Williams',
    result: 'Loss',
    score: '3-6, 4-6',
    tournament: 'City Masters',
    surface: 'Grass',
    duration: '1h 55m',
    aces: 7,
    doubleFaults: 5,
    firstServePercentage: 58,
    breakPointsConverted: '1/4',
    winnersUnforcedErrors: '25/28'
  },
  {
    id: '6',
    date: '2026-08-05',
    opponent: 'Alexander Petrov',
    result: 'Win',
    score: '6-4, 7-5',
    tournament: 'City Masters',
    surface: 'Grass',
    duration: '2h 15m',
    aces: 9,
    doubleFaults: 2,
    firstServePercentage: 70,
    breakPointsConverted: '4/6',
    winnersUnforcedErrors: '40/20'
  },
  {
    id: '7',
    date: '2026-08-01',
    opponent: 'Thomas Brown',
    result: 'Win',
    score: '6-2, 6-1',
    tournament: 'Local League Finals',
    surface: 'Hard',
    duration: '1h 25m',
    aces: 11,
    doubleFaults: 1,
    firstServePercentage: 75,
    breakPointsConverted: '6/7',
    winnersUnforcedErrors: '42/12'
  }
]

export default function BuildMatchPerformance() {
  const [selectedSurface, setSelectedSurface] = useState<string>('All')
  const [selectedResult, setSelectedResult] = useState<string>('All')

  const calculateStats = (matches: MatchPerformance[]): PerformanceStats => {
    const totalMatches = matches.length
    const wins = matches.filter(m => m.result === 'Win').length
    const losses = totalMatches - wins
    const winPercentage = totalMatches > 0 ? Math.round((wins / totalMatches) * 100) : 0
    
    const averageAces = totalMatches > 0 
      ? Math.round(matches.reduce((sum, m) => sum + m.aces, 0) / totalMatches) 
      : 0
    
    const averageDoubleFaults = totalMatches > 0 
      ? Math.round(matches.reduce((sum, m) => sum + m.doubleFaults, 0) / totalMatches) 
      : 0
    
    const averageFirstServePercentage = totalMatches > 0 
      ? Math.round(matches.reduce((sum, m) => sum + m.firstServePercentage, 0) / totalMatches) 
      : 0

    return {
      totalMatches,
      wins,
      losses,
      winPercentage,
      averageAces,
      averageDoubleFaults,
      averageFirstServePercentage
    }
  }

  const filteredMatches = mockMatches.filter(match => {
    const surfaceMatch = selectedSurface === 'All' || match.surface === selectedSurface
    const resultMatch = selectedResult === 'All' || match.result === selectedResult
    return surfaceMatch && resultMatch
  })

  const stats = calculateStats(filteredMatches)

  return (
    <div data-testid="buildmatchperformance" className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Match Performance Tracking</h1>
          <p className="text-slate-600">Track and analyze your tennis match performance over time</p>
        </div>

        {/* Performance Statistics Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
            <div className="text-sm font-medium text-slate-600 mb-1">Total Matches</div>
            <div className="text-3xl font-bold text-slate-900">{stats.totalMatches}</div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
            <div className="text-sm font-medium text-slate-600 mb-1">Wins</div>
            <div className="text-3xl font-bold text-green-600">{stats.wins}</div>
            <div className="text-xs text-slate-500 mt-1">Win Rate: {stats.winPercentage}%</div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500">
            <div className="text-sm font-medium text-slate-600 mb-1">Losses</div>
            <div className="text-3xl font-bold text-red-600">{stats.losses}</div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
            <div className="text-sm font-medium text-slate-600 mb-1">Avg First Serve %</div>
            <div className="text-3xl font-bold text-purple-600">{stats.averageFirstServePercentage}%</div>
          </div>
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Serving Statistics</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Average Aces per Match</span>
                <span className="text-lg font-bold text-blue-600">{stats.averageAces}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Average Double Faults per Match</span>
                <span className="text-lg font-bold text-orange-600">{stats.averageDoubleFaults}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Performance by Surface</h2>
            <div className="space-y-2">
              {['Hard', 'Clay', 'Grass'].map(surface => {
                const surfaceMatches = mockMatches.filter(m => m.surface === surface)
                const surfaceWins = surfaceMatches.filter(m => m.result === 'Win').length
                const surfaceWinRate = surfaceMatches.length > 0 
                  ? Math.round((surfaceWins / surfaceMatches.length) * 100) 
                  : 0
                return (
                  <div key={surface} className="flex justify-between items-center">
                    <span className="text-slate-600">{surface}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-slate-500">{surfaceWins}/{surfaceMatches.length}</span>
                      <span className="text-sm font-semibold text-slate-900">{surfaceWinRate}%</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Filter Matches</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="surface-filter" className="block text-sm font-medium text-slate-700 mb-2">
                Surface
              </label>
              <select
                id="surface-filter"
                data-testid="buildmatchperformance-surface"
                value={selectedSurface}
                onChange={(e) => setSelectedSurface(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="All">All Surfaces</option>
                <option value="Hard">Hard</option>
                <option value="Clay">Clay</option>
                <option value="Grass">Grass</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="result-filter" className="block text-sm font-medium text-slate-700 mb-2">
                Result
              </label>
              <select
                id="result-filter"
                data-testid="buildmatchperformance-result"
                value={selectedResult}
                onChange={(e) => setSelectedResult(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="All">All Results</option>
                <option value="Win">Wins Only</option>
                <option value="Loss">Losses Only</option>
              </select>
            </div>
          </div>
          
          {(selectedSurface !== 'All' || selectedResult !== 'All') && (
            <button
              data-testid="buildmatchperformance-reset"
              onClick={() => {
                setSelectedSurface('All')
                setSelectedResult('All')
              }}
              className="mt-4 px-4 py-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Match History List */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-6">Match History</h2>
          
          {filteredMatches.length === 0 ? (
            <div className="text-center py-8 text-slate-500">
              No matches found with the selected filters.
            </div>
          ) : (
            <div data-testid="buildmatchperformance-list" className="space-y-4">
              {filteredMatches.map((match) => (
                <div
                  key={match.id}
                  data-testid="buildmatchperformance-item"
                  className={`border rounded-lg p-5 hover:shadow-md transition-shadow ${
                    match.result === 'Win' 
                      ? 'border-green-200 bg-green-50' 
                      : 'border-red-200 bg-red-50'
                  }`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    {/* Match Header */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          match.result === 'Win' 
                            ? 'bg-green-600 text-white' 
                            : 'bg-red-600 text-white'
                        }`}>
                          {match.result}
                        </span>
                        <span className="text-lg font-bold text-slate-900">{match.score}</span>
                        <span className="text-sm text-slate-500">{match.duration}</span>
                      </div>
                      
                      <div className="mb-2">
                        <div className="text-lg font-semibold text-slate-900">vs. {match.opponent}</div>
                        <div className="text-sm text-slate-600">{match.tournament}</div>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-slate-600">
                        <span className="flex items-center gap-1">
                          <span className="font-medium">Date:</span> {match.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="font-medium">Surface:</span> 
                          <span className={`px-2 py-0.5 rounded ${
                            match.surface === 'Hard' ? 'bg-blue-100 text-blue-700' :
                            match.surface === 'Clay' ? 'bg-orange-100 text-orange-700' :
                            'bg-green-100 text-green-700'
                          }`}>
                            {match.surface}
                          </span>
                        </span>
                      </div>
                    </div>

                    {/* Match Statistics */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
                      <div className="text-center">
                        <div className="text-xs text-slate-500 mb-1">Aces</div>
                        <div className="text-lg font-bold text-slate-900">{match.aces}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-slate-500 mb-1">Double Faults</div>
                        <div className="text-lg font-bold text-slate-900">{match.doubleFaults}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-slate-500 mb-1">1st Serve %</div>
                        <div className="text-lg font-bold text-slate-900">{match.firstServePercentage}%</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-slate-500 mb-1">Break Points</div>
                        <div className="text-sm font-semibold text-slate-900">{match.breakPointsConverted}</div>
                      </div>
                    </div>
                  </div>

                  {/* Additional Details */}
                  <div className="mt-3 pt-3 border-t border-slate-200">
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-slate-600">
                        <span className="font-medium">Winners/Unforced Errors:</span> {match.winnersUnforcedErrors}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
