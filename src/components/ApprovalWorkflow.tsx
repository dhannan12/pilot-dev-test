/**
 * ApprovalWorkflow — Document approval workflow management interface
 *
 * Features: workflow status tracking, approver management, action history, stage progression, document approval routing
 *
 * Ticket: SCRUM-667 | Branch: proto/SCRUM-658
 */

import React, { useState } from 'react'

interface Approver {
  id: string
  name: string
  email: string
  role: string
  status: 'pending' | 'approved' | 'rejected' | 'skipped'
  timestamp?: string
  comments?: string
}

interface WorkflowStage {
  id: string
  name: string
  order: number
  status: 'pending' | 'in_progress' | 'completed' | 'rejected'
  approvers: Approver[]
  requiredApprovals: number
  deadline?: string
}

interface ApprovalWorkflowData {
  id: string
  documentId: string
  documentName: string
  initiator: string
  createdAt: string
  currentStage: number
  overallStatus: 'draft' | 'in_review' | 'approved' | 'rejected' | 'cancelled'
  stages: WorkflowStage[]
  priority: 'low' | 'medium' | 'high' | 'urgent'
}

const mockWorkflows: ApprovalWorkflowData[] = [
  {
    id: 'WF-001',
    documentId: 'DOC-2024-001',
    documentName: 'Corporate Merger Agreement',
    initiator: 'Sarah Johnson',
    createdAt: '2024-03-15T09:00:00Z',
    currentStage: 1,
    overallStatus: 'in_review',
    priority: 'urgent',
    stages: [
      {
        id: 'STG-001-1',
        name: 'Legal Review',
        order: 1,
        status: 'completed',
        requiredApprovals: 2,
        deadline: '2024-03-18T17:00:00Z',
        approvers: [
          {
            id: 'APP-001',
            name: 'Michael Chen',
            email: 'michael.chen@legal.com',
            role: 'Senior Legal Counsel',
            status: 'approved',
            timestamp: '2024-03-16T10:30:00Z',
            comments: 'Contract terms reviewed and approved'
          },
          {
            id: 'APP-002',
            name: 'Emily Davis',
            email: 'emily.davis@legal.com',
            role: 'Legal Associate',
            status: 'approved',
            timestamp: '2024-03-16T14:20:00Z',
            comments: 'All clauses comply with regulations'
          }
        ]
      },
      {
        id: 'STG-001-2',
        name: 'Finance Approval',
        order: 2,
        status: 'in_progress',
        requiredApprovals: 2,
        deadline: '2024-03-20T17:00:00Z',
        approvers: [
          {
            id: 'APP-003',
            name: 'Robert Williams',
            email: 'robert.williams@finance.com',
            role: 'CFO',
            status: 'approved',
            timestamp: '2024-03-17T09:15:00Z',
            comments: 'Financial terms are acceptable'
          },
          {
            id: 'APP-004',
            name: 'Lisa Anderson',
            email: 'lisa.anderson@finance.com',
            role: 'Finance Director',
            status: 'pending'
          }
        ]
      },
      {
        id: 'STG-001-3',
        name: 'Executive Sign-off',
        order: 3,
        status: 'pending',
        requiredApprovals: 1,
        deadline: '2024-03-22T17:00:00Z',
        approvers: [
          {
            id: 'APP-005',
            name: 'David Thompson',
            email: 'david.thompson@exec.com',
            role: 'CEO',
            status: 'pending'
          }
        ]
      }
    ]
  },
  {
    id: 'WF-002',
    documentId: 'DOC-2024-002',
    documentName: 'Vendor Service Agreement',
    initiator: 'John Martinez',
    createdAt: '2024-03-14T11:30:00Z',
    currentStage: 0,
    overallStatus: 'approved',
    priority: 'medium',
    stages: [
      {
        id: 'STG-002-1',
        name: 'Legal Review',
        order: 1,
        status: 'completed',
        requiredApprovals: 1,
        deadline: '2024-03-16T17:00:00Z',
        approvers: [
          {
            id: 'APP-006',
            name: 'Jennifer Lee',
            email: 'jennifer.lee@legal.com',
            role: 'Contract Specialist',
            status: 'approved',
            timestamp: '2024-03-15T15:45:00Z',
            comments: 'Standard vendor terms approved'
          }
        ]
      },
      {
        id: 'STG-002-2',
        name: 'Procurement Approval',
        order: 2,
        status: 'completed',
        requiredApprovals: 1,
        deadline: '2024-03-17T17:00:00Z',
        approvers: [
          {
            id: 'APP-007',
            name: 'Mark Robinson',
            email: 'mark.robinson@procurement.com',
            role: 'Procurement Manager',
            status: 'approved',
            timestamp: '2024-03-16T11:20:00Z',
            comments: 'Budget approved, vendor vetted'
          }
        ]
      }
    ]
  },
  {
    id: 'WF-003',
    documentId: 'DOC-2024-003',
    documentName: 'Employee NDA Template Update',
    initiator: 'Amanda White',
    createdAt: '2024-03-13T08:00:00Z',
    currentStage: 0,
    overallStatus: 'rejected',
    priority: 'low',
    stages: [
      {
        id: 'STG-003-1',
        name: 'Legal Review',
        order: 1,
        status: 'rejected',
        requiredApprovals: 1,
        deadline: '2024-03-15T17:00:00Z',
        approvers: [
          {
            id: 'APP-008',
            name: 'Patricia Brown',
            email: 'patricia.brown@legal.com',
            role: 'Legal Counsel',
            status: 'rejected',
            timestamp: '2024-03-14T16:30:00Z',
            comments: 'Non-compete clause needs revision per state law'
          }
        ]
      }
    ]
  },
  {
    id: 'WF-004',
    documentId: 'DOC-2024-004',
    documentName: 'Data Processing Agreement',
    initiator: 'Kevin Taylor',
    createdAt: '2024-03-12T14:15:00Z',
    currentStage: 1,
    overallStatus: 'in_review',
    priority: 'high',
    stages: [
      {
        id: 'STG-004-1',
        name: 'Privacy Review',
        order: 1,
        status: 'completed',
        requiredApprovals: 1,
        deadline: '2024-03-14T17:00:00Z',
        approvers: [
          {
            id: 'APP-009',
            name: 'Rachel Green',
            email: 'rachel.green@privacy.com',
            role: 'Data Protection Officer',
            status: 'approved',
            timestamp: '2024-03-13T13:00:00Z',
            comments: 'GDPR and CCPA compliant'
          }
        ]
      },
      {
        id: 'STG-004-2',
        name: 'Security Review',
        order: 2,
        status: 'in_progress',
        requiredApprovals: 1,
        deadline: '2024-03-16T17:00:00Z',
        approvers: [
          {
            id: 'APP-010',
            name: 'Daniel Moore',
            email: 'daniel.moore@security.com',
            role: 'CISO',
            status: 'pending'
          }
        ]
      }
    ]
  },
  {
    id: 'WF-005',
    documentId: 'DOC-2024-005',
    documentName: 'Partnership Agreement Amendment',
    initiator: 'Michelle Garcia',
    createdAt: '2024-03-11T10:00:00Z',
    currentStage: 0,
    overallStatus: 'draft',
    priority: 'medium',
    stages: [
      {
        id: 'STG-005-1',
        name: 'Legal Review',
        order: 1,
        status: 'pending',
        requiredApprovals: 2,
        deadline: '2024-03-18T17:00:00Z',
        approvers: [
          {
            id: 'APP-011',
            name: 'Christopher Hall',
            email: 'christopher.hall@legal.com',
            role: 'Senior Legal Counsel',
            status: 'pending'
          },
          {
            id: 'APP-012',
            name: 'Nicole Martinez',
            email: 'nicole.martinez@legal.com',
            role: 'Legal Associate',
            status: 'pending'
          }
        ]
      },
      {
        id: 'STG-005-2',
        name: 'Business Development',
        order: 2,
        status: 'pending',
        requiredApprovals: 1,
        deadline: '2024-03-20T17:00:00Z',
        approvers: [
          {
            id: 'APP-013',
            name: 'Steven Clark',
            email: 'steven.clark@bizdev.com',
            role: 'VP Business Development',
            status: 'pending'
          }
        ]
      }
    ]
  }
]

