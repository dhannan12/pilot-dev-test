/**
 * CreateGet — Admin dashboard for viewing all absence reports via GET endpoint
 *
 * Features: absence report listing, filtering by status/date, search by student, export data, detailed view
 *
 * Ticket: SCRUM-1077 | Branch: proto/SCRUM-1070
 */

import { useState } from 'react'

interface AbsenceReport {
  id: string
  studentId: string
  studentName: string
  grade: string
  startDate: string
  endDate: string
  absenceType: string
  reason: string
  documentationRequired: boolean
  documentationSubmitted: boolean
  status: 'pending' | 'approved' | 'rejected' | 'under_review'
  submittedBy: string
  submittedAt: string
  reviewedBy?: string
  reviewedAt?: string
  notes?: string
}

const MOCK_ABSENCE_REPORTS: AbsenceReport[] = [
  {
    id: 'REP001',
    studentId: 'STU001',
    studentName: 'Olivia Martinez',
    grade: '10th Grade',
    startDate: '2026-08-20',
    endDate: '2026-08-20',
    absenceType: 'illness',
    reason: 'Flu symptoms with high fever',
    documentationRequired: true,
    documentationSubmitted: true,
    status: 'approved',
    submittedBy: 'parent@example.com',
    submittedAt: '2026-08-20T08:30:00Z',
    reviewedBy: 'admin@school.edu',
    reviewedAt: '2026-08-20T10:15:00Z',
    notes: 'Medical certificate provided',
  },
  {
    id: 'REP002',
    studentId: 'STU002',
    studentName: 'Ethan Thompson',
    grade: '9th Grade',
    startDate: '2026-08-19',
    endDate: '2026-08-21',
    absenceType: 'medical',
    reason: 'Dental surgery and recovery',
    documentationRequired: true,
    documentationSubmitted: false,
    status: 'pending',
    submittedBy: 'parent2@example.com',
    submittedAt: '2026-08-18T14:15:00Z',
  },
  {
    id: 'REP003',
    studentId: 'STU003',
    studentName: 'Sophia Anderson',
    grade: '11th Grade',
    startDate: '2026-08-18',
    endDate: '2026-08-18',
    absenceType: 'family',
    reason: 'Family emergency out of state',
    documentationRequired: false,
    documentationSubmitted: false,
    status: 'approved',
    submittedBy: 'parent3@example.com',
    submittedAt: '2026-08-18T09:00:00Z',
    reviewedBy: 'admin@school.edu',
    reviewedAt: '2026-08-18T11:30:00Z',
  },
  {
    id: 'REP004',
    studentId: 'STU004',
    studentName: 'Liam Foster',
    grade: '8th Grade',
    startDate: '2026-08-15',
    endDate: '2026-08-17',
    absenceType: 'religious',
    reason: 'Religious holiday observance',
    documentationRequired: false,
    documentationSubmitted: false,
    status: 'approved',
    submittedBy: 'parent4@example.com',
    submittedAt: '2026-08-14T16:45:00Z',
    reviewedBy: 'admin@school.edu',
    reviewedAt: '2026-08-14T18:00:00Z',
  },
  {
    id: 'REP005',
    studentId: 'STU005',
    studentName: 'Isabella Kim',
    grade: '12th Grade',
    startDate: '2026-08-12',
    endDate: '2026-08-14',
    absenceType: 'illness',
    reason: 'Stomach flu with complications',
    documentationRequired: true,
    documentationSubmitted: true,
    status: 'under_review',
    submittedBy: 'parent5@example.com',
    submittedAt: '2026-08-12T07:20:00Z',
    notes: 'Awaiting verification of medical certificate',
  },
  {
    id: 'REP006',
    studentId: 'STU006',
    studentName: 'Noah Johnson',
    grade: '10th Grade',
    startDate: '2026-08-10',
    endDate: '2026-08-10',
    absenceType: 'other',
    reason: 'College campus visit',
    documentationRequired: false,
    documentationSubmitted: false,
    status: 'rejected',
    submittedBy: 'parent6@example.com',
    submittedAt: '2026-08-09T12:30:00Z',
    reviewedBy: 'admin@school.edu',
    reviewedAt: '2026-08-09T15:45:00Z',
    notes: 'Does not meet excused absence criteria',
  },
  {
    id: 'REP007',
    studentId: 'STU007',
    studentName: 'Emma Davis',
    grade: '11th Grade',
    startDate: '2026-08-08',
    endDate: '2026-08-09',
    absenceType: 'medical',
    reason: 'Orthodontist appointment and follow-up',
    documentationRequired: true,
    documentationSubmitted: true,
    status: 'approved',
    submittedBy: 'parent7@example.com',
    submittedAt: '2026-08-07T10:00:00Z',
    reviewedBy: 'admin2@school.edu',
    reviewedAt: '2026-08-07T14:20:00Z',
  },
]

