/**
 * SystemFlagsExpired — System flags expired memberships for renewal
 *
 * Features: expired membership detection, renewal flagging, status tracking, automated alerts, admin dashboard
 *
 * Ticket: SCRUM-1037 | Branch: proto/SCRUM-1028
 */

import React, { useState } from 'react'

interface Membership {
  id: string
  memberName: string
  membershipType: string
  expiryDate: string
  daysExpired: number
  email: string
  phone: string
  isFlagged: boolean
  lastNotified?: string
}

const mockExpiredMemberships: Membership[] = [
  {
    id: 'M001',
    memberName: 'John Smith',
    membershipType: 'Premium Annual',
    expiryDate: '2026-07-15',
    daysExpired: 33,
    email: 'john.smith@email.com',
    phone: '555-0101',
    isFlagged: true,
    lastNotified: '2026-08-10'
  },
  {
    id: 'M002',
    memberName: 'Sarah Johnson',
    membershipType: 'Basic Monthly',
    expiryDate: '2026-08-05',
    daysExpired: 12,
    email: 'sarah.j@email.com',
    phone: '555-0102',
    isFlagged: false
  },
  {
    id: 'M003',
    memberName: 'Mike Davis',
    membershipType: 'Premium Monthly',
    expiryDate: '2026-07-28',
    daysExpired: 20,
    email: 'mike.davis@email.com',
    phone: '555-0103',
    isFlagged: true,
    lastNotified: '2026-08-12'
  },
  {
    id: 'M004',
    memberName: 'Emily Brown',
    membershipType: 'Student Annual',
    expiryDate: '2026-06-30',
    daysExpired: 48,
    email: 'emily.brown@email.com',
    phone: '555-0104',
    isFlagged: true,
    lastNotified: '2026-08-01'
  },
  {
    id: 'M005',
    memberName: 'David Wilson',
    membershipType: 'Basic Annual',
    expiryDate: '2026-08-10',
    daysExpired: 7,
    email: 'david.w@email.com',
    phone: '555-0105',
    isFlagged: false
  },
  {
    id: 'M006',
    memberName: 'Lisa Anderson',
    membershipType: 'Premium Annual',
    expiryDate: '2026-07-01',
    daysExpired: 47,
    email: 'lisa.anderson@email.com',
    phone: '555-0106',
    isFlagged: true,
    lastNotified: '2026-08-05'
  }
]

