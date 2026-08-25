/**
 * MatchScheduleIs — Displays match schedules confirmed less than 24 hours before match time
 *
 * Features: confirmation status, time countdown, venue details, match participants, urgent notifications
 *
 * Ticket: SCRUM-1165 | Branch: proto/SCRUM-1163
 */

import React, { useState } from 'react'

interface Match {
  id: string
  homeTeam: string
  awayTeam: string
  venue: string
  matchTime: Date
  confirmedAt: Date
  status: 'confirmed' | 'pending' | 'cancelled'
  hoursUntilMatch: number
  isUrgent: boolean
}

const MOCK_MATCHES: Match[] = [
  {
    id: '1',
    homeTeam: 'Manchester United',
    awayTeam: 'Liverpool',
    venue: 'Old Trafford',
    matchTime: new Date(Date.now() + 18 * 60 * 60 * 1000), // 18 hours from now
    confirmedAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    status: 'confirmed',
    hoursUntilMatch: 18,
    isUrgent: true
  },
  {
    id: '2',
    homeTeam: 'Chelsea',
    awayTeam: 'Arsenal',
    venue: 'Stamford Bridge',
    matchTime: new Date(Date.now() + 12 * 60 * 60 * 1000), // 12 hours from now
    confirmedAt: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
    status: 'confirmed',
    hoursUntilMatch: 12,
    isUrgent: true
  },
  {
    id: '3',
    homeTeam: 'Tottenham',
    awayTeam: 'West Ham',
    venue: 'Tottenham Hotspur Stadium',
    matchTime: new Date(Date.now() + 22 * 60 * 60 * 1000), // 22 hours from now
    confirmedAt: new Date(Date.now() - 30 * 60 * 1000), // 30 mins ago
    status: 'confirmed',
    hoursUntilMatch: 22,
    isUrgent: true
  },
  {
    id: '4',
    homeTeam: 'Manchester City',
    awayTeam: 'Newcastle',
    venue: 'Etihad Stadium',
    matchTime: new Date(Date.now() + 8 * 60 * 60 * 1000), // 8 hours from now
    confirmedAt: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
    status: 'confirmed',
    hoursUntilMatch: 8,
    isUrgent: true
  },
  {
    id: '5',
    homeTeam: 'Leicester City',
    awayTeam: 'Everton',
    venue: 'King Power Stadium',
    matchTime: new Date(Date.now() + 20 * 60 * 60 * 1000), // 20 hours from now
    confirmedAt: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    status: 'confirmed',
    hoursUntilMatch: 20,
    isUrgent: true
  },
  {
    id: '6',
    homeTeam: 'Brighton',
    awayTeam: 'Southampton',
    venue: 'Amex Stadium',
    matchTime: new Date(Date.now() + 15 * 60 * 60 * 1000), // 15 hours from now
    confirmedAt: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    status: 'confirmed',
    hoursUntilMatch: 15,
    isUrgent: true
  }
]