export default function ApprovalWorkflow() {
  const [selectedWorkflow, setSelectedWorkflow] = useState<ApprovalWorkflowData | null>(mockWorkflows[0])
  const [activeTab, setActiveTab] = useState<'overview' | 'stages' | 'history'>('overview')

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'in_review':
      case 'in_progress':
        return 'bg-blue-100 text-blue-800'
      case 'pending':
      case 'draft':
        return 'bg-gray-100 text-gray-800'
      case 'rejected':
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-800'
      case 'high':
        return 'bg-orange-100 text-orange-800'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'low':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const calculateProgress = (workflow: ApprovalWorkflowData) => {
    const completedStages = workflow.stages.filter(s => s.status === 'completed').length
    return (completedStages / workflow.stages.length) * 100
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Approval Workflow Management</h1>
          <p className="text-gray-600">Track and manage document approval processes</p>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Workflow List Sidebar */}
          <div className="col-span-4 bg-white rounded-lg shadow p-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Active Workflows</h2>
            <div className="space-y-3">
              {mockWorkflows.map((workflow) => (
                <div
                  key={workflow.id}
                  onClick={() => setSelectedWorkflow(workflow)}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    selectedWorkflow?.id === workflow.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 text-sm truncate">{workflow.documentName}</p>
                      <p className="text-xs text-gray-500">{workflow.id}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${getPriorityColor(workflow.priority)}`}>
                      {workflow.priority}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(workflow.overallStatus)}`}>
                      {workflow.overallStatus.replace('_', ' ')}
                    </span>
                    <span className="text-xs text-gray-500">{formatDate(workflow.createdAt)}</span>
                  </div>
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className="bg-blue-600 h-1.5 rounded-full"
                        style={{ width: `${calculateProgress(workflow)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main Content Area */}
          <div className="col-span-8">
            {selectedWorkflow ? (
              <div className="bg-white rounded-lg shadow">
                {/* Header */}
                <div className="border-b border-gray-200 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-1">{selectedWorkflow.documentName}</h2>
                      <p className="text-sm text-gray-600">Document ID: {selectedWorkflow.documentId}</p>
                    </div>
                    <div className="flex gap-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedWorkflow.overallStatus)}`}>
                        {selectedWorkflow.overallStatus.replace('_', ' ')}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(selectedWorkflow.priority)}`}>
                        {selectedWorkflow.priority}
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Initiated by:</span>
                      <span className="ml-2 font-medium text-gray-900">{selectedWorkflow.initiator}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Created:</span>
                      <span className="ml-2 font-medium text-gray-900">{formatDate(selectedWorkflow.createdAt)}</span>
                    </div>
                  </div>
                </div>

                {/* Tabs */}
                <div className="border-b border-gray-200">
                  <nav className="flex space-x-8 px-6" aria-label="Tabs">
                    {(['overview', 'stages', 'history'] as const).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                          activeTab === tab
                            ? 'border-blue-500 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </nav>
                </div>

                {/* Tab Content */}
                <div className="p-6">
                  {activeTab === 'overview' && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Workflow Progress</h3>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-700">Overall Progress</span>
                            <span className="text-sm font-medium text-gray-900">{Math.round(calculateProgress(selectedWorkflow))}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div
                              className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                              style={{ width: `${calculateProgress(selectedWorkflow)}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Stage Summary</h3>
                        <div className="grid grid-cols-4 gap-4">
                          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                            <p className="text-2xl font-bold text-green-700">
                              {selectedWorkflow.stages.filter(s => s.status === 'completed').length}
                            </p>
                            <p className="text-sm text-green-600">Completed</p>
                          </div>
                          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                            <p className="text-2xl font-bold text-blue-700">
                              {selectedWorkflow.stages.filter(s => s.status === 'in_progress').length}
                            </p>
                            <p className="text-sm text-blue-600">In Progress</p>
                          </div>
                          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                            <p className="text-2xl font-bold text-gray-700">
                              {selectedWorkflow.stages.filter(s => s.status === 'pending').length}
                            </p>
                            <p className="text-sm text-gray-600">Pending</p>
                          </div>
                          <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                            <p className="text-2xl font-bold text-red-700">
                              {selectedWorkflow.stages.filter(s => s.status === 'rejected').length}
                            </p>
                            <p className="text-sm text-red-600">Rejected</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'stages' && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Approval Stages</h3>
                      {selectedWorkflow.stages.map((stage, index) => (
                        <div key={stage.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                                stage.status === 'completed' ? 'bg-green-500 text-white' :
                                stage.status === 'in_progress' ? 'bg-blue-500 text-white' :
                                stage.status === 'rejected' ? 'bg-red-500 text-white' :
                                'bg-gray-300 text-gray-600'
                              }`}>
                                {index + 1}
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-900">{stage.name}</h4>
                                <p className="text-sm text-gray-600">
                                  Required: {stage.requiredApprovals} approval{stage.requiredApprovals !== 1 ? 's' : ''}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(stage.status)}`}>
                                {stage.status.replace('_', ' ')}
                              </span>
                              {stage.deadline && (
                                <p className="text-xs text-gray-500 mt-1">Due: {formatDate(stage.deadline)}</p>
                              )}
                            </div>
                          </div>

                          <div className="space-y-2">
                            {stage.approvers.map((approver) => (
                              <div key={approver.id} className="bg-gray-50 rounded p-3">
                                <div className="flex items-start justify-between mb-1">
                                  <div>
                                    <p className="font-medium text-gray-900 text-sm">{approver.name}</p>
                                    <p className="text-xs text-gray-600">{approver.role}</p>
                                    <p className="text-xs text-gray-500">{approver.email}</p>
                                  </div>
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(approver.status)}`}>
                                    {approver.status}
                                  </span>
                                </div>
                                {approver.comments && (
                                  <p className="text-sm text-gray-700 mt-2 italic">"{approver.comments}"</p>
                                )}
                                {approver.timestamp && (
                                  <p className="text-xs text-gray-500 mt-1">{formatDate(approver.timestamp)}</p>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === 'history' && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Activity History</h3>
                      <div className="space-y-3">
                        {selectedWorkflow.stages
                          .flatMap(stage => 
                            stage.approvers
                              .filter(a => a.timestamp)
                              .map(approver => ({
                                ...approver,
                                stageName: stage.name,
                                stageOrder: stage.order
                              }))
                          )
                          .sort((a, b) => new Date(b.timestamp!).getTime() - new Date(a.timestamp!).getTime())
                          .map((item, idx) => (
                            <div key={idx} className="border-l-4 border-blue-500 pl-4 py-2">
                              <div className="flex items-center justify-between mb-1">
                                <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(item.status)}`}>
                                  {item.status.toUpperCase()}
                                </span>
                                <span className="text-xs text-gray-500">{formatDate(item.timestamp!)}</span>
                              </div>
                              <p className="font-medium text-gray-900 text-sm">{item.name} - {item.stageName}</p>
                              <p className="text-xs text-gray-600">{item.role}</p>
                              {item.comments && (
                                <p className="text-sm text-gray-700 mt-1 italic">"{item.comments}"</p>
                              )}
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-12 text-center">
                <p className="text-gray-500">Select a workflow to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
