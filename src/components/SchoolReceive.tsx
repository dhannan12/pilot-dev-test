/**
 * SchoolReceive — School administrator dashboard to receive and review structured absence submissions
 *
 * Features: submission inbox, filtering by status/date, detailed view, approval workflow, attendance record maintenance
 *
 * Ticket: SCRUM-1073 | Branch: proto/SCRUM-1070
 */

import { useState } from 'react'

interface AbsenceSubmission {
  id: string
  studentName: string
  studentId: string
  grade: string
  submittedBy: string
  submittedDate: string
  absenceDate: string
  absenceType: string
  reason: string
  documentation: string
  status: 'pending' | 'approved' | 'rejected'
}

const mockSubmissions: AbsenceSubmission[] = [
  {
    id: 'ABS-001',
    studentName: 'Emma Johnson',
    studentId: 'STU-2024-001',
    grade: '10th Grade',
    submittedBy: 'Sarah Johnson (Parent)',
    submittedDate: '2026-08-20',
    absenceDate: '2026-08-21',
    absenceType: 'Medical',
    reason: 'Doctor appointment for annual physical examination',
    documentation: 'Medical certificate attached',
    status: 'pending'
  },
  {
    id: 'ABS-002',
    studentName: 'Liam Chen',
    studentId: 'STU-2024-045',
    grade: '9th Grade',
    submittedBy: 'Michael Chen (Parent)',
    submittedDate: '2026-08-19',
    absenceDate: '2026-08-20',
    absenceType: 'Illness',
    reason: 'Flu symptoms - fever and cough',
    documentation: 'No documentation provided',
    status: 'approved'
  },
  {
    id: 'ABS-003',
    studentName: 'Olivia Martinez',
    studentId: 'STU-2024-089',
    grade: '11th Grade',
    submittedBy: 'Carlos Martinez (Parent)',
    submittedDate: '2026-08-18',
    absenceDate: '2026-08-19',
    absenceType: 'Family Emergency',
    reason: 'Family bereavement - grandmother passed away',
    documentation: 'Death certificate attached',
    status: 'approved'
  },
  {
    id: 'ABS-004',
    studentName: 'Noah Williams',
    studentId: 'STU-2024-123',
    grade: '10th Grade',
    submittedBy: 'Jennifer Williams (Parent)',
    submittedDate: '2026-08-17',
    absenceDate: '2026-08-18',
    absenceType: 'Personal',
    reason: 'College campus visit',
    documentation: 'University visit confirmation attached',
    status: 'pending'
  },
  {
    id: 'ABS-005',
    studentName: 'Sophia Anderson',
    studentId: 'STU-2024-156',
    grade: '12th Grade',
    submittedBy: 'David Anderson (Parent)',
    submittedDate: '2026-08-16',
    absenceDate: '2026-08-17',
    absenceType: 'Medical',
    reason: 'Dental surgery',
    documentation: 'Dental clinic receipt attached',
    status: 'approved'
  },
  {
    id: 'ABS-006',
    studentName: 'Ava Thompson',
    studentId: 'STU-2024-178',
    grade: '9th Grade',
    submittedBy: 'Lisa Thompson (Parent)',
    submittedDate: '2026-08-15',
    absenceDate: '2026-08-16',
    absenceType: 'Illness',
    reason: 'Stomach bug',
    documentation: 'No documentation provided',
    status: 'rejected'
  },
  {
    id: 'ABS-007',
    studentName: 'Ethan Brown',
    studentId: 'STU-2024-201',
    grade: '11th Grade',
    submittedBy: 'Mark Brown (Parent)',
    submittedDate: '2026-08-20',
    absenceDate: '2026-08-22',
    absenceType: 'Medical',
    reason: 'Physical therapy session',
    documentation: 'PT appointment confirmation attached',
    status: 'pending'
  }
]

