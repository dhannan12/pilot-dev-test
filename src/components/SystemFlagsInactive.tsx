/**
 * SystemFlagsInactive — Displays inactive volunteers and flags them for outreach
 *
 * Features: volunteer inactivity tracking, automatic flagging, outreach status, activity timeline, bulk actions
 *
 * Ticket: SCRUM-931 | Branch: proto/SCRUM-926
 */

import React, { useState } from 'react'

interface InactiveVolunteer {
  id: string
  name: string
  email: string
  lastActive: string
  daysSinceActive: number
  totalHours: number
  flaggedForOutreach: boolean
  outreachAttempts: number
  lastOutreachDate: string | null
  reason: string
  status: 'flagged' | 'contacted' | 'responded' | 'inactive'
}

const MOCK_INACTIVE_VOLUNTEERS: InactiveVolunteer[] = [
  {
    id: 'vol-001',
    name: 'Sarah Mitchell',
    email: 'sarah.mitchell@email.com',
    lastActive: '2026-05-15',
    daysSinceActive: 93,
    totalHours: 45,
    flaggedForOutreach: true,
    outreachAttempts: 2,
    lastOutreachDate: '2026-08-01',
    reason: 'No activity for 90+ days',
    status: 'contacted'
  },
  {
    id: 'vol-002',
    name: 'James Rodriguez',
    email: 'james.r@email.com',
    lastActive: '2026-06-10',
    daysSinceActive: 67,
    totalHours: 78,
    flaggedForOutreach: true,
    outreachAttempts: 1,
    lastOutreachDate: '2026-08-10',
    reason: 'No activity for 60+ days',
    status: 'flagged'
  },
  {
    id: 'vol-003',
    name: 'Emily Chen',
    email: 'emily.chen@email.com',
    lastActive: '2026-04-20',
    daysSinceActive: 118,
    totalHours: 120,
    flaggedForOutreach: true,
    outreachAttempts: 3,
    lastOutreachDate: '2026-07-25',
    reason: 'Extended inactivity period',
    status: 'contacted'
  },
  {
    id: 'vol-004',
    name: 'Michael Thompson',
    email: 'michael.t@email.com',
    lastActive: '2026-07-01',
    daysSinceActive: 46,
    totalHours: 32,
    flaggedForOutreach: false,
    outreachAttempts: 0,
    lastOutreachDate: null,
    reason: 'Approaching inactivity threshold',
    status: 'inactive'
  },
  {
    id: 'vol-005',
    name: 'Alexandra Williams',
    email: 'alex.williams@email.com',
    lastActive: '2026-03-10',
    daysSinceActive: 159,
    totalHours: 95,
    flaggedForOutreach: true,
    outreachAttempts: 4,
    lastOutreachDate: '2026-08-05',
    reason: 'Long-term inactive, multiple attempts',
    status: 'contacted'
  },
  {
    id: 'vol-006',
    name: 'David Park',
    email: 'david.park@email.com',
    lastActive: '2026-06-25',
    daysSinceActive: 52,
    totalHours: 61,
    flaggedForOutreach: true,
    outreachAttempts: 1,
    lastOutreachDate: '2026-08-12',
    reason: 'No activity for 50+ days',
    status: 'responded'
  },
  {
    id: 'vol-007',
    name: 'Lisa Anderson',
    email: 'lisa.anderson@email.com',
    lastActive: '2026-05-28',
    daysSinceActive: 80,
    totalHours: 142,
    flaggedForOutreach: true,
    outreachAttempts: 2,
    lastOutreachDate: '2026-08-08',
    reason: 'High contributor, now inactive',
    status: 'flagged'
  }
]