const ABSENCE_TYPE_LABELS: Record<string, string> = {
  illness: 'Illness',
  medical: 'Medical Appointment',
  family: 'Family Emergency',
  religious: 'Religious Observance',
  other: 'Other',
}

const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  approved: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
  under_review: 'bg-blue-100 text-blue-800',
}

export default function CreateGet() {
  const [reports] = useState<AbsenceReport[]>(MOCK_ABSENCE_REPORTS)
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedReport, setSelectedReport] = useState<AbsenceReport | null>(null)
  const [sortBy, setSortBy] = useState<'date' | 'student' | 'status'>('date')

  const filteredReports = reports
    .filter((report) => {
      if (filterStatus !== 'all' && report.status !== filterStatus) {
        return false
      }
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        return (
          report.studentName.toLowerCase().includes(query) ||
          report.studentId.toLowerCase().includes(query) ||
          report.id.toLowerCase().includes(query)
        )
      }
      return true
    })
    .sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
      }
      if (sortBy === 'student') {
        return a.studentName.localeCompare(b.studentName)
      }
      if (sortBy === 'status') {
        return a.status.localeCompare(b.status)
      }
      return 0
    })

  const statusCounts = {
    all: reports.length,
    pending: reports.filter((r) => r.status === 'pending').length,
    approved: reports.filter((r) => r.status === 'approved').length,
    rejected: reports.filter((r) => r.status === 'rejected').length,
    under_review: reports.filter((r) => r.status === 'under_review').length,
  }

  const handleExport = () => {
    const csvContent = [
      'ID,Student Name,Grade,Start Date,End Date,Absence Type,Status,Submitted At',
      ...filteredReports.map((r) =>
        [
          r.id,
          r.studentName,
          r.grade,
          r.startDate,
          r.endDate,
          ABSENCE_TYPE_LABELS[r.absenceType],
          r.status,
          new Date(r.submittedAt).toLocaleString(),
        ].join(',')
      ),
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `absence-reports-${new Date().toISOString().slice(0, 10)}.csv`
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div data-testid="createget" className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Absence Reports Dashboard
              </h1>
              <p className="text-gray-600">
                Admin view of all submitted absence reports (GET /api/absence-reports)
              </p>
            </div>
            <button
              data-testid="createget-export"
              onClick={handleExport}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-md transition-colors"
            >
              Export CSV
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-600 mb-1">Total Reports</p>
            <p className="text-2xl font-bold text-gray-900">{statusCounts.all}</p>
          </div>
          <div className="bg-yellow-50 rounded-lg shadow p-4">
            <p className="text-sm text-yellow-700 mb-1">Pending</p>
            <p className="text-2xl font-bold text-yellow-800">{statusCounts.pending}</p>
          </div>
          <div className="bg-green-50 rounded-lg shadow p-4">
            <p className="text-sm text-green-700 mb-1">Approved</p>
            <p className="text-2xl font-bold text-green-800">{statusCounts.approved}</p>
          </div>
          <div className="bg-red-50 rounded-lg shadow p-4">
            <p className="text-sm text-red-700 mb-1">Rejected</p>
            <p className="text-2xl font-bold text-red-800">{statusCounts.rejected}</p>
          </div>
          <div className="bg-blue-50 rounded-lg shadow p-4">
            <p className="text-sm text-blue-700 mb-1">Under Review</p>
            <p className="text-2xl font-bold text-blue-800">{statusCounts.under_review}</p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                Search
              </label>
              <input
                id="search"
                type="text"
                data-testid="createget-search"
                placeholder="Student name, ID, or report ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Status Filter */}
            <div>
              <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Status
              </label>
              <select
                id="status-filter"
                data-testid="createget-filter-status"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                <option value="under_review">Under Review</option>
              </select>
            </div>

            {/* Sort */}
            <div>
              <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-2">
                Sort By
              </label>
              <select
                id="sort"
                data-testid="createget-sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'date' | 'student' | 'status')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="date">Submission Date</option>
                <option value="student">Student Name</option>
                <option value="status">Status</option>
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Showing <span className="font-semibold">{filteredReports.length}</span> of{' '}
              <span className="font-semibold">{reports.length}</span> reports
            </p>
          </div>
        </div>

        {/* Reports List */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Absence Reports</h2>
          
          {filteredReports.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No reports found matching your criteria</p>
            </div>
          ) : (
            <div data-testid="createget-list" className="space-y-3">
              {filteredReports.map((report) => (
                <div
                  key={report.id}
                  data-testid="createget-item"
                  className="p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer"
                  onClick={() => setSelectedReport(report)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-gray-900 text-lg">
                          {report.studentName}
                        </h3>
                        <span className="text-sm text-gray-500">{report.grade}</span>
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${STATUS_COLORS[report.status]}`}>
                          {report.status.replace('_', ' ').toUpperCase()}
                        </span>
                        {report.documentationRequired && (
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                              report.documentationSubmitted
                                ? 'bg-green-100 text-green-700'
                                : 'bg-amber-100 text-amber-700'
                            }`}
                          >
                            {report.documentationSubmitted ? 'DOC ✓' : 'DOC PENDING'}
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Report ID</p>
                          <p className="text-sm font-medium text-gray-900">{report.id}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Absence Type</p>
                          <p className="text-sm font-medium text-gray-900">
                            {ABSENCE_TYPE_LABELS[report.absenceType]}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Dates</p>
                          <p className="text-sm font-medium text-gray-900">
                            {report.startDate}
                            {report.endDate !== report.startDate && ` to ${report.endDate}`}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Submitted</p>
                          <p className="text-sm font-medium text-gray-900">
                            {new Date(report.submittedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <p className="text-xs text-gray-500 mb-1">Reason</p>
                        <p className="text-sm text-gray-700">{report.reason}</p>
                      </div>

                      {report.notes && (
                        <div className="mt-2">
                          <p className="text-xs text-gray-500 mb-1">Admin Notes</p>
                          <p className="text-sm text-indigo-700 italic">{report.notes}</p>
                        </div>
                      )}
                    </div>

                    <button
                      data-testid="createget-view"
                      className="ml-4 text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedReport(report)
                      }}
                    >
                      View Details →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedReport && (
        <div
          data-testid="createget-modal"
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedReport(null)}
        >
          <div
            className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              {/* Modal Header */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">
                    Report Details
                  </h2>
                  <p className="text-sm text-gray-500">{selectedReport.id}</p>
                </div>
                <button
                  data-testid="createget-modal-close"
                  onClick={() => setSelectedReport(null)}
                  className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                >
                  ×
                </button>
              </div>

              {/* Student Info */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3">Student Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Name</p>
                    <p className="text-sm font-medium">{selectedReport.studentName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Grade</p>
                    <p className="text-sm font-medium">{selectedReport.grade}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Student ID</p>
                    <p className="text-sm font-medium">{selectedReport.studentId}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Status</p>
                    <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${STATUS_COLORS[selectedReport.status]}`}>
                      {selectedReport.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Absence Details */}
              <div className="mb-6 p-4 bg-indigo-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3">Absence Details</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Type</p>
                    <p className="text-sm font-medium">{ABSENCE_TYPE_LABELS[selectedReport.absenceType]}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Dates</p>
                    <p className="text-sm font-medium">
                      {selectedReport.startDate} to {selectedReport.endDate}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Reason</p>
                    <p className="text-sm">{selectedReport.reason}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Documentation</p>
                    <p className="text-sm">
                      {selectedReport.documentationRequired ? (
                        <span className={selectedReport.documentationSubmitted ? 'text-green-700' : 'text-amber-700'}>
                          Required • {selectedReport.documentationSubmitted ? 'Submitted ✓' : 'Pending'}
                        </span>
                      ) : (
                        <span className="text-gray-500">Not Required</span>
                      )}
                    </p>
                  </div>
                </div>
              </div>

              {/* Submission Info */}
              <div className="mb-6 p-4 bg-purple-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3">Submission Information</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Submitted By</p>
                    <p className="text-sm font-medium">{selectedReport.submittedBy}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Submitted At</p>
                    <p className="text-sm font-medium">
                      {new Date(selectedReport.submittedAt).toLocaleString()}
                    </p>
                  </div>
                  {selectedReport.reviewedBy && (
                    <>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Reviewed By</p>
                        <p className="text-sm font-medium">{selectedReport.reviewedBy}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Reviewed At</p>
                        <p className="text-sm font-medium">
                          {selectedReport.reviewedAt && new Date(selectedReport.reviewedAt).toLocaleString()}
                        </p>
                      </div>
                    </>
                  )}
                  {selectedReport.notes && (
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Admin Notes</p>
                      <p className="text-sm font-medium text-indigo-700">{selectedReport.notes}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  data-testid="createget-modal-approve"
                  className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors"
                >
                  Approve
                </button>
                <button
                  data-testid="createget-modal-reject"
                  className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-red-700 transition-colors"
                >
                  Reject
                </button>
                <button
                  data-testid="createget-modal-review"
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Review
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
