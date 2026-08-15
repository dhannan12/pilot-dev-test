/**
 * DashboardDisplaysActive — Dashboard displays active cases and total billable hours
 *
 * Features: active case list, billable hours summary, case status indicators, client information, time tracking
 *
 * Ticket: SCRUM-899 | Branch: proto/SCRUM-892
 */

import React from 'react'

interface Case {
  id: string
  caseNumber: string
  clientName: string
  caseType: string
  status: 'active' | 'pending' | 'on-hold'
  startDate: string
  assignedSolicitor: string
  billableHours: number
  lastActivity: string
}

const mockCases: Case[] = [
  {
    id: '1',
    caseNumber: 'CASE-2024-001',
    clientName: 'Acme Corporation',
    caseType: 'Corporate Litigation',
    status: 'active',
    startDate: '2024-01-15',
    assignedSolicitor: 'Sarah Mitchell',
    billableHours: 45.5,
    lastActivity: '2024-08-14'
  },
  {
    id: '2',
    caseNumber: 'CASE-2024-007',
    clientName: 'Global Tech Industries',
    caseType: 'Contract Dispute',
    status: 'active',
    startDate: '2024-03-22',
    assignedSolicitor: 'James Patterson',
    billableHours: 32.0,
    lastActivity: '2024-08-15'
  },
  {
    id: '3',
    caseNumber: 'CASE-2024-012',
    clientName: 'Metropolitan Housing Ltd',
    caseType: 'Property Law',
    status: 'active',
    startDate: '2024-05-10',
    assignedSolicitor: 'Emma Thompson',
    billableHours: 28.5,
    lastActivity: '2024-08-13'
  },
  {
    id: '4',
    caseNumber: 'CASE-2024-018',
    clientName: 'Sterling Financial Group',
    caseType: 'Banking Regulation',
    status: 'pending',
    startDate: '2024-06-18',
    assignedSolicitor: 'Michael Chen',
    billableHours: 15.0,
    lastActivity: '2024-08-12'
  },
  {
    id: '5',
    caseNumber: 'CASE-2024-023',
    clientName: 'Horizon Pharmaceuticals',
    caseType: 'Intellectual Property',
    status: 'active',
    startDate: '2024-07-05',
    assignedSolicitor: 'Rachel Williams',
    billableHours: 52.0,
    lastActivity: '2024-08-15'
  },
  {
    id: '6',
    caseNumber: 'CASE-2024-029',
    clientName: 'Greenfield Energy Co',
    caseType: 'Environmental Law',
    status: 'on-hold',
    startDate: '2024-07-20',
    assignedSolicitor: 'David Brown',
    billableHours: 18.5,
    lastActivity: '2024-08-10'
  },
  {
    id: '7',
    caseNumber: 'CASE-2024-031',
    clientName: 'Riverside Logistics',
    caseType: 'Employment Law',
    status: 'active',
    startDate: '2024-08-01',
    assignedSolicitor: 'Lisa Anderson',
    billableHours: 22.0,
    lastActivity: '2024-08-14'
  }
]

export default function DashboardDisplaysActive() {
  const activeCases = mockCases.filter(c => c.status === 'active')
  const totalBillableHours = mockCases.reduce((sum, c) => sum + c.billableHours, 0)
  const activeHours = activeCases.reduce((sum, c) => sum + c.billableHours, 0)

  const getStatusColor = (status: Case['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'on-hold':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div data-testid="dashboarddisplaysactive" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Legal Case Tracker Dashboard</h1>
          <p className="text-gray-600">Monitor active cases and billable hours</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Cases</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{activeCases.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Billable Hours</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{totalBillableHours.toFixed(1)}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Hours</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{activeHours.toFixed(1)}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Active Cases Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Active Cases</h2>
            <button 
              data-testid="dashboarddisplaysactive-refresh"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Refresh
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Case Number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Client
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Solicitor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Billable Hours
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Activity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody data-testid="dashboarddisplaysactive-list" className="bg-white divide-y divide-gray-200">
                {mockCases.map((caseItem) => (
                  <tr 
                    key={caseItem.id} 
                    data-testid="dashboarddisplaysactive-item"
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{caseItem.caseNumber}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{caseItem.clientName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">{caseItem.caseType}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(caseItem.status)}`}>
                        {caseItem.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{caseItem.assignedSolicitor}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900">{caseItem.billableHours.toFixed(1)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">{caseItem.lastActivity}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button 
                        data-testid="dashboarddisplaysactive-view"
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        View
                      </button>
                      <button 
                        data-testid="dashboarddisplaysactive-edit"
                        className="text-gray-600 hover:text-gray-900"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Cases by Status</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Active</span>
                <span className="text-sm font-semibold text-gray-900">{activeCases.length} cases</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Pending</span>
                <span className="text-sm font-semibold text-gray-900">
                  {mockCases.filter(c => c.status === 'pending').length} cases
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">On Hold</span>
                <span className="text-sm font-semibold text-gray-900">
                  {mockCases.filter(c => c.status === 'on-hold').length} cases
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Billable Hours by Status</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Active Cases</span>
                <span className="text-sm font-semibold text-gray-900">{activeHours.toFixed(1)} hrs</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Pending Cases</span>
                <span className="text-sm font-semibold text-gray-900">
                  {mockCases.filter(c => c.status === 'pending').reduce((sum, c) => sum + c.billableHours, 0).toFixed(1)} hrs
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">On Hold Cases</span>
                <span className="text-sm font-semibold text-gray-900">
                  {mockCases.filter(c => c.status === 'on-hold').reduce((sum, c) => sum + c.billableHours, 0).toFixed(1)} hrs
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
