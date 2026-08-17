/**
 * BuildApplication — Application status tracking and management for hiring managers
 *
 * Features: Status updates, audit trail, application list, real-time notifications, status filtering
 *
 * Ticket: SCRUM-1018 | Branch: proto/SCRUM-1018
 */

import { useState } from 'react'

interface Application {
  id: string
  employeeName: string
  employeeEmail: string
  jobTitle: string
  department: string
  currentStatus: 'pending' | 'under_review' | 'shortlisted' | 'interview_scheduled' | 'rejected' | 'accepted'
  appliedDate: string
  coverNote: string
  gradeLevel: string
  hiringManager: string
}

interface AuditEntry {
  id: string
  applicationId: string
  timestamp: string
  action: string
  previousStatus?: string
  newStatus?: string
  updatedBy: string
}

// Mock data - 5+ realistic items
const mockApplications: Application[] = [
  {
    id: 'APP-001',
    employeeName: 'Sarah Johnson',
    employeeEmail: 'sarah.johnson@company.com',
    jobTitle: 'Senior Software Engineer',
    department: 'Engineering',
    currentStatus: 'under_review',
    appliedDate: '2026-08-10',
    coverNote: 'I have 8 years of experience in full-stack development and am excited about this opportunity to lead technical initiatives.',
    gradeLevel: 'L5',
    hiringManager: 'Michael Chen'
  },
  {
    id: 'APP-002',
    employeeName: 'David Martinez',
    employeeEmail: 'david.martinez@company.com',
    jobTitle: 'Product Manager',
    department: 'Product',
    currentStatus: 'shortlisted',
    appliedDate: '2026-08-12',
    coverNote: 'With 6 years in product management, I believe I can drive strategic product decisions and cross-functional collaboration.',
    gradeLevel: 'L4',
    hiringManager: 'Lisa Wang'
  },
  {
    id: 'APP-003',
    employeeName: 'Emily Rodriguez',
    employeeEmail: 'emily.rodriguez@company.com',
    jobTitle: 'Data Scientist',
    department: 'Analytics',
    currentStatus: 'interview_scheduled',
    appliedDate: '2026-08-08',
    coverNote: 'My background in machine learning and data analytics aligns perfectly with the requirements for this role.',
    gradeLevel: 'L4',
    hiringManager: 'James Wilson'
  },
  {
    id: 'APP-004',
    employeeName: 'Marcus Thompson',
    employeeEmail: 'marcus.thompson@company.com',
    jobTitle: 'UX Designer',
    department: 'Design',
    currentStatus: 'pending',
    appliedDate: '2026-08-15',
    coverNote: 'I am passionate about creating user-centered designs and have led multiple successful projects in my current role.',
    gradeLevel: 'L3',
    hiringManager: 'Sarah Kim'
  },
  {
    id: 'APP-005',
    employeeName: 'Jennifer Lee',
    employeeEmail: 'jennifer.lee@company.com',
    jobTitle: 'Marketing Manager',
    department: 'Marketing',
    currentStatus: 'accepted',
    appliedDate: '2026-08-05',
    coverNote: 'I have successfully managed multiple marketing campaigns and am ready to take on this leadership opportunity.',
    gradeLevel: 'L5',
    hiringManager: 'Robert Brown'
  },
  {
    id: 'APP-006',
    employeeName: 'Alex Kumar',
    employeeEmail: 'alex.kumar@company.com',
    jobTitle: 'DevOps Engineer',
    department: 'Engineering',
    currentStatus: 'rejected',
    appliedDate: '2026-08-07',
    coverNote: 'My expertise in cloud infrastructure and automation would be valuable to the team.',
    gradeLevel: 'L4',
    hiringManager: 'Michael Chen'
  }
]