export default function SystemFlagsInactive() {
  const [volunteers, setVolunteers] = useState<InactiveVolunteer[]>(MOCK_INACTIVE_VOLUNTEERS)
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [selectedVolunteers, setSelectedVolunteers] = useState<Set<string>>(new Set())
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState<'daysSinceActive' | 'totalHours' | 'name'>('daysSinceActive')

  const handleToggleFlag = (id: string) => {
    setVolunteers(prev =>
      prev.map(vol =>
        vol.id === id
          ? { ...vol, flaggedForOutreach: !vol.flaggedForOutreach }
          : vol
      )
    )
  }

  const handleMarkContacted = (id: string) => {
    setVolunteers(prev =>
      prev.map(vol =>
        vol.id === id
          ? {
              ...vol,
              status: 'contacted',
              outreachAttempts: vol.outreachAttempts + 1,
              lastOutreachDate: new Date().toISOString().split('T')[0]
            }
          : vol
      )
    )
  }

  const handleToggleSelect = (id: string) => {
    setSelectedVolunteers(prev => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  const handleSelectAll = () => {
    if (selectedVolunteers.size === filteredVolunteers.length) {
      setSelectedVolunteers(new Set())
    } else {
      setSelectedVolunteers(new Set(filteredVolunteers.map(v => v.id)))
    }
  }

  const handleBulkFlag = () => {
    setVolunteers(prev =>
      prev.map(vol =>
        selectedVolunteers.has(vol.id)
          ? { ...vol, flaggedForOutreach: true }
          : vol
      )
    )
    setSelectedVolunteers(new Set())
  }

  const handleBulkContact = () => {
    setVolunteers(prev =>
      prev.map(vol =>
        selectedVolunteers.has(vol.id)
          ? {
              ...vol,
              status: 'contacted',
              outreachAttempts: vol.outreachAttempts + 1,
              lastOutreachDate: new Date().toISOString().split('T')[0]
            }
          : vol
      )
    )
    setSelectedVolunteers(new Set())
  }

  const filteredVolunteers = volunteers
    .filter(vol => {
      if (filterStatus !== 'all' && vol.status !== filterStatus) return false
      if (searchTerm && !vol.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !vol.email.toLowerCase().includes(searchTerm.toLowerCase())) return false
      return true
    })
    .sort((a, b) => {
      if (sortBy === 'daysSinceActive') return b.daysSinceActive - a.daysSinceActive
      if (sortBy === 'totalHours') return b.totalHours - a.totalHours
      return a.name.localeCompare(b.name)
    })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'flagged': return 'bg-yellow-100 text-yellow-800'
      case 'contacted': return 'bg-blue-100 text-blue-800'
      case 'responded': return 'bg-green-100 text-green-800'
      case 'inactive': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getDaysSeverity = (days: number) => {
    if (days >= 120) return 'text-red-600 font-bold'
    if (days >= 90) return 'text-orange-600 font-semibold'
    if (days >= 60) return 'text-yellow-600 font-medium'
    return 'text-gray-600'
  }

  const stats = {
    total: volunteers.length,
    flagged: volunteers.filter(v => v.flaggedForOutreach).length,
    contacted: volunteers.filter(v => v.status === 'contacted').length,
    responded: volunteers.filter(v => v.status === 'responded').length
  }

  return (
    <div data-testid="systemflagsinactive" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Inactive Volunteer Management</h1>
          <p className="text-gray-600">
            System automatically flags volunteers who have been inactive for extended periods
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-sm text-gray-600 mb-1">Total Inactive</div>
            <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-sm text-gray-600 mb-1">Flagged for Outreach</div>
            <div className="text-2xl font-bold text-yellow-600">{stats.flagged}</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-sm text-gray-600 mb-1">Contacted</div>
            <div className="text-2xl font-bold text-blue-600">{stats.contacted}</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-sm text-gray-600 mb-1">Responded</div>
            <div className="text-2xl font-bold text-green-600">{stats.responded}</div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                Search
              </label>
              <input
                id="search"
                type="text"
                data-testid="systemflagsinactive-search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Name or email..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-1">
                Filter by Status
              </label>
              <select
                id="status-filter"
                data-testid="systemflagsinactive-status-filter"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="flagged">Flagged</option>
                <option value="contacted">Contacted</option>
                <option value="responded">Responded</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div>
              <label htmlFor="sort-by" className="block text-sm font-medium text-gray-700 mb-1">
                Sort By
              </label>
              <select
                id="sort-by"
                data-testid="systemflagsinactive-sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="daysSinceActive">Days Since Active</option>
                <option value="totalHours">Total Hours</option>
                <option value="name">Name</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                data-testid="systemflagsinactive-clear-filters"
                onClick={() => {
                  setSearchTerm('')
                  setFilterStatus('all')
                  setSortBy('daysSinceActive')
                }}
                className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedVolunteers.size > 0 && (
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-6">
            <div className="flex items-center justify-between">
              <span className="text-blue-900 font-medium">
                {selectedVolunteers.size} volunteer{selectedVolunteers.size !== 1 ? 's' : ''} selected
              </span>
              <div className="flex gap-2">
                <button
                  data-testid="systemflagsinactive-bulk-flag"
                  onClick={handleBulkFlag}
                  className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-colors"
                >
                  Flag Selected
                </button>
                <button
                  data-testid="systemflagsinactive-bulk-contact"
                  onClick={handleBulkContact}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Mark as Contacted
                </button>
                <button
                  data-testid="systemflagsinactive-deselect-all"
                  onClick={() => setSelectedVolunteers(new Set())}
                  className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                >
                  Deselect All
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Volunteer List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex items-center">
            <input
              type="checkbox"
              data-testid="systemflagsinactive-select-all"
              checked={selectedVolunteers.size === filteredVolunteers.length && filteredVolunteers.length > 0}
              onChange={handleSelectAll}
              className="h-4 w-4 text-blue-600 rounded border-gray-300 mr-3"
            />
            <span className="text-sm font-medium text-gray-700">
              {filteredVolunteers.length} volunteer{filteredVolunteers.length !== 1 ? 's' : ''} found
            </span>
          </div>

          <div data-testid="systemflagsinactive-list" className="divide-y divide-gray-200">
            {filteredVolunteers.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                No inactive volunteers found matching your filters
              </div>
            ) : (
              filteredVolunteers.map((volunteer) => (
                <div
                  key={volunteer.id}
                  data-testid="systemflagsinactive-item"
                  className="p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <input
                      type="checkbox"
                      data-testid={`systemflagsinactive-checkbox-${volunteer.id}`}
                      checked={selectedVolunteers.has(volunteer.id)}
                      onChange={() => handleToggleSelect(volunteer.id)}
                      className="mt-1 h-4 w-4 text-blue-600 rounded border-gray-300"
                    />

                    <div className="flex-1 grid grid-cols-1 md:grid-cols-6 gap-4">
                      {/* Volunteer Info */}
                      <div className="md:col-span-2">
                        <div className="font-semibold text-gray-900">{volunteer.name}</div>
                        <div className="text-sm text-gray-600">{volunteer.email}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          Total Hours: {volunteer.totalHours}
                        </div>
                      </div>

                      {/* Activity Info */}
                      <div className="md:col-span-1">
                        <div className="text-sm text-gray-600 mb-1">Last Active</div>
                        <div className="text-sm font-medium text-gray-900">{volunteer.lastActive}</div>
                        <div className={`text-sm mt-1 ${getDaysSeverity(volunteer.daysSinceActive)}`}>
                          {volunteer.daysSinceActive} days ago
                        </div>
                      </div>

                      {/* Outreach Info */}
                      <div className="md:col-span-1">
                        <div className="text-sm text-gray-600 mb-1">Outreach</div>
                        <div className="text-sm font-medium text-gray-900">
                          {volunteer.outreachAttempts} attempt{volunteer.outreachAttempts !== 1 ? 's' : ''}
                        </div>
                        {volunteer.lastOutreachDate && (
                          <div className="text-xs text-gray-500 mt-1">
                            Last: {volunteer.lastOutreachDate}
                          </div>
                        )}
                      </div>

                      {/* Status and Reason */}
                      <div className="md:col-span-1">
                        <span className={`inline-block px-2 py-1 text-xs rounded-full ${getStatusColor(volunteer.status)}`}>
                          {volunteer.status.charAt(0).toUpperCase() + volunteer.status.slice(1)}
                        </span>
                        <div className="text-xs text-gray-600 mt-2">{volunteer.reason}</div>
                      </div>

                      {/* Actions */}
                      <div className="md:col-span-1 flex flex-col gap-2">
                        <button
                          data-testid={`systemflagsinactive-toggle-flag-${volunteer.id}`}
                          onClick={() => handleToggleFlag(volunteer.id)}
                          className={`px-3 py-1 text-xs rounded-md transition-colors ${
                            volunteer.flaggedForOutreach
                              ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          }`}
                        >
                          {volunteer.flaggedForOutreach ? 'Unflag' : 'Flag'}
                        </button>
                        <button
                          data-testid={`systemflagsinactive-contact-${volunteer.id}`}
                          onClick={() => handleMarkContacted(volunteer.id)}
                          className="px-3 py-1 text-xs bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                        >
                          Mark Contacted
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Severity Legend</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-gray-600">30-59 days:</span>
              <span className="text-gray-600 font-medium">Monitoring</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-yellow-600">60-89 days:</span>
              <span className="text-yellow-600 font-medium">Warning</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-orange-600">90-119 days:</span>
              <span className="text-orange-600 font-semibold">Urgent</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-red-600">120+ days:</span>
              <span className="text-red-600 font-bold">Critical</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
