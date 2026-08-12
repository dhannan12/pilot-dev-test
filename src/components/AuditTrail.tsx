/**
 * AuditTrail — Display and export audit trail logs for compliance tracking
 *
 * Features: audit log display, filter by action/user/date, export to CSV/JSON, search functionality, pagination
 *
 * Ticket: SCRUM-668 | Branch: proto/SCRUM-658
 */

import { useState } from 'react'

interface AuditLog {
  id: string
  timestamp: string
  userId: string
  userName: string
  action: string
  entityType: string
  entityId: string
  details: string
  ipAddress: string
  userAgent: string
  status: 'success' | 'failure' | 'warning'
}

const MOCK_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'LOG-001',
    timestamp: '2026-08-12T14:30:25Z',
    userId: 'USR-101',
    userName: 'Sarah Mitchell',
    action: 'Document Viewed',
    entityType: 'document',
    entityId: 'DOC-45789',
    details: 'Viewed contract document: NDA Agreement 2026',
    ipAddress: '192.168.1.105',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    status: 'success'
  },
  {
    id: 'LOG-002',
    timestamp: '2026-08-12T14:28:15Z',
    userId: 'USR-102',
    userName: 'James Rodriguez',
    action: 'Document Modified',
    entityType: 'document',
    entityId: 'DOC-45790',
    details: 'Updated terms and conditions in Master Service Agreement',
    ipAddress: '192.168.1.110',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    status: 'success'
  },
  {
    id: 'LOG-003',
    timestamp: '2026-08-12T14:25:40Z',
    userId: 'USR-103',
    userName: 'Emily Chen',
    action: 'User Login',
    entityType: 'user',
    entityId: 'USR-103',
    details: 'Successful login from Chrome browser',
    ipAddress: '192.168.1.115',
    userAgent: 'Mozilla/5.0 (X11; Linux x86_64) Chrome/126.0.0.0',
    status: 'success'
  },
  {
    id: 'LOG-004',
    timestamp: '2026-08-12T14:20:10Z',
    userId: 'USR-104',
    userName: 'Michael Thompson',
    action: 'Failed Login Attempt',
    entityType: 'user',
    entityId: 'USR-104',
    details: 'Invalid password entered',
    ipAddress: '192.168.1.120',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    status: 'failure'
  },
  {
    id: 'LOG-005',
    timestamp: '2026-08-12T14:15:55Z',
    userId: 'USR-105',
    userName: 'Linda Garcia',
    action: 'Document Deleted',
    entityType: 'document',
    entityId: 'DOC-45791',
    details: 'Deleted outdated contract template',
    ipAddress: '192.168.1.125',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Firefox/128.0',
    status: 'success'
  },
  {
    id: 'LOG-006',
    timestamp: '2026-08-12T14:10:30Z',
    userId: 'USR-106',
    userName: 'Robert Kim',
    action: 'Document Created',
    entityType: 'document',
    entityId: 'DOC-45792',
    details: 'Created new employment agreement template',
    ipAddress: '192.168.1.130',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Safari/17.5',
    status: 'success'
  },
  {
    id: 'LOG-007',
    timestamp: '2026-08-12T14:05:20Z',
    userId: 'USR-107',
    userName: 'Patricia Williams',
    action: 'Permission Changed',
    entityType: 'user',
    entityId: 'USR-108',
    details: 'Granted admin access to user account',
    ipAddress: '192.168.1.135',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    status: 'warning'
  },
  {
    id: 'LOG-008',
    timestamp: '2026-08-12T14:00:15Z',
    userId: 'USR-108',
    userName: 'David Martinez',
    action: 'Document Exported',
    entityType: 'document',
    entityId: 'DOC-45793',
    details: 'Exported audit trail report to CSV',
    ipAddress: '192.168.1.140',
    userAgent: 'Mozilla/5.0 (X11; Linux x86_64) Chrome/126.0.0.0',
    status: 'success'
  }
]

