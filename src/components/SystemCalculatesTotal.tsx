/**
 * SystemCalculatesTotal — Displays and calculates total billable hours for the month
 *
 * Features: time entry listing, hourly rate display, automatic total calculation, monthly summary, detailed breakdown
 *
 * Ticket: SCRUM-895 | Branch: proto/SCRUM-892
 */

import React, { useMemo } from 'react'

interface TimeEntry {
  id: string
  date: string
  caseNumber: string
  caseName: string
  hours: number
  hourlyRate: number
  description: string
  attorney: string
}

const MOCK_TIME_ENTRIES: TimeEntry[] = [
  {
    id: '1',
    date: '2026-08-01',
    caseNumber: 'CASE-2024-001',
    caseName: 'Smith v. Johnson Corp',
    hours: 4.5,
    hourlyRate: 350,
    description: 'Client consultation and case review',
    attorney: 'Jennifer Martinez'
  },
  {
    id: '2',
    date: '2026-08-05',
    caseNumber: 'CASE-2024-002',
    caseName: 'Tech Solutions LLC v. DataCorp',
    hours: 6.0,
    hourlyRate: 400,
    description: 'Document preparation and contract analysis',
    attorney: 'Michael Chen'
  },
  {
    id: '3',
    date: '2026-08-08',
    caseNumber: 'CASE-2024-001',
    caseName: 'Smith v. Johnson Corp',
    hours: 3.5,
    hourlyRate: 350,
    description: 'Discovery review and witness preparation',
    attorney: 'Jennifer Martinez'
  },
  {
    id: '4',
    date: '2026-08-12',
    caseNumber: 'CASE-2024-003',
    caseName: 'Estate of Williams',
    hours: 5.5,
    hourlyRate: 325,
    description: 'Estate planning and trust documentation',
    attorney: 'Robert Taylor'
  },
  {
    id: '5',
    date: '2026-08-14',
    caseNumber: 'CASE-2024-002',
    caseName: 'Tech Solutions LLC v. DataCorp',
    hours: 8.0,
    hourlyRate: 400,
    description: 'Court appearance and motion hearing',
    attorney: 'Michael Chen'
  },
  {
    id: '6',
    date: '2026-08-15',
    caseNumber: 'CASE-2024-004',
    caseName: 'Rodriguez Personal Injury',
    hours: 2.5,
    hourlyRate: 300,
    description: 'Initial client intake and case assessment',
    attorney: 'Sarah Johnson'
  },
  {
    id: '7',
    date: '2026-08-15',
    caseNumber: 'CASE-2024-001',
    caseName: 'Smith v. Johnson Corp',
    hours: 4.0,
    hourlyRate: 350,
    description: 'Legal research and brief drafting',
    attorney: 'Jennifer Martinez'
  }
]

export default function SystemCalculatesTotal() {
  const { totalHours, totalBillable, entriesByCase } = useMemo(() => {
    const totalHours = MOCK_TIME_ENTRIES.reduce((sum, entry) => sum + entry.hours, 0)
    const totalBillable = MOCK_TIME_ENTRIES.reduce(
      (sum, entry) => sum + entry.hours * entry.hourlyRate,
      0
    )

    // Group entries by case for breakdown
    const entriesByCase = MOCK_TIME_ENTRIES.reduce((acc, entry) => {
      if (!acc[entry.caseNumber]) {
        acc[entry.caseNumber] = {
          caseName: entry.caseName,
          hours: 0,
          billable: 0,
          entries: []
        }
      }
      acc[entry.caseNumber].hours += entry.hours
      acc[entry.caseNumber].billable += entry.hours * entry.hourlyRate
      acc[entry.caseNumber].entries.push(entry)
      return acc
    }, {} as Record<string, { caseName: string; hours: number; billable: number; entries: TimeEntry[] }>)

    return { totalHours, totalBillable, entriesByCase }
  }, [])

  return (
    <div data-testid="systemcalculatestotal" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Billable Hours Summary
          </h1>
          <p className="text-gray-600">August 2026 - Month to Date</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div data-testid="systemcalculatestotal-total-hours-card" className="bg-white rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">
              Total Hours
            </div>
            <div className="mt-2 text-4xl font-bold text-blue-600">
              {totalHours.toFixed(1)}
            </div>
            <div className="mt-1 text-sm text-gray-500">
              hours logged this month
            </div>
          </div>

          <div data-testid="systemcalculatestotal-total-billable-card" className="bg-white rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">
              Total Billable
            </div>
            <div className="mt-2 text-4xl font-bold text-green-600">
              ${totalBillable.toLocaleString()}
            </div>
            <div className="mt-1 text-sm text-gray-500">
              in billable revenue
            </div>
          </div>

          <div data-testid="systemcalculatestotal-avg-rate-card" className="bg-white rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">
              Average Rate
            </div>
            <div className="mt-2 text-4xl font-bold text-purple-600">
              ${Math.round(totalBillable / totalHours)}
            </div>
            <div className="mt-1 text-sm text-gray-500">
              per hour across all cases
            </div>
          </div>
        </div>

        {/* Breakdown by Case */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Breakdown by Case
            </h2>
          </div>
          <div data-testid="systemcalculatestotal-case-list" className="divide-y divide-gray-200">
            {Object.entries(entriesByCase).map(([caseNumber, caseData]) => (
              <div
                key={caseNumber}
                data-testid="systemcalculatestotal-case-item"
                className="px-6 py-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="font-semibold text-gray-900">{caseData.caseName}</div>
                    <div className="text-sm text-gray-500">{caseNumber}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">
                      ${caseData.billable.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500">
                      {caseData.hours.toFixed(1)} hours
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Time Entries */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Detailed Time Entries
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Case
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Attorney
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hours
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rate
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody
                data-testid="systemcalculatestotal-list"
                className="bg-white divide-y divide-gray-200"
              >
                {MOCK_TIME_ENTRIES.map((entry) => (
                  <tr
                    key={entry.id}
                    data-testid="systemcalculatestotal-item"
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(entry.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                      })}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <div className="font-medium">{entry.caseName}</div>
                      <div className="text-gray-500 text-xs">{entry.caseNumber}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {entry.attorney}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {entry.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                      {entry.hours.toFixed(1)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                      ${entry.hourlyRate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-right">
                      ${(entry.hours * entry.hourlyRate).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-gray-50">
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                    Total:
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 text-right">
                    {totalHours.toFixed(1)}
                  </td>
                  <td className="px-6 py-4"></td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-600 text-right">
                    ${totalBillable.toLocaleString()}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
