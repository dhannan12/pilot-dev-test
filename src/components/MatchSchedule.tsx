/**
 * MatchSchedule — Displays and manages tennis match schedules with 24-hour confirmation rule
 *
 * Features: match listing, confirmation deadline validation, status tracking, time-based warnings, schedule confirmation
 *
 * Ticket: SCRUM-1188 | Branch: proto/SCRUM-1186
 */

import React, { useState } from 'react'

interface Match {
  id: string
  homePlayer: string
  awayPlayer: string
  scheduledTime: Date
  confirmed: boolean
  court: string
  matchType: string
}

const MOCK_MATCHES: Match[] = [
  {
    id: 'M001',
    homePlayer: 'Rafael Nadal',
    awayPlayer: 'Roger Federer',
    scheduledTime: new Date(Date.now() + 30 * 60 * 60 * 1000), // 30 hours from now
    confirmed: false,
    court: 'Court 1',
    matchType: 'Singles'
  },
  {
    id: 'M002',
    homePlayer: 'Serena Williams',
    awayPlayer: 'Venus Williams',
    scheduledTime: new Date(Date.now() + 48 * 60 * 60 * 1000), // 48 hours from now
    confirmed: true,
    court: 'Court 2',
    matchType: 'Singles'
  },
  {
    id: 'M003',
    homePlayer: 'Novak Djokovic',
    awayPlayer: 'Andy Murray',
    scheduledTime: new Date(Date.now() + 12 * 60 * 60 * 1000), // 12 hours from now - too late to confirm
    confirmed: false,
    court: 'Court 3',
    matchType: 'Singles'
  },
  {
    id: 'M004',
    homePlayer: 'Maria Sharapova',
    awayPlayer: 'Caroline Wozniacki',
    scheduledTime: new Date(Date.now() + 72 * 60 * 60 * 1000), // 72 hours from now
    confirmed: false,
    court: 'Court 1',
    matchType: 'Singles'
  },
  {
    id: 'M005',
    homePlayer: 'Pete Sampras',
    awayPlayer: 'Andre Agassi',
    scheduledTime: new Date(Date.now() + 26 * 60 * 60 * 1000), // 26 hours from now
    confirmed: true,
    court: 'Court 4',
    matchType: 'Singles'
  },
  {
    id: 'M006',
    homePlayer: 'Steffi Graf',
    awayPlayer: 'Martina Navratilova',
    scheduledTime: new Date(Date.now() + 8 * 60 * 60 * 1000), // 8 hours from now - too late
    confirmed: false,
    court: 'Court 2',
    matchType: 'Singles'
  },
  {
    id: 'M007',
    homePlayer: 'John McEnroe',
    awayPlayer: 'Bjorn Borg',
    scheduledTime: new Date(Date.now() + 96 * 60 * 60 * 1000), // 96 hours from now
    confirmed: false,
    court: 'Court 3',
    matchType: 'Singles'
  }
]

