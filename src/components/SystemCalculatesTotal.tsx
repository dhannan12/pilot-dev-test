/**
 * SystemCalculatesTotal — Displays volunteer hours and calculates monthly totals
 *
 * Features: volunteer hour tracking, monthly total calculation, per-volunteer breakdown, date filtering, summary statistics
 *
 * Ticket: SCRUM-930 | Branch: proto/SCRUM-926
 */

import React, { useState, useMemo } from 'react'

interface VolunteerHour {
  id: string
  volunteerId: string
  volunteerName: string
  date: string
  hours: number
  activity: string
  status: 'approved' | 'pending' | 'rejected'
}

const mockVolunteerHours: VolunteerHour[] = [
  {
    id: '1',
    volunteerId: 'V001',
    volunteerName: 'Sarah Johnson',
    date: '2026-08-01',
    hours: 4.5,
    activity: 'Food Bank Distribution',
    status: 'approved'
  },
  {
    id: '2',
    volunteerId: 'V001',
    volunteerName: 'Sarah Johnson',
    date: '2026-08-05',
    hours: 3.0,
    activity: 'Community Outreach',
    status: 'approved'
  },
  {
    id: '3',
    volunteerId: 'V002',
    volunteerName: 'Michael Chen',
    date: '2026-08-02',
    hours: 6.0,
    activity: 'Fundraising Event',
    status: 'approved'
  },
  {
    id: '4',
    volunteerId: 'V002',
    volunteerName: 'Michael Chen',
    date: '2026-08-08',
    hours: 5.5,
    activity: 'Mentorship Program',
    status: 'approved'
  },
  {
    id: '5',
    volunteerId: 'V003',
    volunteerName: 'Emily Rodriguez',
    date: '2026-08-03',
    hours: 4.0,
    activity: 'Environmental Cleanup',
    status: 'approved'
  },
  {
    id: '6',
    volunteerId: 'V003',
    volunteerName: 'Emily Rodriguez',
    date: '2026-08-10',
    hours: 3.5,
    activity: 'Senior Care Assistance',
    status: 'approved'
  },
  {
    id: '7',
    volunteerId: 'V004',
    volunteerName: 'David Thompson',
    date: '2026-08-04',
    hours: 7.0,
    activity: 'Youth Mentoring',
    status: 'approved'
  },
  {
    id: '8',
    volunteerId: 'V004',
    volunteerName: 'David Thompson',
    date: '2026-08-12',
    hours: 4.5,
    activity: 'Food Bank Distribution',
    status: 'pending'
  },
  {
    id: '9',
    volunteerId: 'V005',
    volunteerName: 'Amanda Wilson',
    date: '2026-08-06',
    hours: 5.0,
    activity: 'Community Garden',
    status: 'approved'
  },
  {
    id: '10',
    volunteerId: 'V005',
    volunteerName: 'Amanda Wilson',
    date: '2026-08-14',
    hours: 6.5,
    activity: 'Literacy Program',
    status: 'approved'
  }
]