const mockAuditTrail: AuditEntry[] = [
  {
    id: 'AUDIT-001',
    applicationId: 'APP-002',
    timestamp: '2026-08-13T10:30:00Z',
    action: 'Status Updated',
    previousStatus: 'under_review',
    newStatus: 'shortlisted',
    updatedBy: 'Lisa Wang'
  },
  {
    id: 'AUDIT-002',
    applicationId: 'APP-003',
    timestamp: '2026-08-14T14:15:00Z',
    action: 'Status Updated',
    previousStatus: 'shortlisted',
    newStatus: 'interview_scheduled',
    updatedBy: 'James Wilson'
  },
  {
    id: 'AUDIT-003',
    applicationId: 'APP-005',
    timestamp: '2026-08-16T09:00:00Z',
    action: 'Status Updated',
    previousStatus: 'interview_scheduled',
    newStatus: 'accepted',
    updatedBy: 'Robert Brown'
  },
  {
    id: 'AUDIT-004',
    applicationId: 'APP-006',
    timestamp: '2026-08-15T16:45:00Z',
    action: 'Status Updated',
    previousStatus: 'under_review',
    newStatus: 'rejected',
    updatedBy: 'Michael Chen'
  },
  {
    id: 'AUDIT-005',
    applicationId: 'APP-001',
    timestamp: '2026-08-11T11:20:00Z',
    action: 'Status Updated',
    previousStatus: 'pending',
    newStatus: 'under_review',
    updatedBy: 'Michael Chen'
  }
]

const statusColors = {
  pending: 'bg-gray-100 text-gray-800 border-gray-300',
  under_review: 'bg-blue-100 text-blue-800 border-blue-300',
  shortlisted: 'bg-purple-100 text-purple-800 border-purple-300',
  interview_scheduled: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  rejected: 'bg-red-100 text-red-800 border-red-300',
  accepted: 'bg-green-100 text-green-800 border-green-300'
}

const statusLabels = {
  pending: 'Pending',
  under_review: 'Under Review',
  shortlisted: 'Shortlisted',
  interview_scheduled: 'Interview Scheduled',
  rejected: 'Rejected',
  accepted: 'Accepted'
}