export default function SchoolReceive() {
  const [submissions] = useState<AbsenceSubmission[]>(mockSubmissions)
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [selectedSubmission, setSelectedSubmission] = useState<AbsenceSubmission | null>(null)

  const filteredSubmissions = submissions.filter(sub => {
    if (statusFilter === 'all') return true
    return sub.status === statusFilter
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-300'
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-300'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  const handleApprove = (id: string) => {
    // In a real app, this would update the backend
    console.log(`Approved submission: ${id}`)
    setSelectedSubmission(null)
  }

  const handleReject = (id: string) => {
    // In a real app, this would update the backend
    console.log(`Rejected submission: ${id}`)
    setSelectedSubmission(null)
  }

  const pendingCount = submissions.filter(s => s.status === 'pending').length
  const approvedCount = submissions.filter(s => s.status === 'approved').length
  const rejectedCount = submissions.filter(s => s.status === 'rejected').length

  return (
    <div data-testid="schoolreceive" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Absence Submissions Dashboard
          </h1>
          <p className="text-gray-600">
            Review and process student absence reports to maintain accurate attendance records
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
            <div className="text-sm font-medium text-gray-600">Total Submissions</div>
            <div className="text-3xl font-bold text-gray-900 mt-2">{submissions.length}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-500">
            <div className="text-sm font-medium text-gray-600">Pending Review</div>
            <div className="text-3xl font-bold text-yellow-600 mt-2">{pendingCount}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
            <div className="text-sm font-medium text-gray-600">Approved</div>
            <div className="text-3xl font-bold text-green-600 mt-2">{approvedCount}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
            <div className="text-sm font-medium text-gray-600">Rejected</div>
            <div className="text-3xl font-bold text-red-600 mt-2">{rejectedCount}</div>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex items-center gap-4">
            <label htmlFor="status-filter" className="text-sm font-medium text-gray-700">
              Filter by Status:
            </label>
            <select
              id="status-filter"
              data-testid="schoolreceive-status-filter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Submissions</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
            <div className="text-sm text-gray-600 ml-auto">
              Showing {filteredSubmissions.length} of {submissions.length} submissions
            </div>
          </div>
        </div>

        {/* Submissions List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Submission ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Grade
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Absence Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody data-testid="schoolreceive-list" className="bg-white divide-y divide-gray-200">
                {filteredSubmissions.map((submission) => (
                  <tr
                    key={submission.id}
                    data-testid="schoolreceive-item"
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {submission.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{submission.studentName}</div>
                      <div className="text-sm text-gray-500">{submission.studentId}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {submission.grade}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {submission.absenceDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {submission.absenceType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${getStatusColor(submission.status)}`}>
                        {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        data-testid="schoolreceive-view"
                        onClick={() => setSelectedSubmission(submission)}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredSubmissions.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No submissions found matching the selected filter
            </div>
          )}
        </div>

        {/* Detail Modal */}
        {selectedSubmission && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div data-testid="schoolreceive-modal" className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                {/* Modal Header */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Absence Submission Details</h2>
                  <button
                    data-testid="schoolreceive-close"
                    onClick={() => setSelectedSubmission(null)}
                    className="text-gray-400 hover:text-gray-600 text-2xl"
                  >
                    ×
                  </button>
                </div>

                {/* Submission Info */}
                <div className="space-y-4 mb-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm font-medium text-gray-500">Submission ID</div>
                      <div className="text-base text-gray-900 mt-1">{selectedSubmission.id}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-500">Status</div>
                      <div className="mt-1">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${getStatusColor(selectedSubmission.status)}`}>
                          {selectedSubmission.status.charAt(0).toUpperCase() + selectedSubmission.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Student Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm font-medium text-gray-500">Student Name</div>
                        <div className="text-base text-gray-900 mt-1">{selectedSubmission.studentName}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-500">Student ID</div>
                        <div className="text-base text-gray-900 mt-1">{selectedSubmission.studentId}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-500">Grade</div>
                        <div className="text-base text-gray-900 mt-1">{selectedSubmission.grade}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-500">Submitted By</div>
                        <div className="text-base text-gray-900 mt-1">{selectedSubmission.submittedBy}</div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Absence Details</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm font-medium text-gray-500">Absence Date</div>
                        <div className="text-base text-gray-900 mt-1">{selectedSubmission.absenceDate}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-500">Submitted Date</div>
                        <div className="text-base text-gray-900 mt-1">{selectedSubmission.submittedDate}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-500">Absence Type</div>
                        <div className="text-base text-gray-900 mt-1">{selectedSubmission.absenceType}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-500">Documentation</div>
                        <div className="text-base text-gray-900 mt-1">{selectedSubmission.documentation}</div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="text-sm font-medium text-gray-500">Reason for Absence</div>
                      <div className="text-base text-gray-900 mt-1">{selectedSubmission.reason}</div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                {selectedSubmission.status === 'pending' && (
                  <div className="flex gap-3 pt-4 border-t border-gray-200">
                    <button
                      data-testid="schoolreceive-approve"
                      onClick={() => handleApprove(selectedSubmission.id)}
                      className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
                    >
                      Approve Absence
                    </button>
                    <button
                      data-testid="schoolreceive-reject"
                      onClick={() => handleReject(selectedSubmission.id)}
                      className="flex-1 bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors"
                    >
                      Reject Absence
                    </button>
                  </div>
                )}

                {selectedSubmission.status !== 'pending' && (
                  <div className="pt-4 border-t border-gray-200">
                    <button
                      data-testid="schoolreceive-close-btn"
                      onClick={() => setSelectedSubmission(null)}
                      className="w-full bg-gray-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors"
                    >
                      Close
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