export default function MatchScheduleIs() {
  const [selectedMatch, setSelectedMatch] = useState<string | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>('all')

  const filteredMatches = MOCK_MATCHES.filter(match => {
    if (filterStatus === 'all') return true
    return match.status === filterStatus
  })

  const formatMatchTime = (date: Date) => {
    return date.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatConfirmedAt = (date: Date) => {
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))
    
    if (diffHours > 0) {
      return `${diffHours}h ${diffMins}m ago`
    }
    return `${diffMins}m ago`
  }

  const getUrgencyClass = (hoursUntilMatch: number) => {
    if (hoursUntilMatch <= 8) return 'bg-red-100 border-red-500'
    if (hoursUntilMatch <= 16) return 'bg-orange-100 border-orange-500'
    return 'bg-yellow-100 border-yellow-500'
  }

  const getUrgencyBadge = (hoursUntilMatch: number) => {
    if (hoursUntilMatch <= 8) return 'CRITICAL'
    if (hoursUntilMatch <= 16) return 'URGENT'
    return 'ATTENTION'
  }

  const getUrgencyBadgeClass = (hoursUntilMatch: number) => {
    if (hoursUntilMatch <= 8) return 'bg-red-600 text-white'
    if (hoursUntilMatch <= 16) return 'bg-orange-600 text-white'
    return 'bg-yellow-600 text-white'
  }

  return (
    <section data-testid="matchscheduleis" className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-800 mb-2">
                Match Schedule Confirmations
              </h1>
              <p className="text-slate-600">
                Matches confirmed within 24 hours of kickoff
              </p>
            </div>
            <div className="bg-red-100 border-2 border-red-500 rounded-lg px-4 py-2">
              <p className="text-red-800 font-semibold text-sm">URGENT ALERT</p>
              <p className="text-red-600 text-xs">Late confirmations detected</p>
            </div>
          </div>

          {/* Filters */}
          <div className="flex gap-4 items-center">
            <label htmlFor="status-filter" className="text-sm font-medium text-slate-700">
              Filter:
            </label>
            <select
              id="status-filter"
              data-testid="matchscheduleis-status"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Matches</option>
              <option value="confirmed">Confirmed</option>
              <option value="pending">Pending</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <button
              data-testid="matchscheduleis-refresh"
              onClick={() => setFilterStatus('all')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Refresh
            </button>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-md p-4">
            <p className="text-sm text-slate-600 mb-1">Total Confirmations</p>
            <p className="text-3xl font-bold text-slate-800">{filteredMatches.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <p className="text-sm text-slate-600 mb-1">Critical (≤8h)</p>
            <p className="text-3xl font-bold text-red-600">
              {filteredMatches.filter(m => m.hoursUntilMatch <= 8).length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <p className="text-sm text-slate-600 mb-1">Average Lead Time</p>
            <p className="text-3xl font-bold text-orange-600">
              {Math.round(
                filteredMatches.reduce((sum, m) => sum + m.hoursUntilMatch, 0) / filteredMatches.length
              )}h
            </p>
          </div>
        </div>

        {/* Match List */}
        <div data-testid="matchscheduleis-list" className="space-y-4">
          {filteredMatches.map((match) => (
            <div
              key={match.id}
              data-testid="matchscheduleis-item"
              className={`bg-white rounded-lg shadow-md border-l-4 overflow-hidden transition-all ${
                getUrgencyClass(match.hoursUntilMatch)
              } ${selectedMatch === match.id ? 'ring-2 ring-blue-500' : ''}`}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${getUrgencyBadgeClass(
                          match.hoursUntilMatch
                        )}`}
                      >
                        {getUrgencyBadge(match.hoursUntilMatch)}
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                        {match.status.toUpperCase()}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-1">
                      {match.homeTeam} vs {match.awayTeam}
                    </h3>
                    <p className="text-sm text-slate-600 mb-2">
                      📍 {match.venue}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-slate-800 mb-1">
                      {match.hoursUntilMatch}h
                    </p>
                    <p className="text-xs text-slate-500">until kickoff</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-slate-50 rounded-lg p-3">
                    <p className="text-xs text-slate-500 mb-1">Match Time</p>
                    <p className="text-sm font-semibold text-slate-800">
                      {formatMatchTime(match.matchTime)}
                    </p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-3">
                    <p className="text-xs text-slate-500 mb-1">Confirmed</p>
                    <p className="text-sm font-semibold text-slate-800">
                      {formatConfirmedAt(match.confirmedAt)}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    data-testid="matchscheduleis-view"
                    onClick={() => setSelectedMatch(match.id)}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    View Details
                  </button>
                  <button
                    data-testid="matchscheduleis-notify"
                    className="flex-1 px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors text-sm font-medium"
                  >
                    Send Notification
                  </button>
                  <button
                    data-testid="matchscheduleis-export"
                    className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors text-sm font-medium"
                  >
                    Export
                  </button>
                </div>
              </div>

              {match.isUrgent && (
                <div className="bg-red-50 border-t border-red-200 px-6 py-3">
                  <p className="text-sm text-red-800">
                    ⚠️ <strong>Late Confirmation:</strong> This match was confirmed with less than 24 hours notice. 
                    Additional coordination may be required.
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredMatches.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-slate-500 text-lg">No matches found matching the current filter.</p>
            <button
              data-testid="matchscheduleis-clear"
              onClick={() => setFilterStatus('all')}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