export default function BuildApplication() {
  const [applications, setApplications] = useState<Application[]>(mockApplications)
  const [auditTrail, setAuditTrail] = useState<AuditEntry[]>(mockAuditTrail)
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [showAuditModal, setShowAuditModal] = useState(false)

  const handleStatusUpdate = (applicationId: string, newStatus: Application['currentStatus']) => {
    const app = applications.find(a => a.id === applicationId)
    if (!app) return

    // Create audit entry
    const auditEntry: AuditEntry = {
      id: `AUDIT-${Date.now()}`,
      applicationId,
      timestamp: new Date().toISOString(),
      action: 'Status Updated',
      previousStatus: app.currentStatus,
      newStatus: newStatus,
      updatedBy: app.hiringManager
    }

    // Update application status
    setApplications(prev => 
      prev.map(a => a.id === applicationId ? { ...a, currentStatus: newStatus } : a)
    )

    // Add to audit trail
    setAuditTrail(prev => [auditEntry, ...prev])

    // Close modal
    setSelectedApplication(null)
  }

  const filteredApplications = filterStatus === 'all'
    ? applications
    : applications.filter(app => app.currentStatus === filterStatus)

  return (
    <div className="min-h-screen bg-gray-50 p-6" data-testid="build-application">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2" data-testid="build-application-title">
            Application Status Tracking
          </h1>
          <p className="text-gray-600">Manage and track internal job application statuses</p>
        </div>

        {/* Filters and Actions */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <label htmlFor="status-filter" className="text-sm font-medium text-gray-700">
                Filter by Status:
              </label>
              <select
                id="status-filter"
                data-testid="build-application-filter"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Applications</option>
                <option value="pending">Pending</option>
                <option value="under_review">Under Review</option>
                <option value="shortlisted">Shortlisted</option>
                <option value="interview_scheduled">Interview Scheduled</option>
                <option value="rejected">Rejected</option>
                <option value="accepted">Accepted</option>
              </select>
            </div>
            <button
              data-testid="build-application-audit-btn"
              onClick={() => setShowAuditModal(true)}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              View Audit Trail
            </button>
          </div>
        </div>

        {/* Applications List */}
        <div className="space-y-4" data-testid="build-application-list">
          {filteredApplications.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center text-gray-500">
              No applications found for the selected filter.
            </div>
          ) : (
            filteredApplications.map((app) => (
              <div
                key={app.id}
                data-testid="build-application-item"
                className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900" data-testid="build-application-item-name">
                        {app.employeeName}
                      </h3>
                      <span
                        data-testid="build-application-item-status"
                        className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[app.currentStatus]}`}
                      >
                        {statusLabels[app.currentStatus]}
                      </span>
                    </div>
                    <div className="space-y-1 text-sm text-gray-600 mb-3">
                      <p><span className="font-medium">Position:</span> {app.jobTitle}</p>
                      <p><span className="font-medium">Department:</span> {app.department}</p>
                      <p><span className="font-medium">Grade Level:</span> {app.gradeLevel}</p>
                      <p><span className="font-medium">Applied:</span> {new Date(app.appliedDate).toLocaleDateString()}</p>
                      <p><span className="font-medium">Hiring Manager:</span> {app.hiringManager}</p>
                    </div>
                    <div className="bg-gray-50 rounded p-3">
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">Cover Note:</span> {app.coverNote}
                      </p>
                    </div>
                  </div>
                  <button
                    data-testid="build-application-item-update"
                    onClick={() => setSelectedApplication(app)}
                    className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Update Status
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Update Status Modal */}
        {selectedApplication && (
          <div
            data-testid="build-application-modal"
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedApplication(null)}
          >
            <div
              className="bg-white rounded-lg shadow-xl max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-bold text-gray-900 mb-4" data-testid="build-application-modal-title">
                Update Application Status
              </h2>
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">
                  <span className="font-medium">Applicant:</span> {selectedApplication.employeeName}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  <span className="font-medium">Position:</span> {selectedApplication.jobTitle}
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  <span className="font-medium">Current Status:</span>{' '}
                  <span className={`px-2 py-1 rounded text-xs font-medium ${statusColors[selectedApplication.currentStatus]}`}>
                    {statusLabels[selectedApplication.currentStatus]}
                  </span>
                </p>
              </div>
              <div className="space-y-2 mb-6">
                <p className="text-sm font-medium text-gray-700 mb-2">Select New Status:</p>
                {Object.entries(statusLabels).map(([value, label]) => (
                  <button
                    key={value}
                    data-testid={`build-application-status-${value}`}
                    onClick={() => handleStatusUpdate(selectedApplication.id, value as Application['currentStatus'])}
                    disabled={selectedApplication.currentStatus === value}
                    className={`w-full px-4 py-2 rounded-lg text-left transition-colors ${
                      selectedApplication.currentStatus === value
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-gray-50 hover:bg-gray-100 text-gray-900'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <button
                data-testid="build-application-modal-cancel"
                onClick={() => setSelectedApplication(null)}
                className="w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Audit Trail Modal */}
        {showAuditModal && (
          <div
            data-testid="build-application-audit-modal"
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowAuditModal(false)}
          >
            <div
              className="bg-white rounded-lg shadow-xl max-w-3xl w-full p-6 max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-bold text-gray-900 mb-4" data-testid="build-application-audit-title">
                Audit Trail
              </h2>
              <div className="space-y-3" data-testid="build-application-audit-list">
                {auditTrail.map((entry) => {
                  const app = applications.find(a => a.id === entry.applicationId)
                  return (
                    <div
                      key={entry.id}
                      data-testid="build-application-audit-item"
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{entry.action}</p>
                          <p className="text-sm text-gray-600 mt-1">
                            Application: {app?.employeeName} - {app?.jobTitle}
                          </p>
                          {entry.previousStatus && entry.newStatus && (
                            <div className="flex items-center gap-2 mt-2">
                              <span className={`px-2 py-1 rounded text-xs font-medium ${statusColors[entry.previousStatus as Application['currentStatus']]}`}>
                                {statusLabels[entry.previousStatus as Application['currentStatus']]}
                              </span>
                              <span className="text-gray-400">→</span>
                              <span className={`px-2 py-1 rounded text-xs font-medium ${statusColors[entry.newStatus as Application['currentStatus']]}`}>
                                {statusLabels[entry.newStatus as Application['currentStatus']]}
                              </span>
                            </div>
                          )}
                          <p className="text-xs text-gray-500 mt-2">
                            Updated by {entry.updatedBy} on {new Date(entry.timestamp).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
              <button
                data-testid="build-application-audit-close"
                onClick={() => setShowAuditModal(false)}
                className="w-full mt-4 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
