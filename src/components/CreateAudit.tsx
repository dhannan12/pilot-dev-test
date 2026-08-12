/**
 * CreateAudit — Create and manage audit logs and approval workflows
 *
 * Features: audit trail creation, approval workflow setup, status tracking, user assignment, timestamp management
 *
 * Ticket: SCRUM-664 | Branch: proto/SCRUM-658
 */

import { useState } from 'react'

interface AuditEntry {
  id: string
  action: string
  entityType: string
  entityId: string
  userId: string
  userName: string
  timestamp: string
  details: string
  status: 'pending' | 'approved' | 'rejected'
}

interface ApprovalWorkflow {
  id: string
  documentId: string
  documentName: string
  requestedBy: string
  requestedAt: string
  approverIds: string[]
  approverNames: string[]
  status: 'pending' | 'approved' | 'rejected' | 'in_review'
  priority: 'low' | 'medium' | 'high' | 'critical'
  dueDate: string
}

const MOCK_AUDIT_ENTRIES: AuditEntry[] = [
  {
    id: 'AUD-001',
    action: 'Document Created',
    entityType: 'document',
    entityId: 'DOC-12345',
    userId: 'USR-001',
    userName: 'Alice Johnson',
    timestamp: '2026-08-12T10:30:00Z',
    details: 'Created new contract document',
    status: 'approved'
  },
  {
    id: 'AUD-002',
    action: 'Document Modified',
    entityType: 'document',
    entityId: 'DOC-12346',
    userId: 'USR-002',
    userName: 'Bob Smith',
    timestamp: '2026-08-12T11:15:00Z',
    details: 'Updated terms and conditions section',
    status: 'pending'
  },
  {
    id: 'AUD-003',
    action: 'User Access Granted',
    entityType: 'user',
    entityId: 'USR-003',
    userId: 'USR-004',
    userName: 'Carol Davis',
    timestamp: '2026-08-12T12:00:00Z',
    details: 'Granted admin access to legal team',
    status: 'approved'
  },
  {
    id: 'AUD-004',
    action: 'Document Deleted',
    entityType: 'document',
    entityId: 'DOC-12347',
    userId: 'USR-005',
    userName: 'David Wilson',
    timestamp: '2026-08-12T13:45:00Z',
    details: 'Deleted expired contract',
    status: 'rejected'
  },
  {
    id: 'AUD-005',
    action: 'Approval Requested',
    entityType: 'approval',
    entityId: 'APR-001',
    userId: 'USR-006',
    userName: 'Emma Brown',
    timestamp: '2026-08-12T14:20:00Z',
    details: 'Requested approval for NDA document',
    status: 'pending'
  },
  {
    id: 'AUD-006',
    action: 'Document Reviewed',
    entityType: 'document',
    entityId: 'DOC-12348',
    userId: 'USR-007',
    userName: 'Frank Miller',
    timestamp: '2026-08-12T15:10:00Z',
    details: 'Completed legal review of partnership agreement',
    status: 'approved'
  }
]