export default function AuditTrail() {
  const [logs] = useState<AuditLog[]>(MOCK_AUDIT_LOGS)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterAction, setFilterAction] = useState<string>('all')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const uniqueActions = Array.from(new Set(logs.map(log => log.action)))

  const filteredLogs = logs.filter(log => {
    const matchesSearch = searchTerm === '' || 
      log.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.entityId.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesAction = filterAction === 'all' || log.action === filterAction
    const matchesStatus = filterStatus === 'all' || log.status === filterStatus

    return matchesSearch && matchesAction && matchesStatus
  })

  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedLogs = filteredLogs.slice(startIndex, startIndex + itemsPerPage)

  const handleExportCSV = () => {
    const headers = ['ID', 'Timestamp', 'User', 'Action', 'Entity Type', 'Entity ID', 'Details', 'IP Address', 'Status']
    const csvContent = [
      headers.join(','),
      ...filteredLogs.map(log => [
        log.id,
        log.timestamp,
        `"${log.userName}"`,
        `"${log.action}"`,
        log.entityType,
        log.entityId,
        `"${log.details}"`,
        log.ipAddress,
        log.status
      ].join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `audit-trail-${new Date().toISOString()}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const handleExportJSON = () => {
    const jsonContent = JSON.stringify(filteredLogs, null, 2)
    const blob = new Blob([jsonContent], { type: 'application/json' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `audit-trail-${new Date().toISOString()}.json`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-800'
      case 'failure':
        return 'bg-red-100 text-red-800'
      case 'warning':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Audit Trail</h1>
              <p className="text-gray-600 mt-2">Monitor and export system activity logs</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleExportCSV}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Export CSV
              </button>
              <button
                onClick={handleExportJSON}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Export JSON
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-blue-600 font-medium">Total Logs</p>
              <p className="text-2xl font-bold text-blue-900 mt-1">{logs.length}</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-sm text-green-600 font-medium">Success</p>
              <p className="text-2xl font-bold text-green-900 mt-1">
                {logs.filter(l => l.status === 'success').length}
              </p>
            </div>
            <div className="bg-red-50 rounded-lg p-4">
              <p className="text-sm text-red-600 font-medium">Failures</p>
              <p className="text-2xl font-bold text-red-900 mt-1">
                {logs.filter(l => l.status === 'failure').length}
              </p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4">
              <p className="text-sm text-yellow-600 font-medium">Warnings</p>
              <p className="text-2xl font-bold text-yellow-900 mt-1">
                {logs.filter(l => l.status === 'warning').length}
              </p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="search-input" className="block text-sm font-medium text-gray-700 mb-2">
                Search
              </label>
              <input
                id="search-input"
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setCurrentPage(1)
                }}
                placeholder="Search by user, details, or entity..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="action-filter" className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Action
              </label>
              <select
                id="action-filter"
                value={filterAction}
                onChange={(e) => {
                  setFilterAction(e.target.value)
                  setCurrentPage(1)
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Actions</option>
                {uniqueActions.map(action => (
                  <option key={action} value={action}>{action}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Status
              </label>
              <select
                id="status-filter"
                value={filterStatus}
                onChange={(e) => {
                  setFilterStatus(e.target.value)
                  setCurrentPage(1)
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Statuses</option>
                <option value="success">Success</option>
                <option value="failure">Failure</option>
                <option value="warning">Warning</option>
              </select>
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredLogs.length} of {logs.length} logs
          </div>
        </div>

        {/* Audit Logs Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Timestamp
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Entity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    IP Address
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatTimestamp(log.timestamp)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{log.userName}</div>
                      <div className="text-xs text-gray-500">{log.userId}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {log.action}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{log.entityType}</div>
                      <div className="text-xs text-gray-500">{log.entityId}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 max-w-xs">
                      <div className="truncate" title={log.details}>
                        {log.details}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {log.ipAddress}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(log.status)}`}>
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>

        {/* No Results */}
        {filteredLogs.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <div className="text-gray-400 text-lg mb-2">No audit logs found</div>
            <p className="text-gray-500 text-sm">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  )
}
