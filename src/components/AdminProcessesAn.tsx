/**
 * AdminProcessesAn — Admin processes an absence request within the time limit
 *
 * Features: View pending absence requests, approve/reject requests, track time limits, filter by status, view request details
 *
 * Ticket: SCRUM-943 | Branch: proto/SCRUM-938
 */

import React, { useState } from 'react'

interface AbsenceRequest {
  id: string
  studentName: string
  studentId: string
  requestDate: string
  absenceDate: string
  reason: string
  status: 'pending' | 'approved' | 'rejected'
  timeLimit: string
  hoursRemaining: number
  submittedBy: string
  notes?: string
}

const mockAbsenceRequests: AbsenceRequest[] = [
  {
    id: 'REQ001',
    studentName: 'Emma Watson',
    studentId: 'STU12345',
    requestDate: '2026-08-14',
    absenceDate: '2026-08-20',
    reason: 'Medical appointment',
    status: 'pending',
    timeLimit: '2026-08-16 14:00',
    hoursRemaining: 8,
    submittedBy: 'parent@example.com',
    notes: 'Follow-up appointment with specialist'
  },
  {
    id: 'REQ002',
    studentName: 'James Chen',
    studentId: 'STU12346',
    requestDate: '2026-08-15',
    absenceDate: '2026-08-18',
    reason: 'Family emergency',
    status: 'pending',
    timeLimit: '2026-08-17 15:30',
    hoursRemaining: 30,
    submittedBy: 'jchen@example.com',
    notes: 'Urgent family matter'
  },
  {
    id: 'REQ003',
    studentName: 'Sarah Johnson',
    studentId: 'STU12347',
    requestDate: '2026-08-13',
    absenceDate: '2026-08-17',
    reason: 'School trip conflict',
    status: 'approved',
    timeLimit: '2026-08-15 12:00',
    hoursRemaining: 0,
    submittedBy: 'sjohnson@example.com',
    notes: 'Pre-approved educational event'
  },
  {
    id: 'REQ004',
    studentName: 'Michael Brown',
    studentId: 'STU12348',
    requestDate: '2026-08-14',
    absenceDate: '2026-08-19',
    reason: 'Dental surgery',
    status: 'pending',
    timeLimit: '2026-08-16 16:00',
    hoursRemaining: 10,
    submittedBy: 'mbrown@example.com',
    notes: 'Requires recovery time'
  },
  {
    id: 'REQ005',
    studentName: 'Olivia Martinez',
    studentId: 'STU12349',
    requestDate: '2026-08-12',
    absenceDate: '2026-08-16',
    reason: 'Religious observance',
    status: 'rejected',
    timeLimit: '2026-08-14 10:00',
    hoursRemaining: 0,
    submittedBy: 'omartinez@example.com',
    notes: 'Insufficient documentation provided'
  },
  {
    id: 'REQ006',
    studentName: 'Daniel Kim',
    studentId: 'STU12350',
    requestDate: '2026-08-15',
    absenceDate: '2026-08-21',
    reason: 'College visit',
    status: 'pending',
    timeLimit: '2026-08-17 18:00',
    hoursRemaining: 33,
    submittedBy: 'dkim@example.com',
    notes: 'University campus tour scheduled'
  }
]