export default function SystemFlagsExpired() {
  const [memberships, setMemberships] = useState<Membership[]>(mockExpiredMemberships)
  const [filterStatus, setFilterStatus] = useState<'all' | 'flagged' | 'unflagged'>('all')
  const [sortBy, setSortBy] = useState<'daysExpired' | 'memberName'>('daysExpired')

  const handleToggleFlag = (id: string) => {
    setMemberships(prev =>
      prev.map(m =>
        m.id === id
          ? {
              ...m,
              isFlagged: !m.isFlagged,
              lastNotified: !m.isFlagged ? new Date().toISOString().split('T')[0] : m.lastNotified
            }
          : m
      )
    )
  }

  const handleFlagAll = () => {
    const today = new Date().toISOString().split('T')[0]
    setMemberships(prev =>
      prev.map(m => ({
        ...m,
        isFlagged: true,
        lastNotified: m.isFlagged ? m.lastNotified : today
      }))
    )
  }

  const handleSendReminder = (id: string) => {
    setMemberships(prev =>
      prev.map(m =>
        m.id === id
          ? { ...m, lastNotified: new Date().toISOString().split('T')[0] }
          : m
      )
    )
  }

  const filteredMemberships = memberships
    .filter(m => {
      if (filterStatus === 'flagged') return m.isFlagged
      if (filterStatus === 'unflagged') return !m.isFlagged
      return true
    })
    .sort((a, b) => {
      if (sortBy === 'daysExpired') {
        return b.daysExpired - a.daysExpired
      }
      return a.memberName.localeCompare(b.memberName)
    })

  const stats = {
    total: memberships.length,
    flagged: memberships.filter(m => m.isFlagged).length,
    unflagged: memberships.filter(m => !m.isFlagged).length,
    critical: memberships.filter(m => m.daysExpired > 30).length
  }

  const getSeverityColor = (daysExpired: number) => {
    if (daysExpired > 30) return 'text-red-600 bg-red-50'
    if (daysExpired > 14) return 'text-orange-600 bg-orange-50'
    return 'text-yellow-600 bg-yellow-50'
  }

  return (
    <div data-testid="systemflagsexpired" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Expired Membership Renewals
          </h1>
          <p className="text-gray-600">
            System automatically flags expired memberships requiring renewal action
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm text-gray-600 mb-1">Total Expired</div>
            <div className="text-3xl font-bold text-gray-900">{stats.total}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm text-gray-600 mb-1">Flagged</div>
            <div className="text-3xl font-bold text-blue-600">{stats.flagged}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm text-gray-600 mb-1">Unflagged</div>
            <div className="text-3xl font-bold text-orange-600">{stats.unflagged}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm text-gray-600 mb-1">Critical (30+ days)</div>
            <div className="text-3xl font-bold text-red-600">{stats.critical}</div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex gap-4 items-center">
              <div>
                <label htmlFor="filter-status" className="block text-sm font-medium text-gray-700 mb-1">
                  Filter
                </label>
                <select
                  id="filter-status"
                  data-testid="systemflagsexpired-filter"
                  value={filterStatus}
                  onChange={e => setFilterStatus(e.target.value as typeof filterStatus)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Memberships</option>
                  <option value="flagged">Flagged Only</option>
                  <option value="unflagged">Unflagged Only</option>
                </select>
              </div>

              <div>
                <label htmlFor="sort-by" className="block text-sm font-medium text-gray-700 mb-1">
                  Sort By
                </label>
                <select
                  id="sort-by"
                  data-testid="systemflagsexpired-sort"
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value as typeof sortBy)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="daysExpired">Days Expired</option>
                  <option value="memberName">Member Name</option>
                </select>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                data-testid="systemflagsexpired-flag-all"
                onClick={handleFlagAll}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
              >
                Flag All Expired
              </button>
            </div>
          </div>
        </div>

        {/* Memberships List */}
        <div data-testid="systemflagsexpired-list" className="space-y-4">
          {filteredMemberships.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <p className="text-gray-500 text-lg">No memberships found matching the current filter</p>
            </div>
          ) : (
            filteredMemberships.map(membership => (
              <div
                key={membership.id}
                data-testid="systemflagsexpired-item"
                className="bg-white rounded-lg shadow hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-900">
                          {membership.memberName}
                        </h3>
                        {membership.isFlagged && (
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                            FLAGGED
                          </span>
                        )}
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getSeverityColor(membership.daysExpired)}`}>
                          {membership.daysExpired} days expired
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div className="flex gap-4">
                          <span className="font-medium">Type:</span>
                          <span>{membership.membershipType}</span>
                        </div>
                        <div className="flex gap-4">
                          <span className="font-medium">Expired:</span>
                          <span>{membership.expiryDate}</span>
                        </div>
                        <div className="flex gap-4">
                          <span className="font-medium">Email:</span>
                          <span>{membership.email}</span>
                        </div>
                        <div className="flex gap-4">
                          <span className="font-medium">Phone:</span>
                          <span>{membership.phone}</span>
                        </div>
                        {membership.lastNotified && (
                          <div className="flex gap-4">
                            <span className="font-medium">Last Notified:</span>
                            <span>{membership.lastNotified}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 ml-4">
                      <button
                        data-testid="systemflagsexpired-toggle-flag"
                        onClick={() => handleToggleFlag(membership.id)}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                          membership.isFlagged
                            ? 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                      >
                        {membership.isFlagged ? 'Unflag' : 'Flag for Renewal'}
                      </button>
                      <button
                        data-testid="systemflagsexpired-send-reminder"
                        onClick={() => handleSendReminder(membership.id)}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
                      >
                        Send Reminder
                      </button>
                    </div>
                  </div>

                  {/* Alert Badge */}
                  {membership.daysExpired > 30 && (
                    <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-sm text-red-800 font-medium">
                        ⚠️ Critical: This membership has been expired for over 30 days. Immediate action required.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