const MOCK_APPROVAL_WORKFLOWS: ApprovalWorkflow[] = [
  {
    id: 'APR-001',
    documentId: 'DOC-12345',
    documentName: 'Non-Disclosure Agreement',
    requestedBy: 'Alice Johnson',
    requestedAt: '2026-08-10T09:00:00Z',
    approverIds: ['USR-001', 'USR-002'],
    approverNames: ['John Doe', 'Jane Smith'],
    status: 'pending',
    priority: 'high',
    dueDate: '2026-08-15T17:00:00Z'
  },
  {
    id: 'APR-002',
    documentId: 'DOC-12346',
    documentName: 'Employment Contract',
    requestedBy: 'Bob Smith',
    requestedAt: '2026-08-11T10:30:00Z',
    approverIds: ['USR-003', 'USR-004', 'USR-005'],
    approverNames: ['Sarah Johnson', 'Mike Brown', 'Lisa Davis'],
    status: 'in_review',
    priority: 'medium',
    dueDate: '2026-08-18T17:00:00Z'
  },
  {
    id: 'APR-003',
    documentId: 'DOC-12347',
    documentName: 'Vendor Agreement',
    requestedBy: 'Carol Davis',
    requestedAt: '2026-08-09T14:00:00Z',
    approverIds: ['USR-006'],
    approverNames: ['Tom Wilson'],
    status: 'approved',
    priority: 'low',
    dueDate: '2026-08-14T17:00:00Z'
  },
  {
    id: 'APR-004',
    documentId: 'DOC-12348',
    documentName: 'Partnership Agreement',
    requestedBy: 'David Wilson',
    requestedAt: '2026-08-12T08:00:00Z',
    approverIds: ['USR-007', 'USR-008'],
    approverNames: ['Emma Clark', 'Robert Lee'],
    status: 'rejected',
    priority: 'critical',
    dueDate: '2026-08-13T17:00:00Z'
  },
  {
    id: 'APR-005',
    documentId: 'DOC-12349',
    documentName: 'Service Level Agreement',
    requestedBy: 'Emma Brown',
    requestedAt: '2026-08-12T11:30:00Z',
    approverIds: ['USR-009'],
    approverNames: ['Kevin Martinez'],
    status: 'pending',
    priority: 'high',
    dueDate: '2026-08-16T17:00:00Z'
  }
]