export default function SystemCalculatesTotal() {
  const [selectedMonth, setSelectedMonth] = useState('2026-08')
  const [filterStatus, setFilterStatus] = useState<'all' | 'approved' | 'pending' | 'rejected'>('all')

  // Filter hours by selected month and status
  const filteredHours = useMemo(() => {
    return mockVolunteerHours.filter(hour => {
      const matchesMonth = hour.date.startsWith(selectedMonth)
      const matchesStatus = filterStatus === 'all' || hour.status === filterStatus
      return matchesMonth && matchesStatus
    })
  }, [selectedMonth, filterStatus])

  // Calculate total hours
  const totalHours = useMemo(() => {
    return filteredHours.reduce((sum, hour) => sum + hour.hours, 0)
  }, [filteredHours])

  // Calculate hours by volunteer
  const hoursByVolunteer = useMemo(() => {
    const grouped = filteredHours.reduce((acc, hour) => {
      if (!acc[hour.volunteerId]) {
        acc[hour.volunteerId] = {
          volunteerName: hour.volunteerName,
          totalHours: 0,
          activities: 0
        }
      }
      acc[hour.volunteerId].totalHours += hour.hours
      acc[hour.volunteerId].activities += 1
      return acc
    }, {} as Record<string, { volunteerName: string; totalHours: number; activities: number }>)

    return Object.entries(grouped).map(([id, data]) => ({
      volunteerId: id,
      ...data
    }))
  }, [filteredHours])

  // Calculate status breakdown
  const statusBreakdown = useMemo(() => {
    return filteredHours.reduce((acc, hour) => {
      acc[hour.status] = (acc[hour.status] || 0) + hour.hours
      return acc
    }, {} as Record<string, number>)
  }, [filteredHours])

  return (
    <section data-testid="systemcalculatestotal" className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Volunteer Hours Calculator
          </h1>
          <p className="text-gray-600">
            Track and calculate total volunteer hours for the month
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Filters</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="month-select" className="block text-sm font-medium text-gray-700 mb-2">
                Select Month
              </label>
              <input
                id="month-select"
                type="month"
                data-testid="systemcalculatestotal-month"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="status-select" className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Status
              </label>
              <select
                id="status-select"
                data-testid="systemcalculatestotal-status"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Statuses</option>
                <option value="approved">Approved Only</option>
                <option value="pending">Pending Only</option>
                <option value="rejected">Rejected Only</option>
              </select>
            </div>
          </div>
        </div>

        {/* Total Hours Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
            <div className="text-sm font-medium opacity-90 mb-1">Total Hours</div>
            <div className="text-4xl font-bold">{totalHours.toFixed(1)}</div>
            <div className="text-sm opacity-75 mt-1">hours logged</div>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg p-6 text-white">
            <div className="text-sm font-medium opacity-90 mb-1">Approved</div>
            <div className="text-4xl font-bold">{(statusBreakdown.approved || 0).toFixed(1)}</div>
            <div className="text-sm opacity-75 mt-1">hours approved</div>
          </div>
          <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg shadow-lg p-6 text-white">
            <div className="text-sm font-medium opacity-90 mb-1">Pending</div>
            <div className="text-4xl font-bold">{(statusBreakdown.pending || 0).toFixed(1)}</div>
            <div className="text-sm opacity-75 mt-1">hours pending</div>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-lg p-6 text-white">
            <div className="text-sm font-medium opacity-90 mb-1">Volunteers</div>
            <div className="text-4xl font-bold">{hoursByVolunteer.length}</div>
            <div className="text-sm opacity-75 mt-1">active volunteers</div>
          </div>
        </div>

        {/* Hours by Volunteer */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Hours by Volunteer</h2>
          {hoursByVolunteer.length > 0 ? (
            <div data-testid="systemcalculatestotal-volunteer-list" className="space-y-3">
              {hoursByVolunteer
                .sort((a, b) => b.totalHours - a.totalHours)
                .map((volunteer) => (
                  <div
                    key={volunteer.volunteerId}
                    data-testid="systemcalculatestotal-volunteer-item"
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">
                        {volunteer.volunteerName}
                      </div>
                      <div className="text-sm text-gray-600">
                        ID: {volunteer.volunteerId} • {volunteer.activities} {volunteer.activities === 1 ? 'activity' : 'activities'}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600">
                        {volunteer.totalHours.toFixed(1)}
                      </div>
                      <div className="text-sm text-gray-500">hours</div>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No volunteer hours found for the selected period
            </div>
          )}
        </div>

        {/* Detailed Hours Log */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Detailed Hours Log</h2>
          {filteredHours.length > 0 ? (
            <div data-testid="systemcalculatestotal-hours-list" className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Volunteer</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Activity</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-700">Hours</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredHours
                    .sort((a, b) => b.date.localeCompare(a.date))
                    .map((hour) => (
                      <tr
                        key={hour.id}
                        data-testid="systemcalculatestotal-hours-item"
                        className="border-b border-gray-100 hover:bg-gray-50"
                      >
                        <td className="py-3 px-4 text-gray-900">
                          {new Date(hour.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </td>
                        <td className="py-3 px-4">
                          <div className="font-medium text-gray-900">{hour.volunteerName}</div>
                          <div className="text-sm text-gray-500">{hour.volunteerId}</div>
                        </td>
                        <td className="py-3 px-4 text-gray-700">{hour.activity}</td>
                        <td className="py-3 px-4 text-center font-semibold text-blue-600">
                          {hour.hours.toFixed(1)}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                              hour.status === 'approved'
                                ? 'bg-green-100 text-green-800'
                                : hour.status === 'pending'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {hour.status.charAt(0).toUpperCase() + hour.status.slice(1)}
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No hours logged for the selected period
            </div>
          )}
        </div>

        {/* Refresh Button */}
        <div className="mt-6 text-center">
          <button
            data-testid="systemcalculatestotal-refresh"
            onClick={() => {
              // In a real app, this would refresh data from the server
              setSelectedMonth('2026-08')
              setFilterStatus('all')
            }}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
          >
            Reset Filters
          </button>
        </div>
      </div>
    </section>
  )
}
