/**
 * RegisteredUserAttempts — Displays registered user access attempts to player profiles
 *
 * Features: access history, player profile links, timestamp display, status indicators, user session tracking
 *
 * Ticket: SCRUM-1164 | Branch: proto/SCRUM-1163
 */

import React, { useState } from 'react'

interface AccessAttempt {
  id: string
  userId: string
  userName: string
  playerProfileId: string
  playerName: string
  timestamp: string
  status: 'success' | 'denied' | 'pending'
  reason?: string
}

const mockAccessAttempts: AccessAttempt[] = [
  {
    id: 'att-001',
    userId: 'user-123',
    userName: 'John Smith',
    playerProfileId: 'player-456',
    playerName: 'Michael Jordan',
    timestamp: '2026-08-25T10:15:30Z',
    status: 'success',
  },
  {
    id: 'att-002',
    userId: 'user-124',
    userName: 'Sarah Johnson',
    playerProfileId: 'player-789',
    playerName: 'LeBron James',
    timestamp: '2026-08-25T10:12:45Z',
    status: 'denied',
    reason: 'Insufficient permissions',
  },
  {
    id: 'att-003',
    userId: 'user-125',
    userName: 'Mike Davis',
    playerProfileId: 'player-321',
    playerName: 'Kobe Bryant',
    timestamp: '2026-08-25T10:08:20Z',
    status: 'success',
  },
  {
    id: 'att-004',
    userId: 'user-126',
    userName: 'Emma Wilson',
    playerProfileId: 'player-654',
    playerName: 'Stephen Curry',
    timestamp: '2026-08-25T09:55:10Z',
    status: 'pending',
  },
  {
    id: 'att-005',
    userId: 'user-127',
    userName: 'David Brown',
    playerProfileId: 'player-987',
    playerName: 'Magic Johnson',
    timestamp: '2026-08-25T09:45:00Z',
    status: 'success',
  },
  {
    id: 'att-006',
    userId: 'user-128',
    userName: 'Lisa Martinez',
    playerProfileId: 'player-147',
    playerName: 'Larry Bird',
    timestamp: '2026-08-25T09:30:15Z',
    status: 'denied',
    reason: 'Profile is private',
  },
  {
    id: 'att-007',
    userId: 'user-129',
    userName: 'James Taylor',
    playerProfileId: 'player-258',
    playerName: 'Tim Duncan',
    timestamp: '2026-08-25T09:20:40Z',
    status: 'success',
  },
]

export default function RegisteredUserAttempts() {
  const [attempts] = useState<AccessAttempt[]>(mockAccessAttempts)
  const [filter, setFilter] = useState<'all' | 'success' | 'denied' | 'pending'>('all')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredAttempts = attempts.filter(attempt => {
    const matchesFilter = filter === 'all' || attempt.status === filter
    const matchesSearch = 
      attempt.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      attempt.playerName.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'denied':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return '✓'
      case 'denied':
        return '✗'
      case 'pending':
        return '⏳'
      default:
        return '•'
    }
  }

  return (
    <section data-testid="registereduserattempts" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Player Profile Access Attempts
          </h1>
          <p className="text-gray-600 mb-6">
            Monitor and review registered user attempts to access player profiles
          </p>

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <input
                type="text"
                data-testid="registereduserattempts-search"
                placeholder="Search by user or player name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-2">
              <button
                data-testid="registereduserattempts-filter-all"
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                All
              </button>
              <button
                data-testid="registereduserattempts-filter-success"
                onClick={() => setFilter('success')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'success'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Success
              </button>
              <button
                data-testid="registereduserattempts-filter-denied"
                onClick={() => setFilter('denied')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'denied'
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Denied
              </button>
              <button
                data-testid="registereduserattempts-filter-pending"
                onClick={() => setFilter('pending')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'pending'
                    ? 'bg-yellow-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Pending
              </button>
            </div>
          </div>

          <div className="text-sm text-gray-600 mb-4">
            Showing {filteredAttempts.length} of {attempts.length} attempts
          </div>
        </div>

        <div data-testid="registereduserattempts-list" className="space-y-4">
          {filteredAttempts.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center text-gray-500">
              No access attempts found matching your criteria
            </div>
          ) : (
            filteredAttempts.map((attempt) => (
              <div
                key={attempt.id}
                data-testid="registereduserattempts-item"
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                          attempt.status
                        )}`}
                      >
                        <span className="text-lg leading-none">{getStatusIcon(attempt.status)}</span>
                        {attempt.status.toUpperCase()}
                      </span>
                      <span className="text-sm text-gray-500">
                        {formatTimestamp(attempt.timestamp)}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-gray-700">User:</span>
                        <span className="text-sm text-gray-900">{attempt.userName}</span>
                        <span className="text-xs text-gray-500">({attempt.userId})</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-gray-700">Player Profile:</span>
                        <span className="text-sm text-gray-900 font-medium">
                          {attempt.playerName}
                        </span>
                        <span className="text-xs text-gray-500">({attempt.playerProfileId})</span>
                      </div>

                      {attempt.reason && (
                        <div className="flex items-start gap-2">
                          <span className="text-sm font-semibold text-gray-700">Reason:</span>
                          <span className="text-sm text-red-600">{attempt.reason}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      data-testid="registereduserattempts-view-user"
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                      View User
                    </button>
                    <button
                      data-testid="registereduserattempts-view-profile"
                      className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium"
                    >
                      View Profile
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  )
}