export default function AdminProcessesAn() {
  const [requests, setRequests] = useState<AbsenceRequest[]>(mockAbsenceRequests)
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [selectedRequest, setSelectedRequest] = useState<AbsenceRequest | null>(null)
  const [processingNotes, setProcessingNotes] = useState<string>('')

  const filteredRequests = requests.filter(req => 
    filterStatus === 'all' ? true : req.status === filterStatus
  )

  const handleApprove = (requestId: string) => {
    setRequests(prevRequests =>
      prevRequests.map(req =>
        req.id === requestId ? { ...req, status: 'approved' as const } : req
      )
    )
    setSelectedRequest(null)
    setProcessingNotes('')
  }

  const handleReject = (requestId: string) => {
    setRequests(prevRequests =>
      prevRequests.map(req =>
        req.id === requestId ? { ...req, status: 'rejected' as const } : req
      )
    )
    setSelectedRequest(null)
    setProcessingNotes('')
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'approved':
        return 'bg-green-100 text-green-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getUrgencyColor = (hours: number) => {
    if (hours <= 0) return 'text-gray-500'
    if (hours < 12) return 'text-red-600 font-bold'
    if (hours < 24) return 'text-orange-600 font-semibold'
    return 'text-blue-600'
  }

  return (
    <div data-testid="adminprocessesan" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Absence Request Processing
          </h1>
          <p className="text-gray-600">
            Review and process student absence requests within the designated time limit
          </p>
        </header>

        {/* Filter Controls */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <label htmlFor="filter-status" className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Status
          </label>
          <select
            id="filter-status"
            data-testid="adminprocessesan-filter"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full md:w-64 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Requests</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        {/* Requests List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Requests ({filteredRequests.length})
            </h2>
            <div data-testid="adminprocessesan-list" className="space-y-4">
              {filteredRequests.map((request) => (
                <div
                  key={request.id}
                  data-testid="adminprocessesan-item"
                  onClick={() => setSelectedRequest(request)}
                  className={`bg-white rounded-lg shadow-sm p-4 cursor-pointer transition-all hover:shadow-md border-2 ${
                    selectedRequest?.id === request.id
                      ? 'border-blue-500'
                      : 'border-transparent'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {request.studentName}
                      </h3>
                      <p className="text-sm text-gray-600">{request.studentId}</p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        request.status
                      )}`}
                    >
                      {request.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="space-y-1 text-sm">
                    <p className="text-gray-700">
                      <span className="font-medium">Reason:</span> {request.reason}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">Absence Date:</span>{' '}
                      {request.absenceDate}
                    </p>
                    <p className={getUrgencyColor(request.hoursRemaining)}>
                      <span className="font-medium">Time Remaining:</span>{' '}
                      {request.hoursRemaining > 0
                        ? `${request.hoursRemaining} hours`
                        : 'Expired'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Request Details and Processing Panel */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Request Details
            </h2>
            {selectedRequest ? (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {selectedRequest.studentName}
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm font-medium text-gray-600">
                        Student ID:
                      </span>
                      <p className="text-gray-900">{selectedRequest.studentId}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-600">
                        Request Date:
                      </span>
                      <p className="text-gray-900">{selectedRequest.requestDate}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-600">
                        Absence Date:
                      </span>
                      <p className="text-gray-900">{selectedRequest.absenceDate}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-600">
                        Reason:
                      </span>
                      <p className="text-gray-900">{selectedRequest.reason}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-600">
                        Submitted By:
                      </span>
                      <p className="text-gray-900">{selectedRequest.submittedBy}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-600">
                        Notes:
                      </span>
                      <p className="text-gray-900">
                        {selectedRequest.notes || 'No additional notes'}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-600">
                        Time Limit:
                      </span>
                      <p className={getUrgencyColor(selectedRequest.hoursRemaining)}>
                        {selectedRequest.timeLimit}
                        {selectedRequest.hoursRemaining > 0 &&
                          ` (${selectedRequest.hoursRemaining} hours remaining)`}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-600">
                        Status:
                      </span>
                      <span
                        className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          selectedRequest.status
                        )}`}
                      >
                        {selectedRequest.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>

                {selectedRequest.status === 'pending' && (
                  <div>
                    <label
                      htmlFor="processing-notes"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Processing Notes (Optional)
                    </label>
                    <textarea
                      id="processing-notes"
                      data-testid="adminprocessesan-notes"
                      value={processingNotes}
                      onChange={(e) => setProcessingNotes(e.target.value)}
                      placeholder="Add notes about your decision..."
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                    />
                    <div className="flex gap-3">
                      <button
                        data-testid="adminprocessesan-approve"
                        onClick={() => handleApprove(selectedRequest.id)}
                        className="flex-1 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors font-medium"
                      >
                        Approve Request
                      </button>
                      <button
                        data-testid="adminprocessesan-reject"
                        onClick={() => handleReject(selectedRequest.id)}
                        className="flex-1 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors font-medium"
                      >
                        Reject Request
                      </button>
                    </div>
                  </div>
                )}

                {selectedRequest.status !== 'pending' && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-md">
                    <p className="text-sm text-gray-600">
                      This request has already been{' '}
                      <span className="font-semibold">{selectedRequest.status}</span>
                      .
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-6 text-center text-gray-500">
                <p>Select a request from the list to view details and process it</p>
              </div>
            )}
          </div>
        </div>

        {/* Summary Statistics */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h3 className="text-sm font-medium text-gray-600 mb-1">
              Pending Requests
            </h3>
            <p className="text-2xl font-bold text-yellow-600">
              {requests.filter((r) => r.status === 'pending').length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h3 className="text-sm font-medium text-gray-600 mb-1">
              Approved Requests
            </h3>
            <p className="text-2xl font-bold text-green-600">
              {requests.filter((r) => r.status === 'approved').length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h3 className="text-sm font-medium text-gray-600 mb-1">
              Rejected Requests
            </h3>
            <p className="text-2xl font-bold text-red-600">
              {requests.filter((r) => r.status === 'rejected').length}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