export default function CreateAudit() {
  const [activeTab, setActiveTab] = useState<'audit' | 'approval'>('audit')
  const [selectedAudit, setSelectedAudit] = useState<AuditEntry | null>(null)
  const [selectedApproval, setSelectedApproval] = useState<ApprovalWorkflow | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>('all')

  const filteredAudits = filterStatus === 'all' 
    ? MOCK_AUDIT_ENTRIES 
    : MOCK_AUDIT_ENTRIES.filter(a => a.status === filterStatus)

  const filteredApprovals = filterStatus === 'all'
    ? MOCK_APPROVAL_WORKFLOWS
    : MOCK_APPROVAL_WORKFLOWS.filter(a => a.status === filterStatus)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800'
      case 'rejected': return 'bg-red-100 text-red-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'in_review': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800'
      case 'high': return 'bg-orange-100 text-orange-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Audit & Approval Management
          </h1>
          <p className="text-gray-600">
            Create and manage audit trails and approval workflows
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <div className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('audit')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'audit'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Audit Logs
              </button>
              <button
                onClick={() => setActiveTab('approval')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'approval'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Approval Workflows
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-4">
              <label className="text-sm font-medium text-gray-700">
                Filter by Status:
              </label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                {activeTab === 'approval' && <option value="in_review">In Review</option>}
              </select>
              <div className="flex-1"></div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                + Create New {activeTab === 'audit' ? 'Audit' : 'Approval'}
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* List View */}
          <div className="lg:col-span-2 space-y-4">
            {activeTab === 'audit' ? (
              <>
                {filteredAudits.map((audit) => (
                  <div
                    key={audit.id}
                    onClick={() => setSelectedAudit(audit)}
                    className={`bg-white rounded-lg shadow-sm p-6 cursor-pointer transition-all hover:shadow-md ${
                      selectedAudit?.id === audit.id ? 'ring-2 ring-blue-500' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {audit.action}
                        </h3>
                        <p className="text-sm text-gray-600">
                          ID: {audit.id} | Entity: {audit.entityType} ({audit.entityId})
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(audit.status)}`}>
                        {audit.status}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-3">{audit.details}</p>
                    <div className="flex items-center text-sm text-gray-500 space-x-4">
                      <span className="font-medium">{audit.userName}</span>
                      <span>•</span>
                      <span>{formatTimestamp(audit.timestamp)}</span>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <>
                {filteredApprovals.map((approval) => (
                  <div
                    key={approval.id}
                    onClick={() => setSelectedApproval(approval)}
                    className={`bg-white rounded-lg shadow-sm p-6 cursor-pointer transition-all hover:shadow-md ${
                      selectedApproval?.id === approval.id ? 'ring-2 ring-blue-500' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {approval.documentName}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {approval.id} | Document: {approval.documentId}
                        </p>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(approval.status)}`}>
                          {approval.status}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(approval.priority)}`}>
                          {approval.priority}
                        </span>
                      </div>
                    </div>
                    <div className="mb-3">
                      <p className="text-sm text-gray-600 mb-1">
                        Approvers: {approval.approverNames.join(', ')}
                      </p>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 space-x-4">
                      <span>Requested by <span className="font-medium">{approval.requestedBy}</span></span>
                      <span>•</span>
                      <span>Due: {formatTimestamp(approval.dueDate)}</span>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>

          {/* Detail Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                {activeTab === 'audit' ? 'Audit Details' : 'Approval Details'}
              </h2>
              
              {activeTab === 'audit' ? (
                selectedAudit ? (
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Audit ID</label>
                      <p className="text-gray-900 mt-1">{selectedAudit.id}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Action</label>
                      <p className="text-gray-900 mt-1">{selectedAudit.action}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Entity</label>
                      <p className="text-gray-900 mt-1">
                        {selectedAudit.entityType} ({selectedAudit.entityId})
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">User</label>
                      <p className="text-gray-900 mt-1">
                        {selectedAudit.userName} ({selectedAudit.userId})
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Timestamp</label>
                      <p className="text-gray-900 mt-1">
                        {formatTimestamp(selectedAudit.timestamp)}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Status</label>
                      <p className="mt-1">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedAudit.status)}`}>
                          {selectedAudit.status}
                        </span>
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Details</label>
                      <p className="text-gray-900 mt-1">{selectedAudit.details}</p>
                    </div>
                    <div className="pt-4 border-t border-gray-200">
                      <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                        View Full History
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">
                    Select an audit entry to view details
                  </p>
                )
              ) : (
                selectedApproval ? (
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Approval ID</label>
                      <p className="text-gray-900 mt-1">{selectedApproval.id}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Document</label>
                      <p className="text-gray-900 mt-1">
                        {selectedApproval.documentName} ({selectedApproval.documentId})
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Requested By</label>
                      <p className="text-gray-900 mt-1">{selectedApproval.requestedBy}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Requested At</label>
                      <p className="text-gray-900 mt-1">
                        {formatTimestamp(selectedApproval.requestedAt)}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Due Date</label>
                      <p className="text-gray-900 mt-1">
                        {formatTimestamp(selectedApproval.dueDate)}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Priority</label>
                      <p className="mt-1">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(selectedApproval.priority)}`}>
                          {selectedApproval.priority}
                        </span>
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Status</label>
                      <p className="mt-1">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedApproval.status)}`}>
                          {selectedApproval.status}
                        </span>
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Approvers</label>
                      <ul className="mt-2 space-y-1">
                        {selectedApproval.approverNames.map((name, idx) => (
                          <li key={idx} className="text-gray-900">
                            • {name}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="pt-4 border-t border-gray-200 space-y-2">
                      <button className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                        Approve
                      </button>
                      <button className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
                        Reject
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">
                    Select an approval workflow to view details
                  </p>
                )
              )}
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-sm font-medium text-gray-500 mb-1">Total Audits</div>
            <div className="text-3xl font-bold text-gray-900">{MOCK_AUDIT_ENTRIES.length}</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-sm font-medium text-gray-500 mb-1">Pending Approvals</div>
            <div className="text-3xl font-bold text-yellow-600">
              {MOCK_APPROVAL_WORKFLOWS.filter(a => a.status === 'pending').length}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-sm font-medium text-gray-500 mb-1">Approved Today</div>
            <div className="text-3xl font-bold text-green-600">
              {MOCK_APPROVAL_WORKFLOWS.filter(a => a.status === 'approved').length}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-sm font-medium text-gray-500 mb-1">Critical Priority</div>
            <div className="text-3xl font-bold text-red-600">
              {MOCK_APPROVAL_WORKFLOWS.filter(a => a.priority === 'critical').length}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