export default function MatchSchedule() {
  const [matches, setMatches] = useState<Match[]>(MOCK_MATCHES)
  const [filterStatus, setFilterStatus] = useState<'all' | 'confirmed' | 'pending'>('all')

  const getHoursUntilMatch = (scheduledTime: Date): number => {
    const now = new Date()
    const diff = scheduledTime.getTime() - now.getTime()
    return Math.floor(diff / (1000 * 60 * 60))
  }

  const canConfirm = (match: Match): boolean => {
    const hoursUntil = getHoursUntilMatch(match.scheduledTime)
    return hoursUntil >= 24 && !match.confirmed
  }

  const isTooLateToConfirm = (match: Match): boolean => {
    const hoursUntil = getHoursUntilMatch(match.scheduledTime)
    return hoursUntil < 24 && !match.confirmed
  }

  const handleConfirmMatch = (matchId: string) => {
    setMatches(prevMatches =>
      prevMatches.map(match => {
        if (match.id === matchId && canConfirm(match)) {
          return { ...match, confirmed: true }
        }
        return match
      })
    )
  }

  const filteredMatches = matches.filter(match => {
    if (filterStatus === 'confirmed') return match.confirmed
    if (filterStatus === 'pending') return !match.confirmed
    return true
  })

  const formatDate = (date: Date): string => {
    return date.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <section data-testid="matchschedule" className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Match Schedule</h1>
          <p className="text-gray-600">
            ⚠️ Important: Match schedules must be confirmed at least 24 hours before the match start time.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex items-center gap-4">
            <label htmlFor="filter-status" className="font-semibold text-gray-700">
              Filter:
            </label>
            <select
              id="filter-status"
              data-testid="matchschedule-filter"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as 'all' | 'confirmed' | 'pending')}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
            >
              <option value="all">All Matches</option>
              <option value="confirmed">Confirmed Only</option>
              <option value="pending">Pending Only</option>
            </select>
          </div>
        </div>

        {/* Match List */}
        <div data-testid="matchschedule-list" className="space-y-4">
          {filteredMatches.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center text-gray-500">
              No matches found for the selected filter.
            </div>
          ) : (
            filteredMatches.map((match) => {
              const hoursUntil = getHoursUntilMatch(match.scheduledTime)
              const canConfirmMatch = canConfirm(match)
              const tooLate = isTooLateToConfirm(match)

              return (
                <div
                  key={match.id}
                  data-testid="matchschedule-item"
                  className={`bg-white rounded-lg shadow-md p-6 border-l-4 ${
                    match.confirmed
                      ? 'border-green-500'
                      : tooLate
                      ? 'border-red-500'
                      : 'border-yellow-500'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    {/* Match Details */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                          {match.id}
                        </span>
                        <span className="text-sm font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                          {match.court}
                        </span>
                        <span className="text-sm font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                          {match.matchType}
                        </span>
                      </div>

                      <div className="text-xl font-bold text-gray-800 mb-2">
                        {match.homePlayer} <span className="text-gray-400">vs</span> {match.awayPlayer}
                      </div>

                      <div className="text-gray-600 mb-3">
                        <span className="font-semibold">Scheduled:</span> {formatDate(match.scheduledTime)}
                      </div>

                      <div className="flex items-center gap-4">
                        {/* Status Badge */}
                        {match.confirmed ? (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800">
                            ✓ Confirmed
                          </span>
                        ) : tooLate ? (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-red-100 text-red-800">
                            ⚠ Too Late to Confirm
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-yellow-100 text-yellow-800">
                            ⏳ Pending Confirmation
                          </span>
                        )}

                        {/* Time Until Match */}
                        <span className="text-sm text-gray-600">
                          {hoursUntil > 0 ? (
                            <>
                              <span className="font-semibold">{hoursUntil}</span> hours until match
                            </>
                          ) : (
                            <span className="font-semibold text-red-600">Match time passed</span>
                          )}
                        </span>
                      </div>

                      {/* Warning Message */}
                      {tooLate && (
                        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                          <p className="text-sm text-red-800">
                            <strong>Cannot confirm:</strong> This match is scheduled in less than 24 hours.
                            Confirmation deadline has passed.
                          </p>
                        </div>
                      )}

                      {canConfirmMatch && hoursUntil < 48 && (
                        <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <p className="text-sm text-yellow-800">
                            <strong>Action required:</strong> Please confirm this match soon. Confirmation
                            deadline is 24 hours before match time.
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Action Button */}
                    <div className="ml-6">
                      {canConfirmMatch && (
                        <button
                          data-testid="matchschedule-confirm"
                          onClick={() => handleConfirmMatch(match.id)}
                          className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors shadow-md hover:shadow-lg"
                        >
                          Confirm Match
                        </button>
                      )}
                      {match.confirmed && (
                        <div className="text-green-600 font-semibold text-center">
                          Confirmed ✓
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>

        {/* Summary Stats */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="text-2xl font-bold text-gray-800">{matches.length}</div>
            <div className="text-sm text-gray-600">Total Matches</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="text-2xl font-bold text-green-600">
              {matches.filter(m => m.confirmed).length}
            </div>
            <div className="text-sm text-gray-600">Confirmed</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="text-2xl font-bold text-red-600">
              {matches.filter(m => isTooLateToConfirm(m)).length}
            </div>
            <div className="text-sm text-gray-600">Too Late to Confirm</div>
          </div>
        </div>
      </div>
    </section>
  )
}
