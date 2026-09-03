/**
 * DailySummaryCount — Displays daily booking summary counts with calculated totals
 *
 * Features: daily booking aggregation, multiple service types, total count calculation, date-based grouping, summary statistics
 *
 * Ticket: SCRUM-1292 | Branch: proto/SCRUM-1288
 */

import React from 'react'

interface Booking {
  id: string
  date: string
  serviceName: string
  clientName: string
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled'
}

const MOCK_BOOKINGS: Booking[] = [
  {
    id: '1',
    date: '2026-09-03',
    serviceName: 'Haircut',
    clientName: 'John Doe',
    status: 'confirmed'
  },
  {
    id: '2',
    date: '2026-09-03',
    serviceName: 'Hair Coloring',
    clientName: 'Jane Smith',
    status: 'confirmed'
  },
  {
    id: '3',
    date: '2026-09-03',
    serviceName: 'Manicure',
    clientName: 'Alice Johnson',
    status: 'completed'
  },
  {
    id: '4',
    date: '2026-09-04',
    serviceName: 'Pedicure',
    clientName: 'Bob Williams',
    status: 'confirmed'
  },
  {
    id: '5',
    date: '2026-09-04',
    serviceName: 'Haircut',
    clientName: 'Carol Brown',
    status: 'pending'
  },
  {
    id: '6',
    date: '2026-09-04',
    serviceName: 'Facial',
    clientName: 'David Miller',
    status: 'confirmed'
  },
  {
    id: '7',
    date: '2026-09-05',
    serviceName: 'Massage',
    clientName: 'Emma Davis',
    status: 'confirmed'
  },
  {
    id: '8',
    date: '2026-09-05',
    serviceName: 'Haircut',
    clientName: 'Frank Garcia',
    status: 'cancelled'
  }
]

interface DailySummary {
  date: string
  totalBookings: number
  confirmed: number
  pending: number
  completed: number
  cancelled: number
}

export default function DailySummaryCount() {
  // Calculate daily summaries
  const dailySummaries: DailySummary[] = React.useMemo(() => {
    const summaryMap = new Map<string, DailySummary>()

    MOCK_BOOKINGS.forEach((booking) => {
      if (!summaryMap.has(booking.date)) {
        summaryMap.set(booking.date, {
          date: booking.date,
          totalBookings: 0,
          confirmed: 0,
          pending: 0,
          completed: 0,
          cancelled: 0
        })
      }

      const summary = summaryMap.get(booking.date)!
      summary.totalBookings++
      summary[booking.status]++
    })

    return Array.from(summaryMap.values()).sort((a, b) => a.date.localeCompare(b.date))
  }, [])

  // Calculate overall totals
  const overallTotal = dailySummaries.reduce((sum, day) => sum + day.totalBookings, 0)
  const overallConfirmed = dailySummaries.reduce((sum, day) => sum + day.confirmed, 0)
  const overallPending = dailySummaries.reduce((sum, day) => sum + day.pending, 0)
  const overallCompleted = dailySummaries.reduce((sum, day) => sum + day.completed, 0)
  const overallCancelled = dailySummaries.reduce((sum, day) => sum + day.cancelled, 0)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div data-testid="dailysummarycount" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Daily Booking Summary
          </h1>
          <p className="text-gray-600">
            View booking counts calculated by day and status
          </p>
        </header>

        {/* Overall Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
            <div className="text-sm font-medium text-gray-600 mb-1">Total Bookings</div>
            <div className="text-3xl font-bold text-gray-900">{overallTotal}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
            <div className="text-sm font-medium text-gray-600 mb-1">Confirmed</div>
            <div className="text-3xl font-bold text-green-600">{overallConfirmed}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-500">
            <div className="text-sm font-medium text-gray-600 mb-1">Pending</div>
            <div className="text-3xl font-bold text-yellow-600">{overallPending}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
            <div className="text-sm font-medium text-gray-600 mb-1">Completed</div>
            <div className="text-3xl font-bold text-purple-600">{overallCompleted}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
            <div className="text-sm font-medium text-gray-600 mb-1">Cancelled</div>
            <div className="text-3xl font-bold text-red-600">{overallCancelled}</div>
          </div>
        </div>

        {/* Daily Summary Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h2 className="text-xl font-semibold text-gray-900">Daily Breakdown</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Confirmed
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Pending
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Completed
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cancelled
                  </th>
                </tr>
              </thead>
              <tbody data-testid="dailysummarycount-list" className="bg-white divide-y divide-gray-200">
                {dailySummaries.map((summary) => (
                  <tr
                    key={summary.date}
                    data-testid="dailysummarycount-item"
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {formatDate(summary.date)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-semibold text-gray-900">
                      {summary.totalBookings}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {summary.confirmed}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        {summary.pending}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        {summary.completed}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        {summary.cancelled}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary Statistics */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6 border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Summary Statistics</h3>
          <p className="text-blue-800">
            Displaying {dailySummaries.length} day(s) with a total of {overallTotal} booking(s).
            Success rate: {overallTotal > 0 ? Math.round(((overallConfirmed + overallCompleted) / overallTotal) * 100) : 0}%
          </p>
        </div>
      </div>
    </div>
  )
}
